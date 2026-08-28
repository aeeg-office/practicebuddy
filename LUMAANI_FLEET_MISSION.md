# LUMAANI — FLEET-NATIVE AUDIT → REPAIR → TEST → REPAIR → RE-AUDIT MISSION CHARTER

> **Identity:** Lumaani (formerly *Practice Buddy*). A persistent, standalone educational software product.
> **Public product:** https://lumaani.com
> **Internal project:** `~/projects/practicebuddy` · `git@github.com:aeeg-office/practicebuddy.git`
> **Execution model:** Whole-fleet, coordinator-orchestrated, gated, two-full-audit lifecycle.
> **Transport:** Tailscale mesh (100.x) preferred · A2A JSON-RPC on :9900 · SSH for command execution · VPS for production.

---

## 0. FLEET EXECUTION MODEL — READ THIS FIRST

This mission is executed across the **entire fleet**, not as a single local agent grind. The coordinator on **M2 (this machine)** plans, assigns, consolidates, and reports. Each node owns a discipline. Use **SSH (not `delegate_task`) for remote compute**. Use **A2A on :9900** for agent-to-agent task delegation across machines. Prefer **Tailscale** when it is up (it is), falling back to VPS reverse tunnels if a node is off-Tailscale.

### 0.1 Fleet assignment (owner = evergreen node map; verify live IPs before each run)

| Node | Role | Owns | Connect |
|------|------|------|---------|
| **M2** | **Coordinator** | Planning, task fan-out, Git feature branch, consolidation, Telegram reporting, final independent sign-off | local (this machine) |
| **M1** | Backend / DB / Security / Deploy | API routes, Prisma schema, DB integrity, RBAC, auth guards, migrations, npm audit, nginx/PM2 | `ssh qadir@...` or `100.73.150.49` |
| **M3** | Frontend / UI / a11y | Pages, components, design system (Lumaani green), responsive, forms, modals, WCAG, PWA | `ssh qab@...` or `100.95.242.35` |
| **M4** | Journeys / SEO / Browser-QA | Login/register/logout flows, role matrix, browser verify of every feature, metadata/SEO/sitemap | `ssh qbaqi@...` or `100.79.182.66` |
| **M6** | Content / Gold bank / Curriculum | Question-bank population, Gold packs, curriculum taxonomy, IB content build | `ssh qadir@...` or `100.101.76.76` |
| **M5** | Load / regression worker | Regression sweeps, mobile emulation, extra browser passes | `ssh qadir@...` or `100.126.141.79` |
| **VPS (M7)** | Production target | Backups, build, deploy, PM2, live DB | `ssh root@191.218.165.228` or tailscale `m7` |

### 0.2 Transport & connectivity rules

1. **Connectivity gate before any work:** from M2, verify directed reachability to every node on the mesh. Tailscale: `tailscale status`; A2A: `curl http://<node>:9900/.well-known/agent-card.json`; SSH: bounded non-interactive `ssh <node> hostname`. Report transport healthy/host + A2A + SSH as **separate** layers. Do not call the mesh healthy until all three are verified per reached node.
2. **Fan-out:** dispatch independent subsystems to `a2a_call`/`a2a_orchestrate` on owning nodes; gate parallel work on the shared-foundation commit (Phase 2).
3. **No parallel same-file writes:** pre-allocate file ownership per node (see Phase 2). Merge via Git feature branch (`lumaani/fleet-audit` → per-phase sub-branches).
4. **Compute runs on the owner node over SSH**, not `delegate_task`. `delegate_task` is coordinator-local only and does not consume remote cores.
5. **VPS is the only place to build + deploy** (PostgreSQL schema). Local `npx next build` fails on SQLite → expected, not a bug. Never "fix" the wrong copy: confirm PM2 `exec cwd` == actual repo before editing.
6. **Credential / secret rule:** the owner password is provided in §6 below only for the *one secure bootstrap* on the production DB. It must never be hardcoded, committed, placed in a Markdown tracker, printed in logs, or sent via Telegram. Hash with the app's normal password hashing; never echo hashes.

