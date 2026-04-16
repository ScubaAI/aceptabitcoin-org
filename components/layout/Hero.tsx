import Link from "next/link";

export function Hero() {
  return (
    <section className="relative flex min-h-[600px] items-center justify-center overflow-hidden bg-gradient-to-b from-orange-50 to-background">
      <div className="container relative z-10 text-center">
        <h1 className="mb-6 text-5xl font-bold tracking-tight">
          Pay with Bitcoin in Mérida
        </h1>
        <p className="mx-auto mb-8 max-w-2xl text-xl text-muted-foreground">
          Discover merchants, cafes, and businesses accepting Bitcoin in Yucatán
        </p>
        <div className="flex justify-center gap-4">
          <Link
            href="/mapa"
            className="rounded-full bg-orange-500 px-8 py-3 font-semibold text-white hover:bg-orange-600"
          >
            Ver mapa
          </Link>
          <Link
            href="/tianguis"
            className="rounded-full border bg-background px-8 py-3 font-semibold hover:bg-accent"
          >
           Próximo tianguis
          </Link>
        </div>
      </div>
    </section>
  );
}