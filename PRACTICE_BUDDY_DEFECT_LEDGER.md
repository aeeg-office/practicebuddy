# Practice Buddy — Defect Ledger

## Last Updated: 2026-08-25

### Critical (0)
*None — all resolved.* ✅

### High (5) — Security Audit
| ID | Finding | File(s) | Status | Notes |
|----|---------|---------|--------|-------|
| SEC-01 | Rate limiting: only 5/38 routes protected | `src/app/api/*` | ⏳ OPEN | Mitigation in progress for login, register, attempts, chat, ai-tutor |
| SEC-02 | 3 unbounded paginated responses | Admin routes | ⏳ OPEN | Returns all rows without limit |
| SEC-03 | Oversized response on large curriculum query | `/api/admin/skills` | ⏳ OPEN | Returns all skills/micro-skills |
| SEC-04 | RLS not configured | PostgreSQL | ⏳ OPEN | Application-level tenant isolation only |
| SEC-05 | CSRF not explicitly handled | All POST routes | ⏳ OPEN | Origin-based check on cookie auth only |

### Medium (4) — Master Architecture Audit
| ID | Finding | Status | Notes |
|----|---------|--------|-------|
| ARC-01 | K–2 curriculum not seeded | ⏳ OPEN | Grades 3–10 only; K,1,2 absent |
| ARC-02 | MAP programs incomplete | ⏳ OPEN | Math uses core mappings, Reading/Language partially seeded |
| ARC-03 | Gold questions: only Core Math at 100% | ⏳ OPEN | SAT and Core English near 0% |
| BRAND-05 | SAT Prep page uses AEEG content/CMS | `sat-prep/page.tsx` | ⏳ OPEN | Full page rewrite needed — deferred |

### Low (Ongoing)
| ID | Finding | Status | Notes |
|----|---------|--------|-------|
| BRAND-06 | Core English gold seeding in progress | `seed-core-english-gold.ts` | ⏳ WORK IN PROGRESS | Uncommitted 471-line seed file |

### Resolved (All Closed + New)
| ID | Issue | Fixed In | Resolution |
|----|-------|----------|-----------|
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