"use client";

import type { ComponentType } from "react";
import dynamic from "next/dynamic";

const WebsiteDesignIllustration = dynamic(() =>
  import("./website-design-illustration").then((mod) => mod.WebsiteDesignIllustration),
);
const CustomSoftwareIllustration = dynamic(() =>
  import("./custom-software-illustration").then((mod) => mod.CustomSoftwareIllustration),
);
const MobileAppIllustration = dynamic(() =>
  import("./mobile-app-illustration").then((mod) => mod.MobileAppIllustration),
);
const SeoAeoIllustration = dynamic(() =>
  import("./seo-aeo-illustration").then((mod) => mod.SeoAeoIllustration),
);
const CloudScalingIllustration = dynamic(() =>
  import("./cloud-scaling-illustration").then((mod) => mod.CloudScalingIllustration),
);

export const lazyServiceVisuals: Record<
  string,
  { Component: ComponentType; label: string }
> = {
  "website-design": {
    Component: WebsiteDesignIllustration,
    label:
      "Website design illustration: wireframe page blocks resolving into a finished, responsive Comlabs website inside a browser, with a mobile preview and a ready-for-review status.",
  },
  "custom-software": {
    Component: CustomSoftwareIllustration,
    label:
      "Custom software illustration: a customer onboarding workflow moving from a Slack request through Claude review and Comlabs build to a live Salesforce and Outlook deployment across connected enterprise systems.",
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
      "Cloud infrastructure illustration: AWS CloudFront, Application Load Balancer and EC2 instances scaling under traffic in ap-south-1, with RDS Aurora and CloudWatch metrics confirming target group health.",
  },
};
