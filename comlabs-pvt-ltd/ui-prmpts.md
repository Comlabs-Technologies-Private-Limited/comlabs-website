# ComLabs — Cursor AI UI Prompts
## Aceternity-Inspired Components for the ComLabs Landing Page

> **How to use:** Paste each prompt block directly into Cursor AI Composer (Cmd+I).
> Each prompt is self-contained. Run them section by section.
> Stack: Next.js 14 + Tailwind CSS + Framer Motion + TypeScript.

---

## DESIGN SYSTEM REFERENCE
*Include this as context in every prompt session.*

```
ComLabs Design System:
- Background: #0A0A0A (near-black, not pure black)
- Surface: #111111, #161616
- Border: rgba(255,255,255,0.08) — very subtle white borders
- Text primary: #F5F4F0
- Text secondary: #888780
- Text tertiary: #444441
- Accent: #185FA5 (blue) — use sparingly
- Font: Inter, tracking-tight on headings, normal on body
- Border radius: 8px components, 12px cards, 0px for sharp tech aesthetic
- Motion: spring physics, NOT linear. stiffness: 120, damping: 20
- Never use gradients on text. Never use glow effects on body copy.
- All animations respect prefers-reduced-motion.
```

---

---

# PROMPT 01 — HERO SECTION
## Animated headline + cursor-tracked spotlight background

```
Build the ComLabs hero section as a full-height Next.js React component.

BACKGROUND:
Create a canvas element that covers the entire hero. On it, render a subtle dot-grid 
pattern (dots 1px, spaced 32px, color rgba(255,255,255,0.06)). The entire grid should 
slowly drift upward at 0.3px/frame, looping infinitely. This gives the sense of 
upward motion without being distracting.

On top of the canvas, add a radial spotlight that follows the mouse cursor. The 
spotlight is a radial gradient: center rgba(24,95,165,0.12), outer transparent, 
radius 500px. It moves with 120ms lerp smoothing so it trails the cursor softly 
rather than snapping.

HEADLINE:
Large H1: "We build software that ships."
Use Inter font, font-weight 500, NOT bold — refined, not loud.
Size: clamp(48px, 7vw, 88px). Letter spacing: -0.03em. Color: #F5F4F0.
No gradient. No shimmer. Just clean type.

The headline should animate in on mount:
- Each WORD slides up from y:24 and fades in (opacity 0→1)
- Stagger 80ms between words
- Spring animation: stiffness 120, damping 20
- Use Framer Motion

SUBHEADLINE:
"ComLabs is a software development studio for startups and enterprise teams who 
treat engineering as a competitive advantage."
Size 18px, color #888780, max-width 520px, line-height 1.7.
Fades in at 400ms delay after headline completes.

CTA ROW:
Two elements side by side, gap 16px, margin-top 40px:

1. Primary button: "Start a project →"
   - Background: #F5F4F0, text: #0A0A0A
   - Padding: 12px 24px, border-radius: 6px
   - On hover: scale(1.02), subtle box-shadow 0 0 0 1px rgba(255,255,255,0.2)
   - On click: scale(0.98) spring snap
   - Transition: all 150ms spring

2. Ghost link: "See our work ↓"
   - No background, text: #888780
   - On hover: text color transitions to #F5F4F0 over 200ms
   - An underline that grows from left (scaleX 0→1 on hover, transform-origin: left)

TRUST STRIP:
Below CTA, after 16px gap:
Small label: "TRUSTED BY" in 11px, #444441, letter-spacing 0.12em
Then a horizontal row of company name chips (not logos — just text in small caps):
Cursor · Neon · Strapi · Fireworks · [add ComLabs clients]
Each chip: text 12px, color #444441, border 1px solid rgba(255,255,255,0.06), 
padding 4px 12px, border-radius 100px.
The row fades in at 600ms delay.

LAYOUT:
Content left-aligned, max-width 1200px, horizontal padding 24px.
Vertically centered at 55% height (slightly above center feels more intentional).
No centered layouts — ComLabs is not a generic SaaS.

File: components/sections/Hero.tsx
```

---

---

# PROMPT 02 — NAVBAR
## Sticky nav with blur backdrop + active section indicator

