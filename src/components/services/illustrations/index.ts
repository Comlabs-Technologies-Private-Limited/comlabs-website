import type { ComponentType } from "react";

import { AppliedAiIllustration } from "./applied-ai-illustration";
import { AgenticWorkflowIllustration } from "./agentic-workflow-illustration";
import { ApplicationSupportIllustration } from "./application-support-illustration";
import { CloudScalingIllustration } from "./cloud-scaling-illustration";
import { CustomCraftIllustration } from "./custom-craft-illustration";
import { CustomSoftwareIllustration } from "./custom-software-illustration";
import { MobileAppIllustration } from "./mobile-app-illustration";
import { SeoAeoIllustration } from "./seo-aeo-illustration";
import { WebsiteDesignIllustration } from "./website-design-illustration";

export type ServiceIllustration = {
  Component: ComponentType;
  /** Accessible description of what the illustration demonstrates. */
  label: string;
};

/** Keyed by the homepage service card id in `home-services.ts`. */
export const serviceIllustrations: Record<string, ServiceIllustration> = {
  "application-support": {
    Component: ApplicationSupportIllustration,
    label:
      "Application support illustration: Live incident command centre for INC-2481 Payments API, escalating L1 through L4 with a diagnostic strip showing 5xx recovery and deployment verification.",
  },
  "agentic-infrastructure": {
    Component: AgenticWorkflowIllustration,
    label:
      "Agentic infrastructure illustration: a Gmail trigger routes through a copilot that calls Claude, Notion, Salesforce, Drive, and Stripe, then prepares a packet in Sheets and posts to Slack for approval.",
  },
  "website-design": {
    Component: WebsiteDesignIllustration,
    label:
      "Website design illustration: a Figma-like design tool with Agency v2.2 pages on a canvas of mobile, user, and board frames, and a cursor moving slowly between them.",
    },
  "custom-software": {
    Component: CustomSoftwareIllustration,
    label:
      "Custom software illustration: Atlas Ops onboarding Helio Growth through workspace provisioning, CRM, admin seats and kickoff until the workspace is ready.",
  },
  "mobile-app": {
    Component: MobileAppIllustration,
    label:
      "Mobile app illustration: an operations iPhone app where a production deploy completes, the Dynamic Island updates, and a health sheet appears.",
  },
  "seo-aeo": {
    Component: SeoAeoIllustration,
    label:
      "SEO and AEO illustration: structured Comlabs content being indexed, then appearing as a search result and as a cited source inside an AI answer.",
  },
  "cloud-infrastructure": {
    Component: CloudScalingIllustration,
    label:
      "Cloud infrastructure illustration: production control plane in ap-south-1 with CloudFront, load balancer, autoscaling ECS and RDS, plus a zero-downtime deploy event and live ops metrics.",
  },
};

/** Homepage "Our specialty" section — custom code held to explicit quality gates. */
export const customCraftIllustration: ServiceIllustration = {
  Component: CustomCraftIllustration,
  label:
    "Custom development illustration: a TypeScript incident escalation function being written beside gates for typed runbooks, observability and an L3 path.",
};

export const appliedAiIllustration: ServiceIllustration = {
  Component: AppliedAiIllustration,
  label:
    "Applied AI illustration: Renewal Copilot gathering contract context, drafting a Q3 reply, then logging the approved message to CRM.",
};

export { ServiceIllustrationFrame } from "./service-illustration-frame";
