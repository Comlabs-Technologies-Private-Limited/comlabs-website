import type { CaseStudyContent } from "@/lib/case-studies";

const FORMIAL_BRAND =
  "https://formial.in/cdn/shop/files/Brand_Design-04_90b8501a-2715-48dc-934d-b45bba7f000b.png?v=1747823670&width=1200";

export const formialLabsCaseStudy: CaseStudyContent = {
  slug: "formial-labs",
  client: "Formial Labs",
  year: "2025",
  headline: "A clearer path from signup to the first useful moment.",
  standfirst:
    "We redesigned and developed Formial Labs' multi-step onboarding experience, creating a guided journey from account creation through setup and into the product.",
  meta: [
    { label: "Client", value: "Formial Labs" },
    { label: "Service", value: "Custom Software Development" },
    { label: "Scope", value: "Product UX · Frontend Development · Onboarding" },
    { label: "Year", value: "2025" },
    { label: "Website", value: "formial.in", href: "https://formial.in" },
  ],
  leadImage: {
    src: "/card-bg/product-ui-mockup.png",
    alt: "Formial Labs product interface showing a structured onboarding and dashboard preview flow",
    variant: "wide",
    caption:
      "The onboarding work focused on turning a capable product into a journey new users could actually complete.",
  },
  sections: [
    {
      number: "01",
      title: "The context",
      paragraphs: [
        "Formial Labs already had a capable product. The challenge was the path users had to take before they could experience its value.",
        "New users needed to move from account creation through multiple setup decisions before reaching the active dashboard. The product worked — but the first-run experience did not make that clear quickly enough.",
      ],
    },
    {
      number: "02",
      title: "The problem",
      paragraphs: [
        "Onboarding was fragmented. Users had to understand too much before they had enough product context. That created uncertainty before activation.",
        "The problem was not simply visual polish. It was sequencing: what information users saw, what action they were expected to take, and when complexity was introduced.",
      ],
      media: {
        src: "/card-bg/product-ui-mockup.png",
        alt: "Product interface with a preview panel and task checklist showing onboarding progression",
        caption:
          "The onboarding experience needed to introduce complexity progressively instead of exposing the entire setup at once.",
      },
    },
    {
      number: "03",
      title: "What we needed to solve",
      paragraphs: [
        "Instead of treating onboarding as a collection of forms, we treated it as one guided product journey.",
      ],
      principles: [
        { number: "01", text: "Make the next action obvious." },
        { number: "02", text: "Keep progress visible." },
        { number: "03", text: "Get users to meaningful product value quickly." },
      ],
    },
    {
      number: "04",
      title: "The approach",
      paragraphs: [
        "Each screen should ask the user to understand or complete one thing. We reduced cognitive load by ordering the flow around decisions that build on each other, rather than asking users to plan the entire setup upfront.",
        "Continuity mattered as much as clarity. Validation, progression and feedback needed to feel consistent from the first screen through to the active product state.",
      ],
      media: {
        src: "/card-bg/product-ui-mockup.png",
        alt: "Wide view of the product interface with preview, tasks, and feedback panels",
        variant: "wide",
        caption:
          "Each step was designed to carry one decision forward, with the full journey still visible in context.",
      },
    },
    {
      number: "05",
      title: "Designing the flow",
      subsections: [
        {
          title: "Account creation",
          paragraphs: [
            "The first screen needed to establish trust and set expectations without front-loading configuration. Users should understand what they were signing up for and what would happen next.",
          ],
          media: {
            src: FORMIAL_BRAND,
            alt: "Formial Labs brand mark",
            padded: true,
            caption: "The entry point needed to feel considered before users entered setup.",
          },
        },
        {
          title: "Progress and setup",
          paragraphs: [
            "Visible progress matters when a journey spans multiple pages. Users should always understand where they are, what remains, and why the current step exists.",
          ],
          media: {
            src: "/card-bg/product-ui-mockup.png",
            alt: "Task checklist and progress indicator within the product interface",
            caption:
              "Progress remains visible throughout setup so users always understand where they are in the journey.",
          },
        },
        {
          title: "First useful action",
          paragraphs: [
            "The final transition needed to feel like arrival, not completion of paperwork. The journey should land users in a state where the product's value is immediately within reach.",
          ],
          media: {
            src: "https://formial.in/cdn/shop/files/Website-03.png?height=628&pad_color=ffffff&v=1734611574&width=1200",
            alt: "Formial Labs digital presence showing the consumer-facing product experience",
            variant: "wide",
            caption:
              "The onboarding path connects account creation to an active product state users can begin using immediately.",
          },
        },
      ],
    },
    {
      number: "06",
      title: "Engineering the experience",
      paragraphs: [
        "The work extended beyond visual design. We implemented the complete frontend journey, connected the individual onboarding states and ensured that validation, progression and feedback remained consistent between screens.",
        "That meant building a multi-page onboarding flow end to end — UX, UI and front-end development — with each step doing one job in plain language and no dead ends between signup and activation.",
      ],
    },
    {
      number: "07",
      title: "The outcome",
      paragraphs: [
        "The final experience gives users a much clearer path from account creation to an active product state. Complexity is introduced progressively and each screen makes the next action clear.",
      ],
      transformation: {
        before: ["Fragmented setup", "Unclear progression", "Product value delayed"],
        after: ["Signup", "Guided setup", "First useful action"],
      },
      media: {
        src: "/card-bg/product-ui-mockup.png",
        alt: "Completed product interface showing preview approval and active project state",
        variant: "wide",
        caption:
          "The finished flow moves users from signup through setup into a product state that feels ready to use.",
      },
    },
    {
      number: "08",
      title: "What changed",
      paragraphs: [
        "The onboarding work changed how Formial Labs presents itself to new users — not through a single metric, but through a first run that finally matches the quality of the product underneath.",
      ],
      outcomes: [
        {
          title: "Clearer onboarding",
          description: "Users always understand what comes next.",
        },
        {
          title: "Reduced first-run friction",
          description: "Complexity is introduced progressively instead of all at once.",
        },
        {
          title: "Stronger first impression",
          description: "The product feels considered from the first interaction.",
        },
      ],
    },
  ],
};
