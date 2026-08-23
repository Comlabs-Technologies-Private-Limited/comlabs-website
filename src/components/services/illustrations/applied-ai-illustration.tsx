"use client";

import { AnimatePresence, motion } from "framer-motion";

import { SalesforceMark, SlackMark } from "./brand-marks";
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
  { company: "Acme", preview: "Lock Q3 renewal?", time: "2m" },
  { company: "Northstar", preview: "Usage on Business", time: "1h" },
  { company: "Vithub", preview: "Brand assets ready", time: "Yesterday" },
] as const;

const DRAFT =
  "Yes — 14-month term at ₹4.2L, within the MSA-118 pricing band.";

const STEPS = 6;

const fade = {
  duration: illustrationTiming.transitionSec,
  ease: illustrationEase,
};

const swap = {
  duration: illustrationTiming.feedbackSec,
  ease: illustrationEase,
};

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
    stepMs: 850,
  });

  // 0 inbox · 1 drafting · 2 draft · 3 review · 4 sent · 5 logged
  const drafting = step >= 1 && step < 4;
  const draftReady = step >= 2;
  const reviewReady = step >= 3;
  const sent = step >= 4;
  const logged = step >= 5;

  return (
    <IllustrationStage>
      <div
        className="flex h-full flex-col overflow-hidden"
        style={{
          borderRadius: illustrationRadius.panel,
          background: illustrationColors.surfacePanel,
          border: `1px solid ${illustrationColors.border}`,
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
          <span className="flex min-w-0 items-center gap-1.5">
            <WindowDots />
            <span
              className="truncate text-[7.5px] leading-none lg:text-[9px]"
              style={{ color: illustrationColors.ink }}
            >
              Copilot
            </span>
          </span>
          <span
            className="shrink-0 text-[6.5px] leading-none lg:text-[7.5px]"
            style={{ color: illustrationColors.inkFaint }}
          >
            {sent ? "Sent" : drafting ? "Drafting…" : "Inbox"}
          </span>
        </div>

        <div className="flex min-h-0 flex-1">
          <div
            className="flex w-[34%] shrink-0 flex-col border-r"
            style={{
              borderColor: illustrationColors.border,
              background: illustrationColors.surfaceMuted,
            }}
          >
            <span
              className="px-2 pt-2 pb-1 text-[6.5px] leading-none lg:px-2.5 lg:text-[7.5px]"
              style={{ color: illustrationColors.inkFaint }}
            >
              Inbox
            </span>
            {THREADS.map((thread, index) => {
              const selected = index === 0;
              return (
                <div
                  key={thread.company}
                  className="mx-1 mb-0.5 flex flex-col gap-[3px] px-1.5 py-[6px] lg:mx-1.5 lg:px-2"
                  style={{
                    borderRadius: 7,
                    background: selected ? illustrationColors.surface : "transparent",
                    boxShadow: selected ? illustrationShadow.chip : undefined,
                  }}
                >
                  <span className="flex items-center justify-between gap-1">
                    <span
                      className="truncate text-[7px] leading-none lg:text-[8.5px]"
                      style={{ color: illustrationColors.ink }}
                    >
                      {thread.company}
                    </span>
                    <span
                      className="shrink-0 text-[6px] leading-none"
                      style={{ color: illustrationColors.inkFaint }}
                    >
                      {thread.time}
                    </span>
                  </span>
                  <span
                    className="truncate text-[6px] leading-none lg:text-[7px]"
                    style={{ color: illustrationColors.inkFaint }}
                  >
                    {thread.preview}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="flex min-w-0 flex-1 flex-col">
            <div
              className="flex shrink-0 items-center justify-between gap-2 border-b px-2.5 py-[7px]"
              style={{ borderColor: illustrationColors.border }}
            >
              <span
                className="truncate text-[7.5px] leading-none lg:text-[9px]"
                style={{ color: illustrationColors.ink }}
              >
                Acme · Renewal
              </span>
              <span
                className="shrink-0 text-[6px] leading-none lg:text-[7px]"
                style={{ color: illustrationColors.inkFaint }}
              >
                Priya · Owner
              </span>
            </div>

            <div className="flex min-h-0 flex-1 flex-col gap-2 p-2.5 lg:p-3">
              <div
                className="max-w-[92%] px-2 py-1.5"
                style={{
                  borderRadius: 8,
                  background: illustrationColors.surfaceMuted,
                  border: `1px solid ${illustrationColors.border}`,
                }}
              >
                <span
                  className="block text-[7px] leading-[1.4] lg:text-[8px]"
                  style={{ color: illustrationColors.inkMuted }}
                >
                  Can we lock the Q3 renewal this week?
                </span>
              </div>

              <div className="relative min-h-0 flex-1">
                <AnimatePresence mode="wait" initial={false}>
                  {drafting || sent ? (
                    <motion.div
                      key="draft"
                      initial={reduce ? false : illustrationBlurHidden}
                      animate={illustrationBlurShown}
                      transition={fade}
                      className="flex flex-col gap-1.5"
                    >
                      <span
                        className="text-[7.5px] leading-[1.45] lg:text-[8.5px]"
                        style={{ color: illustrationColors.ink }}
                      >
                        {DRAFT}
                        {drafting && !draftReady && !reduce ? <ComposerCaret /> : null}
                      </span>
                      <div
                        className="flex items-center gap-1"
                        style={{
                          opacity: draftReady || sent ? 1 : 0,
                          transition: "opacity 200ms ease",
                        }}
                      >
                        <span
                          className="inline-flex items-center gap-1 rounded-full border px-1.5 py-[3px]"
                          style={{
                            borderColor: illustrationColors.border,
                            background: illustrationColors.surface,
                          }}
                        >
                          <SlackMark className="h-[8px] w-[8px]" />
                          <span
                            className="text-[6px] leading-none lg:text-[7px]"
                            style={{ color: illustrationColors.inkMuted }}
                          >
                            #renewals
                          </span>
                        </span>
                        <span
                          className="inline-flex items-center gap-1 rounded-full border px-1.5 py-[3px]"
                          style={{
                            borderColor: illustrationColors.border,
                            background: illustrationColors.surface,
                          }}
                        >
                          <SalesforceMark className="h-[8px] w-[8px]" />
                          <span
                            className="text-[6px] leading-none lg:text-[7px]"
                            style={{ color: illustrationColors.inkMuted }}
                          >
                            AC-4421
                          </span>
                        </span>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.span
                      key="waiting"
                      initial={false}
                      exit={reduce ? undefined : illustrationBlurHidden}
                      transition={swap}
                      className="text-[7px] leading-none lg:text-[8px]"
                      style={{ color: illustrationColors.inkFaint }}
                    >
                      Waiting for context…
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>

              <div className="flex shrink-0 items-center justify-between gap-2">
                <AnimatePresence>
                  {logged ? (
                    <motion.span
                      initial={reduce ? false : illustrationPopHidden}
                      animate={illustrationPopShown}
                      transition={swap}
                      className="flex items-center gap-1"
                    >
                      <CheckGlyph size={7} />
                      <span
                        className="text-[6.5px] leading-none lg:text-[7.5px]"
                        style={{ color: illustrationColors.inkMuted }}
                      >
                        Logged to CRM
                      </span>
                    </motion.span>
                  ) : (
                    <span
                      className="text-[6.5px] leading-none lg:text-[7.5px]"
                      style={{ color: illustrationColors.inkFaint }}
                    >
                      Grounded in your stack
                    </span>
                  )}
                </AnimatePresence>

                <span
                  className="flex items-center gap-1 rounded-full px-2 py-[4px]"
                  style={{
                    background: sent
                      ? illustrationColors.surfaceSunk
                      : reviewReady
                        ? illustrationColors.ink
                        : illustrationColors.surfaceSunk,
                    color: sent || !reviewReady
                      ? illustrationColors.inkMuted
                      : illustrationColors.surface,
                    transition: "background 200ms ease, color 200ms ease",
                  }}
                >
                  {sent ? (
                    <CheckGlyph size={6} color={illustrationColors.inkMuted} />
                  ) : null}
                  <span className="text-[6.5px] leading-none lg:text-[7.5px]">
                    {sent ? "Sent" : "⌘↵ Send"}
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </IllustrationStage>
  );
}
