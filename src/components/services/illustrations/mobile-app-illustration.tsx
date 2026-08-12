"use client";

import type { CSSProperties, ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";

import {
  IllustrationStage,
  useIllustrationState,
} from "./service-illustration-frame";
import {
  illustrationColors,
  illustrationEase,
  illustrationTiming,
} from "./illustration-tokens";
import { useIllustrationSequence } from "./use-illustration-sequence";

/* -------------------------------------------------------------------------- */
/* Device tokens                                                              */
/* -------------------------------------------------------------------------- */

const GRAPHITE = "#332E2B";
const GRAPHITE_EDGE = "#4E4642";

const STEPS = 6;

const fade = {
  duration: illustrationTiming.transitionSec,
  ease: illustrationEase,
};

/* -------------------------------------------------------------------------- */
/* Content                                                                    */
/* -------------------------------------------------------------------------- */

const TASKS = [
  { title: "Review homepage", label: "9:00 AM" },
  { title: "Review mobile flow", label: "Next" },
  { title: "Client feedback", label: "2:00 PM" },
] as const;

const CHECKLIST = [
  "Review wireframes",
  "Check navigation",
  "Confirm copy",
] as const;

const NAV_ITEMS = ["Today", "Projects", "Profile"] as const;

/* -------------------------------------------------------------------------- */
/* Icons                                                                      */
/* -------------------------------------------------------------------------- */

type IconProps = { size?: number; color?: string };

function IconSignal({ size = 8, color = GRAPHITE }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 12 12" fill="none" aria-hidden>
      {[0, 1, 2, 3].map((bar) => (
        <rect
          key={bar}
          x={bar * 3}
          y={7 - bar * 2}
          width="2"
          height={3 + bar * 2}
          rx="0.6"
          fill={color}
          opacity={bar === 3 ? 0.35 : 1}
        />
      ))}
    </svg>
  );
}

function IconWifi({ size = 8, color = GRAPHITE }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 12 12" fill="none" aria-hidden>
      <path
        d="M1.2 4.6a7 7 0 0 1 9.6 0"
        stroke={color}
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path
        d="M3.2 6.9a4.2 4.2 0 0 1 5.6 0"
        stroke={color}
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <circle cx="6" cy="9.2" r="0.9" fill={color} />
    </svg>
  );
}

function IconBattery({ size = 12, color = GRAPHITE }: IconProps) {
  return (
    <svg
      width={size}
      height={(size * 7) / 14}
      viewBox="0 0 14 7"
      fill="none"
      aria-hidden
    >
      <rect
        x="0.5"
        y="0.5"
        width="11"
        height="6"
        rx="1.8"
        stroke={color}
        strokeOpacity="0.45"
      />
      <rect x="2" y="2" width="7" height="3" rx="0.8" fill={color} />
      <path
        d="M12.8 2.4v2.2a1.3 1.3 0 0 0 0-2.2Z"
        fill={color}
        fillOpacity="0.45"
      />
    </svg>
  );
}

function IconChevronLeft({
  size = 10,
  color = illustrationColors.ink,
}: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 12 12" fill="none" aria-hidden>
      <path
        d="M7.4 2.6 4 6l3.4 3.4"
        stroke={color}
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconTick({ size = 8, color = illustrationColors.surface }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 12 12" fill="none" aria-hidden>
      <path
        d="M2.6 6.3 4.9 8.6 9.4 3.5"
        stroke={color}
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function NavGlyph({ index, active }: { index: number; active: boolean }) {
  const color = active ? illustrationColors.accent : illustrationColors.inkFaint;
  const paths = [
    "M2 5.6 6 2.4l4 3.2V10H2V5.6Z",
    "M2.6 3.2h6.8M2.6 6h6.8M2.6 8.8h4.4",
    "M6 5.9a1.9 1.9 0 1 0 0-3.8 1.9 1.9 0 0 0 0 3.8ZM2.4 10c.5-1.8 1.9-2.7 3.6-2.7S9.1 8.2 9.6 10",
  ];
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
      <path
        d={paths[index]}
        stroke={color}
        strokeWidth="1.15"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill={active && index === 0 ? "rgba(201,100,66,0.14)" : "none"}
      />
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/* Device shell                                                               */
/* -------------------------------------------------------------------------- */

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
        [side]: -0.75,
        top,
        width: 1.25,
        height,
        background: GRAPHITE_EDGE,
        borderRadius: side === "left" ? "2px 0 0 2px" : "0 2px 2px 0",
      }}
    />
  );
}

