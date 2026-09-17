"use client";

import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import type { FormEvent } from "react";
import { useState } from "react";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { canonicalPath } from "@/lib/site";
import { cn } from "@/lib/utils";

type FormState = "idle" | "submitting" | "error";

export function CareersForm({ className }: { className?: string }) {
  const router = useRouter();
  const [formState, setFormState] = useState<FormState>("idle");
  const [formMessage, setFormMessage] = useState("");

  async function submitApplication(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    setFormState("submitting");
    setFormMessage("");

    try {
      const response = await fetch("/api/careers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          role: formData.get("role"),
          portfolio: formData.get("portfolio"),
          message: formData.get("message"),
          company: formData.get("company"),
        }),
      });

      const data = (await response.json()) as { error?: string };

      if (!response.ok) {
        throw new Error(data.error ?? "Could not send your application.");
      }

      form.reset();
      router.push(canonicalPath("/thankyou?from=careers"));
    } catch (error) {
      setFormState("error");
      setFormMessage(
        error instanceof Error
          ? error.message
          : "Could not send your application. Please try again.",
      );
    }
  }

  return (
    <form className={cn("flex flex-col gap-5", className)} onSubmit={submitApplication}>
      <div>
        <label htmlFor="careers-name" className="mb-2 block text-xs font-medium text-muted-foreground">
          Name
        </label>
        <Input
          id="careers-name"
          name="name"
          placeholder="Your name"
          autoComplete="name"
          required
          maxLength={120}
          className="rounded-xl border border-border bg-card shadow-none ring-0 focus:ring-2 focus:ring-foreground/10"
        />
      </div>

      <div>
        <label htmlFor="careers-email" className="mb-2 block text-xs font-medium text-muted-foreground">
          Email
        </label>
        <Input
          id="careers-email"
          name="email"
          type="email"
          placeholder="you@email.com"
          autoComplete="email"
          required
          maxLength={160}
          className="rounded-xl border border-border bg-card shadow-none ring-0 focus:ring-2 focus:ring-foreground/10"
        />
      </div>

      <div>
        <label htmlFor="careers-role" className="mb-2 block text-xs font-medium text-muted-foreground">
          Role
        </label>
        <Input
          id="careers-role"
          name="role"
          placeholder="Design, engineering, marketing…"
          autoComplete="organization-title"
          required
          maxLength={120}
          className="rounded-xl border border-border bg-card shadow-none ring-0 focus:ring-2 focus:ring-foreground/10"
        />
      </div>

      <div>
        <label
          htmlFor="careers-portfolio"
          className="mb-2 block text-xs font-medium text-muted-foreground"
        >
          Portfolio or LinkedIn
        </label>
        <Input
          id="careers-portfolio"
          name="portfolio"
          type="url"
          placeholder="https://"
          autoComplete="url"
          maxLength={300}
          className="rounded-xl border border-border bg-card shadow-none ring-0 focus:ring-2 focus:ring-foreground/10"
        />
      </div>

      <Input
        name="company"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      <div>
        <label
          htmlFor="careers-message"
          className="mb-2 block text-xs font-medium text-muted-foreground"
        >
          A short note
        </label>
        <Textarea
          id="careers-message"
          name="message"
          placeholder="What you want to work on, and a little about how you work."
          rows={6}
          required
          minLength={20}
          maxLength={4000}
          className="rounded-xl border border-border bg-card shadow-none ring-0 focus:ring-2 focus:ring-foreground/10"
        />
      </div>

      <button
        type="submit"
        disabled={formState === "submitting"}
        className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold text-background transition-opacity hover:opacity-90 disabled:opacity-60"
        style={{ background: "var(--foreground)" }}
      >
        {formState === "submitting" ? "Sending..." : "Send application"}
        <ArrowRight size={14} />
      </button>

      {formMessage ? (
        <p className="text-sm text-red-600" role="status" aria-live="polite">
          {formMessage}
        </p>
      ) : null}
    </form>
  );
}
