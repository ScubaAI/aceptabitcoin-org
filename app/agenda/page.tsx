import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function AgendaPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-black pt-24 pb-16">
      <div className="container mx-auto px-4 max-w-5xl">

        {/* Header */}
        <div className="text-center mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 bg-matrix/10 border border-matrix/30 px-4 py-1.5 rounded-full text-matrix text-xs font-bold uppercase tracking-[0.2em] font-mono">
            <span className="w-2 h-2 rounded-full bg-matrix animate-pulse" />
            Sistema de Citas Activo
          </div>

          <h1 className="font-serif text-4xl md:text-5xl font-bold text-white leading-tight">
            Agenda tu{" "}
            <span className="text-bitcoin drop-shadow-[0_0_20px_rgba(247,147,26,0.4)]">
              Consulta Bitcoin
            </span>
          </h1>

          <p className="font-mono text-sm text-gray-400 max-w-xl mx-auto">
            Sesiones personalizadas de 30 minutos para resolver tus dudas sobre
            Bitcoin, Lightning Network y soberanía financiera.
          </p>
        </div>

        {/* Iframe Bulletproof — Zero hydration issues */}
        <div className="relative group">
          {/* Glow effect */}
          <div className="absolute -inset-1 bg-gradient-to-r from-bitcoin/20 via-transparent to-matrix/20 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-500" />

          <iframe
            src="https://cal.com/aceptabitcoin/asesoria-30min?theme=dark&layout=month_view"
            style={{
              width: "100%",
              height: "750px",
              border: "1px solid rgba(247, 147, 26, 0.2)",
              borderRadius: "16px",
              backgroundColor: "#000000",
            }}
            frameBorder="0"
            allow="camera; microphone; autoplay; fullscreen"
            title="Agenda tu asesoría Bitcoin"
            loading="lazy"
          />
        </div>

        {/* Footer Info */}
        <div className="mt-8 text-center space-y-2">
          <p className="text-[10px] text-gray-600 font-mono uppercase tracking-wider">
            <span className="text-matrix">❯</span> Agenda gestionada por{" "}
            <span className="text-bitcoin">Cal.com</span> — Sin intermediarios financieros{" "}
            <span className="text-matrix">❯</span>
          </p>
          <p className="text-[10px] text-gray-700 font-mono">
            Si el calendario no carga,{" "}
            <a 
              href="https://cal.com/aceptabitcoin/asesoria-30min" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-matrix hover:text-bitcoin transition-colors underline"
            >
              haz click aquí
            </a>
          </p>
        </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
