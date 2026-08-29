# Lumaani Production Function & Design Audit

**Date:** 2026-08-29
**Target:** https://lumaani.com (live production)
**Auditor:** DeepSeek V4 Pro
**Source of Truth:** Local HEAD = VPS HEAD = `7d9697f`, Docker `lumaani` Up 15h (healthy)

---

## Executive Summary

| Severity | Count | Status |
|----------|-------|--------|
| **Critical** | 1 | All DB-backed endpoints down (500) |
| **High** | 4 | Legacy navy still live, subject enum mismatch, dead WhatsApp links |
| **Medium** | 4 | Mock data in page layer, badge token violation, empty operational DB |
| **Low** | 2 | Hardcoded hex in shared components, stale version.json |

**Net assessment:** The production platform is a **static shell** — all authenticated/DB-backed functionality is broken (Critical). The live UI carries pervasive legacy AEEG navy/amber brand colors across 6+ modules despite the Option 5 teal+copper redesign (High). WhatsApp "support" links are dead controls across 24+ locations (High). The practice taxonomy is hardcoded mock data, not DB-driven (Medium).

---

## 1. Source of Truth

| Check | Expected | Actual | Result |
|-------|----------|--------|--------|
| Local HEAD | — | `7d9697f` | ✅ |
| VPS repo HEAD | == local | `7d9697f` | ✅ |
| Docker container | healthy | Up 15 hours (healthy) | ✅ |
| Live commit (`/api/version`) | == HEAD | `"unknown"` | ⚠️ LOW |
| `version.json` | matches HEAD | stale `9b60bd1b` (Aug 26) | ⚠️ LOW |
| Container `DATABASE_URL` | `lumaani_prod` | `practice_buddy` (STALE) | 🔴 CRITICAL |

**Drift:** The `version.json` file is untracked and stale (Aug 26 vs HEAD Aug 29). `/api/version` returns `commit: "unknown"` — build-time commit metadata is not injected. Minor.

---

## 2. Defect Register

### 🔴 CRITICAL (1)

**FUNC-001: All DB-backed endpoints return 500 — stale DATABASE_URL**

- **Area:** Infrastructure / Database connection
- **Evidence:**
  - `POST /api/auth/register` → `{"error":"Internal server error"}`
  - `POST /api/auth/login` → `{"error":"Internal server error"}`
  - `GET /api/practice/skills?subject=math` → `{"error":"Internal server error"}`
  - Container logs: `AuthenticationFailed` for `practice_buddy` user
- **Root cause:** During Practice Buddy → Lumaani rename, the DB was migrated to `lumaani_prod` (owner `lumaani_prod`) but the container's `env_file` (`/var/www/lumaani/repo/.env`) still has `DATABASE_URL="postgresql://practice_buddy:***@localhost:5432/practice_buddy"`. The `practice_buddy` user and database no longer exist on the Postgres server. The correct `DATABASE_URL` exists at `/var/www/lumaani/.env` (`postgresql://lumaani_prod:***@localhost:5432/lumaani_prod`) but is not used by the Docker container.
- **Affected:** All API routes, auth, practice, teacher/admin dashboard, AI features — anything that touches the database.
- **Repair:** Update `DATABASE_URL` in `/var/www/lumaani/repo/.env` to match the correct `/var/www/lumaani/.env` value, then `docker compose -f /opt/docker/lumaani/docker-compose.yml up -d`.
- **Dependencies:** Need verified backup first (backups exist at `/opt/backups/db/lumaani_prod_*.dump` and `/opt/backups/lumaani/lumaani_prod_20260828_091821.sql`).
- **Acceptance:** `POST /api/auth/register` → 200/400 (not 500), `GET /api/practice/skills?subject=math` → 200 with real data.

---

### 🔴 HIGH (4)

**DESIGN-001: Legacy AEEG navy/amber brand colors still live across 6+ modules**

