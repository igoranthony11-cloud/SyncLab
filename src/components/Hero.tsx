"use client";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="hero-brown px-6 py-14 md:py-24 text-center relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none"
        style={{ boxShadow: "inset 0 0 80px 30px rgba(0,0,0,0.55)" }} />

      <div className="relative max-w-3xl mx-auto">
        {/* Collab badge */}
        <div className="mb-6">
          <span className="inline-block bg-yellow-600 text-white font-black text-xs px-4 py-1.5 rounded-full border-2 border-yellow-900 tracking-widest uppercase shadow-lg">
            RUNNING GANG × SYNCLAB
          </span>
        </div>

        {/* Headline */}
        <div className="mb-2">
          <h1 className="text-white font-black text-5xl md:text-7xl leading-none uppercase"
            style={{ textShadow: "3px 3px 0 rgba(0,0,0,0.6)" }}>
            YOGA
          </h1>
          <h1 className="font-black text-5xl md:text-7xl leading-none uppercase"
            style={{ textShadow: "3px 3px 0 rgba(0,0,0,0.6)" }}>
            <span className="text-yellow-500">COFFEE </span>
            <span className="text-white">SYNC</span>
          </h1>
        </div>

        <p className="text-yellow-300 font-bold text-sm md:text-base mb-8 tracking-wider">
          02 DE MAIO · MC'S CAFE ROOFTOP · UMUARAMA-PR
        </p>

        {/* Box descrição */}
        <div className="rounded-2xl px-6 py-5 max-w-lg mx-auto mb-8 border border-yellow-800/50"
          style={{ background: "rgba(255,255,255,0.08)", backdropFilter: "blur(4px)" }}>
          <p className="text-yellow-100 font-bold text-base leading-snug">
            Meditação ao amanhecer, yoga no rooftop e coffee party com brunch saudável.
            Uma manhã para <strong className="text-yellow-400">reconectar corpo e mente.</strong>
          </p>
        </div>

        {/* Horários */}
        <div className="flex justify-center gap-8 mb-8">
          {[["06:30", "Meditação + Yoga"], ["08:30", "Coffee Sync"]].map(([h, l]) => (
            <div key={h} className="text-center">
              <p className="text-yellow-400 font-black text-xl md:text-2xl">{h}</p>
              <p className="text-yellow-200 text-xs md:text-sm font-semibold">{l}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <Link href="#ingressos"
          className="pulse-btn inline-block bg-yellow-600 text-white font-black text-base md:text-lg px-10 py-4 rounded-full border-2 border-yellow-900 uppercase tracking-wider shadow-[3px_3px_0px_0px_rgba(0,0,0,0.5)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all">
          GARANTA SEU INGRESSO
        </Link>

        <p className="mt-4 text-yellow-300/70 text-xs font-semibold">
          ⚡ Vagas limitadas por lote — preço aumenta conforme esgota
        </p>
      </div>
    </section>
  );
}
