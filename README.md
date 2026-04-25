# ₿ Acepta Bitcoin México (Oracle System v2.0)

Plataforma de soberanía financiera, educación y adopción real de Bitcoin en Mérida, Yucatán. Construyendo la infraestructura para la economía del futuro.

## 🎨 Design System: Cypherpunk Bank
La plataforma utiliza una estética técnica de alto contraste inspirada en las fronteras digitales y la infraestructura descentralizada:
- **Typography**: IBM Plex Serif (Institucional), Fira Code (Technical), VT323 (Retro-System).
- **Theme**: Pure Black (`#000000`), Bitcoin Orange, and Cypherpunk Cyan.
- **Effects**: Scanlines, Blinking Cursors, Glassmorphism, and Glows.

## 🚀 Características Principales

- **🤖 Oracle System (Aprende)**: Laboratorios interactivos y simuladores de IA para dominar Bitcoin mediante la práctica (Estilo Tron).
- **💹 Price Oracle**: Conversor multi-divisa (BTC/USD/MXN/SATS) con datos en tiempo real de Coingecko API.
- **⚡ Lightning Donations**: Tip Jar dinámico con generación de QR en vivo y soporte para la red Lightning (Powered by Blink.sv).
- **📅 Booking Terminal**: Sistema de asesorías 1-a-1 integrado directamente con Cal.com.
- **🏪 Digital Tianguis**: Marketplace descentralizado impulsado por Nostr y Lightning Network.
- **🗺️ Sovereign Infrastructure**: Soporte para BTCPay Server y visualización standalone de BTC Map.

## 🛠️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with Custom Animations.
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/) + Custom Arcade Components.
- **Integrations**: BTC Map API, Cal.com Embed.
- **Utilities**: `qrcode.react`, `lucide-react`, `clsx`, `tailwind-merge`.

## 🚦 Getting Started

### 1. Clonar e Instalar
```bash
git clone https://github.com/aceptabitcoin/aceptabitcoin-org.git
cd aceptabitcoin-org
npm install
```

### 2. Configuración
Copia el archivo `.env.example` a `.env.local` y configura tus variables de entorno.

### 3. Desarrollo
```bash
npm run dev
```
Abre [http://localhost:3000](http://localhost:3000) para ver el sistema en acción.

## 🗺️ Mapa de Rutas

| Ruta | Componente | Descripción |
|------|------------|-------------|
| `/` | `Home` | Panel central del Oracle System |
| `/aprende` | `AprendePage` | Módulos de entrenamiento interactivo |
| `/tianguis` | `TianguisPage` | Marketplace P2P (Nostr + LN) |
| `/mapa` | `MapaPage` | Localizador de comercios Bitcoin |
| `/crea-tu-tienda` | `MerchantPage` | Onboarding de nuevos comercios |
| `/agenda` | `AgendaPage` | Terminal de reservas y asesorías |

---
**Status: OPERATIONAL** | **Protocol: LIGHTNING** | **Network: MAINNET**