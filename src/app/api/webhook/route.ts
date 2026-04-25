import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { registrarVenda } from "@/lib/lotes";
import type Stripe from "stripe";
import type { TicketId } from "@/lib/stripe";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");

  if (!sig) return NextResponse.json({ error: "No signature" }, { status: 400 });

  let event: Stripe.Event;
  try {
    event = getStripe().webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err) {
    console.error("Webhook signature failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "payment_intent.succeeded") {
    const pi = event.data.object as Stripe.PaymentIntent;
    const ticketId = pi.metadata.ticketId as TicketId;
    const loteUsado = Number(pi.metadata.lote) || 1;
    const preco = Number(pi.metadata.preco) || pi.amount;

    try {
      // Registra venda e avança lote se necessário (transação atômica)
      const resultado = await registrarVenda(ticketId);

      // Salva pedido no Firestore
      await addDoc(collection(db, "orders"), {
        paymentIntentId: pi.id,
        ticketId,
        ticketName: pi.metadata.ticketName,
        lote: loteUsado,
        amount: preco,
        currency: pi.currency,
        customerEmail: pi.receipt_email ?? null,
        status: "confirmed",
        loteAvancouPara: resultado.novoLote !== loteUsado ? resultado.novoLote : null,
        esgotou: resultado.esgotado,
        createdAt: serverTimestamp(),
      });

      if (resultado.esgotado) {
        console.log(`🎫 Modalidade ${ticketId} ESGOTADA!`);
      } else if (resultado.novoLote !== loteUsado) {
        console.log(`🔄 Modalidade ${ticketId}: avançou para Lote ${resultado.novoLote}`);
      }
    } catch (err) {
      console.error("Error processing order:", err);
    }
  }

  return NextResponse.json({ received: true });
}
