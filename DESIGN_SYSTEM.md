# Practice Buddy — Design System

**Version:** 1.1 — Standalone Identity  
**Status:** Authoritative — all front-end components must comply

---

## 1. Brand Identity

Practice Buddy is a **standalone educational practice platform** with a distinct visual identity. It is **not** an AEEG product. The brand is:

- **Dark Navy Blue** primary — `#1a237e`
- **Gold** accent — `#f5a623`
- **No purple** — the AEEG purple is not used
- **Student-first** — the product prioritizes the student practice experience over B2B/institutional marketing

---

## 2. Visual Principles

1. **Clarity** — Primary task dominates the screen
2. **Readability** — Typography is infrastructure, not decoration
3. **Uncluttered** — No decorative cards, borders, gradients, shadows, badges, or animations
4. **Low cognitive load** — Predictable, consistent, obvious actions
5. **Age-neutral** — Friendly + modern + professional + calm (not childish, not intimidating)
6. **Distinct identity** — Not AEEG. Not purple. Dark blue + gold.

---

## 3. Color System

### 3.1 Brand Colors

| Token | HEX | Usage |
|-------|-----|-------|
| `--color-primary` | `#1a237e` | Primary actions, header, active states |
| `--color-primary-hover` | `#151b64` | Primary button hover |
| `--color-primary-active` | `#101450` | Primary button active |
| `--color-primary-foreground` | `#ffffff` | Text on primary backgrounds |
| `--color-secondary` | `#0d2137` | Deep navy for depth |
| `--color-secondary-hover` | `#0a1a2c` | Secondary hover |
| `--color-secondary-foreground` | `#ffffff` | Text on secondary backgrounds |
| `--color-accent` | `#f5a623` | Gold — CTAs, highlights |
| `--color-accent-hover` | `#d4921e` | Accent hover |
| `--color-accent-foreground` | `#1a1a2e` | Text on accent backgrounds |

### 3.2 Semantic Colors

| Token | HEX | Meaning |
|-------|-----|---------|
| `--color-success` | `#16a34a` | Correct answer |
| `--color-error` | `#dc2626` | Incorrect answer |
| `--color-warning` | `#d97706` | Warning, second attempt |
| `--color-info` | `#2563eb` | Hints, strategies |

**Rule:** Green = correct. Red = incorrect. Never use semantic colors as decoration.

---

## 4. Product Scope

Practice Buddy is a **student-first** practice platform. It does NOT include:

- Diagnostic tests
- Blog or news sections
- Marketing pages (about, contact, FAQs, pricing comparison)
- B2B marketing landing pages
- AEEG branding or identity

The homepage is a **student dashboard** — not a marketing site.

---

## 5. Typography

System font stack only. No custom webfonts.

- Question text: 18px (1.125rem), weight 500, line-height 1.6
- Body: 16px (1rem), weight 400, line-height 1.5
- Labels: 14px (0.875rem), weight 600

---

## 6. Component Specs

- **Button**: min-height 44px, radius 0.375rem, font-weight 600
- **Card**: bg white, border 1px, radius 0.5rem, shadow-sm
- **Question Container**: bg white, max-width 45rem, centered, padding 1.5rem
- **Answer Choice**: full-width row, min-height 48px, border 1px
- **Touch targets**: 44×44px minimum

---

## 7. Navigation

Student navigation is minimal: Home, Practice, SAT, Subjects, Login/Profile
No marketing pages. No diagnostic. No blog. No contact.

---

## 8. Accessibility

- WCAG AA minimum
- Color never communicates meaning alone (always + icon + text)
- Keyboard navigation with visible focus ring
- Respect `prefers-reduced-motion`