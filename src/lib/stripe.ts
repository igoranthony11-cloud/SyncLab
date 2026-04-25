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

export const TICKETS = {
  standard: {
    id: "standard",
    name: "INGRESSO STANDARD",
    price: 19700,
    description: "Acesso a todos os painéis e workshops do evento.",
    color: "bg-blue-500",
    accent: "#3B82F6",
    features: ["Acesso completo ao evento", "Kit de boas-vindas", "Almoço incluído"],
  },
  vip: {
    id: "vip",
    name: "INGRESSO VIP",
    price: 39700,
    description: "Experiência premium com acesso a sessões exclusivas e networking.",
    color: "bg-yellow-400",
    accent: "#FACC15",
    features: ["Tudo do Standard", "Sessão VIP de networking", "Meet & greet com palestrantes", "Jantar de encerramento"],
  },
  premium: {
    id: "premium",
    name: "INGRESSO PREMIUM",
    price: 79700,
    description: "Transformação completa com mentoria e acesso vitalício aos conteúdos.",
    color: "bg-pink-500",
    accent: "#EC4899",
    features: ["Tudo do VIP", "Mentoria 1:1 pós-evento", "Gravações do evento", "Comunidade exclusiva"],
  },
} as const;

export type TicketId = keyof typeof TICKETS;
