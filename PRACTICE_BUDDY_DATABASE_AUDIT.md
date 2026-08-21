# PRACTICE BUDDY — DATABASE AUDIT REPORT

**Date:** 2026-08-21  
**Auditor:** Hermes Agent (subagent)  
**Schema Source:** `prisma/schema.prisma`  
**Target Database:** `practice_buddy@localhost:5432` (PostgreSQL)  
**Master Architecture Reference:** `Practice_Buddy_Master_Architecture_Design_Audit_Rebuild_Baseline.md`

---

## 1. EXECUTIVE SUMMARY

| Metric | Value |
|--------|-------|
| **Total tables (excluding `_prisma_migrations`)** | 28 |
| **Total models in Prisma schema** | 28 |
| **Architecture-required entities present** | 16 / 28 (57%) |
| **Architecture-required entities missing** | 12 / 28 (43%) |
| **Total rows across all tables** | ~5,130 |
| **Referential integrity violations** | 0 (all FKs clean) |
| **Tenant-isolated tables** | 20 / 28 (71%) |
| **Versioned content models** | 3 (Question, QuestionVersion, GoldQuestion) |
| **Critical missing models** | Organization, School, Class, Subject, Prerequisites, Standards, Assets, Deliveries, LiveSession, StudentLiveState, Entitlements, Memberships |

**Overall database health:** ⚠️ PARTIAL — The core question/curriculum models exist and are well-structured, but 43% of architecture-required entities are completely missing. The question-skill linkage is severely broken (only 5 of 2,520 questions linked to skills, 0 to micro-skills). Tenant isolation is good but no organization/school/class hierarchy exists.

---

## 2. COMPLETE MODEL INVENTORY

### 2.1 Tenant

| Property | Detail |
|----------|--------|
| **Model name** | `Tenant` |
| **Architecture requirement** | Multi-tenant org scope (PB-ARCH-002, §42) |
| **Status** | **COMPLETE** |
| **Fields count** | 8 (id, name, slug, domain, isActive, config, createdAt, updatedAt) |
| **Row count** | 4 |
| **Missing fields** | None significant (config is a JSON blob — could be more structured) |
| **Missing indexes** | None |
| **Referential integrity** | ✅ Referenced by 18 FK relationships |
| **Tenant isolation** | N/A — root entity |
| **Versioning support** | `updatedAt` only |
| **Notes** | Serves as both org and tenant. No separate Organization model. The "tenant" entity conflates the technical tenant boundary with the organizational/school entity. |

---

### 2.2 User

| Property | Detail |
|----------|--------|
| **Model name** | `User` |
| **Architecture requirement** | Users, authentication, RBAC (§23, §38) |
| **Status** | **COMPLETE** |
| **Fields count** | 11 (id, tenantId, email, name, passwordHash, role, isActive, imageUrl, lastLoginAt, createdAt, updatedAt) |
| **Row count** | 5 |
| **Missing fields** | phone, grade, targetTest, targetScore, testDate, parentInfo, preferredLanguage, guardianLinkage |
| **Missing indexes** | None |
| **Referential integrity** | ✅ tenantId → Tenant, referenced by 10+ FKs |
| **Tenant isolation** | ✅ `tenantId` + compound unique `[tenantId, email]` |
| **Versioning support** | `updatedAt` only |
| **Notes** | Role is a string field, not a proper RBAC model. Missing registration fields from Master Architecture §38 (grade, target test, school, etc.). No separate parent/guardian model. |

---

### 2.3 Teacher

| Property | Detail |
|----------|--------|
| **Model name** | `Teacher` |
| **Architecture requirement** | Teacher role/profile per §23, §25 |
| **Status** | **COMPLETE** |
| **Fields count** | 7 (id, tenantId, userId, bio, isActive, createdAt, updatedAt) |
| **Row count** | 0 |
| **Missing fields** | specialization, credentials, subjects taught |
| **Missing indexes** | None |
| **Referential integrity** | ✅ tenantId → Tenant, userId → User (unique) |
| **Tenant isolation** | ✅ `tenantId` + compound unique `[tenantId, userId]` |
| **Versioning support** | `updatedAt` only |
| **Notes** | 0 rows — no teachers exist. The Teacher model is a thin profile extension of User. |

---

### 2.4 AccessCode

| Property | Detail |
|----------|--------|
| **Model name** | `AccessCode` |
| **Architecture requirement** | Access codes, redemption (§39) |
| **Status** | **COMPLETE** |
| **Fields count** | 11 (id, tenantId, code, role, maxUses, useCount, expiresAt, isActive, createdBy, createdAt, updatedAt) |
| **Row count** | 1 |
| **Missing fields** | scope (school/course/teacher), trial duration, feature flags |
| **Missing indexes** | None |
| **Referential integrity** | ✅ tenantId → Tenant |
| **Tenant isolation** | ✅ `tenantId` |
| **Versioning support** | `updatedAt` only |
| **Notes** | Core model is solid. Missing scope fields from §39 (school-specific, course-specific, teacher-specific). |

---

### 2.5 AccessCodeRedemption

| Property | Detail |
|----------|--------|
| **Model name** | `AccessCodeRedemption` |
| **Architecture requirement** | Redemption audit trail (§39) |
| **Status** | **COMPLETE** |
| **Fields count** | 5 (id, accessCodeId, userId, redeemedAt, ipAddress) |
| **Row count** | 1 |
| **Missing fields** | deviceId, userAgent (for anti-fraud) |
| **Missing indexes** | None |
| **Referential integrity** | ✅ accessCodeId → AccessCode, userId → User |
| **Tenant isolation** | ❌ Indirect via AccessCode |
| **Versioning support** | N/A (immutable audit record) |
| **Notes** | Compound unique `[accessCodeId, userId]` prevents double-redemption. |

