"use client";

import type { CSSProperties, ReactNode } from "react";

import { cn } from "@/lib/utils";

import {
  illustrationColors,
  illustrationRadius,
  illustrationShadow,
} from "./illustration-tokens";

/** White interface panel — the base material for every illustration. */
export function Panel({
  children,
  className,
  style,
  elevation = "panel",
  radius = illustrationRadius.panel,
}: {
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
  elevation?: "panel" | "raised" | "flat";
  radius?: number;
}) {
  return (
    <div
      className={cn("border", className)}
      style={{
        background: illustrationColors.surfacePanel,
        borderColor: illustrationColors.border,
        borderRadius: radius,
        boxShadow:
          elevation === "flat" ? undefined : illustrationShadow[elevation],
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/** Uppercase micro-label used for section and stage names. */
export function MicroLabel({
  children,
  className,
  tone = "faint",
}: {
  children: ReactNode;
  className?: string;
  tone?: "faint" | "muted" | "accent";
}) {
  const color =
    tone === "accent"
      ? illustrationColors.accent
      : tone === "muted"
        ? illustrationColors.inkMuted
        : illustrationColors.inkFaint;

  return (
    <span
      className={cn(
        "block text-[8px] font-medium lg:text-[9.5px]",
        className,
      )}
      style={{ color }}
    >
      {children}
    </span>
  );
}

/** Small status pill. Always pairs colour with a text label. */
export function Chip({
  children,
  tone = "neutral",
  size = "default",
  className,
  style,
}: {
  children: ReactNode;
  tone?: "neutral" | "accent" | "quiet";
  size?: "default" | "compact";
  className?: string;
  style?: CSSProperties;
}) {
  const palette =
    tone === "accent"
      ? {
          background: illustrationColors.accentSoft,
          color: illustrationColors.accent,
          borderColor: "rgba(201, 100, 66, 0.20)",
        }
      : tone === "quiet"
        ? {
            background: illustrationColors.surfaceSunk,
            color: illustrationColors.inkFaint,
            borderColor: illustrationColors.border,
          }
        : {
            background: illustrationColors.surface,
            color: illustrationColors.inkMuted,
            borderColor: illustrationColors.border,
          };

  return (
    <span
      className={cn(
        "inline-flex items-center self-center border font-medium whitespace-nowrap",
        size === "compact"
          ? "gap-0.5 px-1 py-[2px] text-[6.5px] leading-none tracking-[0.02em] lg:text-[7.5px]"
          : "gap-1 px-1.5 py-[3px] text-[8px] leading-none lg:text-[9.5px]",
        className,
      )}
      style={{ borderRadius: illustrationRadius.chip, ...palette, ...style }}
    >
      {children}
    </span>
  );
}

/** Status dot — decorative reinforcement only; never the sole status signal. */
export function StatusDot({
  tone = "accent",
  className,
}: {
  tone?: "accent" | "muted" | "idle";
  className?: string;
}) {
  const background =
    tone === "accent"
      ? illustrationColors.accent
      : tone === "muted"
        ? illustrationColors.inkFaint
        : illustrationColors.wire;

  return (
    <span
      className={cn("inline-block h-1 w-1 shrink-0 rounded-full", className)}
      style={{ background }}
    />
  );
}

/** Neutral text placeholder bar used inside miniature layouts. */
export function Bar({
  width = "100%",
  height = 4,
  tone = "muted",
  className,
  style,
}: {
  width?: number | string;
  height?: number;
  tone?: "muted" | "strong" | "wire" | "accent";
  className?: string;
  style?: CSSProperties;
}) {
  const background =
    tone === "strong"
      ? "rgba(28,25,23,0.42)"
      : tone === "wire"
        ? illustrationColors.wire
        : tone === "accent"
          ? illustrationColors.accent
          : "rgba(28,25,23,0.14)";

  return (
    <span
      className={cn("block", className)}
      style={{
        width,
        height,
        borderRadius: 999,
        background,
        ...style,
      }}
    />
  );
}

/** Browser / window traffic-light dots. */
export function WindowDots() {
  return (
    <span className="flex items-center gap-[3px]">
      {[0, 1, 2].map((dot) => (
        <span
          key={dot}
          className="block h-[4px] w-[4px] rounded-full"
          style={{ background: "rgba(28,25,23,0.16)" }}
        />
      ))}
    </span>
  );
}

export function CheckGlyph({
  size = 8,
  color = illustrationColors.accent,
}: {
  size?: number;
  color?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden
      className="shrink-0"
    >
      <path
        d="M2.5 6.4 4.8 8.7 9.5 3.6"
        stroke={color}
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ArrowGlyph({
  size = 8,
  color = illustrationColors.inkFaint,
}: {
  size?: number;
  color?: string;
}) {
  return (
    <svg width={size} height={size} viewBox="0 0 12 12" fill="none" aria-hidden>
      <path
        d="M2.5 6h7M6.6 3.1 9.5 6l-2.9 2.9"
        stroke={color}
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
