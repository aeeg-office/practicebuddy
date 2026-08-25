# Practice Buddy — Changelog

## Release 1 — 2026-08-21
**Tag:** `practice-buddy-release-1-2026-08-21`
**Commit:** `f4a4ad07`
**Build:** ✅ Compiled successfully

### Summary
Complete platform build-out across 23 phases: decoupling, database architecture, auth/RBAC, curriculum, SAT, MAP, back office, PWA, security, regression, and independent audit. Plus MAP expansion, gold question scaling, and Lumaani rebrand.

### Major Changes

#### Phase 0 — Baseline
- Created traceability matrix (132 requirements, 65KB)
- Database audit (41KB), completion baseline (30KB)
- Git backup tags, DB dumps

#### Phase 1 — Database
- Added 10 architecture-required models (School, Class, Subject, SkillPrereq, Standard, SkillMapping, LiveSession, StudentLiveState, GenerationMetadata, ValidationResult)
- 38 DB tables, 7 migrations

#### Phase 2 — Auth/RBAC
- JWT authentication on all 38 API routes
- Tenant isolation on 15 previously-unscoped routes
- Rate limiting on 5 critical endpoints
- Entitlements/subscriptions secured

#### Phases 3–9 — Curriculum, SAT, MAP
- 6 programs with grades, skills, micro-skills
- SAT simulation + two-attempt teaching flow
- 8 missing sub-pages created

#### Phases 10–18 — Back Office
- 18 admin pages: users, orgs, audit log, questions, AI factory, curriculum, analytics, settings
- WhatsApp/AEEG phone removed from admin layout

#### Phase 19 — PWA
- Manifest.json with 192/512 SVG icons
- Service worker with offline fallback
- Theme-color, apple-web-app metadata

#### Phase 20 — Security
- 0 Critical, 5 High findings documented
- Rate limiter module created
- Database integrity route fixed

#### Phase 21 — Regression
- 87 routes verified: 26/26 student 200, 17/18 admin 200, 15 AEEG routes 404

#### Phase 22 — Deployment
- Release tag, deployment procedure documented

#### Phase 23 — Final Audit
- Independent audit: 69% compliance (63 PASS / 132 reqs)
- Conditional acceptance with 3 blockers documented

#### MAP Expansion (Post-Audit)
- RITBand model + migration (42 bands across 3 subjects)
- 1,650 RIT skill mappings
- 8 MAP UI pages: math, reading, language-usage, RIT practice, mixed, warm-up, recommendations
- 96 MAP micro-skills

#### Gold Scaling (Post-Audit)
- 4,800 certified gold questions (Core Math: 10/micro-skill — 100%)
- 40 MAP gold questions
- 6,435 question families, 17,074 total questions
- Difficulty distribution: 30% easy / 40% medium / 30% hard

#### Lumaani Rebrand (Post-Audit)
- 5 research documents (totaling 95KB)
- 3-word positioning: PRACTICE. LEARN. MASTER.
- Teal + gold palette implementation
- Logo system, PWA icons, metadata
- Zero public "Practice Buddy" references
- Independent verification: 10/10 PASS

---

## Nightly Assurance System — 2026-08-22
**Job ID:** `128a394ef9ef` — "Lumaani Nightly Assurance"
**Schedule:** 03:30 Cairo time daily

### System Installed
- Hermes cron job with full 30-stage pipeline
- Pre-run baseline script with run ID tracking
- `lumaani-nightly-assurance` skill with complete domain knowledge
- Archive: `/home/qadir/.hermes/profiles/practice-buddy/nightly-assurance/`
- Report format: `LUMAANI_NIGHTLY_ASSURANCE_{DATE}_{RUNID}.md`

### Config Changes
- Updated `nightly-qa-config.yaml`: replaced Practice Buddy (PLANNED) with Lumaani (LOCAL_DEV at localhost:3099)
- Updated `practice-buddy-manifest.md`: v2.0 reflecting post-23-phase reality
- Created `LUMAANI_NIGHTLY_ASSURANCE.md`: system documentation
- Created `LUMAANI_NIGHTLY_RUNNER.sh`: runner script

### State Files Updated
- `PRACTICE_BUDDY_DECISIONS.md`: Added Decision 19 — Nightly Assurance
- `PRACTICE_BUDDY_PROJECT_STATE.md`: Added Nightly Assurance section
- `PRACTICE_BUDDY_CHANGELOG.md`: This entry

### Delivery
- Local delivery (Telegram not yet configured)
- Next scheduled run: 2026-08-23 03:30 Cairo
- First 3–7 runs in conservative baseline mode

---

## Nightly Assurance Run #2 — 2026-08-25
**Run ID:** LUMAANI-NA-2026-08-25-617812
**Commit:** `0d23cb23` — Core English expansion + SAT gold + A2A config
**Build:** ✅ Compiled successfully (0 errors)

### Findings
#### P1 — AEEG Brand Contamination (14 file locations)
- **SAT Prep page** (`sat-prep/page.tsx`): Full page with AEEG CMS content, "Why AEEG" section, WhatsApp links with AEEG text, old navy-to-purple gradient colors — **DEFERRED** (requires content system overhaul)
- **Dashboard header**: "AEEG — Student Portal" → REPAIRED
- **Writing page**: "AEEG instructors" → REPAIRED
- **Login modal**: "Join AEEG" → REPAIRED
- **Teacher layout** metadata → REPAIRED
- **Dashboard layout** metadata → REPAIRED
- **Admin teachers page** → REPAIRED
- **Admin courses page** → REPAIRED
- **Parent layout** metadata → REPAIRED
- **Speaking page** → REPAIRED
- **Content (en/ar subjects.ts)** → REPAIRED

#### P2 — Design Drift
- **tailwind.config.ts**: Old navy `#1a237e` + gold `#f5a623` → REPAIRED to teal `#0d4f4f` + gold `#e8b84b`

### Production Health
- 28/28 routes returning 200 | Avg response 0.44s | Max 0.82s
- SSL valid through 2026-11-20 | HSTS + CSP + XFO + XCTO all present
- 17,074 questions | 4,848 gold | 41 tables

### Remaining
- SAT Prep page rewrite (BRAND-05) — deferred, requires content system work
- Core English gold seeding — work in progress (uncommitted 471-line seed file)
- SAT gold seeding — seed-sat-gold.ts exists but hasn't been run

### State Files Updated
- `PRACTICE_BUDDY_DEFECT_LEDGER.md` — Added AEEG-05 through AEEG-14, DESIGN-01, BRAND-05, BRAND-06
- `PRACTICE_BUDDY_PROJECT_STATE.md` — Updated timestamp, metrics, status
- `PRACTICE_BUDDY_DEPLOYMENT_STATE.md` — Updated production status
- `PRACTICE_BUDDY_CHANGELOG.md` — This entry