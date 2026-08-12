"use client";

import { AnimatePresence, motion } from "framer-motion";

import {
  ArrowGlyph,
  Bar,
  CheckGlyph,
  Chip,
  MicroLabel,
  Panel,
  StatusDot,
} from "./illustration-primitives";
import {
  IllustrationStage,
  useIllustrationState,
} from "./service-illustration-frame";
import {
  illustrationColors,
  illustrationEase,
  illustrationRadius,
  illustrationTiming,
} from "./illustration-tokens";
import { useIllustrationSequence } from "./use-illustration-sequence";

const CONTEXT_RECORDS = [
  "Invoice INV-2291",
  "MSA · clause 7",
  "Email thread",
] as const;

const LOG_ENTRIES = [
  { time: "09:41", text: "Draft prepared", step: 2 },
  { time: "09:43", text: "Approved by operator", step: 4 },
  { time: "09:43", text: "Recorded to CRM", step: 5 },
] as const;

const STEPS = 6;

const fade = {
  duration: illustrationTiming.transitionSec,
  ease: illustrationEase,
};

export function AppliedAiIllustration() {
  const { active, reduce } = useIllustrationState();
  const step = useIllustrationSequence({ steps: STEPS, active, reduce });

  const contextGathered = step >= 1;
  const draftPrepared = step >= 2;
  const reviewRequired = step >= 3;
  const approved = step >= 4;
  const recorded = step >= 5;

  return (
    <IllustrationStage>
      <Panel className="flex h-full flex-col gap-2 p-2.5 lg:gap-2.5 lg:p-3.5" elevation="raised">
        {/* Stage 1 + 2 — context feeding AI preparation */}
        <div className="flex min-h-0 shrink-0 items-stretch gap-1.5 lg:gap-2">
          {/* Relevant context */}
          <div className="flex w-[38%] shrink-0 flex-col gap-1">
            <MicroLabel>Relevant context</MicroLabel>
            <div className="flex flex-col gap-1">
              {CONTEXT_RECORDS.map((record, index) => (
                <motion.div
                  key={record}
                  initial={false}
                  animate={{
                    opacity: contextGathered ? 1 : 0.45,
                    x: contextGathered || reduce ? 0 : -2,
                  }}
                  transition={{
                    ...fade,
                    delay: reduce ? 0 : index * 0.08,
                  }}
                  className="flex items-center gap-1 px-1.5 py-[5px]"
                  style={{
                    borderRadius: illustrationRadius.chip,
                    background: contextGathered
                      ? illustrationColors.surfaceWarm
                      : illustrationColors.surfaceMuted,
                    border: `1px solid ${
                      contextGathered
                        ? "rgba(201,100,66,0.18)"
                        : illustrationColors.border
                    }`,
                  }}
                >
                  <span
                    className="block h-[6px] w-[6px] shrink-0"
                    style={{
                      borderRadius: 1.5,
                      background: contextGathered
                        ? illustrationColors.accent
                        : illustrationColors.wire,
                    }}
                  />
                  <span
                    className="truncate text-[7px] leading-none lg:text-[8.5px]"
                    style={{ color: illustrationColors.inkMuted }}
                  >
                    {record}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="flex shrink-0 items-center pt-3">
            <ArrowGlyph
              size={9}
              color={
                draftPrepared
                  ? illustrationColors.accent
                  : illustrationColors.inkFaint
              }
            />
          </div>

          {/* AI preparation */}
          <div className="flex min-w-0 flex-1 flex-col gap-1">
            <MicroLabel>Prepared action</MicroLabel>
            <div
              className="flex flex-1 flex-col justify-center gap-[5px] px-2 py-[7px]"
              style={{
                borderRadius: illustrationRadius.control,
                background: illustrationColors.surfaceMuted,
                border: `1px solid ${illustrationColors.border}`,
              }}
            >
              <AnimatePresence mode="wait" initial={false}>
                {draftPrepared ? (
                  <motion.div
                    key="draft"
                    initial={reduce ? false : { opacity: 0, y: 3 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={fade}
                    className="flex flex-col gap-[5px]"
                  >
                    <span
                      className="truncate text-[8px] leading-none font-medium lg:text-[9.5px]"
                      style={{ color: illustrationColors.ink }}
                    >
                      Renewal quote · ₹4,20,000
                    </span>
                    <Bar width="86%" height={2.5} />
                    <Bar width="62%" height={2.5} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="drafting"
                    initial={false}
                    exit={reduce ? undefined : { opacity: 0 }}
                    transition={fade}
                    className="flex flex-col gap-[5px]"
                  >
                    <Bar width="70%" height={2.5} tone="wire" />
                    <Bar width="52%" height={2.5} tone="wire" />
                    <Bar width="60%" height={2.5} tone="wire" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Stage 3 — explicit human checkpoint */}
        <div
          className="flex shrink-0 items-center justify-between gap-2 px-2 py-[7px]"
          style={{
            borderRadius: illustrationRadius.control,
            background: approved
              ? illustrationColors.surfaceMuted
              : reviewRequired
                ? illustrationColors.accentSoft
                : illustrationColors.surfaceMuted,
            border: `1px solid ${
              reviewRequired && !approved
                ? "rgba(201,100,66,0.30)"
                : illustrationColors.border
            }`,
            transition: "background 400ms ease, border-color 400ms ease",
          }}
        >
          <div className="flex min-w-0 items-center gap-1.5">
            {approved ? (
              <CheckGlyph size={9} />
            ) : (
              <StatusDot tone={reviewRequired ? "accent" : "idle"} />
            )}
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={approved ? "approved" : reviewRequired ? "review" : "idle"}
                initial={reduce ? false : { opacity: 0, y: 2 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, y: -2 }}
                transition={{ duration: 0.2, ease: illustrationEase }}
                className="truncate text-[8px] leading-none font-medium lg:text-[9.5px]"
                style={{
                  color: approved
                    ? illustrationColors.ink
                    : reviewRequired
                      ? illustrationColors.accent
                      : illustrationColors.inkFaint,
                }}
              >
                {approved
                  ? "Approved by operator"
                  : reviewRequired
                    ? "Review required"
                    : "Awaiting draft"}
              </motion.span>
            </AnimatePresence>
          </div>

          <div className="flex shrink-0 items-center gap-1">
            {approved ? (
              <Chip tone="quiet" className="px-1">
                Signed off
              </Chip>
            ) : (
              <>
                <span
                  className="hidden px-1.5 py-[3px] text-[8px] leading-none lg:inline"
                  style={{
                    borderRadius: illustrationRadius.chip,
                    border: `1px solid ${illustrationColors.border}`,
                    color: illustrationColors.inkFaint,
                  }}
                >
                  Decline
                </span>
                <span
                  className="px-1.5 py-[3px] text-[7.5px] leading-none font-medium lg:text-[8px]"
                  style={{
                    borderRadius: illustrationRadius.chip,
                    background: reviewRequired
                      ? illustrationColors.accent
                      : illustrationColors.wire,
                    color: illustrationColors.surface,
                    transition: "background 400ms ease",
                  }}
                >
                  Approve
                </span>
              </>
            )}
          </div>
        </div>

        {/* Activity log */}
        <div className="flex min-h-0 flex-1 flex-col gap-1">
          <div className="flex items-center justify-between gap-2">
            <MicroLabel>Activity log</MicroLabel>
            <AnimatePresence>
              {recorded ? (
                <motion.span
                  initial={reduce ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={fade}
                >
                  <Chip tone="accent" className="px-1">
                    <CheckGlyph size={7} />
                    Recorded
                  </Chip>
                </motion.span>
              ) : null}
            </AnimatePresence>
          </div>

          <div
            className="flex flex-1 flex-col justify-center gap-[5px] px-2 py-[6px]"
            style={{
              borderRadius: illustrationRadius.control,
              background: illustrationColors.surfaceMuted,
              border: `1px solid ${illustrationColors.border}`,
            }}
          >
            {LOG_ENTRIES.map((entry) => {
              const visible = step >= entry.step;
              return (
                <motion.div
                  key={entry.text}
                  initial={false}
                  animate={{ opacity: visible ? 1 : 0.22 }}
                  transition={fade}
                  className="flex items-center gap-1.5"
                >
                  <span
                    className="shrink-0 text-[7px] leading-none tabular-nums lg:text-[8.5px]"
                    style={{ color: illustrationColors.inkFaint }}
                  >
                    {entry.time}
                  </span>
                  <span
                    className="block h-[3px] w-[3px] shrink-0 rounded-full"
                    style={{
                      background: visible
                        ? illustrationColors.accent
                        : illustrationColors.wire,
                    }}
                  />
                  <span
                    className="truncate text-[7.5px] leading-none lg:text-[9px]"
                    style={{ color: illustrationColors.inkMuted }}
                  >
                    {entry.text}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </Panel>
    </IllustrationStage>
  );
}
