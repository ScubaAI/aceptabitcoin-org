"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
  fetchBinanceOHLC,
  calculateHeatMap,
  timeframeToInterval,
  type Timeframe,
  type StochasticResult,
} from "@/lib/market/binance";

// ============================================================
// USE MARKET MOOD — Custom Hook with localStorage persistence
// Acepta Bitcoin México | Oracle System v2.0
// ============================================================

const STORAGE_KEY = "aceptabitcoin-market-mood";
const POLLING_INTERVAL = 30000; // 30 seconds
const MAX_HISTORY = 100; // Max historical values to keep

interface StoredData {
  historicalValues: number[];
  lastUpdate: number;
  timeframe: Timeframe;
}

function loadFromStorage(): StoredData | null {
  if (typeof window === "undefined") return null;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.warn("Failed to load market mood from storage:", e);
  }
  return null;
}

function saveToStorage(data: StoredData) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.warn("Failed to save market mood to storage:", e);
  }
}

export interface UseMarketMoodReturn {
  result: StochasticResult | null;
  loading: boolean;
  error: Error | null;
  timeframe: Timeframe;
  setTimeframe: (tf: Timeframe) => void;
  refresh: () => void;
  btcPrice: number | null;
}

export function useMarketMood(
  initialTimeframe: Timeframe = "1w"
): UseMarketMoodReturn {
  const [result, setResult] = useState<StochasticResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [timeframe, setTimeframeState] = useState<Timeframe>(initialTimeframe);
  const [btcPrice, setBtcPrice] = useState<number | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Load historical data from localStorage on mount
  useEffect(() => {
    const stored = loadFromStorage();
    if (stored && stored.timeframe === timeframe) {
      setResult((prev) =>
        prev
          ? { ...prev, historicalValues: stored.historicalValues }
          : null
      );
    }
  }, []);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch OHLC data
      const interval = timeframeToInterval(timeframe);
      const ohlc = await fetchBinanceOHLC("BTCUSDT", interval, 300);

      // Get current BTC price (last close)
      const currentPrice = ohlc[ohlc.length - 1]?.close || null;
      setBtcPrice(currentPrice);

      // Calculate heat map
      const heatMap = calculateHeatMap(ohlc, 28, 10, 2);

      // Load historical values from storage
      const stored = loadFromStorage();
      let historicalValues: number[] = [];
      
      if (stored && stored.timeframe === timeframe) {
        historicalValues = stored.historicalValues;
      }

      // Add new value if it's different from the last one
      if (historicalValues.length === 0 || 
          Math.abs(historicalValues[historicalValues.length - 1] - heatMap.value) > 0.1) {
        historicalValues.push(heatMap.value);
        
        // Keep only last MAX_HISTORY values
        if (historicalValues.length > MAX_HISTORY) {
          historicalValues = historicalValues.slice(-MAX_HISTORY);
        }
      }

      // Update result with historical values
      const finalResult = {
        ...heatMap,
        historicalValues,
      };

      setResult(finalResult);

      // Save to localStorage
      saveToStorage({
        historicalValues,
        lastUpdate: Date.now(),
        timeframe,
      });
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Unknown error"));
      console.error("Market mood fetch error:", err);
    } finally {
      setLoading(false);
    }
  }, [timeframe]);

  // Initial fetch
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Polling every 30 seconds
  useEffect(() => {
    intervalRef.current = setInterval(fetchData, POLLING_INTERVAL);
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [fetchData]);

  const setTimeframe = useCallback((tf: Timeframe) => {
    setTimeframeState(tf);
    // Clear historical values when changing timeframe
    setResult(null);
    setLoading(true);
  }, []);

  const refresh = useCallback(() => {
    fetchData();
  }, [fetchData]);

  return {
    result,
    loading,
    error,
    timeframe,
    setTimeframe,
    refresh,
    btcPrice,
  };
}
