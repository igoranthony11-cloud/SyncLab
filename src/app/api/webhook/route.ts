import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import type Stripe from "stripe";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");

  if (!sig) return NextResponse.json({ error: "No signature" }, { status: 400 });

  let event: Stripe.Event;

  try {
    event = getStripe().webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "payment_intent.succeeded") {
    const paymentIntent = event.data.object as Stripe.PaymentIntent;

    try {
      await addDoc(collection(db, "orders"), {
        paymentIntentId: paymentIntent.id,
        ticketId: paymentIntent.metadata.ticketId,
        ticketName: paymentIntent.metadata.ticketName,
        amount: paymentIntent.amount,
        currency: paymentIntent.currency,
        customerEmail: paymentIntent.receipt_email ?? null,
        status: "confirmed",
        createdAt: serverTimestamp(),
      });
    } catch (err) {
      console.error("Error saving order to Firestore:", err);
      // Não retorna erro para o Stripe — o pagamento já foi confirmado
    }
  }

  return NextResponse.json({ received: true });
}