```
Build a sticky navigation bar for ComLabs.

STRUCTURE:
Fixed at top, full width. Height: 56px.
Background: rgba(10,10,10,0.72) with backdrop-filter: blur(16px) saturate(180%).
Bottom border: 1px solid rgba(255,255,255,0.06).
The border should only appear after the user scrolls 40px — use a useScrollY hook 
with Framer Motion to drive border opacity from 0→1 between scroll 0px and 40px.

LEFT: ComLabs wordmark
- Use Inter, font-weight 500, size 15px, letter-spacing -0.01em, color #F5F4F0
- Precede with a small geometric mark: a 10×10px isometric cube SVG inline 
  (just 3 parallelogram faces, colors #2a2a2a / #3a3a3a / #1a1a1a with 1px strokes)
- Clicking the mark or wordmark scrolls to top with smooth behavior

CENTER: Navigation links
- Links: Services · Work · Process · Pricing
- Font: 14px, color #888780
- On hover: color transitions to #F5F4F0, 150ms ease
- Active section highlight: detect which section is in viewport using 
  IntersectionObserver. Active link gets color #F5F4F0.
- Under the active link, render a small 4×2px pill (color #185FA5) that slides 
  horizontally using layoutId="nav-indicator" with Framer Motion — so it glides 
  between links as sections change.

RIGHT: CTA button
- "Start a project" 
- Border: 1px solid rgba(255,255,255,0.12)
- Background: transparent
- Text: 14px, #F5F4F0
- Padding: 8px 16px, border-radius: 6px
- On hover: background rgba(255,255,255,0.06), border-color rgba(255,255,255,0.2)
- Transition: all 150ms ease

MOBILE (< 768px):
Hide center links. Show hamburger (3 lines, 20px wide, 1.5px stroke, #888780).
On click: animate the 3 lines into an X (top line rotates 45°, middle fades out, 
bottom rotates -45°) using Framer Motion.
Full-screen menu slides down from top: dark overlay, links stacked vertically, 
32px font size. Each link staggers in with 50ms delay.

File: components/layout/Navbar.tsx
```

---

---

# PROMPT 03 — SERVICES BENTO GRID
## Asymmetric card grid with hover spotlight per card

```
Build the ComLabs services section as a bento-style asymmetric grid.

SECTION HEADER:
Left-aligned label: "WHAT WE BUILD" — 11px, #444441, letter-spacing 0.12em
H2: "Five services. One studio."
Body: "From SAP enterprise integrations to 6-week MVPs — scoped clearly, built 
precisely, handed off cleanly."
Animate in using Framer Motion whileInView with viewport { once: true, amount: 0.2 }

GRID LAYOUT:
Use CSS Grid. Desktop: 12 columns. Cards span different widths to create visual 
hierarchy. Suggested layout:

Row 1: [SaaS — 7 cols] [SAP — 5 cols]
Row 2: [MVP — 4 cols] [Landing Page — 4 cols] [Mobile — 4 cols]

Mobile: single column stack.

CARD DESIGN:
Each card:
- Background: #111111
- Border: 1px solid rgba(255,255,255,0.07)
- Border-radius: 10px
- Padding: 28px
- Position: relative, overflow: hidden

CARD SPOTLIGHT EFFECT (the key micro-interaction):
On each card, track mouse position RELATIVE to that card using onMouseMove.
Render a radial gradient div inside the card (position absolute, pointer-events none, 
full width/height, z-index 0):
  background: radial-gradient(400px circle at [mouseX]px [mouseY]px, 
    rgba(24,95,165,0.08), transparent 60%)
This creates a subtle blue light that follows the cursor within each card.
On mouse leave, the gradient fades out over 400ms.

CARD CONTENT (z-index 1, position relative):
- Service icon: a minimal 24×24px SVG icon (geometric, line-style, stroke #185FA5)
- Service name: 18px, #F5F4F0, font-weight 500, margin-top 40px
- Description: 14px, #888780, line-height 1.6, margin-top 8px
- CTA: "Learn more →" — 13px, #444441. On card hover, color transitions to #185FA5 
  and the arrow nudges right by 4px (translateX transition 200ms)

CARD HOVER STATE:
On hover:
- Border color: rgba(255,255,255,0.14) (slightly brighter)
- Card lifts: translateY(-2px), transition 200ms spring
- Top-left and bottom-right corners get a 2px colored notch: 
  Use ::before and ::after pseudo-like absolutely positioned divs, 
  8×8px, showing a corner of the accent color #185FA5. 
  These fade in on hover over 200ms.

SERVICES DATA:
const services = [
  { name: "SaaS Development", icon: "grid", 
    desc: "Full-stack SaaS platforms with auth, billing, dashboards, and APIs." },
  { name: "SAP Integration", icon: "layers", 
    desc: "BAPI/RFC connectors, middleware, and SAP BTP for enterprise stacks." },
  { name: "MVP Builds", icon: "zap", 
    desc: "From idea to deployed product in 4–8 weeks. Scoped tight, built fast." },
  { name: "Landing Pages", icon: "layout", 
    desc: "Conversion-first pages that load fast and look like you mean it." },
  { name: "Mobile Apps", icon: "smartphone", 
    desc: "React Native and Flutter builds for iOS and Android." },
]

Use lucide-react for icons (stroke width 1.5, never filled).

File: components/sections/Services.tsx
```

