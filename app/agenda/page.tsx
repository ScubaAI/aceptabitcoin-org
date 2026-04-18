import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CalComEmbed from "@/components/embeds/CalComEmbed";

export default function AgendaPage() {
  return (
    <>
      <Navbar />
      <main className="pt-24 pb-20 bg-dark min-h-screen">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              Agenda tu Asesoría
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Reserva una llamada con el equipo de AceptaBitcoin. 
              Te ayudamos a implementar Bitcoin en tu negocio o a entender mejor cómo funciona.
            </p>
          </div>

          <CalComEmbed 
            username="aceptabitcoin" 
            eventSlug="asesoria-30min" 
          />

          <div className="text-center mt-10 text-sm text-gray-500">
            ⏱️ Sesiones de 30 y 60 minutos disponibles • También en español
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
