import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import {
  GUEST_NAME,
  HOST_AVATAR,
  HOST_NAME,
  hostNote,
  sinceLastStay,
} from "@/lib/content";
import { Reveal, RevealGroup, RevealItem } from "./motion/reveal";
import { SectionShell } from "./motion/section-shell";

export function PersonalUpdateSection() {
  return (
    <SectionShell id="updates" tone="muted">
      <div className="grid gap-6 lg:grid-cols-2">
        <Reveal direction="left" duration={0.5}>
          <div className="h-full rounded-xl border border-deco bg-blush-surface p-5 sm:p-6 md:p-7">
            <p className="text-sm font-medium tracking-tight text-foggy">Since April</p>
            <h2 className="mt-1 text-[1.375rem] font-semibold tracking-tighter text-hof">
              Since your last stay
            </h2>
            <RevealGroup className="mt-5 space-y-3.5" stagger={0.06} delayChildren={0.1}>
              {sinceLastStay.map((item) => (
                <RevealItem key={item}>
                  <div className="flex items-start gap-3 text-sm tracking-tight text-hof">
                    <CheckCircle2
                      className="mt-0.5 h-4 w-4 shrink-0 text-foggy"
                      strokeWidth={1.75}
                    />
                    {item}
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </Reveal>

        <Reveal direction="right" delay={0.05} duration={0.5}>
          <div className="h-full rounded-xl border border-deco bg-blush-surface p-5 sm:p-6 md:p-7">
            <div className="flex items-center gap-3 border-b border-deco pb-4">
              <span className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full">
                <Image
                  src={HOST_AVATAR}
                  alt={`${HOST_NAME}'s profile photo`}
                  fill
                  sizes="40px"
                  className="object-cover object-top"
                />
              </span>
              <div>
                <p className="text-sm font-semibold tracking-tight text-hof">{HOST_NAME}</p>
                <p className="text-xs tracking-tight text-foggy">A note from your host</p>
              </div>
            </div>
            <RevealGroup className="mt-4 space-y-3" stagger={0.06} delayChildren={0.12}>
              <RevealItem>
                <p className="text-sm leading-normal tracking-tight text-hof">
                  Dear {GUEST_NAME},
                </p>
              </RevealItem>
              {hostNote.paragraphs.map((paragraph) => (
                <RevealItem key={paragraph}>
                  <p className="text-sm leading-normal tracking-tight text-foggy">{paragraph}</p>
                </RevealItem>
              ))}
            </RevealGroup>
            <Reveal delay={0.15}>
              <p className="mt-4 text-sm font-semibold tracking-tight text-hof">
                {hostNote.signOff}
              </p>
            </Reveal>
          </div>
        </Reveal>
      </div>
    </SectionShell>
  );
}
