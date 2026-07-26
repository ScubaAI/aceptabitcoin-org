"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts"
import { Card } from "@/components/ui/card"
import { TrendingUp, Loader2, Coins } from "lucide-react"

interface DataPoint {
  date: string
  valorUSD: number
  feesUSD: number
  tipo: string
}

export default function PerformancePanel() {
  const [data, setData] = useState<DataPoint[]>([])
  const [loading, setLoading] = useState(true)
  const [totalFees, setTotalFees] = useState(0)

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await fetch("/api/ahorro/history")
        const result = await res.json()
        if (result.success) {
          setData(result.data)
          setTotalFees(result.meta.totalFeesAcumulados)
        }
      } catch (error) {
        console.error("Error cargando historial:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchHistory()
  }, [])

  const startValue = data.length > 0 ? data[0].valorUSD : 0
  const endValue = data.length > 0 ? data[data.length - 1].valorUSD : 0
  const totalGrowth = endValue - startValue
  const isPositive = totalGrowth >= 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      <Card className="relative overflow-hidden border-gray-800 bg-black/60 backdrop-blur-xl p-6 shadow-[0_0_30px_rgba(0,255,65,0.05)]">
        <div className="pointer-events-none absolute inset-0 opacity-5 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,255,65,0.1)_50%)] bg-[length:100%_4px] animate-scanline" />

        <div className="relative z-10">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <div>
              <p className="text-xs uppercase tracking-widest text-gray-500 font-mono">Curva de Rendimiento Histórico</p>
              <h3 className="text-2xl font-bold text-white mt-1" style={{ fontFamily: "'IBM Plex Serif', serif" }}>
                Evolución del Capital
              </h3>
            </div>
            <div className="flex gap-3">
              <div className={`flex items-center gap-2 px-4 py-2 rounded-md border ${isPositive ? 'border-green-500/30 bg-green-500/10' : 'border-red-500/30 bg-red-500/10'}`}>
                <TrendingUp className={`w-4 h-4 ${isPositive ? 'text-green-400' : 'text-red-400'}`} />
                <div>
                  <p className="text-[10px] uppercase text-gray-400 font-mono">Crecimiento</p>
                  <p className={`text-lg font-bold font-mono ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
                    {isPositive ? '+' : ''}${totalGrowth.toFixed(2)}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-md border border-yellow-500/30 bg-yellow-500/10">
                <Coins className="w-4 h-4 text-yellow-400" />
                <div>
                  <p className="text-[10px] uppercase text-gray-400 font-mono">Total Fees</p>
                  <p className="text-lg font-bold font-mono text-yellow-400">
                    ${totalFees.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {loading ? (
            <div className="h-[300px] flex items-center justify-center">
              <Loader2 className="w-8 h-8 text-orange-500 animate-spin" />
            </div>
          ) : (
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorValor" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#00FF41" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#00FF41" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorFees" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#F7931A" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#F7931A" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1a1a1a" />
                  <XAxis 
                    dataKey="date" 
                    stroke="#4a4a4a" 
                    tick={{ fill: '#4a4a4a', fontSize: 12, fontFamily: 'monospace' }}
                    axisLine={{ stroke: '#1a1a1a' }}
                  />
                  <YAxis 
                    stroke="#4a4a4a" 
                    tick={{ fill: '#4a4a4a', fontSize: 12, fontFamily: 'monospace' }}
                    axisLine={{ stroke: '#1a1a1a' }}
                    tickFormatter={(value) => `$${value}`}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(0, 0, 0, 0.9)',
                      border: '1px solid #00FF41',
                      borderRadius: '4px',
                      fontFamily: 'monospace',
                      fontSize: '12px',
                    }}
                    labelStyle={{ color: '#F7931A', marginBottom: '4px' }}
                    itemStyle={{ color: '#00FF41' }}
                    formatter={((value: number, name: string) => [
                      name === 'valorUSD' ? `$${value.toFixed(2)}` : `$${value.toFixed(2)}`, 
                      name === 'valorUSD' ? 'Valor en Pool' : 'Fees Acumulados'
                    ]) as any}
                    labelFormatter={(label, payload) => {
                      if (payload && payload[0] && payload[0].payload) {
                        return `Fecha: ${label} | Pool: ${payload[0].payload.tipo}`
                      }
                      return `Fecha: ${label}`
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="valorUSD"
                    stroke="#00FF41"
                    strokeWidth={2}
                    fill="url(#colorValor)"
                    dot={{ fill: '#00FF41', r: 3 }}
                    activeDot={{ r: 5, fill: '#F7931A' }}
                  />
                  <Area
                    type="monotone"
                    dataKey="feesUSD"
                    stroke="#F7931A"
                    strokeWidth={1.5}
                    strokeDasharray="4 4"
                    fill="url(#colorFees)"
                    dot={false}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          )}

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-4 pt-4 border-t border-gray-800">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-[#00FF41] rounded-sm shadow-[0_0_5px_rgba(0,255,65,0.5)]" />
              <span className="text-xs text-gray-400 font-mono">Valor Total en USD</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-[#F7931A] rounded-sm shadow-[0_0_5px_rgba(247,147,26,0.5)]" />
              <span className="text-xs text-gray-400 font-mono flex items-center gap-1 cursor-help" title="Polvito y micro-ganancias acumuladas">
                Fees Cobrados (+ Polvito)
              </span>
            </div>
            <div className="text-xs text-gray-600 font-mono ml-auto">
              * Datos extraídos manualmente de Orca Whirlpools
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}