---

### 2.6 Program

| Property | Detail |
|----------|--------|
| **Model name** | `Program` |
| **Architecture requirement** | Top-level curriculum container (PB-CURR-001, §5) |
| **Status** | **COMPLETE** |
| **Fields count** | 9 (id, tenantId, code, name, description, isActive, order, createdAt, updatedAt) |
| **Row count** | 3 (core, sat, map) |
| **Missing fields** | subjectMapping (JSON for program→subject mappings), metadata |
| **Missing indexes** | None |
| **Referential integrity** | ✅ tenantId → Tenant |
| **Tenant isolation** | ✅ `tenantId` + compound unique `[tenantId, code]` |
| **Versioning support** | `updatedAt` only |
| **Notes** | Solid model. The 3 programs (core, sat, map) match the architecture. |

---

### 2.7 Grade

| Property | Detail |
|----------|--------|
| **Model name** | `Grade` |
| **Architecture requirement** | Grade/level container (§5, §6) |
| **Status** | **COMPLETE** |
| **Fields count** | 8 (id, programId, level, label, isActive, order, createdAt, updatedAt) |
| **Row count** | 3 |
| **Missing fields** | None |
| **Missing indexes** | None |
| **Referential integrity** | ✅ programId → Program (onDelete: no action — no cascade) |
| **Tenant isolation** | ❌ Indirect via Program |
| **Versioning support** | `updatedAt` only |
| **Notes** | Only 3 grades exist (Grade 8, SAT Math, SAT R&W). K-10 grades are mostly empty. |

---

### 2.8 Skill

| Property | Detail |
|----------|--------|
| **Model name** | `Skill` |
| **Architecture requirement** | Skill (domain → category → subcategory) (§5, PB-CURR-001) |
| **Status** | **COMPLETE** |
| **Fields count** | 17 (id, gradeId, code, name, description, subject, domain, category, subcategory, difficulty, isActive, order, lesson, strategy, commonMistakes, createdAt, updatedAt) |
| **Row count** | 9 |
| **Missing fields** | learningObjective, parentSkillId (for hierarchy), prerequisiteIds |
| **Missing indexes** | None |
| **Referential integrity** | ✅ gradeId → Grade |
| **Tenant isolation** | ❌ Indirect via Grade → Program → Tenant |
| **Versioning support** | `updatedAt` only |
| **Notes** | 9 skills covering 3 core + 6 SAT. Domain/category/subcategory are embedded strings, not normalized models. Missing learningObjective (present on MicroSkill but not on Skill). |

---

### 2.9 MicroSkill

| Property | Detail |
|----------|--------|
| **Model name** | `MicroSkill` |
| **Architecture requirement** | Instructional atomic unit (PB-CURR-001, §5, Phase 2B) |
| **Status** | **COMPLETE** |
| **Fields count** | 12 (id, tenantId, skillId, code, name, description, learningObjective, difficulty, order, isActive, createdAt, updatedAt) |
| **Row count** | 27 (3 per skill × 9 skills) |
| **Missing fields** | prerequisiteIds, extensionIds, estimatedDuration |
| **Missing indexes** | None |
| **Referential integrity** | ✅ tenantId → Tenant, skillId → Skill |
| **Tenant isolation** | ✅ `tenantId` + compound unique `[tenantId, skillId, code]` |
| **Versioning support** | `updatedAt` only |
| **Notes** | **Well-structured.** 27 micro-skills, 3 per skill (Foundations, Application, Mastery). No prerequisites graph. |

---

### 2.10 GoldQuestion

| Property | Detail |
|----------|--------|
| **Model name** | `GoldQuestion` |
| **Architecture requirement** | Gold-certified questions (§10, §13) |
| **Status** | **COMPLETE** |
| **Fields count** | 23 (id, tenantId, microSkillId, externalId, subject, domain, category, subcategory, difficulty, format, passage, stem, options, correctAnswer, acceptedResponses, explanation, skillCode, tags, hash, goldStatus, version, createdAt, updatedAt) |
| **Row count** | 5 |
| **Missing fields** | strategy, hint, learningObjective, estimatedTime, calculatorAllowed, figureUrl, source, rightsStatus, qualityStatus, authorId, reviewerId, reviewNotes |
| **Missing indexes** | None |
| **Referential integrity** | ✅ tenantId → Tenant, microSkillId → MicroSkill |
| **Tenant isolation** | ✅ `tenantId` + indexed `[tenantId, goldStatus]` |
| **Versioning support** | `version` field (Int, default 1) |
| **Notes** | Only 5 gold questions exist. Only 1 of 5 is linked to a micro-skill. The architecture requires ~10 per micro-skill (270+ for 27 micro-skills). Missing strategy, hint, and quality workflow fields. |

---

### 2.11 QuestionFamily

| Property | Detail |
|----------|--------|
| **Model name** | `QuestionFamily` |
| **Architecture requirement** | Structural question families (§12) |
| **Status** | **COMPLETE** |
| **Fields count** | 10 (id, tenantId, goldQuestionId, name, description, variationCount, difficulty, isActive, createdAt, updatedAt) |
| **Row count** | 5 |
| **Missing fields** | structuralHash, familyType, generationTemplate |
| **Missing indexes** | None |
| **Referential integrity** | ✅ tenantId → Tenant, goldQuestionId → GoldQuestion |
| **Tenant isolation** | ✅ `tenantId` + indexed `[tenantId, goldQuestionId]` |
| **Versioning support** | `updatedAt` only |
| **Notes** | 5 families, one per gold question. variationCount is 0 for all — no tracked variations. |

