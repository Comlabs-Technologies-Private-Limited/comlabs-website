"use client";

import { AnimatePresence, motion } from "framer-motion";

import {
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

const DOC_SECTIONS = [
  { label: "H1 · Custom software", schema: "Service" },
  { label: "Scope & process", schema: "HowTo" },
  { label: "Pricing questions", schema: "FAQ" },
] as const;

const STEPS = 7;

const fade = {
  duration: illustrationTiming.transitionSec,
  ease: illustrationEase,
};

/** Quicker swap so the answer panel changes state inside its narrative step. */
const swap = {
  duration: illustrationTiming.feedbackSec,
  ease: illustrationEase,
};

/**
 * OpenAI logomark. Drawn as the bare knot rather than the circular app icon —
 * at this size the silhouette stays recognisable where a badge reads as a dot.
 */
function ChatGptMark() {
  return (
    <span className="flex shrink-0 items-center justify-center">
      <svg
        className="h-[13px] w-[13px] lg:h-[15px] lg:w-[15px]"
        viewBox="0 0 24 24"
        fill={illustrationColors.ink}
        fillRule="evenodd"
        aria-hidden
      >
        <path d="M9.205 8.658v-2.26c0-.19.072-.333.238-.428l4.543-2.616c.619-.357 1.356-.523 2.117-.523 2.854 0 4.662 2.212 4.662 4.566 0 .167 0 .357-.024.547l-4.71-2.759a.797.797 0 00-.856 0l-5.97 3.473zm10.609 8.8V12.06c0-.333-.143-.57-.429-.737l-5.97-3.473 1.95-1.118a.433.433 0 01.476 0l4.543 2.617c1.309.76 2.189 2.378 2.189 3.948 0 1.808-1.07 3.473-2.76 4.163zM7.802 12.703l-1.95-1.142c-.167-.095-.239-.238-.239-.428V5.899c0-2.545 1.95-4.472 4.591-4.472 1 0 1.927.333 2.712.928L8.23 5.067c-.285.166-.428.404-.428.737v6.898zM12 15.128l-2.795-1.57v-3.33L12 8.658l2.795 1.57v3.33L12 15.128zm1.796 7.23c-1 0-1.927-.332-2.712-.927l4.686-2.712c.285-.166.428-.404.428-.737v-6.898l1.974 1.142c.167.095.238.238.238.428v5.233c0 2.545-1.974 4.472-4.614 4.472zm-5.637-5.303l-4.544-2.617c-1.308-.761-2.188-2.378-2.188-3.948A4.482 4.482 0 014.21 6.327v5.423c0 .333.143.571.428.738l5.947 3.449-1.95 1.118a.432.432 0 01-.476 0zm-.262 3.9c-2.688 0-4.662-2.021-4.662-4.519 0-.19.024-.38.047-.57l4.686 2.71c.286.167.571.167.856 0l5.97-3.448v2.26c0 .19-.07.333-.237.428l-4.543 2.616c-.619.357-1.356.523-2.117.523zm5.899 2.83a5.947 5.947 0 005.827-4.756C22.287 18.339 24 15.84 24 13.296c0-1.665-.713-3.282-1.998-4.448.119-.5.19-.999.19-1.498 0-3.401-2.759-5.947-5.946-5.947-.642 0-1.26.095-1.88.31A5.962 5.962 0 0010.205 0a5.947 5.947 0 00-5.827 4.757C1.713 5.447 0 7.945 0 10.49c0 1.666.713 3.283 1.998 4.448-.119.5-.19 1-.19 1.499 0 3.401 2.759 5.946 5.946 5.946.642 0 1.26-.095 1.88-.309a5.96 5.96 0 004.162 1.713z" />
      </svg>
    </span>
  );
}

/** Response-in-progress state: pulsing caret with two settling text lines. */
function AnswerLoading() {
  return (
    <div className="flex flex-col gap-[5px]">
      {["86%", "62%"].map((width, index) => (
        <motion.span
          key={width}
          className="block h-[5px] lg:h-[6px]"
          style={{
            width,
            borderRadius: 999,
            background: illustrationColors.wire,
          }}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{
            duration: 1.1,
            ease: "easeInOut",
            repeat: Infinity,
            delay: index * 0.18,
          }}
        />
      ))}
    </div>
  );
}

