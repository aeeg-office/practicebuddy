# Practice Buddy Defect Ledger

## Status Legend
`OPEN` | `CONFIRMED` | `IN PROGRESS` | `READY FOR TEST` | `FAILED RETEST` | `VERIFIED` | `DEPLOYED` | `PRODUCTION VERIFIED` | `BLOCKED` | `DEFERRED`

---

## CRITICAL Defects

### CRIT-001: Micro-Skills Taxonomy Empty
| Field | Value |
|-------|-------|
| **Severity** | CRITICAL |
| **Module** | Curriculum Taxonomy |
| **Description** | `micro_skills` table has 0 records. The taxonomy is missing its lowest and most important instructional unit. Without micro-skills, skill-level mastery cannot be granular, gold questions have no targets, and the AI Factory has no curriculum anchors. |
| **Root Cause** | Schema defined but data never populated; no migration script written |
| **Status** | OPEN |
| **Owner** | TBD |
| **Repair Phase** | Phase 1 |
| **Dependencies** | Need skills table populated first |
| **Evidence** | Audit: `second-audit-report.md` line 323 — "0 micro_skills" |
| **Created** | 2026-08-20 |

### CRIT-002: Gold Questions Severely Deficient
| Field | Value |
|-------|-------|
| **Severity** | CRITICAL |
| **Module** | Content Service / AI Question Factory |
| **Description** | Only 5 gold_questions in database vs. required 10+ per micro-skill. Even if micro-skills reached target (e.g., 100+), 5 gold questions is orders of magnitude below the required threshold. |
| **Root Cause** | Gold question seeding not performed; manual input pipeline not established |
| **Status** | OPEN |
| **Owner** | TBD |
| **Repair Phase** | Phase 2 (after CRIT-001) |
| **Dependencies** | CRIT-001 (micro-skills needed as targets for gold questions) |
| **Evidence** | Audit: `second-audit-report.md` line 324 — "5 gold_questions" |
| **Created** | 2026-08-20 |

### CRIT-003: Validation Engine Not Implemented
| Field | Value |
|-------|-------|
| **Severity** | CRITICAL |
| **Module** | Validation Engine |
| **Description** | No deterministic structural validation, no AI-assisted curricular checks, no difficulty validation, no independent validation model. Questions cannot be automatically validated before entering the delivery engine. |
| **Root Cause** | Not built — entire module missing |
| **Status** | OPEN |
| **Owner** | TBD |
| **Repair Phase** | Phase 3 |
| **Dependencies** | None directly; could run in parallel with CRIT-001/002 |
| **Evidence** | Audit: module classification ❌ FAIL, 0% |
| **Created** | 2026-08-20 |

### CRIT-004: Duplicate Detection Not Implemented
| Field | Value |
|-------|-------|
| **Severity** | CRITICAL |
| **Module** | Duplicate Detection |
| **Description** | No exact, structural, or semantic duplicate detection. `pgvector` extension not confirmed. No embedding columns in schema. Question hash field exists on Question model but dedup pipeline not built. |
| **Root Cause** | Not built — entire module missing except hash field |
| **Status** | OPEN |
| **Owner** | TBD |
| **Repair Phase** | Phase 4 |
| **Dependencies** | pgvector installation, DB migration for embedding columns |
| **Evidence** | Audit: module classification ❌ FAIL, 0% |
| **Created** | 2026-08-20 |

### CRIT-005: Quality Monitor Not Implemented
| Field | Value |
|-------|-------|
| **Severity** | CRITICAL |
| **Module** | Quality Monitor |
| **Description** | No performance-driven lifecycle management, no auto-flagging of abnormal questions, no question retirement, no quality metrics tracking. Question quality cannot be monitored post-deployment. |
| **Root Cause** | Not built — entire module missing |
| **Status** | OPEN |
| **Owner** | TBD |
| **Repair Phase** | Phase 5 |
| **Dependencies** | CRIT-003 (validation needed for quality baselines) |
| **Evidence** | Audit: module classification ❌ FAIL, 0% |
| **Created** | 2026-08-20 |

