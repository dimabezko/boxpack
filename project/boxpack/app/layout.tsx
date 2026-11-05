import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BOXPACK — автоматизированный фулфилмент",
  description: "Автоматизированная упаковка, видеоконтроль, хранение, сборка и доставка заказов на маркетплейсы.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
