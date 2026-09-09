"use client";

import dynamic from "next/dynamic";

import type { StudioShaderVariant } from "./studio-shader-panel";

/**
 * Framed slot for a shader panel. The frame is server-rendered so layout is
 * stable; the WebGL panel inside is client-only. Anything passed as children
 * is layered above the canvas — a glass illustration now, photography later.
 */
const StudioShaderPanel = dynamic(() => import("./studio-shader-panel"), {
  ssr: false,
});

type Props = {
  variant: StudioShaderVariant;
  tone?: "light" | "dark";
  seed?: number;
  className?: string;
  children?: React.ReactNode;
};

export function StudioShaderSlot({
  variant,
  tone = "light",
  seed = 0,
  className = "",
  children,
}: Props) {
  const border =
    tone === "dark"
      ? "border-[var(--studio-line-dark)]"
      : "border-[var(--studio-line)]";
  return (
    <div
      aria-hidden
      className={`studio-slot relative overflow-hidden border ${border} ${className}`}
    >
      <StudioShaderPanel variant={variant} tone={tone} seed={seed} />
      {children}
    </div>
  );
}
