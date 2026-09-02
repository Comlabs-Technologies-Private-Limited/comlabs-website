"use client";

import { motion } from "framer-motion";
import type { CSSProperties, ReactNode } from "react";

import { Bar, Panel } from "./illustration-primitives";
import { IllustrationStage, useIllustrationState } from "./service-illustration-frame";
import {
  illustrationColors,
  illustrationEase,
  illustrationRadius,
  illustrationShadow,
} from "./illustration-tokens";

const EASE = illustrationEase;
const ink = illustrationColors.ink;
const inkMuted = illustrationColors.inkMuted;
const inkFaint = illustrationColors.inkFaint;
const border = illustrationColors.border;
const borderStrong = illustrationColors.borderStrong;
const surface = illustrationColors.surface;
const surfaceMuted = illustrationColors.surfaceMuted;
const surfaceSunk = illustrationColors.surfaceSunk;

const PAGES = [
  "Blog",
  "Home",
  "About",
  "Contact",
  "Services",
  "Pitch Deck",
  "Animations",
] as const;

const CURSOR_HOPS = {
  left: ["24%", "76%", "50%", "24%", "76%", "50%", "24%"],
  top: ["16%", "16%", "40%", "64%", "64%", "86%", "16%"],
} as const;

function AppMark() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
      <rect x="1" y="1" width="4.4" height="4.4" rx="1.4" fill={ink} />
      <rect x="6.6" y="1" width="4.4" height="4.4" rx="2.2" fill={inkMuted} />
      <rect x="1" y="6.6" width="4.4" height="4.4" rx="2.2" fill={inkMuted} />
      <rect x="6.6" y="6.6" width="4.4" height="4.4" rx="1.4" fill={ink} />
    </svg>
  );
}

function SidebarToggle() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
      <rect
        x="1.4"
        y="2.1"
        width="9.2"
        height="7.8"
        rx="1.6"
        stroke={inkMuted}
        strokeWidth="1.1"
      />
      <path d="M4.4 2.1v7.8" stroke={inkMuted} strokeWidth="1.1" />
    </svg>
  );
}

function PageGlyph() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden>
      <path
        d="M2.2 1.4h3.4L7.8 3.6v4.8H2.2V1.4Z"
        stroke={inkFaint}
        strokeWidth="1"
        strokeLinejoin="round"
      />
      <path d="M5.6 1.4v2.2h2.2" stroke={inkFaint} strokeWidth="1" strokeLinejoin="round" />
    </svg>
  );
}

function FrameCard({
  children,
  className,
  style,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <Panel
      elevation="raised"
      radius={illustrationRadius.device}
      className={className}
      style={{
        background: surface,
        padding: 8,
        ...style,
      }}
    >
      {children}
    </Panel>
  );
}

function FrameHeader({ trailing }: { trailing?: ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-2">
      <span
        className="block h-1.5 w-8 rounded-full"
        style={{ background: "rgba(28,25,23,0.10)" }}
      />
      {trailing === undefined ? <Dots n={3} /> : trailing}
    </div>
  );
}

function Dots({ n }: { n: number }) {
  return (
    <span className="flex items-center gap-0.5">
      {Array.from({ length: n }, (_, index) => (
        <span
          key={index}
          className="block size-1 rounded-full"
          style={{ background: "rgba(28,25,23,0.16)" }}
        />
      ))}
    </span>
  );
}

function OutlineButton() {
  return (
    <span
      className="block h-3.5 w-8 rounded-full"
      style={{
        border: `1px solid ${borderStrong}`,
        background: surface,
      }}
    />
  );
}

function FillButton() {
  return (
    <span
      className="block h-3.5 w-8 rounded-full"
      style={{ background: "rgba(28,25,23,0.72)" }}
    />
  );
}

function PhoneFrame({ className }: { className?: string }) {
  return (
    <FrameCard className={className ?? "flex min-h-0 flex-col"}>
      <FrameHeader />
      <div
        className="mt-2 min-h-0 flex-1 rounded-[10px]"
        style={{
          background: surfaceMuted,
          boxShadow: "inset 0 0 0 1px rgba(28,25,23,0.04)",
        }}
      />
      <div className="mt-2 flex justify-center">
        <Dots n={3} />
      </div>
      <div className="mt-2 flex flex-col gap-1">
        <Bar width="84%" height={3} />
        <Bar width="58%" height={3} />
      </div>
      <div className="mt-2 flex items-center gap-1">
        <FillButton />
        <OutlineButton />
      </div>
    </FrameCard>
  );
}

