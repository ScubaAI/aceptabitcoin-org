'use client';

import { useState, useEffect, useRef, useMemo, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei/core/OrbitControls';
import { Float } from '@react-three/drei/core/Float';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import * as THREE from 'three';
import dynamic from 'next/dynamic';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import {
  Clock, Hash, Zap, Users, Sprout, Store, Trophy, Coins, ShieldCheck, Map, Rocket,
  Menu, X, Volume2, VolumeX,
  type LucideIcon
} from 'lucide-react';

// ✅ IMPORTACIÓN CORREGIDA (Apunta al archivo que creamos en el Paso 1)
const Grid3D = dynamic(
  () => import('@/components/ui/Grid3D').then((m) => m.Grid3D),
  { ssr: false }
);

const AnyFloat = Float as any;

// ============================================================
// BITCOIN TIMECHAIN — OBSERVATORY MODE (v3.1 GENESIS)
// ============================================================

interface TimechainBlock {
  height: number;
  timestamp: string;
  quarter: string;
  title: string;
  desc: string;
  hash: string;
  prevHash: string;
  Icon: LucideIcon;
  category: "genesis" | "infrastructure" | "adoption" | "community";
}

const timechainBlocks: TimechainBlock[] = [
  {
    height: 1, timestamp: "2021-11-15T18:00:00Z", quarter: "Q4 2021",
    title: "GÉNESIS YUCATÁN", desc: "Primera reunión cypherpunk en Mérida. Despliegue del primer nano-nodo educativo. Inicio del protocolo 'Lunes de Bitcoin'.",
    hash: "0000a7f3b2c1...", prevHash: "0000000000000000000000000000000000000000000000000000000000000000",
    Icon: Sprout, category: "genesis"
  },
  {
    height: 2, timestamp: "2022-05-22T12:00:00Z", quarter: "Q2 2022",
    title: "PRIMER COMERCIO", desc: "Nodo comercial activo. La Bianca Tropical integra BTCPay Server. Primera transacción Lightning validada en la península.",
    hash: "0000b8e4c3d2...", prevHash: "0000a7f3b2c1d8e9f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7",
    Icon: Store, category: "adoption"
  },
  {
    height: 3, timestamp: "2022-10-10T09:00:00Z", quarter: "Q4 2022",
    title: "DIRECTORIO SOBERANO", desc: "Lanzamiento del registro de proveedores de intercambio verificados. Soberanía financiera sin intermediarios ni custodia tercera.",
    hash: "0000c9f5d4e3...", prevHash: "0000b8e4c3d2e1f0a9b8c7d6e5f4a3b2c1d0e9f8a7b6c5d4e3f2a1b0c9d8e7f6",
    Icon: ShieldCheck, category: "infrastructure"
  },
  {
    height: 4, timestamp: "2024-03-07T08:00:00Z", quarter: "Q1 2024",
    title: "HACKATHON BTC MX", desc: "Alianza con el Tecnológico de Software de Mérida. 48 horas de código, prueba de concepto y construcción de comunidad.",
    hash: "0000d0a6e5f4...", prevHash: "0000c9f5d4e3f2a1b0c9d8e7f6a5b4c3d2e1f0a9b8c7d6e5f4a3b2c1d0e9f8a7",
    Icon: Trophy, category: "community"
  },
  {
    height: 5, timestamp: "2024-09-10T11:00:00Z", quarter: "Q3 2024",
    title: "ORACLE SYSTEM v2.0", desc: "Rebranding a Cypherpunk Bank. Design System v3.0. Integración de Market Mood Widget y Price Converter en tiempo real.",
    hash: "0000e1b7f6a5...", prevHash: "0000d0a6e5f4a3b2c1d0e9f8a7b6c5d4e3f2a1b0c9d8e7f6a5b4c3d2e1f0a9b8",
    Icon: Zap, category: "infrastructure"
  },
  {
    height: 6, timestamp: "2024-12-05T16:00:00Z", quarter: "Q4 2024",
    title: "TIANGUIS BITCOIN", desc: "Marketplace P2P descentralizado. Nostr + Lightning Network. Comercio sin KYC, sin censura y sin custodia.",
    hash: "0000f2c8a7b6...", prevHash: "0000e1b7f6a5b4c3d2e1f0a9b8c7d6e5f4a3b2c1d0e9f8a7b6c5d4e3f2a1b0c9",
    Icon: Coins, category: "adoption"
  },
  {
    height: 7, timestamp: "2025-02-20T14:00:00Z", quarter: "Q1 2025",
    title: "BLINK API & STABLESATS", desc: "Migración de infraestructura de pagos. Lightning Address activo y tip-jars dinámicos para onboarding de comercios.",
    hash: "0000a3d9b8c7...", prevHash: "0000f2c8a7b6c5d4e3f2a1b0c9d8e7f6a5b4c3d2e1f0a9b8c7d6e5f4a3b2c1d0",
    Icon: Zap, category: "infrastructure"
  },
  {
    height: 8, timestamp: "2025-04-15T08:00:00Z", quarter: "Q2 2025",
    title: "BTC MAP INTEGRATION", desc: "Mapa interactivo de merchants. Leaflet + CARTO dark tiles. Marcadores personalizados de adopción real.",
    hash: "0000b4eac9d8...", prevHash: "0000a3d9b8c7d6e5f4a3b2c1d0e9f8a7b6c5d4e3f2a1b0c9d8e7f6a5b4c3d2e1",
    Icon: Map, category: "adoption"
  },
  {
    height: 9, timestamp: "2025-05-22T00:00:00Z", quarter: "Q2 2025",
    title: "PIZZA DAY MÉRIDA", desc: "Celebración del Bitcoin Pizza Day en alianza con AWS Mérida y Bull Bitcoin. Adopción masiva y educativa.",
    hash: "0000c5fbdae9...", prevHash: "0000b4eac9d8e7f6a5b4c3d2e1f0a9b8c7d6e5f4a3b2c1d0e9f8a7b6c5d4e3f2",
    Icon: Users, category: "community"
  },
  {
    height: 10, timestamp: "2025-08-01T12:00:00Z", quarter: "Q3 2025",
    title: "ESTADO ACTUAL", desc: "+150 usuarios en Tianguis. 8 proveedores activos. 4 proyectos dev. Infraestructura open-source bajo licencia AGPL-3.0.",
    hash: "0000d60cebf0...", prevHash: "0000c5fbdae9f8a7b6c5d4e3f2a1b0c9d8e7f6a5b4c3d2e1f0a9b8c7d6e5f4a3",
    Icon: Rocket, category: "community"
  }
];

const COLORS = {
  matrix: 0x00FF41,
  bitcoin: 0xF7931A,
  accent: 0x06B6D4,
  black: 0x000000,
  white: 0xFAFAFA,
};

const categoryToColor = (category: TimechainBlock["category"]) => {
  switch (category) {
    case "genesis": return COLORS.matrix;
    case "infrastructure": return COLORS.bitcoin;
    case "adoption": return COLORS.accent;
    case "community": return COLORS.bitcoin;
    default: return COLORS.white;
  }
};

// ============================================================
// 3D COMPONENTS
// ============================================================

function HologramBlock({
  block,
  index,
  isActive,
  onSelect,
  genesisComplete
}: {
  block: TimechainBlock;
  index: number;
  isActive: boolean;
  onSelect: (block: TimechainBlock) => void;
  genesisComplete: boolean;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const color = new THREE.Color(categoryToColor(block.category));
  const angle = (index / timechainBlocks.length) * Math.PI * 2;
  const radius = 3.5;
  const yBase = (index - timechainBlocks.length / 2) * 1.2;

  useGSAP(() => {
    if (!groupRef.current || !genesisComplete) return;
    gsap.fromTo(groupRef.current, 
      { x: 0, y: yBase, z: 0, scale: 0.05 },
      { 
        x: Math.cos(angle) * radius,
        z: Math.sin(angle) * radius,
        scale: 1,
        duration: 1.5,
        delay: 1.1 + index * 0.09,
        ease: 'power3.out'
      }
    );
  }, [genesisComplete, index, angle, radius, yBase]);

  return (
    <AnyFloat speed={1.4} rotationIntensity={0.18} floatIntensity={0.35}>
      <group
        ref={groupRef}
        onClick={(e) => {
          e.stopPropagation();
          onSelect(block);
        }}
        onPointerOver={() => { if (typeof document !== 'undefined') document.body.style.cursor = 'pointer'; }}
        onPointerOut={() => { if (typeof document !== 'undefined') document.body.style.cursor = 'auto'; }}
      >
        <mesh position={[0, -0.55, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.48, 0.58, 6]} />
          <meshBasicMaterial color={color} transparent opacity={isActive ? 0.9 : 0.4} side={THREE.DoubleSide} />
        </mesh>
        <mesh scale={isActive ? 1.18 : 1}>
          <boxGeometry args={[0.8, 0.8, 0.8]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={isActive ? 1.5 : 0.65} wireframe transparent opacity={isActive ? 1 : 0.75} />
        </mesh>
        <mesh>
          <sphereGeometry args={[0.22, 16, 16]} />
          <meshBasicMaterial color={color} transparent opacity={isActive ? 0.7 : 0.3} />
        </mesh>
      </group>
    </AnyFloat>
  );
}

function AtmosphericParticles() {
  const count = 120;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 18;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 18;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 18;
    }
    return pos;
  }, []);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.045} color={COLORS.matrix} transparent opacity={0.35} sizeAttenuation />
    </points>
  );
}

