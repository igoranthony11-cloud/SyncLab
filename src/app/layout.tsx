import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "WellnessFest 2026 — Transforme sua vida em um fim de semana",
  description:
    "O maior evento de bem-estar do Brasil. Nutrição, mente e movimento em um só lugar. Garanta seu ingresso agora.",
  openGraph: {
    title: "WellnessFest 2026",
    description: "O maior evento de bem-estar do Brasil.",
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