---

---

# PROMPT 04 — PROCESS SECTION
## Numbered steps with animated progress connector

```
Build the ComLabs process section.

LAYOUT:
Two-column on desktop: left column is sticky content, right column scrolls through steps.
On mobile: single column, vertical stack.

LEFT COLUMN (sticky, top: 120px):
- Label: "HOW WE WORK" — 11px, #444441, tracking wide
- H2: "Four stages. No surprises."
- Body: "We scope before we build. Every project starts with a fixed-price discovery 
  week so both sides know exactly what's being made."
- Below: a vertical progress bar (2px wide, full height of the steps, #222222 base).
  An animated fill (color #185FA5) grows down as the user scrolls through each step.
  Use scroll progress from Framer Motion's useScroll with a target ref on the right column.
  The bar's scaleY is driven by scrollYProgress, transform-origin: top.

RIGHT COLUMN:
Four step cards, each 200px min-height, separated by 24px gap.

Each step card:
- No border by default — just spacing
- A horizontal rule above each step (1px, rgba(255,255,255,0.07))
- Step number: "01", "02" etc. — 11px, #444441, font-weight 500, letter-spacing 0.08em
- Step title: 22px, #F5F4F0, font-weight 500, margin-top 8px
- Duration badge: e.g. "1 week" — pill, 11px, background rgba(24,95,165,0.12), 
  color #185FA5, padding 3px 10px, border-radius 100px, border 1px solid rgba(24,95,165,0.2)
- Body: 15px, #888780, line-height 1.7, margin-top 12px, max-width 480px

STEP ACTIVATION:
As the user scrolls, use IntersectionObserver on each step card.
When a step enters the viewport at threshold 0.5:
- Its step number transitions from #444441 to #185FA5
- A subtle left border (3px, #185FA5) fades in on the card left edge
- The title transitions from #888780 to #F5F4F0

This creates the feel of reading through a narrative, not just scanning a list.

STEPS DATA:
[
  { n: "01", title: "Discovery", duration: "1 week", 
    body: "We map requirements, constraints, and success criteria. You get a scoped 
    proposal with a fixed timeline — not a vague estimate." },
  { n: "02", title: "Architecture", duration: "1–2 weeks", 
    body: "Stack decisions, data models, and system design agreed before a line of 
    product code is written. This is where expensive mistakes get caught for free." },
  { n: "03", title: "Build", duration: "2–8 weeks", 
    body: "Weekly demos. Real progress. You see working software every week — 
    not a big reveal at the end." },
  { n: "04", title: "Handoff", duration: "1 week", 
    body: "Full documentation, deployment runbook, and a knowledge transfer session. 
    Your team inherits a product they can run, not a black box." },
]

File: components/sections/Process.tsx
```

---

---

# PROMPT 05 — SOCIAL PROOF / TESTIMONIALS
## Auto-scrolling marquee with pause-on-hover

