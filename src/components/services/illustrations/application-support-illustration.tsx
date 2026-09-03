"use client";

import { AnimatePresence, motion } from "framer-motion";

import {
  AwsMark,
  CloudWatchMark,
  CopilotMark,
  RdsMark,
  SlackMark,
  StripeMark,
} from "./brand-marks";
import { Chip, DrawnCheck, Panel } from "./illustration-primitives";
import { IllustrationStage, useIllustrationState } from "./service-illustration-frame";
import {
  illustrationColors,
  illustrationEase,
  illustrationShadow,
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
const accentSoft = illustrationColors.accentSoft;
const accentLine = illustrationColors.accentLine;
const health = illustrationColors.health;
const healthSoft = illustrationColors.healthSoft;

type StageState = "done" | "active" | "idle";

const STAGES = [
  {
    id: "L1",
    title: "Customer report",
    detail: "Confirmed",
    doneAt: 2,
    activeAt: 1,
    Mark: SlackMark,
  },
  {
    id: "L2",
    title: "API pattern",
    detail: "Isolated",
    doneAt: 3,
    activeAt: 2,
    Mark: CloudWatchMark,
  },
  {
    id: "L3",
    title: "Pool fix",
    detail: "Deployed",
    doneAt: 5,
    activeAt: 3,
    Mark: AwsMark,
  },
  {
    id: "L4",
    title: "Specialist",
    detail: "Standby",
    doneAt: 6,
    activeAt: 5,
    Mark: CopilotMark,
  },
] as const;

function stageState(step: number, activeAt: number, doneAt: number): StageState {
  if (step >= doneAt) return "done";
  if (step >= activeAt) return "active";
  return "idle";
}

function errorRate(step: number, reduce: boolean): string {
  if (reduce || step >= 5) return "0.3%";
  if (step >= 4) return "1.4%";
  if (step >= 3) return "3.8%";
  if (step >= 2) return "6.1%";
  return "8.2%";
}

export function ApplicationSupportIllustration() {
  const { active, reduce } = useIllustrationState();
  const step = useIllustrationSequence({
    steps: 7,
    active,
    reduce,
    stepMs: [700, 780, 820, 900, 860, 720],
    startDelayMs: 420,
    loop: true,
    loopDelayMs: 2000,
  });

  const investigating = step < 5;
  const rate = errorRate(step, Boolean(reduce));
  const rateImproved = step >= 5 || reduce;

  return (
    <IllustrationStage className="p-0">
      <Panel
        className="flex h-full min-h-0 flex-col overflow-hidden border-0"
        elevation="flat"
        radius={0}
        style={{ background: surface }}
      >
        {/* Incident header */}
        <div
          className="flex shrink-0 items-center justify-between gap-2 border-b px-3 py-2.5 lg:px-4"
          style={{ borderColor: border }}
        >
          <div className="flex min-w-0 items-center gap-2">
            <motion.span
              className="relative flex size-2.5 shrink-0"
              aria-hidden
              animate={
                reduce || !investigating
                  ? { opacity: 1 }
                  : { opacity: [1, 0.45, 1], scale: [1, 1.15, 1] }
              }
              transition={
                reduce || !investigating
                  ? { duration: 0 }
                  : { duration: 1.8, ease: "easeInOut", repeat: Infinity }
              }
            >
              <span
                className="absolute inset-0 rounded-full"
                style={{ background: investigating ? accent : health }}
              />
            </motion.span>
            <StripeMark className="h-3 w-3 shrink-0 lg:h-3.5 lg:w-3.5" />
            <div className="min-w-0">
              <p
                className="truncate text-[10px] font-medium tracking-tight lg:text-[11px]"
                style={{ color: ink }}
              >
                INC-2481 · Payments API
              </p>
            </div>
            <Chip tone={investigating ? "accent" : "health"} size="compact">
              {investigating ? "P1 · Investigating" : "P1 · Resolved"}
            </Chip>
          </div>
          <span
            className="shrink-0 text-[9px] tracking-tight tabular-nums lg:text-[10px]"
            style={{ color: inkFaint }}
          >
            08:14 UTC
          </span>
        </div>

        {/* Horizontal escalation timeline */}
        <div className="flex min-h-0 flex-1 flex-col justify-center px-3 py-3 lg:px-4">
          <div className="relative flex items-start justify-between gap-1">
            {/* Progress rail */}
            <div
              className="pointer-events-none absolute top-[11px] right-4 left-4 h-px lg:top-[12px]"
              style={{ background: borderStrong }}
              aria-hidden
            />
            <motion.div
              className="pointer-events-none absolute top-[11px] left-4 h-px origin-left lg:top-[12px]"
              style={{ background: health, maxWidth: "calc(100% - 2rem)" }}
              initial={false}
              animate={{
                width: reduce
                  ? "100%"
                  : step >= 5
                    ? "100%"
                    : step >= 3
                      ? "66%"
                      : step >= 2
                        ? "33%"
                        : step >= 1
                          ? "12%"
                          : "0%",
              }}
              transition={{ duration: reduce ? 0 : 0.7, ease: EASE }}
              aria-hidden
            />

            {STAGES.map((stage) => {
              const state = reduce
                ? stage.id === "L4"
                  ? "idle"
                  : "done"
                : stageState(step, stage.activeAt, stage.doneAt);
              const isActive = state === "active";
              const isDone = state === "done";

              return (
                <div
                  key={stage.id}
                  className="relative z-[1] flex w-[22%] flex-col items-center text-center"
                >
                  <motion.div
                    className="flex size-5 items-center justify-center rounded-full border lg:size-6"
                    style={{
                      background: isDone
                        ? healthSoft
                        : isActive
                          ? accentSoft
                          : surface,
                      borderColor: isDone
                        ? "rgba(63,122,90,0.28)"
                        : isActive
                          ? accentLine
                          : borderStrong,
                      boxShadow: isActive
                        ? `0 0 0 3px ${accentSoft}, ${illustrationShadow.panel}`
                        : "none",
                    }}
                    animate={
                      isActive && !reduce
                        ? { scale: [1, 1.06, 1] }
                        : { scale: 1 }
                    }
                    transition={
                      isActive && !reduce
                        ? { duration: 2.2, ease: "easeInOut", repeat: Infinity }
                        : { duration: 0.28, ease: EASE }
                    }
                  >
                    {isDone ? (
                      <DrawnCheck show size={10} reduce={Boolean(reduce)} />
                    ) : (
                      <stage.Mark className="h-2.5 w-2.5 lg:h-3 lg:w-3" />
                    )}
                  </motion.div>
                  <p
                    className="mt-1.5 text-[7px] font-medium tracking-tight lg:text-[8px]"
                    style={{ color: isActive ? accent : inkFaint }}
                  >
                    {stage.id}
                  </p>
                  <p
                    className="mt-0.5 text-[8px] font-medium tracking-tight lg:text-[9px]"
                    style={{
                      color: isActive ? ink : isDone ? inkMuted : inkFaint,
                    }}
                  >
                    {stage.title}
                  </p>
                  <p
                    className="mt-0.5 text-[7px] tracking-tight lg:text-[8px]"
                    style={{
                      color: isDone ? health : isActive ? accent : inkFaint,
                    }}
                  >
                    {isDone ? stage.detail : isActive ? "In progress" : stage.detail}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Diagnostic strip */}
        <div
          className="grid shrink-0 grid-cols-3 gap-2 border-t px-3 py-2.5 lg:px-4"
          style={{ borderColor: border, background: surfaceMuted }}
        >
          <div>
            <div className="flex items-center gap-1">
              <CloudWatchMark className="h-2.5 w-2.5" />
              <p className="text-[7px] tracking-tight lg:text-[7.5px]" style={{ color: inkFaint }}>
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
                className="mt-0.5 text-[10px] font-medium tracking-tight tabular-nums lg:text-[11px]"
                style={{ color: rateImproved ? health : accent }}
              >
                {rateImproved ? `8.2% → ${rate}` : rate}
              </motion.p>
            </AnimatePresence>
          </div>
          <div className="col-span-1 border-x px-2" style={{ borderColor: border }}>
            <div className="flex items-center gap-1">
              <RdsMark className="h-2.5 w-2.5" />
              <p className="text-[7px] tracking-tight lg:text-[7.5px]" style={{ color: inkFaint }}>
                Root cause
              </p>
            </div>
            <p
              className="mt-0.5 text-[8px] leading-snug font-medium tracking-tight lg:text-[9px]"
              style={{ color: ink }}
            >
              DB connection pool exhausted
            </p>
          </div>
          <div>
            <div className="flex items-center gap-1">
              <AwsMark className="h-2.5 w-2.5" />
              <p className="text-[7px] tracking-tight lg:text-[7.5px]" style={{ color: inkFaint }}>
                Deployment
              </p>
            </div>
            <p
              className="mt-0.5 text-[8px] font-medium tracking-tight lg:text-[9px]"
              style={{ color: step >= 4 || reduce ? health : inkMuted }}
            >
              {step >= 5 || reduce ? "Verified" : step >= 4 ? "Rolling out" : "Pending"}
            </p>
          </div>
        </div>
      </Panel>
    </IllustrationStage>
  );
}
