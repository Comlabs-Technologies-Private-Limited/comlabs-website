This is the public-facing website for a software agency that ships SaaS products, SAP integrations, MVPs, landing pages, and mobile apps. The bar is: someone opens this and immediately thinks "these people built Vercel's site."

DESIGN PHILOSOPHY
This is refined typographic minimalism with surgical motion. Not a portfolio. Not a startup template. A conversion machine that feels like it was designed by one obsessive person over three months. Every pixel has a reason. Restraint is the aesthetic — but where you move, you move with precision.
Reference points: Linear.app, Vercel.com, Resend.com, Raycast.com. Study them. The thing they share: negative space is intentional, type does the heavy lifting, motion is never decorative.

TYPEFACE SYSTEM
Font family: Inter (Google Fonts import)
Letter spacing: -0.025em globally (tracking-tight), tighten to -0.04em on hero display sizes
Weight system:
  - Display headings (hero, section titles): font-medium (500)
  - UI labels, nav, captions: font-normal (400)
  - NEVER: font-bold, font-semibold, font-extrabold — not once, not anywhere
Line height:
  - Display: leading-none or leading-tight (1 or 1.1)
  - Body: leading-relaxed (1.625)
  - UI/labels: leading-none
Size scale (use only these, nothing in between):
  - Hero headline: clamp(3rem, 8vw, 7rem)
  - Section title: clamp(1.75rem, 3vw, 2.5rem)
  - Body: 0.9375rem (15px)
  - Caption/label: 0.75rem (12px)

COLOR SYSTEM
css/* Light mode — DEFAULT */
--bg-primary:     #f5f5f5        /* neutral-100, never pure white */
--bg-surface:     #ffffff        /* card surfaces */
--bg-overlay:     rgba(255,255,255,0.7) /* frosted glass panels */
--fg-primary:     oklch(21% 0.006 285.885)  /* ~#1a1a1f, near-black with blue undertone */
--fg-secondary:   oklch(45% 0.006 285.885)  /* muted text */
--fg-tertiary:    oklch(65% 0.006 285.885)  /* disabled, captions */
--border:         oklch(90% 0.003 285.885)  /* hairline borders */
--border-strong:  oklch(82% 0.004 285.885)

/* Dark mode */
--bg-primary:     #0a0a0a
--bg-surface:     #111111
--bg-overlay:     rgba(17,17,17,0.8)
--fg-primary:     #f5f5f5
--fg-secondary:   oklch(65% 0.006 285.885)
--fg-tertiary:    oklch(40% 0.006 285.885)
--border:         oklch(20% 0.004 285.885)
--border-strong:  oklch(28% 0.004 285.885)

/* Accent — used once, with intent */
--accent:         oklch(21% 0.006 285.885)  /* same as fg, accent IS the brand */
No blue. No purple. No gradients on backgrounds. The only gradient lives on buttons. Monochromatic palette — the sophistication comes from oklab precision, not hue variety.

BUTTON SYSTEM
Primary CTA:
jsx<button className="
  rounded-full
  bg-linear-to-b from-neutral-800 to-neutral-950
  px-5 py-2
  text-[13px] tracking-tight text-white
  shadow-[0px_0.5px_0px_0px_var(--color-neutral-700)_inset,0px_8px_8px_0px_var(--color-neutral-900)]
  [text-shadow:0_1px_2px_rgba(0,0,0,0.4)]
  transition-all duration-150
  hover:from-neutral-700 hover:to-neutral-900
  hover:shadow-[0px_0.5px_0px_0px_var(--color-neutral-600)_inset,0px_12px_12px_0px_var(--color-neutral-900)]
  active:scale-[0.97]
">
  Get Started
</button>
Ghost / Secondary:
jsx<button className="
  rounded-full
  border border-neutral-200 dark:border-neutral-800
  bg-white/60 dark:bg-white/5
  px-5 py-2
  text-[13px] tracking-tight
  text-neutral-700 dark:text-neutral-300
  shadow-sm shadow-black/5
  backdrop-blur-sm
  transition-all duration-150
  hover:bg-white dark:hover:bg-white/10
  hover:border-neutral-300 dark:hover:border-neutral-700
  active:scale-[0.97]
">
  View Work
</button>
Rule: every button has active:scale-[0.97] and duration-150. No exceptions. The snap back is part of the feel.

FORM FIELD SYSTEM
jsx<input className="
  w-full rounded-xl
  bg-white dark:bg-neutral-900
  px-4 py-2.5
  text-[14px] text-neutral-900 dark:text-neutral-100
  placeholder:text-neutral-400 dark:placeholder:text-neutral-600
  ring-1 ring-black/10 dark:ring-white/10
  shadow-md shadow-black/[0.06]
  outline-none
  transition-all duration-150
  focus:ring-2 focus:ring-black/20 dark:focus:ring-white/20
  focus:shadow-lg focus:shadow-black/10
