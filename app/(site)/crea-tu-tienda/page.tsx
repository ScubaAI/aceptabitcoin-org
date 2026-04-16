"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { toast } from "sonner";

export default function CreaTuTienda() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      toast.success("¡Solicitud recibida! Te contactaremos por WhatsApp en menos de 24 horas.");
      setLoading(false);
      (e.target as HTMLFormElement).reset();
    }, 1200);
  };

  return (
    <>
      <Navbar />
      <main className="pt-24 pb-20 bg-dark">
        <div className="max-w-3xl mx-auto px-6">
          <h1 className="text-5xl font-bold text-center mb-4">Crea tu Tienda Bitcoin</h1>
          <p className="text-center text-xl text-gray-400 mb-12">
            Te configuramos BTCPay Server + LNbits en nuestra instancia de Voltage
          </p>

          <form onSubmit={handleSubmit} className="bg-zinc-900 rounded-3xl p-10 border border-turquesa/30 space-y-8">
            <div>
              <Label htmlFor="nombre">Nombre del Negocio *</Label>
              <Input id="nombre" placeholder="Ej. Taquería El Pastor" className="mt-2" required />
            </div>

            <div>
              <Label htmlFor="tipo">Tipo de Negocio *</Label>
              <Input id="tipo" placeholder="Restaurante, Tienda, Servicios..." className="mt-2" required />
            </div>

            <div>
              <Label htmlFor="ubicacion">Ciudad / Ubicación</Label>
              <Input id="ubicacion" placeholder="Mérida, Yucatán" className="mt-2" />
            </div>

            <div>
              <Label htmlFor="whatsapp">WhatsApp *</Label>
              <Input id="whatsapp" placeholder="+52 999 123 4567" className="mt-2" required />
            </div>

            <div>
              <Label htmlFor="email">Correo Electrónico</Label>
              <Input id="email" type="email" placeholder="tu@email.com" className="mt-2" />
            </div>

            <div>
              <Label htmlFor="mensaje">Mensaje / Requerimientos</Label>
              <Textarea id="mensaje" rows={5} placeholder="Quiero POS completo, solo Lightning, integración con mi web..." className="mt-2" />
            </div>

            <Button 
              type="submit" 
              size="lg" 
              className="w-full text-lg py-7 bg-bitcoin hover:bg-orange-600 text-black font-bold"
              disabled={loading}
            >
              {loading ? "Enviando..." : "Enviar Solicitud →"}
            </Button>
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
}