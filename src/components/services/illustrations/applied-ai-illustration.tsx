"use client";

import { AnimatePresence, motion } from "framer-motion";

import {
  ClaudeMark,
  OutlookMark,
  SalesforceMark,
  SlackMark,
} from "./brand-marks";
import {
  ArrowGlyph,
  CheckGlyph,
  Chip,
  MicroLabel,
  Panel,
} from "./illustration-primitives";
import {
  IllustrationStage,
  useIllustrationState,
} from "./service-illustration-frame";
import {
  illustrationColors,
  illustrationEase,
  illustrationRadius,
  illustrationShadow,
  illustrationTiming,
} from "./illustration-tokens";
import { useIllustrationSequence } from "./use-illustration-sequence";

const SOURCES = [
  { Mark: SlackMark, label: "Renewal thread", channel: "#account-mgmt", bg: "#F4F0FF" },
  { Mark: OutlookMark, label: "MSA-118 email", channel: "p.mishra@…", bg: "#EEF6FC" },
  { Mark: SalesforceMark, label: "Account record", channel: "AC-4421", bg: "#E8F6FC" },
] as const;

const ACTIONS = [
  { Mark: SalesforceMark, label: "Quote logged to CRM", bg: "#E8F6FC" },
  { Mark: OutlookMark, label: "Renewal draft sent", bg: "#EEF6FC" },
] as const;

