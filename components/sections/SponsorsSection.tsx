export function SponsorsSection() {
  return (
    <section className="py-20">
      <div className="container">
        <h2 className="mb-12 text-center text-3xl font-bold">Patrocinadores</h2>
        <div className="flex flex-wrap justify-center gap-8">
          <div className="flex h-24 w-48 items-center justify-center rounded-lg border">
            <span className="text-muted-foreground">Tu logo aquí</span>
          </div>
          <div className="flex h-24 w-48 items-center justify-center rounded-lg border">
            <span className="text-muted-foreground">Tu logo aquí</span>
          </div>
          <div className="flex h-24 w-48 items-center justify-center rounded-lg border">
            <span className="text-muted-foreground">Tu logo aquí</span>
          </div>
        </div>
      </div>
    </section>
  );
}