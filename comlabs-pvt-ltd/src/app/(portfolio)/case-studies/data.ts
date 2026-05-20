export type CaseStudy = {
  slug: string;
  company: string;
  industry: string;
  size: string;
  useCase: string;
  keyResult: string;
  challenge: string;
  solution: string;
  results: string;
  quote: string;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "fintech-risk-automation",
    company: "NorthBridge Capital",
    industry: "FinTech",
    size: "450 employees",
    useCase: "Risk review automation with AI agents",
    keyResult: "90% reduction in review processing time",
    challenge:
      "Manual analyst workflows delayed underwriting decisions and increased operational overhead.",
    solution:
      "Comlabs deployed an agentic review layer that orchestrated document parsing, policy checks, and analyst escalation with full auditability.",
    results:
      "Processing throughput increased by 40% and SLA compliance improved from 72% to 98% in 60 days.",
    quote:
      "Comlabs turned a high-friction operation into a system our team trusts daily.",
  },
  {
    slug: "healthtech-saas-modernization",
    company: "Careline Cloud",
    industry: "HealthTech",
    size: "120 employees",
    useCase: "Legacy platform to multi-tenant SaaS migration",
    keyResult: "35% faster release cycle",
    challenge:
      "A legacy architecture blocked product expansion and created reliability concerns for enterprise clients.",
    solution:
      "Comlabs rebuilt the platform into modular services with improved tenant isolation, CI/CD controls, and observability.",
    results:
      "Enterprise onboarding time dropped by 55% and monthly active usage grew 28% post-migration.",
    quote:
      "We now ship with confidence and finally have architecture that supports our roadmap.",
  },
];

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return caseStudies.find((item) => item.slug === slug);
}
