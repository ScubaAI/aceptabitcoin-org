import type { Metadata } from "next";
import { Ubuntu, Fira_Code, VT323 } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "sonner";

// 1. Tipografía Principal: Ubuntu (Estilo Bank/Tech/Futurista)
const ubuntu = Ubuntu({
  subsets: ["latin"],
  variable: "--font-ubuntu",
  display: "swap",
  weight: ["300", "400", "500", "700"],
});

// 2. Tipografía Secundaria/Código: Fira Code (Estilo Cypherpunk/Hacker)
const firaCode = Fira_Code({
  subsets: ["latin"],
  variable: "--font-fira-code",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

// Mantenemos VT323 para el botón Arcade (Aprobado previamente)
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
          ubuntu.variable,
          firaCode.variable,
          vt323.variable,
          // Nota: Eliminamos 'font-sans' por defecto para forzar el uso de nuestras variables específicas
          "bg-background text-foreground antialiased min-h-screen selection:bg-bitcoin selection:text-black"
        )}
      >
        {children}
        <Toaster position="top-center" richColors closeButton />
      </body>
    </html>
  );
}