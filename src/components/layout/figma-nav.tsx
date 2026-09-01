"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronDown, Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import type { FocusEvent, ReactNode } from "react";

import { ComlabsLogo } from "@/components/brand/comlabs-logo";
import { SERVICE_NAV_ITEMS } from "@/lib/canonical-services";
import { cn } from "@/lib/utils";
import { canonicalPath, isBlogPublic } from "@/lib/site";

const SIMPLE_LINKS = [
  { label: "About", href: "/about" },
  { label: "Careers", href: "/careers" },
] as const;

const WORK_ITEMS = [
  {
    title: "Formial Labs",
    description: "Custom Software Engineering",
    href: "/work/formial-labs",
  },
  {
    title: "Global Services",
    description: "Web & Digital Experience",
    href: "/work/global-services",
  },
  {
    title: "Vithub",
    description: "Web & Digital Experience",
    href: "/work/vithub",
  },
] as const;

type DesktopMenu = "services" | "work" | null;
type MobileAccordion = "services" | "work" | null;

const CLOSE_DELAY_MS = 100;
const DROPDOWN_EASE = [0.22, 1, 0.36, 1] as const;

function navLinkClass(dark: boolean) {
  return cn(
    "rounded-full px-3 py-[7px] text-sm",
    "transition-[background-color,color] duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
    "focus-visible:outline-none",
    dark
      ? "text-[#F4F2ED]/70 hover:bg-white/[0.08] hover:text-[#F4F2ED] focus-visible:bg-white/[0.08] focus-visible:text-[#F4F2ED]"
      : "rounded-[9px] px-[10px] text-muted-foreground hover:bg-black/[0.045] hover:text-foreground focus-visible:bg-black/[0.045] focus-visible:text-foreground",
  );
}

type FigmaNavProps = {
  showBlogLink?: boolean;
  tone?: "light" | "dark";
};

