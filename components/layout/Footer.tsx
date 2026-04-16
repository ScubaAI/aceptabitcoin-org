import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/10 py-16">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-10">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 bg-bitcoin rounded-full flex items-center justify-center text-black font-bold">₿</div>
            <span className="text-2xl font-bold">aceptabitcoin</span>
          </div>
          <p className="text-gray-500 text-sm">
            Educación y adopción real de Bitcoin desde Mérida, Yucatán.
          </p>
        </div>

        <div>
          <h4 className="font-semibold mb-4">Enlaces Rápidos</h4>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li><Link href="/aprende" className="hover:text-white">Aprende</Link></li>
            <li><Link href="/tianguis" className="hover:text-white">Tianguis</Link></li>
            <li><Link href="/crea-tu-tienda" className="hover:text-white">Crea tu Tienda</Link></li>
            <li><Link href="/mapa" className="hover:text-white">Mapa de Comercios</Link></li>
            <li><Link href="/nuestra-historia" className="hover:text-white">Nuestra Historia</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-4">Recursos</h4>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li><a href="https://btcmap.org" target="_blank" className="hover:text-white">BTC Map</a></li>
            <li><a href="https://voltage.cloud" target="_blank" className="hover:text-white">Voltage Cloud</a></li>
            <li><Link href="/proyectos" className="hover:text-white">Proyectos</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-4">Contacto</h4>
          <p className="text-gray-400 text-sm">
            Mérida, Yucatán<br />
            hola@aceptabitcoin.org
          </p>
          <div className="mt-6">
            <a href="#tipjar" className="text-turquesa text-sm hover:underline">
              Donar con Lightning →
            </a>
          </div>
        </div>
      </div>

      <div className="text-center text-xs text-gray-600 mt-16">
        © 2026 Acepta Bitcoin • Señal en la red ⚡
      </div>
    </footer>
  );
}