"use client";

import Image from "next/image";
import Link from "next/link";

import { BlurReveal, BLUR_REVEAL_NORMAL_SPEED } from "@/components/blur-reveal";
import {
  AFTER_TITLE_BODY_DELAY,
  RevealCopy,
  RevealStagger,
  RevealStaggerItem,
  useAfterTitleReveal,
} from "@/components/home/figma/after-title-reveal";
import { TESTIMONIALS } from "@/components/home/figma/home-data";
import { referringAnchorProps } from "@/lib/seo/prepare-html-links";
import { cn } from "@/lib/utils";

function FounderAvatar({
  name,
  initials,
  avatarSrc,
}: {
  name: string;
  initials: string;
  avatarSrc?: string;
}) {
  if (avatarSrc) {
    return (
      <Image
        src={avatarSrc}
        alt={name}
        width={40}
        height={40}
        className="h-10 w-10 shrink-0 rounded-full object-cover"
      />
    );
  }

  return (
    <div
      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border bg-secondary text-xs font-medium text-muted-foreground"
      aria-hidden
    >
      {initials}
    </div>
  );
}

export function FigmaTestimonialsSection() {
  const { revealed, onTitleComplete } = useAfterTitleReveal();
  return (
    <section id="testimonials" className="relative border-y border-border bg-card py-14 md:py-16">
      <span aria-hidden className="gutter-hatch" />
      <div className="section-layout">
        <div className="mb-12 max-w-2xl px-1 md:px-4 md:mb-16">
          <p className="mb-4 text-xs font-semibold tracking-widest text-muted-foreground uppercase">
            Testimonials
          </p>
          <BlurReveal
            as="h2"
            inView
            speedReveal={BLUR_REVEAL_NORMAL_SPEED}
            onAnimationComplete={onTitleComplete}
            className="text-2xl font-bold tracking-tight md:text-4xl"
            style={{ letterSpacing: "-0.03em" }}
            segments={[
              { text: "What it feels like to work with" },
              { text: "Comlabs", style: { color: "var(--warm-orange)" } }
            ]}
          />
          <RevealCopy
            revealed={revealed}
            className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base"
          >
            Direct feedback from teams we have helped build, improve and operate critical digital
            systems.
          </RevealCopy>
        </div>
      </div>

      <RevealStagger revealed={revealed} delay={AFTER_TITLE_BODY_DELAY} className="w-full">
        <div className="hatch-aligned-frame border-y border-border px-1 md:px-4 py-1">
          <div className="section-layout">
            <div className="flat-frame grid grid-cols-1 lg:grid-cols-3">
              {TESTIMONIALS.map((testimonial, index) => (
                <RevealStaggerItem
                  key={testimonial.name}
                  className={cn(
                    "flex min-w-0 flex-col",
                    index > 0 && "border-t border-border",
                    "lg:border-t-0",
                    index >= 3 && "lg:border-t lg:border-border",
                    index % 3 !== 0 && "lg:border-l lg:border-border",
                  )}
                >
                  <blockquote className="flex h-full flex-col p-6 lg:p-8">
                    <p className="flex-1 font-sans text-base leading-[1.7] text-foreground">
                      &ldquo;{testimonial.quote}&rdquo;
                    </p>

                    <footer className="mt-8 flex items-center gap-3">
                      <FounderAvatar
                        name={testimonial.name}
                        initials={testimonial.initials}
                        avatarSrc={testimonial.avatarSrc}
                      />

                      <div className="min-w-0">
                        <cite className="not-italic">
                          {testimonial.linkedinUrl ? (
                            <Link
                              {...referringAnchorProps(testimonial.linkedinUrl)}
                              className="block truncate text-sm font-medium text-foreground transition-opacity hover:opacity-80"
                            >
                              {testimonial.name}
                            </Link>
                          ) : (
                            <span className="block truncate text-sm font-medium text-foreground">
                              {testimonial.name}
                            </span>
                          )}
                        </cite>
                        <p className="mt-0.5 truncate text-sm text-muted-foreground">
                          {testimonial.title}, {testimonial.company}
                        </p>
                      </div>
                    </footer>
                  </blockquote>
                </RevealStaggerItem>
              ))}
            </div>
          </div>
        </div>
      </RevealStagger>
    </section>
  );
}
