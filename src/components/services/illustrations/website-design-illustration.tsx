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
  illustrationColors,
  illustrationEase,
  illustrationRadius,
  illustrationShadow,
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

const STEPS = 5;

const fade = {
  duration: illustrationTiming.transitionSec,
  ease: illustrationEase,
};

/** Dashed placeholder that resolves into a finished component. */
function WireSurface({ height }: { height: number }) {
  return (
    <div
      className="w-full"
      style={{
        height,
        borderRadius: illustrationRadius.control,
        border: `1px dashed ${illustrationColors.wire}`,
        background:
          "repeating-linear-gradient(135deg, rgba(28,25,23,0.028) 0 5px, transparent 5px 10px)",
      }}
    />
  );
}

export function WebsiteDesignIllustration() {
  const { active, reduce } = useIllustrationState();
  const step = useIllustrationSequence({ steps: STEPS, active, reduce });

  const heroResolved = step >= 1;
  const guidesVisible = step === 1;
  const bodyResolved = step >= 2;
  const mobileResolved = step >= 3;
  const complete = step >= 4;

  return (
    <IllustrationStage>
      <div className="flex h-full items-stretch gap-3">
        {/* Page layer rail — secondary layer, desktop only */}
        <div className="hidden w-[82px] shrink-0 flex-col lg:flex">
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
                      className="truncate text-[9px] leading-none"
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
                  className="truncate text-[8px] leading-none lg:text-[10px]"
                  style={{ color: illustrationColors.inkFaint }}
                >
                  comlabstechnologies.com
                </span>
              </div>
              <AnimatePresence>
                {complete ? (
                  <motion.span
                    initial={reduce ? false : { opacity: 0, scale: 0.94 }}
                    animate={{ opacity: 1, scale: 1 }}
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

            {/* Canvas */}
            <div className="relative flex-1 p-2.5 lg:p-3.5">
              <div className="flex h-full flex-col gap-2 lg:gap-2.5">
                {/* Hero component — selected, with alignment guides */}
                <div className="relative">
                  <AnimatePresence mode="wait" initial={false}>
                    {heroResolved ? (
                      <motion.div
                        key="hero-live"
                        initial={reduce ? false : { opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={fade}
                        className="flex flex-col gap-[6px] px-1 py-[6px]"
                      >
                        <Bar width="72%" height={6} tone="strong" />
                        <Bar width="52%" height={4} />
                        <div className="mt-[3px] flex items-center gap-1.5">
                          <span
                            className="block"
                            style={{
                              width: 34,
                              height: 9,
                              borderRadius: 999,
                              background: illustrationColors.accent,
                            }}
                          />
                          <span
                            className="block"
                            style={{
                              width: 26,
                              height: 9,
                              borderRadius: 999,
                              border: `1px solid ${illustrationColors.border}`,
                            }}
                          />
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="hero-wire"
                        initial={false}
                        exit={reduce ? undefined : { opacity: 0 }}
                        transition={fade}
                      >
                        <WireSurface height={46} />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Selection outline + alignment guides */}
                  <AnimatePresence>
                    {guidesVisible ? (
                      <motion.div
                        key="guides"
                        initial={reduce ? false : { opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={reduce ? undefined : { opacity: 0 }}
                        transition={{ duration: 0.22, ease: illustrationEase }}
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
                            className={`absolute ${position} block h-[3px] w-[3px] -translate-x-1/2 -translate-y-1/2`}
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

                {/* Trust bar */}
                <div className="flex items-center gap-1.5">
                  {[0, 1, 2, 3].map((item) => (
                    <motion.span
                      key={item}
                      initial={false}
                      animate={{ opacity: bodyResolved ? 1 : 0.45 }}
                      transition={fade}
                      className="block flex-1"
                      style={{
                        height: 7,
                        borderRadius: 2,
                        background: bodyResolved
                          ? "rgba(28,25,23,0.10)"
                          : "transparent",
                        border: bodyResolved
                          ? "none"
                          : `1px dashed ${illustrationColors.wire}`,
                      }}
                    />
                  ))}
                </div>

                {/* Services grid */}
                <div className="grid flex-1 grid-cols-3 gap-1.5">
                  {[0, 1, 2].map((card) => (
                    <div key={card} className="relative h-full">
                      <AnimatePresence mode="wait" initial={false}>
                        {bodyResolved ? (
                          <motion.div
                            key="card-live"
                            initial={reduce ? false : { opacity: 0, y: 3 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                              ...fade,
                              delay: reduce ? 0 : card * 0.06,
                            }}
                            className="flex h-full flex-col gap-[5px] p-1.5"
                            style={{
                              borderRadius: illustrationRadius.control,
                              border: `1px solid ${illustrationColors.border}`,
                              background: illustrationColors.surfaceMuted,
                            }}
                          >
                            <span
                              className="block h-[8px] w-[8px]"
                              style={{
                                borderRadius: 2,
                                background: illustrationColors.accentSoft,
                                border: "1px solid rgba(201,100,66,0.22)",
                              }}
                            />
                            <Bar width="80%" height={3} tone="strong" />
                            <Bar width="60%" height={3} />
                          </motion.div>
                        ) : (
                          <motion.div
                            key="card-wire"
                            initial={false}
                            exit={reduce ? undefined : { opacity: 0 }}
                            transition={fade}
                            className="h-full"
                          >
                            <div
                              className="h-full w-full"
                              style={{
                                borderRadius: illustrationRadius.control,
                                border: `1px dashed ${illustrationColors.wire}`,
                              }}
                            />
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
          <motion.div
            initial={false}
            animate={{
              opacity: 1,
              y: mobileResolved && !reduce ? -2 : 0,
            }}
            transition={fade}
            className="absolute right-1 -bottom-2 w-[52px] lg:right-3 lg:-bottom-3 lg:w-[64px]"
          >
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
                  minHeight: 62,
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
                <AnimatePresence mode="wait" initial={false}>
                  {mobileResolved ? (
                    <motion.div
                      key="phone-live"
                      initial={reduce ? false : { opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={fade}
                      className="flex flex-col gap-[4px] pt-[3px]"
                    >
                      <Bar width="82%" height={4} tone="strong" />
                      <Bar width="60%" height={3} />
                      <span
                        className="mt-[2px] block"
                        style={{
                          width: 24,
                          height: 6,
                          borderRadius: 999,
                          background: illustrationColors.accent,
                        }}
                      />
                      <span
                        className="mt-[2px] block w-full"
                        style={{
                          height: 12,
                          borderRadius: 3,
                          background: "rgba(28,25,23,0.07)",
                        }}
                      />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="phone-wire"
                      initial={false}
                      exit={reduce ? undefined : { opacity: 0 }}
                      transition={fade}
                      className="flex flex-col gap-[4px] pt-[3px]"
                    >
                      <WireSurface height={14} />
                      <WireSurface height={20} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>

          {/* Responsive confirmation */}
          <AnimatePresence>
            {complete ? (
              <motion.div
                initial={reduce ? false : { opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0 }}
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
