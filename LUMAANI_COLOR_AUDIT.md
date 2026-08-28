# Lumaani Color Audit

> **✅ OWNER SELECTED (2026-08-28): OPTION 5 — Deep Teal + Copper.** Primary `#0b4f4a`,
> Accent `#c8785a`, Secondary `#29374a`. The canonical palette referenced below as
> `#0d4f4f`/`#e8b84b` has been superseded by Option 5; all legacy-family removals in this
> audit remain valid and were applied against the Option 5 tokens.

> **Registry:** Audit of every active color in the Lumaani platform.
> **Source:** `~/projects/practicebuddy` @ `8e00ec2` (branch `main`).
> **Date:** 2026-08-28
> **Canonical target:** `LUMAANI_DESIGN_SYSTEM.md` — "Luminous" Deep Teal `#0d4f4f` + Warm Gold `#e8b84b`.

---

## 1. Executive Summary

Lumaani's **canonical design system** is Deep Teal `#0d4f4f` + Warm Gold `#e8b84b`
(the "Luminous" direction). However, the production codebase is **not synchronized** to it:

- **The logo & all PWA icons still use LEGACY INDIGO `#1a237e` + LEGACY ORANGE `#f5a623`**
  (the old Practice Buddy / AEEG brand). The brand's own assets contradict the product palette.
- **= 5 competing substitute families** are in active use:
  Legacy Navy `#1e2761`, Legacy Indigo `#1a237e`, Legacy Dark Navy `#0d2137`,
  Legacy Neon-Orange Gold `#f5a623` (122 usages — the worst offender), and Legacy Purple `#3a1a9c`.
- **`button.tsx` "secondary" variant is hardcoded to legacy navy** `#0d2137`/`#0a1a2c`,
  not the secondary token `#1a3a4a`.
- The legacy **orange gold `#f5a623`** appears **122×** — more than all other legacy colors combined.
- Legacy **purple `#3a1a9c`** appears in practice/ai-tutor/question-preview (AEEG contamination).

---

## 2. Canonical Tokens (from `globals.css` `@theme` + `tailwind.config.ts`)

| Token | CSS Variable | Hex | Role |
|-------|-------------|-----|------|
| Primary | `--color-primary` | `#0d4f4f` | Brand — buttons, links, active nav |
| Primary Hover | `--color-primary-hover` | `#0a3d3d` | Brand |
| Primary Active | `--color-primary-active` | `#072e2e` | Brand |
| Primary Foreground | `--color-primary-foreground` | `#ffffff` | Brand |
| Secondary | `--color-secondary` | `#1a3a4a` | Brand — secondary actions |
| Secondary Hover | `--color-secondary-hover` | `#142e3a` | Brand |
| Accent | `--color-accent` | `#e8b84b` | Brand — highlights, awards |
| Accent Hover | `--color-accent-hover` | `#d4a43c` | Brand |
| Accent Foreground | `--color-accent-foreground` | `#1a1a2e` | Brand |
| Background | `--color-background` | `#f4f6f9` | Neutral |
| Surface | `--color-surface` | `#ffffff` | Neutral (cards) |
| Elevated | `--color-elevated` | `#fafafa` | Neutral |
| Border / Input | `--color-border` / `--color-input` | `#e2e6ed` | Neutral |
| Foreground | `--color-foreground` | `#1a1a2e` | Neutral text |
| Muted | `--color-muted` | `#9ca3af` | Neutral text |
| Muted Foreground | `--color-muted-foreground` | `#6b7280` | Neutral text |
| Ring | `--color-ring` | `#0d4f4f` | Focus |
| Success | `--color-success` | `#16a34a` | Semantic (correct) |
| Success Light | `--color-success-light` | `#dcfce7` | Semantic |
| Error | `--color-error` | `#dc2626` | Semantic (incorrect) |
| Error Light | `--color-error-light` | `#fef2f2` | Semantic |
| Warning | `--color-warning` | `#d97706` | Semantic |
| Warning Light | `--color-warning-light` | `#fef3c7` | Semantic |
| Info | `--color-info` | `#2563eb` | Semantic (hints) — **system blue, justified** |
| Info Light | `--color-info-light` | `#dbeafe` | Semantic |
| Destructive | `--color-destructive` | `#dc2626` | Semantic |

**Note:** `info = #2563eb` is a *semantic/system* blue, not legacy brand — retain as the authorized
information color (per Khan Academy concept: info/blue is a system color, not a brand accent).

---

## 3. Active Color Inventory (all hex values found in `src/`)

### 3.1 Legacy Brand Substitutes — REMOVE / REPLACE ⚠️

