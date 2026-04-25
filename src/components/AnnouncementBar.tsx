"use client";

export default function AnnouncementBar() {
  const items = [
    "🌿 14 E 15 DE JUNHO • SÃO PAULO",
    "✨ VAGAS LIMITADAS",
    "🎁 KIT WELLNESS INCLUSO",
    "⭐ +2.000 INSCRITOS",
    "🌿 14 E 15 DE JUNHO • SÃO PAULO",
    "✨ VAGAS LIMITADAS",
    "🎁 KIT WELLNESS INCLUSO",
    "⭐ +2.000 INSCRITOS",
  ];

  return (
    <div className="bg-black text-white text-xs font-bold py-2 overflow-hidden">
      <div className="marquee-track">
        {items.concat(items).map((item, i) => (
          <span key={i} className="px-6 whitespace-nowrap">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
