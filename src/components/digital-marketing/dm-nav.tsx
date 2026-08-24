"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

import { ComlabsMark } from "@/components/brand/comlabs-mark";
import { DIGITAL_MARKETING_PATH } from "@/lib/digital-marketing";
import { DM } from "@/lib/digital-marketing-media";
import { cn } from "@/lib/utils";

const PRIMARY_LINKS = [
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "Posts", href: "#posts" },
  { label: "Products", href: "#products" },
  { label: "About", href: "#about" },
] as const;

const CHIP =
  "inline-flex items-center justify-center rounded-lg bg-[#242424] px-4 py-2 text-sm font-medium tracking-tight text-[#F4F2ED] transition-colors duration-200 hover:bg-[#2E2E2E] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30";

export function DigitalMarketingNav() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;
    const html = document.documentElement;
    const previousOverflow = html.style.overflow;
    html.style.overflow = "hidden";
    return () => {
      html.style.overflow = previousOverflow;
    };
  }, [menuOpen]);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setMenuOpen(false);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-[80]" style={{ background: "#121212" }}>
        <div className="mx-auto flex h-16 max-w-[1440px] items-center px-5 md:px-6 lg:px-12 xl:px-16">
          <Link href={DIGITAL_MARKETING_PATH} aria-label="Digital marketing home" className="shrink-0">
            <ComlabsMark className="h-8 w-auto" />
          </Link>

          <nav className="ml-6 hidden items-center gap-2 md:flex" aria-label="Primary">
            {PRIMARY_LINKS.map((link) => (
              <a key={link.label} href={link.href} className={CHIP}>
                {link.label}
              </a>
            ))}
          </nav>

          <a href="#contact" className={cn(CHIP, "ml-auto hidden md:inline-flex")}>
            Contact
          </a>

          <button
            type="button"
            className="ml-auto flex h-11 w-11 items-center justify-center md:hidden"
            style={{ color: DM.text }}
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            aria-expanded={menuOpen}
            aria-controls="dm-mobile-navigation"
          >
            <Menu size={20} />
          </button>
        </div>
      </header>

      {menuOpen ? (
        <div
          className="fixed inset-0 z-[90] md:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
        >
          <button
            type="button"
            className="absolute inset-0"
            style={{ background: "rgba(0,0,0,0.5)" }}
            aria-label="Close menu"
            onClick={() => setMenuOpen(false)}
          />
          <div
            className="relative flex flex-col"
            style={{
              background: "#121212",
              paddingTop: "env(safe-area-inset-top)",
            }}
          >
            <div className="flex h-16 items-center px-5">
              <Link
                href={DIGITAL_MARKETING_PATH}
                aria-label="Digital marketing home"
                onClick={() => setMenuOpen(false)}
              >
                <ComlabsMark className="h-8 w-auto" />
              </Link>
              <button
                type="button"
                className="ml-auto flex h-11 w-11 items-center justify-center"
                style={{ color: DM.text }}
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
              >
                <X size={20} />
              </button>
            </div>
            <nav
              id="dm-mobile-navigation"
              className="flex flex-col gap-2 px-5 pb-8"
              aria-label="Mobile"
            >
              {PRIMARY_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className={CHIP}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <a href="#contact" className={CHIP} onClick={() => setMenuOpen(false)}>
                Contact
              </a>
            </nav>
          </div>
        </div>
      ) : null}
    </>
  );
}
