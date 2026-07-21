"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { QRCodeSVG } from 'qrcode.react';
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { 
  Zap, Copy, Check, CreditCard, ExternalLink, Coins, 
  Terminal, ShieldCheck, Banknote 
} from "lucide-react";
import { Card } from "@/components/ui/card";
import MatrixRain from "@/components/ui/MatrixRain";
import ArcadeButton from "@/components/ui/ArcadeButton";

// ⚡ CONFIGURACIÓN: Apuntando al POS soberano de Elestio
const CONFIG = {
  btcpayPosAction: "https://btcpay-c092a-u74190.vm.elestio.app/apps/gEUZWSsGpTJbhtXBtdEqnoSM2J4/pos",
  btcpayDirectLink: "https://btcpay-c092a-u74190.vm.elestio.app/apps/gEUZWSsGpTJbhtXBtdEqnoSM2J4/pos",
  onChainAddress: "bc1q4kfrqsm60jxx8xva9p6erx6pp6zqaazy00nhrk",
  mercadoPagoLink: "https://link.mercadopago.com.mx/skinlabclothingclub",
  mercadoPagoAlias: "aceptabitcoin.mp",
};

type TabId = 'lightning' | 'onchain' | 'fiat';

export default function TipJarSection() {
  const [isMounted, setIsMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<TabId>('lightning');
  const [copied, setCopied] = useState<string | null>(null);
  const [bootComplete, setBootComplete] = useState(false);

  // Refs para GSAP
  const titleRef = useRef<HTMLHeadingElement>(null);
  const scanLineRef = useRef<HTMLDivElement>(null);
  const bootTextRef = useRef<HTMLDivElement>(null);

  useEffect(() => { 
    setIsMounted(true); 
    const timer = setTimeout(() => setBootComplete(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  // ═══════════ GSAP ANIMATIONS ═══════════

  // 1. Animación cinematográfica del título
  useGSAP(() => {
    if (!titleRef.current) return;
    const spans = titleRef.current.querySelectorAll('.title-word');
    gsap.from(spans, {
      opacity: 0, y: 30, rotateX: -90, stagger: 0.15, duration: 0.8, ease: 'power3.out', delay: 0.3
    });
  }, { scope: titleRef });

  // 2. Efecto holográfico de escaneo (se reinicia al cambiar de tab)
  useGSAP(() => {
    if (!scanLineRef.current) return;
    const scanLine = scanLineRef.current;
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 2, paused: false });
    tl.fromTo(scanLine, { y: '-100%', opacity: 0 }, { y: '100%', opacity: 1, duration: 1.8, ease: 'power1.inOut' })
      .to(scanLine, { opacity: 0, duration: 0.3 });
  }, { scope: scanLineRef, dependencies: [activeTab] });

  // 3. Boot sequence del BTCPay Server
  useGSAP(() => {
    if (!bootTextRef.current || !bootComplete) return;
    const bootElements = bootTextRef.current.querySelectorAll('.boot-item');
    gsap.from(bootElements, {
      opacity: 0, x: -20, stagger: 0.12, duration: 0.5, ease: 'power2.out', delay: 0.2
    });
  }, { scope: bootTextRef, dependencies: [bootComplete] });

  const getThemeColor = () => {
    switch (activeTab) {
      case 'lightning':
      case 'onchain':
        return {
          hex: "#F7931A", 
          shadow: "rgba(247, 147, 26, 0.4)", 
          border: "border-orange-500/40",
          text: "text-bitcoin", 
          focusBorder: "focus:border-bitcoin", 
          focusRing: "focus:ring-bitcoin/50",
        };
      case 'fiat':
        // ✅ FIX: Design System Rule: "No Cyan". Usamos Matrix Green para mantener la dualidad sagrada.
        return {
          hex: "#00FF41", 
          shadow: "rgba(0, 255, 65, 0.35)", 
          border: "border-matrix/40",
          text: "text-matrix", 
          focusBorder: "focus:border-matrix", 
          focusRing: "focus:ring-matrix/50",
        };
      default:
        return {
          hex: "#00FF41", 
          shadow: "rgba(0, 255, 65, 0.35)", 
          border: "border-matrix/40",
          text: "text-matrix", 
          focusBorder: "focus:border-matrix", 
          focusRing: "focus:ring-matrix/50",
        };
    }
  };

  const theme = getThemeColor();

  const handleCopy = async (text: string, label: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(label);
    if (navigator.vibrate) navigator.vibrate(30); // Haptic feedback
    setTimeout(() => setCopied(null), 1800);
  };

  // Guard de hidratación (crítico para QRCodeSVG)
  if (!isMounted) return null;

  const CopyButton = ({ text, label, className = "" }: { text: string; label: string; className?: string }) => (
    <button
      onClick={() => handleCopy(text, label)}
      className={`flex items-center gap-2 px-4 py-2 rounded-xl font-mono text-xs border border-white/20 bg-white/5 hover:bg-white/10 transition-all ${className}`}
    >
      {copied === label ? (
        <><Check size={14} className="text-matrix" /> <span className="text-matrix">COPIADO</span></>
      ) : (
        <><Copy size={14} /> <span className="text-gray-400">COPIAR</span></>
      )}
    </button>
  );

  return (
    <section id="donativo-soberano" className="relative py-20 overflow-hidden bg-black scroll-mt-24">
      <div className="absolute inset-0">
        <MatrixRain className="opacity-[0.08]" speed={0.45} opacity={0.09} color={theme.hex} />
      </div>

      <div className="container relative z-10 px-4 max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div
            className={`inline-flex items-center gap-2 px-4 py-1.5 bg-black/80 backdrop-blur-md border ${theme.border} rounded-full font-mono text-xs ${theme.text} tracking-[3px] uppercase mb-6`}
            style={{ boxShadow: `0 0 15px ${theme.shadow}` }}
          >
            <Terminal className="h-4 w-4" /> TIPJAR V 3.0 // NATIVE POST
          </div>

          <h2 
            ref={titleRef}
            className="font-serif text-5xl sm:text-6xl font-black text-white tracking-tighter drop-shadow-[0_0_30px_rgba(255,255,255,0.1)] flex flex-wrap justify-center gap-x-3 gap-y-2"
          >
            <span className="title-word">CON</span>
            <span className="title-word">TU</span>
            <span className="title-word">APOYO</span>
            <span className={`title-word ${theme.text} transition-colors duration-700`}>CRECEMOS</span>
            <span className={`title-word ${theme.text} transition-colors duration-700`}>LA</span>
            <span className={`title-word ${theme.text} transition-colors duration-700`}>RED</span>
          </h2>
          
          <p className="mt-4 font-mono text-sm text-gray-400 max-w-md mx-auto">
            Con tu apoyo crecemos la red de servicios bitcoin. Infraestructura libre, código abierto y educación sin censura.
          </p>
        </div>

        {/* Card Principal */}
        <Card
          className="relative bg-black/90 backdrop-blur-2xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl mx-auto max-w-xl"
          style={{ boxShadow: `0 0 60px -15px ${theme.shadow}`, borderColor: `${theme.hex}33` }}
        >
          <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(255,255,255,0.03)_50%)] bg-[length:100%_4px] pointer-events-none animate-scanline" />

          {/* Tabs */}
          <div className="flex p-2 gap-1.5 bg-black/70 border-b border-white/10">
            {[
              { id: 'lightning' as TabId, label: 'LIGHTNING ⚡', icon: <Zap size={15} /> },
              { id: 'onchain' as TabId, label: 'ON-CHAIN 🟠', icon: <Coins size={15} /> },
              { id: 'fiat' as TabId, label: 'FIAT / SPEI 💳', icon: <CreditCard size={15} /> },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center gap-2 py-3.5 rounded-2xl font-vt323 text-lg font-bold tracking-wider transition-all duration-300
                  ${activeTab === tab.id ? 'bg-black text-white border border-white/30' : 'text-gray-500 hover:text-white hover:bg-white/5'}`}
                style={activeTab === tab.id ? { boxShadow: `0 0 25px ${theme.shadow}` } : undefined}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          <div className="p-8 min-h-[420px] flex flex-col items-center justify-center relative">
            <AnimatePresence mode="wait">

              {/* ═══════════ LIGHTNING TAB ═══════════ */}
              {activeTab === 'lightning' && (
                <motion.div key="lightning" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="w-full flex flex-col items-center gap-4">
                  
                  <div ref={bootTextRef} className="flex items-center gap-2 px-4 py-2 bg-black/60 backdrop-blur-sm border border-matrix/30 rounded-full">
                    <div className="boot-item h-2 w-2 rounded-full bg-matrix animate-pulse" style={{ boxShadow: '0 0 8px rgba(0,255,65,0.6)' }} />
                    <span className="boot-item font-mono text-xs text-matrix tracking-wider">BTCPAY SERVER</span>
                    <span className="boot-item font-mono text-xs text-gray-500">•</span>
                    <span className="boot-item font-mono text-xs text-matrix tracking-wider">ONLINE</span>
                  </div>

                  <p className="font-mono text-xs text-gray-400 text-center max-w-sm">
                    Selecciona tu nivel de apoyo. Serás redirigido a nuestro nodo seguro para completar la transacción.
                  </p>

                  {/* FORMULARIO 1: Apoyo Básico */}
                  <form action={CONFIG.btcpayPosAction} method="POST" className="w-full relative overflow-hidden rounded-2xl group">
                    {/* ⚠️ NOTA: Verifica que tu App POS en BTCPay use 'choiceKey'. Si es una app 'Point of Sale' estándar, usa name="amount" value="21000" */}
                    <input type="hidden" name="choiceKey" value="tip-21k-sats" />
                    <button type="submit" className="w-full">
                      <ArcadeButton variant="bitcoin" size="lg" className="w-full pointer-events-none">
                        ⚡ APOYO BÁSICO (21k SATS)
                      </ArcadeButton>
                    </button>
                    <div 
                      ref={scanLineRef}
                      className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none z-10"
                      style={{ top: 0 }}
                    />
                  </form>

                  {/* FORMULARIO 2: Apoyo Estratégico */}
                  <form action={CONFIG.btcpayPosAction} method="POST" className="w-full">
                    <input type="hidden" name="choiceKey" value="tip-210k-sats" />
                    <button type="submit" className="w-full">
                      <ArcadeButton variant="bitcoin" size="lg" className="w-full pointer-events-none opacity-80 hover:opacity-100 transition-opacity">
                        🚀 APOYO ESTRATÉGICO (210k SATS)
                      </ArcadeButton>
                    </button>
                  </form>

                  {/* FORMULARIO 3: Socio Soberano */}
                  <form action={CONFIG.btcpayPosAction} method="POST" className="w-full">
                    <input type="hidden" name="choiceKey" value="tip-2m-sats" />
                    <button type="submit" className="w-full">
                      <ArcadeButton variant="bitcoin" size="lg" className="w-full pointer-events-none opacity-60 hover:opacity-100 transition-opacity border-2 border-bitcoin/50">
                        🏗️ SOCIO SOBERANO (2.1M SATS)
                      </ArcadeButton>
                    </button>
                  </form>

                  {/* MONTO LIBRE */}
                  <a href={CONFIG.btcpayDirectLink} target="_blank" rel="noopener noreferrer" className="w-full">
                    <ArcadeButton variant="matrix" size="lg" className="w-full opacity-70 hover:opacity-100 transition-opacity">
                      💸 MONTO LIBRE (MÍNIMO 5k SATS)
                    </ArcadeButton>
                  </a>

                  <div className="flex items-center gap-2 mt-2 text-amber-500/70 text-xs font-mono">
                    <ShieldCheck size={14} />
                    <span>PROCESO PROTEGIDO POR BTCPAY • FACTURA DINÁMICA</span>
                  </div>
                </motion.div>
              )}

              {/* ═══════════ ON-CHAIN TAB ═══════════ */}
              {activeTab === 'onchain' && (
                <motion.div key="onchain" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="w-full flex flex-col items-center">
                  
                  <div ref={bootTextRef} className="flex items-center gap-2 mb-4 px-4 py-2 bg-black/60 backdrop-blur-sm border border-matrix/30 rounded-full">
                    <div className="boot-item h-2 w-2 rounded-full bg-matrix animate-pulse" style={{ boxShadow: '0 0 8px rgba(0,255,65,0.6)' }} />
                    <span className="boot-item font-mono text-xs text-matrix tracking-wider">BTCPAY SERVER</span>
                    <span className="boot-item font-mono text-xs text-gray-500">•</span>
                    <span className="boot-item font-mono text-xs text-matrix tracking-wider">ONLINE</span>
                  </div>

                  <p className="font-mono text-xs text-gray-400 text-center mb-6 max-w-sm">
                    Donación directa a nuestra wallet on-chain. Sin intermediarios, liquidación inmediata en tu nodo.
                  </p>

                  <div className="relative p-4 bg-white rounded-2xl border-2 border-orange-500/50 mb-6 group overflow-hidden" style={{ boxShadow: `0 0 30px rgba(247,147,26,0.25)` }}>
                    <QRCodeSVG
                      value={`bitcoin:${CONFIG.onChainAddress}?label=AceptaBitcoin&message=Donacion`}
                      size={160} level="H" fgColor="#000000" bgColor="#FFFFFF"
                    />
                    <div 
                      ref={scanLineRef}
                      className="absolute inset-x-0 h-1 bg-gradient-to-b from-transparent via-orange-500/60 to-transparent pointer-events-none"
                      style={{ top: 0 }}
                    />
                    <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-bitcoin text-black text-[10px] font-mono font-bold px-3 py-0.5 rounded shadow-md whitespace-nowrap">ESCANEAR ON-CHAIN</div>
                  </div>

                  <div className="w-full bg-white/5 rounded-xl p-4 border border-white/10 mb-4 text-center">
                    <p className="font-mono text-[10px] text-gray-500 uppercase mb-2">DIRECCIÓN ON-CHAIN DIRECTA</p>
                    <p className="font-mono text-xs text-white break-all select-all select-text">{CONFIG.onChainAddress}</p>
                  </div>

                  <CopyButton text={CONFIG.onChainAddress} label="onchain" className="self-center" />

                  <div className="mt-4 flex items-center gap-2 text-amber-500/70 text-xs font-mono">
                    <ShieldCheck size={14} />
                    <span>LIQUIDACIÓN DIRECTA • SIN INTERMEDIARIOS</span>
                  </div>
                </motion.div>
              )}

              {/* ═══════════ FIAT TAB ═══════════ */}
              {activeTab === 'fiat' && (
                <motion.div key="fiat" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="w-full flex flex-col items-center">
                  
                  <p className="text-gray-400 font-mono text-xs text-center mb-6 max-w-sm">
                    ¿Prefieres usar dinero fiduciario? Puedes enviarnos un aporte directo a nuestra cuenta de Mercado Pago.
                  </p>

                  <ArcadeButton href={CONFIG.mercadoPagoLink} target="_blank" variant="matrix" size="lg" className="w-full mb-6">
                    DONAR CON MERCADO PAGO 💳
                  </ArcadeButton>

                  <div className="w-full space-y-3">
                    <div className="bg-white/5 rounded-xl p-4 border border-matrix/20">
                      <p className="font-mono text-[10px] text-gray-500 uppercase mb-1">MERCADO PAGO ALIAS</p>
                      <div className="flex items-center justify-between gap-3">
                        <p className="font-mono text-sm text-white">{CONFIG.mercadoPagoAlias}</p>
                        <CopyButton text={CONFIG.mercadoPagoAlias} label="mp-alias" />
                      </div>
                    </div>

                    <div className="bg-white/5 rounded-xl p-4 border border-matrix/20">
                      <p className="font-mono text-[10px] text-gray-500 uppercase mb-1">LINK DIRECTO</p>
                      <a href={CONFIG.mercadoPagoLink} target="_blank" rel="noopener noreferrer" className="font-mono text-sm text-matrix hover:underline truncate flex items-center gap-1">
                        link.mercadopago.com.mx <ExternalLink size={12} />
                      </a>
                    </div>
                  </div>

                  <div className="mt-6 flex items-center gap-2 text-matrix/70 text-xs font-mono">
                    <Banknote size={14} />
                    <span>PESO MXN • TRANSFERENCIA INSTANTÁNEA</span>
                  </div>
                </motion.div>
              )}

            </AnimatePresence>
          </div>
        </Card>

        <p className="text-center mt-8 font-mono text-xs text-gray-600 tracking-widest">ORACLE SYSTEM v3.0 • GRACIAS POR TU SOPORTE</p>
      </div>
    </section>
  );
}