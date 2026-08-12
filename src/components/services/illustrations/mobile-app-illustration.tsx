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

/** Graphite rather than pure black — reads as titanium against warm ivory. */
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

type JobStatus = "completed" | "next" | "scheduled" | "active";

const JOBS = [
  {
    area: "Baner",
    task: "Router installation",
    time: "10:30 AM",
    status: "completed" as JobStatus,
  },
  {
    area: "Hinjawadi Phase 2",
    task: "Service visit",
    time: "12:00 PM",
    status: "next" as JobStatus,
  },
  {
    area: "Kharadi",
    task: "Site survey",
    time: "3:45 PM",
    status: "scheduled" as JobStatus,
  },
] as const;

const CHECKLIST = [
  "Verify line signal",
  "Replace ONT unit",
  "Customer sign-off",
] as const;

const NAV_ITEMS = ["Today", "Jobs", "Map", "Profile"] as const;

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

function IconClock({ size = 8, color = illustrationColors.inkFaint }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 12 12" fill="none" aria-hidden>
      <circle cx="6" cy="6" r="4.4" stroke={color} strokeWidth="1.1" />
      <path
        d="M6 3.6V6l1.7 1"
        stroke={color}
        strokeWidth="1.1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconPin({ size = 8, color = illustrationColors.inkFaint }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 12 12" fill="none" aria-hidden>
      <path
        d="M6 10.5s3.4-3 3.4-5.4a3.4 3.4 0 1 0-6.8 0C2.6 7.5 6 10.5 6 10.5Z"
        stroke={color}
        strokeWidth="1.1"
        strokeLinejoin="round"
      />
      <circle cx="6" cy="5" r="1.15" fill={color} />
    </svg>
  );
}

function IconChevronLeft({
  size = 9,
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

function IconDownload({
  size = 8,
  color = illustrationColors.inkFaint,
}: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 12 12" fill="none" aria-hidden>
      <path
        d="M6 2v5m0 0L4 5m2 2 2-2M2.6 9.4h6.8"
        stroke={color}
        strokeWidth="1.1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconNavigate({ size = 8, color = illustrationColors.ink }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 12 12" fill="none" aria-hidden>
      <path
        d="M10 2 2 5.4l3.3 1.3L6.6 10 10 2Z"
        stroke={color}
        strokeWidth="1.1"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Bottom-navigation glyphs — filled when active. */
function NavGlyph({ index, active }: { index: number; active: boolean }) {
  const color = active ? illustrationColors.accent : illustrationColors.inkFaint;
  const paths = [
    "M2 5.6 6 2.4l4 3.2V10H2V5.6Z",
    "M2.6 3.2h6.8M2.6 6h6.8M2.6 8.8h4.4",
    "M4.4 2.6 1.8 3.8v5.6l2.6-1.2 3.2 1.2 2.6-1.2V2.6L7.6 3.8 4.4 2.6Z",
    "M6 5.9a1.9 1.9 0 1 0 0-3.8 1.9 1.9 0 0 0 0 3.8ZM2.4 10c.5-1.8 1.9-2.7 3.6-2.7S9.1 8.2 9.6 10",
  ];
  return (
    <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden>
      <path
        d={paths[index]}
        stroke={color}
        strokeWidth="1.15"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill={active && index === 0 ? "rgba(201,100,66,0.16)" : "none"}
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
        [side]: -1,
        top,
        width: 1.5,
        height,
        background: GRAPHITE_EDGE,
        borderRadius: side === "left" ? "2px 0 0 2px" : "0 2px 2px 0",
      }}
    />
  );
}

/** Slim graphite iPhone frame with Dynamic Island and home indicator. */
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
        borderRadius: compact ? 20 : 23,
        background: `linear-gradient(155deg, ${GRAPHITE_EDGE} 0%, ${GRAPHITE} 34%, ${GRAPHITE} 70%, #443C38 100%)`,
        boxShadow:
          "0 1px 2px rgba(28,25,23,0.10), 0 16px 34px -18px rgba(28,25,23,0.40)",
        padding: 1.75,
        ...style,
      }}
    >
      <SideButton side="left" top="25%" height={8} />
      <SideButton side="left" top="35%" height={8} />
      <SideButton side="right" top="29%" height={12} />

      <div
        className="relative flex h-full w-full flex-col overflow-hidden"
        style={{
          borderRadius: compact ? 18.5 : 21.5,
          background: illustrationColors.surface,
        }}
      >
        {children}
        <span
          aria-hidden
          className="pointer-events-none absolute bottom-[2.5px] left-1/2 z-30 block -translate-x-1/2"
          style={{
            width: compact ? 24 : 30,
            height: 2,
            borderRadius: 999,
            background: "rgba(28,25,23,0.26)",
          }}
        />
      </div>
    </div>
  );
}