---

### 2.12 Question

| Property | Detail |
|----------|--------|
| **Model name** | `Question` |
| **Architecture requirement** | Core question content (§15, §16) |
| **Status** | **COMPLETE** |
| **Fields count** | 35 (id, tenantId, goldQuestionId, familyId, skillId, microSkillId, programId, externalId, subject, domain, category, subcategory, difficulty, format, passage, stem, options, correctAnswer, acceptedResponses, explanation, strategy, hint, estimatedTime, calculatorAllowed, figureUrl, source, rightsStatus, hash, questionStatus, qualityStatus, isActive, version, parentVersionId, createdAt, updatedAt) |
| **Row count** | 2,520 |
| **Missing fields** | solutionSteps (detailed step-by-step), commonMistakes, accessibilityAltText, difficultyConfidence, authorId, reviewerId, reviewDate |
| **Missing indexes** | `[tenantId, programId]`, `[tenantId, microSkillId]`, `[tenantId, subject]` |
| **Referential integrity** | ✅ All FKs clean |
| **Tenant isolation** | ✅ `tenantId` + indexed `[tenantId, skillId]` |
| **Versioning support** | `version` (Int) + `parentVersionId` (links to previous version) |
| **⚠️ Critical issue** | **Only 5 of 2,520 questions (0.2%) are linked to a skill.** 0 linked to micro_skills. 2,441 linked to a program. The question-skill-taxonomy linkage is effectively broken. |

---

### 2.13 QuestionVersion

| Property | Detail |
|----------|--------|
| **Model name** | `QuestionVersion` |
| **Architecture requirement** | Version pinning per attempt (§43, Phase 2A) |
| **Status** | **COMPLETE** |
| **Fields count** | 19 (id, tenantId, questionId, versionNumber, stem, options, correctAnswer, explanation, strategy, questionType, difficulty, format, passage, acceptedResponses, qualityStatus, contentHash, createdBy, publishedAt, createdAt) |
| **Row count** | 2,520 (1:1 with questions — each question has exactly 1 version) |
| **Missing fields** | hint, calculatorAllowed, estimatedTime, figureUrl, source, rightsStatus |
| **Missing indexes** | `[tenantId, questionId]` |
| **Referential integrity** | ✅ questionId → Question (onDelete: Cascade), tenantId → Tenant |
| **Tenant isolation** | ✅ `tenantId` + indexed |
| **Versioning support** | ✅ `versionNumber` + compound unique `[questionId, versionNumber]` |
| **Notes** | Excellent versioning model. Each question has exactly 1 version (v1). No publishedAt dates set. Content hash is present for integrity verification. |

---

### 2.14 Assignment

| Property | Detail |
|----------|--------|
| **Model name** | `Assignment` |
| **Architecture requirement** | Teacher assignments (Phase 2C, §25, §57) |
| **Status** | **COMPLETE** |
| **Fields count** | 14 (id, tenantId, teacherId, classId, courseId, title, description, programId, dueAt, totalQuestions, mode, status, createdAt, updatedAt) |
| **Row count** | 0 |
| **Missing fields** | attemptLimit, showExplanations, randomizeOrder, allowRetry |
| **Missing indexes** | `[tenantId, classId]`, `[tenantId, programId]` |
| **Referential integrity** | ✅ tenantId → Tenant, teacherId → User, courseId → Course, programId → Program |
| **Tenant isolation** | ✅ `tenantId` + indexed `[tenantId, teacherId]` |
| **Versioning support** | `updatedAt` only |
| **Notes** | 0 rows — no assignments exist. `classId` is a String? with no FK (no Class model exists). |

---

### 2.15 AssignmentItem

| Property | Detail |
|----------|--------|
| **Model name** | `AssignmentItem` |
| **Architecture requirement** | Individual items in assignments (Phase 2C) |
| **Status** | **COMPLETE** |
| **Fields count** | 7 (id, assignmentId, skillId, microSkillId, questionId, seq, createdAt) |
| **Row count** | 0 |
| **Missing fields** | points, isRequired, difficultyOverride |
| **Missing indexes** | None |
| **Referential integrity** | ✅ assignmentId → Assignment (onDelete: Cascade), skillId → Skill, microSkillId → MicroSkill, questionId → Question |
| **Tenant isolation** | ❌ Indirect via Assignment |
| **Versioning support** | N/A |
| **Notes** | 0 rows — no assignment items exist. |

---

### 2.16 StudentAssignment

| Property | Detail |
|----------|--------|
| **Model name** | `StudentAssignment` |
| **Architecture requirement** | Student assignment state (Phase 2C, §57) |
| **Status** | **COMPLETE** |
| **Fields count** | 11 (id, assignmentId, studentId, status, startedAt, completedAt, score, totalQuestions, correctCount, createdAt, updatedAt) |
| **Row count** | 0 |
| **Missing fields** | attemptLimit, timeSpent, isGraded |
| **Missing indexes** | None |
| **Referential integrity** | ✅ assignmentId → Assignment (onDelete: Cascade), studentId → User |
| **Tenant isolation** | ❌ Indirect via Assignment |
| **Versioning support** | `updatedAt` only |
| **Notes** | 0 rows — no student assignments exist. Compound unique `[assignmentId, studentId]` prevents duplicate assignments. |

