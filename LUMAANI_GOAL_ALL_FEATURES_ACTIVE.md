# /goal — Lumaani: Full Feature Activation, Repair & Continued Development

> **Self-contained execution prompt for the Lumaani platform.** Run this as the canonical goal.
> Prepared 2026-08-29 · grounded in the 2026-08-29 Production Audit & Repair Final Report
> (CRITICAL=0 · HIGH=0 baseline) and a live route/API inventory of the deployed codebase.

---

## Mission

Transform **Lumaani** (lumaani.com) into a **fully functional, end-to-end working education
SaaS** — not a static shell. Every feature that exists in the codebase must either (a) actually
work against the production database and be reachable by the intended role, or (b) be
**explicitly disabled, removed, or gated** so it never presents a dead or misleading control.

The platform is currently *visually complete and on-brand* (Option 5 Deep Teal + Copper), but
the audit proved that visual completeness ≠ functional completeness. The prior cycle restored
core auth + practice; this goal makes **every module active and verified** — admin back-office,
AI features, teacher/parent surfaces, MAP/SAT/simulation/mock-exams, live classroom, guided
instruction, payments/entitlements, and analytics.

No feature is assumed working because its page renders. No repair is complete until verified
through **live API + real browser + database-level evidence**. All progress and completion
reports go to **Telegram**. Only the owner authorizes production mutations.

---

## Source of Truth (never edit the wrong copy)

| Item | Canonical value |
|------|-----------------|
| Repo | `~/projects/practicebuddy` (local) == `aeeg-office/practicebuddy` (GitHub, public) |
| Live | https://lumaani.com → Docker `lumaani` @ :3099 on VPS `191.218.165.228` |
| Build context | `/var/www/lumaani/repo` (docker-compose `/opt/docker/lumaani/docker-compose.yml`) |
| DB | PostgreSQL `lumaani_prod` (`DATABASE_URL` in `/var/www/lumaani/repo/.env`) |
| Brand | Option 5 — Deep Teal `#0b4f4a` + Copper `#c8785a` (canonical in `globals.css` `@theme`) |
| VPS SSH | `ssh -i ~/.ssh/id_ed25519_aeeg_vps root@191.218.165.228` (BatchMode, ConnectTimeout 15) |
| Deploy keys | M2 has **no** GitHub push key; VPS pushes via `/root/.ssh/github_aeeg` |

**Drift guard (mandatory, from prior incidents):** before ANY edit, confirm
`local HEAD == VPS /var/www/lumaani/repo HEAD == live /api/version commit`. If the VPS repo git
is corrupt/divergent (it was in Aug 2026), repair by fresh-cloning `origin/main` on the VPS and
re-pointing `/var/www/lumaani/repo`, preserving `.env` + `start.sh` from `/opt/backups/`.

---

## Constraints & Rules (non-negotiable)

1. **Fleet via SSH, not `delegate_task`** for any remote compute. Coordinator = M2 (this box).
   Fleet peers M1/M3/M4/M5/M6 participate where a parallel read-only audit is useful (each
   probes a slice of routes/APIs and reports back). Tailscale is the reachability source of
   truth (LAN 192.168.x aliases give false offline).
2. **Owner-approval gate before any production mutation** — schema changes, data seeds/purges,
   role bootstrap, and deploys all require explicit owner sign-off via Telegram. Read-only
   audit/reproduce/root-cause always proceeds first; fix happens only after approval.
3. **Present findings FIRST; do not fix until told** — applies to every defect discovered.
4. **No fabrication.** A feature is only "active" with DB + browser evidence. No faking a
   metric, seed, or screenshot. If a feature's data or integration truly cannot work, disable or
   remove it rather than leave a dead control.
5. **Never leak credentials** in reports or Telegram. Secrets live in env files only.
6. **Every state-changing write is verified by reading it back** (DB row, API response, or
   container status) before claiming success.
7. **Phased, verify-after-each-step.** Long git/build output → redirect to `/tmp` then read.

---

## Current Feature Surface (from live inventory — audit EVERY item)

**Public / student:** `practice`, `practice/[subject]`, `practice/[subject]/[skillId]`,
`subjects`, `map-prep` (+7 subpages: math/reading/language-usage/rit-practice/recommendations/
warm-up/mixed), `sat-prep`, `sat-simulation`, `mock-exams`, `mock-exams/[exam]/[module]`,
`speaking`/`writing`/`listening` (+detail routes), `ai-tutor`, `guided-instruction`,
`live-classroom`, `dashboard` (+progress/schedule/settings), `parent`, `teacher`, `login`,
`register`.

**Admin (20+ modules):** dashboard, questions (+create/edit/import), courses (+create),
curriculum, exams (+create), ai-factory, analytics, audit-log, database, database-integrity,
organizations, payments, review-queue, settings/platform-settings, students, teachers (+add),
users, access-codes, feature-flags, micro-skills, subscription-plans, assignments.

**APIs (40+):** `auth/*` (register/login/logout/me/redeem-code), `practice/*`
(skills/questions/attempts/mastery/progress), `dashboard`, `teacher/dashboard`, `ai-tutor`,
`chat`, `entitlements`, `user/subscription`, `version`, and a full `admin/*` tree
(questions, courses, exams, ai-factory, analytics, students, teachers, users, skills,
micro-skills, assignments, access-codes, review-queue, payments, subscription-plans,
platform-settings, feature-flags, database-integrity).

