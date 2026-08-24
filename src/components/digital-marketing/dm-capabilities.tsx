"use client";

import { useRef } from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";

import { CAPABILITY_VISUALS } from "@/components/digital-marketing/dm-capability-visuals";
import {
  DIGITAL_MARKETING_CAPABILITIES,
  DIGITAL_MARKETING_ORANGE,
  DIGITAL_MARKETING_RELATED_LINKS,
} from "@/lib/digital-marketing";
import { registerGsap } from "@/lib/gsap-client";
import { canonicalPath } from "@/lib/site";

export function DigitalMarketingCapabilities() {
  const rootRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const gsap = registerGsap();

  useGSAP(
    () => {
      const root = rootRef.current;
      const pin = pinRef.current;
      if (!root || !pin) return;

      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const visuals = pin.querySelectorAll<HTMLElement>("[data-capability-visual]");
      const items = pin.querySelectorAll<HTMLElement>("[data-capability-item]");
      const progress = pin.querySelector<HTMLElement>("[data-capability-progress]");

      const setActive = (index: number) => {
        visuals.forEach((visual, visualIndex) => {
          visual.classList.toggle("opacity-100", visualIndex === index);
          visual.classList.toggle("opacity-0", visualIndex !== index);
          visual.classList.toggle("pointer-events-none", visualIndex !== index);
        });
        items.forEach((item, itemIndex) => {
          item.setAttribute("data-active", itemIndex === index ? "true" : "false");
        });
        if (progress) {
          progress.style.height = `${((index + 1) / DIGITAL_MARKETING_CAPABILITIES.length) * 100}%`;
        }
      };

      setActive(0);

      if (reduce) return;

      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px)", () => {
        const trigger = gsap.timeline({
          scrollTrigger: {
            trigger: pin,
            start: "top 56px",
            end: () => `+=${window.innerHeight * DIGITAL_MARKETING_CAPABILITIES.length * 0.72}`,
            pin: true,
            scrub: 0.45,
            anticipatePin: 1,
            onUpdate: (self) => {
              const next = Math.min(
                DIGITAL_MARKETING_CAPABILITIES.length - 1,
                Math.floor(self.progress * DIGITAL_MARKETING_CAPABILITIES.length),
              );
              setActive(next);
            },
          },
        });
        return () => {
          trigger.kill();
        };
      });
    },
    { scope: rootRef },
  );

  return (
    <section id="capabilities" ref={rootRef} className="border-b border-border">
      <div className="mx-auto w-full max-w-[1380px] px-5 pt-[72px] md:px-7 md:pt-[120px] lg:px-12 lg:pt-40 xl:px-[72px]">
        <p className="mb-5 text-xs tracking-[0.18em] text-muted-foreground uppercase">Capabilities</p>
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-12">
          <h2
            className="lg:col-span-7 text-[clamp(1.85rem,3.4vw,3.25rem)] leading-[1.08] font-medium tracking-tight"
            style={{ letterSpacing: "-0.035em" }}
          >
            One connected marketing system.
          </h2>
          <p className="max-w-md text-[0.9375rem] leading-relaxed text-muted-foreground lg:col-span-5">
            Strategy, creative and distribution work better when they share the same customer
            understanding, business goals and measurement model.
          </p>
        </div>
      </div>

      <div
        ref={pinRef}
        className="mx-auto w-full max-w-[1380px] px-5 py-16 md:px-7 lg:px-12 lg:py-20 xl:px-[72px]"
      >
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="relative lg:col-span-5">
            <div
              className="pointer-events-none absolute top-0 bottom-0 left-0 hidden w-px bg-black/[0.08] lg:block"
              aria-hidden
            >
              <span
                data-capability-progress
                className="absolute top-0 left-0 w-px origin-top"
                style={{ background: DIGITAL_MARKETING_ORANGE, height: "16%" }}
              />
            </div>
            <ol className="flex flex-col gap-10 lg:gap-8 lg:pl-8">
              {DIGITAL_MARKETING_CAPABILITIES.map((capability, index) => {
                const Visual = CAPABILITY_VISUALS[index];
                return (
                  <li
                    key={capability.id}
                    data-capability-item
                    data-active={index === 0 ? "true" : "false"}
                    className="group"
                  >
                    <p className="text-[11px] tracking-[0.16em] text-muted-foreground uppercase">
                      {capability.index}
                    </p>
                    <h3
                      className="mt-2 text-xl font-medium tracking-tight text-foreground transition-colors duration-200 group-data-[active=false]:lg:text-muted-foreground md:text-2xl"
                      style={{ letterSpacing: "-0.03em" }}
                    >
                      {capability.title}
                    </h3>
                    <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
                      {capability.description}
                    </p>
                    <ul className="mt-4 grid gap-1.5 text-sm text-foreground/80 sm:grid-cols-2">
                      {capability.deliverables.map((item) => (
                        <li key={item} className="flex gap-2">
                          <span
                            className="mt-2 h-1 w-1 shrink-0 rounded-full"
                            style={{ background: DIGITAL_MARKETING_ORANGE }}
                            aria-hidden
                          />
                          {item}
                        </li>
                      ))}
                    </ul>
                    {Visual ? (
                      <div className="mt-6 lg:hidden">
                        <Visual />
                      </div>
                    ) : null}
                  </li>
                );
              })}
            </ol>
          </div>

          <div className="relative hidden lg:col-span-7 lg:block">
            <div className="relative h-[min(72vh,640px)]">
              {DIGITAL_MARKETING_CAPABILITIES.map((capability, index) => {
                const Visual = CAPABILITY_VISUALS[index];
                return (
                  <div
                    key={capability.id}
                    data-capability-visual
                    className={`absolute inset-0 transition-opacity duration-300 ${
                      index === 0 ? "opacity-100" : "pointer-events-none opacity-0"
                    }`}
                  >
                    {Visual ? <Visual className="h-full" /> : null}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-wrap gap-x-6 gap-y-2 border-t border-border pt-8 text-sm">
          {DIGITAL_MARKETING_RELATED_LINKS.map((link) => (
            <Link
              key={link.href}
              href={canonicalPath(link.href)}
              className="text-muted-foreground transition-colors hover:text-foreground focus-visible:text-foreground focus-visible:outline-none"
            >
              {link.label} →
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
