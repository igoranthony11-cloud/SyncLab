"use client";

import { useSearchParams } from "next/navigation";
import { useRef, useState } from "react";
import Link from "next/link";
import { QRCodeSVG } from "qrcode.react";
import { TICKETS, type TicketId } from "@/lib/stripe";

function formatBRL(cents: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency", currency: "BRL",
  }).format(cents / 100);
}

// Gera ID único por compra baseado nos dados da pessoa
function generateTicketId(name: string, email: string, ticketId: string) {
  const raw = `${name}-${email}-${ticketId}-${Date.now()}`;
  let hash = 0;
  for (let i = 0; i < raw.length; i++) {
    hash = ((hash << 5) - hash) + raw.charCodeAt(i);
    hash |= 0;
  }
  return `YCS25-${Math.abs(hash).toString(36).toUpperCase().slice(0, 8)}`;
}

export default function SuccessClient() {
  const params = useSearchParams();
  const ticketRef = useRef<HTMLDivElement>(null);
  const [downloading, setDownloading] = useState(false);

  const ticketId = params.get("ticket") as TicketId | null;
  const name = params.get("name") ?? "Participante";
  const email = params.get("email") ?? "";
  const ticket = ticketId && TICKETS[ticketId] ? TICKETS[ticketId] : null;

  const ticketCode = generateTicketId(name, email, ticketId ?? "");

  // QR Code encoda dados do ingresso para validação no evento
  const qrData = JSON.stringify({
    id: ticketCode,
    nome: name,
    ingresso: ticket?.name ?? "",
    evento: "Yoga Coffee Sync — Running Gang x SyncLab",
    data: "02/05/2026",
    local: "Rooftop MC's Sobremesas, Umuarama-PR",
    email,
  });

  const handleDownload = async () => {
    if (!ticketRef.current) return;
    setDownloading(true);
    try {
      const html2canvas = (await import("html2canvas")).default;
      const canvas = await html2canvas(ticketRef.current, {
        scale: 3,
        backgroundColor: null,
        useCORS: true,
        logging: false,
      });
      const link = document.createElement("a");
      link.download = `ingresso-wellnessfest-${ticketCode}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    } finally {
      setDownloading(false);
    }
  };

  const TICKET_COLORS: Record<string, { bg: string; accent: string; label: string }> = {
    completa: { bg: "#2e1065", accent: "#7c3aed", label: "#c4b5fd" },
    tapete:   { bg: "#3d1a00", accent: "#b45309", label: "#fcd34d" },
    coffee:   { bg: "#064e3b", accent: "#059669", label: "#6ee7b7" },
  };
  const colors = TICKET_COLORS[ticketId ?? "completa"] ?? TICKET_COLORS.completa;

  return (
    <div className="min-h-screen px-4 py-10 md:py-16" style={{ background: "#1a0a00" }}>

      {/* Confirmação */}
      <div className="max-w-lg mx-auto text-center mb-8">
        <div className="text-5xl mb-3">🎉</div>
        <h1 className="text-white font-black text-2xl md:text-3xl uppercase mb-1"
          style={{ textShadow: "2px 2px 0 rgba(0,0,0,0.5)" }}>
          Compra Confirmada!
        </h1>
        <p className="text-yellow-400 font-bold text-sm">
          Seu ingresso está pronto, {name.split(" ")[0]}!
        </p>
      </div>

      {/* ── INGRESSO ── */}
      <div ref={ticketRef} className="relative max-w-md mx-auto rounded-2xl overflow-hidden select-none"
        style={{ background: colors.bg, fontFamily: "'Courier New', monospace" }}>

        {/* Textura de grão */}
        <div className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
          }} />

        {/* Borda colorida topo */}
        <div className="h-2" style={{ background: colors.accent }} />

        {/* Header do ingresso */}
        <div className="px-6 pt-5 pb-4 flex justify-between items-start">
          <div>
            <p className="text-xs font-bold tracking-widest uppercase mb-0.5"
              style={{ color: colors.label }}>
              YOGA COFFEE SYNC · 02/05/2026
            </p>
            <p className="text-white font-black text-xl uppercase leading-tight">
              {ticket?.name ?? "INGRESSO"}
            </p>
            <p className="text-xs mt-1" style={{ color: colors.label }}>
              Rooftop MC's Sobremesas · Umuarama, PR
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs font-bold" style={{ color: colors.label }}>VALOR</p>
            <p className="text-white font-black text-lg">
              {ticket ? formatBRL(ticket.price) : "—"}
            </p>
          </div>
        </div>

        {/* Linha tracejada com círculos — efeito tear */}
        <div className="relative flex items-center px-0 my-1">
          <div className="w-5 h-5 rounded-full absolute -left-2.5 z-10"
            style={{ background: "#1a0a00" }} />
          <div className="flex-1 border-t-2 border-dashed mx-4"
            style={{ borderColor: colors.accent + "66" }} />
          <div className="w-5 h-5 rounded-full absolute -right-2.5 z-10"
            style={{ background: "#1a0a00" }} />
        </div>

        {/* Corpo do ingresso */}
        <div className="px-6 pt-4 pb-2">
          {/* Participante */}
          <div className="mb-4">
            <p className="text-xs font-bold uppercase tracking-wider mb-1"
              style={{ color: colors.label }}>
              PARTICIPANTE
            </p>
            <p className="text-white font-black text-lg uppercase">{name}</p>
            <p className="text-xs mt-0.5" style={{ color: colors.label }}>{email}</p>
          </div>

          {/* Benefícios */}
          <div className="mb-4">
            <p className="text-xs font-bold uppercase tracking-wider mb-1.5"
              style={{ color: colors.label }}>
              INCLUSO
            </p>
            {ticket?.features.map((f) => (
              <p key={f} className="text-xs text-white/80 mb-0.5">✓ {f}</p>
            ))}
          </div>
        </div>

        {/* Linha tracejada 2 */}
        <div className="relative flex items-center px-0 my-1">
          <div className="w-5 h-5 rounded-full absolute -left-2.5 z-10"
            style={{ background: "#1a0a00" }} />
          <div className="flex-1 border-t-2 border-dashed mx-4"
            style={{ borderColor: colors.accent + "66" }} />
          <div className="w-5 h-5 rounded-full absolute -right-2.5 z-10"
            style={{ background: "#1a0a00" }} />
        </div>

        {/* QR Code + código */}
        <div className="px-6 py-5 flex items-center gap-5">
          <div className="bg-white p-2 rounded-lg flex-shrink-0">
            <QRCodeSVG
              value={qrData}
              size={100}
              level="H"
              fgColor={colors.bg}
              bgColor="#ffffff"
            />
          </div>
          <div className="flex-1">
            <p className="text-xs font-bold uppercase tracking-wider mb-1"
              style={{ color: colors.label }}>
              CÓDIGO DO INGRESSO
            </p>
            <p className="text-white font-black text-base tracking-widest">{ticketCode}</p>
            <p className="text-xs mt-2 leading-relaxed" style={{ color: colors.label }}>
              Apresente este QR Code na entrada do evento para validação.
            </p>
          </div>
        </div>

        {/* Barcode decorativo */}
        <div className="flex justify-center pb-4">
          <svg width="200" height="30" viewBox="0 0 200 30">
            {Array.from({ length: 55 }).map((_, i) => (
              <rect key={i} x={i * 3.6} y={0}
                width={i % 3 === 0 ? 2.5 : 1.5}
                height={i % 5 === 0 ? 30 : 22}
                fill="rgba(255,255,255,0.6)" />
            ))}
          </svg>
        </div>

        {/* Borda colorida base */}
        <div className="h-2" style={{ background: colors.accent }} />
      </div>

      {/* Botão download */}
      <div className="max-w-md mx-auto mt-6 space-y-3">
        <button
          onClick={handleDownload}
          disabled={downloading}
          className="w-full font-black text-sm py-4 rounded-full border-2 uppercase tracking-wider transition-all disabled:opacity-60"
          style={{
            background: colors.accent,
            color: "#fff",
            borderColor: colors.bg,
            boxShadow: `3px 3px 0 ${colors.bg}`,
          }}
        >
          {downloading ? "GERANDO..." : "⬇ BAIXAR INGRESSO (PNG)"}
        </button>

        {/* Próximos passos */}
        <div className="rounded-2xl p-5 border border-yellow-900/40 mt-4"
          style={{ background: "rgba(255,255,255,0.05)" }}>
          <h2 className="font-black text-white text-sm uppercase mb-3">Próximos passos</h2>
          {[
            ["📧", "Confirmação enviada para seu e-mail"],
            ["📅", "02 de Maio de 2026 · Rooftop MC's Sobremesas · Umuarama"],
            ["📦", "Press Kit enviado antes do evento (modalidade completa)"],
            ["📲", "Salve o ingresso no celular e apresente na entrada"],
          ].map(([icon, text]) => (
            <div key={text} className="flex items-start gap-3 mb-2">
              <span className="text-lg flex-shrink-0">{icon}</span>
              <p className="text-xs font-semibold text-yellow-100">{text}</p>
            </div>
          ))}
        </div>

        <Link href="/"
          className="block text-center font-black text-sm py-3 rounded-full border-2 border-yellow-800 text-yellow-400 uppercase tracking-wider hover:bg-yellow-900/20 transition-colors">
          VOLTAR PARA O INÍCIO
        </Link>
      </div>
    </div>
  );
}
