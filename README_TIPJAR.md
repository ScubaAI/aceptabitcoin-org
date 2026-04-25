# 💰 TipJar Module — Bitcoin Matrix Edition

## Overview

Módulo de donaciones para **Acepta Bitcoin México** integrado con la API de **Blink.sv**.
Soporta recepción de pagos en **BTC (sats)** y **Stablesats USD** vía Lightning Network y On-Chain.

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    TipJarSection.tsx                        │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐  │
│  │  Controls   │  │  QR Display │  │  MatrixRain Effect  │  │
│  │  (Client)   │  │  (Client)   │  │  (Canvas)           │  │
│  └──────┬──────┘  └──────┬──────┘  └─────────────────────┘  │
│         │                │                                   │
│         └────────────────┘                                   │
│                   │                                          │
│            /api/tipjar (Proxy)                               │
│                   │                                          │
│         Blink GraphQL API                                    │
└─────────────────────────────────────────────────────────────┘
```

## Files

| File | Purpose |
|------|---------|
| `app/api/tipjar/route.ts` | Proxy server seguro para comunicación con Blink |
| `components/sections/TipJarSection.tsx` | Componente principal del TipJar |
| `components/ui/MatrixRain.tsx` | Efecto de código cayendo (Matrix) |
| `lib/blink.ts` | Utilidades y tipos para la API de Blink |

## Setup

### 1. Configurar variables de entorno

Copia `.env.example` a `.env.local` y completa:

```bash
cp .env.example .env.local
```

Edita `.env.local`:
```env
BLINK_API_KEY=your_actual_blink_api_key
NEXT_PUBLIC_BLINK_LIGHTNING_ADDRESS=tu-handle@blink.sv
NEXT_PUBLIC_BLINK_HANDLE=tu-handle
```

### 2. Obtener tu API Key de Blink

1. Ve a [dashboard.blink.sv](https://dashboard.blink.sv)
2. Navega a **Settings → API Keys**
3. Genera una nueva API Key
4. Copia la key a tu `.env.local`

### 3. Obtener tu Lightning Address

Tu Lightning Address en Blink tiene el formato:
```
tu-numero-de-telefono@blink.sv
```
O si configuraste un username:
```
tu-username@blink.sv
```

## Features

### Currency Modes

| Modo | Descripción | Caso de Uso |
|------|-------------|-------------|
| **BTC (Sats)** | Bitcoin nativo en satoshis | Puristas, hodlers |
| **Stablesats USD** | Dólares sintéticos estables | Pagos recurrentes, nómina |

### QR Modes

| Modo | Tipo | Uso |
|------|------|-----|
| **Lightning Address** | LNURL estático | Impresos, redes sociales, reutilizable |
| **Invoice BOLT11** | Invoice dinámico | Monto exacto, una sola vez |
| **On-Chain** | Dirección Bitcoin | Montos grandes, backup |

### Visual Effects

- **Matrix Rain**: Código cayendo en canvas (caracteres japoneses + hex)
- **Scanline**: Línea de escaneo animada horizontal
- **Glow Effects**: Sombras neon en botones y QR
- **Glassmorphism Bunker**: Tarjetas con blur y bordes sutiles
- **Corner Accents**: Marcos de esquina estilo terminal

## API Operations

El proxy soporta estas operaciones GraphQL:

### `LnInvoiceCreate`
Genera un invoice Lightning en BTC (satoshis).

### `LnNoAmountInvoiceCreate`
Genera un invoice sin monto específico (el pagador elige).

### `LnUsdInvoiceCreate`
Genera un invoice Lightning denominado en satoshis que acredita a wallet USD.

### `OnChainAddressCurrent`
Obtiene la dirección on-chain actual del wallet.

### `Me`
Consulta balances y IDs de wallets.

## Security

- El API Key de Blink **nunca se expone al cliente**
- Todas las llamadas pasan por el proxy server (`/api/tipjar`)
- Whitelist de operaciones permitidas
- CORS headers configurados

## Customization

### Cambiar colores

Edita las clases Tailwind en `TipJarSection.tsx`:
- Bitcoin Orange: `text-bitcoin`, `bg-bitcoin`, `border-bitcoin`
- Matrix Green: `text-matrix`, `bg-matrix`, `border-matrix`

### Cambiar Lightning Address

Actualiza la constante en `TipJarSection.tsx`:
```typescript
const LIGHTNING_ADDRESS = "tu-direccion@blink.sv";
const BLINK_HANDLE = "tu-handle";
```

### Ajustar Matrix Rain

Props de `<MatrixRain />`:
- `speed`: Velocidad de caída (default: 1)
- `density`: Densidad de caracteres (default: 20)
- `opacity`: Opacidad base (default: 0.12)
- `color`: Color del código (default: `#00FF41`)

## Troubleshooting

### "Blink API key not configured"
Asegúrate de tener `BLINK_API_KEY` en `.env.local` y reinicia el servidor.

### "Operation not allowed"
La operación no está en la whitelist del proxy. Revisa `allowedOperations` en `route.ts`.

### QR no escanea
Verifica que el valor del QR sea válido. Para Lightning Address debe ser: `lightning:tu@blink.sv`

## Roadmap

- [ ] Webhook para confirmación de pagos en tiempo real
- [ ] Historial de donaciones (con Prisma)
- [ ] Meta tags OG para compartir Lightning Address
- [ ] Modo "Impresión" — QR limpio sin UI para flyers
