# Practice Buddy — Requirements Traceability Matrix

**Sources:**
- **AR** = `ARCHITECTURE_AND_DESIGN_REPORT.md`
- **PDF** = `K-10 Practice Buddy.pdf` (Production Design Specification)
- **Schema** = `prisma/schema.prisma`

**Statuses:** ✅ PASS | ⚠️ PARTIAL | ❌ FAIL | 🔴 MISSING

---

## 1. Program Abstraction (AR §3, PDF A)

| ID | Source | Requirement | Schema Implementation | Status |
|----|--------|-------------|----------------------|--------|
| PRG-01 | AR §3 | Top-level programs: Core English, Core Math, MAP, SAT | `Program` model exists with `code` field ("core" / "map" / "sat" / "act" / "ielts") | ✅ PASS |
| PRG-02 | AR §3 | Future-extensible to ACT, IGCSE, IB, IELTS, TOEFL | `code` field is a free string; ACT and IELTS already listed as valid values | ✅ PASS |
| PRG-03 | AR §3 | Programs scoped per tenant | `tenantId` + `@@unique([tenantId, code])` on Program | ✅ PASS |
| PRG-04 | AR §3 | Program ↔ Skill shared mappings (shared skills across programs) | No SkillMapping or ProgramSkill join table. Skills nest under Grade→Program, making sharing across programs difficult | ⚠️ PARTIAL |
| PRG-05 | AR §3 | Grade levels (3–10 for Core, MAP/SAT) | `Grade` model with `level` (Int), `label`, `@@unique([programId, level])` | ✅ PASS |
| PRG-06 | PDF B.3 | Subject model (math, english) as top-level curriculum axis | No `Subject` model. Schema uses `subject` string field on Skill and Question instead | ⚠️ PARTIAL |

---

## 2. Curriculum Taxonomy (AR §5, PDF B.3)

| ID | Source | Requirement | Schema Implementation | Status |
|----|--------|-------------|----------------------|--------|
| TAX-01 | AR §5 | Domain field on skill | `Skill.domain` (String) — e.g. "Algebra", "Craft and Structure" | ✅ PASS |
| TAX-02 | AR §5 | Category field on skill | `Skill.category` (String?) — e.g. "Linear Equations" | ✅ PASS |
| TAX-03 | AR §5 | Subcategory field on skill | `Skill.subcategory` (String?) — e.g. "Linear Equations in One Variable" | ✅ PASS |
| TAX-04 | AR §5 | Micro-skill / Learning Objective as lowest instructional unit | No separate micro-skill model or attribute on Skill. Schema conflates skill + micro-skill in one model | ⚠️ PARTIAL |
| TAX-05 | PDF B.3 | Skill prerequisites (self-referential skill_prereqs) | No `SkillPrereq` model or self-referential relation on Skill | 🔴 MISSING |
| TAX-06 | PDF B.3 | Standards mapping (standards table + skill_mappings) | No `Standard` or `SkillMapping` models | 🔴 MISSING |
| TAX-07 | AR §5 | Subject attribute per skill | `Skill.subject` (String) — "math" / "reading" / "writing" / "science" | ✅ PASS |
| TAX-08 | AR §5 | Difficulty metadata per skill | `Skill.difficulty` (String, default "medium") | ✅ PASS |
| TAX-09 | PDF B.3 | Skill status (draft/published/retired) | No status field on Skill. Only `isActive` (Boolean) | ⚠️ PARTIAL |
| TAX-10 | PDF B.3 | Concept tags and cognitive tags on skills | No tag arrays on Skill. GoldQuestion has tags (String? JSON) | ⚠️ PARTIAL |
| TAX-11 | AR §5 | Program → Subject → Grade → Domain → Category → Subcategory → Skill hierarchy | Schema path: Program → Grade → Skill (with subject/domain/category/subcategory). The Subject level is a string on Skill, not a first-class model. Domain→Category→Subcategory are flat string fields on Skill, not separate tables | ⚠️ PARTIAL |

---

## 3. Gold Question Model (AR §6, PDF B.3)

