import type { CaseStudyContent } from "@/lib/case-studies";

export const formialLabsCaseStudy: CaseStudyContent = {
  slug: "formial-labs",
  client: "Formial Labs",
  year: "2025",
  headline: {
    before: "A ",
    highlight: "clearer",
    after: " path from signup to the first useful moment.",
  },
  standfirst:
    "We redesigned and developed Formial Labs' multi-step onboarding experience, creating a guided journey from account creation through setup and into the product.",
  ogImage: "/work/formial-labs/formial-case-study-hero.webp",
  meta: [
    { label: "Client", value: "Formial Labs" },
    { label: "Service", value: "Custom Software Development" },
    { label: "Scope", value: "Product UX · Frontend Development · Onboarding" },
    { label: "Year", value: "2025" },
    { label: "Website", value: "formial.in", href: "https://formial.in" },
  ],
  leadImage: {
    src: "/work/formial-labs/formial-case-study-hero.webp",
    alt: "Formial Labs onboarding welcome screen with a Get Started action beside a live feed of before-and-after results",
    variant: "wide",
    caption:
      "The first product screen greets the user by name and shows real outcomes before asking them to configure anything.",
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
        src: "/work/formial-labs/formial-marketing.webp",
        alt: "Formial Labs marketing homepage with the headline Skincare that's made for you and a consult call to action",
        caption:
          "The consumer site already promised a personalised path. The product had to deliver that promise from the first signed-in screen.",
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
        src: "/work/formial-labs/formial-onboarding.webp",
        alt: "Formial onboarding step with a three-stage progress rail and a verify-your-details form",
        variant: "wide",
        caption:
          "A persistent progress rail keeps the journey visible: verify details, upload pictures, then arrive in the product.",
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
            src: "/work/formial-labs/formial-case-study-hero.webp",
            alt: "Formial welcome state with Get Started and a scrolling results feed",
            caption: "Arrival is a welcome, not a form. Proof sits beside the first action.",
          },
        },
        {
          title: "Progress and setup",
          paragraphs: [
            "Visible progress matters when a journey spans multiple pages. Users should always understand where they are, what remains, and why the current step exists.",
          ],
          media: {
            src: "/work/formial-labs/formial-onboarding.webp",
            alt: "Verify details step with editable name and WhatsApp fields, OTP entry, and Verify and Continue",
            caption:
              "One decision per screen — confirm identity, then continue — with the remaining steps still in view.",
          },
        },
        {
          title: "First useful action",
          paragraphs: [
            "The final transition needed to feel like arrival, not completion of paperwork. The journey should land users in a state where the product's value is immediately within reach.",
          ],
          media: {
            src: "/work/formial-labs/formial-marketing-body.webp",
            alt: "Formial marketing section showing three steps from consultation to ongoing customisation",
            variant: "wide",
            caption:
              "The same three-step logic appears on the public site, so the product journey matches the promise made before signup.",
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
        src: "/work/formial-labs/formial-onboarding.webp",
        alt: "Completed onboarding interface with progress, review fields, and a primary Verify and Continue action",
        variant: "wide",
        caption:
          "The finished flow moves users from a named welcome through guided setup into a product state that feels ready to use.",
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
