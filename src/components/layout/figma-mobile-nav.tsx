"use client";

import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { canonicalPath } from "@/lib/site";

type NavLink = {
  label: string;
  href: string;
};

type FigmaMobileNavProps = {
  navLinks: readonly NavLink[];
};

export function FigmaMobileNav({ navLinks }: FigmaMobileNavProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;

    const html = document.documentElement;
    const previousHtmlOverflow = html.style.overflow;
    const previousBodyOverflow = document.body.style.overflow;
    html.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    return () => {
      html.style.overflow = previousHtmlOverflow;
      document.body.style.overflow = previousBodyOverflow;
    };
  }, [menuOpen]);

  return (
    <>
      <button
        type="button"
        className="-mr-2 flex h-10 w-10 items-center justify-center text-foreground md:hidden"
        onClick={() => setMenuOpen(true)}
        aria-label="Open menu"
        aria-expanded={menuOpen}
        aria-controls="mobile-navigation"
      >
        <Menu size={20} />
      </button>

      {menuOpen ? (
        <div
          className="fixed inset-0 z-[60] overflow-hidden md:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
        >
          <button
            type="button"
            className="absolute inset-0 bg-foreground/20 backdrop-blur-[2px]"
            aria-label="Close menu"
            onClick={() => setMenuOpen(false)}
          />

          <div
            className="relative flex flex-col"
            style={{
              background: "var(--background)",
              paddingTop: "env(safe-area-inset-top)",
            }}
          >
            <div className="flex h-14 items-center justify-between px-6">
              <Link href="/" aria-label="Comlabs home" onClick={() => setMenuOpen(false)}>
                <Image
                  src="/logo.png"
                  alt="Comlabs Technologies Pvt Ltd logo"
                  className="h-22 w-28"
                  height={88}
                  width={112}
                  sizes="112px"
                  style={{ mixBlendMode: "multiply" }}
                />
              </Link>
              <button
                type="button"
                className="-mr-2 flex h-10 w-10 items-center justify-center text-foreground"
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
              >
                <X size={20} />
              </button>
            </div>

            <nav
              id="mobile-navigation"
              className="flex flex-col gap-4 border-t border-border px-6 py-5"
              aria-label="Mobile"
            >
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={canonicalPath(link.href)}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href={canonicalPath("/contact")}
                className="rounded-full bg-foreground px-4 py-2.5 text-center text-sm font-semibold text-background"
                onClick={() => setMenuOpen(false)}
              >
                Get Started
              </Link>
            </nav>
          </div>
        </div>
      ) : null}
    </>
  );
}
