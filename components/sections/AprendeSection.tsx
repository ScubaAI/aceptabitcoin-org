export function AprendeSection() {
  return (
    <section className="py-20">
      <div className="container">
        <h2 className="mb-12 text-center text-3xl font-bold">Aprende sobre Bitcoin</h2>
        <div className="grid gap-8 md:grid-cols-3">
          <div className="rounded-lg border p-6">
            <h3 className="mb-4 text-xl font-semibold">¿Qué es Bitcoin?</h3>
            <p className="text-muted-foreground">
              Bitcoin es dinero digital peer-to-peer. Sin bancos, sin fronteras.
            </p>
          </div>
          <div className="rounded-lg border p-6">
            <h3 className="mb-4 text-xl font-semibold">Cómo empezar</h3>
            <p className="text-muted-foreground">
              Aprende a crear tu wallet y comprar tus primeros satoshis.
            </p>
          </div>
          <div className="rounded-lg border p-6">
            <h3 className="mb-4 text-xl font-semibold">Seguridad</h3>
            <p className="text-muted-foreground">
              Las mejores prácticas para mantener tus fondos seguros.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}