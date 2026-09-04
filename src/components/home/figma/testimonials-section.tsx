"use client";

import Image from "next/image";
import Link from "next/link";

import { TESTIMONIALS } from "@/components/home/figma/home-data";
import { MarketingFadeIn } from "@/components/marketing/marketing-motion";
import { MarketingOrangeHighlight } from "@/components/marketing/marketing-section-header";
import { referringAnchorProps } from "@/lib/seo/prepare-html-links";

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
  return (
    <section id="testimonials" className="border-y border-border bg-card px-6 py-24 md:py-28">
      <div className="mx-auto max-w-6xl">
        <MarketingFadeIn className="mb-12 max-w-2xl md:mb-16">
          <p className="mb-4 text-xs font-semibold tracking-widest text-muted-foreground uppercase">
            Testimonials
          </p>
          <h2
            className="text-2xl font-bold tracking-tight md:text-4xl"
            style={{ letterSpacing: "-0.03em" }}
          >
            What it feels like to work with{" "}
            <MarketingOrangeHighlight>Comlabs</MarketingOrangeHighlight>.
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">
            Direct feedback from teams we have helped build, improve and operate critical digital
            systems.
          </p>
        </MarketingFadeIn>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((testimonial) => (
            <blockquote
              key={testimonial.name}
              className="flex min-h-[280px] flex-col rounded-3xl border border-border bg-background p-6 md:min-h-[300px] md:p-8"
            >
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
          ))}
        </div>
      </div>
    </section>
  );
}
