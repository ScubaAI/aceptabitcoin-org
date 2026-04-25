import dynamic from "next/dynamic";

// 🔒 Carga dinámica SIN SSR — evita hydration mismatch con Cal.com
const CalComEmbed = dynamic(
  () => import("@/components/embeds/CalComEmbed"),
  {
    ssr: false,
    loading: () => (
      <div 
        className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/80 backdrop-blur-md"
        style={{ width: "100%", height: "750px" }}
      >
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `radial-gradient(rgba(0, 255, 65, 0.15) 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />
        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-bitcoin/40 to-transparent animate-scanline" />
        <div className="relative z-10 flex flex-col items-center justify-center h-full space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-matrix animate-pulse" />
            <span className="font-mono text-xs text-matrix uppercase tracking-[0.2em]">
              Inicializando Sistema de Agenda
            </span>
            <span className="text-matrix animate-blink">_</span>
          </div>
          <div className="w-64 h-1 bg-white/5 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-matrix/50 to-bitcoin/50 animate-[pulse_1.5s_ease-in-out_infinite]" 
              style={{ width: "60%" }}
            />
          </div>
        </div>
      </div>
    ),
  }
);

export default function AgendaPage() {
  return (
    <main className="min-h-screen bg-black pt-24 pb-16">
      <div className="container mx-auto px-4 max-w-5xl">
        
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

        <CalComEmbed 
          username="aceptabitcoin" 
          eventSlug="asesoria-30min" 
        />

        <div className="mt-8 text-center">
          <p className="text-[10px] text-gray-600 font-mono uppercase tracking-wider">
            <span className="text-matrix">❯</span> Agenda gestionada por{" "}
            <span className="text-bitcoin">Cal.com</span> — Sin intermediarios financieros{" "}
            <span className="text-matrix">❯</span>
          </p>
        </div>
      </div>
    </main>
  );
}
