import type { Metadata } from "next";
import { IBM_Plex_Serif, Fira_Code, VT323 } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "sonner";

// 1. Títulos: IBM Plex Serif (Con "patillas", Estilo Bank/Periódico Futurista)
const ibmPlex = IBM_Plex_Serif({
  subsets: ["latin"],
  variable: "--font-ibm-plex",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

// 2. Cuerpo / Código: Fira Code (Monospace, Estilo Hacker/Terminal)
const firaCode = Fira_Code({
  subsets: ["latin"],
  variable: "--font-fira-code",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

// 3. Arcade: VT323 (Para botones y detalles retro)
const vt323 = VT323({
  subsets: ["latin"],
  variable: "--font-vt323",
  display: "swap",
  weight: ["400"],
});

// ── Analytics Domain ──
// Using NEXT_PUBLIC_APP_URL from environment or fallback
const analyticsDomain = process.env.NEXT_PUBLIC_APP_URL?.replace(/^https?:\/\//, "") || "aceptabitcoin.org";

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
  // Only load analytics in production
  const isProduction = process.env.NODE_ENV === "production";

  return (
    <html lang="es" className="dark">
      <head>
        {/* ── Plausible Analytics ──
            Privacy-first analytics with no cookies, no fingerprinting.
            Aligns with Bitcoin privacy philosophy:
            - No personal data collection
            - No cross-site tracking
            - No cookies or localStorage
            - Respects Do Not Track (DNT)
            - Data is aggregated and anonymized
            - Open source & EU GDPR compliant
        */}
        {isProduction && (
          <script
            defer
            data-domain={analyticsDomain}
            src="https://plausible.io/js/script.js"
          />
        )}
      </head>
      <body
        className={cn(
          ibmPlex.variable,
          firaCode.variable,
          vt323.variable,
          "bg-black text-white antialiased min-h-screen selection:bg-bitcoin selection:text-black"
        )}
      >
        {children}
        <Toaster position="top-center" richColors closeButton />
      </body>
    </html>
  );
}