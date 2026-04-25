import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white px-6 py-8 text-center">
      {/* Logo */}
      <div className="mb-6">
        <span className="inline-block bg-black text-white font-black text-sm px-4 py-1 rounded-full tracking-widest">
          WELLNESSFEST
        </span>
      </div>

      {/* Nav grid */}
      <div className="grid grid-cols-2 gap-px border border-gray-200 max-w-sm mx-auto mb-8 rounded-xl overflow-hidden">
        {[["Ver Programação", "#programacao"], ["Sobre o Evento", "#sobre"], ["Palestrantes", "#palestrantes"], ["Contato", "mailto:contato@wellnessfest.com.br"]].map(
          ([label, href]) => (
            <Link
              key={label}
              href={href}
              className="py-4 text-sm font-bold text-black hover:bg-yellow-400 transition-colors border-gray-200 border"
            >
              {label}
            </Link>
          )
        )}
      </div>

      {/* Social */}
      <div className="flex justify-center gap-6 mb-6 text-2xl">
        <a href="#" aria-label="Instagram">📸</a>
        <a href="#" aria-label="TikTok">🎵</a>
        <a href="#" aria-label="YouTube">▶️</a>
      </div>

      <p className="text-xs text-gray-400">
        Não quer mais receber nossos e-mails?{" "}
        <Link href="#" className="underline">Descadastre-se</Link>
      </p>
      <p className="text-xs text-gray-300 mt-2">© 2026 WellnessFest. Todos os direitos reservados.</p>
    </footer>
  );
}
