"use client";

import Link from "next/link";

export default function Hero() {
  return (
    <section className="bg-purple-500 px-6 py-12 text-center relative overflow-hidden">
      {/* Logo */}
      <div className="mb-6">
        <span className="inline-block bg-yellow-400 text-black font-black text-lg px-4 py-1 rounded-full border-2 border-black tracking-widest">
          WELLNESSFEST
        </span>
      </div>

      {/* Headline */}
      <h1 className="text-white font-black text-5xl leading-none uppercase mb-2" style={{ textShadow: "3px 3px 0 #000" }}>
        BEM-VINDO
      </h1>
      <h1 className="font-black text-5xl leading-none uppercase mb-6">
        <span className="text-yellow-400" style={{ textShadow: "3px 3px 0 #000" }}>AO </span>
        <span className="text-white" style={{ textShadow: "3px 3px 0 #000" }}>WELLNESSFEST</span>
      </h1>

      {/* Subtext */}
      <div className="bg-yellow-400 rounded-2xl px-6 py-5 max-w-sm mx-auto mb-8">
        <p className="text-black font-bold text-base leading-snug">
          O maior evento de bem-estar do Brasil.
          Nutrição, mente e movimento em um só lugar.
          Garanta seu ingresso com <strong>frete grátis do kit!</strong>
        </p>
      </div>

      {/* CTA */}
      <Link
        href="#ingressos"
        className="pulse-btn inline-block bg-pink-500 text-white font-black text-base px-8 py-4 rounded-full border-2 border-black uppercase tracking-wider shadow-[3px_3px_0px_0px_#000] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all"
      >
        GARANTA SEU INGRESSO
      </Link>

      {/* Social proof */}
      <div className="mt-6 flex items-center justify-center gap-2">
        <div className="flex text-yellow-400 text-xl">★★★★★</div>
        <span className="text-white font-bold text-sm">2.000+ inscritos</span>
      </div>
    </section>
  );
}