```
Build the ComLabs testimonials section.

SECTION HEADER:
Label: "CLIENT RESULTS"
H2: "Work that ships."
Left-aligned, same pattern as other sections.

MARQUEE IMPLEMENTATION:
Two rows of testimonial cards that scroll horizontally in opposite directions.
Row 1 scrolls LEFT continuously. Row 2 scrolls RIGHT continuously.
Speed: ~40px/second — slow enough to read, fast enough to feel alive.

Use CSS animation (not JS) for performance:
@keyframes scroll-left { from { transform: translateX(0) } to { transform: translateX(-50%) } }
@keyframes scroll-right { from { transform: translateX(-50%) } to { transform: translateX(0) } }

Duplicate the card array so the marquee loops seamlessly (render cards twice, 
animation moves exactly 50% which equals one full set).

On hover of the entire marquee track (either row), PAUSE both animations simultaneously.
The pause should feel like pressing stop — use animation-play-state: paused, 
transitioned with a 200ms ease.

TESTIMONIAL CARD:
- Width: 340px, flex-shrink: 0
- Background: #111111
- Border: 1px solid rgba(255,255,255,0.07)
- Border-radius: 10px
- Padding: 24px
- Margin-right: 16px

Card content:
- Quote marks: large decorative " character, 48px, color rgba(24,95,165,0.2), 
  position absolute top-left (offset 16px each), font-family serif
- Quote text: 14px, #888780, line-height 1.65, padding-top 24px (to clear quote mark)
- Divider: 1px rule, rgba(255,255,255,0.07), margin 16px 0
- Author row: flex, align-center, gap 10px
  - Avatar: 32px circle, background #222, border 1px solid rgba(255,255,255,0.1)
    (use initials as fallback if no image: 12px, #888780)
  - Name: 13px, #F5F4F0, font-weight 500
  - Role + company: 12px, #444441

RESULT CALLOUT (optional, on some cards):
A stat chip above the quote:
"Shipped in 6 weeks" or "80% less manual entry" — 
Small pill: 11px, #F5F4F0, background rgba(255,255,255,0.04), 
border 1px solid rgba(255,255,255,0.08), padding 3px 10px, border-radius 100px.

TESTIMONIALS DATA: [
  { quote: "ComLabs scoped the project better than any agency we'd worked with. 
    They flagged three architectural decisions upfront that saved us months.", 
    name: "Rahul M.", role: "Founder, Series A fintech", result: "Shipped in 6 weeks" },
  { quote: "We'd been quoted 6 months by a Big Four firm. ComLabs delivered in a 
    month, documented, and handed it off cleanly.", 
    name: "Priya S.", role: "Head of IT Operations", result: "4 weeks, zero downtime" },
  { quote: "They pushed back on scope when it was the right call. That saved us 
    3 weeks and the app is better for it.", 
    name: "Arjun K.", role: "CPO, logistics startup", result: "4.6 ★ on App Store" },
  { quote: "Refined, fast, and they understood our enterprise constraints without 
    us having to explain twice.", 
    name: "Sonal V.", role: "CTO, enterprise SaaS", result: "12-week delivery" },
  { quote: "First agency that actually documented the SAP connectors. 
    Our internal team could take over immediately.", 
    name: "Vikram P.", role: "Head of ERP, manufacturing", result: "Full handoff in 5 days" },
]

File: components/sections/Testimonials.tsx
```

---

---

# PROMPT 06 — STATS / CREDIBILITY STRIP
## Counting number animation on scroll entry

```
Build a full-width credibility strip for ComLabs that sits between the hero and services.

LAYOUT:
Single row, evenly spaced, 4 stats.
Background: #0D0D0D (slightly lighter than hero bg to create a subtle separation)
Border top + bottom: 1px solid rgba(255,255,255,0.07)
Padding: 48px 24px
Max-width 1200px centered.

Mobile: 2×2 grid.

EACH STAT:
- Large number: clamp(40px, 5vw, 64px), Inter, font-weight 500, color #F5F4F0, 
  letter-spacing -0.03em
- Label below: 13px, #444441, letter-spacing 0.06em, text-transform uppercase

COUNTING ANIMATION:
When the strip enters the viewport (IntersectionObserver, threshold 0.4):
Each number counts up from 0 to its final value over 1.5 seconds.
Use an easeOutExpo curve: t => 1 - Math.pow(2, -10 * t)
Numbers with "+" suffix should animate the number, then show "+" immediately.
Numbers with "%" animate similarly.

STATS:
[
  { value: 40, suffix: "+", label: "Projects shipped" },
  { value: 6, suffix: " weeks", label: "Average MVP delivery" },
  { value: 12, suffix: "", label: "Enterprise clients" },
  { value: 100, suffix: "%", label: "Code ownership" },
]

SEPARATOR:
Between each stat, a 1px vertical rule (rgba(255,255,255,0.07), height 40px) 
centered vertically. Hidden on mobile.

File: components/sections/StatsStrip.tsx
```

