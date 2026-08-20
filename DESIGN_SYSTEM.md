# Practice Buddy — Design System

**Version:** 1.0 — Phase 0 Architectural Revision  
**Status:** Authoritative — all front-end components must comply  
**Source:** AEEG Brand Identity (extracted 2026-08-16)

---

## 1. Brand Relationship

Practice Buddy is an independent educational SaaS product in the AEEG product family. The visual system inherits from AEEG but is purpose-built for educational technology.

```
AEEG Brand (authoritative)
  └── Practice Buddy Design System (educational software variant)
        └── Tenant Branding Layer (organization-specific: logo, primary)
```

### Inherited from AEEG:
- Primary: `#4720b7`
- Secondary: `#1e2761`
- Accent: `#f5a623`
- System font stack

### Modernized for Education:
- Expanded neutral palette for readability
- Dedicated semantic colors
- Larger spacing for touch targets
- Educational component library
- Role-specific navigation architecture

---

## 2. Visual Principles (in priority order)

1. **Clarity** — Primary task dominates the screen
2. **Readability** — Typography is infrastructure, not decoration
3. **Uncluttered** — No decorative cards, borders, gradients, shadows, badges, or animations
4. **Low cognitive load** — Predictable, consistent, obvious actions
5. **Age-neutral** — Friendly + modern + professional + calm (not childish, not intimidating)

---

## 3. Color System

### 3.1 Brand Colors

| Token | HEX | RGB | Usage |
|-------|-----|-----|-------|
| `--color-primary` | `#4720b7` | `71,32,183` | Primary actions, links, active states |
| `--color-primary-hover` | `#3a1a9a` | `58,26,154` | Primary button hover |
| `--color-primary-active` | `#2e157d` | `46,21,125` | Primary button active |
| `--color-primary-foreground` | `#ffffff` | `255,255,255` | Text on primary backgrounds |
| `--color-secondary` | `#1e2761` | `30,39,97` | Secondary actions, header backgrounds |
| `--color-secondary-hover` | `#161e4d` | `22,30,77` | Secondary hover |
| `--color-secondary-foreground` | `#ffffff` | `255,255,255` | Text on secondary backgrounds |
| `--color-accent` | `#f5a623` | `245,166,35` | Highlights, CTAs, selected states |
| `--color-accent-hover` | `#d4921e` | `212,146,30` | Accent hover |
| `--color-accent-foreground` | `#1e2761` | `30,39,97` | Text on accent backgrounds |

### 3.2 Neutral Palette

| Token | HEX | RGB | Usage |
|-------|-----|-----|-------|
| `--color-background` | `#f6f6f6` | `246,246,246` | Main page background |
| `--color-surface` | `#ffffff` | `255,255,255` | Cards, containers, question areas |
| `--color-elevated` | `#fafafa` | `250,250,250` | Secondary surfaces |
| `--color-border` | `#e5e7eb` | `229,231,235` | Dividers, borders |
| `--color-input` | `#e5e7eb` | `229,231,235` | Input borders |
| `--color-foreground` | `#281a39` | `40,26,57` | Primary body text |
| `--color-muted-foreground` | `#626262` | `98,98,98` | Secondary/helper text |
| `--color-muted` | `#9ca3af` | `156,163,175` | Placeholder, disabled text |
| `--color-disabled` | `#d1d5db` | `209,213,219` | Disabled backgrounds |

### 3.3 Semantic Colors

| Token | HEX | Meaning |
|-------|-----|---------|
| `--color-success` | `#16a34a` | Correct answer, completed |
| `--color-success-light` | `#dcfce7` | Success background tint |
| `--color-error` | `#dc2626` | Incorrect answer, error |
| `--color-error-light` | `#fef2f2` | Error background tint |
| `--color-warning` | `#d97706` | Warning, second attempt |
| `--color-warning-light` | `#fef3c7` | Warning background tint |
| `--color-info` | `#2563eb` | Information, hints, strategies |
| `--color-info-light` | `#dbeafe` | Info background tint |

**Rule:** Green = correct. Red = incorrect. Never use semantic colors as decoration.

---

## 4. Typography

### 4.1 Font Stack
```
--font-sans: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
             "Helvetica Neue", "Noto Sans", Arial, sans-serif,
             "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol",
             "Noto Color Emoji"
```

No custom webfonts. System stack = maximum performance, zero FOUT.

### 4.2 Type Scale

| Token | Size | Weight | Line Ht | Usage |
|-------|------|--------|---------|-------|
| `--text-display` | 2.5rem/40px | 700 | 1.2 | Page titles |
| `--text-h1` | 2rem/32px | 700 | 1.25 | Section headings |
| `--text-h2` | 1.5rem/24px | 600 | 1.3 | Card headings |
| `--text-h3` | 1.25rem/20px | 600 | 1.4 | Subsection headings |
| `--text-body-large` | 1.125rem/18px | 400 | 1.6 | Reading passages, question text |
| `--text-body` | 1rem/16px | 400 | 1.5 | Default body text |
| `--text-body-small` | 0.875rem/14px | 400 | 1.5 | Metadata, secondary |
| `--text-caption` | 0.75rem/12px | 400 | 1.4 | Captions, timestamps |
| `--text-label` | 0.875rem/14px | 600 | 1.4 | Form labels, buttons |
| `--text-question` | 1.125rem/18px | 500 | 1.6 | Question text |
| `--text-passage` | 1rem/16px | 400 | 1.75 | Extended reading |

---

## 5. Spacing System

4px grid basis. `--spacing` = 0.25rem.

| Token | Value | Usage |
|-------|-------|-------|
| `--space-1` | 0.25rem/4px | Tight icon gaps |
| `--space-2` | 0.5rem/8px | Micro spacing |
| `--space-3` | 0.75rem/12px | Small component gap |
| `--space-4` | 1rem/16px | Default component spacing |
| `--space-5` | 1.25rem/20px | Between grouped elements |
| `--space-6` | 1.5rem/24px | Section padding, card padding |
| `--space-8` | 2rem/32px | Between sections |
| `--space-10` | 2.5rem/40px | Page section gaps |
| `--space-12` | 3rem/48px | Major section separation |
| `--space-16` | 4rem/64px | Page padding |

---

## 6. Motion

- Maximum duration: 300ms
- Respect `prefers-reduced-motion`
- **DISALLOWED:** confetti, background animation, spinning logos, autoplay video, parallax, decorative continuous motion

---

## 7. Component Specifications

### 7.1 Button
- `--radius-md` (0.375rem), font-weight 600, min-height 44px
- Variants: default (primary), secondary, outline, ghost, accent, destructive

### 7.2 Card
- `--radius-lg` (0.5rem), bg white, border 1px, shadow-sm, padding 1.5rem

### 7.3 Input
- bg white, border 1px, radius-md, focus ring primary

### 7.4 Question Container
- bg white, radius-lg, padding 1.5rem, max-width 45rem, centered

### 7.5 Answer Choice
- Full-width row, min-height 48px, border 1px, radius-md
- Selected: 2px primary border, light tint
- Correct: 2px success border, success tint
- Incorrect: 2px error border, error tint
- Eliminated: opacity 0.4, strikethrough

---

## 8. Accessibility

- WCAG AA minimum
- Color never communicates meaning alone (always + icon + text)
- Touch targets: 44×44px minimum
- Keyboard navigation with visible focus ring
- Respect `prefers-reduced-motion`, `prefers-contrast: more`