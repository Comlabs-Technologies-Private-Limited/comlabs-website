"use client";

import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

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

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
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
            <Image
              src="/logo.png"
              alt="Comlabs Technologies Pvt Ltd logo"
              className="h-22 w-28"
              height={100}
              width={100}
              style={{ mixBlendMode: "multiply" }}
            />
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
            className="text-foreground md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {menuOpen ? (
        <div className="fixed inset-0 z-40 md:hidden" role="presentation">
          <button
            type="button"
            className="absolute inset-0 bg-foreground/20 backdrop-blur-[2px]"
            aria-label="Close menu"
            onClick={() => setMenuOpen(false)}
          />
          <nav
            className="absolute inset-x-0 top-14 flex flex-col gap-4 border-b border-border px-6 py-5 shadow-[0_16px_48px_rgba(28,25,23,0.08)]"
            style={{ background: "var(--background)" }}
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
              className="rounded-full bg-foreground px-4 py-2 text-center text-sm font-semibold text-background"
              onClick={() => setMenuOpen(false)}
            >
              Get Started
            </Link>
          </nav>
        </div>
      ) : null}
    </>
  );
}
