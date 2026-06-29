"use client";

import { checkInInstructions, itinerary } from "@/lib/content";
import { Reveal, RevealGroup, RevealItem } from "./motion/reveal";
import { SectionShell } from "./motion/section-shell";

export function ItinerarySection() {
  return (
    <SectionShell id="itinerary" tone="muted">
      <div className="grid gap-6 lg:grid-cols-2">
        <Reveal direction="left" duration={0.5}>
          <div className="h-full rounded-xl border border-deco bg-blush-surface p-5 sm:p-6 md:p-7">
            <p className="text-sm font-medium tracking-tight text-foggy">What to expect</p>
            <h2 className="mt-1 text-[1.375rem] font-semibold tracking-tighter text-hof">
              Your stay may include
            </h2>
            <RevealGroup className="mt-5 space-y-4" stagger={0.05} delayChildren={0.08}>
              {itinerary.map((item, index) => (
                <RevealItem key={item}>
                  <div className="flex gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-deco text-xs font-semibold tracking-tight text-hof">
                      {index + 1}
                    </span>
                    <p className="text-sm leading-normal tracking-tight text-hof">{item}</p>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </Reveal>

        <Reveal direction="right" delay={0.05} duration={0.5}>
          <div className="h-full rounded-xl border border-deco bg-blush-surface p-5 sm:p-6 md:p-7">
            <p className="text-sm font-medium tracking-tight text-foggy">Before you knock</p>
            <h2 className="mt-1 text-[1.375rem] font-semibold tracking-tighter text-hof">
              Check-in instructions
            </h2>
            <RevealGroup className="mt-5 space-y-4" stagger={0.05} delayChildren={0.08}>
              {checkInInstructions.map((item, index) => (
                <RevealItem key={item}>
                  <div className="flex gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-deco text-xs font-semibold tracking-tight text-hof">
                      {index + 1}
                    </span>
                    <p className="text-sm leading-normal tracking-tight text-hof">{item}</p>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </Reveal>
      </div>
    </SectionShell>
  );
}