/** Branch connector linking the source document to both discovery surfaces. */
function Connectors({ activated }: { activated: boolean }) {
  return (
    <svg
      viewBox="0 0 20 100"
      preserveAspectRatio="none"
      className="h-full w-full"
      aria-hidden
    >
      {["M0,50 H7", "M7,50 V20 H20", "M7,50 V80 H20"].map((d) => (
        <path
          key={d}
          d={d}
          fill="none"
          vectorEffect="non-scaling-stroke"
          strokeWidth="1"
          strokeLinecap="round"
          stroke={
            activated ? illustrationColors.accentLine : illustrationColors.border
          }
          style={{ transition: "stroke 400ms ease" }}
        />
      ))}
    </svg>
  );
}

export function SeoAeoIllustration() {
  const { active, reduce } = useIllustrationState();
  const step = useIllustrationSequence({
    steps: STEPS,
    active,
    reduce,
    stepMs: 800,
  });

  // 0 crawled · 1 indexed · 2–3 ChatGPT responding · 4 answer · 5 citation · 6 confirmed
  const optimised = step >= 1;
  const indexed = step >= 1;
  const answerLoading = step === 2 || step === 3;
  const answerVisible = step >= 4;
  const citationVisible = step >= 5;
  const complete = step >= 6;

  return (
    <IllustrationStage>
      <div className="flex h-full flex-col gap-2.5">
        {/* Search query */}
        <div
          className="flex shrink-0 items-center gap-1.5 px-2.5 py-[7px]"
          style={{
            borderRadius: 999,
            background: illustrationColors.surface,
            border: `1px solid ${illustrationColors.border}`,
          }}
        >
          <svg width="9" height="9" viewBox="0 0 12 12" fill="none" aria-hidden>
            <circle
              cx="5.2"
              cy="5.2"
              r="3.4"
              stroke={illustrationColors.inkMuted}
              strokeWidth="1.2"
            />
            <path
              d="M7.8 7.8 10 10"
              stroke={illustrationColors.inkMuted}
              strokeWidth="1.2"
              strokeLinecap="round"
            />
          </svg>
          <span
            className="truncate text-[8px] leading-none lg:text-[10px]"
            style={{ color: illustrationColors.ink }}
          >
            custom software development company in Pune
          </span>
        </div>

        <div className="flex min-h-0 flex-1 items-stretch">
          {/* Source document */}
          <Panel className="flex w-[42%] shrink-0 flex-col p-2 lg:p-2.5">
            <div className="mb-1.5 flex items-center justify-between gap-1">
              <MicroLabel>Source</MicroLabel>
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={indexed ? "indexed" : "crawled"}
                  initial={reduce ? false : { opacity: 0, y: 2 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? undefined : { opacity: 0, y: -2 }}
                  transition={{ duration: 0.2, ease: illustrationEase }}
                >
                  <Chip tone={indexed ? "accent" : "quiet"} className="px-1">
                    {indexed ? <CheckGlyph size={7} /> : <StatusDot tone="idle" />}
                    {indexed ? "Indexed" : "Crawled"}
                  </Chip>
                </motion.span>
              </AnimatePresence>
            </div>

            <div className="flex flex-1 flex-col gap-1.5">
              {DOC_SECTIONS.map((section, index) => (
                <div
                  key={section.label}
                  className="flex items-center justify-between gap-1 px-1.5 py-[6px]"
                  style={{
                    borderRadius: illustrationRadius.chip,
                    background: optimised
                      ? illustrationColors.surfaceWarm
                      : illustrationColors.surfaceMuted,
                    border: `1px solid ${
                      optimised
                        ? "rgba(201,100,66,0.16)"
                        : illustrationColors.border
                    }`,
                    transition: "background 400ms ease, border-color 400ms ease",
                  }}
                >
                  <span
                    className="truncate text-[7.5px] leading-none font-medium lg:text-[9px]"
                    style={{ color: illustrationColors.ink }}
                  >
                    {section.label}
                  </span>
                  <AnimatePresence>
                    {optimised ? (
                      <motion.span
                        initial={reduce ? false : { opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                          ...fade,
                          delay: reduce ? 0 : index * 0.06,
                        }}
                        className="shrink-0 text-[7px] leading-none font-medium lg:text-[8.5px]"
                        style={{ color: illustrationColors.accent }}
                      >
                        {section.schema}
                      </motion.span>
                    ) : null}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </Panel>

          {/* Connectors */}
          <div className="w-3 shrink-0 lg:w-5">
            <Connectors activated={answerLoading || answerVisible} />
          </div>

          {/* Discovery surfaces */}
          <div className="flex min-w-0 flex-1 flex-col justify-between gap-2">
            {/* Search result with full anatomy */}
            <Panel className="p-2 lg:p-2.5">
              <div className="mb-1 flex items-center gap-1">
                {/* Favicon */}
                <span
                  className="flex h-[10px] w-[10px] shrink-0 items-center justify-center lg:h-[12px] lg:w-[12px]"
                  style={{
                    borderRadius: 3,
                    background: illustrationColors.accent,
                  }}
                >
                  <span
                    className="block h-[4px] w-[4px]"
                    style={{
                      borderRadius: 1,
                      background: illustrationColors.surface,
                    }}
                  />
                </span>
                <span className="flex min-w-0 flex-col gap-[1px]">
                  <span
                    className="truncate text-[6.5px] leading-none font-medium lg:text-[8px]"
                    style={{ color: illustrationColors.ink }}
                  >
                    Comlabs Technologies
                  </span>
                  <span
                    className="truncate text-[6px] leading-none lg:text-[7.5px]"
                    style={{ color: illustrationColors.inkFaint }}
                  >
                    comlabstechnologies.com › services
                  </span>
                </span>
              </div>
              <span
                className="mb-[3px] block truncate text-[8.5px] leading-none font-medium lg:text-[10px]"
                style={{ color: illustrationColors.accent }}
              >
                Custom Software Development
              </span>
              <span
                className="block text-[6.5px] leading-[1.45] lg:text-[8px]"
                style={{ color: illustrationColors.inkMuted }}
              >
                Web applications, SaaS products and internal systems built around
                how your business actually works.
              </span>
            </Panel>

            {/* ChatGPT answer + explicit citation */}
            <Panel className="p-2 lg:p-2.5">
              <div className="mb-1.5 flex items-center gap-1">
                <ChatGptMark />
                <span
                  className="text-[7px] leading-none font-medium lg:text-[8.5px]"
                  style={{ color: illustrationColors.ink }}
                >
                  ChatGPT
                </span>
                <AnimatePresence initial={false}>
                  {answerLoading ? (
                    <motion.span
                      key="thinking"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2, ease: illustrationEase }}
                      className="ml-auto text-[6.5px] leading-none lg:text-[8px]"
                      style={{ color: illustrationColors.inkFaint }}
                    >
                      Responding…
                    </motion.span>
                  ) : null}
                </AnimatePresence>
              </div>
              <AnimatePresence mode="wait" initial={false}>
                {answerVisible ? (
                  <motion.div
                    key="answer"
                    initial={reduce ? false : { opacity: 0, y: 3 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={fade}
                    className="flex flex-col gap-[5px]"
                  >
                    <span
                      className="block text-[6.5px] leading-[1.45] lg:text-[8px]"
                      style={{ color: illustrationColors.inkMuted }}
                    >
                      Comlabs Technologies builds custom software for teams in
                      Pune, covering design through deployment.
                    </span>
                    <AnimatePresence>
                      {citationVisible ? (
                        <motion.span
                          initial={reduce ? false : { opacity: 0, y: 3 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={fade}
                          className="flex items-center gap-1 px-1.5 py-[3px]"
                          style={{
                            borderRadius: illustrationRadius.chip,
                            background: illustrationColors.accentSoft,
                            border: "1px solid rgba(201,100,66,0.24)",
                          }}
                        >
                          <span
                            className="flex h-[10px] w-[10px] shrink-0 items-center justify-center text-[6.5px] leading-none font-semibold lg:h-[12px] lg:w-[12px] lg:text-[8px]"
                            style={{
                              borderRadius: 999,
                              background: illustrationColors.accent,
                              color: illustrationColors.surface,
                            }}
                          >
                            1
                          </span>
                          <span
                            className="truncate text-[6.5px] leading-none font-medium lg:text-[8px]"
                            style={{ color: illustrationColors.accent }}
                          >
                            comlabstechnologies.com
                          </span>
                        </motion.span>
                      ) : null}
                    </AnimatePresence>
                  </motion.div>
                ) : answerLoading ? (
                  <motion.div
                    key="answer-loading"
                    initial={reduce ? false : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={reduce ? undefined : { opacity: 0 }}
                    transition={swap}
                  >
                    <AnswerLoading />
                  </motion.div>
                ) : (
                  <motion.span
                    key="answer-prompt"
                    initial={false}
                    exit={reduce ? undefined : { opacity: 0 }}
                    transition={swap}
                    className="block text-[6.5px] leading-[1.45] lg:text-[8px]"
                    style={{ color: illustrationColors.inkFaint }}
                  >
                    Who builds custom software for businesses in Pune?
                  </motion.span>
                )}
              </AnimatePresence>
            </Panel>
          </div>
        </div>

        {/* Resolution */}
        <AnimatePresence>
          {complete ? (
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={fade}
              className="shrink-0"
            >
              <Chip tone="accent">
                <CheckGlyph size={8} />
                Visible across search
              </Chip>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </IllustrationStage>
  );
}
