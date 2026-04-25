"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { TICKETS, type TicketId } from "@/lib/stripe";

const CARD_COLORS: Record<TicketId, { bg: string; badge: string; btn: string }> = {
  standard: { bg: "bg-blue-500", badge: "bg-blue-200 text-blue-900", btn: "bg-pink-500" },
  vip:      { bg: "bg-yellow-400", badge: "bg-yellow-200 text-yellow-900", btn: "bg-pink-500" },
  premium:  { bg: "bg-pink-500", badge: "bg-pink-200 text-pink-900", btn: "bg-yellow-400" },
};

function formatBRL(cents: number) {
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(cents / 100);
}

export default function TicketSection() {
  const router = useRouter();
  const [loading, setLoading] = useState<TicketId | null>(null);

  const handleSelect = (id: TicketId) => {
    setLoading(id);
    router.push(`/checkout?ticket=${id}`);
  };

  return (
    <section id="ingressos" className="bg-cream px-6 py-12" style={{ backgroundColor: "#fef9ee" }}>
      <h2 className="text-black font-black text-3xl uppercase text-center mb-1">NOSSOS INGRESSOS</h2>
      <p className="text-center text-gray-600 font-bold text-sm mb-8">Kit wellness incluso em todos os ingressos.*</p>

      <div className="flex flex-col gap-5 max-w-sm mx-auto">
        {(Object.entries(TICKETS) as [TicketId, typeof TICKETS[TicketId]][]).map(([id, ticket]) => {
          const colors = CARD_COLORS[id];
          return (
            <div
              key={id}
              className={`${colors.bg} rounded-3xl p-5 relative overflow-hidden border-2 border-black shadow-[4px_4px_0px_0px_#000]`}
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="text-white font-black text-xl uppercase leading-tight" style={{ textShadow: "1px 1px 0 #000" }}>
                    {ticket.name}
                  </h3>
                  <p className="text-white/90 text-sm mt-1 font-semibold max-w-[200px]">{ticket.description}</p>
                </div>
                <span className="font-black text-white text-2xl" style={{ textShadow: "1px 1px 0 #000" }}>
                  {formatBRL(ticket.price)}
                </span>
              </div>

              <ul className="mb-4 space-y-1">
                {ticket.features.map((f) => (
                  <li key={f} className="text-white font-bold text-sm flex items-center gap-1">
                    <span>✓</span> {f}
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handleSelect(id)}
                disabled={loading !== null}
                className={`${colors.btn} text-black font-black text-sm px-6 py-3 rounded-full border-2 border-black uppercase tracking-wide shadow-[2px_2px_0_0_#000] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all disabled:opacity-70 disabled:cursor-not-allowed`}
              >
                {loading === id ? "AGUARDE..." : "COMPRAR AGORA"}
              </button>
            </div>
          );
        })}
      </div>

      <p className="text-center text-gray-400 text-xs mt-6">*Kit enviado até 10 dias antes do evento.</p>
    </section>
  );
}