### CRIT-006: Inventory Control Not Implemented
| Field | Value |
|-------|-------|
| **Severity** | CRITICAL |
| **Module** | Inventory Control |
| **Description** | No question bank health tracking per skill, no measurable bank quality metrics, gap analysis exists in UI only (AI Factory page calls endpoint but end-to-end not verified). |
| **Root Cause** | Not built — entire module missing |
| **Status** | OPEN |
| **Owner** | TBD |
| **Repair Phase** | Phase 6 |
| **Dependencies** | CRIT-001, CRIT-002 (needs populated taxonomy to measure health) |
| **Evidence** | Audit: module classification ❌ FAIL, 0% |
| **Created** | 2026-08-20 |

---

## HIGH Defects

### HIGH-001: No Git History
| Field | Value |
|-------|-------|
| **Severity** | HIGH |
| **Module** | Infrastructure |
| **Description** | Entire codebase is uncommitted — no Git history, no version tracking, no deployment history, no rollback capability |
| **Root Cause** | Repo cloned but initial commit never performed |
| **Status** | OPEN |
| **Owner** | M2 |
| **Repair Phase** | Before Phase 1 (blocker for all deployment) |
| **Dependencies** | None |
| **Created** | 2026-08-20 |

### HIGH-002: /register Page Missing (404)
| Field | Value |
|-------|-------|
| **Severity** | HIGH |
| **Module** | Student Experience |
| **Description** | `/register` returns HTTP 404. Users cannot self-register; must be created by admin. Self-registration path from homepage leads to dead end. |
| **Root Cause** | Page not implemented |
| **Status** | OPEN |
| **Owner** | TBD |
| **Evidence** | Audit report — page test results |
| **Created** | 2026-08-20 |

### HIGH-003: /admin/curriculum Missing (404)
| Field | Value |
|-------|-------|
| **Severity** | HIGH |
| **Module** | Admin |
| **Description** | `/admin/curriculum` returns 404. Admin cannot manage curriculum taxonomy through UI. Directory exists but is empty. |
| **Root Cause** | Directory created but page not built |
| **Status** | OPEN |
| **Owner** | TBD |
| **Evidence** | Audit report — page test results |
| **Created** | 2026-08-20 |

### HIGH-004: 9 Dashboard/Missing Sub-Pages (404)
| Field | Value |
|-------|-------|
| **Severity** | HIGH |
| **Module** | Frontend Navigation |
| **Description** | Sidebar links to `/dashboard/progress`, `/dashboard/schedule`, `/dashboard/settings`, `/admin/exams/create`, `/admin/courses/create`, `/admin/questions/new`, `/admin/teachers/add` all return 404. Navigation leads to dead ends. |
| **Root Cause** | Referenced in nav but never implemented |
| **Status** | OPEN |
| **Owner** | TBD |
| **Evidence** | Frontend audit report |
| **Created** | 2026-08-20 |

### HIGH-005: Skills Table Severely Under-Populated
| Field | Value |
|-------|-------|
| **Severity** | HIGH |
| **Module** | Curriculum Taxonomy |
| **Description** | Only 9 skills in database. For Grades 3-10 (8 grades × 2 subjects), the expected count is 200+. Core curriculum coverage is effectively absent. |
| **Root Cause** | Migration/seed script only imported minimal skills |
| **Status** | OPEN |
| **Owner** | TBD |
| **Repair Phase** | Phase 1 |
| **Dependencies** | None |
| **Evidence** | DB state in audit report — "9 skills" |
| **Created** | 2026-08-20 |

### HIGH-006: Subject Model Missing
| Field | Value |
|-------|-------|
| **Severity** | HIGH |
| **Module** | Curriculum Taxonomy |
| **Description** | No first-class `Subject` model. Subject is a flat string field on `Skill` and `Question`. Cannot programmatically enumerate subjects, manage subject-level metadata, or establish subject-skill relationships. |
| **Root Cause** | Schema shortcuts Subject level |
| **Status** | OPEN |
| **Owner** | TBD |
| **Repair Phase** | Phase 1 |
| **Dependencies** | Schema migration |
| **Evidence** | Schema traceability matrix |
| **Created** | 2026-08-20 |