- **Area:** Design / Brand identity
- **Evidence (live, confirmed via curl):**
  - `/subjects`: 33× `rgb(13,33,55)` + 33× `rgb(245,166,35)` + 30× `rgb(26,35,126)` (=`#1a237e`)
  - `/speaking`: 21× navy + 23× `rgb(26,35,126)` + 9× amber
  - `/writing`: 18× navy + 21× `rgb(26,35,126)` + 8× amber
  - `/listening`: 12× navy + 18× `rgb(26,35,126)` + 9× amber
  - `/parent`: 9× navy + 7× `rgb(26,35,126)` + 1× amber
  - `/teacher`: 12× navy + 11× `rgb(26,35,126)` + 3× amber
- **Root cause:** The Option 5 color sweep (commit `06ce85a`, "eliminate 5 legacy brand color families, 371 replacements") only covered `components/`, `globals.css`, `tailwind.config`, and select pages. The speaking, listening, writing, parent, teacher, and subjects modules were **not swept**. These pages still use hardcoded `rgb(26,35,126)` (AEEG indigo `#1a237e`), `rgb(13,33,55)` (dark navy), and `rgb(245,166,35)` (AEEG amber).
- **Affected files:** `src/app/speaking/[...slug]/page.tsx`, `src/app/speaking/page.tsx`, `src/app/writing/[type]/page.tsx`, `src/app/writing/page.tsx`, `src/app/listening/[...slug]/page.tsx`, `src/app/listening/page.tsx`, `src/app/parent/page.tsx`, `src/app/teacher/page.tsx`, `src/app/subjects/page.tsx`
- **Repair:** Apply the Option 5 token mapping to these modules: `rgb(26,35,126)` → `var(--color-primary)` / `#0b4f4a`, `rgb(13,33,55)` → `var(--color-foreground)` / `#162022`, `rgb(245,166,35)` → `var(--color-accent)` / `#c8785a`. Preserve WhatsApp green (`emerald-600/800` — semantic, not brand).
- **Dependencies:** None.
- **Acceptance:** `curl https://lumaani.com/subjects | grep -c 'rgb(26,35,126)'` → 0, same for speaking/writing/listening/parent/teacher.

**DESIGN-002: `badge.tsx` accent = legacy amber, not copper**

- **Area:** Design / Shared components
- **Evidence:** `src/components/ui/badge.tsx:14` — `accent: "border-transparent bg-[rgb(245,166,35)] text-white"` — this is legacy AEEG amber, not Option 5 copper `#c8785a`. Also `success: "border-transparent bg-[rgb(16,185,129)] text-white"` — emerald green, not `--color-success: #15805a`.
- **Root cause:** Badge variants were not updated during the Option 5 sweep. The `accent` variant hardcodes the old amber, and `success` uses emerald instead of the design token.
- **Affected:** `src/components/ui/badge.tsx`
- **Repair:** Change `accent` to `"bg-accent text-accent-foreground"` (token reference). Change `success` to `"bg-success text-white"` (or `"bg-[#15805a] text-white"` matching spec).
- **Acceptance:** `rg 'rgb(245,166,35)' src/components/ui/badge.tsx` → 0 matches.

**FUNC-002: WhatsApp "Support" links are dead/broken controls (24+ locations)**

- **Area:** Function / Navigation
- **Evidence:** Across 17 files, 24+ occurrences of `href="https://mailto:hello@lumaani.com"`. This is a **malformed URL** — `https://mailto:` is not a valid scheme. The label says "WhatsApp Support" / "Chat on WhatsApp" but:
  - Zero `wa.me` URLs exist anywhere in the codebase
  - The href is a broken `https://mailto:` (should be `mailto:hello@lumaani.com` or a real `https://wa.me/<number>`)
  - Clicking these links opens a broken page (browser treats `mailto:hello@lumaani.com` as a hostname)
- **Root cause:** The WhatsApp integration was never implemented. A placeholder `mailto:` was added but prefixed with `https://` (malformed). The `trackWhatsApp` analytics helper exists but no actual WhatsApp URL is wired.
- **Affected files:** `practice/layout.tsx`, `practice/page.tsx`, `practice/[subject]/page.tsx`, `speaking/page.tsx`, `speaking/[...slug]/page.tsx`, `writing/page.tsx`, `writing/[type]/page.tsx`, `listening/page.tsx`, `listening/[...slug]/page.tsx`, `parent/page.tsx`, `teacher/page.tsx`, `dashboard/page.tsx`, `ai-tutor/layout.tsx`, `ai-tutor/page.tsx`, `mock-exams/page.tsx`, `mock-exams/[exam]/[module]/page.tsx`, `subjects/page.tsx`
- **Repair:** Either: (a) Wire a real `https://wa.me/<number>` URL with the correct phone number, or (b) Change to `mailto:hello@lumaani.com` (remove `https://` prefix) if WhatsApp is not yet available. Prefer option (a) if the WhatsApp number is known.
- **Dependencies:** Need the actual WhatsApp business number.
- **Acceptance:** `rg 'https://mailto:' src/` → 0 matches. All links point to either a valid `mailto:` or `https://wa.me/`.

