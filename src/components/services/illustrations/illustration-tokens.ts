/**
 * Shared visual + motion tokens for the homepage service illustrations.
 * Values track the site CSS variables so the miniature interfaces read as
 * native Comlabs surfaces rather than generic SaaS artwork.
 */

export const illustrationColors = {
  surface: "#FFFFFF",
  /** Base panel fill — slightly translucent so the scenic backdrop stays present. */
  surfacePanel: "rgba(255, 255, 255, 0.94)",
  surfaceTranslucent: "rgba(255, 255, 255, 0.88)",
  surfaceMuted: "#F7F7F4",
  surfaceSunk: "#EFEFEA",
  surfaceWarm: "#FDF7EF",
  ink: "#1C1917",
  inkMuted: "#78716C",
  inkFaint: "#A8A29E",
  border: "rgba(28, 25, 23, 0.10)",
  borderStrong: "rgba(28, 25, 23, 0.20)",
  wire: "#D8D5D0",
  accent: "#C96442",
  accentSoft: "#F5E6DF",
  accentLine: "rgba(201, 100, 66, 0.42)",
} as const;

export const illustrationShadow = {
  /** Base interface panel resting on the scene. */
  panel:
    "0 1px 2px rgba(28,25,23,0.04), 0 10px 28px -14px rgba(28,25,23,0.20)",
  /** Foreground object that overlaps another panel. */
  raised:
    "0 2px 6px rgba(28,25,23,0.06), 0 20px 44px -18px rgba(28,25,23,0.28)",
  /** Chips, toasts and small floating controls. */
  chip: "0 1px 2px rgba(28,25,23,0.06)",
} as const;

export const illustrationRadius = {
  chip: 5,
  control: 7,
  panel: 10,
  device: 16,
} as const;

/** Site-wide easing — calm, mechanical, no overshoot. */
export const illustrationEase = [0.25, 0.1, 0, 1] as const;

export const illustrationTiming = {
  /** Sequences begin almost immediately so nothing sits in a holding state. */
  startDelayMs: 200,
  /** Gap between narrative steps — paced so each change is read before the next. */
  stepMs: 900,
  /** Standard element transition (marketing/explanatory). */
  transitionSec: 0.4,
  /** Status flips and in-place swaps — stay under 300ms. */
  feedbackSec: 0.2,
  /** Delay between staggered siblings. */
  staggerSec: 0.05,
} as const;

export const illustrationFade = {
  duration: illustrationTiming.transitionSec,
  ease: illustrationEase,
} as const;

export const illustrationSwap = {
  duration: illustrationTiming.feedbackSec,
  ease: illustrationEase,
} as const;

/**
 * Crossfade with a 2px blur so old/new states don't read as two overlapping
 * objects (Emil: blur masks imperfect transitions; transitions.dev skeleton reveal).
 */
export const illustrationBlurHidden = {
  opacity: 0,
  filter: "blur(2px)",
} as const;

export const illustrationBlurShown = {
  opacity: 1,
  filter: "blur(0px)",
} as const;

/** Status text swap — old exits up, new enters from below. */
export const illustrationTextSwapHidden = {
  opacity: 0,
  y: 4,
  filter: "blur(2px)",
} as const;

export const illustrationTextSwapShown = {
  opacity: 1,
  y: 0,
  filter: "blur(0px)",
} as const;

export const illustrationTextSwapExit = {
  opacity: 0,
  y: -4,
  filter: "blur(2px)",
} as const;

/** Chip / pill entrance. Never scale(0) — start from a visible 0.95. */
export const illustrationPopHidden = {
  opacity: 0,
  scale: 0.95,
  filter: "blur(2px)",
} as const;

export const illustrationPopShown = {
  opacity: 1,
  scale: 1,
  filter: "blur(0px)",
} as const;

/** Viewport trigger shared by every illustration frame. */
export const illustrationViewport = { amount: 0.4 } as const;
