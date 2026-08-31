"use client";

import type { CSSProperties, ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";

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
  illustrationTextSwapExit,
  illustrationTextSwapHidden,
  illustrationTextSwapShown,
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

const swap = {
  duration: illustrationTiming.feedbackSec,
  ease: illustrationEase,
};

/* -------------------------------------------------------------------------- */
/* Content                                                                    */
/* -------------------------------------------------------------------------- */

const SCREEN = "#F8F8F6";

const TODAY = [
  {
    title: "Production deploy",
    meta: "Live · api.comlabs",
    icon: "layers" as const,
  },
  {
    title: "Seat request · Acme",
    meta: "Review · Billing",
    icon: "spinner" as const,
  },
  {
    title: "Usage limit alert",
    meta: "Watching · 82% of plan",
    icon: "pulse" as const,
  },
  {
    title: "Webhook retry failed",
    meta: "Payments · 3 attempts",
    icon: "branch" as const,
  },
] as const;

const YESTERDAY = [
  {
    title: "Invoice #1842 paid",
    meta: "Billing · ₹2.4L",
    icon: "doc" as const,
  },
  {
    title: "Workspace created",
    meta: "Northstar · 4 members",
    icon: "layers" as const,
  },
] as const;

const CHECKLIST = [
  "Verify workspace domain",
  "Assign 12 seats",
  "Attach Business plan",
  "Notify workspace admin",
] as const;

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

function IconLayers({ size = 10, color = illustrationColors.inkFaint }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 12 12" fill="none" aria-hidden>
      <path
        d="M6 1.8 10.2 4.1 6 6.4 1.8 4.1Z"
        stroke={color}
        strokeWidth="1.05"
        strokeLinejoin="round"
      />
      <path
        d="M2.2 5.8 6 8 9.8 5.8"
        stroke={color}
        strokeWidth="1.05"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2.2 7.6 6 9.8 9.8 7.6"
        stroke={color}
        strokeWidth="1.05"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconBranch({ size = 10, color = illustrationColors.inkFaint }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 12 12" fill="none" aria-hidden>
      <circle cx="3.2" cy="3" r="1.3" stroke={color} strokeWidth="1.1" />
      <circle cx="3.2" cy="9" r="1.3" stroke={color} strokeWidth="1.1" />
      <circle cx="8.8" cy="6" r="1.3" stroke={color} strokeWidth="1.1" />
      <path
        d="M3.2 4.3v3.4M4.4 3.4c2.2 0 3.2 1.2 3.2 2.6"
        stroke={color}
        strokeWidth="1.1"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconSpinner({
  size = 10,
  color = illustrationColors.inkFaint,
  spin = false,
}: IconProps & { spin?: boolean }) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden
      animate={spin ? { rotate: 360 } : undefined}
      transition={spin ? { duration: 1.4, repeat: Infinity, ease: "linear" } : undefined}
    >
      {Array.from({ length: 8 }, (_, index) => {
        const angle = (index / 8) * Math.PI * 2 - Math.PI / 2;
        return (
          <circle
            key={index}
            cx={6 + Math.cos(angle) * 3.6}
            cy={6 + Math.sin(angle) * 3.6}
            r="0.75"
            fill={color}
            opacity={(index + 1) / 8}
          />
        );
      })}
    </motion.svg>
  );
}

function IconPulse({ size = 10, color = illustrationColors.inkFaint }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 12 12" fill="none" aria-hidden>
      <path
        d="M1.5 6.5H3.2L4.4 3.6 6.2 8.8 7.5 5.4 8.6 6.5H10.5"
        stroke={color}
        strokeWidth="1.15"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconDoc({ size = 10, color = illustrationColors.inkFaint }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 12 12" fill="none" aria-hidden>
      <path
        d="M3.2 1.8h4.2L9.2 3.6v6.6H3.2V1.8Z"
        stroke={color}
        strokeWidth="1.1"
        strokeLinejoin="round"
      />
      <path
        d="M7.2 1.8V3.8H9.2M4.4 6.2h3.2M4.4 8.2h2.4"
        stroke={color}
        strokeWidth="1.1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

type InboxIcon = "layers" | "spinner" | "branch" | "pulse" | "doc";

function TaskIcon({
  name,
  active,
  spin,
}: {
  name: InboxIcon;
  active: boolean;
  spin: boolean;
}) {
  const color = active ? illustrationColors.inkMuted : illustrationColors.inkFaint;
  if (name === "spinner") return <IconSpinner color={color} spin={spin} />;
  if (name === "branch") return <IconBranch color={color} />;
  if (name === "pulse") return <IconPulse color={color} />;
  if (name === "doc") return <IconDoc color={color} />;
  return <IconLayers color={color} />;
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
          background: SCREEN,
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
      style={{ background: SCREEN }}
    >
      <span
        className="text-[7px] leading-none font-medium lg:text-[8px]"
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

function InboxRow({
  title,
  meta,
  icon,
  selected,
  spin,
  index,
  reduce,
}: {
  title: string;
  meta: string;
  icon: InboxIcon;
  selected: boolean;
  spin: boolean;
  index: number;
  reduce: boolean;
}) {
  return (
    <motion.div
      initial={reduce ? false : { ...illustrationBlurHidden, y: 6 }}
      animate={{ ...illustrationBlurShown, y: 0 }}
      transition={{
        ...fade,
        delay: reduce ? 0 : index * illustrationTiming.staggerSec,
      }}
      className="flex items-start gap-2.5 px-3 py-3 lg:gap-3 lg:px-4 lg:py-3.5"
      style={{
        background: selected ? "rgba(28,25,23,0.04)" : "transparent",
        boxShadow: `inset 0 -1px 0 ${illustrationColors.border}`,
      }}
    >
      <span className="mt-[1px] flex h-3 w-3 shrink-0 items-center justify-center lg:h-3.5 lg:w-3.5">
        <TaskIcon name={icon} active={selected} spin={spin} />
      </span>
      <span className="flex min-w-0 flex-1 flex-col gap-1">
        <span
          className="truncate text-[8.5px] leading-none lg:text-[10px]"
          style={{ color: illustrationColors.ink }}
        >
          {title}
        </span>
        <span className="relative h-[8px] overflow-hidden lg:h-[9px]">
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={meta}
              initial={reduce ? false : illustrationTextSwapHidden}
              animate={illustrationTextSwapShown}
              exit={reduce ? undefined : illustrationTextSwapExit}
              transition={swap}
              className="absolute inset-0 truncate text-[7px] leading-none lg:text-[8px]"
              style={{ color: illustrationColors.inkFaint }}
            >
              {meta}
            </motion.span>
          </AnimatePresence>
        </span>
      </span>
    </motion.div>
  );
}

function SegmentedControl() {
  return (
    <span
      className="flex items-center rounded-full p-[2px]"
      style={{ background: "rgba(28,25,23,0.06)" }}
    >
      <span
        className="rounded-full px-2 py-[3px] text-[7px] leading-none lg:px-2.5 lg:text-[8px]"
        style={{
          background: illustrationColors.surface,
          color: illustrationColors.ink,
          boxShadow: "0 1px 1px rgba(28,25,23,0.06)",
        }}
      >
        Inbox
      </span>
      <span
        className="px-2 py-[3px] text-[7px] leading-none lg:px-2.5 lg:text-[8px]"
        style={{ color: illustrationColors.inkFaint }}
      >
        Board
      </span>
    </span>
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

      <div className="grid shrink-0 grid-cols-[1fr_auto_1fr] items-center px-3 pt-1 pb-3 lg:px-4 lg:pb-4">
        <span
          className="flex h-[14px] w-[14px] items-center justify-center lg:h-4 lg:w-4"
          style={{
            borderRadius: 4,
            background: GRAPHITE,
          }}
        >
          <span
            className="block h-[5px] w-[5px] lg:h-1.5 lg:w-1.5"
            style={{
              borderRadius: 1,
              background: SCREEN,
            }}
          />
        </span>
        <SegmentedControl />
        <span
          className="h-[14px] w-[14px] justify-self-end rounded-full lg:h-4 lg:w-4"
          style={{
            background: "rgba(28,25,23,0.10)",
            boxShadow: "inset 0 0 0 0.5px rgba(28,25,23,0.08)",
          }}
        />
      </div>

      <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
        <span
          className="shrink-0 px-3 pb-1 text-[7.5px] leading-none lg:px-4 lg:text-[8.5px]"
          style={{ color: illustrationColors.inkFaint }}
        >
          Today
        </span>
        {TODAY.map((item, index) => {
          const selected = index === 1 && selectedTask;
          return (
            <InboxRow
              key={item.title}
              title={item.title}
              meta={selected ? "Reviewing access · Acme" : item.meta}
              icon={item.icon}
              selected={selected}
              spin={selected && !reduce}
              index={index}
              reduce={reduce}
            />
          );
        })}
        <span
          className="shrink-0 px-3 pt-2 pb-1 text-[7.5px] leading-none lg:px-4 lg:pt-3 lg:text-[8.5px]"
          style={{ color: illustrationColors.inkFaint }}
        >
          Yesterday
        </span>
        {YESTERDAY.map((item, index) => (
          <InboxRow
            key={item.title}
            title={item.title}
            meta={item.meta}
            icon={item.icon}
            selected={false}
            spin={false}
            index={TODAY.length + index}
            reduce={reduce}
          />
        ))}
      </div>

      <AnimatePresence>
        {toastVisible ? (
          <motion.div
            initial={reduce ? false : { ...illustrationBlurHidden, y: 8 }}
            animate={{ ...illustrationBlurShown, y: 0 }}
            exit={reduce ? undefined : { ...illustrationBlurHidden, y: 8 }}
            transition={fade}
            className="absolute inset-x-3 bottom-3 z-20 flex items-center gap-2 px-2.5 py-2 lg:bottom-4"
            style={{
              borderRadius: 10,
              background: illustrationColors.surface,
              border: `1px solid ${illustrationColors.border}`,
              boxShadow: "0 8px 20px -10px rgba(28,25,23,0.28)",
            }}
          >
            <motion.span
              initial={reduce ? false : illustrationPopHidden}
              animate={illustrationPopShown}
              transition={swap}
              className="flex h-[12px] w-[12px] shrink-0 items-center justify-center"
              style={{ borderRadius: 999, background: GRAPHITE }}
            >
              <IconTick size={7} />
            </motion.span>
            <span
              className="truncate text-[8px] leading-none lg:text-[9px]"
              style={{ color: illustrationColors.ink }}
            >
              Request approved
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

function RearPhoneScreen({
  detailVisible,
  checklistDone,
  reduce,
}: {
  detailVisible: boolean;
  checklistDone: number;
  reduce: boolean;
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
            Open a request
          </span>
        </div>
      </>
    );
  }

  return (
    <>
      <StatusBar compact />

      <div className="flex shrink-0 items-center gap-2 px-3 pt-2 pb-3 lg:px-3.5">
        <IconChevronLeft size={9} color={illustrationColors.inkMuted} />
        <span
          className="truncate text-[9px] leading-none lg:text-[10px]"
          style={{ color: illustrationColors.ink }}
        >
          Seat request
        </span>
      </div>

      <motion.div
        initial={reduce ? false : illustrationBlurHidden}
        animate={illustrationBlurShown}
        transition={fade}
        className="flex min-h-0 flex-1 flex-col"
      >
        <div className="flex flex-col gap-1 px-3 pb-2 lg:px-3.5">
          <span
            className="text-[8px] leading-none lg:text-[9px]"
            style={{ color: illustrationColors.ink }}
          >
            Acme Corp
          </span>
          <span
            className="text-[7px] leading-none lg:text-[8px]"
            style={{ color: illustrationColors.inkFaint }}
          >
            In review · 12 seats
          </span>
        </div>

        <div className="flex flex-col gap-1 px-3 pb-3 lg:px-3.5">
          <span
            className="text-[7px] leading-none lg:text-[8px]"
            style={{ color: illustrationColors.inkMuted }}
          >
            A. Rao · Owner
          </span>
          <span
            className="text-[7.5px] leading-none lg:text-[8.5px]"
            style={{ color: illustrationColors.inkFaint }}
          >
            Business plan · Monthly
          </span>
        </div>

        {CHECKLIST.map((item, index) => {
          const done = index < checklistDone;
          return (
            <motion.span
              key={item}
              initial={reduce ? false : { ...illustrationBlurHidden, y: 4 }}
              animate={{ ...illustrationBlurShown, y: 0 }}
              transition={{
                ...fade,
                delay: reduce ? 0 : 0.08 + index * illustrationTiming.staggerSec,
              }}
              className="flex items-center gap-2.5 px-3 py-2 lg:px-3.5 lg:py-2.5"
            >
              <span
                className="flex h-[11px] w-[11px] shrink-0 items-center justify-center lg:h-3 lg:w-3"
                style={{
                  borderRadius: 999,
                  background: done ? GRAPHITE : "transparent",
                  border: `1px solid ${done ? GRAPHITE : "rgba(28,25,23,0.16)"}`,
                  transition: "background 200ms ease, border-color 200ms ease",
                }}
              >
                <AnimatePresence>
                  {done ? (
                    <motion.span
                      initial={reduce ? false : illustrationPopHidden}
                      animate={illustrationPopShown}
                      transition={swap}
                      className="flex"
                    >
                      <IconTick size={6} />
                    </motion.span>
                  ) : null}
                </AnimatePresence>
              </span>
              <span
                className="truncate text-[8px] leading-none lg:text-[9px]"
                style={{
                  color: done ? illustrationColors.inkFaint : illustrationColors.ink,
                }}
              >
                {item}
              </span>
            </motion.span>
          );
        })}
      </motion.div>

      <div className="mt-auto shrink-0 px-3 pt-2 pb-3 lg:px-3.5 lg:pb-3.5">
        <span
          className="flex h-[22px] items-center justify-center lg:h-6"
          style={{
            borderRadius: 999,
            background: GRAPHITE,
          }}
        >
          <span
            className="text-[8px] leading-none lg:text-[9px]"
            style={{ color: SCREEN }}
          >
            Approve
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
    <IllustrationStage className="px-4 py-3 lg:px-6 lg:py-4">
      <div className="relative flex h-full items-end justify-center">
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
            reduce={reduce}
          />
        </PhoneShell>
      </div>
    </IllustrationStage>
  );
}
