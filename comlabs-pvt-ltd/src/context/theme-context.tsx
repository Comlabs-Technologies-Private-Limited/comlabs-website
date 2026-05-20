"use client";

import { createContext, useContext } from "react";

type ThemeContextValue = {
  dark: boolean;
  setDark: (value: boolean) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({
  dark,
  setDark,
  children,
}: {
  dark: boolean;
  setDark: (value: boolean) => void;
  children: React.ReactNode;
}) {
  return (
    <ThemeContext.Provider value={{ dark, setDark }}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return ctx;
}
