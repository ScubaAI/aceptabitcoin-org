import type { Metadata } from "next";
import { Inter, Space_Grotesk, VT323 } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "sonner";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

// Nueva fuente estilo Retro Arcade para la sección de Aprende
const vt323 = VT323({
  subsets: ["latin"],
  variable: "--font-vt323",
  display: "swap",
  weight: ["400"],
});


export const metadata: Metadata = {
  title: "Acepta Bitcoin México",
  description: "Educación, tiendas y adopción real de Bitcoin desde Mérida, Yucatán",
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="dark">
      <body
        className={cn(
          inter.variable,
          spaceGrotesk.variable,
          vt323.variable, // Agregamos la variable de la fuente arcade
          "bg-background text-foreground antialiased font-sans min-h-screen"
        )}
      >
        {children}
        <Toaster position="top-center" richColors closeButton />
      </body>
    </html>
  );
}