import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { AdminLoginForm } from "@/components/admin/admin-login-form";
import { getAdminSession } from "@/lib/admin/session";
import { isAdminConfigured } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Admin sign in",
  robots: { index: false, follow: false },
};

export default async function AdminLoginPage() {
  const session = await getAdminSession();
  if (session) {
    redirect("/admin");
  }

  const configured = isAdminConfigured();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-6 py-16">
      <div className="w-full max-w-md rounded-3xl border border-border bg-card p-8 md:p-10">
        <p className="text-xs tracking-widest text-muted-foreground uppercase">Comlabs Admin</p>
        <h1
          className="mt-3 text-2xl font-medium tracking-tight md:text-3xl"
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
    </div>
  );
}
