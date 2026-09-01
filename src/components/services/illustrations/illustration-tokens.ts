/**
 * Shared visual + motion tokens for the homepage service illustrations.
 * Values track the site CSS variables so the miniature interfaces read as
 * native Comlabs surfaces rather than generic SaaS artwork.
 */

export const illustrationColors = {
  surface: "#FFFFFF",
  /** Opaque panel fill — miniature UIs should read as real product chrome. */
  surfacePanel: "#FFFFFF",
  surfaceTranslucent: "rgba(255, 255, 255, 0.96)",
  surfaceMuted: "#FAFAF8",
  surfaceSunk: "#F4F4F0",
  surfaceWarm: "#FBF6F1",
  ink: "#1C1917",
  inkMuted: "#78716C",
  inkFaint: "#A8A29E",
  border: "rgba(28, 25, 23, 0.08)",
  borderStrong: "rgba(28, 25, 23, 0.12)",
  wire: "#E7E5E1",
  accent: "#C96442",
  accentSoft: "#F7EEE9",
  accentLine: "rgba(201, 100, 66, 0.28)",
  /** Health / success — AWS and ops states only. */
  health: "#3F7A5A",
  healthSoft: "#EAF3EE",
} as const;

export const illustrationShadow = {
  /** Resting product surface. */
  panel: "0 1px 2px rgba(28,25,23,0.04)",
  /** Foreground window — elevation only, not atmosphere. */
  raised: "0 1px 2px rgba(28,25,23,0.05), 0 10px 28px -18px rgba(28,25,23,0.18)",
  /** Unused for chips; kept so existing elevation keys stay valid. */
  chip: "0 1px 1px rgba(28,25,23,0.04)",
} as const;

export const illustrationRadius = {
  chip: 6,
  control: 8,
  panel: 12,
  device: 16,
} as const;

/** Site-wide easing — calm, mechanical, no overshoot. */
export const illustrationEase = [0.25, 0.1, 0, 1] as const;

export const illustrationSpring = {
  micro: { type: "spring" as const, stiffness: 420, damping: 34, mass: 0.55 },
  panel: { type: "spring" as const, stiffness: 280, damping: 30, mass: 0.8 },
  island: { type: "spring" as const, stiffness: 340, damping: 28, mass: 0.7 },
  sheet: { type: "spring" as const, stiffness: 380, damping: 32, mass: 0.75 },
} as const;

export const illustrationTiming = {
  /** Sequences begin almost immediately so nothing sits in a holding state. */
  startDelayMs: 180,
  /** Gap between narrative steps — paced so each change is read before the next. */
  stepMs: 520,
  /** Standard element transition (marketing/explanatory). */
  transitionSec: 0.38,
  /** Status flips and in-place swaps — stay under 300ms. */
  feedbackSec: 0.2,
  /** Delay between staggered siblings. */
  staggerSec: 0.06,
  hoverSec: 0.16,
  rowSec: 0.26,
  panelSec: 0.38,
} as const;

export const illustrationFade = {
  duration: illustrationTiming.transitionSec,
  ease: illustrationEase,
} as const;

export const illustrationSwap = {
  duration: illustrationTiming.feedbackSec,
  ease: illustrationEase,
} as const;

export const illustrationHover = {
  duration: illustrationTiming.hoverSec,
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

/** Viewport trigger shared by every illustration frame. Play once, then hold. */
export const illustrationViewport = { amount: 0.2, once: true } as const;
