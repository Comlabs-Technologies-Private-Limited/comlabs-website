"use client";

import { AnimatePresence, motion } from "framer-motion";

import {
  Bar,
  CheckGlyph,
  Chip,
  MicroLabel,
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
  illustrationShadow,
  illustrationTiming,
} from "./illustration-tokens";
import { useIllustrationSequence } from "./use-illustration-sequence";

const JOBS = [
  { id: "Baner, Pune", detail: "Install · 09:30" },
  { id: "Hinjawadi Ph 2", detail: "Service · 12:00" },
  { id: "Kharadi", detail: "Survey · 15:45" },
] as const;

const SHEET_OPTIONS = ["On site", "Completed", "Needs parts"] as const;

const STEPS = 6;

const fade = {
  duration: illustrationTiming.transitionSec,
  ease: illustrationEase,
};

const BEZEL = "#231F1D";

/** Slim hardware button on the phone edge. */
function SideButton({
  side,
  top,
  height,
}: {
  side: "left" | "right";
  top: string;
  height: number;
}) {
  return (
    <span
      aria-hidden
      className="absolute block"
      style={{
        [side]: -1,
        top,
        width: 1.5,
        height,
        background: "#453E3A",
        borderRadius: side === "left" ? "2px 0 0 2px" : "0 2px 2px 0",
      }}
    />
  );
}

/** Sleek iPhone frame: thin titanium bezel, Dynamic Island, home indicator. */
function PhoneShell({
  children,
  className,
  style,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className={`relative ${className ?? ""}`}
      style={{
        borderRadius: 24,
        background: `linear-gradient(155deg, #4A423E 0%, ${BEZEL} 38%, ${BEZEL} 68%, #443C38 100%)`,
        boxShadow: illustrationShadow.raised,
        padding: 3,
        ...style,
      }}
    >
      <SideButton side="left" top="24%" height={9} />
      <SideButton side="left" top="35%" height={9} />
      <SideButton side="right" top="29%" height={13} />

      <div
        className="relative flex h-full w-full flex-col overflow-hidden"
        style={{
          borderRadius: 21,
          background: illustrationColors.surfaceMuted,
        }}
      >
        {/* Status bar reserving space for the Dynamic Island */}
        <div
          className="relative flex h-[13px] shrink-0 items-center justify-center"
          style={{ background: illustrationColors.surface }}
        >
          <span
            aria-hidden
            className="block"
            style={{
              width: 24,
              height: 6.5,
              borderRadius: 999,
              background: BEZEL,
            }}
          />
        </div>

        {children}

        {/* Home indicator floats above sheets, as it does on iOS */}
        <span
          aria-hidden
          className="pointer-events-none absolute bottom-[3px] left-1/2 z-30 block -translate-x-1/2"
          style={{
            width: 30,
            height: 2,
            borderRadius: 999,
            background: "rgba(28,25,23,0.28)",
          }}
        />
      </div>
    </div>
  );
}

