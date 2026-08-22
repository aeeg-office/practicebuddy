# Lumaani Nightly Production Assurance System

**Product:** Lumaani (لوماني)
**Repository:** `git@github.com:aeeg-office/practicebuddy.git`
**Schedule:** Daily at 03:30 Cairo (EEST | UTC+3)
**Orchestrator:** M2 (Hermes Desktop)
**Created:** 2026-08-22
**Version:** 1.0.0

---

## System Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                    LUMAANI NIGHTLY ASSURANCE                        │
│                                                                     │
│  03:30 Cairo ──► Hermes Cron ──► M2 Orchestrator                    │
│                                                                     │
│  Pipeline:                                                          │
│    Repo Sync → Baseline → Architecture → Auth → Student → Teacher  │
│    → Admin → Questions → Gold → AI Factory → Delivery → Attempts   │
│    → Mastery → Analytics → MAP → SAT → Guided → Live → Design      │
│    → UX → PWA → Accessibility → Security → Performance →           │
│    → Classification → Repair → Retest → Regression → Report        │
│    → Telegram → State Sync                                          │
└─────────────────────────────────────────────────────────────────────┘
```

## Run Locking

The cron job uses Hermes's built-in cron scheduling with a single-instance guarantee.
No two Lumaani nightly runs execute concurrently.

## Run ID Format

`LUMAANI-NA-YYYYMMDD-RUNID`

Where RUNID is a short hex suffix from the run timestamp.

## Log Location

`/home/qadir/.hermes/profiles/practice-buddy/nightly-assurance/`

## Report Location

`~/projects/practicebuddy/LUMAANI_NIGHTLY_ASSURANCE_<DATE>_<RUNID>.md`

## Historical Comparison

Baseline metrics are stored in `PRACTICE_BUDDY_PROJECT_STATE.md` and compared each run.
Trend tracking in the nightly report.

---

## Key Configuration Files

| File | Purpose |
|------|---------|
| `LUMAANI_NIGHTLY_ASSURANCE.md` | **This file** — System documentation |
| `LUMAANI_NIGHTLY_RUNNER.sh` | Shell wrapper for the nightly run |
| `LUMAANI_DESIGN_SYSTEM.md` | Design tokens/standards |
| `UX_ARCHITECTURE.md` | UX architecture |
| `PRACTICE_BUDDY_PROJECT_STATE.md` | Canonical project state |
| `PRACTICE_BUDDY_DEPLOYMENT_STATE.md` | Deployment state |
| `PRACTICE_BUDDY_DEFECT_LEDGER.md` | Defect tracking |
| `PRACTICE_BUDDY_CHANGELOG.md` | Change history |

---

## Safety Rules

1. **No architectural redesign** during nightly runs
2. **No data loss** — all repairs must have rollback
3. **No live AI dependency** for student practice
4. **No schema migrations** without separate approval
5. **No content deletion** without explicit verification
6. **Maximum 5 repairs per night** — quality over quantity
7. **First 7 runs are baseline** — conservative repair policy

---

## Run Checklist

- [ ] Repository synchronized
- [ ] Baseline captured
- [ ] Architecture compliance checked
- [ ] Auth/RBAC/Tenancy tested
- [ ] Student workflows verified
- [ ] Teacher workflows verified
- [ ] Admin workflows verified
- [ ] Published question integrity checked
- [ ] Gold question status checked
- [ ] AI Question Factory checked
- [ ] Delivery Engine verified
- [ ] Two-attempt model verified
- [ ] Attempt integrity checked
- [ ] Mastery verified
- [ ] Analytics verified
- [ ] MAP isolation verified
- [ ] SAT isolation verified
- [ ] Guided/Live verified (where deployed)
- [ ] Design system compliance sampled
- [ ] UX architecture compliance checked
- [ ] Responsive/PWA verified
- [ ] Accessibility sampled
- [ ] Security baseline checked
- [ ] Performance tracked
- [ ] Regressions identified
- [ ] Repair eligible defects repaired
- [ ] All repairs retested
- [ ] Regression suite updated
- [ ] Report written
- [ ] Project state updated
- [ ] Telegram delivered