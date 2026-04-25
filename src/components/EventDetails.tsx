export default function EventDetails() {
  const programacao = [
    { hora: "06:30", item: "Abertura dos portões" },
    { hora: "06:30", item: "Meditação guiada ao amanhecer" },
    { hora: "07:00", item: "Sessão de yoga guiada (60 min)" },
    { hora: "08:30", item: "Coffee Sync: coffee party + brunch saudável" },
    { hora: "09:00", item: "Ativações exclusivas de parceiros" },
    { hora: "11:00", item: "Encerramento" },
  ];

  return (
    <section className="hero-brown px-6 py-12 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none"
        style={{ boxShadow: "inset 0 0 60px 20px rgba(0,0,0,0.5)" }} />

      <div className="relative max-w-sm mx-auto">
        <div className="inline-block bg-yellow-600 text-white font-black text-xs px-4 py-1 rounded-full border-2 border-yellow-900 mb-6 uppercase tracking-widest">
          RUNNING GANG × SYNCLAB
        </div>

        <h2 className="text-white font-black text-3xl uppercase mb-1"
          style={{ textShadow: "2px 2px 0 rgba(0,0,0,0.5)" }}>
          YOGA COFFEE SYNC
        </h2>
        <p className="text-yellow-400 font-bold text-sm mb-2">
          02 de Maio de 2025 · Sexta-feira
        </p>
        <p className="text-yellow-200/80 font-semibold text-sm mb-8">
          📍 MC's Cafe Rooftop · Umuarama, PR
        </p>

        {/* Programação */}
        <div className="mb-8">
          <p className="text-yellow-400 font-black text-xs uppercase tracking-widest mb-4">
            Programação
          </p>
          {programacao.map((p, i) => (
            <div key={i} className="flex items-start gap-4 mb-3">
              <span className="text-yellow-500 font-black text-sm w-12 flex-shrink-0">{p.hora}</span>
              <span className="text-white font-semibold text-sm">{p.item}</span>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          {[["165", "Vagas Total"], ["3", "Modalidades"], ["1 manhã", "Para mudar tudo"]].map(([val, label]) => (
            <div key={label} className="bg-yellow-600 rounded-2xl py-4 px-2 text-center border-2 border-yellow-900 shadow-[3px_3px_0_0_rgba(0,0,0,0.4)]">
              <p className="font-black text-xl text-white leading-tight">{val}</p>
              <p className="font-bold text-xs text-yellow-100 uppercase leading-tight mt-1">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
