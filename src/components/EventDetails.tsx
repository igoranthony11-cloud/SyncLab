export default function EventDetails() {
  const speakers = [
    { name: "Ana Costa", role: "Nutricionista Funcional" },
    { name: "Pedro Lima", role: "Coach de Alta Performance" },
    { name: "Mariana Sousa", role: "Especialista em Longevidade" },
  ];

  return (
    <section className="bg-purple-500 px-6 py-12 text-center">
      {/* Badge */}
      <div className="inline-block bg-yellow-400 text-black font-black text-xs px-4 py-1 rounded-full border-2 border-black mb-6 uppercase tracking-widest">
        WELLNESSFEST
      </div>

      <h2 className="text-white font-black text-3xl uppercase mb-2" style={{ textShadow: "2px 2px 0 #000" }}>
        A REVOLUÇÃO DO BEM-ESTAR
      </h2>
      <p className="text-yellow-300 font-bold text-sm mb-8">14 e 15 de Junho · São Paulo · SP</p>

      {/* Speakers */}
      <div className="flex flex-col gap-4 max-w-sm mx-auto">
        {speakers.map((s) => (
          <div key={s.name} className="bg-white/10 rounded-2xl p-4 border border-white/20 text-left">
            <p className="text-white font-black text-base">{s.name}</p>
            <p className="text-yellow-300 text-sm font-semibold">{s.role}</p>
          </div>
        ))}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 max-w-sm mx-auto mt-8">
        {[["2.000+", "Inscritos"], ["20+", "Palestrantes"], ["2", "Dias"]].map(([val, label]) => (
          <div key={label} className="bg-yellow-400 rounded-2xl py-4 border-2 border-black shadow-[3px_3px_0_0_#000]">
            <p className="font-black text-2xl text-black">{val}</p>
            <p className="font-bold text-xs text-black uppercase">{label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
