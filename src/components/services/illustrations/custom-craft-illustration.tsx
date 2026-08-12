"use client";

import { AnimatePresence, motion } from "framer-motion";

import {
  CheckGlyph,
  Chip,
  MicroLabel,
  Panel,
  StatusDot,
  WindowDots,
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

type Token = { text: string; tone: "keyword" | "plain" | "string" | "faint" };

/** Restrained two-tone syntax: structure in ink, values in Comlabs orange. */
const CODE_LINES: Token[][] = [
  [
    { text: "export", tone: "keyword" },
    { text: " function ", tone: "plain" },
    { text: "ServiceCard", tone: "keyword" },
    { text: "({", tone: "faint" },
  ],
  [{ text: "  title, href,", tone: "plain" }],
  [
    { text: "}: ", tone: "faint" },
    { text: "ServiceCardProps", tone: "plain" },
    { text: ") {", tone: "faint" },
  ],
  [
    { text: "  return ", tone: "keyword" },
    { text: "<Card ", tone: "plain" },
    { text: "href", tone: "plain" },
    { text: "={href} />", tone: "string" },
  ],
  [{ text: "}", tone: "faint" }],
];

const FILE_TREE = [
  { name: "app/", depth: 0, active: false },
  { name: "service-card.tsx", depth: 1, active: true },
  { name: "components/", depth: 0, active: false },
  { name: "lib/", depth: 0, active: false },
] as const;

/** Quality gates resolve one per step — never a chart, just pass states. */
const GATES = [
  { label: "Type-safe", detail: "0 errors", step: 2 },
  { label: "Performance", detail: "budget met", step: 3 },
  { label: "Accessibility", detail: "AA", step: 4 },
] as const;

const STEPS = 6;

const fade = {
  duration: illustrationTiming.transitionSec,
  ease: illustrationEase,
};

function tokenColor(tone: Token["tone"]): string {
  if (tone === "keyword") return illustrationColors.ink;
  if (tone === "string") return illustrationColors.accent;
  if (tone === "faint") return illustrationColors.inkFaint;
  return illustrationColors.inkMuted;
}

export function CustomCraftIllustration() {
  const { active, reduce } = useIllustrationState();
  const step = useIllustrationSequence({ steps: STEPS, active, reduce });

  const codeComplete = step >= 1;
  const visibleLines = codeComplete ? CODE_LINES.length : 2;
  const handoffReady = step >= 5;

  return (
    <IllustrationStage>
      <div className="flex h-full flex-col gap-2.5">
        {/* Editor — primary object */}
        <Panel className="flex min-h-0 flex-1 flex-col overflow-hidden" elevation="raised">
          <div
            className="flex items-center gap-2 border-b px-2.5 py-[7px]"
            style={{
              borderColor: illustrationColors.border,
              background: illustrationColors.surfaceMuted,
            }}
          >
            <WindowDots />
            <span
              className="truncate text-[8px] leading-none lg:text-[9.5px]"
              style={{ color: illustrationColors.inkMuted }}
            >
              service-card.tsx
            </span>
            <span className="ml-auto hidden lg:block">
              <Chip tone="quiet">TypeScript</Chip>
            </span>
          </div>

          <div className="flex min-h-0 flex-1">
            {/* File tree — secondary layer, desktop only */}
            <div
              className="hidden w-[104px] shrink-0 flex-col gap-[3px] border-r p-2 lg:flex"
              style={{
                borderColor: illustrationColors.border,
                background: illustrationColors.surfaceMuted,
              }}
            >
              {FILE_TREE.map((file) => (
                <span
                  key={file.name}
                  className="flex items-center gap-1 px-1 py-[3px]"
                  style={{
                    paddingLeft: 4 + file.depth * 8,
                    borderRadius: 3,
                    background: file.active
                      ? illustrationColors.accentSoft
                      : "transparent",
                  }}
                >
                  <span
                    className="block h-[5px] w-[5px] shrink-0"
                    style={{
                      borderRadius: 1,
                      background: file.active
                        ? illustrationColors.accent
                        : illustrationColors.wire,
                    }}
                  />
                  <span
                    className="truncate text-[8.5px] leading-none"
                    style={{
                      color: file.active
                        ? illustrationColors.accent
                        : illustrationColors.inkFaint,
                    }}
                  >
                    {file.name}
                  </span>
                </span>
              ))}
            </div>

            {/* Code */}
            <div className="min-w-0 flex-1 p-2 lg:p-2.5">
              <div className="flex flex-col gap-[4px]">
                {CODE_LINES.map((line, lineIndex) => {
                  const shown = lineIndex < visibleLines;
                  return (
                    <motion.div
                      key={lineIndex}
                      initial={false}
                      animate={{ opacity: shown ? 1 : 0 }}
                      transition={{
                        ...fade,
                        delay: reduce ? 0 : (lineIndex - 1) * 0.07,
                      }}
                      className="flex items-center gap-1.5"
                    >
                      <span
                        className="w-[7px] shrink-0 text-right text-[7.5px] leading-none tabular-nums lg:text-[8.5px]"
                        style={{ color: illustrationColors.wire }}
                      >
                        {lineIndex + 1}
                      </span>
                      <span
                        className="truncate text-[8px] leading-[1.5] lg:text-[9.5px]"
                        style={{ fontFamily: "var(--font-mono, monospace)" }}
                      >
                        {line.map((token, tokenIndex) => (
                          <span
                            key={tokenIndex}
                            style={{ color: tokenColor(token.tone) }}
                          >
                            {token.text}
                          </span>
                        ))}
                        {/* Caret rests on the last written line */}
                        {!codeComplete && lineIndex === visibleLines - 1 ? (
                          <motion.span
                            className="ml-[1px] inline-block align-middle"
                            style={{
                              width: 1,
                              height: 9,
                              background: illustrationColors.accent,
                            }}
                            animate={reduce ? undefined : { opacity: [1, 0, 1] }}
                            transition={{
                              duration: 1,
                              repeat: codeComplete ? 0 : Infinity,
                              ease: "linear",
                            }}
                          />
                        ) : null}
                      </span>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </Panel>

        {/* Quality gates */}
        <Panel className="shrink-0 p-2 lg:p-2.5">
          <div className="mb-1.5 flex items-center justify-between gap-2">
            <MicroLabel>Quality gates</MicroLabel>
            <AnimatePresence>
              {handoffReady ? (
                <motion.span
                  initial={reduce ? false : { opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={fade}
                >
                  <Chip tone="accent">
                    <CheckGlyph size={8} />
                    Handoff ready
                  </Chip>
                </motion.span>
              ) : null}
            </AnimatePresence>
          </div>

          <div className="grid grid-cols-3 gap-1.5">
            {GATES.map((gate) => {
              const passed = step >= gate.step;
              return (
                <div
                  key={gate.label}
                  className="flex flex-col gap-[4px] px-1.5 py-[6px]"
                  style={{
                    borderRadius: illustrationRadius.chip,
                    background: passed
                      ? illustrationColors.surfaceWarm
                      : illustrationColors.surfaceMuted,
                    border: `1px solid ${
                      passed
                        ? "rgba(201,100,66,0.18)"
                        : illustrationColors.border
                    }`,
                    transition:
                      "background 400ms ease, border-color 400ms ease",
                  }}
                >
                  <span className="flex items-center gap-1">
                    {passed ? (
                      <CheckGlyph size={8} />
                    ) : (
                      <StatusDot tone="idle" />
                    )}
                    <span
                      className="truncate text-[7.5px] leading-none font-medium lg:text-[9px]"
                      style={{
                        color: passed
                          ? illustrationColors.ink
                          : illustrationColors.inkFaint,
                      }}
                    >
                      {gate.label}
                    </span>
                  </span>
                  <span
                    className="truncate text-[7px] leading-none lg:text-[8.5px]"
                    style={{
                      color: passed
                        ? illustrationColors.inkMuted
                        : illustrationColors.wire,
                    }}
                  >
                    {passed ? gate.detail : "pending"}
                  </span>
                </div>
              );
            })}
          </div>
        </Panel>
      </div>
    </IllustrationStage>
  );
}