function PhoneShell({
  children,
  className,
  style,
  compact = false,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  compact?: boolean;
}) {
  return (
    <div
      className={`relative ${className ?? ""}`}
      style={{
        borderRadius: compact ? 19 : 22,
        background: `linear-gradient(155deg, ${GRAPHITE_EDGE} 0%, ${GRAPHITE} 40%, ${GRAPHITE} 100%)`,
        boxShadow:
          "0 1px 2px rgba(28,25,23,0.08), 0 14px 30px -16px rgba(28,25,23,0.36)",
        padding: 1.5,
        ...style,
      }}
    >
      <SideButton side="left" top="26%" height={7} />
      <SideButton side="left" top="36%" height={7} />
      <SideButton side="right" top="30%" height={11} />

      <div
        className="relative flex h-full w-full flex-col overflow-hidden"
        style={{
          borderRadius: compact ? 17.5 : 20.5,
          background: illustrationColors.surface,
        }}
      >
        {children}
        <span
          aria-hidden
          className="pointer-events-none absolute bottom-[3px] left-1/2 z-30 block -translate-x-1/2"
          style={{
            width: compact ? 22 : 28,
            height: 2,
            borderRadius: 999,
            background: "rgba(28,25,23,0.22)",
          }}
        />
      </div>
    </div>
  );
}

