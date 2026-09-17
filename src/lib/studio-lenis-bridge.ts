import type Lenis from "lenis";

let lenis: Lenis | null = null;

export function setStudioLenis(instance: Lenis | null): void {
  lenis = instance;
}

/** Pause Lenis while overlays (e.g. mobile nav) are open. */
export function setStudioScrollLocked(locked: boolean): void {
  if (!lenis) return;
  if (locked) lenis.stop();
  else lenis.start();
}
