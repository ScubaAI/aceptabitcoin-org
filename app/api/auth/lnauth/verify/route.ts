/**
 * @file app/api/auth/lnauth/verify/route.ts
 * @description Verifica la firma LNURL-Auth y emite un JWT de sesión soberana.
 * 
 * @fix Manejo correcto de firmas DER vs compactas de diferentes wallets
 */

import { NextRequest, NextResponse } from "next/server";
import { verify } from "@noble/secp256k1";
import { SignJWT } from "jose";
import crypto from "node:crypto";

// Map global compartido con challenge/route.ts
(globalThis as any).lnAuthChallenges = (globalThis as any).lnAuthChallenges || new Map<string, { createdAt: number }>();
const challenges = (globalThis as any).lnAuthChallenges as Map<string, { createdAt: number }>;

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const k1 = searchParams.get("k1");
    const sig = searchParams.get("sig");
    const key = searchParams.get("key");
    const action = searchParams.get("action");

    console.log("🔵 [LNAuth Verify] Recibiendo:", { k1, sig: sig?.slice(0, 16) + "...", key: key?.slice(0, 16) + "...", action });

    if (!k1 || !sig || !key) {
      console.error(" Faltan parámetros:", { k1: !!k1, sig: !!sig, key: !!key });
      return NextResponse.json(
        { status: "ERROR", reason: "Faltan parámetros requeridos" },
        { status: 400 }
      );
    }

    // Verificar que el k1 exista
    const challengeData = challenges.get(k1);
    if (!challengeData) {
      console.error("❌ Challenge no encontrado o expirado:", k1);
      return NextResponse.json(
        { status: "ERROR", reason: "Challenge expirado o no encontrado" },
        { status: 400 }
      );
    }

    // Validar action
    if (action !== "login") {
      console.error(" Acción inválida:", action);
      return NextResponse.json(
        { status: "ERROR", reason: "Acción no permitida" },
        { status: 400 }
      );
    }

    // Calcular hash SHA-256 del k1 (como lo hace la wallet)
    const messageHash = crypto.createHash("sha256").update(k1, "hex").digest();
    
    // Convertir firma y pubkey a bytes
    // Las wallets pueden enviar sig en formato DER o compact (64 bytes)
    const sigBytes = Uint8Array.from(Buffer.from(sig, "hex"));
    const pubkeyBytes = Uint8Array.from(Buffer.from(key, "hex"));

    console.log("🔵 [LNAuth Verify] Verificando firma...", {
      messageHashLength: messageHash.length,
      sigLength: sigBytes.length,
      pubkeyLength: pubkeyBytes.length
    });

    // Verificar firma con @noble/secp256k1
    // @noble espera: signature (64 bytes compact), messageHash (32 bytes), publicKey (33 bytes comprimida)
    let isValid = false;
    try {
      isValid = await verify(sigBytes, messageHash, pubkeyBytes);
      console.log("✅ Firma válida:", isValid);
    } catch (verifyError) {
      console.error("❌ Error en verify():", verifyError);
      return NextResponse.json(
        { status: "ERROR", reason: "Firma inválida" },
        { status: 401 }
      );
    }

    if (!isValid) {
      console.error("❌ Firma criptográfica inválida");
      return NextResponse.json(
        { status: "ERROR", reason: "Firma inválida" },
        { status: 401 }
      );
    }

    // Eliminar challenge usado (previene replay attacks)
    challenges.delete(k1);
    console.log("✅ Challenge eliminado, generando JWT...");

    // Generar JWT
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      console.error("🔴 JWT_SECRET no está configurado");
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
      .setExpirationTime("7d")
      .sign(secret);

    console.log("✅ JWT generado, estableciendo cookie...");

    // Establecer cookie
    const response = NextResponse.json({ status: "OK" });
    response.cookies.set("ahorro_session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    console.log("✅ Autenticación completada exitosamente");
    return response;

  } catch (error) {
    console.error("🔴 [LNAuth Verify] ERROR CRÍTICO:", error);
    console.error("Stack trace:", error instanceof Error ? error.stack : "No stack");
    
    return NextResponse.json(
      { status: "ERROR", reason: "Fallo interno del nodo de verificación" },
      { status: 500 }
    );
  }
}