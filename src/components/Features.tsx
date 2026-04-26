export default function Features() {
  const features = [
    { icon: "🧘", label: "Yoga Guiada" },
    { icon: "☕", label: "Coffee Party" },
    { icon: "🌅", label: "Ao Amanhecer" },
    { icon: "🎁", label: "Press Kit" },
  ];

  return (
    <section style={{ backgroundColor: "#fef9ee" }} className="px-6 py-8 md:py-10">
      <div className="grid grid-cols-4 gap-4 md:gap-8 max-w-2xl mx-auto text-center">
        {features.map((f) => (
          <div key={f.label} className="flex flex-col items-center gap-1.5">
            <span className="text-3xl md:text-4xl float">{f.icon}</span>
            <span className="text-black font-black text-xs md:text-sm uppercase leading-tight">{f.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