| ID | Source | Requirement | Schema Implementation | Status |
|----|--------|-------------|----------------------|--------|
| GLD-01 | AR §6 | Gold-standard questions (10 per micro-skill) | `GoldQuestion` model exists with full fields: stem, options, correctAnswer, explanation | ✅ PASS |
| GLD-02 | AR §6 | Quality anchors — goldStatus workflow | `goldStatus` field: "draft" / "reviewed" / "certified" / "retired" | ✅ PASS |
| GLD-03 | AR §6 | Tenant-scoped gold questions | `tenantId` on GoldQuestion + relation to Tenant | ✅ PASS |
| GLD-04 | AR §6 | Hash for deduplication | `hash` (String, @unique) — description says "SHA-256 of stem + correctAnswer" | ✅ PASS |
| GLD-05 | AR §6 | Version tracking | `version` (Int, @default(1)) on GoldQuestion | ✅ PASS |
| GLD-06 | AR §6 | Format/type classification | `format` field: "multiple-choice" / "numeric" / "writing" / "essay" | ✅ PASS |
| GLD-07 | AR §6 | Question families | `QuestionFamily` model with `goldQuestionId`, `name`, `variationCount` | ✅ PASS |
| GLD-08 | AR §6 | Skill code reference | `GoldQuestion.skillCode` (String?) — optional reference to skill | ✅ PASS |
| GLD-09 | PDF B.3 | Gold question → derived Question relationship | `GoldQuestion` has `derivedQuestions Question[]` relation; `Question` has `goldQuestionId` | ✅ PASS |

---

## 4. AI Question Factory Pipeline (AR §1, AR §6, PDF A.3)

| ID | Source | Requirement | Schema Implementation | Status |
|----|--------|-------------|----------------------|--------|
| AIF-01 | AR §1 | Async, non-blocking generation pipeline | No queue/job model, no generation metadata table. Schema has no representation of the pipeline | 🔴 MISSING |
| AIF-02 | AR §1 | Generation step (spec → structured question) | No generation metadata model (prompt used, model, params, generation ID) | 🔴 MISSING |
| AIF-03 | AR §1 | Deterministic validation step | No validation model or validation results table | 🔴 MISSING |
| AIF-04 | AR §1 | Independent AI validator (different model than generator) | No validator metadata or multi-model tracking | 🔴 MISSING |
| AIF-05 | AR §1 | Duplicate detection (exact → structural → semantic) | Schema has `hash` field for exact dedup. No structural/semantic dedup tracking or embedding storage (`pgvector` referenced in AR tech stack but not in schema) | ⚠️ PARTIAL |
| AIF-06 | AR §1 | Human review queue | No review queue model. Schema has `qualityStatus` but no review assignment/reviewer tracking beyond what could be in application code | ⚠️ PARTIAL |
| AIF-07 | AR §1 | Published Question Bank | `Question.qualityStatus` includes "published" state; `questionStatus` includes "active" state | ✅ PASS |
| AIF-08 | PDF B.3 | Source attribution (ai-generated vs official) | `Question.source` field (String?) — e.g. "official-sat-2023", "ai-generated" | ✅ PASS |
| AIF-09 | PDF B.3 | Rights status | `Question.rightsStatus` (String, default "original") | ✅ PASS |
| AIF-10 | AR §1 | AI Factory is NOT a runtime dependency | Schema supports this (approved questions exist independently). Delivery Engine only reads pre-stored questions | ✅ PASS |

---

## 5. Immutable Attempts (AR §9, PDF B.3)

| ID | Source | Requirement | Schema Implementation | Status |
|----|--------|-------------|----------------------|--------|
| ATT-01 | AR §9 | Append-only — no updates | `StudentAttempt` has no update-related fields (no updatedAt). Only `createdAt` for immutable timestamp | ✅ PASS |
| ATT-02 | AR §9 | snapshotHash for integrity | `snapshotHash` (String) — "SHA-256 of (userId + questionId + answer + attemptNumber + createdAt)" | ✅ PASS |
| ATT-03 | AR §9 | References exact question version | `StudentAttempt.questionId` references Question, but **not** a specific question_version_id. Schema has no separate `question_versions` table for version pinning | ⚠️ PARTIAL |
| ATT-04 | AR §9 | delivery_id per question presentation | No `deliveryId` or equivalent UUID per presentation. Schema links attempt to session + question, not to a specific delivery instance | 🔴 MISSING |
| ATT-05 | PDF B.3 | FK to question_versions for history stability | No `questionVersionId` on StudentAttempt. Schema relies on `Question.version` field, but this can change | ⚠️ PARTIAL |
| ATT-06 | AR §9 | UNIQUE(delivery_id, attempt_no) constraint | No such composite unique constraint in schema | 🔴 MISSING |
| ATT-07 | PDF B.3 | time_ms per attempt | `StudentAttempt.timeSpent` (Int?) — in seconds, not ms | ⚠️ PARTIAL |
| ATT-08 | PDF B.3 | response JSONB for flexible answer capture | `StudentAttempt.answer` (String) — single string, not JSON. Less flexible for complex answer types | ⚠️ PARTIAL |
| ATT-09 | AR §9 | Analytics fully reproducible from raw attempts | Schema provides sufficient raw data (userId, questionId, answer, isCorrect, timeSpent, attemptNumber) for full reproducibility | ✅ PASS |

