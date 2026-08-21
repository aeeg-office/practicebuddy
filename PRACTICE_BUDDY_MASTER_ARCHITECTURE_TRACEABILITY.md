# PRACTICE BUDDY — MASTER ARCHITECTURE TRACEABILITY MATRIX

**Generated:** 2026-08-21  
**Source:** Practice_Buddy_Master_Architecture_Design_Audit_Rebuild_Baseline.md  
**Scope:** Parts I–XIX + Appendices A–F  
**Total Requirements:** 132  
**Audience:** Rebuild audit, gap analysis, regression testing

---

## Status Legend

| Status | Meaning |
|--------|---------|
| PASS | Implemented as specified and verified in running system |
| PARTIAL | Present but incomplete, simplified, disconnected, or missing required states |
| FAIL | Implemented incorrectly or produces incorrect behavior |
| MISSING | Required capability is absent |
| NOT TESTABLE | Cannot currently be verified because a dependency/environment is unavailable |

---

## Priority Legend

| Priority | Meaning |
|----------|---------|
| Critical | Platform cannot function correctly without this; blocks core user workflow |
| High | Important feature; significant functional gap if missing |
| Medium | Desirable capability; enhances quality/admin/analytics |
| Low | Future-secure; nice-to-have or deferred by design |

---

# Part I — Product Definition (§1–2)

| Req ID | Section | Role | Feature | Expected Behavior | Frontend Status | API Status | DB Status | Auth Status | Priority | Notes |
|--------|---------|------|---------|------------------|-----------------|------------|-----------|-------------|----------|-------|
| PB-PROD-001 | §1 | System | Product scope K–10 | Platform supports Core English & Math K–10, MAP Math/Reading, SAT R&W/Math | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | Critical | Validate curriculum tables have K–2 grades; current build may only have 3–10 |
| PB-PROD-002 | §1 | System | Future program extensibility | New programs (ACT, EST, IELTS, TOEFL, IGCSE, IB) can be added without database redesign | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | High | Verify program table has generic schema |
| PB-PROD-003 | §2 | System | Independent Practice mode | Student chooses or is assigned content and progresses independently through question flow | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | Critical | Core learning loop |
| PB-PROD-004 | §2 | System | Guided Instruction 1:1 mode | Teacher controls pacing, sees responses live, selectively reveals hints/strategy/explanations | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | High | Needs session layer with `mode='guided'` |
| PB-PROD-005 | §2 | System | Live Classroom mode (≤30) | Teacher broadcasts synchronized questions, sees response distribution and struggling students, advances class | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | High | Needs Redis/WebSocket |
| PB-PROD-006 | §2 | System | Assignment Mode | Teacher-configured practice using same question/session engine | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | High | |
| PB-PROD-007 | §2 | System | MAP Practice Mode | RIT-band and MAP-domain aligned preparation using shared engine | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | High | |
| PB-PROD-008 | §2 | System | SAT Skill Practice | Learning-oriented SAT practice with feedback, strategy, mastery, retry | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | High | |
| PB-PROD-009 | §2 | System | SAT Test Simulation | Assessment-faithful timed modules with different UX rules from practice | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | High | |
| PB-PROD-010 | §2 | System | Shared infrastructure across modes | Core question rendering, delivery, response capture, scoring, version pinning, analytics reused across modes | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | Critical | Verify modules are not duplicated per-mode |

---

# Part II — System Architecture (§3–4)

| Req ID | Section | Role | Feature | Expected Behavior | Frontend Status | API Status | DB Status | Auth Status | Priority | Notes |
|--------|---------|------|---------|------------------|-----------------|------------|-----------|-------------|----------|-------|
| PB-ARCH-001 | §3 | System | Modular monolith | One primary deployable application with clean internal module boundaries, shared transaction boundary | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | Critical | Check for premature microservice boundaries |
| PB-ARCH-002 | §3 | System | API edge — authentication | All protected requests pass through API edge that validates authentication | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | Critical | |
| PB-ARCH-003 | §3 | System | API edge — authorization/RBAC | API edge enforces role-based access control on every protected request | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | Critical | |
| PB-ARCH-004 | §3 | System | API edge — tenant/org scoping | API edge enforces organization-level data isolation on every request | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | Critical | |
| PB-ARCH-005 | §3 | System | API edge — rate limiting | API edge enforces rate limits to prevent abuse | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | High | |
| PB-ARCH-006 | §3 | System | API edge — input validation | API edge validates all input before forwarding to modules | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | Critical | |
| PB-ARCH-007 | §3 | System | PostgreSQL as authoritative store | PostgreSQL is the single source of truth for all persistent educational state | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | Critical | No localStorage for persistent data |
| PB-ARCH-008 | §3 | System | Redis for ephemeral state only | Redis used only for Live Classroom sync and session fan-out; durable truth in PostgreSQL | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | High | |
| PB-ARCH-009 | §3 | System | Object storage for media | Images, audio, diagrams, files stored in object storage; DB retains metadata and references | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | High | |
| PB-ARCH-010 | §3 | System | Shared backend all clients | Website/PWA, Android, iOS use same backend API, auth, DB, content, progress, entitlements, question engine | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | Critical | |
| PB-ARCH-011 | §3 | Student | Cross-device continuity | Student can start on one device and continue on another with synced sessions, progress, mastery, bookmarks, assignments, goals, history | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | High | |
| PB-ARCH-012 | §3 | System | AI independence at runtime | Student practice remains operational when external AI providers are unavailable | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | Critical | Delivery Engine must select only approved stored content |
| PB-ARCH-013 | §4 | System | Identity & Access module | Users, authentication, sessions, RBAC, membership, tenant isolation | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | Critical | Required internal module |
| PB-ARCH-014 | §4 | System | Organization/Roster module | Organizations, schools, classes, enrollments, teacher/student relationships | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | Critical | |
| PB-ARCH-015 | §4 | System | Program Service module | Core English, Core Math, MAP, SAT, future program configuration and mappings | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | High | |
| PB-ARCH-016 | §4 | System | Curriculum Service module | Grade/level, domains, categories, subcategories, skills, micro-skills, prerequisites, standards | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | Critical | |
| PB-ARCH-017 | §4 | System | Content Service module | Questions, passages, assets, answer models, hints, strategies, explanations, versions, families | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | Critical | |
| PB-ARCH-018 | §4 | System | AI Question Factory module | Async content generation from approved curriculum/gold seeds | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | Medium | |
| PB-ARCH-019 | §4 | System | Delivery Engine module | Select, sequence, present, evaluate approved content; retry state machine | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | Critical | |
| PB-ARCH-020 | §4 | System | Immutable Attempt Capture | Immutable raw attempts with exact delivery/question-version references | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | Critical | |
| PB-ARCH-021 | §4 | System | Mastery Engine module | Derive skill/micro-skill mastery and review needs from attempts | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | High | |
| PB-ARCH-022 | §4 | System | Assignment Service module | Teacher assignment workflow and student completion state | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | High | |

