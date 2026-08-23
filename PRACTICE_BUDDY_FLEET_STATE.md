# Practice Buddy — Fleet State

## Last Updated: 2026-08-23 08:45 EEST

## Fleet Topology

| Node | Hostname | IP | Status | Connection | Notes |
|------|----------|----|--------|-----------|-------|
| **M2** | Qadir-AsusSilver | 10.87.252.183 (wlo1) | ✅ ACTIVE — ORCHESTRATOR | Direct (this machine) | Outside wireless network; gateway 10.87.252.3 |
| **VPS** | srv1865492 | 191.218.165.228 | ✅ ACTIVE | SSH root@191.218.165.228 (id_ed25519_aeeg_vps) | Ubuntu 24.04, 8GB RAM, 96GB SSD, Node 22, nginx, PM2 |
| **M3** | qab-TP550LD | 127.0.0.1:22231 (VPS tunnel) | ✅ ACTIVE | SSH fleet-m3-ooo (via VPS reverse tunnel) | Intel i5-4210U, 11GB RAM, 457GB HDD (9% used), Node unknown |
| **M6** | qadir-Inspiron-3521 | 127.0.0.1:22234 (VPS tunnel) | ✅ ACTIVE | SSH fleet-m6-ooo (via VPS reverse tunnel) | Intel i3-3217U, 11GB RAM, 457GB HDD (6% used), Node 18.19 |
| **M1** | — | 192.168.1.7 → 127.0.0.1:22230 | ❌ TUNNEL DOWN | Proxy refused | Reverse tunnel not running on M1 |
| **M4** | — | 192.168.1.15 | ❌ UNREACHABLE | No tunnel configured | Needs M1 as proxy jump |
| **M5** | — | 192.168.1.9 | ❌ UNREACHABLE | No tunnel configured | Needs M1 as proxy jump |

## Connection Methods

| Target | Method | Key |
|--------|--------|-----|
| VPS | Direct SSH | `~/.ssh/id_ed25519_aeeg_vps` (root) |
| M3 | `fleet-m3-ooo`: ProxyCommand via VPS, then port 22231 | `~/.ssh/fleet-mesh` (qab) |
| M6 | `fleet-m6-ooo`: ProxyCommand via VPS, then port 22234 | `~/.ssh/fleet-mesh` (qadir) |

## Production (VPS) State

- **App directory:** `/var/www/lumaani/repo`
- **PM2 process:** `lumaani` (pid 3125043, online, 12h uptime, 0 restarts)
- **Port:** 3099 (Next.js production server)
- **Nginx:** Reverse proxy → localhost:3099
- **SSL:** Let's Encrypt — lumaani.com + www.lumaani.com (expires 2026-11-20)
- **Domain:** Both lumaani.com and www.lumaani.com serve identical content (NO canonical redirect)
- **Git:** Repo deployed without full Git history (bad object HEAD)

## Work Distribution (M2 Only — Fleet Unavailable)

Since M1/M4/M5 are unreachable and M3/M6 lack the dev environment (repo uncloned, Node < 20), **all work executes on M2** with VPS for deployment.

| Workstream | Assignment | Notes |
|-----------|-----------|-------|
| UI/Branding audit | M2 (this machine) | Browser-based audit of lumaani.com |
| Login button fix | M2 | Source code + design token analysis |
| Logo research & dev | M2 | SVG creation + implementation |
| Route audit | M2 | Fetch-based audit of all routes |
| Curriculum inventory | M2 | DB queries via VPS |
| Gold Question audit | M2 | DB queries via VPS |
| Deployment | M2 → VPS | Rsync/rebuild to production |

## Fleet Coordination

- **M2** = ORCHESTRATOR, INTEGRATOR, ARCHITECTURE AUTHORITY, FINAL MERGE AUTHORITY
- **VPS** = Production verification + DB queries
- All subagents/parallel work runs locally on M2 via delegate_task