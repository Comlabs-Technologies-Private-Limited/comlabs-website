# Design.md — Comlabs Technologies Hero Section

## 0. Goal

Recreate the approved Comlabs Technologies landing page hero **as close to pixel-perfect as possible** from the supplied screenshot.

This file is written for Stitch AI / design-to-code generation. Build the page as a polished, static desktop-first hero section with a light theme, premium SaaS studio feel, minimal blue usage, precise spacing, and realistic product mockups.

The final result should look like a refined product/agency homepage, not a generic AI-generated landing page.

---

## 1. Canvas + Page Setup

### Target Frame

- **Desktop canvas:** `1672px × 941px`
- **Primary design breakpoint:** desktop / large screen
- **Page background:** `#FBFBFC`
- **Hero background:** `#FBFBFC`
- **Content max width:** `1400px`
- **Page alignment:** centered
- **Overall mood:** white, breathable, premium, sharp, restrained

### Global CSS Reset Feel

Use a modern reset:

```css
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  background: #fbfbfc;
  color: #0b0d12;
  font-family: Inter, Geist, "SF Pro Display", "SF Pro Text", Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  text-rendering: geometricPrecision;
}
```

### Layout Principle

The design must feel spacious. Avoid compression. The hero should have a lot of quiet whitespace between:

- Navbar and headline
- Headline and subtitle
- Subtitle and CTAs
- CTAs and product cards
- Cards and trust logos

Use only these spacing values:

```txt
4, 8, 12, 16, 20, 24, 32, 40, 48, 56, 64, 72, 80, 96
```

---

## 2. Color System

Use a restrained palette. Blue is an accent, not the dominant brand surface.

```css
:root {
  --bg-page: #fbfbfc;
  --surface: #ffffff;
  --surface-soft: #f7f8fb;

  --ink: #0b0d12;
  --ink-soft: #17191f;
  --text-secondary: #667085;
  --text-muted: #8a93a3;

  --border: #e7eaf0;
  --border-soft: #eef1f5;

  --blue: #2453ff;
  --blue-hover: #1b46e8;
  --blue-soft: #edf3ff;
  --blue-line: #d9e4ff;

  --green: #17b26a;
  --shadow-soft: rgba(15, 23, 42, 0.045);
}
```

### Usage Rules

- Use `--ink` for headline and primary nav text.
- Use `--text-secondary` for paragraph and card subtitles.
- Use `--blue` only for:
  - Primary CTA
  - Logo mark
  - Small icons inside product mockups
  - Tiny dotted accents
  - Small chart lines / data highlights
- Use black CTA in the navbar, matching the Antigravity-style reference.
- Do not use large blue gradient backgrounds across the page. Gradients may appear only inside product mockup panels if needed.

---

## 3. Typography System

### Font Direction

Use a modern, neutral grotesk. Preferred stack:

```css
font-family: Inter, Geist, "SF Pro Display", "SF Pro Text", Arial, sans-serif;
```

The screenshot resembles a crisp geometric/grotesk product font. Avoid decorative fonts.

### Type Scale

```css
--text-xs: 12px;
--text-sm: 14px;
--text-base: 16px;
--text-lg: 18px;
--text-xl: 20px;
--text-hero: 76px;
```

### H1

```css
.hero-title {
  font-size: 76px;
  line-height: 0.98;
  letter-spacing: -0.055em;
  font-weight: 800;
  color: #0b0d12;
  text-align: center;
}
```

H1 text exactly:

```txt
Your website.
Your best salesperson.
```

Important:

- Two lines only.
- No badge above H1.
- No dash in H1.
- Text should feel bold, dense, and premium.
- Max width around `820px`.

### Subtitle

```css
.hero-subtitle {
  max-width: 760px;
  font-size: 18px;
  line-height: 1.55;
  font-weight: 400;
  color: #667085;
  text-align: center;
}
```

Subtitle text exactly:

