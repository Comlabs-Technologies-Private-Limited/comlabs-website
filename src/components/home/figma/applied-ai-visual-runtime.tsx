"use client";

import { AppliedAiIllustration } from "@/components/services/illustrations/applied-ai-illustration";
import { ServiceIllustrationFrame } from "@/components/services/illustrations/service-illustration-frame";

const APPLIED_AI_LABEL =
  "Applied AI illustration: signals from Slack, Outlook and Salesforce feeding a Claude agent that prepares a renewal quote, pauses for operator approval, then executes actions back to CRM and email.";

export function AppliedAiVisualRuntime() {
  return (
    <ServiceIllustrationFrame
      label={APPLIED_AI_LABEL}
      className="shadow-[0_28px_70px_-30px_rgba(0,0,0,0.65)] ring-1 ring-white/10"
    >
      <AppliedAiIllustration />
    </ServiceIllustrationFrame>
  );
}
