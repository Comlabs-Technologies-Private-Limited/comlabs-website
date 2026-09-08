"use client";

import { AnimatePresence, motion } from "framer-motion";

import { AwsMark, CloudWatchMark, StripeMark } from "./brand-marks";
import { IllustrationStage, useIllustrationState } from "./service-illustration-frame";
import {
  illustrationColors,
  illustrationEase,
  illustrationSwap,
  illustrationTextSwapExit,
  illustrationTextSwapHidden,
  illustrationTextSwapShown,
} from "./illustration-tokens";
import { useIllustrationSequence } from "./use-illustration-sequence";

const EASE = illustrationEase;
const ink = illustrationColors.ink;
const inkMuted = illustrationColors.inkMuted;
const inkFaint = illustrationColors.inkFaint;
const border = illustrationColors.border;
const borderStrong = illustrationColors.borderStrong;
const surface = illustrationColors.surface;
const surfaceMuted = illustrationColors.surfaceMuted;
const accent = illustrationColors.accent;
const accentLine = illustrationColors.accentLine;
const health = illustrationColors.health;

/**
 * One incident travelling L1 → L4. Each entry is written into the ledger as
 * the rail reaches it, so the eye is led down the escalation in reading order.
 */
const ENTRIES = [
  {
    level: "L1",
    title: "Customer report",
    detail: "Checkout failures confirmed and triaged",
    at: "08:14",
    appearsAt: 0,
    doneAt: 1,
  },
  {
    level: "L2",
    title: "Pattern isolated",
    detail: "5xx spike traced to the payments service",
    at: "08:19",
    appearsAt: 1,
    doneAt: 2,
  },
  {
    level: "L3",
    title: "Engineering fix",
    detail: "Connection pool exhausted — patch deployed",
    at: "08:41",
    appearsAt: 2,
    doneAt: 4,
  },
  {
    level: "L4",
    title: "Specialist review",
    detail: "Capacity headroom signed off",
    at: "08:52",
    appearsAt: 4,
    doneAt: 5,
  },
] as const;

const RESOLVED_STEP = 5;

/** Square status tag — hairline and unfilled, matching the site's card system. */
function Tag({
  children,
  tone,
}: {
  children: React.ReactNode;
  tone: "accent" | "health" | "quiet";
}) {
  const color = tone === "accent" ? accent : tone === "health" ? health : inkFaint;
  const borderColor =
    tone === "accent" ? accentLine : tone === "health" ? "rgba(63,122,90,0.28)" : borderStrong;

  return (
    <span
      className="inline-flex shrink-0 items-center border px-1.5 py-[3px] text-[9px] leading-none font-medium tracking-[0.04em] whitespace-nowrap"
      style={{ borderRadius: 0, borderColor, color }}
    >
      {children}
    </span>
  );
}

function errorRate(step: number): string {
  if (step >= RESOLVED_STEP) return "0.3%";
  if (step >= 4) return "1.4%";
  if (step >= 3) return "3.8%";
  if (step >= 2) return "6.1%";
  return "8.2%";
}

