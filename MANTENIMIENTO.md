# 🔧 MANTENIMIENTO — Acepta Bitcoin México

**Proyecto:** Acepta Bitcoin México (Oracle System v2.0)
**Última actualización:** Abril 2026
**Stack:** Next.js 14 + TypeScript + Tailwind CSS + shadcn/ui

---

## 📁 Estructura de Archivos

```
aceptabitcoin-org/
├── app/                          # Next.js App Router (rutas)
│   ├── (site)/                   # Grupo de rutas del sitio principal
│   │   ├── page.tsx              # Homepage (Oracle v2.0)
│   │   ├── aprende/              # Labs educativos (Tron Style)
│   │   ├── crea-tu-tienda/       # Formulario de registro
│   │   ├── mapa/                 # BTC Map integration
│   │   ├── proyectos/            # Showcase de proyectos
│   │   └── tianguis/             # Nostr + Lightning Marketplace
│   ├── agenda/                   # Cal.com booking (iframe)
│   ├── api/                      # API routes (proxy, webhooks)
│   │   └── tipjar/               # Blink API proxy
│   ├── nuestra-historia/         # Historia del proyecto
│   ├── proveedores/              # Directorio de proveedores
│   └── globals.css               # Estilos globales + Tailwind
│
├── components/                   # Componentes React
│   ├── badges/                   # Badges reutilizables
│   │   ├── StatusBadge.tsx       # Semáforo 🟢🟡🔴
│   │   └── TierBadge.tsx         # Tier de proveedor
│   ├── cards/                    # Tarjetas reutilizables
│   │   ├── ProjectCard.tsx       # Tarjeta de proyecto
│   │   ├── ProjectSkeleton.tsx   # Skeleton de proyecto
│   │   ├── ProviderCard.tsx      # Tarjeta de proveedor
│   │   └── ProviderSkeleton.tsx  # Skeleton de proveedor
│   ├── embeds/                   # Embeds de terceros
│   │   └── CalComEmbed.tsx       # Cal.com (legacy, usar iframe)
│   ├── filters/                  # Filtros de UI
│   │   ├── CategoryFilter.tsx    # Filtro por categoría
│   │   └── TypeFilter.tsx        # Filtro por tipo
│   ├── layout/                   # Layout global
│   │   ├── Navbar.tsx            # Navegación
│   │   └── Footer.tsx            # Pie de página
│   ├── sections/                 # Secciones de página
│   │   ├── TipJarSection.tsx     # Donaciones Blink
│   │   └── ...                   # Otras secciones
│   ├── ui/                       # UI Kit (shadcn + custom)
│   │   ├── MatrixRain.tsx        # Efecto código cayendo
│   │   ├── card.tsx              # Card base (shadcn)
│   │   ├── button.tsx            # Button base (shadcn)
│   │   └── ...                   # Otros componentes shadcn
│   └── widgets/                  # Widgets reutilizables
│       └── MarketMoodWidget.tsx  # Indicador de mercado
│
├── data/                         # Datos estáticos (JSON)
│   ├── proveedores.json          # Directorio de proveedores
│   └── proyectos.json            # Showcase de proyectos
│
├── hooks/                        # Custom React hooks
│   └── useMarketMood.ts          # Hook para Market Mood
│
├── lib/                          # Utilidades y clientes
│   ├── market/                   # Clientes de mercado
│   │   └── binance.ts            # Binance API + Stochastic
│   ├── proveedores.ts            # Tipos y utilidades
│   ├── proyectos.ts              # Tipos y utilidades
│   └── utils.ts                  # Helpers (cn, etc.)
│
├── public/                       # Assets estáticos
│   ├── proveedores/              # Logos de proveedores
│   └── proyectos/                # Imágenes de proyectos
│
├── docs/                         # Documentación
│   └── DEPLOYMENT.md             # Guía de deploy
│
├── design-system.md              # Design System Bitcoin Matrix
├── MANTENIMIENTO.md              # ESTE ARCHIVO
└── .env.example                  # Variables de entorno
```

---

## 🎨 Design System

**NO agregar colores cyan/azul.** Usar exclusivamente:

