"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronDown, Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import type { ReactNode } from "react";

import { ComlabsLogo } from "@/components/brand/comlabs-logo";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { cn } from "@/lib/utils";
import { canonicalPath, isBlogPublic } from "@/lib/site";

const SIMPLE_LINKS = [
  { label: "About", href: "/about" },
] as const;

export type NavCaseStudyItem = {
  title: string;
  description: string;
  href: string;
};

type MegaLink = {
  title: string;
  href: string;
};

type MegaColumn = {
  label: string;
  links: readonly MegaLink[];
};

const SERVICE_MEGA_COLUMNS: readonly MegaColumn[] = [
  {
    label: "Operate",
    links: [
      { title: "Application Support", href: "/services/application-support" },
      { title: "AWS Cloud & DevOps", href: "/services/cloud-infrastructure-scaling" },
    ],
  },
  {
    label: "Build",
    links: [
      { title: "AI Agents", href: "/services/ai-agent-development" },
      { title: "Custom Software", href: "/services/custom-software-development" },
      { title: "Mobile Engineering", href: "/services/mobile-app-development" },
    ],
  },
  {
    label: "Experience",
    links: [
      { title: "Web & Digital Experience", href: "/services/website-design-development" },
    ],
  },
] as const;

const SERVICE_FLAT_LINKS = SERVICE_MEGA_COLUMNS.flatMap((column) => column.links);

const FALLBACK_CASE_STUDIES: NavCaseStudyItem[] = [
  {
    title: "Formial Labs",
    description: "Custom Software Engineering",
    href: "/case-studies/formial-labs",
  },
  {
    title: "Global Services",
    description: "Web & Digital Experience",
    href: "/case-studies/global-services",
  },
  {
    title: "Vithub",
    description: "Web & Digital Experience",
    href: "/case-studies/vithub",
  },
];

type DesktopMenu = "services" | "work" | null;
type MobileAccordion = "services" | "work" | null;

const CLOSE_DELAY_MS = 120;
const DROPDOWN_EASE = [0.22, 1, 0.36, 1] as const;

