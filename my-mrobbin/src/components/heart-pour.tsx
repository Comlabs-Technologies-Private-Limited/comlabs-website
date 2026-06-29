"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Heart } from "lucide-react";
import { useMemo } from "react";

interface HeartPourProps {
  active: boolean;
}

const PARTICLE_COUNT = 20;

function seeded(seed: number) {
  const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
}

function buildParticles(count: number) {
  return Array.from({ length: count }, (_, i) => {
    const angle = seeded(i) * Math.PI * 2;
    const spread = 36 + seeded(i + 1) * 88;
    return {
      id: i,
      startX: Math.cos(angle) * spread * 0.25,
      endX: Math.cos(angle) * spread,
      endY: -(48 + seeded(i + 2) * 160),
      size: 7 + seeded(i + 3) * 13,
      rotation: (seeded(i + 4) - 0.5) * 40,
      endRotation: (seeded(i + 5) - 0.5) * 90,
      delay: seeded(i + 6) * 0.5,
      duration: 1.3 + seeded(i + 7) * 1,
      peakOpacity: 0.3 + seeded(i + 8) * 0.5,
    };
  });
}

export function HeartPour({ active }: HeartPourProps) {
  const reduceMotion = useReducedMotion();
  const particles = useMemo(() => buildParticles(PARTICLE_COUNT), []);

  if (!active || reduceMotion) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden rounded-3xl"
    >
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute left-1/2 top-[4.5rem] -translate-x-1/2"
          initial={{
            opacity: 0,
            x: p.startX,
            y: 0,
            scale: 0,
            rotate: p.rotation,
          }}
          animate={{
            opacity: [0, p.peakOpacity, p.peakOpacity * 0.55, 0],
            x: p.endX,
            y: p.endY,
            scale: [0, 1.05, 0.9, 0.35],
            rotate: p.endRotation,
          }}
          transition={{
            duration: p.duration,
            delay: 0.18 + p.delay,
            ease: [0.22, 1, 0.36, 1],
            times: [0, 0.1, 0.5, 1],
          }}
        >
          <Heart
            className="text-rausch"
            style={{ width: p.size, height: p.size }}
            fill="currentColor"
            fillOpacity={0.45}
            strokeWidth={1.5}
          />
        </motion.div>
      ))}
    </div>
  );
}
