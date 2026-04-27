"use client";

// ============================================================
// BINANCE API + STOCHASTIC HEAT MAP CALCULATOR
// Acepta Bitcoin México | Oracle System v2.0
// Based on Pine Script: Stochastic Heat Map by Violent
// ============================================================

export interface OHLC {
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  time: number;
}

export type Timeframe = "1h" | "4h" | "1d" | "1w";

export interface StochasticResult {
  value: number;
  status: "overbought" | "oversold" | "neutral";
  individualStochastics: number[];
  historicalValues: number[];
  lastUpdate: number;
}

const BINANCE_BASE = "https://api.binance.com";

// ── Fetch OHLC from Binance ──
export async function fetchBinanceOHLC(
  symbol: string = "BTCUSDT",
  interval: string = "1h",
  limit: number = 300
): Promise<OHLC[]> {
  const url = `${BINANCE_BASE}/api/v3/klines?symbol=${symbol}&interval=${interval}&limit=${limit}`;
  
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Binance API error: ${response.status}`);
  }
  
  const data = await response.json();
  
  // Binance returns: [time, open, high, low, close, volume, ...]
  return data.map((candle: any[]) => ({
    time: candle[0],
    open: parseFloat(candle[1]),
    high: parseFloat(candle[2]),
    low: parseFloat(candle[3]),
    close: parseFloat(candle[4]),
    volume: parseFloat(candle[5]),
  }));
}

// ── Calculate Stochastic Oscillator ──
function calculateStochastic(
  ohlc: OHLC[],
  period: number,
  smooth: number = 2
): number {
  if (ohlc.length < period + smooth) return 50;
  
  const recent = ohlc.slice(-period - smooth);
  const kValues: number[] = [];
  
  for (let i = period - 1; i < recent.length; i++) {
    const window = recent.slice(i - period + 1, i + 1);
    const highestHigh = Math.max(...window.map((c) => c.high));
    const lowestLow = Math.min(...window.map((c) => c.low));
    const close = recent[i].close;
    
    if (highestHigh === lowestLow) {
      kValues.push(50);
    } else {
      kValues.push(((close - lowestLow) / (highestHigh - lowestLow)) * 100);
    }
  }
  
  // Smooth K (SMA of K values)
  const smoothedK = kValues.slice(-smooth);
  return smoothedK.reduce((a, b) => a + b, 0) / smoothedK.length;
}

// ── Calculate Stochastic Heat Map (28 stochastics) ──
export function calculateHeatMap(
  ohlc: OHLC[],
  plotNumber: number = 28,
  increment: number = 10,
  smooth: number = 2
): StochasticResult {
  const individualStochastics: number[] = [];
  
  for (let i = 1; i <= plotNumber; i++) {
    const period = i * increment;
    const stoch = calculateStochastic(ohlc, period, smooth);
    individualStochastics.push(stoch);
  }
  
  // Average all stochastics
  const average = individualStochastics.reduce((a, b) => a + b, 0) / plotNumber;
  
  // Determine status
  let status: "overbought" | "oversold" | "neutral";
  if (average >= 80) status = "overbought";
  else if (average <= 25) status = "oversold";
  else status = "neutral";
  
  return {
    value: Math.round(average * 10) / 10,
    status,
    individualStochastics,
    historicalValues: [], // Will be populated from localStorage
    lastUpdate: Date.now(),
  };
}

// ── Timeframe to Binance interval ──
export function timeframeToInterval(tf: Timeframe): string {
  const map: Record<Timeframe, string> = {
    "1h": "1h",
    "4h": "4h",
    "1d": "1d",
    "1w": "1w",
  };
  return map[tf];
}

// ── Format price ──
export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price);
}
