import type { ComponentType } from "react";

import { AppliedAiIllustration } from "./applied-ai-illustration";
import { CloudScalingIllustration } from "./cloud-scaling-illustration";
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
  "website-design": {
    Component: WebsiteDesignIllustration,
    label:
      "Website design illustration: wireframe page blocks resolving into a finished, responsive Comlabs website inside a browser, with a mobile preview and a ready-for-review status.",
    },
  "custom-software": {
    Component: CustomSoftwareIllustration,
    label:
      "Custom software illustration: a purchase order moving through a request, validate, process, approve and complete workflow, alongside rule configuration and a deployment that goes live.",
  },
  "mobile-app": {
    Component: MobileAppIllustration,
    label:
      "Mobile app illustration: a field operations app where a technician updates a job status from a bottom sheet, confirms it, and the record syncs.",
  },
  "seo-aeo": {
    Component: SeoAeoIllustration,
    label:
      "SEO and AEO illustration: structured Comlabs content being indexed, then appearing as a search result and as a cited source inside an AI answer.",
  },
  "cloud-infrastructure": {
    Component: CloudScalingIllustration,
    label:
      "Cloud infrastructure illustration: rising request volume routed through an edge load balancer to application instances that scale out, with the database layer and health targets staying stable.",
  },
};

export const appliedAiIllustration: ServiceIllustration = {
  Component: AppliedAiIllustration,
  label:
    "Applied AI illustration: relevant business records feeding an AI-prepared renewal quote that pauses for human review, is approved by an operator, and is recorded to the activity log.",
};

export { ServiceIllustrationFrame } from "./service-illustration-frame";
