import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ArcadeButton from "@/components/ui/arcade-button";

export default function AprendePage() {
  return (
    <>
      <Navbar />
      <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center relative overflow-hidden bg-black pt-16 mt-16">
        
        {/* Fondo con rejilla (Grid) decorativa para dar sensación tecnológica */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none"></div>

        <div className="container relative z-10 flex flex-col items-center text-center px-4 max-w-4xl mx-auto py-20">
          
          {/* Badge superior */}
          <div className="mb-8 inline-flex items-center rounded-full border border-orange-500/30 bg-orange-950/30 px-4 py-1 text-sm font-medium text-orange-400 backdrop-blur-sm">
            <span className="flex h-2 w-2 rounded-full bg-orange-500 mr-2 animate-ping"></span>
            NUEVO MÓDULO DE ENTRENAMIENTO
          </div>

          {/* Título Principal con fuente Arcade */}
          <h1 className="text-6xl md:text-8xl font-vt323 text-white mb-6 tracking-wide uppercase leading-none">
            Domina el <span className="text-orange-500 drop-shadow-[0_0_10px_rgba(249,115,22,0.8)]">Bitcoin</span>
          </h1>

          {/* Subtítulo descriptivo */}
          <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-2xl font-space leading-relaxed">
            Accede a laboratorios interactivos, simuladores de IA y herramientas avanzadas. 
            Entrena en la plataforma oficial de Visionary AI.
          </p>

          {/* El Botón Arcade Solicitado */}
          <ArcadeButton href="https://bitcoin.visionaryai.lat">
            INICIAR SISTEMA
          </ArcadeButton>

          {/* Pie de página pequeña con info secundaria */}
          <div className="mt-16 text-sm text-gray-600 font-vt323">
            // SE REQUIERE CONEXIÓN A INTERNET //
          </div>
        </div>
        
        {/* Decoración de fondo inferior */}
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-orange-950/20 to-transparent pointer-events-none"></div>
      </div>
      <Footer />
    </>
  );
}