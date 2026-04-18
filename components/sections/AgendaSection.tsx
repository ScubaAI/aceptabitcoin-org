import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Users, ArrowRight, MessageSquare } from "lucide-react";

export function AgendaSection() {
  const events = [
    {
      title: "Bitcoin Meetup Mérida",
      date: "Próximo Jueves",
      location: "Santa Lucía, Centro",
      category: "Comunidad",
      type: "Presencial"
    },
    {
      title: "Workshop: Lightning Network",
      date: "Sábado 24 Mayo",
      location: "Online / Meetup",
      category: "Educación",
      type: "Híbrido"
    },
  ];

  return (
    <section id="agenda" className="relative py-24 bg-background">
      <div className="container px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          
          {/* Section Info */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-bitcoin/10 text-bitcoin text-xs font-bold uppercase tracking-wider border border-bitcoin/20">
                <Calendar className="h-3 w-3" />
                Comunidad en Acción
              </div>
              <h2 className="font-space text-4xl font-bold tracking-tight sm:text-5xl">
                Agenda de Eventos <br />
                <span className="text-secondary">& Asesorías</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-md">
                Únete a nuestras reuniones semanales o agenda una asesoría personalizada 
                para implementar Bitcoin en tu vida o negocio.
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <Button asChild className="rounded-full bg-secondary text-primary-foreground font-bold h-12 px-8 w-fit shadow-lg shadow-secondary/20 hover:bg-secondary/90">
                <a href="https://cal.com/aceptabitcoin" target="_blank" rel="noopener noreferrer">
                   Agenda Asesoría 1-a-1 <MessageSquare className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>

            {/* Stats or trust signals */}
            <div className="flex items-center gap-8 pt-4">
              <div className="flex flex-col">
                <span className="text-3xl font-bold font-space">20+</span>
                <span className="text-xs text-muted-foreground uppercase tracking-widest font-bold">Eventos</span>
              </div>
              <div className="flex flex-col">
                <span className="text-3xl font-bold font-space">150+</span>
                <span className="text-xs text-muted-foreground uppercase tracking-widest font-bold">Soberanos</span>
              </div>
            </div>
          </div>

          {/* Events List */}
          <div className="space-y-4">
            <h3 className="font-space text-xl font-bold mb-4 flex items-center gap-2">
              <Users className="h-5 w-5 text-secondary" />
              Eventos Cercanos
            </h3>
            
            {events.length === 0 ? (
              <Card className="p-8 border-dashed border-border flex flex-col items-center justify-center text-center bg-card/50">
                <p className="text-muted-foreground mb-4">No hay eventos programados esta semana.</p>
                <Button variant="link" className="text-bitcoin font-bold">Recibir Notificaciones →</Button>
              </Card>
            ) : (
              <div className="grid gap-4">
                {events.map((event, i) => (
                  <div 
                    key={i} 
                    className="group relative rounded-2xl border border-border bg-card/30 p-6 transition-all hover:bg-card/80 hover:border-secondary/30"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-secondary bg-secondary/10 px-2 py-0.5 rounded">
                        {event.category}
                      </span>
                      <span className="text-xs font-medium text-muted-foreground">{event.type}</span>
                    </div>
                    <h3 className="text-xl font-bold mb-1 group-hover:text-secondary transition-colors">{event.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      {event.date} • {event.location}
                    </p>
                    <div className="flex items-center text-xs font-bold text-bitcoin opacity-0 group-hover:opacity-100 transition-all transform translate-x-[-10px] group-hover:translate-x-0">
                      MÁS INFO <ArrowRight className="ml-1 h-3 w-3" />
                    </div>
                  </div>
                ))}
              </div>
            )}

            <p className="text-center text-xs text-muted-foreground pt-4">
              ¿Quieres organizar un meetup? <a href="mailto:hola@aceptabitcoin.org" className="text-secondary hover:underline">Contáctanos</a>
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}