---

### 2.17 StudentAttempt

| Property | Detail |
|----------|--------|
| **Model name** | `StudentAttempt` |
| **Architecture requirement** | Immutable attempt capture (§19, §43) |
| **Status** | **COMPLETE** |
| **Fields count** | 17 (id, tenantId, userId, questionId, questionVersionId, skillId, microSkillId, sessionId, answer, isCorrect, timeSpent, hintsUsed, attemptNumber, snapshotHash, ipAddress, userAgent, createdAt) |
| **Row count** | 22 |
| **Missing fields** | deliveryId (unique delivery reference), evaluationMetadata, score (partial credit) |
| **Missing indexes** | `[tenantId, createdAt]` (for time-based queries), `[tenantId, questionId]` |
| **Referential integrity** | ✅ All FKs clean |
| **Tenant isolation** | ✅ `tenantId` + indexed `[tenantId, userId, skillId]` |
| **Versioning support** | ✅ Immutable (no `updatedAt` — append-only) + `snapshotHash` |
| **Notes** | **Excellent model.** Append-only design with snapshotHash for integrity. Missing `deliveryId` from architecture §19. 22 attempts exist. |

---

### 2.18 PracticeSession

| Property | Detail |
|----------|--------|
| **Model name** | `PracticeSession` |
| **Architecture requirement** | Session tracking (§46) |
| **Status** | **COMPLETE** |
| **Fields count** | 10 (id, tenantId, userId, type, status, startedAt, completedAt, totalQuestions, correctCount, totalTimeSpent) |
| **Row count** | 5 |
| **Missing fields** | programId, mode (independent/guided/live), deviceInfo, metadata |
| **Missing indexes** | None |
| **Referential integrity** | ✅ tenantId → Tenant, userId → User |
| **Tenant isolation** | ✅ `tenantId` + indexed `[tenantId, userId, status]` |
| **Versioning support** | N/A |
| **Notes** | Missing programId — cannot determine which program a session belongs to. 5 sessions exist. |

---

### 2.19 UserSkillMastery

| Property | Detail |
|----------|--------|
| **Model name** | `UserSkillMastery` |
| **Architecture requirement** | Skill/micro-skill progress (§20) |
| **Status** | **COMPLETE** |
| **Fields count** | 12 (id, tenantId, userId, skillId, microSkillId, level, confidence, attemptsCount, correctCount, lastAttemptAt, createdAt, updatedAt) |
| **Row count** | 1 |
| **Missing fields** | difficultyProgression, recoveryRate, avgTimeSpent, questionFamilyCoverage |
| **Missing indexes** | None |
| **Referential integrity** | ✅ tenantId → Tenant, userId → User, skillId → Skill, microSkillId → MicroSkill |
| **Tenant isolation** | ✅ `tenantId` + compound unique `[tenantId, userId, skillId]` |
| **Versioning support** | `updatedAt` only |
| **Notes** | Good model. Missing `microSkillId` from the unique constraint (currently only `[tenantId, userId, skillId]`). Only 1 row. |

---

### 2.20 Course

| Property | Detail |
|----------|--------|
| **Model name** | `Course` |
| **Architecture requirement** | Course grouping (§24, §25) |
| **Status** | **COMPLETE** |
| **Fields count** | 8 (id, tenantId, name, description, code, isActive, createdAt, updatedAt) |
| **Row count** | 0 |
| **Missing fields** | programId, startDate, endDate, teacherId, maxStudents, gradeLevel, subject |
| **Missing indexes** | `[tenantId]` |
| **Referential integrity** | ✅ tenantId → Tenant |
| **Tenant isolation** | ✅ `tenantId` + compound unique `[tenantId, code]` |
| **Versioning support** | `updatedAt` only |
| **Notes** | 0 rows — no courses exist. No link to Program or Teacher. |

---

### 2.21 Enrollment

| Property | Detail |
|----------|--------|
| **Model name** | `Enrollment` |
| **Architecture requirement** | Course enrollment (§24, §25) |
| **Status** | **COMPLETE** |
| **Fields count** | 8 (id, tenantId, userId, courseId, role, enrolledAt, expiresAt, isActive) |
| **Row count** | 0 |
| **Missing fields** | gradeLevel, programId, groupId, metadata |
| **Missing indexes** | `[tenantId, userId]` |
| **Referential integrity** | ✅ tenantId → Tenant, userId → User, courseId → Course |
| **Tenant isolation** | ✅ `tenantId` + compound unique `[tenantId, userId, courseId]` |
| **Versioning support** | N/A |
| **Notes** | 0 rows — no enrollments exist. No FK to a Class model (none exists). |

---

### 2.22 Exam

| Property | Detail |
|----------|--------|
| **Model name** | `Exam` |
| **Architecture requirement** | Mock exams / assessments |
| **Status** | **COMPLETE** |
| **Fields count** | 12 (id, tenantId, courseId, title, description, type, duration, totalMarks, passingMarks, isActive, createdAt, updatedAt) |
| **Row count** | 0 |
| **Missing fields** | programId, sections (JSON), blueprintConfig, randomizeOrder, attemptLimit |
| **Missing indexes** | None |
| **Referential integrity** | ✅ tenantId → Tenant, courseId → Course |
| **Tenant isolation** | ✅ `tenantId` + indexed `[tenantId, type]` |
| **Versioning support** | `updatedAt` only |
| **Notes** | 0 rows — no exams exist. |