---

## 6. Two-Attempt Support (AR §11, PDF C.1)

| ID | Source | Requirement | Schema Implementation | Status |
|----|--------|-------------|----------------------|--------|
| TWO-01 | AR §11 | attemptNo field (1 or 2) | `StudentAttempt.attemptNumber` (Int, @default(1)) | ✅ PASS |
| TWO-02 | AR §11 | CHECK(attempt_no IN (1,2)) constraint | No database-level CHECK constraint. Enforced in application only | ⚠️ PARTIAL |
| TWO-03 | AR §11 | Second attempt tracked independently | Each attempt is a separate StudentAttempt row with different attemptNumber | ✅ PASS |
| TWO-04 | AR §11 | hintsUsed tracked per attempt | `StudentAttempt.hintsUsed` (Int, @default(0)) | ✅ PASS |
| TWO-05 | PDF B.4 | Unique partial index on (session_id, question_id, attempt_no) | No such index in schema. `@@index([sessionId])` exists but is not a unique constraint | ⚠️ PARTIAL |

---

## 7. Delivery Engine (AR §2, PDF A.3)

| ID | Source | Requirement | Schema Implementation | Status |
|----|--------|-------------|----------------------|--------|
| DEL-01 | AR §2 | Zero AI dependency at runtime | Schema stores pre-approved questions. No runtime AI integration needed | ✅ PASS |
| DEL-02 | AR §2 | Selects from pre-approved stored questions | `Question.qualityStatus` ("published") and `questionStatus` ("active") control what's available | ✅ PASS |
| DEL-03 | AR §2 | Question selection considers: program, skill, difficulty, exposure, family, mastery | Question has programId, skillId, difficulty, familyId for selection criteria. Exposure tracking would need additional data | ⚠️ PARTIAL |
| DEL-04 | AR §2 | Estimates time per question | `Question.estimatedTime` (Int?) — seconds | ✅ PASS |
| DEL-05 | AR §2 | Calculator availability flag | `Question.calculatorAllowed` (Boolean?, @default(false)) | ✅ PASS |

---

## 8. Mastery Engine (AR §7, PDF B.3)

| ID | Source | Requirement | Schema Implementation | Status |
|----|--------|-------------|----------------------|--------|
| MAS-01 | AR §7 | UserSkillMastery derived from attempts | `UserSkillMastery` model exists with userId, skillId, tenantId | ✅ PASS |
| MAS-02 | AR §7 | Mastery levels | `UserSkillMastery.level`: "not-assessed" / "beginning" / "developing" / "approaching" / "mastered" / "needs-review" | ✅ PASS |
| MAS-03 | AR §7 | Statistical confidence | `UserSkillMastery.confidence` (Float?) — 0.0–1.0 | ✅ PASS |
| MAS-04 | AR §7 | Attempt count tracking | `attemptsCount` (Int, @default(0)) and `correctCount` (Int, @default(0)) | ✅ PASS |
| MAS-05 | AR §7 | Last attempt timestamp | `lastAttemptAt` (DateTime?) | ✅ PASS |
| MAS-06 | PDF B.3 | Unique constraint per (student, skill) | `@@unique([tenantId, userId, skillId])` | ✅ PASS |
| MAS-07 | PDF B.3 | Disposable / derived (can be recalculated) | Schema stores derived data but raw attempts provide the source of truth for recalculation | ✅ PASS |
| MAS-08 | PDF B.3 | Skill progress table (mastered/proficient/needs_support with counts) | Similar fields exist (`attemptsCount`, `correctCount`) but schema doesn't track 1st vs 2nd attempt correctness separately as called out in PDF spec | ⚠️ PARTIAL |

---

## 9. RLS / Tenant Isolation (AR §10, PDF B.1)

