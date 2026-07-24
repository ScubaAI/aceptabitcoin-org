/**
 * @file app/api/auth/lnauth/challenge/route.ts
 * @description Genera un challenge LNURL-Auth para autenticación soberana con wallet Lightning.
 * 
 * @design-system v3.0
 * - §7.4: Protocolo LNURL-Auth para autenticación sin contraseñas
 * - §8.10: Hidratación amigable (aunque es API, seguimos estándares de seguridad)
 * - §10.1: Patrón Adapter/Service para integraciones externas
 * 
 * @see https://github.com/lnurl/luds/blob/lud16/16.md
 */

import { NextResponse } from "next/server";
import { headers } from "next/headers";
import crypto from "crypto";
import { encode } from "lnurl"; // Importación estática para evitar problemas de resolución

/**
 * @constant CHALLENGE_EXPIRATION
 * @description Tiempo de expiración del challenge (5 minutos)
 * @type {number}
 * @value 300000
 */
const CHALLENGE_EXPIRATION = 300000; // 5 minutos en ms

/**
 * @constant LNURL_AUTH_TAG
 * @description Tag estándar para LNURL-Auth
 * @type {string}
 * @value "login"
 */
const LNURL_AUTH_TAG = "login";

/**
 * @constant LNURL_AUTH_ACTION
 * @description Acción estándar para LNURL-Auth
 * @type {string}
 * @value "login"
 */
const LNURL_AUTH_ACTION = "login";

/**
 * @class LnAuthChallengeManager
 * @description Gestiona los challenges LNURL-Auth en memoria
 * 
 * @design-system §10.1
 * - Patrón Adapter/Service para abstracción de datos
 * - Uso de Map global para sobrevivir a hot-reloads en desarrollo
 */
class LnAuthChallengeManager {
  private static instance: LnAuthChallengeManager;
  private challenges: Map<string, { createdAt: number }>;

  private constructor() {
    // Inicializa desde el espacio global para preservar datos en hot-reloads
    const globalStore = (globalThis as any).lnAuthChallenges;
    this.challenges = globalStore || new Map();
    (globalThis as any).lnAuthChallenges = this.challenges;
  }

  public static getInstance(): LnAuthChallengeManager {
    if (!LnAuthChallengeManager.instance) {
      LnAuthChallengeManager.instance = new LnAuthChallengeManager();
    }
    return LnAuthChallengeManager.instance;
  }

  /**
   * @method addChallenge
   * @description Agrega un nuevo challenge con timestamp
   * @param {string} k1 - Identificador único del challenge
   */
  public addChallenge(k1: string): void {
    this.challenges.set(k1, { createdAt: Date.now() });
  }

  /**
   * @method cleanupExpired
   * @description Limpia challenges expirados
   */
  public cleanupExpired(): void {
    const now = Date.now();
    for (const [key, value] of this.challenges.entries()) {
      if (now - value.createdAt > CHALLENGE_EXPIRATION) {
        this.challenges.delete(key);
      }
    }
  }

  /**
   * @method exists
   * @description Verifica si un challenge existe
   * @param {string} k1 - Identificador del challenge
   * @returns {boolean}
   */
  public exists(k1: string): boolean {
    return this.challenges.has(k1);
  }
}

/**
 * @function getBaseUrl
 * @description Obtiene la URL base dinámica desde los headers
 * @returns {string} - URL base para la aplicación
 * 
 * @design-system §7.4
 * - Usa headers() para obtener el host real
 * - Maneja protocolos http/https correctamente
 */
const getBaseUrl = (): string => {
  const headersList = headers();
  const host = headersList.get("host") || process.env.NEXT_PUBLIC_APP_URL?.replace(/^https?:\/\//, "") || "aceptabitcoin.org";
  const protocol = host.includes("localhost") ? "http" : "https";
  return `${protocol}://${host}`;
};

/**
 * @route GET /api/auth/lnauth/challenge
 * @description Genera un challenge LNURL-Auth para autenticación soberana
 * 
 * @design-system v3.0
 * - §7.4: Protocolo LNURL-Auth para autenticación sin contraseñas
 * - §8.10: Hidratación amigable (aunque es API, seguimos estándares de seguridad)
 * - §10.1: Patrón Adapter/Service para integraciones externas
 * 
 * @see https://github.com/lnurl/luds/blob/lud16/16.md
 */
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    // 1. Generar un k1 (challenge criptográfico) de 32 bytes
    const k1 = crypto.randomBytes(32).toString("hex");

    // 2. Guardar en memoria con timestamp (expira en 5 minutos)
    const challengeManager = LnAuthChallengeManager.getInstance();
    challengeManager.addChallenge(k1);
    challengeManager.cleanupExpired();

    // 3. Construir la URL de callback DINÁMICAMENTE
    const baseUrl = getBaseUrl();
    const callbackUrl = new URL(`${baseUrl}/api/auth/lnauth/verify`);
    callbackUrl.searchParams.set("k1", k1);
    callbackUrl.searchParams.set("action", LNURL_AUTH_ACTION);
    callbackUrl.searchParams.set("tag", LNURL_AUTH_TAG);

    // 4. Codificar a LNURL (Bech32)
    const encodedLnurl = encode(callbackUrl.toString());

    return NextResponse.json({
      k1,
      lnurl: encodedLnurl,
    });
  } catch (error) {
    console.error("Error generando challenge LnAuth:", error);
    return NextResponse.json(
      { 
        status: "ERROR", 
        reason: "Fallo interno del nodo de autenticación" 
      },
      { status: 500 }
    );
  }
}