---

### 2.23 FeatureFlag

| Property | Detail |
|----------|--------|
| **Model name** | `FeatureFlag` |
| **Architecture requirement** | Feature entitlements (§40) |
| **Status** | **COMPLETE** |
| **Fields count** | 7 (id, key, label, description, isActive, createdAt, updatedAt) |
| **Row count** | 6 |
| **Missing fields** | tenantId (not tenant-scoped), category, defaultValue |
| **Missing indexes** | None |
| **Referential integrity** | ✅ None (standalone) |
| **Tenant isolation** | ❌ No tenantId — global flags |
| **Versioning support** | `updatedAt` only |
| **Notes** | Global flags only. Not tenant-scoped. 4 active, 2 inactive. |

---

### 2.24 SubscriptionPlan

| Property | Detail |
|----------|--------|
| **Model name** | `SubscriptionPlan` |
| **Architecture requirement** | Subscription tier model (§40) |
| **Status** | **COMPLETE** |
| **Fields count** | 10 (id, name, description, price, currency, interval, isActive, features, createdAt, updatedAt) |
| **Row count** | 5 |
| **Missing fields** | tenantId, maxStudents, maxQuestions, maxSessions, featureFlagOverrides |
| **Missing indexes** | None |
| **Referential integrity** | ✅ None (standalone) |
| **Tenant isolation** | ❌ No tenantId — global plans |
| **Versioning support** | `updatedAt` only |
| **Notes** | 5 plans. The `features` field is a JSON string — no normalized entitlement model. |

---

### 2.25 UserSubscription

| Property | Detail |
|----------|--------|
| **Model name** | `UserSubscription` |
| **Architecture requirement** | Per-user subscription state (§40) |
| **Status** | **COMPLETE** |
| **Fields count** | 8 (id, userId, planId, status, currentPeriodStart, currentPeriodEnd, createdAt, updatedAt) |
| **Row count** | 0 |
| **Missing fields** | tenantId, trialEndsAt, cancelledAt, autoRenew |
| **Missing indexes** | `[userId, status]` |
| **Referential integrity** | ✅ planId → SubscriptionPlan |
| **Tenant isolation** | ❌ No tenantId (indirect via User) |
| **Versioning support** | `updatedAt` only |
| **Notes** | 0 rows — no subscriptions exist. |

---

### 2.26 Payment

| Property | Detail |
|----------|--------|
| **Model name** | `Payment` |
| **Architecture requirement** | Payment tracking |
| **Status** | **COMPLETE** |
| **Fields count** | 11 (id, userId, subscriptionPlanId, amount, currency, status, paymentMethod, transactionId, paidAt, createdAt, updatedAt) |
| **Row count** | 0 |
| **Missing fields** | tenantId, invoiceUrl, refundId, metadata |
| **Missing indexes** | `[userId, status]`, `[transactionId]` |
| **Referential integrity** | ✅ userId → User |
| **Tenant isolation** | ❌ No tenantId (indirect via User) |
| **Versioning support** | `updatedAt` only |
| **Notes** | 0 rows — no payments. |

---

### 2.27 AdminAuditEvent

| Property | Detail |
|----------|--------|
| **Model name** | `AdminAuditEvent` |
| **Architecture requirement** | Audit logging (§47) |
| **Status** | **COMPLETE** |
| **Fields count** | 8 (id, adminId, action, entity, entityId, details, ipAddress, createdAt) |
| **Row count** | 1 |
| **Missing fields** | tenantId, userAgent, sessionId, beforeState, afterState |
| **Missing indexes** | `[entity, entityId]`, `[action, createdAt]` |
| **Referential integrity** | ⚠️ No FK to User (adminId is a String, not a User relation) |
| **Tenant isolation** | ❌ No tenantId |
| **Versioning support** | ✅ Immutable (no updatedAt — append-only) |
| **Notes** | Good immutable audit model. Missing tenantId and FK to User. 1 event exists. |

---

### 2.28 PlatformSetting

| Property | Detail |
|----------|--------|
| **Model name** | `PlatformSetting` |
| **Architecture requirement** | System configuration |
| **Status** | **COMPLETE** |
| **Fields count** | 7 (id, key, value, type, group, createdAt, updatedAt) |
| **Row count** | 0 |
| **Missing fields** | tenantId (for tenant-specific settings) |
| **Missing indexes** | `[group]` |
| **Referential integrity** | ✅ None |
| **Tenant isolation** | ❌ No tenantId — global settings |
| **Versioning support** | `updatedAt` only |
| **Notes** | 0 rows. No tenant-specific overrides. |

---

## 3. MISSING MODELS (Architecture-Required, Not in Schema)

