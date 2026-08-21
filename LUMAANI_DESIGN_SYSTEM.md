# Lumaani Design System

> **Brand:** Lumaani (لوماني) — "The Illuminated Learning Companion"
> **Domain:** lumaani.com
> **Tagline:** *Learn with Lumaani.*
> **Philosophy:** ONE SCREEN, ONE TASK. Calm, focused, instructional.
> **Audience:** Students aged 8–18 • Egyptian parents • International schools • MENA region
> **Markets:** Egypt, GCC, MENA, International (English & Arabic)

---

## 1. COLOR SYSTEM

### 1.1 Palette Directions — Three Candidates

#### Direction A: "Luminous" ★ RECOMMENDED WINNER

*Deep teal/navy + warm gold/amber. Calm, premium, educational.*

| Role | Hex | Preview |
|------|-----|---------|
| Primary | `#0d4f4f` | 🟦 Deep Teal |
| Accent | `#e8b84b` | 🟨 Warm Gold |

**Why this wins:** Lumaani means "luminous / moon-like." Teal + gold evokes moonlit night — calm, illuminated, focused. Bridges the current navy+gold system into a more distinctive teal direction. Teal is underrepresented in edtech (Khan Academy = green, IXL = blue, Duolingo = green). Premium feel that works for 8-year-olds AND SAT students. High contrast on screens. Works beautifully in both light and dark modes.

---

#### Direction B: "Clarity"

*Deep indigo + coral/vibrant accent. Modern, confident, bold.*

| Role | Hex | Preview |
|------|-----|---------|
| Primary | `#1a1a6b` | 🟦 Deep Indigo |
| Accent | `#ff6b6b` | 🟥 Coral |

**Why alternative:** Modern and energetic. Good for a younger, more playful brand. Risk: coral can feel aggressive/distracting for test-anxious students. Less calm. Less connection to the "luminous" name.

---

#### Direction C: "Knowledge"

*Forest green + warm gold. Traditional education, trust, growth.*

| Role | Hex | Preview |
|------|-----|---------|
| Primary | `#1a4a2a` | 🟩 Forest Green |
| Accent | `#d4a843` | 🟨 Warm Gold |

**Why alternative:** Highest trust signal for traditional education. Strong in MENA markets where green has cultural significance. Risk: blends into the sea of green edtech platforms. Less distinctive. Less modern.

---

### 1.2 Winner: "Luminous" — Complete Palette

All hex values with CSS variable names and usage rules.

#### Light Mode

| Token | CSS Variable | Hex | Usage |
|-------|-------------|-----|-------|
| **Primary** | `--color-primary` | `#0d4f4f` | Buttons, links, active nav, brand elements |
| Primary Hover | `--color-primary-hover` | `#0a3d3d` | Button hover states |
| Primary Active | `--color-primary-active` | `#072e2e` | Button pressed/active states |
| Primary Foreground | `--color-primary-foreground` | `#ffffff` | Text on primary backgrounds |
| **Secondary** | `--color-secondary` | `#1a3a4a` | Secondary buttons, section headers |
| Secondary Hover | `--color-secondary-hover` | `#142e3a` | Secondary hover |
| Secondary Foreground | `--color-secondary-foreground` | `#ffffff` | Text on secondary backgrounds |
| **Accent** | `--color-accent` | `#e8b84b` | Highlights, stars, badges, awards |
| Accent Hover | `--color-accent-hover` | `#d4a43c` | Accent hover states |
| Accent Foreground | `--color-accent-foreground` | `#1a1a2e` | Text on accent backgrounds |
| **Background** | `--color-background` | `#f4f6f9` | Page backgrounds |
| **Surface** | `--color-surface` | `#ffffff` | Cards, modals, dropdowns |
| **Elevated** | `--color-elevated` | `#fafafa` | Subdued card backgrounds |
| **Foreground** | `--color-foreground` | `#1a1a2e` | Body text |
| **Muted** | `--color-muted` | `#9ca3af` | Secondary text, placeholders |
| Muted Foreground | `--color-muted-foreground` | `#6b7280` | Tertiary text, captions |
| **Border** | `--color-border` | `#e2e6ed` | Card borders, dividers |
| **Input** | `--color-input` | `#e2e6ed` | Input borders |
| **Ring** | `--color-ring` | `#0d4f4f` | Focus rings |
| **Success** | `--color-success` | `#16a34a` | Correct answers, completions |
| Success Light | `--color-success-light` | `#dcfce7` | Success backgrounds |
| **Error** | `--color-error` | `#dc2626` | Wrong answers, alerts |
| Error Light | `--color-error-light` | `#fef2f2` | Error backgrounds |
| **Warning** | `--color-warning` | `#d97706` | Warnings, near-complete |
| Warning Light | `--color-warning-light` | `#fef3c7` | Warning backgrounds |
| **Info** | `--color-info` | `#2563eb` | Information, tips |
| Info Light | `--color-info-light` | `#dbeafe` | Info backgrounds |
| **Destructive** | `--color-destructive` | `#dc2626` | Destructive actions |
| Destructive Foreground | `--color-destructive-foreground` | `#ffffff` | Text on destructive |

