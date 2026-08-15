/**
 * BTCPay Webhook Handler — Unit Tests
 * 
 * Valida la seguridad criptográfica, el filtrado de eventos,
 * las transiciones de estado y la idempotencia del webhook de Ahorro.
 * 
 * Reglas aplicadas:
 * - §10.1 Adapter/Service Pattern: tests junto al código que consumen
 * - §9.5 Comentarios Bilingües: Spanish narrative + English tech
 */

import { describe, it, expect, vi, beforeEach } from "vitest";
import crypto from "crypto";
import { NextRequest } from "next/server";
import { POST } from "./route";

// ════════════════════════════════════════════════════════════════
// MOCKS — Prisma + BTCPay Service
// ════════════════════════════════════════════════════════════════

// Mock del cliente Prisma (singleton)
vi.mock("@/lib/prisma", () => ({
  prisma: {
    deposit: {
      findUnique: vi.fn(),
      update: vi.fn(),
    },
  },
}));

// Mock del servicio BTCPay (verificación de firma)
vi.mock("@/lib/btcpay", () => ({
  btcpayService: {
    verifyWebhookSignature: vi.fn(),
  },
}));

// Importamos los mocks después del vi.mock
import { prisma } from "@/lib/prisma";
import { btcpayService } from "@/lib/btcpay";

// ════════════════════════════════════════════════════════════════
// HELPERS — Construcción de requests y payloads
// ════════════════════════════════════════════════════════════════

const WEBHOOK_SECRET = "super_secret_webhook_key";

/**
 * Genera una firma HMAC-SHA256 válida para un payload dado.
 * Reproduce exactamente lo que BTCPay Server haría.
 */
function generateValidSignature(payload: string): string {
  const hmac = crypto.createHmac("sha256", WEBHOOK_SECRET);
  return `sha256=${hmac.update(payload).digest("hex")}`;
}

/**
 * Construye un payload de webhook estándar para tests.
 */
function buildPayload(overrides: Record<string, unknown> = {}) {
  return {
    deliveryId: "del_123",
    webhookId: "wh_456",
    originalDeliveryId: "del_123",
    isRedelivery: false,
    type: "InvoiceSettled",
    timestamp: Date.now(),
    storeId: "store_789",
    invoiceId: "inv_abc123",
    metadata: { userId: "user_xyz" },
    ...overrides,
  };
}

/**
 * Construye un NextRequest con el body y signature correctos.
 */
function buildRequest(payload: object, signature: string): NextRequest {
  const rawBody = JSON.stringify(payload);
  return new NextRequest("http://localhost/api/ahorro/webhook/btcpay", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "btcpay-sig": signature,
    },
    body: rawBody,
  });
}

// ════════════════════════════════════════════════════════════════
// SETUP — Reset mocks antes de cada test
// ════════════════════════════════════════════════════════════════

beforeEach(() => {
  vi.resetAllMocks();

  // Config por defecto: el servicio BTCPay acepta la firma como válida
  vi.mocked(btcpayService.verifyWebhookSignature).mockReturnValue(true);

  // Stub de entorno para el webhook secret
  vi.stubEnv("BTCPAY_WEBHOOK_SECRET", WEBHOOK_SECRET);
});

// ════════════════════════════════════════════════════════════════
// TESTS — Security Validation
// ════════════════════════════════════════════════════════════════

