"use client";

import { AnimatePresence, motion } from "framer-motion";

import { CheckGlyph, Chip, MicroLabel, Panel, StatusDot } from "./illustration-primitives";
import { IllustrationStage, useIllustrationState } from "./service-illustration-frame";
import {
  illustrationColors,
  illustrationRadius,
  illustrationSwap,
} from "./illustration-tokens";
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
      <Panel className="flex h-full flex-col overflow-hidden" elevation="raised">
        <div
          className="flex shrink-0 items-center justify-between gap-2 border-b px-2.5 py-2 lg:px-3 lg:py-2.5"
          style={{
            borderColor: illustrationColors.border,
            background: illustrationColors.surfaceMuted,
          }}
        >
          <span className="flex min-w-0 items-center gap-1.5">
            <StatusDot />
            <span
              className="truncate text-[7.5px] leading-none font-medium tabular-nums lg:text-[9px]"
              style={{ color: illustrationColors.ink }}
            >
              INC-2481
            </span>
            <Chip tone="accent" size="compact">
              P1
            </Chip>
          </span>
          <MicroLabel>Production</MicroLabel>
        </div>

        <div className="flex min-h-0 flex-1 flex-col gap-2 p-2.5 lg:gap-2.5 lg:p-3">
          <div>
            <p
              className="text-[9px] leading-tight font-medium lg:text-[11px]"
              style={{ color: illustrationColors.ink }}
            >
              Production API failure
            </p>
            <p
              className="mt-1 text-[7px] leading-none lg:text-[8.5px]"
              style={{ color: illustrationColors.inkMuted }}
            >
              Service: Payments API
            </p>
          </div>

          <div className="flex min-h-0 flex-1 flex-col gap-1">
            {ESCALATION.map((row, index) => {
              const complete = index <= completeThrough;
              const current = index === inProgressIndex && !complete;
              return (
                <div
                  key={row.id}
                  className="flex min-h-0 flex-1 items-center justify-between gap-2 px-2 py-[6px] lg:py-[7px]"
                  style={{
                    borderRadius: illustrationRadius.control,
                    background: current
                      ? illustrationColors.surfaceWarm
                      : illustrationColors.surfaceMuted,
                    border: `1px solid ${
                      current ? "rgba(201,100,66,0.22)" : illustrationColors.border
                    }`,
                  }}
                >
                  <span className="flex min-w-0 items-center gap-1.5">
                    {complete ? (
                      <CheckGlyph size={9} />
                    ) : (
                      <StatusDot tone={current ? "accent" : "idle"} />
                    )}
                    <span
                      className="truncate text-[7.5px] leading-none font-medium lg:text-[9px]"
                      style={{ color: illustrationColors.ink }}
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
                      className="shrink-0 text-[6.5px] leading-none lg:text-[8px]"
                      style={{
                        color: complete
                          ? illustrationColors.accent
                          : current
                            ? illustrationColors.ink
                            : illustrationColors.inkFaint,
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
            className="mt-auto flex items-center justify-between gap-2 px-2 py-[5px]"
            style={{
              borderRadius: illustrationRadius.control,
              background: illustrationColors.surfaceMuted,
              border: `1px solid ${illustrationColors.border}`,
            }}
          >
            <MicroLabel tone="muted">Environment: Production</MicroLabel>
            <span
              className="text-[6.5px] leading-none font-medium lg:text-[8px]"
              style={{ color: illustrationColors.inkMuted }}
            >
              Payments API
            </span>
          </div>
        </div>
      </Panel>
    </IllustrationStage>
  );
}
