"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { cn } from "@/lib/utils";

export type Theme = "light" | "dark";

type ThemeContextValue = {
  theme: Theme;
  resolvedTheme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

const STORAGE_KEY = "comlabs-home-theme";

type ThemeProviderProps = {
  children: ReactNode;
  /** Initial theme when no stored preference exists. */
  defaultTheme?: Theme;
  /** Locks theme; ignores storage and setTheme. */
  forcedTheme?: Theme;
  /** Persist preference in localStorage (homepage-only key). */
  enableStorage?: boolean;
  className?: string;
};

/**
 * Scopes theme to a wrapper via the `.dark` class so CSS variables apply
 * only under this tree — does not touch `<html>` / other routes.
 */
export function ThemeProvider({
  children,
  defaultTheme = "dark",
  forcedTheme,
  enableStorage = true,
  className,
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(forcedTheme ?? defaultTheme);

  useEffect(() => {
    if (forcedTheme) {
      setThemeState(forcedTheme);
      return;
    }
    if (!enableStorage) return;
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored === "light" || stored === "dark") {
        setThemeState(stored);
      }
    } catch {
      // ignore storage access errors
    }
  }, [enableStorage, forcedTheme]);

  const setTheme = useCallback(
    (next: Theme) => {
      if (forcedTheme) return;
      setThemeState(next);
      if (!enableStorage) return;
      try {
        window.localStorage.setItem(STORAGE_KEY, next);
      } catch {
        // ignore storage access errors
      }
    },
    [enableStorage, forcedTheme],
  );

  const resolvedTheme = forcedTheme ?? theme;

  const toggleTheme = useCallback(() => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  }, [resolvedTheme, setTheme]);

  const value = useMemo(
    () => ({
      theme: resolvedTheme,
      resolvedTheme,
      setTheme,
      toggleTheme,
    }),
    [resolvedTheme, setTheme, toggleTheme],
  );

  return (
    <ThemeContext.Provider value={value}>
      <div
        className={cn(
          "min-h-screen bg-background text-foreground antialiased",
          resolvedTheme === "dark" && "dark",
          className,
        )}
        data-theme={resolvedTheme}
        style={{ fontFamily: "var(--font-sans)" }}
      >
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return ctx;
}

export function useOptionalTheme(): ThemeContextValue | null {
  return useContext(ThemeContext);
}
