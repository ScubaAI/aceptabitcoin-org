"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Loader2, ShieldCheck, Zap, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function AccessGate() {
  const [lnurl, setLnurl] = useState<string | null>(null)
  const [status, setStatus] = useState<"idle" | "loading" | "waiting" | "success" | "error">("loading")
  const [error, setError] = useState<string | null>(null)

  // 1. Generar el Challenge (k1) al montar el componente
  useEffect(() => {
    let interval: NodeJS.Timeout

    const generateChallenge = async () => {
      try {
        const res = await fetch("/api/auth/lnauth/challenge")
        if (!res.ok) throw new Error("Fallo al generar el challenge")
        
        const data = await res.json()
        setLnurl(data.lnurl)
        setStatus("waiting")

        // 2. Polling: Consultar si el usuario ya firmó
        interval = setInterval(async () => {
          try {
            const verifyRes = await fetch(`/api/auth/lnauth/verify?k1=${data.k1}`)
            const verifyData = await verifyRes.json()

            if (verifyData.status === "OK") {
              clearInterval(interval)
              setStatus("success")
              // Redirigir al dashboard tras 1.5 segundos
              setTimeout(() => {
                window.location.href = "/ahorro/dashboard"
              }, 1500)
            }
          } catch (err) {
            console.error("Error verificando firma:", err)
          }
        }, 2500) // Consultar cada 2.5 segundos
      } catch (err) {
        setError("Error de conexión con el servidor.")
        setStatus("error")
      }
    }

    generateChallenge()
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-[60vh] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="relative overflow-hidden border-orange-500/30 bg-black/80 backdrop-blur-xl p-8 shadow-[0_0_30px_rgba(247,147,26,0.15)]">
          {/* Efecto Scanline */}
          <div className="pointer-events-none absolute inset-0 opacity-20 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,255,65,0.05)_50%)] bg-[length:100%_4px] animate-scanline" />

          <div className="relative z-10 flex flex-col items-center text-center space-y-6">
            {/* Icono de Estado */}
            <div className="relative">
              <AnimatePresence mode="wait">
                {status === "loading" && (
                  <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <Loader2 className="w-16 h-16 text-orange-500 animate-spin" />
                  </motion.div>
                )}
                {status === "waiting" && (
                  <motion.div key="waiting" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}>
                    <Zap className="w-16 h-16 text-yellow-400 fill-yellow-400/20" />
                  </motion.div>
                )}
                {status === "success" && (
                  <motion.div key="success" initial={{ scale: 0 }} animate={{ scale: 1, rotate: 360 }} transition={{ type: "spring", stiffness: 200 }}>
                    <ShieldCheck className="w-16 h-16 text-green-400" />
                  </motion.div>
                )}
                {status === "error" && (
                  <motion.div key="error" initial={{ scale: 0 }} animate={{ scale: 1 }}>
                    <AlertTriangle className="w-16 h-16 text-red-500" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Títulos y Texto */}
            <div className="space-y-2">
              <h2 className="text-2xl font-bold tracking-tight text-white" style={{ fontFamily: "'IBM Plex Serif', serif" }}>
                Acceso Soberano
              </h2>
              <p className="text-sm text-gray-400 font-mono">
                {status === "loading" && "Inicializando nodo de autenticación..."}
                {status === "waiting" && "Escanea con tu wallet Lightning para firmar el acceso."}
                {status === "success" && "Firma verificada. Acceso concedido."}
                {status === "error" && "Error de autenticación."}
              </p>
            </div>

            {/* QR Code / LNURL Display */}
            {status === "waiting" && lnurl && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }} 
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center space-y-4 w-full"
              >
                <div className="p-4 bg-white rounded-lg">
                  {/* Usaremos un componente QR básico por ahora, puedes reemplazarlo con qrcode.react si lo prefieres */}
                  <img 
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(lnurl)}`} 
                    alt="LNURL Auth QR" 
                    className="w-48 h-48"
                  />
                </div>
                <div className="w-full p-3 border border-yellow-500/20 bg-yellow-500/5 rounded-md">
                  <p className="text-[10px] text-yellow-500/70 font-mono break-all">
                    {lnurl}
                  </p>
                </div>
                <p className="text-xs text-gray-500 font-mono animate-pulse">
                  Esperando firma en cadena...
                </p>
              </motion.div>
            )}

            {/* Mensaje de Éxito */}
            {status === "success" && (
              <div className="p-4 border border-green-500/30 bg-green-500/5 rounded-md w-full">
                <p className="text-sm text-green-400 font-mono">
                  Identidad verificada criptográficamente.
                </p>
                <p className="text-xs text-green-500/60 font-mono mt-1">
                  Redirigiendo al Terminal LP...
                </p>
              </div>
            )}

            {/* Botón de Reintento */}
            {status === "error" && (
              <Button onClick={() => window.location.reload()} variant="outline" className="border-red-500/50 text-red-400 hover:bg-red-500/10">
                Reintentar Conexión
              </Button>
            )}

            {/* Footer Filosófico */}
            <div className="pt-4 mt-4 border-t border-gray-800 w-full">
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