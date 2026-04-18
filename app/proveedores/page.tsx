import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProveedoresDirectorio from "@/components/sections/ProveedoresDirectorio";

export default function ProveedoresPage() {
  return (
    <>
      <Navbar />
      <main className="relative min-h-screen pt-32 pb-24 overflow-hidden bg-background">
        
        {/* Decorative background */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-bitcoin/10 to-transparent -z-10 blur-3xl opacity-50" />
        
        <div className="container px-4 mx-auto">
          <div className="text-center max-w-4xl mx-auto mb-16 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-bitcoin/10 text-bitcoin text-xs font-bold uppercase tracking-wider border border-bitcoin/20">
              Directorio de Adopción
            </div>
            <h1 className="font-space text-5xl md:text-7xl font-bold tracking-tight">
              Proveedores <span className="text-secondary text-glow-secondary">Bitcoin</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              Negocios reales en México que aceptan Bitcoin y Lightning de forma seria. 
              El primer directorio oficial de adopción Bitcoin en el país.
            </p>
          </div>

          <ProveedoresDirectorio />
        </div>
      </main>
      <Footer />
    </>
  );
}
