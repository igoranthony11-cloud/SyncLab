import { NextRequest, NextResponse } from "next/server";
import { getStripe, TICKETS, type TicketId } from "@/lib/stripe";
import { getLotesConfig, precoAtual } from "@/lib/lotes";

export async function POST(req: NextRequest) {
  try {
    const { ticketId } = await req.json() as { ticketId: TicketId };

    if (!ticketId || !TICKETS[ticketId]) {
      return NextResponse.json({ error: "Modalidade inválida" }, { status: 400 });
    }

    // Busca lote e preço atual do Firestore
    const config = await getLotesConfig();
    const state = config[ticketId];

    if (state.esgotado) {
      return NextResponse.json({ error: "Ingressos esgotados para esta modalidade" }, { status: 410 });
    }

    const preco = precoAtual(ticketId, state);
    const ticket = TICKETS[ticketId];

    const paymentIntent = await getStripe().paymentIntents.create({
      amount: preco,
      currency: "brl",
      automatic_payment_methods: { enabled: true },
      metadata: {
        ticketId,
        ticketName: ticket.name,
        lote: String(state.lote),
        preco: String(preco),
      },
    });

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      lote: state.lote,
      preco,
    });
  } catch (err) {
    console.error("create-payment-intent error:", err);
    return NextResponse.json({ error: "Erro ao criar pagamento" }, { status: 500 });
  }
}
