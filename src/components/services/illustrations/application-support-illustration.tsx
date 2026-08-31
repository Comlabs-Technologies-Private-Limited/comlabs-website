"use client";

import { AnimatePresence, motion } from "framer-motion";

import { CheckGlyph, Chip, Panel, StatusDot } from "./illustration-primitives";
import { IllustrationStage, useIllustrationState } from "./service-illustration-frame";
import { illustrationColors, illustrationSwap } from "./illustration-tokens";
import { useIllustrationSequence } from "./use-illustration-sequence";

const STEPS = 5;

const ESCALATION = [
  { id: "L1", label: "L1 Triage", detail: "Complete" },
  { id: "L2", label: "L2 Investigation", detail: "Complete" },
  { id: "L3", label: "L3 Engineering", detail: "In progress" },
  { id: "L4", label: "L4 Specialist", detail: "Queued" },
] as const;

export function ApplicationSupportIllustration() {
  const { active, reduce } = useIllustrationState();
  const step = useIllustrationSequence({ steps: STEPS, active, reduce });

  const completeThrough = step >= 4 ? 2 : step >= 3 ? 2 : step >= 2 ? 1 : step >= 1 ? 0 : -1;
  const inProgressIndex = completeThrough < 2 ? completeThrough + 1 : 2;

  return (
    <IllustrationStage>
      <Panel className="flex h-full flex-col overflow-hidden" elevation="panel">
        <div
          className="flex shrink-0 items-center justify-between gap-3 px-3 py-2.5 lg:px-4 lg:py-3"
          style={{ borderBottom: `1px solid ${illustrationColors.border}` }}
        >
          <span className="flex min-w-0 items-center gap-2">
            <span
              className="truncate text-[8px] leading-none font-medium tracking-tight tabular-nums lg:text-[10px]"
              style={{ color: illustrationColors.ink }}
            >
              INC-2481
            </span>
            <Chip tone="accent" size="compact">
              P1
            </Chip>
          </span>
          <span
            className="shrink-0 text-[7px] leading-none lg:text-[8px]"
            style={{ color: illustrationColors.inkFaint }}
          >
            Production
          </span>
        </div>

        <div className="flex min-h-0 flex-1 flex-col px-3 pt-3 pb-3 lg:px-4 lg:pt-4 lg:pb-3.5">
          <div className="shrink-0">
            <p
              className="text-[10px] leading-[1.3] font-medium tracking-tight lg:text-[12px]"
              style={{ color: illustrationColors.ink }}
            >
              Production API failure
            </p>
            <p
              className="mt-1.5 text-[7.5px] leading-[1.4] lg:text-[8.5px]"
              style={{ color: illustrationColors.inkMuted }}
            >
              Payments API
            </p>
          </div>

          <div className="mt-4 flex min-h-0 flex-1 flex-col">
            {ESCALATION.map((row, index) => {
              const complete = index <= completeThrough;
              const current = index === inProgressIndex && !complete;
              return (
                <div
                  key={row.id}
                  className="flex min-h-0 flex-1 items-center justify-between gap-3"
                  style={{
                    borderTop: index === 0 ? undefined : `1px solid ${illustrationColors.border}`,
                  }}
                >
                  <span className="flex min-w-0 items-center gap-2">
                    {complete ? (
                      <CheckGlyph size={9} color={illustrationColors.inkMuted} />
                    ) : (
                      <StatusDot tone={current ? "accent" : "idle"} />
                    )}
                    <span
                      className="truncate text-[8px] leading-none lg:text-[9.5px]"
                      style={{
                        color: current ? illustrationColors.ink : illustrationColors.inkMuted,
                      }}
                    >
                      {row.label}
                    </span>
                  </span>
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.span
                      key={`${row.id}-${complete ? "done" : current ? "live" : "wait"}`}
                      initial={reduce ? false : { opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={illustrationSwap}
                      className="shrink-0 text-[7px] leading-none lg:text-[8px]"
                      style={{
                        color: current
                          ? illustrationColors.accent
                          : complete
                            ? illustrationColors.inkFaint
                            : illustrationColors.wire,
                      }}
                    >
                      {complete ? "Complete" : current ? row.detail : "Queued"}
                    </motion.span>
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          <div
            className="mt-3 flex shrink-0 items-center justify-between gap-3 pt-3"
            style={{ borderTop: `1px solid ${illustrationColors.border}` }}
          >
            <span
              className="text-[7px] leading-none lg:text-[8px]"
              style={{ color: illustrationColors.inkFaint }}
            >
              Environment
            </span>
            <span
              className="text-[7.5px] leading-none lg:text-[8.5px]"
              style={{ color: illustrationColors.inkMuted }}
            >
              Production · Payments API
            </span>
          </div>
        </div>
      </Panel>
    </IllustrationStage>
  );
}
