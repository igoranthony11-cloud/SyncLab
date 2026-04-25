import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white px-6 py-8 text-center">
      <div className="mb-2">
        <span className="inline-block bg-black text-white font-black text-xs px-4 py-1 rounded-full tracking-widest">
          YOGA COFFEE SYNC
        </span>
      </div>
      <p className="text-gray-400 text-xs font-semibold mb-6">RUNNING GANG × SYNCLAB</p>

      <div className="grid grid-cols-2 gap-px border border-gray-200 max-w-sm mx-auto mb-8 rounded-xl overflow-hidden">
        {[
          ["Programação", "#programacao"],
          ["Sobre o Evento", "#sobre"],
          ["Modalidades", "#ingressos"],
          ["Contato", "mailto:contato@synclub.com.br"],
        ].map(([label, href]) => (
          <Link key={label} href={href}
            className="py-4 text-sm font-bold text-black hover:bg-yellow-400 transition-colors border border-gray-200">
            {label}
          </Link>
        ))}
      </div>

      <div className="flex justify-center gap-6 mb-6 text-2xl">
        <a href="#" aria-label="Instagram">📸</a>
        <a href="#" aria-label="TikTok">🎵</a>
      </div>

      <p className="text-xs text-gray-400">
        02 de Maio de 2025 · MC's Cafe Rooftop · Umuarama, PR
      </p>
      <p className="text-xs text-gray-300 mt-1">
        © 2025 Running Gang x SyncLab. Todos os direitos reservados.
      </p>
    </footer>
  );
}
