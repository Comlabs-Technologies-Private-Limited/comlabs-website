"use client";

import { AnimatePresence, motion } from "framer-motion";
import { MoreHorizontal } from "lucide-react";

import {
  ActivitySpinner,
  Chip,
  ConnectorBeam,
  DrawnCheck,
  Panel,
} from "./illustration-primitives";
import { IllustrationStage, useIllustrationState } from "./service-illustration-frame";
import {
  illustrationColors,
  illustrationPopHidden,
  illustrationPopShown,
  illustrationSwap,
  illustrationTextSwapExit,
  illustrationTextSwapHidden,
  illustrationTextSwapShown,
} from "./illustration-tokens";
import { useIllustrationSequence } from "./use-illustration-sequence";

type LevelState = "queued" | "investigating" | "complete" | "fix";

const LEVELS = [
  {
    id: "L1",
    title: "Initial triage",
    detail: "User reports confirmed",
    time: "08:14",
  },
  {
    id: "L2",
    title: "Logs + service diagnosis",
    detail: "Payments API 5xx spike",
    time: "08:16",
  },
  {
    id: "L3",
    title: "Engineering investigation",
    detail: "DB connection pool exhausted",
    time: "08:19",
  },
  {
    id: "L4",
    title: "Specialist escalation",
    detail: "Database team on standby",
    time: "Queued",
  },
] as const;

function levelState(index: number, step: number): LevelState {
  if (index === 0) {
    if (step < 1) return "queued";
    if (step < 2) return "investigating";
    return "complete";
  }
  if (index === 1) {
    if (step < 3) return "queued";
    if (step < 4) return "investigating";
    return "complete";
  }
  if (index === 2) {
    if (step < 5) return "queued";
    if (step < 6) return "investigating";
    return "fix";
  }
  return "queued";
}

function statusLabel(state: LevelState): string {
  if (state === "complete") return "Complete";
  if (state === "investigating") return "Investigating";
  if (state === "fix") return "Fix deployed";
  return "Queued";
}

