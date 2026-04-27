"use client";

import { useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Activity, RefreshCw, Bitcoin, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { useMarketMood, type Timeframe } from "@/hooks/useMarketMood";
import { formatPrice } from "@/lib/market/binance";

// ============================================================
// MARKET MOOD WIDGET — Bitcoin Matrix Edition
// Stochastic Heat Map Indicator for Homepage
// Acepta Bitcoin México | Oracle System v2.0
// ============================================================

const TIMEFRAMES: { value: Timeframe; label: string }[] = [
  { value: "1h", label: "1H" },
  { value: "4h", label: "4H" },
  { value: "1d", label: "1D" },
  { value: "1w", label: "1W" },
];

interface MoodConfig {
  status: string;
  color: string;
  bgGlow: string;
  message: string;
  recommendation: string;
  emoji: string;
  icon: React.ElementType;
  borderColor: string;
}

function getMoodConfig(value: number): MoodConfig {
  if (value >= 80) {
    return {
      status: "SOBRECOMPRA",
      color: "#ef4444",
      bgGlow: "rgba(239, 68, 68, 0.3)",
      message: "Zona de riesgo alto\nEvita comprar ahora",
      recommendation: "⚠️ Espera corrección",
      emoji: "🔴",
      icon: TrendingUp,
      borderColor: "border-red-500/30",
    };
  }
  if (value <= 25) {
    return {
      status: "DIP DETECTADO",
      color: "#00FF41",
      bgGlow: "rgba(0, 255, 65, 0.4)",
      message: "¡Buen momento para comprar!\nUpside potencial fuerte",
      recommendation: "🟢 Acumula en el dip",
      emoji: "💎",
      icon: TrendingDown,
      borderColor: "border-matrix/30",
    };
  }
  return {
    status: "RANGO NEUTRAL",
    color: "#F7931A",
    bgGlow: "rgba(247, 147, 26, 0.3)",
    message: "Mercado lateral\nMantén calma y observa",
    recommendation: "🟠 Espera señal clara",
    emoji: "⚖️",
    icon: Minus,
    borderColor: "border-bitcoin/30",
  };
}

export default function MarketMoodWidget() {
  const { result, loading, error, timeframe, setTimeframe, refresh, btcPrice } = useMarketMood("1w");

  const mood = useMemo(() => {
    if (!result) return null;
    return getMoodConfig(result.value);
  }, [result]);

  if (error) {
    return (
      <Card className="bg-black/60 border border-red-500/30 p-6 backdrop-blur-md">
        <div className="text-center text-red-400 space-y-2">
          <Activity className="h-8 w-8 mx-auto" />
          <p className="font-mono text-xs">Error cargando indicador</p>
          <button
            onClick={refresh}
            className="text-[10px] font-mono text-matrix hover:text-bitcoin transition-colors"
          >
            Reintentar →
          </button>
        </div>
      </Card>
    );
  }

  return (
    <Card
      className="relative overflow-hidden bg-black/60 backdrop-blur-md border border-white/10 transition-all duration-500"
      style={mood ? {
        borderColor: `${mood.color}40`,
        boxShadow: `0 0 40px ${mood.bgGlow}, inset 0 0 20px ${mood.bgGlow}20`,
      } : {}}
    >
      {/* Scanline */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-bitcoin/40 to-transparent animate-scanline pointer-events-none" />

      {/* Corner Accents */}
      <div className="absolute top-0 left-0 w-6 h-6 border-t border-l border-matrix/20" />
      <div className="absolute top-0 right-0 w-6 h-6 border-t border-r border-matrix/20" />
      <div className="absolute bottom-0 left-0 w-6 h-6 border-b border-l border-matrix/20" />
      <div className="absolute bottom-0 right-0 w-6 h-6 border-b border-r border-matrix/20" />

      <div className="p-6 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity className="h-4 w-4 text-matrix" />
            <span className="font-mono text-[10px] text-matrix uppercase tracking-[0.2em] font-bold">
              Market Mood
            </span>
          </div>
          <div className="flex items-center gap-2">
            {/* Timeframe Selector */}
            <div className="flex gap-1">
              {TIMEFRAMES.map((tf) => (
                <button
                  key={tf.value}
                  onClick={() => setTimeframe(tf.value)}
                  className={`px-2 py-1 text-[9px] font-mono font-bold rounded border transition-all duration-200 ${
                    timeframe === tf.value
                      ? "bg-bitcoin text-black border-bitcoin"
                      : "bg-white/5 text-gray-500 border-white/10 hover:border-white/30 hover:text-white"
                  }`}
                >
                  {tf.label}
                </button>
              ))}
            </div>
            <button
              onClick={refresh}
              disabled={loading}
              className="p-1 text-gray-500 hover:text-matrix transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`h-3 w-3 ${loading ? "animate-spin" : ""}`} />
            </button>
          </div>
        </div>

        {/* Loading State */}
        {loading && !result ? (
          <div className="space-y-3 animate-pulse">
            <div className="flex items-center justify-center py-4">
              <div className="w-16 h-16 rounded-full bg-white/5" />
            </div>
            <div className="h-6 bg-white/5 rounded w-32 mx-auto" />
            <div className="h-4 bg-white/5 rounded w-48 mx-auto" />
          </div>
        ) : mood && result ? (
          <>
            {/* BTC Price */}
            {btcPrice && (
              <div className="text-center">
                <div className="flex items-center justify-center gap-2">
                  <Bitcoin className="h-4 w-4 text-bitcoin" />
                  <span className="font-vt323 text-2xl text-white">
                    {formatPrice(btcPrice)}
                  </span>
                </div>
                <span className="text-[9px] font-mono text-gray-600 uppercase tracking-wider">
                  BTC/USD · Binance
                </span>
              </div>
            )}

            {/* Mood Gauge */}
            <div className="text-center space-y-3">
              {/* Icon */}
              <div className="flex justify-center">
                <div
                  className="w-20 h-20 rounded-full border-2 flex items-center justify-center transition-all duration-500"
                  style={{
                    borderColor: mood.color,
                    boxShadow: `0 0 30px ${mood.bgGlow}`,
                  }}
                >
                  <mood.icon className="h-10 w-10" style={{ color: mood.color }} />
                </div>
              </div>

              {/* Status */}
              <div
                className="font-serif text-xl font-bold tracking-wider"
                style={{ color: mood.color }}
              >
                {mood.status}
              </div>

              {/* Value */}
              <div className="flex items-center justify-center gap-2">
                <span className="font-vt323 text-4xl text-white">
                  {result.value}
                </span>
                <span className="text-xs font-mono text-gray-500">/100</span>
              </div>

              {/* Message */}
              <p className="font-mono text-xs text-gray-400 whitespace-pre-line leading-relaxed">
                {mood.message}
              </p>

              {/* Recommendation */}
              <div
                className="inline-block px-4 py-2 rounded-full border text-xs font-mono font-bold tracking-wide"
                style={{
                  color: mood.color,
                  borderColor: `${mood.color}60`,
                  backgroundColor: `${mood.color}10`,
                }}
              >
                {mood.recommendation}
              </div>
            </div>

            {/* Sparkline */}
            {result.historicalValues.length > 1 && (
              <div className="pt-4 border-t border-white/5">
                <p className="text-[9px] font-mono text-gray-600 uppercase tracking-wider mb-2">
                  Tendencia {result.historicalValues.length} muestras
                </p>
                <div className="h-8 flex items-end gap-px">
                  {result.historicalValues.slice(-30).map((val, i) => {
                    const isExtreme = val >= 80 || val <= 25;
                    const barColor = val >= 80
                      ? "#ef4444"
                      : val <= 25
                      ? "#00FF41"
                      : "#F7931A";
                    
                    return (
                      <div
                        key={i}
                        className={`flex-1 rounded-t-sm transition-all duration-300 ${isExtreme ? "animate-pulse" : ""}`}
                        style={{
                          height: `${Math.max(10, val)}%`,
                          backgroundColor: barColor,
                          opacity: 0.3 + (i / 30) * 0.7,
                        }}
                        title={`${val.toFixed(1)}`}
                      />
                    );
                  })}
                </div>
              </div>
            )}

            {/* Last Update */}
            <div className="text-center pt-2">
              <span className="text-[9px] font-mono text-gray-700">
                Actualizado: {new Date(result.lastUpdate).toLocaleTimeString("es-MX")}
              </span>
            </div>
          </>
        ) : null}
      </div>
    </Card>
  );
}
