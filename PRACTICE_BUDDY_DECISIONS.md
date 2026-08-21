# Practice Buddy Decisions Log

## Format
```
DATE | DECISION | REQUESTED BY | REASON | PREVIOUS BEHAVIOR | NEW BEHAVIOR | AFFECTED REQUIREMENTS | AFFECTED MODULES | MIGRATION IMPLICATIONS
```

---

## Architecture Decisions

### DEC-001: Gold-Seed + AI Expansion Model

| Field | Value |
|-------|-------|
| **Date** | 2026-08-19 (Architecture revision) |
| **Decision** | Adopt gold-seed + AI controlled-expansion as primary content model |
| **Requested By** | Architecture & Design Report v1.0 |
| **Reason** | Manual question authoring at scale is not viable. 10 exceptional canonical questions per micro-skill → AI variation → validation pipeline provides quality at scale. |
| **Previous Behavior** | N/A (new decision) |
| **New Behavior** | All content flows through: Gold seed → AI generation → Validation → Dedup → Review → Published bank |
| **Affected Modules** | Content Service, AI Question Factory, Validation Engine, Duplicate Detection, Human Review Queue |
| **Migration Implications** | Schema requires GoldQuestion, QuestionFamily, generation metadata, validation models |

### DEC-002: No Runtime AI Dependency

| Field | Value |
|-------|-------|
| **Date** | 2026-08-19 (Architecture revision) |
| **Decision** | Delivery Engine must never depend on AI at runtime |
| **Requested By** | Architecture & Design Report v1.0 |
| **Reason** | Student practice must never be blocked by AI service availability, latency, or cost. Only pre-approved stored questions are served during practice. |
| **Previous Behavior** | N/A |
| **New Behavior** | AI Factory runs asynchronously. Delivery Engine reads from question bank only. |
| **Affected Modules** | Delivery Engine, AI Question Factory |
| **Migration Implications** | None — already implemented (confirmed in audit) |

### DEC-003: Grades 3–10 Scope Reduction

| Field | Value |
|-------|-------|
| **Date** | 2026-08-19 (Revised Implementation Plan) |
| **Decision** | Remove K-2 from initial scope. Serve Grades 3-10 for Core English and Math |
| **Requested By** | Product decision |
| **Reason** | Focus delivery on grades with highest assessment stakes. K-2 remains architecturally possible. |
| **Previous Behavior** | K-10 scope |
| **New Behavior** | Grades 3-10 scope for initial production |
| **Affected Modules** | Curriculum Taxonomy, Content Service |
| **Migration Implications** | Grade model `level` field (3-10); Grade `label` can show "Grade 3" etc. |

### DEC-004: Immutable Attempt Capture with Version Pinning

| Field | Value |
|-------|-------|
| **Date** | 2026-08-19 (Architecture revision) |
| **Decision** | All student attempts are append-only, hash-verified, and pinned to question version |
| **Requested By** | Architecture & Design Report v1.0 |
| **Reason** | Audit trail integrity. Questions may change; attempts must reference the exact version presented. |
| **Previous Behavior** | N/A |
| **New Behavior** | StudentAttempt has `questionVersionId`, `snapshotHash`, no updatedAt, immutable `createdAt` |
| **Affected Modules** | Attempt Capture, Mastery Engine |
| **Migration Implications** | None — already implemented (confirmed in audit) |

### DEC-005: Multi-Tenant Architecture

| Field | Value |
|-------|-------|
| **Date** | 2026-08-19 (Architecture revision) |
| **Decision** | Every entity tenant-scoped via `tenantId` FK |
| **Requested By** | Architecture requirement |
| **Reason** | AEEG as first tenant, Fidelis Auto as B2B. All data must be isolated per tenant. |
| **Previous Behavior** | N/A |
| **New Behavior** | All models have `tenantId` with `@@unique([tenantId, ...])` patterns |
| **Affected Modules** | All |
| **Migration Implications** | None — already implemented in schema |

---

## Operational Decisions

### DEC-006: M2 as Canonical Orchestrator

| Field | Value |
|-------|-------|
| **Date** | 2026-08-20 |
| **Decision** | M2 (Hermes Desktop) is canonical Practice Buddy orchestrator |
| **Requested By** | Fleet architecture |
| **Reason** | M2 has local access to repo, DB, and audit tools. M1-M6 are remote execution/delegation resources. |
| **Previous Behavior** | No canonical orchestrator defined |
| **New Behavior** | All Practice Buddy work must synchronize through M2 Practice Buddy desktop bot |
| **Affected Modules** | All — operational workflow |
| **Migration Implications** | None — pure orchestration decision |

### DEC-007: Telegram as Remote Command Channel

| Field | Value |
|-------|-------|
| **Date** | 2026-08-20 |
| **Decision** | Telegram is command/report channel only. Desktop bot is canonical context. |
| **Requested By** | Fleet architecture |
| **Reason** | Telegram may be incomplete or fragmented. Desktop bot maintains authoritative project state. |
| **Previous Behavior** | No distinction |
| **New Behavior** | Telegram commands synchronize through desktop bot before execution |
| **Affected Modules** | All — operational workflow |
| **Migration Implications** | None |

### DEC-008: Persistent State Files in Repo

| Field | Value |
|-------|-------|
| **Date** | 2026-08-20 |
| **Decision** | Durable project state stored as markdown files in repo root |
| **Requested By** | Fleet architecture |
| **Reason** | Survives context compression, model switching, Hermes restart, and machine reboot. Git-tracked for audit trail. |
| **Previous Behavior** | No persistent state |
| **New Behavior** | 7 state files: PROJECT_STATE, DEFECT_LEDGER, ACTIVE_WORKSTREAMS, TEST_STATE, DEPLOYMENT_STATE, CHANGELOG, DECISIONS |
| **Affected Modules** | All — operational workflow |
| **Migration Implications** | Files to be committed after initial Git setup |

### DEC-009: Brand Replacement Gate for Phase 22

| Field | Value |
|-------|-------|
| **Date** | 2026-08-21 |
| **Decision** | Public brand name change is a formal gate before Phase 22 production deployment |
| **Requested By** | Brand research project |
| **Reason** | Practice Buddy scored 51/100 — generic, juvenile for SAT, Arabic transliteration issues, .com unavailable. Brand research complete with 15 scored alternatives. Owner must select before production. |
| **Previous Behavior** | No brand gate defined |
| **New Behavior** | Phase 22 deployment blocked until: (1) Owner selects new brand from final pool, (2) Professional trademark search, (3) Logo/wordmark design, (4) Surface-level rename applied |
| **Affected Modules** | Branding, Deployment, Marketing |
| **Migration Implications** | See BRAND_RESEARCH/PRACTICE_BUDDY_BRAND_RESEARCH.md §9 Engineering Impact Assessment |
| **⚠️ Correction (2026-08-21)** | Re-running the conflict check on the REAL finalists (placeholders were used in the original subagent run) found live conflicts the draft missed: Ascenda = active funded fintech (not squatted), Erudia = erudia.io active AI-learning platform, Siraj = Qatar Foundation edutainment, Veridia = crowded. **Recommended winner revised to LUMAANI (80/100, lumaani.com AVAILABLE).** See SHORTLIST.md REVISED. |