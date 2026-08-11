"use client";

import Image from "next/image";
import Link from "next/link";

import { TESTIMONIALS } from "@/components/home/figma/home-data";
import { MarketingFadeIn } from "@/components/marketing/marketing-motion";
import { MarketingOrangeHighlight } from "@/components/marketing/marketing-section-header";

function FounderPhoto({
  name,
  initials,
  photoSrc,
}: {
  name: string;
  initials: string;
  photoSrc?: string;
}) {
  return (
    <div
      className="relative mb-6 aspect-[4/5] w-full overflow-hidden rounded-2xl border border-border"
      style={{ background: "#FDF5E8" }}
    >
      {photoSrc ? (
        <Image
          src={photoSrc}
          alt={name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 360px"
          className="object-cover object-center"
        />
      ) : (
        <div className="flex h-full flex-col items-center justify-center gap-3 px-6">
          <span
            className="flex h-16 w-16 items-center justify-center rounded-full border border-border bg-background text-lg font-medium text-muted-foreground"
            aria-hidden
          >
            {initials}
          </span>
          <span className="text-center text-xs text-muted-foreground">Photo coming soon</span>
        </div>
      )}
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
            What founders say <MarketingOrangeHighlight>about us</MarketingOrangeHighlight>.
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">
            Direct feedback from founders we&apos;ve shipped websites, products, and platforms with.
          </p>
        </MarketingFadeIn>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-6">
          {TESTIMONIALS.map((testimonial) => (
            <blockquote
              key={testimonial.name}
              className="flex flex-col rounded-3xl border border-border bg-background p-6 md:p-8"
            >
              <FounderPhoto
                name={testimonial.name}
                initials={testimonial.initials}
                photoSrc={testimonial.avatarSrc}
              />

              <p className="flex-1 text-base leading-[1.7] text-foreground">
                &ldquo;{testimonial.quote}&rdquo;
              </p>

              <footer className="mt-8 border-t border-border pt-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <cite className="not-italic">
                      {testimonial.linkedinUrl ? (
                        <Link
                          href={testimonial.linkedinUrl}
                          target="_blank"
                          rel="noopener noreferrer"
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
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      {testimonial.title}, {testimonial.company}
                    </p>
                  </div>

                  {testimonial.companyLogoSrc ? (
                    <Image
                      src={testimonial.companyLogoSrc}
                      alt={`${testimonial.company} logo`}
                      width={72}
                      height={28}
                      className="h-5 w-auto shrink-0 object-contain opacity-70"
                    />
                  ) : null}
                </div>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
