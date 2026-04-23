"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRightLeft, DollarSign, Bitcoin, Coins } from "lucide-react";
import { cn } from "@/lib/utils";

type Currency = "MXN" | "USD";

export default function PriceConverter() {
  const [activeCurrency, setActiveCurrency] = useState<Currency>("MXN");
  
  const [btc, setBtc] = useState<number>(1);
  const [fiat, setFiat] = useState<number>(0);
  
  const [prices, setPrices] = useState<{ mxn: number; usd: number }>({ mxn: 0, usd: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        // Pedimos ambos precios en una sola llamada para eficiencia
        const res = await fetch(
          "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=mxn,usd"
        );
        const data = await res.json();
        setPrices({
          mxn: data.bitcoin.mxn,
          usd: data.bitcoin.usd,
        });
        // Actualizar valor inicial basado en la moneda activa (por defecto MXN)
        const initialPrice = data.bitcoin.mxn;
        setFiat(btc * initialPrice);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching prices");
        // Fallbacks
        setPrices({ mxn: 1287500, usd: 65000 });
        setLoading(false);
      }
    };

    fetchPrices();
    const interval = setInterval(fetchPrices, 60000);
    return () => clearInterval(interval);
  }, []);

  // Determinamos qué precio usar según la pestaña activa
  const currentPrice = activeCurrency === "MXN" ? prices.mxn : prices.usd;
  const currencySymbol = activeCurrency === "MXN" ? "MX$" : "$";
  const currencyColor = activeCurrency === "MXN" ? "text-bitcoin" : "text-green-600";

  const handleBtcChange = (value: number) => {
    setBtc(value);
    if (currentPrice) setFiat(value * currentPrice);
  };

  const handleFiatChange = (value: number) => {
    setFiat(value);
    if (currentPrice) setBtc(value / currentPrice);
  };

  return (
    <Card className="relative overflow-hidden border-border bg-card/80 p-6 md:p-8 backdrop-blur-md shadow-2xl">
      {/* Fondo decorativo */}
      <div className={cn(
        "absolute -right-20 -bottom-20 h-64 w-64 rounded-full blur-3xl pointer-events-none transition-colors duration-500",
        activeCurrency === "MXN" ? "bg-orange-500/5" : "bg-green-500/5"
      )} />
      
      <div className="relative z-10">
        {/* Header con Tabs */}
        <div className="mb-8 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={cn(
                "flex h-10 w-10 items-center justify-center rounded-lg transition-colors duration-500",
                activeCurrency === "MXN" ? "bg-bitcoin/10 text-bitcoin" : "bg-green-500/10 text-green-600"
              )}>
                <Coins className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-space text-xl font-bold tracking-tight text-foreground">
                  Conversor
                </h3>
                <p className="text-xs text-muted-foreground">Bitcoin en Tiempo Real</p>
              </div>
            </div>
          </div>

          {/* Selector de Moneda (Tabs) */}
          <div className="inline-flex rounded-lg bg-muted p-1 w-full md:w-auto">
            <button
              onClick={() => setActiveCurrency("MXN")}
              className={cn(
                "flex-1 md:flex-none px-4 py-2 text-sm font-bold rounded-md transition-all duration-200",
                activeCurrency === "MXN" 
                  ? "bg-background text-bitcoin shadow-sm" 
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              BTC / MXN
            </button>
            <button
              onClick={() => setActiveCurrency("USD")}
              className={cn(
                "flex-1 md:flex-none px-4 py-2 text-sm font-bold rounded-md transition-all duration-200",
                activeCurrency === "USD" 
                  ? "bg-background text-green-600 shadow-sm" 
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              BTC / USD
            </button>
          </div>
        </div>

        {/* Convertir Layout */}
        <div className="grid gap-6 md:grid-cols-[1fr,auto,1fr] md:items-center">
          
          {/* Input BTC */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
              <Bitcoin className="h-3 w-3 text-bitcoin" /> Bitcoin
            </Label>
            <div className="relative">
              <Input
                type="number"
                step="0.00000001"
                value={btc}
                onChange={(e) => handleBtcChange(parseFloat(e.target.value) || 0)}
                className="h-16 border-border bg-background/50 pl-4 pr-12 font-mono text-2xl font-bold text-bitcoin focus-visible:ring-bitcoin/50"
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-xl font-bold text-bitcoin/20 pointer-events-none">
                ₿
              </div>
            </div>
          </div>

          {/* Swap Icon */}
          <div className="flex justify-center md:pt-6">
            <div className={cn(
              "flex h-10 w-10 items-center justify-center rounded-full border shadow-sm transition-colors duration-500",
              activeCurrency === "MXN" ? "border-bitcoin/20 text-bitcoin" : "border-green-500/20 text-green-600"
            )}>
              <ArrowRightLeft className="h-5 w-5 transition-transform hover:rotate-180 duration-500" />
            </div>
          </div>

          {/* Input Fiat (Cambia según Tab) */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
              {activeCurrency === "MXN" ? 
                <DollarSign className="h-3 w-3 text-bitcoin" /> : 
                <DollarSign className="h-3 w-3 text-green-600" />
              }
              {activeCurrency === "MXN" ? "Pesos MX" : "Dólares US"}
            </Label>
            <div className="relative">
              <Input
                type="text"
                inputMode="decimal"
                value={fiat === 0 ? "" : fiat.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                onChange={(e) => handleFiatChange(parseFloat(e.target.value.replace(/,/g, "")) || 0)}
                className={cn(
                  "h-16 border-border bg-background/50 pl-4 pr-12 font-mono text-2xl font-bold focus-visible:ring-2 focus-visible:ring-offset-0 transition-colors",
                  activeCurrency === "MXN" ? "text-bitcoin focus-visible:ring-bitcoin/50" : "text-green-600 focus-visible:ring-green-500/50"
                )}
              />
              <div className={cn(
                "absolute right-4 top-1/2 -translate-y-1/2 text-xl font-bold pointer-events-none transition-colors",
                activeCurrency === "MXN" ? "text-bitcoin/20" : "text-green-600/20"
              )}>
                {currencySymbol}
              </div>
            </div>
          </div>

        </div>

        {/* Footer Info */}
        <div className="mt-8 flex items-center justify-between rounded-lg bg-muted/30 px-4 py-3 border border-border/50">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase text-muted-foreground font-bold tracking-wider">Precio Actual (BTC)</span>
            <span className="font-mono text-sm font-medium text-foreground">
              {loading ? (
                <span className="animate-pulse">Cargando...</span>
              ) : (
                <>
                  {activeCurrency === "MXN" ? "$" : ""}{currentPrice.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                  {activeCurrency === "USD" && " USD"}
                </>
              )}
            </span>
          </div>
          <div className="flex items-center gap-2">
             <div className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
             <span className="text-[10px] font-bold text-muted-foreground uppercase">Live Data</span>
          </div>
        </div>
      </div>
    </Card>
  );
}