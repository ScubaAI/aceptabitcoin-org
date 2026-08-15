/**
 * Ahorro Module Constants
 * 
 * Reglas de negocio que afectan tanto la lógica del backend como la presentación UI.
 * Siguiendo §10.3 Constants-as-Design-Tokens del Design System v3.0.
 * 
 * ⚠️ NO poner datos específicos aquí (ej. códigos de invitación concretos).
 * Los datos van a la base de datos vía prisma/seed.ts.
 */

// ════════════════════════════════════════════════════════════════
// CONFIGURACIÓN BASE (preservado de versión anterior)
// ════════════════════════════════════════════════════════════════

export const AHORRO_CONFIG = {
  cookieName: 'ahorro_access_granted',
  defaultSatAmount: 2100,
  cookieMaxAgeDays: 30,
  webhookPath: '/api/ahorro/webhook/btcpay',
  
  // JWT configuration (emitido por LNURL-Auth o por InviteCode)
  jwt: {
    cookieName: 'ahorro_session',
    maxAgeDays: 7,
    algorithm: 'HS256' as const,
  },
} as const;

export const ACCESS_MODES: Record<string, { label: string; description: string }> = {
  open: { label: 'ABIERTO', description: 'Acceso libre para pruebas v1' },
  invite: { label: 'INVITACIÓN', description: 'Requiere código de acceso' },
  payment: { label: 'PAYWALL', description: 'Desbloqueo con Lightning' },
} as const;

// ════════════════════════════════════════════════════════════════
// CÓDIGOS DE INVITACIÓN (reglas, no datos)
// ════════════════════════════════════════════════════════════════

export const INVITE_CODE_RULES = {
  /**
   * Regex para validar códigos de invitación.
   * Formato: AAAA-BBBB-CCCC (3 bloques de 4 caracteres alfanuméricos uppercase)
   * Ejemplos válidos: ABMX-7X9K-2026, GNS1-ABCD-1234
   */
  format: /^[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}$/,
  
  /** Longitud total del código incluyendo guiones */
  length: 14,
  
  /** Días antes de que un código no usado expire (0 = nunca expira) */
  expirationDays: 0,
  
  /** Prefijo recomendado para códigos emitidos por el equipo */
  officialPrefix: 'ABMX',
} as const;

// ════════════════════════════════════════════════════════════════
// DEPOSIT TIERS (montos de depósito para UI + validación backend)
// ════════════════════════════════════════════════════════════════

export const DEPOSIT_TIERS = {
  seed: {
    id: 'seed',
    amountSats: 21_000,
    label: 'SEMILLA',
    description: 'Depósito mínimo para comenzar',
    category: 'genesis' as const,
  },
  boost: {
    id: 'boost',
    amountSats: 210_000,
    label: 'IMPULSO',
    description: 'Ahorro estratégico recomendado',
    category: 'standard' as const,
  },
  sovereign: {
    id: 'sovereign',
    amountSats: 2_100_000,
    label: 'SOBERANÍA',
    description: 'Depósito soberano alto',
    category: 'sovereign' as const,
  },
} as const;

/** Monto mínimo aceptado para depósitos (en satoshis) */
export const MIN_DEPOSIT_SATS = 1_000;

/** Monto máximo por transacción (en satoshis, 0.1 BTC) */
export const MAX_DEPOSIT_SATS = 10_000_000;

// ════════════════════════════════════════════════════════════════
// BTCPAY WEBHOOK EVENTS (eventos que procesamos)
// ════════════════════════════════════════════════════════════════

export const BTCPAY_WEBHOOK_EVENTS = {
  /** Pago recibido en la red, pendiente de confirmaciones */
  PAYMENT_RECEIVED: 'InvoiceReceivedPayment',
  /** Pago confirmado y liquidado */
  SETTLED: 'InvoiceSettled',
  /** Factura expiró sin pago */
  EXPIRED: 'InvoiceExpired',
  /** Factura marcada como inválida */
  INVALID: 'InvoiceInvalid',
  /** Factura creada */
  CREATED: 'InvoiceCreated',
} as const;

/** Eventos que disparan cambios de estado en la tabla Deposit */
export const BTCPAY_STATUS_EVENTS = [
  BTCPAY_WEBHOOK_EVENTS.SETTLED,
  BTCPAY_WEBHOOK_EVENTS.EXPIRED,
  BTCPAY_WEBHOOK_EVENTS.INVALID,
] as const;

// ════════════════════════════════════════════════════════════════
// DEPOSIT STATUS UI LABELS (mapeo de enums Prisma → UI)
// ════════════════════════════════════════════════════════════════

export const DEPOSIT_STATUS_UI: Record<
  string,
  { label: string; color: string; description: string }
> = {
  PENDING: {
    label: 'PENDIENTE',
    color: 'text-gray-400',
    description: 'Esperando tu pago',
  },
  PROCESSING: {
    label: 'PROCESANDO',
    color: 'text-yellow-400',
    description: 'Pago detectado, confirmando en la red',
  },
  SETTLED: {
    label: 'ACREDITADO',
    color: 'text-matrix',
    description: 'Depósito confirmado y disponible',
  },
  EXPIRED: {
    label: 'EXPIRADO',
    color: 'text-gray-500',
    description: 'La factura expiró sin pago',
  },
  INVALID: {
    label: 'INVÁLIDO',
    color: 'text-red-500',
    description: 'Pago rechazado o monto incorrecto',
  },
} as const;

// ════════════════════════════════════════════════════════════════
// ORACLE MESSAGES (mensajes del sistema siguiendo §9 Oracle Voice)
// ════════════════════════════════════════════════════════════════

export const ORACLE_MESSAGES = {
  depositSettled: {
    title: 'DEPÓSITO SOBERANO ACREDITADO',
    body: 'Tus satoshis han sido confirmados on-chain y ahora forman parte de la liquidez local.',
  },
  depositExpired: {
    title: 'FACTURA EXPIRADA',
    body: 'El tiempo de pago expiró. Genera una nueva factura cuando estés listo.',
  },
  inviteCodeUsed: {
    title: 'ACCESO SOBERANO CONCEDIDO',
    body: 'Bienvenido a la Mesa de Liquidez. Tu capital ahora es infraestructura.',
  },
  inviteCodeInvalid: {
    title: 'CÓDIGO INVÁLIDO',
    body: 'El código no existe o ya fue utilizado. Verifica e intenta de nuevo.',
  },
} as const;