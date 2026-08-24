"use client";

import Link from "next/link";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { useGSAP } from "@gsap/react";

import { DigitalMarketingHeroVisual } from "@/components/digital-marketing/dm-hero-visual";
import { PageBreadcrumbs } from "@/components/seo/page-breadcrumbs";
import { DIGITAL_MARKETING_ORANGE, DIGITAL_MARKETING_PATH } from "@/lib/digital-marketing";
import { gsapEase, registerGsap } from "@/lib/gsap-client";
import { canonicalPath } from "@/lib/site";

const HEADLINE = "Marketing that turns attention into measurable growth.";

export function DigitalMarketingHero() {
  const rootRef = useRef<HTMLElement>(null);
  const gsap = registerGsap();
  const words = HEADLINE.split(" ");

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const intro = root.querySelectorAll("[data-hero-intro]");
      const wordNodes = root.querySelectorAll("[data-hero-word]");

      if (reduce) {
        gsap.set([intro, wordNodes], { opacity: 1, y: 0 });
        return;
      }

      gsap.fromTo(
        intro,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.08, ease: gsapEase },
      );
      gsap.fromTo(
        wordNodes,
        { opacity: 0, y: 22 },
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          stagger: 0.045,
          ease: gsapEase,
          delay: 0.08,
        },
      );
    },
    { scope: rootRef },
  );

  return (
    <section
      ref={rootRef}
      className="relative min-h-[90svh] overflow-hidden border-b border-border"
    >
      <div className="mx-auto grid min-h-[90svh] w-full max-w-[1380px] items-center gap-12 px-5 py-16 md:px-7 md:py-20 lg:grid-cols-12 lg:gap-10 lg:px-12 lg:py-8 xl:px-[72px]">
        <div className="lg:col-span-6 xl:col-span-6">
          <div data-hero-intro className="motion-safe:opacity-0">
            <PageBreadcrumbs
              currentPath={DIGITAL_MARKETING_PATH}
              items={[
                { label: "Services", href: "/services" },
                { label: "Digital Marketing" },
              ]}
            />
          </div>
          <p
            data-hero-intro
            className="mb-5 text-xs tracking-[0.18em] text-muted-foreground uppercase motion-safe:opacity-0"
          >
            Digital Marketing at Comlabs
          </p>
          <h1
            className="max-w-[14ch] text-[clamp(2.35rem,6vw,5.25rem)] leading-[1.02] font-medium tracking-tight text-foreground"
            style={{ letterSpacing: "-0.04em" }}
          >
            {words.map((word, index) => (
              <span key={`${word}-${index}`} className="inline-block overflow-hidden align-bottom">
                <span data-hero-word className="inline-block pr-[0.28em] motion-safe:opacity-0">
                  {word}
                </span>
              </span>
            ))}
          </h1>
          <p
            data-hero-intro
            className="mt-6 max-w-xl text-[0.9375rem] leading-relaxed text-muted-foreground motion-safe:opacity-0 md:text-base"
          >
            We bring positioning, creative, search, performance and analytics into one connected
            system—so every campaign strengthens the business behind it.
          </p>
          <div data-hero-intro className="mt-10 flex flex-col gap-3 motion-safe:opacity-0 sm:flex-row sm:items-center">
            <Link
              href={canonicalPath("/contact")}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-white transition-opacity duration-200 hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/30 focus-visible:ring-offset-2"
              style={{ background: DIGITAL_MARKETING_ORANGE }}
            >
              Plan a growth sprint
              <ArrowRight size={15} aria-hidden />
            </Link>
            <Link
              href="#capabilities"
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-border bg-white/70 px-6 py-3 text-sm font-medium text-foreground backdrop-blur-sm transition-colors duration-200 hover:border-foreground/20 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/30 focus-visible:ring-offset-2"
            >
              Explore our capabilities
            </Link>
          </div>
        </div>

        <div className="lg:col-span-6">
          <DigitalMarketingHeroVisual />
        </div>
      </div>
    </section>
  );
}
