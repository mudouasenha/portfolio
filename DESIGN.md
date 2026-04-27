# Design System — Personal Portfolio

## 1. Visual Theme & Atmosphere

The portfolio is a warm editorial canvas with a quiet, professional confidence — closer to a refined magazine spread than a typical developer site. The design pairs an elegant serif display face (Cormorant Garamond) with a geometric sans-serif (Manrope) to create a literary-meets-modern tension. Every heading reads like a book title; every body line reads like a well-typeset paragraph.

The signature move is the deep navy primary (`oklch(0.44 0.09 231)`) anchoring all CTAs and accents against a warm cream surface (`oklch(0.97 0.012 85)`) — not pure white, not cold. Ambient radial glows in primary blue and teal accent create atmospheric depth without heavy decoration. A subtle 24px grid texture fades vertically across the background, adding dimension to an otherwise clean canvas.

Glass-like frosted effects (`backdrop-blur`) on the navbar and cards, combined with large negative-spread shadows, give the layout a layered, spatial quality. Pill-shaped navigation links and badges, generous whitespace, and staggered scroll-driven animations create a composed, unhurried experience.

**Key Characteristics:**
- Warm cream background (`oklch(0.97 0.012 85)`) — never pure white
- Deep navy primary for authority and trust — not playful, not corporate
- Dual typeface contrast: Cormorant Garamond (serif) for headings, Manrope (sans) for body
- Ambient radial color glows (primary + accent) for atmospheric depth
- Frosted-glass navbar and cards via backdrop-blur
- Pill-shaped interactive elements (nav links, buttons, badges)
- Editorial whitespace pacing with generous section separation
- Staggered Framer Motion entrance animations on scroll

## 2. Color Palette & Roles

### Primary
- **Deep Navy** (`oklch(0.44 0.09 231)` / `#1e3a8a`): The core brand color — used for primary CTAs, accents, and high-emphasis interactive elements. Professional, trustworthy, and deliberately restrained.
- **Cream Background** (`oklch(0.97 0.012 85)` / `#f4f2ec`): The page canvas — a warm, parchment-like surface with a subtle yellow-green tint. Never pure white.

### Accent
- **Teal Blue** (`oklch(0.88 0.03 212)` / `#a8c8e0`): A lighter, cooler accent for tag backgrounds, subtle highlights, and secondary interactive surfaces.
- **Accent Text** (`oklch(0.22 0.03 235)` / `#2b3655`): Deep blue-gray for text on accent surfaces.

### Surface & Background
- **Card Surface** (`oklch(0.985 0.008 80)` / `#faf8f4`): Slightly warmer and lighter than the page background — used for cards and elevated containers.
- **Secondary Surface** (`oklch(0.93 0.016 80)` / `#eae7e0`): Warm sand-toned surface for secondary backgrounds.
- **Muted Surface** (`oklch(0.945 0.01 80)` / `#efede7`): The quietest surface — hover states, subtle backgrounds.
- **Dark Background** (`oklch(0.145 0 0)` / `#1a1a1a`): Dark-theme page background.
- **Dark Card** (`oklch(0.205 0 0)` / `#333333`): Dark-theme card surface.

### Neutrals & Text
- **Primary Text** (`oklch(0.23 0.02 45)` / `#353230`): Headlines and body text — a warm near-black with brown undertone.
- **Secondary Text** (`oklch(0.28 0.03 45)` / `#44413f`): Text on secondary surfaces.
- **Muted Text** (`oklch(0.49 0.02 50)` / `#767370`): Metadata, descriptions, and de-emphasized content.
- **Dark Theme Text** (`oklch(0.985 0 0)` / `#fafafa`): Primary text on dark surfaces.

### Borders & Input
- **Border Standard** (`oklch(0.87 0.012 70)` / `#d9d5cc`): Warm light gray for all light-theme borders.
- **Border Input** (`oklch(0.9 0.01 75)` / `#e3e0d8`): Slightly softer border for input fields.
- **Border Dark** (`oklch(1 0 0 / 10%)` / `rgba(255,255,255,0.10)`): Borders on dark surfaces.

