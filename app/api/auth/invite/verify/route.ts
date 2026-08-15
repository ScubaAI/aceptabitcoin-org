/**
 * Invite Code Verification Endpoint
 * 
 * Valida un código de invitación, crea o recupera el usuario unificado,
 * marca el código como usado, y emite un JWT con userId + authMethod.
 * 
 * ⚠️ SEGURIDAD:
 * - Cookie httpOnly (no accesible desde JavaScript)
 * - Validación estricta del formato del código
 * - Transacción atómica (User + InviteCode) para evitar race conditions
 * - Rate limiting básico (10 intentos por IP por minuto)
 * 
 * Reglas del Design System aplicadas:
 * - §9.5 Comentarios Bilingües: Spanish narrative + English tech
 * - §10.3 Constants-as-Design-Tokens: usa INVITE_CODE_RULES, AHORRO_CONFIG.jwt
 */

import { NextRequest, NextResponse } from "next/server";
import { SignJWT } from "jose";
import { prisma } from "@/lib/prisma";
import { 
  INVITE_CODE_RULES, 
  AHORRO_CONFIG,
  ORACLE_MESSAGES 
} from "@/lib/ahorro/constants";

// ════════════════════════════════════════════════════════════════
// RATE LIMITING (básico, en memoria — suficiente para beta)
// ════════════════════════════════════════════════════════════════

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_WINDOW_MS = 60_000; // 1 minuto
const RATE_LIMIT_MAX_ATTEMPTS = 10;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now > record.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }

  if (record.count >= RATE_LIMIT_MAX_ATTEMPTS) {
    return false;
  }

  record.count++;
  return true;
}

// ════════════════════════════════════════════════════════════════
// POST HANDLER
// ════════════════════════════════════════════════════════════════

export async function POST(request: NextRequest) {
  try {
    // 1. Rate limiting
    const ip = request.headers.get("x-forwarded-for") || "unknown";
    if (!checkRateLimit(ip)) {
      console.warn(`[INVITE VERIFY] ⚠️ Rate limit exceeded for IP: ${ip}`);
      return NextResponse.json(
        { 
          error: "Too many attempts",
          message: "Demasiados intentos. Espera un minuto." 
        },
        { status: 429 }
      );
    }

    // 2. Parsear el body
    const body = await request.json();
    const { code } = body;

    if (!code || typeof code !== "string") {
      return NextResponse.json(
        { error: "Invalid request", message: "Código requerido" },
        { status: 400 }
      );
    }

    // 3. Validar el formato del código (regex estricto)
    const normalizedCode = code.trim().toUpperCase();
    if (!INVITE_CODE_RULES.format.test(normalizedCode)) {
      return NextResponse.json(
        { 
          error: "Invalid format",
          message: ORACLE_MESSAGES.inviteCodeInvalid.body 
        },
        { status: 400 }
      );
    }

    // 4. Buscar el código en la base de datos (transacción atómica)
    const result = await prisma.$transaction(async (tx) => {
      // Buscar el código
      const inviteCode = await tx.inviteCode.findUnique({
        where: { code: normalizedCode },
      });

      if (!inviteCode) {
        throw new Error("CODE_NOT_FOUND");
      }

      if (inviteCode.usedBy) {
        throw new Error("CODE_ALREADY_USED");
      }

      // Verificar expiración (si aplica)
      if (INVITE_CODE_RULES.expirationDays > 0) {
        const expirationDate = new Date(inviteCode.createdAt);
        expirationDate.setDate(expirationDate.getDate() + INVITE_CODE_RULES.expirationDays);
        if (new Date() > expirationDate) {
          throw new Error("CODE_EXPIRED");
        }
      }

      // Crear el usuario (o recuperar si ya existe por alguna razón)
      const user = await tx.user.create({
        data: {
          inviteCode: {
            connect: {
              code: normalizedCode,
            },
          },
        },
      });

      // Marcar el código como usado
      await tx.inviteCode.update({
        where: { code: normalizedCode },
        data: {
          usedBy: user.id,
          usedAt: new Date(),
        },
      });

      return user;
    });

    // 5. Emitir el JWT unificado
    const jwtSecret = new TextEncoder().encode(
      process.env.JWT_SECRET || "fallback_secret_change_in_production"
    );

    const token = await new SignJWT({ 
      userId: result.id,
      authMethod: "invite" as const,
    })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime(`${AHORRO_CONFIG.jwt.maxAgeDays}d`)
      .sign(jwtSecret);

    // 6. Setear la cookie httpOnly
    const response = NextResponse.json({
      success: true,
      message: ORACLE_MESSAGES.inviteCodeUsed.body,
      userId: result.id,
    });

    response.cookies.set(AHORRO_CONFIG.jwt.cookieName, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: AHORRO_CONFIG.jwt.maxAgeDays * 24 * 60 * 60,
      path: "/ahorro",
    });

    console.log(`[INVITE VERIFY] ✅ User ${result.id} authenticated via invite code`);
    return response;
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "CODE_NOT_FOUND") {
        return NextResponse.json(
          { error: "Not found", message: ORACLE_MESSAGES.inviteCodeInvalid.body },
          { status: 404 }
        );
      }
      if (error.message === "CODE_ALREADY_USED") {
        return NextResponse.json(
          { error: "Already used", message: ORACLE_MESSAGES.inviteCodeInvalid.body },
          { status: 409 }
        );
      }
      if (error.message === "CODE_EXPIRED") {
        return NextResponse.json(
          { error: "Expired", message: "Este código ha expirado." },
          { status: 410 }
        );
      }
    }

    console.error("[INVITE VERIFY] 💥 Unhandled error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