| Token | Hex | Uso |
|-------|-----|-----|
| `matrix` | `#00FF41` | Datos técnicos, info, bordes activos |
| `bitcoin` | `#F7931A` | CTAs, precios, acciones principales |
| `bg-black` | `#000000` | Fondo base (puro, no #111) |
| `text-white` | `#FAFAFA` | Texto general |

**Tipografía:**
- **IBM Plex Serif** — Títulos, autoridad institucional
- **Fira Code** — Datos, código, descripciones técnicas
- **VT323** — Botones arcade, metadatos, sistema

Ver `design-system.md` para detalles completos.

---

## ➕ CÓMO AGREGAR PROVEEDORES

### 1. Editar `data/proveedores.json`

Agregar objeto JSON con esta estructura:

```json
{
  "id": "nombre-unico-kebab-case",
  "nombre": "Nombre del Negocio",
  "categoria": "exchange" | "logistica" | "educacion" | "comercio" | "servicios" | "tecnologia",
  "tier": "patrocinador" | "partner" | "miembro",
  "descripcion": "Descripción completa del negocio...",
  "descripcionCorta": "Tagline de una línea...",
  "url": "https://...",
  "urlReferido": "https://...?ref=aceptabitcoin",
  "logo": "/proveedores/nombre.svg",
  "ubicacion": "Ciudad, Estado",
  "tags": ["tag1", "tag2", "tag3"],
  "destacado": true | false
}
```

### 2. Agregar logo

Colocar archivo SVG en `public/proveedores/nombre.svg`

### 3. Reglas

- `id` debe ser único, kebab-case
- `urlReferido` solo si tienen programa de referidos
- `tier`: patrocinadores van primero automáticamente
- `destacado: true` solo para patrocinadores destacados
- Máximo 5 tags por proveedor

---

## ➕ CÓMO AGREGAR PROYECTOS

### 1. Editar `data/proyectos.json`

Agregar objeto JSON:

```json
{
  "id": "nombre-unico-kebab-case",
  "nombre": "Nombre del Proyecto",
  "tipo": "interno" | "comunidad",
  "descripcion": "Descripción completa...",
  "descripcionCorta": "Tagline de una línea...",
  "url": "https://..." | null,
  "repoUrl": "https://github.com/...",
  "logo": "/proyectos/nombre.svg",
  "imagen": "/proyectos/nombre-preview.jpg",
  "stack": ["Next.js", "Bitcoin", "Lightning"],
  "estado": "active" | "development" | "abandoned",
  "hackathon": {
    "evento": "Hackathon Bitcoin México 2026",
    "lugar": "winner" | "second" | "third",
    "año": 2026
  },
  "equipo": [
    { "nombre": "Nombre Equipo", "rol": "Equipo", "ubicacion": "Ciudad" }
  ],
  "features": ["Feature 1", "Feature 2"],
  "metricas": [
    { "label": "Métrica", "valor": "123" }
  ],
  "review": {
    "fortalezas": ["Fortaleza 1", "Fortaleza 2"],
    "oportunidades": ["Oportunidad 1"],
    "impacto": "Frase de impacto del proyecto..."
  },
  "fecha": "2026-04-27"
}
```

### 2. Agregar assets

- Logo SVG en `public/proyectos/nombre.svg`
- Preview JPG/PNG en `public/proyectos/nombre-preview.jpg`

### 3. Reglas

- `tipo`: "interno" = hecho por nosotros, "comunidad" = hecho por otros
- `estado`: manual, actualizar según actividad del repo
- `hackathon`: opcional, solo para proyectos de hackathon
- `url`: null si aún no está en producción
- `fecha`: ISO 8601, ordena automáticamente (más reciente primero)

---

## 🔄 CÓMO ACTUALIZAR ESTADO DE PROYECTOS (SEMÁFORO)

El semáforo es **manual**. Para actualizar:

1. Editar `data/proyectos.json`
2. Cambiar campo `estado`:
   - `"active"` — Proyecto en producción, mantenido activamente
   - `"development"` — En construcción, repo activo
   - `"abandoned"` — Sin commits >6 meses, pausado
3. Commit con mensaje: `chore(proyectos): update status of [nombre]`

**Revisión trimestral recomendada.**

---

## 💰 CÓMO CONFIGURAR EL TIPJAR

### Variables de entorno (`.env.local`):

```env
BLINK_API_KEY=tu_api_key_de_blink
NEXT_PUBLIC_BLINK_LIGHTNING_ADDRESS=tu-handle@blink.sv
NEXT_PUBLIC_BLINK_HANDLE=tu-handle
```

### Cambiar dirección Lightning:

En `components/sections/TipJarSection.tsx`:
```typescript
const LIGHTNING_ADDRESS = "tu-handle@blink.sv";
const BLINK_HANDLE = "tu-handle";
```

---

## 📊 CÓMO FUNCIONA EL MARKET MOOD

### Datos:
- Fuente: **Binance API** (sin API key, gratis)
- Par: **BTC/USDT**
- Polling: **30 segundos**
- Persistencia: **localStorage** (histórico de valores)

### Cálculo:
1. Fetch 300 velas OHLC de Binance
2. Calcular 28 stochastics con períodos 10, 20, 30... 280
3. Promediar los 28 valores → Heat Map Value
4. Clasificar: ≥80 sobrecompra, ≤25 dip, resto neutral

### Timeframes:
- `1h` — Horario (intradía)
- `4h` — 4 horas (swing)
- `1d` — Diario (tendencia)
- `1w` — Semanal (macro)

---

## 🚀 DEPLOY

### Requisitos:
- Node.js 18+
- pnpm o npm
- Cuenta Vercel (recomendado)

### Pasos:
```bash
# Instalar dependencias
pnpm install

# Desarrollo local
pnpm dev

# Build de producción
pnpm build

# Deploy en Vercel
vercel --prod
```

### Variables de entorno en Vercel:
- `BLINK_API_KEY` (producción)
- `NEXT_PUBLIC_BLINK_LIGHTNING_ADDRESS`
- `NEXT_PUBLIC_BLINK_HANDLE`

---

## 🐛 DEBUGGING COMÚN

### Error 418/423 (Hydration mismatch):
- Causa: Scripts de terceros manipulando DOM (Cal.com, etc.)
- Fix: Usar `dynamic` con `ssr: false` o iframes

### Market Mood no carga datos:
- Verificar conexión a internet
- Binance API puede rate-limitar en algunas regiones
- Revisar consola por errores CORS

### Proveedores/Proyectos no aparecen:
- Verificar que JSON sea válido (usar jsonlint.com)
- Revisar que imágenes existan en `public/`
- Verificar que `id` sea único

---

## 📝 CONVENCIONES DE CÓDIGO

### Commits:
```
feat(proveedores): add new exchange provider
fix(market): resolve Binance API timeout
chore(proyectos): update status of bob-hotel
docs(readme): update deployment instructions
```

### Nombres de archivos:
- Componentes: `PascalCase.tsx`
- Utilidades: `camelCase.ts`
- Datos: `kebab-case.json`

### Colores:
- NUNCA usar cyan/azul (`#22d3ee`, `#06B6D4`)
- SIEMPRE usar `matrix` o `bitcoin` tokens

---

## 🔮 ROADMAP SUGERIDO

### Corto plazo:
- [ ] Agregar más proveedores reales
- [ ] Completar datos de proyectos internos
- [ ] Integrar WebSocket para Market Mood real-time
- [ ] Agregar más indicadores técnicos (RSI, MACD)

### Mediano plazo:
- [ ] Sistema de blog/conteúdo (MDX)
- [ ] Newsletter con Nostr
- [ ] App móvil (PWA)
- [ ] Dashboard para proveedores

### Largo plazo:
- [ ] LNbits migration (cuando tengamos liquidez propia)
- [ ] Nostr relay propio
- [ ] DAO para gobernanza de la plataforma

---

## 📞 CONTACTO

**Equipo:** Acepta Bitcoin México
**Email:** hola@aceptabitcoin.org
**Nostr:** npub... (agregar)
**GitHub:** github.com/aceptabitcoin-org

---

> *"El código es poesía. La soberanía financiera es libertad."*
> — Acepta Bitcoin México
