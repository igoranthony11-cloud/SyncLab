import { NextResponse } from "next/server";
import { getLotesConfig, precoAtual, VAGAS } from "@/lib/lotes";
import { TICKETS, type TicketId } from "@/lib/stripe";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const config = await getLotesConfig();

    // Monta resposta com lote atual, preço e vagas restantes por modalidade
    const resultado: Record<string, {
      lote: number;
      preco: number;
      vagasRestantes: number;
      esgotado: boolean;
      vendidosPorLote: number[];
      vagasPorLote: number[];
    }> = {};

    for (const id of Object.keys(TICKETS) as TicketId[]) {
      const state = config[id];
      const loteIdx = state.lote - 1;
      const vagasPorLote = VAGAS[id];
      const vagasNoLoteAtual = vagasPorLote[loteIdx] ?? 0;
      const vendidosNoLoteAtual = state.vendidos[loteIdx] ?? 0;
      const vagasRestantes = Math.max(0, vagasNoLoteAtual - vendidosNoLoteAtual);

      resultado[id] = {
        lote: state.lote,
        preco: precoAtual(id, state),
        vagasRestantes,
        esgotado: state.esgotado,
        vendidosPorLote: state.vendidos,
        vagasPorLote,
      };
    }

    return NextResponse.json(resultado);
  } catch (err) {
    console.error("GET /api/lotes error:", err);
    return NextResponse.json({ error: "Erro ao buscar lotes" }, { status: 500 });
  }
}
