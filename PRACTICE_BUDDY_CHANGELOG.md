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

## Release 2 — 2026-08-26 (Nightly Assurance Run #2)
**Commit:** `9b60bd1b`
**Build:** ✅ Compiled successfully in 18.7s

### Summary
Nightly production assurance run. Discovered production running stale build with 14+ AEEG references. Deployed latest source code via rsync + rebuild. Post-deploy: 13/14 AEEG references resolved (SAT Prep deferred). Performance improved 3× (home page 0.83s → 0.28s).

### Changes
- Production deploy: rsync source → rebuild → restart (no schema changes)
- AEEG contamination fixed: dashboard, teacher, admin, parent, speaking, writing, login modal (13 locations)
- Post-deploy verification: all 28 routes 200, no new AEEG in fixed pages
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

---

## Nightly Assurance Run #3 — 2026-08-27
**Run ID:** LUMAANI-NA-2026-08-27-757953
**Commit:** `9b60bd1b` (no changes — same commit as Run #2)
**Build:** ✅ Production running, no rebuild needed
**Mode:** Conservative baseline (Run 3 of 7)

### Findings

#### P2 — Manifest.json theme_color (Repaired)
- `public/manifest.json` had `theme_color: "#1a237e"` (old navy) instead of `#0d4f4f` (Lumaani teal)
- Layout `<meta name="theme-color">` was already correct (`#0d4f4f`)
- Root cause: Lumaani rebrand missed this token
- **Repair:** Single line change, deployed via `docker cp` + `docker restart`
- **Verified:** `curl https://lumaani.com/manifest.json` returns `theme_color: #0d4f4f` ✅

#### Low — Purple in admin/ai-factory
- `src/app/admin/ai-factory/page.tsx:98` — `bg-purple-100` on icon container
- Added to defect ledger as LOW

### Production Health
- 22/22 routes HTTP 200 | Avg response ~0.38s | Max 0.89s (mock-exams)
- SSL valid through 2026-11-20 | HSTS + CSP + XFO + XCTO all present ✅
- 25,254 questions | 8,415 gold | 41 tables | 7 programs | 320 skills | 933 micro-skills
- AEEG contamination: 0 references in source code ✅
- Version endpoint verified: Lumaani, commit=9b60bd1b, environment=production

### Open Items (unchanged from Run #2)
- BRAND-07 (MAP palette migration, MEDIUM)
- SEC-01 through SEC-05 (monitoring)
- DESIGN-06 (purple remnants, LOW)

---

## Nightly Assurance Run #4 — 2026-08-27
**Run ID:** LUMAANI-NA-2026-08-27-790620
**Commit:** `9b60bd1b` (no changes — same commit as Run #2 & #3)
**Build:** ✅ Production running, no build needed
**Mode:** Conservative baseline (Run 4 of 7)

### Findings

#### P2 — BRAND-10 (NEW): Practice pages use old navy #1a237e
- `src/app/practice/*` (4 files, 55 instances)
- `src/components/admin/question-preview.tsx` (6 instances)
- Border colors, icon backgrounds, selected states use `#1a237e` instead of teal `#0d4f4f`

#### P2 — BRAND-11 (NEW): AI Tutor uses old navy #1a237e
- `src/app/ai-tutor/layout.tsx` (6 instances) + `page.tsx` (13 instances)
- Sidebar, breadcrumbs, subject badges all use old navy/gold palette
- Also contains WhatsApp reference

#### P2 — BRAND-12 (NEW): Legacy WhatsApp links found
- 10 instances across 8 files: speaking, listening, subjects, parent, dashboard, ai-tutor
- Number `wa.me/201060618899` is AEEG-era; needs Lumaani contact

#### Brand Color Inventory
- Total `#1a237e` instances: **157** across **15 source files**
- Files affected: question-preview.tsx, ai-tutor (2 files), map-prep (7 files), practice (4 files)

### Production Health
- 24 routes verified | All 200 | Avg response ~0.30s | Max 0.50s
- SSL valid through 2026-11-20 (85 days) | All security headers present ✅
- AEEG contamination: 0 references in source code ✅
- theme-color: #0d4f4f ✅ | manifest.json: #0d4f4f ✅
- Version endpoint verified: Lumaani, commit=9b60bd1b ✅

### New Defects Added
- BRAND-10 (P2) — Practice pages old navy
- BRAND-11 (P2) — AI Tutor old navy + WhatsApp
- BRAND-12 (P2) — Legacy WhatsApp links across 8 files
- K–2 curriculum, MAP programs (DEFERRED)