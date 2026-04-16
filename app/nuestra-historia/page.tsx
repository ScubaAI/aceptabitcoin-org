import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function NuestraHistoria() {
  return (
    <>
      <Navbar />
      <main className="pt-24 pb-20 bg-dark">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-5xl font-bold text-center mb-12">Nuestra Historia</h1>

          <div className="prose prose-invert max-w-none text-lg leading-relaxed space-y-8">
            <p>
              Acepta Bitcoin nace en Mérida, Yucatán en 2023 con una misión clara: 
              <strong>acelerar la adopción real de Bitcoin</strong> en México a través de educación práctica y herramientas útiles.
            </p>

            <p>
              Comenzamos organizando meetups y talleres presenciales. Pronto nos dimos cuenta que la gente necesitaba 
              más que teoría: querían aprender haciendo. Así nació el <strong>Tianguis Bitcoin Mérida</strong>, 
              el primer marketplace descentralizado usando Nostr + Lightning.
            </p>

            <p>
              Hoy ofrecemos:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-300">
              <li>Formación práctica y talleres presenciales</li>
              <li>Plataforma educativa interactiva (Bitcoin Agent)</li>
              <li>Instancia propia de BTCPay Server + LNbits en Voltage Cloud</li>
              <li>Asesoría para que negocios acepten Bitcoin</li>
              <li>El Tianguis Bitcoin (físico y digital)</li>
            </ul>

            <p className="pt-6 border-t border-white/10">
              Todo lo que hacemos tiene un solo objetivo: que más mexicanos puedan <strong>usar, guardar y aceptar</strong> 
              Bitcoin de forma soberana y segura.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}