"use client";

import { Moon, Sun } from "lucide-react";
import type { MouseEventHandler } from "react";

import { useOptionalTheme } from "@/components/theme/theme-provider";
import { cn } from "@/lib/utils";

type ThemeToggleProps = {
  className?: string;
  dark?: boolean;
  onMouseEnter?: MouseEventHandler<HTMLButtonElement>;
};

/** Renders only inside ThemeProvider (homepage). Hidden on other routes. */
export function ThemeToggle({ className, dark, onMouseEnter }: ThemeToggleProps) {
  const theme = useOptionalTheme();
  if (!theme) return null;

  const isDark = theme.resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={theme.toggleTheme}
      onMouseEnter={onMouseEnter}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className={cn(
        "inline-flex h-9 w-9 items-center justify-center rounded-full transition-[background-color,color] duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
        "focus-visible:outline-none focus-visible:ring-2",
        dark ?? isDark
          ? "text-[#F4F2ED]/70 hover:bg-white/[0.08] hover:text-[#F4F2ED] focus-visible:ring-white/20"
          : "text-muted-foreground hover:bg-black/[0.045] hover:text-foreground focus-visible:ring-foreground/20",
        className,
      )}
    >
      {isDark ? <Sun size={16} aria-hidden /> : <Moon size={16} aria-hidden />}
    </button>
  );
}
