/**
 * BTCPay Service Abstraction Layer
 * 
 * Define el contrato para la integración con BTCPay Server.
 * Permite swappear la implementación concreta sin afectar a los consumidores.
 * Regla: §10.1 Adapter/Service Pattern
 */

export interface CreateInvoiceRequest {
  amount: number; // Monto (ej. en BTC o MXN, según la configuración del store)
  currency: string; // "BTC", "MXN", "USD", etc.
  metadata?: Record<string, unknown>; // Datos personalizados (ej. { userId, type: "ahorro_deposit" })
  checkout?: {
    redirectURL?: string;
    redirectAutomatically?: boolean;
  };
}

export interface InvoiceResponse {
  id: string;
  url: string;
  status: "New" | "Processing" | "Settled" | "Invalid" | "Expired";
  amount: string;
  currency: string;
  metadata: Record<string, unknown>;
}

export interface BTCPayService {
  /**
   * Crea una nueva factura en BTCPay Server.
   * @param request - Datos de la factura
   * @returns Promise con los detalles de la factura creada
   */
  createInvoice(request: CreateInvoiceRequest): Promise<InvoiceResponse>;

  /**
   * Verifica la firma HMAC de un webhook entrante.
   * @param rawPayload - El cuerpo crudo de la petición (string)
   * @param signature - El valor del header 'BTCPay-Sig'
   * @returns boolean - true si la firma es válida, false en caso contrario
   */
  verifyWebhookSignature(rawPayload: string, signature: string): boolean;
}