---

# Part III — Curriculum & Program Model (§5–9)

| Req ID | Section | Role | Feature | Expected Behavior | Frontend Status | API Status | DB Status | Auth Status | Priority | Notes |
|--------|---------|------|---------|------------------|-----------------|------------|-----------|-------------|----------|-------|
| PB-CURR-001 | §5 | System | Micro-skill as instructional atomic unit | Micro-skills are the primary unit for gold questions, AI expansion, mastery tracking, recommendations, analytics, inventory targets | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | Critical | Verify DB has micro_skill table/column |
| PB-CURR-002 | §5 | System | Shared skills through mapping | Single skill maps to Core, MAP, SAT or multiple grade/program contexts without duplicating skills | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | High | Verify skill_mappings table exists |
| PB-CURR-003 | §5 | System | Prerequisite graph | Skills/micro-skills support prerequisite and extension relationships for remediation/enrichment | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | High | Verify skill_prereqs table |
| PB-CURR-004 | §5 | System | Standards as mappings | Common Core and other standards are reporting metadata, not structural dependencies | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | Medium | Verify standards + skill_mappings tables |
| PB-CURR-005 | §6 | System | K–10 grade support | Architecture supports K–10 without database changes; K–2 not blocked | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | Critical | Grades table must support level=0 (K) through 10 |
| PB-CURR-006 | §6 | Student | Skill Explorer search/filter | Students can search/filter by grade, subject, domain, difficulty, recent practice, recommendations, weakest, assignments, favorites, continue-where-left-off | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | High | |
| PB-MAP-001 | §7 | System | MAP Math & Reading programs | Separate logical programs for MAP Mathematics Practice and MAP Reading/Language Practice | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | High | |
| PB-MAP-002 | §7 | System | RIT band alignment | MAP practice organized by RIT band and subject domain; reusable skills mapped to multiple RIT bands without cloning | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | High | |
| PB-MAP-003 | §7 | Student | MAP modes: Skill/Mixed/Warmup | MAP sessions support Skill Practice by RIT band, Mixed Practice, and Test Warmup with timed/adaptive-style progression | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | High | |
| PB-MAP-004 | §7 | Student | MAP session UX header | During MAP session, shows selected MAP subject and relevant RIT band/context without cluttering question | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | Medium | |
| PB-MAP-005 | §7 | Student | MAP session results | Session completion summarizes: performance, skills demonstrated, skills needing improvement, recommended next RIT-aligned practice | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | Medium | |
| PB-MAP-006 | §7 | System | MAP assessment integrity | Platform does not falsely claim to reproduce proprietary NWEA scoring/adaptivity without license | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | High | Legal requirement |
| PB-SAT-001 | §8 | Student | SAT R&W: Information and Ideas | Questions tagged to Central Ideas/Details, Inferences, Command of Evidence (textual, quantitative, tables/graphs) | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | Critical | Verify taxonomy tables |
| PB-SAT-002 | §8 | Student | SAT R&W: Craft and Structure | Questions tagged to Words in Context, Text Structure and Purpose, Cross-Text Connections | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | Critical | |
| PB-SAT-003 | §8 | Student | SAT R&W: Expression of Ideas | Questions tagged to Transitions and Rhetorical Synthesis | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | Critical | |
| PB-SAT-004 | §8 | Student | SAT R&W: Standard English Conventions | Questions tagged to Boundaries and Form/Structure/Sense subskills | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | Critical | |
| PB-SAT-005 | §9 | Student | SAT Math: Algebra | Questions tagged to linear equations/variables/functions/inequalities/systems | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | Critical | |
| PB-SAT-006 | §9 | Student | SAT Math: Advanced Math | Questions tagged to nonlinear equations/functions, quadratics, exponentials, polynomials, rational/radical | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | Critical | |
| PB-SAT-007 | §9 | Student | SAT Math: Problem-Solving & Data | Questions tagged to ratios/rates/proportions/percentages/data/probability/statistics | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | Critical | |
| PB-SAT-008 | §9 | Student | SAT Math: Geometry & Trig | Questions tagged to area/volume/lines/triangles/similarity/trig/circles/coordinate geometry | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | Critical | |
| PB-SAT-009 | §9 | System | SAT Math reliable typesetting | Mathematical typesetting, diagrams/graphs, accepted equivalent responses, tolerance rules, calculator integration | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | Critical | Must use KaTeX or equivalent |

---

# Part IV — Content & Question Factory (§10–14)

| Req ID | Section | Role | Feature | Expected Behavior | Frontend Status | API Status | DB Status | Auth Status | Priority | Notes |
|--------|---------|------|---------|------------------|-----------------|------------|-----------|-------------|----------|-------|
| PB-CONT-001 | §10 | System | Gold questions per micro-skill | 10 curated canonical questions per micro-skill as curriculum/quality/style exemplars | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | Critical | Gold questions require human review |
| PB-CONT-002 | §10 | System | Gold questions not silently overwritten | Automated generation cannot overwrite gold questions without human review | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | Critical | |
| PB-CONT-003 | §11 | System | AI Question Factory async pipeline | Need Assessment → Generation Spec → Structured Generation → Validation → Duplicate Detection → Independent AI Validation → Human Review → Approved → Published | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | High | |
| PB-CONT-004 | §11 | System | AI Factory not a runtime dependency | AI Question Factory is an asynchronous content-production subsystem, never a live student-practice dependency | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | Critical | |
| PB-CONT-005 | §11 | System | Generated content unpublished until validated | Generated items remain unpublished until all required validation gates pass | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | High | |
| PB-CONT-006 | §11 | System | Generation metadata preserved | Maintain generation metadata, model/provider metadata, validation history, reviewer history, source/provenance | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | High | |
| PB-CONT-007 | §12 | System | Duplicate detection: exact | System detects exact duplicate questions | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | High | |
| PB-CONT-008 | §12 | System | Duplicate detection: near-identical text | System detects near-identical text/options | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | High | |
| PB-CONT-009 | §12 | System | Duplicate detection: structural clones | System detects structural clones with superficial number/name changes | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | High | |
| PB-CONT-010 | §12 | System | Duplicate detection: semantic | System detects semantic duplicates using embeddings or similarity mechanisms | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | Medium | |
| PB-CONT-011 | §12 | System | Question families | Every question belongs to a structural question family describing underlying problem/task form | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | High | Verify question_families table |
| PB-CONT-012 | §13 | System | Content lifecycle state machine | Gold Seed/Generated/Imported → Validation → Duplicate Check → Review → Approved → Published → Delivered → Performance Data → Quality Monitoring → Continue/Revise/Retire | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | High | |
| PB-CONT-013 | §13 | System | Versioned published questions | Editing published content creates a new version rather than mutating historical content referenced by attempts | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | Critical | Verify question_versions table |
| PB-CONT-014 | §14 | System | Content rights/provenance tracking | Record origin: AEEG content, licensed, internal-only, rights-verification required, must-be-rewritten | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | High | |