### 0.3 The universal engineering gate (applies to EVERY phase / every defect)

```
AUDIT
→ ESTABLISH ACTUAL TRUTH
→ RESEARCH
→ DESIGN ARCHITECTURE
→ IMPLEMENT (on owning node)
→ POPULATE
→ TEST (unit + integration + API)
→ BROWSER VERIFY (M4, live site / localhost)
→ MOBILE-COMPATIBILITY VERIFY
→ INDEPENDENT RE-AUDIT (a delegate who did NOT implement)
→ REPAIR FAILURES
→ REGRESSION TEST
→ DEPLOY (VPS)
→ PRODUCTION VERIFY (lumaani.com)
→ UPDATE CANONICAL PROJECT STATE
```

If any phase fails:

```
DO NOT ADVANCE.
REPRODUCE → IDENTIFY ROOT CAUSE → REPAIR → RETEST → REGRESSION TEST → INDEPENDENTLY VERIFY → REPEAT UNTIL PASS
```

This is the **audit → repair → test → repair-again → audit-again** loop the owner requires. Nothing advances on a failed gate, and nothing is certified by *continuity alone* — proof is a passing gate.

---

## 1. TWO FULL AUDITS ARE MANDATORY

This mission runs **two independent full audits**, never one.

- **AUDIT 1 (baseline)** — performed by the fleet before repair begins: establishes ground truth, records every verified defect with `FID-LUM-NNN` IDs into the canonical `*_DEFECT_LEDGER`, classifies severity (CRITICAL/HIGH/MEDIUM/LOW).
- **AUDIT 2 (final independent acceptance)** — performed AFTER all repairs by a **fresh delegate who did not implement or repair any subsystem** (per discipline: an auditor who is not the implementer). Must use the **running application** on `lumaani.com`, not documentation alone.

Repeat the audit-repair loop until **CRITICAL = 0 and HIGH = 0**. Do not declare completion on any lesser bar.

---

## 2. PHASE 0 — BOOT, CONNECT, BACKUP, BRANCH (Coordinator M2)

Before touching anything:

1. **Connectivity gate** (§0.2.1). Only proceed to dispatch once the mesh, A2A, and SSH layers are verified and reported.
2. **Read canonical truth** from the repo:
   ```
   PRACTICE_BUDDY_PROJECT_STATE.md
   PRACTICE_BUDDY_ACTIVE_WORKSTREAMS.md
   PRACTICE_BUDDY_DEFECT_LEDGER.md
   PRACTICE_BUDDY_TEST_STATE.md
   PRACTICE_BUDDY_DEPLOYMENT_STATE.md
   PRACTICE_BUDDY_DECISIONS.md
   PRACTICE_BUDDY_CHANGELOG.md
   PRACTICE_BUDDY_MASTER_ARCHITECTURE_TRACEABILITY.md
   ```
3. **Generate an identified ground-truth table** (SSH to VPS): current git commit, PM2 `exec cwd`, Node version, route inventory, DB table/row inventory, question counts by subject, current curriculum, Gold inventory, current roles + admin accounts, current design tokens, PWA config, migration state, production DB state.
4. **Verified backup** (VPS): `pg_dump` to `/opt/backups/*` + tarball of the code minus `node_modules`/`.next`; record commit + timestamp. **No VPS mutation occurs until the backup is verified readable.**
5. **Create the fleet feature branch** and push the shared foundation (shared libs, auth helpers) **first**, so all nodes build on the same base.
6. Pre-allocate **file ownership per node** to prevent merge collisions (M1: `src/app/api`, `prisma/*`, migrations, auth; M3: `src/app/(public|admin)/*`, components, tailwind/globals, PWA; M4: flows/SEO/QA reports; M6: question-bank data, curriculum seed, IB content).

