/**
 * BTCPay Server Concrete Client
 * 
 * Implementación concreta del servicio de pagos BTCPay.
 * Maneja la autenticación por API Key y la verificación criptográfica de webhooks.
 * Regla: §10.1 Adapter/Service Pattern, §9.5 Comentarios Bilingües
 */

import crypto from "crypto";
import { BTCPayService, CreateInvoiceRequest, InvoiceResponse } from "./btcpay.service";

// ⚠️ SIN validación de entorno en tiempo de compilación, pero sí en runtime.
// Asegúrate de que estas variables existan en tu .env.local
const BTCPAY_URL = process.env.BTCPAY_URL;
const BTCPAY_API_KEY = process.env.BTCPAY_API_KEY;
const BTCPAY_STORE_ID = process.env.BTCPAY_STORE_ID;
const BTCPAY_WEBHOOK_SECRET = process.env.BTCPAY_WEBHOOK_SECRET;

if (!BTCPAY_URL || !BTCPAY_API_KEY || !BTCPAY_STORE_ID) {
  console.warn("⚠️ BTCPay environment variables are missing. Payment features will fail.");
}

export class BTCPayClient implements BTCPayService {
  private baseUrl: string;
  private apiKey: string;
  private storeId: string;
  private webhookSecret: string;

  constructor() {
    if (!BTCPAY_URL || !BTCPAY_API_KEY || !BTCPAY_STORE_ID) {
      throw new Error("BTCPay configuration is incomplete. Check .env variables.");
    }
    this.baseUrl = BTCPAY_URL.replace(/\/$/, ""); // Remove trailing slash
    this.apiKey = BTCPAY_API_KEY;
    this.storeId = BTCPAY_STORE_ID;
    this.webhookSecret = BTCPAY_WEBHOOK_SECRET || "";
  }

  /**
   * Crea una factura en BTCPay Server usando la API v1.
   * Docs: https://docs.btcpayserver.org/API/Greenfield/v1/#operation/Stores_CreateInvoice
   */
  async createInvoice(request: CreateInvoiceRequest): Promise<InvoiceResponse> {
    const url = `${this.baseUrl}/api/v1/stores/${this.storeId}/invoices`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Authorization": `token ${this.apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: request.amount,
        currency: request.currency,
        metadata: request.metadata || {},
        checkout: request.checkout || {},
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`BTCPay API Error (${response.status}): ${errorText}`);
    }

    const data = await response.json();
    return {
      id: data.id,
      url: data.checkoutLink,
      status: data.status,
      amount: data.amount,
      currency: data.currency,
      metadata: data.metadata || {},
    };
  }

  /**
   * Valida la firma HMAC-SHA256 del webhook de BTCPay.
   * Es crucial usar el raw payload (string) y no un objeto JSON parseado,
   * ya que el hashing se realiza sobre los bytes exactos del cuerpo HTTP.
   */
  verifyWebhookSignature(rawPayload: string, signature: string): boolean {
    if (!this.webhookSecret) {
      console.warn("⚠️ BTCPAY_WEBHOOK_SECRET is not set. Webhook verification skipped (INSECURE).");
      return true; // Fallback solo para desarrollo local sin secret configurado
    }

    // BTCPay envía la firma en formato: "sha256=<hex_hash>"
    const expectedSignature = signature.replace("sha256=", "");
    
    const hmac = crypto.createHmac("sha256", this.webhookSecret);
    const computedSignature = hmac.update(rawPayload).digest("hex");

    // crypto.timingSafeEqual previene ataques de timing
    const expectedBuffer = Buffer.from(expectedSignature, "hex");
    const computedBuffer = Buffer.from(computedSignature, "hex");

    if (expectedBuffer.length !== computedBuffer.length) {
      return false;
    }

    return crypto.timingSafeEqual(expectedBuffer, computedBuffer);
  }
}

// Singleton export para uso consistente en toda la app
export const btcpayService = new BTCPayClient();