"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";

import {
  DIGITAL_STUDIO_HERO_ALT,
  DIGITAL_STUDIO_SECTIONS,
  digitalStudioHeroImage,
} from "@/lib/digital-marketing-studio";
import { registerGsap } from "@/lib/gsap-client";

/**
 * The shader atmosphere is optional decoration over the photograph, so it is
 * client-only and loaded after the hero paints. Everything a reader or crawler
 * needs is server-rendered DOM underneath it.
 */
const StudioHeroCanvas = dynamic(() => import("./studio-hero-canvas"), {
  ssr: false,
});

const SIGNAL_CARDS = [
  {
    index: "01",
    title: "Positioning",
    body: "The claim that is true, specific and worth choosing.",
  },
  {
    index: "02",
    title: "Creative",
    body: "Work briefed against a decision, not against a mood board.",
  },
  {
    index: "03",
    title: "Performance",
    body: "Demand, conversion and measurement on one brief.",
  },
] as const;

export function StudioHero() {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;

      const gsap = registerGsap();
      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      const stage = root.querySelectorAll<HTMLElement>("[data-hero-stage]");
      const cards = root.querySelectorAll<HTMLElement>("[data-hero-card]");
      const wordmark = root.querySelector<HTMLElement>("[data-hero-wordmark]");
      const media = root.querySelector<HTMLElement>("[data-hero-media]");

      if (reduce) {
        gsap.set([stage, cards, wordmark, media], {
          clearProps: "all",
          opacity: 1,
          y: 0,
          scale: 1,
        });
        return;
      }

      // ~1.7s entrance: image settles, copy rises, cards land, wordmark reveals.
      const timeline = gsap.timeline({ defaults: { ease: "power3.out" } });

      timeline
        .fromTo(
          media,
          { scale: 1.08, opacity: 0.4 },
          { scale: 1, opacity: 1, duration: 1.5 },
          0,
        )
        .fromTo(
          stage,
          { y: 28, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, stagger: 0.11 },
          0.25,
        )
        .fromTo(
          cards,
          { y: 34, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.85, stagger: 0.09 },
          0.65,
        )
        .fromTo(
          wordmark,
          { yPercent: 26, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 1 },
          0.85,
        );
    },
    { scope: rootRef },
  );

  return (
    <section
      ref={rootRef}
      id="studio-hero"
      aria-labelledby="studio-hero-heading"
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-[var(--studio-black)] text-[var(--studio-white)]"
    >
      <div
        data-hero-media
        className="absolute inset-0 -z-10 motion-safe:opacity-0"
      >
        <Image
          src={digitalStudioHeroImage}
          alt={DIGITAL_STUDIO_HERO_ALT}
          fill
          priority
          sizes="100vw"
          // Desktop favours the lit profile on the right of the frame; narrower
          // viewports pull the crop back toward the subject so the face is never
          // sliced by the edge.
          className="object-cover object-[70%_38%] sm:object-[64%_44%] lg:object-[58%_50%]"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-[linear-gradient(180deg,rgba(9,11,13,0.72)_0%,rgba(9,11,13,0.34)_38%,rgba(9,11,13,0.86)_100%)]"
        />
        <StudioHeroCanvas />
      </div>

      <div className="studio-shell flex flex-1 flex-col pt-28 pb-10 md:pt-36 md:pb-12">
        <div className="flex flex-1 flex-col justify-center gap-12 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
          <div className="max-w-[46rem]">
            <p data-hero-stage className="studio-eyebrow motion-safe:opacity-0">
              Comlabs Digital Marketing &amp; Design Studio
            </p>
            <h1
              id="studio-hero-heading"
              data-hero-stage
              className="studio-display studio-h1 mt-6 motion-safe:opacity-0"
            >
              Marketing that turns attention into measurable growth.
            </h1>
            <p
              data-hero-stage
              className="mt-7 max-w-xl text-[0.9375rem] leading-relaxed text-[rgba(250,250,247,0.72)] motion-safe:opacity-0 md:text-base"
            >
              We connect positioning, creative, search, performance and
              analytics into one growth system — so every campaign strengthens
              the business behind it.
            </p>
            <div
              data-hero-stage
              className="mt-9 flex flex-col gap-3 motion-safe:opacity-0 sm:flex-row sm:items-center"
            >
              <a
                href={`#${DIGITAL_STUDIO_SECTIONS.contact}`}
                className="studio-cta inline-flex h-12 items-center justify-center gap-2.5 bg-[var(--studio-white)] px-7 text-sm font-medium text-[var(--studio-ink)] hover:bg-[var(--studio-blue)] hover:text-[var(--studio-white)]"
              >
                Start a conversation
                <span aria-hidden className="studio-cta__marker">
                  ↗
                </span>
              </a>
              <a
                href={`#${DIGITAL_STUDIO_SECTIONS.work}`}
                className="studio-ghost inline-flex h-12 items-center justify-center border border-[var(--studio-line-dark)] px-7 text-sm font-medium hover:border-[var(--studio-white)]"
              >
                <span>See selected work</span>
              </a>
            </div>
          </div>

          {/* Three overlapping signal cards — the studio's three-part method. */}
          <ul className="flex w-full max-w-md flex-col lg:mb-2 lg:w-[22rem]">
            {SIGNAL_CARDS.map((card, index) => (
              <li
                key={card.title}
                data-hero-card
                className="border border-[var(--studio-line-dark)] bg-[rgba(9,11,13,0.55)] p-5 backdrop-blur-md motion-safe:opacity-0"
                style={index > 0 ? { marginTop: "-1px" } : undefined}
              >
                <div className="flex items-baseline justify-between gap-4">
                  <span className="text-sm font-medium">{card.title}</span>
                  <span className="font-mono text-[0.6875rem] tracking-widest text-[var(--studio-cyan)]">
                    {card.index}
                  </span>
                </div>
                <p className="mt-2 text-[0.8125rem] leading-relaxed text-[rgba(250,250,247,0.62)]">
                  {card.body}
                </p>
              </li>
            ))}
          </ul>
        </div>

        {/* Oversized wordmark anchoring the base of the frame. */}
        <div className="mt-14 overflow-hidden md:mt-16">
          <p
            data-hero-wordmark
            aria-hidden
            // Sized from the shell width so the seven letters span the full
            // measure at every breakpoint instead of a fixed viewport ratio.
            className="studio-display -mb-[0.06em] w-full text-[calc((100vw-2*var(--studio-gutter))/4.15)] leading-[0.8] text-[rgba(250,250,247,0.52)] motion-safe:opacity-0"
          >
            Comlabs
          </p>
        </div>
      </div>
    </section>
  );
}