" />
The ring-to-shadow layering gives a subtle but premium depth. On focus, the shadow expands — the field breathes.

CANVAS TEXT ANIMATION
Hero section uses a <canvas> element behind the headline. Behaviour:

Draw 20–28 thin lines (lineWidth: 0.5–1px), color rgba(0,0,0,0.04) light / rgba(255,255,255,0.04) dark
Each line flows horizontally with a sine wave vertical offset, slowly drifting leftward at 0.15px/frame
Lines have varying amplitude (12–40px) and frequency (0.003–0.012)
On dark mode toggle, lines crossfade opacity via a targetOpacity lerp
Canvas fills 100% of hero height, pointer-events-none, position: absolute, z-index: 0
The actual headline text sits above at z-index: 10
Canvas redraws on requestAnimationFrame, cleans up on unmount

This should feel like heat shimmer — barely perceptible until you stare at it.

FRAMER MOTION — INTERACTION GRAMMAR
The rule: motion communicates state change. Not decoration. If removing an animation makes the UI clearer, remove it.
Global easing: [0.25, 0.1, 0.0, 1.0] — fast start, smooth finish. Never ease-in. Never bounce outside of intentional moments.
Patterns to implement:
jsx// 1. NAV ACTIVE INDICATOR
// Pill underline that slides between links
<motion.div layoutId="nav-pill" className="absolute inset-0 bg-neutral-100 dark:bg-neutral-800 rounded-full" />

// 2. SECTION REVEAL — stagger children
const container = { hidden: {}, show: { transition: { staggerChildren: 0.07 } } }
const item = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25,0.1,0,1] } } }

// 3. HERO PARALLAX
const { scrollY } = useScroll()
const heroY = useTransform(scrollY, [0, 500], [0, -80])
const heroOpacity = useTransform(scrollY, [0, 300], [1, 0])

// 4. CARD HOVER
whileHover={{ y: -3, transition: { duration: 0.2, ease: [0.25,0.1,0,1] } }}

// 5. DRAGGABLE BADGE (hero decoration)
<motion.div
  drag
  dragConstraints={{ top: 0, right: 0, bottom: 0, left: 0 }}
  dragTransition={{ bounceStiffness: 400, bounceDamping: 20 }}
  dragElastic={0.15}
  whileDrag={{ scale: 1.05, cursor: "grabbing" }}
  whileHover={{ scale: 1.02 }}
/>

// 6. SERVICE CARD EXPAND (layoutId)
// Clicking a service card expands it to a modal with shared layoutId on the card container and title

// 7. SCROLL PROGRESS
const { scrollYProgress } = useScroll()
// Thin 1px progress line at very top of viewport, scaleX from 0→1

// 8. PRICING TIER SWITCH
// AnimatePresence on billing toggle, cards re-animate price numbers with
// initial={{ opacity:0, y: -8 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:8 }}
DO NOT: use spring physics on page-load reveals. Do not rotate elements without reason. Do not animate font-size. duration on layout animations: 0.25s max.

PAGE ARCHITECTURE
Measure everything in this unit system: 4px base. Spacing is always a multiple of 4. Never odd numbers.

1. NAVBAR

Height: 52px, position: fixed, full width
Background: bg-[var(--bg-primary)]/80 backdrop-blur-xl
Bottom border: border-b border-[var(--border)] that fades in on scroll (useScroll opacity 0→1 at scrollY > 20)
Logo: text mark, font-medium, 15px, tracking-tight
Nav links: 13px, font-normal, text-[var(--fg-secondary)], hover text-[var(--fg-primary)], duration-100
Active state: layoutId="nav-pill" background pill behind active item
Right side: dark mode toggle (sun/moon, 16px icon, whileTap={{ rotate: 20 }}), ghost button, primary button
Mobile: hamburger at <768px, AnimatePresence slide-down menu, initial={{ opacity:0, y:-8 }} animate={{ opacity:1, y:0 }}


2. HERO

Height: 100svh, centered content, canvas behind
Eyebrow label: 12px, tracking-widest (exception to tight rule), uppercase, text-[var(--fg-tertiary)], with a 1px left border accent in var(--border-strong), pl-3
Headline: clamp(3rem, 8vw, 7rem), font-medium, leading-none, tracking-[-0.04em], max-width 18ch
Headline copy: "We build software that scales." — two lines, second line slightly indented (ml-[0.5ch])
Subhead: 15px, text-[var(--fg-secondary)], leading-relaxed, max-width 44ch, mt-6
CTA group: mt-10, flex gap-3, primary + ghost button
Draggable badge: bottom-right of hero, pill shape, text-[11px], reads "Available for projects", green 4px dot pulsing (animate={{ scale: [1,1.4,1], opacity:[1,0.6,1] }}), transition: repeat Infinity, duration: 2
Scroll cue: bottom-center, small ↓ in var(--fg-tertiary), animate={{ y: [0,4,0] }} loop
useScroll + useTransform: headline translates 0 → -80px, opacity 1 → 0 as user scrolls past


