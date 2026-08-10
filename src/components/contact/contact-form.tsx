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

export function ContactForm({ className }: { className?: string }) {
  const router = useRouter();
  const [formState, setFormState] = useState<FormState>("idle");
  const [formMessage, setFormMessage] = useState("");

  async function submitRequirement(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    setFormState("submitting");
    setFormMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          message: formData.get("message"),
          company: formData.get("company"),
        }),
      });

      const data = (await response.json()) as { error?: string };

      if (!response.ok) {
        throw new Error(data.error ?? "Could not send your message.");
      }

      form.reset();
      router.push(canonicalPath("/thankyou"));
    } catch (error) {
      setFormState("error");
      setFormMessage(
        error instanceof Error ? error.message : "Could not send your message. Please try again.",
      );
    }
  }

  return (
    <form className={cn("flex flex-col gap-5", className)} onSubmit={submitRequirement}>
      <div>
        <label htmlFor="contact-name" className="mb-2 block text-xs font-medium text-muted-foreground">
          Name
        </label>
        <Input
          id="contact-name"
          name="name"
          placeholder="Your name"
          autoComplete="name"
          required
          maxLength={120}
          className="rounded-xl border border-border bg-card shadow-none ring-0 focus:ring-2 focus:ring-foreground/10"
        />
      </div>

      <div>
        <label htmlFor="contact-email" className="mb-2 block text-xs font-medium text-muted-foreground">
          Email
        </label>
        <Input
          id="contact-email"
          name="email"
          type="email"
          placeholder="you@company.com"
          autoComplete="email"
          required
          maxLength={160}
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
        <label htmlFor="contact-message" className="mb-2 block text-xs font-medium text-muted-foreground">
          Project details
        </label>
        <Textarea
          id="contact-message"
          name="message"
          placeholder="What are you building? Timeline, goals, anything useful."
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
        {formState === "submitting" ? "Sending..." : "Send message"}
        <ArrowRight size={14} />
      </button>

      {formMessage ? (
        <p className="text-sm text-red-600" role="status" aria-live="polite">
          {formMessage}
        </p>
      ) : null}

      {/* <p className="text-xs text-muted-foreground">Response within 24–48 hours.</p> */}
    </form>
  );
}
