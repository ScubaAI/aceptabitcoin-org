export function TiendaSection() {
  return (
    <section className="py-20">
      <div className="container">
        <h2 className="mb-12 text-center text-3xl font-bold">
          Crea tu tienda Bitcoin
        </h2>
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-8 text-lg text-muted-foreground">
            Acepta Bitcoin en tu negocio con herramientas simples y gratuitas.
          </p>
          <div className="rounded-lg border p-8">
            <h3 className="mb-4 text-xl font-semibold">Herramientas recomendadas</h3>
            <ul className="space-y-2 text-left">
              <li>• BTCPay Server</li>
              <li>• Blink.sv</li>
              <li>• OpenNode</li>
              <li>• CoinPayments</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}