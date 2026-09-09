"use client";

import dynamic from "next/dynamic";

import type { StudioShaderVariant } from "./studio-shader-panel";

/**
 * Framed slot for a shader panel. The frame is server-rendered so layout is
 * stable; the WebGL panel inside is client-only. Photography will later be
 * layered over these slots, so the frame already reserves the aspect ratio.
 */
const StudioShaderPanel = dynamic(() => import("./studio-shader-panel"), {
  ssr: false,
});

type Props = {
  variant: StudioShaderVariant;
  tone?: "light" | "dark";
  seed?: number;
  className?: string;
};

export function StudioShaderSlot({
  variant,
  tone = "light",
  seed = 0,
  className = "",
}: Props) {
  const border =
    tone === "dark"
      ? "border-[var(--studio-line-dark)]"
      : "border-[var(--studio-line)]";
  return (
    <div
      aria-hidden
      className={`relative overflow-hidden border ${border} ${className}`}
    >
      <StudioShaderPanel variant={variant} tone={tone} seed={seed} />
    </div>
  );
}