| ID | Source | Requirement | Schema Implementation | Status |
|----|--------|-------------|----------------------|--------|
| RLS-01 | AR §10 | Tenant model for multi-tenancy | `Tenant` model with id, name, slug (unique), domain, isActive, config | ✅ PASS |
| RLS-02 | AR §10 | org_id / tenantId on all tenant-scoped tables | All major data models have `tenantId` + relation to Tenant: User, Program, GoldQuestion, QuestionFamily, Question, StudentAttempt, PracticeSession, UserSkillMastery, Course, Enrollment, Exam, Teacher, AccessCode | ✅ PASS |
| RLS-03 | AR §10 | PostgreSQL RLS policies | Not represented in Prisma schema (RLS is configured at the PostgreSQL level, not in schema.prisma) | ⚠️ PARTIAL |
| RLS-04 | AR §10 | Tenant-specific configuration | `Tenant.config` (String?) — JSON blob for tenant-specific settings | ✅ PASS |
| RLS-05 | PDF B.4 | Composite indexes for (org_id, ...) query patterns | Schema has `@@index([tenantId, ...])` on GoldQuestion, QuestionFamily, Question, StudentAttempt, PracticeSession, Exam | ✅ PASS |

---

## 10. RBAC (AR §10, PDF B.3)

| ID | Source | Requirement | Schema Implementation | Status |
|----|--------|-------------|----------------------|--------|
| RBAC-01 | AR §10 | User.role for role-based access | `User.role` (String, @default("student")) — values: "student" / "teacher" / "admin" / "superadmin" | ✅ PASS |
| RBAC-02 | AR §10 | Content-author, reviewer, curriculum-admin roles | Not specifically modeled. The basic role string could be extended but no content-specific roles are defined | ⚠️ PARTIAL |
| RBAC-03 | PDF B.3 | Role as array (user.role_codes) for multiple roles | Schema uses single `role` string, not an array. Limits multi-role assignments | ⚠️ PARTIAL |
| RBAC-04 | PDF B.3 | Teacher profile with bio | `Teacher` model with `userId`, `bio`, `tenantId` — separate from User | ✅ PASS |
| RBAC-05 | AR §10 | Membership-based RBAC with added roles | Basic role field supports this model. Extensibility for fine-grained permissions is limited | ⚠️ PARTIAL |

---

## 11. Assignment Service (PDF A.3, B.3)

| ID | Source | Requirement | Schema Implementation | Status |
|----|--------|-------------|----------------------|--------|
| ASN-01 | PDF A.3 | Assignment model (teacher assigns skills/questions to class/student) | **No Assignment model in schema.** This is a major gap | 🔴 MISSING |
| ASN-02 | PDF B.3 | AssignmentItem (skills/questions per assignment) | **No AssignmentItem model** | 🔴 MISSING |
| ASN-03 | PDF B.3 | StudentAssignment (per-student state: assigned/in_progress/completed/overdue) | **No StudentAssignment model** | 🔴 MISSING |
| ASN-04 | PDF B.3 | Assignment due dates, status, mode | No assignment models to support this | 🔴 MISSING |
| ASN-05 | PDF B.3 | Class model for grouping students | **No Class model.** Schema has Course (which seems to serve as a class-like concept) but not a dedicated Class model with teacher_id, school_id | 🔴 MISSING |
| ASN-06 | AR UX §4.2 | Assignment flow: teacher assigns → student notified | No Assignment or StudentAssignment models to support this workflow | 🔴 MISSING |

---

## 12. Analytics (AR §8, PDF B.3)

| ID | Source | Requirement | Schema Implementation | Status |
|----|--------|-------------|----------------------|--------|
| ANL-01 | AR §8 | Computed aggregations (not stored in questions) | Raw `StudentAttempt` data provides the source for computed aggregation | ✅ PASS |
| ANL-02 | AR §8 | Disposable analytics (recomputable from attempts) | Schema supports this design principle (attempts are the source of truth) | ✅ PASS |
| ANL-03 | PDF B.3 | Daily analytics precomputed table (analytics_daily) | **No analytics_daily or equivalent aggregated table** in schema | 🔴 MISSING |
| ANL-04 | PDF B.3 | Student skill mastery matrix | `UserSkillMastery` model provides per-student, per-skill mastery data | ✅ PASS |
| ANL-05 | PDF B.3 | Report-level data (accuracy, distribution, time-on-task) | Can be derived from StudentAttempt + PracticeSession data but no dedicated reporting tables | ⚠️ PARTIAL |
| ANL-06 | AR §8 | Teacher analytics: needs-attention, performance trends | Schema provides raw data for these computations but no pre-aggregated structures | ⚠️ PARTIAL |
| ANL-07 | AR UX §8.2 | Student analytics: progress bars, mastered skill count | `UserSkillMastery` with counts supports this directly | ✅ PASS |

