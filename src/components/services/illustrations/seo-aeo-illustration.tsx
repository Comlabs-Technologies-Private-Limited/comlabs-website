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

const STEPS = 5;

const fade = {
  duration: illustrationTiming.transitionSec,
  ease: illustrationEase,
};

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
    stepMs: 640,
  });

  // 0 crawled · 1 indexed + schema · 2 AI answer · 3 citation · 4 confirmed
  const optimised = step >= 1;
  const indexed = step >= 1;
  const answerVisible = step >= 2;
  const citationVisible = step >= 3;
  const complete = step >= 4;

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
            <Connectors activated={answerVisible} />
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

            {/* AI answer + explicit citation */}
            <Panel className="p-2 lg:p-2.5">
              <MicroLabel className="mb-1">AI answer</MicroLabel>
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
                ) : (
                  <motion.span
                    key="answer-pending"
                    initial={false}
                    exit={reduce ? undefined : { opacity: 0 }}
                    transition={fade}
                    className="flex items-center gap-1"
                  >
                    <StatusDot tone="idle" />
                    <span
                      className="text-[6.5px] leading-none lg:text-[8px]"
                      style={{ color: illustrationColors.inkFaint }}
                    >
                      Generating answer…
                    </span>
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
