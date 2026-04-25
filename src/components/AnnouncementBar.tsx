"use client";

export default function AnnouncementBar() {
  const items = [
    "☕ 02 DE MAIO • MC'S CAFE ROOFTOP • UMUARAMA-PR",
    "🧘 06:30 ÀS 11:00",
    "🎁 PRESS KIT PREMIUM INCLUSO",
    "⚡ VAGAS LIMITADAS POR LOTE",
    "☕ 02 DE MAIO • MC'S CAFE ROOFTOP • UMUARAMA-PR",
    "🧘 06:30 ÀS 11:00",
    "🎁 PRESS KIT PREMIUM INCLUSO",
    "⚡ VAGAS LIMITADAS POR LOTE",
  ];

  return (
    <div className="bg-black text-white text-xs font-bold py-2 overflow-hidden">
      <div className="marquee-track">
        {items.concat(items).map((item, i) => (
          <span key={i} className="px-6 whitespace-nowrap">{item}</span>
        ))}
      </div>
    </div>
  );
}
