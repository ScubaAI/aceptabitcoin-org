"use client";

import { useState, useEffect, useRef, useMemo, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import dynamic from "next/dynamic";
import { 
  Zap, Copy, Check, CreditCard, ExternalLink, Coins, 
  ShieldCheck, Banknote, Heart, Users, Building, Sprout, Radio, Activity, Rocket
} from "lucide-react";

import MatrixRain from "@/components/ui/MatrixRain";

// ✅ v3.0: QR Code renderizado exclusivamente en cliente
const QRCodeSVG = dynamic(
  () => import("qrcode.react").then((mod) => mod.QRCodeSVG),
  { 
    ssr: false, 
    loading: () => <div className="w-[180px] h-[180px] bg-white/10 rounded-2xl animate-pulse mx-auto" /> 
  }
);

// ════════════════════════════════════════════════════════════════
// CONFIG — Datos estáticos de la infraestructura de pago
// ════════════════════════════════════════════════════════════════
const CONFIG = {
  btcpayPosAction: "https://btcpay-c092a-u74190.vm.elestio.app/apps/gEUZWSsGpTJbhtXBtdEqnoSM2J4/pos",
  btcpayDirectLink: "https://btcpay-c092a-u74190.vm.elestio.app/apps/gEUZWSsGpTJbhtXBtdEqnoSM2J4/pos",
  onChainAddress: "bc1q4kfrqsm60jxx8xva9p6erx6pp6zqaazy00nhrk",
  mercadoPagoLink: "https://link.mercadopago.com.mx/skinlabclothingclub",
  mercadoPagoAlias: "aceptabitcoin.mp",
};

type TabId = "lightning" | "onchain" | "fiat";

interface TipBlock {
  blockId: string;
  height: number;
  sats: number;
  label: string;
  category: "genesis" | "standard" | "sovereign";
  choiceKey: string;
  Icon: typeof Sprout; // Ícono semántico en lugar de emoji
  impact: string;
  communityGoal: string;
}

const TIP_BLOCKS: TipBlock[] = [
  {
    blockId: "tip-21k",
    height: 21000,
    sats: 21_000,
    label: "APOYO INICIAL",
    category: "genesis",
    choiceKey: "tip-21k-sats",
    Icon: Sprout,
    impact: "Mantiene encendida la luz de nuestro nodo educativo por un mes.",
    communityGoal: "Educación continua",
  },
  {
    blockId: "tip-210k",
    height: 210000,
    sats: 210_000,
    label: "IMPULSO ESTRATÉGICO",
    category: "standard",
    choiceKey: "tip-210k-sats",
    Icon: Rocket, // Nota: Asegúrate de importar Rocket de lucide-react si lo usas, o usa Users
    impact: "Patrocina una mentoría 1:1 para que alguien más adopte Bitcoin.",
    communityGoal: "Nuevos adoptantes",
  },
  {
    blockId: "tip-2.1m",
    height: 2100000,
    sats: 2_100_000,
    label: "SOCIO DE LA RED",
    category: "sovereign",
    choiceKey: "tip-2m-sats",
    Icon: Building,
    impact: "Financia un taller completo de Lightning para comerciantes locales.",
    communityGoal: "Adopción comercial",
  },
];

// Fallback por si Rocket no se importó, usamos Users (ya importado)
// Ajusta los imports arriba si prefieres Rocket.

const getBlockCategoryStyle = (category: TipBlock["category"]) => {
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
// TipBlockCard (Memoizado)
// ════════════════════════════════════════════════════════════════
const TipBlockCard = memo(({
  block,
  index,
  isLast,
}: {
  block: TipBlock;
  index: number;
  isLast: boolean;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const style = useMemo(() => getBlockCategoryStyle(block.category), [block.category]);

  useGSAP(() => {
    const el = cardRef.current;
    if (!el) return;

    gsap.to(el, {
      y: -6,
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
        rotationY: x * 5,
        rotationX: -y * 5,
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
      x: "+=3",
      duration: 0.05,
      yoyo: true,
      repeat: 5,
      ease: "power1.inOut",
      onComplete: () => gsap.set(titleRef.current, { x: 0 }),
    });
  };

  return (
    <>
      {!isLast && (
        <div 
          className="connector-line absolute left-1/2 -translate-x-1/2 top-full w-px h-6 bg-gradient-to-b from-bitcoin/60 to-transparent hidden md:block z-0" 
        />
      )}

      <form
        action={CONFIG.btcpayPosAction}
        method="POST"
        className="tip-block relative w-full"
        style={{ transformStyle: "preserve-3d" }}
      >
        <input type="hidden" name="choiceKey" value={block.choiceKey} />
        
        <div
          ref={cardRef}
          className={`relative border-2 ${style.border} ${style.bg} backdrop-blur-md rounded-2xl overflow-hidden transition-colors duration-500 will-change-transform ${style.glow} group`}
        >
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-current to-transparent opacity-50 animate-scanline" />
          {/* Esquinas Tron Diagonales (§4.5) */}
          <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-current opacity-40 pointer-events-none" />
          <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-current opacity-40 pointer-events-none" />

          <div className="px-5 py-3 border-b border-white/10 flex items-center justify-between bg-black/40">
            <div className="flex items-center gap-3">
              <div className="font-vt323 text-2xl text-white tracking-wider">
                #{block.height.toLocaleString("es-MX")}
              </div>
              <div className={`px-2 py-0.5 text-[9px] font-mono uppercase tracking-widest border ${style.border} ${style.text}`}>
                {block.category}
              </div>
            </div>
            <div className={`${style.text}`} aria-hidden="true">
              <block.Icon className="h-5 w-5" />
            </div>
          </div>

          <button
            type="submit"
            className="w-full text-left p-5 active:scale-[0.99] transition-transform"
          >
            <div className="space-y-3">
              <div>
                <div className="text-[10px] font-mono text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
                  <Heart className="h-3 w-3" />
                  {block.sats.toLocaleString("es-MX")} sats
                </div>
                <h3
                  ref={titleRef}
                  onMouseEnter={handleTitleHover}
                  className={`font-serif text-2xl font-bold mt-1 text-white ${style.hoverText} transition-colors cursor-pointer tracking-tight`}
                >
                  {block.label}
                </h3>
              </div>

              <p className="font-mono text-xs text-gray-400 leading-relaxed">
                {block.impact}
              </p>

              {/* Reemplazo de Hash/PrevHash por Impacto Comunitario */}
              <div className="pt-3 border-t border-white/5 flex items-center gap-2">
                <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded text-[10px] font-mono uppercase tracking-wider ${style.badgeBg} ${style.text} border ${style.border}`}>
                  <Users className="h-3 w-3" />
                  {block.communityGoal}
                </span>
             

              <div className="pt-2 flex items-center justify-between">
                <span className={`font-mono text-[10px] uppercase tracking-widest ${style.text} flex items-center gap-1.5`}>
                  <span className={`inline-block w-1.5 h-1.5 rounded-full bg-current animate-pulse`} />
                  ENVIAR APORTACIÓN →
                </span>
                <Zap className={`h-4 w-4 ${style.text} group-hover:scale-110 transition-transform`} />
              </div>
               </div>
            </div>
          </button>
        </div>
      </form>
    </>
  );
});
TipBlockCard.displayName = "TipBlockCard";

// ════════════════════════════════════════════════════════════════
// MAIN — TipJarSection
// ════════════════════════════════════════════════════════════════
export default function TipJarSection() {
  const [isMounted, setIsMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<TabId>("lightning");
  const [copied, setCopied] = useState<string | null>(null);
  const [nextBlockTime, setNextBlockTime] = useState("10:00");

  const titleRef = useRef<HTMLHeadingElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    const tick = () => {
      const now = new Date();
      const next = new Date(now);
      const nextMin = Math.ceil((now.getMinutes() + 1) / 10) * 10;
      if (nextMin >= 60) {
        next.setHours(now.getHours() + 1);
        next.setMinutes(0);
      } else {
        next.setMinutes(nextMin);
      }
      next.setSeconds(0);
      const diff = next.getTime() - now.getTime();
      const m = Math.floor(diff / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      setNextBlockTime(`${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [isMounted]);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (titleRef.current) {
      const spans = titleRef.current.querySelectorAll(".title-word");
      gsap.from(spans, {
        opacity: 0, y: 30, rotateX: -90, stagger: 0.12, duration: 0.8, ease: "power3.out", delay: 0.2
      });
    }

    const blocks = document.querySelectorAll(".tip-block");
    blocks.forEach((block, i) => {
      gsap.from(block, {
        opacity: 0, y: 80, rotationX: 12, scale: 0.95, duration: 0.9,
        delay: 0.1 * i, ease: "power3.out",
        scrollTrigger: {
          trigger: block,
          start: "top bottom-=80",
          toggleActions: "play none none reverse",
        },
        transformPerspective: 800,
      });
    });

    document.querySelectorAll(".connector-line").forEach((line) => {
      gsap.from(line, {
        scaleY: 0, transformOrigin: "top", duration: 1.2, ease: "power2.out",
        scrollTrigger: {
          trigger: line,
          start: "top center",
          toggleActions: "play none none reverse",
        }
      });
    });

    gsap.to(".bg-grid-drift", {
      y: "20%", duration: 30, repeat: -1, ease: "linear",
      modifiers: {
        y: (y: string) => `${parseFloat(y) % 50}px`
      }
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
          <div className="h-48 w-full max-w-2xl bg-white/5 rounded-3xl mx-auto animate-pulse" />
          <div className="h-12 w-full max-w-xl bg-white/5 rounded-2xl mx-auto animate-pulse" />
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
        className="bg-grid-drift absolute inset-0 bg-[radial-gradient(rgba(247,147,26,0.04)_1px,transparent_1px)] bg-[size:50px_50px] opacity-40 pointer-events-none" 
        aria-hidden="true"
      />

      <div ref={containerRef} className="container relative z-10 px-4 max-w-4xl mx-auto">
        
        <div className="text-center mb-12">
          <div
            className={`inline-flex items-center gap-2 px-4 py-1.5 bg-black/80 backdrop-blur-md border ${theme.border} rounded-full font-mono text-xs ${theme.text} tracking-[3px] uppercase mb-6 ${theme.glow}`}
          >
            <Users className="h-3.5 w-3.5" />
            HITO DE LA COMUNIDAD
            <span className="text-gray-500">•</span>
            <Activity className="h-3.5 w-3.5 animate-pulse" />
          </div>

          <h2
            ref={titleRef}
            className="font-serif text-5xl sm:text-6xl font-black text-white tracking-tighter flex flex-wrap justify-center gap-x-3 gap-y-2 leading-none"
          >
            <span className="title-word">CONSTRUYE</span>
            <span className="title-word">EL</span>
            <span className="title-word">SIGUIENTE</span>
            <span className={`title-word ${theme.text} transition-colors duration-700`}>BLOQUE</span>
          </h2>
          
          <p className="mt-5 font-mono text-sm text-gray-400 max-w-md mx-auto">
            Tu aportación, sin importar el tamaño, fortalece la educación y la adopción de Bitcoin en México. Juntos construimos soberanía.
          </p>
        </div>

        <div className="max-w-2xl mx-auto mb-16">
          <div className="bg-black/80 border border-matrix/30 backdrop-blur-md rounded-3xl p-8 text-center space-y-3 relative overflow-hidden shadow-matrix">
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-matrix/60 to-transparent animate-scanline" />
            <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-matrix/40 pointer-events-none" />
            <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-matrix/40 pointer-events-none" />
            
            <div className="uppercase tracking-[0.2em] text-[10px] text-matrix mb-2 flex items-center justify-center gap-2 font-mono">
              <Radio className="h-3 w-3 animate-pulse" /> Próximo hito estimado
            </div>
            <div 
              className="font-vt323 text-7xl sm:text-8xl text-matrix tracking-widest tabular-nums"
              aria-live="polite"
              aria-atomic="true"
              aria-label={`Tiempo restante para el próximo hito de la comunidad: ${nextBlockTime} minutos`}
            >
              {nextBlockTime}
            </div>
            <div className="mt-2 text-[10px] font-mono text-gray-500 uppercase tracking-wider">
              Meta actual: <span className="text-matrix">#{TIP_BLOCKS[TIP_BLOCKS.length - 1].height.toLocaleString("es-MX")} sats</span>
              {' • '}Estado: <span className="text-matrix">Activo</span>
            </div>
          </div>
        </div>

        <div className="flex p-1.5 gap-1.5 bg-black/70 border border-white/10 rounded-2xl max-w-xl mx-auto mb-10">
          {[
            { id: "lightning" as TabId, label: "LIGHTNING", icon: Zap, category: "standard" as const },
            { id: "onchain" as TabId, label: "ON-CHAIN", icon: Coins, category: "genesis" as const },
            { id: "fiat" as TabId, label: "FIAT", icon: CreditCard, category: "sovereign" as const },
          ].map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            const tabStyle = getBlockCategoryStyle(tab.category);
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
                {active && <span className="font-vt323 text-base">#{tab.id === "lightning" ? "21" : tab.id === "onchain" ? "10" : "05"}</span>}
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          {activeTab === "lightning" && (
            <motion.div
              key="lightning"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="max-w-md mx-auto space-y-6 relative"
            >
              <div className="flex items-center gap-2 px-4 py-2 bg-black/60 border border-matrix/30 rounded-full self-center mx-auto w-fit mb-2">
                <span className="h-2 w-2 rounded-full bg-matrix animate-pulse shadow-terminal" />
                <span className="font-mono text-[10px] text-matrix tracking-widest">BTCPAY SERVER • ONLINE</span>
              </div>

              {TIP_BLOCKS.map((block, i) => (
                <TipBlockCard
                  key={block.blockId}
                  block={block}
                  index={i}
                  isLast={i === TIP_BLOCKS.length - 1}
                />
              ))}

              <a
                href={CONFIG.btcpayDirectLink}
                target="_blank"
                rel="noopener noreferrer"
                className="tip-block block relative w-full p-4 bg-black/60 border border-white/10 rounded-2xl hover:border-matrix/40 transition-colors text-center group"
              >
                <div className="font-mono text-[10px] text-gray-500 uppercase tracking-widest mb-1">Monto personalizado</div>
                <div className="font-serif text-lg text-white group-hover:text-matrix transition-colors flex items-center justify-center gap-2">
                  <Heart className="h-4 w-4 text-bitcoin" />
                  APORTACIÓN LIBRE <span className="font-mono text-xs text-gray-500">(mín. 5k sats)</span>
                </div>
              </a>

              <div className="flex items-center gap-2 mt-4 text-amber-500/70 text-[10px] font-mono justify-center">
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
              className="max-w-md mx-auto"
            >
              <div className="space-y-6">
                <div className="relative p-4 bg-white rounded-2xl border-2 border-bitcoin/50 group overflow-hidden shadow-bitcoin-hover">
                  <QRCodeSVG
                    value={`bitcoin:${CONFIG.onChainAddress}?label=AceptaBitcoin&message=AportacionComunitaria`}
                    size={180} level="H" fgColor="#000000" bgColor="#FFFFFF"
                  />
                  <div 
                    className="absolute inset-x-0 h-1 bg-gradient-to-b from-transparent via-bitcoin to-transparent pointer-events-none animate-mining-pulse"
                    style={{ top: 0 }}
                  />
                  <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-bitcoin text-black text-[10px] font-mono font-bold px-3 py-0.5 rounded shadow-md whitespace-nowrap">
                    ESCANEAR DIRECCIÓN
                  </div>
                  <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-bitcoin pointer-events-none" />
                  <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-bitcoin pointer-events-none" />
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

                <div className="bg-black/60 border border-matrix/20 rounded-xl p-4">
                  <p className="font-mono text-[10px] text-gray-500 uppercase tracking-widest mb-1">ENLACE DIRECTO</p>
                  <a href={CONFIG.mercadoPagoLink} target="_blank" rel="noopener noreferrer" 
                     className="font-mono text-sm text-matrix hover:underline truncate flex items-center gap-1">
                    link.mercadopago.com.mx <ExternalLink size={12} />
                  </a>
                </div>

                <div className="flex items-center gap-2 text-matrix/70 text-[10px] font-mono justify-center">
                  <Banknote size={12} />
                  <span>PESO MXN • TRANSFERENCIA INSTANTÁNEA</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <p className="text-center mt-12 font-mono text-[10px] text-gray-600 tracking-widest uppercase">
          ORACLE SYSTEM v3.0 // GRACIAS POR CONSTRUIR CON NOSOTROS
        </p>
      </div>
    </section>
  );
}