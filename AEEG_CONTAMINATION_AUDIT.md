# AEEG Contamination Audit — Practice Buddy

**Date:** 2026-08-20
**Method:** Comprehensive codebase search (grep) + UI browser inspection
**Scope:** ~279 source files inspected, 276 TypeScript/TSX files

---

## Executive Summary

Practice Buddy has significant AEEG runtime coupling across **every layer** of the application. The contamination is not superficial—it reaches into routes, data files, navigation, i18n, API prompts, sitemap, layouts, components, and content copy.

**Total contaminating files found:** 64+
**Total out-of-scope routes:** 8
**Total out-of-scope data files:** 6
**Overall contamination severity:** CRITICAL

---

## 1. ROUTE CONTAMINATION (8 routes — REMOVE ALL)

These program routes belong to AEEG, not Practice Buddy (stand-alone):

| Route | File | Canonical URL | Classification |
|-------|------|--------------|----------------|
| `/act-prep` | `src/app/act-prep/page.tsx` | `aeeg.com/act-prep` | ❌ **REMOVE** |
| `/ielts-prep` | `src/app/ielts-prep/page.tsx` | `aeeg.com/ielts-prep` | ❌ **REMOVE** |
| `/toefl-prep` | `src/app/toefl-prep/page.tsx` | `aeeg.com/toefl-prep` | ❌ **REMOVE** |
| `/academic-english` | `src/app/academic-english/page.tsx` | `aeeg.com/academic-english` | ❌ **REMOVE** |
| `/ib` | `src/app/ib/page.tsx` | `aeeg.com/ib` | ❌ **REMOVE** |
| `/igcse` | `src/app/igcse/page.tsx` | `aeeg.com/igcse` | ❌ **REMOVE** |
| `/det` | `src/app/det/page.tsx` | `aeeg.com/det` | ❌ **REMOVE** |
| `/sat-prep` | `src/app/sat-prep/page.tsx` | `aeeg.com/sat-prep` | ⚠️ **REWRITE** (SAT in scope but page is AEEG marketing) |

Each of these routes has a layout file (`src/app/*/layout.tsx`) that references `aeeg.com` as its canonical URL:

```
Line ~7: canonical: "https://aeeg.com/<route>",
Line ~9: en: "https://aeeg.com/<route>",
Line ~10: ar: "https://aeeg.com/ar/<route>",
Line ~23: url: "https://aeeg.com",
Line ~25: url: "https://aeeg.com"
```

## 2. SITEMAP CONTAMINATION

| File | Issue | Classification |
|------|-------|----------------|
| `src/app/sitemap.ts` | Uses `aeeg.com` as base URL (line 4) | ❌ **REMOVE** |
| | Includes routes for act-prep, ielts-prep, toefl-prep, academic-english, ib, igcse, det | ❌ **REMOVE** |

## 3. NAVIGATION / HEADER CONTAMINATION

| File | Issue | Classification |
|------|-------|----------------|
| `src/components/layout/header.tsx` | Logo: `/aeeg-logo.svg` (line 82) | ❌ **REMOVE** |
| | Programs dropdown includes: ACT Prep, IELTS Prep, TOEFL Prep, IB Program, IGCSE English, Academic English, DET Prep (lines 26-34) | ❌ **REMOVE |
| `src/app/teacher/layout.tsx` | Title metadata includes "AEEG" association | ❌ **REMOVE** |
| `src/app/dashboard/layout.tsx` | References AEEG | ❌ **REMOVE** |

## 4. FOOTER CONTAMINATION

| File | Issue | Classification |
|------|-------|----------------|
| `src/components/layout/footer.tsx` | Logo: `/aeeg-logo.svg` (line 50) | ❌ **REMOVE** |
| | Platform links: ACT Prep, IELTS Prep, TOEFL Prep (lines 11-14) | ❌ **REMOVE** |

## 5. i18n / LOCALIZATION CONTAMINATION

| File | Issue | Classification |
|------|-------|----------------|
| `src/lib/i18n.tsx` | localStorage key: `aeeg-lang` (lines 25, 31) | ❌ **REMOVE** |
| | Navigation keys: nav.act, nav.ielts, nav.toefl, nav.ib, nav.igcse, nav.academicEnglish, nav.det (lines 57-64, English; 195-202 Arabic) | ❌ **REMOVE** |
| | Hero text references "American Egyptian Education Group" (line 76) | ❌ **REMOVE** |
| | Hero subtitle: "Expert SAT, ACT, IELTS & TOEFL preparation" (line 77) | ❌ **REMOVE** |
| | "Since 2011" tag (AEEG founding) | ❌ **REMOVE** |

## 6. DATA FILE CONTAMINATION (out of scope — REMOVE/QUARANTINE)

| File | Content | Classification |
|------|---------|----------------|
| `src/data/act-questions.ts` | 40 ACT diagnostic questions | ❌ **REMOVE** (out of scope) |
| `src/data/ielts-questions.ts` | 40 IELTS diagnostic questions | ❌ **REMOVE** (out of scope) |
| `src/data/toefl-questions.ts` | 40 TOEFL diagnostic questions | ❌ **REMOVE** (out of scope) |
| `src/data/est-igcse-questions.ts` | EST & IGCSE questions | ❌ **REMOVE** (out of scope) |
| `src/data/myp-dp-questions.ts` | MYP & DP (IB) questions | ❌ **REMOVE** (out of scope) |
| `src/data/placement-questions.ts` | Placement/PTE diagnostic questions | ❌ **REMOVE** (out of scope) |

## 7. CONTENT FILE CONTAMINATION (AEEG-specific marketing copy)

All of these files contain AEEG-specific marketing content, program descriptions, and business copy:

