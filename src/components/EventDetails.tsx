export default function EventDetails() {
  const speakers = [
    { name: "Ana Costa", role: "Nutricionista Funcional" },
    { name: "Pedro Lima", role: "Coach de Alta Performance" },
    { name: "Mariana Sousa", role: "Especialista em Longevidade" },
  ];

  return (
    <section className="hero-brown px-6 py-12 text-center relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none"
        style={{ boxShadow: "inset 0 0 60px 20px rgba(0,0,0,0.5)" }} />

      <div className="relative">
        <div className="inline-block bg-yellow-600 text-white font-black text-xs px-4 py-1 rounded-full border-2 border-yellow-900 mb-6 uppercase tracking-widest">
          WELLNESSFEST
        </div>

        <h2 className="text-white font-black text-3xl uppercase mb-2"
          style={{ textShadow: "2px 2px 0 rgba(0,0,0,0.5)" }}>
          A REVOLUÇÃO DO BEM-ESTAR
        </h2>
        <p className="text-yellow-400 font-bold text-sm mb-8">14 e 15 de Junho · São Paulo · SP</p>

        <div className="flex flex-col gap-4 max-w-sm mx-auto">
          {speakers.map((s) => (
            <div key={s.name}
              className="rounded-2xl p-4 text-left border border-yellow-800/40"
              style={{ background: "rgba(255,255,255,0.07)", backdropFilter: "blur(4px)" }}>
              <p className="text-white font-black text-base">{s.name}</p>
              <p className="text-yellow-400 text-sm font-semibold">{s.role}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-4 max-w-sm mx-auto mt-8">
          {[["2.000+", "Inscritos"], ["20+", "Palestrantes"], ["2", "Dias"]].map(([val, label]) => (
            <div key={label} className="bg-yellow-600 rounded-2xl py-4 border-2 border-yellow-900 shadow-[3px_3px_0_0_rgba(0,0,0,0.4)]">
              <p className="font-black text-2xl text-white">{val}</p>
              <p className="font-bold text-xs text-yellow-100 uppercase">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