---

---

# PROMPT 07 — FAQ SECTION
## Accordion with spring-animated expand + schema output

```
Build the ComLabs FAQ section with animated accordion.

LAYOUT:
Two-column on desktop: left column is a sticky label + decorative element, 
right column is the accordion list.
Single column on mobile.

LEFT COLUMN:
- Label: "COMMON QUESTIONS"
- H2: "Before you reach out."
- Subtle decorative element: a 120×120px square with dotted border 
  (border: 1px dashed rgba(255,255,255,0.08), border-radius 8px) — 
  no content inside, just structural. Positioned below the subline.
- This column is sticky (top: 120px).

RIGHT COLUMN — ACCORDION:
Each FAQ item:
- Top border: 1px solid rgba(255,255,255,0.07)
- Padding: 20px 0
- Last item has bottom border too

QUESTION ROW:
Flex row, space-between, align-center.
- Question text: 16px, #F5F4F0, font-weight 500
- Indicator: A 20×20px square (border: 1px solid rgba(255,255,255,0.12), border-radius 4px)
  containing a "+" that rotates to "×" when open.
  Use Framer Motion: animate rotate from 0° to 45° when active.
  The square background transitions from transparent to rgba(255,255,255,0.04).

Clicking the question row:
- Toggles open/closed
- Only one item open at a time (accordion behavior)
- The entire row gets a subtle background rgba(255,255,255,0.02) when active

ANSWER:
Animated height using Framer Motion AnimatePresence + motion.div with:
  initial={{ height: 0, opacity: 0 }}
  animate={{ height: "auto", opacity: 1 }}
  exit={{ height: 0, opacity: 0 }}
  transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}

Answer text: 14px, #888780, line-height 1.7, padding-bottom 16px.

SCHEMA OUTPUT:
Add a next/head or metadata export that generates the FAQPage JSON-LD schema 
from the same FAQ data array used to render the accordion. 
The schema should be injected as a <script type="application/ld+json"> tag.

FAQ DATA:
Use the 8 questions from the ComLabs FAQ document:
Q1: How long does a typical project take?
Q2: Do you work with early-stage startups?
Q3: Do you offer retainer / ongoing support?
Q4: Who will I be working with day to day?
Q5: What technologies do you use?
Q6: Will I own the code?
Q7: How does pricing work?
Q8: Can you work with our existing team?

(Full answers are in the ComLabs content document.)

File: components/sections/FAQ.tsx
```

---

---

# PROMPT 08 — CONTACT / CTA SECTION
## Full-width CTA with animated border beam

