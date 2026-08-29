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

## Remaining Work (by dependency)

### Phase 2 — Content/Data (blocked on business decision)
1. **FUNC-004: Remove `mockSkills` from page layer.** Practice pages still import `mockSkills` directly for taxonomy (skill names/domains). The API now returns real DB data. Refactor pages to use the API response as the single source of truth. *Dependency: none (pure refactor), but large surface — do carefully.*
2. **FUNC-005: Seed operational data.** DB has 8415 gold questions but 1 user, 0 teachers, 0 attempts. Seed admin + test students + sample attempts to make workflows testable. *Dependency: owner decision on what seed data is acceptable.*

### Phase 3 — Design polish
3. **Standardize WhatsApp CTA color.** Emerald green used inconsistently across modules for WhatsApp CTAs. Decide: standardize on emerald (semantic) or replace with success color. *Dependency: business decision.*

### Phase 4 — Versioning
4. **Fix version.json drift.** `version.json` is stale (Aug 26) and untracked. `/api/version` returns `commit: "unknown"`. Inject build-time commit SHA into the build. *Dependency: build pipeline change.*

---

## Production-Readiness Blockers

- **None critical/high.** The platform is functionally restored: auth, practice skills, subject selection all work; branding is fully on Option 5 (Deep Teal + Copper); no dead controls.
- **Pre-launch gap (not a defect):** operational data (users/teachers/attempts) is empty — expected pre-launch, but means end-to-end student/teacher/admin workflows can't be fully exercised until seeded.

## Recommended Next Phase

1. Owner approves Phase 2 seed-data approach → seed minimal viable dataset → re-run full regression.
2. FUNC-004 refactor (mockSkills removal) as a standalone PR with full test pass.
3. Enable build-time commit injection for `/api/version`.
4. Final independent audit before launch.

---

## Commits

- `398fba5` — audit: Lumaani production function+design audit (1 CRIT, 4 HIGH, 4 MED, 2 LOW)
- `a273ede` — repair: sweep 491 legacy navy/amber→Option5 tokens; fix badge accent; fix 24 broken mailto links; fix subject enum; tokenize button.tsx

Both deployed to production (VPS branch `lumaani-audit-repair-20260829` @ `a273ede`, Docker `lumaani` healthy).