---

## 13. Quality Monitoring & Inventory Control (AR, PDF D.2)

| ID | Source | Requirement | Schema Implementation | Status |
|----|--------|-------------|----------------------|--------|
| QLT-01 | AR | Performance-driven question lifecycle (auto-flag) | `Question.qualityStatus` includes "quarantined" state | ✅ PASS |
| QLT-02 | AR | Abnormal behavior detection (auto-flag for review) | No explicit quality metrics table or flagging mechanism in schema | 🔴 MISSING |
| QLT-03 | AR | Inventory health — measurable bank quality per skill | No inventory health model or skill-level quality metrics table | 🔴 MISSING |
| QLT-04 | AR | Question flags: "almost everyone misses it", "everyone gets it right" | No question performance statistics or anomaly detection data model | 🔴 MISSING |
| QLT-05 | PDF D.2 | Retirement/archive lifecycle represented by flags | Schema uses `isActive` and `qualityStatus` for lifecycle states. PDF spec explicitly says "retirement/archive lifecycle states are OUT OF SCOPE for MVP — replaced by flags" | ✅ PASS (per PDF scope) |
| QLT-06 | AR §1 | Human review queue for flagged content | No review queue model. `qualityStatus` progression (draft → ready_for_review → published → archived → quarantined) provides state machine | ⚠️ PARTIAL |

---

## 14. Content Lifecycle & Versioning (AR §8, PDF B.3)

| ID | Source | Requirement | Schema Implementation | Status |
|----|--------|-------------|----------------------|--------|
| CLV-01 | AR §8 | Versioned questions | `Question.version` (Int, @default(1)) | ✅ PASS |
| CLV-02 | AR §8 | Parent version tracking | `Question.parentVersionId` (String?) — links to previous version | ✅ PASS |
| CLV-03 | PDF B.3 | Separate question_versions table with version_no, stem, options, answer as JSONB | **No separate question_versions table.** Version info is inline on the Question model itself | 🔴 MISSING |
| CLV-04 | PDF B.3 | Author and reviewer tracking on versions | `Question` has no authorId or reviewedBy fields. GoldQuestion could use application-level tracking | 🔴 MISSING |
| CLV-05 | AR §8 | Status workflow: Gold/AI Generated → Validation → Duplicate Check → Review → Approved → Published | Schema status fields: `GoldQuestion.goldStatus` (draft/reviewed/certified/retired), `Question.qualityStatus` (draft/ready_for_review/published/archived/quarantined), `Question.questionStatus` (active/retired/flagged) | ✅ PASS |
| CLV-06 | PDF B.3 | Published version pinning (attempts reference exact version) | No separate question_versions table for version pinning. Attempts reference the Question directly, not a specific version snapshot | ⚠️ PARTIAL |
| CLV-07 | PDF B.3 | Publishing timestamp | No `publishedAt` on Question model | 🔴 MISSING |

---

## 15. Course / Enrollment / Exam Models (AR, PDF B.3)

| ID | Source | Requirement | Schema Implementation | Status |
|----|--------|-------------|----------------------|--------|
| CRS-01 | AR | Course model | `Course` model with id, tenantId, name, description, code, isActive | ✅ PASS |
| CRS-02 | AR | Enrollment (user ↔ course) | `Enrollment` model with tenantId, userId, courseId, role, enrolledAt, expiresAt, isActive | ✅ PASS |
| CRS-03 | AR | Exam / assessment model | `Exam` model with tenantId, courseId, title, type (mock/quiz/diagnostic/final), duration, totalMarks, passingMarks | ✅ PASS |
| CRS-04 | AR | Course has exams | `Exam.courseId` (optional) + `Course.exams Exam[]` | ✅ PASS |
| CRS-05 | PDF B.3 | Class model (school-based grouping with teacher assignment) | **No Class model.** Course serves as a grouping mechanism but lacks teacher_id, school_id, status fields from PDF spec | 🔴 MISSING |
| CRS-06 | PDF B.3 | School model | **No School model** | 🔴 MISSING |
| CRS-07 | AR UX §6 | Guided instruction (1:1 teacher-student) | `PracticeSession.type` includes "practice" / "mock-exam" / "diagnostic" but no guided or live mode. No LiveSession or StudentLiveState models | ⚠️ PARTIAL |
| CRS-08 | PDF B.3 | Live classroom sessions with real-time state | **No LiveSession or StudentLiveState models** | 🔴 MISSING |