export function MobileAppIllustration() {
  const { active, reduce } = useIllustrationState();
  const step = useIllustrationSequence({ steps: STEPS, active, reduce });

  const rowPressed = step >= 1;
  const sheetOpen = step >= 2 && step <= 3;
  const optionSelected = step >= 3;
  const toastVisible = step >= 4;
  const synced = step >= 5;

  return (
    <IllustrationStage>
      <div className="relative flex h-full items-stretch justify-center">
        {/* Primary phone */}
        <PhoneShell className="relative z-10 h-full w-[128px] shrink-0 lg:w-[156px]">
          {/* App bar */}
          <div
            className="flex items-center justify-between gap-1 border-b px-2 py-[7px]"
            style={{
              borderColor: illustrationColors.border,
              background: illustrationColors.surface,
            }}
          >
            <span
              className="text-[8.5px] leading-none font-medium lg:text-[11px]"
              style={{ color: illustrationColors.ink }}
            >
              Today
            </span>
            <AnimatePresence>
              {synced ? (
                <motion.span
                  initial={reduce ? false : { opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={fade}
                >
                  <Chip tone="accent" className="px-1">
                    <CheckGlyph size={7} />
                    Synced
                  </Chip>
                </motion.span>
              ) : (
                <motion.span
                  initial={false}
                  exit={reduce ? undefined : { opacity: 0 }}
                  transition={fade}
                >
                  <Chip tone="quiet" className="px-1">
                    3 jobs
                  </Chip>
                </motion.span>
              )}
            </AnimatePresence>
          </div>

          {/* Job list */}
          <div className="flex flex-1 flex-col gap-1.5 p-1.5">
            {JOBS.map((job, index) => {
              const isTarget = index === 0;
              const highlighted = isTarget && rowPressed;
              const done = isTarget && toastVisible;

              return (
                <motion.div
                  key={job.id}
                  initial={false}
                  animate={{
                    scale: highlighted && !optionSelected && !reduce ? 0.985 : 1,
                  }}
                  transition={{ duration: 0.18, ease: illustrationEase }}
                  className="flex items-center gap-1.5 px-1.5 py-[6px]"
                  style={{
                    borderRadius: illustrationRadius.control,
                    background: highlighted
                      ? illustrationColors.accentSoft
                      : illustrationColors.surface,
                    border: `1px solid ${
                      highlighted
                        ? "rgba(201,100,66,0.22)"
                        : illustrationColors.border
                    }`,
                  }}
                >
                  <span
                    className="flex h-[13px] w-[13px] shrink-0 items-center justify-center"
                    style={{
                      borderRadius: 999,
                      border: `1px solid ${
                        done
                          ? illustrationColors.accent
                          : illustrationColors.wire
                      }`,
                      background: done
                        ? illustrationColors.accent
                        : "transparent",
                    }}
                  >
                    {done ? (
                      <CheckGlyph size={7} color={illustrationColors.surface} />
                    ) : null}
                  </span>
                  <span className="flex min-w-0 flex-1 flex-col gap-[3px]">
                    <span
                      className="truncate text-[8px] leading-none font-medium lg:text-[10px]"
                      style={{ color: illustrationColors.ink }}
                    >
                      {job.id}
                    </span>
                    <span
                      className="truncate text-[7.5px] leading-none lg:text-[9.5px]"
                      style={{ color: illustrationColors.inkFaint }}
                    >
                      {done ? "Completed · synced" : job.detail}
                    </span>
                  </span>
                </motion.div>
              );
            })}
          </div>

          {/* Bottom navigation */}
          <div
            className="flex items-center justify-around border-t px-2 pt-[6px] pb-[10px]"
            style={{
              borderColor: illustrationColors.border,
              background: illustrationColors.surface,
            }}
          >
            {[0, 1, 2].map((tab) => (
              <span
                key={tab}
                className="block"
                style={{
                  width: 12,
                  height: 3,
                  borderRadius: 999,
                  background:
                    tab === 0
                      ? illustrationColors.accent
                      : "rgba(28,25,23,0.12)",
                }}
              />
            ))}
          </div>

          {/* Bottom sheet */}
          <AnimatePresence>
            {sheetOpen ? (
              <motion.div
                key="sheet"
                initial={reduce ? false : { y: "100%" }}
                animate={{ y: 0 }}
                exit={reduce ? undefined : { y: "100%" }}
                transition={{ duration: 0.34, ease: illustrationEase }}
                className="absolute inset-x-0 bottom-0 flex flex-col gap-1.5 p-2 pb-[11px]"
                style={{
                  borderTopLeftRadius: 12,
                  borderTopRightRadius: 12,
                  background: illustrationColors.surface,
                  borderTop: `1px solid ${illustrationColors.border}`,
                  boxShadow: "0 -8px 24px -12px rgba(28,25,23,0.28)",
                }}
              >
                <span
                  className="mx-auto block"
                  style={{
                    width: 18,
                    height: 2,
                    borderRadius: 999,
                    background: "rgba(28,25,23,0.14)",
                  }}
                />
                <MicroLabel className="pt-[2px]">Update status</MicroLabel>
                {SHEET_OPTIONS.map((option) => {
                  const isChosen = option === "Completed" && optionSelected;
                  return (
                    <span
                      key={option}
                      className="flex items-center justify-between gap-1 px-1.5 py-[5px]"
                      style={{
                        borderRadius: illustrationRadius.chip,
                        background: isChosen
                          ? illustrationColors.accentSoft
                          : illustrationColors.surfaceMuted,
                        border: `1px solid ${
                          isChosen
                            ? "rgba(201,100,66,0.24)"
                            : illustrationColors.border
                        }`,
                      }}
                    >
                      <span
                        className="text-[8px] leading-none lg:text-[10px]"
                        style={{
                          color: isChosen
                            ? illustrationColors.accent
                            : illustrationColors.inkMuted,
                        }}
                      >
                        {option}
                      </span>
                      {isChosen ? <CheckGlyph size={8} /> : null}
                    </span>
                  );
                })}
              </motion.div>
            ) : null}
          </AnimatePresence>

          {/* Confirmation toast */}
          <AnimatePresence>
            {toastVisible ? (
              <motion.div
                key="toast"
                initial={reduce ? false : { opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0 }}
                transition={fade}
                className="absolute inset-x-2 bottom-[26px] flex items-center gap-1.5 px-2 py-[6px]"
                style={{
                  borderRadius: illustrationRadius.control,
                  background: illustrationColors.ink,
                  boxShadow: illustrationShadow.raised,
                }}
              >
                <CheckGlyph size={8} color="#F7F7F4" />
                <span
                  className="truncate text-[7.5px] leading-none lg:text-[9.5px]"
                  style={{ color: "#F7F7F4" }}
                >
                  Job updated
                </span>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </PhoneShell>

        {/* Secondary phone — tucked behind the primary for depth */}
        <PhoneShell
          className="relative -ml-4 h-[88%] w-[112px] shrink-0 self-center lg:-ml-6 lg:w-[138px]"
          style={{ opacity: 0.94, zIndex: 0 }}
        >
          {/* Inset from the left so the overlap with the primary phone never hides content. */}
          <div
            className="flex items-center justify-between border-b py-[7px] pr-2 pl-5 lg:pl-7"
            style={{
              borderColor: illustrationColors.border,
              background: illustrationColors.surface,
            }}
          >
            <span
              className="text-[10px] leading-none font-medium"
              style={{ color: illustrationColors.ink }}
            >
              Job detail
            </span>
          </div>
          <div className="flex flex-1 flex-col gap-2 pt-2 pr-2 pb-3 pl-5 lg:pl-7">
            <span
              className="block w-full"
              style={{
                height: 40,
                borderRadius: illustrationRadius.control,
                background: illustrationColors.surfaceWarm,
                border: `1px solid ${illustrationColors.border}`,
              }}
            />
            <Bar width="76%" height={4} tone="strong" />
            <Bar width="58%" height={3} />
            <div className="mt-auto flex flex-col gap-1.5">
              <Chip tone="quiet" className="self-start">
                <StatusDot tone="idle" />
                Available offline
              </Chip>
              <span
                className="block w-full"
                style={{
                  height: 14,
                  borderRadius: 999,
                  background: illustrationColors.accent,
                }}
              />
            </div>
          </div>
        </PhoneShell>
      </div>
    </IllustrationStage>
  );
}
