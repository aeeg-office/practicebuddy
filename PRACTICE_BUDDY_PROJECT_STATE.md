# Practice Buddy Project State — Realignment Edition

## Last Updated
- **Timestamp:** 2026-08-20 21:00 CAT
- **Machine:** M2 (Hermes Desktop)
- **Mission:** Stand-alone platform restoration and AEEG decoupling

---

## Backup Status
| Item | Status |
|------|--------|
| Git root commit | ✅ `68f984b` |
| Git tag | ✅ `practice-buddy-pre-realignment-2026-08-20` |
| Full DB dump | ✅ `/tmp/practice_buddy_full_dump_20260820.sql` (4.7 MB) |
| Source backup | ✅ `/home/qadir/PRACTICE_BUDDY_PRE_REALIGNMENT_BACKUP_2026-08-20/` |
| UI snapshot | ✅ `PRACTICE_BUDDY_PRE_REALIGNMENT_UI_SNAPSHOT.md` |
| AEEG forensic audit | 🔄 In progress (delegate task running) |

---

## Production State
- **Dev Server:** localhost:3099 (Next.js)
- **Database:** PostgreSQL practice_buddy@localhost:5432, 5 migrations, in sync
- **Questions:** 2,520 in DB
- **Micro-skills:** 0 (CRITICAL gap)

---

## Current Phase: PRE-REALIGNMENT

### Completed
1. ✅ Full backup (git, DB, files, UI)
2. ✅ Initial git commit + tag
3. ✅ UI snapshot across 30+ pages
4. ✅ Identified AEEG contamination in navigation, footer, routes, content, data, i18n
5. 🔄 Forensic audit in progress (delegate)

### Next: Phase 1 — AEEG Decoupling

**Target contamination removal categories:**
1. Routes (8 out-of-scope): `/act-prep`, `/ielts-prep`, `/toefl-prep`, `/academic-english`, `/ib`, `/igcse`, `/det`
2. Navigation header — remove AEEG program links, replace logo
3. Footer — remove AEEG program links, replace logo
4. i18n translations — remove AEEG program keys, rename `aeeg-lang` storage key
5. Data files — remove/archive ACT, IELTS, TOEFL, EST/IGCSE, MYP/DP, placement
6. Content files — remove AEEG-specific marketing content
7. Teacher dashboard — remove hardcoded AEEG-style data
8. Admin panel — remove "AEEG Admin Panel" label
9. Sitemap — remove AEEG URLs (`aeeg.com`)
10. Chat API — remove AEEG-specific system prompt
11. SAT Prep page — rewrite as PB-specific, not AEEG marketing

**Files to KEEP:**
- Core UI components (Button, Card, Badge, Input...)
- Practice engine (question-renderer, timer, diagnostics)
- Admin infrastructure (layouts, guards, role providers)
- API routes (admin/*, practice/*, auth/*, teacher/*, dashboard)
- Prisma schema and migrations
- SAT-related data files
- Math/English question data
- Core infrastructure (lib/prisma, lib/utils, lib/auth-*)

---

## Compliance Target
- **Current:** ~65% (per second audit)
- **After Phase 1 decoupling:** ~60% (removing contamination temporarily reduces surface)
- **Target after all phases:** 90%+ (realistically achievable given existing core)
- **Ultimate:** 100% with Critical=0, High=0