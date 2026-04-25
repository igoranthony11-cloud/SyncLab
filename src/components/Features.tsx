export default function Features() {
  const features = [
    { icon: "🥗", label: "Nutrição Funcional" },
    { icon: "🧘", label: "Mente Equilibrada" },
    { icon: "💪", label: "Movimento & Força" },
    { icon: "🌿", label: "Para Todos os Estilos" },
  ];

  return (
    <section style={{ backgroundColor: "#fef9ee" }} className="px-6 pb-10">
      <div className="grid grid-cols-4 gap-3 max-w-sm mx-auto text-center">
        {features.map((f) => (
          <div key={f.label} className="flex flex-col items-center gap-1">
            <span className="text-3xl float">{f.icon}</span>
            <span className="text-black font-black text-xs uppercase leading-tight">{f.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