---

## 16. Subscription & Payment Models (AR, PDF)

| ID | Source | Requirement | Schema Implementation | Status |
|----|--------|-------------|----------------------|--------|
| SUB-01 | AR | SubscriptionPlan model | `SubscriptionPlan` with name, price, currency, interval, features, isActive | ✅ PASS |
| SUB-02 | AR | UserSubscription (user ↔ plan) | `UserSubscription` with userId, planId, status, currentPeriodStart, currentPeriodEnd | ✅ PASS |
| SUB-03 | AR | Payment tracking | `Payment` with userId, subscriptionPlanId, amount, currency, status, paymentMethod, transactionId, paidAt | ✅ PASS |
| SUB-04 | AR | Unique constraint on user+plan | `@@unique([userId, planId])` on UserSubscription | ✅ PASS |
| SUB-05 | AR | Multi-currency support | `SubscriptionPlan.currency` (String, default "EGP") and `Payment.currency` (String, default "EGP") | ✅ PASS |
| SUB-06 | AR | Subscription status lifecycle | `UserSubscription.status`: "active" / "cancelled" / "expired" | ✅ PASS |
| SUB-07 | AR | Payment status lifecycle | `Payment.status`: "pending" / "completed" / "failed" / "refunded" | ✅ PASS |

---

## 17. Practice Session Model (AR, PDF B.3)

| ID | Source | Requirement | Schema Implementation | Status |
|----|--------|-------------|----------------------|--------|
| SES-01 | AR | Practice session tracking | `PracticeSession` with userId, type, status, startedAt, completedAt, totalQuestions, correctCount, totalTimeSpent | ✅ PASS |
| SES-02 | PDF B.3 | Session mode (independent/guided/live) | `PracticeSession.type` doesn't include "independent", "guided", "live". Only "practice" / "mock-exam" / "diagnostic" | ⚠️ PARTIAL |
| SES-03 | PDF B.3 | Session links to assignment | No `assignmentId` on PracticeSession. Schema has no Assignment model to link to | 🔴 MISSING |
| SES-04 | AR | Session recovery (preserve state on interruption) | `PracticeSession.status` ("in-progress" / "completed" / "abandoned") supports this | ✅ PASS |

---

## 18. Audit & Platform Settings (AR, PDF)

| ID | Source | Requirement | Schema Implementation | Status |
|----|--------|-------------|----------------------|--------|
| AUD-01 | AR | Admin audit log | `AdminAuditEvent` with adminId, action, entity, entityId, details, ipAddress, createdAt | ✅ PASS |
| AUD-02 | AR | Action types tracked | `AdminAuditEvent.action`: "create" / "update" / "delete" / "login" / "import" | ✅ PASS |
| AUD-03 | AR | Entity types tracked | `AdminAuditEvent.entity`: "user" / "question" / "course" / "exam" | ✅ PASS |
| AUD-04 | AR | Platform-wide settings | `PlatformSetting` model with key (unique), value, type, group | ✅ PASS |
| AUD-05 | AR | Feature flags (tenant-aware) | `FeatureFlag` model with key, label, isActive — but no tenantId relation for tenant-specific overrides | ⚠️ PARTIAL |

---

## 19. Access Control & Invite System (AR, PDF)

| ID | Source | Requirement | Schema Implementation | Status |
|----|--------|-------------|----------------------|--------|
| ACC-01 | AR | Tenant-scoped access codes | `AccessCode` with tenantId, code (unique), role, maxUses, useCount, expiresAt, isActive | ✅ PASS |
| ACC-02 | AR | Access code redemption tracking | `AccessCodeRedemption` with accessCodeId, userId, redeemedAt, ipAddress | ✅ PASS |
| ACC-03 | AR | Unique redemption per user+code | `@@unique([accessCodeId, userId])` on AccessCodeRedemption | ✅ PASS |

---