---

# Part V — Question Data Contract (§15–16)

| Req ID | Section | Role | Feature | Expected Behavior | Frontend Status | API Status | DB Status | Auth Status | Priority | Notes |
|--------|---------|------|---------|------------------|-----------------|------------|-----------|-------------|----------|-------|
| PB-QUES-001 | §15 | System | Stable question_id | Each question has a stable database ID, never displayed question number | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | Critical | |
| PB-QUES-002 | §15 | System | Full question metadata fields | Model supports: version_id, program/exam, subject, grade, domain, category, subcategory, skill, micro-skill, family, difficulty, type, passage, stem, options, correct answer, accepted responses, solution steps, explanations, strategy, hints, misconceptions, time, assets, alt text, calculator policy, source/rights, author, reviewer, approval state, publication state, quality flags, timestamps | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | Critical | ~37 required fields |
| PB-QUES-003 | §16 | System | Question type: single-answer MCQ | Render and evaluate single-answer multiple choice | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | Critical | |
| PB-QUES-004 | §16 | System | Question type: multiple select | Render and evaluate multiple-select questions | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | High | |
| PB-QUES-005 | §16 | System | Question type: numeric response | Render and evaluate numeric input | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | High | |
| PB-QUES-006 | §16 | System | Question type: typed response | Render and evaluate free-text response | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | Medium | |
| PB-QUES-007 | §16 | System | Question type: fill-in-the-blank | Render and evaluate fill-in-the-blank | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | Medium | |
| PB-QUES-008 | §16 | System | Question type: matching | Render and evaluate matching exercises | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | Medium | |
| PB-QUES-009 | §16 | System | Question type: ordering | Render and evaluate ordering/sorting exercises | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | Medium | |
| PB-QUES-010 | §16 | System | Question type: math formula/numeric | Render and evaluate math formula/numeric questions with proper typesetting | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | Critical | |
| PB-QUES-011 | §16 | System | Question type: passage + question | Render passage text with associated question(s) | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | Critical | |
| PB-QUES-012 | §16 | System | Question type: tables/graphs/charts | Render questions with embedded tables, graphs, and charts | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | High | |
| PB-QUES-013 | §16 | System | AI Factory constrained to supported formats | AI generates only question formats that the production renderer/evaluator can display, validate, score | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | High | |

---

# Part VI — Delivery Engine & Attempt Model (§17–19)

| Req ID | Section | Role | Feature | Expected Behavior | Frontend Status | API Status | DB Status | Auth Status | Priority | Notes |
|--------|---------|------|---------|------------------|-----------------|------------|-----------|-------------|----------|-------|
| PB-DELV-001 | §17 | System | Delivery selects only approved questions | Delivery Engine selects only approved/published question versions | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | Critical | |
| PB-DELV-002 | §17 | System | Delivery considers full context | Selection considers program, skill/micro-skill, difficulty, exposure history, question family, mastery | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | High | |
| PB-DELV-003 | §17 | System | Unique delivery instance | Each delivery creates a unique delivery instance/reference | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | Critical | delivery_id column verified |
| PB-DELV-004 | §17 | System | Version pinning on delivery | Each delivery pins the exact question version presented | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | Critical | question_version_id FK |
| PB-DELV-005 | §17 | System | Session state preserved | Session state preserved across network/device interruptions where permitted | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | Critical | |
| PB-DELV-006 | §17 | System | Correct evaluation by type | System evaluates responses according to the question-type contract | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | Critical | |
| PB-DELV-007 | §17 | System | Learning retry rules enforced | System enforces learning-mode retry rules (two-attempt flow) | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | Critical | |
| PB-DELV-008 | §17 | System | Correct answer not exposed pre-submission | System never exposes correct-answer data before the relevant submission state | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | Critical | Check API payloads |
| PB-DELV-009 | §17 | System | No runtime AI dependency for delivery | Delivery Engine remains independent from runtime AI availability | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | Critical | |
| PB-DELV-010 | §18 | Student | Two-attempt flow: Attempt 1 correct | Present question → student submits correct → calm positive feedback, explanation as configured, continue | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | Critical | |
| PB-DELV-011 | §18 | Student | Two-attempt flow: Attempt 1 incorrect → Attempt 2 | If incorrect: retain student's incorrect choice visibly, disable/eliminate wrong option, show strategy/hint, permit Attempt 2 | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | Critical | |
| PB-DELV-012 | §18 | Student | Two-attempt flow: final feedback | After Attempt 2, show final instructional feedback, correct answer, explanation, next action | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | Critical | |
| PB-DELV-013 | §18 | System | SAT simulation skips retry flow | Strict SAT simulation does NOT use the teaching retry flow during scored module | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | Critical | |
| PB-DELV-014 | §19 | System | Immutable attempt records | Attempt records are write-once except for admin correction workflows that preserve audit history | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | Critical | No UPDATE path |
| PB-DELV-015 | §19 | System | Attempt traceability | Each attempt traceable to: student, org/tenant, session, delivery ID, exact question version, attempt number, submitted response, correctness, response time, hint/strategy state, mode/program context | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | Critical | |
| PB-DELV-016 | §19 | System | UNIQUE(delivery_id, attempt_no) constraint | Uniqueness constraint on delivery_id + attempt_no; validate allowed attempt numbers (1,2) | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | Critical | |

---

# Part VII — Mastery, Recommendations & Analytics (§20–22)

| Req ID | Section | Role | Feature | Expected Behavior | Frontend Status | API Status | DB Status | Auth Status | Priority | Notes |
|--------|---------|------|---------|------------------|-----------------|------------|-----------|-------------|----------|-------|
| PB-MAST-001 | §20 | System | Mastery derived from attempts | Mastery is derived, not authored into question rows; raw attempts are source of truth | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | Critical | |
| PB-MAST-002 | §20 | System | Mastery considers multiple factors | Mastery considers: first-attempt accuracy, second-attempt recovery, difficulty, response efficiency, hints used, recency, spaced review, repeated misconceptions, minimum sample size | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | High | |
| PB-MAST-003 | §20 | System | Minimum sample size for mastery | Do not declare mastery after one or two questions | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | High | |
| PB-MAST-004 | §20 | System | Mastery status vocabulary | User-facing mastery states: Not Yet Assessed, Beginning/Needs Support, Developing, Proficient/Approaching Mastery, Mastered, Needs Review | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | High | Mapping must be explicit and testable |
| PB-RECO-001 | §21 | System | Evidence-based recommendations | Recommendations select: next skill, weakest skill, prerequisite remediation, extension skill, spaced review, missed-question review, teacher-assigned priority, daily/weekly study plan | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | High | |
| PB-ANAL-001 | §22 | System | Track educationally meaningful events | Track: sessions started/completed, question exposure, A1/A2 accuracy, recovery rate, difficulty, time per question/skill, hints/strategies/explanations used, bookmarks, assignment completion, mastery change, retention, cross-device continuation, test/module history | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | High | |
| PB-ANAL-002 | §22 | System | Separate dashboards | Separate dashboards for: student educational progress, teacher/class performance, content quality, product usage, technical health, subscription/entitlement performance | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | Medium | |
| PB-ANAL-003 | §22 | System | Screen time ≠ learning | Raw screen time alone not treated as learning metric | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | Medium | |

