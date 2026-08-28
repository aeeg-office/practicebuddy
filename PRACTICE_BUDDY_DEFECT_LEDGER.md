# Practice Buddy — Defect Ledger

## Last Updated: 2026-08-27

### Critical (0)
*None — all resolved.* ✅

### High (0)
*None — all resolved.* ✅

### High (5) — Security Audit (monitoring, not blocking)
| ID | Finding | File(s) | Status | Notes |
|----|---------|---------|--------|-------|
| SEC-01 | Rate limiting: only 5/38 routes protected | `src/app/api/*` | ⏳ OPEN | Mitigation in progress for login, register, attempts, chat, ai-tutor |
| SEC-02 | 3 unbounded paginated responses | Admin routes | ⏳ OPEN | Returns all rows without limit |
| SEC-03 | Oversized response on large curriculum query | `/api/admin/skills` | ⏳ OPEN | Returns all skills/micro-skills |
| SEC-04 | RLS not configured | PostgreSQL | ⏳ OPEN | Application-level tenant isolation only |
| SEC-05 | CSRF not explicitly handled | All POST routes | ⏳ OPEN | Origin-based check on cookie auth only |

### Medium (8) — Master Architecture Audit
| ID | Finding | Status | Notes |
|----|---------|--------|-------|
| ARC-01 | K–2 curriculum not seeded | ⏳ OPEN | Grades 3–10 only; K,1,2 absent |
| ARC-02 | MAP programs incomplete | ⏳ OPEN | Math uses core mappings, Reading/Language partially seeded |
| ARC-03 | Gold questions: only Core Math at 100% | ⏳ OPEN | SAT and Core English near 0% — DB confirms 0 questions |
| BRAND-05 | SAT Prep page uses AEEG content/CMS | ✅ CLOSED | Fixed 2026-08-26: full page rewrite |
| BRAND-07 | MAP prep pages use old navy+gold palette | `map-prep/*` (7 files) | 🔴 OPEN (P2) | 68 instances of `#1a237e` in MAP pages |
| BRAND-10 | Practice pages use old navy `#1a237e` | `practice/*` (4 files), `question-preview.tsx` | 🔴 OPEN (P2) | 61 instances of `#1a237e` in practice layout/component |
| BRAND-11 | AI Tutor uses old navy `#1a237e` + WhatsApp link | `ai-tutor/layout.tsx`, `ai-tutor/page.tsx` | 🔴 OPEN (P2) | 19 instances + legacy `wa.me/201060618899` |
| BRAND-12 | Legacy WhatsApp links (AEEG-era) across site | 8 files, 10 instances | 🔴 OPEN (P2) | `wa.me/201060618899` needs Lumaani contact |

### Medium (3) — Phase-1 Fleet Audit (NEW)
| ID | Finding | File(s) | Status | Notes |
|----|---------|---------|--------|-------|
| SEC-06 | `/api/chat` unauthenticated — only rate-limited (20/min) | `src/app/api/chat/route.ts` | ⏳ OPEN | Proxies to llama.cpp; resource exhaustion vector. No JWT auth. |
| SEC-07 | `/api/ai-tutor` unauthenticated — only rate-limited (20/min) | `src/app/api/ai-tutor/route.ts` | ⏳ OPEN | Template-based currently, but if upgraded to real LLM would need auth |
| SEC-08 | Arabic `/ar` route returns 404 server-side | Root route config | ⏳ OPEN | RTL/Arabic is client-side JS only; SSR not implemented |

### Low (Ongoing)
| ID | Finding | Status | Notes |
|---|---------|--------|-------|
| BRAND-06 | Core English gold seeding in progress | `seed-core-english-gold.ts` | ⏳ WORK IN PROGRESS | Uncommitted 475-line seed file |
| DESIGN-06 | Purple remnants in MAP prep data | `src/data/practice-skills.ts:185` | ⏳ NEW | `text-purple-500` on recommendations |
| — | Purple in admin/ai-factory page | `src/app/admin/ai-factory/page.tsx:98` | ⏳ NEW | `bg-purple-100` on icon container |
| — | Subscription uses userId from query param (controlled) | `src/app/api/user/subscription/route.ts` | ⏳ OPEN | Pattern anti-pattern; proper access control but worth tightening |
| DESIGN-07 | CSS ring color old brand | `src/app/globals.css:40` | ✅ CLOSED | `--color-ring: #1a237e` → `#0d4f4f` |
| CONTENT-01 | Core English/SAT 0 questions in production (closed) | Production DB | ✅ CLOSED | Resolved 2026-08-26 via `derive-sat-core-questions.ts` |

