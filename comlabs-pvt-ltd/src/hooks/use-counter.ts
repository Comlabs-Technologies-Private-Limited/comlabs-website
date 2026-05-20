"use client";

import { useEffect, useState } from "react";

export function useCounter(target: number, enabled: boolean, durationMs = 1500) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!enabled) return;

    let start: number | null = null;
    let frame = 0;

    const step = (t: number) => {
      if (start === null) start = t;
      const elapsed = t - start;
      const p = Math.min(elapsed / durationMs, 1);
      setValue(Math.floor(p * target));
      if (p < 1) {
        frame = requestAnimationFrame(step);
      }
    };

    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [enabled, target, durationMs]);

  return value;
}
