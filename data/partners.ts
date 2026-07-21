export interface Partner {
  id: string;
  name: string;
  url: string;
  tagline: string;
  description: string;
  icon: string; // Nombre del icono de Lucide (ej: "Wallet", "ShieldCheck")
  protocol?: string; // Protocolo técnico o marco regulatorio
  requiresKYC: boolean; // Transparencia radical: ¿Requiere identificación?
  status?: 'online' | 'maintenance' | 'offline'; // Estado del nodo para UI técnica
}

export const PARTNERS: Partner[] = [
  {
    id: "aureo",
    name: "Aureo Bitcoin",
    url: "https://app.aureobitcoin.com/es/auth/signup?ref=abo",
    tagline: "Adquisición premium, directo a tu wallet",
    description: "Puente soberano en México. Compra Bitcoin con SPEI y recíbelo directamente en tu cartera de autocustodia. Sin altcoins, sin stablecoins, solo Bitcoin.",
    icon: "Wallet",
    protocol: "SPEI / Direct-to-Wallet",
    requiresKYC: true,
    status: "online"
  },
  {
    id: "arcadia",
    name: "Arcadia₿",
    url: "https://www.arcadiab.com/",
    tagline: "La empresa Bitcoin más antigua de México",
    description: "Primera tesorería Bitcoin pública del país. Regulada como SOFOM, ofrece custodia multifirma, compras recurrentes sin comisión y soporte humano local.",
    icon: "ShieldCheck",
    protocol: "SOFOM / Custodia Multifirma",
    requiresKYC: true,
    status: "online"
  },
  {
    id: "bullbitcoin",
    name: "Bull Bitcoin",
    url: "https://app.bullbitcoin.com/registration/trtxx1",
    tagline: "Non-custodial & Privacy Focused",
    description: "Exchange canadiense con enfoque en no-custodia y retiros Lightning. *Requiere KYC* para cumplir con regulaciones financieras, pero tú mantienes el control de tus fondos.",
    icon: "Globe",
    protocol: "Non-Custodial / KYC Regulado",
    requiresKYC: true,
    status: "online"
  },
  {
    id: "hodlhodl",
    name: "Hodl Hodl",
    url: "https://hodlhodl.com/",
    tagline: "Trade Bitcoin without giving up custody",
    description: "Plataforma P2P global con contratos multisig. Tú mantienes el control de tus llaves en todo momento. Sin fondos retenidos por la plataforma.",
    icon: "Lock",
    protocol: "Multisig Escrow",
    requiresKYC: false,
    status: "online"
  },
];