export default function EventDetails() {
  const programacao = [
    { hora: "06:30", item: "Reset — respiração e consciência corporal" },
    { hora: "07:30", item: "Sessão de yoga guiada (60 min)" },
    { hora: "08:30", item: "Imersão corpo e mente — alongamento profundo" },
    { hora: "09:00", item: "Coffee Sync — open coffee espresso + música + energia" },
    { hora: "10:30/11:00", item: "Encerramento" },
  ];

  return (
    <section className="hero-brown px-6 py-12 md:py-20 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none"
        style={{ boxShadow: "inset 0 0 60px 20px rgba(0,0,0,0.5)" }} />

      <div className="relative max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8 md:mb-10">
          <div className="inline-block bg-yellow-600 text-white font-black text-xs px-4 py-1 rounded-full border-2 border-yellow-900 mb-4 uppercase tracking-widest">
            RUNNING GANG × SYNCLAB
          </div>
          <h2 className="text-white font-black text-3xl md:text-5xl uppercase mb-1"
            style={{ textShadow: "2px 2px 0 rgba(0,0,0,0.5)" }}>
            YOGA COFFEE SYNC
          </h2>
          <p className="text-yellow-400 font-bold text-sm md:text-base mb-1">
            02 de Maio de 2026 · Sábado
          </p>
          <p className="text-yellow-200/80 font-semibold text-sm">
            📍 Rooftop MC's Sobremesas · Umuarama, PR
          </p>
        </div>

        {/* Desktop: 2 cols | Mobile: stacked */}
        <div className="flex flex-col md:flex-row gap-10 md:gap-16">
          {/* Programação */}
          <div className="flex-1">
            <p className="text-yellow-400 font-black text-xs uppercase tracking-widest mb-4">
              Programação
            </p>
            {programacao.map((p, i) => (
              <div key={i} className="flex items-start gap-4 mb-3 border-b border-white/10 pb-3 last:border-0">
                <span className="text-yellow-500 font-black text-sm w-12 flex-shrink-0">{p.hora}</span>
                <span className="text-white font-semibold text-sm">{p.item}</span>
              </div>
            ))}
          </div>

          {/* Stats + Info */}
          <div className="md:w-64 flex-shrink-0">
            <p className="text-yellow-400 font-black text-xs uppercase tracking-widest mb-4">
              O Evento
            </p>
            <div className="grid grid-cols-3 gap-3 mb-6">
              {[
                { val: "165", label: "Vagas" },
                { val: "3", label: "Opções" },
                { val: "1", label: "Manhã" },
              ].map(({ val, label }) => (
                <div key={label} className="bg-yellow-600 rounded-2xl py-4 px-2 text-center border-2 border-yellow-900 shadow-[3px_3px_0_0_rgba(0,0,0,0.4)]">
                  <p className="font-black text-2xl text-white leading-none">{val}</p>
                  <p className="font-bold text-[11px] text-yellow-100 uppercase leading-none mt-1.5 whitespace-nowrap">{label}</p>
                </div>
              ))}
            </div>

            {/* Highlights */}
            <div className="space-y-2">
              {["🧘 Yoga no rooftop ao amanhecer", "☕ Coffee party com brunch saudável", "🎁 Press kit premium exclusivo", "🤝 Ativações de parceiros"].map((item) => (
                <div key={item} className="flex items-center gap-2 text-yellow-100 text-sm font-semibold">
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
