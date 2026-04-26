"use client";

import { useEffect, useState, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { TICKETS, type TicketId } from "@/lib/stripe";
import Link from "next/link";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const TAXA_PARCELA = 0.025;

function calcularTotal(base: number, parcelas: number) {
  if (parcelas <= 1) return base;
  return Math.round(base * Math.pow(1 + TAXA_PARCELA, parcelas - 1));
}

function formatBRL(cents: number) {
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(cents / 100);
}

function DashedLine() {
  return <div className="border-t-2 border-dashed border-gray-400 my-4" />;
}

function DotLeader({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="flex items-end gap-1 mb-2">
      <span className={`font-receipt text-sm whitespace-nowrap ${highlight ? "font-black text-gray-900" : "text-gray-800"}`}>{label}</span>
      <span className="flex-1 border-b border-dotted border-gray-400 mb-1 mx-1" />
      <span className={`font-receipt text-sm whitespace-nowrap font-bold ${highlight ? "text-red-600" : "text-gray-800"}`}>{value}</span>
    </div>
  );
}

function PaymentForm({
  ticketId, clientSecret, precoBase, precoFinal, parcelas
}: {
  ticketId: TicketId;
  clientSecret: string;
  precoBase: number;
  precoFinal: number;
  parcelas: number;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const ticket = TICKETS[ticketId];

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

  const temJuros = parcelas > 1;
  const valorParcela = Math.ceil(precoFinal / parcelas);

  return (
    <form onSubmit={handleSubmit}>
      <div className="font-receipt bg-[#f5f0e8] border-4 border-red-600 rounded-lg shadow-2xl overflow-hidden mx-auto max-w-md">

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
            <p className="text-xs text-gray-500 mt-1 italic">/Transforme sua manhã/</p>
          </div>

          <DashedLine />
          <p className="text-center text-xs text-gray-600 mb-0">DATE: {dateStr}</p>
          <DashedLine />

          {/* Item */}
          <DotLeader label={ticket.name} value={formatBRL(precoBase)} />
          <p className="text-xs text-gray-500 mb-1 pl-1">{ticket.horario}</p>
          {ticket.features.slice(0, 3).map((f) => (
            <p key={f} className="text-xs text-gray-600 pl-1">+ {f}</p>
          ))}

          <DashedLine />

          {/* Total */}
          {temJuros && (
            <div className="flex justify-between items-center mb-1 text-xs text-gray-500">
              <span>Subtotal</span>
              <span>{formatBRL(precoBase)}</span>
            </div>
          )}
          {temJuros && (
            <div className="flex justify-between items-center mb-1 text-xs text-gray-500">
              <span>Juros ({parcelas - 1}x 2,5%)</span>
              <span>+{formatBRL(precoFinal - precoBase)}</span>
            </div>
          )}
          <DotLeader
            label={`TOTAL${temJuros ? ` (${parcelas}x de ${formatBRL(valorParcela)})` : ""}`}
            value={formatBRL(precoFinal)}
            highlight
          />

          <DashedLine />

          {/* Dados do comprador */}
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

          {/* Pagamento */}
          <p className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-3">Pagamento</p>
          <div className="mb-4">
            <PaymentElement options={{ layout: "tabs" }} />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-300 rounded px-3 py-2 text-red-700 text-xs font-semibold mb-4">
              {error}
            </div>
          )}

          {/* Aviso PIX */}
          <div className="bg-green-50 border border-green-200 rounded px-3 py-2 mb-4 text-xs text-green-800 font-semibold">
            ⚡ PIX aprovado na hora · Cartão aceita parcelamento
          </div>

          {/* Barcode */}
          <div className="flex justify-center my-4">
            <svg width="200" height="40" viewBox="0 0 200 40">
              {Array.from({ length: 60 }).map((_, i) => (
                <rect key={i} x={i * 3.3} y={0} width={i % 3 === 0 ? 2 : 1} height={i % 5 === 0 ? 40 : 32} fill="#222" />
              ))}
            </svg>
          </div>

          {/* Botão */}
          <button
            type="submit" disabled={loading || !stripe}
            className="w-full bg-red-600 text-white font-black font-receipt text-sm py-3 rounded border-2 border-red-800 uppercase tracking-widest hover:bg-red-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed mb-2"
          >
            {loading ? "PROCESSANDO..." : `CONFIRMAR — ${formatBRL(precoFinal)}`}
          </button>

          <p className="text-center text-red-600 font-black text-xl mb-1" style={{ fontFamily: "Georgia, serif", fontStyle: "italic" }}>
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
  const [precoBase, setPrecoBase] = useState(0);
  const [precoFinal, setPrecoFinal] = useState(0);
  const [parcelas, setParcelas] = useState(1);
  const [parcelesSelecionadas, setParcelesSelecionadas] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const [loadingIntent, setLoadingIntent] = useState(false);

  const ticket = ticketId && TICKETS[ticketId] ? TICKETS[ticketId] : null;

  const criarIntent = useCallback((numParcelas: number) => {
    if (!ticketId || !ticket) return;
    setLoadingIntent(true);
    setClientSecret(null);
    setError(null);
    fetch("/api/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ticketId, parcelas: numParcelas }),
    })
      .then((r) => r.json())
      .then((d) => {
        if (d.clientSecret) {
          setClientSecret(d.clientSecret);
          setPrecoBase(d.precoBase);
          setPrecoFinal(d.precoFinal);
          setParcelas(d.parcelas);
        } else {
          setError(d.error);
        }
      })
      .catch(() => setError("Erro de conexão."))
      .finally(() => setLoadingIntent(false));
  }, [ticketId, ticket]);

  useEffect(() => {
    if (!ticketId || !TICKETS[ticketId]) { router.replace("/#ingressos"); return; }
    criarIntent(1);
  }, [ticketId, router, criarIntent]);

  if (!ticketId || !ticket) return null;

  // Opções de parcelamento disponíveis baseado no preço
  const precoOriginal = ticket.price;
  const opcoesParcelamento = [1, 2, 3, 4, 6, 10, 12].filter(n => {
    const valorParcela = Math.ceil(calcularTotal(precoOriginal, n) / n);
    return valorParcela >= 500; // mínimo R$5 por parcela
  });

  const handleParcelasChange = (n: number) => {
    setParcelesSelecionadas(n);
    criarIntent(n);
  };

  return (
    <div className="min-h-screen px-4 py-8 md:py-12" style={{ background: "#1a0a00" }}>
      {/* Header */}
      <div className="max-w-md mx-auto flex items-center gap-3 mb-6">
        <Link href="/#ingressos" className="text-yellow-500 font-black text-2xl">←</Link>
        <div>
          <p className="text-yellow-600 font-black text-xs uppercase tracking-widest">YOGA COFFEE SYNC</p>
          <h1 className="text-white font-black text-lg uppercase">Finalizar Compra</h1>
        </div>
      </div>

      {/* Seletor de parcelamento */}
      <div className="max-w-md mx-auto mb-6">
        <p className="text-yellow-400 font-black text-xs uppercase tracking-widest mb-2">Forma de pagamento</p>
        <div className="grid grid-cols-2 gap-2">
          {opcoesParcelamento.map((n) => {
            const total = calcularTotal(precoOriginal, n);
            const porParcela = Math.ceil(total / n);
            const temJuros = n > 1;
            const ativo = parcelesSelecionadas === n;
            return (
              <button
                key={n}
                onClick={() => handleParcelasChange(n)}
                className="rounded-xl px-3 py-2.5 text-left border-2 transition-all"
                style={{
                  background: ativo ? "#b45309" : "rgba(255,255,255,0.05)",
                  borderColor: ativo ? "#fcd34d" : "rgba(255,255,255,0.1)",
                }}
              >
                <p className="text-white font-black text-sm">
                  {n === 1 ? "1x à vista" : `${n}x de ${formatBRL(porParcela)}`}
                </p>
                <p className="text-xs mt-0.5" style={{ color: ativo ? "#fef9c3" : "rgba(255,255,255,0.4)" }}>
                  {temJuros ? `Total: ${formatBRL(total)} · juros de 2,5%/parcela` : `${formatBRL(total)} · sem juros`}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {error && (
        <div className="max-w-md mx-auto bg-red-100 border border-red-400 rounded px-4 py-3 text-red-700 text-sm font-semibold mb-4">
          {error}
        </div>
      )}

      {(loadingIntent || (!clientSecret && !error)) && (
        <div className="text-center py-12 text-yellow-600 font-bold animate-pulse">
          Preparando checkout seguro...
        </div>
      )}

      {clientSecret && !loadingIntent && (
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
          <PaymentForm
            ticketId={ticketId}
            clientSecret={clientSecret}
            precoBase={precoBase}
            precoFinal={precoFinal}
            parcelas={parcelas}
          />
        </Elements>
      )}
    </div>
  );
}
