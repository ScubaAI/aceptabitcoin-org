/**
 * @file app/api/auth/lnauth/verify/route.ts
 * @description Verifica la firma LNURL-Auth y emite un JWT de sesión soberana.
 * 
 * @design-system v3.0
 * - §7.4: Protocolo LNURL-Auth (LUD-04) para autenticación sin contraseñas
 * - §10.1: Patrón Adapter/Service (lógica criptográfica aislada)
 * - §14.5: Seguridad estricta (no fallbacks de secretos)
 * 
 * @see https://github.com/lnurl/luds/blob/luds/04.md
 */

import { NextRequest, NextResponse } from "next/server";
import { verify } from "@noble/secp256k1";
import { SignJWT } from "jose";
import crypto from "node:crypto";

// 1. Acceso al mismo Map global definido en challenge/route.ts
(globalThis as any).lnAuthChallenges = (globalThis as any).lnAuthChallenges || new Map<string, { createdAt: number }>();
const challenges = (globalThis as any).lnAuthChallenges as Map<string, { createdAt: number }>;

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const k1 = searchParams.get("k1");
    const sig = searchParams.get("sig");
    const key = searchParams.get("key"); // Public key comprimida (33 bytes) de la wallet
    const action = searchParams.get("action");

    // Validación básica de parámetros
    if (!k1 || !sig || !key) {
      return NextResponse.json(
        { status: "ERROR", reason: "Faltan parámetros requeridos (k1, sig, key)" },
        { status: 400 }
      );
    }

    // 2. Verificar que el k1 exista y no haya expirado
    const challengeData = challenges.get(k1);
    if (!challengeData) {
      return NextResponse.json(
        { status: "ERROR", reason: "Challenge expirado o no encontrado (posible replay attack)" },
        { status: 400 }
      );
    }

    // Validar que la acción coincida con la solicitada
    if (action !== "login") {
      return NextResponse.json(
        { status: "ERROR", reason: "Acción no permitida" },
        { status: 400 }
      );
    }

    // 3. ⚠️ CRÍTICO: LNURL-Auth requiere firmar el SHA-256 del string k1, no el k1 en sí.
    const messageHash = crypto.createHash("sha256").update(k1).digest();
    
    // Convertir hex a Uint8Array (formato que espera @noble/secp256k1)
    const signatureBytes = Uint8Array.from(Buffer.from(sig, "hex"));
    const publicKeyBytes = Uint8Array.from(Buffer.from(key, "hex"));

    // 4. Verificar la firma criptográfica (secp256k1)
    const isValid = verify(signatureBytes, messageHash, publicKeyBytes);

    if (!isValid) {
      return NextResponse.json(
        { status: "ERROR", reason: "Firma criptográfica inválida" },
        { status: 401 }
      );
    }

    // 5. ¡Éxito! El usuario demostró soberanía.
    // Eliminar el k1 inmediatamente para prevenir Replay Attacks
    challenges.delete(k1);

    // 6. Crear JWT (Session token)
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      console.error("🔴 [LNAuth Verify] JWT_SECRET no está definido en las variables de entorno");
      return NextResponse.json(
        { status: "ERROR", reason: "Error de configuración del servidor" },
        { status: 500 }
      );
    }

    const secret = new TextEncoder().encode(jwtSecret);
    const token = await new SignJWT({ 
      pubkey: key, 
      role: "ahorro_user" 
    })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("7d") // Sesión válida por 7 días
      .sign(secret);

    // 7. Establecer cookie HttpOnly y responder
    const response = NextResponse.json({ status: "OK" });
    response.cookies.set("ahorro_session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Requiere HTTPS en producción
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 días en segundos
      path: "/",
    });

    return response;

  } catch (error) {
    console.error("🔴 [LNAuth Verify] Error crítico:", error);
    return NextResponse.json(
      { status: "ERROR", reason: "Fallo interno del nodo de verificación" },
      { status: 500 }
    );
  }
}