### Resolved (All Closed + New)
| ID | Issue | Fixed In | Resolution |
|----|-------|----------|-----------|
| CONTENT-01 | Core English/SAT 0 questions in production | 2026-08-26 | ✅ ROOT CAUSE: gold questions existed (SAT 930, CE 2,640) but Question derivation never ran → `derive-sat-core-questions.ts` created 10,710 questions. SAT Math 1,710, SAT R&W 1,080, Core English 7,920 |
| PWA-01 | manifest.json theme_color old navy | 2026-08-27 | ✅ `#1a237e` → `#0d4f4f`, deployed to production |
| BRAND-05 | SAT Prep page uses AEEG content/CMS | 2026-08-26 | ✅ Full page rewrite: removed Why AEEG, programs/pricing, WhatsApp links. Now features/FAQ/taxonomy only |
| BRAND-07 | Map-prep page uses old navy+gold palette | ⏳ OPEN (MEDIUM) | MAP pages still use `#1a237e`/`#f5a623` — non-blocking UI cleanup |
| DESIGN-06 | Purple remnants in MAP prep data | ⏳ OPEN (LOW) | `practice-skills.ts:185` + map-prep pages |
| DESIGN-07 | CSS ring color old brand | 2026-08-26 | ✅ `--color-ring: #1a237e` → `#0d4f4f` |
| DESIGN-08 | Button component legacy colors | 2026-08-26 | ✅ default `#0d4f4f`, accent `#e8b84b` |
| DESIGN-09 | Admin layout AEEG metadata | 2026-08-26 | ✅ "American Egyptian..." → "Lumaani" |
| AEEG-15 | SAT Prep wa.me AEEG links | 2026-08-26 | ✅ Removed in page rewrite, verified 0 in production |
| AEEG-01 | AEEG purple branding | `185c8892` | Replaced with dark blue + gold |
| AEEG-02 | AEEG storage keys | `bdd69361` | Renamed to pb-* prefix |
| AEEG-03 | AEEG routes present | `9b53a4e4` | 15 routes removed |
| AEEG-04 | AEEG marketing pages | `9b53a4e4` | 8 pages deleted |
| AEEG-05 | AEEG in dashboard header | NA-2026-08-25 | "AEEG" → "Lumaani" |
| AEEG-06 | AEEG in writing page instructor text | NA-2026-08-25 | "AEEG instructors" → "Lumaani instructors" |
| AEEG-07 | AEEG in login modal register text | NA-2026-08-25 | "Join AEEG" → "Join Lumaani" |
| AEEG-08 | AEEG in teacher layout metadata | NA-2026-08-25 | Replaced with Lumaani |
| AEEG-09 | AEEG in dashboard layout metadata | NA-2026-08-25 | Replaced with Lumaani |
| AEEG-10 | AEEG in admin teachers page | NA-2026-08-25 | Replaced with Lumaani |
| AEEG-11 | AEEG in admin courses page | NA-2026-08-25 | Replaced with Lumaani |
| AEEG-12 | AEEG in parent layout metadata | NA-2026-08-25 | Replaced with Lumaani |
| AEEG-13 | AEEG in speaking page | NA-2026-08-25 | Replaced with Lumaani |
| AEEG-14 | AEEG in content (en/ar subjects) | NA-2026-08-25 | Replaced with Lumaani |
| DESIGN-01 | tailwind.config.ts old brand colors | NA-2026-08-25 | Updated to teal `#0d4f4f` + gold `#e8b84b` |
| TENANT-01 | 10 un-scoped API routes | `75e13e57` | tenantId filtering added |
| AUTH-01 | 2 unprotected endpoints | `75e13e57` | JWT auth added |
| DB-01 | 10 missing architecture models | `d7e71572` | Added School, Class, Subject, etc. |
| MAP-01 | MAP program empty (0 grades/skills) | `03841c13` | 32 skills, 96 micro-skills seeded |
| GOLD-01 | Gold questions: 10 → 4,848 | `03841c13` | Core Math at 100% |
| BRAND-01 | Practice Buddy public name | `f4a4ad07` | Rebranded to Lumaani, 10/10 verified |