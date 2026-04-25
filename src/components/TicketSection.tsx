"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { TICKETS, type TicketId } from "@/lib/stripe";

interface LoteInfo {
  lote: number;
  preco: number;
  vagasRestantes: number;
  esgotado: boolean;
  vendidosPorLote: number[];
  vagasPorLote: number[];
}

type LotesData = Record<TicketId, LoteInfo>;

const CARD_STYLES: Record<TicketId, { bg: string; border: string; btn: string }> = {
  completa: { bg: "#3b0764", border: "#7c3aed", btn: "#7c3aed" },
  tapete:   { bg: "#3d1a00", border: "#b45309", btn: "#b45309" },
  coffee:   { bg: "#064e3b", border: "#059669", btn: "#059669" },
};

const LABEL_COLORS: Record<TicketId, string> = {
  completa: "#c4b5fd",
  tapete:   "#fcd34d",
  coffee:   "#6ee7b7",
};

function formatBRL(cents: number) {
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(cents / 100);
}

function VagasBar({ restantes, total }: { restantes: number; total: number }) {
  const pct = Math.round((restantes / total) * 100);
  const cor = pct > 50 ? "#22c55e" : pct > 20 ? "#f59e0b" : "#ef4444";
  return (
    <div className="mt-2">
      <div className="flex justify-between items-center mb-1">
        <span className="text-white/60 text-xs font-semibold">Vagas neste lote</span>
        <span className="text-white font-black text-xs">{restantes} restantes</span>
      </div>
      <div className="w-full bg-white/10 rounded-full h-1.5">
        <div className="h-1.5 rounded-full transition-all duration-500"
          style={{ width: `${pct}%`, background: cor }} />
      </div>
    </div>
  );
}

export default function TicketSection() {
  const router = useRouter();
  const [lotes, setLotes] = useState<LotesData | null>(null);
  const [loading, setLoading] = useState<TicketId | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("/api/lotes")
      .then((r) => r.json())
      .then(setLotes)
      .catch(() => setError(true));
  }, []);

  const handleSelect = (id: TicketId) => {
    if (lotes?.[id]?.esgotado) return;
    setLoading(id);
    router.push(`/checkout?ticket=${id}`);
  };

  return (
    <section id="ingressos" className="px-5 py-12" style={{ backgroundColor: "#fef9ee" }}>
      <h2 className="text-black font-black text-3xl uppercase text-center mb-1">INGRESSOS</h2>

      {/* Badge lote atual */}
      <div className="flex justify-center mb-6">
        {lotes ? (
          <span className="inline-block bg-black text-white font-black text-xs px-4 py-1.5 rounded-full uppercase tracking-widest">
            🔥 LOTE {lotes.completa?.lote ?? 1} — DISPONÍVEL AGORA
          </span>
        ) : (
          <span className="inline-block bg-gray-200 text-gray-400 font-black text-xs px-4 py-1.5 rounded-full uppercase tracking-widest animate-pulse">
            Carregando...
          </span>
        )}
      </div>

      {error && (
        <p className="text-center text-red-500 text-sm font-bold mb-4">
          Erro ao carregar ingressos. Recarregue a página.
        </p>
      )}

      <div className="flex flex-col gap-5 max-w-sm mx-auto">
        {(Object.entries(TICKETS) as [TicketId, typeof TICKETS[TicketId]][]).map(([id, ticket]) => {
          const style = CARD_STYLES[id];
          const labelColor = LABEL_COLORS[id];
          const info = lotes?.[id];
          const esgotado = info?.esgotado ?? false;
          const loteAtual = info?.lote ?? 1;
          const preco = info?.preco ?? ticket.lotePrecos[0];
          const vagasRestantes = info?.vagasRestantes ?? "—";
          const vagasPorLote = info?.vagasPorLote ?? [15, 15, 10];

          return (
            <div key={id}
              className="rounded-3xl overflow-hidden border-2 shadow-[4px_4px_0_0_#000]"
              style={{
                background: style.bg,
                borderColor: esgotado ? "#666" : style.border,
                opacity: esgotado ? 0.7 : 1,
              }}>

              {/* Header */}
              <div className="px-5 pt-5 pb-3">
                <div className="flex justify-between items-start mb-1">
                  <div>
                    <h3 className="text-white font-black text-lg uppercase leading-tight">
                      {ticket.name}
                    </h3>
                    <p className="font-bold text-xs uppercase tracking-wider mt-0.5"
                      style={{ color: labelColor }}>
                      {ticket.subtitle}
                    </p>
                  </div>
                  <div className="text-right">
                    {esgotado ? (
                      <p className="text-red-400 font-black text-lg">ESGOTADO</p>
                    ) : (
                      <>
                        <p className="text-white font-black text-2xl">{formatBRL(preco)}</p>
                        <p className="text-white/60 text-xs">Lote {loteAtual}</p>
                      </>
                    )}
                  </div>
                </div>
                <p className="text-white/80 text-sm font-semibold mt-1">⏰ {ticket.horario}</p>

                {/* Barra de vagas */}
                {!esgotado && info && (
                  <VagasBar
                    restantes={info.vagasRestantes}
                    total={vagasPorLote[loteAtual - 1] ?? 15}
                  />
                )}
              </div>

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

              {/* Progresso dos lotes */}
              <div className="px-5 pb-3">
                <div className="flex gap-2">
                  {ticket.lotePrecos.map((p, i) => {
                    const loteNum = i + 1;
                    const isAtual = loteNum === loteAtual && !esgotado;
                    const isPast = loteNum < loteAtual || esgotado;
                    return (
                      <div key={i}
                        className="flex-1 text-center rounded-xl py-1.5"
                        style={{ background: isAtual ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.05)" }}>
                        <p className="text-xs font-bold"
                          style={{ color: isAtual ? "#fff" : "rgba(255,255,255,0.3)" }}>
                          Lote {loteNum}
                        </p>
                        <p className={`text-xs font-black ${isPast ? "line-through opacity-30" : ""}`}
                          style={{ color: isAtual ? "#fff" : "rgba(255,255,255,0.3)" }}>
                          {formatBRL(p)}
                          {isPast && loteNum < loteAtual ? " ✓" : ""}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Botão */}
              <div className="px-5 pb-5">
                <button
                  onClick={() => handleSelect(id)}
                  disabled={loading !== null || esgotado}
                  className="w-full font-black text-sm py-3.5 rounded-full border-2 border-white/30 uppercase tracking-wider transition-all disabled:cursor-not-allowed hover:opacity-90"
                  style={{
                    background: esgotado ? "#555" : style.btn,
                    color: "#fff",
                  }}>
                  {esgotado
                    ? "ESGOTADO"
                    : loading === id
                    ? "AGUARDE..."
                    : "GARANTIR MINHA VAGA"}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <p className="text-center text-gray-400 text-xs mt-6">
        * Lotes avançam automaticamente conforme as vagas esgotam.
      </p>
    </section>
  );
}
