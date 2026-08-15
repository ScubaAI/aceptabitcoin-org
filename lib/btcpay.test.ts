/**
 * BTCPay Client Unit Tests
 * 
 * Valida la creación de facturas (mocked) y la verificación criptográfica de webhooks.
 * Regla: §10.1 Adapter/Service Pattern (tests junto al cliente concreto)
 */

import { describe, it, expect, vi, beforeEach } from "vitest";
import crypto from "crypto";
import { BTCPayClient } from "./btcpay";

// Mock de variables de entorno para los tests
// Deben estar en vi.hoisted para que se ejecuten ANTES del import del módulo,
// ya que btcpay.ts crea el singleton en el nivel del módulo (línea 106).
vi.hoisted(() => {
  vi.stubEnv("BTCPAY_URL", "https://btcpay.example.com");
  vi.stubEnv("BTCPAY_API_KEY", "test_api_key");
  vi.stubEnv("BTCPAY_STORE_ID", "test_store_id");
  vi.stubEnv("BTCPAY_WEBHOOK_SECRET", "super_secret_webhook_key");
});

describe("BTCPayClient", () => {
  let client: BTCPayClient;

  beforeEach(() => {
    client = new BTCPayClient();
    vi.clearAllMocks();
  });

  describe("createInvoice", () => {
    it("should create an invoice successfully", async () => {
      const mockResponse = {
        id: "inv_123",
        checkoutLink: "https://btcpay.example.com/i/inv_123",
        status: "New",
        amount: "0.001",
        currency: "BTC",
        metadata: { orderId: "order_456" },
      };

      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => mockResponse,
      });

      const result = await client.createInvoice({
        amount: 0.001,
        currency: "BTC",
        metadata: { orderId: "order_456" },
      });

      expect(result.id).toBe("inv_123");
      expect(result.url).toBe("https://btcpay.example.com/i/inv_123");
      expect(global.fetch).toHaveBeenCalledWith(
        "https://btcpay.example.com/api/v1/stores/test_store_id/invoices",
        expect.objectContaining({
          method: "POST",
          headers: expect.objectContaining({
            Authorization: "token test_api_key",
          }),
        })
      );
    });

    it("should throw an error if the API request fails", async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: false,
        status: 401,
        text: async () => "Unauthorized",
      });

      await expect(
        client.createInvoice({ amount: 0.001, currency: "BTC" })
      ).rejects.toThrow("BTCPay API Error (401): Unauthorized");
    });
  });

  describe("verifyWebhookSignature", () => {
    it("should return true for a valid HMAC-SHA256 signature", () => {
      const rawPayload = '{"event":"InvoiceSettled","invoiceId":"inv_123"}';
      const secret = "super_secret_webhook_key";
      
      // Generamos la firma esperada tal como lo haría BTCPay
      const hmac = crypto.createHmac("sha256", secret);
      const validSignature = `sha256=${hmac.update(rawPayload).digest("hex")}`;

      const isValid = client.verifyWebhookSignature(rawPayload, validSignature);
      expect(isValid).toBe(true);
    });

    it("should return false for an invalid signature", () => {
      const rawPayload = '{"event":"InvoiceSettled","invoiceId":"inv_123"}';
      const invalidSignature = "sha256=invalidhashvalue1234567890abcdef";

      const isValid = client.verifyWebhookSignature(rawPayload, invalidSignature);
      expect(isValid).toBe(false);
    });

    it("should return false if the payload was tampered with", () => {
      const originalPayload = '{"event":"InvoiceSettled","amount":"100"}';
      const tamperedPayload = '{"event":"InvoiceSettled","amount":"999999"}';
      const secret = "super_secret_webhook_key";
      
      const hmac = crypto.createHmac("sha256", secret);
      const signature = `sha256=${hmac.update(originalPayload).digest("hex")}`;

      // Verificamos con el payload alterado
      const isValid = client.verifyWebhookSignature(tamperedPayload, signature);
      expect(isValid).toBe(false);
    });
  });
});
