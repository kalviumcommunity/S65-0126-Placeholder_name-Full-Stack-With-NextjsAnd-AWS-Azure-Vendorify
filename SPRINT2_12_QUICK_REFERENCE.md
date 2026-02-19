# Sprint 2.12: Docker Quick Reference

## 🚀 Quick Start (One Command!)

```bash
docker compose up --build
```

Then open: **http://localhost:3000**

---

## 📍 Service Ports & URLs

| Service | Host | Docker | Status Check |
|---------|------|--------|--------------|
| **Next.js App** | http://localhost:3000 | app:3000 | `curl http://localhost:3000` |
| **PostgreSQL** | localhost:5432 | postgres:5432 | `docker compose exec postgres psql -U vendorify_user -d vendorify_db -c "SELECT NOW();"` |
| **Redis** | localhost:6379 | redis:6379 | `docker compose exec redis redis-cli ping` |

---

## 🔑 Database Credentials

```
Username: vendorify_user
Password: vendorify_password
Database: vendorify_db
URL: postgresql://vendorify_user:vendorify_password@postgres:5432/vendorify_db
```

---

## 📋 Essential Commands

### Start & Stop

```bash
docker compose up --build          # Start fresh build
docker compose up                  # Start (cached)
docker compose up -d               # Start in background
docker compose down                # Stop everything
docker compose down -v             # ⚠️ Stop + DELETE all data
docker compose restart             # Restart all services
docker compose restart app         # Restart just app
```

### Logs & Monitoring

```bash
docker compose logs                # Show all logs
docker compose logs app            # Show app logs only
docker compose logs -f             # Follow logs (live)
docker compose ps                  # Show container status
```

### Execute Commands

```bash
docker compose exec app npm run build      # Run build
docker compose exec app npm run lint       # Run linter
docker compose exec app npm run lint:fix   # Auto-fix
docker compose exec app pnpm install <pkg> # Add package
docker compose exec postgres psql -U vendorify_user -d vendorify_db  # Access database
docker compose exec redis redis-cli        # Access Redis CLI
```

---

## 🔍 Verify All Services Running

```bash
docker compose ps
```

**All should show status: `Up (healthy)`**

---

## 🐛 Quick Fixes

### Port Already in Use
```bash
# Identify process using port 3000
lsof -i :3000          # MacOS/Linux
netstat -ano | findstr :3000  # Windows

# Kill process (get PID from above)
kill -9 <PID>          # MacOS/Linux
```

### Slow Build
```bash
# Use BuildKit for faster builds
DOCKER_BUILDKIT=1 docker compose up --build
```

### Database Issues
```bash
# Clean restart
docker compose down -v
docker compose up --build
```

### Can't Connect to Services
```bash
# Check if containers are healthy
docker compose ps

# View logs for errors
docker compose logs postgres
docker compose logs redis
```

---

## 🗂️ File Locations

| File | Purpose | Lines |
|------|---------|-------|
| `Dockerfile` | Multi-stage build | 69 |
| `docker-compose.yml` | Service definitions | ~150 |
| `README.md § Docker` | Full documentation | 300+ |
| `SPRINT2_12_DOCKER_SETUP.md` | Detailed guide | This file |

---

## 🔌 Network Details

**Bridge Network Name:** `vendorify-network`

**From Host:**
```
App: http://localhost:3000
DB:  postgresql://localhost:5432
Redis: redis://localhost:6379
```

**From Inside Containers:**
```
App: http://app:3000
DB:  postgresql://postgres:5432
Redis: redis://redis:6379
```

---

## 💾 Data Persistence

- **PostgreSQL volume:** `postgres_data` → `/var/lib/postgresql/data`
- **Redis volume:** `redis_data` → `/data`

**Survives:** `docker compose stop` and `docker compose start`  
**Deleted by:** `docker compose down -v` ⚠️

---

## 📦 Environment Variables (in app container)

```
NODE_ENV=development
PORT=3000
DATABASE_URL=postgresql://vendorify_user:vendorify_password@postgres:5432/vendorify_db
REDIS_URL=redis://redis:6379
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000
```

---

## ⚡ Dev Workflow

```bash
# 1. Start everything
docker compose up --build

# 2. Edit your code (hot reload works!)
# 3. See changes at http://localhost:3000

# 4. Run commands as needed
docker compose exec app npm run lint
docker compose exec app npm run format

# 5. Add new package
docker compose exec app pnpm add <package>

# 6. Stop when done
docker compose down
```

---

## 🚨 Troubleshooting Flowchart

**App won't start?**
```
→ Check: docker compose logs app
→ If connection error: Containers not healthy yet
→ If module error: docker compose down -v && docker compose up --build
→ If port error: docker compose down && change port in docker-compose.yml
```

**Can't reach database?**
```
→ Check: docker compose ps (postgres says healthy?)
→ Test: docker compose exec postgres psql -U vendorify_user -d vendorify_db -c "SELECT NOW();"
→ If error: postgres logs with docker compose logs postgres
→ If still error: docker compose down -v && docker compose up --build
```

**Can't reach Redis?**
```
→ Check: docker compose ps (redis says healthy?)
→ Test: docker compose exec redis redis-cli ping
→ If error: Wait 5-10 seconds, try again (slow startup)
→ If still error: docker compose down -v && docker compose up --build
```

---

## 📚 See Full Documentation

→ [`README.md § Docker & Local Container Setup`](README.md#-docker--local-container-setup)  
→ [`SPRINT2_12_DOCKER_SETUP.md`](SPRINT2_12_DOCKER_SETUP.md)

---

**Last Updated:** February 14, 2026 | **Status:** ✅ Sprint 2.12 Complete