```txt
We design high-converting websites, craft product experiences,
and build AI-powered systems that help startups and growing companies grow.
```

---

## 4. Navbar Specification

The navbar should be a Comlabs adaptation of the Google Antigravity-style reference.

### Navbar Container

```css
.navbar {
  height: 72px;
  width: 100%;
  background: #ffffff;
  border-bottom: 1px solid #e9ecf2;
  display: flex;
  align-items: center;
}

.navbar-inner {
  width: 100%;
  max-width: 1480px;
  margin: 0 auto;
  padding: 0 48px;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
}
```

### Left Brand Cluster

Position: far left, vertically centered.

Content:

```txt
[Comlabs logo mark] Comlabs Technologies
```

Visual details:

- Logo icon: abstract double-chevron / linked mark in blue.
- Icon size: `28px × 28px`.
- Gap between icon and text: `10px`.
- `Comlabs`: `20px`, `700`, `#0B0D12`.
- `Technologies`: `18px`, `400`, `#667085`.
- Baseline aligned.

CSS direction:

```css
.brand {
  display: flex;
  align-items: center;
  gap: 10px;
}

.brand-name-main {
  font-size: 20px;
  font-weight: 700;
  letter-spacing: -0.03em;
  color: #0b0d12;
}

.brand-name-sub {
  font-size: 18px;
  font-weight: 400;
  letter-spacing: -0.03em;
  color: #667085;
  margin-left: 4px;
}
```

### Center Navigation

Nav items exactly:

```txt
Services ▼
Solutions ▼
Case studies
Insights
Contact
```

Visual details:

- Center aligned in navbar.
- Gap: `48px`.
- Font size: `16px`.
- Font weight: `500`.
- Text color: `#111318`.
- Dropdown chevrons should be minimal, `12px`, stroke `1.75px`.
- No hover underline by default.

```css
.nav-links {
  display: flex;
  align-items: center;
  gap: 48px;
}

.nav-link {
  font-size: 16px;
  line-height: 1;
  font-weight: 500;
  color: #111318;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 8px;
}
```

### Right Navbar CTA

Reference style: black pill button.

Text:

```txt
Start a project →
```

Spec:

```css
.nav-cta {
  justify-self: end;
  height: 48px;
  padding: 0 22px 0 24px;
  border-radius: 9999px;
  background: #0a0c10;
  color: #ffffff;
  font-size: 16px;
  font-weight: 500;
  display: inline-flex;
  align-items: center;
  gap: 14px;
  border: 1px solid rgba(255,255,255,0.08);
  box-shadow: inset 0 1px 0 rgba(255,255,255,0.12);
}
```

Important:

- Do not use blue outline for this navbar CTA.
- Use black pill as in the reference.
- Arrow icon should be thin and white.

---

## 5. Hero Layout

### Hero Wrapper

```css
.hero {
  position: relative;
  overflow: hidden;
  min-height: calc(941px - 72px);
  padding-top: 70px;
  padding-bottom: 40px;
}

.hero-inner {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 48px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
```

### Vertical Rhythm

From top of navbar border:

```txt
Navbar bottom → H1 top: ~78px
H1 height: ~150px
H1 bottom → subtitle top: 28px
Subtitle height: ~58px
Subtitle bottom → CTA row top: 28px
CTA row height: 48px
CTA row bottom → cards top: 40px
Cards height: ~345px
Cards bottom → trust text top: 26px
Trust logo row: ~52px
```

### Background Dots

Add two subtle dotted clusters, left and right.

Left cluster:

```css
.left-dots {
  position: absolute;
  left: 145px;
  top: 158px;
  width: 190px;
  height: 250px;
  opacity: 0.42;
}
```

Right cluster:

```css
.right-dots {
  position: absolute;
  right: 145px;
  top: 158px;
  width: 190px;
  height: 250px;
  opacity: 0.42;
}
```

Dot style:

