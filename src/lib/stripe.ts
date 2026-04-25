import Stripe from "stripe";

let _stripe: Stripe | null = null;

export function getStripe(): Stripe {
  if (!_stripe) {
    if (!process.env.STRIPE_SECRET_KEY) {
      throw new Error("STRIPE_SECRET_KEY is not set");
    }
    _stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2026-04-22.dahlia",
    });
  }
  return _stripe;
}

// Lote atual — altere para 2 ou 3 quando o lote anterior esgotar
export const LOTE_ATUAL = 1;

export const TICKETS = {
  completa: {
    id: "completa",
    name: "EXPERIÊNCIA COMPLETA",
    subtitle: "Press Kit + Coffee Sync",
    price: 8900, // Lote 1: R$89
    horario: "06:30 às 11:00",
    description: "Viva o evento inteiro: meditação, yoga, press kit premium e coffee sync.",
    accent: "#7c3aed",
    features: [
      "Meditação guiada ao amanhecer (06:30)",
      "Sessão de yoga guiada (60 min)",
      "Press Kit Premium: tapete personalizado + caneca/garrafa + adesivos",
      "Coffee party + brunch saudável (08:30–11:00)",
      "Ativações exclusivas de parceiros",
    ],
    vagas: 15, // Lote 1
    lotePrecos: [8900, 10900, 12900],
  },
  tapete: {
    id: "tapete",
    name: "YOGA + COFFEE SYNC",
    subtitle: "Tapete + Coffee",
    price: 6900, // Lote 1: R$69
    horario: "06:30 às 11:00",
    description: "A prática + o café, com tapete personalizado incluso.",
    accent: "#b45309",
    features: [
      "Meditação guiada ao amanhecer (06:30)",
      "Sessão de yoga guiada (60 min)",
      "Tapete de yoga personalizado",
      "Coffee party + brunch saudável (08:30–11:00)",
    ],
    vagas: 15, // Lote 1
    lotePrecos: [6900, 8500, 9900],
  },
  coffee: {
    id: "coffee",
    name: "COFFEE SYNC",
    subtitle: "Só o Café",
    price: 3900, // Lote 1: R$39
    horario: "08:30 às 11:00",
    description: "Curta a coffee party, brunch e a energia do pós-yoga.",
    accent: "#065f46",
    features: [
      "Coffee party + brunch saudável",
      "Ativações de parceiros",
      "Networking e conexão com a comunidade",
    ],
    vagas: 30, // Lote 1
    lotePrecos: [3900, 4900, 5900],
  },
} as const;

export type TicketId = keyof typeof TICKETS;
