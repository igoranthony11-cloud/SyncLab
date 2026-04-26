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
    name: "EXPERIÊNCIA PRO",
    subtitle: "Tudo + Press Kit Exclusivo",
    price: 15900, // Preço único
    horario: "06:30 às 11:00",
    description: "Tudo incluso + Press Kit exclusivo. Preço único, vagas limitadíssimas.",
    accent: "#7c3aed",
    features: [
      "Reset ao amanhecer — respiração e consciência corporal (06:30)",
      "Sessão de yoga guiada (60 min)",
      "Imersão corpo e mente — alongamento profundo",
      "Tapete de yoga personalizado do evento",
      "Acesso ao Coffee Sync (08:30–11:00)",
      "Open coffee espresso",
      "Press Kit Exclusivo: garrafa Running Gang",
      "Kit de adesivos exclusivos Running Gang",
      "Ativações exclusivas de parceiros",
    ],
    vagas: 15,
    lotePrecos: [15900, 15900, 15900], // preço único
  },
  tapete: {
    id: "tapete",
    name: "YOGA + COFFEE SYNC",
    subtitle: "Tapete + Open Coffee",
    price: 11900, // Lote 1: R$119
    horario: "06:30 às 11:00",
    description: "Yoga completo com tapete personalizado + Coffee Sync.",
    accent: "#b45309",
    features: [
      "Reset ao amanhecer — respiração e consciência corporal (06:30)",
      "Sessão de yoga guiada (60 min)",
      "Imersão corpo e mente — alongamento",
      "Tapete de yoga personalizado do evento",
      "Acesso ao Coffee Sync (08:30–11:00)",
      "Open coffee espresso",
    ],
    vagas: 15,
    lotePrecos: [11900, 12900, 14900],
  },
  coffee: {
    id: "coffee",
    name: "COFFEE SYNC",
    subtitle: "Só o Café",
    price: 3900, // Lote 1: R$39
    horario: "08:30 às 11:00",
    description: "Acesso ao Coffee Sync: open espresso, música e conexão.",
    accent: "#065f46",
    features: [
      "Acesso ao Coffee Sync",
      "Open coffee espresso",
      "Música + energia + networking",
      "Conexão com a comunidade",
    ],
    vagas: 30,
    lotePrecos: [3900, 4900, 9700],
  },
} as const;

export type TicketId = keyof typeof TICKETS;