- Mostly `#CBD5E1` and a few `#2453FF`.
- Dot sizes: `2px`, `3px`, `4px`.
- Sparse and airy.
- Do not create a dense confetti field.

---

## 6. Hero CTA Buttons

### CTA Row

```css
.hero-actions {
  margin-top: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
}
```

### Primary CTA

Text:

```txt
Book a call ↗
```

Spec:

```css
.primary-cta {
  height: 48px;
  min-width: 190px;
  padding: 0 24px;
  border-radius: 14px;
  background: #2453ff;
  color: #ffffff;
  font-size: 16px;
  font-weight: 500;
  border: 1px solid #2453ff;
  box-shadow: 0 8px 22px rgba(36, 83, 255, 0.16);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 14px;
}
```

### Secondary CTA

Text:

```txt
Explore services ↗
```

Spec:

```css
.secondary-cta {
  height: 48px;
  min-width: 220px;
  padding: 0 24px;
  border-radius: 14px;
  background: #ffffff;
  color: #0b0d12;
  font-size: 16px;
  font-weight: 500;
  border: 1px solid #dfe3ea;
  box-shadow: 0 6px 18px rgba(15, 23, 42, 0.035);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 14px;
}
```

---

## 7. Three Product Mockup Cards

These cards are critical. They must feel crisp, sharp, minimal, realistic, and premium.

### Cards Grid

```css
.cards-grid {
  width: 100%;
  max-width: 1240px;
  margin-top: 40px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}
```

### Card Container

Approximate dimensions:

- Width: `386px–410px` depending on viewport.
- Height: `345px`.
- Radius: `20px`.
- Border: `1px solid #E7EAF0`.
- Background: `#FFFFFF`.
- Shadow: very subtle only.

```css
.product-card {
  height: 345px;
  border-radius: 20px;
  background: #ffffff;
  border: 1px solid #e7eaf0;
  box-shadow: 0 8px 30px rgba(15, 23, 42, 0.04);
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
```

### Mockup Preview Area

Top preview area inside each card:

```css
.mockup-area {
  height: 238px;
  margin: 12px 12px 0;
  border-radius: 14px;
  background:
    radial-gradient(circle at 76% 20%, rgba(255,255,255,0.78), transparent 30%),
    linear-gradient(135deg, #edf3ff 0%, #dce7ff 38%, #9fbaff 72%, #4d79f6 100%);
  border: 1px solid #dce6fb;
  overflow: hidden;
  position: relative;
}
```

Important:

- Blue gradients should be inside the mockup area, not on the whole card.
- Gradient should look layered and soft.
- Use white foreground app/window panels over the gradient.
- Avoid too many small details.

### Card Footer

```css
.card-footer {
  height: 95px;
  padding: 18px 20px;
  display: grid;
  grid-template-columns: 44px 1fr 44px;
  align-items: center;
  gap: 14px;
  border-top: 1px solid #edf0f4;
}
```

Footer icon:

```css
.footer-icon {
  width: 44px;
  height: 44px;
  border-radius: 999px;
  border: 1px solid #dfe3ea;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #0b0d12;
  background: #ffffff;
}
```

Footer title:

```css
.card-title {
  font-size: 18px;
  line-height: 1.2;
  font-weight: 600;
  color: #0b0d12;
  letter-spacing: -0.025em;
}
```

Footer description:

```css
.card-desc {
  margin-top: 4px;
  font-size: 14px;
  line-height: 1.35;
  color: #667085;
}
```

Footer arrow:

```css
.card-arrow {
  width: 44px;
  height: 44px;
  border-radius: 999px;
  border: 1px solid #dfe3ea;
  background: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #0b0d12;
}
```

---

## 8. Product Card 1 — Websites That Convert

Footer text:

```txt
Websites that convert
Fast, responsive, and built for results.
```

### Inner Mockup

Create a realistic mini website panel on top of the blue gradient.

Panel size inside preview:

