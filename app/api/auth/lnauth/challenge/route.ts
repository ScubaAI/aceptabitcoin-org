/**
 * @file app/api/auth/lnauth/challenge/route.ts
 * @description Genera un challenge LNURL-Auth para autenticación soberana.
 * 
 * @fix Vercel build error: ENOENT scandir 'backends'
 * Reemplazamos la librería 'lnurl' (que tiene un bug en serverless) 
 * por una implementación manual con 'bech32'.
 * 
 * @see https://github.com/lnurl/luds/blob/luds/16.md
 * @see https://github.com/fiatjaf/lnurl-rfc/blob/master/lnurl-spec.md
 */

import { NextResponse } from "next/server";
import { headers } from "next/headers";
import crypto from "node:crypto";
import { bech32 } from "bech32"; // ✅ Librería ligera y confiable

const CHALLENGE_EXPIRATION = 300000; // 5 minutos

// Map global para sobrevivir a hot-reloads en desarrollo
(globalThis as any).lnAuthChallenges = (globalThis as any).lnAuthChallenges || new Map<string, { createdAt: number }>();
const challenges = (globalThis as any).lnAuthChallenges as Map<string, { createdAt: number }>;

export const dynamic = "force-dynamic";

/**
 * @function encodeLnurl
 * @description Codifica una URL en formato LNURL (Bech32 con prefix "lnurl")
 * @param {string} url - La URL a codificar
 * @returns {string} - El LNURL codificado en mayúsculas (estándar)
 */
function encodeLnurl(url: string): string {
  // 1. Convertir la URL a bytes UTF-8
  const urlBytes = new TextEncoder().encode(url);
  
  // 2. Convertir bytes a palabras de 5 bits (requerido por Bech32)
  const words = bech32.toWords(urlBytes);
  
  // 3. Codificar con prefix "lnurl"
  const encoded = bech32.encode("lnurl", words, 1023);
  
  // 4. LNURL estándar usa mayúsculas
  return encoded.toUpperCase();
}

/**
 * @route GET /api/auth/lnauth/challenge
 * @description Genera un challenge LNURL-Auth para autenticación soberana
 */
export async function GET() {
  try {
    // 1. Generar un k1 (challenge criptográfico) de 32 bytes
    const k1 = crypto.randomBytes(32).toString("hex");

    // 2. Guardar en memoria con timestamp
    challenges.set(k1, { createdAt: Date.now() });

    // Limpiar challenges expirados
    const now = Date.now();
    for (const [key, value] of challenges.entries()) {
      if (now - value.createdAt > CHALLENGE_EXPIRATION) {
        challenges.delete(key);
      }
    }

    // 3. Construir la URL de callback DINÁMICAMENTE
    const headersList = headers();
    const host = headersList.get("host") || process.env.NEXT_PUBLIC_APP_URL?.replace(/^https?:\/\//, "") || "aceptabitcoin.org";
    const protocol = host.includes("localhost") ? "http" : "https";
    
    const callbackUrl = new URL(`${protocol}://${host}/api/auth/lnauth/verify`);
    callbackUrl.searchParams.set("k1", k1);
    callbackUrl.searchParams.set("action", "login");
    callbackUrl.searchParams.set("tag", "login");

    // 4. Codificar a LNURL usando nuestra implementación manual
    const encodedLnurl = encodeLnurl(callbackUrl.toString());

    return NextResponse.json({
      k1,
      lnurl: encodedLnurl,
    });
  } catch (error) {
    console.error("🔴 [LNAuth Challenge] Error detallado:", error);
    
    return NextResponse.json(
      { 
        status: "ERROR", 
        reason: "Fallo interno del nodo de autenticación" 
      },
      { status: 500 }
    );
  }
}