describe("POST /api/ahorro/webhook/btcpay", () => {
  describe("Security Validation", () => {
    it("should return 200 if BTCPay-Sig header is missing", async () => {
      const request = new NextRequest(
        "http://localhost/api/ahorro/webhook/btcpay",
        {
          method: "POST",
          body: JSON.stringify(buildPayload()),
        }
      );

      const response = await POST(request);

      expect(response.status).toBe(200);
      const body = await response.json();
      expect(body.error).toBe("Missing signature");
      // No debe haber llamado a prisma en absoluto
      expect(prisma.deposit.findUnique).not.toHaveBeenCalled();
    });

    it("should return 200 if HMAC signature is invalid", async () => {
      vi.mocked(btcpayService.verifyWebhookSignature).mockReturnValue(false);

      const payload = buildPayload();
      const request = buildRequest(payload, "sha256=invalidsignature");

      const response = await POST(request);

      expect(response.status).toBe(200);
      const body = await response.json();
      expect(body.error).toBe("Invalid signature");
      expect(prisma.deposit.findUnique).not.toHaveBeenCalled();
    });

    it("should return 200 if JSON payload is malformed", async () => {
      const request = new NextRequest(
        "http://localhost/api/ahorro/webhook/btcpay",
        {
          method: "POST",
          headers: { "btcpay-sig": generateValidSignature("not json") },
          body: "not valid json {{{",
        }
      );

      const response = await POST(request);

      expect(response.status).toBe(200);
      const body = await response.json();
      expect(body.error).toBe("Invalid JSON");
      expect(prisma.deposit.findUnique).not.toHaveBeenCalled();
    });
  });

  // ═══════════════════════════════════════════════════════════════
  // TESTS — Event Filtering
  // ═══════════════════════════════════════════════════════════════

  describe("Event Filtering", () => {
    it("should ignore events that are not in BTCPAY_STATUS_EVENTS", async () => {
      const payload = buildPayload({ type: "InvoiceCreated" });
      const request = buildRequest(payload, generateValidSignature(JSON.stringify(payload)));

      const response = await POST(request);

      expect(response.status).toBe(200);
      const body = await response.json();
      expect(body.received).toBe(true);
      // No debe haber tocado la base de datos
      expect(prisma.deposit.findUnique).not.toHaveBeenCalled();
    });

    it("should process InvoiceSettled events", async () => {
      const payload = buildPayload({ type: "InvoiceSettled" });
      const request = buildRequest(payload, generateValidSignature(JSON.stringify(payload)));

      vi.mocked(prisma.deposit.findUnique).mockResolvedValue({
        id: "dep_1",
        userId: "user_xyz",
        invoiceId: "inv_abc123",
        amountSats: 21000,
        status: "PENDING",
        btcpayEvent: null,
        confirmedAt: null,
        createdAt: new Date(),
      } as any);

      vi.mocked(prisma.deposit.update).mockResolvedValue({} as any);

      const response = await POST(request);

      expect(response.status).toBe(200);
      expect(prisma.deposit.update).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { id: "dep_1" },
          data: expect.objectContaining({
            status: "SETTLED",
            btcpayEvent: "InvoiceSettled",
          }),
        })
      );
    });
  });

  // ═══════════════════════════════════════════════════════════════
  // TESTS — Deposit Not Found
  // ═══════════════════════════════════════════════════════════════

  describe("Deposit Not Found", () => {
    it("should return 200 if invoiceId does not match any deposit", async () => {
      const payload = buildPayload({ invoiceId: "inv_unknown" });
      const request = buildRequest(payload, generateValidSignature(JSON.stringify(payload)));

      vi.mocked(prisma.deposit.findUnique).mockResolvedValue(null);

      const response = await POST(request);

      expect(response.status).toBe(200);
      const body = await response.json();
      expect(body.received).toBe(true);
      // No debe haber intentado actualizar nada
      expect(prisma.deposit.update).not.toHaveBeenCalled();
    });
  });

  // ═══════════════════════════════════════════════════════════════
  // TESTS — State Transitions
  // ═══════════════════════════════════════════════════════════════

  describe("State Transitions", () => {
    const mockDeposit = {
      id: "dep_1",
      userId: "user_xyz",
      invoiceId: "inv_abc123",
      amountSats: 21000,
      status: "PENDING",
      btcpayEvent: null,
      confirmedAt: null,
      createdAt: new Date(),
    };

    beforeEach(() => {
      vi.mocked(prisma.deposit.findUnique)
        .mockResolvedValueOnce(mockDeposit as any) // findUnique inicial
        .mockResolvedValueOnce({ status: "PENDING" } as any); // findUnique para validación de transición
      vi.mocked(prisma.deposit.update).mockResolvedValue({} as any);
    });

    it("should ignore InvoiceReceivedPayment (not in BTCPAY_STATUS_EVENTS)", async () => {
      const payload = buildPayload({ type: "InvoiceReceivedPayment" });
      const request = buildRequest(payload, generateValidSignature(JSON.stringify(payload)));

      const response = await POST(request);

      expect(response.status).toBe(200);
      const body = await response.json();
      expect(body.received).toBe(true);
      expect(prisma.deposit.findUnique).not.toHaveBeenCalled();
      expect(prisma.deposit.update).not.toHaveBeenCalled();
    });

    it("should transition PENDING → SETTLED on InvoiceSettled with confirmedAt", async () => {
      const payload = buildPayload({ type: "InvoiceSettled" });
      const request = buildRequest(payload, generateValidSignature(JSON.stringify(payload)));

      const response = await POST(request);

      expect(response.status).toBe(200);
      expect(prisma.deposit.update).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            status: "SETTLED",
            btcpayEvent: "InvoiceSettled",
            confirmedAt: expect.any(Date),
          }),
        })
      );
    });

    it("should transition PENDING → EXPIRED on InvoiceExpired", async () => {
      const payload = buildPayload({ type: "InvoiceExpired" });
      const request = buildRequest(payload, generateValidSignature(JSON.stringify(payload)));

      const response = await POST(request);

      expect(response.status).toBe(200);
      expect(prisma.deposit.update).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            status: "EXPIRED",
            btcpayEvent: "InvoiceExpired",
          }),
        })
      );
    });

    it("should transition PENDING → INVALID on InvoiceInvalid", async () => {
      const payload = buildPayload({ type: "InvoiceInvalid" });
      const request = buildRequest(payload, generateValidSignature(JSON.stringify(payload)));

      const response = await POST(request);

      expect(response.status).toBe(200);
      expect(prisma.deposit.update).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            status: "INVALID",
            btcpayEvent: "InvoiceInvalid",
          }),
        })
      );
    });
  });

  // ═══════════════════════════════════════════════════════════════
  // TESTS — Idempotency (CRÍTICO para seguridad financiera)
  // ═══════════════════════════════════════════════════════════════

  describe("Idempotency", () => {
    it("should NOT update a deposit that is already SETTLED", async () => {
      const payload = buildPayload({ type: "InvoiceSettled" });
      const request = buildRequest(payload, generateValidSignature(JSON.stringify(payload)));

      // Primera llamada: el depósito existe
      vi.mocked(prisma.deposit.findUnique).mockResolvedValueOnce({
        id: "dep_1",
        userId: "user_xyz",
        invoiceId: "inv_abc123",
        amountSats: 21000,
        status: "SETTLED", // ← Ya estaba acreditado
        btcpayEvent: "InvoiceSettled",
        confirmedAt: new Date(),
        createdAt: new Date(),
      } as any);

      const response = await POST(request);

      expect(response.status).toBe(200);
      // La protección de idempotencia debe haber evitado el update
      expect(prisma.deposit.update).not.toHaveBeenCalled();
    });

    it("should NOT update a deposit that is already EXPIRED", async () => {
      const payload = buildPayload({ type: "InvoiceExpired" });
      const request = buildRequest(payload, generateValidSignature(JSON.stringify(payload)));

      vi.mocked(prisma.deposit.findUnique).mockResolvedValueOnce({
        id: "dep_1",
        userId: "user_xyz",
        invoiceId: "inv_abc123",
        amountSats: 21000,
        status: "EXPIRED", // ← Ya había expirado
        btcpayEvent: "InvoiceExpired",
        confirmedAt: null,
        createdAt: new Date(),
      } as any);

      const response = await POST(request);

      expect(response.status).toBe(200);
      expect(prisma.deposit.update).not.toHaveBeenCalled();
    });

    it("should NOT allow a SETTLED deposit to transition to EXPIRED", async () => {
      const payload = buildPayload({ type: "InvoiceExpired" });
      const request = buildRequest(payload, generateValidSignature(JSON.stringify(payload)));

      // Primera llamada: findUnique del handler principal
      vi.mocked(prisma.deposit.findUnique).mockResolvedValueOnce({
        id: "dep_1",
        status: "SETTLED",
      } as any);

      const response = await POST(request);

      expect(response.status).toBe(200);
      expect(prisma.deposit.update).not.toHaveBeenCalled();
    });
  });
});
