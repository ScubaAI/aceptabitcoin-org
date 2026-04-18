import Link from "next/link";

export function Hero() {
  return (
    <section className="relative flex min-h-[85vh] items-center justify-center overflow-hidden">

      {/* Fondo Decorativo (Glow Effect) */}
      <div className="absolute inset-0 -z-10 bg-background">
        {/* Un degradado sutil oscuro, no naranja pastel */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-bitcoin/5" />
        {/* Brillo ambiental detrás del título */}
        <div className="absolute left-1/2 top-1/2 -z-10 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-bitcoin/10 blur-[120px]" />
      </div>

      <div className="container relative z-10 px-4 text-center">
        <div className="mx-auto max-w-4xl">
          {/* Etiqueta decorativa */}
          <span className="mb-4 inline-block rounded-full border border-turquesa/30 bg-turquesa/10 px-4 py-1.5 text-sm font-semibold text-turquesa backdrop-blur-sm">
            Bitcoin Circular Economy
          </span>

          {/* Título Principal con fuente espaciada */}
          <h1 className="mb-6 text-5xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl font-space">
            Pay with Bitcoin <br />
            <span className="text-bitcoin">in Mérida</span>
          </h1>

          {/* Subtítulo */}
          <p className="mb-10 text-lg text-muted-foreground sm:text-xl">
            Descubre comercios, cafés y negocios que aceptan Bitcoin en Yucatán.
            Únete a la economía circular más grande del sureste.
          </p>

          {/* Botones */}
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/mapa"
              className="inline-flex h-12 items-center justify-center rounded-full bg-bitcoin px-8 py-3 text-sm font-bold text-primary-foreground transition-all hover:bg-bitcoin/90 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              Explorar Mapa
            </Link>

            <Link
              href="/tianguis"
              className="inline-flex h-12 items-center justify-center rounded-full border border-input bg-background px-8 py-3 text-sm font-semibold text-foreground shadow-sm transition-all hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              Próximo Tianguis
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}