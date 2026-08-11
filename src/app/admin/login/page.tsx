import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { AdminLoginForm } from "@/components/admin/admin-login-form";
import { FigmaFooter } from "@/components/layout/figma-footer";
import { FigmaNav } from "@/components/layout/figma-nav";
import { getAdminSession } from "@/lib/admin/session";
import { isAdminConfigured } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Admin sign in",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminLoginPage() {
  const session = await getAdminSession();
  if (session) {
    redirect("/admin");
  }

  const configured = isAdminConfigured();

  return (
    <div
      className="min-h-screen bg-background text-foreground antialiased"
      style={{ fontFamily: "var(--font-sans)" }}
    >
      <FigmaNav showBlogLink={false} />

      <main className="flex items-center justify-center px-6 py-16 md:py-24">
        <div className="w-full max-w-md rounded-3xl border border-border bg-card p-8 md:p-10">
          <p className="mb-4 text-xs font-semibold tracking-widest text-muted-foreground uppercase">
            Admin
          </p>
          <h1
            className="text-2xl font-bold tracking-tight md:text-3xl"
            style={{ letterSpacing: "-0.03em" }}
          >
            Sign in to manage content
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Manage blog posts and case studies from one place.
          </p>

          {!configured ? (
            <div className="mt-8 rounded-2xl border border-border bg-background p-4 text-sm leading-relaxed text-muted-foreground">
              Admin auth is not configured yet. Set{" "}
              <code className="text-foreground">ADMIN_EMAIL</code>,{" "}
              <code className="text-foreground">ADMIN_PASSWORD_HASH</code>, and{" "}
              <code className="text-foreground">JWT_SECRET</code> in your environment.
            </div>
          ) : (
            <div className="mt-8">
              <AdminLoginForm />
            </div>
          )}
        </div>
      </main>

      <FigmaFooter showBlogLink={false} />
    </div>
  );
}
