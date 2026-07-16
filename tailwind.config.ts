import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "./components/widgets/bob-chat/**/*.{ts,tsx}",
  ],

  prefix: "",
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "2rem",
        lg: "4rem",
        xl: "5rem",
        "2xl": "6rem",
      },
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        // 🟢 Design System Matrix v2.0 — Variables CSS
        matrix: "var(--matrix)",
        bitcoin: "var(--bitcoin)",
        
        // 🟠 Orange palette
        orange: {
          500: "var(--orange-500)",
          400: "var(--orange-400)",
          300: "var(--orange-300)",
        },
        
        // shadcn/ui variables (HSL)
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      
      // ✨ Glow utilities (Neon Shadows)
      boxShadow: {
        'matrix': '0 0 15px rgba(0,255,65,0.2)',
        'matrix-hover': '0 0 25px rgba(0,255,65,0.4), 0 0 50px rgba(0,255,65,0.2)',
        'matrix-strong': '0 0 40px rgba(0,255,65,0.6)',
        'bitcoin': '0 0 20px rgba(247,147,26,0.4)',
        'bitcoin-hover': '0 0 35px rgba(247,147,26,0.6)',
        'orange': '0 0 15px rgba(249,115,22,0.3)',
        'orange-hover': '0 0 25px rgba(249,115,22,0.5)',
        'terminal': '0 0 12px rgba(0,255,65,0.15)',
      },
      
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      
      // 🔤 CRITICAL FIX: Nombres exactos de variables de Next.js
      fontFamily: {
        // IBM Plex Serif -> --font-ibm-plex-serif
        serif: ["var(--font-ibm-plex-serif)", "serif"],
        // Fira Code -> --font-fira-code
        mono: ["var(--font-fira-code)", "monospace"],
        // VT323 -> --font-vt323
        vt323: ["var(--font-vt323)", "monospace"], 
        // Agregamos sans por si acaso usas font-sans en shadcn
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
      },
      
      // 🎬 Keyframes custom
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        scanline: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(200%)" },
        },
        tilt: {
          "0%, 50%, 100%": { transform: "rotate(0deg)" },
          "25%": { transform: "rotate(0.5deg)" },
          "75%": { transform: "rotate(-0.5deg)" },
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        loading: {
          "0%, 100%": { opacity: "0.3" },
          "50%": { opacity: "1" },
        },
        "ping-soft": {
          "75%, 100%": { transform: "scale(2)", opacity: "0" },
        },
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        // 🆕 Efecto holográfico para QR codes (TipJar)
        scan: {
          "0%": { 
            transform: "translateY(-100%)",
            opacity: "0"
          },
          "50%": {
            opacity: "1"
          },
          "100%": { 
            transform: "translateY(100%)",
            opacity: "0"
          },
        },
        // 🆕 Efecto de "mining" para bloques (Nuestra Historia)
        "mining-pulse": {
          "0%, 100%": {
            transform: "scale(1)",
            boxShadow: "0 0 15px rgba(0, 255, 65, 0.2)"
          },
          "50%": {
            transform: "scale(1.05)",
            boxShadow: "0 0 60px rgba(0, 255, 65, 0.8)"
          },
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        scanline: "scanline 3s linear infinite",
        tilt: "tilt 10s infinite linear",
        blink: "blink 1s step-end infinite",
        loading: "loading 1.5s ease-in-out infinite",
        "ping-soft": "ping-soft 1.2s cubic-bezier(0, 0, 0.2, 1) infinite",
        "fade-in": "fade-in 0.3s ease-out",
        // 🆕 Nuevas animaciones
        scan: "scan 2s ease-in-out infinite",
        "mining-pulse": "mining-pulse 0.6s ease-in-out",
        marquee: "marquee 25s linear infinite",
      },
      
      // 🎨 Background Utilities
      backgroundImage: {
        'matrix-grid': 'radial-gradient(rgba(0,255,65,0.03) 1px, transparent 1px)',
        'bitcoin-grid': 'radial-gradient(rgba(247,147,26,0.03) 1px, transparent 1px)',
        'noise': 'url("/noise.png")',
      },
      backgroundSize: {
        'grid-40': '40px 40px',
        'grid-50': '50px 50px',
      },
      
      // 🔦 Drop Shadows (Neon text glow)
      dropShadow: {
        'matrix': '0 0 8px rgba(0,255,65,0.5)',
        'bitcoin': '0 0 8px rgba(247,147,26,0.5)',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;