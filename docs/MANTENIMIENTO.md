# Mantenimiento: Acepta Bitcoin México (Design System v2.1)

Estado actual del proyecto — última actualización: 2026-07-21

---

## 📋 Estado General

| Área | Estado | Notas |
|------|--------|-------|
| **Build (npm run build)** | ✅ Pasando | Sin errores TypeScript, hidratación limpia |
| **Tipado (TypeScript strict)** | ✅ Sin errores | `tsconfig.json` en modo estricto |
| **Linting** | ⚠️ Sin configuración | ESLint pendiente de configuración inicial |
| **Tests (Vitest)** | ✅ Pasando | `app/api/tipjar/route.test.ts`, `lib/proveedores.test.ts` |
| **Assets Proveedores** | ✅ Actualizado | 4 SVGs nuevos, 9 eliminados, data sync |
| **Despliegue (Vercel)** | ✅ Configurado | Variables de entorno: `NEXT_PUBLIC_TIP_JAR_LN_ADDRESS` |
| **Módulo Hackathon** | ✅ Live | Migrado de route group `(hackathon)` a `app/hackathon/` — rutas activas |

---

## 🎨 Logo Original SVG — Integración (2026-07-10)

### Cambios Implementados

**Creación del Componente**
- Archivo: `components/ui/OriginalLogo.tsx`
- SVG inline fiel al logo original "AceptaBitcoin.org"
- Colores exactos: `#E8772E` (naranja), `#7CB342` (verde), `#FFFFFF` (símbolo ₿)
- ViewBox: `0 0 420 130` — proporción 3.2:1

**Integración en Navbar**
- Reemplazo de `MatrixLogo + texto` por `OriginalLogo` único
- Tamaños responsivos: `w-40` (mobile) → `w-48/56` (desktop)
- Efectos hover: `drop-shadow` verde Matrix + `scale-[1.02]`
- Eliminación de texto duplicado (el logo ya incluye "AceptaBitcoin.org")

**Decisiones Técnicas**
- ✅ SVG inline (sin dependencias externas)
- ✅ Accesibilidad: `aria-label="Acepta Bitcoin"`
- ✅ Performance: Sin imágenes rasterizadas
- ✅ Coherencia: Mantiene estética institucional original

**Estado**: ✅ Componente creado y navbar actualizado

---

## 🚀 Sprint Update: Design System v2.1 — GSAP Animations & Cypherpunk Terminal (June 25, 2026)

### 🆕 Clases de Utilidad Nuevas
- `.animate-scan` → Holográfico QR (TipJar)
- `.animate-mining-pulse` → Bloque minado (NuestraHistoria)
- `.shadow-matrix-strong` → Glow verde intenso

---

### ✅ Completed Tasks

#### 1. ⚡ TipJarSection v2.2
**Archivo:** `components/sections/TipJarSection.tsx`

**Cambios Principales**
- **Simplificación de flujo:**
  - ❌ Removida integración con caja registradora (complejidad innecesaria)
  - ✅ Modo "Donación pura" — solo tipjar
- **Infraestructura propia:**
  - Nueva dirección on-chain: `bc1q4kfrqsm60jxx8xva9p6erx6pp6zqaazy00nhrk`
  - BTCPay Server propio (sin intermediarios Blink para on-chain)
  - Lightning Address: `aceptabitcoin@blink.sv` (Blink POS)
- **Mejoras estéticas:**
  - Efecto holográfico en QR codes (GSAP timeline infinito)
  - Badge "BTCPAY SERVER • ONLINE" con punto verde pulsante
  - Mensaje simplificado: "Con tu apoyo crecemos la red"
  - MercadoPago actualizado: https://link.mercadopago.com.mx/skinlabclothingclub
- **Decisiones Técnicas:**
  - Framer Motion + GSAP híbrido: Framer para transiciones entre tabs, GSAP para efectos continuos
  - Memoización: Componentes pesados con `memo()` para evitar re-renders
  - Guard de hidratación: `isMounted` state para prevenir mismatches SSR/client

#### 2. 📜 NuestraHistoria — GSAP Timechain
**Archivo:** `app/nuestra-historia/page.tsx`

**Animaciones Implementadas**
- **3D Mouse Tracking en bloques:**
  - ScrollTrigger: Entrada con `rotationX: 15`, `scale: 0.9`
  - Líneas conectoras animadas (`scaleY: 0 → 1`)
  - Stagger de 0.1s entre bloques
- **Efectos interactivos:**
  - Glitch en títulos al hover (shake horizontal)
  - Mining pulse cuando timer llega a 00:00
  - Contador de confirmaciones por bloque

**Performance Notes**
- MatrixRain desactivado en esta página (los bloques ya tienen 3D)
- Cleanup de ScrollTrigger en `useEffect` return
- Partículas limitadas a 20 elementos con `will-change-transform`

**Estructura de Datos**
- 10 bloques totales (Q4 2021 → Q2 2025)

#### 3. 💰 PriceConverter — Oracle Terminal
**Archivo:** `components/sections/PriceConverter.tsx`

**Mejoras Estéticas**
- Header terminal: Ícono con glow + indicador "LIVE" pulsante
- Tipografía VT323 para labels técnicos (BTC, USD, MXN, SATS)
- Scanline effect animado en el fondo
- Corner accents en las esquinas (especificación design system)
- Status footer con "Auto-rotate: 45s" y "Coingecko API"

