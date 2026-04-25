import { NextRequest, NextResponse } from "next/server";
import { getStripe, TICKETS, type TicketId } from "@/lib/stripe";

export async function POST(req: NextRequest) {
  try {
    const { ticketId } = await req.json() as { ticketId: TicketId };

    if (!ticketId || !TICKETS[ticketId]) {
      return NextResponse.json({ error: "Ingresso inválido" }, { status: 400 });
    }

    const ticket = TICKETS[ticketId];

    const paymentIntent = await getStripe().paymentIntents.create({
      amount: ticket.price,
      currency: "brl",
      automatic_payment_methods: { enabled: true },
      metadata: { ticketId, ticketName: ticket.name },
    });

    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    console.error("create-payment-intent error:", err);
    return NextResponse.json({ error: "Erro interno ao criar pagamento" }, { status: 500 });
  }
}
