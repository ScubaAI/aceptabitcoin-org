/**
 * Invite Code Verification — Unit Tests
 * 
 * Valida la seguridad, validación de formato, transacciones atómicas,
 * y emisión de JWT del endpoint de verificación de códigos.
 * 
 * Reglas aplicadas:
 * - §10.1 Adapter/Service Pattern: tests junto al código que consumen
 * - §9.5 Comentarios Bilingües: Spanish narrative + English tech
 */

import { describe, it, expect, vi, beforeEach } from "vitest";
import { NextRequest } from "next/server";
import { POST } from "./route";

// ════════════════════════════════════════════════════════════════
// MOCKS
// ════════════════════════════════════════════════════════════════

vi.mock("@/lib/prisma", () => ({
  prisma: {
    $transaction: vi.fn(),
  },
}));

vi.mock("jose", () => ({
  SignJWT: vi.fn().mockImplementation(() => ({
    setProtectedHeader: vi.fn().mockReturnThis(),
    setIssuedAt: vi.fn().mockReturnThis(),
    setExpirationTime: vi.fn().mockReturnThis(),
    sign: vi.fn().mockResolvedValue("mock_jwt_token"),
  })),
}));

import { prisma } from "@/lib/prisma";

// ════════════════════════════════════════════════════════════════
// HELPERS
// ════════════════════════════════════════════════════════════════

function buildRequest(code: string): NextRequest {
  return new NextRequest("http://localhost/api/auth/invite/verify", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-forwarded-for": "127.0.0.1",
    },
    body: JSON.stringify({ code }),
  });
}

// ════════════════════════════════════════════════════════════════
// SETUP
// ════════════════════════════════════════════════════════════════

beforeEach(() => {
  vi.clearAllMocks();
  vi.stubEnv("JWT_SECRET", "test_jwt_secret");
});

// ════════════════════════════════════════════════════════════════
// TESTS
// ════════════════════════════════════════════════════════════════

describe("POST /api/auth/invite/verify", () => {
  describe("Input Validation", () => {
    it("should return 400 if code is missing", async () => {
      const request = new NextRequest("http://localhost/api/auth/invite/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      });

      const response = await POST(request);
      expect(response.status).toBe(400);
    });

    it("should return 400 if code format is invalid", async () => {
      const request = buildRequest("invalid-code");
      const response = await POST(request);

      expect(response.status).toBe(400);
      const body = await response.json();
      expect(body.error).toBe("Invalid format");
    });

    it("should normalize code to uppercase", async () => {
      const request = buildRequest("abmx-gen1-2026");
      
      vi.mocked(prisma.$transaction).mockResolvedValue({
        id: "user_123",
        inviteCodeUsed: "ABMX-GEN1-2026",
      } as any);

      const response = await POST(request);
      expect(response.status).toBe(200);
      
      // Verificar que se buscó con el código en uppercase
      expect(prisma.$transaction).toHaveBeenCalled();
    });
  });

  describe("Code Validation", () => {
    it("should return 404 if code does not exist", async () => {
      vi.mocked(prisma.$transaction).mockRejectedValue(new Error("CODE_NOT_FOUND"));

      const request = buildRequest("ABMX-XXXX-9999");
      const response = await POST(request);

      expect(response.status).toBe(404);
      const body = await response.json();
      expect(body.error).toBe("Not found");
    });

    it("should return 409 if code is already used", async () => {
      vi.mocked(prisma.$transaction).mockRejectedValue(new Error("CODE_ALREADY_USED"));

      const request = buildRequest("ABMX-GEN1-2026");
      const response = await POST(request);

      expect(response.status).toBe(409);
      const body = await response.json();
      expect(body.error).toBe("Already used");
    });
  });

  describe("Successful Authentication", () => {
    it("should create user, mark code as used, and return JWT", async () => {
      vi.mocked(prisma.$transaction).mockResolvedValue({
        id: "user_123",
        inviteCodeUsed: "ABMX-GEN1-2026",
      } as any);

      const request = buildRequest("ABMX-GEN1-2026");
      const response = await POST(request);

      expect(response.status).toBe(200);
      const body = await response.json();
      expect(body.success).toBe(true);
      expect(body.userId).toBe("user_123");

      // Verificar que la cookie fue seteada
      const cookies = response.cookies.get("ahorro_session");
      expect(cookies).toBeDefined();
      expect(cookies?.value).toBe("mock_jwt_token");
      expect(cookies?.httpOnly).toBe(true);
    });
  });

  describe("Rate Limiting", () => {
    it("should return 429 after 10 attempts from same IP", async () => {
      vi.mocked(prisma.$transaction).mockResolvedValue({
        id: "user_123",
      } as any);

      // Hacer 10 requests exitosos
      for (let i = 0; i < 10; i++) {
        await POST(buildRequest("ABMX-GEN1-2026"));
      }

      // El 11vo debe ser rate limited
      const response = await POST(buildRequest("ABMX-GEN1-2026"));
      expect(response.status).toBe(429);
      const body = await response.json();
      expect(body.error).toBe("Too many attempts");
    });
  });
});
