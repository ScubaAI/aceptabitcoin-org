"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import dynamic from "next/dynamic"
import { motion, AnimatePresence } from "framer-motion"
import { Loader2, ShieldCheck, Zap, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

// 1. Carga diferida del QR para evitar Hydration Mismatch (SSR false)
// Asegúrate de tener instalado: npm install qrcode.react
const QRCode = dynamic(() => import("qrcode.react").then((mod) => mod.QRCodeSVG), {
  ssr: false,
  loading: () => (
    <div className="w-48 h-48 bg-white/10 rounded-lg animate-pulse flex items-center justify-center">
      <Loader2 className="w-8 h-8 text-bitcoin animate-spin" />
    </div>
  ),
})

export default function AccessGate() {
  const router = useRouter()
  
  // 2. Guardián de Hidratación (§8.10)
  const [isMounted, setIsMounted] = useState(false)
  const [lnurl, setLnurl] = useState<string | null>(null)
  const [k1, setK1] = useState<string | null>(null)
  const [status, setStatus] = useState<"loading" | "waiting" | "success" | "error">("loading")

  useEffect(() => {
    setIsMounted(true)
  }, [])

  // 3. Lógica de Autenticación
  useEffect(() => {
    if (!isMounted) return

    let interval: NodeJS.Timeout | null = null

    const generateChallenge = async () => {
      try {
        const res = await fetch("/api/auth/lnauth/challenge")
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        
        const data = await res.json()
        setLnurl(data.lnurl)
        setK1(data.k1)
        setStatus("waiting")

        interval = setInterval(async () => {
          try {
            const verifyRes = await fetch(`/api/auth/lnauth/verify?k1=${data.k1}`)
            const verifyData = await verifyRes.json()

            if (verifyData.status === "OK") {
              if (interval) clearInterval(interval)
              setStatus("success")
              
              // 4. Navegación suave de Next.js (evita recarga completa y errores de window)
              setTimeout(() => {
                router.push("/ahorro/dashboard")
              }, 1500)
            }
          } catch (err) {
            console.error("Error verificando firma:", err)
          }
        }, 2500)
      } catch (err) {
        console.error("Fallo en challenge:", err)
        setStatus("error")
      }
    }

    generateChallenge()
    
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isMounted, router])

  // 5. Esqueleto de Hidratación (§8.10): Previene la pantalla negra y el layout shift
  if (!isMounted) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center p-4">
        <Card className="w-full max-w-md p-8 border-bitcoin/30 bg-black/80 backdrop-blur-xl animate-pulse">
          <div className="flex flex-col items-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-bitcoin/10" />
            <div className="h-8 w-48 bg-white/10 rounded" />
            <div className="h-4 w-64 bg-white/5 rounded" />
            <div className="w-48 h-48 bg-white/10 rounded-lg" />
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-[60vh] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="relative overflow-hidden border-bitcoin/30 bg-black/80 backdrop-blur-xl p-8 shadow-bitcoin">
          {/* Efecto Scanline (§4.2) */}
          <div className="pointer-events-none absolute inset-0 opacity-20 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,255,65,0.05)_50%)] bg-[length:100%_4px] animate-scanline" />

          <div className="relative z-10 flex flex-col items-center text-center space-y-6">
            <AnimatePresence mode="wait">
              {status === "loading" && (
                <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <Loader2 className="w-16 h-16 text-bitcoin animate-spin" />
                </motion.div>
              )}
              {status === "waiting" && (
                <motion.div key="waiting" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}>
                  <Zap className="w-16 h-16 text-bitcoin fill-bitcoin/20" />
                </motion.div>
              )}
              {status === "success" && (
                <motion.div key="success" initial={{ scale: 0 }} animate={{ scale: 1, rotate: 360 }} transition={{ type: "spring", stiffness: 200 }}>
                  <ShieldCheck className="w-16 h-16 text-matrix" />
                </motion.div>
              )}
              {status === "error" && (
                <motion.div key="error" initial={{ scale: 0 }} animate={{ scale: 1 }}>
                  <AlertTriangle className="w-16 h-16 text-red-500" />
                </motion.div>
              )}
            </AnimatePresence>

            <div className="space-y-2">
              <h2 className="text-2xl font-bold tracking-tight text-[#FAFAFA] font-serif">
                Acceso Soberano
              </h2>
              <p className="text-sm text-gray-400 font-mono">
                {status === "loading" && "Inicializando nodo de autenticación..."}
                {status === "waiting" && "Escanea con tu wallet Lightning para firmar el acceso."}
                {status === "success" && "Firma verificada. Acceso concedido."}
                {status === "error" && "Error de conexión con el nodo de autenticación."}
              </p>
            </div>

            {status === "waiting" && lnurl && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }} 
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center space-y-4 w-full"
              >
                {/* QR Soberano y Local (sin dependencias externas que rompan CSP o hidratación) */}
                <div className="p-4 bg-white rounded-lg shadow-[0_0_15px_rgba(247,147,26,0.3)]">
                  <QRCode value={lnurl} size={192} level="H" />
                </div>
                
                <div className="w-full p-3 border border-bitcoin/20 bg-bitcoin/5 rounded-md">
                  <p className="text-[10px] text-bitcoin/70 font-mono break-all select-all">
                    {lnurl}
                  </p>
                </div>
                
                <p className="text-xs text-gray-500 font-mono animate-pulse flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-matrix animate-pulse" />
                  Esperando firma en cadena...
                </p>
              </motion.div>
            )}

            {status === "success" && (
              <div className="p-4 border border-matrix/30 bg-matrix/5 rounded-md w-full">
                <p className="text-sm text-matrix font-mono">
                  Identidad verificada criptográficamente.
                </p>
                <p className="text-xs text-matrix/60 font-mono mt-1">
                  Redirigiendo al Terminal LP...
                </p>
              </div>
            )}

            {status === "error" && (
              <Button 
                onClick={() => window.location.reload()} 
                variant="outline" 
                className="border-red-500/50 text-red-400 hover:bg-red-500/10 font-mono"
              >
                Reintentar Conexión
              </Button>
            )}

            <div className="pt-4 mt-4 border-t border-white/10 w-full">
              <p className="text-[10px] text-gray-600 font-mono tracking-wider uppercase">
                No Email. No Passwords. Solo Claves Privadas.
              </p>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  )
}