3. MARQUEE LOGOS STRIP

Single row, infinite scroll leftward
12 placeholder tech/client logos: geometric SVG marks, 24px height, var(--fg-tertiary) fill, opacity-40
Speed: 30s linear infinite
Fade masks on left/right edges: [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]
No hover states. This is atmosphere, not interactive.


4. SERVICES

Section label: eyebrow pattern same as hero
Title: "What we ship."
Grid: grid-cols-1 sm:grid-cols-2 lg:grid-cols-3, gap-4
6 cards: SaaS Development, SAP Integration, MVP in 4 Weeks, Landing Pages, Mobile Apps, Custom Software
Card anatomy:

bg-[var(--bg-surface)], rounded-2xl, p-6
ring-1 ring-black/[0.06] dark:ring-white/[0.06]
shadow-sm shadow-black/[0.04]
Icon: 20px, geometric, stroke-width-1.5, var(--fg-secondary)
Title: 15px, font-medium, mt-4, text-[var(--fg-primary)]
Description: 13px, text-[var(--fg-secondary)], mt-1.5, leading-relaxed
whileHover={{ y: -3 }}, transition duration-200
layoutId on card — clicking expands to overlay detail view with AnimatePresence




5. HOW IT WORKS (PROCESS)

4-step horizontal timeline on desktop, vertical on mobile
Steps connected by 1px dashed line in var(--border)
Number: 11px, font-medium, text-[var(--fg-tertiary)], inside 20px circle outline
Step title: 15px, font-medium
Description: 13px, text-[var(--fg-secondary)]
useInView stagger: each step reveals opacity 0→1, y 12→0 with 0.1s delay increment
Steps: Discovery → Architecture → Build → Ship


6. METRICS STRIP

3 numbers, inline, centered, border-y border-[var(--border)], py-16
Format: clamp(2.5rem, 5vw, 4.5rem) number, font-medium, tracking-tight — then 13px label below in var(--fg-secondary)
Examples: 48+ Projects Shipped, 4 weeks Avg MVP Time, 100% On-time Delivery
Numbers count up via useInView + custom useCounter hook on first visibility


7. PRICING

Monthly / Annual toggle: AnimatePresence cross-fade on price values
3 tiers: Starter, Growth, Enterprise
Middle card (Growth): bg-[var(--fg-primary)], text inverted — the contrast IS the hierarchy
All three cards same height, same border radius (rounded-2xl)
layoutId="pricing-card-{tier}" — clicking expands to detail view
CTA in each card: primary button (inverted on dark middle card)


8. CONTACT / FOOTER

Split: left 48% is headline + subhead + social links. Right 52% is contact form
Form: Name, Email, "What are you building?" textarea, submit (primary button, full width)
All inputs use the ring + shadow system defined above
Social: GitHub, Twitter/X, LinkedIn — 16px icons, text-[var(--fg-tertiary)], hover:text-[var(--fg-primary)], duration-100
Bottom bar: border-t border-[var(--border)], pt-6, copyright left, nav links right, all 12px, var(--fg-tertiary)


SCROLL PROGRESS INDICATOR
1px line, top of viewport, position: fixed, z-50, bg-[var(--fg-primary)], scaleX driven by useScroll().scrollYProgress. transformOrigin: "0%". Nothing else. Invisible until scroll begins.

DARK MODE IMPLEMENTATION
jsxconst [dark, setDark] = useState(false)
// Root div: className={dark ? 'dark' : ''}
// Canvas: recompute line color on dark change
// Toggle: whileTap={{ rotate: 15 }} on the icon wrapper
No localStorage, no system preference detection — keep it simple, toggle is the UI.

WHAT THIS IS NOT

No hero image or stock photography
No gradients on section backgrounds — var(--bg-primary) everywhere
No cards with colored top borders
No emojis in UI
No font-bold anywhere, not even once
No purple, no blue, no "SaaS purple"
No skeleton loaders, no spinners — this page loads fast
No scroll-jacking, no full-screen section snap
Motion never plays twice on the same element in the same session


THE SINGLE MOST IMPORTANT THING
If you removed every animation and every shadow, this page should still look exceptional. The motion is seasoning. The typography, spacing, and color system is the food. Build the food first.