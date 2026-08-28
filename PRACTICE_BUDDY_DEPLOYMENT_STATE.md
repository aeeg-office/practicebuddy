# Lumaani Deployment State

## Environment Status
| Environment | Status | URL | Notes |
|-------------|--------|-----|-------|
| **Local Dev** | ⬇️ INACTIVE | http://localhost:3099 | Production is primary |
| **Production** | ✅ LIVE | https://lumaani.com | App running in Docker, latest source deployed (2026-08-26) |
| **Staging** | ❌ NOT CONFIGURED | — | — |
| **VPS** | ✅ ACTIVE | 191.218.165.228 | Ubuntu 24.04, Node 22, PG 16, nginx, Docker, Next.js 16 |

## Deployment History
| # | Date | Environment | Commit | Schema Version | Status |
|---|------|-------------|--------|---------------|--------|
| 1 | 2026-08-22 | Production | `practice-buddy-release-1-2026-08-21` | 7 migrations applied | ✅ LIVE (port 3099) |
| 2 | 2026-08-25 | Source (Hotfix) | `0d23cb23` (+local fixes) | 0 schema changes | ✅ 14 AEEG references removed, build passes |
| 3 | 2026-08-26 | Production | `9b60bd1b` (NA Run #2) | 0 schema changes | ✅ Rebuilt & restarted, AEEG fixes deployed |
| 4 | 2026-08-26 | Production | `9b60bd1b` (Full Audit Repair) | 0 schema changes | ✅ Full rebuild: version endpoint, SAT/CE inventory restored, SAT Prep page rewritten, design tokens fixed |
| 5 | 2026-08-27 | Production | `9b60bd1b` (NA Run #3) | 0 schema changes | ✅ Hotfix: manifest.json theme_color → #0d4f4f (docker cp + restart) |

## Version Endpoint
- `/api/version` returns: app=Lumaani, commit, builtAt, buildId, environment
- Production response verified: `commit: 9b60bd1bc872`, `environment: production`

---

## Deployment History
| # | Date | Environment | Commit | Schema Version | Status |
|---|------|-------------|--------|---------------|--------|
| — | — | — | — | — | No deployments yet |

---

## Production-Ready Commit
**Commit:** `f4a4ad07` — Lumaani rebrand: independent verification 10/10 PASS  
**Tag:** `practice-buddy-release-1-2026-08-21`  
**Build:** ✅ 0 errors  
**DB:** ✅ 7 migrations, 40 tables, all seeds run  

---

## Deployment Procedure
Full runbook: `LUMAANI_VPS_DEPLOYMENT_RUNBOOK.md`

### Quick Start
```bash
# VPS prerequisites: Node.js 22, PostgreSQL 15, Nginx
# 1. Clone repo
# 2. Configure .env (DATABASE_URL, JWT_SECRET, NODE_ENV=production)
# 3. Run migrations: npx prisma migrate deploy
# 4. Build: npm run build
# 5. Start: npm start (or pm2)
# 6. Proxy: nginx → localhost:3099
# 7. SSL: certbot
```

---

## Rollback Procedure
```bash
git revert HEAD --no-edit
npm run build
pm2 restart lumaani
```

---

## Known Production Issues
- None — not yet deployed to production

## Production Verification Checklist
- [x] Build passes (0 errors)
- [x] Route regression (87 routes verified)
- [x] Security (0 Critical)
- [x] Brand verification (10/10 PASS)
- [x] Deployment runbook written
- [x] DNS configured (lumaani.com → VPS)
- [x] SSL certificate obtained (Let's Encrypt, expires 2026-11-20)
- [x] Production .env prepared
- [x] VPS deployment executed
- [x] Smoke test passed (11 routes HTTPS 200)