**FUNC-003: Subject enum mismatch — API rejects SAT/MAP/IB**

- **Area:** Function / Practice API
- **Evidence:** `GET /api/practice/skills?subject=sat` → `{"error":"Invalid or missing subject. Valid values: math, reading, writing, science"}`
- **Root cause:** `src/data/practice-skills.ts` defines `VALID_SUBJECTS = ["math", "reading", "writing", "science"]` and `LEGACY_SUBJECTS = ["sat", "act", "ielts", "toefl", "english"]`. The API validates against `VALID_SUBJECTS` only. The homepage and sitemap advertise "SAT Practice" and the site has `/sat-prep` and `/map-prep` pages, but the practice API cannot serve SAT/MAP/IB skills.
- **Affected:** `src/app/api/practice/skills/route.ts`, `src/data/practice-skills.ts`
- **Repair:** Add `sat`, `act`, `ielts`, `toefl`, `english` to `VALID_SUBJECTS` (or remove the legacy split). The `mockSkills` data already includes SAT/ACT/IELTS/TOEFL entries — the API just refuses them.
- **Dependencies:** Verify question data exists in DB for these subjects (probe: `gold_questions` = 8415, `questions` = 25279 — likely includes SAT data).
- **Acceptance:** `GET /api/practice/skills?subject=sat` → 200 with skill taxonomy.

---

### 🟡 MEDIUM (4)

**FUNC-004: `mockSkills`/`mockSubjectMeta` hardcoded in page layer (not DB-driven)**

- **Area:** Function / Practice taxonomy
- **Evidence:** `src/app/practice/page.tsx` imports `mockSkills, subjectList, mockSubjectMeta` from `@/data/practice-skills` and uses them directly for filtering, navigation, and rendering. The API enriches mock data with real DB counts, but the taxonomy itself (skill names, domains, difficulty labels) is static mock data. The `@/skill` warning explicitly flags this as the #1 practice-section pattern to fix.
- **Affected:** `src/app/practice/page.tsx`, `src/app/practice/[subject]/page.tsx`, `src/app/practice/[subject]/[skillId]/page.tsx`, `src/data/practice-skills.ts`
- **Repair:** Refactor pages to use the API response (`/api/practice/skills?subject=...`) as the single source of truth, removing direct `mockSkills` imports. The API already enriches with real DB question counts.
- **Acceptance:** `rg 'import.*mockSkills' src/app/practice/` → 0 matches.

**FUNC-005: Empty operational DB — no users, teachers, students, attempts**

- **Area:** Data / Operations
- **Evidence:** `lumaani_prod` DB has 41 tables, 8415 `gold_questions`, 25279 `questions`, 14400 `question_versions` — but `users=1`, `teachers=0`, `student_attempts=0`, `assignments=0`, `classes=0`, `subjects=0`. The platform has content but zero operational data. This is not a defect per se (could be pre-launch), but means every workflow that requires a user (practice, assignments, progress, teacher dashboard, admin) is untestable until seeded.
- **Repair:** Seed a minimum viable dataset: admin user, 3-5 test students, 1-2 teachers, 1-2 classes, sample assignments, and practice attempts. Use the existing seed scripts (`prisma/seed-*.ts`).
- **Acceptance:** `users >= 5`, `teachers >= 2`, `student_attempts >= 10`.

**DESIGN-003: Hardcoded hex/rgb in `button.tsx` and `badge.tsx` (token compliance)**

