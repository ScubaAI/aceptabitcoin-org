'use client';

import { useState, useEffect, useRef, useMemo, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import dynamic from 'next/dynamic';
import { 
  Zap, Copy, Check, CreditCard, ExternalLink, Coins, 
  Terminal, ShieldCheck, Banknote, Hash, Link as LinkIcon,
  Cpu, Radio, Activity
} from "lucide-react";

import MatrixRain from "@/components/ui/MatrixRain";

// ✅ v3.0: QR Code renderizado exclusivamente en cliente (map.md spec)
const QRCodeSVG = dynamic(
  () => import('qrcode.react').then((mod) => mod.QRCodeSVG),
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

type TabId = 'lightning' | 'onchain' | 'fiat';

interface TipBlock {
  blockId: string;
  height: number;
  sats: number;
  label: string;
  category: 'genesis' | 'standard' | 'strategic' | 'sovereign';
  choiceKey: string;
  emoji: string;
  prevHash: string;
  hash: string;
  impact: string;
}

const TIP_BLOCKS: TipBlock[] = [
  {
    blockId: 'tip-21k',
    height: 21000,
    sats: 21_000,
    label: 'APOYO BÁSICO',
    category: 'genesis',
    choiceKey: 'tip-21k-sats',
    emoji: '⚡',
    prevHash: '0000000000000000000000000000000000000000000000000000000000000000',
    hash: '0000a7f3b2c1d8e9f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7',
    impact: 'Cubre 1 mes de hosting del nodo educativo',
  },
  {
    blockId: 'tip-210k',
    height: 210000,
    sats: 210_000,
    label: 'APOYO ESTRATÉGICO',
    category: 'standard',
    choiceKey: 'tip-210k-sats',
    emoji: '🚀',
    prevHash: '0000a7f3b2c1d8e9f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7',
    hash: '0000b8e4c3d2e1f0a9b8c7d6e5f4a3b2c1d0e9f8a7b6c5d4e3f2a1b0c9d8e7f6',
    impact: 'Patrocina 1 hora de mentoría 1:1 para un nuevo adopter',
  },
  {
    blockId: 'tip-2.1m',
    height: 2100000,
    sats: 2_100_000,
    label: 'SOCIO SOBERANO',
    category: 'sovereign',
    choiceKey: 'tip-2m-sats',
    emoji: '🏗️',
    prevHash: '0000b8e4c3d2e1f0a9b8c7d6e5f4a3b2c1d0e9f8a7b6c5d4e3f2a1b0c9d8e7f6',
    hash: '0000c9f5d4e3f2a1b0c9d8e7f6a5b4c3d2e1f0a9b8c7d6e5f4a3b2c1d0e9f8a7',
    impact: 'Sostiene 1 workshop de Lightning para comerciantes locales',
  },
];

const getBlockCategoryStyle = (category: TipBlock['category']) => {
  switch (category) {
    case 'genesis':
      return { border: 'border-matrix/70', text: 'text-matrix', hoverText: 'group-hover:text-matrix', bg: 'bg-matrix/5', glow: 'shadow-matrix', badgeBg: 'bg-matrix/10' };
    case 'standard':
      return { border: 'border-bitcoin/40', text: 'text-bitcoin', hoverText: 'group-hover:text-bitcoin', bg: 'bg-bitcoin/5', glow: 'shadow-bitcoin', badgeBg: 'bg-bitcoin/10' };
    case 'sovereign':
      return { border: 'border-bitcoin', text: 'text-bitcoin', hoverText: 'group-hover:text-bitcoin', bg: 'bg-bitcoin/10', glow: 'shadow-bitcoin-hover', badgeBg: 'bg-bitcoin/20' };
    default:
      return { border: 'border-white/20', text: 'text-gray-300', hoverText: 'group-hover:text-white', bg: 'bg-white/5', glow: 'shadow-none', badgeBg: 'bg-white/5' };
  }
};

// ════════════════════════════════════════════════════════════════
// TipBlockCard (Memoizado)
// ════════════════════════════════════════════════════════════════
const TipBlockCard = memo(({
  block,
  index,
  isLast,
  onClick,
}: {
  block: TipBlock;
  index: number;
  isLast: boolean;
  onClick: () => void;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const style = useMemo(() => getBlockCategoryStyle(block.category), [block.category]);

  useGSAP(() => {
    const el = cardRef.current;
    if (!el) return;

    gsap.to(el, {
      y: -6,
      duration: 2 + (index * 0.2),
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
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
        ease: 'power2.out',
        transformPerspective: 800,
      });
    };

    const onLeave = () => {
      gsap.to(el, {
        rotationY: 0,
        rotationX: 0,
        duration: 0.8,
        ease: 'elastic.out(1, 0.5)',
        transformPerspective: 800,
      });
    };

    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    return () => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
    };
  }, { scope: cardRef });

  const handleTitleHover = () => {
    if (!titleRef.current) return;
    gsap.to(titleRef.current, {
      x: '+=3',
      duration: 0.05,
      yoyo: true,
      repeat: 5,
      ease: 'power1.inOut',
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
        style={{ transformStyle: 'preserve-3d' }}
      >
        <input type="hidden" name="choiceKey" value={block.choiceKey} />
        
        <div
          ref={cardRef}
          className={`relative border-2 ${style.border} ${style.bg} backdrop-blur-md rounded-2xl overflow-hidden transition-colors duration-500 will-change-transform ${style.glow} group`}
        >
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-current to-transparent opacity-50 animate-scanline" />
          <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-current opacity-40 pointer-events-none" />
          <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-current opacity-40 pointer-events-none" />

          <div className="px-5 py-3 border-b border-white/10 flex items-center justify-between bg-black/40">
            <div className="flex items-center gap-3">
              <div className="font-vt323 text-2xl text-white tracking-wider">
                #{block.height.toLocaleString('es-MX')}
              </div>
              <div className={`px-2 py-0.5 text-[9px] font-mono uppercase tracking-widest border ${style.border} ${style.text}`}>
                {block.category}
              </div>
            </div>
            <div className={`text-xl ${style.text}`} aria-hidden="true">
              <span role="img" aria-label={`Categoría de bloque: ${block.category}`}>
                {block.emoji}
              </span>
            </div>
          </div>

          <button
            type="submit"
            onClick={onClick}
            className="w-full text-left p-5 active:scale-[0.99] transition-transform"
          >
            <div className="space-y-3">
              <div>
                <div className="text-[10px] font-mono text-gray-500 uppercase tracking-wider">
                  {block.sats.toLocaleString('es-MX')} sats
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

              <div className="pt-3 border-t border-white/5 grid grid-cols-2 gap-2 text-[10px] font-mono">
                <div className="flex items-center gap-1.5 text-gray-500 min-w-0">
                  <LinkIcon className="h-3 w-3 flex-shrink-0" />
                  <span className="truncate cursor-help" title={block.prevHash}>
                    prev: {block.prevHash.slice(0, 8)}…
                  </span>
                </div>
                <div className={`flex items-center gap-1.5 ${style.text} min-w-0`}>
                  <Hash className="h-3 w-3 flex-shrink-0" />
                  <span className="truncate cursor-help" title={block.hash}>
                    {block.hash.slice(0, 8)}…
                  </span>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <span className={`font-mono text-[10px] uppercase tracking-widest ${style.text} flex items-center gap-1.5`}>
                  <span className={`inline-block w-1.5 h-1.5 rounded-full bg-current animate-pulse`} 
                        style={{ boxShadow: `0 0 6px currentColor` }} />
                  MINAR BLOQUE →
                </span>
                <Zap className={`h-4 w-4 ${style.text} group-hover:scale-110 transition-transform`} />
              </div>
            </div>
          </button>
        </div>
      </form>
    </>
  );
});
TipBlockCard.displayName = 'TipBlockCard';

// ════════════════════════════════════════════════════════════════
// MAIN — TipJarSection
// ════════════════════════════════════════════════════════════════
export default function TipJarSection() {
  // 1. TODOS los hooks deben declararse PRIMERO
  const [isMounted, setIsMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<TabId>('lightning');
  const [copied, setCopied] = useState<string | null>(null);
  const [nextBlockTime, setNextBlockTime] = useState('10:00');

  const titleRef = useRef<HTMLHeadingElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // 2. Efectos (siempre se ejecutan, sin importar el estado de isMounted)
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
      setNextBlockTime(`${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [isMounted]);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (titleRef.current) {
      const spans = titleRef.current.querySelectorAll('.title-word');
      gsap.from(spans, {
        opacity: 0, y: 30, rotateX: -90, stagger: 0.12, duration: 0.8, ease: 'power3.out', delay: 0.2
      });
    }

    const blocks = document.querySelectorAll('.tip-block');
    blocks.forEach((block, i) => {
      gsap.from(block, {
        opacity: 0, y: 80, rotationX: 12, scale: 0.95, duration: 0.9,
        delay: 0.1 * i, ease: 'power3.out',
        scrollTrigger: {
          trigger: block,
          start: 'top bottom-=80',
          toggleActions: 'play none none reverse',
        },
        transformPerspective: 800,
      });
    });

    document.querySelectorAll('.connector-line').forEach((line) => {
      gsap.from(line, {
        scaleY: 0, transformOrigin: 'top', duration: 1.2, ease: 'power2.out',
        scrollTrigger: {
          trigger: line,
          start: 'top center',
          toggleActions: 'play none none reverse',
        }
      });
    });

    gsap.to('.bg-grid-drift', {
      y: '20%', duration: 30, repeat: -1, ease: 'linear',
      modifiers: {
        y: (y: string) => `${parseFloat(y) % 50}px`
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, { scope: containerRef });

  const theme = useMemo(() => {
    if (activeTab === 'fiat') {
      return { hex: '#00FF41', border: 'border-matrix/40', text: 'text-matrix', glow: 'shadow-matrix' };
    }
    return { hex: '#F7931A', border: 'border-bitcoin/40', text: 'text-bitcoin', glow: 'shadow-bitcoin' };
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

  // ✅ 3. GUARD DE HIDRATACIÓN AL FINAL. 
  // Esto garantiza que React vea el MISMO número de hooks en cada render.
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

  // 4. Renderizado principal (solo cuando isMounted === true)
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
            <Cpu className="h-3.5 w-3.5" />
            BLOCK #{TIP_BLOCKS[TIP_BLOCKS.length - 1].height.toLocaleString('es-MX')} PENDING
            <span className="text-gray-500">•</span>
            <Activity className="h-3.5 w-3.5 animate-pulse" />
          </div>

          <h2
            ref={titleRef}
            className="font-serif text-5xl sm:text-6xl font-black text-white tracking-tighter flex flex-wrap justify-center gap-x-3 gap-y-2 leading-none"
          >
            <span className="title-word">MINA</span>
            <span className="title-word">EL</span>
            <span className="title-word">SIGUIENTE</span>
            <span className={`title-word ${theme.text} transition-colors duration-700`}>BLOQUE</span>
          </h2>
          
          <p className="mt-5 font-mono text-sm text-gray-400 max-w-md mx-auto">
            Cada donativo es un bloque. Cada bloque sostiene la red soberana de Acepta Bitcoin.
          </p>
        </div>

        <div className="max-w-2xl mx-auto mb-16">
          <div className="bg-black/80 border border-matrix/30 backdrop-blur-md rounded-3xl p-8 text-center space-y-3 relative overflow-hidden shadow-matrix">
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-matrix/60 to-transparent animate-scanline" />
            <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-matrix/40 pointer-events-none" />
            <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-matrix/40 pointer-events-none" />
            
            <div className="uppercase tracking-[0.2em] text-[10px] text-matrix mb-2 flex items-center justify-center gap-2 font-mono">
              <Radio className="h-3 w-3 animate-pulse" /> Próximo bloque estimado
            </div>
            <div 
              className="font-vt323 text-7xl sm:text-8xl text-matrix tracking-widest tabular-nums"
              aria-live="polite"
              aria-atomic="true"
              aria-label={`Tiempo restante para el próximo bloque: ${nextBlockTime} minutos`}
            >
              {nextBlockTime}
            </div>
            <div className="mt-2 text-[10px] font-mono text-gray-500 uppercase tracking-wider">
              Block Height: <span className="text-matrix">#{TIP_BLOCKS[TIP_BLOCKS.length - 1].height.toLocaleString('es-MX')}</span>
              {' • '}Difficulty: <span className="text-matrix">0000…</span>
            </div>
          </div>
        </div>

        <div className="flex p-1.5 gap-1.5 bg-black/70 border border-white/10 rounded-2xl max-w-xl mx-auto mb-10">
          {[
            { id: 'lightning' as TabId, label: 'LIGHTNING', icon: Zap, category: 'standard' as const },
            { id: 'onchain' as TabId, label: 'ON-CHAIN', icon: Coins, category: 'genesis' as const },
            { id: 'fiat' as TabId, label: 'FIAT', icon: CreditCard, category: 'sovereign' as const },
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
                    : 'text-gray-500 hover:text-white border border-transparent hover:border-white/10'}`}
              >
                <Icon size={14} />
                {tab.label}
                {active && <span className="font-vt323 text-base">#{tab.id === 'lightning' ? '21' : tab.id === 'onchain' ? '10' : '05'}</span>}
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'lightning' && (
            <motion.div
              key="lightning"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="max-w-md mx-auto space-y-6 relative"
            >
              <div className="flex items-center gap-2 px-4 py-2 bg-black/60 border border-matrix/30 rounded-full self-center mx-auto w-fit mb-2">
                <span className="h-2 w-2 rounded-full bg-matrix animate-pulse shadow-[0_0_8px_rgba(0,255,65,0.6)]" />
                <span className="font-mono text-[10px] text-matrix tracking-widest">BTCPAY SERVER • ONLINE</span>
              </div>

              {TIP_BLOCKS.map((block, i) => (
                <TipBlockCard
                  key={block.blockId}
                  block={block}
                  index={i}
                  isLast={i === TIP_BLOCKS.length - 1}
                  onClick={() => {}}
                />
              ))}

              <a
                href={CONFIG.btcpayDirectLink}
                target="_blank"
                rel="noopener noreferrer"
                className="tip-block block relative w-full p-4 bg-black/60 border border-white/10 rounded-2xl hover:border-matrix/40 transition-colors text-center group"
              >
                <div className="font-mono text-[10px] text-gray-500 uppercase tracking-widest mb-1">Custom Amount</div>
                <div className="font-serif text-lg text-white group-hover:text-matrix transition-colors">
                  💸 MONTO LIBRE <span className="font-mono text-xs text-gray-500">(mín. 5k sats)</span>
                </div>
                <div className="text-[10px] font-mono text-gray-600 mt-1">hash: custom-amount-open</div>
              </a>

              <div className="flex items-center gap-2 mt-4 text-amber-500/70 text-[10px] font-mono justify-center">
                <ShieldCheck size={12} />
                <span>FACTURA DINÁMICA • PROCESO PROTEGIDO POR BTCPAY</span>
              </div>
            </motion.div>
          )}

          {activeTab === 'onchain' && (
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
                    value={`bitcoin:${CONFIG.onChainAddress}?label=AceptaBitcoin&message=Donacion`}
                    size={180} level="H" fgColor="#000000" bgColor="#FFFFFF"
                  />
                  <div 
                    className="absolute inset-x-0 h-1 bg-gradient-to-b from-transparent via-bitcoin to-transparent pointer-events-none animate-mining-pulse"
                    style={{ top: 0 }}
                  />
                  <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-bitcoin text-black text-[10px] font-mono font-bold px-3 py-0.5 rounded shadow-md whitespace-nowrap">
                    ESCANEAR ON-CHAIN
                  </div>
                  <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-bitcoin pointer-events-none" />
                  <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-bitcoin pointer-events-none" />
                </div>

                <div className="bg-black/60 border border-white/10 rounded-xl p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="font-mono text-[10px] text-gray-500 uppercase tracking-widest">DIRECCIÓN ON-CHAIN</p>
                    <span className="font-mono text-[9px] text-bitcoin uppercase tracking-widest">#native</span>
                  </div>
                  <p className="font-mono text-xs text-white break-all select-all">
                    {CONFIG.onChainAddress}
                  </p>
                  <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[10px] font-mono">
                    <span className="text-gray-500">prev: 0000…0000</span>
                    <CopyButton text={CONFIG.onChainAddress} label="onchain" />
                  </div>
                </div>

                <div className="flex items-center gap-2 text-amber-500/70 text-[10px] font-mono justify-center">
                  <ShieldCheck size={12} />
                  <span>LIQUIDACIÓN DIRECTA • SIN INTERMEDIARIOS</span>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'fiat' && (
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
                    <span className="font-mono text-[10px] text-gray-500 uppercase tracking-widest">SIDECHAIN BLOCK</span>
                    <span className="font-mono text-[9px] text-matrix uppercase tracking-widest">#fiat-mxn</span>
                  </div>
                  <a
                    href={CONFIG.mercadoPagoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full py-3 bg-matrix text-black font-mono font-bold uppercase tracking-widest text-sm rounded-xl text-center hover:bg-matrix/90 transition-colors"
                  >
                    💳 DONAR CON MERCADO PAGO
                  </a>
                </div>

                <div className="bg-black/60 border border-matrix/20 rounded-xl p-4">
                  <p className="font-mono text-[10px] text-gray-500 uppercase tracking-widest mb-1">MERCADO PAGO ALIAS</p>
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-mono text-sm text-white">{CONFIG.mercadoPagoAlias}</p>
                    <CopyButton text={CONFIG.mercadoPagoAlias} label="mp-alias" />
                  </div>
                </div>

                <div className="bg-black/60 border border-matrix/20 rounded-xl p-4">
                  <p className="font-mono text-[10px] text-gray-500 uppercase tracking-widest mb-1">LINK DIRECTO</p>
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
          ORACLE SYSTEM v3.0 // GRACIAS POR MINAR CON NOSOTROS
        </p>
      </div>
    </section>
  );
}