'use client';

import { useState, useEffect, useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei/core/OrbitControls';
import { Float } from '@react-three/drei/core/Float';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import * as THREE from 'three';

// Workaround for drei v8 + fiber v8 type mismatch on Float component
const AnyFloat = Float as any;

import Navbar from '@/components/layout/Navbar';
import {
  Clock, Hash, Zap, Users, Sprout, Store, Trophy, Coins, ShieldCheck, Map, Rocket,
  Menu, X, Volume2, VolumeX, AlertTriangle,
  type LucideIcon
} from 'lucide-react';

// ============================================================
// CONFIGURACIÓN DE AUDIO
// ============================================================
const AUDIO_CONFIG = {
  chimeUrl: '/audio/genesis-chime.mp3',
  ambientUrl: '/audio/timechain-ambient.mp3',
  ambientVolume: 0.3,
  chimeVolume: 0.6
};

// ============================================================
// BITCOIN TIMECHAIN — OBSERVATORY MODE (v3.0 NEXUS Fusion)
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
  category: "genesis" | "infrastructure" | "adoption" | "community" | "warning";
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
  },
  // 🚨 BLOQUE DE ALERTA — INCIDENTE DE SEGURIDAD
  {
    height: 11, timestamp: "2026-08-01T00:00:00Z", quarter: "Q3 2026",
    title: "INCIDENTE DE SEGURIDAD EN LA RED",
    desc: "Lección aprendida: La soberanía no se delega. Un fallo en un fabricante no rompe a Bitcoin, pero nos recuerda que 'Not your keys, not your coins'. Aprende auto-custodia o paga el precio de no hacerlo.",
    hash: "0000e71dfca1...", prevHash: "0000d60cebf0a9b8c7d6e5f4a3b2c1d0e9f8a7b6c5d4e3f2a1b0c9d8e7f6a5b4",
    Icon: AlertTriangle, category: "warning"
  }
];

const COLORS = {
  matrix: 0x00FF41,
  bitcoin: 0xF7931A,
  accent: 0x06B6D4,
  warning: 0xEF4444, // ← Rojo semántico para warnings
  black: 0x000000,
  white: 0xFAFAFA,
};

const categoryToColor = (category: TimechainBlock["category"]) => {
  switch (category) {
    case "genesis": return COLORS.matrix;
    case "infrastructure": return COLORS.bitcoin;
    case "adoption": return COLORS.accent;
    case "community": return COLORS.bitcoin;
    case "warning": return COLORS.warning;
    default: return COLORS.white;
  }
};

// ============================================================
// REACT THREE FIBER - 3D SCENE COMPONENTS
// ============================================================
function HologramBlock({ block, index }: { block: TimechainBlock; index: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const color = new THREE.Color(categoryToColor(block.category));
  const angle = (index / timechainBlocks.length) * Math.PI * 2;
  const radius = 3.5;
  const yBase = (index - timechainBlocks.length / 2) * 1.2;
  const isWarning = block.category === "warning";

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime();
    // El bloque warning tiene una flotación más dramática
    const floatAmplitude = isWarning ? 0.25 : 0.15;
    const floatSpeed = isWarning ? 1.2 : 0.6;
    groupRef.current.position.y = yBase + Math.sin(t * floatSpeed + index) * floatAmplitude;
    groupRef.current.rotation.y = t * 0.1 + angle;
    // El bloque warning rota más rápido para llamar la atención
    if (isWarning && meshRef.current) {
      meshRef.current.rotation.x = t * 0.8;
      meshRef.current.rotation.z = t * 0.5;
    }
  });

  return (
    <AnyFloat speed={isWarning ? 3 : 2} rotationIntensity={isWarning ? 0.6 : 0.3} floatIntensity={isWarning ? 0.8 : 0.5}>
      <group ref={groupRef} position={[Math.cos(angle) * radius, yBase, Math.sin(angle) * radius]}>
        <mesh position={[0, -0.6, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[isWarning ? 0.6 : 0.5, isWarning ? 0.72 : 0.6, 6]} />
          <meshBasicMaterial color={color} transparent opacity={isWarning ? 0.85 : 0.6} side={2} />
        </mesh>

        <mesh ref={meshRef}>
          <boxGeometry args={[isWarning ? 0.95 : 0.8, isWarning ? 0.95 : 0.8, isWarning ? 0.95 : 0.8]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={isWarning ? 1.4 : 0.8}
            wireframe
            transparent
            opacity={0.9}
          />
        </mesh>
        <mesh>
          <sphereGeometry args={[isWarning ? 0.32 : 0.25, 16, 16]} />
          <meshBasicMaterial color={color} transparent opacity={isWarning ? 0.65 : 0.4} />
        </mesh>
        {/* Luz puntual extra para el bloque warning — aura roja */}
        {isWarning && (
          <pointLight color={COLORS.warning} intensity={1.5} distance={3} decay={2} />
        )}
      </group>
    </AnyFloat>
  );
}

function AtmosphericParticles() {
  const count = 200;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return pos;
  }, []);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color={COLORS.matrix}
        transparent
        opacity={0.4}
        sizeAttenuation
      />
    </points>
  );
}

