# Project Map: Acepta Bitcoin México (Oracle System v2.0)

A comprehensive overview of the `aceptabitcoin-org` project structure, architecture, and current status.

Last updated: 2026-07-15

## 🏗️ Project Architecture

```
aceptabitcoin-org/
├── app/                               # Next.js 14 App Router
│   ├── (site)/                        # Main website route group (public-facing pages)
│   │   ├── page.tsx                   # Homepage — Oracle v2.0 w/ Hero, PriceConverter,
│   │   │                              #   MarketMoodWidget, Aprende, Tianguis cards, TipJar, Bob
│   │   ├── layout.tsx                 # (site) layout — fonts, providers
│   │   ├── arcade/
│   │   │   └── page.tsx               # Bitcoin Arcade — Tron/Cypherpunk styled, interactive projects
│   │   ├── crea-tu-tienda/
│   │   │   └── page.tsx               # Merchant onboarding form (BTCPay Server)
│   │   ├── tianguis/
│   │   │   └── page.tsx               # Nostr + Lightning Marketplace
│   │   ├── planes/                    # ✅ Pricing / Plans page
│   │   │   └── page.tsx
│   │   └── proyectos/
│   │       ├── page.tsx               # Community Projects — server shell
│   │       └── ProyectosClient.tsx    # Client component — filterable project grid
│   ├── hackathon/                     # ✅ Hackathon module (flat route)
│   │   ├── layout.tsx                 # Shared layout: HackathonNavbar + HackathonFooter
│   │   ├── page.tsx                   # Hackathon index / hub page
│   │   └── [edition]/                 # Dynamic route — one page per hackathon edition
│   │       ├── page.tsx               # Edition landing: Hero, Timeline, Prizes, FAQ, CTA
│   │       ├── register/
│   │       │   └── page.tsx           # Edition registration (redirect to Google Form)
│   │       ├── projects/
│   │       │   └── page.tsx           # Project gallery — ProjectGrid component
│   │       ├── resources/
│   │       │   └── page.tsx           # Resources Hub — PDFs, docs, workshops
│   │       └── api/
│   │           └── route.ts           # GET / POST — registration + submission endpoints
│   ├── agenda/
│   │   └── page.tsx                   # Booking / Consultas (Cal.com iframe)
│   ├── nuestra-historia/
│   │   └── page.tsx                   # Acepta Bitcoin history & mission
│   ├── proveedores/
│   │   ├── page.tsx                   # Server data fetching
│   │   └── ProveedoresClient.tsx      # Client component — MatrixRain bg, filter/search, ProviderCard grid
│   ├── ahorro/                        # 🚧 Savings / DCA section (WIP)
│   │   ├── layout.tsx                 # Ahorro root layout
│   │   ├── page.tsx                   # Ahorro landing (redirects or renders landing section)
│   │   ├── access/
│   │   │   └── page.tsx               # Access gate for ahorro users
│   │   └── dashboard/
│   │       ├── layout.tsx             # Dashboard layout
│   │       └── page.tsx               # User savings dashboard
│   ├── api/
│   │   ├── tipjar/
│   │   │   ├── route.ts               # Blink.sv Lightning tip-jar proxy (GraphQL)
│   │   │   └── route.test.ts          # Tipjar API unit tests
│   │   ├── chat/
│   │   │   └── route.ts               # Bob AI chat — Groq LLM endpoint
│   │   ├── hackathon/
│   │   │   ├── leaderboard/
│   │   │   │   └── route.ts           # Hackathon leaderboard GET endpoint
│   │   │   └── tips/
│   │   │       └── route.ts           # Hackathon Lightning tips endpoint
│   │   ├── ahorro/
│   │   │   ├── stats/
│   │   │   │   └── route.ts           # Ahorro stats GET endpoint
│   │   │   └── webhook/
│   │   │       └── blink/
│   │   │           └── route.ts       # Blink.sv webhook handler for ahorro deposits
│   │   └── webhook/
│   │       └── lnbits/
│   │           └── route.ts           # LNbits webhook handler
│   ├── actions/
│   │   └── submit-onboarding.tsx      # Server action for merchant form
│   ├── not-found.tsx                  # Global 404 page
│   ├── layout.tsx                     # Root layout — metadata, global fonts, providers
│   └── globals.css                    # Tailwind directives + custom keyframes & CSS variables
├── components/
│   ├── layout/                        # Global wrappers
│   │   ├── Navbar.tsx                 # Navigation bar (responsive)
│   │   ├── Hero.tsx                   # Homepage hero — Cypherpunk Bank aesthetic
│   │   └── Footer.tsx                 # Footer w/ Node Status simulation + terminal nav
│   ├── sections/                      # Feature sections (page-scoped)
│   │   ├── PriceConverter.tsx         # Real-time BTC↔MXN/USD converter
│   │   └── TipJarSection.tsx          # Lightning tip-jar w/ MatrixRain, QR, Blink
│   ├── widgets/                       # Standalone interactive widgets
│   │   ├── MarketMoodWidget.tsx       # DCA quality indicator (4H Binance)
│   │   ├── MarketMoodInfoPopover.tsx  # Educational DCA tooltip (localStorage)
│   │   ├── MarketTicker.tsx           # ✅ Live market price ticker
│   │   ├── AhorraSectionHeader.tsx    # Section header for savings/DCA section
│   │   ├── AceptaBitcoinSectionHeader.tsx  # Header for price calculator section
│   │   └── bob-chat/                  # 🤖 Bob the Bitcoin Agent (AI Chat)
│   │       ├── BobChatWidget.tsx      #   Main chat UI w/ Matrix aesthetic
│   │       ├── BobSectionHeader.tsx   #   Header for Bob section
│   │       ├── ChatBubble.tsx         #   Individual message bubble component
│   │       ├── useBobChat.ts          #   Chat state & typing logic hook
│   │       └── icons/
│   │           └── MatrixPhoneIcon.tsx
│   ├── hackathon/                     # ✅ Hackathon-specific components (modular)
│   │   ├── layout/
│   │   │   ├── HackathonNavbar.tsx    # Edition-aware nav with mobile menu
│   │   │   ├── HackathonFooter.tsx    # Hackathon-specific footer
│   │   │   ├── HackathonContainer.tsx
│   │   │   ├── HackathonLayout.tsx
│   │   │   └── index.ts
│   │   ├── hero/
│   │   │   └── EditionHero.tsx        # Edition hero with countdown, location, status badge
│   │   ├── display/
│   │   │   ├── Timeline.tsx           # Hackathon schedule timeline
│   │   │   ├── Prizes.tsx             # Prize tiers display
│   │   │   ├── SponsorsGrid.tsx       # Sponsors logo grid
│   │   │   ├── EvaluationCriteriaSection.tsx
│   │   │   ├── ProjectGrid.tsx        # Project gallery grid
│   │   │   ├── CountdownTimer.tsx     # Live countdown to hackathon date
│   │   │   ├── HackathonStats.tsx
│   │   │   ├── Leaderboard.tsx
│   │   │   ├── LoadingState.tsx
│   │   │   ├── PreviousWinners.tsx
│   │   │   ├── ExperienceTier.tsx
│   │   │   └── index.ts
│   │   ├── content/
│   │   │   ├── TechnicalConceptsSection.tsx
│   │   │   ├── DeliverablesSection.tsx
│   │   │   ├── AntiPatternsSection.tsx
│   │   │   ├── StackSection.tsx
│   │   │   ├── FAQSection.tsx
│   │   │   ├── RulesSection.tsx
│   │   │   ├── AboutSection.tsx
│   │   │   ├── EditionOverview.tsx
│   │   │   └── index.ts
│   │   ├── forms/
│   │   │   └── index.ts               # Form exports (Registration removed)
│   │   └── interactive/
│   │       ├── GoogleFormButton.tsx   # CTA button linking to Google Form
│   │       ├── CommandCheatSheet.tsx
│   │       ├── RepoCloneCTA.tsx
│   │       └── SupportChannels.tsx
│   ├── ahorro/                        # 🚧 Ahorro feature components (WIP)
│   │   ├── access/
│   │   │   ├── AccessGate.tsx         # Auth / access gate UI
│   │   │   ├── InviteForm.tsx         # Invite code form
│   │   │   ├── PaymentFlow.tsx        # Lightning payment flow
│   │   │   └── StatusIndicator.tsx    # Payment / access status indicator
│   │   ├── dashboard/
│   │   │   ├── DashboardHeader.tsx    # Dashboard page header
│   │   │   ├── DepositWidget.tsx      # Lightning deposit widget
│   │   │   ├── StatsPanel.tsx         # Savings stats panel
│   │   │   └── TransactionTable.tsx   # Transaction history table
│   │   ├── landing/
│   │   │   ├── Hero.tsx               # Ahorro landing hero
│   │   │   ├── BenefitsGrid.tsx       # Feature benefits grid
│   │   │   ├── HowItWorks.tsx         # Explainer section
│   │   │   ├── TrustSection.tsx       # Trust / social proof section
│   │   │   └── FinalCTA.tsx           # Bottom call-to-action
│   │   └── shared/
│   │       ├── AccessGuard.tsx        # Route-level access protection
│   │       └── SecretAccessButton.tsx # Hidden trigger for access flow
│   ├── badges/                        # ✅ Reusable badge components
│   │   ├── StatusBadge.tsx            # Status indicator badge
│   │   └── TierBadge.tsx              # Tier / plan badge
│   ├── cards/                         # ✅ Reusable card components
│   │   ├── GameCard.tsx               # Arcade game card
│   │   ├── ProjectCard.tsx            # Community project card
│   │   ├── ProjectSkeleton.tsx        # Loading skeleton for ProjectCard
│   │   ├── ProviderCard.tsx           # Provider directory card
│   │   └── ProviderSkeleton.tsx       # Loading skeleton for ProviderCard
│   ├── filters/                       # ✅ Reusable filter components
│   │   ├── CategoryFilter.tsx         # Category tab filter
│   │   └── TypeFilter.tsx             # Type dropdown filter
│   ├── common/                        # Shared primitive components
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   └── QRCode.tsx
│   └── ui/                            # shadcn/ui + custom components
│       ├── MatrixRain.tsx             # Animated <canvas> rain effect (client-only)
│       ├── ArcadeButton.tsx           # Tron-style CTA button (custom)
│       ├── Logo.tsx                   # Matrix-styled SVG logo
│       ├── OriginalLogo.tsx           # Original branding logo
│       ├── MatrixArcadeWhatsApp.tsx   # ✅ WhatsApp CTA with Matrix arcade style
│       ├── MatrixArcadeWhatsApp.stories.tsx  # Storybook stories
│       ├── PartnerCard.tsx            # ✅ Partner / sponsor card
│       ├── PartnersCarousel.tsx       # ✅ Horizontal partners carousel
│       ├── PricingCard.tsx            # ✅ Pricing plan card
│       ├── PricingTicker.tsx          # ✅ Pricing ticker display
│       ├── UnderConstruction.tsx      # ✅ Under-construction placeholder
│       ├── avatar.tsx                 # shadcn Avatar
│       ├── badge.tsx                  # shadcn Badge
│       ├── button.tsx                 # shadcn Button
│       ├── card.tsx                   # shadcn Card
│       ├── dialog.tsx                 # shadcn Dialog
│       ├── dropdown-menu.tsx          # shadcn DropdownMenu
│       ├── input.tsx                  # shadcn Input
│       ├── label.tsx                  # shadcn Label
│       ├── navigation-menu.tsx        # shadcn NavigationMenu
│       ├── separator.tsx              # shadcn Separator
│       ├── sheet.tsx                  # shadcn Sheet
│       ├── textarea.tsx               # shadcn Textarea
│       └── icons/
│           └── MatrixPhoneIcon.tsx    # Custom SVG phone icon
├── lib/
│   ├── blink.ts                       # Blink.sv GraphQL API client (tip-jar + ahorro)
│   ├── juegos.ts                      # Arcade/games data loader
│   ├── proveedores.ts                 # Provider directory types, stats, data
│   ├── proveedores.test.ts            # Proveedores unit tests
│   ├── proyectos.ts                   # Community projects types and data
│   ├── utils.ts                       # cn() (clsx+twMerge), formatSats, formatFiat
│   ├── hackathon/                     # ✅ Hackathon data & logic layer
│   │   ├── index.ts                   # Re-exports: getEditionConfig, listActiveEditions, getNextEdition
│   │   ├── config.ts                  # Shared hackathon config/constants
│   │   ├── bitcoin.ts                 # Bitcoin-specific utilities
│   │   ├── validation.ts              # Zod schema — registration form validation
│   │   └── editions/
│   │       ├── index.ts               # getEditionConfig(), listActiveEditions(), getNextEdition()
│   │       ├── types.ts               # HackathonEdition, TimelineItem, Prize, Sponsor types
│   │       ├── 2026-1.ts              # Edition: HBTCMX 2026-1 (completed)
│   │       ├── 2026-2.ts              # Edition: Custody UI 2026 — slug: custody-ui-2026
│   │       ├── 2026-3.ts              # Edition: Tianguis 2026 — slug: tianguis-2026
│   │       └── legacy-data.ts         # Legacy edition data
│   ├── market/                        # Market data clients
│   │   ├── binance.ts                 # Binance BTC/USD price fetch
│   │   ├── binance.test.ts            # Binance client unit tests
│   │   └── service.ts                 # ✅ Market data service abstraction
│   ├── ahorro/                        # 🚧 Ahorro business logic (WIP)
│   │   ├── access.ts                  # Access control helpers
│   │   ├── blink.ts                   # Blink.sv integration for ahorro deposits
│   │   ├── constants.ts               # Ahorro constants (yield rates, tiers, etc.)
│   │   ├── types.ts                   # Ahorro TypeScript types
│   │   └── yield.ts                   # Yield calculation utilities
│   ├── prompts/
│   │   └── bob-agent.ts               # Bob's personality & system prompt
│   └── vector/
│       └── search.ts                  # ✅ Upstash Vector semantic search client
├── data/                              # Static JSON / TS data files
│   ├── juegos.json                    # Arcade games data
│   ├── proveedores.json               # Provider directory data
│   ├── proyectos.json                 # Community projects data
│   ├── partners.ts                    # ✅ Partners / sponsors data
│   └── pricing.ts                     # ✅ Pricing plans data
├── hooks/                             # Custom React hooks
│   ├── useMarketMood.ts               # Hook for DCA & Price data
│   └── useMarketData.ts               # ✅ General market data hook
├── styles/
│   └── hackathon.css                  # Hackathon-specific CSS classes & tokens
├── scripts/                           # Build / utility scripts
│   ├── check-assets.mjs               # Asset validation script
│   └── generate-icons.mjs             # Icon generation script
├── docs/
│   └── DEPLOYMENT.md                  # Deployment guide
├── public/                            # Static assets (images, icons, favicons)
├── .env.local                         # Local env (never committed)
├── .env.example                       # Env var template
├── components.json                    # shadcn/ui config
├── components.json.bak                # shadcn config backup
├── middleware.ts                      # Next.js middleware (auth / redirects)
├── next.config.mjs                    # Next.js config (Sentry, image domains)
├── tailwind.config.ts                 # Tailwind config (custom animations: scanline, blink, tilt)
├── tsconfig.json                      # TypeScript strict mode
├── vite.config.ts                     # Vitest config (unit tests)
├── vitest.setup.ts                    # Vitest global setup
├── sentry.client.config.ts            # Sentry client-side init
├── sentry.server.config.ts            # Sentry server-side init
├── turbo.json                         # Turborepo config (if used)
├── design-system.md                   # Design system documentation
├── MANTENIMIENTO.md                   # Maintenance log & dev notes
├── README.md                          # Project README
└── package.json                       # Next.js 14.2.3, Vitest, Sentry, Resend, Groq, Three.js
```

