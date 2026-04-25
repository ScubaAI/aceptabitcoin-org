"use client";

import { useEffect, useState } from "react";

interface CalComEmbedProps {
  username?: string;
  eventSlug?: string;
  className?: string;
}

declare global {
  interface Window {
    Cal?: any;
  }
}

export default function CalComEmbed({ 
  username = "aceptabitcoin", 
  eventSlug = "asesoria-30min", 
  className = "" 
}: CalComEmbedProps) {
  
  // 🔒 Gate: Solo renderizar en cliente — evita hydration mismatch
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    // 🔧 FIX: URL corregida (sin espacio al final)
    (function (C, A, L) {
      let p = function (a: any, ar: any) { a.q.push(ar); };
      let d = C.document;
      C.Cal = C.Cal || function () {
        let cal = C.Cal;
        let ar = arguments;
        if (!cal.loaded) {
          cal.ns = {};
          cal.q = cal.q || [];
          const script = d.createElement("script");
          script.src = A;
          script.async = true;
          d.head.appendChild(script);
          cal.loaded = true;
        }
        if (ar[0] === L) {
          const api: any = function () { p(api, arguments); };
          const namespace = ar[1];
          api.q = api.q || [];
          if (typeof namespace === "string") {
            cal.ns[namespace] = api;
            p(api, ar);
            return api;
          }
          p(cal, ar);
          return cal;
        }
        p(cal, ar);
      };
    })(window as any, "https://cal.com/embed.js", "init");

    if (window.Cal) {
      window.Cal("init", { origin: "https://cal.com" });
      window.Cal("ui", {
        theme: "dark",
        styles: { branding: { brandColor: "#f7931a" } },
        hideEventTypeDetails: false,
        layout: "month_view"
      });
    }
  }, [mounted]);

  // 🎨 Skeleton loader mientras carga (SSR-safe)
  if (!mounted) {
    return (
      <div 
        className={`relative overflow-hidden rounded-2xl border border-white/10 bg-black/80 backdrop-blur-md ${className}`}
        style={{ width: "100%", height: "750px" }}
      >
        {/* Matrix Grid Background */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `radial-gradient(rgba(0, 255, 65, 0.15) 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />
        
        {/* Scanline */}
        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-bitcoin/40 to-transparent animate-scanline" />
        
        {/* Loading Content */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-matrix animate-pulse" />
            <span className="font-mono text-xs text-matrix uppercase tracking-[0.2em]">
              Inicializando Sistema de Agenda
            </span>
            <span className="text-matrix animate-blink">_</span>
          </div>
          
          <div className="w-64 h-1 bg-white/5 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-matrix/50 to-bitcoin/50 animate-[pulse_1.5s_ease-in-out_infinite]" 
              style={{ width: "60%" }}
            />
          </div>
          
          <p className="font-mono text-[10px] text-gray-600 uppercase tracking-wider">
            Powered by Cal.com
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`calcom-embed ${className}`}>
      <div 
        className="calcom-embed"
        data-cal-link={`${username}/${eventSlug}`}
        data-cal-config='{"layout":"month_view","theme":"dark"}'
        style={{
          width: "100%",
          height: "750px",
          overflow: "hidden",
          borderRadius: "16px",
          border: "1px solid rgba(247, 147, 26, 0.2)"
        }}
      />
    </div>
  );
}