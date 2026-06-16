"use client";

import { Menu, X } from "lucide-react";
import { useState } from "react";
import Image from "next/image";

const NAV_LINKS = [
  { label: "Work", href: "/#work" },
  { label: "Services", href: "/#services" },
  { label: "Process", href: "/#process" },
  { label: "About", href: "/" },
  { label: "Case Studies", href: "/#work" },
];

export function FigmaNav() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header
      className="sticky top-0 z-50 border-b border-border"
      style={{ background: "rgba(247,247,244,0.88)", backdropFilter: "blur(12px)" }}
    >
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
        <a href="/" aria-label="Comlabs home">
          <Image
            src="/logo.png"
            alt="Comlabs Technologies logo"
            className="h-22 w-28"
            height={100}
            width={100}
            style={{ mixBlendMode: "multiply" }}
          />
        </a>

        <nav className="hidden items-center gap-7 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <a
            href="/contact"
            className="rounded-full px-4 py-1.5 text-sm font-semibold text-background transition-opacity hover:opacity-90"
            style={{ background: "var(--foreground)" }}
          >
            Get Started
          </a>
        </div>

        <button
          type="button"
          className="text-foreground md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {menuOpen ? (
        <div
          className="flex flex-col gap-4 border-t border-border px-6 py-5 md:hidden"
          style={{ background: "var(--background)" }}
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm text-muted-foreground"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            href="/contact"
            className="rounded-full bg-foreground px-4 py-2 text-center text-sm font-semibold text-background"
          >
            Get Started
          </a>
        </div>
      ) : null}
    </header>
  );
}
