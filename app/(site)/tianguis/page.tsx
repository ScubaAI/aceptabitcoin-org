import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Image from "next/image";

export default function TianguisPage() {
  return (
    <>
      <Navbar />
      <main className="pt-24">
        <div className="max-w-5xl mx-auto px-6 py-16 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Tianguis Bitcoin Mérida</h1>
          <p className="text-2xl text-gray-400 mb-12">
            El primer marketplace descentralizado de México usando <strong>Nostr + Lightning Network</strong>
          </p>

          <div className="my-12 rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
            <Image 
              src="/images/tianguis-guia.png" 
              alt="Guía Técnica Tianguis Bitcoin Mérida" 
              width={1200} 
              height={800}
              className="w-full"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-8 mt-16">
            <div className="bg-zinc-900 p-8 rounded-3xl text-left">
              <h3 className="text-2xl font-bold mb-4">¿Cómo funciona?</h3>
              <ul className="space-y-3 text-gray-300">
                <li>✅ Publicas con NIP-99 (Nostr)</li>
                <li>✅ Pagos instantáneos con Lightning</li>
                <li>✅ Sin intermediarios ni comisiones altas</li>
                <li>✅ Totalmente descentralizado</li>
              </ul>
            </div>

            <div className="bg-zinc-900 p-8 rounded-3xl text-left">
              <h3 className="text-2xl font-bold mb-4">Próximamente</h3>
              <p className="text-gray-400">
                Versión física en Mérida + Marketplace online 100% Bitcoin-native.
              </p>
              <a href="#" className="text-turquesa mt-6 inline-block hover:underline">
                Ver guía técnica completa →
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}