```
Build the ComLabs final CTA section.

OUTER CONTAINER:
Full width, background #0A0A0A.
Inside: a container with max-width 900px, centered, 
border: 1px solid rgba(255,255,255,0.08), border-radius: 16px,
padding: 80px 64px on desktop, 48px 24px on mobile.
Overflow: hidden (needed for the border beam).

BORDER BEAM EFFECT:
A light that travels around the border of the container.
Implement using a conic-gradient on a ::before-style div 
(use a real div, not pseudo for React):
- Position: absolute, inset: -1px, border-radius: inherit, z-index: 0
- Background: conic-gradient from the current angle: 
  transparent 0%, transparent 80%, rgba(24,95,165,0.6) 90%, transparent 100%
- Animate the rotation: @keyframes beam { from: rotate(0deg) to: rotate(360deg) }
- Duration: 3s linear infinite
- The inner area is masked so only the border ring shows 
  (use a mask: radial gradient that cuts out the center).
  
  Mask: linear-gradient(#000, #000) content-box, linear-gradient(#000, #000)
  with background-clip and the difference cutting out the interior.

CONTENT (z-index 1, position relative):
- Label: "START A PROJECT" — 11px, #444441, letter-spacing 0.12em
- H2: "Let's build something."
  Size: clamp(32px, 4vw, 52px), font-weight 500, #F5F4F0, letter-spacing -0.02em
- Body: "Tell us what you're working on. We'll reply within 24 hours."
  16px, #888780, max-width 420px, margin: 0 auto, text-align center.

FORM:
Centered, max-width 480px, margin: 40px auto 0.
Stack vertically with 12px gap.

INPUT STYLE:
- Background: rgba(255,255,255,0.04)
- Border: 1px solid rgba(255,255,255,0.08)
- Border-radius: 6px
- Padding: 12px 16px
- Font: 14px, #F5F4F0, placeholder color #444441
- On focus: border-color rgba(24,95,165,0.5), 
  box-shadow: 0 0 0 3px rgba(24,95,165,0.08)
  Transition: 200ms ease
- No outline (replace with the box-shadow on focus)

Fields:
1. Name (full width)
2. Email (full width)  
3. Service dropdown: [SaaS / SAP Integration / MVP / Landing Page / Mobile / Not sure]
   Style the select with the same input style. Use a custom chevron icon.
4. Project brief — textarea, 4 rows, resize: vertical

SUBMIT BUTTON:
Full width, height 48px.
Background: #185FA5, color: #F5F4F0, font-weight 500, font-size 15px.
Border-radius: 6px. No border.
Text: "Send project brief →"

On hover: background #1A6BBF, translateY(-1px), 
box-shadow: 0 4px 16px rgba(24,95,165,0.3). Transition 200ms.
On click: scale(0.98) snap.

Loading state: replace text with a 16px spinning circle 
(SVG, stroke: #F5F4F0, stroke-dasharray animation). 

SUCCESS STATE:
After submit (simulate with a 1.5s delay for now):
The form fades out (opacity 0, scale 0.97 over 300ms).
Then a success message fades in: 
"✓ Brief received. Expect a reply within 24 hours."
24px, #F5F4F0, centered. With a subtle green dot (8px, #1D9E75) before the text.

File: components/sections/Contact.tsx
```

---

---

# PROMPT 09 — FLOATING NAV INDICATOR (Scroll Progress)
## Thin progress bar at the very top of the viewport

```
Build a scroll progress indicator for ComLabs.

A 2px tall bar that sits at the absolute top of the viewport (z-index: 9999).
Color: linear-gradient(to right, #185FA5, #3A8BD4).
Width: driven by scroll progress using Framer Motion's useScroll + useTransform.
scaleX goes from 0 to 1, transform-origin: left.

The bar should NOT be visible until the user scrolls 100px.
Below 100px: opacity 0, transition 300ms.
Above 100px: opacity 1.

No border-radius on the bar — keep it sharp and thin.

File: components/ui/ScrollProgress.tsx
Add it to the root layout.tsx directly inside <body>, before everything else.
```

---

---

# PROMPT 10 — CURSOR FOLLOWER
## Custom cursor dot with lag effect

```
Build a custom cursor follower for ComLabs. 
Only active on desktop (hide on touch devices using matchMedia).

TWO ELEMENTS:
1. Cursor dot: 6px × 6px circle, background #F5F4F0, position fixed, 
   pointer-events none, z-index 9999. Follows the actual cursor position exactly 
   (no lag). Border-radius 50%.

2. Cursor ring: 32px × 32px circle, border: 1px solid rgba(245,244,240,0.3), 
   position fixed, pointer-events none, z-index 9998, border-radius 50%.
   Follows the cursor with ~100ms lag using useSpring from Framer Motion:
   spring config: stiffness: 150, damping: 25, mass: 0.5.

STATE CHANGES:
When hovering over:
- Any <a> or <button>: ring expands to 48px, border-color rgba(24,95,165,0.6), 
  dot shrinks to 3px. Transition 200ms spring.
- Any heading (h1, h2, h3): ring expands to 64px, opacity 0.5.
- The Contact form: dot becomes a 20px circle with text "click" inside 
  (10px, #0A0A0A) — ring hides.

Use React context (CursorContext) so components can trigger cursor state changes 
from anywhere using: const { setCursorState } = useCursor()

File: components/ui/Cursor.tsx + context/CursorContext.tsx
Add <CursorProvider> to layout.tsx wrapping all content.
```

---

---

# PROMPT 11 — SECTION TRANSITION WIPE
## Smooth section-to-section visual separator

