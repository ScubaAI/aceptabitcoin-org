import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BtcMapSection from "@/components/sections/BtcMapSection";

export default function MapaPage() {
  return (
    <>
      <Navbar />
      <main className="pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-4">Mapa de Comercios Bitcoin en México</h1>
            <p className="text-xl text-gray-400">
              Datos actualizados en tiempo real desde <strong>BTC Map</strong>
            </p>
          </div>

          <div className="h-[700px] rounded-3xl overflow-hidden border border-turquesa/30 shadow-2xl">
            <BtcMapSection />
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-400">
              ¿Tu negocio ya acepta Bitcoin y no aparece? 
              <a href="/crea-tu-tienda" className="text-turquesa underline ml-1">Agrégalo aquí</a>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}