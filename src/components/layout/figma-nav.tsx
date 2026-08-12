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
        className="relative sticky top-0 z-50 border-b border-border"
        style={{
          background: menuOpen ? "var(--background)" : "rgba(247,247,244,0.88)",
          backdropFilter: menuOpen ? undefined : "blur(12px)",
        }}
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
            className="-mr-2 flex h-10 w-10 items-center justify-center text-foreground md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {menuOpen ? (
          <nav
            id="mobile-navigation"
            className="absolute inset-x-0 top-full z-50 flex flex-col gap-4 border-b border-border px-6 py-5 md:hidden"
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
              className="rounded-full bg-foreground px-4 py-2.5 text-center text-sm font-semibold text-background"
              onClick={() => setMenuOpen(false)}
            >
              Get Started
            </Link>
          </nav>
        ) : null}
      </header>

      {menuOpen ? (
        <button
          type="button"
          className="fixed inset-0 top-14 z-40 overflow-hidden bg-foreground/20 backdrop-blur-[2px] md:hidden"
          aria-label="Close menu"
          onClick={() => setMenuOpen(false)}
        />
      ) : null}
    </>
  );
}
