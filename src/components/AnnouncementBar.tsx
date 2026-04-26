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
    <div className="bg-black text-white overflow-hidden flex flex-col justify-end" style={{ height: "96px" }}>
      <div className="marquee-track pb-3">
        {items.concat(items).map((item, i) => (
          <span key={i} className="px-6 whitespace-nowrap text-xs font-bold">{item}</span>
        ))}
      </div>
    </div>
  );
}
