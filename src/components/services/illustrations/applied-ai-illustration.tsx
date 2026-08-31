"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Clock, FileText, Inbox, LogOut, Search, ShieldCheck, UserRound } from "lucide-react";

import {
  ClaudeMark,
  CopilotMark,
  OutlookMark,
  SalesforceMark,
  SlackMark,
} from "./brand-marks";
import { CheckGlyph, WindowDots } from "./illustration-primitives";
import {
  IllustrationStage,
  useIllustrationState,
} from "./service-illustration-frame";
import {
  illustrationBlurHidden,
  illustrationBlurShown,
  illustrationColors,
  illustrationEase,
  illustrationPopHidden,
  illustrationPopShown,
  illustrationRadius,
  illustrationShadow,
  illustrationTiming,
} from "./illustration-tokens";
import { useIllustrationSequence } from "./use-illustration-sequence";

const THREADS = [
  { company: "Acme", preview: "Lock Q3 renewal?", time: "2m", Source: SlackMark },
  { company: "Northstar", preview: "Usage review", time: "1h", Source: SalesforceMark },
  { company: "Vithub", preview: "Brand assets ready", time: "Yesterday", Source: OutlookMark },
  { company: "Formial", preview: "Contract follow-up", time: "2d", Source: SlackMark },
] as const;

const CONTEXT_LABELS = ["#renewals", "MSA-118", "AC-4421"] as const;

const CONTEXT_FIELDS = [
  { label: "Pricing band", value: "MSA-118", Icon: FileText },
  { label: "Last renewal", value: "11 months", Icon: Clock },
  { label: "Account owner", value: "Priya", Icon: UserRound },
  { label: "Risk", value: "Low", Icon: ShieldCheck },
] as const;

const DRAFT =
  "Yes — 14-month term at ₹4.2L, within the MSA-118 pricing band.";

const REASONING =
  "Pulled pricing from latest agreement and matched against current renewal guidelines.";

const FOLLOW_UP = "Add a 2-week kickoff.";

const FOLLOW_REPLY =
  "Done — the reply now includes a 14-day kickoff, still inside MSA-118.";

const OPERATOR = {
  name: "John Doe",
  email: "john@comlabs",
  initials: "JD",
} as const;

const STEPS = 8;

const fade = {
  duration: illustrationTiming.transitionSec,
  ease: illustrationEase,
};

const swap = {
  duration: illustrationTiming.feedbackSec,
  ease: illustrationEase,
};

function useTypedText(
  text: string,
  enabled: boolean,
  reduce: boolean,
  snap: boolean,
): string {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!enabled || reduce || snap) return;

    const intervalId = window.setInterval(() => {
      setCount((current) => {
        if (current >= text.length) {
          window.clearInterval(intervalId);
          return current;
        }
        return current + 1;
      });
    }, 26);

    return () => window.clearInterval(intervalId);
  }, [enabled, reduce, snap, text]);

  if (reduce || snap) return text;
  if (!enabled) return "";
  return text.slice(0, count);
}

function TypedComposerLabel({
  enabled,
  reduce,
  snap,
}: {
  enabled: boolean;
  reduce: boolean;
  snap: boolean;
}) {
  const typed = useTypedText(FOLLOW_UP, enabled, reduce, snap);

  return (
    <>
      {enabled ? typed : "Ask Copilot a follow-up…"}
      {enabled && !snap && !reduce ? <ComposerCaret /> : null}
    </>
  );
}

