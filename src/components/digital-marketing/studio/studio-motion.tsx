"use client";

import { useEffect } from "react";

import { registerGsap } from "@/lib/gsap-client";

/**
 * Single scroll-reveal controller for the studio page.
 *
 * Every element marked `data-studio-reveal` starts displaced via CSS (see the
 * `.dm-studio [data-studio-reveal]` rule in `globals.css`) and is released here
 * as it enters the viewport. Running one controller for the whole page keeps a
 * long document on a single `gsap.context`, which reverts every tween and
 * ScrollTrigger on unmount.
 *
 * Siblings inside the same `data-studio-stagger` container come in sequence;
 * everything else animates on its own trigger.
 *
 * When the visitor prefers reduced motion the CSS start state never applies, so
 * there is nothing to release and no triggers are created at all.
 */
export function StudioMotion() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const gsap = registerGsap();

    const context = gsap.context(() => {
      const targets = gsap.utils.toArray<HTMLElement>("[data-studio-reveal]");
      if (targets.length === 0) return;

      const viewportHeight = window.innerHeight;
      const staggerCounts = new Map<Element, number>();

      for (const target of targets) {
        // Above-the-fold content is shown immediately so it never animates in
        // behind the hero entrance sequence.
        if (target.getBoundingClientRect().top < viewportHeight * 0.92) {
          gsap.set(target, { opacity: 1, y: 0 });
          target.dataset.studioRevealed = "true";
          continue;
        }

        const group = target.closest("[data-studio-stagger]");
        let delay = 0;
        if (group) {
          const seen = staggerCounts.get(group) ?? 0;
          staggerCounts.set(group, seen + 1);
          delay = Math.min(seen, 5) * 0.08;
        }

        gsap.to(target, {
          opacity: 1,
          y: 0,
          duration: 0.85,
          delay,
          ease: "power3.out",
          scrollTrigger: { trigger: group ?? target, start: "top 88%", once: true },
          onComplete: () => {
            target.dataset.studioRevealed = "true";
          },
        });
      }
    });

    return () => context.revert();
  }, []);

  return null;
}
