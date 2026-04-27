
import { useState, useEffect } from "react";
import { getMarketData, MarketMetrics } from "@/lib/market/service";

export function useMarketData(refreshInterval = 30000) {
  const [data, setData] = useState<MarketMetrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    const fetchData = async () => {
      try {
        const metrics = await getMarketData();
        setData(metrics);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Failed to fetch market data"));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    interval = setInterval(fetchData, refreshInterval);

    return () => clearInterval(interval);
  }, [refreshInterval]);

  return { data, loading, error };
}