| Hex | Name | Count | Files | Classification |
|-----|------|------:|-------|----------------|
| `#f5a623` | Legacy Neon-Orange Gold | **122** | practice, map-prep (all), ai-tutor, sat-prep, dashboard | **LEGACY BRAND** → replace with `--color-accent` |
| `#1e2761` | Legacy Navy | 23 | practice, map-prep (all), ai-tutor | **LEGACY BRAND** → replace with `--color-primary` |
| `#1a237e` | Legacy Indigo | 16 | **logo + all PWA icons + favicon** | **LEGACY BRAND** → replace with `--color-primary` |
| `#0d2137` | Legacy Dark Navy | 11 | button.tsx, map-prep (all) | **LEGACY BRAND** → replace with `--color-secondary` |
| `#3a1a9c` | Legacy Purple (AEEG) | 5 | practice, ai-tutor, question-preview | **LEGACY BRAND** → remove to neutral or primary |
| `#0a1a2c` | Legacy Near-Black Navy | 1 | button.tsx (secondary hover) | **LEGACY BRAND** → replace |
| `#151b64` | Legacy Navy (wireframes) | 1 | MOBILE_WIREFRAMES.html | Historical doc — leave |

### 3.2 Brand / System Hexes in main `src` (include `globals.css`)

| Hex | Count | Files | Classification |
|-----|------:|-------|----------------|
| `#0d4f4f` | 217 | button, layout, globals, practice/dashboard | **BRAND** ✓ |
| `#e8b84b` | 11 | button, globals, sat-prep, practice layout | **BRAND** ✓ |
| `#0a3d3d` | 4 | button, globals, sat-prep | **BRAND** ✓ (hover) |
| `#1a1a2e` | 4 | button, globals | **NEUTRAL** ✓ (accent fg / foreground) |
| `#dc2626` | 3 | globals, wires | **SEMANTIC** error ✓ |
| `#16a34a` | 2 | globals | **SEMANTIC** success ✓ |
| `#2553eb`→`#2563eb` | — | globals | **SEMANTIC** info ✓ |
| `#d4a43c` | 2 | button, globals | **BRAND** ✓ (accent hover) |
| `#f4f6f9`/`#fafafa`/`#e2e6ed`/`#6b7280`/`#9ca3af` | 1 each | globals | **NEUTRAL** ✓ |

### 3.3 Chart / Data-Visualization Colors (justified exceptions)

| Hex | Location | Classification |
|-----|----------|----------------|
| `#10b981` (emerald) | results-dashboard.tsx | **DATA VIZ** — success/positive trend |
| `#ef4444` (red-500) | results-dashboard.tsx | **DATA VIZ** — negative trend |
| `#f5a623`/`#0d4f4f`/`#16a34a`/`#7c3aed` (purple-400) | charts | **DATA VIZ** — replace `#f5a623` with accent token; purple needed for chart contrast |

### 3.4 Utility / Third-Party (leave)

- `#25d366`, `#20bd5a` — WhatsApp brand green (third-party)
- `#666666` — system/muted SVG (globe, window, file)
- `#1b2a4a`, `#2c4068`, `#c9a84c` — OG image (marketing asset)
- `#4720b7` — practice-buddy logo SVG (legacy asset, not in active UI)

---

## 4. Legacy Blue / Navy / Purple / Orange Classification

Per Phase 3 rules:

| Color | Classification | Action |
|-------|----------------|--------|
| `#1a237e` (logo, icons, favicon) | **LEGACY BRAND BLUE** | **REMOVE** → `#0d4f4f` |
| `#1e2761` (practice, map-prep, ai-tutor) | **LEGACY BRAND BLUE** | **REMOVE** → `--color-primary` |
| `#0d2137` (button secondary, map-prep) | **LEGACY BRAND BLUE** | **REMOVE** → `--color-secondary` |
| `#0a1a2c` (button secondary hover) | **LEGACY BRAND BLUE** | **REMOVE** → `--color-secondary-hover` |
| `#f5a623` (across product) | **LEGACY BRAND ORANGE** | **REMOVE** → `--color-accent` |
| `#3a1a9c` (purple) | **LEGACY BRAND PURPLE** | **REMOVE** → neutral / primary |
| `#2563eb` (info) | **SEMANTIC INFORMATION BLUE** | **RETAIN** — system info color |
| Chart blues/purples/reds/greens | **DATA VISUALIZATION** | **RETAIN** (accessible chart palette) |

---

## 5. Green System Evaluation

- Single canonical green family: **Deep Teal `#0d4f4f`** (hsl ≈ `180, 69%, 18%`).
  Actually a **teal** (blue-green), sits at the "trust + learning + technology"
  intersection — a strong, underrepresented position in edtech (Khan & Duolingo = green,
  IXL & Quizlet = blue).
- **No competing greens found** in `src` — the green system is internally consistent.
  The inconsistency is *not* between greens but between **teal (correct) vs navy/indigo
  (legacy blue) vs neon-orange (legacy accent)**.
- No overly-neon or overly-dark green issues in the canonical tokens.

---

## 6. Conclusion

The fix is **not** a blue→teal global replace. It is a **unification** of 5 wayward legacy
families (navy indigo `#1a237e`, navy `#1e2761`, dark navy `#0d2137`, purple `#3a1a9c`,
neon-orange `#f5a623`) into the canonical 3-family system
(**Brand**: teal+gold, **Neutral**: whites/grays, **Semantic**: green/red/amber/blue) — with
the **logo and PWA icons rebuilt** to the canonical teal+gold. Semantic info-blue and
data-viz colors are retained as authorized exceptions.