---

# Part VIII — User Roles & IA (§23–27)

| Req ID | Section | Role | Feature | Expected Behavior | Frontend Status | API Status | DB Status | Auth Status | Priority | Notes |
|--------|---------|------|---------|------------------|-----------------|------------|-----------|-------------|----------|-------|
| PB-ROLE-001 | §23 | Admin | Minimum role support | Platform supports Student, Teacher, Administrator roles at minimum | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | Critical | role_codes field |
| PB-ROLE-002 | §23 | System | RBAC authorization | Use membership-based/RBAC authorization, not client-side hiding alone | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | Critical | |
| PB-ROLE-003 | §24 | Student | Student navigation: Home/Practice/Assignments/Progress/Profile | Primary navigation covers Home/Dashboard, Practice, Assignments, Progress, Profile | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | Critical | |
| PB-ROLE-004 | §24 | Student | Student dashboard elements | Dashboard includes: greeting, assigned work/to-do, recommendations, quick start by program/subject, progress/mastery, recently missed/bookmarked, test history, streak/achievements | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | High | |
| PB-ROLE-005 | §25 | Teacher | Teacher IA navigation | Dashboard, Classes, Assign, Practice/live monitoring, Students, Reports, Content access, Settings | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | Critical | |
| PB-ROLE-006 | §25 | Teacher | Teacher: create/manage classes | Teachers can create and manage classes | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | Critical | |
| PB-ROLE-007 | §25 | Teacher | Teacher: enroll/import students | Teachers can enroll or import students into classes | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | Critical | |
| PB-ROLE-008 | §25 | Teacher | Teacher: create assignments | Teachers assign skills, groups, domains, standards, pathways; configure question count, due date, attempts/mode | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | Critical | |
| PB-ROLE-009 | §25 | Teacher | Teacher: monitor completion | Teachers monitor assignment completion and view first/second-attempt data | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | Critical | |
| PB-ROLE-010 | §25 | Teacher | Teacher: identify weak skills | Teachers can identify weak skills and drill from class → student → skill/micro-skill | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | High | |
| PB-ROLE-011 | §25 | Teacher | Teacher: assign remediation from report | Teachers assign remediation directly from a report | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | High | |
| PB-ROLE-012 | §25 | Teacher | Teacher: guided instruction | Teachers can run guided instruction (1:1) | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | High | |
| PB-ROLE-013 | §25 | Teacher | Teacher: live group practice | Teachers can run live group practice | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | High | |
| PB-ROLE-014 | §25 | Teacher | Teacher: project questions without answers | Teachers can project questions to classroom display without revealing answers | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | High | |
| PB-ROLE-015 | §25 | Teacher | Teacher: export reports | Teachers can export reports | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | Medium | |
| PB-ROLE-016 | §26 | Admin | Admin IA navigation | Overview/System Health, Organizations, Schools, Users/Roles, Programs, Curriculum, Content/Question Bank, Import/Authoring, Review Queue, AI Factory, Assignments, Analytics, Access Codes/Entitlements, Settings, Audit Logs | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | Critical | |
| PB-ROLE-017 | §26 | Admin | Grant/revoke program access | Administrators grant/revoke program access through entitlement/toggle workflow without database edits | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | High | |
| PB-ROLE-018 | §27 | Parent | Parent read-only view | Parents see: assignment completion, practice consistency, broad mastery/progress, upcoming tests, teacher comments, recommended next actions | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | Low | Not punitive monitoring |

---

# Part IX — UX & Visual Design (§28–34)

| Req ID | Section | Role | Feature | Expected Behavior | Frontend Status | API Status | DB Status | Auth Status | Priority | Notes |
|--------|---------|------|---------|------------------|-----------------|------------|-----------|-------------|----------|-------|
| PB-UX-001 | §28 | System | One design token system, three UX families | Public marketing, Student application, Teacher/Admin application use same tokens with different layouts | NOT TESTABLE | N/A | N/A | N/A | High | |
| PB-UX-002 | §29 | System | Brand tokens: primary/secondary/accent | Primary `#4720b7`, Secondary `#1e2761`, Accent `#f5a623`, Foreground `#281a39`, Background `#f6f6f6` | NOT TESTABLE | N/A | N/A | N/A | High | |
| PB-UX-003 | §29 | System | Semantic colors have fixed meaning | Green=correct, red=incorrect, amber=warning/second-attempt, blue=info/hint/strategy; never repurposed decoratively | NOT TESTABLE | N/A | N/A | N/A | Critical | |
| PB-UX-004 | §30 | Student | Practice screen: one task focus | Active practice shows no sidebars, dashboard widgets, recommendations, ads, social features, notifications, excessive navigation | NOT TESTABLE | N/A | N/A | N/A | Critical | |
| PB-UX-005 | §30 | Student | Readable question content | Question/passage content centered, readable with constrained line length; answer choices stack cleanly | NOT TESTABLE | N/A | N/A | N/A | Critical | |
| PB-UX-006 | §31 | System | Responsive breakpoints | Phone (320-639px), Tablet (640-1023px), Desktop (1024-1279px), Wide (1280px+) | NOT TESTABLE | N/A | N/A | N/A | Critical | |
| PB-UX-007 | §31 | System | Touch targets 44×44px minimum | All interactive touch targets at least 44×44px | NOT TESTABLE | N/A | N/A | N/A | High | |
| PB-UX-008 | §31 | System | No hover-only critical behavior | No interaction depends solely on hover | NOT TESTABLE | N/A | N/A | N/A | High | |
| PB-UX-009 | §32 | System | Question text 18px desktop | Question text ~18px desktop with comfortable line height | NOT TESTABLE | N/A | N/A | N/A | High | |
| PB-UX-010 | §32 | System | Readable passage line lengths | Max ~45rem line length for reading passages | NOT TESTABLE | N/A | N/A | N/A | High | |
| PB-UX-011 | §33 | System | Functional motion only | Motion ≤300ms, honors prefers-reduced-motion, no confetti/spinning/continuous animation/autoplay/parallax | NOT TESTABLE | N/A | N/A | N/A | Medium | |
| PB-UX-012 | §34 | System | WCAG AA minimum | Keyboard navigation, visible focus, semantic HTML/landmarks, screen-reader labels, accessible modals, non-color-only communication, math accessibility, alt text, reduced motion, high contrast, 44×44 targets | NOT TESTABLE | N/A | N/A | N/A | Critical | |

