import { db } from "@/lib/firebase";
import {
  doc,
  getDoc,
  setDoc,
  runTransaction,
} from "firebase/firestore";
import { TICKETS, type TicketId } from "@/lib/stripe";

// Vagas por lote, por modalidade
export const VAGAS: Record<TicketId, number[]> = {
  completa: [15, 15, 15], // preço único, mesmo lote
  tapete:   [15, 15, 15],
  coffee:   [30, 30, 30],
};

export interface LoteState {
  lote: number;           // lote atual (1, 2 ou 3)
  vendidos: number[];     // [vendidos_lote1, vendidos_lote2, vendidos_lote3]
  esgotado: boolean;      // true se todos os lotes esgotaram
}

export type LotesConfig = Record<TicketId, LoteState>;

const CONFIG_DOC = "lotes";

// Estado inicial zerado
function estadoInicial(): LotesConfig {
  return {
    completa: { lote: 1, vendidos: [0, 0, 0], esgotado: false },
    tapete:   { lote: 1, vendidos: [0, 0, 0], esgotado: false },
    coffee:   { lote: 1, vendidos: [0, 0, 0], esgotado: false },
  };
}

// Lê estado atual do Firestore — inicializa se não existir
export async function getLotesConfig(): Promise<LotesConfig> {
  const ref = doc(db, "config", CONFIG_DOC);
  const snap = await getDoc(ref);
  if (!snap.exists()) {
    const inicial = estadoInicial();
    await setDoc(ref, inicial);
    return inicial;
  }
  return snap.data() as LotesConfig;
}

// Retorna preço atual para uma modalidade baseado no lote
export function precoAtual(ticketId: TicketId, state: LoteState): number {
  const idx = state.lote - 1;
  return TICKETS[ticketId].lotePrecos[idx];
}

// Registra uma venda e avança o lote se necessário — usa transação atômica
export async function registrarVenda(ticketId: TicketId): Promise<{
  loteUsado: number;
  precoUsado: number;
  novoLote: number;
  esgotado: boolean;
}> {
  const ref = doc(db, "config", CONFIG_DOC);

  return await runTransaction(db, async (transaction) => {
    const snap = await transaction.get(ref);
    let config: LotesConfig = snap.exists()
      ? (snap.data() as LotesConfig)
      : estadoInicial();

    const state = { ...config[ticketId] };
    const vagasPorLote = VAGAS[ticketId];

    if (state.esgotado) {
      throw new Error("Ingressos esgotados para esta modalidade");
    }

    const loteIdx = state.lote - 1;
    const novoVendidos = [...state.vendidos];
    novoVendidos[loteIdx] = (novoVendidos[loteIdx] ?? 0) + 1;

    const loteUsado = state.lote;
    const precoUsado = TICKETS[ticketId].lotePrecos[loteIdx];

    // Verifica se deve avançar o lote
    let novoLote = state.lote;
    let esgotado = false;

    if (novoVendidos[loteIdx] >= vagasPorLote[loteIdx]) {
      if (state.lote < 3) {
        novoLote = state.lote + 1;
      } else {
        esgotado = true;
      }
    }

    const novoState: LoteState = {
      lote: novoLote,
      vendidos: novoVendidos,
      esgotado,
    };

    transaction.set(ref, { ...config, [ticketId]: novoState });

    return { loteUsado, precoUsado, novoLote, esgotado };
  });
}