## 20. Schema-Level Conventions (PDF B.1)

| ID | Source | Requirement | Schema Implementation | Status |
|----|--------|-------------|----------------------|--------|
| CNV-01 | PDF B.1 | `created_at` and `updated_at` on all tables | All major models have `createdAt` and `updatedAt` (using `@updatedAt` Prisma attribute) | ✅ PASS |
| CNV-02 | PDF B.1 | Soft-delete via `deleted_at` | No soft-delete columns in any model. Schema relies on `isActive` Boolean flags | ⚠️ PARTIAL |
| CNV-03 | PDF B.1 | Composite indexes for query patterns | Schema has @@index and @@unique for common query patterns | ✅ PASS |
| CNV-04 | PDF B.1 | Table naming conventions (snake_case via @@map) | All tables use `@@map("snake_case")` for DB table names | ✅ PASS |

---

## Summary Statistics

| Category | ✅ PASS | ⚠️ PARTIAL | ❌ FAIL / 🔴 MISSING | Total |
|----------|---------|-----------|---------------------|-------|
| 1. Program Abstraction | 4 | 2 | 0 | 6 |
| 2. Curriculum Taxonomy | 4 | 4 | 3 | 11 |
| 3. Gold Question Model | 8 | 1 | 0 | 9 |
| 4. AI Question Factory | 3 | 2 | 5 | 10 |
| 5. Immutable Attempts | 3 | 4 | 2 | 9 |
| 6. Two-Attempt Support | 3 | 2 | 0 | 5 |
| 7. Delivery Engine | 3 | 2 | 0 | 5 |
| 8. Mastery Engine | 6 | 2 | 0 | 8 |
| 9. RLS / Tenant Isolation | 4 | 2 | 0 | 6 |
| 10. RBAC | 2 | 3 | 0 | 5 |
| 11. Assignment Service | 0 | 0 | 6 | 6 |
| 12. Analytics | 4 | 2 | 1 | 7 |
| 13. Quality Monitoring | 2 | 1 | 3 | 6 |
| 14. Content Lifecycle | 3 | 2 | 2 | 7 |
| 15. Course/Enroll/Exam | 3 | 1 | 4 | 8 |
| 16. Subscription/Payment | 7 | 0 | 0 | 7 |
| 17. Practice Session | 2 | 1 | 1 | 4 |
| 18. Audit & Settings | 4 | 1 | 0 | 5 |
| 19. Access Control | 3 | 0 | 0 | 3 |
| 20. Schema Conventions | 4 | 1 | 0 | 5 |
| **Totals** | **72** | **33** | **27** | **132** |

**Coverage: 54.5% PASS, 25.0% PARTIAL, 20.5% FAIL/MISSING**

---

## Critical Gaps (Highest Priority)

| Rank | Gap | Impact | Suggested Fix |
|------|-----|--------|---------------|
| 1 | **No Assignment / AssignmentItem / StudentAssignment models** | Teachers cannot assign work; assignment workflow is entirely absent | Add `Assignment`, `AssignmentItem`, `StudentAssignment` models matching PDF B.3 spec |
| 2 | **No question_versions table** | Cannot pin a specific version on attempts; content changes invalidate historical data | Add `QuestionVersion` model with full JSONB content, FK from StudentAttempt |
| 3 | **No Class or School models** | No grouping mechanism for students under a teacher; PDF specifies class/roster system | Add `School`, `Class` (or rename/adapt `Course`), `Enrollment` re-targeted to Class |
| 4 | **No AI Factory pipeline models** | Generation jobs, validation results, review queue are not represented | Add `GenerationJob`, `ValidationResult`, `ReviewQueueItem` tables |
| 5 | **No analytics precomputed tables** | Querying raw attempts for every report is expensive at scale | Add `AnalyticsDaily` or similar aggregated table as specified in PDF B.3 |
| 6 | **No LiveSession / StudentLiveState models** | Live classroom mode and guided instruction are not supported | Add `LiveSession`, `StudentLiveState` models matching PDF B.3 |
| 7 | **No Subject, Standard, SkillMapping, SkillPrereq models** | Curriculum taxonomy is incomplete for standards alignment | Add `Subject` model and standards-related tables |
| 8 | **Missing delivery_id on attempts** | Cannot track per-presentation delivery instances | Add `deliveryId` UUID to StudentAttempt with `@@unique([deliveryId, attemptNumber])` |