```
For every major section boundary on the ComLabs page, replace plain spacing 
with a subtle visual transition element.

Build a <SectionDivider /> component that renders between each section.

VISUAL:
A 1px horizontal rule: rgba(255,255,255,0.06).
Above and below the rule: 80px of space.
Centered in the rule: a small 20×20px diamond shape (rotated square, 
1px border rgba(255,255,255,0.1), background #0A0A0A) — 
like a subtle spacer mark.

The diamond has a slow rotation animation: 360° over 8 seconds, linear, infinite.
On hover of the divider area: the diamond pauses its rotation and the border 
brightens to rgba(24,95,165,0.4) over 200ms.

This is a tiny detail that rewards attentive visitors without distracting anyone else.

Use it between every section: Hero → Stats → Services → Process → Testimonials 
→ FAQ → Contact.

File: components/ui/SectionDivider.tsx
```

---

---

# PROMPT 12 — PAGE-LEVEL ORCHESTRATION
## Wire everything together in the main page

```
Now assemble the full ComLabs landing page in app/page.tsx (Next.js 14 App Router).

Import order and section sequence:
1. <ScrollProgress /> (fixed, outside normal flow)
2. <CursorProvider> wrapping everything
3. <Navbar />
4. <main>
   a. <Hero />
   b. <SectionDivider />
   c. <StatsStrip />
   d. <SectionDivider />
   e. <Services />
   f. <SectionDivider />
   g. <Process />
   h. <SectionDivider />
   i. <Testimonials />
   j. <SectionDivider />
   k. <FAQ />
   l. <SectionDivider />
   m. <Contact />
5. <Footer />
6. <Cursor /> (outside CursorProvider but inside body)

GLOBAL PAGE SETTINGS:
- Page background: #0A0A0A
- Selection color: background #185FA5, text #F5F4F0
  Add to globals.css: ::selection { background: #185FA5; color: #F5F4F0; }
- Scrollbar: thin, track #111111, thumb #333333, thumb hover #444444.
  Add to globals.css: 
  ::-webkit-scrollbar { width: 6px }
  ::-webkit-scrollbar-track { background: #111 }
  ::-webkit-scrollbar-thumb { background: #333; border-radius: 3px }
  ::-webkit-scrollbar-thumb:hover { background: #444 }

- Font: add Inter from next/font/google with subsets ['latin'], 
  display: 'swap', variable '--font-inter'.
  Apply to <html> classname.

- Smooth scroll: add scroll-behavior: smooth to html in globals.css.
  Also add: html { scroll-padding-top: 72px } to account for sticky navbar height.

META / SEO:
Export metadata from page.tsx:
{
  title: "ComLabs — Software Development Agency | SaaS, SAP & MVP Builds",
  description: "ComLabs builds SaaS platforms, SAP integrations, MVPs, landing pages, 
    and mobile apps. Fixed-price, senior engineers, code you own.",
  openGraph: {
    title: "ComLabs — Product engineering for teams that ship",
    description: "SaaS, SAP, MVP, landing pages, mobile. Fixed scope. Senior engineers.",
    url: "https://comlabs.in",
    siteName: "ComLabs",
    locale: "en_IN",
    type: "website",
  }
}

DEPENDENCIES TO INSTALL:
npm install framer-motion lucide-react
npm install @radix-ui/react-accordion (for FAQ)

File: app/page.tsx + app/globals.css + app/layout.tsx
```

---

---

## MICRO-INTERACTION CHEAT SHEET
*Quick reference — apply these everywhere, consistently.*

```
HOVER TRANSITIONS:
- Color change: 150ms ease
- Transform (scale/translate): spring stiffness:200 damping:20 (fast snap)
- Opacity: 200ms ease
- Background color: 150ms ease

SCROLL ANIMATIONS (whileInView):
- All use: viewport={{ once: true, amount: 0.15 }}
- Slide up: y: 20 → 0, opacity: 0 → 1, duration: 0.5s, ease: [0.21, 0.47, 0.32, 0.98]
- Stagger children: staggerChildren: 0.08

SPRING CONFIGS:
- Snappy (buttons): stiffness: 400, damping: 30
- Smooth (cursor, panels): stiffness: 120, damping: 20
- Slow (decorative): stiffness: 80, damping: 15

NEVER USE:
- ease-in-out on anything the user directly triggers (feels sluggish)
- duration > 600ms for UI feedback
- transform3d hacks or will-change: transform on everything (only where needed)
- opacity: 0.5 on body text (use #888780 color instead)
- border-radius > 12px on non-pill elements
```

---

*ComLabs · UI Prompt System v1.0 · Built for Cursor AI Composer*