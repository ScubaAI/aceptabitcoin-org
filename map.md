# Project Map: Acepta Bitcoin México

A comprehensive overview of the `aceptabitcoin-org` project structure and architecture.

## 🏗️ Project Architecture

```
aceptabitcoin-org/
├── app/                  # Next.js App Router (Routing & Pages)
│   ├── agenda/           # Booking & Appointments (Cal.com)
│   ├── nuestra-historia/ # Project history and mission
│   ├── proveedores/      # Business & Services Directory
│   ├── (site)/           # Main website routes
│   │   ├── aprende/      # Bitcoin Agent & Interactive Labs
│   │   ├── crea-tu-tienda/ # Business registration form
│   │   ├── mapa/         # BTC Map integration
│   │   ├── proyectos/    # Community projects
│   │   ├── tianguis/     # Nostr + Lightning Marketplace
│   │   ├── layout.tsx    # Main site layout
│   │   └── page.tsx      # Homepage
│   ├── api/              # Backend API routes
│   │   └── webhook/      # LNbits or external webhooks
│   ├── globals.css       # Global styles & Tailwind directives
│   └── layout.tsx        # Root layout (Metadata, Fonts)
├── components/           # React Components
│   ├── common/           # Shared utility components
│   ├── embeds/           # Bitcoin Agent, Cal.com, etc.
│   ├── layout/           # Global wrappers (Navbar, Footer)
│   ├── sections/         # Feature-specific page sections
│   └── ui/               # Primary UI kit (shadcn/ui)
├── lib/                  # Core Utilities & API Clients
│   ├── btcmap.ts         # BTC Map API integration
│   ├── lnbits.ts         # LNbits API client
│   └── utils.ts          # Helper functions (cn, etc.)
├── public/               # Static assets (images, icons, etc.)
├── docs/                 # Project documentation
├── .env.example          # Environment variables template
├── components.json       # shadcn/ui configuration
├── next.config.mjs       # Next.js configuration
├── tailwind.config.ts    # Tailwind CSS configuration
└── tsconfig.json         # TypeScript configuration
```

## 🗺️ Route Map

| Route | Description | Component/File |
|-------|-------------|----------------|
| `/` | Homepage | `app/(site)/page.tsx` |
| `/aprende` | Educational Labs | `app/(site)/aprende/page.tsx` |
| `/mapa` | BTC Map Viewer | `app/(site)/mapa/page.tsx` |
| `/tianguis` | Marketplace | `app/(site)/tianguis/page.tsx` |
| `/proyectos` | Community Showcase | `app/(site)/proyectos/page.tsx` |
| `/crea-tu-tienda`| Onboarding Form | `app/(site)/crea-tu-tienda/page.tsx` |
| `/agenda` | Booking & Consulting | `app/agenda/page.tsx` |
| `/nuestra-historia` | Project History | `app/nuestra-historia/page.tsx` |
| `/proveedores` | Business Directory | `app/proveedores/page.tsx` |

## 🛠️ Technology Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Maps**: [Leaflet](https://leafletjs.com/)
- **Bitcoin/Lightning**: LNbits API, BTC Map API
