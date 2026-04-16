export function TianguisSection() {
  return (
    <section className="py-20">
      <div className="container">
        <h2 className="mb-12 text-center text-3xl font-bold">Tianguis Bitcoin</h2>
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-8 text-lg text-muted-foreground">
            Los tianguis Bitcoin son eventos donde vendedores aceptan Bitcoin.
            ¡Únete al próximo!
          </p>
          <div className="rounded-lg border p-8">
            <h3 className="mb-4 text-2xl font-semibold">Próximo tianguis</h3>
            <p className="mb-4">Por confirmar</p>
            <a
              href="#"
              className="inline-block rounded-full bg-orange-500 px-6 py-2 font-semibold text-white hover:bg-orange-600"
            >
              Participa como vendedor
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}