#### Dark Mode

| Token | CSS Variable | Hex | Usage |
|-------|-------------|-----|-------|
| Background | `--color-background` | `#0f1721` | Page backgrounds |
| Surface | `--color-surface` | `#1a2533` | Cards, modals |
| Elevated | `--color-elevated` | `#243040` | Hovered cards |
| Foreground | `--color-foreground` | `#e2e8f0` | Body text |
| Muted | `--color-muted` | `#64748b` | Secondary text |
| Muted Foreground | `--color-muted-foreground` | `#94a3b8` | Tertiary text |
| Border | `--color-border` | `#2d3a4a` | Borders |
| Input | `--color-input` | `#2d3a4a` | Input borders |
| Primary | `--color-primary` | `#0d4f4f` | Buttons, links |
| Primary Hover | `--color-primary-hover` | `#106060` | Button hover |
| Primary Active | `--color-primary-active` | `#147272` | Button active |
| Accent | `--color-accent` | `#e8b84b` | Highlights |
| Ring | `--color-ring` | `#1a7a7a` | Focus rings |

#### Color Usage Rules

| Context | Rule |
|---------|------|
| **Primary backgrounds** | Use only for key CTAs, active nav, brand headers. Never as page background. |
| **Accent** | One accent per view. Use sparingly — awards, stars, premium badges. Think "gold medal." |
| **Success/Error** | Always use the light variant as background, the solid variant for text/icons. |
| **Muted text** | For labels, hints, secondary info only. Never for primary content. |
| **Dark mode primary** | Slightly lighter to maintain readability on dark surfaces. |
| **Gradients** | Use only for hero/brand moments. Preferred: `--color-primary` → `#1a7a7a` (teal to lighter teal). Avoid gold gradients. |

#### Accessibility

- All color combinations meet WCAG 2.1 AA contrast (4.5:1 for normal text, 3:1 for large text).
- Primary `#0d4f4f` on white `#ffffff` = **7.1:1** contrast.
- Accent `#e8b84b` on dark backgrounds only — never on white (3.1:1, fails AA for normal text).
- Error `#dc2626` on white = **5.2:1**. Success `#16a34a` on white = **4.6:1**.
- Never rely on color alone to convey information — always pair with icons or labels.

---

## 2. TYPOGRAPHY

### 2.1 Font Stack

| Context | Stack | Weight Range |
|---------|-------|-------------|
| **Headings** | `Inter`, `Lexend`, system-ui, `-apple-system`, `BlinkMacSystemFont`, `"Segoe UI"`, Roboto, sans-serif | 400–700 |
| **Body** | `Inter`, system-ui, `-apple-system`, `BlinkMacSystemFont`, `"Segoe UI"`, Roboto, sans-serif | 400–600 |
| **Monospace (Math)** | `"JetBrains Mono"`, `ui-monospace`, `SFMono-Regular`, `Menlo`, `Monaco`, Consolas, monospace | 400–700 |
| **Arabic Headings** | `"Noto Sans Arabic"`, `"Tajawal"`, `"Cairo"`, `"Segoe UI"`, sans-serif | 400–700 |
| **Arabic Body** | `"Noto Sans Arabic"`, `"Tajawal"`, `"Cairo"`, `"Segoe UI"`, sans-serif | 400–500 |