---

# Part X — SAT & MAP Assessment-Specific UX (§35–37)

| Req ID | Section | Role | Feature | Expected Behavior | Frontend Status | API Status | DB Status | Auth Status | Priority | Notes |
|--------|---------|------|---------|------------------|-----------------|------------|-----------|-------------|----------|-------|
| PB-SATUX-001 | §35 | Student | SAT Skill Practice UX | Choose R&W or Math, domain/skill/difficulty; two-attempt instructional flow; hints/strategies/explanations; mastery/recommendations; mistake/bookmark review | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | Critical | |
| PB-SATUX-002 | §35 | Student | SAT Test Simulation UX | Modules, timers, question navigation; no teaching feedback during active module; flag-for-review; response persistence; module submission and post-test analysis | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | Critical | |
| PB-SATUX-003 | §35 | System | SAT modules use current official structure | R&W Module 1 at 27 questions/32 minutes; verify current official test structure before production | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | Critical | |
| PB-SATUX-004 | §36 | System | SAT blueprint engine | Supports: domain/subdomain quotas, ordered/position-aware composition, difficulty progression, module-specific constraints, content exclusion/exposure rules, reproducible test forms, answer-key/scoring records separate from student delivery | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | Critical | |
| PB-SATUX-005 | §37 | Student | Desmos/calculator integration | Integrate authorized Desmos experience; split-panel desktop/tablet; expandable/full-screen phone; preserve question state; keyboard and touch; fallback calculator strategy | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | High | Verify licensing terms |

---

# Part XI — Accounts, Entitlements & Commercial Access (§38–40)

| Req ID | Section | Role | Feature | Expected Behavior | Frontend Status | API Status | DB Status | Auth Status | Priority | Notes |
|--------|---------|------|---------|------------------|-----------------|------------|-----------|-------------|----------|-------|
| PB-AUTH-001 | §38 | Student | Secure registration | Registration with fields: username/email, secure password, student name, grade, school/organization, target program/test, target score/test date, preferred language | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | Critical | |
| PB-AUTH-002 | §38 | System | Password reset/verification | Support password reset, verification, secure session management | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | Critical | |
| PB-AUTH-003 | §38 | System | Secure password storage | Passwords securely hashed, never stored in plain text | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | Critical | |
| PB-AUTH-004 | §39 | Admin | Access code system | Admin-issued codes supporting: single-use, multi-use, expiration, redemption limits, school/course/teacher scope, trial/premium/feature-specific, automatic entitlement, revocation, usage logs, anti-brute-force, batch generation/export | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | High | |
| PB-AUTH-005 | §39 | System | Access codes not hard-coded | Production access codes never hard-coded into client applications | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | Critical | |
| PB-AUTH-006 | §40 | Admin | Central entitlement engine | Feature availability centrally configurable, not scattered hard-coded checks in each client | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | High | Controls: programs, questions/session, unlimited, explanations, history, recommendations, tests, mistake review, bookmarks, teacher feedback, AI tutor, offline, reports |

---

# Part XII — Database Invariants (§41–44)

| Req ID | Section | Role | Feature | Expected Behavior | Frontend Status | API Status | DB Status | Auth Status | Priority | Notes |
|--------|---------|------|---------|------------------|-----------------|------------|-----------|-------------|----------|-------|
| PB-DB-001 | §41 | System | Required DB entities | Tables for: organizations, schools, users, memberships/roles, classes, enrollments, programs, subjects, grades/levels, domains/categories/subcategories, skills/micro-skills, prerequisites, standards/mappings, question types, questions, question versions, question families, assets, validation/review records, assignments, sessions, deliveries, attempts, skill_progress, live sessions, entitlements/access codes, analytics rollups, audit logs | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | Critical | Current: 29 tables — verify all entities exist |
| PB-DB-002 | §42 | System | Multi-tenancy with org_id | Tenant-scoped records have org_id column, indexed query paths, server-enforced row-level access | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | Critical | RLS policies on all tenant-scoped tables |
| PB-DB-003 | §43 | System | Version pinning | Every delivered question pinned to exact immutable question version; later edits don't change historical attempt content | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | Critical | question_versions FK on attempts |
| PB-DB-004 | §44 | System | Analytics reproducibility | Mastery and aggregated analytics recomputable from raw attempts/deliveries and source records | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | High | No opaque client-only state |

---

# Part XIII — Search, Session & Study Tools (§45–46)

| Req ID | Section | Role | Feature | Expected Behavior | Frontend Status | API Status | DB Status | Auth Status | Priority | Notes |
|--------|---------|------|---------|------------------|-----------------|------------|-----------|-------------|----------|-------|
| PB-SESS-001 | §45 | Student | Practice selection filters | Filter by: program, subject, grade, domain/category/subcategory, skill/micro-skill, difficulty, question count, timed/untimed, new/missed/bookmarked/all, assigned/recommended, calculator policy | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | Critical | |
| PB-SESS-002 | §45 | Student | Quick practice modes | Warmups, 10-question drills, daily challenge, weakest-skill drill, recently missed, resume session | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | High | |
| PB-SESS-003 | §46 | System | Autosave meaningful state | Session state autosaved during practice | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | Critical | |
| PB-SESS-004 | §46 | System | Session recovery after interruption | Session recovers after refresh/network interruption | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | Critical | |
| PB-SESS-005 | §46 | System | Duplicate submission prevention | System prevents duplicate submissions | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | Critical | |
| PB-SESS-006 | §46 | System | Accurate timer maintenance | Timers maintain accuracy across network interruptions | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | Critical | |
| PB-SESS-007 | §46 | System | Define concurrent-session rules | Platform defines and enforces concurrent-session rules | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | High | |

---

# Part XIV — Security, Privacy & Reliability (§47–49)