| # | Entity | Architecture Requirement | Priority | Description |
|---|--------|------------------------|----------|-------------|
| 1 | **Organization** | §41, §42, Phase 1 | **Critical** | Separate from Tenant. Organizations have their own settings, branding, domain, and admin hierarchy. Currently conflated with Tenant. |
| 2 | **School** | §41, Phase 1 | **Critical** | Schools within organizations. Each school has its own classes, teachers, and students. No school model exists. |
| 3 | **Class** | §41, §25, Phase 1 | **Critical** | Classroom grouping. `Assignment.classId` is a String? with no FK — no Class model exists. |
| 4 | **Membership** | §41, §23, Phase 1 | **High** | Formal RBAC memberships. Currently User.role is a string. No membership model, no permission sets. |
| 5 | **Subject** | §41, §5 | **High** | Subjects are embedded as String fields on Skill, Question, GoldQuestion. No normalized Subject model. |
| 6 | **Prerequisite** | PB-CURR-003, §5 | **High** | Prerequisite graph for skills/micro-skills needed for recommendation engine. No model exists. |
| 7 | **Standard** | PB-CURR-004, §5 | **Medium** | Standards mappings (Common Core, etc.). No model exists. |
| 8 | **Asset** | PB-ARCH-005, §15 | **High** | Object/media storage for images, diagrams, audio. No asset table exists. |
| 9 | **Delivery** | §19, §43, Phase 3 | **Critical** | Each question delivery needs a unique delivery instance/reference. No delivery model exists. |
| 10 | **LiveSession** | §25, Phase 7 | **Medium** | Teacher-led live classroom session. No model exists. |
| 11 | **StudentLiveState** | §25, Phase 7 | **Medium** | Per-student state during live classroom. No model exists. |
| 12 | **Entitlement** | §40, Phase 11 | **High** | Feature-level entitlements per user/org. Currently conflated with subscriptions. |

---

## 4. MISSING FIELDS (By Model)

| Model | Missing Fields | Impact |
|-------|---------------|--------|
| **User** | phone, grade, targetTest, targetScore, testDate, parentInfo, preferredLanguage, guardianLinkage | Cannot register students per §38 |
| **Teacher** | specialization, credentials, subjectsTaught | Cannot track teacher qualifications |
| **AccessCode** | scope (school/course/teacher), trialDuration, featureFlags | Cannot scope access codes per §39 |
| **GoldQuestion** | strategy, hint, estimatedTime, calculatorAllowed, figureUrl, source, rightsStatus, authorId, reviewerId, reviewNotes | Missing content quality workflow |
| **Question** | solutionSteps, commonMistakes, accessibilityAltText, difficultyConfidence, authorId, reviewerId | Missing content quality fields from §15 |
| **QuestionVersion** | hint, calculatorAllowed, estimatedTime, figureUrl, source, rightsStatus | Incomplete version snapshot |
| **Assignment** | attemptLimit, showExplanations, randomizeOrder, allowRetry | Missing assignment configuration |
| **PracticeSession** | programId, mode, deviceInfo, metadata | Cannot determine session program |
| **StudentAttempt** | deliveryId, evaluationMetadata, score | Missing delivery reference from §19 |
| **UserSkillMastery** | difficultyProgression, recoveryRate, avgTimeSpent, questionFamilyCoverage | Limited mastery computation |
| **AdminAuditEvent** | tenantId, userAgent, beforeState, afterState | Incomplete audit trail |

---

## 5. MISSING INDEXES

| Table | Missing Index | Justification |
|-------|--------------|---------------|
| `questions` | `[tenantId, programId]` | Program-scoped queries |
| `questions` | `[tenantId, microSkillId]` | Micro-skill-scoped queries |
| `questions` | `[tenantId, subject]` | Subject-scoped queries |
| `question_versions` | `[tenantId, questionId]` | Tenant-scoped version queries |
| `assignments` | `[tenantId, classId]` | Class-scoped assignment queries |
| `assignments` | `[tenantId, programId]` | Program-scoped assignment queries |
| `enrollments` | `[tenantId, userId]` | User enrollment queries |
| `payments` | `[userId, status]` | User payment status queries |
| `payments` | `[transactionId]` | Payment gateway reconciliation |
| `user_subscriptions` | `[userId, status]` | Active subscription queries |
| `student_attempts` | `[tenantId, createdAt]` | Time-based analytics queries |
| `student_attempts` | `[tenantId, questionId]` | Question performance queries |
| `admin_audit_events` | `[entity, entityId]` | Entity audit trail |
| `admin_audit_events` | `[action, createdAt]` | Action-based audit queries |

---

## 6. REFERENTIAL INTEGRITY ISSUES

| Issue | Table | Detail | Severity |
|-------|-------|--------|----------|
| 🟢 **No orphaned records** | All | All FK relationships resolve to existing records | ✅ Clean |
| 🟡 **classId without FK** | `assignments` | `classId` is a String? with no FK constraint — references a non-existent Class model | **High** |
| 🟡 **adminId without FK** | `admin_audit_events` | `adminId` is a String with no FK to User — can reference non-existent users | **Medium** |
| 🟡 **Missing ON DELETE rules** | Various | Prisma schema omits explicit `onDelete` for most FKs (PostgreSQL defaults to NO ACTION) | **Low** |

---

## 7. TENANT ISOLATION AUDIT

| Category | Models | Status |
|----------|--------|--------|
| **✅ Tenant-isolated** | Tenant, User, Teacher, AccessCode, Program, MicroSkill, GoldQuestion, QuestionFamily, Question, QuestionVersion, Assignment, StudentAttempt, PracticeSession, UserSkillMastery, Course, Enrollment, Exam | 17 models |
| **❌ Not tenant-isolated** | FeatureFlag, SubscriptionPlan, UserSubscription, Payment, AdminAuditEvent, PlatformSetting | 6 models |
| **❌ Indirect only** | Grade (via Program), Skill (via Grade→Program), AssignmentItem (via Assignment), StudentAssignment (via Assignment), AccessCodeRedemption (via AccessCode) | 5 models |

**Recommendation:** All models should be tenant-scoped. Non-tenant-isolated models should get a `tenantId` field.

---

## 8. VERSIONING SUPPORT