**Jerarquía Visual**
- Bitcoin Orange para conversiones BTC↔USD y BTC↔MXN
- Matrix Green para SATS↔MXN (Lightning Network)
- Glow effects en hover: `shadow-[0_0_30px_rgba(247,147,26,0.3)]`

**Lógica de Conversión**
- Fuente única de verdad: `btcAmount` state
- Cálculos derivados en render (evita estados duplicados)
- Fetch cada 45s con fallback a valores de respaldo

#### 4. 🤖 B.O.B. Chat — Cypherpunk Personality
**Archivos Modificados**

| Archivo | Cambio |
|---------|--------|
| `components/widgets/bob-chat/BobChatWidget.tsx` | UI terminal + corner accents |
| `app/api/chat/route.ts` | Removido `runtime='edge'` |
| `lib/prompts/bob-agent.ts` | Personalidad contextual + RAG filters |

**UI Terminal Style**
- Header: Badge "ONLINE" con ícono Wifi
- Context chips: Bordes gruesos + glow en hover
- Chat bubbles: Glow pronunciado (usuario: orange, asistente: green)
- Empty state: Ícono terminal con contenedor + mensaje de bienvenida
- Corner accents: En todas las esquinas del widget

**API — Decisiones Críticas**
- ❌ **Removido:** `runtime = 'edge'`
  - **Razón:** Costo no autorizado de Redis/Upstash para rate limiting distribuido.
  - **Trade-off aceptado:**
    - ✅ Rate limiter funciona en Node.js runtime (`Map` en memoria)
    - ✅ Sin costos adicionales
    - ⚠️ Se resetea en cold starts (~5 min inactividad)
    - ⚠️ No persiste entre regiones (aceptable para etapa actual)

**RAG Integration**
- Filtros contextuales ahora se pasan al modelo
- Timeout de 2s en búsqueda vectorial
- Inyección en último mensaje (no altera historial visible)

**Personalidad Cypherpunk**

| Contexto | Personalidad | RAG Filter |
|----------|--------------|------------|
| `fundamentos` | Educador cypherpunk | `general` |
| `mining` | Experto PoW | `mining` |
| `custodia` | Defensor autocustodia | `seed` |
| `impuestos` | Asesor fiscal MX | `taxes` |
| `verificacion` | Técnico de nodos | `verification` |

**Reglas Estrictas**
- Máximo 300 palabras (3 párrafos)
- NO consejos financieros
- NO promoción de servicios centralizados
- NO markdown (texto plano)
- Integrar RAG naturalmente: "Según el whitepaper..."

#### 5. 🎠 PartnersCarousel — Terminal Navigation
**Archivo:** `components/ui/PartnersCarousel.tsx`

**Mejoras**
- Botones de navegación: `h-12 w-12` con glow pronunciado
- Dots activos: Más largos (`w-8`) con efecto pulse
- Status footer: "Auto-rotate: 6s" + "Hover to pause"
- Background grid: Pattern sutil (opacity-40)
- Tipografía VT323 para metadata

---

### 📦 Dependencias Agregadas

- `gsap` — Animaciones cinematográficas
- `@gsap/react` — Integración de GSAP con React

> **Nota:** Licencia GSAP gratuita para proyectos open-source (AGPL-3.0 compatible).

---

### 🐛 Bugs Corregidos

#### Hidratación
- ✅ `isMounted` guards en todos los componentes con animaciones
- ✅ `suppressHydrationWarning` en elementos dinámicos
- ✅ QR codes renderizados client-only

#### Performance
- ✅ `memo()` en `TimechainBlock` y `CategoryIcon`
- ✅ `useCallback` en handlers de B.O.B.
- ✅ Cleanup de intervals y event listeners

#### Rate Limiter
- ✅ Limpieza perezosa cada 5 min (ahorra CPU)
- ✅ Fallback a `127.0.0.1` si no hay IP
- ✅ `Retry-After` header en respuesta 429

---

### 🎯 Próximos Pasos Sugeridos

**Corto Plazo (Sprint Actual)**
- Testing de B.O.B. con usuarios reales
- Monitoreo de rate limiter en producción
- Optimizar imágenes del hackathon (WebP)

**Mediano Plazo (Q3 2026)**
- Streaming en B.O.B. API (mejor UX)
- Validación con Zod en todos los endpoints
- Integración de Nostr para donaciones
- Analytics de uso de contextos en B.O.B.

**Largo Plazo (Q4 2026)**
- Migración a Upstash Redis si el tráfico crece
- PWA offline para PriceConverter
- Multi-language support (EN/ES/PT)
- Lightning Address custom (@aceptabitcoin.com)

---

### 📚 Referencias Técnicas

**Design System**
- `design-system.md` — Paleta, tipografía, efectos visuales
- `map.md` — Arquitectura de rutas y componentes

**APIs Externas**
- Blink.sv: GraphQL para Lightning (TipJar)
- Coingecko: Precios BTC/USD/MXN (PriceConverter)
- Groq: LLM para B.O.B. (`llama-3.3-70b-versatile`)

**Herramientas**
- GSAP: Animaciones cinematográficas
- Framer Motion: Transiciones entre componentes
- ScrollTrigger: Animaciones on-scroll

---

### 🏁 Checklist de Deploy

