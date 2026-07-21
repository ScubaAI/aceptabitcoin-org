"use client";

import { useMemo, useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import {
  Activity, RefreshCw, Bitcoin, TrendingDown,
  Minus, AlertTriangle, Terminal
} from "lucide-react";
import { useMarketMood } from "@/hooks/useMarketMood";
import { formatPrice } from "@/lib/market/binance";
import MarketMoodInfoPopover from "./MarketMoodInfoPopover";

const DEFAULT_TIMEFRAME = "4h" as const;

const WISDOM_LOGS = [
  "Time in the market > Timing the market.",
  "El precio es lo que pagas. El valor es lo que obtienes.",
  "La acumulación constante elimina el estrés de predecir."
];

function getDCAConfig(value: number) {
  if (value <= 25) {
    return {
      status: "¡Excelente momento!",
      emoji: "🚀",
      colorClass: "text-matrix",
      borderColor: "border-matrix",
      bgClass: "bg-matrix/10",
      bgProgressClass: "bg-matrix", // ← FIX: Clase explícita para Tailwind
      glow: "shadow-[0_0_15px_rgba(0,255,65,0.2)]",
      message: "Bitcoin está en zona de acumulación fuerte. Cada sat que compres hoy vale más.",
      impact: "Esta compra MEJORA tu costo promedio",
      icon: TrendingDown,
    };
  }
  if (value >= 75) {
    return {
      status: "Zona alta - Cautela",
      emoji: "⚠️",
      colorClass: "text-red-500",
      borderColor: "border-red-500/50",
      bgClass: "bg-red-500/10",
      bgProgressClass: "bg-red-500", // ← FIX: Clase explícita para Tailwind
      glow: "shadow-[0_0_15px_rgba(239,68,68,0.3)]",
      message: "Precio elevado. Tu compra rinde menos satoshis por dólar.",
      impact: "Esta compra DILUYE tu promedio",
      icon: AlertTriangle,
    };
  }
  return {
    status: "Zona neutral",
    emoji: "😐",
    colorClass: "text-bitcoin",
    borderColor: "border-bitcoin",
    bgClass: "bg-bitcoin/10",
    bgProgressClass: "bg-bitcoin", // ← FIX: Clase explícita para Tailwind
    glow: "shadow-[0_0_20px_rgba(247,147,26,0.4)]",
    message: "Mercado en rango lateral. Sigue tu estrategia de acumulación.",
    impact: "Buen momento para seguir tu plan",
    icon: Minus,
  };
}

function getDcaStatusType(value: number): "favorable" | "neutral" | "menos-favorable" {
  if (value <= 25) return "favorable";
  if (value >= 75) return "menos-favorable";
  return "neutral";
}

export default function MarketMoodWidget() {
  const { result, loading, error, refresh, btcPrice } = useMarketMood(DEFAULT_TIMEFRAME);
  const [wisdomIndex, setWisdomIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setWisdomIndex((prev) => (prev + 1) % WISDOM_LOGS.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const dca = useMemo(() => {
    if (!result?.value) return null;
    return getDCAConfig(result.value);
  }, [result]);

  if (error) {
    return (
      <Card className="bg-black/80 backdrop-blur-md border border-red-500/30 p-6 text-center">
        <p className="text-red-500 font-mono text-xs mb-3 uppercase tracking-wider">
          ⚠ Error en la señal
        </p>
        <button 
          onClick={refresh} 
          className="text-matrix font-mono text-xs hover:underline transition-colors"
        >
          Reintentar →
        </button>
      </Card>
    );
  }

  return (
    <Card className="relative overflow-hidden bg-black/80 backdrop-blur-md border border-white/10">
      <div className="absolute inset-0 bg-[radial-gradient(rgba(0,255,65,0.08)_1px,transparent_1px)] bg-[size:40px_40px] opacity-40 pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-matrix/40 to-transparent animate-scanline" />

      <div className="p-6 sm:p-7 relative z-10 space-y-6">
        <div className="space-y-2">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-md bg-matrix/10 border border-matrix/30 flex items-center justify-center">
                <Activity className="h-4 w-4 text-matrix" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold text-white tracking-tight">
                  Mejora tu Costo Promedio
                </h3>
                <p className="font-mono text-[10px] text-gray-400">
                  Calidad de compra • Actualizado cada 4h
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {dca && result && (
                <MarketMoodInfoPopover currentStatus={getDcaStatusType(result.value)} />
              )}
              
              <button
                onClick={refresh}
                disabled={loading}
                className="p-1.5 text-gray-500 hover:text-matrix transition-colors rounded-md hover:bg-white/5 disabled:opacity-50"
                aria-label="Actualizar datos del mercado"
              >
                <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
              </button>
            </div>
          </div>
        </div>

        {loading && !result ? (
          <div className="py-10 flex flex-col items-center justify-center">
            <div className="w-12 h-12 border-2 border-matrix/30 border-t-matrix rounded-full animate-spin" />
            <p className="text-[10px] font-mono text-gray-500 mt-4 uppercase tracking-wider">
              Analizando mercado...
            </p>
          </div>
        ) : dca && result ? (
          <>
            {btcPrice && (
              <div className="text-center pb-2">
                <div className="flex items-center justify-center gap-2">
                  <Bitcoin className="h-4 w-4 text-bitcoin" />
                  <span className="font-mono text-2xl font-bold text-white tracking-tight">
                    {formatPrice(btcPrice)}
                  </span>
                </div>
              </div>
            )}

            <div className="text-center space-y-4">
              <div
                className={`mx-auto w-24 h-24 rounded-2xl flex items-center justify-center border-2 ${dca.borderColor} ${dca.bgClass} ${dca.glow} transition-all duration-500`}
                role="img"
                aria-label={`Estado del mercado: ${dca.status}`}
              >
                <span className="text-5xl sm:text-6xl filter drop-shadow-lg">{dca.emoji}</span>
              </div>

              <div className="space-y-2">
                <div className={`font-serif text-xl font-bold ${dca.colorClass}`}>
                  {dca.status}
                </div>
                
                <div className="font-mono text-5xl font-bold text-white tabular-nums tracking-tighter">
                  {result.value}
                  <span className="text-xl text-gray-600">/100</span>
                </div>

                <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden mt-2">
                  <div 
                    className={`h-full transition-all duration-700 ${dca.bgProgressClass}`}
                    style={{ width: `${result.value}%` }}
                  />
                </div>
              </div>

              <p className="font-mono text-xs text-gray-300 max-w-sm mx-auto leading-relaxed px-2">
                {dca.message}
              </p>

              <div
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium border ${dca.borderColor} ${dca.bgClass} ${dca.colorClass} ${dca.glow}`}
              >
                <span className="w-2 h-2 rounded-full bg-current animate-pulse" />
                {dca.impact}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/5">
              <div className="flex items-start gap-3 p-3 rounded-lg bg-white/5 border border-white/10 hover:border-matrix/30 transition-colors group">
                <Terminal className="h-4 w-4 text-matrix mt-0.5 shrink-0" />
                <div className="space-y-1">
                  <p className="text-[10px] font-mono text-gray-500 uppercase tracking-wider">
                    System Log • Wisdom Module
                  </p>
                  <p className="text-xs font-mono text-gray-300 leading-relaxed transition-opacity duration-500">
                    &gt; {WISDOM_LOGS[wisdomIndex]}
                  </p>
                </div>
              </div>
            </div>

            <p className="text-center text-[9px] text-gray-600 font-mono uppercase tracking-wider pt-1">
              Herramienta educativa • No es consejo financiero
            </p>
          </>
        ) : null}
      </div>
    </Card>
  );
}