function StatusBar({ compact = false }: { compact?: boolean }) {
  return (
    <div
      className="relative flex h-[14px] shrink-0 items-center justify-between pr-2.5 pl-4 lg:h-[16px] lg:pl-[18px]"
      style={{ background: illustrationColors.surface }}
    >
      <span
        className="text-[7px] leading-none font-semibold lg:text-[8px]"
        style={{ color: GRAPHITE }}
      >
        9:41
      </span>

      <span
        aria-hidden
        className="absolute left-1/2 block -translate-x-1/2"
        style={{
          width: compact ? 18 : 22,
          height: compact ? 5 : 6,
          borderRadius: 999,
          background: GRAPHITE,
        }}
      />

      {compact ? (
        <IconBattery size={10} />
      ) : (
        <span className="flex items-center gap-[3px]">
          <IconSignal size={7} />
          <IconWifi size={7} />
          <IconBattery size={11} />
        </span>
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Front phone — Today                                                        */
/* -------------------------------------------------------------------------- */

function TaskCard({
  title,
  label,
  selected,
}: {
  title: string;
  label: string;
  selected: boolean;
}) {
  return (
    <div
      className="flex items-center justify-between gap-2 px-2.5 py-3 lg:px-3 lg:py-3.5"
      style={{
        borderRadius: 9,
        background: selected ? "rgba(201,100,66,0.06)" : illustrationColors.surface,
        border: `1px solid ${
          selected ? "rgba(201,100,66,0.26)" : "rgba(28,25,23,0.09)"
        }`,
        transition: "background 380ms ease, border-color 380ms ease",
      }}
    >
      <span
        className="min-w-0 truncate text-[8.5px] leading-none font-medium lg:text-[10px]"
        style={{ color: illustrationColors.ink }}
      >
        {title}
      </span>
      <span
        className="shrink-0 text-[7.5px] leading-none lg:text-[8.5px]"
        style={{
          color: selected ? illustrationColors.accent : illustrationColors.inkFaint,
          fontWeight: selected ? 500 : 400,
        }}
      >
        {label}
      </span>
    </div>
  );
}

function FrontPhoneScreen({
  selectedTask,
  toastVisible,
  reduce,
}: {
  selectedTask: boolean;
  toastVisible: boolean;
  reduce: boolean;
}) {
  return (
    <>
      <StatusBar />

      {/* App mark + section */}
      <div className="flex shrink-0 items-center gap-2 px-3 pt-2 pb-3 lg:px-3.5 lg:pt-2.5 lg:pb-4">
        <span
          className="flex h-[15px] w-[15px] shrink-0 items-center justify-center lg:h-[17px] lg:w-[17px]"
          style={{
            borderRadius: 5,
            background: illustrationColors.accent,
          }}
        >
          <span
            className="block h-[6px] w-[6px] lg:h-[7px] lg:w-[7px]"
            style={{
              borderRadius: 2,
              background: illustrationColors.surface,
            }}
          />
        </span>
        <span
          className="text-[9px] leading-none font-medium lg:text-[10.5px]"
          style={{ color: illustrationColors.ink }}
        >
          Today
        </span>
      </div>

      {/* Greeting + progress */}
      <div className="flex shrink-0 flex-col gap-2 px-3 pb-4 lg:gap-2.5 lg:px-3.5 lg:pb-5">
        <span
          className="text-[10px] leading-none font-medium lg:text-[11.5px]"
          style={{ color: illustrationColors.ink }}
        >
          Good morning, Arjun
        </span>
        <span
          className="text-[8px] leading-none lg:text-[9px]"
          style={{ color: illustrationColors.inkMuted }}
        >
          2 of 4 tasks complete
        </span>
      </div>

      {/* Task cards */}
      <div className="flex min-h-0 flex-1 flex-col gap-2.5 px-3 lg:gap-3 lg:px-3.5">
        {TASKS.map((task, index) => (
          <TaskCard
            key={task.title}
            title={task.title}
            label={task.label}
            selected={index === 1 && selectedTask}
          />
        ))}
      </div>

      {/* Bottom navigation */}
      <div
        className="mt-auto flex shrink-0 items-start justify-around border-t px-2 pt-2.5 pb-[10px] lg:pt-3 lg:pb-[11px]"
        style={{
          borderColor: "rgba(28,25,23,0.08)",
          background: illustrationColors.surface,
        }}
      >
        {NAV_ITEMS.map((item, index) => {
          const active = index === 0;
          return (
            <span key={item} className="flex flex-col items-center gap-1">
              <NavGlyph index={index} active={active} />
              <span
                className="text-[7px] leading-none lg:text-[8px]"
                style={{
                  color: active
                    ? illustrationColors.accent
                    : illustrationColors.inkFaint,
                  fontWeight: active ? 500 : 400,
                }}
              >
                {item}
              </span>
            </span>
          );
        })}
      </div>

      {/* Toast */}
      <AnimatePresence>
        {toastVisible ? (
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={fade}
            className="absolute inset-x-3 bottom-[38px] z-20 flex items-center gap-2 px-2.5 py-2 lg:bottom-[42px]"
            style={{
              borderRadius: 8,
              background: GRAPHITE,
              boxShadow: "0 8px 20px -8px rgba(28,25,23,0.42)",
            }}
          >
            <span
              className="flex h-[12px] w-[12px] shrink-0 items-center justify-center"
              style={{ borderRadius: 999, background: illustrationColors.accent }}
            >
              <IconTick size={7} />
            </span>
            <span
              className="truncate text-[8px] leading-none font-medium lg:text-[9px]"
              style={{ color: "#F7F7F4" }}
            >
              Task updated
            </span>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}

/* -------------------------------------------------------------------------- */
/* Rear phone — task detail                                                   */
/* -------------------------------------------------------------------------- */

function ProductThumb() {
  return (
    <div
      className="relative w-full overflow-hidden"
      style={{
        height: 40,
        borderRadius: 8,
        background: illustrationColors.surfaceWarm,
        border: "1px solid rgba(28,25,23,0.08)",
      }}
    >
      <svg
        viewBox="0 0 120 48"
        preserveAspectRatio="xMidYMid slice"
        className="h-full w-full"
        aria-hidden
      >
        <rect x="0" y="0" width="120" height="48" fill="#F5F0E8" />
        <rect x="12" y="10" width="36" height="22" rx="3" fill="rgba(28,25,23,0.06)" />
        <rect x="54" y="14" width="48" height="4" rx="2" fill="rgba(28,25,23,0.10)" />
        <rect x="54" y="22" width="36" height="3" rx="1.5" fill="rgba(28,25,23,0.06)" />
        <rect x="54" y="28" width="28" height="3" rx="1.5" fill="rgba(28,25,23,0.05)" />
        <rect x="12" y="36" width="90" height="3" rx="1.5" fill="rgba(201,100,66,0.22)" />
      </svg>
    </div>
  );
}

function RearPhoneScreen({
  detailVisible,
  checklistDone,
}: {
  detailVisible: boolean;
  checklistDone: number;
}) {
  if (!detailVisible) {
    return (
      <>
        <StatusBar compact />
        <div className="flex flex-1 items-center justify-center px-3">
          <span
            className="text-[8px] leading-none lg:text-[9px]"
            style={{ color: illustrationColors.inkFaint }}
          >
            Select a task
          </span>
        </div>
      </>
    );
  }

  return (
    <>
      <StatusBar compact />

      <div
        className="flex shrink-0 items-center gap-2 border-b px-3 pt-2 pb-3 lg:px-3.5"
        style={{ borderColor: "rgba(28,25,23,0.08)" }}
      >
        <IconChevronLeft size={9} />
        <span
          className="truncate text-[9px] leading-none font-medium lg:text-[10.5px]"
          style={{ color: illustrationColors.ink }}
        >
          Review mobile flow
        </span>
      </div>

      <div className="flex min-h-0 flex-1 flex-col gap-3 px-3 pt-3 lg:gap-3.5 lg:px-3.5 lg:pt-4">
        <ProductThumb />

        <div className="flex flex-col gap-1.5">
          <span
            className="text-[8px] leading-none lg:text-[9px]"
            style={{ color: illustrationColors.inkFaint }}
          >
            Project
          </span>
          <span
            className="text-[9px] leading-none font-medium lg:text-[10.5px]"
            style={{ color: illustrationColors.ink }}
          >
            Comlabs Mobile
          </span>
        </div>

        <span
          className="text-[8px] leading-none lg:text-[9px]"
          style={{ color: illustrationColors.accent }}
        >
          Due today
        </span>

        <div className="flex flex-col gap-2.5 pt-1">
          {CHECKLIST.map((item, index) => {
            const done = index < checklistDone;
            return (
              <span key={item} className="flex items-center gap-2.5">
                <span
                  className="flex h-[12px] w-[12px] shrink-0 items-center justify-center lg:h-[13px] lg:w-[13px]"
                  style={{
                    borderRadius: 3,
                    background: done ? illustrationColors.accent : "transparent",
                    border: `1px solid ${
                      done ? illustrationColors.accent : "rgba(28,25,23,0.16)"
                    }`,
                    transition: "background 320ms ease, border-color 320ms ease",
                  }}
                >
                  {done ? <IconTick size={7} /> : null}
                </span>
                <span
                  className="truncate text-[8px] leading-none lg:text-[9.5px]"
                  style={{
                    color: done
                      ? illustrationColors.inkFaint
                      : illustrationColors.inkMuted,
                    textDecoration: done ? "line-through" : "none",
                  }}
                >
                  {item}
                </span>
              </span>
            );
          })}
        </div>
      </div>

      <div className="mt-auto shrink-0 px-3 pt-2 pb-[10px] lg:px-3.5 lg:pb-[11px]">
        <span
          className="flex items-center justify-center py-2.5 lg:py-3"
          style={{
            borderRadius: 8,
            background: illustrationColors.accent,
          }}
        >
          <span
            className="text-[8.5px] leading-none font-medium lg:text-[9.5px]"
            style={{ color: illustrationColors.surface }}
          >
            Mark complete
          </span>
        </span>
      </div>
    </>
  );
}

/* -------------------------------------------------------------------------- */
/* Composition                                                                */
/* -------------------------------------------------------------------------- */

export function MobileAppIllustration() {
  const { active, reduce } = useIllustrationState();
  const step = useIllustrationSequence({ steps: STEPS, active, reduce });

  // 0 populated · 1 task selected · 2 detail · 3 checklist · 4 toast · 5 hold
  const selectedTask = step >= 1;
  const detailVisible = step >= 2;
  const checklistDone = step >= 3 ? 1 : 0;
  const toastVisible = step >= 4;

  return (
    <IllustrationStage className="px-4 py-3 lg:px-7 lg:py-4">
      <span
        aria-hidden
        className="absolute inset-0"
        style={{ background: "rgba(247,247,244,0.48)" }}
      />
      <span
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(56% 50% at 36% 44%, rgba(255,246,236,0.88) 0%, rgba(253,247,239,0.30) 44%, rgba(247,247,244,0) 72%)",
        }}
      />

      <div className="relative flex h-full items-end justify-center">
        <span
          aria-hidden
          className="pointer-events-none absolute bottom-[2px] left-[42%] block h-[12px] w-[55%] -translate-x-1/2"
          style={{
            background:
              "radial-gradient(50% 50% at 50% 50%, rgba(28,25,23,0.18) 0%, rgba(28,25,23,0) 72%)",
          }}
        />

        {/* Front phone — dominant */}
        <PhoneShell className="relative z-10 h-[98%] w-[132px] shrink-0 lg:w-[172px]">
          <FrontPhoneScreen
            selectedTask={selectedTask}
            toastVisible={toastVisible}
            reduce={reduce}
          />
        </PhoneShell>

        {/* Rear phone — smaller, offset up and right */}
        <PhoneShell
          compact
          className="relative -ml-3 h-[84%] w-[108px] shrink-0 lg:-ml-4 lg:w-[138px]"
          style={{
            zIndex: 0,
            opacity: 0.96,
            transform:
              "translateX(8px) translateY(-12px) perspective(900px) rotateY(2.5deg)",
          }}
        >
          <RearPhoneScreen
            detailVisible={detailVisible}
            checklistDone={checklistDone}
          />
        </PhoneShell>
      </div>
    </IllustrationStage>
  );
}
