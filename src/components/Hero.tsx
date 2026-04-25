"use client";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="hero-brown px-6 py-14 text-center relative overflow-hidden">
      {/* Vinheta nas bordas */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ boxShadow: "inset 0 0 80px 30px rgba(0,0,0,0.55)" }} />

      {/* Logo */}
      <div className="relative mb-8">
        <span className="inline-block bg-yellow-600 text-white font-black text-sm px-5 py-1.5 rounded-full border-2 border-yellow-900 tracking-widest uppercase shadow-lg">
          WELLNESSFEST
        </span>
      </div>

      {/* Headline */}
      <div className="relative mb-8">
        <h1 className="text-white font-black text-4xl leading-none uppercase mb-1"
          style={{ textShadow: "3px 3px 0 rgba(0,0,0,0.6)" }}>
          BEM-VINDO
        </h1>
        <h1 className="font-black text-4xl leading-none uppercase"
          style={{ textShadow: "3px 3px 0 rgba(0,0,0,0.6)" }}>
          <span className="text-yellow-500">AO </span>
          <span className="text-white">WELLNESSFEST</span>
        </h1>
      </div>

      {/* Box descrição */}
      <div className="relative rounded-2xl px-6 py-5 max-w-sm mx-auto mb-8 border border-yellow-800/50"
        style={{ background: "rgba(255,255,255,0.08)", backdropFilter: "blur(4px)" }}>
        <p className="text-yellow-100 font-bold text-base leading-snug">
          O maior evento de bem-estar do Brasil.
          Nutrição, mente e movimento em um só lugar.
          Garanta seu ingresso com <strong className="text-yellow-400">frete grátis do kit!</strong>
        </p>
      </div>

      {/* CTA */}
      <div className="relative">
        <Link
          href="#ingressos"
          className="pulse-btn inline-block bg-yellow-600 text-white font-black text-base px-8 py-4 rounded-full border-2 border-yellow-900 uppercase tracking-wider shadow-[3px_3px_0px_0px_rgba(0,0,0,0.5)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all"
        >
          GARANTA SEU INGRESSO
        </Link>
      </div>

      {/* Social proof */}
      <div className="relative mt-6 flex items-center justify-center gap-2">
        <div className="flex text-yellow-500 text-xl">★★★★★</div>
        <span className="text-yellow-200 font-bold text-sm">2.000+ inscritos</span>
      </div>
    </section>
  );
}
