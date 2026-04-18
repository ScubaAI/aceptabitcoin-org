"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Zap, Globe, ArrowRight, BadgeCheck, ExternalLink } from "lucide-react";

const proveedores = [
  {
    id: 1,
    nombre: "EnvíaFácil",
    giro: "Envíos y Logística",
    ciudad: "Mérida, Yucatán",
    descripcion: "Pagos con Bitcoin y generación automática de guías. Primer proveedor grande del directorio.",
    acepta: ["Lightning", "On-chain"],
    sitio: "https://cliente.enviafacil.shop/",
    destacado: true,
    color: "from-orange-500/20 to-bitcoin/20"
  },
  {
    id: 2,
    nombre: "Taquería El Pastor",
    giro: "Restaurantes",
    ciudad: "Mérida, Yucatán",
    descripcion: "Tacos al pastor y cochinita con pago Lightning y vouchers Bitcoin.",
    acepta: ["Lightning"],
    sitio: "#",
    destacado: false,
    color: "from-blue-500/20 to-secondary/20"
  },
  {
    id: 3,
    nombre: "Artesanías Maya",
    giro: "Artesanías",
    ciudad: "Mérida, Yucatán",
    descripcion: "Productos mayas hechos a mano. Aceptamos Bitcoin y Lightning.",
    acepta: ["Lightning", "On-chain"],
    sitio: "#",
    destacado: false,
    color: "from-purple-500/20 to-bitcoin/20"
  },
  {
    id: 4,
    nombre: "Hotel Boutique La Casa del Patrón",
    giro: "Hoteles",
    ciudad: "Mérida, Yucatán",
    descripcion: "Reservaciones y estancias pagadas con Bitcoin.",
    acepta: ["Lightning"],
    sitio: "#",
    destacado: false,
    color: "from-teal-500/20 to-secondary/20"
  },
];

const categorias = ["Todos", "Restaurantes", "Envíos y Logística", "Artesanías", "Hoteles", "Servicios"];

export default function ProveedoresDirectorio() {
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("Todos");

  const filtrados = categoriaSeleccionada === "Todos" 
    ? proveedores 
    : proveedores.filter(p => p.giro === categoriaSeleccionada);

  return (
    <div className="space-y-12">
      {/* Filtros */}
      <div className="flex flex-wrap gap-2 p-1 bg-card/50 border border-border rounded-full overflow-x-auto no-scrollbar justify-center max-w-fit mx-auto">
        {categorias.map((cat) => (
          <Button
            key={cat}
            variant={categoriaSeleccionada === cat ? "secondary" : "ghost"}
            onClick={() => setCategoriaSeleccionada(cat)}
            className={`rounded-full h-10 px-6 font-bold transition-all ${
              categoriaSeleccionada === cat 
                ? 'bg-bitcoin text-primary-foreground shadow-lg shadow-bitcoin/20' 
                : 'hover:bg-bitcoin/10'
            }`}
          >
            {cat}
          </Button>
        ))}
      </div>

      {/* Grid de Proveedores */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filtrados.map((prov) => (
          <Card key={prov.id} className="group relative overflow-hidden border-border bg-card/30 backdrop-blur-sm transition-all hover:border-bitcoin/30 hover:shadow-2xl hover:shadow-bitcoin/5 flex flex-col">
            
            {/* Top Decoration */}
            <div className={`h-20 w-full bg-gradient-to-br ${prov.color} relative overflow-hidden opacity-80`}>
              {prov.destacado && (
                <div className="absolute top-4 left-4 z-20">
                  <Badge className="bg-bitcoin text-black font-bold border-none shadow-lg">
                    <BadgeCheck className="w-3.5 h-3.5 mr-1" /> Destacado
                  </Badge>
                </div>
              )}
              <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-white/5 blur-2xl" />
            </div>

            <div className="p-8 space-y-4 flex-1 flex flex-col">
              <div className="flex justify-between items-start gap-4">
                <div className="space-y-1">
                  <h3 className="text-2xl font-bold font-space group-hover:text-bitcoin transition-colors">{prov.nombre}</h3>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-secondary bg-secondary/10 px-2 py-0.5 rounded">
                    {prov.giro}
                  </span>
                </div>
                <div className="flex items-center text-xs text-muted-foreground whitespace-nowrap">
                  <MapPin className="w-3.5 h-3.5 mr-1 text-secondary" />
                  {prov.ciudad.split(',')[0]}
                </div>
              </div>

              <p className="text-muted-foreground text-sm leading-relaxed flex-1">
                {prov.descripcion}
              </p>

              <div className="flex flex-wrap gap-2 pt-4 border-t border-border/50">
                {prov.acepta.map((metodo) => (
                  <Badge key={metodo} variant="outline" className="text-[10px] font-bold uppercase tracking-tighter border-bitcoin/30 bg-bitcoin/5 text-bitcoin">
                    {metodo === "Lightning" && <Zap className="w-3 h-3 mr-1 fill-bitcoin" />}
                    {metodo}
                  </Badge>
                ))}
              </div>

              <div className="pt-6">
                <Button asChild className="w-full h-12 font-bold group-hover:bg-bitcoin group-hover:text-primary-foreground transition-all rounded-xl">
                  <a href={prov.sitio} target="_blank" rel="noopener noreferrer">
                    {prov.giro === "Envíos y Logística" ? "Visitar y Enviar" : "Visitar Sitio"}
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* CTA Final */}
      <div className="mt-24 p-12 rounded-[3rem] bg-gradient-to-br from-card to-background border border-dashed border-border text-center relative overflow-hidden group">
        <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-bitcoin/5 blur-3xl transition-all group-hover:bg-bitcoin/10" />
        
        <div className="relative z-10 space-y-6">
          <h3 className="font-space text-3xl font-bold">¿Quieres que tu negocio aparezca aquí?</h3>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Únete al directorio oficial de proveedores Bitcoin en México y llega a una comunidad soberana en crecimiento.
          </p>
          <div className="pt-4">
            <Button size="lg" asChild className="rounded-full bg-secondary hover:bg-secondary/90 font-bold h-14 px-10 shadow-lg shadow-secondary/10 hover:scale-105 transition-all">
              <a href="/crea-tu-tienda">Quiero aparecer en el Directorio <ArrowRight className="ml-2 h-4 w-4" /></a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
