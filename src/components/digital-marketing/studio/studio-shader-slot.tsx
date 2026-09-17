import type { ReactNode } from "react";

/**
 * Framed visual slot.
 *
 * These fields used to be one WebGL context each. They are now pure CSS —
 * layered gradients with a single compositor-driven drift — so the hero keeps
 * the page's only WebGL context and none of these run an animation loop.
 * The API is unchanged, so call sites and the glass cards layered over them
 * are untouched.
 */

export type StudioFieldVariant = "pixel" | "flow" | "scan";

type Props = {
  variant: StudioFieldVariant;
  tone?: "light" | "dark";
  /** Offsets the drift so neighbouring slots don't move in lockstep. */
  seed?: number;
  className?: string;
  children?: ReactNode;
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
      data-studio-media
      className={`studio-slot relative overflow-hidden border ${border} ${className}`}
    >
      <span
        className={`studio-field-${variant} absolute inset-0`}
        data-tone={tone}
        style={{ animationDelay: `${seed * -1.7}s` }}
      />
      {children}
    </div>
  );
}
