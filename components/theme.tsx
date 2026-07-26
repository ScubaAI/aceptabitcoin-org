"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type Theme = "matrix" | "bitcoin" | "ares" | "tron" | "clu" | "athena" | "aphrodite" | "poseidon";

interface ThemeContextValue {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function ThemeProvider({ children, defaultTheme = "matrix" as Theme }: { children: ReactNode; defaultTheme?: Theme }) {
  const [theme, setTheme] = useState<Theme>(defaultTheme);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    // Fallback for components used outside ThemeProvider
    return { theme: "matrix" as Theme, setTheme: () => {} };
  }
  return context;
}