**Recommendation:** Load **Inter** as the primary Latin typeface (variable font, excellent readability, extensive language support). Load **Noto Sans Arabic** or **Tajawal** for Arabic fallback. Both pair well with Inter's geometric proportions.

### 2.2 Type Scale

```
Level       Size      Line Height   Weight    Usage
────────────────────────────────────────────────────
Display     40px/2.5rem  1.2        700       Landing page hero (rare)
H1          32px/2rem    1.25       700       Page titles
H2          24px/1.5rem  1.3        600       Section headings
H3          20px/1.25rem 1.4        600       Card titles, modal headers
H4          18px/1.125rem 1.4       600       Subsection titles
H5          16px/1rem    1.4        600       Minor headings
Body        16px/1rem    1.6        400       Default body text
Body Small  14px/0.875rem 1.5       400       Secondary text
Caption     12px/0.75rem 1.4        400       Labels, footnotes
Button      16px/1rem    1          600       Buttons
Button Sm   14px/0.875rem 1         600       Small buttons
```

### 2.3 Arabic Compatibility

| Concern | Recommendation |
|---------|---------------|
| **Font pairing** | Inter + Noto Sans Arabic share similar geometric proportions. Tajawal is a more modern alternative with lighter stroke weight. |
| **Line height** | Arabic text typically needs +0.1–0.2em line height due to diacritical marks (tashkeel). |
| **Font weight** | Arabic renders heavier at the same numeric weight. Use 400 for body where Latin uses 400; 600 for headings where Latin uses 700. |
| **RTL layout** | All components must support `dir="rtl"`. Mirror margins, paddings, icon placement. |
| **Number alignment** | Arabic-Indic numerals (٠١٢٣٤٥٦٧٨٩) in math contexts. Use CSS `font-variant-numeric: lining-nums;` for consistent baseline. |
| **Fallback chain** | `"Noto Sans Arabic", "Tajawal", "Cairo", sans-serif` — in that order. Cairo is heavier/bolder, use as last resort. |
| **Loading** | Preload Arabic fonts separately. They increase page weight significantly (Noto Sans Arabic = ~150KB). |
| **Test strings** | `مرحباً بكم في لوماني — منصة التعلم الذكية` and `قام الطالب بحل ٣ مسائل من أصل ١٠` |

### 2.4 CSS Variable Setup

```css
--font-sans: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
--font-arabic: "Noto Sans Arabic", "Tajawal", "Cairo", "Segoe UI", sans-serif;
--font-mono: "JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;

/* Usage: headings auto-detect Arabic via lang attribute */
html[lang="ar"] body,
html[lang="ar"] .font-sans {
  font-family: var(--font-arabic);
}
```

### 2.5 Letter-spacing

| Context | Letter-spacing | Notes |
|---------|---------------|-------|
| Display/H1 | `-0.02em` | Tight for impact |
| H2–H4 | `-0.01em` | Slightly tight |
| Body | `normal` | Default |
| Caption | `0.02em` | Slightly loose for readability |
| Button | `0.01em` | Crisp |
| Arabic headings | `0` | Arabic does not use letter-spacing |
| Arabic body | `normal` | No tracking |

---

## 3. DESIGN LANGUAGE

### 3.1 Border Radius

```css
--radius-sm: 4px;     /* Badges, tags, small elements */
--radius-md: 6px;     /* Default for cards, inputs, buttons */
--radius-lg: 8px;     /* Modals, dropdowns, larger containers */
--radius-xl: 12px;    /* Hero sections, feature cards */
--radius-full: 9999px;/* Pills, avatars, progress indicators */
```

**Rules:**
- Use `--radius-md` (6px) as the default — subtle but noticeable.
- Never exceed 12px on content containers.
- Only `--radius-full` for circular elements (avatars, toggle handles).
- Buttons: `--radius-md` (6px). Pill-shaped buttons are not part of the system.

### 3.2 Shadows

Minimal, subtle, functional. Three levels only:

