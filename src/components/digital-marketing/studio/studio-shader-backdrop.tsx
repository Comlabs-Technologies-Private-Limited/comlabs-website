"use client";

import dynamic from "next/dynamic";

import type { StudioShaderVariant } from "./studio-shader-panel";

const StudioShaderPanel = dynamic(() => import("./studio-shader-panel"), {
  ssr: false,
});

type Props = {
  variant: StudioShaderVariant;
  tone?: "light" | "dark";
  seed?: number;
};

/**
 * Full-bleed shader behind a section. Sits under the content at low opacity
 * with a paper fade at the top and bottom edges so it never hard-cuts against
 * the neighbouring sections. Decorative only.
 */
export function StudioShaderBackdrop({
  variant,
  tone = "light",
  seed = 0,
}: Props) {
  return (
    <div
      aria-hidden
      className="studio-backdrop pointer-events-none absolute inset-0 -z-20"
    >
      <StudioShaderPanel variant={variant} tone={tone} seed={seed} />
    </div>
  );
}