---

## Known baseline (already resolved — do NOT regress)

- FUNC-001 (all DB 500) — fixed (`DATABASE_URL` → `lumaani_prod`). **Guard:** confirm env is
  correct before any deploy and re-verify after.
- FUNC-002 (24 `https://mailto:` links), FUNC-003 (`english` subject enum) — fixed.
- DESIGN-001/002/003 (491 legacy navy/amber → Option 5; badge/button tokens) — fixed.

**Known outstanding (carry forward):**
- **FUNC-004** — `mockSkills` still imported in the practice page layer (taxonomy). API already
  returns real data → refactor pages to treat API as single source of truth.
- **FUNC-005** — operational data empty (8,415 questions but ~1 user / 0 teachers / 0 attempts).
  Pre-launch seed required to exercise student/teacher/admin E2E.
- **Design polish** — WhatsApp CTA emerald vs success color inconsistency.
- **Versioning** — `/api/version` returns `commit: "unknown"`; inject build-time commit SHA.

---

## Phases (execute in order; each phase gate-reports to Telegram)

### Phase 0 — Protect & Align (safety)
1. Record: local HEAD, VPS repo HEAD, live `/api/version`, container status, DB reachable.
2. Verified DB backup before any mutation (`pg_dump` → `/opt/backups/`).
3. Feature branch `feature/all-features-active` from `main` (never mutate main directly).
4. Confirm `npm ci` + `prisma generate` + `tsc --noEmit` all clean on the branch.

### Phase 1 — Full Feature Triage (read-only, parallel across fleet)
For **every** page and API route above, classify into one of:
- ✅ **ACTIVE** — wired to DB, verified working.
- 🟡 **STUB/SHELL** — renders but not wired (placeholder, mock, dead button, no API).
- 🔴 **BROKEN** — errors (500/404/type error) or auth-guarded incorrectly.
- ⚪ **MISSING DATA** — functional but no rows (pre-launch, not a code defect).

Deliver a **defect register** (FUNC-NNN/DESIGN-NNN/DATA-NNN) with severity + root cause +
acceptance criteria. Do NOT fix in this phase.

### Phase 2 — Repair Known + Triage-Discovered Defects (gated)
After owner approval of the register, fix in dependency order:
1. FUNC-004 (mockSkills removal) as a standalone refactor with full test pass.
2. Versioning: inject build commit into `/api/version` + track `version.json`.
3. WhatsApp CTA color standardization.
4. Every 🔴 BROKEN and 🟡 STUB from Phase 1 → make ACTIVE or explicitly disable/remove.
5. Auth-guard audit: every `admin/*` API must 401 unauth; every admin page 307→login.

### Phase 3 — Operational Data Readiness (owner decision required)
- Propose a minimal, safe seed plan (admin + test student/teacher + sample attempts) for FUNC-005.
- **Await owner approval** on seed contents before any `INSERT` into `lumaani_prod`.
- After seed, exercise real student→attempt→progress→teacher→admin flows.

### Phase 4 — End-to-End Verification (browser + DB)
- Register → login → practice → submit attempt → mastery/progress update → teacher dashboard →
  admin review → audit-log entry. Every step DB-confirmed.
- MAP/SAT/simulation/mock-exams happy paths; speaking/writing/listening; ai-tutor + chat;
  live-classroom + guided-instruction (or explicitly gate if not production-ready).
- Payments/entitlements/subscriptions — verify or disable.
- Analytics/admin reports return real data, not zeros/mock.

### Phase 5 — Deploy, Verify Live, Document
1. `npm ci` + `prisma generate` + `npm run build` (0 errors) in `/var/www/lumaani/repo`.
2. `docker compose build && up -d`; confirm container healthy; re-check env not reverted.
3. Live smoke test (route matrix + `/api/version` commit matches deployed HEAD).
4. Independent second audit (fresh eyes) — CRITICAL=0, HIGH=0, no dead controls, 0 legacy colors.
5. Update `PRACTICE_BUDDY_DEPLOYMENT_STATE.md` + changelog + defect ledger; push via VPS key.
6. Final Telegram report: what's ACTIVE, what was disabled/removed and why, cost, commits.

---

## Completion Metric (hard gate)

- **CRITICAL=0 and HIGH=0** in the final defect register.
- Every page route returns 200 (or is intentionally gated to login with 307).
- Every API returns correct JSON and correct auth (401 unauth / 200 authorized).
- **0** legacy navy/amber hex in rendered HTML across all pages.
- **0** broken `mailto:`/dead controls.
- `/api/version` commit == deployed HEAD.
- Every "active" claim backed by a live API + browser + DB evidence trail.
- Pre-launch data gap (empty users/attempts) either seeded (with approval) or explicitly
  documented as a launch-blocker, never silently left half-wired.

---

## Report cadence (Telegram)

- Report at the end of **every phase** with a calibrated completion % and any blockers.
- Immediate blocker report if blocked (do not silently stall).
- Final completion report with the full ACTIVE / DISABLED / REMOVED inventory.

## Escalation

- Any FAIL on a critical path → STOP → reproduce → root-cause → repair → retest → report.
- Never "fix the wrong copy": confirm PM2/Docker `exec cwd` == canonical repo before editing.
- If the VPS git is corrupt, repair via fresh clone (see Drift guard) rather than fighting it.
