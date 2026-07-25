'use client';

import { useState, useEffect, useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, Text } from '@react-three/drei';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import * as THREE from 'three';

// Workaround for drei v8 + fiber v8 type mismatch on Text component
const AnyText = Text as any;
// Workaround for drei v8 + fiber v8 type mismatch on Float component
const AnyFloat = Float as any;
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { 
  Clock, Hash, Zap, Users, Sprout, Store, Trophy, Coins, ShieldCheck, Map, Rocket,
  type LucideIcon
} from 'lucide-react';

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
  category: "genesis" | "infrastructure" | "adoption" | "community";
}

const timechainBlocks: TimechainBlock[] = [
  {
    height: 1, timestamp: "2021-10-15T18:00:00Z", quarter: "Q4 2021",
    title: "GENESIS BLOCK", desc: "Primera reunión cypherpunk en Mérida. Nace la semilla de la soberanía financiera en Yucatán.",
    hash: "0000a7f3b2c1...", prevHash: "0000000000000000000000000000000000000000000000000000000000000000",
    Icon: Sprout, category: "genesis"
  },
  {
    height: 2, timestamp: "2022-01-20T12:00:00Z", quarter: "Q1 2022",
    title: "NODO LIGHTNING", desc: "Primer nodo LN público en Yucatán. Canal establecido con CDMX. La red comienza a fluir.",
    hash: "0000b8e4c3d2...", prevHash: "0000a7f3b2c1d8e9f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7",
    Icon: Zap, category: "infrastructure"
  },
  {
    height: 3, timestamp: "2022-07-10T15:30:00Z", quarter: "Q3 2022",
    title: "PRIMER COMERCIO", desc: "Pizzería local acepta BTC via BTCPay Server. Primera transacción real en la península.",
    hash: "0000c9f5d4e3...", prevHash: "0000b8e4c3d2e1f0a9b8c7d6e5f4a3b2c1d0e9f8a7b6c5d4e3f2a1b0c9d8e7f6",
    Icon: Store, category: "adoption"
  },
  {
    height: 4, timestamp: "2023-02-28T09:00:00Z", quarter: "Q1 2023",
    title: "TIANGUIS BITCOIN", desc: "Marketplace P2P descentralizado. Nostr + Lightning Network. Sin intermediarios, sin KYC.",
    hash: "0000d0a6e5f4...", prevHash: "0000c9f5d4e3f2a1b0c9d8e7f6a5b4c3d2e1f0a9b8c7d6e5f4a3b2c1d0e9f8a7",
    Icon: Coins, category: "infrastructure"
  },
  {
    height: 5, timestamp: "2023-11-15T10:00:00Z", quarter: "Q4 2023",
    title: "HACKATHON BTC MÉXICO", desc: "48 horas de código. 5 equipos. Nace B.O.B. Hotel. Partnership con Blockchain University.",
    hash: "0000e1b7f6a5...", prevHash: "0000d0a6e5f4a3b2c1d0e9f8a7b6c5d4e3f2a1b0c9d8e7f6a5b4c3d2e1f0a9b8",
    Icon: Trophy, category: "community"
  },
  {
    height: 6, timestamp: "2024-04-20T14:00:00Z", quarter: "Q2 2024",
    title: "BLINK API INTEGRATION", desc: "Migración a Blink. Stablesats USD. TipJar con QR dinámico. Lightning Address activo.",
    hash: "0000f2c8a7b6...", prevHash: "0000e1b7f6a5b4c3d2e1f0a9b8c7d6e5f4a3b2c1d0e9f8a7b6c5d4e3f2a1b0c9",
    Icon: Zap, category: "infrastructure"
  },
  {
    height: 7, timestamp: "2024-09-10T11:00:00Z", quarter: "Q3 2024",
    title: "ORACLE SYSTEM v2.0", desc: "Rebranding Matrix. Design System completo. Market Mood Widget. Price Converter live.",
    hash: "0000a3d9b8c7...", prevHash: "0000f2c8a7b6c5d4e3f2a1b0c9d8e7f6a5b4c3d2e1f0a9b8c7d6e5f4a3b2c1d0",
    Icon: ShieldCheck, category: "infrastructure"
  },
  {
    height: 8, timestamp: "2024-12-05T16:00:00Z", quarter: "Q4 2024",
    title: "DIRECTORIOS ACTIVOS", desc: "8 proveedores confirmados. 4 proyectos showcase. Cal.com integrado. Onboarding automatizado.",
    hash: "0000b4eac9d8...", prevHash: "0000a3d9b8c7d6e5f4a3b2c1d0e9f8a7b6c5d4e3f2a1b0c9d8e7f6a5b4c3d2e1",
    Icon: Users, category: "adoption"
  },
  {
    height: 9, timestamp: "2025-03-01T08:00:00Z", quarter: "Q1 2025",
    title: "BTC MAP INTEGRATION", desc: "Mapa interactivo de merchants. Leaflet + CARTO dark tiles. Marcadores personalizados.",
    hash: "0000c5fbdae9...", prevHash: "0000b4eac9d8e7f6a5b4c3d2e1f0a9b8c7d6e5f4a3b2c1d0e9f8a7b6c5d4e3f2",
    Icon: Map, category: "adoption"
  },
  {
    height: 10, timestamp: "2025-05-03T00:00:00Z", quarter: "Q2 2025",
    title: "ESTADO ACTUAL", desc: "+150 usuarios Tianguis. 8 proveedores activos. 4 proyectos dev. Open-source AGPL-3.0.",
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
// REACT THREE FIBER - 3D SCENE COMPONENTS
// ============================================================

function HologramBlock({ block, index }: { block: TimechainBlock; index: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const color = new THREE.Color(categoryToColor(block.category));

  const angle = (index / timechainBlocks.length) * Math.PI * 2;
  const radius = 3.5;
  const yBase = (index - timechainBlocks.length / 2) * 1.2;
  
  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime();
    groupRef.current.position.y = yBase + Math.sin(t * 0.6 + index) * 0.15;
    groupRef.current.rotation.y = t * 0.1 + angle;
  });

  return (
    <AnyFloat speed={2} rotationIntensity={0.3} floatIntensity={0.5}>
      <group ref={groupRef} position={[Math.cos(angle) * radius, yBase, Math.sin(angle) * radius]}>
        <mesh position={[0, -0.6, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.5, 0.6, 6]} />
          <meshBasicMaterial color={color} transparent opacity={0.6} side={2} />
        </mesh>
        
        <mesh ref={meshRef}>
          <boxGeometry args={[0.8, 0.8, 0.8]} />
          <meshStandardMaterial 
            color={color}
            emissive={color}
            emissiveIntensity={0.8}
            wireframe
            transparent
            opacity={0.9}
          />
        </mesh>

        <mesh>
          <sphereGeometry args={[0.25, 16, 16]} />
          <meshBasicMaterial color={color} transparent opacity={0.4} />
        </mesh>

        <AnyText
          position={[0, 1.2, 0]}
          fontSize={0.18}
          color={COLORS.white}
          anchorX="center"
          anchorY="middle"
          font="/fonts/VT323-Regular.ttf"
        >
          #{block.height.toString().padStart(3, '0')}
        </AnyText>
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
  const [timeUntilNext, setTimeUntilNext] = useState("10:00");
  const [activeSpec, setActiveSpec] = useState<TimechainBlock>(timechainBlocks[9]);
  const [isHovering, setIsHovering] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);
  const miningRef = useRef<HTMLDivElement>(null);

  // 1. Patrón anti-hidratación: Solo se activa en el cliente
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
      if (nextBlockMinutes >= 60) { next.setHours(now.getHours() + 1); next.setMinutes(0); }
      else { next.setMinutes(nextBlockMinutes); }
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

  // 2. useGSAP con array vacío: se ejecuta una sola vez al montar en el cliente
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
  };

  // 3. Skeleton de hidratación: Debe ser idéntico en servidor y primer render del cliente
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
      {/* 4. suppressHydrationWarning previene fallos por micro-discrepancias de terceros */}
      <div className="min-h-screen bg-black text-[hsl(var(--foreground))] relative overflow-hidden" suppressHydrationWarning>
        
        {/* LAYER 1: THREE.JS CANVAS */}
        <div className="fixed inset-0 z-0">
          <Suspense fallback={null}>
            <Canvas
              camera={{ position: [0, 2, 12], fov: 50 }}
              dpr={[1, 2]}
              // 5. Usar el valor numérico 3 evita evaluaciones raras de THREE en SSR
              gl={{ antialias: true, toneMapping: 3 }} 
            >
              <fog attach="fog" args={[COLORS.black, 8, 25]} />
              <ambientLight intensity={0.2} />
              <pointLight position={[0, 5, 0]} intensity={2} color={isHovering ? COLORS.accent : COLORS.matrix} />
              
              <OrbitControls 
                autoRotate 
                autoRotateSpeed={0.4} 
                enableDamping 
                dampingFactor={0.06} 
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
        <div className="fixed inset-0 pointer-events-none z-10">
          <div className="pointer-events-auto">
            
            <div className="absolute top-[22px] right-[22px] w-8 h-8 border-t-2 border-r-2 border-matrix/30 pointer-events-none" />
            <div className="absolute bottom-[22px] left-[22px] w-8 h-8 border-b-2 border-l-2 border-matrix/30 pointer-events-none" />

            <header ref={headerRef} className="absolute top-[44px] left-[56px] right-[56px] flex justify-between items-start">
              <div className="flex flex-col gap-6">
                <div className="flex items-center gap-4">
                  <div className="relative w-8 h-8 flex-shrink-0">
                    <div className="absolute inset-0 border-[1.5px] border-matrix rotate-45" />
                    <div className="absolute inset-[9px] bg-matrix rotate-45 shadow-matrix-strong" />
                  </div>
                  <div>
                    <div className="font-serif text-2xl tracking-[0.2em] leading-none text-[#FAFAFA]">TIMECHAIN</div>
                    <div className="font-mono text-[9.5px] text-gray-500 tracking-[0.3em] mt-1.5">OBSERVATORY / v3.0</div>
                  </div>
                </div>

                <div ref={miningRef} className="bg-black/80 border border-matrix/30 backdrop-blur-md rounded-3xl p-6 max-w-xs">
                  <div className="flex items-center gap-2 mb-3 text-[10px] font-mono text-matrix uppercase tracking-[0.2em]">
                    <Clock className="h-4 w-4 animate-pulse" /> Próximo Bloque
                  </div>
                  <div 
                    className="font-vt323 text-7xl text-matrix tracking-widest tabular-nums"
                    aria-live="polite" 
                    aria-atomic="true"
                    aria-label={`Tiempo restante para el próximo bloque: ${timeUntilNext} minutos`}
                  >
                    {timeUntilNext}
                  </div>
                  <div className="mt-2 text-[9px] font-mono text-gray-600 uppercase tracking-wider">
                    Block Height: <span className="text-matrix">#{timechainBlocks.length}</span> • Dificultad: <span className="text-matrix">0000...</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-3 text-right">
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

            <aside className="absolute right-[56px] top-1/2 -translate-y-1/2 w-[248px] bg-black/80 backdrop-blur-xl border border-white/10 shadow-2xl">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-matrix/60 to-transparent animate-scanline" />
              
              <div className="p-5 border-b border-white/10 flex items-center justify-between bg-black/60 shrink-0">
                <div className="flex items-center gap-3">
                  <Hash className="h-5 w-5 text-matrix" />
                  <span className="font-vt323 text-2xl text-matrix tracking-wider">SPECIMEN • LOG</span>
                </div>
              </div>

              <div className="p-4 flex flex-col gap-2 overflow-y-auto max-h-[60vh] custom-scrollbar">
                {timechainBlocks.map((block) => (
                  <button 
                    key={block.height}
                    onClick={() => handleSpecSelect(block)}
                    className={`group flex items-center gap-3 p-3 border text-left transition-all duration-300
                      ${activeSpec.height === block.height 
                        ? 'bg-matrix/10 border-matrix shadow-matrix' 
                        : 'border-white/10 hover:border-matrix/30 hover:bg-matrix/5'}
                    `}
                  >
                    <span className={`flex items-center justify-center w-8 h-8 rounded border transition-colors
                      ${activeSpec.height === block.height ? 'border-matrix text-matrix' : 'border-white/10 text-gray-500'}
                    `}>
                      <block.Icon className="h-4 w-4" />
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className={`font-mono text-[11px] tracking-wider truncate ${activeSpec.height === block.height ? 'text-matrix' : 'text-gray-400'}`}>
                        {block.title}
                      </div>
                      <div className="font-mono text-[9px] text-gray-600 mt-0.5">
                        {block.hash.slice(0, 12)}...
                      </div>
                    </div>
                    <span className={`font-mono text-[9px] ${activeSpec.height === block.height ? 'text-matrix' : 'text-gray-500'}`}>
                      #{block.height.toString().padStart(3, '0')}
                    </span>
                  </button>
                ))}
              </div>
            </aside>

            <footer className="absolute bottom-[44px] left-[56px] right-[56px] flex justify-between items-end gap-6">
              <div className="flex gap-5 text-[10px] font-mono text-gray-500 tracking-[0.18em]">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-1 bg-white/4 border border-white/10 text-[#FAFAFA] text-[9.5px] tracking-[0.15em]">CLICK</span> 
                  inspect block
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-1 bg-white/4 border border-white/10 text-[#FAFAFA] text-[9.5px] tracking-[0.15em]">DRAG</span> 
                  orbit view
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-1 bg-white/4 border border-white/10 text-[#FAFAFA] text-[9.5px] tracking-[0.15em]">1-0</span> 
                  direct select
                </div>
              </div>

              <div className={`flex gap-7 bg-black/80 backdrop-blur-xl border transition-colors duration-300 p-3 px-5
                ${isHovering ? 'border-accent' : 'border-white/10'}
              `}>
                <div className="flex flex-col gap-1">
                  <span className="text-[9px] font-mono text-gray-500 tracking-[0.25em]">CATEGORY</span>
                  <span className={`text-[11px] font-mono tracking-[0.1em] transition-colors duration-300
                    ${isHovering ? 'text-accent' : 'text-matrix'}
                  `}>
                    {activeSpec.category.toUpperCase()}
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[9px] font-mono text-gray-500 tracking-[0.25em]">SPEC</span>
                  <span className={`text-[11px] font-mono tracking-[0.1em] transition-colors duration-300
                    ${isHovering ? 'text-accent' : 'text-bitcoin'}
                  `}>
                    {activeSpec.title}
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[9px] font-mono text-gray-500 tracking-[0.25em]">HASH</span>
                  <span className={`text-[11px] font-mono tracking-[0.1em] transition-colors duration-300
                    ${isHovering ? 'text-accent' : 'text-matrix'}
                  `}>
                    {activeSpec.hash.slice(0, 12)}...
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[9px] font-mono text-gray-500 tracking-[0.25em]">CONF</span>
                  <span className={`text-[11px] font-mono tracking-[0.1em] transition-colors duration-300
                    ${isHovering ? 'text-accent' : 'text-matrix'}
                  `}>
                    {timechainBlocks.length - activeSpec.height}
                  </span>
                </div>
              </div>
            </footer>

          </div>
        </div>

      </div>
      <Footer />
    </>
  );
}