**Never destroy:** `StudentAttempts`, `QuestionVersions`, historical assignments, mastery history, Gold review history, audit logs, production user records.

---

## 3. PHASE 1 — BRAND MIGRATION: PRACTICE BUDDY → LUMAANI (M3 leads, M1+M4 verify)

Make **Lumaani** the only user-visible / runtime brand, everywhere a user, parent, teacher, admin, SEO engine, PWA, mobile app, email recipient, or public API consumer can see it. Scan repo + DB + production for all variants (`Practice Buddy`, `PracticeBuddy`, `practice buddy`, `practicebuddy`, `PRACTICE BUDDY`) across: public pages, student/teacher/admin UIs, login/registration, emails, notifications, PWA manifest, browser titles, metadata/OG/JSON-LD/structured data, favicons/app icons, reports, PDF/print, error + empty states, API-facing labels, CMS/seeded public content, footer, legal/contact, nav, SAT/MAP/curriculum pages.

**Safe-rename rule:** do NOT recklessly rename git history, migration filenames/IDs, or internal immutable references if it creates functional risk. Zero user/runtime-facing "Practice Buddy" must remain; internal repository identifiers that must stay are **documented + proven** (not public, not client-visible, not runtime branding, not harmful). Deliverable: `LUMAANI_PUBLIC_BRAND_AUDIT.md`.

**Independent verify (M4, browser):** every public route + admin route on `lumaani.com` shows no legacy name.

---

## 4. PHASE 2 — DESIGN SYSTEM: ONE LUMAANI GREEN (M3, M4 verifies)

Eliminate the inconsistent green/blue drift. Establish **one canonical Lumaani green token system** — brand-primary (+ hover/active/light/dark), brand-secondary, background/surface/surface-elevated, foreground/muted-foreground, border/focus-ring, success/warning/error/information. Blue is demoted to documented **semantic** tokens (info/data-viz/a11y) only — never a competing primary. Audit CSS vars, Tailwind config, globals, components, inline styles, SVG fills, charts, and every interactive state (**default/hover/focus/active/selected/disabled/loading/success/error/warning**). Fix the known bug: **button text visible only on hover**. Target WCAG AA: contrast, focus-visible, keyboard nav, touch targets, semantic HTML, ARIA, labels, reduced motion, modal focus, math accessibility. Deliverable: `LUMAANI_DESIGN_SYSTEM.md`.

---

## 5. PHASE 3 — OWNER RBAC BOOTSTRAP (M1 leads, secure; M4 verifies login)

> See §6 for the credential. Gate 3 is **not** a code change — it is a **data/role bootstrap on production** and MAY NOT run until Phase 0 backup is verified and the owner-approval report has been delivered (§9.0).

Create or elevate the owner account to the **highest legitimate RBAC** the platform supports (`PLATFORM_OWNER` / `SUPER_ADMIN` / canonical equivalent):

- If the email exists → identify the record → verify identity → elevate safely → verify role. No duplicates.
- Must span **all organizations / schools / users / teachers / students / classes / curricula / questions / QuestionVersions / Gold Questions / AI Factory / content review / publishing / analytics / entitlements / app config / audit reports** — not tenant-restricted.
- Highest RBAC must **NOT** bypass: immutable audit history, password hashing, question-version history, attempt immutability, DB-integrity safeguards.
- **Login verification (M4, real browser):** successful auth, correct role/session, full Back Office nav, direct API authorization, cross-org access where authorized, logout, session renewal.

---

## 6. CREDENTIAL (SECRET — bootstrap use only)

```
Username/email : aeeg.education@gmail.com
Initial password: Admin@2026
```
- Use the app's existing secure bootstrap mechanism, **not** a hardcoded code path.
- Stored ONLY via the app's normal password hashing. Never in source, git, Markdown, logs, Telegram, or plaintext. Never expose hashes in the Back Office. Never echo in reports.

