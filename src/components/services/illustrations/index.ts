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
      "Application support illustration: incident INC-2481 for a production Payments API failure, escalating from L1 triage through L4 with a resolved finish.",
  },
  "agentic-infrastructure": {
    Component: AgenticWorkflowIllustration,
    label:
      "Agentic infrastructure illustration: a Gmail trigger routes through a copilot that calls Claude, Notion, Salesforce, Drive, and Stripe, then prepares a packet in Sheets and posts to Slack for approval.",
  },
  "website-design": {
    Component: WebsiteDesignIllustration,
    label:
      "Website design illustration: stacked live previews of Radiant, Formial Labs and Global Services, Comlabs-built digital experiences.",
    },
  "custom-software": {
    Component: CustomSoftwareIllustration,
    label:
      "Custom software illustration: Atlas receiving an Acme workspace request and provisioning CRM, seats and calendar until the workspace is ready.",
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
      "Cloud infrastructure illustration: live production traffic moving CloudFront to ALB, ECS and RDS in ap-south-1 until the deploy is healthy.",
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
