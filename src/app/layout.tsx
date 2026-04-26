import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Yoga Coffee Sync — Running Gang x SyncLab | 02/05 Umuarama",
  description:
    "Meditação, yoga e coffee party no MC's Sobremesas. 02 de Maio de 2026, Umuarama-PR. Garanta seu ingresso agora — vagas limitadas por lote.",
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/icon.png",
  },
  openGraph: {
    title: "Yoga Coffee Sync | Running Gang x SyncLab",
    description: "02/05/2026 · MC's Sobremesas · Umuarama, PR",
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
