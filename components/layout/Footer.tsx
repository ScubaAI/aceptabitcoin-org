import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-background border-t border-border py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">

          {/* --- Columna 1: Branding --- */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-bitcoin text-primary-foreground text-lg font-bold">
                ₿
              </div>
              <span className="text-xl font-bold tracking-tight text-foreground">
                aceptabitcoin
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              Educación y adopción real de Bitcoin desde Mérida, Yucatán.
            </p>
          </div>

          {/* --- Columna 2: Enlaces --- */}
          <div>
            <h4 className="mb-4 text-sm font-semibold text-foreground">Explorar</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link href="/aprende" className="hover:text-bitcoin transition-colors">Aprende</Link></li>
              <li><Link href="/tianguis" className="hover:text-bitcoin transition-colors">Tianguis</Link></li>
              <li><Link href="/crea-tu-tienda" className="hover:text-bitcoin transition-colors">Crea tu Tienda</Link></li>
              <li><Link href="/mapa" className="hover:text-bitcoin transition-colors">Mapa</Link></li>
              <li><Link href="/nuestra-historia" className="hover:text-bitcoin transition-colors">Nuestra Historia</Link></li>
            </ul>
          </div>

          {/* --- Columna 3: Recursos --- */}
          <div>
            <h4 className="mb-4 text-sm font-semibold text-foreground">Tecnología</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <a href="https://btcmap.org" target="_blank" rel="noopener noreferrer" className="hover:text-secondary transition-colors">
                  BTC Map
                </a>
              </li>
              <li>
                <a href="https://voltage.cloud" target="_blank" rel="noopener noreferrer" className="hover:text-secondary transition-colors">
                  Voltage Cloud
                </a>
              </li>
              <li><Link href="/proyectos" className="hover:text-secondary transition-colors">Proyectos</Link></li>
            </ul>
          </div>

          {/* --- Columna 4: Contacto & Social --- */}
          <div>
            <h4 className="mb-4 text-sm font-semibold text-foreground">Conecta</h4>
            <p className="mb-4 text-sm text-muted-foreground">
              Mérida, Yucatán<br />
              hola@aceptabitcoin.org
            </p>

            <div className="flex flex-col gap-3">
              <a
                href="https://x.com/AceptaBitcoin21"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm font-medium text-secondary hover:underline"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
                @AceptaBitcoin21
              </a>

              <Link href="/#tipjar" className="text-sm text-muted-foreground hover:text-bitcoin transition-colors">
                Tip Jar ⚡
              </Link>
            </div>
          </div>

        </div>

        {/* --- Copyright --- */}
        <div className="mt-12 border-t border-border pt-8 text-center text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Acepta Bitcoin. Construyendo la economía circular.</p>
          <p className="mt-1 text-[10px] opacity-50">Señal en la red • Running on Voltage</p>
        </div>
      </div>
    </footer>
  );
}