### Semantic
- **Error** (`oklch(0.577 0.245 27.325)` / `#dc2626`): Destructive and error states.
- **Focus Ring** (`oklch(0.5 0.08 228)` / `#4a73a8`): Input focus indicators.

### Background Effects
- **Radial accent glow**: Top of page — `color-mix(in oklch, var(--accent) 28%, transparent)` fading at 38%
- **Ambient primary glow**: Top — `var(--primary)` radial gradient, 26rem height, 25% opacity
- **Ambient accent glow**: Bottom-left — `var(--accent)` radial gradient, 20rem × 24rem, 30% opacity
- **Subtle grid overlay**: 24px × 24px lines at 8% opacity, vertical fade mask

## 3. Typography Rules

### Font Families
- **Headings / Display**: `Cormorant Garamond`, serif — Google Fonts, weights 500/600/700
- **Body / UI**: `Manrope`, sans-serif — Google Fonts, weights 400/500/600/700/800
- **Fallbacks**: `Georgia` (serif), `system-ui` (sans)

### Hierarchy

| Role | Font | Size | Weight | Line Height | Letter Spacing | Notes |
|------|------|------|--------|-------------|----------------|-------|
| Display / Hero | Cormorant Garamond | 36px → 48px → 60px (sm → lg) | 600 (semibold) | 0.94 | -0.03em | Responsive scaling, tight leading |
| Section Heading | Cormorant Garamond | 36px → 48px (sm) | 600 (semibold) | 1.0 (none) | -0.03em | Section anchors |
| Sub-heading | Cormorant Garamond | 24px → 30px | 600 (semibold) | 1.0 (none) | -0.03em | Experience/project titles |
| Eyebrow / Kicker | Manrope | 12px | 600 (semibold) | default | 0.24em–0.28em | Uppercase, wide tracking |
| Subtitle Badge | Manrope | 11px | 600 (semibold) | default | 0.18em | Small uppercase labels |
| Body Large | Manrope | 16px → 18px (sm) | 400 (regular) | 1.625 (relaxed) | -0.01em | Intro and feature paragraphs |
| Body Standard | Manrope | 14px → 16px (sm) | 400 (regular) | 1.625 (relaxed) | -0.01em | Standard body text |
| Navigation Link | Manrope | 11px → 12px (2xl) | 600 (semibold) | default | 0.14em | Uppercase pill links |
| Tag Label | Manrope | 14px | 500 (medium) | default | -0.01em | Skill/tech tags |
| Small Label | Manrope | 10px → 11px (xl) | 400 (regular) | default | 0.14em–0.18em | Tiny uppercase labels |

### Principles
- **Serif for presence, sans for utility**: Cormorant Garamond carries all display and heading content with an editorial gravitas. Manrope handles all functional text — navigation, body, labels.
- **Tight heading letter-spacing**: All headings use `-0.03em` tracking for a refined, condensed feel.
- **Wide tracking on uppercase kickers**: Eyebrow text at 12px uses `0.24em–0.28em` tracking to maintain readability and create visual distinction.
- **Relaxed body line-height**: Body text uses `1.625` line-height — generous and readable.
- **Responsive type scaling**: Hero scales across three breakpoints (36 → 48 → 60px), section headings across two (36 → 48px).

## 4. Component Stylings

### Buttons (shadcn/ui CVA)

**Primary**
- Background: Deep Navy (`var(--primary)`)
- Text: Card Surface (`var(--primary-foreground)`)
- Height: 36px (default), 40px (lg)
- Padding: 10px horizontal
- Radius: 10px base, commonly overridden to `rounded-full` (pill)
- Focus: `ring-3 ring-ring/50`
- Hover: `bg-primary/80`
- Active press: `translate-y-px`

**Outline**
- Background: transparent
- Text: Primary Text (`var(--foreground)`)
- Border: `border-border`
- Shadow: `shadow-xs`
- Hover: `bg-muted`

**Ghost**
- Background: transparent
- Text: inherited
- Hover: `bg-muted text-foreground`

