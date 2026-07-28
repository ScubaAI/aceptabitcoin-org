"use client";

// app/nuestra-historia/page.tsx
import { useState, useEffect, useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei/core/OrbitControls";
import { Float } from "@react-three/drei/core/Float";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import * as THREE from "three";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import {
  Clock,
  Hash,
  Zap,
  Users,
  Sprout,
  Store,
  Trophy,
  Coins,
  ShieldCheck,
  Map,
  Rocket,
  Menu,
  X,
  Volume2,
  VolumeX
} from "lucide-react";
var AnyFloat = Float;
var timechainBlocks = [
  {
    height: 1,
    timestamp: "2021-11-15T18:00:00Z",
    quarter: "Q4 2021",
    title: "G\xC9NESIS YUCAT\xC1N",
    desc: "Primera reuni\xF3n cypherpunk en M\xE9rida. Despliegue del primer nano-nodo educativo. Inicio del protocolo 'Lunes de Bitcoin'.",
    hash: "0000a7f3b2c1...",
    prevHash: "0000000000000000000000000000000000000000000000000000000000000000",
    Icon: Sprout,
    category: "genesis"
  },
  {
    height: 2,
    timestamp: "2022-05-22T12:00:00Z",
    quarter: "Q2 2022",
    title: "PRIMER COMERCIO",
    desc: "Nodo comercial activo. La Bianca Tropical integra BTCPay Server. Primera transacci\xF3n Lightning validada en la pen\xEDnsula.",
    hash: "0000b8e4c3d2...",
    prevHash: "0000a7f3b2c1d8e9f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7",
    Icon: Store,
    category: "adoption"
  },
  {
    height: 3,
    timestamp: "2022-10-10T09:00:00Z",
    quarter: "Q4 2022",
    title: "DIRECTORIO SOBERANO",
    desc: "Lanzamiento del registro de proveedores de intercambio verificados. Soberan\xEDa financiera sin intermediarios ni custodia tercera.",
    hash: "0000c9f5d4e3...",
    prevHash: "0000b8e4c3d2e1f0a9b8c7d6e5f4a3b2c1d0e9f8a7b6c5d4e3f2a1b0c9d8e7f6",
    Icon: ShieldCheck,
    category: "infrastructure"
  },
  {
    height: 4,
    timestamp: "2024-03-07T08:00:00Z",
    quarter: "Q1 2024",
    title: "HACKATHON BTC MX",
    desc: "Alianza con el Tecnol\xF3gico de Software de M\xE9rida. 48 horas de c\xF3digo, prueba de concepto y construcci\xF3n de comunidad.",
    hash: "0000d0a6e5f4...",
    prevHash: "0000c9f5d4e3f2a1b0c9d8e7f6a5b4c3d2e1f0a9b8c7d6e5f4a3b2c1d0e9f8a7",
    Icon: Trophy,
    category: "community"
  },
  {
    height: 5,
    timestamp: "2024-09-10T11:00:00Z",
    quarter: "Q3 2024",
    title: "ORACLE SYSTEM v2.0",
    desc: "Rebranding a Cypherpunk Bank. Design System v3.0. Integraci\xF3n de Market Mood Widget y Price Converter en tiempo real.",
    hash: "0000e1b7f6a5...",
    prevHash: "0000d0a6e5f4a3b2c1d0e9f8a7b6c5d4e3f2a1b0c9d8e7f6a5b4c3d2e1f0a9b8",
    Icon: Zap,
    category: "infrastructure"
  },
  {
    height: 6,
    timestamp: "2024-12-05T16:00:00Z",
    quarter: "Q4 2024",
    title: "TIANGUIS BITCOIN",
    desc: "Marketplace P2P descentralizado. Nostr + Lightning Network. Comercio sin KYC, sin censura y sin custodia.",
    hash: "0000f2c8a7b6...",
    prevHash: "0000e1b7f6a5b4c3d2e1f0a9b8c7d6e5f4a3b2c1d0e9f8a7b6c5d4e3f2a1b0c9",
    Icon: Coins,
    category: "adoption"
  },
  {
    height: 7,
    timestamp: "2025-02-20T14:00:00Z",
    quarter: "Q1 2025",
    title: "BLINK API & STABLESATS",
    desc: "Migraci\xF3n de infraestructura de pagos. Lightning Address activo y tip-jars din\xE1micos para onboarding de comercios.",
    hash: "0000a3d9b8c7...",
    prevHash: "0000f2c8a7b6c5d4e3f2a1b0c9d8e7f6a5b4c3d2e1f0a9b8c7d6e5f4a3b2c1d0",
    Icon: Zap,
    category: "infrastructure"
  },
  {
    height: 8,
    timestamp: "2025-04-15T08:00:00Z",
    quarter: "Q2 2025",
    title: "BTC MAP INTEGRATION",
    desc: "Mapa interactivo de merchants. Leaflet + CARTO dark tiles. Marcadores personalizados de adopci\xF3n real.",
    hash: "0000b4eac9d8...",
    prevHash: "0000a3d9b8c7d6e5f4a3b2c1d0e9f8a7b6c5d4e3f2a1b0c9d8e7f6a5b4c3d2e1",
    Icon: Map,
    category: "adoption"
  },
  {
    height: 9,
    timestamp: "2025-05-22T00:00:00Z",
    quarter: "Q2 2025",
    title: "PIZZA DAY M\xC9RIDA",
    desc: "Celebraci\xF3n del Bitcoin Pizza Day en alianza con AWS M\xE9rida y Bull Bitcoin. Adopci\xF3n masiva y educativa.",
    hash: "0000c5fbdae9...",
    prevHash: "0000b4eac9d8e7f6a5b4c3d2e1f0a9b8c7d6e5f4a3b2c1d0e9f8a7b6c5d4e3f2",
    Icon: Users,
    category: "community"
  },
  {
    height: 10,
    timestamp: "2025-08-01T12:00:00Z",
    quarter: "Q3 2025",
    title: "ESTADO ACTUAL",
    desc: "+150 usuarios en Tianguis. 8 proveedores activos. 4 proyectos dev. Infraestructura open-source bajo licencia AGPL-3.0.",
    hash: "0000d60cebf0...",
    prevHash: "0000c5fbdae9f8a7b6c5d4e3f2a1b0c9d8e7f6a5b4c3d2e1f0a9b8c7d6e5f4a3",
    Icon: Rocket,
    category: "community"
  }
];
var COLORS = {
  matrix: 65345,
  bitcoin: 16225050,
  accent: 440020,
  black: 0,
  white: 16448250
};
var categoryToColor = (category) => {
  switch (category) {
    case "genesis":
      return COLORS.matrix;
    case "infrastructure":
      return COLORS.bitcoin;
    case "adoption":
      return COLORS.accent;
    case "community":
      return COLORS.bitcoin;
    default:
      return COLORS.white;
  }
};
function HologramBlock({
  block,
  index,
  isActive,
  onSelect,
  genesisComplete
}) {
  const groupRef = useRef(null);
  const color = new THREE.Color(categoryToColor(block.category));
  const angle = index / timechainBlocks.length * Math.PI * 2;
  const radius = 3.5;
  const yBase = (index - timechainBlocks.length / 2) * 1.2;
  useFrame(({ clock }) => {
    if (!groupRef.current || !genesisComplete)
      return;
    const t = clock.getElapsedTime();
    groupRef.current.position.y = yBase + Math.sin(t * 0.55 + index) * 0.13;
    groupRef.current.rotation.y = t * 0.07 + angle;
  });
  return /* @__PURE__ */ React.createElement(AnyFloat, { speed: 1.4, rotationIntensity: 0.18, floatIntensity: 0.35 }, /* @__PURE__ */ React.createElement(
    "group",
    {
      ref: groupRef,
      position: [0, 0, 0],
      onClick: (e) => {
        e.stopPropagation();
        onSelect(block);
      }
    },
    /* @__PURE__ */ React.createElement("mesh", { position: [0, -0.55, 0], rotation: [-Math.PI / 2, 0, 0] }, /* @__PURE__ */ React.createElement("ringGeometry", { args: [0.48, 0.58, 6] }), /* @__PURE__ */ React.createElement(
      "meshBasicMaterial",
      {
        color,
        transparent: true,
        opacity: isActive ? 0.9 : 0.4,
        side: THREE.DoubleSide
      }
    )),
    /* @__PURE__ */ React.createElement("mesh", { scale: isActive ? 1.18 : 1 }, /* @__PURE__ */ React.createElement("boxGeometry", { args: [0.8, 0.8, 0.8] }), /* @__PURE__ */ React.createElement(
      "meshStandardMaterial",
      {
        color,
        emissive: color,
        emissiveIntensity: isActive ? 1.5 : 0.65,
        wireframe: true,
        transparent: true,
        opacity: isActive ? 1 : 0.75
      }
    )),
    /* @__PURE__ */ React.createElement("mesh", null, /* @__PURE__ */ React.createElement("sphereGeometry", { args: [0.22, 16, 16] }), /* @__PURE__ */ React.createElement(
      "meshBasicMaterial",
      {
        color,
        transparent: true,
        opacity: isActive ? 0.7 : 0.3
      }
    ))
  ));
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
  return /* @__PURE__ */ React.createElement("points", null, /* @__PURE__ */ React.createElement("bufferGeometry", null, /* @__PURE__ */ React.createElement(
    "bufferAttribute",
    {
      attach: "attributes-position",
      count,
      array: positions,
      itemSize: 3
    }
  )), /* @__PURE__ */ React.createElement(
    "pointsMaterial",
    {
      size: 0.045,
      color: COLORS.matrix,
      transparent: true,
      opacity: 0.35,
      sizeAttenuation: true
    }
  ));
}
function NuestraHistoriaPage() {
  const [isMounted, setIsMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [timeUntilNext, setTimeUntilNext] = useState("10:00");
  const [activeSpec, setActiveSpec] = useState(timechainBlocks[9]);
  const [isHovering, setIsHovering] = useState(false);
  const [showMobileSheet, setShowMobileSheet] = useState(false);
  const [genesisComplete, setGenesisComplete] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [audioReady, setAudioReady] = useState(false);
  const headerRef = useRef(null);
  const miningRef = useRef(null);
  const ambientRef = useRef(null);
  const genesisSoundRef = useRef(null);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  useEffect(() => {
    if (!isMounted)
      return;
    const updateTimer = () => {
      const now = /* @__PURE__ */ new Date();
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
      const mins = Math.floor(diff / 6e4);
      const secs = Math.floor(diff % 6e4 / 1e3);
      setTimeUntilNext(`${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`);
    };
    updateTimer();
    const interval = setInterval(updateTimer, 1e3);
    return () => clearInterval(interval);
  }, [isMounted]);
  useEffect(() => {
    if (!isMounted)
      return;
    ambientRef.current = new Audio("/audio/timechain-ambient.mp3");
    genesisSoundRef.current = new Audio("/audio/genesis-chime.mp3");
    if (ambientRef.current) {
      ambientRef.current.loop = true;
      ambientRef.current.volume = 0.25;
    }
    if (genesisSoundRef.current) {
      genesisSoundRef.current.volume = 0.45;
    }
    setAudioReady(true);
    return () => {
      ambientRef.current?.pause();
      genesisSoundRef.current?.pause();
    };
  }, [isMounted]);
  useGSAP(() => {
    if (!isMounted)
      return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        delay: 0.8,
        onComplete: () => setGenesisComplete(true)
      });
      tl.fromTo(
        ".genesis-core",
        { scale: 0, opacity: 0 },
        { scale: 2.2, opacity: 0.85, duration: 0.7, ease: "power2.out" }
      ).to(".genesis-core", {
        scale: 0,
        opacity: 0,
        duration: 0.5,
        ease: "power2.in"
      });
      timechainBlocks.forEach((_, index) => {
        const angle = index / timechainBlocks.length * Math.PI * 2;
        const radius = 3.5;
        const yBase = (index - timechainBlocks.length / 2) * 1.2;
        tl.fromTo(
          `.block-group-${index}`,
          {
            x: 0,
            y: 0,
            z: 0,
            scale: 0.05,
            opacity: 0
          },
          {
            x: Math.cos(angle) * radius,
            y: yBase,
            z: Math.sin(angle) * radius,
            scale: 1,
            opacity: 1,
            duration: 1.5,
            ease: "power3.out"
          },
          1.1 + index * 0.09
        );
      });
      gsap.from(headerRef.current, {
        opacity: 0,
        y: -40,
        duration: 1.1,
        delay: 2.8,
        ease: "power3.out"
      });
    });
    return () => ctx.revert();
  }, [isMounted]);
  const toggleAudio = () => {
    if (!audioReady)
      return;
    if (audioEnabled) {
      ambientRef.current?.pause();
      setAudioEnabled(false);
    } else {
      if (genesisSoundRef.current && genesisSoundRef.current.paused) {
        genesisSoundRef.current.currentTime = 0;
        genesisSoundRef.current.play().catch(() => {
        });
      }
      ambientRef.current?.play().catch(() => {
      });
      setAudioEnabled(true);
    }
  };
  const handleSpecSelect = (block) => {
    setActiveSpec(block);
    setIsHovering(true);
    setTimeout(() => setIsHovering(false), 1800);
    if (isMobile)
      setShowMobileSheet(false);
  };
  if (!isMounted) {
    return /* @__PURE__ */ React.createElement("div", { className: "min-h-screen bg-black flex items-center justify-center" }, /* @__PURE__ */ React.createElement("div", { className: "w-64 h-64 bg-black border-2 border-matrix/30 rounded-full animate-pulse" }));
  }
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Navbar, null), /* @__PURE__ */ React.createElement("div", { className: "relative min-h-screen bg-black text-[hsl(var(--foreground))]" }, /* @__PURE__ */ React.createElement("div", { className: "fixed inset-0 z-0" }, /* @__PURE__ */ React.createElement(Suspense, { fallback: null }, /* @__PURE__ */ React.createElement(
    Canvas,
    {
      camera: { position: [0, 2.2, 13], fov: 48 },
      dpr: [1, 1.75],
      gl: { antialias: true, toneMapping: 3 }
    },
    /* @__PURE__ */ React.createElement("fog", { attach: "fog", args: [COLORS.black, 9, 26] }),
    /* @__PURE__ */ React.createElement("ambientLight", { intensity: 0.18 }),
    /* @__PURE__ */ React.createElement(
      "pointLight",
      {
        position: [0, 6, 0],
        intensity: 2.2,
        color: isHovering ? COLORS.accent : COLORS.matrix
      }
    ),
    /* @__PURE__ */ React.createElement(
      OrbitControls,
      {
        autoRotate: true,
        autoRotateSpeed: isMobile ? 0.18 : 0.35,
        enableDamping: true,
        dampingFactor: 0.06,
        enableZoom: !isMobile,
        enablePan: !isMobile,
        maxPolarAngle: Math.PI / 2 - 0.03
      }
    ),
    timechainBlocks.map((block, idx) => /* @__PURE__ */ React.createElement("group", { key: block.height, name: `block-group-${idx}` }, /* @__PURE__ */ React.createElement(
      HologramBlock,
      {
        block,
        index: idx,
        isActive: activeSpec.height === block.height,
        onSelect: handleSpecSelect,
        genesisComplete
      }
    ))),
    /* @__PURE__ */ React.createElement(AtmosphericParticles, null)
  ))), /* @__PURE__ */ React.createElement("div", { className: "genesis-core fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-matrix blur-3xl opacity-0 pointer-events-none z-[1]" }), /* @__PURE__ */ React.createElement("div", { className: "fixed inset-0 pointer-events-none z-[5] bg-[radial-gradient(ellipse_75%_65%_at_center,transparent_30%,rgba(0,0,0,0.75)_100%)]" }), /* @__PURE__ */ React.createElement("div", { className: "fixed inset-0 pointer-events-none z-[6] opacity-[0.04] mix-blend-overlay bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDUiLz4KPC9zdmc+')]" }), /* @__PURE__ */ React.createElement("div", { className: "relative z-10 min-h-screen flex flex-col" }, /* @__PURE__ */ React.createElement("div", { className: "flex-1 relative" }, /* @__PURE__ */ React.createElement(
    "header",
    {
      ref: headerRef,
      className: "absolute top-4 left-4 right-4 md:top-[44px] md:left-[56px] md:right-[56px] flex flex-col md:flex-row justify-between items-start gap-4"
    },
    /* @__PURE__ */ React.createElement("div", { className: "flex flex-col gap-4 md:gap-6" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-4" }, /* @__PURE__ */ React.createElement("div", { className: "relative w-8 h-8" }, /* @__PURE__ */ React.createElement("div", { className: "absolute inset-0 border-[1.5px] border-matrix rotate-45" }), /* @__PURE__ */ React.createElement("div", { className: "absolute inset-[9px] bg-matrix rotate-45 shadow-matrix-strong" })), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "font-serif text-xl md:text-2xl tracking-[0.2em] text-[#FAFAFA]" }, "TIMECHAIN"), /* @__PURE__ */ React.createElement("div", { className: "font-mono text-[8px] md:text-[9.5px] text-gray-500 tracking-[0.3em] mt-1.5" }, "OBSERVATORY / v3.1 GENESIS"))), /* @__PURE__ */ React.createElement(
      "div",
      {
        ref: miningRef,
        className: "bg-black/80 border border-matrix/30 backdrop-blur-md rounded-2xl md:rounded-3xl p-4 md:p-6 w-full md:max-w-xs"
      },
      /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2 mb-2 text-[9px] md:text-[10px] font-mono text-matrix uppercase tracking-[0.2em]" }, /* @__PURE__ */ React.createElement(Clock, { className: "h-3.5 w-3.5 animate-pulse" }), " Pr\xF3ximo Bloque"),
      /* @__PURE__ */ React.createElement(
        "div",
        {
          className: "font-vt323 text-5xl md:text-7xl text-matrix tracking-widest tabular-nums",
          "aria-live": "polite",
          "aria-atomic": "true",
          "aria-label": `Tiempo restante para el pr\xF3ximo bloque: ${timeUntilNext}`
        },
        timeUntilNext
      ),
      /* @__PURE__ */ React.createElement("div", { className: "mt-2 text-[8px] md:text-[9px] font-mono text-gray-600 uppercase" }, "Block Height: ", /* @__PURE__ */ React.createElement("span", { className: "text-matrix" }, "#", timechainBlocks.length))
    )),
    /* @__PURE__ */ React.createElement("div", { className: "flex flex-col items-end gap-3" }, /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: toggleAudio,
        "aria-label": audioEnabled ? "Desactivar audio ambiental" : "Activar audio ambiental",
        className: "flex items-center gap-2 px-3 py-2 bg-black/70 border border-white/10 rounded-full text-xs font-mono text-gray-400 hover:text-matrix hover:border-matrix/40 transition"
      },
      audioEnabled ? /* @__PURE__ */ React.createElement(Volume2, { className: "w-4 h-4" }) : /* @__PURE__ */ React.createElement(VolumeX, { className: "w-4 h-4" }),
      audioEnabled ? "AUDIO ON" : "AUDIO OFF"
    ), /* @__PURE__ */ React.createElement("div", { className: "hidden md:flex flex-col gap-2 text-right text-[10px] font-mono text-gray-400 tracking-[0.18em]" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-end gap-2" }, /* @__PURE__ */ React.createElement("span", null, "HOLO-FIELD STABLE"), /* @__PURE__ */ React.createElement("span", { className: "h-[7px] w-[7px] bg-matrix rounded-full animate-pulse shadow-terminal" })), /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-end gap-2" }, /* @__PURE__ */ React.createElement("span", null, "CHAIN SYNC 99.7%"), /* @__PURE__ */ React.createElement("span", { className: "h-[7px] w-[7px] bg-matrix rounded-full animate-pulse shadow-terminal" }))))
  ), /* @__PURE__ */ React.createElement("aside", { className: "hidden md:block fixed right-[56px] top-1/2 -translate-y-1/2 w-[260px] bg-black/80 backdrop-blur-xl border border-white/10 shadow-2xl" }, /* @__PURE__ */ React.createElement("div", { className: "absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-matrix/60 to-transparent animate-scanline" }), /* @__PURE__ */ React.createElement("div", { className: "p-5 border-b border-white/10 flex items-center gap-3 bg-black/60 shrink-0" }, /* @__PURE__ */ React.createElement(Hash, { className: "h-5 w-5 text-matrix" }), /* @__PURE__ */ React.createElement("span", { className: "font-vt323 text-xl text-matrix tracking-wider" }, "CADENA DE EVENTOS \u2022 LOG")), /* @__PURE__ */ React.createElement("div", { className: "p-4 flex flex-col gap-2 overflow-y-auto max-h-[60vh] custom-scrollbar" }, timechainBlocks.map((block) => /* @__PURE__ */ React.createElement(
    "button",
    {
      key: block.height,
      onClick: () => handleSpecSelect(block),
      className: `flex items-center gap-3 p-3 border text-left transition-all
                      ${activeSpec.height === block.height ? "bg-matrix/10 border-matrix shadow-matrix" : "border-white/10 hover:border-matrix/30 hover:bg-matrix/5"}
                    `
    },
    /* @__PURE__ */ React.createElement("span", { className: `flex items-center justify-center w-8 h-8 rounded border transition-colors
                      ${activeSpec.height === block.height ? "border-matrix text-matrix" : "border-white/10 text-gray-500"}
                    ` }, /* @__PURE__ */ React.createElement(block.Icon, { className: "h-4 w-4" })),
    /* @__PURE__ */ React.createElement("div", { className: "flex-1 min-w-0" }, /* @__PURE__ */ React.createElement("div", { className: `font-mono text-[11px] truncate ${activeSpec.height === block.height ? "text-matrix" : "text-gray-400"}` }, block.title), /* @__PURE__ */ React.createElement("div", { className: "font-mono text-[9px] text-gray-600 mt-0.5" }, block.hash.slice(0, 12), "..."))
  )))), isMobile && /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => setShowMobileSheet(true),
      className: "fixed bottom-24 right-4 z-40 flex items-center gap-2 px-4 py-3 bg-black/90 border border-matrix/40 rounded-full shadow-matrix-strong backdrop-blur-md"
    },
    /* @__PURE__ */ React.createElement(Menu, { className: "h-5 w-5 text-matrix" }),
    /* @__PURE__ */ React.createElement("span", { className: "font-mono text-xs text-matrix tracking-wider" }, "EXPLORAR HITOS")
  ), showMobileSheet && isMobile && /* @__PURE__ */ React.createElement("div", { className: "fixed inset-0 z-50 md:hidden", role: "dialog", "aria-modal": "true" }, /* @__PURE__ */ React.createElement("div", { className: "absolute inset-0 bg-black/80 backdrop-blur-sm", onClick: () => setShowMobileSheet(false) }), /* @__PURE__ */ React.createElement("div", { className: "absolute inset-x-0 bottom-0 bg-black border-t-2 border-matrix/40 rounded-t-3xl max-h-[80vh] flex flex-col" }, /* @__PURE__ */ React.createElement("div", { className: "p-4 border-b border-white/10 flex items-center justify-between bg-black/60" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-3" }, /* @__PURE__ */ React.createElement(Hash, { className: "h-5 w-5 text-matrix" }), /* @__PURE__ */ React.createElement("span", { className: "font-vt323 text-xl text-matrix tracking-wider" }, "CADENA DE EVENTOS \u2022 LOG")), /* @__PURE__ */ React.createElement("button", { onClick: () => setShowMobileSheet(false), "aria-label": "Cerrar panel" }, /* @__PURE__ */ React.createElement(X, { className: "h-5 w-5 text-gray-400" }))), /* @__PURE__ */ React.createElement("div", { className: "p-4 flex flex-col gap-2 overflow-y-auto flex-1 custom-scrollbar" }, timechainBlocks.map((block) => /* @__PURE__ */ React.createElement(
    "button",
    {
      key: block.height,
      onClick: () => handleSpecSelect(block),
      className: `flex items-center gap-3 p-3 border text-left transition-all
                          ${activeSpec.height === block.height ? "border-matrix bg-matrix/10" : "border-white/10 hover:border-matrix/30"}
                        `
    },
    /* @__PURE__ */ React.createElement("span", { className: `flex items-center justify-center w-8 h-8 rounded border transition-colors
                          ${activeSpec.height === block.height ? "border-matrix text-matrix" : "border-white/10 text-gray-500"}
                        ` }, /* @__PURE__ */ React.createElement(block.Icon, { className: "h-4 w-4" })),
    /* @__PURE__ */ React.createElement("div", { className: "flex-1 min-w-0" }, /* @__PURE__ */ React.createElement("div", { className: `font-mono text-sm truncate ${activeSpec.height === block.height ? "text-matrix" : "text-gray-400"}` }, block.title), /* @__PURE__ */ React.createElement("div", { className: "font-mono text-xs text-gray-600 mt-0.5" }, block.quarter, " \u2022 ", block.hash.slice(0, 12), "..."))
  ))))), /* @__PURE__ */ React.createElement("footer", { className: "fixed bottom-0 left-0 right-0 p-4 md:bottom-[44px] md:left-[56px] md:right-[56px]" }, /* @__PURE__ */ React.createElement("div", { className: `bg-black/80 backdrop-blur-xl border p-4 rounded-xl transition-colors duration-300
                ${isHovering ? "border-accent" : "border-white/10"}
              ` }, /* @__PURE__ */ React.createElement("div", { className: "flex flex-col md:flex-row md:items-center gap-3 md:gap-8" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "text-[9px] font-mono text-gray-500 tracking-widest uppercase" }, "HITO ACTIVO"), /* @__PURE__ */ React.createElement("div", { className: `font-mono text-sm md:text-base tracking-[0.1em] transition-colors duration-300
                      ${isHovering ? "text-accent" : "text-matrix"}
                    ` }, "#", activeSpec.height.toString().padStart(3, "0"), " \u2022 ", activeSpec.title)), /* @__PURE__ */ React.createElement("div", { className: "hidden md:block text-xs text-gray-400 font-mono max-w-md" }, activeSpec.desc))))), /* @__PURE__ */ React.createElement("div", { className: "h-40 md:h-56" }), /* @__PURE__ */ React.createElement(Footer, null))));
}
export {
  NuestraHistoriaPage as default
};
