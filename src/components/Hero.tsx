"use client";
import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="bg-black text-center">
      {/* Poster image — full width, no crop */}
      <div className="w-full">
        <Image
          src="/hero-poster.png"
          alt="Yoga Coffee Sync — 02 de Maio, MC's Cafe Rooftop, Umuarama-PR"
          width={1080}
          height={1350}
          className="w-full h-auto block"
          priority
        />
      </div>

      {/* CTA abaixo da imagem */}
      <div className="bg-black py-8 px-6">
        <Link
          href="#ingressos"
          className="pulse-btn inline-block bg-yellow-600 text-white font-black text-base md:text-lg px-12 py-4 rounded-full border-2 border-yellow-900 uppercase tracking-wider shadow-[3px_3px_0px_0px_rgba(0,0,0,0.5)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all"
        >
          GARANTA SEU INGRESSO
        </Link>
        <p className="mt-3 text-yellow-600 text-xs font-semibold">
          ⚡ Vagas limitadas por lote — preço aumenta conforme esgota
        </p>
      </div>
    </section>
  );
}
