/** Shared full-bleed editorial hero overlay — matches Applied AI section. */
export const EDITORIAL_HERO_OVERLAY =
  "linear-gradient(180deg, rgba(28,25,23,0.72) 0%, rgba(28,25,23,0.82) 45%, rgba(28,25,23,0.9) 100%)";

/** Lighter overlay for warm, high-key service editorial photos — text stays top-left. */
export const EDITORIAL_HERO_OVERLAY_WARM =
  "linear-gradient(135deg, rgba(28,25,23,0.52) 0%, rgba(28,25,23,0.28) 48%, rgba(28,25,23,0.18) 100%)";

export const editorialHeroText = {
  eyebrow: "rgba(247,247,244,0.5)",
  title: "var(--background)",
  description: "rgba(247,247,244,0.62)",
  breadcrumb: "rgba(247,247,244,0.55)",
  breadcrumbCurrent: "rgba(247,247,244,0.92)",
  breadcrumbHover: "rgba(247,247,244,0.85)",
} as const;