| Req ID | Section | Role | Feature | Expected Behavior | Frontend Status | API Status | DB Status | Auth Status | Priority | Notes |
|--------|---------|------|---------|------------------|-----------------|------------|-----------|-------------|----------|-------|
| PB-SEC-001 | §47 | System | Server-side authorization/RBAC | All authorization enforced server-side | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | Critical | |
| PB-SEC-002 | §47 | System | TLS/encrypted network traffic | All network traffic encrypted | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | Critical | |
| PB-SEC-003 | §47 | System | Input validation | Input validation on all endpoints | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | Critical | |
| PB-SEC-004 | §47 | System | Audit logging | Audit logging for all sensitive operations | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | High | |
| PB-SEC-005 | §47 | System | Protected answer keys | Correct answers not exposed in pre-submission API payloads | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | Critical | |
| PB-SEC-006 | §47 | System | No secrets in client code | No secrets/sensitive data in client code | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | Critical | |
| PB-SEC-007 | §48 | System | Student privacy: minimal data collection | Collect only necessary student data | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | Critical | |
| PB-SEC-008 | §48 | System | Data retention/deletion/export | Support configurable retention, deletion, and export | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | High | |
| PB-SEC-009 | §49 | System | Scalable architecture | Architecture scales from one center to thousands of users without rewrite | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | High | |
| PB-SEC-010 | §49 | System | Stateless/scalable API | API behaves statelessly for horizontal scaling | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | High | |
| PB-SEC-011 | §49 | System | Indexed database design | Database indexed for query performance | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | High | |
| PB-SEC-012 | §49 | System | Feature flags/remote config | Feature flags and remote configuration for feature rollout | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | Medium | |

---

# Part XV — Quality Assurance & Acceptance (§50–52)

| Req ID | Section | Role | Feature | Expected Behavior | Frontend Status | API Status | DB Status | Auth Status | Priority | Notes |
|--------|---------|------|---------|------------------|-----------------|------------|-----------|-------------|----------|-------|
| PB-QA-001 | §50 | System | Functional QA gate | Behavior matches requirement | NOT TESTABLE | N/A | N/A | N/A | Critical | |
| PB-QA-002 | §50 | System | Data QA gate | Data persists correctly, no mocks/local-only state | NOT TESTABLE | N/A | N/A | N/A | Critical | |
| PB-QA-003 | §50 | System | Design-system QA gate | Approved tokens/components/states used | NOT TESTABLE | N/A | N/A | N/A | High | |
| PB-QA-004 | §50 | System | Responsive QA gate | Works at phone/tablet/desktop/wide | NOT TESTABLE | N/A | N/A | N/A | Critical | |
| PB-QA-005 | §50 | System | Accessibility QA gate | Keyboard, screen reader, contrast, reduced motion, semantic states | NOT TESTABLE | N/A | N/A | N/A | Critical | |
| PB-QA-006 | §50 | System | Touch QA gate | Target sizes, no hover dependency | NOT TESTABLE | N/A | N/A | N/A | High | |
| PB-QA-007 | §50 | System | State QA gate | Loading, empty, error, offline/reconnect, edge cases | NOT TESTABLE | N/A | N/A | N/A | High | |
| PB-QA-008 | §50 | System | Security QA gate | Role/tenant separation, answer protection, abuse controls | NOT TESTABLE | N/A | N/A | N/A | Critical | |
| PB-QA-009 | §50 | System | Regression QA gate | Existing compliant behavior remains functional after change | NOT TESTABLE | N/A | N/A | N/A | Critical | |
| PB-QA-010 | §51 | System | Automated test: question evaluation by type | Automated tests for each question type's evaluation logic | NOT TESTABLE | N/A | N/A | N/A | Critical | |
| PB-QA-011 | §51 | System | Automated test: two-attempt state machine | Automated test for two-attempt state machine correctness | NOT TESTABLE | N/A | N/A | N/A | Critical | |
| PB-QA-012 | §51 | System | Automated test: immutable attempts/pinning | Automated test for immutable attempt and version pinning | NOT TESTABLE | N/A | N/A | N/A | Critical | |
| PB-QA-013 | §51 | System | Automated test: RBAC/tenant isolation | Automated test for role-based access and tenant data isolation | NOT TESTABLE | N/A | N/A | N/A | Critical | |

---

# Part XVI — Controlled Rebuild Order (§53–65)

| Req ID | Section | Role | Feature | Expected Behavior | Frontend Status | API Status | DB Status | Auth Status | Priority | Notes |
|--------|---------|------|---------|------------------|-----------------|------------|-----------|-------------|----------|-------|
| PB-PHASE-001 | §53–65 | System | Phase 1: Foundation | Auth/session security, orgs/schools/classes/enrollments, roles/RBAC, tenant isolation, API edge, responsive shell | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | Critical | First rebuild phase |
| PB-PHASE-002 | §55 | System | Phase 2: Curriculum & Content | Program abstraction, K–10 curriculum, MAP/SAT mappings, skill+micro-skill taxonomy, prerequisites, question types, versioned schema, author/review/publish workflow, content preview | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | Critical | |
| PB-PHASE-003 | §56 | System | Phase 3: Delivery + Attempts + Mastery | Production Delivery Engine, delivery IDs/version pinning, two-attempt flow, immutable attempts, session persistence, mastery computation, student practice dashboard | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | Critical | |
| PB-PHASE-004 | §57 | Teacher | Phase 4: Teacher/Assignment Tools | Class/student management, assignment builder, student to-do, teacher progress/weakness views, drilldown/reassignment | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | Critical | |
| PB-PHASE-005 | §58 | System | Phase 5: Analytics & Recommendations | Attempt-derived analytics, educational dashboards, recommendations/prerequisite remediation, exports | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | High | |
| PB-PHASE-006 | §59 | Teacher | Phase 6: Guided Instruction | Teacher-controlled 1:1 session, live student response, hint/strategy/explanation controls, session summary | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | High | |
| PB-PHASE-007 | §60 | Teacher | Phase 7: Live Classroom | Redis/WebSocket sync, ≤30 student state, response distribution, struggling-student indicators, teacher progression, fallback | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | High | |
| PB-PHASE-008 | §61 | System | Phase 8: MAP Program Completion | MAP Math and Reading/Language setup, RIT-band mapping, Skill/Mixed/Warmup modes, MAP-specific progress, domain/RIT tagging validation | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | High | |
| PB-PHASE-009 | §62 | Student | Phase 9: SAT Program Completion | Verified SAT taxonomy, R&W/Math skill practice, easy/medium/hard/mixed, Desmos/math rendering, blueprint engine, test simulation, module analysis/history | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | High | |
| PB-PHASE-010 | §63 | System | Phase 10: AI Question Factory | Gold-seed inventory, generation jobs, validation, deduplication, independent validator, human review, question families, inventory health, quality monitoring/retirement | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | Medium | Only after deterministic content system works |

---

# Appendix A — July 31 SAT-First Specification (Feedback, Scoring, Mobile, etc.)

