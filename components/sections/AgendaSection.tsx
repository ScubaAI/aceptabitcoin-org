export function AgendaSection() {
  const events = [
    {
      title: "Bitcoin Meetup Mérida",
      date: "Próximo",
      location: "Por confirmar",
    },
  ];

  return (
    <section className="py-20">
      <div className="container">
        <h2 className="mb-12 text-center text-3xl font-bold">Próximos eventos</h2>
        <div className="mx-auto max-w-2xl">
          {events.length === 0 ? (
            <p className="text-center text-muted-foreground">
              No hay eventos programados
            </p>
          ) : (
            <div className="space-y-4">
              {events.map((event, i) => (
                <div key={i} className="rounded-lg border p-6">
                  <h3 className="mb-2 text-xl font-semibold">{event.title}</h3>
                  <p className="text-muted-foreground">
                    {event.date} • {event.location}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}