function ComposerCaret() {
  return (
    <motion.span
      className="ml-px inline-block h-[8px] w-[1px] shrink-0 align-middle"
      style={{ background: illustrationColors.ink }}
      animate={{ opacity: [1, 0] }}
      transition={{ duration: 0.55, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
    />
  );
}

export function AppliedAiIllustration() {
  const { active, reduce } = useIllustrationState();
  const step = useIllustrationSequence({
    steps: STEPS,
    active,
    reduce,
    stepMs: 800,
  });

  // 0 request · 1 retrieving · 2 draft · 3 recommend · 4 approval · 5 sent · 6 typing · 7 reply
  const retrieving = step >= 1;
  const draftReady = step >= 2;
  const recommended = step >= 3;
  const approvalReady = step >= 4;
  const complete = step >= 5;
  const followUpTyping = step === 6;
  const followUpReplied = step >= 7;

  return (
    <IllustrationStage className="p-2 lg:p-3">
      <div
        className="flex h-full min-h-0 flex-col overflow-hidden"
        style={{
          borderRadius: illustrationRadius.device,
          background: illustrationColors.surface,
          border: `1px solid ${illustrationColors.borderStrong}`,
          boxShadow: illustrationShadow.raised,
        }}
      >
        <div
          className="flex shrink-0 items-center justify-between gap-2 border-b px-2.5 py-[7px] lg:px-3"
          style={{
            borderColor: illustrationColors.border,
            background: illustrationColors.surfaceMuted,
          }}
        >
          <span className="flex min-w-0 items-center gap-2">
            <WindowDots />
            <span
              className="flex h-[16px] w-[16px] shrink-0 items-center justify-center rounded-[5px] lg:h-[18px] lg:w-[18px]"
              style={{
                background: illustrationColors.ink,
              }}
            >
              <CopilotMark
                className="h-[10px] w-[10px] lg:h-[11px] lg:w-[11px]"
                color={illustrationColors.surface}
              />
            </span>
            <span
              className="truncate text-[8px] leading-none lg:text-[10px]"
              style={{ color: illustrationColors.ink }}
            >
              Renewal Copilot
            </span>
            <ClaudeMark className="hidden h-[8px] w-[8px] lg:block" />
          </span>
          <span
            className="shrink-0 text-[7px] leading-none lg:text-[8.5px]"
            style={{
              color: complete ? illustrationColors.accent : illustrationColors.inkMuted,
            }}
          >
            {complete
              ? "Draft approved"
              : approvalReady
                ? "Needs approval"
                : retrieving
                  ? "Retrieving context"
                  : "Watching inbox"}
          </span>
        </div>

        <div
          className="flex shrink-0 flex-wrap items-center gap-x-1 gap-y-1 border-b px-2.5 py-1.5 lg:px-3"
          style={{ borderColor: illustrationColors.border }}
        >
          {(["Request", "Context", "Agent", "Tools", "Approval", "Action"] as const).map(
            (label, index) => {
              const reached = step >= index;
              return (
                <span
                  key={label}
                  className="text-[6px] leading-none lg:text-[7.5px]"
                  style={{
                    color: reached ? illustrationColors.ink : illustrationColors.inkFaint,
                  }}
                >
                  {label}
                  {index < 5 ? (
                    <span style={{ color: illustrationColors.inkFaint }}> → </span>
                  ) : null}
                </span>
              );
            },
          )}
        </div>

        <div className="flex min-h-0 flex-1">
          <div
            className="flex w-[30%] shrink-0 flex-col border-r lg:w-[22%]"
            style={{
              borderColor: illustrationColors.border,
              background: illustrationColors.surfaceMuted,
            }}
          >
            <div className="flex items-center gap-1 px-2 pt-2 pb-1.5 lg:px-2.5">
              <Inbox size={9} color={illustrationColors.inkMuted} />
              <span
                className="text-[7px] leading-none lg:text-[8px]"
                style={{ color: illustrationColors.inkMuted }}
              >
                Queue
              </span>
            </div>
            <div
              className="mx-1.5 mb-1.5 hidden items-center gap-1 rounded-[6px] border px-1.5 py-[5px] lg:flex"
              style={{
                borderColor: illustrationColors.border,
                background: illustrationColors.surface,
              }}
            >
              <Search size={8} color={illustrationColors.inkFaint} />
              <span
                className="text-[7px] leading-none"
                style={{ color: illustrationColors.inkFaint }}
              >
                Search accounts
              </span>
            </div>
            <div className="min-h-0 flex-1 overflow-hidden">
            {THREADS.map((thread, index) => {
              const selected = index === 0;
              return (
                <div
                  key={thread.company}
                  className={
                    index === 3
                      ? "mx-1 mb-0.5 hidden flex-col gap-1 px-1.5 py-[7px] lg:mx-1.5 lg:flex lg:px-2"
                      : "mx-1 mb-0.5 flex flex-col gap-1 px-1.5 py-[7px] lg:mx-1.5 lg:px-2"
                  }
                  style={{
                    borderRadius: 8,
                    background: selected ? illustrationColors.surface : "transparent",
                    boxShadow: selected ? illustrationShadow.chip : undefined,
                  }}
                >
                  <span className="flex items-center gap-1.5">
                    <span
                      className="flex h-[16px] w-[16px] shrink-0 items-center justify-center rounded-[5px] lg:h-[18px] lg:w-[18px]"
                      style={{ background: illustrationColors.surface }}
                    >
                      <thread.Source className="h-[9px] w-[9px] lg:h-[10px] lg:w-[10px]" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="flex items-center justify-between gap-1">
                        <span
                          className="truncate text-[7.5px] leading-none lg:text-[9px]"
                          style={{ color: illustrationColors.ink }}
                        >
                          {thread.company}
                        </span>
                        <span
                          className="shrink-0 text-[6.5px] leading-none lg:text-[7.5px]"
                          style={{ color: illustrationColors.inkFaint }}
                        >
                          {thread.time}
                        </span>
                      </span>
                      <span
                        className="mt-1 block truncate text-[6.5px] leading-none lg:text-[7.5px]"
                        style={{ color: illustrationColors.inkFaint }}
                      >
                        {thread.preview}
                      </span>
                    </span>
                  </span>
                </div>
              );
            })}
            </div>

            <div
              className="mt-auto flex shrink-0 items-center gap-1.5 border-t px-1.5 py-[7px] lg:px-2"
              style={{ borderColor: illustrationColors.border }}
            >
              <span
                className="flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full lg:h-[22px] lg:w-[22px]"
                style={{
                  background: illustrationColors.ink,
                  color: illustrationColors.surface,
                }}
              >
                <span className="text-[6.5px] leading-none lg:text-[7.5px]">
                  {OPERATOR.initials}
                </span>
              </span>
              <span className="min-w-0 flex-1">
                <span
                  className="block truncate text-[7px] leading-none lg:text-[8.5px]"
                  style={{ color: illustrationColors.ink }}
                >
                  {OPERATOR.name}
                </span>
                <span
                  className="mt-[3px] hidden truncate text-[6.5px] leading-none lg:block"
                  style={{ color: illustrationColors.inkFaint }}
                >
                  {OPERATOR.email}
                </span>
              </span>
              <span
                className="flex shrink-0 items-center gap-0.5 text-[6.5px] leading-none lg:text-[7.5px]"
                style={{ color: illustrationColors.inkMuted }}
              >
                <LogOut size={8} />
                <span className="hidden lg:inline">Log out</span>
              </span>
            </div>
          </div>

          <div className="flex min-w-0 flex-1 flex-col">
            <div
              className="flex shrink-0 items-center justify-between gap-2 border-b px-2.5 py-[7px] lg:px-3"
              style={{ borderColor: illustrationColors.border }}
            >
              <span className="flex min-w-0 items-center gap-1.5">
                <SlackMark className="h-[11px] w-[11px] lg:h-[13px] lg:w-[13px]" />
                <span className="min-w-0">
                  <span
                    className="block truncate text-[8px] leading-none lg:text-[10px]"
                    style={{ color: illustrationColors.ink }}
                  >
                    Acme · Renewal
                  </span>
                  <span
                    className="mt-1 block truncate text-[6.5px] leading-none lg:text-[7.5px]"
                    style={{ color: illustrationColors.inkFaint }}
                  >
                    A. Shah · #renewals · 2m
                  </span>
                </span>
              </span>
              <span
                className="shrink-0 text-[6.5px] leading-none lg:text-[7.5px]"
                style={{ color: illustrationColors.inkMuted }}
              >
                Priya
              </span>
            </div>

            <div className="flex min-h-0 flex-1 flex-col gap-2 overflow-hidden p-2.5 lg:gap-2.5 lg:p-3">
              <div
                className="max-w-[94%] px-2 py-1.5 lg:px-2.5 lg:py-2"
                style={{
                  borderRadius: 8,
                  background: illustrationColors.surfaceMuted,
                }}
              >
                <span
                  className="mb-1 block text-[6.5px] leading-none lg:text-[7.5px]"
                  style={{ color: illustrationColors.inkFaint }}
                >
                  A. Shah
                </span>
                <span
                  className="block text-[7.5px] leading-[1.45] lg:text-[9px]"
                  style={{ color: illustrationColors.ink }}
                >
                  Can we lock the Q3 renewal this week?
                </span>
              </div>

              <div className="relative min-h-0 flex-1 overflow-hidden">
                <div className="flex h-full flex-col gap-2 overflow-hidden">
                  <AnimatePresence mode="wait" initial={false}>
                    {draftReady ? (
                      <motion.div
                        key="draft"
                        initial={reduce ? false : illustrationBlurHidden}
                        animate={illustrationBlurShown}
                        transition={fade}
                        className="flex flex-col gap-1.5 rounded-[8px] px-2 py-1.5 lg:px-2.5 lg:py-2"
                        style={{
                          background: illustrationColors.surfaceMuted,
                        }}
                      >
                        <span className="flex items-center gap-1">
                          <span
                            className="flex h-[14px] w-[14px] items-center justify-center rounded-[4px]"
                            style={{ background: illustrationColors.ink }}
                          >
                            <CopilotMark
                              className="h-[8px] w-[8px]"
                              color={illustrationColors.surface}
                            />
                          </span>
                          <span
                            className="text-[6.5px] leading-none lg:text-[7.5px]"
                            style={{ color: illustrationColors.inkMuted }}
                          >
                            Copilot draft
                          </span>
                          <ClaudeMark className="ml-auto h-[8px] w-[8px]" />
                        </span>
                        <span
                          className="text-[7.5px] leading-[1.45] lg:text-[9px]"
                          style={{ color: illustrationColors.ink }}
                        >
                          {DRAFT}
                        </span>
                        <span
                          className="text-[6.5px] leading-[1.4] lg:text-[7.5px]"
                          style={{ color: illustrationColors.inkMuted }}
                        >
                          {REASONING}
                        </span>
                      </motion.div>
                    ) : (
                      <motion.span
                        key="waiting"
                        initial={false}
                        exit={reduce ? undefined : illustrationBlurHidden}
                        transition={swap}
                        className="flex items-center gap-1.5 text-[7px] leading-none lg:text-[8px]"
                        style={{ color: illustrationColors.inkFaint }}
                      >
                        <CopilotMark
                          className="h-[10px] w-[10px]"
                          color={illustrationColors.inkFaint}
                        />
                        {retrieving
                          ? "Matching agreement and account history…"
                          : "Waiting for context…"}
                      </motion.span>
                    )}
                  </AnimatePresence>

                  {followUpReplied ? (
                    <motion.div
                      initial={reduce ? false : illustrationBlurHidden}
                      animate={illustrationBlurShown}
                      transition={fade}
                      className="ml-auto max-w-[92%] px-2 py-1.5"
                      style={{
                        borderRadius: 8,
                        background: illustrationColors.surfaceMuted,
                      }}
                    >
                      <span
                        className="mb-1 block text-[6.5px] leading-none lg:text-[7.5px]"
                        style={{ color: illustrationColors.inkFaint }}
                      >
                        You
                      </span>
                      <span
                        className="block text-[7.5px] leading-[1.45] lg:text-[9px]"
                        style={{ color: illustrationColors.ink }}
                      >
                        {FOLLOW_UP}
                      </span>
                    </motion.div>
                  ) : null}

                  {followUpReplied ? (
                    <motion.div
                      initial={reduce ? false : illustrationBlurHidden}
                      animate={illustrationBlurShown}
                      transition={{ ...fade, delay: reduce ? 0 : 0.12 }}
                      className="flex flex-col gap-1 rounded-[8px] px-2 py-1.5 lg:px-2.5"
                      style={{
                        background: illustrationColors.surfaceMuted,
                      }}
                    >
                      <span className="flex items-center gap-1">
                        <CopilotMark
                          className="h-[8px] w-[8px]"
                          color={illustrationColors.accent}
                        />
                        <span
                          className="text-[6.5px] leading-none lg:text-[7.5px]"
                          style={{ color: illustrationColors.inkMuted }}
                        >
                          Copilot
                        </span>
                      </span>
                      <span
                        className="text-[7.5px] leading-[1.45] lg:text-[9px]"
                        style={{ color: illustrationColors.ink }}
                      >
                        {FOLLOW_REPLY}
                      </span>
                    </motion.div>
                  ) : null}
                </div>
              </div>

              <div
                className="truncate text-[6.5px] leading-none lg:text-[7.5px]"
                style={{ color: illustrationColors.inkMuted }}
              >
                {CONTEXT_LABELS.join("  ·  ")}
              </div>

              <div className="flex shrink-0 items-center justify-between gap-2">
                <div className="flex min-w-0 items-center gap-1.5">
                  <AnimatePresence>
                    {complete ? (
                      <motion.span
                        key="logged"
                        initial={reduce ? false : illustrationPopHidden}
                        animate={illustrationPopShown}
                        transition={swap}
                        className="flex items-center gap-1"
                      >
                        <SalesforceMark className="h-[9px] w-[9px]" />
                        <CheckGlyph size={8} />
                        <span
                          className="text-[7px] leading-none lg:text-[8px]"
                          style={{ color: illustrationColors.inkMuted }}
                        >
                          Logged to CRM
                        </span>
                      </motion.span>
                    ) : recommended ? (
                      <motion.span
                        key="suggest"
                        initial={reduce ? false : illustrationBlurHidden}
                        animate={illustrationBlurShown}
                        transition={fade}
                        className="flex items-center gap-1 truncate text-[7px] leading-none lg:text-[8px]"
                        style={{ color: illustrationColors.inkMuted }}
                      >
                        <CopilotMark
                          className="h-[9px] w-[9px]"
                          color={illustrationColors.accent}
                        />
                        Suggested: Approve and send
                      </motion.span>
                    ) : (
                      <span
                        className="flex items-center gap-1 truncate text-[7px] leading-none lg:text-[8px]"
                        style={{ color: illustrationColors.inkFaint }}
                      >
                        <ClaudeMark className="h-[8px] w-[8px]" />
                        Grounded in contract context
                      </span>
                    )}
                  </AnimatePresence>
                </div>

                <span
                  className="flex shrink-0 items-center gap-1 rounded-full px-2 py-[5px] lg:px-2.5"
                  style={{
                    background: complete
                      ? illustrationColors.accentSoft
                      : approvalReady
                        ? illustrationColors.ink
                        : illustrationColors.surfaceSunk,
                    color: complete
                      ? illustrationColors.accent
                      : approvalReady
                        ? illustrationColors.surface
                        : illustrationColors.inkFaint,
                    transition: "background 200ms ease, color 200ms ease",
                  }}
                >
                  {complete ? <CheckGlyph size={7} /> : null}
                  <span className="text-[7px] leading-none lg:text-[8px]">
                    {complete ? "Sent" : "Approve & Send"}
                  </span>
                </span>
              </div>
            </div>

            <div
              className="flex shrink-0 items-center gap-1.5 border-t px-2.5 py-[6px]"
              style={{
                borderColor: illustrationColors.border,
                background: illustrationColors.surfaceMuted,
              }}
            >
              <span
                className="flex h-[14px] w-[14px] items-center justify-center rounded-[4px]"
                style={{ background: illustrationColors.ink }}
              >
                <CopilotMark className="h-[8px] w-[8px]" color={illustrationColors.surface} />
              </span>
              <span
                className="min-w-0 flex-1 truncate text-[7px] leading-none"
                style={{
                  color: followUpTyping
                    ? illustrationColors.ink
                    : illustrationColors.inkFaint,
                }}
              >
                <TypedComposerLabel
                  key={active ? "live" : "idle"}
                  enabled={followUpTyping}
                  reduce={reduce}
                  snap={followUpReplied}
                />
              </span>
              <span
                className="ml-auto text-[6.5px] leading-none"
                style={{ color: illustrationColors.inkFaint }}
              >
                ⌘K
              </span>
            </div>
          </div>

          <div
            className="hidden w-[28%] shrink-0 flex-col border-l lg:flex"
            style={{
              borderColor: illustrationColors.border,
              background: illustrationColors.surfaceMuted,
            }}
          >
            <span className="flex items-center gap-1 px-2.5 pt-2 pb-1.5">
              <SalesforceMark className="h-[9px] w-[9px]" />
              <span
                className="text-[8px] leading-none"
                style={{ color: illustrationColors.inkMuted }}
              >
                Account context
              </span>
            </span>
            <div className="flex flex-col gap-1 px-2 pb-2">
              {CONTEXT_FIELDS.map((field, index) => (
                <motion.div
                  key={field.label}
                  initial={reduce ? false : illustrationBlurHidden}
                  animate={
                    recommended || complete
                      ? illustrationBlurShown
                      : illustrationBlurHidden
                  }
                  transition={{
                    ...fade,
                    delay: reduce ? 0 : index * illustrationTiming.staggerSec,
                  }}
                  className="flex items-center gap-1.5 rounded-[7px] px-2 py-[6px]"
                  style={{
                    background: illustrationColors.surface,
                    border: `1px solid ${illustrationColors.border}`,
                  }}
                >
                  <field.Icon size={9} color={illustrationColors.inkMuted} />
                  <span className="min-w-0 flex-1">
                    <span
                      className="block text-[6.5px] leading-none"
                      style={{ color: illustrationColors.inkFaint }}
                    >
                      {field.label}
                    </span>
                    <span
                      className="mt-[3px] block text-[8px] leading-none"
                      style={{ color: illustrationColors.ink }}
                    >
                      {field.value}
                    </span>
                  </span>
                </motion.div>
              ))}

              <motion.div
                initial={reduce ? false : illustrationPopHidden}
                animate={complete ? illustrationPopShown : illustrationPopHidden}
                transition={swap}
                className="flex items-center gap-1.5 rounded-[7px] px-2 py-[6px]"
                style={{
                  background: illustrationColors.accentSoft,
                  border: "1px solid rgba(201,100,66,0.20)",
                }}
              >
                <SalesforceMark className="h-[9px] w-[9px]" />
                <CheckGlyph size={8} />
                <span
                  className="text-[7.5px] leading-none"
                  style={{ color: illustrationColors.accent }}
                >
                  Logged to CRM
                </span>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </IllustrationStage>
  );
}
