// app/ahorro/dashboard/page.tsx
import { DashboardHeader } from "@/components/ahorro/dashboard/DashboardHeader"
import LPTerminal from "@/components/ahorro/dashboard/LPTerminal"
import PerformancePanel from "@/components/ahorro/dashboard/PerformancePanel"

export default function AhorroDashboardPage() {
  // En el futuro, esto vendrá de getPortfolioSnapshot()
  const mockData = {
    totalUSD: 15420.50,
    pnlToday: 45.20,
    feesAccumulated: 12.80,
    inRange: true,
    positions: [
      {
        pool: "SOL/USDC",
        tokenA: "SOL",
        tokenB: "USDC",
        lowerRange: 140,
        upperRange: 220,
        currentPrice: 185.50
      },
      {
        pool: "cbBTC/USDC",
        tokenA: "cbBTC",
        tokenB: "USDC",
        lowerRange: 60000,
        upperRange: 72000,
        currentPrice: 67500
      }
    ]
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-5xl mx-auto">
        <DashboardHeader />
        
        {/* Nueva Sección: Curva de Rendimiento Histórico */}
        <div className="mt-8">
          <PerformancePanel />
        </div>
        
        <div className="mt-8">
          <LPTerminal {...mockData} />
        </div>

        <div className="mt-8 text-center text-xs text-gray-600 font-mono uppercase tracking-widest">
          Sistema Operacional · Datos diferidos 24h · Corte 23:00 CT
        </div>
      </div>
    </div>
  )
}