/**
 * BTCPay Server Webhook Handler for Ahorro Module
 * 
 * Endpoint que recibe eventos de BTCPay Server y actualiza el estado
 * de los depósitos en la base de datos.
 * 
 * ⚠️ SEGURIDAD CRÍTICA:
 * - Verifica la firma HMAC-SHA256 de CADA petición entrante
 * - Usa el raw body (string) para el hashing, NO el JSON parseado
 * - Devuelve 200 SIEMPRE (BTCPay reintenta si recibe otro código)
 * - Implementa idempotencia: si el webhook se reenvía, no acredita dos veces
 * 
 * Reglas del Design System aplicadas:
 * - §10.1 Adapter/Service Pattern: usa btcpayService.verifyWebhookSignature()
 * - §9.5 Comentarios Bilingües: Spanish narrative + English tech
 * - §14.7 Vendor Integrations: no importa BTCPayClient directamente
 */

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getBtcpayService } from '@/lib/btcpay';
import { 
  BTCPAY_WEBHOOK_EVENTS, 
  BTCPAY_STATUS_EVENTS 
} from '@/lib/ahorro/constants';

// ════════════════════════════════════════════════════════════════
// TYPES — Estructura del payload de BTCPay (según su API docs)
// ════════════════════════════════════════════════════════════════

interface BTCPayWebhookPayload {
  deliveryId: string;
  webhookId: string;
  originalDeliveryId: string;
  isRedelivery: boolean;
  type: string; // "InvoiceSettled", "InvoiceExpired", etc.
  timestamp: number;
  storeId: string;
  invoiceId: string;
  metadata?: Record<string, unknown>;
  paymentMethod?: string;
  afterStatus?: string;
  status?: string;
}

// ════════════════════════════════════════════════════════════════
// POST HANDLER — Entry point del webhook
// ════════════════════════════════════════════════════════════════

export async function POST(request: NextRequest) {
  try {
    // 1. Obtener el raw body como string (CRÍTICO para HMAC)
    // No podemos usar request.json() porque alteraría los bytes exactos
    const rawBody = await request.text();
    
    // 2. Extraer la firma del header
    // BTCPay envía: "BTCPay-Sig: sha256=<hex_hash>"
    const signature = request.headers.get('btcpay-sig');
    
    if (!signature) {
      console.error('[BTCPAY WEBHOOK] ❌ Missing BTCPay-Sig header');
      // Devolvemos 200 para que BTCPay no reintente (petición malformada)
      return NextResponse.json(
        { error: 'Missing signature' },
        { status: 200 }
      );
    }

    // 3. Verificar la firma HMAC-SHA256
    const btcpayClient = getBtcpayService();
    const isValidSignature = btcpayClient.verifyWebhookSignature(rawBody, signature);
    
    if (!isValidSignature) {
      console.error('[BTCPAY WEBHOOK] ❌ Invalid HMAC signature — possible spoofing attempt');
      console.error('[BTCPAY WEBHOOK] Signature received:', signature);
      // Devolvemos 200 pero registramos el intento sospechoso
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 200 }
      );
    }

    // 4. Parsear el payload JSON
    let payload: BTCPayWebhookPayload;
    try {
      payload = JSON.parse(rawBody);
    } catch (error) {
      console.error('[BTCPAY WEBHOOK] ❌ Failed to parse JSON payload');
      return NextResponse.json(
        { error: 'Invalid JSON' },
        { status: 200 }
      );
    }

    // 5. Validar que el evento sea uno que procesamos
    if (!BTCPAY_STATUS_EVENTS.includes(payload.type as any)) {
      console.log(`[BTCPAY WEBHOOK] ℹ️ Ignoring event type: ${payload.type}`);
      return NextResponse.json({ received: true }, { status: 200 });
    }

    // 6. Buscar el depósito en la base de datos
    const deposit = await prisma.deposit.findUnique({
      where: { invoiceId: payload.invoiceId },
    });

    if (!deposit) {
      console.warn(
        `[BTCPAY WEBHOOK] ⚠️ Deposit not found for invoiceId: ${payload.invoiceId}`
      );
      // Devolvemos 200 para que BTCPay no reintente (factura no es nuestra)
      return NextResponse.json({ received: true }, { status: 200 });
    }

    // 7. Actualizar el estado del depósito según el evento
    await updateDepositStatus(deposit.id, payload);

    console.log(
      `[BTCPAY WEBHOOK] ✅ Processed ${payload.type} for deposit ${deposit.id}`
    );

    // 8. Devolver 200 OK (BTCPay espera esto para marcar el webhook como entregado)
    return NextResponse.json({ received: true }, { status: 200 });
  } catch (error) {
    // Error global del handler — aún así devolvemos 200 para no saturar a BTCPay
    console.error('[BTCPAY WEBHOOK] 💥 Unhandled error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 200 }
    );
  }
}

// ════════════════════════════════════════════════════════════════
// HELPER — Actualiza el estado del depósito con validación de transición
// ════════════════════════════════════════════════════════════════

async function updateDepositStatus(
  depositId: string,
  payload: BTCPayWebhookPayload
) {
  // Mapeo de eventos de BTCPay → estados de nuestro enum DepositStatus
  const statusMap: Record<string, 'PROCESSING' | 'SETTLED' | 'EXPIRED' | 'INVALID'> = {
    [BTCPAY_WEBHOOK_EVENTS.PAYMENT_RECEIVED]: 'PROCESSING',
    [BTCPAY_WEBHOOK_EVENTS.SETTLED]: 'SETTLED',
    [BTCPAY_WEBHOOK_EVENTS.EXPIRED]: 'EXPIRED',
    [BTCPAY_WEBHOOK_EVENTS.INVALID]: 'INVALID',
  };

  const newStatus = statusMap[payload.type];
  
  if (!newStatus) {
    console.warn(`[BTCPAY WEBHOOK] Unknown event type: ${payload.type}`);
    return;
  }

  // Validación de transición: no permitir retrocesos de estado
  // Ejemplo: si ya está SETTLED, no debe poder pasar a EXPIRED
  const currentDeposit = await prisma.deposit.findUnique({
    where: { id: depositId },
    select: { status: true },
  });

  if (!currentDeposit) {
    console.error(`[BTCPAY WEBHOOK] Deposit disappeared during update: ${depositId}`);
    return;
  }

  // Regla de idempotencia: si ya está en estado final, no hacer nada
  const finalStates = ['SETTLED', 'EXPIRED', 'INVALID'];
  if (finalStates.includes(currentDeposit.status)) {
    console.log(
      `[BTCPAY WEBHOOK] ℹ️ Deposit ${depositId} already in final state: ${currentDeposit.status}. Skipping.`
    );
    return;
  }

  // Actualizar el depósito
  await prisma.deposit.update({
    where: { id: depositId },
    data: {
      status: newStatus,
      btcpayEvent: payload.type,
      // Si el pago se liquidó, registrar el timestamp
      confirmedAt: newStatus === 'SETTLED' ? new Date() : undefined,
    },
  });
}