```css
.website-window {
  position: absolute;
  left: 34px;
  top: 26px;
  width: calc(100% - 68px);
  height: 190px;
  border-radius: 12px;
  background: rgba(255,255,255,0.94);
  border: 1px solid rgba(255,255,255,0.78);
  box-shadow: 0 18px 35px rgba(36, 83, 255, 0.13);
  overflow: hidden;
}
```

Content:

- Tiny brand at top-left: `NEXORA`.
- Mini nav at top-right: `Work`, `Services`, `About`, `Blog`, `Contact`.
- `Contact` appears as a tiny blue pill.
- Main heading:

```txt
We build brands
that drive growth
```

- Supporting copy:

```txt
Digital experiences that convert
visitors into customers.
```

- Buttons: `Get started` blue, `See our work` white.
- Right visual: pale abstract folded/wave shape, very subtle.
- Bottom stat strip with three cells:
  - `+250%` / `Traffic growth`
  - `4.8x` / `Higher conversions`
  - `98/100` / `Performance score`

### Style Notes

- Keep text readable but small.
- Use dark text, gray meta text, very small blue icons.
- Avoid excessive shadows or color noise.

---

## 9. Product Card 2 — AI Workflow Automation

Footer text:

```txt
AI workflow automation
Intelligent flows that save time and scale.
```

### Inner Mockup

Create a clean automation workflow editor.

Panel size:

```css
.workflow-window {
  position: absolute;
  left: 32px;
  top: 24px;
  width: calc(100% - 64px);
  height: 194px;
  border-radius: 12px;
  background: rgba(255,255,255,0.95);
  border: 1px solid rgba(255,255,255,0.78);
  box-shadow: 0 18px 35px rgba(36, 83, 255, 0.12);
  display: grid;
  grid-template-columns: 116px 1fr;
}
```

Left sidebar:

```txt
Workflows
Overview
Flows  [selected]
Logs
Settings
```

Main area:

- Top row title: `Lead nurture flow`
- Small status chip: `Active`
- Top-right button: `Publish`
- Flow steps vertically centered:
  1. `New lead captured`
  2. `Send welcome email`
  3. `Qualify lead`
- Steps connected with thin blue vertical line and small circular nodes.
- Each step is a white rounded rectangle with light border.

### Style Notes

- Reduce clutter versus the earlier version.
- Make the workflow feel like a polished product editor.
- Use only 3 primary steps.

---

## 10. Product Card 3 — Product UI/UX Design

Footer text:

```txt
Product UI/UX design
Interfaces people love to use.
```

### Inner Mockup

Create a clean analytics dashboard panel.

Panel size:

```css
.dashboard-window {
  position: absolute;
  left: 30px;
  top: 24px;
  width: calc(100% - 60px);
  height: 194px;
  border-radius: 12px;
  background: rgba(255,255,255,0.95);
  border: 1px solid rgba(255,255,255,0.78);
  box-shadow: 0 18px 35px rgba(36, 83, 255, 0.12);
  display: grid;
  grid-template-columns: 64px 1fr;
}
```

Left sidebar:

- Small blue abstract icon at top.
- Menu items with icons:
  - `Overview` selected
  - `Analytics`
  - `Messages`
  - `Settings`

Main content:

- Title: `Overview`
- Top-right chip: `This month`
- KPI cards:
  - `Revenue` / `$120,540` / `+12.5%`
  - `Users` / `8,432` / `+8.1%`
  - `Conversion rate` / `3.92%` / `+4.7%`
- Small blue sparklines in each KPI card.
- Bottom left: `Recent activity`
- Bottom right: donut chart `72% Active users`

### Style Notes

- Keep chart lines thin.
- Use very light borders.
- Avoid dense labels.

---

## 11. Trust Row

Position directly beneath cards.

```css
.trust {
  margin-top: 26px;
  text-align: center;
}

.trust-text {
  font-size: 14px;
  color: #7b8494;
  margin-bottom: 18px;
}

.logo-row {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 28px;
  color: #8a93a3;
  font-size: 18px;
  font-weight: 600;
}
```

