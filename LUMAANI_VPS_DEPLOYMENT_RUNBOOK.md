# Lumaani VPS Deployment Runbook

**Date:** 2026-08-21
**Version:** 1.0
**Contact:** hello@lumaani.com

---

## Pre-flight Checklist

- [ ] Owner has approved deployment
- [ ] Production commit verified (`f4a4ad07` — Lumaani rebrand 10/10 PASS)
- [ ] Build passes locally (`npx next build` — 0 errors)
- [ ] Production `.env` file prepared (ALL secrets, see below)
- [ ] Domain DNS configured: `lumaani.com` → VPS IP
- [ ] PostgreSQL 15+ available on VPS
- [ ] Node.js 22+ available on VPS
- [ ] Nginx/Apache configured as reverse proxy
- [ ] SSL certificate obtained (Let's Encrypt or Cloudflare)
- [ ] Rollback plan documented

---

## Target Architecture

```
lumaani.com → VPS (191.218.165.228)
    │
    ├── lumaani.com (public marketing/landing page)
    ├── app.lumaani.com (Next.js application)
    └── api.lumaani.com (API — optional, served by same process)
```

### Domain Recommendation
- **Primary:** `https://lumaani.com` (bare domain, 301 www→bare)
- **Application:** `https://app.lumaani.com` (optional subdomain for production)
- **API:** Served by Next.js API routes at `app.lumaani.com/api/*`

---

## Environment Variables

Create `~/lumaani/.env` on the VPS:

```bash
# Database
DATABASE_URL="postgresql://lumaani_prod:[REDACTED]@localhost:5432/lumaani_prod"

# Auth
JWT_SECRET="[generate with: openssl rand -hex 32]"
NEXTAUTH_SECRET="[generate with: openssl rand -hex 32]"

# Application
NEXT_PUBLIC_APP_URL="https://lumaani.com"
NODE_ENV=production
PORT=3099

# Optional — AI features
# OPENAI_API_KEY="sk-..."
# CLARITY_PROJECT_ID="..."
```

---

## Deployment Steps

### 1. Server Setup
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js 22
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt install -y nodejs postgresql nginx certbot python3-certbot-nginx

# Verify
node --version  # v22.x+
npm --version
psql --version
```

### 2. Database
```bash
# Create database user
sudo -u postgres psql -c "CREATE USER lumaani_prod WITH PASSWORD '[REDACTED]';"
sudo -u postgres psql -c "CREATE DATABASE lumaani_prod OWNER lumaani_prod;"

# Apply migrations
cd ~/lumaani
npx prisma migrate deploy
```

### 3. Application
```bash
# Create deploy user & dir
sudo useradd -m -s /bin/bash lumaani
sudo mkdir -p /var/www/lumaani
sudo chown lumaani:lumaani /var/www/lumaani

# Clone & install
su - lumaani
git clone git@github.com:aeeg-office/practicebuddy.git /var/www/lumaani
cd /var/www/lumaani
cp /path/to/.env .env
npm install
npx prisma generate
npm run build
```

### 4. Process Manager (PM2)
```bash
npm install -g pm2
pm2 start npm --name "lumaani" -- start
pm2 save
pm2 startup
```

### 5. Nginx Reverse Proxy
```nginx
server {
    listen 80;
    server_name lumaani.com app.lumaani.com;

    location / {
        proxy_pass http://localhost:3099;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

### 6. SSL (Let's Encrypt)
```bash
sudo certbot --nginx -d lumaani.com -d app.lumaani.com
```

### 7. Verify
```bash
curl -I https://lumaani.com                 # Should 200
curl -I https://app.lumaani.com/api/health  # If health endpoint exists
curl -I https://lumaani.com/login           # Should 200
```

---

## Post-Deployment Smoke Test

- [ ] Public homepage loads (200)
- [ ] Login page renders (200)
- [ ] Registration form works
- [ ] Student dashboard loads after login
- [ ] Practice questions load
- [ ] Attempt submission works
- [ ] MAP Prep pages load
- [ ] SAT Prep + SAT Simulation load
- [ ] Admin pages accessible to admin role
- [ ] Teacher dashboard accessible
- [ ] API routes return JSON (not HTML)
- [ ] Database writes succeed (attempts captured)
- [ ] No 500 errors in logs
- [ ] No unhandled promise rejections in logs
- [ ] PWA install prompt appears (mobile)
- [ ] Responsive layout at 375px, 768px, 1440px

---

## Rollback Plan

### Git Rollback
```bash
cd /var/www/lumaani
git revert HEAD --no-edit
git push origin main
npm run build
pm2 restart lumaani
```

### Database Rollback
```bash
npx prisma migrate down 1
```

### Full Rollback
```bash
# Point DNS back to previous host/origin
# Restore DB from backup:
pg_restore -d lumaani_prod /backups/lumaani_pre_deploy_$(date +%F).sql

# If Nginx config broken:
sudo nginx -t
sudo systemctl reload nginx
```

---

## Monitoring

```bash
# Application logs
pm2 logs lumaani

# Nginx access
tail -f /var/log/nginx/access.log

# Nginx errors
tail -f /var/log/nginx/error.log

# System
htop
df -h
free -m
```

---

## Backup Schedule

| Item | Frequency | Command |
|------|-----------|---------|
| PostgreSQL | Daily | `pg_dump -U lumaani_prod > /backups/lumaani_$(date +%F).sql` |
| .env | Every change | `cp .env /backups/env_$(date +%F)` |
| Uploads (if any) | Daily | `rsync -a /var/www/lumaani/public/uploads/ /backups/uploads/` |

---

## Security Notes

- **NEVER** commit `.env` to Git
- **NEVER** expose `DATABASE_URL` or `JWT_SECRET` in logs
- Use strong random secrets: `openssl rand -hex 32`
- Keep PostgreSQL bound to `localhost` only (edit `pg_hba.conf`)
- Set `NODE_ENV=production` to disable dev features
- Use `helmet` or `next-security-headers` for security headers
- Enable Cloudflare or fail2ban for DDoS/brute-force protection