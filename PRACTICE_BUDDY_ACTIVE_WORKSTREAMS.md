# Practice Buddy Active Workstreams

## Locking Protocol
- Read-only audits may overlap
- Write tasks must NOT conflict on the same file set
- Check this ledger before assigning write access
- M2 must approve all file ownership assignments

---

## Active Workstreams

### WS-001: Second Audit (COMPLETE)

| Field | Value |
|-------|-------|
| **Task ID** | WS-001 |
| **Phase** | Audit |
| **Machine** | M2 |
| **Delegate** | practice-buddy (direct) |
| **Status** | ✅ COMPLETE |
| **Files Owned** | `second-audit.mjs`, `second-audit-v2.mjs`, `second-audit-report.md`, `src/FRONTEND-AUDIT.md`, `prisma/schema-traceability-matrix.md` |
| **Start Time** | 2026-08-20 ~10:00 |
| **Dependencies** | None |
| **Evidence** | All audit artifacts verified on disk |

### WS-002: Canonical Context Establishment (IN PROGRESS)

| Field | Value |
|-------|-------|
| **Task ID** | WS-002 |
| **Phase** | Foundation |
| **Machine** | M2 |
| **Delegate** | practice-buddy (direct) |
| **Status** | 🔄 IN PROGRESS |
| **Files Owned** | `PRACTICE_BUDDY_PROJECT_STATE.md`, `PRACTICE_BUDDY_DEFECT_LEDGER.md`, `PRACTICE_BUDDY_ACTIVE_WORKSTREAMS.md`, `PRACTICE_BUDDY_TEST_STATE.md`, `PRACTICE_BUDDY_DEPLOYMENT_STATE.md`, `PRACTICE_BUDDY_CHANGELOG.md`, `PRACTICE_BUDDY_DECISIONS.md` |
| **Start Time** | 2026-08-20 16:30 |
| **Dependencies** | WS-001 |

### WS-003: Git Initialization & First Commit (PENDING)

| Field | Value |
|-------|-------|
| **Task ID** | WS-003 |
| **Phase** | Foundation |
| **Machine** | M2 |
| **Delegate** | practice-buddy |
| **Status** | ⏳ PENDING |
| **Files Owned** | Entire repo |
| **Dependencies** | WS-002 (current) |
| **Notes** | Blocking all deployment and distributed repair. Must create `.gitignore`, then initial commit. |

### WS-004: Micro-Skill & Skill Population (PENDING)

| Field | Value |
|-------|-------|
| **Task ID** | WS-004 |
| **Phase** | Phase 1 — Curriculum Taxonomy |
| **Machine** | M2 (or M1 delegate) |
| **Delegate** | TBD |
| **Status** | ⏳ PENDING |
| **Files Owned** | `prisma/schema.prisma` (if migration needed), `scripts/import-data.ts`, seed logic |
| **Dependencies** | WS-003 |
| **Critical Defect** | CRIT-001 |

### WS-005: Gold Question Population (PENDING)

| Field | Value |
|-------|-------|
| **Task ID** | WS-005 |
| **Phase** | Phase 2 — Content Service |
| **Machine** | TBD |
| **Delegate** | TBD |
| **Status** | ⏳ PENDING |
| **Dependencies** | WS-004 |
| **Critical Defect** | CRIT-002 |

### WS-006: Validation Engine (PENDING)

| Field | Value |
|-------|-------|
| **Task ID** | WS-006 |
| **Phase** | Phase 3 |
| **Machine** | TBD |
| **Delegate** | TBD |
| **Status** | ⏳ PENDING |
| **Dependencies** | WS-003 |
| **Critical Defect** | CRIT-003 |

---

## Reservation Queue (Files Needing Write Access)

| File/Directory | Reserved By | Purpose | Status |
|----------------|-------------|---------|--------|
| `prisma/schema.prisma` | — | Schema changes for taxonomy/validation/quality | Available |
| `src/app/register/` | — | Build missing register page | Available |
| `src/app/admin/curriculum/` | — | Build missing curriculum page | Available |
| `src/app/dashboard/progress/` | — | Build missing sub-pages | Available |
| `scripts/` | — | Migration/population scripts | Available |

---

## Parallelization Plan (Estimated)

| Machine | Workstream | Phase |
|---------|------------|-------|
| M1 | Schema + Migration (defect models) | Phase 1/3 |
| M2 | Architecture + Integration + Git init | Foundation |
| M3 | Frontend: Missing Pages | Phase 1 |
| M4 | AI Factory + Validation Engine | Phase 3 |
| M5 | Testing Infrastructure | Ongoing |
| M6 | Browser QA + Accessibility | Ongoing |
| VPS | Deployment pipeline | After Git init |