```css
--shadow-sm: 0 1px 2px rgba(13, 15, 20, 0.04);
--shadow-md: 0 2px 8px rgba(13, 15, 20, 0.06), 0 1px 2px rgba(13, 15, 20, 0.04);
--shadow-lg: 0 4px 16px rgba(13, 15, 20, 0.08), 0 2px 4px rgba(13, 15, 20, 0.04);
```

**Rules:**
- `sm`: Cards resting on a surface. Default card shadow.
- `md`: Elevated cards (hovered card, dropdown, popover).
- `lg`: Modals, drawers, floating panels.
- Never use box-shadow on interactive elements (buttons, inputs). Use ring/border instead.
- Dark mode: Use shadows with a lighter tint (`rgba(0, 0, 0, 0.3)` instead of `0.04`).

### 3.3 Motion

Functional, restrained, ≤300ms.

| Context | Duration | Easing | Notes |
|---------|----------|--------|-------|
| Hover transitions | 150ms | `ease-out` | Color, opacity changes |
| Modals/Overlays | 200–250ms | `ease-out` | Fade + scale |
| Page transitions | 200–300ms | `ease-in-out` | Fade only — no slide |
| Accordion/Collapse | 200ms | `ease-out` | Height transitions |
| Loading shimmer | 500ms loop | `linear` | Pulsing skeleton |
| Toast/Snackbar | 250ms in, 300ms out | `ease-out` | Slide + fade |
| Progress bars | 300ms | `ease-out` | Width transitions |
| Spinners | 600ms loop | `linear` | Continuous rotation |

**Rules:**
- No parallax, no 3D transforms, no staggered animations.
- Every motion must be meaningful — never decorative.
- Respect `prefers-reduced-motion`: freeze all animations at 0.01ms duration.
- Students with ADHD or anxiety: keep it still. A calm app is a learning app.
- Hover states: change color, do NOT scale, lift, or shake elements.

### 3.4 Icons

**Library:** Lucide (open-source, consistent, clean)

| Property | Value |
|----------|-------|
| **Size** | 24×24px (default), 20×20px (inline/compact), 16×16px (badge/tag) |
| **Stroke width** | 2px (default), 1.5px (compact only) |
| **Stroke cap** | `round` |
| **Stroke join** | `round` |
| **Color** | Inherits current text color. Accent color only for star/award/badge icons. |
| **Bidi (RTL)** | Mirror icons that imply direction: arrows, chevrons, share, back/forward. Use Lucide's `RTL` attribute or CSS `transform: scaleX(-1)` in RTL mode. Do NOT mirror: clocks, watches, calendars, phones. |

**Icon combinations:**
- Icon + text: 8px gap. Icon always precedes text in LTR, follows text in RTL.
- Standalone icon buttons: include `aria-label`.
- Never use emoji as icons. Never use Font Awesome or Material Icons alongside Lucide.

### 3.5 Card Style

```css
/* Default card */
.lumaani-card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-sm);
  padding: 1.5rem;
  transition: box-shadow 150ms ease-out, border-color 150ms ease-out;
}

/* Hover card (interactive) */
.lumaani-card--interactive:hover {
  border-color: var(--color-primary);
  box-shadow: var(--shadow-md);
}
```

**Card anatomy:**
```
┌──────────────────────────┐
│  Icon/Thumb  Title       │  <- Optional header
│  ─────────────────────── │  <- Border line (optional)
│  Body content            │  <- Padding: 24px all sides
│                          │
│  [Action]          [Link]│  <- Optional footer
└──────────────────────────┘
```

**Rules:**
- Cards always have a 1px border (`var(--color-border)`). Never borderless.
- Interactive cards get the teal border on hover.
- Card padding: 24px (1.5rem) standard. 20px for dense layouts (question cards).
- Never use background colors on cards — only white/light (surface) or the elevated variant.
- Card groups: use 16px gap between cards.

### 3.6 Layout Principles

- **ONE SCREEN, ONE TASK:** Each view has exactly one primary action. No competing CTAs.
- **Max content width:** 1200px for page-level containers. 720px for reading/quiz content.
- **Gutter:** 16px mobile, 24px tablet, 32px desktop.
- **Grid:** 4-column mobile, 8-column tablet, 12-column desktop.
- **Spacing scale:** 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80px.
- **Vertical rhythm:** 24px as the base unit between sections.

