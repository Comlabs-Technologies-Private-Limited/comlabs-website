"use client";

import { LockKeyhole } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAdminStore } from "./admin-store";

const ADMIN_EMAIL = "admin@comlabstechnologies.com";

export function AdminLoginPage() {
  const router = useRouter();
  const { hydrated, isAuthenticated, login } = useAdminStore();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (hydrated && isAuthenticated) {
      router.replace("/admin/dashboard");
    }
  }, [hydrated, isAuthenticated, router]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (!login(password)) {
      setError("Incorrect password. Please try again.");
      return;
    }

    router.replace("/admin/dashboard");
  }

  return (
    <main
      className="flex min-h-screen items-center justify-center px-6 py-12"
      style={{
        backgroundImage:
          "linear-gradient(180deg, rgba(247,247,244,0.92) 0%, rgba(247,247,244,0.82) 100%), url('/hero/hero-bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center right",
      }}
    >
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-3xl border border-border bg-card/95 p-6 shadow-[0_2px_24px_rgba(28,25,23,0.10)] backdrop-blur md:p-8"
      >
        <div className="mb-8">
          <div
            className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-full"
            style={{ background: "var(--warm-orange-light)", color: "var(--warm-orange)" }}
          >
            <LockKeyhole size={19} />
          </div>
          <p className="mb-3 text-xs font-semibold tracking-widest text-muted-foreground uppercase">
            Protected CRM
          </p>
          <h1
            className="text-2xl font-bold tracking-tight md:text-3xl"
            style={{ letterSpacing: "-0.03em" }}
          >
            Sign in to Comlabs admin.
          </h1>
        </div>

        <div className="space-y-4">
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-muted-foreground">Email</span>
            <Input value={ADMIN_EMAIL} readOnly aria-readonly className="bg-muted text-muted-foreground" />
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-medium text-muted-foreground">Password</span>
            <Input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Enter password"
              autoFocus
            />
          </label>

          {error ? <p className="text-sm text-destructive">{error}</p> : null}

          <Button type="submit" className="h-11 w-full">
            Sign in
          </Button>
        </div>
      </form>
    </main>
  );
}