const STEPS = 6;

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
    stepMs: 900,
  });

  // 0 sources · 1 agent reading · 2 draft ready · 3 review · 4 approved · 5 executed
  const sourcesActive = step >= 1;
  const draftReady = step >= 2;
  const reviewRequired = step >= 3;
  const approved = step >= 4;
  const executed = step >= 5;

  return (
    <IllustrationStage>
      <Panel
        className="flex h-full flex-col gap-2 p-2.5 lg:gap-2.5 lg:p-3.5"
        elevation="raised"
      >
        {/* Enterprise sources feeding the agent */}
        <div className="flex shrink-0 flex-col gap-1">
          <MicroLabel>Signals from your stack</MicroLabel>
          <div className="grid grid-cols-3 gap-1">
            {SOURCES.map((source, index) => {
              const active = sourcesActive && index <= Math.min(step - 1, 2);
              return (
                <div
                  key={source.label}
                  className="flex flex-col gap-[3px] px-1.5 py-[5px]"
                  style={{
                    borderRadius: illustrationRadius.chip,
                    background: active ? source.bg : illustrationColors.surfaceMuted,
                    border: `1px solid ${
                      active ? "rgba(28,25,23,0.08)" : illustrationColors.border
                    }`,
                    opacity: active ? 1 : 0.5,
                    transition: "opacity 400ms ease, background 400ms ease",
                  }}
                >
                  <span className="flex items-center gap-1">
                    <source.Mark className="h-[9px] w-[9px] lg:h-[11px] lg:w-[11px]" />
                    <span
                      className="truncate text-[6.5px] leading-none font-medium lg:text-[8px]"
                      style={{ color: illustrationColors.ink }}
                    >
                      {source.label}
                    </span>
                  </span>
                  <span
                    className="truncate text-[6px] leading-none lg:text-[7px]"
                    style={{ color: illustrationColors.inkFaint }}
                  >
                    {source.channel}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Agent core — Claude preparing the action */}
        <div className="flex min-h-0 shrink-0 items-stretch gap-1.5">
          <div className="flex shrink-0 flex-col items-center justify-center pt-2">
            <ArrowGlyph size={8} color={illustrationColors.accent} />
          </div>

          <div
            className="flex min-w-0 flex-1 flex-col gap-1.5 px-2 py-2 lg:px-2.5 lg:py-2.5"
            style={{
              borderRadius: illustrationRadius.control,
              background: draftReady
                ? illustrationColors.surfaceWarm
                : illustrationColors.surfaceMuted,
              border: `1px solid ${
                draftReady ? "rgba(201,100,66,0.20)" : illustrationColors.border
              }`,
              transition: "background 400ms ease, border-color 400ms ease",
            }}
          >
            <div className="flex items-center gap-1.5">
              <span
                className="flex h-[16px] w-[16px] shrink-0 items-center justify-center lg:h-[18px] lg:w-[18px]"
                style={{
                  borderRadius: illustrationRadius.chip,
                  background: "#FDF3EF",
                }}
              >
                <ClaudeMark className="h-[10px] w-[10px] lg:h-[12px] lg:w-[12px]" />
              </span>
              <div className="flex min-w-0 flex-col gap-[2px]">
                <span
                  className="truncate text-[7.5px] leading-none font-medium lg:text-[9px]"
                  style={{ color: illustrationColors.ink }}
                >
                  {draftReady ? "Renewal quote prepared" : "Reading 3 records…"}
                </span>
                <span
                  className="truncate text-[6px] leading-none lg:text-[7.5px]"
                  style={{ color: illustrationColors.inkFaint }}
                >
                  {draftReady ? "Claude · matched clause 7" : "Cross-referencing context"}
                </span>
              </div>
            </div>

            <AnimatePresence>
              {draftReady ? (
                <motion.div
                  initial={reduce ? false : { opacity: 0, y: 3 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={fade}
                  className="flex flex-col gap-[3px] border-t pt-1.5"
                  style={{ borderColor: "rgba(201,100,66,0.14)" }}
                >
                  <span
                    className="text-[8px] leading-none font-medium lg:text-[10px]"
                    style={{ color: illustrationColors.ink }}
                  >
                    ₹4,20,000 · 14-month term
                  </span>
                  <span
                    className="text-[6.5px] leading-none lg:text-[8px]"
                    style={{ color: illustrationColors.inkMuted }}
                  >
                    8% uplift · within pricing band
                  </span>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        </div>

        {/* Human checkpoint */}
        <div
          className="flex shrink-0 items-center justify-between gap-2 px-2 py-[6px]"
          style={{
            borderRadius: illustrationRadius.control,
            background:
              reviewRequired && !approved
                ? illustrationColors.accentSoft
                : illustrationColors.surfaceMuted,
            border: `1px solid ${
              reviewRequired && !approved
                ? "rgba(201,100,66,0.28)"
                : illustrationColors.border
            }`,
            transition: "background 400ms ease, border-color 400ms ease",
          }}
        >
          <div className="flex min-w-0 items-center gap-1.5">
            <span
              className="flex h-[13px] w-[13px] shrink-0 items-center justify-center text-[6px] leading-none font-medium lg:h-[15px] lg:w-[15px] lg:text-[7px]"
              style={{
                borderRadius: 999,
                background: approved
                  ? illustrationColors.accentSoft
                  : illustrationColors.surfaceSunk,
                border: `1px solid ${
                  approved ? "rgba(201,100,66,0.24)" : illustrationColors.border
                }`,
                color: approved ? illustrationColors.accent : illustrationColors.inkMuted,
              }}
            >
              PM
            </span>
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
                  className="truncate text-[7.5px] leading-none font-medium lg:text-[9px]"
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
                      ? "Operator sign-off needed"
                      : "Queued for review"}
                </span>
                <span
                  className="truncate text-[6px] leading-none lg:text-[7.5px]"
                  style={{ color: illustrationColors.inkFaint }}
                >
                  {approved ? "Ops lead · 09:43" : "Human checkpoint before execution"}
                </span>
              </motion.span>
            </AnimatePresence>
          </div>

          <div className="flex shrink-0 items-center gap-1">
            {approved ? (
              <Chip tone="quiet" size="compact">
                <CheckGlyph size={6} />
                Signed off
              </Chip>
            ) : reviewRequired ? (
              <>
                <span
                  className="hidden px-1.5 py-[2px] text-[7px] leading-none lg:inline"
                  style={{
                    borderRadius: illustrationRadius.chip,
                    border: `1px solid ${illustrationColors.border}`,
                    color: illustrationColors.inkMuted,
                  }}
                >
                  Decline
                </span>
                <span
                  className="px-1.5 py-[2px] text-[7px] leading-none font-medium lg:text-[8px]"
                  style={{
                    borderRadius: illustrationRadius.chip,
                    background: illustrationColors.accent,
                    color: illustrationColors.surface,
                  }}
                >
                  Approve
                </span>
              </>
            ) : null}
          </div>
        </div>

        {/* Execution outputs */}
        <div className="flex min-h-0 flex-1 flex-col gap-1">
          <div className="flex items-center justify-between gap-2">
            <MicroLabel>Actions executed</MicroLabel>
            <AnimatePresence>
              {executed ? (
                <motion.span
                  initial={reduce ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={fade}
                >
                  <Chip tone="accent" size="compact">
                    <CheckGlyph size={6} />
                    Complete
                  </Chip>
                </motion.span>
              ) : null}
            </AnimatePresence>
          </div>

          <div className="flex flex-1 flex-col justify-center gap-1.5">
            {ACTIONS.map((action, index) => {
              const done = executed;
              const pending = approved && !executed;

              return (
                <motion.div
                  key={action.label}
                  initial={false}
                  animate={{
                    opacity: approved || executed ? 1 : 0.45,
                  }}
                  transition={{ duration: 0.3, ease: illustrationEase }}
                  className="flex items-center gap-1.5 px-2 py-[5px]"
                  style={{
                    borderRadius: illustrationRadius.chip,
                    background: done ? action.bg : illustrationColors.surfaceMuted,
                    border: `1px solid ${
                      done ? "rgba(28,25,23,0.08)" : illustrationColors.border
                    }`,
                    boxShadow: done ? illustrationShadow.chip : undefined,
                  }}
                >
                  <span
                    className="flex h-[14px] w-[14px] shrink-0 items-center justify-center lg:h-[16px] lg:w-[16px]"
                    style={{
                      borderRadius: illustrationRadius.chip,
                      background: action.bg,
                    }}
                  >
                    <action.Mark className="h-[9px] w-[9px] lg:h-[10px] lg:w-[10px]" />
                  </span>
                  <span
                    className="min-w-0 flex-1 truncate text-[7px] leading-none lg:text-[8.5px]"
                    style={{
                      color: done ? illustrationColors.ink : illustrationColors.inkMuted,
                    }}
                  >
                    {action.label}
                  </span>
                  {done ? (
                    <CheckGlyph size={7} />
                  ) : pending ? (
                    <span
                      className="block h-[4px] w-[4px] shrink-0 animate-pulse rounded-full"
                      style={{ background: illustrationColors.accent }}
                    />
                  ) : (
                    <span
                      className="text-[6px] leading-none lg:text-[7px]"
                      style={{ color: illustrationColors.inkFaint }}
                    >
                      Pending
                    </span>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </Panel>
    </IllustrationStage>
  );
}
