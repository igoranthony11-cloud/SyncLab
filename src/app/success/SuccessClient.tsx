"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { TICKETS, type TicketId } from "@/lib/stripe";

function formatBRL(cents: number) {
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(cents / 100);
}

export default function SuccessClient() {
  const params = useSearchParams();
  const ticketId = params.get("ticket") as TicketId | null;
  const name = params.get("name") ?? "Participante";
  const ticket = ticketId && TICKETS[ticketId] ? TICKETS[ticketId] : null;

  return (
    <div className="max-w-md mx-auto min-h-screen bg-white">
      <div className="bg-purple-500 px-6 py-8 text-center">
        <span className="inline-block bg-yellow-400 text-black font-black text-xs px-4 py-1 rounded-full border-2 border-black mb-4 uppercase tracking-widest">
          WELLNESSFEST
        </span>
        <div className="text-6xl mb-4 float inline-block">🎉</div>
        <h1 className="text-white font-black text-3xl uppercase" style={{ textShadow: "2px 2px 0 #000" }}>
          PAGAMENTO CONFIRMADO!
        </h1>
        <p className="text-yellow-300 font-bold mt-2">Bem-vindo(a) ao WellnessFest, {name}!</p>
      </div>

      <div className="checkerboard" style={{ backgroundImage: "repeating-conic-gradient(#000 0% 25%, #fff 0% 50%)", backgroundSize: "20px 20px", height: "20px" }} />

      <div className="px-6 py-8 space-y-6">
        {ticket && (
          <div className="bg-yellow-400 rounded-2xl p-5 border-2 border-black shadow-[4px_4px_0_0_#000]">
            <p className="font-black text-black text-xs uppercase tracking-widest mb-1">Seu ingresso</p>
            <p className="font-black text-black text-2xl">{ticket.name}</p>
            <p className="font-black text-black text-xl">{formatBRL(ticket.price)}</p>
            <ul className="mt-3 space-y-1">
              {ticket.features.map((f) => (
                <li key={f} className="text-black font-semibold text-sm flex items-center gap-1">
                  <span>✓</span> {f}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="bg-gray-50 rounded-2xl p-5 border-2 border-gray-200 space-y-3">
          <h2 className="font-black text-black text-lg uppercase">Próximos passos</h2>
          {[
            ["📧", "Você receberá um e-mail de confirmação em instantes"],
            ["📅", "Salve a data: 14 e 15 de Junho de 2026"],
            ["📦", "Seu kit wellness será enviado até 10 dias antes do evento"],
            ["📍", "Local: São Paulo — endereço completo no e-mail"],
          ].map(([icon, text]) => (
            <div key={text} className="flex items-start gap-3">
              <span className="text-xl flex-shrink-0">{icon}</span>
              <p className="text-sm font-semibold text-gray-700">{text}</p>
            </div>
          ))}
        </div>

        <Link
          href="/"
          className="block text-center bg-pink-500 text-white font-black text-base py-4 rounded-full border-2 border-black shadow-[3px_3px_0_0_#000] uppercase hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all"
        >
          VOLTAR PARA O INÍCIO
        </Link>
      </div>
    </div>
  );
}
