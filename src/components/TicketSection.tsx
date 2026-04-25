"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { TICKETS, LOTE_ATUAL, type TicketId } from "@/lib/stripe";

const CARD_STYLES: Record<TicketId, { bg: string; border: string; btn: string; btnText: string }> = {
  completa: { bg: "#3b0764", border: "#7c3aed", btn: "#7c3aed", btnText: "#fff" },
  tapete:   { bg: "#3d1a00", border: "#b45309", btn: "#b45309", btnText: "#fff" },
  coffee:   { bg: "#064e3b", border: "#059669", btn: "#059669", btnText: "#fff" },
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
    <section id="ingressos" className="px-5 py-12" style={{ backgroundColor: "#fef9ee" }}>
      <h2 className="text-black font-black text-3xl uppercase text-center mb-1">INGRESSOS</h2>

      {/* Badge lote atual */}
      <div className="flex justify-center mb-6">
        <span className="inline-block bg-black text-white font-black text-xs px-4 py-1.5 rounded-full uppercase tracking-widest">
          🔥 LOTE {LOTE_ATUAL} — DISPONÍVEL AGORA
        </span>
      </div>

      <div className="flex flex-col gap-5 max-w-sm mx-auto">
        {(Object.entries(TICKETS) as [TicketId, typeof TICKETS[TicketId]][]).map(([id, ticket]) => {
          const style = CARD_STYLES[id];
          const lotePrecos = ticket.lotePrecos;

          return (
            <div key={id} className="rounded-3xl overflow-hidden border-2 shadow-[4px_4px_0_0_#000]"
              style={{ background: style.bg, borderColor: style.border }}>

              {/* Header do card */}
              <div className="px-5 pt-5 pb-3">
                <div className="flex justify-between items-start mb-1">
                  <div>
                    <h3 className="text-white font-black text-lg uppercase leading-tight">
                      {ticket.name}
                    </h3>
                    <p className="font-bold text-xs uppercase tracking-wider mt-0.5"
                      style={{ color: style.border === "#7c3aed" ? "#c4b5fd" : style.border === "#b45309" ? "#fcd34d" : "#6ee7b7" }}>
                      {ticket.subtitle}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-white font-black text-2xl">{formatBRL(ticket.price)}</p>
                    <p className="text-white/60 text-xs">Lote {LOTE_ATUAL}</p>
                  </div>
                </div>
                <p className="text-white/80 text-sm font-semibold mt-1">⏰ {ticket.horario}</p>
              </div>

              {/* Divisor */}
              <div className="border-t border-white/10 mx-5" />

              {/* Features */}
              <div className="px-5 py-3">
                <p className="text-white/60 text-xs font-bold uppercase tracking-wider mb-2">Incluso</p>
                {ticket.features.map((f) => (
                  <p key={f} className="text-white text-sm font-semibold mb-1 flex items-start gap-1.5">
                    <span className="mt-0.5 flex-shrink-0">✓</span> {f}
                  </p>
                ))}
              </div>

              {/* Próximos lotes */}
              <div className="px-5 pb-3">
                <div className="flex gap-2 mt-1">
                  {lotePrecos.map((p, i) => (
                    <div key={i} className={`flex-1 text-center rounded-xl py-1.5 ${i + 1 === LOTE_ATUAL ? "bg-white/20" : "bg-white/5"}`}>
                      <p className={`text-xs font-bold ${i + 1 === LOTE_ATUAL ? "text-white" : "text-white/40"}`}>
                        Lote {i + 1}
                      </p>
                      <p className={`text-xs font-black ${i + 1 === LOTE_ATUAL ? "text-white" : "text-white/30 line-through"}`}>
                        {formatBRL(p)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Botão */}
              <div className="px-5 pb-5">
                <button onClick={() => handleSelect(id)} disabled={loading !== null}
                  className="w-full font-black text-sm py-3.5 rounded-full border-2 border-white/30 uppercase tracking-wider transition-all disabled:opacity-60 disabled:cursor-not-allowed hover:opacity-90"
                  style={{ background: style.btn, color: style.btnText }}>
                  {loading === id ? "AGUARDE..." : "GARANTIR MINHA VAGA"}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <p className="text-center text-gray-400 text-xs mt-6">
        * Lotes esgotam por ordem de compra. Sem reserva.
      </p>
    </section>
  );
}