- [x] Build pasa sin errores de TypeScript
- [x] Build pasa sin errores de hidratación
- [ ] Rate limiter probado localmente
- [x] B.O.B. responde correctamente en todos los contextos
- [x] QR codes se renderizan en cliente
- [x] Animaciones GSAP no bloquean interacciones
- [ ] Deploy a Vercel (pendiente)
- [ ] Monitoreo de errores en Sentry (post-deploy)
- [ ] Testing de performance en Lighthouse (post-deploy)

---

### 💬 Notas de la Sesión

**Decisiones Arquitectónicas Clave**
- GSAP + Framer Motion híbrido: Cada librería en su fortaleza
- Node.js runtime sobre Edge: Costo vs. funcionalidad
- BTCPay Server propio: Soberanía sobre custodia de terceros
- MatrixRain como fondo sutil: No como protagonista (performance)

**Trade-offs Aceptados**
- Rate limiter en memoria (no distribuido) — aceptable para tráfico actual
- Sin streaming en B.O.B. — UX sacrificada por simplicidad
- Sin persistencia de historial en B.O.B. — Privacidad sobre conveniencia

**Filosofía Aplicada**
> "Sovereign Infrastructure, Terminal UI, High Contrast"
> — Design System Bitcoin Matrix v2.1

Todos los cambios respetan la estética cypherpunk, la narrativa Bitcoin, y la soberanía técnica del proyecto.

---

## 🚀 Sprint Update: Bitcoin Matrix Refinement & UX Polish (June 13, 2026)

### ✅ Completed Tasks

#### 1. Hero Section (components/layout/Hero.tsx)
**Actualización de Estado:** Transición post-Hackatón #2.
- **Cambio en CTA Principal:** Texto actualizado a "PRÓXIMAMENTE HACKATÓN #3".
- **Efecto visual reducido:** Se eliminó el animate-pulse intenso y se suavizó el glow para un estado de "espera" más discreto.
- **Enlace apuntando a /hackathon** general mientras se define la edición 3.

#### 2. Proveedores / Partners (components/sections/PartnersCarousel.tsx & data/partners.ts)
**Limpieza de Copy:** Eliminada la frase "Sin stablecoins, sin fiat on-ramp..." por solicitud del cliente.
- **Optimización Visual:** Reemplazo del efecto animate-pulse en el badge "Infraestructura Bitcoin Only" por un Glow estático (drop-shadow) para evitar conflicto visual con el escudo.
- **Actualización de Enlaces de Referido:**
  - Bull Bitcoin: `https://app.bullbitcoin.com/registration/trtxx1`
  - Aureo Bitcoin: `https://app.aureobitcoin.com/es/auth/signup?ref=abo`
- **Fix de Build:** Corrección de definición duplicada de `PARTNERS` y `Partner` interface (eliminado contenido duplicado que causaba error de compilación).

#### 3. Botón Flotante WhatsApp (components/ui/MatrixArcadeWhatsApp.tsx)
- **Redimensión:** Ajuste de tamaño base a `md` (más compacto) para evitar saturación en pantalla.
- **Layout del Label:** Se añadió `max-w-[120px]` al contenedor de texto para evitar que el label expanda horizontalmente el botón.
- **Estética:** Tipografía ajustada (`text-base`) y tracking reducido para mejor integración.

