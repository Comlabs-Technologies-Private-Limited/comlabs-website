"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { registerGsap } from "@/lib/gsap-client";
import { setStudioLenis } from "@/lib/studio-lenis-bridge";

/**
 * The page's single motion controller.
 *
 * Lenis smooth scroll and GSAP share one ticker so ScrollTrigger scrub values
 * stay frame-locked to the eased scroll position. Horizontal rails opt out via
 * `data-lenis-prevent`.
 *
 * Three reveal patterns only:
 *   `data-studio-line`   masked heading lines rising from 110%
 *   `data-studio-reveal` supporting copy rising 22px
 *   `data-studio-media`  clip-path wipe with a counter-scaling image
 *
 * Under `prefers-reduced-motion: reduce` Lenis and start states are skipped.
 */

const EASE_EDITORIAL = "power3.out";
const EASE_PRECISE = "expo.out";

/** Fixed nav clearance for in-page anchor jumps. */
const ANCHOR_OFFSET = 80;

export function StudioMotion() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const gsap = registerGsap();
    const fine = window.matchMedia("(pointer: fine)").matches;

    const lenis = new Lenis({
      lerp: 0.085,
      smoothWheel: true,
      wheelMultiplier: 0.9,
      autoRaf: false,
      anchors: { offset: ANCHOR_OFFSET },
    });
    setStudioLenis(lenis);

    lenis.on("scroll", ScrollTrigger.update);

    const onTick = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);

    const context = gsap.context(() => {
      // `context.revert()` undoes tweens and triggers but not hand-added DOM
      // listeners, so they are collected and removed explicitly.
      const teardown: Array<() => void> = [];
      const viewportHeight = window.innerHeight;
      const start = "top 85%";

      // --- Heading lines --------------------------------------------------
      for (const wrapper of gsap.utils.toArray<HTMLElement>(
        "[data-studio-line]",
      )) {
        const lines = wrapper.querySelectorAll<HTMLElement>(":scope > span");
        if (wrapper.getBoundingClientRect().top < viewportHeight * 0.92) {
          gsap.set(lines, { yPercent: 0, opacity: 1 });
          continue;
        }
        gsap.to(lines, {
          yPercent: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.075,
          ease: EASE_EDITORIAL,
          scrollTrigger: { trigger: wrapper, start, once: true },
        });
      }

      // --- Media wipes ----------------------------------------------------
      for (const frame of gsap.utils.toArray<HTMLElement>(
        "[data-studio-media]",
      )) {
        const image = frame.querySelector("img");
        const timeline = gsap.timeline({
          scrollTrigger: { trigger: frame, start, once: true },
        });
        timeline.to(frame, {
          clipPath: "inset(0 0 0% 0)",
          duration: 1,
          ease: EASE_PRECISE,
        });
        if (image) {
          timeline.to(
            image,
            { scale: 1, duration: 1.05, ease: EASE_PRECISE },
            0,
          );
        }
      }

      // --- Supporting copy ------------------------------------------------
      const staggerCounts = new Map<Element, number>();
      for (const target of gsap.utils.toArray<HTMLElement>(
        "[data-studio-reveal]",
      )) {
        // Anything already on screen is shown outright rather than animating
        // in behind the hero entrance.
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
          duration: 0.6,
          delay,
          ease: EASE_EDITORIAL,
          scrollTrigger: { trigger: group ?? target, start, once: true },
          onComplete: () => {
            target.dataset.studioRevealed = "true";
          },
        });
      }

      // --- Process rail and active step ------------------------------------
      const track = document.querySelector<HTMLElement>("[data-studio-track]");
      const steps = Array.from(
        document.querySelectorAll<HTMLElement>("[data-studio-step]"),
      );
      if (track && steps.length > 0) {
        const section = track.closest("section");
        gsap.to(
          {},
          {
            scrollTrigger: {
              trigger: section ?? track,
              start: "top 70%",
              end: "bottom 70%",
              scrub: true,
              onUpdate: (self) => {
                track.style.setProperty(
                  "--studio-progress",
                  String(self.progress),
                );
                // Hysteresis: a step stays active until progress moves a full
                // band past it, so nudging the wheel backward doesn't flicker.
                const active = Math.min(
                  steps.length - 1,
                  Math.floor(self.progress * steps.length + 0.15),
                );
                steps.forEach((step, index) => {
                  step.dataset.active = index <= active ? "true" : "false";
                });
              },
            },
          },
        );
      }

      // --- Work-image parallax ---------------------------------------------
      // The photograph drifts against its frame as the panel passes, which is
      // what stops a sticky stack from feeling like flat slides.
      for (const frame of gsap.utils.toArray<HTMLElement>(".studio-work__frame")) {
        const image = frame.querySelector<HTMLElement>(".studio-work__image");
        if (!image) continue;
        gsap.to(
          {},
          {
            scrollTrigger: {
              trigger: frame,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
              onUpdate: (self) => {
                // ±22px total travel — enough to read, never enough to expose
                // an edge inside the 1.06 overscale.
                image.style.setProperty(
                  "--studio-parallax",
                  `${(self.progress - 0.5) * -44}px`,
                );
              },
            },
          },
        );
      }

      // --- Magnetic primary buttons (fine pointers only) --------------------
      if (fine) {
        for (const button of gsap.utils.toArray<HTMLElement>(".studio-cta")) {
          const setX = gsap.quickTo(button, "x", {
            duration: 0.4,
            ease: "power3.out",
          });
          const setY = gsap.quickTo(button, "y", {
            duration: 0.4,
            ease: "power3.out",
          });

          const onMove = (event: PointerEvent) => {
            const rect = button.getBoundingClientRect();
            // Capped at 4px so the control never leaves its own hit area.
            setX(
              gsap.utils.clamp(
                -4,
                4,
                (event.clientX - (rect.left + rect.width / 2)) * 0.2,
              ),
            );
            setY(
              gsap.utils.clamp(
                -4,
                4,
                (event.clientY - (rect.top + rect.height / 2)) * 0.2,
              ),
            );
          };
          const onLeave = () => {
            setX(0);
            setY(0);
          };

          button.addEventListener("pointermove", onMove);
          button.addEventListener("pointerleave", onLeave);
          button.addEventListener("blur", onLeave);
          teardown.push(() => {
            button.removeEventListener("pointermove", onMove);
            button.removeEventListener("pointerleave", onLeave);
            button.removeEventListener("blur", onLeave);
          });
        }

        // --- Closing-CTA atmospheric field --------------------------------
        const field = document.querySelector<HTMLElement>(
          "[data-studio-field]",
        );
        if (field) {
          const onFieldMove = (event: PointerEvent) => {
            const rect = field.getBoundingClientRect();
            field.style.setProperty(
              "--studio-field-x",
              `${((event.clientX - rect.left) / rect.width) * 100}%`,
            );
            field.style.setProperty(
              "--studio-field-y",
              `${((event.clientY - rect.top) / rect.height) * 100}%`,
            );
          };
          field.addEventListener("pointermove", onFieldMove);
          teardown.push(() =>
            field.removeEventListener("pointermove", onFieldMove),
          );
        }
      }

      return () => {
        for (const remove of teardown) remove();
      };
    });

    ScrollTrigger.refresh();

    return () => {
      context.revert();
      lenis.destroy();
      setStudioLenis(null);
      gsap.ticker.remove(onTick);
    };
  }, []);

  return null;
}
