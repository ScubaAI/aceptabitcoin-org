// app/api/auth/lnauth/challenge/route.ts
import { NextResponse } from "next/server";
import crypto from "crypto";

// Usamos un Map global para que la caché sobreviva a los hot-reloads en desarrollo
(globalThis as any).lnAuthChallenges = (globalThis as any).lnAuthChallenges || new Map<string, { createdAt: number }>();
const challenges = (globalThis as any).lnAuthChallenges as Map<string, { createdAt: number }>;

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    // 1. Generar un k1 (challenge criptográfico) de 32 bytes
    const k1 = crypto.randomBytes(32).toString("hex");

    // 2. Guardar en memoria con timestamp (expira en 5 minutos)
    challenges.set(k1, { createdAt: Date.now() });

    // Limpiar challenges expirados (5 minutos = 300000 ms)
    const now = Date.now();
    for (const [key, value] of challenges.entries()) {
      if (now - value.createdAt > 300000) {
        challenges.delete(key);
      }
    }

    // 3. Construir el LNURL-Auth
    // Formato: LNURL1<bech32-encoded-data>
    // La data contiene: service, k1, action=login
    const domain = "aceptabitcoin.org"; // Cambia esto si usas otro dominio o ngrok en dev
    const url = new URL("https://" + domain);
    url.searchParams.set("k1", k1);
    url.searchParams.set("action", "login");
    url.searchParams.set("tag", "login");

    // Codificar a LNURL (Bech32). Usaremos la librería 'lnurl'
    const { encode } = await import("lnurl");
    const encodedLnurl = encode(url.toString());

    return NextResponse.json({
      k1,
      lnurl: encodedLnurl,
    });
  } catch (error) {
    console.error("Error generando challenge LnAuth:", error);
    return NextResponse.json(
      { status: "ERROR", reason: "Internal Server Error" },
      { status: 500 }
    );
  }
}