---

## 7. PHASES 4+ — WORKSTREAM DISPATCH (fleet-wide)

These are grouped into parallel-able workstreams owned by nodes; each runs the §0.3 gate. Coordinator sequences gates, merges branches, and files every finding into `*_DEFECT_LEDGER` with `FID-LUM-NNN`.

### WS-A · Back Office & Question Bank (M1 backend, M3 UI, M4 verify) — original Phases 4, 21, 23, 24
Back Office must be a **real operational control center**, not an empty shell:
- Admin areas: Dashboard, Organizations, Schools, Users/Roles/Permissions/Students/Teachers/Administrators, Classes/Rosters, Curriculum (Programs/Subjects/Levels/Domains/Subdomains/Categories/Skills/MicroSkills/Learning Objectives), American/MAP/SAT/IB DP mappings, Question Bank (editor, versions, families, passages, media/audio, Gold), AI Question Factory (generation queue, validation, duplicate detection, review, publishing, archiving), Assignments, Reports, Analytics, Entitlements, Feature flags, App settings, Branding, Audit logs.
- Question Bank must show **real records** with search/filter/sort/pagination/preview/open/create/edit/version/create-version/validate/review/approve/reject/publish/unpublish/archive/inspect-provenance/answer/explanation/strategy/assets/family/Gold-status/usage/performance/validation-history/duplicates.
- **Zero fake admin functionality:** every visible control works completely OR is removed/disabled with justification. No fake success messages, placeholder charts, fake counts, dead tabs, visual-only toggles, dummy users, demo data, static analytics. Production empty states are **truthful** (show empty, don't fabricate). Deliverable: `LUMAANI_BACK_OFFICE_AUDIT.md`.

### WS-B · Curriculum reconciliation & coverage (M6 content, M1 data) — original Phases 6, 7, 19, 20
- **KEEP:** American Curriculum, MAP Test Prep, Digital SAT. **REMOVE/ARCHIVE safely:** IGCSE, IB PYP, IB MYP (archive preserving relational integrity; hide from new assignments; block new content; verify no public cards/nav/orphans/broken historical data).
- **EXPAND:** IB Diploma Programme.
- Verify planned coverage actually delivers (not merely exists): American ELA + Math G3–10; MAP Math/Reading/Language Usage; SAT Reading&Writing/Math; IB DP Language A SL/HL, Language B SL/HL, Math AA SL/HL, Math AI SL/HL — each verified for curriculum, domains, skills, MicroSkills, question inventory, Gold coverage, delivery, assignments, teacher/admin access, analytics, mobile compatibility. Deliverable: `LUMAANI_CURRICULUM_COVERAGE.md`.
- **Regression (M5):** IB expansion must not damage MAP/SAT (they keep the standard two-attempt engine).

### WS-C · IB DP RESEARCH (M6 + fresh web research) — original Phases 8, 9
- **Current 2026 spec only.** Build for the IB DP requirements in force for current 2026 students. Classify any "first assessment 2029 / first teaching 2027 / new syllabus" as **FUTURE SPEC — DO NOT IMPLEMENT AS CURRENT**; keep a migration note. Use official IB sources first.
- Deliverables: `LUMAANI_IBDP_CURRENT_ARCHITECTURE_RESEARCH.md` (course structure, SL/HL differences, syllabus, assessment components/criteria, paper structure, IA, calculator rules, timing, marks/weightings, task types, command terms, rubrics, media/oral/writing requirements, effective dates, sources) AND `LUMAANI_IBDP_COMPETITOR_AUDIT.md` (Revision Village, Kognity, Save My Exams, RevisionDojo, InThinking + current market; adopt-conceptual-only, never copy copyrighted questions/markschemes/assets).

### WS-D · IB DP ARCHITECTURE & ENGINE (M1 schema, M3 UI, M6 content) — original Phases 10–16
- **First-class IB DP section:** Language A SL/HL (English A: Language & Literature — distinct from A: Literature), Language B SL/HL (English B, 5 prescribed themes), Math AA SL/HL, Math AI SL/HL.
- **IB DP does NOT use the standard two-attempt engine** (explicit owner decision). Use: student completes response → submit → one immutable attempt → score/criterion evaluation → feedback → exemplar guidance → "Start New Attempt" creates a new independent response. Preserve each response.
- **Assessment criteria as structured data** (`IBCourse/IBCriterion/IBCriterionBand/IBTaskType/IBPracticeTask/IBStudentResponse/IBCriterionResult/IBFeedback` or clean free-standing integration — reuse Question/QuestionVersion core). Retrieve **exact current criteria** via research; never from memory. Deliverable: `LUMAANI_IBDP_ASSESSMENT_CRITERIA.md` + `LUMAANI_IBDP_ARCHITECTURE.md`.
- Paper 1 / Paper 2 / Individual Oral / HL Essay / Language B productive writing / reading / **true listening** (audio, no transcript-during-assessment) / oral recording — all criterion-based, mobile-ready (mic, audio upload/playback, secure storage). Math: AA vs AI distinct emphases, paper-specific modes, correct calculator policy and timing (current spec), equation rendering, graphs, tables, stats, multi-part, IA/math-exploration module.
- **AI evaluation engine:** criterion-aware structured feedback (strengths, weaknesses, missing evidence, organization, language, next action). **Never display official IB grade/mark/score** unless legally+technically justified — use "Lumaani criterion estimate / Criterion-aligned feedback / Practice score / Estimated performance band." Feed must not be canned/static. Validate the evaluator against strong/middle/weak/irrelevant/empty/off-topic responses.

### WS-E · GOLD STARTER BANK (M6 builds, M4 verifies each item executes) — original Phases 17, 18, 22
- **≥10 GOLD-standard practice items per terminal assessable curriculum node** for American / MAP / SAT (per MicroSkill/LO; higher levels aggregate valid descendants, no duplicate-for-counts).
- For IB DP, a "Gold item" is the **authentic task type** (exam-style or multi-part math, unseen-text analysis, essay prompt, comparative planning, criterion micro-practice, productive writing, reading set, listening set, oral prompt/stimulus, IA criterion exercise) — not fake MC substitutes.
- Every counted Gold item must **actually execute** production-equivalent: load, render, media, interaction, submit, evaluate, persist, feedback, version pin, history, mobile. Broken content does not count.
- **Gold truth:** distinguish `Gold Candidate` / `Approved Gold` / `Human-Certified Gold`; never label AI content as human-certified. Deliverables: `LUMAANI_IBDP_GOLD_COVERAGE.md` + `LUMAANI_IBDP_TEST_STATE.md`.

### WS-F · WEB ↔ APP PARITY (M3 + M1, M4 verifies) — original Phases 5, 22
- Core product truth stays **server-side**; mobile apps consume the same auth/curriculum/delivery/attempt/mastery/assignments/MAP/SAT/IB/entitlements/analytics via stable APIs. No browser-only (`localStorage`) authoritative state.
- Deliverable: `LUMAANI_WEB_APP_PARITY_MATRIX.md` — every feature: Web/PWA/Android/iOS status, shared API, shared data model, required renderer, media, offline, deep-link, auth, readiness.
- Every QuestionType has a defined Web+Mobile renderer path (esp. IB long-form writing, audio listening, oral, graphs, math, drag/drop, matching, ordering, passage analysis).

### WS-G · SECURITY / RBAC / RESPONSIVE REGRESSION (M1 security, M3 a11y, M4 journeys, M5 mobile) — original Phases 25, 26
- RBAC: owner/admin/teacher/student, org boundaries, direct API auth, IDOR, sessions, password security. Highest owner RBAC must not weaken tenant protection for lower roles.
- Responsive: 320/375/430px, tablet portrait/landscape, desktop, wide. Target WCAG AA; special attention to IB essays, rubrics, audio, timers, math, graphs, multi-part, tables, criterion feedback.

### WS-Z · DEFECT REPAIR LOOP & CANONICAL STATE (M2 coordinator) — original Phases 28, 31
Every failure enters `*_DEFECT_LEDGER` → REPRODUCE → ROOT CAUSE → REPAIR → TARGETED TEST → SUBSYSTEM REGRESSION → FULL REGRESSION → INDEPENDENT RETEST → PASS. Update all canonical trackers + create/update all `LUMAANI_*` deliverables listed throughout this charter.

---

## 8. DEPLOY + PRODUCTION VERIFY (M1 + VPS, Coordinator M2) — original Phases 29, 30

1. Pre-deploy: backed-up DB, recorded production commit, verified migrations/secrets/env, build + tests pass, release commit/tag.
2. Deploy the **exact verified commit**; confirm `expected release commit == built commit == running production commit` (PM2 `exec cwd` check first!).
3. **Production verify on https://lumaani.com** (not localhost): Lumaani branding, green palette, login, owner account, Back Office, Question Bank, American/MAP/SAT, all 8 IB DP courses (Lang A SL/HL, Lang B SL/HL, Math AA SL/HL, Math AI SL/HL), Gold content, question delivery, constructed response, criterion feedback, audio, math rendering, student/teacher/admin, mobile viewport, PWA.

---

## 9. TELEGRAM REPORTING

Send a Telegram milestone report at **every phase gate**, plus **immediate blocker alerts** requiring human intervention. Do not wait for replies. **Never include the owner password or hashes.**

- 9.0 **Owner-approval gate report** before ANY production mutation (the RBAC bootstrap, data purges, deploys): present findings + repair plan, and **wait for approval** before mutating live DB / deploying. (Owner rule: audits and fixes are separate; fixes do not start on live data without this.)
- Per-phase: phase completed, issues found, root causes, repairs, tests run, remaining issues, calibrated completion %.

Sample formats (brand / back office / IB research / Gold coverage / acceptance) are retained verbatim from the original mission.

---

## 10. FINAL ACCEPTANCE

Produce `LUMAANI_FULL_PLATFORM_AND_IBDP_ACCEPTANCE_REPORT.md` covering every field from the original mission (commit, timestamps, brand residue, palette, a11y, owner RBAC, back office, active/removed programs, curriculum coverage, all 8 IB courses, current-2026 vs future-2029 sources, criteria, Gold counts/deficits/execution tests, web/app parity, fake-data residue, role regressions, critical+high counts, independent audit status).

**Do NOT declare complete until (abridged):**
- Lumaani is the only public name; zero user-visible Practice Buddy branding; internal legacy refs documented + harmless.
- One consistent Lumaani green; blue removed from primary brand; buttons/states readable + accessible.
- `aeeg.education@gmail.com` holds highest legit RBAC; password hashed, never exposed; full Back Office; real records.
- American/MAP/SAT active & functional; IGCSE/IB PYP/IB MYP removed/archived safely.
- IB DP substantially expanded on **current 2026** requirements (2029 excluded); all 8 courses work; criteria modeled as structured data; IB uses its own single-submission/new-attempt model (NOT the two-chance engine); long-form/criterion/reading/listening/oral/math modes work; paper-specific math modes work.
- ≥10 valid, **actually-functioning** Gold starters per terminal node with authentic IB task types; QuestionVersions reproducible.
- Zero fake data / fake AI results / dead controls; full web/mobile parity.
- Full regression passes; **independent audit (AUDIT 2 by non-implementing delegates) passes**; **CRITICAL = 0 and HIGH = 0**.

**Begin with ground truth (§2). Do not redesign verified systems unnecessarily. Proceed autonomously through the gated loop — audit → repair → test → repair again → audit again — until the acceptance bar passes on the live product.**
