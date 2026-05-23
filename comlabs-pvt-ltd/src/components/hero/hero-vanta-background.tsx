"use client";

import { useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";

const vantaFogOptions = {
  mouseControls: true,
  touchControls: false,
  gyroControls: false,
  minHeight: 200,
  minWidth: 200,
  highlightColor: 0xffffff,
  midtoneColor: 0x85bcfa,
  lowlightColor: 0xffffff,
  baseColor: 0xffffff,
  blurFactor: 0.56,
  speed: 0.9,
  zoom: 0.6,
} as const;

export function HeroVantaBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion || !containerRef.current) return;

    let effect: { destroy: () => void; resize?: () => void } | null = null;
    let cancelled = false;

    const clampCanvas = () => {
      const canvas = containerRef.current?.querySelector("canvas");
      if (!canvas) return;
      canvas.style.width = "100%";
      canvas.style.maxWidth = "100%";
      canvas.style.height = "100%";
      canvas.style.display = "block";
    };

    void (async () => {
      const THREE = await import("three");
      const FOG = (await import("vanta/dist/vanta.fog.min")).default;

      if (cancelled || !containerRef.current) return;

      effect = FOG({
        el: containerRef.current,
        THREE,
        ...vantaFogOptions,
      });

      clampCanvas();
      effect?.resize?.();
    })();

    const onResize = () => {
      clampCanvas();
      effect?.resize?.();
    };

    window.addEventListener("resize", onResize);

    return () => {
      cancelled = true;
      window.removeEventListener("resize", onResize);
      effect?.destroy();
    };
  }, [reduceMotion]);

  return (
    <div
      ref={containerRef}
      className="hero-vanta absolute inset-0 z-0 touch-pan-y overflow-hidden bg-white"
      aria-hidden
    />
  );
}
