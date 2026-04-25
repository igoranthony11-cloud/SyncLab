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

function PaymentForm({ ticketId, clientSecret }: { ticketId: TicketId; clientSecret: string }) {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const ticket = TICKETS[ticketId];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    setError(null);

    const { error: submitError } = await elements.submit();
    if (submitError) {
      setError(submitError.message ?? "Erro ao processar pagamento");
      setLoading(false);
      return;
    }

    const { error: confirmError } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: `${window.location.origin}/success?ticket=${ticketId}&name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}`,
        payment_method_data: { billing_details: { name, email } },
      },
    });

    if (confirmError) {
      setError(confirmError.message ?? "Erro ao confirmar pagamento");
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Resumo do ingresso */}
      <div className="bg-yellow-400 rounded-2xl p-4 border-2 border-black shadow-[3px_3px_0_0_#000] mb-6">
        <p className="font-black text-black text-sm uppercase">{ticket.name}</p>
        <p className="font-black text-black text-2xl">{formatBRL(ticket.price)}</p>
        <p className="text-black/70 text-xs mt-1">{ticket.description}</p>
      </div>

      {/* Dados do comprador */}
      <div>
        <label className="block text-xs font-black uppercase mb-1 text-gray-700">Nome completo</label>
        <input
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border-2 border-black rounded-xl px-4 py-3 font-semibold text-sm focus:outline-none focus:border-purple-500"
          placeholder="Seu nome"
        />
      </div>
      <div>
        <label className="block text-xs font-black uppercase mb-1 text-gray-700">E-mail</label>
        <input
          required
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border-2 border-black rounded-xl px-4 py-3 font-semibold text-sm focus:outline-none focus:border-purple-500"
          placeholder="seu@email.com"
        />
      </div>

      {/* Stripe Elements */}
      <div>
        <label className="block text-xs font-black uppercase mb-1 text-gray-700">Dados do cartão</label>
        <div className="border-2 border-black rounded-xl p-4">
          <PaymentElement />
        </div>
      </div>

      {error && (
        <div className="bg-red-100 border-2 border-red-400 rounded-xl px-4 py-3 text-red-700 text-sm font-semibold">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={loading || !stripe}
        className="w-full bg-pink-500 text-white font-black text-base py-4 rounded-full border-2 border-black shadow-[3px_3px_0_0_#000] uppercase hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {loading ? "PROCESSANDO..." : `PAGAR ${formatBRL(ticket.price)}`}
      </button>

      <p className="text-center text-xs text-gray-400 flex items-center justify-center gap-1">
        🔒 Pagamento seguro via Stripe
      </p>
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
    if (!ticketId || !TICKETS[ticketId]) {
      router.replace("/#ingressos");
      return;
    }

    fetch("/api/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ticketId }),
    })
      .then((r) => r.json())
      .then((data) => {
        if (data.clientSecret) setClientSecret(data.clientSecret);
        else setError(data.error ?? "Erro ao iniciar pagamento");
      })
      .catch(() => setError("Erro de conexão. Tente novamente."));
  }, [ticketId, router]);

  if (!ticketId || !TICKETS[ticketId]) return null;

  return (
    <div className="max-w-md mx-auto min-h-screen bg-white">
      {/* Header */}
      <div className="bg-purple-500 px-6 py-6 flex items-center gap-4">
        <Link href="/#ingressos" className="text-white font-black text-xl">←</Link>
        <div>
          <span className="text-yellow-400 font-black text-xs uppercase tracking-widest">WELLNESSFEST</span>
          <h1 className="text-white font-black text-xl uppercase">Finalizar Compra</h1>
        </div>
      </div>

      <div className="px-6 py-8">
        {error && (
          <div className="bg-red-100 border-2 border-red-400 rounded-xl px-4 py-3 text-red-700 text-sm font-semibold mb-6">
            {error}
          </div>
        )}

        {!clientSecret && !error && (
          <div className="text-center py-12 text-gray-500 font-bold animate-pulse">
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
                  colorPrimary: "#9333ea",
                  fontFamily: "Arial, sans-serif",
                  borderRadius: "12px",
                },
              },
            }}
          >
            <PaymentForm ticketId={ticketId} clientSecret={clientSecret} />
          </Elements>
        )}
      </div>
    </div>
  );
}
