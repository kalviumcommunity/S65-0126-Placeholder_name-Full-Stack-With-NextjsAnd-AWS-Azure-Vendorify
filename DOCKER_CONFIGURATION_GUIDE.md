# Docker Configuration Guide

**Sprint 2.12: Docker & Docker Compose Setup**  
**Date:** February 14, 2026  
**Status:** ✅ Complete

---

## 📋 Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Dockerfile Breakdown](#dockerfile-breakdown)
3. [docker-compose.yml Breakdown](#docker-composeyml-breakdown)
4. [Environment Variables](#environment-variables)
5. [Network Architecture](#network-architecture)
6. [Volume Strategy](#volume-strategy)
7. [Health Check Details](#health-check-details)
8. [Performance Optimization](#performance-optimization)
9. [Security Considerations](#security-considerations)
10. [Troubleshooting Matrix](#troubleshooting-matrix)

---

## Architecture Overview

### System Design

```
┌─────────────────────────────────────────────────────────────┐
│                    Host Machine (Your Computer)             │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌─────────────────────────────────────────────────────┐   │
│  │    Docker Engine (Background Service)               │   │
│  │                                                       │   │
│  │  ┌──────────────────────────────────────────────┐  │   │
│  │  │  vendorify-network (Bridge Network)          │  │   │
│  │  │                                                │  │   │
│  │  │  ┌─────────────┐ ┌──────────┐ ┌────────────┐ │  │   │
│  │  │  │             │ │          │ │            │ │  │   │
│  │  │  │  vendorify  │ │ postgres │ │   redis    │ │  │   │
│  │  │  │    app      │ │          │ │            │ │  │   │
│  │  │  │             │ │  Port    │ │   Port     │ │  │   │
│  │  │  │  Port:3000  │ │ :5432    │ │  :6379     │ │  │   │
│  │  │  │             │ │          │ │            │ │  │   │
│  │  │  └─────────────┘ └──────────┘ └────────────┘ │  │   │
│  │  │         │              │            │         │  │   │
│  │  │         └──────────────┴────────────┘         │  │   │
│  │  │            (Service Communication)            │  │   │
│  │  └──────────────────────────────────────────────┘  │   │
│  │                                                       │   │
│  └─────────────────────────────────────────────────────┘   │
│                            ↓                                  │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  Named Volumes (Data Persistence)                   │   │
│  │  ├─ postgres_data → .../var/lib/postgresql/data     │   │
│  │  └─ redis_data → .../data                           │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                               │
└─────────────────────────────────────────────────────────────┘
           ↓
    Browser: http://localhost:3000
```

### Service Communication Paths

```
Browser → Host:3000 → Docker:app:3000 → Next.js Server
             ↓
         Next.js Server → postgres:5432 → PostgreSQL
             ↓
         Next.js Server → redis:6379 → Redis
```

---

## Dockerfile Breakdown

### Stage 1: BASE
```dockerfile
FROM node:20-alpine AS base
```

**What it does:**
- Starts from official `node:20-alpine` image (~150MB base)
- Alpine Linux = minimal OS (5MB vs 100MB with full Linux)

**Why Alpine:**
- Small image size
- All Node.js functionality
- Widely used in production
- Fast to download

---

### Stage 2: DEPS

```dockerfile
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Install dependencies based on the preferred package manager
COPY package.json pnpm-lock.yaml* ./
RUN pnpm install --no-frozen-lockfile
```

**What it does:**
- Creates a layer with all dependencies installed
- `libc6-compat` = system library required by Node.js
- `pnpm install` = installs all npm packages
- `--no-frozen-lockfile` = allows flexible dependency versions

**Why separate stage:**
- Docker caches each stage independently
- If only app code changes, dependencies aren't reinstalled
- Saves time on subsequent builds

---

### Stage 3: BUILDER

```dockerfile
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Install pnpm
RUN npm install -g pnpm

RUN pnpm run build
```

**What it does:**
- Copies dependencies from DEPS stage
- Copies entire project code
- Runs `pnpm run build` = compiles Next.js app
- Creates `.next` folder with compiled output

**Why separate stage:**
- Isolates build tools (not needed in final image)
- Build artifacts (`.next`) copied to final image
- Only necessary files in runtime

---

### Stage 4: RUNNER (Final Image)

```dockerfile
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV PORT 3000

# Create non-root user for security
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy only necessary files from builder
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Set permissions
RUN mkdir .next
RUN chown nextjs:nodejs .next

USER nextjs  # Switch to non-root user
EXPOSE 3000
ENV HOSTNAME "0.0.0.0"

# Install curl for health checks
USER root
RUN apk add --no-cache curl
USER nextjs

# Start Server
CMD ["node", "server.js"]
```

**What it does:**
- Sets production environment variables
- Creates non-root user `nextjs` (security best practice)
- Copies only compiled output (not source code):
  - `public/` = static files
  - `.next/standalone/` = compiled Next.js server
  - `.next/static/` = compiled frontend code
- Runs as unprivileged `nextjs` user
- Exposes port 3000
- Has curl for health checks
- Runs `node server.js` = Next.js standalone server

**Final image size: ~200-250MB** (vs 1GB+ without optimization)

---

## docker-compose.yml Breakdown

### Version & Networks

```yaml
version: '3.8'  # Latest stable Docker Compose format
```

**Why 3.8:**
- Supports all necessary features
- Not deprecated
- Compatible with all Docker versions

---

### App Service

```yaml
app:
  build:
    context: .              # Build from current directory
    dockerfile: Dockerfile  # Use ./Dockerfile

  container_name: vendorify-app
  ports:
    - "3000:3000"           # Map host:3000 to container:3000

  environment:
    NODE_ENV: development
    PORT: 3000
    DATABASE_URL: postgresql://vendorify_user:vendorify_password@postgres:5432/vendorify_db
    REDIS_URL: redis://redis:6379
    NEXT_PUBLIC_API_BASE_URL: http://localhost:3000

  depends_on:
    postgres:
      condition: service_healthy  # Wait until postgres is healthy
    redis:
      condition: service_healthy  # Wait until redis is healthy

  networks:
    - vendorify-network  # Custom bridge network

  restart: unless-stopped  # Auto-restart if crashes
  
  healthcheck:
    test: ["CMD", "curl", "-f", "http://localhost:3000"]
    interval: 30s      # Check every 30 seconds
    timeout: 10s       # Wait 10s for response
    retries: 3         # Fail after 3 failed checks
    start_period: 40s  # Grace period before first check
```

**Key Points:**
- Builds from local Dockerfile
- Uses `depends_on: condition: service_healthy` to wait for databases
- Health check verifies app is responding
- Auto-restarts on crash
- Custom network allows DNS resolution by service name

---

### PostgreSQL Service

```yaml
postgres:
  image: postgres:15-alpine  # Official PostgreSQL 15 on Alpine

  container_name: vendorify-postgres
  
  environment:
    POSTGRES_USER: vendorify_user
    POSTGRES_PASSWORD: vendorify_password
    POSTGRES_DB: vendorify_db

  ports:
    - "5432:5432"  # Map host:5432 to container:5432

  volumes:
    - postgres_data:/var/lib/postgresql/data  # Persistent data

  networks:
    - vendorify-network

  restart: unless-stopped

  healthcheck:
    test: ["CMD-SHELL", "pg_isready -U vendorify_user -d vendorify_db"]
    interval: 10s
    timeout: 5s
    retries: 5
    start_period: 10s
```

**Key Points:**
- Persists data in named volume `postgres_data`
- Health check uses `pg_isready` command
- App waits for `service_healthy` status before starting
- Accessible via:
  - Host: `localhost:5432`
  - Docker network: `postgres:5432`

---

### Redis Service

```yaml
redis:
  image: redis:7-alpine  # Official Redis 7 on Alpine

  container_name: vendorify-redis
  
  command: redis-server --appendonly yes  # Enable persistence

  ports:
    - "6379:6379"

  volumes:
    - redis_data:/data  # Persistent storage

  networks:
    - vendorify-network

  restart: unless-stopped

  healthcheck:
    test: ["CMD", "redis-cli", "ping"]
    interval: 10s
    timeout: 5s
    retries: 5
    start_period: 10s
```

**Key Points:**
- `--appendonly yes` = enables AOF persistence
- Persists data in named volume `redis_data`
- Health check sends PING command
- Accessible via:
  - Host: `localhost:6379`
  - Docker network: `redis:6379`

---

### Volumes Definition

```yaml
volumes:
  postgres_data:
    driver: local  # Store on host machine
  redis_data:
    driver: local
```

**What it means:**
- Named volumes created by Docker
- Stored in Docker's data directory (usually `~/Library/Docker/Volumes` or `C:\ProgramData\Docker`)
- Data persists across container restarts
- Deleted only if explicitly removed: `docker compose down -v`

---

### Network Definition

```yaml
networks:
  vendorify-network:
    driver: bridge  # Bridge network enables DNS resolution
```

**What it means:**
- Creates a virtual network called `vendorify-network`
- Containers can ping each other by name:
  - `app` container can reach `postgres` at `postgres:5432`
  - `app` container can reach `redis` at `redis:6379`
- Isolates services from other Docker networks

---

## Environment Variables

### How Environment Variables Work

```
.env.local (if exists)
  ↓
docker-compose.yml (overrides .env.local)
  ↓
Container has final values
```

### Variable Categories

#### 1. Next.js Configuration
```yaml
NODE_ENV: development       # Controls optimization
PORT: 3000                  # Port to listen on
NEXT_PUBLIC_API_BASE_URL: http://localhost:3000  # Browser can see
```

#### 2. Database Connection
```yaml
DATABASE_URL: postgresql://user:password@postgres:5432/vendorify_db
# Format: postgresql://[USER]:[PASSWORD]@[HOST]:[PORT]/[DATABASE]
# Host: postgres (not localhost in Docker)
```

#### 3. Redis Connection
```yaml
REDIS_URL: redis://redis:6379
# Format: redis://[HOST]:[PORT]
# Host: redis (not localhost in Docker)
```

#### 4. Client-Side Variables
```yaml
NEXT_PUBLIC_API_BASE_URL: http://localhost:3000
# Must have NEXT_PUBLIC_ prefix to be exposed to browser
```

---

## Network Architecture

### Bridge Network (`vendorify-network`)

**How it works:**

```
┌─────────────────────────────────────────┐
│    Docker Bridge Network                │
│    (vendorify-network)                  │
│                                          │
│  ┌──────────┐  ┌──────────┐ ┌────────┐ │
│  │   app    │  │ postgres │ │ redis  │ │
│  │ 172.x.x. │  │ 172.x.x. │ │172.x.x.│ │
│  └──────────┘  └──────────┘ └────────┘ │
│     ↓              ↓             ↓       │
│  DNS Resolution:                         │
│  app → 172.x.x.x  (via Docker DNS)      │
│  postgres → 172.x.x.x                   │
│  redis → 172.x.x.x                      │
└─────────────────────────────────────────┘
        ↓
   Port Mapping
   ├─ app:3000 → host:3000
   ├─ postgres:5432 → host:5432
   └─ redis:6379 → host:6379
```

**Key Points:**
- Each container gets its own IP address (172.x.x.x)
- Docker DNS server translates service names to IP addresses
- Containers can communicate directly without port mapping
- Host can access containers via port mapping (localhost:3000, etc.)

### Network Commands

```bash
# Inspect network
docker network inspect vendorify-network

# List all networks
docker network ls

# View container IP
docker inspect vendorify-app
```

---

## Volume Strategy

### Named Volumes

**PostgreSQL Data:**
```yaml
volumes:
  - postgres_data:/var/lib/postgresql/data
```

- **Source:** `postgres_data` (on host machine)
- **Target:** `/var/lib/postgresql/data` (inside container)
- **Purpose:** Persist database across restarts

**Redis Data:**
```yaml
volumes:
  - redis_data:/data
```

- **Source:** `redis_data` (on host machine)
- **Target:** `/data` (inside container)
- **Purpose:** Persist cache data across restarts

### Data Persistence Behavior

```bash
docker compose up          # Start containers with data
docker compose stop        # Stop containers (data persists)
docker compose start       # Restart containers (data still there!)
docker compose down        # Remove containers (data persists!)
docker compose down -v     # ⚠️ Remove containers AND volumes (data deleted!)
```

### Volume Location

**Windows (Docker Desktop):**
```
C:\ProgramData\Docker\volumes\
```

**macOS (Docker Desktop):**
```
~/Library/Docker/volumes/
```

**Linux:**
```
/var/lib/docker/volumes/
```

**View volumes:**
```bash
docker volume ls                           # List all volumes
docker volume inspect vendorify-postgres   # Details about specific volume
```

---

## Health Check Details

### Health Check Mechanism

```yaml
healthcheck:
  test: ["CMD", "curl", "-f", "http://localhost:3000"]
  interval: 30s      # Check every 30 seconds
  timeout: 10s       # Wait up to 10 seconds
  retries: 3         # Fail after 3 unsuccessful checks
  start_period: 40s  # Don't check for first 40 seconds
```

**States:**

1. **starting** (0-40s): Grace period, not checking
2. **healthy**: Test passed
3. **unhealthy**: Test failed 3 times
4. **starting** → **healthy** → Normal operation

### PostgreSQL Health Check

```yaml
test: ["CMD-SHELL", "pg_isready -U vendorify_user -d vendorify_db"]
```

- **Command:** `pg_isready` checks if PostgreSQL accepts connections
- **Status:** Returns 0 if ready, non-zero if not
- **Purpose:** Ensures database is initialized before app starts

### Redis Health Check

```yaml
test: ["CMD", "redis-cli", "ping"]
```

- **Command:** `redis-cli ping`
- **Expected Response:** `PONG`
- **Purpose:** Ensures Redis is accepting connections

### Checking Health Status

```bash
# View container health
docker compose ps           # Shows (healthy) or (unhealthy)

# View detailed health info
docker inspect vendorify-app | grep -A 10 '"Health"'

# View health check logs
docker compose logs app     # Shows health check results
```

---

## Performance Optimization

### Image Size Optimization

```dockerfile
FROM node:20-alpine          # 150MB base (not 400MB)
RUN apk add --no-cache       # Only add what's needed
COPY --from=builder          # Only copy compiled output
```

**Size Comparison:**
- Alpine: ~200MB
- Full Node: ~900MB+

### Build Caching Strategy

```dockerfile
# ✅ Good - cache dependencies layer
COPY package.json pnpm-lock.yaml ./
RUN pnpm install

COPY . .  # Only source code changes, dependencies still cached
RUN pnpm run build
```

**Caching benefit:**
- First build: 5-10 minutes (installs everything)
- Second build: 1-2 minutes (uses cached layers)

### Enable BuildKit for Faster Builds

```bash
DOCKER_BUILDKIT=1 docker compose up --build
```

**Benefits:**
- Parallel builds (faster)
- Better caching
- Smaller images

### Start Period Optimization

```yaml
healthcheck:
  start_period: 40s  # Time for app to fully start
```

- **Without start_period:** Health checks start immediately, might fail
- **With start_period:** Waits for app initialization

---

## Security Considerations

### Non-Root User

```dockerfile
RUN adduser --system --uid 1001 nextjs  # Create system user
USER nextjs                              # Run as this user
```

**Why important:**
- If container is compromised, attacker has limited privileges
- Can't install system packages
- Can't modify system files
- Defense-in-depth security principle

### Credentials in Environment Variables

```yaml
environment:
  DATABASE_URL: postgresql://vendorify_user:vendorify_password@postgres:5432/vendorify_db
```

**⚠️ For Development Only:**
- Passwords are visible in `docker-compose.yml`
- Acceptable for local development
- NOT acceptable for production

**Production Approach:**
```bash
# Use secrets file (Docker Swarm)
docker secret create db_password db_password.txt

# Or use environment files
docker-compose -f docker-compose.prod.yml up
```

### Network Isolation

```yaml
networks:
  - vendorify-network
```

- Services only accessible within network (by default)
- Port mapping required to expose to host
- External traffic can only reach mapped ports

---

## Troubleshooting Matrix

| Problem | Symptom | Solution |
|---------|---------|----------|
| **Docker not running** | `Cannot connect to Docker daemon` | Start Docker Desktop |
| **Port in use** | `Bind for 0.0.0.0:3000 failed` | Kill process: `lsof -i :3000 \| grep LISTEN; kill -9 <PID>` |
| **Container won't start** | `ExitCode: 1` | Check logs: `docker compose logs app` |
| **PostgreSQL unhealthy** | App can't connect to database | Wait 10s; check: `docker compose logs postgres` |
| **Redis unhealthy** | Cache errors | Check: `docker compose logs redis` |
| **Slow first build** | Build takes >5 minutes | Normal! Use BuildKit: `DOCKER_BUILDKIT=1 docker compose up --build` |
| **Stale dependencies** | `Cannot find module X` | Rebuild: `docker compose down -v && docker compose up --build` |
| **Volume not persisting** | Data lost after restart | Check: `docker volume ls` and `docker compose down -v` (deletes volumes!) |
| **Can't access app from browser** | `localhost:3000` unreachable | Verify: `docker compose ps` (should show `Up (healthy)`) |

---

## Additional Resources

- **Docker Docs:** https://docs.docker.com/
- **Docker Compose Spec:** https://docs.docker.com/compose/compose-file/
- **Next.js Docker Guide:** https://nextjs.org/docs/deployment/docker
- **Alpine Linux:** https://alpinelinux.org/ (uses only 5MB!) 
- **PostgreSQL Docker Image:** https://hub.docker.com/_/postgres
- **Redis Docker Image:** https://hub.docker.com/_/redis

---

*Created for Sprint 2.12 — February 14, 2026*
