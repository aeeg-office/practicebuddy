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