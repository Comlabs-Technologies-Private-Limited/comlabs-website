"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type { ReactNode } from "react";
import { FileText, FolderKanban, LayoutDashboard, LogOut } from "lucide-react";

type AdminShellProps = {
  email: string;
  children: ReactNode;
};

const NAV_ITEMS = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/posts", label: "Blog posts", icon: FileText, exact: false },
  { href: "/admin/case-studies", label: "Case studies", icon: FolderKanban, exact: false },
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
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto flex min-h-screen max-w-[1440px]">
        <aside className="hidden w-64 shrink-0 flex-col border-r border-border bg-card px-4 py-8 md:flex">
          <div className="px-3">
            <p className="text-xs tracking-widest text-muted-foreground uppercase">Comlabs Admin</p>
            <p className="mt-2 text-sm font-medium tracking-tight">Content studio</p>
          </div>

          <nav className="mt-8 space-y-1">
            {NAV_ITEMS.map((item) => {
              const active = item.exact ? pathname === item.href : pathname.startsWith(item.href);
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors ${
                    active
                      ? "bg-secondary text-foreground"
                      : "text-muted-foreground hover:bg-secondary/70 hover:text-foreground"
                  }`}
                >
                  <Icon size={16} aria-hidden="true" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="mt-auto border-t border-border pt-6">
            <p className="px-3 text-xs text-muted-foreground">{email}</p>
            <button
              type="button"
              onClick={handleLogout}
              className="mt-3 flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-secondary/70 hover:text-foreground"
            >
              <LogOut size={16} aria-hidden="true" />
              Sign out
            </button>
          </div>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="flex items-center justify-between border-b border-border px-6 py-4 md:hidden">
            <p className="text-sm font-medium">Comlabs Admin</p>
            <button
              type="button"
              onClick={handleLogout}
              className="text-sm text-muted-foreground"
            >
              Sign out
            </button>
          </header>
          <main className="flex-1 px-6 py-8 md:px-10 md:py-10">{children}</main>
        </div>
      </div>
    </div>
  );
}