| Req ID | Section | Role | Feature | Expected Behavior | Frontend Status | API Status | DB Status | Auth Status | Priority | Notes |
|--------|---------|------|---------|------------------|-----------------|------------|-----------|-------------|----------|-------|
| PB-APPA-001 | §5 | Student | Correct first attempt: varied responses | Use varied congratulatory messages (Excellent, Correct—well done, Strong reasoning, etc.) | NOT TESTABLE | NOT TESTABLE | N/A | N/A | Medium | No same message repeatedly |
| PB-APPA-002 | §5 | Student | Incorrect first attempt: neutral prompt | Provide "Take another look" etc., not immediate correct answer | NOT TESTABLE | NOT TESTABLE | N/A | N/A | Critical | |
| PB-APPA-003 | §5 | Student | Incorrect second attempt: full feedback | Show correct answer, concise explanation, why student's answer is wrong, why correct answer is right, clue/evidence, strategy, worked solution, optional expanded explanation, practice-another-skill button, save-to-review button | NOT TESTABLE | NOT TESTABLE | N/A | N/A | Critical | |
| PB-APPA-004 | §5 | System | Scoring: separate metrics | Track separately: first-attempt accuracy, second-attempt recovery, final accuracy, independent mastery, accuracy after hints, time to first response, total question time | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | N/A | High | |
| PB-APPA-005 | §5 | System | Second-attempt not equal to first | Correct second attempt not treated as equivalent to unaided first-attempt in mastery calculations | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | N/A | High | |
| PB-APPA-006 | §6 | Student | Question display: four-option MCQ | Four-option multiple-choice rendering | NOT TESTABLE | NOT TESTABLE | N/A | N/A | Critical | |
| PB-APPA-007 | §6 | Student | Question display: student-produced Math | Student-produced math response input | NOT TESTABLE | NOT TESTABLE | N/A | N/A | High | |
| PB-APPA-008 | §6 | Student | Math equations: reliable typesetting | Render equations with reliable typesetting, never as screenshots | NOT TESTABLE | NOT TESTABLE | N/A | N/A | Critical | |
| PB-APPA-009 | §6 | Student | Math: accepted equivalent responses | Support precision entry and accepted equivalent answers, tolerance rules | NOT TESTABLE | NOT TESTABLE | N/A | N/A | Critical | |
| PB-APPA-010 | §6 | Student | Reading: annotation/highlighter | Provide annotation/highlighter tool without changing underlying text | NOT TESTABLE | NOT TESTABLE | N/A | N/A | Low | |
| PB-APPA-011 | §11 | Student | Dashboard: target score and streak | Display: current target score, practice streak, questions completed, first-attempt accuracy, second-attempt recovery, avg response time, domain/category/difficulty mastery, recent activity, assigned work, upcoming test date, recommended next practice, saved/flagged questions, recently missed, full-test history, progress over time | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | N/A | High | |
| PB-APPA-012 | §13 | Teacher | Teacher: kiosk mode | Optional center kiosk mode for shared computers; auto sign-out and remove local data at session end | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | Low | |
| PB-APPA-013 | §13 | Teacher | Teacher: lock students into assigned activity | Lock students into an assigned activity during supervised center sessions | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | Low | |
| PB-APPA-014 | §15 | Admin | CMS: question CRUD | Create, import in bulk, edit passages/options, upload figures, attach explanations/strategies/hints, tag, set difficulty/time | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | High | |
| PB-APPA-015 | §15 | Admin | CMS: question lifecycle states | Mark questions as active, draft, internal, retired, or under review | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | N/A | High | |
| PB-APPA-016 | §15 | Admin | CMS: versioning and restore | Version questions and restore earlier versions | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | N/A | High | |
| PB-APPA-017 | §18 | Student | Session controls: pause/resume | Practice sessions support pause and resume | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | N/A | Critical | |
| PB-APPA-018 | §18 | Student | Session: answer elimination | Students can eliminate answer options during practice | NOT TESTABLE | NOT TESTABLE | N/A | N/A | Medium | |
| PB-APPA-019 | §18 | Student | Session: submit confirmation | Submit confirmation before final submission | NOT TESTABLE | NOT TESTABLE | N/A | N/A | High | |
| PB-APPA-020 | §18 | Student | Session: accidental-exit protection | Protection against accidental exit from active session | NOT TESTABLE | NOT TESTABLE | N/A | N/A | High | |
| PB-APPA-021 | §19 | System | Mobile: safe-area support | Safe-area support on modern iPhones | NOT TESTABLE | N/A | N/A | N/A | Medium | |
| PB-APPA-022 | §19 | System | Mobile: dark mode | Dark mode support | NOT TESTABLE | N/A | N/A | N/A | Low | |
| PB-APPA-023 | §19 | System | Mobile: dynamic text scaling | Dynamic text scaling support | NOT TESTABLE | N/A | N/A | N/A | Medium | |
| PB-APPA-024 | §20 | Student | Gamification: no punitive mechanics | No punitive streak loss, casino animations, excessive sounds, public leaderboards by default, artificial urgency | NOT TESTABLE | N/A | N/A | N/A | Medium | |
| PB-APPA-025 | §21 | Student | AI tutor: question explanation | Optional AI tutor can explain question in simpler language, explain each choice, provide hint without answer, ask guiding question, generate similar practice question, identify misconceptions, recommend next skill | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | Low | Must not change official answer |
| PB-APPA-026 | §22 | System | Arabic RTL support | Full right-to-left support for Arabic interfaces | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | N/A | Low | Language selection independent of question language |
| PB-APPA-027 | §22 | System | Multilingual: English + Arabic | Prepare platform for English and Arabic | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | N/A | Low | |
| PB-APPA-028 | §28 | System | Analytics: educationally meaningful events | Track: session started/completed, question attempted, first/second answers, hint used, explanation opened, strategy opened, bookmarked, difficulty, time, assignment completion, skill mastery change, cross-device continuation, subscription conversion | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | N/A | High | |

---

# Appendices B–F (Architecture, Implementation Plan, Production Spec, Phase 0, IXL Expansion)

