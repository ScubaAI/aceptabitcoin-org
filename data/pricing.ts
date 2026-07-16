export interface PricingTier {
  id: string;
  name: string;
  tagline: string;
  setup: string;
  fee: string;
  monthly: string;
  delivery: string;
  features: string[];
  target: string;
  isPopular?: boolean;
  ctaText: string;
  ctaLink: string;
}

export const PRICING_TIERS: PricingTier[] = [
  {
    id: "basico",
    name: "PLAN 01 // BÁSICO",
    tagline: "Social Commerce Soberano",
    setup: "$300 MXN", // ✅ Activación única agregada
    fee: "1.5% Protocol Fee",
    monthly: "$0 MXN",
    delivery: "24 hrs",
    features: [
      "BTCPay Server en nuestro nodo multi-cliente",
      "Links de Pago Ilimitados (Bio, Stories, DMs)",
      "Fricción Cero: Tu red social es tu POS",
      "Custodia Cero: Fondos directo a tu wallet",
      "Split Automático (Prism): Comisión descontada al instante",
      "Activación express y configuración guiada"
    ],
    target: "Food trucks, creadores de contenido, cafeterías y servicios freelance.",
    ctaText: "[ INICIAR_SISTEMA ]",
    ctaLink: "https://wa.me/525586765117?text=Hola,%20quiero%20activar%20el%20Plan%20Básico"
  },
  {
    id: "pro",
    name: "PLAN 02 // PRO",
    tagline: "Landing Page + POS Digital",
    setup: "$9,999 MXN",
    fee: "1.0%",
    monthly: "$0 MXN",
    delivery: "48 hrs",
    isPopular: true,
    features: [
      "Todo lo incluido en el Plan Básico",
      "Landing page profesional (Tema día/noche)",
      "Menú / Catálogo digital interactivo",
      "QR de pago dinámico por producto",
      "Sistema de reservas (Cal.com) + Hosting 1 año",
      "Soporte técnico por WhatsApp prioritario"
    ],
    target: "Negocios con presencia digital que quieren destacar y profesionalizar su cobro.",
    ctaText: "[ CONTRATAR_PRO ]",
    ctaLink: "https://wa.me/525586765117?text=Hola,%20quiero%20el%20Plan%20Pro"
  },
  {
    id: "premium",
    name: "PLAN 03 // PREMIUM",
    tagline: "E-commerce + POS Físico",
    setup: "$14,999 MXN",
    fee: "0.75%",
    monthly: "$499 MXN",
    delivery: "5-7 días hábiles",
    features: [
      "Todo lo incluido en el Plan Pro",
      "Tienda en línea completa (Catálogo, carrito, checkout Bitcoin)",
      "Sincronización de inventario (Físico + Digital)",
      "Integración con ERP o sistema de facturación existente",
      "Diseño UI/UX personalizado (Marca blanca)",
      "Dashboard de analíticas de ventas en tiempo real"
    ],
    target: "Retail, tiendas especializadas y marcas con catálogo extenso (ej. equipamiento premium como SNS Grills).",
    ctaText: "[ DESPLEGAR_PREMIUM ]",
    ctaLink: "https://wa.me/525586765117?text=Hola,%20quiero%20cotizar%20el%20Plan%20Premium"
  },
  {
    id: "enterprise",
    name: "PLAN 04 // ENTERPRISE",
    tagline: "Infraestructura Soberana a Medida",
    setup: "Cotización personalizada",
    fee: "Negociable",
    monthly: "Desde $2,999 MXN",
    delivery: "4-8 semanas",
    features: [
      "Todo lo incluido en el Plan Premium",
      "IA Avanzada (Agente B.O.B. entrenado con tu data y catálogo)",
      "Desarrollo de adaptaciones, plugins y APIs a la medida",
      "Nodo Bitcoin dedicado (Full Node o Lightning Node propio)",
      "SLA de soporte 24/7 con ingeniero asignado",
      "Auditoría de seguridad y soberanía de datos"
    ],
    target: "Corporativos, cadenas de restaurantes, exchanges y proyectos Web3 de alto volumen.",
    ctaText: "[ HABLAR_CON_INGENIERÍA ]",
    ctaLink: "https://wa.me/525586765117?text=Hola,%20represento%20a%20una%20empresa%20y%20quiero%20el%20Plan%20Enterprise"
  }
];