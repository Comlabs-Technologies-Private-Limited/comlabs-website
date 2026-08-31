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

/** Keyed by the homepage service card id in `canonical-services.ts`. */
export const serviceIllustrations: Record<string, ServiceIllustration> = {
  "application-support": {
    Component: ApplicationSupportIllustration,
    label:
      "Application support illustration: incident INC-2481 for a production Payments API failure, escalating from L1 triage through L3 engineering.",
  },
  "agentic-infrastructure": {
    Component: AgenticWorkflowIllustration,
    label:
      "Agentic infrastructure illustration: a guarded agent run moving from user request through context, tools, approval and action, with CRM, database, email and API tools.",
  },
  "website-design": {
    Component: WebsiteDesignIllustration,
    label:
      "Website design illustration: wireframe page blocks resolving into a finished, responsive Comlabs website inside a browser, with a mobile preview and a ready-for-review status.",
    },
  "custom-software": {
    Component: CustomSoftwareIllustration,
    label:
      "Custom software illustration: Atlas, an operations product with a request queue, workspace table and provisioning rail as Acme moves from a Slack request to a live Salesforce and Outlook workspace.",
  },
  "mobile-app": {
    Component: MobileAppIllustration,
    label:
      "Mobile app illustration: a SaaS inbox where a seat request is reviewed, approved, and confirmed across a list and detail view.",
  },
  "seo-aeo": {
    Component: SeoAeoIllustration,
    label:
      "SEO and AEO illustration: structured Comlabs content being indexed, then appearing as a search result and as a cited source inside an AI answer.",
  },
  "cloud-infrastructure": {
    Component: CloudScalingIllustration,
    label:
      "Cloud infrastructure illustration: AWS CloudFront, Application Load Balancer and EC2 instances scaling under traffic in ap-south-1, with RDS Aurora and an operations strip for production, API, database, last deploy, backups and p95 latency.",
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
    "Applied AI illustration: a renewal copilot moving from request through context, tools and approval, then logging the approved reply.",
};

export { ServiceIllustrationFrame } from "./service-illustration-frame";