export function FigmaNav({ showBlogLink = true, tone = "light" }: FigmaNavProps) {
  const dark = tone === "dark";
  const [menuOpen, setMenuOpen] = useState(false);
  const [desktopMenu, setDesktopMenu] = useState<DesktopMenu>(null);
  const [mobileAccordion, setMobileAccordion] = useState<MobileAccordion>(null);
  const closeTimer = useRef<number | null>(null);
  const reduce = useReducedMotion();

  const blogLinks =
    showBlogLink && isBlogPublic()
      ? ([{ label: "Blog", href: "/blog" }] as const)
      : [];

  function cancelClose() {
    if (closeTimer.current !== null) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }

  function openDesktop(menu: Exclude<DesktopMenu, null>) {
    cancelClose();
    setDesktopMenu(menu);
  }

  function closeDesktop() {
    cancelClose();
    setDesktopMenu(null);
  }

  function scheduleClose() {
    cancelClose();
    closeTimer.current = window.setTimeout(() => {
      setDesktopMenu(null);
      closeTimer.current = null;
    }, CLOSE_DELAY_MS);
  }

  useEffect(() => {
    return () => cancelClose();
  }, []);

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

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      setDesktopMenu(null);
      setMenuOpen(false);
      setMobileAccordion(null);
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 767px)");
    function onChange() {
      if (media.matches) setDesktopMenu(null);
    }
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  function closeMobile() {
    setMenuOpen(false);
    setMobileAccordion(null);
  }

  return (
    <>
      <header
        className="sticky top-0 z-[80] border-b"
        style={{
          background: dark ? "rgba(20,20,20,0.88)" : "rgba(247,247,244,0.88)",
          borderColor: dark ? "rgba(244,242,237,0.12)" : "var(--border)",
          backdropFilter: "blur(12px)",
        }}
      >
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
          <Link href="/" aria-label="Comlabs home">
            <ComlabsLogo
              decorative
              className={cn("h-5 w-auto", dark && "brightness-0 invert")}
            />
          </Link>

          <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
            <DesktopDropdown
              label="Services"
              href="/services"
              open={desktopMenu === "services"}
              reduce={Boolean(reduce)}
              dark={dark}
              panelWidth="min(580px, calc(100vw - 48px))"
              onOpen={() => openDesktop("services")}
              onClose={closeDesktop}
              onScheduleClose={scheduleClose}
            >
              <div className="grid grid-cols-2 gap-1">
                {SERVICE_NAV_ITEMS.map((item) => (
                  <DropdownItem
                    key={item.title}
                    href={item.href}
                    title={item.title}
                    description={item.description}
                    dark={dark}
                  />
                ))}
              </div>
              <DropdownFooter href="/services" label="View all services" dark={dark} />
            </DesktopDropdown>

            <DesktopDropdown
              label="Work"
              href="/work"
              open={desktopMenu === "work"}
              reduce={Boolean(reduce)}
              dark={dark}
              panelWidth="min(400px, calc(100vw - 48px))"
              onOpen={() => openDesktop("work")}
              onClose={closeDesktop}
              onScheduleClose={scheduleClose}
            >
              <div className="flex flex-col gap-1">
                {WORK_ITEMS.map((item) => (
                  <DropdownItem
                    key={item.href}
                    href={item.href}
                    title={item.title}
                    description={item.description}
                    dark={dark}
                  />
                ))}
              </div>
              <DropdownFooter href="/work" label="View all work" dark={dark} />
            </DesktopDropdown>

            {[...SIMPLE_LINKS, ...blogLinks].map((link) => (
              <Link
                key={link.label}
                href={canonicalPath(link.href)}
                className={navLinkClass(dark)}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <Link
              href={canonicalPath("/contact")}
              className={cn(
                "rounded-full px-4 py-1.5 text-sm font-medium transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2",
                !dark && "font-medium text-background",
              )}
              style={
                dark
                  ? {
                      color: "#F4F2ED",
                      boxShadow: "inset 0 0 0 1px rgba(244,242,237,0.18)",
                    }
                  : { background: "var(--foreground)" }
              }
            >
              Get Started
            </Link>
          </div>

          <button
            type="button"
            className={cn(
              "-mr-2 flex h-11 w-11 items-center justify-center md:hidden",
              dark ? "text-[#F4F2ED]" : "text-foreground",
            )}
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
          className="fixed inset-0 z-[90] overflow-hidden md:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
        >
          <button
            type="button"
            className="absolute inset-0 bg-foreground/20 backdrop-blur-[2px]"
            aria-label="Close menu"
            onClick={closeMobile}
          />

            <div
              className="relative flex flex-col"
              style={{
                background: dark ? "#141414" : "var(--background)",
                paddingTop: "env(safe-area-inset-top)",
                color: dark ? "#F4F2ED" : undefined,
              }}
            >
              <div className="flex h-14 items-center justify-between px-6">
                <Link href="/" aria-label="Comlabs home" onClick={closeMobile}>
                  <ComlabsLogo decorative className={cn("h-5 w-auto", dark && "brightness-0 invert")} />
                </Link>
              <button
                type="button"
                className={cn(
                  "-mr-2 flex h-11 w-11 items-center justify-center",
                  dark ? "text-[#F4F2ED]" : "text-foreground",
                )}
                onClick={closeMobile}
                aria-label="Close menu"
              >
                <X size={20} />
              </button>
            </div>

            <nav
              id="mobile-navigation"
              className={cn(
                "flex flex-col gap-1 border-t px-6 py-5",
                dark ? "border-white/10" : "border-border",
              )}
              aria-label="Mobile"
              style={dark ? { color: "#F4F2ED" } : undefined}
            >
              <MobileAccordion
                id="mobile-services"
                label="Services"
                href="/services"
                open={mobileAccordion === "services"}
                onToggle={() =>
                  setMobileAccordion((current) =>
                    current === "services" ? null : "services",
                  )
                }
                onNavigate={closeMobile}
              >
                {SERVICE_NAV_ITEMS.map((item) => (
                  <Link
                    key={item.title}
                    href={canonicalPath(item.href)}
                    className="block rounded-[10px] px-3 py-3"
                    onClick={closeMobile}
                  >
                    <span className="block text-sm text-foreground">{item.title}</span>
                    <span className="mt-1 block text-[12px] text-muted-foreground">
                      {item.description}
                    </span>
                  </Link>
                ))}
                <Link
                  href={canonicalPath("/services")}
                  className="block px-3 py-3 text-sm text-muted-foreground"
                  onClick={closeMobile}
                >
                  View all services →
                </Link>
              </MobileAccordion>

              <MobileAccordion
                id="mobile-work"
                label="Work"
                href="/work"
                open={mobileAccordion === "work"}
                onToggle={() =>
                  setMobileAccordion((current) =>
                    current === "work" ? null : "work",
                  )
                }
                onNavigate={closeMobile}
              >
                {WORK_ITEMS.map((item) => (
                  <Link
                    key={item.href}
                    href={canonicalPath(item.href)}
                    className="block rounded-[10px] px-3 py-3"
                    onClick={closeMobile}
                  >
                    <span className="block text-sm text-foreground">{item.title}</span>
                    <span className="mt-1 block text-[12px] text-muted-foreground">
                      {item.description}
                    </span>
                  </Link>
                ))}
                <Link
                  href={canonicalPath("/work")}
                  className="block px-3 py-3 text-sm text-muted-foreground"
                  onClick={closeMobile}
                >
                  View all work →
                </Link>
              </MobileAccordion>

              {[...SIMPLE_LINKS, ...blogLinks].map((link) => (
                <Link
                  key={link.label}
                  href={canonicalPath(link.href)}
                  className="rounded-[9px] px-[10px] py-3 text-sm text-muted-foreground"
                  onClick={closeMobile}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href={canonicalPath("/contact")}
                className={cn(
                  "mt-3 rounded-full px-4 py-2.5 text-center text-sm font-medium",
                  dark ? "text-[#141414]" : "bg-foreground text-background",
                )}
                style={dark ? { background: "#F4F2ED" } : undefined}
                onClick={closeMobile}
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

function DesktopDropdown({
  label,
  href,
  open,
  reduce,
  dark,
  panelWidth,
  onOpen,
  onClose,
  onScheduleClose,
  children,
}: {
  label: string;
  href: string;
  open: boolean;
  reduce: boolean;
  dark: boolean;
  panelWidth: string;
  onOpen: () => void;
  onClose: () => void;
  onScheduleClose: () => void;
  children: ReactNode;
}) {
  const panelId = useId();
  const wrapRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const [shiftX, setShiftX] = useState(0);

  useLayoutEffect(() => {
    if (!open || !panelRef.current) {
      setShiftX(0);
      return;
    }

    const rect = panelRef.current.getBoundingClientRect();
    const pad = 16;
    let next = 0;
    if (rect.right > window.innerWidth - pad) {
      next = window.innerWidth - pad - rect.right;
    }
    if (rect.left + next < pad) {
      next += pad - (rect.left + next);
    }
    setShiftX(next);
  }, [open, panelWidth]);

  useEffect(() => {
    if (!open) return;

    function onPointerDown(event: PointerEvent) {
      if (wrapRef.current?.contains(event.target as Node)) return;
      onClose();
    }

    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open, onClose]);

  function onBlur(event: FocusEvent<HTMLDivElement>) {
    const next = event.relatedTarget;
    if (next instanceof Node && wrapRef.current?.contains(next)) return;
    onScheduleClose();
  }

  return (
    <div
      ref={wrapRef}
      className="relative"
      onMouseEnter={onOpen}
      onMouseLeave={onScheduleClose}
      onFocus={onOpen}
      onBlur={onBlur}
    >
      <Link
        href={canonicalPath(href)}
        className={cn(
          navLinkClass(dark),
          open && (dark ? "bg-white/[0.08] text-[#F4F2ED]" : "bg-black/[0.045] text-foreground"),
        )}
        aria-expanded={open}
        aria-haspopup="true"
        aria-controls={panelId}
      >
        {label}
      </Link>

      <AnimatePresence>
        {open ? (
          <motion.div
            key={label}
            className="absolute left-0 top-full z-[90] origin-top"
            initial={reduce ? false : { opacity: 0, y: -4, scale: 0.985, x: shiftX }}
            animate={{ opacity: 1, y: 0, scale: 1, x: shiftX }}
            exit={
              reduce
                ? { opacity: 0 }
                : {
                    opacity: 0,
                    y: -2,
                    scale: 0.99,
                    transition: { duration: 0.14, ease: DROPDOWN_EASE },
                  }
            }
            transition={{
              duration: reduce ? 0 : 0.2,
              ease: DROPDOWN_EASE,
            }}
          >
            <div className="h-3.5 w-full" aria-hidden />
            <div
              ref={panelRef}
              id={panelId}
              role="navigation"
              aria-label={label}
              className="rounded-2xl p-6"
              style={{
                width: panelWidth,
                background: dark ? "#1A1A1A" : "#FFFFFF",
                border: dark ? "1px solid rgba(244,242,237,0.12)" : "1px solid rgba(0,0,0,0.06)",
                boxShadow: dark
                  ? "0 18px 50px rgba(0,0,0,0.35)"
                  : "0 18px 50px rgba(0,0,0,0.10), 0 2px 8px rgba(0,0,0,0.04)",
              }}
            >
              {children}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

function DropdownItem({
  href,
  title,
  description,
  dark,
}: {
  href: string;
  title: string;
  description: string;
  dark?: boolean;
}) {
  return (
    <Link
      href={canonicalPath(href)}
      className={cn(
        "group/item block rounded-[10px] px-3 py-3",
        "transition-[background-color,transform] duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
        "hover:translate-x-px focus-visible:outline-none",
        dark
          ? "hover:bg-white/[0.06] focus-visible:bg-white/[0.06]"
          : "hover:bg-black/[0.04] focus-visible:bg-black/[0.04]",
      )}
    >
      <span
        className={cn(
          "block text-[13px] font-medium tracking-tight",
          dark ? "text-[#F4F2ED]" : "text-foreground",
        )}
      >
        {title}
      </span>
      <span
        className={cn(
          "mt-1 block text-[12px] leading-snug",
          dark ? "text-[#F4F2ED]/60" : "text-muted-foreground",
        )}
      >
        {description}
      </span>
    </Link>
  );
}

function DropdownFooter({
  href,
  label,
  dark,
}: {
  href: string;
  label: string;
  dark?: boolean;
}) {
  return (
    <div
      className="mt-4 pt-4"
      style={{ borderTop: dark ? "1px solid rgba(244,242,237,0.12)" : "1px solid rgba(0,0,0,0.06)" }}
    >
      <Link
        href={canonicalPath(href)}
        className={cn(
          "inline-flex text-[13px] transition-colors duration-[180ms] focus-visible:outline-none",
          dark
            ? "text-[#F4F2ED]/60 hover:text-[#F4F2ED] focus-visible:text-[#F4F2ED]"
            : "text-muted-foreground hover:text-foreground focus-visible:text-foreground",
        )}
      >
        {label} →
      </Link>
    </div>
  );
}

function MobileAccordion({
  id,
  label,
  href,
  open,
  onToggle,
  onNavigate,
  children,
}: {
  id: string;
  label: string;
  href: string;
  open: boolean;
  onToggle: () => void;
  onNavigate: () => void;
  children: ReactNode;
}) {
  return (
    <div>
      <div className="flex items-center">
        <Link
          href={canonicalPath(href)}
          className="min-w-0 flex-1 rounded-[9px] px-[10px] py-3 text-sm text-muted-foreground"
          onClick={onNavigate}
        >
          {label}
        </Link>
        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center text-muted-foreground"
          aria-expanded={open}
          aria-controls={id}
          aria-label={`${open ? "Collapse" : "Expand"} ${label}`}
          onClick={onToggle}
        >
          <ChevronDown
            size={16}
            className={cn(
              "transition-transform duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
              open && "rotate-180",
            )}
          />
        </button>
      </div>
      {open ? (
        <div id={id} className="flex flex-col pb-2 pl-2">
          {children}
        </div>
      ) : null}
    </div>
  );
}
