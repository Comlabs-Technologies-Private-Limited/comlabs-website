"use client";

import { AnimatePresence, motion } from "framer-motion";

import { CopilotMark, SalesforceMark } from "./brand-marks";
import { CheckGlyph, WindowDots } from "./illustration-primitives";
import { IllustrationStage, useIllustrationState } from "./service-illustration-frame";
import {
  illustrationBlurHidden,
  illustrationBlurShown,
  illustrationColors,
  illustrationPopHidden,
  illustrationPopShown,
  illustrationSwap,
} from "./illustration-tokens";
import { useIllustrationSequence } from "./use-illustration-sequence";

const CONTEXT_ROWS = [
  { label: "MSA-118", meta: "Agreement" },
  { label: "Account AC-4421", meta: "CRM" },
  { label: "Last renewal", meta: "11 months" },
  { label: "Pricing band", meta: "Enterprise" },
] as const;

const TRACE = [
  { label: "CRM", at: 4 },
  { label: "Contract", at: 5 },
  { label: "Pricing", at: 6 },
] as const;

const DRAFT = [
  "Yes — we can lock Q3 this week.",
  "14-month term at ₹4.2L, inside the MSA-118 band.",
] as const;

export function AppliedAiIllustration() {
  const { active, reduce } = useIllustrationState();
  const step = useIllustrationSequence({
    steps: 11,
    active,
    reduce,
    stepMs: [420, 480, 360, 360, 360, 420, 480, 520, 560, 640],
  });

  const gathering = step >= 2 && step < 7;
  const draftVisible = step >= 7;
  const draftFull = step >= 8;
  const approvalReady = step >= 9;
  const complete = step >= 10;

  return (
    <IllustrationStage className="p-0">
      <div
        className="flex h-full min-h-0 flex-col overflow-hidden"
        style={{
          background: illustrationColors.surface,
        }}
      >
        <div
          className="flex shrink-0 items-center justify-between gap-2 border-b px-3 py-2.5 lg:px-3.5"
          style={{ borderColor: illustrationColors.border }}
        >
          <span className="flex min-w-0 items-center gap-2">
            <WindowDots />
            <span
              className="flex h-4 w-4 items-center justify-center rounded-[5px]"
              style={{ background: illustrationColors.ink }}
            >
              <CopilotMark className="h-[9px] w-[9px]" color={illustrationColors.surface} />
            </span>
            <span
              className="truncate text-[8px] tracking-tight lg:text-[10px]"
              style={{ color: illustrationColors.ink }}
            >
              Renewal Copilot
            </span>
          </span>
          <span
            className="shrink-0 text-[7px] lg:text-[8px]"
            style={{
              color: complete
                ? illustrationColors.health
                : gathering
                  ? illustrationColors.accent
                  : illustrationColors.inkMuted,
            }}
          >
            {complete
              ? "Logged to CRM"
              : gathering
                ? "Gathering context"
                : approvalReady
                  ? "Needs approval"
                  : "Watching"}
          </span>
        </div>

        <div className="flex min-h-0 flex-1 flex-col gap-2 overflow-hidden p-2.5 lg:p-3">
          <AnimatePresence>
            {step >= 1 ? (
              <motion.div
                initial={reduce ? false : { opacity: 0, y: 8, filter: "blur(2px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: reduce ? 0 : 0.34, ease: [0.25, 0.1, 0, 1] }}
                className="max-w-[92%] rounded-[10px] px-2.5 py-2"
                style={{ background: illustrationColors.surfaceMuted }}
              >
                <span
                  className="mb-1 block text-[6.5px] lg:text-[7.5px]"
                  style={{ color: illustrationColors.inkFaint }}
                >
                  A. Shah
                </span>
                <span
                  className="block text-[8px] leading-snug tracking-tight lg:text-[9.5px]"
                  style={{ color: illustrationColors.ink }}
                >
                  Can we lock the Q3 renewal this week?
                </span>
              </motion.div>
            ) : null}
          </AnimatePresence>

          <div className="grid grid-cols-2 gap-1.5 lg:grid-cols-4">
            {CONTEXT_ROWS.map((row, index) => (
              <motion.div
                key={row.label}
                initial={false}
                animate={
                  step >= 3
                    ? illustrationBlurShown
                    : illustrationBlurHidden
                }
                transition={{
                  duration: reduce ? 0 : 0.28,
                  delay: reduce ? 0 : index * 0.06,
                  ease: [0.25, 0.1, 0, 1],
                }}
                className="rounded-[8px] border px-1.5 py-1.5"
                style={{
                  borderColor: illustrationColors.border,
                  background: illustrationColors.surface,
                }}
              >
                <span
                  className="block truncate text-[7px] tracking-tight lg:text-[8px]"
                  style={{ color: illustrationColors.ink }}
                >
                  {row.label}
                </span>
                <span
                  className="mt-0.5 block truncate text-[6px] lg:text-[7px]"
                  style={{ color: illustrationColors.inkFaint }}
                >
                  {row.meta}
                </span>
              </motion.div>
            ))}
          </div>

          <div className="flex gap-2">
            {TRACE.map((item) => {
              const done = step >= item.at;
              return (
                <motion.span
                  key={item.label}
                  initial={false}
                  animate={{ opacity: step >= 4 ? 1 : 0 }}
                  className="flex items-center gap-1 text-[7px] lg:text-[8px]"
                  style={{
                    color: done ? illustrationColors.health : illustrationColors.inkFaint,
                  }}
                >
                  {item.label}
                  {done ? " ✓" : ""}
                </motion.span>
              );
            })}
          </div>

          <AnimatePresence>
            {draftVisible ? (
              <motion.div
                initial={reduce ? false : illustrationBlurHidden}
                animate={illustrationBlurShown}
                transition={{ duration: reduce ? 0 : 0.36, ease: [0.25, 0.1, 0, 1] }}
                className="rounded-[10px] px-2.5 py-2"
                style={{ background: illustrationColors.surfaceMuted }}
              >
                <span className="mb-1 flex items-center gap-1">
                  <CopilotMark className="h-[9px] w-[9px]" color={illustrationColors.inkMuted} />
                  <span
                    className="text-[6.5px] lg:text-[7.5px]"
                    style={{ color: illustrationColors.inkMuted }}
                  >
                    Copilot
                  </span>
                </span>
                <span
                  className="block text-[8px] leading-snug tracking-tight lg:text-[9.5px]"
                  style={{ color: illustrationColors.ink }}
                >
                  {DRAFT[0]}
                </span>
                <motion.span
                  initial={false}
                  animate={{
                    opacity: draftFull ? 1 : 0,
                    y: draftFull ? 0 : 4,
                    filter: draftFull ? "blur(0px)" : "blur(2px)",
                  }}
                  className="mt-1 block text-[8px] leading-snug tracking-tight lg:text-[9.5px]"
                  style={{ color: illustrationColors.ink }}
                >
                  {DRAFT[1]}
                </motion.span>
              </motion.div>
            ) : gathering ? (
              <motion.span
                key="gathering"
                initial={false}
                className="text-[7.5px]"
                style={{ color: illustrationColors.inkFaint }}
              >
                Gathering context…
              </motion.span>
            ) : null}
          </AnimatePresence>

          <div className="mt-auto flex items-center justify-between gap-2">
            <AnimatePresence>
              {complete ? (
                <motion.span
                  initial={reduce ? false : illustrationPopHidden}
                  animate={illustrationPopShown}
                  transition={illustrationSwap}
                  className="flex items-center gap-1"
                >
                  <SalesforceMark className="h-[9px] w-[9px]" />
                  <CheckGlyph size={8} color={illustrationColors.health} />
                  <span
                    className="text-[7.5px] lg:text-[8.5px]"
                    style={{ color: illustrationColors.health }}
                  >
                    Logged to CRM ✓
                  </span>
                </motion.span>
              ) : (
                <span />
              )}
            </AnimatePresence>

            <motion.span
              initial={false}
              animate={{
                opacity: approvalReady ? 1 : 0,
                y: approvalReady ? 0 : 6,
              }}
              className="inline-flex items-center gap-1 rounded-full px-2.5 py-[6px]"
              style={{
                background: complete ? illustrationColors.healthSoft : illustrationColors.ink,
                color: complete ? illustrationColors.health : illustrationColors.surface,
              }}
            >
              {complete ? <CheckGlyph size={8} /> : null}
              <span className="text-[7px] tracking-tight lg:text-[8px]">
                {complete ? "Sent" : "Approve & Send"}
              </span>
            </motion.span>
          </div>
        </div>
      </div>
    </IllustrationStage>
  );
}
