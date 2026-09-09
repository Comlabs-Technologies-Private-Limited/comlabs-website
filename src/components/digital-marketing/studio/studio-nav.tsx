"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { ComlabsLogo } from "@/components/brand/comlabs-logo";
import { DIGITAL_MARKETING_PATH } from "@/lib/digital-marketing";
import { DIGITAL_STUDIO_SECTIONS } from "@/lib/digital-marketing-studio";
import { cn } from "@/lib/utils";

const LINKS = [
  { label: "Work", href: `#${DIGITAL_STUDIO_SECTIONS.work}` },
  { label: "Capabilities", href: `#${DIGITAL_STUDIO_SECTIONS.capabilities}` },
  { label: "Process", href: `#${DIGITAL_STUDIO_SECTIONS.process}` },
  { label: "Engagements", href: `#${DIGITAL_STUDIO_SECTIONS.engagements}` },
] as const;

/** Duplicated label: the second copy is the incoming layer of the slide hover. */
function SlideLabel({ children }: { children: string }) {
  return (
    <span className="studio-slide">
      <span>{children}</span>
      <span aria-hidden>{children}</span>
    </span>
  );
}

export function StudioNav() {
  const [overHero, setOverHero] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);

  // The bar is white type over the dark hero, then flips to the light shell.
  useEffect(() => {
    // The hero is always rendered by this page, so the observer is the only
    // thing that ever flips this state.
    const hero = document.getElementById("studio-hero");
    if (!hero) return;
    const observer = new IntersectionObserver(
      (entries) => setOverHero((entries[0]?.intersectionRatio ?? 0) > 0.12),
      { threshold: [0, 0.12, 0.3] },
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const previous = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    closeRef.current?.focus();
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setMenuOpen(false);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.documentElement.style.overflow = previous;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  const dark = overHero && !menuOpen;

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,color] duration-500",
          dark
            ? "border-b border-transparent bg-transparent text-[var(--studio-white)]"
            : "border-b border-[var(--studio-line)] bg-[var(--studio-paper-veil)] text-[var(--studio-ink)] backdrop-blur-md",
        )}
      >
        <div className="studio-shell flex h-16 items-center justify-between md:h-20">
          <Link
            href={DIGITAL_MARKETING_PATH}
            className="shrink-0"
            aria-label="Comlabs digital marketing studio"
          >
            <ComlabsLogo
              decorative
              className={cn(
                "h-6 w-auto transition-[filter] duration-500",
                dark && "brightness-0 invert",
              )}
            />
          </Link>

          <nav
            aria-label="Studio sections"
            className="hidden items-center gap-9 md:flex"
          >
            {LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-medium"
              >
                <SlideLabel>{link.label}</SlideLabel>
              </a>
            ))}
          </nav>

          <a
            href={`#${DIGITAL_STUDIO_SECTIONS.contact}`}
            className={cn(
              "hidden h-10 items-center px-5 text-sm font-medium transition-colors duration-300 md:inline-flex",
              dark
                ? "bg-[var(--studio-white)] text-[var(--studio-ink)] hover:bg-[var(--studio-blue)] hover:text-[var(--studio-white)]"
                : "bg-[var(--studio-ink)] text-[var(--studio-white)] hover:bg-[var(--studio-blue)]",
            )}
          >
            Start a conversation
          </a>

          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            className="-mr-2 inline-flex h-11 w-11 items-center justify-center md:hidden"
            aria-label="Open menu"
            aria-expanded={menuOpen}
            aria-controls="studio-mobile-menu"
          >
            <span aria-hidden className="relative block h-3 w-5">
              <span className="absolute inset-x-0 top-0 h-px bg-current" />
              <span className="absolute inset-x-0 bottom-0 h-px bg-current" />
            </span>
          </button>
        </div>
      </header>

      {menuOpen ? (
        <div
          id="studio-mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Studio menu"
          className="fixed inset-0 z-60 flex flex-col bg-[var(--studio-ink)] text-[var(--studio-white)] md:hidden"
        >
          <div className="studio-shell flex h-16 items-center justify-between">
            <ComlabsLogo
              decorative
              className="h-6 w-auto brightness-0 invert"
            />
            <button
              ref={closeRef}
              type="button"
              onClick={() => setMenuOpen(false)}
              className="-mr-2 inline-flex h-11 w-11 items-center justify-center"
              aria-label="Close menu"
            >
              <span aria-hidden className="relative block h-4 w-4">
                <span className="absolute top-1/2 left-0 h-px w-full rotate-45 bg-current" />
                <span className="absolute top-1/2 left-0 h-px w-full -rotate-45 bg-current" />
              </span>
            </button>
          </div>

          <nav
            aria-label="Studio sections"
            className="studio-shell mt-6 flex flex-col"
          >
            {[
              ...LINKS,
              { label: "Contact", href: `#${DIGITAL_STUDIO_SECTIONS.contact}` },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="studio-display border-t border-[var(--studio-line-dark)] py-5 text-[2rem]"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      ) : null}
    </>
  );
}