### English Content (REMOVE/REWRITE)
| File | Contains |
|------|----------|
| `src/content/en/act-prep.ts` | AEEG ACT prep marketing |
| `src/content/en/ielts-prep.ts` | AEEG IELTS prep marketing |
| `src/content/en/toefl-prep.ts` | AEEG TOEFL prep marketing |
| `src/content/en/academic-english.ts` | AEEG Academic English content |
| `src/content/en/ib.ts` | AEEG IB content |
| `src/content/en/igcse.ts` | AEEG IGCSE content |
| `src/content/en/det.ts` | AEEG DET content |
| `src/content/en/about.ts` | AEEG company history |
| `src/content/en/home.ts` | AEEG-styled hero section |
| `src/content/en/contact.ts` | AEEG contact/Cairo info |
| `src/content/en/sat-prep.ts` | AEEG SAT marketing (needs rewrite) |

### Arabic Content (REMOVE/REWRITE)
Same structure as English, with Arabic translations:
`src/content/ar/act-prep.ts`, `ielts-prep.ts`, `toefl-prep.ts`, `academic-english.ts`, `ib.ts`, `igcse.ts`, `det.ts`, `about.ts`, `contact.ts`, `sat-prep.ts`, `subjects.ts`, `blog.ts`, `faqs.ts`, `privacy.ts`

## 8. ADMIN PANEL CONTAMINATION

| File | Issue | Classification |
|------|-------|----------------|
| `src/app/admin/_components/admin-layout.tsx` | Sidebar title says "AEEG Admin Panel" (line ~85: `"AEEG"` label with "A" icon) | ❌ **REMOVE** |
| `src/app/admin/layout.tsx` | Metadata references AEEG | ❌ **REMOVE** |
| `src/app/admin/page.tsx` | AEEG-branded content | ❌ **REMOVE** |
| `src/app/admin/courses/page.tsx` | AEEG references | ❌ **REMOVE** |
| `src/app/admin/settings/page.tsx` | "American Egyptian" reference | ❌ **REMOVE** |
| `src/app/admin/teachers/page.tsx` | AEEG references | ❌ **REMOVE** |

## 9. API CONTAMINATION

| File | Issue | Classification |
|------|-------|----------------|
| `src/app/api/chat/route.ts` | System prompt: "You are the AI assistant for American Egyptian Education Group (AEEG), a test prep tutoring company based in Cairo, Egypt" (lines 47-50) | ❌ **REMOVE** (rewrite as PB-specific) |

## 10. TEACHER DASHBOARD CONTAMINATION

| File | Issue | Classification |
|------|-------|----------------|
| `src/app/teacher/page.tsx` | Hardcoded AEEG-style data: Dr. Ahmed Khalil, IELTS Speaking sessions, ACT English Prep sessions, TOEFL Writing sessions, AEEG-student names | ❌ **REMOVE** (hardcoded data) |

## 11. AUTH / LOGIN CONTAMINATION

| File | Issue | Classification |
|------|-------|----------------|
| `src/components/auth/login-modal.tsx` | AEEG references | ❌ **REMOVE** |
| `src/components/layout/chatbot.tsx` | AEEG chatbot styling | ❌ **REMOVE** |

## 12. BRAND ASSET CONTAMINATION

| File | Issue | Classification |
|------|-------|----------------|
| `public/aeeg-logo.svg` | AEEG-specific logo (not Practice Buddy logo) | ❌ **REMOVE** (replace with PB logo) |

---

## Summary by Classification

| Classification | Count | Examples |
|---------------|-------|----------|
| ❌ **REMOVE** (out of scope routes) | 7 full route dirs + sitemap entries | act-prep, ielts-prep, toefl-prep, academic-english, ib, igcse, det |
| ❌ **REMOVE** (out of scope data) | 6 data files | act-questions, ielts-questions, toefl-questions, est-igcse, myp-dp, placement |
| ❌ **REMOVE** (AEEG branding/nav) | 8 files | header.tsx, footer.tsx, admin-layout.tsx, admin/* pages, aeeg-logo.svg |
| ❌ **REMOVE** (AEEG content) | 36+ content files | All src/content/* files for out-of-scope programs |
| ❌ **REMOVE** (AEEG API/chat) | 1 file | api/chat/route.ts (system prompt) |
| ❌ **REMOVE** (i18n AEEG keys) | 1 file | i18n.tsx (keys + localStorage) |
| ❌ **REMOVE** (hardcoded data) | 1 file | teacher/page.tsx |
| ⚠️ **REWRITE** (scope-valid but AEEG-marketed) | 1 route + content | sat-prep (in scope, but AEEG marketing, not PB practice) |
| ✅ **KEEP** (core infrastructure) | ~200 files | Components, practice engine, DB schema, API endpoints, lib utilities |

---

## Salvage Estimate

| Component | Compliance | Decision |
|-----------|-----------|----------|
| Routes | ~20% compliant (2.5/12 valid) | REMOVE 8, REWRITE 1, KEEP 3 |
| Navigation | 0% (fully contaminated) | REBUILD |
| Footer | 0% (fully contaminated) | REBUILD |
| Data files | ~60% (SAT/Math/English OK, ACT/IELTS/TOEFL/etc NOT) | REMOVE 6, KEEP ~30 |
| Content files | ~20% (SAT/Math/English OK) | REMOVE 36+, REWRITE SAT |
| i18n | 0% AEEG naming | REWRITE |
| Admin | ~50% (structure OK, labels contaminated) | MODIFY labels |
| Teacher Dashboard | 0% (hardcoded AEEG data) | REWRITE |
| API | 90% (chat prompt only contaminated) | MODIFY 1 file |
| Brand | 0% (AEEG logo) | REPLACE |
| Core DB/Engine | ~90% | KEEP |

**Overall:** ~50% of files need removal/modification. Core engine is salvageable.