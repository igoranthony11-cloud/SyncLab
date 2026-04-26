"use client";
import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative w-full flex flex-col items-center justify-end text-center overflow-hidden"
      style={{ minHeight: "100svh" }}>

      {/* Imagem preenchendo 100% sem espaços em branco */}
      <Image
        src="/hero-poster.png"
        alt="Yoga Coffee Sync — 02 de Maio, MC's Cafe Rooftop, Umuarama-PR"
        fill
        className="object-cover object-top"
        priority
      />

      {/* CTA sobreposto na parte inferior */}
      <div className="relative z-10 w-full pb-10 pt-16 px-6 text-center"
        style={{ background: "linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 100%)" }}>
        <Link
          href="#ingressos"
          className="pulse-btn inline-block bg-yellow-600 text-white font-black text-base md:text-lg px-12 py-4 rounded-full border-2 border-yellow-900 uppercase tracking-wider shadow-[3px_3px_0px_0px_rgba(0,0,0,0.5)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all"
        >
          GARANTA SEU INGRESSO
        </Link>
        <p className="mt-3 text-yellow-200/80 text-xs font-semibold">
          ⚡ Vagas limitadas por lote — preço aumenta conforme esgota
        </p>
      </div>
    </section>
  );
}