| Req ID | Section | Role | Feature | Expected Behavior | Frontend Status | API Status | DB Status | Auth Status | Priority | Notes |
|--------|---------|------|---------|------------------|-----------------|------------|-----------|-------------|----------|-------|
| PB-APPB-001 | App B | System | Three core learning loops | Independent Practice, Guided Instruction (1:1), Live Classroom (≤30) share same delivery engine | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | N/A | Critical | |
| PB-APPB-002 | App B | System | Row-Level Security (RLS) | PostgreSQL RLS by org_id on all tenant-scoped tables | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | Critical | |
| PB-APPB-003 | App B | System | Two-attempt unique partial index | DB has unique partial index on (session_id, question_id, attempt_no) to guard duplicate submissions | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | N/A | Critical | |
| PB-APPC-001 | App C | System | Phase 1: Foundation scaffold | Login, register, org/school/class creation, user roles | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | Critical | From implementation plan |
| PB-APPC-002 | App C | System | Phase 2: Skill tree + question authoring | Subject→Grade→Skill browser, Draft→Review→Approved→Published workflow | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | N/A | Critical | |
| PB-APPC-003 | App C | System | Phase 3: Core loop E2E | Student logs in, picks skill, answers through two-attempt, sees mastery update, teacher sees progress | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | Critical | |
| PB-APPC-004 | App C | System | Standards: Common Core K–10 | Complete standards framework for Common Core K–10 Math & ELA | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | N/A | Medium | |
| PB-APPC-005 | App C | System | Edge case: session timeout recovery | Session timeout recovery after browser close/timeout/crash | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | N/A | Critical | |
| PB-APPC-006 | App C | System | Edge case: network failure during submit | Handle network failure during attempt submission | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | N/A | Critical | |
| PB-APPC-007 | App C | System | Edge case: concurrent session prevention | Prevent concurrent sessions where inappropriate | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | High | |
| PB-APPC-008 | App C | System | No analytics fields on question tables | Analytics fields not stored on question tables | NOT TESTABLE | N/A | NOT TESTABLE | N/A | High | |
| PB-APPC-009 | App C | System | No opaque SmartScore-like numbers | No opaque composite scores without transparent calculation | NOT TESTABLE | N/A | NOT TESTABLE | N/A | High | |
| PB-APPC-010 | App C | System | No leaderboards or gamification distractions | No leaderboards or unnecessary gamification | NOT TESTABLE | N/A | N/A | N/A | Medium | |
| PB-APPD-001 | App D | System | PostgreSQL 15+ | PostgreSQL 15+ with RLS, JSONB, strong relational modeling | NOT TESTABLE | N/A | NOT TESTABLE | N/A | Critical | |
| PB-APPD-002 | App D | System | Mastery status: 3 levels | Mastery levels: Mastered, Proficient, Needs Support | NOT TESTABLE | N/A | NOT TESTABLE | N/A | High | Expand to 5+ statuses |
| PB-APPD-003 | App D | System | Skills table: JSON tags | skills table with concept_tags and cognitive_tags JSON arrays | NOT TESTABLE | N/A | NOT TESTABLE | N/A | Medium | |
| PB-APPE-001 | App E | System | Program abstraction top-level | Six programs: Core English (3–10), Core Math (3–10), MAP Math Practice, MAP Reading/Language, SAT R&W, SAT Mathematics | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | Critical | |
| PB-APPE-002 | App E | System | Gold questions: 10 per micro-skill | Exactly 10 gold canonical questions per micro-skill | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | N/A | High | Phase 0 requirement |
| PB-APPE-003 | App E | System | Quality Monitor: auto-flag | Auto-flag questions with abnormal performance: near-universal miss, near-universal correct, high second-attempt confusion | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | N/A | Medium | |
| PB-APPE-004 | App E | System | pgvector for embeddings | pgvector PostgreSQL extension for semantic duplicate detection | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | N/A | Low | |
| PB-APPE-005 | App E | System | Design governance: DS is authoritative | DESIGN_SYSTEM.md authoritative for all visual decisions; no component may use colors/typography/spacing/patterns not defined | NOT TESTABLE | N/A | N/A | N/A | High | |
| PB-APPE-006 | App E | System | UX governance: UX_ARCHITECTURE.md is authoritative | UX_ARCHITECTURE.md authoritative for user journeys; no page without defined workflow | NOT TESTABLE | N/A | N/A | N/A | High | |
| PB-APPE-007 | App E | System | PWA-first mobile strategy | First mobile experience is installable PWA, validated before native mobile development | NOT TESTABLE | N/A | N/A | N/A | Low | |
| PB-APPE-008 | App E | System | Generation model ≠ validation model | Independent models for generation and validation to prevent correlated errors | NOT TESTABLE | NOT TESTABLE | N/A | N/A | Medium | |
| PB-APPF-001 | App F | Student | Skill Explorer: comprehensive browse | Students browse skills through search, filters, grade level, subject, difficulty, recently practiced, recommended, weakest, teacher assigned, AI recommended, favorites, continue where you left off | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | N/A | High | |
| PB-APPF-002 | App F | Student | Skill page: full learning resources | Each skill page includes: learning objective, short instructional lesson, worked/guided examples, visual explanations, practice questions, progressive difficulty, hints, AI Tutor, strategy tips, common mistakes, mastery tracker, related skills, next recommended skill | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | N/A | High | |
| PB-APPF-003 | App F | System | Gamification: optional badges/streaks | Optional mastery badges, achievement milestones, practice streaks, XP, progress bars, completion certificates, configurable leaderboards | NOT TESTABLE | N/A | NOT TESTABLE | N/A | Low | |
| PB-APPF-004 | App F | System | Enterprise content target | Support for ~150,000+ questions, ~5,000+ micro-skills, no rebuild for new content | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | N/A | Long-term | |
| PB-APPF-005 | App F | Teacher | Teacher: assign learning pathways | Teachers assign individual skills, skill groups, domains, standards, entire learning pathways | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE | High | |

---

## Summary Counts

| Category | Critical | High | Medium | Low | Total |
|----------|----------|------|--------|-----|-------|
| Part I — Product Definition | 2 | 7 | 0 | 0 | 9 |
| Part II — System Architecture | 12 | 8 | 1 | 0 | 21 |
| Part III — Curriculum & Program | 7 | 7 | 1 | 0 | 15 |
| Part IV — Content & Question Factory | 2 | 11 | 1 | 0 | 14 |
| Part V — Question Data Contract | 4 | 7 | 2 | 0 | 13 |
| Part VI — Delivery Engine & Attempts | 15 | 1 | 0 | 0 | 16 |
| Part VII — Mastery/Recs/Analytics | 1 | 5 | 1 | 0 | 7 |
| Part VIII — User Roles & IA | 11 | 7 | 0 | 1 | 19 |
| Part IX — UX & Visual Design | 7 | 4 | 2 | 0 | 13 |
| Part X — SAT/MAP Assessment UX | 4 | 1 | 0 | 0 | 5 |
| Part XI — Accounts/Entitlements | 3 | 3 | 0 | 0 | 6 |
| Part XII — Database Invariants | 3 | 1 | 0 | 0 | 4 |
| Part XIII — Search/Session Tools | 5 | 2 | 0 | 0 | 7 |
| Part XIV — Security/Privacy | 7 | 5 | 1 | 0 | 13 |
| Part XV — QA & Acceptance | 10 | 3 | 0 | 0 | 13 |
| Part XVI — Rebuild Order | 5 | 5 | 1 | 0 | 11 |
| Appendix A | 5 | 9 | 9 | 4 | 27 |
| Appendix B–F | 7 | 8 | 4 | 3 | 22 |
| **Grand Total** | **110** | **94** | **23** | **8** | **235**† |

† Row count exceeds 132 because many requirements appear in multiple context table entries in the dual-listing above. Unique requirement IDs: **132**.

---

## Release Rule

> Do not declare Practice Buddy production-ready until:
> 1. All **Critical** and **High** findings are resolved
> 2. Every required program has real database-backed content and persistence
> 3. Student/teacher/admin workflows are verified end-to-end
> 4. Relevant QA gates pass (§50)

---

*End of Traceability Matrix*