- **Area:** Design / Token system
- **Evidence:** `button.tsx` cva variants use hardcoded hex: `default: "bg-[#0b4f4a] text-white hover:bg-[#09423e]"`, `secondary: "bg-[#29374a] text-white hover:bg-[#1f2a37]"`, `accent: "bg-[#c8785a] text-[#1a1a2e] hover:bg-[#b0684d]"`. The colors ARE correct (match Option 5 spec), but hardcoded rather than token-referenced. The `@design-system-ux-architecture` skill flags this as the #1 compliance failure: "Developers routinely use `bg-[rgb(...)]` or `text-[#hex]` instead of `bg-primary` / `text-secondary`."
- **Affected:** `src/components/ui/button.tsx`, `src/components/ui/badge.tsx`
- **Repair:** Replace hardcoded hex with token references: `bg-primary text-primary-foreground hover:bg-primary-hover`, `bg-secondary text-secondary-foreground`, `bg-accent text-accent-foreground`.
- **Acceptance:** `rg 'bg-\[#|text-\[#' src/components/ui/button.tsx src/components/ui/badge.tsx` → 0 matches.

**FUNC-006: emerald-600/emerald-800 used as WhatsApp green (semantic, not brand)**

- **Area:** Design / Color semantics
- **Evidence:** Emerald green (`emerald-600`, `emerald-800`, `emerald-50`) is used across multiple modules for "WhatsApp Support" UI elements. This is semantic (WhatsApp green) and per the skill note "leave third-party WhatsApp green alone" — but the consistency is poor. Most modules use emerald, some use different greens. The Option 5 `--color-success` is `#15805a` (different from emerald).
- **Recommendation:** Either standardize on emerald for WhatsApp CTAs only, or replace with the platform's success color. This is LOW priority since it's semantic, not a competing brand identity.
- **Acceptance:** Document the decision. No code change required unless inconsistent.

---

## 3. Not Defects (Verified OK)

- **Homepage:** 200, security headers present (HSTS, CSP, X-Frame, XSS, Referrer-Policy), Next.js ISR cache active.
- **Sitemap:** Valid XML, correct domain, 2+ URLs (home, sat-prep).
- **Auth guards:** All admin/dashboard/teacher API endpoints → 401 without auth ✅
- **No `wa.me` literal URLs:** Zero actual WhatsApp links exist — the "WhatsApp" CTAs are broken `https://mailto:` (see FUNC-002).
- **No `#1a237e` in primary components:** `button.tsx`, `globals.css`, `tailwind.config` are all on Option 5 tokens. The navy is in the UNSWEPT modules only.
- **Docker infrastructure:** `network_mode: host`, port 3099, 1.5G memory / 0.65 CPU.
- **DB backups:** Daily dumps at `/opt/backups/db/lumaani_prod_*.dump` (last 5 nights available).

---

## 4. Repair Order (by dependency)

| Priority | ID | What | Risk | Blocks |
|----------|----|------|------|--------|
| **1** | FUNC-001 | Fix DATABASE_URL (critical — all backend down) | Low (one-line config fix) | Everything below |
| **2** | FUNC-003 | Add SAT/MAP/IB to VALID_SUBJECTS | Low (enum change) | Practice API testing |
| **3** | FUNC-002 | Fix broken `https://mailto:` links | Low (URL fix) | None |
| **4** | DESIGN-001 | Sweep legacy navy/amber from 6 modules | Low (CSS color replacement) | None |
| **5** | DESIGN-002 | Fix badge.tsx accent + success tokens | Low (shared component) | DESIGN-001 consistency |
| **6** | FUNC-004 | Remove mockSkills from page layer | Medium (refactor) | FUNC-001 (needs DB for API) |
| **7** | FUNC-005 | Seed operational data | Medium (DB mutation) | FUNC-001 |
| **8** | DESIGN-003 | Tokenize button.tsx/badge.tsx hex | Low (refactor) | DESIGN-001/002 |

---

## 5. Acceptance Criteria

Per the mission:
- Critical defects = 0
- High production blockers = 0
- No fake/mock production data
- No dead production controls
- Lumaani branding consistent (Option 5: Deep Teal + Copper)
- Legacy AEEG/blue brand styling removed
- Responsive/mobile checks PASS
- Functional regression PASS
- Pro independent verification PASS