**Link**
- Text: Deep Navy (`var(--primary)`)
- Underline offset: 4px
- Hover: underline

**Destructive**
- Background: Error at 10% opacity
- Text: Error color
- Hover: Error at 20% opacity

### Cards (SectionCard)
- Background: Card Surface at 95% opacity (`bg-card/95`)
- Border: `1px border-border/90`
- Radius: `1.4rem` (22.4px)
- Shadow: `0 18px 40px -26px rgba(33,39,56,0.45)`
- Backdrop blur: `4px`
- **Featured variant**: `border-primary/20 bg-primary/[0.045]` — subtle navy tint

### Navigation (Sticky Navbar)
- Position: `sticky top-0 z-40`
- Background: Card Surface at 80% opacity, 95% when scrolled
- Border: `border-b border-border/80`
- Backdrop blur: `12px` (medium)
- Scrolled shadow: `0 20px 60px -40px rgba(31,38,56,0.45)` (triggered at 20px scroll)
- Container: `max-w-7xl` (1280px), `min-h-20` (80px)
- Desktop links: pill-shaped (`rounded-full`), uppercase, `11px` semibold, `0.14em` tracking
- Mobile: Sheet drawer, `w-[min(22rem,100vw)]`

### Tags (Skill/Tech)
- Background: Teal Blue accent (`var(--accent)`)
- Text: Accent foreground (`var(--accent-foreground)`)
- Border: `border-border`
- Radius: `8px` (rounded-lg)
- Padding: `8px 8px` (px-2 py-1)
- Hover: `bg-accent/80`
- Transition: `300ms all`

### Language Switcher
- Container: pill-shaped, `border-border/80`, `bg-background/90`, `shadow-xs`
- Active button: Primary variant (navy fill)
- Inactive button: Ghost variant
- Size: `28px` height, pill-shaped, `11px` uppercase semibold

### Hero Portrait Frame
- Outer decorative border: `rounded-[1.75rem] border-primary/15`
- Decorative blur circles: `bg-accent/70 blur-2xl` and `bg-primary/10 blur-2xl`
- Card frame: `rounded-[1.75rem] border-border/90 bg-card/90 p-2.5`
- Shadow: `0 24px 70px -42px rgba(28,36,60,0.45)`
- Inner image: `rounded-[1.25rem]`

### Contact Inner Panel
- `rounded-[1.2rem] border-border/80 bg-background/70 p-5`

## 5. Layout Principles

### Spacing System
- Base unit: 4px (Tailwind default)
- Section bottom padding: 56px → 64px (sm)
- Section top padding: 16px
- Section header margin: 36–40px
- Card internal padding: 16px → 20px (sm) → 24px (sm)
- Grid gaps: 8px, 12px, 16px, 20px, 28px
- Navbar bottom margin: 48px
- Scroll anchor offset: 112px (`scroll-mt-28`)

### Grid & Container
- Max container width: 1280px (`max-w-7xl`), centered
- Hero: 2-column grid `lg:grid-cols-[minmax(0,1.08fr)_minmax(280px,0.82fr)]`
- About: 2-column grid `lg:grid-cols-[0.4fr_1fr]` (header), `[0.95fr_1.05fr]` (content)
- Experience: sidebar + content `lg:grid-cols-[170px_1fr]`
- Projects: 3-column grid `lg:grid-cols-3`
- Skills: responsive `md:grid-cols-2 xl:grid-cols-3`
- Certifications: `md:grid-cols-2`
- Contact: `lg:grid-cols-[1.2fr_0.8fr]`
- Horizontal padding: 16px → 24px (sm) → 32px (lg)

### Whitespace Philosophy
- **Editorial pacing**: Large section padding (56–64px) creates natural reading pauses between content blocks.
- **Bordered section separation**: `border-b border-border` between sections replaces heavy spacing with a refined divider.
- **Breathing room in cards**: 16–24px internal padding with relaxed line-height gives content space to breathe.