function navLinkClass(dark: boolean) {
  return cn(
    "inline-flex items-center gap-1 rounded-full px-3 py-[7px] text-sm",
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
  caseStudies?: NavCaseStudyItem[];
};

export function FigmaNav({
  showBlogLink = true,
  tone = "light",
  caseStudies,
}: FigmaNavProps) {
  const dark = tone === "dark";
  const [menuOpen, setMenuOpen] = useState(false);
  const [desktopMenu, setDesktopMenu] = useState<DesktopMenu>(null);
  const [mobileAccordion, setMobileAccordion] = useState<MobileAccordion>(null);
  const closeTimer = useRef<number | null>(null);
  const headerRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const servicesPanelId = useId();
  const workPanelId = useId();
  const workItems =
    caseStudies && caseStudies.length > 0 ? caseStudies : FALLBACK_CASE_STUDIES;

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

  useEffect(() => {
    if (!desktopMenu) return;

    function onPointerDown(event: PointerEvent) {
      if (headerRef.current?.contains(event.target as Node)) return;
      closeDesktop();
    }

    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [desktopMenu]);

  function closeMobile() {
    setMenuOpen(false);
    setMobileAccordion(null);
  }

  return (
    <>
      <header
        ref={headerRef}
        className="sticky top-0 z-[80]"
        style={{
          background: dark ? "rgba(20,20,20,0.88)" : "rgba(247,247,244,0.88)",
          backdropFilter: "blur(12px)",
        }}
        onMouseLeave={scheduleClose}
      >
        <div className="relative mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
          <Link href="/" aria-label="Comlabs home">
            <ComlabsLogo
              decorative
              className={cn("h-5 w-auto", dark && "brightness-0 invert")}
            />
          </Link>

          <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
            <MegaMenuTrigger
              label="Services"
              href="/services"
              open={desktopMenu === "services"}
              dark={dark}
              panelId={servicesPanelId}
              onOpen={() => openDesktop("services")}
              onScheduleClose={scheduleClose}
            />

            <MegaMenuTrigger
              label="Case Studies"
              href="/case-studies"
              open={desktopMenu === "work"}
              dark={dark}
              panelId={workPanelId}
              onOpen={() => openDesktop("work")}
              onScheduleClose={scheduleClose}
            />

            {[...SIMPLE_LINKS, ...blogLinks, { label: "Contact", href: "/contact" }].map((link) => (
              <Link
                key={link.label}
                href={canonicalPath(link.href)}
                className={navLinkClass(dark)}
                onMouseEnter={scheduleClose}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <ThemeToggle dark={dark} onMouseEnter={scheduleClose} />
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
              onMouseEnter={scheduleClose}
            >
              Get Started
            </Link>
          </div>

          <div className="flex items-center gap-1 md:hidden">
            <ThemeToggle dark={dark} />
            <button
              type="button"
              className={cn(
                "-mr-2 flex h-11 w-11 items-center justify-center",
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
        </div>

        <AnimatePresence>
          {desktopMenu ? (
            <motion.div
              key={desktopMenu}
              id={desktopMenu === "services" ? servicesPanelId : workPanelId}
              role="navigation"
              aria-label={desktopMenu === "services" ? "Services" : "Case Studies"}
              className="absolute inset-x-0 top-full hidden origin-top md:block"
              initial={reduce ? false : { opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={
                reduce
                  ? { opacity: 0 }
                  : {
                      opacity: 0,
                      y: -4,
                      transition: { duration: 0.14, ease: DROPDOWN_EASE },
                    }
              }
              transition={{
                duration: reduce ? 0 : 0.2,
                ease: DROPDOWN_EASE,
              }}
              onMouseEnter={cancelClose}
              style={{
                background: dark ? "#141414" : "#F7F7F4",
                borderBottom: dark
                  ? "1px solid rgba(244,242,237,0.10)"
                  : "1px solid rgba(0,0,0,0.06)",
                boxShadow: dark
                  ? "0 18px 40px rgba(0,0,0,0.35)"
                  : "0 18px 40px rgba(0,0,0,0.06)",
              }}
            >
              <div className="mx-auto max-w-6xl px-6 py-8">
                {desktopMenu === "services" ? (
                  <>
                    <div className="grid grid-cols-3 gap-x-16 gap-y-2">
                      {SERVICE_MEGA_COLUMNS.map((column) => (
                        <MegaMenuColumn key={column.label} label={column.label} dark={dark}>
                          {column.links.map((link) => (
                            <MegaMenuLink
                              key={link.href}
                              href={link.href}
                              title={link.title}
                              dark={dark}
                            />
                          ))}
                        </MegaMenuColumn>
                      ))}
                    </div>
                    <DropdownFooter href="/services" label="View all services" dark={dark} />
                  </>
                ) : (
                  <>
                    <div className="grid grid-cols-2 gap-x-16 gap-y-2 md:grid-cols-3">
                      <MegaMenuColumn label="Recent" dark={dark}>
                        {workItems.map((item) => (
                          <MegaMenuLink
                            key={item.href}
                            href={item.href}
                            title={item.title}
                            dark={dark}
                          />
                        ))}
                      </MegaMenuColumn>
                      <MegaMenuColumn label="Explore" dark={dark}>
                        <MegaMenuLink
                          href="/case-studies"
                          title="All case studies"
                          dark={dark}
                        />
                      </MegaMenuColumn>
                    </div>
                    <DropdownFooter
                      href="/case-studies"
                      label="View all case studies"
                      dark={dark}
                    />
                  </>
                )}
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
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
              <div className="flex items-center gap-1">
                <ThemeToggle dark={dark} />
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
                {SERVICE_FLAT_LINKS.map((item) => (
                  <Link
                    key={item.href}
                    href={canonicalPath(item.href)}
                    className="block rounded-[10px] px-3 py-3 text-sm text-foreground"
                    onClick={closeMobile}
                  >
                    {item.title}
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
                label="Case Studies"
                href="/case-studies"
                open={mobileAccordion === "work"}
                onToggle={() =>
                  setMobileAccordion((current) =>
                    current === "work" ? null : "work",
                  )
                }
                onNavigate={closeMobile}
              >
                {workItems.map((item) => (
                  <Link
                    key={item.href}
                    href={canonicalPath(item.href)}
                    className="block rounded-[10px] px-3 py-3 text-sm text-foreground"
                    onClick={closeMobile}
                  >
                    {item.title}
                  </Link>
                ))}
                <Link
                  href={canonicalPath("/case-studies")}
                  className="block px-3 py-3 text-sm text-muted-foreground"
                  onClick={closeMobile}
                >
                  View all case studies →
                </Link>
              </MobileAccordion>

              {[...SIMPLE_LINKS, ...blogLinks, { label: "Contact", href: "/contact" }].map((link) => (
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

function MegaMenuTrigger({
  label,
  href,
  open,
  dark,
  panelId,
  onOpen,
  onScheduleClose,
}: {
  label: string;
  href: string;
  open: boolean;
  dark: boolean;
  panelId: string;
  onOpen: () => void;
  onScheduleClose: () => void;
}) {
  return (
    <Link
      href={canonicalPath(href)}
      className={cn(
        navLinkClass(dark),
        open && (dark ? "bg-white/[0.08] text-[#F4F2ED]" : "bg-black/[0.045] text-foreground"),
      )}
      aria-expanded={open}
      aria-haspopup="true"
      aria-controls={panelId}
      onMouseEnter={onOpen}
      onFocus={onOpen}
      onBlur={onScheduleClose}
    >
      {label}
      <ChevronDown
        size={14}
        aria-hidden
        className={cn(
          "transition-transform duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
          open && "rotate-180",
        )}
      />
    </Link>
  );
}

function MegaMenuColumn({
  label,
  dark,
  children,
}: {
  label: string;
  dark?: boolean;
  children: ReactNode;
}) {
  return (
    <div className="min-w-0">
      <p
        className={cn(
          "mb-4 text-[12px] font-medium tracking-tight",
          dark ? "text-[#F4F2ED]/45" : "text-muted-foreground",
        )}
      >
        {label}
      </p>
      <ul className="flex flex-col gap-3">{children}</ul>
    </div>
  );
}

function MegaMenuLink({
  href,
  title,
  dark,
}: {
  href: string;
  title: string;
  dark?: boolean;
}) {
  return (
    <li>
      <Link
        href={canonicalPath(href)}
        className={cn(
          "block rounded-md px-1 py-0.5 text-[15px] font-medium tracking-tight",
          "transition-colors duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
          "focus-visible:outline-none",
          dark
            ? "text-[#F4F2ED] hover:text-[#F4F2ED]/80 focus-visible:text-[#F4F2ED]/80"
            : "text-foreground hover:text-foreground/70 focus-visible:text-foreground/70",
        )}
      >
        {title}
      </Link>
    </li>
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
      className="mt-6 pt-5"
      style={{ borderTop: dark ? "1px solid rgba(244,242,237,0.10)" : "1px solid rgba(0,0,0,0.05)" }}
    >
      <Link
        href={canonicalPath(href)}
        className={cn(
          "inline-flex text-[13px] transition-colors duration-[180ms] focus-visible:outline-none",
          dark
            ? "text-[#F4F2ED]/55 hover:text-[#F4F2ED] focus-visible:text-[#F4F2ED]"
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
