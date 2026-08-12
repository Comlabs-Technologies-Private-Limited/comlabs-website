"use client";

import { useEffect, useState } from "react";

import { illustrationTiming } from "./illustration-tokens";

type SequenceOptions = {
  /** Total number of narrative steps, including the initial state. */
  steps: number;
  /** Frame is inside the viewport. */
  active: boolean;
  /** User prefers reduced motion — jump straight to the resolved state. */
  reduce: boolean;
  stepMs?: number;
  startDelayMs?: number;
};

/**
 * Advances an illustration through a finite narrative sequence and then stops.
 * The sequence resets when the frame leaves the viewport so it replays on
 * re-entry instead of looping continuously in the background.
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

  useEffect(() => {
    if (reduce || !active) return;

    const timers: ReturnType<typeof setTimeout>[] = [];
    for (let index = 1; index <= finalStep; index += 1) {
      timers.push(
        setTimeout(() => setStep(index), startDelayMs + index * stepMs),
      );
    }

    // Rewind on teardown so the sequence replays on the next viewport entry.
    return () => {
      timers.forEach(clearTimeout);
      setStep(0);
    };
  }, [active, finalStep, reduce, startDelayMs, stepMs]);

  return reduce ? finalStep : step;
}