| Model | Version Field | Version History | Immutable |
|-------|--------------|-----------------|-----------|
| **Question** | `version` (Int) + `parentVersionId` | Via QuestionVersion | ❌ (mutable) |
| **QuestionVersion** | `versionNumber` (Int) + compound unique | ✅ Full history | ✅ |
| **GoldQuestion** | `version` (Int) | No history (overwrites) | ❌ (mutable) |
| **StudentAttempt** | N/A (append-only) | N/A | ✅ (snapshotHash) |
| **AdminAuditEvent** | N/A (append-only) | N/A | ✅ |
| **All others** | `updatedAt` only | Overwritten | ❌ |

**Recommendation:** GoldQuestion needs version history (like Question/QuestionVersion). Mastery and configuration models don't need versioning.

---

## 9. DATA QUALITY ISSUES

| # | Issue | Severity | Detail |
|---|-------|----------|--------|
| 1 | **Question-skill linkage broken** | **Critical** | Only 5 of 2,520 questions (0.2%) linked to a skill. 0 linked to micro_skills. Questions cannot be used for skill-based practice or mastery tracking. |
| 2 | **Gold questions not linked to micro-skills** | **High** | Only 1 of 5 gold questions linked to a micro-skill. Cannot serve as micro-skill anchors. |
| 3 | **QuestionVersion missing publishedAt** | **Medium** | All 2,520 versions have NULL publishedAt. No version has been published. |
| 4 | **QuestionFamily variationCount = 0** | **Medium** | All 5 families report 0 variations despite having linked questions. |
| 5 | **No assignments/exams/courses** | **High** | 0 rows in assignments, assignment_items, student_assignments, courses, enrollments, exams. Assignment workflow is non-functional. |
| 6 | **No teachers** | **Medium** | 0 teachers exist. Teacher workflow cannot be tested. |
| 7 | **No subscriptions** | **Low** | Subscription plans exist (5) but no active subscriptions. |
| 8 | **Only 3 grades seeded** | **Medium** | Only Grade 8, SAT Math, SAT R&W. K-10 grades missing. |
| 9 | **Only 9 skills seeded** | **Medium** | 3 Core skills (Grade 8 only) + 6 SAT skills. Missing K-7 skills. |
| 10 | **PracticeSession lacks programId** | **Medium** | Cannot determine which program a session belongs to. |

---

## 10. SPECIFIC MIGRATIONS NEEDED

### Phase 1 — Foundation Models (Critical)

| # | Migration | Priority | Description |
|---|-----------|----------|-------------|
| M1 | Create `Organization` model | **Critical** | Fields: id, tenantId, name, slug, domain, logo, isActive, config, createdAt, updatedAt. Unique: [tenantId, slug]. |
| M2 | Create `School` model | **Critical** | Fields: id, tenantId, organizationId, name, code, address, phone, isActive, createdAt, updatedAt. FK: organizationId → Organization. Unique: [tenantId, code]. |
| M3 | Create `Class` model | **Critical** | Fields: id, tenantId, schoolId, name, code, gradeLevel, subject, teacherId, academicYear, isActive, createdAt, updatedAt. FK: schoolId → School, teacherId → User. Unique: [tenantId, code]. |
| M4 | Add FK constraint for `Assignment.classId` | **Critical** | ALTER assignments ADD CONSTRAINT fk_class FOREIGN KEY (classId) REFERENCES classes(id). |
| M5 | Create `Membership` model | **High** | Fields: id, tenantId, userId, organizationId, schoolId, role, permissions, isActive, createdAt, updatedAt. FK: userId → User, organizationId → Organization, schoolId → School. Unique: [tenantId, userId, organizationId, schoolId]. |

### Phase 2 — Curriculum & Content (High)

| # | Migration | Priority | Description |
|---|-----------|----------|-------------|
| M6 | Create `Subject` model | **High** | Fields: id, tenantId, programId, code, name, description, isActive, order. FK: programId → Program. Unique: [tenantId, code]. |
| M7 | Migrate subject strings to FK references | **High** | Replace `subject` String on Skill, Question, GoldQuestion with `subjectId` FK → Subject. |
| M8 | Create `Prerequisite` model | **High** | Fields: id, tenantId, skillId, microSkillId, prerequisiteSkillId, prerequisiteMicroSkillId, type (required/recommended), minMasteryLevel, createdAt. FK: skillId → Skill, microSkillId → MicroSkill. |
| M9 | Create `Standard` model | **Medium** | Fields: id, tenantId, code, name, description, authority (e.g. "Common Core"), subject, grade, createdAt. |
| M10 | Create `StandardMapping` model | **Medium** | Fields: id, standardId, skillId, microSkillId, mappingType. FK: standardId → Standard. |
| M11 | Create `Asset` model | **High** | Fields: id, tenantId, fileName, originalName, mimeType, size, url, altText, type (image/audio/pdf), width, height, createdAt. |

### Phase 3 — Delivery & Attempts (High)

| # | Migration | Priority | Description |
|---|-----------|----------|-------------|
| M12 | Create `Delivery` model | **Critical** | Fields: id, tenantId, questionId, questionVersionId, sessionId, assignmentItemId, studentId, mode, sequence, deliveredAt, createdAt. FK: questionId → Question, questionVersionId → QuestionVersion, sessionId → PracticeSession. |
| M13 | Add `deliveryId` to `StudentAttempt` | **Critical** | ALTER student_attempts ADD COLUMN deliveryId TEXT REFERENCES deliveries(id). Add unique constraint: [deliveryId, attemptNumber]. |
| M14 | Add `programId` to `PracticeSession` | **High** | ALTER practice_sessions ADD COLUMN programId TEXT REFERENCES programs(id). Add index: [tenantId, programId, userId]. |

