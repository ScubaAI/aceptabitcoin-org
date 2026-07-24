// app/api/auth/lnauth/verify/route.ts
import { NextRequest, NextResponse } from "next/server";
import { verify } from "@noble/secp256k1";
import { SignJWT } from "jose";

(globalThis as any).lnAuthChallenges = (globalThis as any).lnAuthChallenges || new Map<string, { createdAt: number }>();
const challenges = (globalThis as any).lnAuthChallenges as Map<string, { createdAt: number }>;

export const dynamic = "force-dynamic";

// Clave secreta para firmar el JWT (en producción pon esto en tu .env.local)
const JWT_SECRET = process.env.JWT_SECRET || "super-secret-dev-key-change-in-production";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const k1 = searchParams.get("k1");
    const sig = searchParams.get("sig");
    const key = searchParams.get("key"); // Public key de la wallet
    const action = searchParams.get("action");

    if (!k1 || !sig || !key) {
      return NextResponse.json({ status: "ERROR", reason: "Missing parameters" }, { status: 400 });
    }

    // 1. Verificar que el k1 exista y no haya expirado
    const challengeData = challenges.get(k1);
    if (!challengeData) {
      return NextResponse.json({ status: "ERROR", reason: "Challenge expired or not found" }, { status: 400 });
    }

    // 2. Verificar la firma criptográfica (secp256k1)
    // LNURL-Auth usa DER signatures, hay que convertirlas o verificarlas correctamente
    // @noble/secp256k1 maneja esto si le pasamos el mensaje (k1) y la firma en hex
    const messageBytes = Buffer.from(k1, "hex");
    const signatureBytes = Buffer.from(sig, "hex");
    const publicKeyBytes = Buffer.from(key, "hex");

    // LNURL spec: La firma es una firma ECDSA sobre el k1 usando la clave de linking de la wallet
    const isValid = verify(signatureBytes, messageBytes, publicKeyBytes);

    if (!isValid) {
      return NextResponse.json({ status: "ERROR", reason: "Invalid signature" }, { status: 401 });
    }

    // 3. ¡Éxito! El usuario demostró soberanía.
    // Eliminar el k1 usado para que no pueda hacer replay attack
    challenges.delete(k1);

    // 4. Crear JWT (Session token)
    const secret = new TextEncoder().encode(JWT_SECRET);
    const token = await new SignJWT({ 
      pubkey: key, 
      role: "ahorro_user" 
    })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("7d") // Sesión válida por 7 días
      .sign(secret);

    // 5. Establecer cookie y responder
    const response = NextResponse.json({ status: "OK" });
    response.cookies.set("ahorro_session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 días
      path: "/",
    });

    return response;

  } catch (error) {
    console.error("Error en verify LnAuth:", error);
    return NextResponse.json(
      { status: "ERROR", reason: "Internal Server Error" },
      { status: 500 }
    );
  }
}
