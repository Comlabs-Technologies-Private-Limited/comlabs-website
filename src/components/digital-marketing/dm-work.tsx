"use client";

import { useGSAP } from "@gsap/react";
import Image from "next/image";
import { useRef } from "react";

import { DIGITAL_MARKETING_WORK } from "@/lib/digital-marketing";
import { DM } from "@/lib/digital-marketing-media";
import { gsapEase, registerGsap } from "@/lib/gsap-client";

export function DigitalMarketingWork() {
  const rootRef = useRef<HTMLElement>(null);
  const gsap = registerGsap();

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const images = root.querySelectorAll("[data-work-image]");
      if (reduce) {
        gsap.set(images, { opacity: 1, clipPath: "none" });
        return;
      }
      gsap.fromTo(
        images,
        { clipPath: "inset(0 0 12% 0)", opacity: 0.7 },
        {
          clipPath: "inset(0 0 0% 0)",
          opacity: 1,
          duration: 0.9,
          stagger: 0.12,
          ease: gsapEase,
          scrollTrigger: { trigger: root, start: "top 72%", once: true },
        },
      );
    },
    { scope: rootRef },
  );

  return (
    <section id="work" ref={rootRef} className="scroll-mt-24 py-24 md:py-32">
      <div className="mx-auto w-full max-w-[1440px] px-5 md:px-6 lg:px-12 xl:px-16">
        <h2
          className="max-w-[16ch] text-[clamp(2rem,3.6vw,3.5rem)] leading-[1.06] font-medium tracking-tight"
          style={{ color: DM.text, letterSpacing: "-0.035em" }}
        >
          Work designed to move the business forward.
        </h2>
        <p className="mt-5 max-w-xl text-[0.9375rem] leading-relaxed" style={{ color: DM.muted }}>
          Selected digital work across positioning, conversion, product experience and growth
          foundations.
        </p>

        <div className="mt-14 flex flex-col">
          {DIGITAL_MARKETING_WORK.map((item) => (
            <WorkRow key={item.client} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}

function WorkRow({ item }: { item: (typeof DIGITAL_MARKETING_WORK)[number] }) {
  return (
    <article
      className="grid items-center gap-6 py-8 lg:grid-cols-12 lg:gap-10 lg:py-10"
      style={{ borderTop: `1px solid ${DM.hairline}` }}
    >
      <div className="lg:col-span-4">
        <p className="text-[11px] tracking-[0.16em] uppercase" style={{ color: DM.muted }}>
          {item.discipline}
        </p>
        <h3
          className="mt-3 text-2xl font-medium tracking-tight md:text-[2rem]"
          style={{ letterSpacing: "-0.03em" }}
        >
          {item.client}
        </h3>
        <p className="mt-4 max-w-md text-sm leading-relaxed" style={{ color: DM.muted }}>
          {item.outcome}
        </p>
      </div>
      <div
        data-work-image
        className="relative aspect-[16/9] overflow-hidden lg:col-span-8 lg:aspect-[16/8]"
        style={{ borderRadius: 12, background: DM.elevated }}
      >
        <Image
          src={item.image}
          alt={item.imageAlt}
          fill
          sizes="(max-width: 1024px) 100vw, 66vw"
          className="object-cover object-top"
        />
      </div>
    </article>
  );
}