// ============================================================
// MAIN PAGE COMPONENT - ORACLE SYSTEM OBSERVATORY
// ============================================================
export default function NuestraHistoriaPage() {
  const [isMounted, setIsMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [timeUntilNext, setTimeUntilNext] = useState("10:00");
  const [activeSpec, setActiveSpec] = useState<TimechainBlock>(timechainBlocks[10]);
  const [isHovering, setIsHovering] = useState(false);
  const [showMobileSheet, setShowMobileSheet] = useState(false);

  // Audio State
  const [isAudioEnabled, setIsAudioEnabled] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const ambientSourceRef = useRef<AudioBufferSourceNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  const headerRef = useRef<HTMLDivElement>(null);
  const miningRef = useRef<HTMLDivElement>(null);

  // 🚨 Detectar si el bloque activo es el de warning (la idea loca)
  const isWarningActive = activeSpec.category === "warning";

  // Detectar móvil de forma segura (anti-hidratación)
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    setIsMounted(true);
  }, []);

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

  // Audio Initialization Logic (con fallback Safari/WebKit)
  const initAudio = async () => {
    if (audioContextRef.current) return;

    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      audioContextRef.current = ctx;

      const gainNode = ctx.createGain();
      gainNode.gain.value = AUDIO_CONFIG.ambientVolume;
      gainNode.connect(ctx.destination);
      gainNodeRef.current = gainNode;

      const loadAudio = async (url: string) => {
        const res = await fetch(url);
        if (!res.ok) throw new Error(`HTTP ${res.status} al cargar ${url}`);
        const arrayBuffer = await res.arrayBuffer();
        return await ctx.decodeAudioData(arrayBuffer);
      };

      const chimeAudio = await loadAudio(AUDIO_CONFIG.chimeUrl);
      const chimeSource = ctx.createBufferSource();
      chimeSource.buffer = chimeAudio;
      const chimeGain = ctx.createGain();
      chimeGain.gain.value = AUDIO_CONFIG.chimeVolume;
      chimeSource.connect(chimeGain);
      chimeGain.connect(ctx.destination);
      chimeSource.start(0);

      const ambientAudio = await loadAudio(AUDIO_CONFIG.ambientUrl);
      const ambientSource = ctx.createBufferSource();
      ambientSource.buffer = ambientAudio;
      ambientSource.loop = true;
      ambientSource.connect(gainNode);
      ambientSource.start(0);
      ambientSourceRef.current = ambientSource;

      setIsAudioEnabled(true);
    } catch (error) {
      console.error("⚠️ FALLO DE AUDIO ORACLE:", error);
    }
  };

  const toggleAudio = () => {
    if (!audioContextRef.current) {
      initAudio();
      return;
    }

    if (isAudioEnabled) {
      gainNodeRef.current?.gain.linearRampToValueAtTime(0, audioContextRef.current!.currentTime + 0.5);
      setIsAudioEnabled(false);
    } else {
      gainNodeRef.current?.gain.linearRampToValueAtTime(AUDIO_CONFIG.ambientVolume, audioContextRef.current!.currentTime + 0.5);
      setIsAudioEnabled(true);
    }
  };

  useGSAP(() => {
    const ctx = gsap.context(() => {
      gsap.from(headerRef.current, { opacity: 0, y: -50, duration: 1.2, ease: "power3.out" });
      gsap.from(miningRef.current, { opacity: 0, scale: 0.8, rotationX: 15, duration: 1, delay: 0.3, ease: "back.out(1.7)", transformPerspective: 600 });
    });
    return () => ctx.revert();
  }, []);

  const handleSpecSelect = (block: TimechainBlock) => {
    setActiveSpec(block);
    setIsHovering(true);
    setTimeout(() => setIsHovering(false), 2000);
    if (isMobile) setShowMobileSheet(false);
  };

  if (!isMounted) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-64 h-64 bg-black border-2 border-matrix/30 rounded-full animate-pulse shadow-matrix-strong" />
      </div>
    );
  }

  return (
    <>
      <Navbar />

      <div className="relative min-h-screen bg-black text-[hsl(var(--foreground))]">

        {/* LAYER 1: THREE.JS CANVAS */}
        <div className="fixed inset-0 z-0">
          <Suspense fallback={null}>
            <Canvas
              camera={{ position: [0, 2, 12], fov: 50 }}
              dpr={[1, 2]}
              gl={{ antialias: true, toneMapping: 3 }}
            >
              <fog attach="fog" args={[COLORS.black, 8, 25]} />
              <ambientLight intensity={0.2} />
              <pointLight
                position={[0, 5, 0]}
                intensity={isWarningActive ? 2.5 : 2}
                color={isWarningActive ? COLORS.warning : (isHovering ? COLORS.accent : COLORS.matrix)}
              />

              <OrbitControls
                autoRotate
                autoRotateSpeed={isMobile ? 0.2 : 0.4}
                enableDamping
                dampingFactor={0.06}
                enableZoom={!isMobile}
                enablePan={!isMobile}
                maxPolarAngle={Math.PI / 2 - 0.02}
              />
              {timechainBlocks.map((block, idx) => (
                <HologramBlock key={block.height} block={block} index={idx} />
              ))}
              <AtmosphericParticles />
            </Canvas>
          </Suspense>
        </div>

        {/* Vignette & Grain */}
        <div className="fixed inset-0 pointer-events-none z-[5] bg-[radial-gradient(ellipse_75%_65%_at_center,transparent_30%,rgba(0,0,0,0.72)_100%)]" />
        <div className="fixed inset-0 pointer-events-none z-[6] opacity-[0.045] mix-blend-overlay bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDUiLz4KPC9zdmc+')]"/>

        {/* LAYER 2: HUD OVERLAY */}
        <div className="relative z-10 min-h-screen flex flex-col pointer-events-none">
          <div className="flex-1 relative">

            {/* Esquinas decorativas */}
            <div className="absolute top-[22px] right-[22px] w-8 h-8 border-t-2 border-r-2 border-matrix/30 pointer-events-none hidden md:block" />
            <div className="absolute bottom-[22px] left-[22px] w-8 h-8 border-b-2 border-l-2 border-matrix/30 pointer-events-none hidden md:block" />

            {/* HEADER */}
            <header ref={headerRef} className="absolute top-20 left-4 right-4 md:top-[90px] md:left-[56px] md:right-[56px] flex flex-col md:flex-row justify-between items-start gap-4 md:gap-0 pointer-events-auto">
              <div className="flex flex-col gap-4 md:gap-6 w-full md:w-auto">
                <div className="flex items-center gap-4">
                  <div className="relative w-8 h-8 flex-shrink-0">
                    <div className="absolute inset-0 border-[1.5px] border-matrix rotate-45" />
                    <div className="absolute inset-[9px] bg-matrix rotate-45 shadow-matrix-strong" />
                  </div>
                  <div>
                    <div className="font-serif text-xl md:text-2xl tracking-[0.2em] leading-none text-[#FAFAFA]">TIMECHAIN</div>
                    <div className="font-mono text-[8px] md:text-[9.5px] text-gray-500 tracking-[0.3em] mt-1.5">OBSERVATORY / v3.0</div>
                  </div>
                </div>
                <div ref={miningRef} className="bg-black/80 border border-matrix/30 backdrop-blur-md rounded-2xl md:rounded-3xl p-4 md:p-6 w-full md:max-w-xs">
                  <div className="flex items-center gap-2 mb-2 md:mb-3 text-[9px] md:text-[10px] font-mono text-matrix uppercase tracking-[0.2em]">
                    <Clock className="h-3 w-3 md:h-4 md:w-4 animate-pulse" /> Próximo Bloque
                  </div>
                  <div
                    className="font-vt323 text-5xl md:text-7xl text-matrix tracking-widest tabular-nums"
                    aria-live="polite"
                    aria-atomic="true"
                    aria-label={`Tiempo restante para el próximo bloque: ${timeUntilNext}`}
                  >
                    {timeUntilNext}
                  </div>
                  <div className="mt-2 text-[8px] md:text-[9px] font-mono text-gray-600 uppercase tracking-wider">
                    Block Height: <span className="text-matrix">#{timechainBlocks.length}</span> • Dificultad: <span className="text-matrix">0000...</span>
                  </div>
                </div>
              </div>

              {/* Status Indicators - Solo desktop */}
              <div className="hidden md:flex flex-col gap-3 text-right">
                <div className="flex items-center justify-end gap-2 text-[10px] font-mono text-gray-400 tracking-[0.18em]">
                  <span>HOLO-FIELD STABLE</span>
                  <span className="h-[7px] w-[7px] bg-matrix rounded-full shadow-terminal animate-pulse" />
                </div>
                <div className="flex items-center justify-end gap-2 text-[10px] font-mono text-gray-400 tracking-[0.18em]">
                  <span>CHAIN SYNC 99.7%</span>
                  <span className="h-[7px] w-[7px] bg-matrix rounded-full shadow-terminal animate-pulse" />
                </div>
                <div className="flex items-center justify-end gap-2 text-[10px] font-mono text-gray-400 tracking-[0.18em]">
                  <span>POWER 4.2 kJ</span>
                  <span className="h-[7px] w-[7px] bg-bitcoin rounded-full shadow-terminal animate-pulse" />
                </div>
              </div>
            </header>

            {/* ASIDE DERECHO - Solo desktop */}
            <aside className="hidden md:block fixed right-[56px] top-1/2 -translate-y-1/2 w-[260px] bg-black/80 backdrop-blur-xl border border-white/10 shadow-2xl pointer-events-auto">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-matrix/60 to-transparent animate-scanline" />

              <div className="p-5 border-b border-white/10 flex items-center justify-between bg-black/60 shrink-0">
                <div className="flex items-center gap-3">
                  <Hash className="h-5 w-5 text-matrix" />
                  <span className="font-vt323 text-xl text-matrix tracking-wider">CADENA DE EVENTOS • LOG</span>
                </div>
              </div>
              <div className="p-4 flex flex-col gap-2 overflow-y-auto max-h-[60vh] custom-scrollbar">
                {timechainBlocks.map((block) => {
                  const isWarningBlock = block.category === "warning";
                  const isActive = activeSpec.height === block.height;
                  return (
                    <button
                      key={block.height}
                      onClick={() => handleSpecSelect(block)}
                      className={`group flex items-center gap-3 p-3 border text-left transition-all duration-300 ${
                        isActive
                          ? isWarningBlock
                            ? 'bg-red-500/10 border-red-500/60 shadow-[0_0_20px_rgba(239,68,68,0.3)]'
                            : 'bg-matrix/10 border-matrix shadow-matrix'
                          : isWarningBlock
                            ? 'border-red-500/30 hover:border-red-500/60 hover:bg-red-500/5'
                            : 'border-white/10 hover:border-matrix/30 hover:bg-matrix/5'
                      }`}
                    >
                      <span className={`flex items-center justify-center w-8 h-8 rounded border transition-colors ${
                        isActive
                          ? isWarningBlock
                            ? 'border-red-500 text-red-500'
                            : 'border-matrix text-matrix'
                          : isWarningBlock
                            ? 'border-red-500/40 text-red-500/70'
                            : 'border-white/10 text-gray-500'
                      }`}>
                        <block.Icon className={`h-4 w-4 ${isWarningBlock && isActive ? 'animate-pulse' : ''}`} />
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className={`font-mono text-[11px] tracking-wider truncate ${
                          isActive
                            ? isWarningBlock ? 'text-red-500' : 'text-matrix'
                            : isWarningBlock ? 'text-red-400/80' : 'text-gray-400'
                        }`}>
                          {block.title}
                        </div>
                        <div className={`font-mono text-[9px] mt-0.5 ${
                          isWarningBlock ? 'text-red-500/50' : 'text-gray-600'
                        }`}>
                          {block.hash.slice(0, 12)}...
                        </div>
                      </div>
                      <span className={`font-mono text-[9px] ${
                        isActive
                          ? isWarningBlock ? 'text-red-500' : 'text-matrix'
                          : isWarningBlock ? 'text-red-500/60' : 'text-gray-500'
                      }`}>
                        #{block.height.toString().padStart(3, '0')}
                      </span>
                    </button>
                  );
                })}
              </div>
            </aside>

            {/* BOTÓN FLOTANTE MÓVIL - Explorar Hitos */}
            {isMobile && (
              <button
                onClick={() => setShowMobileSheet(true)}
                className="fixed bottom-24 right-4 z-40 flex items-center gap-2 px-4 py-3 bg-black/90 border border-matrix/40 rounded-full shadow-matrix-strong backdrop-blur-md pointer-events-auto"
              >
                <Menu className="h-5 w-5 text-matrix" />
                <span className="font-mono text-xs text-matrix tracking-wider">EXPLORAR HITOS</span>
              </button>
            )}

            {/* BOTTOM SHEET MÓVIL */}
            {showMobileSheet && isMobile && (
              <div className="fixed inset-0 z-50 md:hidden pointer-events-auto">
                <div
                  className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                  onClick={() => setShowMobileSheet(false)}
                />
                <div className="absolute inset-x-0 bottom-0 bg-black border-t-2 border-matrix/40 rounded-t-3xl max-h-[80vh] flex flex-col">
                  <div className="p-4 border-b border-white/10 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Hash className="h-5 w-5 text-matrix" />
                      <span className="font-vt323 text-xl text-matrix tracking-wider">CADENA DE EVENTOS • LOG</span>
                    </div>
                    <button
                      onClick={() => setShowMobileSheet(false)}
                      className="p-2 hover:bg-white/5 rounded-lg transition-colors"
                      aria-label="Cerrar panel"
                    >
                      <X className="h-5 w-5 text-gray-400" />
                    </button>
                  </div>
                  <div className="p-4 flex flex-col gap-2 overflow-y-auto flex-1 custom-scrollbar">
                    {timechainBlocks.map((block) => {
                      const isWarningBlock = block.category === "warning";
                      const isActive = activeSpec.height === block.height;
                      return (
                        <button
                          key={block.height}
                          onClick={() => handleSpecSelect(block)}
                          className={`group flex items-center gap-3 p-3 border text-left transition-all duration-300 ${
                            isActive
                              ? isWarningBlock
                                ? 'bg-red-500/10 border-red-500/60 shadow-[0_0_20px_rgba(239,68,68,0.3)]'
                                : 'bg-matrix/10 border-matrix shadow-matrix'
                              : isWarningBlock
                                ? 'border-red-500/30 hover:border-red-500/60 hover:bg-red-500/5'
                                : 'border-white/10 hover:border-matrix/30 hover:bg-matrix/5'
                          }`}
                        >
                          <span className={`flex items-center justify-center w-8 h-8 rounded border transition-colors ${
                            isActive
                              ? isWarningBlock
                                ? 'border-red-500 text-red-500'
                                : 'border-matrix text-matrix'
                              : isWarningBlock
                                ? 'border-red-500/40 text-red-500/70'
                                : 'border-white/10 text-gray-500'
                          }`}>
                            <block.Icon className={`h-4 w-4 ${isWarningBlock && isActive ? 'animate-pulse' : ''}`} />
                          </span>
                          <div className="flex-1 min-w-0">
                            <div className={`font-mono text-sm tracking-wider truncate ${
                              isActive
                                ? isWarningBlock ? 'text-red-500' : 'text-matrix'
                                : isWarningBlock ? 'text-red-400/80' : 'text-gray-400'
                            }`}>
                              {block.title}
                            </div>
                            <div className={`font-mono text-xs mt-0.5 ${
                              isWarningBlock ? 'text-red-500/50' : 'text-gray-600'
                            }`}>
                              {block.quarter} • {block.hash.slice(0, 12)}...
                            </div>
                          </div>
                          <span className={`font-mono text-xs ${
                            isActive
                              ? isWarningBlock ? 'text-red-500' : 'text-matrix'
                              : isWarningBlock ? 'text-red-500/60' : 'text-gray-500'
                          }`}>
                            #{block.height.toString().padStart(3, '0')}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* FOOTER DE ESPECIFICACIONES (HUD Inferior) */}
            <footer className="fixed bottom-0 left-0 right-0 p-4 z-30 md:bottom-[24px] md:left-[56px] md:right-[336px] md:p-0 pointer-events-auto">
              <div className={`flex flex-col md:flex-row gap-3 md:gap-7 bg-black/80 backdrop-blur-xl border transition-all duration-500 p-3 md:p-3 md:px-5 rounded-xl md:rounded-none ${
                isWarningActive
                  ? 'border-red-500/60 shadow-[0_0_30px_rgba(239,68,68,0.25)]'
                  : isHovering
                    ? 'border-accent'
                    : 'border-white/10'
              }`}>
                {/* Móvil: versión simplificada */}
                <div className="flex md:hidden items-center justify-between gap-3">
                  <div className="flex flex-col gap-1 flex-1">
                    <span className={`text-[8px] font-mono tracking-[0.25em] ${
                      isWarningActive ? 'text-red-500' : 'text-gray-500'
                    }`}>
                      {isWarningActive ? '⚠ ALERTA ACTIVA' : 'HITO ACTIVO'}
                    </span>
                    <span className={`text-sm font-mono tracking-[0.1em] transition-colors duration-300 ${
                      isWarningActive
                        ? 'text-red-500'
                        : isHovering ? 'text-accent' : 'text-matrix'
                    }`}>
                      #{activeSpec.height.toString().padStart(3, '0')} • {activeSpec.title}
                    </span>
                  </div>
                  <button
                    onClick={() => setShowMobileSheet(true)}
                    className={`px-3 py-1.5 border rounded-lg text-xs font-mono tracking-wider ${
                      isWarningActive
                        ? 'bg-red-500/10 border-red-500/40 text-red-500'
                        : 'bg-matrix/10 border-matrix/40 text-matrix'
                    }`}
                  >
                    VER TODOS
                  </button>
                </div>

                {/* Desktop: versión completa */}
                <div className="hidden md:flex gap-7">
                  <div className="flex flex-col gap-1">
                    <span className={`text-[9px] font-mono tracking-[0.25em] ${
                      isWarningActive ? 'text-red-500' : 'text-gray-500'
                    }`}>CATEGORÍA</span>
                    <span className={`text-[11px] font-mono tracking-[0.1em] transition-colors duration-300 ${
                      isWarningActive
                        ? 'text-red-500'
                        : isHovering ? 'text-accent' : 'text-matrix'
                    }`}>
                      {activeSpec.category.toUpperCase()}
                    </span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className={`text-[9px] font-mono tracking-[0.25em] ${
                      isWarningActive ? 'text-red-500' : 'text-gray-500'
                    }`}>HITO</span>
                    <span className={`text-[11px] font-mono tracking-[0.1em] transition-colors duration-300 flex items-center gap-2 ${
                      isWarningActive
                        ? 'text-red-500'
                        : isHovering ? 'text-accent' : 'text-bitcoin'
                    }`}>
                      {isWarningActive && (
                        <span className="inline-flex items-center gap-1 px-1.5 py-0.5 bg-red-500/20 border border-red-500/40 rounded text-[9px] font-mono tracking-wider animate-pulse">
                          <AlertTriangle className="h-3 w-3" /> ALERT
                        </span>
                      )}
                      {activeSpec.title}
                    </span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className={`text-[9px] font-mono tracking-[0.25em] ${
                      isWarningActive ? 'text-red-500' : 'text-gray-500'
                    }`}>HASH</span>
                    <span className={`text-[11px] font-mono tracking-[0.1em] transition-colors duration-300 ${
                      isWarningActive
                        ? 'text-red-500'
                        : isHovering ? 'text-accent' : 'text-matrix'
                    }`}>
                      {activeSpec.hash.slice(0, 12)}...
                    </span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className={`text-[9px] font-mono tracking-[0.25em] ${
                      isWarningActive ? 'text-red-500' : 'text-gray-500'
                    }`}>CONF</span>
                    <span className={`text-[11px] font-mono tracking-[0.1em] transition-colors duration-300 ${
                      isWarningActive
                        ? 'text-red-500'
                        : isHovering ? 'text-accent' : 'text-matrix'
                    }`}>
                      {timechainBlocks.length - activeSpec.height}
                    </span>
                  </div>
                </div>
              </div>

              {/* Controles - Solo desktop */}
              <div className={`hidden md:flex gap-5 text-[10px] font-mono tracking-[0.18em] mt-4 px-1 transition-colors duration-500 ${
                isWarningActive ? 'text-red-500/60' : 'text-gray-500'
              }`}>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-1 border text-[9.5px] tracking-[0.15em] ${
                    isWarningActive
                      ? 'bg-red-500/5 border-red-500/30 text-red-400'
                      : 'bg-white/4 border-white/10 text-[#FAFAFA]'
                  }`}>CLICK</span>
                  inspeccionar bloque
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-1 border text-[9.5px] tracking-[0.15em] ${
                    isWarningActive
                      ? 'bg-red-500/5 border-red-500/30 text-red-400'
                      : 'bg-white/4 border-white/10 text-[#FAFAFA]'
                  }`}>DRAG</span>
                  vista orbital
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-1 border text-[9.5px] tracking-[0.15em] ${
                    isWarningActive
                      ? 'bg-red-500/5 border-red-500/30 text-red-400'
                      : 'bg-white/4 border-white/10 text-[#FAFAFA]'
                  }`}>1-0</span>
                  selección directa
                </div>
              </div>
            </footer>
          </div>
        </div>
      </div>

      {/* BOTÓN DE AUDIO FLOTANTE */}
      <button
        onClick={toggleAudio}
        className="fixed bottom-[88px] right-4 z-[60] p-3 bg-black/80 border border-white/10 backdrop-blur-md rounded-full shadow-2xl hover:border-matrix/50 transition-colors pointer-events-auto md:bottom-6 md:right-6"
        aria-label={isAudioEnabled ? "Silenciar audio" : "Activar audio"}
      >
        {isAudioEnabled ? (
          <Volume2 className="h-5 w-5 text-matrix animate-pulse" />
        ) : (
          <VolumeX className="h-5 w-5 text-gray-500" />
        )}
      </button>
    </>
  );
}