"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { TICKETS, type TicketId } from "@/lib/stripe";
import Link from "next/link";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

function formatBRL(cents: number) {
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(cents / 100);
}

function DashedLine() {
  return <div className="border-t-2 border-dashed border-gray-400 my-4" />;
}

function DotLeader({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-end gap-1 mb-2">
      <span className="font-receipt text-sm text-gray-800 whitespace-nowrap">{label}</span>
      <span className="flex-1 border-b border-dotted border-gray-400 mb-1 mx-1" />
      <span className="font-receipt text-sm text-gray-800 whitespace-nowrap font-bold">{value}</span>
    </div>
  );
}

function PaymentForm({ ticketId, clientSecret }: { ticketId: TicketId; clientSecret: string }) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const ticket = TICKETS[ticketId];

  // número de recibo fake mas consistente
  const receiptNo = String(Math.floor(Math.random() * 9000) + 1000).padStart(6, "0");
  const now = new Date();
  const dateStr = `${now.toLocaleDateString("pt-BR")} ${now.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    setLoading(true);
    setError(null);

    const { error: submitError } = await elements.submit();
    if (submitError) { setError(submitError.message ?? "Erro"); setLoading(false); return; }

    const { error: confirmError } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: `${window.location.origin}/success?ticket=${ticketId}&name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}`,
        payment_method_data: { billing_details: { name, email } },
      },
    });
    if (confirmError) { setError(confirmError.message ?? "Erro"); setLoading(false); }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Receipt card */}
      <div className="font-receipt bg-[#f5f0e8] border-4 border-red-600 rounded-lg shadow-2xl overflow-hidden mx-auto max-w-sm">

        {/* Topo vermelho */}
        <div className="bg-red-600 px-6 py-3 flex justify-between items-center">
          <span className="text-white font-bold text-xs tracking-widest uppercase">RECEIPT</span>
          <span className="text-white font-bold text-xs tracking-widest">No. {receiptNo}</span>
        </div>

        <div className="px-6 pt-5 pb-2">
          {/* Logo */}
          <div className="text-center mb-1">
            <p className="text-red-600 font-black text-2xl" style={{ fontFamily: "Georgia, serif", fontStyle: "italic" }}>
              Yoga Coffee Sync
            </p>
            <p className="text-xs font-bold tracking-widest text-gray-700">EVENTOS</p>
            <p className="text-xs text-gray-500 mt-1 italic">/Transforme sua vida em um fim de semana/</p>
          </div>

          <DashedLine />
          <p className="text-center text-xs text-gray-600 mb-0">DATE: {dateStr}</p>
          <DashedLine />

          {/* Item */}
          <DotLeader label={ticket.name} value={formatBRL(ticket.price)} />
          <p className="text-xs text-gray-500 mb-2 pl-1">{ticket.description}</p>

          {ticket.features.map((f) => (
            <p key={f} className="text-xs text-gray-600 pl-1">+ {f}</p>
          ))}

          <DashedLine />

          {/* Total */}
          <div className="flex justify-between items-center mb-4">
            <span className="font-black text-lg text-gray-900">TOTAL:</span>
            <span className="font-black text-lg text-gray-900">{formatBRL(ticket.price)}</span>
          </div>

          <DashedLine />

          {/* Campos */}
          <p className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-3">Dados do Comprador</p>

          <input
            required value={name} onChange={(e) => setName(e.target.value)}
            className="w-full bg-transparent border-b-2 border-dashed border-gray-400 font-receipt text-sm py-2 mb-3 focus:outline-none focus:border-red-500 placeholder:text-gray-400"
            placeholder="NOME COMPLETO"
          />
          <input
            required type="email" value={email} onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-transparent border-b-2 border-dashed border-gray-400 font-receipt text-sm py-2 mb-4 focus:outline-none focus:border-red-500 placeholder:text-gray-400"
            placeholder="SEU@EMAIL.COM"
          />

          <DashedLine />

          {/* Stripe */}
          <p className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-3">Pagamento</p>
          <div className="mb-4">
            <PaymentElement options={{ layout: "tabs" }} />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-300 rounded px-3 py-2 text-red-700 text-xs font-semibold mb-4">
              {error}
            </div>
          )}

          {/* Barcode decorativo */}
          <div className="flex justify-center my-4">
            <svg width="200" height="40" viewBox="0 0 200 40">
              {Array.from({ length: 60 }).map((_, i) => (
                <rect
                  key={i}
                  x={i * 3.3}
                  y={0}
                  width={i % 3 === 0 ? 2 : 1}
                  height={i % 5 === 0 ? 40 : 32}
                  fill="#222"
                />
              ))}
            </svg>
          </div>

          {/* Botão */}
          <button
            type="submit" disabled={loading || !stripe}
            className="w-full bg-red-600 text-white font-black font-receipt text-sm py-3 rounded border-2 border-red-800 uppercase tracking-widest hover:bg-red-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed mb-2"
          >
            {loading ? "PROCESSANDO..." : `CONFIRMAR PEDIDO — ${formatBRL(ticket.price)}`}
          </button>

          {/* Thank you */}
          <p className="text-center text-red-600 font-black text-xl mb-1"
            style={{ fontFamily: "Georgia, serif", fontStyle: "italic" }}>
            Thank You!
          </p>

          <p className="text-center text-xs text-gray-400 mb-4 flex items-center justify-center gap-1">
            🔒 Pagamento seguro via Stripe
          </p>
        </div>
      </div>
    </form>
  );
}

export default function CheckoutClient() {
  const params = useSearchParams();
  const router = useRouter();
  const ticketId = params.get("ticket") as TicketId | null;
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!ticketId || !TICKETS[ticketId]) { router.replace("/#ingressos"); return; }
    fetch("/api/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ticketId }),
    })
      .then((r) => r.json())
      .then((d) => { if (d.clientSecret) setClientSecret(d.clientSecret); else setError(d.error); })
      .catch(() => setError("Erro de conexão."));
  }, [ticketId, router]);

  if (!ticketId || !TICKETS[ticketId]) return null;

  return (
    <div className="min-h-screen px-4 py-8" style={{ background: "#1a0a00" }}>
      {/* Header */}
      <div className="max-w-sm mx-auto flex items-center gap-3 mb-6">
        <Link href="/#ingressos" className="text-yellow-500 font-black text-2xl">←</Link>
        <div>
          <p className="text-yellow-600 font-black text-xs uppercase tracking-widest">YOGA COFFEE SYNC</p>
          <h1 className="text-white font-black text-lg uppercase">Finalizar Compra</h1>
        </div>
      </div>

      {error && (
        <div className="max-w-sm mx-auto bg-red-100 border border-red-400 rounded px-4 py-3 text-red-700 text-sm font-semibold mb-4">
          {error}
        </div>
      )}

      {!clientSecret && !error && (
        <div className="text-center py-12 text-yellow-600 font-bold animate-pulse">
          Preparando checkout seguro...
        </div>
      )}

      {clientSecret && (
        <Elements
          stripe={stripePromise}
          options={{
            clientSecret,
            appearance: {
              theme: "flat",
              variables: {
                colorPrimary: "#dc2626",
                fontFamily: "'Courier New', monospace",
                borderRadius: "4px",
                colorBackground: "#f5f0e8",
              },
            },
          }}
        >
          <PaymentForm ticketId={ticketId} clientSecret={clientSecret} />
        </Elements>
      )}
    </div>
  );
}