function UserFrame({ className, name = "Manu" }: { className?: string; name?: string }) {
  return (
    <FrameCard className={className ?? "flex min-h-0 flex-col"}>
      <FrameHeader />
      <div className="mt-3 flex flex-col gap-2">
        <Bar width="78%" height={4} />
        <div className="flex items-center gap-1">
          <Bar width="28%" height={4} />
          <span
            className="inline-flex items-center gap-1 rounded-full px-1.5 py-0.5"
            style={{
              background: surfaceSunk,
              border: `1px solid ${border}`,
            }}
          >
            <span
              className="block size-2.5 rounded-full"
              style={{ background: "rgba(28,25,23,0.28)" }}
            />
            <span
              className="text-[7px] leading-none font-medium tracking-tight lg:text-[8px]"
              style={{ color: ink }}
            >
              {name}
            </span>
          </span>
        </div>
      </div>
      <div className="mt-auto flex justify-center pt-2">
        <span className="flex items-center gap-1">
          <span className="block h-px w-2" style={{ background: "rgba(28,25,23,0.16)" }} />
          <span className="block h-px w-3" style={{ background: "rgba(28,25,23,0.16)" }} />
          <span className="block h-px w-2" style={{ background: "rgba(28,25,23,0.16)" }} />
        </span>
      </div>
    </FrameCard>
  );
}

function BoardFrame({ className }: { className?: string }) {
  return (
    <FrameCard className={className ?? "flex min-h-0 flex-col"}>
      <FrameHeader trailing={false} />
      <div className="mt-2 flex min-h-0 flex-1 gap-2">
        <div
          className="h-full w-[32%] rounded-[10px]"
          style={{ background: surfaceSunk }}
        />
        <div className="flex min-w-0 flex-1 flex-col gap-1.5 pt-1">
          <Bar width="92%" height={3} />
          <Bar width="74%" height={3} />
          <Bar width="84%" height={3} />
          <Bar width="60%" height={3} />
        </div>
      </div>
      <div className="mt-2 flex items-center justify-end gap-1">
        <FillButton />
        <OutlineButton />
        <span
          className="block size-3.5 rounded-full"
          style={{ border: `1px solid ${borderStrong}` }}
        />
      </div>
    </FrameCard>
  );
}

function ListFrame({ className }: { className?: string }) {
  return (
    <FrameCard className={className ?? "flex min-h-0 flex-col"}>
      <FrameHeader />
      <div className="mt-2 flex min-h-0 flex-1 flex-col gap-1.5">
        {[76, 88, 64, 80].map((width) => (
          <div key={width} className="flex items-center gap-1.5">
            <span
              className="block size-2 shrink-0 rounded-full"
              style={{ background: "rgba(28,25,23,0.12)" }}
            />
            <Bar width={`${width}%`} height={3} />
          </div>
        ))}
      </div>
      <div className="mt-2 flex items-center gap-1">
        <OutlineButton />
      </div>
    </FrameCard>
  );
}

function MetricFrame({ className }: { className?: string }) {
  return (
    <FrameCard className={className ?? "flex min-h-0 flex-col"}>
      <FrameHeader trailing={false} />
      <div className="mt-2 grid min-h-0 flex-1 grid-cols-2 gap-1.5">
        <div className="rounded-[8px]" style={{ background: surfaceSunk }} />
        <div className="flex flex-col justify-center gap-1">
          <Bar width="90%" height={3} />
          <Bar width="62%" height={3} />
          <Bar width="74%" height={3} />
        </div>
      </div>
      <div className="mt-2 flex items-center justify-end gap-1">
        <FillButton />
        <span
          className="block size-3.5 rounded-full"
          style={{ border: `1px solid ${borderStrong}` }}
        />
      </div>
    </FrameCard>
  );
}

function WideHeroFrame({ className }: { className?: string }) {
  return (
    <FrameCard className={className ?? "flex min-h-0 flex-col"}>
      <FrameHeader />
      <div className="mt-2 flex min-h-0 flex-1 gap-2">
        <div
          className="h-full w-[44%] rounded-[10px]"
          style={{
            background: surfaceMuted,
            boxShadow: "inset 0 0 0 1px rgba(28,25,23,0.04)",
          }}
        />
        <div className="flex min-w-0 flex-1 flex-col justify-between">
          <div className="flex flex-col gap-1.5">
            <Bar width="88%" height={3} />
            <Bar width="70%" height={3} />
            <Bar width="54%" height={3} />
          </div>
          <div className="flex items-center gap-1">
            <FillButton />
            <OutlineButton />
          </div>
        </div>
      </div>
    </FrameCard>
  );
}

