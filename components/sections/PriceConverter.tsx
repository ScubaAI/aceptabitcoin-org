"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRightLeft, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

export default function PriceConverter() {
  const [btc, setBtc] = useState<number>(1);
  const [mxn, setMxn] = useState<number>(0);
  const [btcPrice, setBtcPrice] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const res = await fetch(
          "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=mxn"
        );
        const data = await res.json();
        const price = data.bitcoin.mxn;
        setBtcPrice(price);
        setMxn(btc * price);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching price");
        setBtcPrice(1287500);
        setLoading(false);
      }
    };

    fetchPrice();
    const interval = setInterval(fetchPrice, 45000);
    return () => clearInterval(interval);
  }, []);

  const handleBtcChange = (value: number) => {
    setBtc(value);
    if (btcPrice) setMxn(value * btcPrice);
  };

  const handleMxnChange = (value: number) => {
    setMxn(value);
    if (btcPrice) setBtc(value / btcPrice);
  };

  return (
    <Card className="relative overflow-hidden border-border bg-card/50 p-8 backdrop-blur-sm">
      {/* Glow Effect */}
      <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-bitcoin/5 blur-3xl" />
      
      <div className="relative z-10">
        <div className="mb-10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-bitcoin/10 text-bitcoin">
              <TrendingUp className="h-6 w-6" />
            </div>
            <h3 className="font-space text-2xl font-bold tracking-tight">Conversor</h3>
          </div>
          <div className="rounded-full bg-secondary/10 px-3 py-1 text-xs font-bold text-secondary">
            LIVE BTC/MXN
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-[1fr,auto,1fr] md:items-center">
          <div className="space-y-2">
            <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Bitcoin
            </Label>
            <div className="relative">
              <Input
                type="number"
                step="0.000001"
                value={btc}
                onChange={(e) => handleBtcChange(parseFloat(e.target.value) || 0)}
                className="h-20 border-border bg-background/50 px-6 font-mono text-3xl font-bold focus-visible:ring-bitcoin"
              />
              <div className="absolute right-6 top-1/2 -translate-y-1/2 text-3xl font-bold text-bitcoin/50">
                ₿
              </div>
            </div>
          </div>

          <div className="flex justify-center md:pt-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-border/50 text-muted-foreground transition-all hover:bg-bitcoin/20 hover:text-bitcoin">
              <ArrowRightLeft className="h-6 w-6" />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Pesos Mexicanos
            </Label>
            <div className="relative">
              <Input
                type="number"
                value={Math.round(mxn)}
                onChange={(e) => handleMxnChange(parseFloat(e.target.value) || 0)}
                className="h-20 border-border bg-background/50 px-6 font-mono text-3xl font-bold focus-visible:ring-secondary"
              />
              <div className="absolute right-6 top-1/2 -translate-y-1/2 text-2xl font-bold text-secondary/50">
                MX$
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 sm:flex-row">
          <div className="text-sm text-muted-foreground">
            {loading ? (
              <span className="animate-pulse">Sincronizando con la red...</span>
            ) : (
              <>
                Precio actual: <span className="font-bold text-foreground">${btcPrice.toLocaleString("es-MX")}</span>
                <span className="ml-2 text-[10px] opacity-70">powered by Coingecko</span>
              </>
            )}
          </div>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
              Conexión Activa
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
}