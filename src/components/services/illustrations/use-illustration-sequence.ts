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
};

/**
 * Advances an illustration through a finite narrative sequence and then stops.
 * With a once-in-view frame the finished state is held; the sequence only
 * rewinds if the illustration unmounts.
 */
export function useIllustrationSequence({
  steps,
  active,
  reduce,
  stepMs = illustrationTiming.stepMs,
  startDelayMs = illustrationTiming.startDelayMs,
}: SequenceOptions): number {
  const finalStep = Math.max(0, steps - 1);
  const [step, setStep] = useState(0);
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
    let elapsed = startDelayMs;
    for (let index = 1; index <= finalStep; index += 1) {
      elapsed += delays[index - 1] ?? illustrationTiming.stepMs;
      timers.push(setTimeout(() => setStep(index), elapsed));
    }

    return () => {
      timers.forEach(clearTimeout);
    };
  }, [active, delayKey, finalStep, reduce, startDelayMs]);

  return reduce ? finalStep : step;
}
