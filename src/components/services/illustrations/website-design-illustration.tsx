"use client";

import { AnimatePresence, motion } from "framer-motion";

import {
  Bar,
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
  illustrationBlurHidden,
  illustrationBlurShown,
  illustrationColors,
  illustrationEase,
  illustrationPopHidden,
  illustrationPopShown,
  illustrationRadius,
  illustrationShadow,
  illustrationTextSwapHidden,
  illustrationTextSwapShown,
  illustrationTiming,
} from "./illustration-tokens";
import { useIllustrationSequence } from "./use-illustration-sequence";

const PAGE_LAYERS = [
  "Hero",
  "Trust bar",
  "Services",
  "Case studies",
  "CTA",
] as const;

const CONTENT_CARDS = [
  { title: "Custom software", meta: "Systems built to fit" },
  { title: "Website & brand", meta: "Positioning to launch" },
] as const;

const STEPS = 4;

const fade = {
  duration: illustrationTiming.transitionSec,
  ease: illustrationEase,
};

export function WebsiteDesignIllustration() {
  const { active, reduce } = useIllustrationState();
  // Fewer steps, so each is held longer — the finished page dominates the sequence.
  const step = useIllustrationSequence({
    steps: STEPS,
    active,
    reduce,
    stepMs: 1150,
  });

  // 0 hero live, cards drafting · 1 cards resolve + guides · 2 mobile syncs · 3 shipped
  const cardsResolved = step >= 1;
  const guidesVisible = step === 1;
  const mobileResolved = step >= 2;
  const complete = step >= 3;

  return (
    <IllustrationStage>
      <div className="flex h-full items-stretch gap-3">
        {/* Page layer rail — secondary layer, desktop only */}
        <div className="hidden w-[84px] shrink-0 flex-col lg:flex">
          <MicroLabel className="mb-2 pl-[2px]">Page layers</MicroLabel>
          <Panel className="flex-1 p-1.5" elevation="flat">
            <div className="flex flex-col gap-[3px]">
              {PAGE_LAYERS.map((layer, index) => {
                const isSelected = index === 0;
                return (
                  <div
                    key={layer}
                    className="flex items-center gap-1.5 px-1.5 py-[5px]"
                    style={{
                      borderRadius: illustrationRadius.chip,
                      background: isSelected
                        ? illustrationColors.accentSoft
                        : "transparent",
                    }}
                  >
                    <span
                      className="block h-[7px] w-[7px] shrink-0"
                      style={{
                        borderRadius: 2,
                        border: `1px solid ${
                          isSelected
                            ? "rgba(201,100,66,0.5)"
                            : illustrationColors.wire
                        }`,
                        background: isSelected
                          ? "rgba(201,100,66,0.18)"
                          : "transparent",
                      }}
                    />
                    <span
                      className="truncate text-[9.5px] leading-none"
                      style={{
                        color: isSelected
                          ? illustrationColors.accent
                          : illustrationColors.inkMuted,
                      }}
                    >
                      {layer}
                    </span>
                  </div>
                );
              })}
            </div>
          </Panel>
        </div>

        {/* Browser canvas — primary object */}
        <div className="relative min-w-0 flex-1">
          <Panel className="flex h-full flex-col overflow-hidden" elevation="raised">
            {/* Chrome */}
            <div
              className="flex items-center gap-2 border-b px-2.5 py-[7px]"
              style={{
                borderColor: illustrationColors.border,
                background: illustrationColors.surfaceMuted,
              }}
            >
              <WindowDots />
              <div
                className="flex min-w-0 flex-1 items-center px-2 py-[3px]"
                style={{
                  borderRadius: 999,
                  background: illustrationColors.surface,
                  border: `1px solid ${illustrationColors.border}`,
                }}
              >
                <span
                  className="truncate text-[8px] leading-none lg:text-[9.5px]"
                  style={{ color: illustrationColors.inkFaint }}
                >
                  comlabstechnologies.com
                </span>
              </div>
              <AnimatePresence>
                {complete ? (
                  <motion.span
                    initial={reduce ? false : illustrationPopHidden}
                    animate={illustrationPopShown}
                    transition={fade}
                    className="hidden lg:block"
                  >
                    <Chip tone="accent">
                      <StatusDot />
                      Ready for review
                    </Chip>
                  </motion.span>
                ) : null}
              </AnimatePresence>
            </div>

            {/* Canvas — a real page from the first frame */}
            <div className="relative flex-1 p-2.5 lg:p-3.5">
              <div className="flex h-full flex-col gap-2 lg:gap-2.5">
                {/* Hero */}
                <div className="relative">
                  <div className="flex flex-col gap-[6px] px-1 py-[5px]">
                    <span
                      className="block truncate text-[9px] leading-none font-semibold lg:text-[11px]"
                      style={{ color: illustrationColors.ink }}
                    >
                      Design &amp; engineering studio
                    </span>
                    <Bar width="58%" height={3.5} />
                    <div className="mt-[3px] flex items-center gap-1.5">
                      <span
                        className="flex items-center justify-center px-2 py-[3px]"
                        style={{
                          borderRadius: 999,
                          background: illustrationColors.accent,
                        }}
                      >
                        <span
                          className="text-[6.5px] leading-none font-semibold lg:text-[8px]"
                          style={{ color: illustrationColors.surface }}
                        >
                          Start a project
                        </span>
                      </span>
                      <span
                        className="flex items-center justify-center px-2 py-[3px]"
                        style={{
                          borderRadius: 999,
                          border: `1px solid ${illustrationColors.border}`,
                        }}
                      >
                        <span
                          className="text-[6.5px] leading-none lg:text-[8px]"
                          style={{ color: illustrationColors.inkMuted }}
                        >
                          View work
                        </span>
                      </span>
                    </div>
                  </div>

                  {/* Selection outline + alignment guides */}
                  <AnimatePresence>
                    {guidesVisible ? (
                      <motion.div
                        key="guides"
                        initial={reduce ? false : illustrationBlurHidden}
                        animate={illustrationBlurShown}
                        exit={reduce ? undefined : illustrationBlurHidden}
                        transition={{ duration: illustrationTiming.feedbackSec, ease: illustrationEase }}
                        className="pointer-events-none absolute -inset-1"
                      >
                        <span
                          className="absolute inset-0"
                          style={{
                            border: `1px solid ${illustrationColors.accentLine}`,
                            borderRadius: 4,
                          }}
                        />
                        {[
                          "left-0 top-0",
                          "right-0 top-0",
                          "left-0 bottom-0",
                          "right-0 bottom-0",
                        ].map((position) => (
                          <span
                            key={position}
                            className={`absolute ${position} block h-[3px] w-[3px]`}
                            style={{
                              background: illustrationColors.surface,
                              border: `1px solid ${illustrationColors.accent}`,
                              transform: "translate(-50%, -50%)",
                            }}
                          />
                        ))}
                        <span
                          className="absolute top-1/2 -left-2 h-px w-2"
                          style={{ background: illustrationColors.accentLine }}
                        />
                        <span
                          className="absolute top-1/2 -right-2 h-px w-2"
                          style={{ background: illustrationColors.accentLine }}
                        />
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </div>

                {/* Trust row */}
                <div
                  className="flex items-center gap-1.5 border-y px-1 py-[6px]"
                  style={{ borderColor: illustrationColors.border }}
                >
                  <span
                    className="shrink-0 text-[6px] leading-none tracking-[0.1em] uppercase lg:text-[7px]"
                    style={{ color: illustrationColors.inkFaint }}
                  >
                    Trusted by
                  </span>
                  {[0, 1, 2, 3].map((item) => (
                    <span
                      key={item}
                      className="block flex-1"
                      style={{
                        height: 6,
                        borderRadius: 2,
                        background: "rgba(28,25,23,0.11)",
                      }}
                    />
                  ))}
                </div>

                {/* Content cards */}
                <div className="grid flex-1 grid-cols-2 gap-2">
                  {CONTENT_CARDS.map((card, index) => (
                    <div key={card.title} className="relative h-full">
                      <AnimatePresence mode="wait" initial={false}>
                        {cardsResolved ? (
                          <motion.div
                            key="card-live"
                            initial={reduce ? false : illustrationTextSwapHidden}
                            animate={illustrationTextSwapShown}
                            transition={{
                              ...fade,
                              delay: reduce ? 0 : index * illustrationTiming.staggerSec,
                            }}
                            className="flex h-full flex-col gap-[5px] p-1.5 lg:p-2"
                            style={{
                              borderRadius: illustrationRadius.control,
                              border: `1px solid ${illustrationColors.border}`,
                              background: illustrationColors.surfaceMuted,
                            }}
                          >
                            <span
                              className="block h-[9px] w-[9px]"
                              style={{
                                borderRadius: 2,
                                background: illustrationColors.accentSoft,
                                border: "1px solid rgba(201,100,66,0.24)",
                              }}
                            />
                            <span
                              className="truncate text-[7px] leading-none font-semibold lg:text-[9px]"
                              style={{ color: illustrationColors.ink }}
                            >
                              {card.title}
                            </span>
                            <span
                              className="truncate text-[6.5px] leading-none lg:text-[8px]"
                              style={{ color: illustrationColors.inkFaint }}
                            >
                              {card.meta}
                            </span>
                          </motion.div>
                        ) : (
                          <motion.div
                            key="card-wire"
                            initial={false}
                            exit={reduce ? undefined : illustrationBlurHidden}
                            transition={fade}
                            className="h-full"
                          >
                            <div
                              className="flex h-full w-full items-center justify-center"
                              style={{
                                borderRadius: illustrationRadius.control,
                                border: `1px dashed ${illustrationColors.wire}`,
                                background:
                                  "repeating-linear-gradient(135deg, rgba(28,25,23,0.028) 0 5px, transparent 5px 10px)",
                              }}
                            >
                              <span
                                className="text-[6px] leading-none tracking-[0.1em] uppercase lg:text-[7px]"
                                style={{ color: illustrationColors.inkFaint }}
                              >
                                Drafting
                              </span>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Panel>

          {/* Mobile preview — offset in front of the browser */}
          <div className="absolute right-1 -bottom-2 w-[54px] lg:right-3 lg:-bottom-3 lg:w-[66px]">
            <div
              className="overflow-hidden p-[3px]"
              style={{
                borderRadius: illustrationRadius.device,
                background: illustrationColors.surface,
                border: `1px solid ${illustrationColors.borderStrong}`,
                boxShadow: illustrationShadow.raised,
              }}
            >
              <div
                className="flex flex-col gap-[3px] p-[5px]"
                style={{
                  borderRadius: 12,
                  background: illustrationColors.surfaceMuted,
                  minHeight: 64,
                }}
              >
                <span
                  className="mx-auto block"
                  style={{
                    width: 14,
                    height: 2,
                    borderRadius: 999,
                    background: "rgba(28,25,23,0.16)",
                  }}
                />
                <div className="flex flex-col gap-[4px] pt-[3px]">
                  <Bar width="84%" height={4} tone="strong" />
                  <Bar width="62%" height={3} />
                  <span
                    className="mt-[2px] block"
                    style={{
                      width: 26,
                      height: 6,
                      borderRadius: 999,
                      background: illustrationColors.accent,
                    }}
                  />
                  {/* Stacked cards confirm the responsive reflow */}
                  <motion.span
                    className="mt-[2px] flex flex-col gap-[3px]"
                    initial={false}
                    animate={{ opacity: mobileResolved ? 1 : 0.35 }}
                    transition={fade}
                  >
                    <span
                      className="block w-full"
                      style={{
                        height: 9,
                        borderRadius: 2,
                        background: "rgba(28,25,23,0.09)",
                      }}
                    />
                    <span
                      className="block w-full"
                      style={{
                        height: 9,
                        borderRadius: 2,
                        background: "rgba(28,25,23,0.09)",
                      }}
                    />
                  </motion.span>
                </div>
              </div>
            </div>
          </div>

          {/* Responsive confirmation */}
          <AnimatePresence>
            {complete ? (
              <motion.div
                initial={reduce ? false : { ...illustrationPopHidden, y: 4 }}
                animate={{ ...illustrationPopShown, y: 0 }}
                transition={fade}
                className="absolute bottom-1 left-1 lg:bottom-2 lg:left-2"
              >
                <Chip tone="neutral" style={{ boxShadow: illustrationShadow.chip }}>
                  <StatusDot />
                  Responsive
                </Chip>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </div>
    </IllustrationStage>
  );
}
