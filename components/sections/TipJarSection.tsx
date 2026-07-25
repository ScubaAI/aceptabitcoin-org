"use client";

import { useState, useEffect, useRef, useMemo, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import dynamic from "next/dynamic";
import { 
  Zap, Copy, Check, CreditCard, ExternalLink, Coins, 
  ShieldCheck, Banknote, Heart, Users, Building, Sprout, Rocket, Sparkles
} from "lucide-react";

import MatrixRain from "@/components/ui/MatrixRain";

// ✅ v3.0: QR Code renderizado exclusivamente en cliente
const QRCodeSVG = dynamic(
  () => import("qrcode.react").then((mod) => mod.QRCodeSVG),
  { 
    ssr: false, 
    loading: () => <div className="w-[200px] h-[200px] bg-white/10 rounded-2xl animate-pulse mx-auto" /> 
  }
);

// ════════════════════════════════════════════════════════════════
// CONFIG — Datos estáticos de la infraestructura de pago
// ════════════════════════════════════════════════════════════════
const CONFIG = {
  // ✅ Nuevo POS para Aportación Libre (Prominente)
  btcpayFreePos: "https://btcpay-c092a-u74190.vm.elestio.app/apps/mnLQVtSbPYp5TAXFm7rGqWPWvGt/pos",
  // POS estándar para montos fijos
  btcpayPosAction: "https://btcpay-c092a-u74190.vm.elestio.app/apps/gEUZWSsGpTJbhtXBtdEqnoSM2J4/pos",
  onChainAddress: "bc1q4kfrqsm60jxx8xva9p6erx6pp6zqaazy00nhrk",
  mercadoPagoLink: "https://link.mercadopago.com.mx/skinlabclothingclub",
  mercadoPagoAlias: "aceptabitcoin.mp",
};

type TabId = "lightning" | "onchain" | "fiat";

interface ContributionTier {
  id: string;
  amount: string;
  label: string;
  impact: string;
  goal: string;
  Icon: typeof Sprout;
  category: "genesis" | "standard" | "sovereign";
  choiceKey: string;
}

// ✅ Lenguaje claro, enfocado en impacto comunitario, no en tecnicismos de blockchain
const CONTRIBUTION_TIERS: ContributionTier[] = [
  {
    id: "seed",
    amount: "21,000",
    label: "SEMILLA",
    impact: "Ayuda a cubrir los costos básicos de servidores, dominio y mantenimiento de la plataforma.",
    goal: "Infraestructura básica",
    Icon: Sprout,
    category: "genesis",
    choiceKey: "tip-21k-sats",
  },
  {
    id: "boost",
    amount: "210,000",
    label: "IMPULSO",
    impact: "Patrocina mentorías y contenido educativo para que más personas en México adopten Bitcoin.",
    goal: "Educación y adopción",
    Icon: Rocket,
    category: "standard",
    choiceKey: "tip-210k-sats",
  },
  {
    id: "sovereign",
    amount: "2,100,000",
    label: "SOBERANÍA",
    impact: "Financia talleres presenciales y herramientas avanzadas para comerciantes locales.",
    goal: "Desarrollo comercial",
    Icon: Building,
    category: "sovereign",
    choiceKey: "tip-2m-sats",
  },
];

const getTierStyle = (category: ContributionTier["category"]) => {
  switch (category) {
    case "genesis":
      return { border: "border-matrix/70", text: "text-matrix", hoverText: "group-hover:text-matrix", bg: "bg-matrix/5", glow: "shadow-matrix", badgeBg: "bg-matrix/10" };
    case "standard":
      return { border: "border-bitcoin/40", text: "text-bitcoin", hoverText: "group-hover:text-bitcoin", bg: "bg-bitcoin/5", glow: "shadow-bitcoin", badgeBg: "bg-bitcoin/10" };
    case "sovereign":
      return { border: "border-bitcoin", text: "text-bitcoin", hoverText: "group-hover:text-bitcoin", bg: "bg-bitcoin/10", glow: "shadow-bitcoin-hover", badgeBg: "bg-bitcoin/20" };
    default:
      return { border: "border-white/20", text: "text-gray-300", hoverText: "group-hover:text-white", bg: "bg-white/5", glow: "shadow-none", badgeBg: "bg-white/5" };
  }
};

// ════════════════════════════════════════════════════════════════
// ContributionCard (Memoizado)
// ════════════════════════════════════════════════════════════════
const ContributionCard = memo(({ tier, index }: { tier: ContributionTier; index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const style = useMemo(() => getTierStyle(tier.category), [tier.category]);

  useGSAP(() => {
    const el = cardRef.current;
    if (!el) return;

    // Efecto de flotación suave
    gsap.to(el, {
      y: -4,
      duration: 2 + index * 0.2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: index * 0.15,
    });

    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      gsap.to(el, {
        rotationY: x * 4,
        rotationX: -y * 4,
        duration: 0.6,
        ease: "power2.out",
        transformPerspective: 800,
      });
    };

    const onLeave = () => {
      gsap.to(el, {
        rotationY: 0,
        rotationX: 0,
        duration: 0.8,
        ease: "elastic.out(1, 0.5)",
        transformPerspective: 800,
      });
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, { scope: cardRef });

  const handleTitleHover = () => {
    if (!titleRef.current) return;
    gsap.to(titleRef.current, {
      x: "+=2",
      duration: 0.05,
      yoyo: true,
      repeat: 5,
      ease: "power1.inOut",
      onComplete: () => gsap.set(titleRef.current, { x: 0 }),
    });
  };

  return (
    <form action={CONFIG.btcpayPosAction} method="POST" className="w-full h-full">
      <input type="hidden" name="choiceKey" value={tier.choiceKey} />
      
      <div
        ref={cardRef}
        className={`relative h-full border-2 ${style.border} ${style.bg} backdrop-blur-md rounded-2xl overflow-hidden transition-colors duration-500 will-change-transform ${style.glow} group flex flex-col`}
      >
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-current to-transparent opacity-50 animate-scanline" />
        <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-current opacity-40 pointer-events-none" />
        <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-current opacity-40 pointer-events-none" />

        <div className="px-5 py-4 border-b border-white/10 flex items-center justify-between bg-black/40">
          <div className={`px-2 py-1 text-[9px] font-mono uppercase tracking-widest border ${style.border} ${style.text} rounded`}>
            {tier.goal}
          </div>
          <div className={`${style.text}`} aria-hidden="true">
            <tier.Icon className="h-5 w-5" />
          </div>
        </div>

        <button type="submit" className="w-full text-left p-5 active:scale-[0.98] transition-transform flex-1 flex flex-col">
          <div className="space-y-3 flex-1">
            <div>
              <div className="text-[10px] font-mono text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
                <Heart className="h-3 w-3" />
                {tier.amount} sats
              </div>
              <h3
                ref={titleRef}
                onMouseEnter={handleTitleHover}
                className={`font-serif text-2xl font-bold mt-1 text-white ${style.hoverText} transition-colors cursor-pointer tracking-tight`}
              >
                {tier.label}
              </h3>
            </div>

            <p className="font-mono text-xs text-gray-400 leading-relaxed flex-1">
              {tier.impact}
            </p>

            <div className="pt-3 border-t border-white/5 flex items-center justify-between mt-auto">
              <span className={`font-mono text-[10px] uppercase tracking-widest ${style.text} flex items-center gap-1.5`}>
                <span className={`inline-block w-1.5 h-1.5 rounded-full bg-current animate-pulse`} />
                APORTAR AHORA
              </span>
              <Zap className={`h-4 w-4 ${style.text} group-hover:scale-110 transition-transform`} />
            </div>
          </div>
        </button>
      </div>
    </form>
  );
});
ContributionCard.displayName = "ContributionCard";

// ════════════════════════════════════════════════════════════════
// MAIN — TipJarSection
// ════════════════════════════════════════════════════════════════
export default function TipJarSection() {
  const [isMounted, setIsMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<TabId>("lightning");
  const [copied, setCopied] = useState<string | null>(null);

  const titleRef = useRef<HTMLHeadingElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (titleRef.current) {
      const spans = titleRef.current.querySelectorAll(".title-word");
      gsap.from(spans, {
        opacity: 0, y: 30, rotateX: -90, stagger: 0.12, duration: 0.8, ease: "power3.out", delay: 0.2
      });
    }

    const cards = document.querySelectorAll(".contribution-card");
    cards.forEach((card, i) => {
      gsap.from(card, {
        opacity: 0, y: 40, scale: 0.95, duration: 0.8,
        delay: 0.1 * i, ease: "power3.out",
        scrollTrigger: {
          trigger: card,
          start: "top bottom-=50",
          toggleActions: "play none none reverse",
        },
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, { scope: containerRef });

  const theme = useMemo(() => {
    if (activeTab === "fiat") {
      return { hex: "#00FF41", border: "border-matrix/40", text: "text-matrix", glow: "shadow-matrix" };
    }
    return { hex: "#F7931A", border: "border-bitcoin/40", text: "text-bitcoin", glow: "shadow-bitcoin" };
  }, [activeTab]);

  const handleCopy = async (text: string, label: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(label);
    if (navigator.vibrate) navigator.vibrate(30);
    setTimeout(() => setCopied(null), 1800);
  };

  const CopyButton = ({ text, label }: { text: string; label: string }) => (
    <button
      onClick={() => handleCopy(text, label)}
      className="flex items-center gap-2 px-3 py-1.5 rounded-lg font-mono text-[10px] border border-white/20 bg-white/5 hover:bg-white/10 transition-all"
    >
      {copied === label ? (
        <><Check size={12} className="text-matrix" /><span className="text-matrix">COPIADO</span></>
      ) : (
        <><Copy size={12} /><span className="text-gray-400">COPIAR</span></>
      )}
    </button>
  );

  if (!isMounted) {
    return (
      <section className="relative py-24 bg-black scroll-mt-24">
        <div className="container max-w-4xl mx-auto px-4 space-y-8">
          <div className="h-8 w-64 bg-white/5 rounded-full mx-auto animate-pulse" />
          <div className="h-16 w-96 bg-white/5 rounded-xl mx-auto animate-pulse" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => <div key={i} className="h-48 w-full bg-white/5 rounded-2xl animate-pulse" />)}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="donativo-soberano" className="relative py-24 overflow-hidden bg-black scroll-mt-24">
      <div className="absolute inset-0">
        <MatrixRain className="opacity-[0.08]" speed={0.45} opacity={0.09} color={theme.hex} />
      </div>
      
      <div 
        className="absolute inset-0 bg-[radial-gradient(rgba(247,147,26,0.04)_1px,transparent_1px)] bg-[size:50px_50px] opacity-40 pointer-events-none" 
        aria-hidden="true"
      />

      <div ref={containerRef} className="container relative z-10 px-4 max-w-5xl mx-auto">
        
        {/* ✅ NUEVO MENSAJE CLARO Y SIN JERGA TÉCNICA */}
        <div className="text-center mb-10">
          <div
            className={`inline-flex items-center gap-2 px-4 py-1.5 bg-black/80 backdrop-blur-md border ${theme.border} rounded-full font-mono text-xs ${theme.text} tracking-[3px] uppercase mb-6 ${theme.glow}`}
          >
            <Sparkles className="h-3.5 w-3.5" />
            INFRAESTRUCTURA COMUNITARIA
          </div>

          <h2
            ref={titleRef}
            className="font-serif text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tighter flex flex-wrap justify-center gap-x-3 gap-y-2 leading-tight"
          >
            <span className="title-word">FORTALECE</span>
            <span className="title-word">LA</span>
            <span className={`title-word ${theme.text} transition-colors duration-700`}>RED</span>
          </h2>
          
          <p className="mt-6 font-mono text-sm sm:text-base text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Este es un espacio comunitario. Tu aporte mantiene vivos nuestros servidores, convertidores y herramientas educativas. 
            <span className="text-white font-bold"> A cambio, te damos acceso total</span> a todo lo necesario para que tu experiencia con Bitcoin sea productiva y soberana.
          </p>
        </div>

        {/* ✅ APORTACIÓN LIBRE PROMINENTE (NUEVO POS) */}
        <form action={CONFIG.btcpayFreePos} method="POST" className="w-full mb-12 contribution-card">
          <button 
            type="submit"
            className="group relative w-full border-2 border-bitcoin/60 bg-bitcoin/5 hover:bg-bitcoin/10 backdrop-blur-md rounded-2xl p-6 sm:p-8 transition-all duration-300 shadow-bitcoin-hover flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 text-center sm:text-left overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-bitcoin to-transparent animate-scanline" />
            
            <div className="relative flex-shrink-0 p-4 rounded-full bg-black border-2 border-bitcoin/50 shadow-[0_0_20px_rgba(247,147,26,0.3)] group-hover:scale-110 transition-transform duration-300">
              <Heart className="h-8 w-8 text-bitcoin animate-pulse" />
            </div>
            
            <div className="flex-1">
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white group-hover:text-bitcoin transition-colors">
                APORTACIÓN LIBRE
              </h3>
              <p className="font-mono text-xs sm:text-sm text-gray-400 mt-1">
                Tú decides el monto. Cada satoshi cuenta para mantener estas herramientas gratuitas para todos.
              </p>
            </div>

            <div className="flex-shrink-0 px-6 py-3 bg-bitcoin text-black font-mono font-bold text-sm uppercase tracking-widest rounded-xl group-hover:bg-white transition-colors">
              Elegir Monto →
            </div>
          </button>
        </form>

        {/* TABS DE MÉTODO DE PAGO */}
        <div className="flex p-1.5 gap-1.5 bg-black/70 border border-white/10 rounded-2xl max-w-xl mx-auto mb-10">
          {[
            { id: "lightning" as TabId, label: "LIGHTNING", icon: Zap, category: "standard" as const },
            { id: "onchain" as TabId, label: "ON-CHAIN", icon: Coins, category: "genesis" as const },
            { id: "fiat" as TabId, label: "FIAT", icon: CreditCard, category: "sovereign" as const },
          ].map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            const tabStyle = getTierStyle(tab.category);
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-mono text-[11px] font-bold tracking-widest uppercase transition-all duration-300
                  ${active 
                    ? `${tabStyle.bg} ${tabStyle.text} border ${tabStyle.border} ${tabStyle.glow}` 
                    : "text-gray-500 hover:text-white border border-transparent hover:border-white/10"}`}
              >
                <Icon size={14} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* CONTENIDO DE LAS PESTAÑAS */}
        <AnimatePresence mode="wait">
          {activeTab === "lightning" && (
            <motion.div
              key="lightning"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center gap-2 px-4 py-2 bg-black/60 border border-matrix/30 rounded-full self-center mx-auto w-fit mb-8">
                <span className="h-2 w-2 rounded-full bg-matrix animate-pulse shadow-terminal" />
                <span className="font-mono text-[10px] text-matrix tracking-widest">BTCPAY SERVER • ONLINE</span>
              </div>

              {/* ✅ GRID RESPONSIVO: Vertical en móvil, Horizontal en desktop */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {CONTRIBUTION_TIERS.map((tier, i) => (
                  <div key={tier.id} className="contribution-card h-full">
                    <ContributionCard tier={tier} index={i} />
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-2 text-amber-500/70 text-[10px] font-mono justify-center">
                <ShieldCheck size={12} />
                <span>FACTURA DINÁMICA • PROCESO SEGURO Y SIN INTERMEDIARIOS</span>
              </div>
            </motion.div>
          )}

          {activeTab === "onchain" && (
            <motion.div
              key="onchain"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="max-w-md mx-auto"
            >
              <div className="space-y-6">
                {/* ✅ QR CENTRADO Y CAJA DE TEXTO LEGIBLE */}
                <div className="relative flex flex-col items-center justify-center p-6 sm:p-8 bg-white rounded-2xl border-2 border-bitcoin/50 overflow-hidden shadow-bitcoin-hover">
                  {/* Efecto "luz de escaneo" (dentista) */}
                  <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-b from-transparent via-bitcoin to-transparent pointer-events-none animate-pulse" />
                  
                  <QRCodeSVG
                    value={`bitcoin:${CONFIG.onChainAddress}?label=AceptaBitcoin&message=AportacionComunitaria`}
                    size={200} 
                    level="H" 
                    fgColor="#000000" 
                    bgColor="#FFFFFF"
                    className="relative z-10"
                  />
                  
                  {/* ✅ Caja de texto con alto contraste (Fondo negro, texto y borde naranja) */}
                  <div className="relative z-10 mt-6 bg-black text-bitcoin border border-bitcoin text-xs font-mono font-bold px-4 py-2 rounded-lg shadow-lg flex items-center gap-2">
                    <span>ESCANEAR DIRECCIÓN</span>
                  </div>

                  {/* Esquinas Tron */}
                  <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-bitcoin pointer-events-none" />
                  <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-bitcoin pointer-events-none" />
                </div>

                <div className="bg-black/60 border border-white/10 rounded-xl p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="font-mono text-[10px] text-gray-500 uppercase tracking-widest">DIRECCIÓN DE RED</p>
                    <span className="font-mono text-[9px] text-bitcoin uppercase tracking-widest">NATIVA</span>
                  </div>
                  <p className="font-mono text-xs text-white break-all select-all">
                    {CONFIG.onChainAddress}
                  </p>
                  <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[10px] font-mono">
                    <span className="text-gray-500">Red: Bitcoin Mainnet</span>
                    <CopyButton text={CONFIG.onChainAddress} label="onchain" />
                  </div>
                </div>

                <div className="flex items-center gap-2 text-amber-500/70 text-[10px] font-mono justify-center">
                  <ShieldCheck size={12} />
                  <span>LIQUIDACIÓN DIRECTA • TÚ TIENES EL CONTROL</span>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "fiat" && (
            <motion.div
              key="fiat"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="max-w-md mx-auto"
            >
              <div className="space-y-4">
                <div className="bg-black/60 border border-matrix/20 rounded-2xl p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] text-gray-500 uppercase tracking-widest">OPCIÓN TRADICIONAL</span>
                    <span className="font-mono text-[9px] text-matrix uppercase tracking-widest">MXN</span>
                  </div>
                  <a
                    href={CONFIG.mercadoPagoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full py-3 bg-matrix text-black font-mono font-bold uppercase tracking-widest text-sm rounded-xl text-center hover:bg-matrix/90 transition-colors"
                  >
                    💳 APORTAR CON MERCADO PAGO
                  </a>
                </div>

                <div className="bg-black/60 border border-matrix/20 rounded-xl p-4">
                  <p className="font-mono text-[10px] text-gray-500 uppercase tracking-widest mb-1">ALIAS DE TRANSFERENCIA</p>
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-mono text-sm text-white">{CONFIG.mercadoPagoAlias}</p>
                    <CopyButton text={CONFIG.mercadoPagoAlias} label="mp-alias" />
                  </div>
                </div>

                <div className="flex items-center gap-2 text-matrix/70 text-[10px] font-mono justify-center">
                  <Banknote size={12} />
                  <span>PESO MXN • TRANSFERENCIA INSTANTÁNEA</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <p className="text-center mt-16 font-mono text-[10px] text-gray-600 tracking-widest uppercase">
          ORACLE SYSTEM v3.0 // GRACIAS POR CONSTRUIR CON NOSOTROS
        </p>
      </div>
    </section>
  );
}