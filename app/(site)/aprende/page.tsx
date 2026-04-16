import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BitcoinAgentEmbed from "@/components/embeds/BitcoinAgentEmbed";

export default function AprendePage() {
  return (
    <>
      <Navbar />
      <main className="pt-24 pb-20 bg-zinc-950">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-6">Bitcoin Agent</h1>
            <p className="text-2xl text-gray-400 max-w-3xl mx-auto">
              La forma más divertida y práctica de aprender Bitcoin: con laboratorios interactivos, IA y pagos reales en Lightning.
            </p>
          </div>

          <BitcoinAgentEmbed />

          <div className="mt-12 grid md:grid-cols-3 gap-6 text-center">
            <div className="bg-zinc-900 p-8 rounded-3xl">
              <h3 className="text-xl font-semibold mb-3">Labs Interactivos</h3>
              <p className="text-gray-400">Seed phrases, Merkle Trees, Mining, Firmas, Impuestos México y más.</p>
            </div>
            <div className="bg-zinc-900 p-8 rounded-3xl">
              <h3 className="text-xl font-semibold mb-3">Chat con B.O.B.</h3>
              <p className="text-gray-400">Tu tutor IA especializado en Bitcoin (en español).</p>
            </div>
            <div className="bg-zinc-900 p-8 rounded-3xl">
              <h3 className="text-xl font-semibold mb-3">Pagos Lightning Reales</h3>
              <p className="text-gray-400">Envía y recibe sats mientras aprendes.</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}