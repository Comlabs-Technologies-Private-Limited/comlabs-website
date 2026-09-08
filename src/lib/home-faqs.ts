export type HomeFaq = {
  question: string;
  answer: string;
};

/**
 * Questions that come up in most first conversations. Kept descriptive —
 * these describe how Comlabs works, not contractual commitments.
 */
export const HOME_FAQS: readonly HomeFaq[] = [
  {
    question: "What does L1–L4 application support actually cover?",
    answer:
      "It spans the full escalation path. L1 handles first-line service requests and triage, L2 takes technical investigation, L3 moves into engineering and code-level fixes, and L4 brings in specialist engineering for the problems that need deep system knowledge. The same team owns the issue from first report to resolution, so nothing is handed to a queue and forgotten.",
  },
  {
    question: "Do you work with existing systems, or only new builds?",
    answer:
      "Both. A large part of our work is taking responsibility for software that already exists — inherited codebases, live production systems and infrastructure someone else set up. We start by mapping the system and its operating constraints before changing anything.",
  },
  {
    question: "Can you take over an application another team built?",
    answer:
      "Yes. We begin with an assessment of the codebase, infrastructure and current failure modes, then agree what needs stabilising first. Handover work usually starts with support and observability, so the system is understood and monitored before larger changes are made.",
  },
  {
    question: "How does an engagement usually start?",
    answer:
      "With an assessment. We map the system, the operating constraints and the business outcome you need, then propose the engineering work that follows. That keeps the first phase small and concrete rather than committing you to a long programme before anyone understands the problem.",
  },
  {
    question: "Who owns the code and infrastructure you build?",
    answer:
      "You do. Code, infrastructure definitions, pipelines and documentation belong to your business and live in your accounts and repositories. We work so that your team, or another partner, can pick the system up without depending on us to operate it.",
  },
  {
    question: "How do you approach AI agents differently from a chatbot?",
    answer:
      "We build agents that operate rather than only respond — connected to real workflows, data and business systems through tool integrations and context infrastructure, with evaluations and guardrails around them. The engineering question is what the agent is allowed to do and how you verify it did the right thing.",
  },
] as const;
