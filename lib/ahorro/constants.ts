export const AHORRO_CONFIG = {
  cookieName: 'ahorro_access_granted',
  defaultSatAmount: 2100,
  cookieMaxAgeDays: 30,
  webhookPath: '/api/ahorro/webhook/btcpay',
} as const;

export const ACCESS_MODES: Record<string, { label: string; description: string }> = {
  open: { label: 'ABIERTO', description: 'Acceso libre para pruebas v1' },
  invite: { label: 'INVITACIÓN', description: 'Requiere código de acceso' },
  payment: { label: 'PAYWALL', description: 'Desbloqueo con Lightning' },
} as const;