// ============================================================
// MAIN PAGE
// ============================================================

export default function NuestraHistoriaPage() {
  const [isMounted, setIsMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [timeUntilNext, setTimeUntilNext] = useState("10:00");
  const [activeSpec, setActiveSpec] = useState<TimechainBlock>(timechainBlocks[9]);
  const [isHovering, setIsHovering] = useState(false);
  const [showMobileSheet, setShowMobileSheet] = useState(false);
  const [genesisComplete, setGenesisComplete] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [audioReady, setAudioReady] = useState(false);

  const headerRef = useRef<HTMLDivElement>(null);
  const ambientRef = useRef<HTMLAudioElement | null>(null);
  const genesisSoundRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => { setIsMounted(true); }, []);

  useEffect(() => {
    if (!isMounted) return;
    const updateTimer = () => {
      const now = new Date();
      const minutes = now.getMinutes();
      const nextBlockMinutes = Math.ceil((minutes + 1) / 10) * 10;
      const next = new Date(now);
      if (nextBlockMinutes >= 60) {
        next.setHours(now.getHours() + 1);
        next.setMinutes(0);
      } else {
        next.setMinutes(nextBlockMinutes);
      }
      next.setSeconds(0);
      const diff = next.getTime() - now.getTime();
      const mins = Math.floor(diff / 60000);
      const secs = Math.floor((diff % 60000) / 1000);
      setTimeUntilNext(`${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`);
    };
    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [isMounted]);

  useEffect(() => {
    if (!isMounted) return;
    ambientRef.current = new Audio('/audio/timechain-ambient.mp3');
    genesisSoundRef.current = new Audio('/audio/genesis-chime.mp3');
    if (ambientRef.current) { ambientRef.current.loop = true; ambientRef.current.volume = 0.25; }
    if (genesisSoundRef.current) { genesisSoundRef.current.volume = 0.45; }
    setAudioReady(true);
    return () => { ambientRef.current?.pause(); genesisSoundRef.current?.pause(); };
  }, [isMounted]);

  useGSAP(() => {
    if (!isMounted) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.8, onComplete: () => setGenesisComplete(true) });
      tl.fromTo('.genesis-core', { scale: 0, opacity: 0 }, { scale: 2.2, opacity: 0.85, duration: 0.7, ease: 'power2.out' })
        .to('.genesis-core', { scale: 0, opacity: 0, duration: 0.5, ease: 'power2.in' });
      gsap.from(headerRef.current, { opacity: 0, y: -40, duration: 1.1, delay: 2.8, ease: 'power3.out' });
    });
    return () => ctx.revert();
  }, [isMounted]);

  const toggleAudio = () => {
    if (!audioReady) return;
    if (audioEnabled) { ambientRef.current?.pause(); setAudioEnabled(false); } 
    else {
      if (genesisSoundRef.current && genesisSoundRef.current.paused) { genesisSoundRef.current.currentTime = 0; genesisSoundRef.current.play().catch(() => {}); }
      ambientRef.current?.play().catch(() => {});
      setAudioEnabled(true);
    }
  };

  const handleSpecSelect = (block: TimechainBlock) => {
    setActiveSpec(block);
    setIsHovering(true);
    setTimeout(() => setIsHovering(false), 1800);
    if (isMobile) setShowMobileSheet(false);
  };

  if (!isMounted) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-64 h-64 bg-black border-2 border-matrix/30 rounded-full animate-pulse" />
      </div>
    );
  }

  return (
    <>
      <Navbar />

      {/* ✅ FIX 1: min-h-[150vh] y pb-64 dan altura real a la página para que el footer no invada */}
      <main className="relative min-h-[150vh] bg-black text-[hsl(var(--foreground))] flex flex-col pb-64 md:pb-80">
        
        {/* 1. 3D Canvas (Fondo, Interactivo) */}
        <div className="fixed inset-0 z-0">
          <Suspense fallback={null}>
            <Canvas camera={{ position: [0, 2.2, 13], fov: 48 }} dpr={[1, 1.75]} gl={{ antialias: true, toneMapping: 3 }}>
              <fog attach="fog" args={[COLORS.black, 9, 26]} />
              <ambientLight intensity={0.18} />
              <pointLight position={[0, 6, 0]} intensity={2.2} color={isHovering ? COLORS.accent : COLORS.matrix} />
              
              <Grid3D cellSize={1.5} cellColor="#00FF41" cellThickness={1} rotateX={80} followMouse={true} interactive={true} position={[0, -4, 0]} scale={[10, 10, 1]} />

              <OrbitControls autoRotate autoRotateSpeed={isMobile ? 0.18 : 0.35} enableDamping dampingFactor={0.06} enableZoom={!isMobile} enablePan={!isMobile} maxPolarAngle={Math.PI / 2 - 0.03} />

              {timechainBlocks.map((block, idx) => (
                <group key={block.height}>
                  <HologramBlock block={block} index={idx} isActive={activeSpec.height === block.height} onSelect={handleSpecSelect} genesisComplete={genesisComplete} />
                </group>
              ))}
              <AtmosphericParticles />
            </Canvas>
          </Suspense>
        </div>

        {/* 2. Overlays */}
        <div className="genesis-core fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-matrix blur-3xl opacity-0 pointer-events-none z-[1]" />
        <div className="fixed inset-0 pointer-events-none z-[5] bg-[radial-gradient(ellipse_75%_65%_at_center,transparent_30%,rgba(0,0,0,0.75)_100%)]" />
        <div className="fixed inset-0 pointer-events-none z-[6] opacity-[0.04] mix-blend-overlay bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDUiLz4KPC9zdmc+')]"/>

        {/* 3. HUD Layer */}
        <div className="fixed inset-0 z-10 pointer-events-none flex flex-col">
          
          <header ref={headerRef} className="pointer-events-auto absolute top-4 left-4 right-4 md:top-[44px] md:left-[56px] md:right-[56px] flex flex-col md:flex-row justify-between items-start gap-4">
            <div className="flex flex-col gap-4 md:gap-6">
              <div className="flex items-center gap-4">
                <div className="relative w-8 h-8">
                  <div className="absolute inset-0 border-[1.5px] border-matrix rotate-45" />
                  <div className="absolute inset-[9px] bg-matrix rotate-45 shadow-matrix-strong" />
                </div>
                <div>
                  <div className="font-serif text-xl md:text-2xl tracking-[0.2em] text-[#FAFAFA]">TIMECHAIN</div>
                  <div className="font-mono text-[8px] md:text-[9.5px] text-gray-500 tracking-[0.3em] mt-1.5">OBSERVATORY / v3.1 GENESIS</div>
                </div>
              </div>

              <div className="bg-black/80 border border-matrix/30 backdrop-blur-md rounded-2xl md:rounded-3xl p-4 md:p-6 w-full md:max-w-xs">
                <div className="flex items-center gap-2 mb-2 text-[9px] md:text-[10px] font-mono text-matrix uppercase tracking-[0.2em]">
                  <Clock className="h-3.5 w-3.5 animate-pulse" /> Próximo Bloque
                </div>
                <div className="font-vt323 text-5xl md:text-7xl text-matrix tracking-widest tabular-nums" aria-live="polite" aria-atomic="true" aria-label={`Tiempo restante: ${timeUntilNext}`}>
                  {timeUntilNext}
                </div>
                <div className="mt-2 text-[8px] md:text-[9px] font-mono text-gray-600 uppercase">Block Height: <span className="text-matrix">#{timechainBlocks.length}</span></div>
              </div>
            </div>

            <div className="flex flex-col items-end gap-3">
              <button onClick={toggleAudio} aria-label={audioEnabled ? "Desactivar audio" : "Activar audio"} className="flex items-center gap-2 px-3 py-2 bg-black/70 border border-white/10 rounded-full text-xs font-mono text-gray-400 hover:text-matrix hover:border-matrix/40 transition">
                {audioEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                {audioEnabled ? 'AUDIO ON' : 'AUDIO OFF'}
              </button>
              <div className="hidden md:flex flex-col gap-2 text-right text-[10px] font-mono text-gray-400 tracking-[0.18em]">
                <div className="flex items-center justify-end gap-2"><span>HOLO-FIELD STABLE</span><span className="h-[7px] w-[7px] bg-matrix rounded-full animate-pulse shadow-terminal" /></div>
                <div className="flex items-center justify-end gap-2"><span>CHAIN SYNC 99.7%</span><span className="h-[7px] w-[7px] bg-matrix rounded-full animate-pulse shadow-terminal" /></div>
              </div>
            </div>
          </header>

          <aside className="pointer-events-auto hidden md:block fixed right-[56px] top-1/2 -translate-y-1/2 w-[260px] bg-black/80 backdrop-blur-xl border border-white/10 shadow-2xl rounded-xl overflow-hidden">
            <div className="absolute top-3 left-3 w-5 h-5 border-t-2 border-l-2 border-matrix/40 pointer-events-none" />
            <div className="absolute bottom-3 right-3 w-5 h-5 border-b-2 border-r-2 border-matrix/40 pointer-events-none" />
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-matrix/60 to-transparent animate-scanline" />
            <div className="p-5 border-b border-white/10 flex items-center gap-3 bg-black/60 shrink-0">
              <Hash className="h-5 w-5 text-matrix" />
              <span className="font-vt323 text-xl text-matrix tracking-wider">CADENA DE EVENTOS • LOG</span>
            </div>
            <div className="p-4 flex flex-col gap-2 overflow-y-auto max-h-[60vh] custom-scrollbar">
              {timechainBlocks.map((block) => (
                <button key={block.height} onClick={() => handleSpecSelect(block)} className={`flex items-center gap-3 p-3 border text-left transition-all ${activeSpec.height === block.height ? 'bg-matrix/10 border-matrix shadow-matrix' : 'border-white/10 hover:border-matrix/30 hover:bg-matrix/5'}`}>
                  <span className={`flex items-center justify-center w-8 h-8 rounded border transition-colors ${activeSpec.height === block.height ? 'border-matrix text-matrix' : 'border-white/10 text-gray-500'}`}>
                    <block.Icon className="h-4 w-4" />
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className={`font-mono text-[11px] truncate ${activeSpec.height === block.height ? 'text-matrix' : 'text-gray-400'}`}>{block.title}</div>
                    <div className="font-mono text-[9px] text-gray-600 mt-0.5">{block.hash.slice(0, 12)}...</div>
                  </div>
                </button>
              ))}
            </div>
          </aside>

          {isMobile && (
            <button onClick={() => setShowMobileSheet(true)} className="pointer-events-auto fixed bottom-24 right-4 z-40 flex items-center gap-2 px-4 py-3 bg-black/90 border border-matrix/40 rounded-full shadow-matrix-strong backdrop-blur-md">
              <Menu className="h-5 w-5 text-matrix" />
              <span className="font-mono text-xs text-matrix tracking-wider">EXPLORAR HITOS</span>
            </button>
          )}

          {showMobileSheet && isMobile && (
            <div className="pointer-events-auto fixed inset-0 z-50 md:hidden" role="dialog" aria-modal="true">
              <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setShowMobileSheet(false)} />
              <div className="absolute inset-x-0 bottom-0 bg-black border-t-2 border-matrix/40 rounded-t-3xl max-h-[80vh] flex flex-col">
                <div className="p-4 border-b border-white/10 flex items-center justify-between bg-black/60">
                  <div className="flex items-center gap-3">
                    <Hash className="h-5 w-5 text-matrix" />
                    <span className="font-vt323 text-xl text-matrix tracking-wider">CADENA DE EVENTOS • LOG</span>
                  </div>
                  <button onClick={() => setShowMobileSheet(false)} aria-label="Cerrar panel"><X className="h-5 w-5 text-gray-400" /></button>
                </div>
                <div className="p-4 flex flex-col gap-2 overflow-y-auto flex-1 custom-scrollbar">
                  {timechainBlocks.map((block) => (
                    <button key={block.height} onClick={() => handleSpecSelect(block)} className={`flex items-center gap-3 p-3 border text-left transition-all ${activeSpec.height === block.height ? 'border-matrix bg-matrix/10' : 'border-white/10 hover:border-matrix/30'}`}>
                      <span className={`flex items-center justify-center w-8 h-8 rounded border transition-colors ${activeSpec.height === block.height ? 'border-matrix text-matrix' : 'border-white/10 text-gray-500'}`}>
                        <block.Icon className="h-4 w-4" />
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className={`font-mono text-sm truncate ${activeSpec.height === block.height ? 'text-matrix' : 'text-gray-400'}`}>{block.title}</div>
                        <div className="font-mono text-xs text-gray-600 mt-0.5">{block.quarter} • {block.hash.slice(0, 12)}...</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ✅ FIX 2: Bottom HUD movido a bottom-32/40 para NO invadir el footer */}
          <div className="pointer-events-auto fixed bottom-32 md:bottom-40 left-0 right-0 p-4 md:left-[56px] md:right-[56px] md:max-w-4xl md:mx-auto">
            <div className={`bg-black/80 backdrop-blur-xl border p-4 rounded-xl transition-colors duration-300 ${isHovering ? 'border-accent' : 'border-white/10'}`}>
              <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-8">
                <div>
                  <div className="text-[9px] font-mono text-gray-500 tracking-widest uppercase">HITO ACTIVO</div>
                  <div className={`font-mono text-sm md:text-base tracking-[0.1em] transition-colors duration-300 ${isHovering ? 'text-accent' : 'text-matrix'}`}>
                    #{activeSpec.height.toString().padStart(3, '0')} • {activeSpec.title}
                  </div>
                </div>
                <div className="hidden md:block text-xs text-gray-400 font-mono max-w-md">{activeSpec.desc}</div>
              </div>
            </div>
          </div>
        </div>

        {/* ✅ FIX 3: Espaciador real + Footer fuera del flujo fixed */}
        <div className="relative z-20 w-full pointer-events-auto bg-black/95 backdrop-blur-xl border-t border-matrix/30 mt-auto">
          <Footer />
        </div>

      </main>
    </>
  );
}