export function ApplicationSupportIllustration() {
  const { active, reduce } = useIllustrationState();
  const step = useIllustrationSequence({
    steps: RESOLVED_STEP + 1,
    active,
    reduce,
    stepMs: [900, 1000, 1050, 950, 1000],
    startDelayMs: 420,
    loop: true,
    loopDelayMs: 2400,
  });

  const resolved = step >= RESOLVED_STEP;
  const rate = errorRate(step);

  return (
    <IllustrationStage className="p-0">
      <div className="flex h-full min-h-0 flex-col" style={{ background: surface }}>
        {/* Incident header */}
        <div
          className="flex shrink-0 items-center justify-between gap-3 border-b px-4 py-3 lg:px-5"
          style={{ borderColor: border }}
        >
          <div className="flex min-w-0 items-center gap-2.5">
            <motion.span
              className="size-[7px] shrink-0"
              aria-hidden
              style={{ background: resolved ? health : accent }}
              animate={reduce || resolved ? { opacity: 1 } : { opacity: [1, 0.35, 1] }}
              transition={
                reduce || resolved
                  ? { duration: 0 }
                  : { duration: 2.2, ease: "easeInOut", repeat: Infinity }
              }
            />
            <StripeMark className="h-3.5 w-3.5 shrink-0" />
            <p
              className="truncate text-[12px] font-medium tracking-tight"
              style={{ color: ink }}
            >
              INC-2481 · Payments API
            </p>
            <Tag tone={resolved ? "health" : "accent"}>
              {resolved ? "P1 · Resolved" : "P1 · Investigating"}
            </Tag>
          </div>
          <span
            className="shrink-0 text-[10px] tracking-tight tabular-nums"
            style={{ color: inkFaint }}
          >
            08:14 UTC
          </span>
        </div>

        {/* Escalation ledger */}
        <div className="flex min-h-0 flex-1 flex-col justify-center px-4 py-4 lg:px-5">
          {ENTRIES.map((entry, index) => {
            const visible = reduce || step >= entry.appearsAt;
            const isDone = reduce || step >= entry.doneAt;
            const isActive = visible && !isDone;
            const isLast = index === ENTRIES.length - 1;

            return (
              <motion.div
                key={entry.level}
                className="relative flex gap-3 pl-3"
                initial={false}
                animate={
                  visible
                    ? { opacity: 1, y: 0, filter: "blur(0px)" }
                    : { opacity: 0, y: 6, filter: "blur(2px)" }
                }
                transition={{ duration: reduce ? 0 : 0.42, ease: EASE }}
              >
                {/* Active marker — the same 2px accent edge the service tabs use. */}
                <motion.span
                  className="absolute top-0 bottom-0 left-0 w-[2px]"
                  aria-hidden
                  style={{ background: accent }}
                  initial={false}
                  animate={{ opacity: isActive ? 1 : 0 }}
                  transition={{ duration: reduce ? 0 : 0.28, ease: EASE }}
                />

                {/* Rail: square node, then the connector that fills on completion. */}
                <div className="relative flex w-3 shrink-0 justify-center">
                  {!isLast ? (
                    <>
                      <span
                        className="absolute top-[15px] bottom-0 w-px"
                        aria-hidden
                        style={{ background: border }}
                      />
                      <motion.span
                        className="absolute top-[15px] bottom-0 w-px origin-top"
                        aria-hidden
                        style={{ background: health }}
                        initial={false}
                        animate={{ scaleY: isDone ? 1 : 0 }}
                        transition={{ duration: reduce ? 0 : 0.55, ease: EASE }}
                      />
                    </>
                  ) : null}
                  <motion.span
                    className="absolute top-[6px] size-[7px] border"
                    aria-hidden
                    initial={false}
                    animate={{
                      background: isDone ? health : isActive ? accent : surface,
                      borderColor: isDone ? health : isActive ? accent : borderStrong,
                    }}
                    transition={{ duration: reduce ? 0 : 0.28, ease: EASE }}
                  />
                </div>

                <div className={`min-w-0 flex-1 ${isLast ? "" : "pb-5"}`}>
                  <div className="flex items-baseline gap-2.5">
                    <Tag tone={isDone ? "health" : isActive ? "accent" : "quiet"}>
                      {entry.level}
                    </Tag>
                    <p
                      className="truncate text-[12px] font-medium tracking-tight"
                      style={{ color: isActive || isDone ? ink : inkFaint }}
                    >
                      {entry.title}
                    </p>
                    <span
                      className="ml-auto shrink-0 text-[10px] tracking-tight tabular-nums"
                      style={{ color: inkFaint }}
                    >
                      {entry.at}
                    </span>
                  </div>
                  <p
                    className="mt-1 text-[11px] leading-relaxed tracking-tight"
                    style={{ color: inkMuted }}
                  >
                    {entry.detail}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Outcome strip */}
        <div
          className="grid shrink-0 grid-cols-2 border-t"
          style={{ borderColor: border, background: surfaceMuted }}
        >
          <div className="px-4 py-3 lg:px-5">
            <div className="flex items-center gap-1.5">
              <CloudWatchMark className="h-3 w-3" />
              <p className="text-[10px] tracking-tight" style={{ color: inkFaint }}>
                5xx rate
              </p>
            </div>
            <AnimatePresence mode="wait" initial={false}>
              <motion.p
                key={rate}
                initial={reduce ? false : illustrationTextSwapHidden}
                animate={illustrationTextSwapShown}
                exit={reduce ? undefined : illustrationTextSwapExit}
                transition={illustrationSwap}
                className="mt-1 text-[12px] font-medium tracking-tight tabular-nums"
                style={{ color: resolved ? health : accent }}
              >
                {resolved ? `8.2% → ${rate}` : rate}
              </motion.p>
            </AnimatePresence>
          </div>
          <div className="border-l px-4 py-3 lg:px-5" style={{ borderColor: border }}>
            <div className="flex items-center gap-1.5">
              <AwsMark className="h-3 w-3" />
              <p className="text-[10px] tracking-tight" style={{ color: inkFaint }}>
                Deployment
              </p>
            </div>
            <p
              className="mt-1 text-[12px] font-medium tracking-tight"
              style={{ color: step >= 4 ? health : inkMuted }}
            >
              {resolved ? "Verified" : step >= 3 ? "Rolling out" : "Pending"}
            </p>
          </div>
        </div>
      </div>
    </IllustrationStage>
  );
}