### Border Radius Scale
- Base token (`--radius`): `0.625rem` (10px)
- Small tags: `8px` (rounded-lg)
- Standard buttons: `10px` (var --radius)
- Contact panel: `19.2px` (1.2rem)
- Section cards: `22.4px` (1.4rem)
- Hero portrait / About image: `28px` (1.75rem–1.8rem)
- Nav links, CTA buttons, badges: `rounded-full` (pill)

## 6. Depth & Elevation

| Level | Treatment | Use |
|-------|-----------|-----|
| Flat (Level 0) | No shadow, no blur | Page background, inline text |
| Contained (Level 1) | `1px solid border-border/90` | Standard cards, section separators |
| Blurred (Level 2) | `backdrop-blur-sm` (4px) + border | Section cards with frosted-glass effect |
| Elevated (Level 3) | `0 18px 40px -26px rgba(33,39,56,0.45)` | Featured cards, elevated content |
| Hero (Level 4) | `0 24px 70px -42px rgba(28,36,60,0.45)` | Hero portrait frame, hero elements |
| Navbar (Level 5) | `backdrop-blur-md` (12px) + shadow on scroll | Sticky navigation |

**Shadow Philosophy**: All shadows use a consistent pattern — large negative spread (`-26px` to `-42px`) with warm dark blue-gray (`rgba(28-39,36-38,56-60,0.45)`) creating soft, ambient depth rather than sharp directional shadows. This produces a floating, diffused feel.

### Decorative Depth
- **Ambient color glows**: Radial gradients in primary and accent colors at 25–30% opacity create atmospheric depth fields behind content.
- **Frosted glass**: `backdrop-blur` on navbar and cards makes surfaces feel layered and spatial.
- **Subtle grid texture**: 24px grid lines at 8% opacity add dimension to the background canvas.

## 7. Do's and Don'ts

### Do
- Use the warm cream background (`oklch(0.97 0.012 85)`) as the primary light surface — pure white is only for specific button surfaces
- Use Cormorant Garamond (serif) exclusively for headings and display text — never for body
- Use Manrope (sans) exclusively for body, navigation, labels, and UI text
- Keep all neutrals warm-toned — grays should have a yellow-brown undertone
- Use the deep navy primary for CTAs and highest-emphasis interactive elements
- Use large negative-spread shadows for soft, ambient elevation — never sharp drop shadows
- Apply `backdrop-blur` to navbar and cards for the frosted-glass spatial quality
- Use `rounded-full` (pill shape) for navigation links, CTA buttons, and badges
- Maintain generous section spacing (56–64px) for editorial pacing
- Use staggered entrance animations with `viewport: { once: true }` for scroll-driven reveals
- Respect `prefers-reduced-motion` — all animations should gracefully degrade

### Don't
- Don't use pure white (`#ffffff`) as a page background — always prefer the warm cream
- Don't use Cormorant Garamond for body text or UI elements — serif is for headings only
- Don't introduce saturated or chromatic colors beyond the navy/teal palette
- Don't use sharp corners (< 6px radius) on interactive elements — softness is core to the identity
- Don't use heavy, directional drop shadows — depth comes from negative-spread ambient shadows
- Don't apply animations without reduced-motion fallbacks
- Don't mix heading typefaces — Cormorant Garamond is the singular display voice
- Don't reduce body line-height below 1.5 — the generous spacing supports readability
- Don't use cool blue-grays — all neutrals must carry warmth
- Don't add decorative elements beyond the ambient glows and grid texture — restraint is the aesthetic

## 8. Responsive Behavior

### Breakpoints

| Name | Width | Key Changes |
|------|-------|-------------|
| Mobile | <640px | Single column, mobile nav drawer (Sheet), reduced heading sizes |
| Small (sm) | ≥640px | Text size scaling begins, wider padding (24px) |
| Medium (md) | ≥768px | 2-column grids for skills, certifications |
| Large (lg) | ≥1024px | Full 2-column layouts (Hero, About, Experience, Contact), desktop nav visible |
| Extra Large (xl) | ≥1280px | 3-column skills grid, max container reached |
| 2XL | ≥1536px | Nav link text sizing bump |