## 🗺️ Route Map

| Route | Description | File | Status |
|-------|-------------|------|--------|
| `/` | **Oracle Homepage** — Hero, MarketMood, PriceConverter, Aprende, Tianguis cards, TipJar, Bob AI | `app/(site)/page.tsx` | ✅ Live (v2.0) |
| `/arcade` | **Bitcoin Arcade** — Tron/Cypherpunk styled learning hub, interactive hackathon projects | `app/(site)/arcade/page.tsx` | ✅ Live |
| `/tianguis` | **Lightning Marketplace** — Nostr + Lightning commerce | `app/(site)/tianguis/page.tsx` | ✅ Functional |
| `/proyectos` | **Community Showcase** — Client-rendered filterable project grid | `app/(site)/proyectos/page.tsx` + `ProyectosClient.tsx` | ✅ Functional |
| `/crea-tu-tienda` | **Merchant Onboarding** — BTCPay registration form | `app/(site)/crea-tu-tienda/page.tsx` | ✅ Functional |
| `/planes` | **Pricing / Plans** — Service tiers and pricing cards | `app/(site)/planes/page.tsx` | ✅ Live |
| `/agenda` | **Consultas** — Cal.com booking iframe | `app/agenda/page.tsx` | ✅ Integrated |
| `/nuestra-historia` | Project History & Mission | `app/nuestra-historia/page.tsx` | ✅ Functional |
| `/proveedores` | **Sovereign Directory** — Filterable provider grid w/ MatrixRain | `app/proveedores/page.tsx` + `ProveedoresClient.tsx` | ✅ Functional |
| `/ahorro` | **Ahorro Landing** — Savings and DCA onboarding | `app/ahorro/page.tsx` | 🚧 WIP |
| `/ahorro/access` | **Access Gate** — Lightning payment-gated access | `app/ahorro/access/page.tsx` | 🚧 WIP |
| `/ahorro/dashboard` | **User Dashboard** — Savings stats, deposits, transactions | `app/ahorro/dashboard/page.tsx` | 🚧 WIP |
| `/hackathon` | **Hackathon Hub** — Index / overview page | `app/hackathon/page.tsx` | ✅ Live |
| `/hackathon/[edition]` | **Hackathon Landing** — Edition-specific page (Hero, Timeline, Prizes, FAQ) | `app/hackathon/[edition]/page.tsx` | ✅ Live — slugs: `custody-ui-2026`, `tianguis-2026`, `2026-1` |
| `/hackathon/[edition]/register` | **External Registration** — Redirect to Google Forms | `app/hackathon/[edition]/register/page.tsx` | ✅ Redirect |
| `/hackathon/[edition]/projects` | **Project Gallery** — ProjectGrid w/ edition data | `app/hackathon/[edition]/projects/page.tsx` | ✅ Functional |
| `/hackathon/[edition]/resources` | **Resources Hub** — PDFs, docs, workshop recordings | `app/hackathon/[edition]/resources/page.tsx` | ✅ Functional |
| `/hackathon/[edition]/api` | **Hackathon API** — Info + Submission endpoints | `app/hackathon/[edition]/api/route.ts` | ✅ Functional |
| `/api/tipjar` | Lightning Tip-Jar API (Blink.sv proxy) | `app/api/tipjar/route.ts` | ✅ Live |
| `/api/chat` | Bob AI Chat (Groq LLM) | `app/api/chat/route.ts` | ✅ Live |
| `/api/hackathon/leaderboard` | Hackathon leaderboard data | `app/api/hackathon/leaderboard/route.ts` | ✅ Functional |
| `/api/hackathon/tips` | Hackathon Lightning tips | `app/api/hackathon/tips/route.ts` | ✅ Functional |
| `/api/ahorro/stats` | Ahorro savings stats | `app/api/ahorro/stats/route.ts` | 🚧 WIP |
| `/api/ahorro/webhook/blink` | Blink.sv deposit webhook | `app/api/ahorro/webhook/blink/route.ts` | 🚧 WIP |
| `/api/webhook/lnbits` | LNbits webhook handler | `app/api/webhook/lnbits/route.ts` | 🔧 Legacy |

