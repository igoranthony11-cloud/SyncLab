import { NextRequest, NextResponse } from "next/server";
import { getStripe, TICKETS, type TicketId } from "@/lib/stripe";
import { getLotesConfig, precoAtual } from "@/lib/lotes";

// Taxa de parcelamento por parcela adicional (2.5% ao mês)
const TAXA_PARCELA = 0.025;

// Calcula o total com juros compostos para N parcelas
export function calcularTotalComJuros(valorBase: number, parcelas: number): number {
  if (parcelas <= 1) return valorBase;
  const fator = Math.pow(1 + TAXA_PARCELA, parcelas - 1);
  return Math.round(valorBase * fator);
}

export async function POST(req: NextRequest) {
  try {
    const { ticketId, parcelas = 1 } = await req.json() as {
      ticketId: TicketId;
      parcelas?: number;
    };

    if (!ticketId || !TICKETS[ticketId]) {
      return NextResponse.json({ error: "Modalidade inválida" }, { status: 400 });
    }

    const parcelasNum = Math.min(Math.max(Number(parcelas), 1), 12);

    // Busca lote e preço atual do Firestore
    const config = await getLotesConfig();
    const state = config[ticketId];

    if (state.esgotado) {
      return NextResponse.json({ error: "Ingressos esgotados para esta modalidade" }, { status: 410 });
    }

    const precoBase = precoAtual(ticketId, state);
    const precoFinal = calcularTotalComJuros(precoBase, parcelasNum);
    const ticket = TICKETS[ticketId];

    const paymentIntent = await getStripe().paymentIntents.create({
      amount: precoFinal,
      currency: "brl",
      payment_method_types: ["card", "pix"],
      payment_method_options: {
        card: {
          installments: {
            enabled: parcelasNum > 1,
          },
        },
        pix: {
          expires_after_seconds: 3600, // PIX expira em 1h
        },
      },
      metadata: {
        ticketId,
        ticketName: ticket.name,
        lote: String(state.lote),
        precoBase: String(precoBase),
        precoFinal: String(precoFinal),
        parcelas: String(parcelasNum),
      },
    });

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      lote: state.lote,
      precoBase,
      precoFinal,
      parcelas: parcelasNum,
    });
  } catch (err) {
    console.error("create-payment-intent error:", err);
    return NextResponse.json({ error: "Erro ao criar pagamento" }, { status: 500 });
  }
}
