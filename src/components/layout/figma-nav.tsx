"use client";

import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";

import { ComlabsLogo } from "@/components/brand/comlabs-logo";
import { canonicalPath, isBlogPublic } from "@/lib/site";

const BASE_NAV_LINKS = [
  { label: "Services", href: "/services" },
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
] as const;

type FigmaNavProps = {
  showBlogLink?: boolean;
};

export function FigmaNav({ showBlogLink = true }: FigmaNavProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    ...BASE_NAV_LINKS,
    ...(showBlogLink && isBlogPublic() ? [{ label: "Blog", href: "/blog" }] : []),
  ];

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
      <header
        className="sticky top-0 z-50 border-b border-border"
        style={{ background: "rgba(247,247,244,0.88)", backdropFilter: "blur(12px)" }}
      >
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
          <Link href="/" aria-label="Comlabs home">
            <ComlabsLogo decorative className="h-7 w-auto md:h-8" />
          </Link>

          <nav className="hidden items-center gap-7 md:flex" aria-label="Primary">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={canonicalPath(link.href)}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <Link
              href={canonicalPath("/contact")}
              className="rounded-full px-4 py-1.5 text-sm font-semibold text-background transition-opacity hover:opacity-90"
              style={{ background: "var(--foreground)" }}
            >
              Get Started
            </Link>
          </div>

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
        </div>
      </header>

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
                <ComlabsLogo decorative className="h-7 w-auto" />
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