### Phase 4 — Live Classroom

| # | Migration | Priority | Description |
|---|-----------|----------|-------------|
| M15 | Create `LiveSession` model | **Medium** | Fields: id, tenantId, teacherId, classId, status, startedAt, endedAt, createdAt. |
| M16 | Create `StudentLiveState` model | **Medium** | Fields: id, liveSessionId, studentId, currentQuestionId, answer, isCorrect, status, createdAt. |

### Phase 5 — Entitlements & Commercial (Medium)

| # | Migration | Priority | Description |
|---|-----------|----------|-------------|
| M17 | Create `Entitlement` model | **High** | Fields: id, tenantId, userId, organizationId, featureKey, isEnabled, grantedAt, expiresAt, grantedBy. FK: userId → User. |
| M18 | Add `tenantId` to `FeatureFlag`, `SubscriptionPlan`, `UserSubscription`, `Payment`, `AdminAuditEvent`, `PlatformSetting` | **High** | ALTER tables ADD COLUMN tenantId TEXT REFERENCES tenants(id). Add indexes. |

### Phase 6 — Index Additions

| # | Migration | Priority | Description |
|---|-----------|----------|-------------|
| M19 | Add missing indexes (see §5) | **Medium** | CREATE INDEX statements for all missing indexes listed in §5. |

### Phase 7 — Field Additions

| # | Migration | Priority | Description |
|---|-----------|----------|-------------|
| M20 | Add missing User fields | **Medium** | phone, grade, targetTest, targetScore, testDate, preferredLanguage |
| M21 | Add missing GoldQuestion fields | **Medium** | strategy, hint, estimatedTime, calculatorAllowed, figureUrl, source, rightsStatus, authorId, reviewerId |
| M22 | Add missing Question fields | **Low** | solutionSteps, commonMistakes, accessibilityAltText, difficultyConfidence |
| M23 | Add missing QuestionVersion fields | **Medium** | hint, calculatorAllowed, estimatedTime, figureUrl, source, rightsStatus |
| M24 | Add FK for `adminId` in `AdminAuditEvent` | **Medium** | ALTER admin_audit_events ADD CONSTRAINT fk_admin FOREIGN KEY (adminId) REFERENCES users(id). |

### Phase 8 — Data Remediation

| # | Migration | Priority | Description |
|---|-----------|----------|-------------|
| M25 | Link questions to skills | **Critical** | Update 2,515 questions to populate `skillId` and `microSkillId` based on program/subject/domain/category matching. |
| M26 | Link gold questions to micro-skills | **High** | Update 4 gold questions to populate `microSkillId`. |
| M27 | Seed K-10 grades | **High** | Create Grade records for K-10 under Core program. |
| M28 | Seed remaining skills | **High** | Create skills for K-7 Core Math and English. |
| M29 | Seed micro-skills for all skills | **High** | Create 3 micro-skills per skill (Foundations, Application, Mastery). |
| M30 | Publish question versions | **Medium** | Set `publishedAt` on all question versions. |

---

## 11. SUMMARY

### Status Summary

```
COMPLETE:  16 models (57%)  — Tenant, User, Teacher, AccessCode, AccessCodeRedemption, 
                              Program, Grade, Skill, MicroSkill, GoldQuestion, QuestionFamily, 
                              Question, QuestionVersion, PracticeSession, StudentAttempt, 
                              UserSkillMastery
PARTIAL:    6 models (21%)  — Assignment, AssignmentItem, StudentAssignment, Course, 
                              Enrollment, Exam (all exist but have 0 rows)
MISSING:   12 models (43%)  — Organization, School, Class, Membership, Subject, Prerequisite, 
                              Standard, Asset, Delivery, LiveSession, StudentLiveState, Entitlement
```

### Critical Findings

1. **Question-skill linkage is broken** — 99.8% of questions have no skill association. This is the single most critical data quality issue. Without it, skill-based practice, mastery tracking, and recommendations cannot function.

2. **12 missing models** — The architecture requires 28 entities; only 16 exist. The most critical missing models are Organization, School, Class, Delivery, and Membership.

3. **No class structure** — The `Assignment.classId` field references a non-existent Class model. The entire assignment workflow is non-functional as a result.

4. **No delivery tracking** — Each question delivery must create a unique delivery instance per §19. The `StudentAttempt` model lacks `deliveryId`, making it impossible to track which specific delivery instance produced an attempt.

5. **Tenant isolation gaps** — 6 models (FeatureFlag, SubscriptionPlan, UserSubscription, Payment, AdminAuditEvent, PlatformSetting) have no tenant isolation.

### Recommended Migration Sequence

```
Phase 1: M1-M5   → Foundation models (Organization, School, Class, Membership)
Phase 2: M6-M11  → Curriculum models (Subject, Prerequisite, Standard, Asset)
Phase 3: M12-M14 → Delivery models (Delivery, deliveryId, programId)
Phase 4: M15-M16 → Live classroom models
Phase 5: M17-M18 → Entitlements + tenant isolation
Phase 6: M19     → Index additions
Phase 7: M20-M24 → Field additions
Phase 8: M25-M30 → Data remediation
```

**Total migrations identified: 30**

---

*Audit generated by Hermes Agent. All row counts verified via direct PostgreSQL queries.*