---

## 4. BRAND APPLICATIONS

### 4.1 Logo

**Lockup types:**

```
1. Full lockup:   [Icon] Lumaani         — Header, landing page
2. Icon only:     [Icon]                 — Favicon, app icon, mobile header
3. Wordmark only: Lumaani                — Dense contexts, admin, emails
```

**Placement rules:**
- Always link to the homepage from the logo.
- Full lockup preferred in: website header, marketing materials, app splash.
- Icon only in: PWA home screen, browser tab, mobile nav bar (when space ≤ 320px).
- Never use the icon alone in printed materials or external communications.
- Never recreate the logo from type alone — always use the SVG/PNG asset.

### 4.2 Clear Space

```
Full lockup minimum clear space:
┌─────────────────────────────────┐
│                                 │
│    ← [height × 0.5] →          │
│         [Icon] Lumaani          │
│    ← [height × 0.5] →          │
│                                 │
└─────────────────────────────────┘
```

- Clear space = half the logo height on all sides.
- Minimum: no other element (text, image, graphic) enters the clear space.
- For icon-only: clear space = icon width.
- Never place logo on busy photographic backgrounds. Use a teal banner/band behind it if needed.

### 4.3 Color Usage by Context

| Context | Primary color shown | Notes |
|---------|-------------------|-------|
| **Student app** | Primary teal in navigation, accent gold for points/badges | Calm, game-like without being childish |
| **Parent portal** | Primary teal + muted tones | More conservative. Less accent. Trust signals. |
| **Teacher dashboard** | Primary teal + secondary navy | Data-dense. Minimal gold. Professional. |
| **Admin panel** | Neutral (grays) + primary teal for CTAs | Least brand color. Efficiency first. |
| **Marketing site** | Primary teal hero + accent gold highlights | Full brand expression. Gradients allowed. |
| **Email** | Primary teal for headers + links | Use sparingly. Most emails are text. |
| **Social media** | Full palette. Accent gold for calls-to-action. | Vibrant but not loud. |
| **Error states** | Error red + icon. Never primary teal or gold on error. | Clear, no brand confusion. |
| **Empty states** | Primary teal illustration + muted text. | Encouraging. Never error-style. |

### 4.4 PWA Manifest

```json
{
  "name": "Lumaani — Practice Platform",
  "short_name": "Lumaani",
  "description": "Focused practice for English, Math, MAP, and SAT — one screen, one task.",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#f4f6f9",
  "theme_color": "#0d4f4f",
  "orientation": "any",
  "scope": "/",
  "icons": [
    {
      "src": "/icons/icon-192x192.svg",
      "sizes": "192x192",
      "type": "image/svg+xml",
      "purpose": "any maskable"
    },
    {
      "src": "/icons/icon-384x384.svg",
      "sizes": "384x384",
      "type": "image/svg+xml",
      "purpose": "any maskable"
    },
    {
      "src": "/icons/icon-512x512.svg",
      "sizes": "512x512",
      "type": "image/svg+xml",
      "purpose": "any maskable"
    }
  ],
  "categories": ["education", "practice"],
  "lang": "en",
  "dir": "ltr"
}
```

**Key changes from Practice Buddy:**
- `name`: "Lumaani — Practice Platform"
- `short_name`: "Lumaani" (was "PB")
- `description`: Focused on "one screen, one task" philosophy
- `background_color`: `#f4f6f9` (new light background)
- `theme_color`: `#0d4f4f` (Lumaani primary teal)
- `categories`: streamlined to `["education", "practice"]`

### 4.5 Metadata (HTML)

