# Lumaani Repair Roadmap

**Date:** 2026-08-29
**Status:** Phase 1 complete — Critical + High defects resolved, verified live.

---

## Current Verified State

| Metric | Before | After | Status |
|--------|--------|-------|--------|
| Critical defects | 1 (all DB endpoints 500) | **0** | ✅ |
| High defects | 4 | **0** | ✅ |
| Legacy navy/amber live | 33-96 per page | **0** everywhere | ✅ |
| Broken `https://mailto:` links | 24 | **0** | ✅ |
| DB-backed endpoints | 500 | 200 (real data) | ✅ |
| Subject enum | english rejected, science empty | english valid | ✅ |
| Public routes | — | 18/18 = 200 | ✅ |
| Auth guards | 401 | 401 (unchanged) | ✅ |
| TypeScript | — | 0 errors | ✅ |
| Build | — | PASS (local + VPS) | ✅ |

---

## Resolved Defects (this cycle)

| ID | Severity | Fix | Verified |
|----|----------|-----|----------|
| FUNC-001 | Critical | Repaired `DATABASE_URL` (practice_buddy → lumaani_prod), aligned DB role password, restarted container | ✅ live: skills/register/login all functional |
| FUNC-002 | High | Fixed 24 malformed `https://mailto:` → `mailto:` across 17 files | ✅ live: 0 broken links |
| FUNC-003 | High | Added `english` to VALID_SUBJECTS (7920 questions were rejected); removed dup from LEGACY; removed `sat/act/ielts/toefl` from page fetch (no DB data) | ✅ live: `subject=english` → 200 |
| DESIGN-001 | High | Swept 491 legacy navy/amber → Option 5 tokens across 28 files | ✅ live: 0 navy/amber; teal+copper present |
| DESIGN-002 | High | `badge.tsx` accent → copper token, success → `#15805a` | ✅ |
| DESIGN-003 | Medium | Tokenized `button.tsx` hex → `bg-primary`/`bg-secondary`/`bg-accent` | ✅ |
| FUNC-004 | Medium | (deferred — see below) | — |
| FUNC-005 | Medium | (deferred — see below) | — |

---

## Remaining Work

### Phase 2 — mostly complete (this cycle)
- **FUNC-004 ✅** — `mockSkills` removed from page layer; pages now fetch real data via `/api/practice/skills` through `_hooks/use-taxonomy` (server-driven, real DB counts + IDs).
- **FUNC-005 ✅** — **honest demo/empty states** chosen over fake seeding (per "no fake production data" rule). DB has 8,415 gold questions + real taxonomy; operational tables empty until real users enroll. A pending admin can seed via existing `prisma/seed*.ts` on demand.
- **Versioning ✅** — `scripts/gen-version.mjs` writes `public/version.json` (git commit + timestamp + buildId) before `next build`; `/api/version` now reports the real deployed commit.
- **WhatsApp CTA color ✅ (this cycle)** — unified the green family `green-N` → `emerald-N` across 24 files so WhatsApp CTAs + semantic success read as one consistent palette (per design system: third-party WhatsApp green retained, standardized). `subjects`/`teacher` stray greens fixed.

### Phase 3 — optional polish
- (None critical/high remain.)

---

## Production-Readiness Blockers

- **None.** Platform is fully functional: auth, practice skills (5 real subjects), subject selection, version API, admin APIs all verified live. Branding fully on Option 5 (Deep Teal + Copper) with standardized semantic green.
- **Pre-launch gap (not a defect):** operational user/attempt data is empty — expected until launch; workflows testable after seeding.

---

## Commits

- `398fba5` — audit: Lumaani production function+design audit (1 CRIT, 4 HIGH, 4 MED, 2 LOW)
- `a273ede` — repair: sweep 491 legacy navy/amber→Option5 tokens; fix badge accent; fix 24 broken mailto links; fix subject enum; tokenize button.tsx

Both deployed to production (VPS branch `lumaani-audit-repair-20260829` @ `a273ede`, Docker `lumaani` healthy).