## 🏆 Hackathon Editions

| Edition ID | Slug | Status | Description |
|-----------|------|--------|-------------|
| `2026-1` | `2026-1` | ✅ completed | HBTCMX Primera Edición |
| `2026-2` | `custody-ui-2026` | 🚀 upcoming | Custody UI Challenge |
| `2026-3` | `tianguis-2026` | 📋 defined | Tianguis Lightning Edition |

## 🛠️ Technology Stack

| Layer | Technology | Version/Notes |
|-------|-----------|---------------|
| **Framework** | [Next.js](https://nextjs.org/) | 14.2.3 — App Router |
| **Language** | [TypeScript](https://www.typescriptlang.org/) | Strict mode |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) | Custom animations: `scanline`, `blink`, `tilt` |
| **UI Kit** | [shadcn/ui](https://ui.shadcn.com/) | + custom ArcadeButton, MatrixRain, Logo |
| **Icons** | [Lucide React](https://lucide.dev/) | v1.8.0 |
| **Animation** | [Framer Motion](https://www.framer.com/motion/) | ^11.18.2 |
| **3D / WebGL** | [Three.js](https://threejs.org/) + [@react-three/fiber](https://docs.pmnd.rs/react-three-fiber) | ^0.184.0 / ^8.18.0 |
| **GSAP** | [GSAP](https://greensock.com/gsap/) + @gsap/react | ^3.15.0 / ^2.1.2 |
| **Forms** | [React Hook Form](https://react-hook-form.com/) + @hookform/resolvers | ^7.75.0 |
| **QR Codes** | [qrcode.react](https://github.com/zpao/qrcode.react) | Client-only (`ssr: false`) |
| **Payments** | [Blink.sv](https://blink.sv) | GraphQL API — Lightning + On-chain |
| **Market Data** | Binance API | BTC/USD via `lib/market/binance` |
| **AI / LLM** | [Groq](https://groq.com/) SDK | Bob AI agent — `groq-sdk ^0.9.0` |
| **Vector DB** | [Upstash Vector](https://upstash.com/vector) | Semantic search — `@upstash/vector ^1.1.6` |
| **Booking** | [Cal.com](https://cal.com) | Embedded in `/agenda` |
| **Validation** | [Zod](https://zod.dev/) | v4 — Hackathon registration + ahorro schemas |
| **Toast / Alerts** | [Sonner](https://sonner.emilkowal.ski/) | ^2.0.7 |
| **Testing** | [Vitest](https://vitest.dev/) | `route.test.ts`, `proveedores.test.ts`, `binance.test.ts` |
| **Monitoring** | [Sentry](https://sentry.io) | Error tracking (client + server config) |
| **Email** | [Resend](https://resend.com) | Transactional email |
| **PWA** | next-pwa | ^5.6.0 (disabled in dev) |

## 🎨 Design System: Cypherpunk Bank / Oracle System

The project uses a high-contrast, technical aesthetic inspired by digital frontiers and decentralized infrastructure.

### Typography
- **Serif**: IBM Plex Serif — High-contrast titles, institutional feel
- **Mono**: Fira Code — Technical descriptions, code snippets, data displays
- **Retro**: VT323 — Arcade buttons, system status, metadata labels

### Color Palette
| Token | Hex | Usage |
|-------|-----|-------|
| **Background** | `#000000` | Pure black — OLED depth |
| **Primary (Bitcoin)** | `#F7931A` | CTAs, Bitcoin branding |
| **Accent (Cyan/Tron)** | `#06B6D4` | Interactive highlights |
| **Matrix Green** | `#00FF41` | Status, MatrixRain, decorative |
| **Status Green** | `#22C55E` | Operational indicators |
| **Orange** | `#F97316` | Section headers, financial accents |

### CSS Variables (globals.css)
- `--orange-500`, `--orange-400`, `--orange-glow` — Financial UI theming
- Custom `@keyframes`: `scanline`, `blink`, `tilt`, `matrix-fall`

### Visual Effects
- **Glassmorphism**: High-intensity `backdrop-blur` for cards and modals
- **Scanlines**: Animated overlay — `animate-scanline` on Card borders
- **Blinking Cursors**: Retro-terminal input simulation via `animate-blink`
- **Glows**: Neon `box-shadow` on hover (`shadow-[0_0_25px_rgba(...)]`)
- **Matrix Rain**: Animated `<canvas>` background on select pages

## 🚀 Updates Log (v2.0 — Ongoing)

1. **Oracle Homepage** (🎉): Replaced old BTC Map with a focused "Oracle" experience — Hero, MarketMood DCA widget, PriceConverter, and dual CTA cards (Crea tu Tienda + Tianguis)
2. **`/proveedores` Sovereign Directory** (🎉): Full directory page with MatrixRain background, stats bar, category filters, search, ProviderCard grid
3. **Dynamic Tip Jar** (🎉): Lightning + on-chain donation with real-time QR codes, `isMounted` SSR guard, Blink.sv integration
4. **MarketMood DCA Widget** (✨): 4H timeframe DCA quality indicator with Binance price feed, sparkline history, color-coded tiers, and AureoBitcoin sponsorship
5. **Bitcoin Arcade** (`/arcade`): Tron/Cypherpunk-styled learning hub with Visionary AI projects
6. **Agenda v2.0**: Embedded Cal.com booking within a themed "System Window" UI
7. **Hydration Fixes** (🐛): `isMounted` state guards on `MatrixRain`, `TipJarSection`, and MarketMood widgets; `suppressHydrationWarning` on dynamic elements; QR codes rendered client-only via `next/dynamic` with `ssr: false`
8. **Blink.sv Migration**: Payment infrastructure moved from LNbits to Blink's GraphQL API
9. **Interactive Footer**: "Node Status" simulation, terminal-style nav links
10. **Hackathon Module** (🚀): Full multi-edition hackathon platform under `app/hackathon/[edition]/`. Migrated from `(hackathon)` route group to flat `app/hackathon/` to fix hydration & routing errors. Supports editions: `custody-ui-2026`, `tianguis-2026`, `2026-1`
11. **Hackathon Hub Page**: Added `app/hackathon/page.tsx` as edition index/overview
12. **CI/CD**: Build verified passing with zero hydration errors, zero TypeScript errors
13. **Bob the Bitcoin Agent** (🤖): Integrated a specialized Bitcoin AI assistant on the homepage with custom Cypherpunk personality, Matrix-style chat UI, stateful interaction, and Groq LLM backend (`/api/chat`)
14. **Dead Code Cleanup** (🧹): Removed unused legacy components (e.g., `ApiDocsCard`) and cleaned up exports
15. **Section Headers** (🎉): Added `AhorraSectionHeader` and `AceptaBitcoinSectionHeader` with IntersectionObserver animations, financial chips, realtime badges, and WCAG AA compliance
16. **Orange Palette** (🎨): Defined CSS variables `--orange-500`, `--orange-400`, `--orange-glow` in globals.css and tailwind config
17. **MarketTicker** (✨): Added `MarketTicker` widget for live price display
18. **Planes / Pricing** (💰): New `/planes` route with `PricingCard`, `PricingTicker`, and partner data (`data/pricing.ts`, `data/partners.ts`)
19. **Ahorro Module** (🚧 WIP): Full savings/DCA feature — landing, access gate (Lightning-payment gated), user dashboard with stats/deposit/transactions. Components: `components/ahorro/**`, lib: `lib/ahorro/**`, APIs: `/api/ahorro/**`
20. **Vector Search** (🔍): Added Upstash Vector integration (`lib/vector/search.ts`) for semantic search capabilities
21. **Shared UI Components** (✅): New reusable `components/badges/`, `components/cards/`, `components/filters/`, `components/common/` directories with typed, composable primitives
22. **Three.js / GSAP** (🎨): Added `@react-three/fiber`, `@react-three/drei`, and GSAP for advanced 3D and animation capabilities
23. **Hackathon API Routes** (🏆): New `/api/hackathon/leaderboard` and `/api/hackathon/tips` endpoints for live hackathon features
24. **Webhook Infrastructure** (🔗): Added `/api/ahorro/webhook/blink` and `/api/webhook/lnbits` for payment event handling
25. **Bob Chat Refactor** (🤖): Extracted `ChatBubble.tsx` and `useBobChat.ts` into bob-chat widget directory; added `icons/MatrixPhoneIcon.tsx`