export function ApplicationSupportIllustration() {
  const { active, reduce } = useIllustrationState();
  const step = useIllustrationSequence({
    steps: 7,
    active,
    reduce,
    stepMs: [420, 480, 420, 480, 640, 700],
  });
  const resolved = step >= 6;

  return (
    <IllustrationStage>
      <Panel className="flex h-full flex-col overflow-hidden" radius={12}>
        <motion.div
          className="flex items-start justify-between gap-3 border-b px-3 py-2.5 lg:px-4"
          style={{ borderColor: illustrationColors.border }}
          initial={reduce ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduce ? 0 : 0.36, ease: [0.25, 0.1, 0, 1] }}
        >
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span
                className="text-[8px] font-medium tracking-tight tabular-nums lg:text-[10px]"
                style={{ color: illustrationColors.ink }}
              >
                INC-2481
              </span>
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={resolved ? "resolved" : "p1"}
                  initial={reduce ? false : illustrationPopHidden}
                  animate={illustrationPopShown}
                  exit={reduce ? undefined : illustrationPopHidden}
                  transition={illustrationSwap}
                >
                  <Chip tone={resolved ? "health" : "accent"} size="compact">
                    {resolved ? "Resolved" : "P1"}
                  </Chip>
                </motion.span>
              </AnimatePresence>
            </div>
            <p
              className="mt-1 truncate text-[7.5px] tracking-tight lg:text-[9px]"
              style={{ color: illustrationColors.ink }}
            >
              Production API failure
            </p>
            <p
              className="mt-1 truncate text-[6.5px] lg:text-[7.5px]"
              style={{ color: illustrationColors.inkFaint }}
            >
              Production · Payments API · Owner: Support
            </p>
          </div>
        </motion.div>

        <div className="flex min-h-0 flex-1 flex-col justify-center px-1.5 py-1 lg:px-2.5">
          {LEVELS.map((level, index) => {
            const state = levelState(index, step);
            const expanded = index === 2 && step >= 5;
            const beamOn =
              (index === 0 && step >= 2) ||
              (index === 1 && step >= 4);

            return (
              <div key={level.id} className="flex flex-col">
                <motion.div
                  layout
                  className="group flex items-start gap-2 rounded-[8px] px-2 py-1.5 transition-colors duration-150 hover:bg-black/[0.035] lg:px-2.5"
                  style={{
                    background: "rgba(28,25,23,0)",
                  }}
                >
                  <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center">
                    {state === "complete" || state === "fix" ? (
                      <span
                        className="flex h-4 w-4 items-center justify-center rounded-full"
                        style={{ background: illustrationColors.healthSoft }}
                      >
                        <DrawnCheck show size={9} reduce={Boolean(reduce)} />
                      </span>
                    ) : state === "investigating" ? (
                      <ActivitySpinner size={12} active={active} reduce={Boolean(reduce)} />
                    ) : (
                      <span
                        className="h-3.5 w-3.5 rounded-full border"
                        style={{ borderColor: illustrationColors.borderStrong }}
                      />
                    )}
                  </span>

                  <span className="min-w-0 flex-1">
                    <span className="flex items-center gap-1.5">
                      <span
                        className="text-[7px] font-medium tracking-tight lg:text-[8px]"
                        style={{
                          color:
                            state === "queued"
                              ? illustrationColors.inkFaint
                              : state === "investigating"
                                ? illustrationColors.accent
                                : illustrationColors.inkMuted,
                        }}
                      >
                        {level.id}
                      </span>
                      <span
                        className="truncate text-[8px] tracking-tight lg:text-[9.5px]"
                        style={{
                          color:
                            state === "queued"
                              ? illustrationColors.inkMuted
                              : illustrationColors.ink,
                        }}
                      >
                        {level.title}
                      </span>
                    </span>
                    <motion.span
                      className="mt-0.5 block overflow-hidden text-[6.5px] lg:text-[7.5px]"
                      initial={false}
                      animate={{
                        height: expanded ? "auto" : 0,
                        opacity: expanded ? 1 : 0,
                        marginTop: expanded ? 2 : 0,
                      }}
                      transition={{ duration: reduce ? 0 : 0.28, ease: [0.25, 0.1, 0, 1] }}
                      style={{ color: illustrationColors.accent }}
                    >
                      {level.detail}
                    </motion.span>
                    <span
                      className="mt-0.5 block max-h-0 overflow-hidden text-[6.5px] opacity-0 transition-all duration-150 group-hover:max-h-4 group-hover:opacity-100 lg:text-[7px]"
                      style={{ color: illustrationColors.inkFaint }}
                    >
                      {level.detail} · {level.time}
                    </span>
                  </span>

                  <span className="flex shrink-0 items-center gap-1">
                    <AnimatePresence mode="wait" initial={false}>
                      <motion.span
                        key={state}
                        initial={reduce ? false : illustrationTextSwapHidden}
                        animate={illustrationTextSwapShown}
                        exit={reduce ? undefined : illustrationTextSwapExit}
                        transition={illustrationSwap}
                        className="text-[6.5px] lg:text-[7.5px]"
                        style={{
                          color:
                            state === "investigating"
                              ? illustrationColors.accent
                              : state === "fix"
                                ? illustrationColors.health
                                : illustrationColors.inkFaint,
                        }}
                      >
                        {statusLabel(state)}
                      </motion.span>
                    </AnimatePresence>
                    <MoreHorizontal
                      size={10}
                      className="translate-x-0 opacity-0 transition-all duration-150 group-hover:translate-x-0.5 group-hover:opacity-100"
                      style={{ color: illustrationColors.inkFaint }}
                    />
                  </span>
                </motion.div>

                {index < LEVELS.length - 1 ? (
                  <div className="flex justify-start pl-[18px] lg:pl-[21px]">
                    <ConnectorBeam
                      active={beamOn}
                      reduce={Boolean(reduce)}
                      height={10}
                    />
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      </Panel>
    </IllustrationStage>
  );
}
