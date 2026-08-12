"use client";

import { AnimatePresence, motion } from "framer-motion";

import {
  ArrowGlyph,
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
  "Contract MSA-118",
  "Invoice INV-2291",
  "Renewal thread",
] as const;

const LOG_ENTRIES = [
  { time: "09:41", text: "Draft prepared from 3 records", step: 0 },
  { time: "09:43", text: "Approved by P. Mishra", step: 2 },
  { time: "09:43", text: "Recorded to CRM", step: 3 },
] as const;

const STEPS = 5;

const fade = {
  duration: illustrationTiming.transitionSec,
  ease: illustrationEase,
};

export function AppliedAiIllustration() {
  const { active, reduce } = useIllustrationState();
  const step = useIllustrationSequence({
    steps: STEPS,
    active,
    reduce,
    stepMs: 640,
  });

  // 0 draft ready · 1 review required · 2 approved · 3 recorded · 4 settled
  const reviewRequired = step >= 1;
  const approved = step >= 2;
  const recorded = step >= 3;

  return (
    <IllustrationStage>
      <Panel
        className="flex h-full flex-col gap-2 p-2.5 lg:gap-2.5 lg:p-3.5"
        elevation="raised"
      >
        {/* Context feeding the prepared action */}
        <div className="flex min-h-0 shrink-0 items-stretch gap-1.5 lg:gap-2">
          <div className="flex w-[36%] shrink-0 flex-col gap-1">
            <MicroLabel>Relevant context</MicroLabel>
            <div className="flex flex-col gap-1">
              {CONTEXT_RECORDS.map((record) => (
                <div
                  key={record}
                  className="flex items-center gap-1 px-1.5 py-[5px]"
                  style={{
                    borderRadius: illustrationRadius.chip,
                    background: illustrationColors.surfaceWarm,
                    border: "1px solid rgba(201,100,66,0.18)",
                  }}
                >
                  <span
                    className="block h-[6px] w-[6px] shrink-0"
                    style={{
                      borderRadius: 1.5,
                      background: illustrationColors.accent,
                    }}
                  />
                  <span
                    className="truncate text-[7px] leading-none lg:text-[8.5px]"
                    style={{ color: illustrationColors.inkMuted }}
                  >
                    {record}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex shrink-0 items-center pt-3">
            <ArrowGlyph size={9} color={illustrationColors.accent} />
          </div>

          {/* Prepared action — specific from the first frame */}
          <div className="flex min-w-0 flex-1 flex-col gap-1">
            <MicroLabel>Prepared action</MicroLabel>
            <div
              className="flex flex-1 flex-col justify-center gap-[4px] px-2 py-[7px]"
              style={{
                borderRadius: illustrationRadius.control,
                background: illustrationColors.surfaceMuted,
                border: `1px solid ${illustrationColors.border}`,
              }}
            >
              <span
                className="truncate text-[8px] leading-none font-semibold lg:text-[10px]"
                style={{ color: illustrationColors.ink }}
              >
                Renewal quote · ₹4,20,000
              </span>
              <span
                className="truncate text-[6.5px] leading-none lg:text-[8.5px]"
                style={{ color: illustrationColors.inkMuted }}
              >
                14-month term · 8% uplift
              </span>
              <span
                className="truncate text-[6.5px] leading-none lg:text-[8.5px]"
                style={{ color: illustrationColors.inkFaint }}
              >
                Matches clause 7 pricing band
              </span>
            </div>
          </div>
        </div>

        {/* Explicit human checkpoint with reviewer identity */}
        <div
          className="flex shrink-0 items-center justify-between gap-2 px-2 py-[7px]"
          style={{
            borderRadius: illustrationRadius.control,
            background:
              reviewRequired && !approved
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
              <span
                className="flex h-[13px] w-[13px] shrink-0 items-center justify-center text-[6.5px] leading-none font-semibold lg:h-[15px] lg:w-[15px] lg:text-[8px]"
                style={{
                  borderRadius: 999,
                  background: illustrationColors.accentSoft,
                  border: "1px solid rgba(201,100,66,0.28)",
                  color: illustrationColors.accent,
                }}
              >
                PM
              </span>
            ) : (
              <StatusDot tone={reviewRequired ? "accent" : "idle"} />
            )}
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={approved ? "approved" : reviewRequired ? "review" : "queued"}
                initial={reduce ? false : { opacity: 0, y: 2 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, y: -2 }}
                transition={{ duration: 0.2, ease: illustrationEase }}
                className="flex min-w-0 flex-col gap-[2px]"
              >
                <span
                  className="truncate text-[8px] leading-none font-semibold lg:text-[9.5px]"
                  style={{
                    color: approved
                      ? illustrationColors.ink
                      : reviewRequired
                        ? illustrationColors.accent
                        : illustrationColors.inkMuted,
                  }}
                >
                  {approved
                    ? "Approved by P. Mishra"
                    : reviewRequired
                      ? "Review required"
                      : "Queued for review"}
                </span>
                <span
                  className="truncate text-[6.5px] leading-none lg:text-[8px]"
                  style={{ color: illustrationColors.inkFaint }}
                >
                  {approved ? "Ops lead · 09:43" : "Operator sign-off needed"}
                </span>
              </motion.span>
            </AnimatePresence>
          </div>

          <div className="flex shrink-0 items-center gap-1">
            {approved ? (
              <Chip tone="quiet" className="px-1">
                <CheckGlyph size={7} />
                Signed off
              </Chip>
            ) : (
              <>
                <span
                  className="hidden px-1.5 py-[3px] text-[8px] leading-none lg:inline"
                  style={{
                    borderRadius: illustrationRadius.chip,
                    border: `1px solid ${illustrationColors.border}`,
                    color: illustrationColors.inkMuted,
                  }}
                >
                  Decline
                </span>
                <span
                  className="px-1.5 py-[3px] text-[7.5px] leading-none font-semibold lg:text-[8.5px]"
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

        {/* Audit log — every row legible, state carried by dot and colour */}
        <div className="flex min-h-0 flex-1 flex-col gap-1">
          <div className="flex items-center justify-between gap-2">
            <MicroLabel>Audit log</MicroLabel>
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
              const written = step >= entry.step;
              return (
                <div key={entry.text} className="flex items-center gap-1.5">
                  <span
                    className="shrink-0 text-[7px] leading-none tabular-nums lg:text-[8.5px]"
                    style={{
                      color: written
                        ? illustrationColors.inkMuted
                        : illustrationColors.inkFaint,
                    }}
                  >
                    {written ? entry.time : "--:--"}
                  </span>
                  <span
                    className="block h-[4px] w-[4px] shrink-0 rounded-full"
                    style={{
                      background: written
                        ? illustrationColors.accent
                        : "transparent",
                      border: written
                        ? "none"
                        : `1px solid ${illustrationColors.wire}`,
                    }}
                  />
                  <span
                    className="truncate text-[7px] leading-none lg:text-[9px]"
                    style={{
                      color: written
                        ? illustrationColors.ink
                        : illustrationColors.inkFaint,
                    }}
                  >
                    {entry.text}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </Panel>
    </IllustrationStage>
  );
}
