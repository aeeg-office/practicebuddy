# Practice Buddy Deployment State

## Environment Status
| Environment | Status | URL | Notes |
|-------------|--------|-----|-------|
| **Local Dev** | ✅ RUNNING | http://localhost:3099 | Next.js dev server |
| **Production** | ⚠️ DOCUMENTED | — | Release tag created, deployment procedure documented |
| **Staging** | ❌ NOT CONFIGURED | — | No staging environment |
| **VPS** | ❌ NOT CONFIGURED | — | VPS at 191.218.165.228 exists but PB not deployed |

---

## Local Dev Environment
| Component | Detail |
|-----------|--------|
| **Server** | Next.js dev server (via `npx next dev -p 3099`) |
| **Port** | 3099 |
| **Database** | PostgreSQL `practice_buddy` on localhost:5432 |
| **DB Provider** | PostgreSQL (Prisma ORM) |
| **Auth** | JWT/bcrypt, local |
| **Build** | ✅ Compiled successfully, 0 errors |
| **Routes** | 87 (43 admin, 44 student/teacher/public) |
| **DB Tables** | 38 |

---

## Deployment History
| # | Date | Environment | Commit | Schema Version | Status |
|---|------|-------------|--------|---------------|--------|
| 1 | 2026-08-21 | Release Tag | (latest) | 6 migrations | ✅ Tagged: practice-buddy-release-1-2026-08-21 |

---

## Production Deployment Procedure

### Prerequisites
- Node.js 22+ (or compatible)
- PostgreSQL 15+
- Environment variables configured

### Steps
```bash
# 1. Clone and install
git clone git@github.com:aeeg-office/practicebuddy.git
cd practicebuddy
npm install

# 2. Configure environment
cp .env.example .env
# Edit .env: set DATABASE_URL, JWT_SECRET, etc.

# 3. Run database migrations
npx prisma migrate deploy

# 4. Build and start
npm run build
npm start

# 5. Verify
curl http://localhost:3099
```

### Rollback
```bash
# Git rollback
git revert HEAD --no-edit
git push origin main

# Database rollback
npx prisma migrate down 1
```

---

## Known Production Issues
None — not yet deployed to production.

## Production Verification Checklist
- [ ] Build passes
- [ ] Migrations apply
- [ ] Login works
- [ ] Student practice works
- [ ] Teacher dashboard works
- [ ] Admin back office works
- [ ] API routes respond
- [ ] No console errors
- [ ] Responsive layout
- [ ] PWA installable