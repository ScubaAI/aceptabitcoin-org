# 🕶️ Design System: "Bitcoin Matrix" (v2.0)

**Proyecto:** Acepta Bitcoin México  
**Estética:** Cyberpunk Bank meets The Matrix  
**Filosofía:** Sovereign Infrastructure, Terminal UI, High Contrast.

---

## 🎨 1. Paleta de Colores
El diseño se basa en un alto contraste sobre fondo negro puro, utilizando dos colores primarios para transmitir información y acción.

### Colores Base
*   **Fondo Principal:** `#000000` (Negro Puro). No usar grises oscuros (#111) como fondo base; solo para tarjetas.
*   **Texto General:** `#FAFAFA` (Casi Blanco).

### Paleta de Marca (HSL)
*(Estos valores deben estar configurados en `tailwind.config.ts` y `app/globals.css`)*

#### 1. Matrix Green (El "Código")
*   **Función:** Información técnica, datos, límites, bordes, estados del sistema, efectos "glow".
*   **Nombre CSS:** `var(--matrix)`
*   **Hex:** `#00FF41` (Verde Neon Puro)
*   **Uso:** 
    *   Textos técnicos (`text-matrix`).
    *   Bordes de inputs y tarjetas (`border-matrix`).
    *   Fondos sutiles (`bg-matrix/10`).
    *   Iconos de tecnología, maps, redes.

#### 2. Bitcoin Orange (La "Energía")
*   **Función:** Acciones principales, llamadas a la atención (CTA), dinero, valor.
*   **Nombre CSS:** `var(--bitcoin)`
*   **Hex:** `#F7931A` (Naranja Bitcoin Estándar)
*   **Uso:** 
    *   Botones principales (`.bg-bitcoin`).
    *   Precios (`text-bitcoin`).
    *   Acentos en títulos destacados.
    *   Estados de "Pago" o "Transacción".

#### 3. Semántica de Estado
*   **Online/Success:** Verde Matrix (`bg-matrix` + animación `animate-pulse`).
*   **Offline/Error:** Rojo estándar (`text-red-500`).
*   **Neutral/Loading:** Gris verdoso (`text-gray-400`).

---

## ⌨️ 2. Tipografía
El sistema utiliza tres fuentes distintas para crear jerarquía semántica (Institucional vs Técnico vs Retro).

1.  **IBM Plex Serif** (Institucional)
    *   **Función:** Títulos principales, autoridad, seriedad.
    *   **Clase:** `font-serif`
    *   **Uso:** H1, H2, Nombres de secciones.
    *   **Estilo:** Títulos grandes en blanco con drop-shadow sutil si están sobre fondos complejos.

2.  **Fira Code** (Técnica)
    *   **Función:** Datos, código, subtítulos, descripciones, "El Sistema".
    *   **Clase:** `font-mono`
    *   **Uso:** Párrafos de descripción, etiquetas de formulario, logs de sistema, precios técnicos.
    *   **Estilo:** Tamaño pequeño (`text-sm` o `text-xs`), color gris claro o verde matrix para destacar términos técnicos.

3.  **VT323** (Arcade/Retro)
    *   **Función:** Botones especiales, metadatos, sistema operativo.
    *   **Clase:** `font-vt323` (debe estar mapeada en `tailwind.config.ts`)
    *   **Uso:** El componente `<ArcadeButton />`. No usar en textos largos.

---

## 🖼️ 3. Efectos Visuales y UI

### Glassmorphism "Bunker"
Para tarjetas y contenedores flotantes (Navbar, Modals, Panels):
*   `className="bg-black/80 backdrop-blur-md border border-white/10"`

### Bordes y Luces (Glow)
*   **Bordes Sutiles:** `border-white/10` o `border-white/20`. Evitar bordes blancos sólidos (`border-white`).
*   **Bordes Activos:** `border-matrix/50` o `border-bitcoin/50`.
*   **Efecto Glow (Sombras):**
    *   Verde: `shadow-[0_0_15px_rgba(0,255,65,0.2)]`
    *   Naranja: `shadow-[0_0_20px_rgba(247,147,26,0.4)]`

### Fondos y Texturas
*   **Rejilla (Grid):** `bg-[radial-gradient(rgba(0,255,65,0.15)_1px,transparent_1px)] bg-[size:50px_50px]`
*   **Ruido (Noise):** Usar el SVG base64 definido en `globals.css` para dar textura de "viejo monitor" o "cine".

---

## 🧩 4. Componentes Clave

### El Navbar
*   **Logo:** Usar el componente `components/ui/Logo.tsx` (SVG Matrix).
*   **Fondo:** Transparente al tope, cambia a `bg-black/80 backdrop-blur-md` al hacer scroll (`isScrolled`).
*   **Links:** `font-mono`, color `text-gray-300`. Hover: `text-matrix` con subrayado animado.

### El Hero
*   **Título:** Serif grande.
*   **Cursor:** Bloque verde parpadeante (`animate-blink`).
*   **Botón CTA:** ArcadeButton (Naranja) o un botón secundario Matrix (Verde).

### Formularios (Onboarding)
*   **Inputs:** `bg-white/5 border-white/20 font-mono`.
*   **Focus:** Borde se vuelve `border-matrix` y aparece un anillo `ring-1 ring-matrix`.
*   **Labels:** `font-mono text-[10px] text-gray-500 uppercase`.

### Botones
*   **ArcadeButton:** Para acciones principales (Ir al Tianguis, Iniciar Sistema).
*   **Botones Estándar:** `bg-bitcoin text-black font-bold hover:bg-bitcoin/90`.
*   **Botones Fantasma:** `border border-matrix/30 text-matrix hover:bg-matrix/10`.

---

## 🚀 5. Reglas de Implementación para IA
1.  **Colores:**
    *   Si necesitas un color "cian" o "azul técnico": ÚSALO MAL. Cámbialo por `text-matrix` o `border-matrix`.
    *   Si necesitas resaltar una acción: Usa **Bitcoin Orange**.
    *   Si necesitas datos técnicos: Usa **Matrix Green**.
2.  **Imágenes:**
    *   Evita fotos en color natural. Aplica filtros: `grayscale group-hover:grayscale-0`.
    *   Si usas overlays, usa gradientes de negro a transparente para asegurar legibilidad del texto blanco.
3.  **Estructura de Archivos:**
    *   Componentes globales en `components/ui`.
    *   Secciones de página en `components/sections`.
    *   Estilos globales en `app/globals.css`.
4.  **Responsividad:**
    *   Fuentes Serif escalan bien en móviles (`text-4xl` -> `text-6xl`).
    *   En móviles, el menú es un Overlay pantalla completa (`fixed inset-0`).

---

## 📦 6. Dependencias Clave
*   **Styling:** Tailwind CSS.
*   **Icons:** Lucide React.
*   **Fonts:** Google Fonts (IBM Plex Serif, Fira Code, VT323).

**Última actualización:** Session 3 - Matrix Rebrand
