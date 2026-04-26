import Link from "next/link";

export default function Footer() {
  const navLinks = [
    ["Programação", "#programacao"],
    ["Sobre o Evento", "#sobre"],
    ["Modalidades", "#ingressos"],
    ["Contato", "mailto:contato@synclub.com.br"],
  ];

  return (
    <footer className="bg-white px-6 py-10 md:py-14">
      <div className="max-w-5xl mx-auto">
        {/* Top row */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <div className="mb-1">
              <span className="inline-block bg-black text-white font-black text-xs px-4 py-1 rounded-full tracking-widest">
                YOGA COFFEE SYNC
              </span>
            </div>
            <p className="text-gray-400 text-xs font-semibold">RUNNING GANG × SYNCLAB</p>
          </div>

          {/* Nav links — horizontal on desktop */}
          <div className="flex flex-wrap gap-2 md:gap-4">
            {navLinks.map(([label, href]) => (
              <Link key={label} href={href}
                className="px-4 py-2 text-sm font-bold text-black border border-gray-200 rounded-full hover:bg-yellow-400 hover:border-yellow-400 transition-colors">
                {label}
              </Link>
            ))}
          </div>
        </div>

        <div className="border-t border-gray-100 pt-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-center md:text-left">
          <div>
            <p className="text-xs text-gray-400">
              02 de Maio de 2025 · MC's Cafe Rooftop · Umuarama, PR
            </p>
            <p className="text-xs text-gray-300 mt-1">
              © 2025 Running Gang x SyncLab. Todos os direitos reservados.
            </p>
          </div>

          <div className="flex justify-center md:justify-end gap-5 text-2xl">
            <a href="#" aria-label="Instagram">📸</a>
            <a href="#" aria-label="TikTok">🎵</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