### Touch Targets
- Buttons: minimum 36px height (default), 24px (xs), 40px (lg)
- Navigation links: pill-shaped with generous padding (`px-3 py-2`)
- Cards: entire surface serves as touch target
- Minimum recommended: 44×44px for primary interactive elements

### Collapsing Strategy
- **Navigation**: Desktop horizontal nav → mobile Sheet drawer (`w-[min(22rem,100vw)]`)
- **Hero layout**: 2-column grid → stacked single column
- **Section grids**: Multi-column → progressive collapse to single column
- **Hero text**: 60px → 48px → 36px progressive scaling
- **Section padding**: Reduces proportionally (56px → 64px bottom)
- **Card padding**: Reduces from 24px to 16px

### Image Behavior
- Hero portrait and About image scale within rounded containers
- Project images scale proportionally
- Ambient glows resize with viewport
- Grid texture maintains 24px spacing at all sizes

## 9. Agent Prompt Guide

### Quick Color Reference
- Brand CTA: "Deep Navy (`oklch(0.44 0.09 231)`)"
- Page Background: "Cream (`oklch(0.97 0.012 85)`)"
- Card Surface: "Card (`oklch(0.985 0.008 80)`)"
- Primary Text: "Primary Text (`oklch(0.23 0.02 45)`)"
- Muted Text: "Muted (`oklch(0.49 0.02 50)`)"
- Accent Tag: "Teal Blue (`oklch(0.88 0.03 212)`)"
- Borders (light): "Border (`oklch(0.87 0.012 70)`)"
- Error: "Error (`oklch(0.577 0.245 27.325)`)"

### Example Component Prompts
- "Create a hero section on Cream background (`oklch(0.97 0.012 85)`) with a headline in Cormorant Garamond at 60px weight 600, line-height 0.94, letter-spacing -0.03em. Use Primary Text color. Add a subtitle in Manrope at 18px weight 400, line-height 1.625, in Muted Text. Place a Deep Navy CTA button with pill radius (rounded-full) and Card Surface text."
- "Design a SectionCard on Card Surface at 95% opacity with 1px border-border/90, 1.4rem radius, and shadow `0 18px 40px -26px rgba(33,39,56,0.45)`. Add backdrop-blur-sm. Title in Cormorant Garamond at 24px weight 600, body in Manrope at 14px weight 400, Muted Text color."
- "Build a sticky navbar with bg-background/80, backdrop-blur-md, border-b border-border/80. Desktop nav links as pills: rounded-full, 11px Manrope semibold uppercase, 0.14em tracking, Muted Text, hover bg-card/80 text-foreground. Add scrolled shadow at 20px: `0 20px 60px -40px rgba(31,38,56,0.45)`."
- "Create a tag/badge with Teal Blue accent background, Accent Text foreground, 8px radius, 8px horizontal padding, Manrope 14px medium. Hover: bg-accent/80, 300ms transition."
- "Design a featured project card with border-primary/20, bg-primary/[0.045] subtle navy tint, 1.4rem radius. Include an image at rounded-[1.2rem], title in Cormorant Garamond, and staggered entrance animation (y:18, opacity:0 → y:0, opacity:1)."

### Iteration Guide
1. Focus on ONE component at a time
2. Reference specific color names — "use Muted Text (`oklch(0.49 0.02 50)`)" not "make it gray"
3. Always specify warm-toned variants — no cool grays
4. Describe serif vs sans usage explicitly — "Cormorant Garamond for the heading, Manrope for the body"
5. For shadows, use the negative-spread ambient pattern — "shadow: `0 18px 40px -26px rgba(33,39,56,0.45)`" not "add a shadow"
6. Specify the background surface — "on Cream (`oklch(0.97 0.012 85)`)" or "on Card Surface (`oklch(0.985 0.008 80)`)"
7. Use pill shapes (`rounded-full`) for navigation, CTAs, and badges — not standard rounded corners
8. Always include reduced-motion fallbacks for animations