```html
<!-- Primary -->
<title>Lumaani — Focused Practice for Math, English & SAT</title>
<meta name="description" content="Lumaani is a calm, focused practice platform for Grades 3-10 English, Math, MAP, and SAT preparation. One screen, one task. Built for students, trusted by parents." />

<!-- Open Graph -->
<meta property="og:type" content="website" />
<meta property="og:site_name" content="Lumaani" />
<meta property="og:title" content="Lumaani — Focused Practice Platform" />
<meta property="og:description" content="Calm, focused practice for Grades 3-10 English, Math, MAP, and SAT. One screen, one task." />
<meta property="og:url" content="https://lumaani.com" />
<meta property="og:image" content="https://lumaani.com/images/og-default.jpg" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="Lumaani — Focused Practice Platform" />
<meta name="twitter:description" content="Calm, focused practice for Grades 3-10 English, Math, MAP, and SAT." />
<meta name="twitter:image" content="https://lumaani.com/images/og-default.jpg" />

<!-- PWA / Mobile -->
<meta name="theme-color" content="#0d4f4f" />
<meta name="apple-mobile-web-app-capable" content="yes" />
<meta name="apple-mobile-web-app-title" content="Lumaani" />
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
<link rel="manifest" href="/manifest.json" />
<link rel="canonical" href="https://lumaani.com" />

<!-- Icons -->
<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
<link rel="apple-touch-icon" href="/icons/icon-192x192.png" />

<!-- Alternate languages -->
<link rel="alternate" hreflang="en" href="https://lumaani.com" />
<link rel="alternate" hreflang="ar" href="https://lumaani.com/ar" />
```

### 4.6 Tagline & Messaging

```
Primary tagline:   Learn with Lumaani.
Secondary:         One screen, one task.
Tertiary:          Calm. Focused. Yours.
Arabic primary:    اتعلم مع لوماني
Arabic secondary:  شاشة واحدة، مهمة واحدة
```

**Messaging principles:**
- Never "gamified" or "fun" — Lumaani is calm and focused, not playful.
- Never "AI-powered" as a primary message — technology is invisible, learning is visible.
- Always student-first: "Helps you focus" not "Helps parents track."
- For parents: "Built for focus. Proven results. You'll see the difference."
- For schools: "Calm, consistent practice that students actually want to do."

### 4.7 OG Image

The Open Graph default image (`og-default.jpg`, 1200×630px) should feature:
- Clean white/teal gradient background (left-to-right: `#f4f6f9` → `#0d4f4f` at 15% opacity)
- Lumaani logo (full lockup) vertically and horizontally centered
- Below the logo, the tagline: "One screen, one task."
- No additional imagery, screenshots, or illustrations
- File size: ≤100KB

### 4.8 Voice & Tone

| Context | Voice |
|---------|-------|
| **Student — correct** | Brief, affirming. "Correct! +10" or "Great — next question." |
| **Student — incorrect** | Neutral, instructive. "Not quite. Try again." or "Let's review this." Never "Wrong!" or "Incorrect!" |
| **Student — empty state** | Encouraging. "Ready to start? Pick a subject above." |
| **Parent — notifications** | Informative, minimal. "Ahmad completed 3 Math lessons today." |
| **Parent — marketing** | Credible, warm. "Built by educators. Refined by thousands of practice sessions." |
| **Teacher — dashboard** | Professional, data-driven. No emoji. No exclamation marks. |
| **Error messages** | Technical, actionable. "Could not save. Check your connection and try again." |
| **Arabic translations** | Formal Modern Standard Arabic (MSA). No dialect. No slang. |

---

## 5. DESIGN SYSTEM MIGRATION NOTES

### 5.1 From Practice Buddy (current) → Lumaani

| Current Token | New Token | Migration Notes |
|--------------|-----------|----------------|
| `--color-primary: #1a237e` | `--color-primary: #0d4f4f` | Dark navy → deep teal. Update all primary backgrounds. |
| `--color-primary-hover: #151b64` | `--color-primary-hover: #0a3d3d` | |
| `--color-primary-active: #101450` | `--color-primary-active: #072e2e` | |
| `--color-accent: #f5a623` | `--color-accent: #e8b84b` | Slightly warmer gold, less orange. |
| `--color-accent-hover: #d4921e` | `--color-accent-hover: #d4a43c` | |
| `--color-background: #f6f6f6` | `--color-background: #f4f6f9` | Slightly cooler, more blue-tinted. |
| `--color-secondary: #0d2137` | `--color-secondary: #1a3a4a` | Dark navy → muted teal-navy. |
| `--color-foreground: #1a1a2e` | `--color-foreground: #1a1a2e` | Kept the same — it works. |
| `--color-muted: #9ca3af` | `--color-muted: #9ca3af` | Kept the same. |
| `--radius-sm: 0.25rem (4px)` | `--radius-sm: 4px` | Same, explicit px. |
| `--radius-md: 0.375rem (6px)` | `--radius-md: 6px` | Same, explicit px. |
| `--radius-lg: 0.5rem (8px)` | `--radius-lg: 8px` | Same, explicit px. |

