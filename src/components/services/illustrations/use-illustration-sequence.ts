"use client";

import { useEffect, useMemo, useState } from "react";

import { illustrationTiming } from "./illustration-tokens";

type SequenceOptions = {
  /** Total number of narrative steps, including the initial state. */
  steps: number;
  /** Frame is inside the viewport. */
  active: boolean;
  /** User prefers reduced motion — jump straight to the resolved state. */
  reduce: boolean;
  /** Milliseconds between steps, or per-step delays from 0→1, 1→2, … */
  stepMs?: number | readonly number[];
  startDelayMs?: number;
  /** When true, restart from step 0 after reaching the end. */
  loop?: boolean;
  /** Pause on the final step before looping. */
  loopDelayMs?: number;
};

/**
 * Advances an illustration through a narrative sequence.
 * By default it plays once and holds the final state; with `loop: true`
 * it rewinds after a short hold and repeats while the frame stays active.
 */
export function useIllustrationSequence({
  steps,
  active,
  reduce,
  stepMs = illustrationTiming.stepMs,
  startDelayMs = illustrationTiming.startDelayMs,
  loop = false,
  loopDelayMs = 1800,
}: SequenceOptions): number {
  const finalStep = Math.max(0, steps - 1);
  const [step, setStep] = useState(0);
  const [cycle, setCycle] = useState(0);
  const delayKey = useMemo(
    () => (typeof stepMs === "number" ? String(stepMs) : stepMs.join(",")),
    [stepMs],
  );

  useEffect(() => {
    if (reduce || !active) return;

    const delays = delayKey.includes(",")
      ? delayKey.split(",").map(Number)
      : Array.from({ length: finalStep }, () => Number(delayKey));

    const timers: ReturnType<typeof setTimeout>[] = [];
    setStep(0);

    let elapsed = startDelayMs;
    for (let index = 1; index <= finalStep; index += 1) {
      elapsed += delays[index - 1] ?? illustrationTiming.stepMs;
      timers.push(setTimeout(() => setStep(index), elapsed));
    }

    if (loop) {
      timers.push(
        setTimeout(() => {
          setCycle((prev) => prev + 1);
        }, elapsed + loopDelayMs),
      );
    }

    return () => {
      timers.forEach(clearTimeout);
    };
  }, [active, cycle, delayKey, finalStep, loop, loopDelayMs, reduce, startDelayMs]);

  return reduce ? finalStep : step;
}
