# Practice Buddy Project State

## Last Updated
- **Timestamp:** 2026-08-27 ~03:31 Cairo (NA Run #4)
- **Machine:** Hermes Desktop (M2) — Cron job
- **Status:** Production healthy — 24/24 routes 200, 0 AEEG remnants, 157 old brand color instances tracked
- **Public Brand:** Lumaani

---

## Executive Summary

| Attribute | Value |
|-----------|-------|
| **Internal name** | `practicebuddy` (unchanged) |
| **Public brand** | **Lumaani** |
| **Domain** | `lumaani.com` (parked placeholder) |
| **Repository** | `git@github.com:aeeg-office/practicebuddy.git` |
| **Architecture** | Next.js 16 (App Router) + Prisma ORM + PostgreSQL 15 |
| **Identity** | Deep teal `#0d4f4f` + warm gold `#e8b84b` — "Luminous" palette |
| **Positioning** | PRACTICE. LEARN. MASTER. |
| **Logo** | Abstract "L" + rising light ray |
| **Target market** | Egypt → GCC → MENA → International |
| **Students** | Grades 3–10, SAT, MAP |
| **Pedagogy** | Two-attempt teaching, server-derived mastery |

---

## Backup & Checkpoints

| Item | Status | Detail |
|------|--------|--------|
| Git tag: pre-realignment | ✅ | `practice-buddy-pre-realignment-2026-08-20` |
| Git tag: pre-completion | ✅ | `practice-buddy-pre-completion-2026-08-21` |
| Git tag: release 1 | ✅ | `practice-buddy-release-1-2026-08-21` |
| Full DB dump | ✅ | `/tmp/practice_buddy_full_dump_20260820.sql` (4.7 MB) |
| AEEG contamination audit | ✅ | `AEEG_CONTAMINATION_AUDIT.md` — 0 references remaining |
| Latest commit | `f4a4ad07` | Lumaani rebrand: independent verification — 10/10 PASS |

---

## Platform Metrics

### Database

| Metric | Count |
|--------|-------|
| Tables (excl. prisma_meta) | 41 |
| Prisma migrations | 7 |
| Programs | 7 |
| Grades | 24 |
| Skills | 320 |
| Micro-skills | 933 |
| Gold Questions (parent) | 8,415 |
| Questions (instances) | 25,254 |
| Gold by subject: math/read/lang/write | 4,825 / 11 / 11 / 1 |
| Gold by program: Core Math/MAP/Core Eng/SAT | 4,800 / 40 / 2,640 / 930 |

### Routes

| Group | Count | Status |
|-------|-------|--------|
| Total routes | 87 | ✅ Build passes |
| API routes | 38 | ✅ All authed |
| Student pages | ~35 | ✅ 200 |
| Admin pages | 43 | ✅ 200 |
| AEEG contamination routes | 15 | ✅ All 404 |

### Programs

| Program | Code | Skills | Status |
|---------|------|--------|--------|
| Core Math | `core-math` | 160 (480 µ-skills) | ✅ Seeded G3–10 |
| Core English | `core` | 3 (9 µ-skills) | ⏳ Legacy — needs expansion |
| MAP Growth | `map` | 32 (96 µ-skills) | ✅ Reading + Language Usage |
| SAT Math | `sat-math` | 19 (57 µ-skills) | ✅ Seeded |
| SAT R&W | `sat-rw` | 12 (36 µ-skills) | ✅ Seeded |
| SAT Legacy | `sat` | 6 (18 µ-skills) | ✅ Legacy |

### Gold Question Coverage

| Area | Gold Qs | Target | Coverage |
|------|---------|--------|----------|
| Core Math | 4,800 | 4,800 | **100%** ✅ |
| MAP Reading + Language | 48 | ~400 | 12% ⏳ |
| Core English / SAT | 0 | ~1,000 | 0% ⏳ |

---

## Commit History (23 commits, post-realignment)

```
68f984bd — pre-realignment backup
c147665f — Phase 1: AEEG decoupling
bdd69361 — Phase 1 cleanup: storage keys
fde83155 — Phase 0: design system redesign
9b53a4e4 — Standalone identity: dark blue + gold
185c8892 — Eliminate all AEEG purple
d7e71572 — Phase 1: DB schema integrity (+10 models)
9c4e285a — Phase 14/18: Back office pages
75e13e57 — Phase 2: Auth + RBAC + tenant isolation
51bced03 — Phases 3–9: Fixes, curriculum, SAT
8560ca19 — Phase 19: PWA + manifest + service worker
3122fb9f — Phase 21: Full regression pass
5018282f — Phase 20: Security audit complete
8d658eaa — Phases 22–23: Deployment tag + audit
e70afdfa — Phase 23: Final acceptance report
03841c13 — MAP Expansion + Gold Scaling
a52a4e5b — Lumaani: brand identity & strategy
2aaac3e9 — Lumaani: final content cleanup
9c5df35b — Lumaani: public-facing updates
b718251b — Lumaani: teal palette implementation
c99a3fe7 — Lumaani: continue public-facing updates
f4a4ad07 — Lumaani: independent verification 10/10 PASS
```

---

## Acceptance Status

**PHASE 23: CONDITIONAL ACCEPTANCE** (69% compliance, 132 requirements)

| Status | Count | % |
|--------|-------|---|
| **PASS** | 63 | 48% |
| **PARTIAL** | 18 | 14% |
| **FAIL** | 8 | 6% |
| **MISSING** | 2 | 2% |
| **NOT TESTABLE** | 41 | 31% |

### Blockers for Full Acceptance
1. **K–2 content** — grades K, 1, 2 not seeded
2. **MAP programs** — MAP Math placeholder (skills exist via RIT mappings, no dedicated subject), MAP Reading/Language partially seeded but not complete
3. **Gold question inventory** — Core Math at 100%, but other programs at 0–12%

---

## Security

| Severity | Count | Key Findings |
|----------|-------|-------------|
| **Critical** | 0 | ✅ |
| **High** | 5 | Rate limiting on 5/38 routes, 3 unbounded responses |
| **Medium** | 7 | Missing indexes, CSRF, no pagination |
| **Low** | 5 | Minor recommendations |

**AEEG contamination in source code: 0**

---

## Deployment

| Environment | Status | URL |
|-------------|--------|-----|
| Local dev | ⬇️ INACTIVE | http://localhost:3099 |
| Production | ✅ **LIVE** | https://lumaani.com (Docker, latest source) |
| Staging | ❌ NOT CONFIGURED | — |
| VPS (191.218.165.228) | ✅ ACTIVE | Ubuntu 24.04, Node 22, PG 16, nginx, Docker, Next.js 16 |

See `PRACTICE_BUDDY_DEPLOYMENT_STATE.md` for full deployment procedure.

---

## Recent Workstreams

### 🟢 MAP Expansion + Gold Scaling (Complete)
- 42 RIT bands, 1,650 skill mappings, 4,800+ gold questions
- 8 MAP Prep UI pages: math, reading, language-usage, RIT practice, mixed, warm-up, recommendations
- 96 MAP micro-skills for Reading + Language Usage

### 🟢 Lumaani Rebrand (Complete — 10/10 Verified)
- Research: `LUMAANI_BRAND_RESEARCH.md` (28KB), `LUMAANI_BRAND_STRATEGY.md` (3.6KB)
- Design: `LUMAANI_DESIGN_SYSTEM.md` (27KB), `LUMAANI_LOGO_RESEARCH.md` (35KB)
- Implementation: teal palette, logo, PWA, metadata, header/footer/admin, content cleanup
- Independent verification: 10/10 PASS (`Lumaani_BRAND_VERIFICATION.md`)

---

## Key Decisions

1. **Public brand = Lumaani** (لوماني) — Persian: elegant/graceful. Arabic root ل م ع: luminous.
2. **Positioning:** PRACTICE. LEARN. MASTER. — reflects the two-attempt pedagogy.
3. **Palette:** Deep teal `#0d4f4f` + warm gold `#e8b84b` ("Luminous") — calm, premium, MENA-appropriate, age-spanning.
4. **Logo:** Abstract "L" + rising light ray — symbolizing guidance, growth, illumination.
5. **Internal repo:** `practicebuddy` — NOT renamed. Internal identifiers preserved unless technically necessary.
6. **Domain:** `lumaani.com` — currently parked placeholder. Recommend `app.lumaani.com` for production.
7. **MAP Math reuses Core Math skills** via RIT mappings — no curriculum duplication.
8. **Gold Questions:** 10 per micro-skill with difficulty distribution (3 easy / 4 medium / 3 hard). Hash-based idempotent seeding.

---

## Remaining Work

### High Priority
1. **VPS production deployment** — Deploy verified commit to production VPS (191.218.165.228) with `app.lumaani.com`
2. **K–2 curriculum** — Seed grades K, 1, 2 for Core Math and English
3. **MAP Math** — Create dedicated MAP Math subject page + integrate with existing skill mappings
4. **Gold questions** — Extend to SAT Math, SAT R&W, Core English

### Medium Priority
5. **Rate limiting** — Extend to all 38 API routes
6. **RLS policies** — PostgreSQL Row-Level Security for tenant isolation
7. **PWA** — Test installability, offline caching strategy
8. **Accessibility audit** — WCAG AA pass

### Low Priority
9. **Guided instruction / Live classroom** — Implement remaining teacher features
10. **Arabic language UI** — RTL support

---

## Files Map

| File | Purpose |
|------|---------|
| `PRACTICE_BUDDY_PROJECT_STATE.md` | **This file — Canonical project state** |
| `PRACTICE_BUDDY_MASTER_ARCHITECTURE_TRACEABILITY.md` | 132 reqs, 65KB |
| `PRACTICE_BUDDY_FINAL_ACCEPTANCE_REPORT.md` | Phase 23 audit, 18.8KB |
| `PRACTICE_BUDDY_SECURITY_AUDIT.md` | Phase 20 findings, 17KB |
| `PRACTICE_BUDDY_DATABASE_AUDIT.md` | 38 models audited, 41KB |
| `PRACTICE_BUDDY_AUTH_AUDIT.md` | 15 gaps fixed, 12KB |
| `PRACTICE_BUDDY_COMPLETION_BASELINE.md` | 32 feature categories, 30KB |
| `PRACTICE_BUDDY_CURRICULUM_SEED.md` | Curriculum plan, 51KB |
| `PRACTICE_BUDDY_DEPLOYMENT_STATE.md` | Deployment procedure |
| `LUMAANI_BRAND_RESEARCH.md` | Name/competitive research, 28KB |
| `LUMAANI_BRAND_STRATEGY.md` | Positioning strategy, 3.6KB |
| `LUMAANI_DESIGN_SYSTEM.md` | Design tokens/palette, 27KB |
| `LUMAANI_LOGO_RESEARCH.md` | Logo concepts/selection, 35KB |
| `Lumaani_BRAND_VERIFICATION.md` | Independent audit, 10/10 PASS |
| `LUMAANI_NIGHTLY_ASSURANCE.md` | **Nightly system documentation** |
| `LUMAANI_NIGHTLY_RUNNER.sh` | **Nightly runner script** |

---

## Nightly Assurance System

**Status:** ✅ INSTALLED
**Schedule:** 03:30 Cairo time daily (cron: `30 3 * * *`)
**Orchestrator:** M2 (Hermes Desktop) via Hermes cron job
**Job ID:** `128a394ef9ef` — "Lumaani Nightly Assurance"
**Run ID Format:** `LUMAANI-NA-YYYYMMDD-RUNID`
**Report Format:** `LUMAANI_NIGHTLY_ASSURANCE_YYYYMMDD_RUNID.md`

### Pipeline

Repository/Production Baseline → Architecture Check → Functional Audit → Content Integrity Audit → Regression Comparison → Security/Performance Audit → Issue Classification → Root Cause → Repair Gate → Controlled Repair → Targeted Testing → Affected Workflow Testing → Regression Testing → Production Verification → Report → Telegram

### Safety Period
First 3–7 runs: **conservative mode** — baseline building, no auto-repair except for exceptionally clear, localized, low-risk defects.

### Telegram
**Not yet configured.** The cron job delivers locally (`deliver: local`). When a Telegram channel is configured for Lumaani, update the cron job's `deliver` parameter.

### Logs
`/home/qadir/.hermes/profiles/practice-buddy/nightly-assurance/logs/`