# Practice Buddy — Active Workstreams

## Last Updated: 2026-08-21

| Workstream | Status | Lead | Files | Next Action |
|-----------|--------|------|-------|-------------|
| Production deployment | ✅ COMPLETED | Cron-NA | VPS runbook, source files | Latest code deployed via rsync+rebuild (NA Run #2) |
| K–2 curriculum | ⏳ DEFERRED | — | `prisma/seed-curriculum.ts` | Add grades K,1,2 |
| MAP Math subject page | ⏳ DEFERRED | — | `src/app/map-prep/math/` | Create dedicated page (skills exist via mappings) |
| Gold questions (SAT) | ⏳ DEFERRED | — | `prisma/seed-gold.ts` | Extend seed to SAT programs — DB shows 0 SAT questions |
| Rate limiting (all routes) | ⏳ DEFERRED | — | `src/lib/rate-limit.ts` | Extend middleware |
| RLS policies | ⏳ DEFERRED | — | Migration | PostgreSQL RLS |
| Accessibility audit | ⏳ DEFERRED | — | — | WCAG AA pass |
| SAT Prep page rewrite | ⏳ DEFERRED | — | `src/app/sat-prep/page.tsx` | Full content system replacement — AEEG remnant |
| Map-prep palette migration | ⏳ DEFERRED | — | `src/app/map-prep/*` | Replace `#1a237e`/`#f5a623` with `#0d4f4f`/`#e8b84b` |
| Globals.css ring color fix | 🆕 PENDING | — | `src/app/globals.css:40` | Change `--color-ring: #1a237e` → `#0d4f4f` |
| Purple removal from MAP data | 🆕 PENDING | — | `src/data/practice-skills.ts:185` | Replace `text-purple-500` with Lumaani teal class |

## File Lock Status
- **No files currently locked.** All workstreams resolved.

## Delegates / Agents
- **M2 (Hermes Desktop):** Orchestrator, canonical state authority
- **All delegates:** Complete — no active subagents