/** iOS status bar: time, then signal / Wi-Fi / battery around the island. */
function StatusBar({ compact = false }: { compact?: boolean }) {
  return (
    <div
      className="relative flex h-[13px] shrink-0 items-center justify-between px-2 lg:h-[15px]"
      style={{ background: illustrationColors.surface }}
    >
      <span
        className="text-[6.5px] leading-none font-semibold lg:text-[7.5px]"
        style={{ color: GRAPHITE }}
      >
        9:41
      </span>

      <span
        aria-hidden
        className="absolute left-1/2 block -translate-x-1/2"
        style={{
          width: compact ? 20 : 24,
          height: compact ? 5.5 : 6.5,
          borderRadius: 999,
          background: GRAPHITE,
        }}
      />

      {compact ? (
        <IconBattery size={10} />
      ) : (
        <span className="flex items-center gap-[2.5px]">
          <IconSignal size={7} />
          <IconWifi size={7} />
          <IconBattery size={11} />
        </span>
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Front phone — today's schedule                                             */
/* -------------------------------------------------------------------------- */

function statusLabel(status: JobStatus): string {
  if (status === "completed") return "Completed";
  if (status === "active") return "In progress";
  if (status === "next") return "Next";
  return "Scheduled";
}

function JobCard({
  job,
  status,
  emphasised,
  reduce,
}: {
  job: (typeof JOBS)[number];
  status: JobStatus;
  emphasised: boolean;
  reduce: boolean;
}) {
  const done = status === "completed";
  const live = status === "active";

  return (
    <motion.div
      initial={false}
      animate={{ scale: live && !reduce ? 1 : 1 }}
      transition={fade}
      className="flex items-start gap-1.5 px-1.5 py-[6px] lg:gap-2 lg:px-2 lg:py-[8px]"
      style={{
        borderRadius: 8,
        background: emphasised
          ? "rgba(201,100,66,0.07)"
          : illustrationColors.surface,
        border: `1px solid ${
          emphasised ? "rgba(201,100,66,0.30)" : "rgba(28,25,23,0.09)"
        }`,
        transition: "background 380ms ease, border-color 380ms ease",
      }}
    >
      {/* Status marker doubles as the job-type indicator */}
      <span
        className="mt-[1px] flex h-[13px] w-[13px] shrink-0 items-center justify-center lg:h-[15px] lg:w-[15px]"
        style={{
          borderRadius: 999,
          background: done
            ? illustrationColors.accent
            : live
              ? "rgba(201,100,66,0.14)"
              : illustrationColors.surfaceSunk,
          border: `1px solid ${
            done
              ? illustrationColors.accent
              : live
                ? "rgba(201,100,66,0.42)"
                : "rgba(28,25,23,0.12)"
          }`,
        }}
      >
        {done ? (
          <IconTick size={7} />
        ) : live ? (
          <span
            className="block h-[4px] w-[4px] rounded-full"
            style={{ background: illustrationColors.accent }}
          />
        ) : (
          <span
            className="block h-[3.5px] w-[3.5px] rounded-full"
            style={{ background: illustrationColors.inkFaint }}
          />
        )}
      </span>

      <span className="flex min-w-0 flex-1 flex-col gap-[2px]">
        <span className="flex items-baseline justify-between gap-1">
          <span
            className="truncate text-[8px] leading-none font-semibold lg:text-[9.5px]"
            style={{
              color: done ? illustrationColors.inkMuted : illustrationColors.ink,
            }}
          >
            {job.area}
          </span>
          <span
            className="shrink-0 text-[7px] leading-none font-medium tabular-nums lg:text-[8.5px]"
            style={{
              color: live
                ? illustrationColors.accent
                : illustrationColors.inkFaint,
            }}
          >
            {job.time}
          </span>
        </span>
        <span className="flex items-center gap-[3px]">
          <span
            className="truncate text-[7px] leading-none lg:text-[8.5px]"
            style={{ color: illustrationColors.inkFaint }}
          >
            {job.task}
          </span>
        </span>
        <span
          className="mt-[1px] text-[6.5px] leading-none font-medium tracking-[0.06em] uppercase lg:text-[7.5px]"
          style={{
            color: done
              ? illustrationColors.inkFaint
              : live
                ? illustrationColors.accent
                : illustrationColors.inkFaint,
          }}
        >
          {statusLabel(status)}
        </span>
      </span>
    </motion.div>
  );
}

function FrontPhoneScreen({
  activeJob,
  syncedNow,
  toastVisible,
  reduce,
}: {
  activeJob: boolean;
  syncedNow: boolean;
  toastVisible: boolean;
  reduce: boolean;
}) {
  const completedCount = activeJob ? 2 : 2;

  return (
    <>
      <StatusBar />

      {/* App identity + sync state */}
      <div className="flex shrink-0 items-center gap-1.5 px-2 pt-[3px] pb-[5px] lg:px-2.5">
        <span
          className="flex h-[13px] w-[13px] shrink-0 items-center justify-center lg:h-[15px] lg:w-[15px]"
          style={{
            borderRadius: 5,
            background: illustrationColors.accent,
          }}
        >
          <span
            className="block h-[5px] w-[5px] lg:h-[6px] lg:w-[6px]"
            style={{
              borderRadius: 1.5,
              background: illustrationColors.surface,
            }}
          />
        </span>
        <span
          className="text-[8px] leading-none font-semibold lg:text-[9.5px]"
          style={{ color: illustrationColors.ink }}
        >
          Field
        </span>

        <span className="ml-auto flex items-center gap-[3px]">
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={syncedNow ? "now" : "ago"}
              initial={reduce ? false : { opacity: 0, y: 2 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: -2 }}
              transition={{ duration: 0.2, ease: illustrationEase }}
              className="text-[6.5px] leading-none lg:text-[7.5px]"
              style={{
                color: syncedNow
                  ? illustrationColors.accent
                  : illustrationColors.inkFaint,
              }}
            >
              {syncedNow ? "Synced just now" : "Synced 4m ago"}
            </motion.span>
          </AnimatePresence>
          <span
            className="block h-[3px] w-[3px] rounded-full"
            style={{
              background: syncedNow
                ? illustrationColors.accent
                : illustrationColors.inkFaint,
            }}
          />
        </span>
      </div>

      {/* Greeting */}
      <div className="flex shrink-0 items-center gap-1.5 px-2 pb-[6px] lg:px-2.5">
        <span className="flex min-w-0 flex-1 flex-col gap-[2px]">
          <span
            className="truncate text-[9px] leading-none font-semibold lg:text-[11px]"
            style={{ color: illustrationColors.ink }}
          >
            Good morning, Arjun
          </span>
          <span
            className="truncate text-[6.5px] leading-none lg:text-[8px]"
            style={{ color: illustrationColors.inkFaint }}
          >
            Tuesday, 12 August
          </span>
        </span>
        {/* Technician avatar */}
        <span
          className="flex h-[16px] w-[16px] shrink-0 items-center justify-center text-[6.5px] leading-none font-semibold lg:h-[19px] lg:w-[19px] lg:text-[8px]"
          style={{
            borderRadius: 999,
            background: illustrationColors.surfaceWarm,
            border: "1px solid rgba(28,25,23,0.10)",
            color: illustrationColors.inkMuted,
          }}
        >
          AR
        </span>
      </div>

      {/* Progress summary */}
      <div className="flex shrink-0 flex-col gap-[4px] px-2 pb-[7px] lg:px-2.5">
        <span className="flex items-baseline justify-between gap-1">
          <span
            className="text-[7px] leading-none lg:text-[8.5px]"
            style={{ color: illustrationColors.inkMuted }}
          >
            {completedCount} of 4 jobs completed
          </span>
          <span
            className="text-[7px] leading-none font-semibold tabular-nums lg:text-[8.5px]"
            style={{ color: illustrationColors.ink }}
          >
            50%
          </span>
        </span>
        <span
          className="relative block h-[3px] overflow-hidden"
          style={{
            borderRadius: 999,
            background: illustrationColors.surfaceSunk,
          }}
        >
          <motion.span
            className="absolute inset-y-0 left-0 block w-full origin-left"
            style={{ borderRadius: 999, background: illustrationColors.accent }}
            initial={false}
            animate={{ scaleX: 0.5 }}
            transition={
              reduce ? { duration: 0 } : { duration: 0.7, ease: illustrationEase }
            }
          />
        </span>
      </div>

      {/* Job list */}
      <div className="flex min-h-0 flex-1 flex-col gap-[5px] px-2 lg:gap-[7px] lg:px-2.5">
        {JOBS.map((job, index) => {
          const status: JobStatus =
            index === 1 && activeJob ? "active" : job.status;
          return (
            <JobCard
              key={job.area}
              job={job}
              status={status}
              emphasised={index === 1 && activeJob}
              reduce={reduce}
            />
          );
        })}
      </div>

      {/* Bottom navigation */}
      <div
        className="mt-auto flex shrink-0 items-start justify-around border-t px-1 pt-[5px] pb-[9px] lg:pt-[6px] lg:pb-[10px]"
        style={{
          borderColor: "rgba(28,25,23,0.08)",
          background: illustrationColors.surface,
        }}
      >
        {NAV_ITEMS.map((item, index) => {
          const active = index === 0;
          return (
            <span key={item} className="flex flex-col items-center gap-[2px]">
              <NavGlyph index={index} active={active} />
              <span
                className="text-[6px] leading-none lg:text-[7px]"
                style={{
                  color: active
                    ? illustrationColors.accent
                    : illustrationColors.inkFaint,
                  fontWeight: active ? 600 : 400,
                }}
              >
                {item}
              </span>
            </span>
          );
        })}
      </div>

      {/* Success toast */}
      <AnimatePresence>
        {toastVisible ? (
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={fade}
            className="absolute inset-x-2 bottom-[34px] z-20 flex items-center gap-1.5 px-2 py-[6px]"
            style={{
              borderRadius: 7,
              background: GRAPHITE,
              boxShadow: "0 8px 20px -8px rgba(28,25,23,0.45)",
            }}
          >
            <span
              className="flex h-[10px] w-[10px] shrink-0 items-center justify-center"
              style={{ borderRadius: 999, background: illustrationColors.accent }}
            >
              <IconTick size={6} />
            </span>
            <span
              className="truncate text-[7px] leading-none font-medium lg:text-[8.5px]"
              style={{ color: "#F7F7F4" }}
            >
              Job updated
            </span>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}

/* -------------------------------------------------------------------------- */
/* Rear phone — job details                                                   */
/* -------------------------------------------------------------------------- */

/** Code-native site thumbnail: abstract street grid with a located pin. */
function MapThumb() {
  return (
    <div
      className="relative w-full overflow-hidden"
      style={{
        height: 34,
        borderRadius: 7,
        background: illustrationColors.surfaceWarm,
        border: "1px solid rgba(28,25,23,0.08)",
      }}
    >
      <svg
        viewBox="0 0 120 46"
        preserveAspectRatio="xMidYMid slice"
        className="h-full w-full"
        aria-hidden
      >
        <rect x="8" y="6" width="30" height="16" rx="2" fill="rgba(28,25,23,0.05)" />
        <rect x="74" y="4" width="34" height="14" rx="2" fill="rgba(28,25,23,0.05)" />
        <rect x="16" y="30" width="26" height="14" rx="2" fill="rgba(28,25,23,0.05)" />
        <rect x="80" y="28" width="30" height="16" rx="2" fill="rgba(28,25,23,0.05)" />
        <path
          d="M0 26h120M56 0v46"
          stroke="rgba(28,25,23,0.13)"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          d="M0 26h120"
          stroke="rgba(201,100,66,0.5)"
          strokeWidth="1.4"
          strokeDasharray="4 3"
        />
        <circle cx="56" cy="26" r="5.5" fill="rgba(201,100,66,0.16)" />
        <circle cx="56" cy="26" r="2.6" fill="#C96442" />
      </svg>
    </div>
  );
}

function RearPhoneScreen({
  jobLoaded,
  checklistDone,
  reduce,
}: {
  jobLoaded: boolean;
  checklistDone: number;
  reduce: boolean;
}) {
  return (
    <>
      <StatusBar compact />

      {/* Header */}
      <div
        className="flex shrink-0 items-center gap-1.5 border-b px-2 pt-[3px] pb-[6px]"
        style={{ borderColor: "rgba(28,25,23,0.08)" }}
      >
        <IconChevronLeft size={8} />
        <span
          className="truncate text-[8px] leading-none font-semibold lg:text-[9.5px]"
          style={{ color: illustrationColors.ink }}
        >
          Job details
        </span>
      </div>

      <div className="flex min-h-0 flex-1 flex-col gap-[6px] px-2 pt-[6px] lg:gap-[8px]">
        <MapThumb />

        {/* Customer + address */}
        <div className="flex flex-col gap-[3px]">
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={jobLoaded ? "hinjawadi" : "baner"}
              initial={reduce ? false : { opacity: 0, y: 3 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: -3 }}
              transition={{ duration: 0.24, ease: illustrationEase }}
              className="flex flex-col gap-[3px]"
            >
              <span
                className="truncate text-[8px] leading-none font-semibold lg:text-[9.5px]"
                style={{ color: illustrationColors.ink }}
              >
                {jobLoaded ? "Sterling Business Park" : "Kohinoor Residency"}
              </span>
              <span className="flex items-start gap-[3px]">
                <span className="mt-[0.5px] shrink-0">
                  <IconPin size={7} />
                </span>
                <span
                  className="text-[6.5px] leading-[1.35] lg:text-[8px]"
                  style={{ color: illustrationColors.inkFaint }}
                >
                  {jobLoaded
                    ? "Hinjawadi Phase 2, Pune 411057"
                    : "Baner Road, Pune 411045"}
                </span>
              </span>
            </motion.span>
          </AnimatePresence>
        </div>

        {/* Time window + contact */}
        <div
          className="flex flex-col gap-[4px] px-1.5 py-[5px]"
          style={{
            borderRadius: 6,
            background: illustrationColors.surfaceMuted,
            border: "1px solid rgba(28,25,23,0.07)",
          }}
        >
          <span className="flex items-center gap-[4px]">
            <IconClock size={7} />
            <span
              className="truncate text-[6.5px] leading-none lg:text-[8px]"
              style={{ color: illustrationColors.inkMuted }}
            >
              {jobLoaded ? "12:00 – 1:00 PM" : "10:30 – 11:30 AM"}
            </span>
          </span>
          <span className="flex items-center gap-[4px]">
            <span
              className="flex h-[9px] w-[9px] shrink-0 items-center justify-center text-[5.5px] leading-none font-semibold"
              style={{
                borderRadius: 999,
                background: illustrationColors.surfaceSunk,
                color: illustrationColors.inkFaint,
              }}
            >
              RD
            </span>
            <span
              className="truncate text-[6.5px] leading-none lg:text-[8px]"
              style={{ color: illustrationColors.inkMuted }}
            >
              Rohit Deshmukh
            </span>
          </span>
        </div>

        {/* Visit checklist */}
        <div className="flex flex-col gap-[4px]">
          <span
            className="text-[6px] leading-none font-medium tracking-[0.12em] uppercase lg:text-[7px]"
            style={{ color: illustrationColors.inkFaint }}
          >
            Visit checklist
          </span>
          {CHECKLIST.map((item, index) => {
            const done = index < checklistDone;
            return (
              <span key={item} className="flex items-center gap-[4px]">
                <motion.span
                  className="flex h-[9px] w-[9px] shrink-0 items-center justify-center lg:h-[10px] lg:w-[10px]"
                  initial={false}
                  animate={{ scale: 1 }}
                  transition={fade}
                  style={{
                    borderRadius: 2.5,
                    background: done
                      ? illustrationColors.accent
                      : "transparent",
                    border: `1px solid ${
                      done ? illustrationColors.accent : "rgba(28,25,23,0.16)"
                    }`,
                    transition:
                      "background 320ms ease, border-color 320ms ease",
                  }}
                >
                  {done ? <IconTick size={6} /> : null}
                </motion.span>
                <span
                  className="truncate text-[6.5px] leading-none lg:text-[8px]"
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

        {/* Offline availability */}
        <span className="flex items-center gap-[4px]">
          <IconDownload size={7} />
          <span
            className="truncate text-[6px] leading-none lg:text-[7.5px]"
            style={{ color: illustrationColors.inkFaint }}
          >
            Available offline
          </span>
        </span>
      </div>

      {/* Actions */}
      <div className="mt-auto flex shrink-0 flex-col gap-[4px] px-2 pt-[5px] pb-[9px]">
        <span
          className="hidden items-center justify-center gap-[4px] py-[5px] lg:flex"
          style={{
            borderRadius: 6,
            border: "1px solid rgba(28,25,23,0.14)",
            background: illustrationColors.surface,
          }}
        >
          <IconNavigate size={8} />
          <span
            className="text-[7.5px] leading-none font-medium"
            style={{ color: illustrationColors.ink }}
          >
            Get directions
          </span>
        </span>
        <span
          className="flex items-center justify-center py-[5px] lg:py-[6px]"
          style={{
            borderRadius: 6,
            background: illustrationColors.accent,
          }}
        >
          <span
            className="text-[7px] leading-none font-semibold lg:text-[8.5px]"
            style={{ color: illustrationColors.surface }}
          >
            {checklistDone > 0 ? "Continue job" : "Start job"}
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

  // 0 populated · 1 job active · 2 rear updates · 3 checklist · 4 synced · 5 toast
  const activeJob = step >= 1;
  const jobLoaded = step >= 2;
  const checklistDone = step >= 3 ? 2 : 1;
  const syncedNow = step >= 4;
  const toastVisible = step >= 5;

  return (
    <IllustrationStage className="px-4 py-3 lg:px-7 lg:py-4">
      {/* Local scrim: hold the scenery back so the product reads first */}
      <span
        aria-hidden
        className="absolute inset-0"
        style={{ background: "rgba(247,247,244,0.38)" }}
      />
      {/* Warm key light behind the primary device */}
      <span
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(58% 52% at 38% 46%, rgba(255,246,236,0.85) 0%, rgba(253,247,239,0.34) 46%, rgba(247,247,244,0) 74%)",
        }}
      />

      <div className="relative flex h-full items-end justify-center gap-2 lg:gap-3">
        {/* Contact shadows */}
        <span
          aria-hidden
          className="pointer-events-none absolute bottom-[1px] left-1/2 block h-[10px] w-[76%] -translate-x-1/2"
          style={{
            background:
              "radial-gradient(50% 50% at 50% 50%, rgba(28,25,23,0.20) 0%, rgba(28,25,23,0) 72%)",
          }}
        />

        {/* Front phone — today's schedule */}
        <PhoneShell className="relative z-10 h-[97%] w-[130px] shrink-0 lg:w-[170px]">
          <FrontPhoneScreen
            activeJob={activeJob}
            syncedNow={syncedNow}
            toastVisible={toastVisible}
            reduce={reduce}
          />
        </PhoneShell>

        {/* Rear phone — job details, set back and slightly turned */}
        <PhoneShell
          compact
          className="relative h-[85%] w-[108px] shrink-0 lg:w-[136px]"
          style={{
            zIndex: 0,
            opacity: 0.97,
            transform: "perspective(900px) rotateY(3deg)",
          }}
        >
          <RearPhoneScreen
            jobLoaded={jobLoaded}
            checklistDone={checklistDone}
            reduce={reduce}
          />
        </PhoneShell>
      </div>
    </IllustrationStage>
  );
}
