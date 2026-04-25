import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Yoga Coffee Sync — Running Gang x SyncLab | 02/05 Umuarama",
  description:
    "Meditação, yoga e coffee party no rooftop do MC's Cafe. 02 de Maio de 2025, Umuarama-PR. Garanta seu ingresso agora — vagas limitadas por lote.",
  openGraph: {
    title: "Yoga Coffee Sync | Running Gang x SyncLab",
    description: "02/05/2025 · MC's Cafe Rooftop · Umuarama, PR",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