#### 4. Efecto Matrix Rain (components/ui/MatrixRain.tsx)
- **Espaciado:** Aumento de `fontSize` a 18px para separar columnas y dejar "respirar" al fondo negro.
- **Limpieza de Rastro:** Aumento de opacidad del borrado de fondo a 0.15 para evitar la saturación blanca/halo después de unos segundos.
- **Contraste:** Estela reducida a `opacity: 0.08` manteniendo la cabeza de la gota en blanco puro (#FFFFFF) con glow.

#### 5. Arcade Button (components/ui/ArcadeButton.tsx)
**Rediseño 3D Mecánico:**
- Implementación de borde inferior grueso (`border-b-[10px]`) para simular profundidad física.
- Fondo sólido (`bg-bitcoin` / `bg-matrix`) en lugar de solo bordes.
- Animación de Presión: Efecto `active:border-b-0 active:translate-y-[10px]` para simular el hundimiento real de un botón de arcade.
- Añadido reflejo superior (gradiente blanco) para efecto de plástico curvo.

#### 6. Formulario Onboarding (app/(site)/crea-tu-tienda/page.tsx)
**Integración Google Forms:**
- Actualización de `GOOGLE_FORM_URL` y mapeo correcto de todos los `entry.IDs` extraídos de la URL del formulario real.
- Campos verificados: Nombre, Email, Negocio, Categoría, Volumen, Nivel Técnico e Infraestructura.

### ⚠️ Pending Actions
- [ ] Eliminar `app/api/tipjar/route.ts` y `lib/blink.ts` tras configurar webhook en Blink dashboard.
- [ ] Verificar que `tailwind.config.ts` tenga mapeadas correctamente las fuentes `vt323`, `fira-code`, `ibm-plex-serif`.
- [ ] Testear `MatrixArcadeWhatsApp` en iOS Safari para confirmar deep-linking funcional.

---

## 🚀 Sprint Update: Directorio Soberano v2.0 (June 15, 2026)

### ✅ Completed Tasks

#### 1. Proveedores Directory Clean Slate
- **Data Cleanup:** Eliminación de 9 proveedores ficticios de `data/proveedores.json`
- **Asset Cleanup:** Borrado de 9 logos SVG obsoletos en `public/proveedores/`
- **New Providers:** Integración de 4 proveedores reales verificados:
  - Aureo Bitcoin (Exchange MXN)
  - Bull Bitcoin (Exchange Internacional)
  - La Bianca Tropical (Restaurante Italiano - Mérida)
  - Padel Club (Distribuidora Deportiva - Mérida)

#### 2. Visual Assets Refactoring
- **Logos:** Reemplazo total por SVGs monocromáticos blancos (#FFFFFF) sobre fondo transparente
- **Estética:** Alineación estricta con "Bitcoin Matrix" DS v2.0

#### 3. ArcadeButton v2.0 Redesign
- **3D Mechanical Effect:** Borde inferior grueso, fondo sólido, animación de presión
- **DS Compliance:** Paleta restringida a Matrix Green + Bitcoin Orange, tipografía VT323

---

## 🚀 Sprint Update: Refinamiento de Soberanía, Transparencia Radical y UX Terminal (21 de julio de 2026)

Se completó la refactorización integral de componentes clave asegurando cumplimiento estricto del Design System v2.1 y cero errores de hidratación.

### ✅ Cambios Implementados

#### 1. Navbar — Responsive & Hydration Guard
- **Breakpoint corregido:** Cambio de `xl` a `lg` para mobile/desktop, optimizando espaciado y visibilidad de navegación
- **Hydration guard:** Añadido estado `isMounted` para renderizar skeleton inicial y evitar mismatches SSR/CSR
- **Mobile menu mejorado:** Fondo Matrix Rain sutil, links con stagger animado, badge `SYSTEM ONLINE`, CTA más prominente
- **Logo ajustado:** Tamaños responsivos refinados (`w-28` → `w-40`) con hover glow

#### 2. Directorio Soberano — KYC Transparency
- **`data/partners.ts`:** Actualizadas descripciones y protocolos de Aureo Bitcoin, Arcadia, Bull Bitcoin y Hodl Hodl
- **`PartnerCard.tsx`:** Campo `requiresKYC` agregado a interfaz y datos
  - Badge dinámico: Verde Matrix (`No KYC`) / Naranja Bitcoin (`KYC Req.`)
  - Footer responsive: layout `flex-col` en mobile, `flex-row` en desktop
- **Bull Bitcoin corregido:** Etiquetado correctamente como "KYC Regulado / Non-custodial"

#### 3. Oracle DCA — Hydration & UX Fixes
- **`MarketMoodWidget.tsx`:**
  - Integración de `MarketMoodInfoPopover` en header con helper `getDcaStatusType()`
  - Eliminado tooltip legacy `showDCAInfo` y su estado asociado
  - Añadida propiedad `bgProgressClass` explícita en config DCA para evitar generación dinámica de clases Tailwind
  - Botón refresh con `disabled:opacity-50` para feedback visual
  - Limpieza de imports no usados (`Info`, `ExternalLink`, `TrendingUp`)
- **`MarketMoodInfoPopover.tsx`:**
  - Prop `currentStatus` para resaltar tarjeta activa en modal educativo
  - Guard `isMounted` + migración de `localStorage` a `sessionStorage` (alineado a "esta sesión")
  - Bloqueo de scroll del body mientras modal está abierto
  - Layout mejorado: `max-h-[90vh]`, `flex flex-col`, scroll interno controlado

#### 4. TipJar v3.0 — Native BTCPay POS
- **Migración a formularios nativos:** Reemplazo de QR + input manual por `<form method="POST">` apuntando a BTCPay Server soberano (Elestio)
- **Choice Keys implementados:**
  - `tip-21k-sats` → Apoyo Básico
  - `tip-210k-sats` → Apoyo Estratégico
  - `tip-2m-sats` → Socio Soberano
  - Monto libre vía enlace directo (`btcpayDirectLink`)
- **Design System compliance:** Eliminado color Cyan de pestaña Fiat, reemplazado por Matrix Green respetando dualidad sagrada
- **Simplificación:** Removida dependencia de QRCodeSVG para Lightning, eliminados estados de `amount` y `currency`, limpiado código muerto

### 🐛 Bugs Corregidos

| Issue | Fix |
|-------|-----|
| Mismatch hidratación Navbar | `isMounted` guard con skeleton estático |
| Generación dinámica clases Tailwind en barra de progreso DCA | `bgProgressClass` explícito en config |
| Parpadeo/mismatch en MarketMoodInfoPopover | `isMounted` + `sessionStorage` |
| Scroll body sin bloquear con modal abierto | `document.body.style.overflow = "hidden"` |
| Cyan color en pestaña Fiat TipJar | Reemplazado por Matrix Green |
| QR code + input manual en Lightning | Formularios nativos con choiceKey |

### 📊 Estado Final

- ✅ Build pasando sin errores TypeScript
- ✅ Tipado estricto sin errores
- ✅ Hidratación limpia en todos los componentes dinámicos
- ✅ Alineación total con filosofía: **Sovereign Infrastructure, Terminal UI, High Contrast**
- ✅ Design System v2.1 compliance verificado

---

## 🔧 Stack Técnico

- **Framework**: Next.js 14.2.3 (App Router)
- **Lenguaje**: TypeScript (strict mode)
- **Estilos**: Tailwind CSS con animaciones custom (`scanline`, `blink`, `tilt`) + `styles/hackathon.css`
- **UI**: shadcn/ui + componentes custom (ArcadeButton, MatrixRain, Logo, AhorraSectionHeader, AceptaBitcoinSectionHeader)
- **Pagos**: Blink.sv (GraphQL API — Lightning + On-chain)
- **Datos de mercado**: Binance API (BTC/USD, indicador DCA)
- **QR Codes**: `qrcode.react` (client-only, `ssr: false`)
- **Reservas**: Cal.com (iframe embebido en `/agenda`)
- **Validación**: Zod (esquema de registro de hackathon)
- **Testing**: Vitest
- **Monitoreo**: Sentry (cliente + servidor: `sentry.client.config.ts`, `sentry.server.config.ts`)
- **Email**: Resend

---

## 🔩 Componentes — Estado de Hidratación

Todos los componentes con datos dinámicos o dependientes del navegador incluyen protección SSR/CSR:

| Componente | Guard `isMounted` | `suppressHydrationWarning` | `dynamic ssr:false` | Estado |
|------------|-------------------|---------------------------|---------------------|--------|
| `MatrixRain` | ✅ | — | — | ✅ OK (Renderiza `<canvas>` en SSR y CSR para evitar mismatch) |
| `HeroParticles` | ✅ | — | — | ✅ OK (Renderiza `<canvas>` en SSR y CSR para evitar mismatch) |
| `MatrixHeroBackground` | — | — | — | ✅ OK (Wrapper siempre activo en SSR/CSR) |
| `TipJarSection` | ✅ | ✅ | — | ✅ OK |
| `MarketMoodWidget` | — | — | ✅ (via `next/dynamic`) | ✅ OK |
| `MarketMoodInfoPopover` | — | ✅ | — | ✅ OK |
| `QRCodeSVG` (en TipJar) | ✅ (condicional `isMounted`) | ✅ | — | ✅ OK |
| `CountdownTimer` (hackathon) | ✅ | — | — | ✅ OK (implementación robusta) |
| `HackathonNavbar` | — | — | — | ✅ OK (`"use client"`, `useState` al final del archivo) |
| `AhorraSectionHeader` | ✅ | — | — | ✅ OK (IntersectionObserver + framer-motion) |
| `AceptaBitcoinSectionHeader` | ✅ | — | — | ✅ OK (IntersectionObserver + framer-motion) |
| `PriceConverter` | — | — | — | ✅ OK (datos estáticos al montar, sin mismatches) |
| `TimechainBlock` | — | — | ✅ (via `memo`) | ✅ OK |

---

## 📁 Estructura de Rutas Activas

### Sitio Principal

| Ruta | Componente | Estado |
|------|-----------|--------|
| `/` | `app/(site)/page.tsx` | ✅ Oracle v2.0 — Homepage con Section Headers (Bob, Ahorra, Acepta) |
| `/arcade` | `app/(site)/arcade/page.tsx` | ✅ Bitcoin Arcade + Visionary AI |
| `/tianguis` | `app/(site)/tianguis/page.tsx` | ✅ Nostr + Lightning Marketplace |
| `/proyectos` | `app/(site)/proyectos/page.tsx` + `ProyectosClient.tsx` | ✅ Community Projects |
| `/crea-tu-tienda` | `app/(site)/crea-tu-tienda/page.tsx` | ✅ Merchant Onboarding |
| `/agenda` | `app/agenda/page.tsx` | ✅ Cal.com Booking |
| `/nuestra-historia` | `app/nuestra-historia/page.tsx` | ✅ Project History |
| `/proveedores` | `app/proveedores/page.tsx` + `ProveedoresClient.tsx` | ✅ Sovereign Directory |
| `/api/tipjar` | `app/api/tipjar/route.ts` | ✅ Blink.sv Proxy |

### Módulo Hackathon (`app/hackathon/`)

> ⚠️ **Migración completada**: Ruta aplanada de `app/(hackathon)/` → `app/hackathon/` para resolver errores de hidratación y routing en Vercel. Commit: `d9d6e6c`.

| Ruta | Componente | Estado |
|------|-----------|--------|
| `/hackathon/[edition]` | `app/hackathon/[edition]/page.tsx` | ✅ Hero, Timeline, Prizes, FAQ, CTA |
| `/hackathon/[edition]/register` | `app/hackathon/[edition]/register/page.tsx` | ✅ Formulario con Zod validation |
| `/hackathon/[edition]/projects` | `app/hackathon/[edition]/projects/page.tsx` | ✅ Galería de proyectos |
| `/hackathon/[edition]/resources` | `app/hackathon/[edition]/resources/page.tsx` | ✅ PDFs, docs, workshops |
| `/hackathon/[edition]/api` | `app/hackathon/[edition]/api/route.ts` | ✅ GET endpoints + POST registro (stubs) |

**Slugs de edición válidos:**
| Slug | ID interno | Estado |
|------|-----------|--------|
| `2026-1` | `edition2026_1` | ✅ Completada |
| `custody-ui-2026` | `edition2026_2` | 🚀 Upcoming |
| `tianguis-2026` | `edition2026_3` | 📋 Definida |

---

## 🧹 Tareas de Mantenimiento Pendientes

### Prioridad Alta
- [x] **Subir PDFs de recursos**: Creado `public/hackathon/docs/` con placeholders corregidos (`guia-participante-2026-2.pdf`, `lightning-setup-guide.pdf`, `nip99-cheatsheet.pdf`)
- [x] **Conectar API de registro**: Migrado a Google Forms para simplificar la gestión y soberanía de datos. El endpoint `POST /register` ha sido removido.
- [ ] **Validar claves de API en producción**: Confirmar `NEXT_PUBLIC_TIP_JAR_LN_ADDRESS` en Vercel env vars
- [ ] **Revisar dependencias**: `npm outdated` + actualizar parches de seguridad
- [x] **Orange palette CSS variables**: Definidas `--orange-500`, `--orange-400`, `--orange-glow` en `globals.css` y `tailwind.config.ts`

### Prioridad Media
- [x] **`generateStaticParams` para sub-rutas**: Implementado en `/register`, `/projects`, `/resources` para evitar 404 en builds estáticos.
- [ ] **Optimización de imágenes**: Convertir assets estáticos a WebP/AVIF
- [x] **SEO meta tags dinámicos**: Implementado `generateMetadata` dinámico en todas las sub-rutas del hackathon.
- [ ] **Analytics**: Integrar Plausible / Umami (privacidad-friendly)
- [ ] **Accesibilidad (a11y)**: Auditar con Lighthouse — revisar contraste en colores Matrix/Bitcoin sobre negro

### Prioridad Baja
- [x] **`console.log` de debug**: Eliminar el `console.log('[EditionPage] Rendering edition:', ...)` en `app/hackathon/[edition]/page.tsx` antes de producción final
- [ ] **Internacionalización**: Evaluar soporte multi-idioma (es/en)
- [ ] **PWA**: Activar Service Worker + `manifest.json` (actualmente deshabilitado: `[PWA] PWA support is disabled`)
- [ ] **Docs**: Completar `docs/` con guías de contribución y despliegue
- [x] **Limpieza de código muerto**: Eliminación del componente `ApiDocsCard` y limpieza de exports huérfanos en `components/hackathon/display/index.ts`.

---

## 🐛 Issues Conocidos / Resueltos

### Resueltos Recientemente

| Issue | Descripción | Fix |
|-------|-------------|-----|
| Mismatches de hidratación graves en Hackathon | `HeroParticles`, `MatrixRain` y `MatrixHeroBackground` causaban caídas de DOM | Unificación de tags en SSR/CSR (siempre `<canvas>` y `div` activos) |
| Errores de compilación por `density` prop | Se removió la prop obsoleta de `<MatrixRain>` en toda la app | Depurado en `/arcade`, `/proyectos` y layouts |
| `string.getTime()` error en countdown | `.toLocaleString()` devolvía string que rompía tipado en build | Migración a `Date.now()` absoluto en `CountdownTimer.tsx` |
| Hydration errors globales | `MatrixRain`, `TipJarSection`, `MarketMoodWidget` producían mismatches SSR/CSR | `isMounted` guards + `next/dynamic ssr:false` |
| Hackathon routing 404 en Vercel | Route group `(hackathon)` no mapeaba a `/hackathon/...` correctamente | Migración a `app/hackathon/` (`d9d6e6c`) |
| `CountdownTimer` inestable | Implementación reemplazada por versión robusta con `useEffect` limpio | `9e5f23f` |
| `MatrixRain` import error | Default import faltante en layout del hackathon | `1fa392b` |
| Zod enum type errors | Errores de tipo en esquema de validación de registro | `198fd38` |
| `RegistrationSuccess` module | Export faltante causaba error de build | `536d9ec` |
| Link "Volver" hardcoded en `/register` | `href="/hackathon/hbtcmx-2026-1"` (slug inexistente) | Corregido a `href={`/hackathon/${params.edition}`}` |
| PDFs con prefijo `/public/` | `href="/public/hackathon/docs/..."` → 404 en Next.js | Corregido en `HackathonFooter.tsx` y `resources/page.tsx` |
| `metadataBase` missing | Warning en build para Open Graph images | Configurado en `RootLayout` y páginas dinámicas de hackathon |
| Sub-rutas 404 en SSG | `/register`, `/projects`, `/resources` sin SSG params | Implementado `generateStaticParams` en todas las sub-rutas |
| Placeholders de recursos | PDFs faltantes causaban 404 | Creados archivos placeholder en `public/hackathon/docs/` |
| Metadata types missing | Error `Cannot find name 'Metadata'` en build | Importado `type { Metadata } from 'next'` en sub-páginas |
| Build failure `/api/chat` | Error en Edge Runtime por SDK de Groq | Instanciación movida dentro del handler `POST` |
| BobChat scroll hijacking | Scroll automático interrumpía navegación al escribir | Trigger cambiado a `messages.length` + `block: 'nearest'` |
| Native Registration Form | Mantenimiento de formulario y validación Zod complejo | Migrado a Google Forms con redirección automática en `/register` |
| Componentes obsoletos | `ApiDocsCard` y exports sin uso en el módulo de display del Hackathon | Componente eliminado y `index.ts` limpiado |
| Orange palette CSS vars | Variables `--orange-500`, `--orange-400`, `--orange-glow` no definidas | Agregadas a `app/globals.css` y `tailwind.config.ts` |
| `AhorraSectionHeader` sin estandarizar | Necesario componente estandarizado para sección de ahorro | Creado con props `marketTrend`, `isLive`, memoización |
| `AceptaBitcoinSectionHeader` faltante | Header para calculadora de pagos/conversiones | Creado con IntersectionObserver, chips financieros, badge realtime |
| `ArcadeButton` href required error | `Property 'href' is missing` en hackathon edition pages | Hecho `href` opcional para soportar tanto Link como button modes |
| Definición duplicada PARTNERS | Error de compilación: `PARTNERS` definido múltiples veces | Eliminado contenido duplicado en `data/partners.ts` (líneas 59-113) |

### Issues Abiertos

| Prioridad | Descripción |
|-----------|-------------|
| 🟡 Media | API de registro hackathon son stubs (no persisten datos) |
| 🟡 Media | Integración real de webhooks de Discord para registros |

---

## ⚠️ Referencia: Errores React UMD #425, #418, #423 y NotFoundError

### Códigos de Error y Causas Raíz

| Error | Significado | Causa Típica |
|-------|-------------|--------------|
| **#425** | Cannot insert component into DOM | SSR/CSR mismatch - estructura de árbol diferente entre servidor y cliente |
| **#418** | Cannot remove node at this time | Nodo DOM no existe o fue removido externamente |
| **#423** | Hydration mismatch | HTML del servidor no coincide con lo esperado por el cliente |
| **NotFoundError** | insertBefore/removeChild failed | Cascada por #423 - React intenta operar en nodo inexistente |

### Soluciones Implementadas

1. **React.memo → memo import** (`60ccb9a`):
   ```tsx
   // ❌ Incorrecto - causa error UMD global
   import React from 'react';
   const Memoized = React.memo(Component);
   
   // ✅ Correcto - import nombrado
   import { memo } from 'react';
   const Memoized = memo(Component);
   ```

2. **Tipos de metadata alignados** (`2496da6`):
   ```typescript
   // Agregado 'general' para consistencia SSR/CSR
   export interface BlinkInvoiceMetadata {
     service?: 'general' | 'consultoria' | 'curso' | 'diseno' | 'charla' | 'donacion';
   }
   ```

3. **Patrón isMounted para valores dinámicos**:
   ```tsx
   const [mounted, setMounted] = useState(false);
   useEffect(() => setMounted(true), []);
   // Render consistente tanto en SSR como CSR
   ```

### Prevenir Futuros Errores

- Usar siempre `memo` importado de React, nunca `React.memo`
- Evitar valores dinámicos (`new Date()`, `Math.random()`) en render sin guards
- Incluir `suppressHydrationWarning` solo cuando sea necesario y documentado
- Verificar que tipos TypeScript coincidan entre interfaces y esquemas Zod

---

## 📅 Actualizaciones Recientes - Mayo 2026 (Sesión de Pulido y Encerado)

Se realizó una revisión y refactorización profunda de los componentes clave:

### 1. Caja Registradora (TipJar) - Mayor evolución

- Renombrado conceptualmente de "TipJar" → "Caja Registradora AceptaBitcoin"
- Nueva UX alineada al funnel: Aprende → Ahorra → Acepta
- Diseño mejorado con fuerte identidad Matrix/Cypherpunk
- Colores dinámicos: Verde Matrix para SATS/Lightning y Naranja Bitcoin para USD
- Mejora en selección de servicios, montos preset y experiencia general
- Mejor integración con Blink.sv (Stablesats + On-chain)
- **Fix crítico de tipos**: Agregado `'general'` al enum de servicios y `expiresAt: string | null` en metadata

### 2. Backend de Pagos

**app/api/tipjar/route.ts:**
- Añadida validación con Zod
- Mejor manejo de errores y logging
- Respuestas más completas y consistentes

**lib/blink.ts:**
- Soporte real de Stablesats (lnUsdInvoiceCreate)
- Integración con precio actual de Binance (eliminado hardcode)
- **Agregado `'general'` a `BlinkInvoiceMetadata` interface y `SERVICE_LABELS`**
- Código más robusto y mantenible

### 3. Componentes de "Ahorra" y Mercado

- **PriceConverter.tsx**: Rediseño completo, mejor separación visual entre BTC-USD, BTC-MXN y SATS-MXN, más atractivo y coherente con el Design System.
- **MarketMoodWidget.tsx (DCA Oracle):**
  - Actualizado referral de AureoBitcoin (?ref=abo)
  - Restauradas caritas + mejor impacto visual
  - CTA más prominente y atractivo para el sponsor

### 4. B.O.B. Chat Widget

- Versión visualmente mucho más atractiva y "viva"
- Mejores efectos glow, espaciado, empty states y personalidad cypherpunk
- Mejora en animaciones y experiencia general

### 5. Fixes Técnicos Mayores

- **React.memo → memo**: Reemplazado `React.memo` por `memo` importado de React para resolver error UMD global en Next.js
- Todos los componentes ahora usan patrones correctos de hidratación SSR/CSR

### 6. Configuración y Mantenimiento

- Actualizado .env.example con Lightning Address correcto (aceptabitcoin@blink.sv) y mejor organización
- Alineación general con Design System "Bitcoin Matrix" (colores, tipografía, glassmorphism, scanlines, etc.)

**Estado actual:** Gran avance en pulido visual, consistencia de marca y experiencia de usuario. La Caja Registradora ya se siente como un producto soberano y profesional.

### 7. Actualizaciones finales de mayo 2026
- Eliminado Footer duplicado en `page.tsx` (manejado en layout)
- Restaurada estructura de producción del homepage con integración de MarketMood educativo y PartnersCarousel
- Corrección de imports y adición de props requeridos en layout
- Restaurada estructura site con Navbar, Footer, Bob Chat y Section Headers; integración de Educational MarketMood y PartnersCarousel
- Actualización de MarketMood a modo educativo y PartnersCarousel
- Alineación de Footer con DS v2.0, enlace Discord, eliminación de secciones muertas, optimización de tailwind
- Actualización de URLs de registro de hackathon en `.env.example` y en página
- Actualización de CTA de EditionHero a registro Luma
- Adición de guards de hidratación a Hero y GoogleFormButton per MANTENIMIENTO.md
- Adición de guards de hidratación a EditionHero per MANTENIMIENTO.md
- Documentación de fix de ArcadeButton href
- `ArcadeButton`: hecho `href` opcional para soportar tanto Link como button modes
- Actualización de páginas de edición de hackathon y TipJarSection
- Limpieza de formato y manejo de errores en TipJarSection
- Resolución de bloqueo de input controlado en campos de moneda
- Documentación de códigos de error React UMD (#425, #418, #423) y NotFoundError
- Actualización de MANTENIMIENTO.md con estado actual y recientes fixes
- Fijación de mismatches dinámicos de tiempo y fecha en PriceConverter usando `isMounted`
- Uso de `memo` import en lugar de `React.memo` para resolver error UMD global
- Integración de Blink.sv GraphQL API y fijación de mismatches de hidratación en flujo de pago
- Eliminación de prop `density` obsoleta y fijación de `string.getTime()` en CountdownTimer
- Resolución de errores React #425/#423 en CountdownTimer + MatrixRain
- Migración de hackathon de route group `(hackathon)` a flat `app/hackathon/`
- Eliminación de route group para mapear correctamente a `/hackathon`
- Implementación robusta de CountdownTimer
- Adición de página 404 personalizada
- Actualización de CTA de hero con enlace a eventos Luma
- Corrección de import predeterminado para MatrixRain y fijación de tipo `isActive`
- Resolución de errores de tipo enum Zod en esquema de validación
- Corrección de import predeterminado para Navbar y Footer en layout
- Resolución de advertencia TS posiblemente undefined en EditionHero

---

## 🔄 Últimos Commits Relevantes

| Hash | Mensaje |
|------|---------|
| `2252281` | feat(design-system): v2.1 — GSAP animations, terminal aesthetics & B.O.B. cypherpunk upgrade |
| `1a5c4b3` | feat(proveedores): directorio soberano v2.0 + rebrand ArcadeButton |
| `1cf8f6c` | refactor(tipjar): migrate to serverless blink POS architecture (v2.1) |
| `d8f857a` | docs: update documentation and finalize merchant onboarding form with Google Forms integration |
| `0ecc2a7` | fix: remove duplicate Footer from page.tsx (handled in layout) |
| `96cbae3` | feat: restore production homepage structure and integrate Educational MarketMood + PartnersCarousel |
| `e999651` | fix: correct imports for layout and add required props to components |
| `42e04da` | fix: restore site structure with Navbar, Footer, Bob Chat and Section Headers; integrate Educational MarketMood and PartnersCarousel |
| `5869bbe` | feat: update MarketMood to educational mode and integrate PartnersCarousel |
| `bccbcc1` | chore(ui): align Footer with DS v2.0, add Discord link, remove dead sections, optimize tailwind config |
| `516a676` | fix: update hackathon registration URLs in .env.example |
| `79c2263` | fix: update hackathon registration URLs (Hero CTA + Edition config) |
| `a9de1f3` | fix(hackathon): EditionHero CTA → Luma registration (kzdw3pek) |
| `c722423` | fix(hackathon): add hydration guards to Hero and GoogleFormButton per MANTENIMIENTO.md |
| `a5786f7` | fix(hackathon): add hydration guards to EditionHero per MANTENIMIENTO.md |
| `5aa9722` | docs: document ArcadeButton href fix in maintenance log |
| `a267cd5` | fix(ArcadeButton): make href optional to support both Link and button modes |
| `6668def` | feat: update hackathon edition pages and TipJarSection |
| `9f53ca5` | style(tipjar): cleanup formatting and error handling in TipJarSection |
| `7e5de69` | fix(oracle): resolve controlled input blocking on currency fields |
| `e8df9bb` | docs: document React UMD error codes (#425, #418, #423) and NotFoundError solutions |
| `acf8d30` | docs: update MANTENIMIENTO.md with current project state and recent fixes |
| `fd512d6` | fix(hydration): resolve dynamic time and date mismatches in PriceConverter using isMounted |
| `60ccb9a` | fix: use memo import instead of React.memo to resolve UMD global type error |

---

## 📦 Instalación Local

```bash
# 1. Clonar
git clone https://github.com/ScubaAI/aceptabitcoin-org.git
cd aceptabitcoin-org

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno
cp .env.example .env.local
# Editar .env.local con valores reales:
#   NEXT_PUBLIC_TIP_JAR_LN_ADDRESS=tu@wallet@blink.sv

# 4. Desarrollo
npm run dev
# → http://localhost:3000

# 5. Build de producción
npm run build
npm start

# 6. Limpiar caché Next.js (si hay errores de routing/hidratación)
rm -rf .next
npm run dev
```

---

## 🌐 Variables de Entorno

| Variable | Requerida | Descripción |
|----------|-----------|-------------|
| `NEXT_PUBLIC_TIP_JAR_LN_ADDRESS` | ✅ | Lightning address para el TipJar (ej. `user@blink.sv`) |
| `SENTRY_DSN` | Recomendada | DSN de Sentry para monitoreo de errores |
| `RESEND_API_KEY` | Opcional | API key de Resend para emails transaccionales |

---

*Documentación generada automáticamente. Actualizar tras cada deploy significativo.*