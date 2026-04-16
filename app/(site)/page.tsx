import Hero from "@/components/sections/Hero";
import PriceConverter from "@/components/sections/PriceConverter";
import BitcoinAgentEmbed from "@/components/embeds/BitcoinAgentEmbed";
import TipJarSection from "@/components/sections/TipJarSection";
import BtcMapSection from "@/components/sections/BtcMapSection";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      
      <main>
        <Hero />

        <section className="py-16 bg-zinc-950">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-10">
              <h2 className="text-4xl font-bold mb-3">¿Cuánto vale un Bitcoin hoy?</h2>
              <p className="text-gray-400">Calculadora en tiempo real</p>
            </div>
            <PriceConverter />
          </div>
        </section>

        <section id="aprende" className="py-20 bg-zinc-950">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-5xl font-bold mb-4">Aprende Bitcoin jugando con él</h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                Plataforma interactiva con IA + laboratorios reales. Sin teoría aburrida.
              </p>
            </div>
            
            <BitcoinAgentEmbed />
            
            <div className="text-center mt-8">
              <a 
                href="https://bitcoinbot-five.vercel.app/es" 
                target="_blank"
                className="text-turquesa hover:underline text-lg"
              >
                Entrar a la plataforma completa →
              </a>
            </div>
          </div>
        </section>

        <section className="py-20 bg-dark">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-5xl font-bold mb-6">Crea tu tienda Bitcoin en minutos</h2>
            <p className="text-xl text-gray-400 mb-10">
              Usamos nuestra instancia en Voltage.cloud (BTCPay Server + LNbits)
            </p>
            
            <div className="bg-zinc-900 rounded-3xl p-10 border border-turquesa/20">
              <p className="text-2xl mb-8">¿Quieres aceptar Bitcoin en tu negocio?</p>
              <a 
                href="/crea-tu-tienda"
                className="inline-block bg-bitcoin hover:bg-orange-600 text-black font-bold text-xl px-10 py-4 rounded-2xl transition"
              >
                Solicitar Alta de Tienda →
              </a>
              <p className="text-sm text-gray-500 mt-6">
                Te damos de alta BTCPay Server + LNbits + POS listo para usar
              </p>
            </div>
          </div>
        </section>

        <TipJarSection />

        <BtcMapSection />

        <section className="py-20 bg-zinc-950">
          <div className="max-w-5xl mx-auto px-6 text-center">
            <h2 className="text-5xl font-bold mb-8">Tianguis Bitcoin Mérida</h2>
            <div className="bg-black border border-white/10 rounded-3xl p-8 md:p-12">
              <p className="text-2xl mb-6">El primer marketplace descentralizado de México usando Nostr + Lightning</p>
              <a 
                href="/tianguis"
                className="inline-block bg-turquesa hover:bg-teal-400 text-black font-bold px-10 py-4 rounded-2xl text-lg"
              >
                Ver Cómo Funciona el Tianguis →
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}