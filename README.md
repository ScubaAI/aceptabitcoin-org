# Acepta Bitcoin México

Comunidad de educación y adopción de Bitcoin en Mérida, Yucatán. Educación práctica, Tiendas Bitcoin, Tianguis y herramientas reales.

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- shadcn/ui
- Leaflet (mapas)
- QRCode (generación de QR)
- Sonner (toasts)

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Páginas

| Ruta | Descripción |
|------|-------------|
| `/` | Homepage principal |
| `/aprende` | Bitcoin Agent (IA + Labs interactivos) |
| `/tianguis` | Marketplace descentralizado Nostr + Lightning |
| `/crea-tu-tienda` | Formulario para negocios Bitcoin |
| `/mapa` | Mapa de comercios BTC Map |
| `/proyectos` | Proyectos de la comunidad |

## Componentes

```
components/
├── layout/          # Navbar, Footer
├── sections/        # Hero, TipJar, BtcMap, etc.
└── embeds/         # BitcoinAgent, Cal.com
```

## Características

- 🗺️ Mapa en vivo de BTC Map API
- ⚡ Lightning Address para donations
- 🤖 Bitcoin Agent con labs interactivos
- 🏪 Registro de tiendas Bitcoin
- 📍 Marketplace Tianguis (Nostr + LN)

## Dependencies

```bash
npm install sonner leaflet react-leaflet qrcode.react
```