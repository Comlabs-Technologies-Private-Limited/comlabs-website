"use client";

import { useEffect, useRef } from "react";

/** Tailwind `blue-600` → rgb(2, 81, 249) */
const BLUE_600_RGB = "2,81,249";

type Line = {
  y: number;
  phase: number;
  amplitude: number;
  frequency: number;
  width: number;
};

function createLines(): Line[] {
  const count = 24;
  return Array.from({ length: count }, (_, i) => ({
    y: (i / count) * 400 + Math.random() * 8,
    phase: Math.random() * Math.PI * 2,
    amplitude: 12 + Math.random() * 28,
    frequency: 0.003 + Math.random() * 0.009,
    width: 0.5 + Math.random() * 0.5,
  }));
}

export function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const linesRef = useRef<Line[]>(createLines());

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let frame = 0;
    let drift = 0;

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = parent.clientWidth;
      const h = parent.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    const parentEl = canvas.parentElement;
    const ro = new ResizeObserver(resize);
    if (parentEl) ro.observe(parentEl);

    const tick = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      const alpha = 0.1;

      ctx.clearRect(0, 0, w, h);
      drift -= 0.15;

      for (const line of linesRef.current) {
        ctx.beginPath();
        ctx.lineWidth = line.width;
        const baseY = (line.y / 400) * h;
        for (let x = 0; x <= w; x += 2) {
          const wave =
            Math.sin(x * line.frequency + line.phase + drift * 0.02) * line.amplitude;
          const y = baseY + wave * (h / 500);
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = `rgba(${BLUE_600_RGB},${alpha})`;
        ctx.stroke();
      }

      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frame);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-0 h-full w-full"
      aria-hidden
    />
  );
}