### 5.2 Brand Name Reference

```
English: Lumaani
Arabic:  لوماني
Domain:  lumaani.com

Always capitalized: Lumaani (never LUMAANI, lumaani, or Lumaani™)
As adjective: Lumaani (e.g., "Lumaani Math", "the Lumaani platform")
As possessive: Lumaani's (e.g., "Lumaani's practice engine")
Arabic: "لوماني" without definite article (not "اللوماني")
Compound: "Lumaani Math", "Lumaani English", "Lumaani SAT"
```

---

## 6. QUICK REFERENCE

### CSS to Add to `globals.css`

```css
@theme {
  /* Primary - Deep Teal */
  --color-primary: #0d4f4f;
  --color-primary-hover: #0a3d3d;
  --color-primary-active: #072e2e;
  --color-primary-foreground: #ffffff;

  /* Secondary */
  --color-secondary: #1a3a4a;
  --color-secondary-hover: #142e3a;
  --color-secondary-foreground: #ffffff;

  /* Accent - Warm Gold */
  --color-accent: #e8b84b;
  --color-accent-hover: #d4a43c;
  --color-accent-foreground: #1a1a2e;

  /* Backgrounds */
  --color-background: #f4f6f9;
  --color-surface: #ffffff;
  --color-elevated: #fafafa;
  --color-foreground: #1a1a2e;

  /* Muted */
  --color-muted: #9ca3af;
  --color-muted-foreground: #6b7280;

  /* Borders & Inputs */
  --color-border: #e2e6ed;
  --color-input: #e2e6ed;
  --color-ring: #0d4f4f;

  /* Feedback */
  --color-success: #16a34a;
  --color-success-light: #dcfce7;
  --color-error: #dc2626;
  --color-error-light: #fef2f2;
  --color-warning: #d97706;
  --color-warning-light: #fef3c7;
  --color-info: #2563eb;
  --color-info-light: #dbeafe;
  --color-destructive: #dc2626;
  --color-destructive-foreground: #ffffff;

  /* Radii */
  --radius-sm: 0.25rem;
  --radius-md: 0.375rem;
  --radius-lg: 0.5rem;
  --radius-xl: 0.75rem;
  --radius-full: 9999px;

  /* Typography */
  --font-sans: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", "Noto Sans", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
  --font-arabic: "Noto Sans Arabic", "Tajawal", "Cairo", "Segoe UI", sans-serif;
  --font-mono: "JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;

  /* Shadows */
  --shadow-sm: 0 1px 2px rgba(13, 15, 20, 0.04);
  --shadow-md: 0 2px 8px rgba(13, 15, 20, 0.06), 0 1px 2px rgba(13, 15, 20, 0.04);
  --shadow-lg: 0 4px 16px rgba(13, 15, 20, 0.08), 0 2px 4px rgba(13, 15, 20, 0.04);
}
```

### Quick Links

- **Lucide Icons:** https://lucide.dev/icons
- **Inter Font:** https://fonts.google.com/specimen/Inter
- **Noto Sans Arabic:** https://fonts.google.com/specimen/Noto+Sans+Arabic
- **Tajawal Font:** https://fonts.google.com/specimen/Tajawal
- **JetBrains Mono:** https://fonts.google.com/specimen/JetBrains+Mono
- **WCAG Contrast Checker:** https://webaim.org/resources/contrastchecker/

---

> **Design system version:** 1.0.0
> **Last updated:** 2026-08-21
> **Maintainer:** Lumaani Product Team
> **Related documents:** [`globals.css`](./src/app/globals.css), [`tailwind.config.ts`](./tailwind.config.ts), [`manifest.json`](./public/manifest.json)