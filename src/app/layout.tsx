import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "PREMOLSA – Prefabricados de Hormigón | Zaragoza desde 1967",
  description: "Fabricantes de vigas, bovedillas y prefabricados de hormigón en Zaragoza. Más de 55 años de experiencia. Marcado CE. Cálculo de estructuras.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${inter.variable} h-full`}>
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
