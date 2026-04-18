import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "sonner";

// 1. Tipografía: Inter para cuerpo, Space Grotesk para títulos
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter", // Renombrado para ser específico
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Acepta Bitcoin México",
  description: "Directorio de negocios y educación Bitcoin en Yucatán, México",
  icons: { icon: "/favicon.ico" }, // Asegúrate de tener un favicon
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="dark">
      <body className={cn(
        // 2. Variables de fuente
        inter.variable,
        spaceGrotesk.variable,
        // 3. Estilos base de Tailwind (Fondo y Texto de globals.css)
        "bg-background text-foreground antialiased font-sans"
      )}>
        {children}
        {/* Notificaiones flotantes estilizadas */}
        <Toaster position="top-center" richColors closeButton />
      </body>
    </html>
  );
}