Text:

```txt
Trusted by startups and growing teams worldwide
```

Logo names:

```txt
Leafline | Frontier | stackly | Brightlane | novu | cloudly
```

Style:

- Muted gray only.
- Logos are not the focus.
- Use simple placeholder icons beside names.

---

## 12. Exact Content Inventory

### Navbar

```txt
Comlabs Technologies
Services
Solutions
Case studies
Insights
Contact
Start a project
```

### Hero

```txt
Your website.
Your best salesperson.

We design high-converting websites, craft product experiences,
and build AI-powered systems that help startups and growing companies grow.

Book a call
Explore services
```

### Cards

```txt
Websites that convert
Fast, responsive, and built for results.

AI workflow automation
Intelligent flows that save time and scale.

Product UI/UX design
Interfaces people love to use.
```

### Trust

```txt
Trusted by startups and growing teams worldwide
Leafline
Frontier
stackly
Brightlane
novu
cloudly
```

---

## 13. Responsive Behavior

Although the screenshot is desktop-first, provide basic responsiveness.

### Tablet: `768px–1199px`

- Navbar links may reduce gap to `28px`.
- Hero H1: `56px`.
- Cards grid: `1fr`, stacked or `2 columns` if space permits.
- Content padding: `32px`.

### Mobile: `<768px`

- Hide center nav links behind a menu button.
- Navbar height: `64px`.
- Hero H1: `42px`.
- Subtitle: `16px`.
- CTA buttons stack vertically full width.
- Cards stack one column.
- Remove most dotted accents.

---

## 14. Pixel-Perfect Priorities

When generating, prioritize these in order:

1. Navbar resemblance to the Antigravity-style reference.
2. Two-line centered H1 with exact copy.
3. White space and visual breathing room.
4. Three equally sized product cards.
5. Realistic, crisp mini product mockups.
6. Minimal blue usage.
7. Thin borders and soft shadows.
8. Muted trust logo row.

---

## 15. Negative Instructions

Do not:

- Add an eyebrow/tag above the H1.
- Use a dash in the H1.
- Use bright blue across large page areas.
- Add heavy gradients behind the whole hero.
- Add overly complex UI mockups.
- Use dark mode.
- Add extra sections below the trust row.
- Make the CTA row huge or flashy.
- Add stock photography.
- Add glassmorphism-heavy effects.
- Make the cards look like generic AI dashboard art.

---

## 16. Stitch AI Generation Prompt

Use this prompt directly in Stitch AI:

```txt
Create a pixel-perfect desktop landing page hero for Comlabs Technologies based on this Design.md specification. Use a light premium SaaS studio aesthetic. The navbar should closely match the supplied Antigravity-style reference, adapted with Comlabs branding: left logo and wordmark, centered nav links, and a black pill CTA on the right. The hero must be centered, highly breathable, and use the exact H1: “Your website. Your best salesperson.” Use the exact subtitle and CTA labels. Below the CTAs, create three crisp product mockup cards for websites, AI workflow automation, and product UI/UX design. Each card should have a white outer container, subtle border, soft shadow, and a realistic app/window mockup over a restrained blue layered gradient preview area. Keep blue usage minimal except for CTA, logo accents, tiny icons, chart lines, and mockup gradients. Finish with muted trust text and logo placeholders. Do not add additional sections.
```

---

## 17. Implementation Notes for Code Generation

- Build as a single hero section component.
- Use CSS variables for all tokens.
- Use SVG or CSS shapes for simple icons.
- Use CSS gradients for the blue layered mockup backgrounds.
- Use pure HTML/CSS mockups instead of image screenshots when possible.
- All cards should align exactly at the same height and baseline.
- Use `max-width` containers rather than full-width stretched content.
- Do not use arbitrary spacing values.

