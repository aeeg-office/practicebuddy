# Lumaani Deployment State

## Environment Status
| Environment | Status | URL | Notes |
|-------------|--------|-----|-------|
| **Local Dev** | ✅ RUNNING | http://localhost:3099 | Next.js dev server, build ✅ |
| **Production** | ✅ DEPLOYED | https://lumaani.com (DNS pending) | App running via PM2 on VPS, nginx proxying |
| **Staging** | ❌ NOT CONFIGURED | — | — |
| **VPS** | ✅ ACTIVE | 191.218.165.228 | Ubuntu 24.04, Node 22, PG 16, nginx, PM2 |

## Deployment History
| # | Date | Environment | Commit | Schema Version | Status |
|---|------|-------------|--------|---------------|--------|
| 1 | 2026-08-22 | Production | `practice-buddy-release-1-2026-08-21` | 7 migrations applied | ✅ LIVE (port 3099) |

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