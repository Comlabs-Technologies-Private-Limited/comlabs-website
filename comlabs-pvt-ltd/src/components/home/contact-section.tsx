"use client";

import Link from "next/link";

import { SectionHeader } from "@/components/home/section-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { bodyText, eyebrow } from "@/lib/page-styles";
import { cn } from "@/lib/utils";

const primaryLinkClass =
  "inline-flex w-full items-center justify-center rounded-full bg-gradient-to-b from-neutral-800 to-neutral-950 px-5 py-2 text-[13px] font-normal tracking-tight text-white shadow-[0px_3.5px_1px_0px_var(--color-neutral-700)_inset,0px_1px_4px_0px_var(--color-neutral-900)] transition-all duration-150 [text-shadow:0_1px_2px_rgba(0,0,0,0.4)] hover:from-neutral-700 hover:to-neutral-900 hover:shadow-[0px_3.5px_3px_0px_var(--color-neutral-600)_inset,0px_1px_6px_0px_var(--color-neutral-900)] active:scale-[0.97]";

export function ContactSection() {
  return (
    <section id="contact" className="bg-[var(--bg-primary)] px-4 py-24 md:px-8">
      <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-2 md:gap-8">
        <div>
          <SectionHeader>
            <p className={eyebrow}>Contact</p>
            <h2 className="mt-4 text-[clamp(1.75rem,3vw,2.5rem)] font-medium leading-tight tracking-[-0.025em] text-[var(--fg-primary)]">
              Let&apos;s make your startup look ready to scale.
            </h2>
            <p className={cn(bodyText, "mt-4 max-w-md")}>
              Share your website, product, or launch goal. I&apos;ll review where you are, what needs
              to change, and how we can ship it with clarity.
            </p>
          </SectionHeader>
          <div className="mt-8 flex gap-6 text-[var(--fg-tertiary)]">
            <Link
              href="https://github.com"
              className="transition-colors duration-100 hover:text-[var(--fg-primary)]"
              aria-label="GitHub"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </Link>
            <Link
              href="https://twitter.com"
              className="transition-colors duration-100 hover:text-[var(--fg-primary)]"
              aria-label="X"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </Link>
            <Link
              href="https://linkedin.com"
              className="transition-colors duration-100 hover:text-[var(--fg-primary)]"
              aria-label="LinkedIn"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </Link>
          </div>
        </div>
        <div>
          <form
            className="flex flex-col gap-4"
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <Input name="name" placeholder="Name" autoComplete="name" />
            <Input name="email" type="email" placeholder="Email" autoComplete="email" />
            <Textarea name="message" placeholder="Tell us about your project" rows={5} />
            <div className="flex flex-col gap-3">
              <Link
                href="mailto:hello@comlabs.in?subject=Book%20a%20strategy%20call"
                className={primaryLinkClass}
              >
                Book a strategy call
              </Link>
              <Button type="submit" variant="ghost" className="w-full">
                Send project details
              </Button>
            </div>
          </form>
          <p
            className={cn(
              bodyText,
              "mt-3 text-center text-[12px] text-[var(--fg-tertiary)] md:text-left",
            )}
          >
            Response within 24–48 hours.
          </p>
        </div>
      </div>
    </section>
  );
}