### HIGH-007: Generation Metadata Model Missing
| Field | Value |
|-------|-------|
| **Severity** | HIGH |
| **Module** | AI Question Factory |
| **Description** | No model for tracking AI generation parameters (prompt used, model, temperature, generation ID). Cannot audit AI output quality, reproduce generations, or track pipeline performance. |
| **Root Cause** | Schema gap |
| **Status** | OPEN |
| **Owner** | TBD |
| **Repair Phase** | Phase 3/4 |
| **Dependencies** | Schema migration |
| **Evidence** | Schema traceability matrix — AIF-01, AIF-02 |
| **Created** | 2026-08-20 |

### HIGH-008: Validation/Quality Metrics Models Missing
| Field | Value |
|-------|-------|
| **Severity** | HIGH |
| **Module** | Validation / Quality |
| **Description** | No schema models for validation results, quality metrics, or question lifecycle events. Cannot persist validation history or track quality trends. |
| **Root Cause** | Schema gap |
| **Status** | OPEN |
| **Owner** | TBD |
| **Repair Phase** | Phase 3/5 |
| **Dependencies** | Schema migration |
| **Evidence** | Audit report — module ❌ FAIL |
| **Created** | 2026-08-20 |

---

## MEDIUM Defects

### MED-001: 12 Admin Pages Timeout Under Playwright
| Field | Value |
|-------|-------|
| **Severity** | MEDIUM |
| **Module** | Admin UI |
| **Description** | 12 admin sub-pages that require auth cause navigation timeout under Playwright headless because auth-required API calls hang. Pages render fine via direct HTTP. |
| **Root Cause** | Auth-API calls with no unauthenticated fallback |
| **Status** | OPEN |
| **Owner** | TBD |
| **Created** | 2026-08-20 |

### MED-002: API Auth Consistency
| Field | Value |
|-------|-------|
| **Severity** | MEDIUM |
| **Module** | API |
| **Description** | Some API routes return 400/405 instead of 401 for unauthenticated GET requests. `/api/auth/roles`, `/api/admin/roles` return 404. Consistent auth rejection pattern not implemented across all routes. |
| **Root Cause** | Inconsistent middleware application |
| **Status** | OPEN |
| **Owner** | TBD |
| **Created** | 2026-08-20 |

### MED-003: Responsive Design Not Verified
| Field | Value |
|-------|-------|
| **Severity** | MEDIUM |
| **Module** | Frontend |
| **Description** | Responsive breakpoints (360px, 768px, 1024px, 1440px) not verified. Touch targets (44×44px) not verified. PWA not implemented. |
| **Root Cause** | Deferred to later phases; not yet tested |
| **Status** | OPEN |
| **Owner** | TBD |
| **Created** | 2026-08-20 |

### MED-004: pgvector Extension Status Unknown
| Field | Value |
|-------|-------|
| **Severity** | MEDIUM |
| **Module** | Infrastructure |
| **Description** | `pgvector` extension not confirmed installed/configured. Required for semantic duplicate detection and embedding storage. |
| **Root Cause** | Not installed/configured |
| **Status** | OPEN |
| **Owner** | TBD |
| **Created** | 2026-08-20 |

### MED-005: Multi-Tenant RBAC Not Verified
| Field | Value |
|-------|-------|
| **Severity** | MEDIUM |
| **Module** | RBAC |
| **Description** | Tenant model exists with tenantId scoping on all entities. However, tenant-level RBAC enforcement and tenant isolation not verified through testing. Tenant scoping middleware not confirmed. |
| **Root Cause** | Implementation exists but end-to-end not verified |
| **Status** | OPEN |
| **Owner** | TBD |
| **Created** | 2026-08-20 |

---

## DEFERRED Defects

### DEF-001: PWA Not Implemented
| Field | Value |
|-------|-------|
| **Severity** | LOW |
| **Module** | PWA |
| **Description** | PWA manifest, service worker, offline support not implemented. Deferred to Phase 12 per implementation plan. |
| **Status** | DEFERRED |
| **Owner** | TBD |
| **Target Phase** | Phase 12 |
| **Created** | 2026-08-20 |

### DEF-002: Native Mobile App
| Field | Value |
|-------|-------|
| **Severity** | LOW |
| **Module** | Mobile |
| **Description** | Native mobile app not started. Deferred to Phase 14 per implementation plan (10+ weeks after Phase 12). |
| **Status** | DEFERRED |
| **Owner** | TBD |
| **Target Phase** | Phase 14 |
| **Created** | 2026-08-20 |