"use client";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative w-full overflow-hidden" style={{ lineHeight: 0 }}>

      {/* Mobile: retrato | Desktop: paisagem */}
      <picture>
        <source media="(min-width: 768px)" srcSet="/hero-poster-desktop.png" />
        <source media="(max-width: 767px)" srcSet="/hero-poster-mobile.png" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/hero-poster-mobile.png"
          alt="Yoga Coffee Sync — 02 de Maio, MC's Sobremesas, Umuarama-PR"
          className="block w-full hero-img"
          style={{
            height: "100svh",
            objectFit: "cover",
            objectPosition: "top center",
          }}
        />
      </picture>

      {/* CTA fixado na parte inferior sobre gradiente */}
      <div className="absolute bottom-0 left-0 right-0 z-10 pb-10 pt-16 px-6 text-center"
        style={{ background: "linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 100%)" }}>
        <Link
          href="#ingressos"
          className="pulse-btn inline-block bg-yellow-600 text-white font-black text-base md:text-lg px-12 py-4 rounded-full border-2 border-yellow-900 uppercase tracking-wider shadow-[3px_3px_0px_0px_rgba(0,0,0,0.5)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all"
        >
          GARANTA SEU INGRESSO
        </Link>
        <p className="mt-3 text-yellow-200/80 text-xs font-semibold">
          ⚡ Vagas limitadas por lote<br />preço aumenta conforme esgota
        </p>
      </div>
    </section>
  );
}
