# Project Map: Acepta Bitcoin México (Oracle System v2.0)

A comprehensive overview of the `aceptabitcoin-org` project structure, architecture, and current status.

## 🏗️ Project Architecture

```
aceptabitcoin-org/
├── app/                  # Next.js App Router (Routing & Pages)
│   ├── agenda/           # Booking & Appointments (Cal.com)
│   ├── nuestra-historia/ # Project history and mission
│   ├── proveedores/      # Business & Services Directory
│   ├── (site)/           # Main website routes
│   │   ├── aprende/      # Bitcoin Agent & Interactive Labs (Tron/Cypherpunk Style)
│   │   ├── crea-tu-tienda/ # Business registration form
│   │   ├── mapa/         # BTC Map integration (Standalone view)
│   │   ├── proyectos/    # Community projects
│   │   ├── tianguis/     # Nostr + Lightning Marketplace
│   │   ├── layout.tsx    # Main site layout (Fonts: IBM Plex Serif, Fira Code, VT323)
│   │   └── page.tsx      # Homepage (Cypherpunk Bank Aesthetic)
│   ├── api/              # Backend API routes
│   │   └── webhook/      # LNbits or external webhooks
│   ├── globals.css       # Global styles & Tailwind directives
│   └── layout.tsx        # Root layout (Metadata, Fonts)
├── components/           # React Components
│   ├── common/           # Shared utility components
│   ├── embeds/           # Bitcoin Agent, Cal.com, etc.
│   ├── layout/           # Global wrappers (Navbar, Footer with Node Status)
│   ├── sections/         # Feature-specific page sections (PriceConverter, TipJar, Agenda)
│   └── ui/               # Primary UI kit (shadcn/ui + ArcadeButton)
├── lib/                  # Core Utilities & API Clients
│   ├── btcmap.ts         # BTC Map API integration
│   ├── lnbits.ts         # LNbits API client
│   └── utils.ts          # Helper functions (cn, etc.)
├── public/               # Static assets (images, icons, etc.)
├── docs/                 # Project documentation
├── .env.example          # Environment variables template
├── components.json       # shadcn/ui configuration
├── next.config.mjs       # Next.js configuration
├── tailwind.config.ts    # Tailwind CSS configuration (Custom animations: scanline, blink, tilt)
└── tsconfig.json         # TypeScript configuration
```

## 🗺️ Route Map

| Route | Description | Component/File | Status |
|-------|-------------|----------------|--------|
| `/` | Homepage | `app/(site)/page.tsx` | **Oracle v2.0 Live** |
| `/aprende` | Educational Labs | `app/(site)/aprende/page.tsx` | **Tron Style Live** |
| `/mapa` | BTC Map Viewer | `app/(site)/mapa/page.tsx` | Standalone |
| `/tianguis` | Marketplace | `app/(site)/tianguis/page.tsx` | Functional |
| `/proyectos` | Community Showcase | `app/(site)/proyectos/page.tsx` | Functional |
| `/crea-tu-tienda`| Onboarding Form | `app/(site)/crea-tu-tienda/page.tsx` | Functional |
| `/agenda` | Booking & Consulting | `app/agenda/page.tsx` | **Integrated v2.0** |
| `/nuestra-historia` | Project History | `app/nuestra-historia/page.tsx` | Functional |
| `/proveedores` | Business Directory | `app/proveedores/page.tsx` | Functional |

## 🛠️ Technology Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/) + Custom Cypherpunk components
- **Icons**: [Lucide React](https://lucide.dev/)
- **QR Codes**: [qrcode.react](https://github.com/zpao/qrcode.react)
- **Maps**: [Leaflet](https://leafletjs.com/)
- **Bitcoin/Lightning**: LNbits API, BTC Map API, Blink.sv integration
- **Booking**: Cal.com Embed

## 🎨 Design System: Cypherpunk Bank / Oracle System

The project has transitioned to a high-contrast, technical aesthetic inspired by digital frontiers and decentralized infrastructure.

- **Typography**:
    - **Serif**: IBM Plex Serif (High-contrast titles, institutional feel)
    - **Mono**: Fira Code (Technical descriptions, code snippets)
    - **Retro**: VT323 (Arcade buttons, system status, metadata)
- **Color Palette**:
    - **Background**: `#000000` (Pure black for OLED depth)
    - **Primary**: `#F7931A` (Bitcoin Orange)
    - **Accent**: `#06B6D4` (Cyan / Tron Blue)
    - **Status**: `#22C55E` (Green / Operational)
- **Visual Effects**:
    - **Glassmorphism**: High-intensity backdrop blurs for cards.
    - **Scanlines**: Technical overlay animations.
    - **Blinking Cursors**: Retro-terminal input simulation.
    - **Glows**: Subtle neon borders and shadow effects.

## 🚀 Recent Updates (v2.0)

1. **Homepage Overhaul**: Replaced the BTC Map with a more focused "Oracle" experience.
2. **Dynamic Price Converter**: Real-time multi-currency converter with technical styling.
3. **Integrated Booking**: Cal.com integrated directly into a "System Window" UI.
4. **Enhanced Tip Jar**: Support for dynamic SATS amounts with live QR generation.
5. **Interactive Footer**: Added "Node Status" simulation and terminal-style navigation.
6. **Aprende Section**: Full visual refresh with Tron-inspired animations and "Arcade" buttons.