function DesignCursor({ reduce, active }: { reduce: boolean; active: boolean }) {
  return (
    <motion.div
      className="pointer-events-none absolute z-20"
      initial={false}
      animate={
        reduce || !active
          ? { left: "48%", top: "40%", opacity: 1 }
          : { left: [...CURSOR_HOPS.left], top: [...CURSOR_HOPS.top], opacity: 1 }
      }
      transition={
        reduce || !active
          ? { duration: 0.4, ease: EASE }
          : {
              duration: 20,
              ease: EASE,
              repeat: Infinity,
              times: [0, 0.16, 0.33, 0.5, 0.66, 0.83, 1],
            }
      }
      aria-hidden
    >
      <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
        <path
          d="M2.5 1.75 2.5 11.2 5.35 8.35 8.15 13.25 10.1 12.15 7.3 7.25 11.35 7.25 2.5 1.75Z"
          fill="#fff"
          stroke={ink}
          strokeWidth="1.1"
          strokeLinejoin="round"
        />
      </svg>
    </motion.div>
  );
}

function Sidebar() {
  return (
    <div
      className="flex h-full w-[118px] shrink-0 flex-col lg:w-[132px]"
      style={{
        background: surface,
        borderRight: `1px solid ${border}`,
      }}
    >
      <div className="flex items-center justify-between px-3 pt-3">
        <AppMark />
        <SidebarToggle />
      </div>
      <p
        className="mt-3 px-3 text-[9px] leading-none font-medium tracking-tight lg:text-[10px]"
        style={{ color: ink }}
      >
        Agency v2.2
      </p>
      <div className="mt-2 flex items-center gap-1 px-3">
        <span className="text-[7px] leading-none tracking-tight lg:text-[8px]" style={{ color: inkMuted }}>
          Drafts
        </span>
        <span
          className="rounded-full px-1.5 py-0.5 text-[6.5px] leading-none font-medium tracking-tight"
          style={{
            color: inkMuted,
            border: `1px solid ${borderStrong}`,
            background: surfaceMuted,
          }}
        >
          Pro
        </span>
      </div>
      <div
        className="mx-2 mt-3 grid grid-cols-2 rounded-[8px] p-0.5"
        style={{ background: surfaceSunk }}
      >
        <span
          className="rounded-[6px] px-2 py-1 text-center text-[7px] leading-none font-medium tracking-tight lg:text-[8px]"
          style={{ color: ink, background: surface, boxShadow: illustrationShadow.panel }}
        >
          File
        </span>
        <span
          className="rounded-[6px] px-2 py-1 text-center text-[7px] leading-none tracking-tight lg:text-[8px]"
          style={{ color: inkMuted }}
        >
          Assets
        </span>
      </div>
      <p
        className="mt-4 px-3 text-[7px] leading-none font-medium tracking-tight"
        style={{ color: inkFaint }}
      >
        Pages
      </p>
      <ul className="mt-2 flex min-h-0 flex-1 flex-col gap-0.5 overflow-hidden px-2 pb-3">
        {PAGES.map((page) => {
          const selected = page === "Home";
          return (
            <li
              key={page}
              className="flex items-center gap-1.5 rounded-[6px] px-1.5 py-1"
              style={{
                background: selected ? surfaceSunk : "transparent",
                color: selected ? ink : inkMuted,
              }}
            >
              <PageGlyph />
              <span className="truncate text-[7.5px] leading-none tracking-tight lg:text-[8.5px]">
                {page}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export function WebsiteDesignIllustration() {
  const { active, reduce } = useIllustrationState();

  return (
    <IllustrationStage className="p-2 lg:p-3">
      <div
        className="flex h-full min-h-0 overflow-hidden"
        style={{
          borderRadius: 20,
          background: surface,
          border: `1px solid ${borderStrong}`,
          boxShadow: illustrationShadow.raised,
        }}
      >
        <Sidebar />
        <div
          className="relative min-h-0 min-w-0 flex-1 overflow-hidden"
          style={{
            backgroundColor: surfaceMuted,
            backgroundImage: `linear-gradient(45deg, rgba(28,25,23,0.035) 25%, transparent 25%, transparent 75%, rgba(28,25,23,0.035) 75%), linear-gradient(45deg, rgba(28,25,23,0.035) 25%, transparent 25%, transparent 75%, rgba(28,25,23,0.035) 75%)`,
            backgroundPosition: "0 0, 8px 8px",
            backgroundSize: "16px 16px",
          }}
        >
          <div className="grid h-full min-h-0 grid-cols-2 grid-rows-4 gap-2 p-2 lg:gap-3 lg:p-3">
            <PhoneFrame />
            <UserFrame />
            <BoardFrame className="col-span-2 flex min-h-0 flex-col" />
            <ListFrame />
            <MetricFrame />
            <WideHeroFrame className="col-span-2 flex min-h-0 flex-col" />
          </div>
          <DesignCursor reduce={reduce} active={active} />
        </div>
      </div>
    </IllustrationStage>
  );
}
