"use client";

import {
  BarChart3,
  BookOpenText,
  BriefcaseBusiness,
  LogOut,
  Menu,
  PanelLeftClose,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { signOut } from "next-auth/react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Dashboard", href: "/admin/dashboard", icon: BarChart3 },
  { label: "Case Studies", href: "/admin/case-studies", icon: BriefcaseBusiness },
  { label: "Blog", href: "/admin/blog", icon: BookOpenText },
] as const;

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isLoginRoute = pathname === "/admin";

  if (isLoginRoute) {
    return <>{children}</>;
  }

  function handleLogout() {
    void signOut({ callbackUrl: "/admin" });
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex w-72 flex-col border-r border-border bg-card px-4 py-5 transition-transform lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="mb-8 flex items-center justify-between px-2">
          <Link
            href="/admin/dashboard"
            className="text-sm font-semibold tracking-tight"
            style={{ fontFamily: "var(--font-mono)", letterSpacing: "-0.01em" }}
            onClick={() => setSidebarOpen(false)}
          >
            comlabs crm
          </Link>
          <button
            type="button"
            className="rounded-full p-2 text-muted-foreground hover:bg-accent hover:text-foreground lg:hidden"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close sidebar"
          >
            <PanelLeftClose size={18} />
          </button>
        </div>

        <nav className="flex flex-1 flex-col gap-1.5">
          {navItems.map((item) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={cn(
                  "inline-flex h-11 items-center gap-3 rounded-full px-4 text-sm font-medium transition-colors",
                  active
                    ? "bg-foreground text-background"
                    : "text-muted-foreground hover:bg-accent hover:text-foreground",
                )}
              >
                <Icon size={17} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <button
          type="button"
          onClick={handleLogout}
          className="mt-6 inline-flex h-11 items-center gap-3 rounded-full border border-border px-4 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
        >
          <LogOut size={17} />
          Logout
        </button>
      </aside>

      {sidebarOpen ? (
        <button
          type="button"
          aria-label="Close sidebar overlay"
          className="fixed inset-0 z-30 bg-black/20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      ) : null}

      <div className="min-h-screen lg:pl-72">
        <header
          className="sticky top-0 z-20 border-b border-border"
          style={{ background: "rgba(247,247,244,0.88)", backdropFilter: "blur(12px)" }}
        >
          <div className="flex h-16 items-center justify-between px-5 lg:px-8">
            <button
              type="button"
              className="rounded-full border border-border bg-card p-2 text-foreground lg:hidden"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open sidebar"
            >
              <Menu size={18} />
            </button>
            <div className="hidden text-xs font-semibold tracking-widest text-muted-foreground uppercase lg:block">
              Comlabs Technologies Admin
            </div>
            <Button type="button" variant="ghost" onClick={handleLogout} className="gap-2">
              <LogOut size={14} />
              Logout
            </Button>
          </div>
        </header>

        <main className="px-5 py-8 lg:px-8">{children}</main>
      </div>
    </div>
  );
}

export function AdminLoading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-6">
      <div className="rounded-3xl border border-border bg-card px-5 py-4 text-sm text-muted-foreground shadow-[0_2px_24px_rgba(28,25,23,0.07)]">
        Loading admin workspace...
      </div>
    </div>
  );
}
