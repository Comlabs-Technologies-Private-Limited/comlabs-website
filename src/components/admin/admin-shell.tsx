"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

import { FigmaFooter } from "@/components/layout/figma-footer";
import { FigmaNav } from "@/components/layout/figma-nav";
import { canonicalPath } from "@/lib/site";

type AdminShellProps = {
  email: string;
  children: React.ReactNode;
};

const NAV_ITEMS = [
  { href: "/admin", label: "Dashboard", exact: true },
  { href: "/admin/posts", label: "Blog posts", exact: false },
  { href: "/admin/case-studies", label: "Case studies", exact: false },
] as const;

export function AdminShell({ email, children }: AdminShellProps) {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/admin/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <div
      className="min-h-screen bg-background text-foreground antialiased"
      style={{ fontFamily: "var(--font-sans)" }}
    >
      <FigmaNav showBlogLink={false} />

      <div className="border-b border-border bg-card">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className="inline-flex items-center gap-2 rounded-full border border-border px-3.5 py-1.5 text-xs font-medium"
              style={{ color: "var(--warm-orange)", background: "var(--warm-orange-light)" }}
            >
              <span
                className="inline-block h-1.5 w-1.5 rounded-full"
                style={{ background: "var(--warm-orange)" }}
              />
              Admin
            </span>
            <nav aria-label="Admin" className="flex flex-wrap items-center gap-1">
              {NAV_ITEMS.map((item) => {
                const active = item.exact
                  ? pathname === item.href || pathname === `${item.href}/`
                  : pathname.startsWith(item.href);
                return (
                  <Link
                    key={item.href}
                    href={canonicalPath(item.href)}
                    className={`rounded-full px-4 py-2 text-sm transition-colors ${
                      active
                        ? "bg-secondary text-foreground"
                        : "text-muted-foreground hover:bg-secondary/70 hover:text-foreground"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <span className="hidden text-xs text-muted-foreground sm:inline">{email}</span>
            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-sm text-muted-foreground transition-colors hover:border-foreground/20 hover:text-foreground"
            >
              <LogOut size={14} aria-hidden="true" />
              Sign out
            </button>
          </div>
        </div>
      </div>

      <main className="mx-auto max-w-6xl px-6 py-12 md:py-16">{children}</main>

      <FigmaFooter showBlogLink={false} />
    </div>
  );
}
