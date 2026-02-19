# Vendorify

## 📋 Project Overview

**Vendorify** is a Next.js 13+ TypeScript web application built with a clean, scalable folder structure. This project demonstrates modern web development best practices and serves as a foundation for future feature development.

**Problem Statement (Placeholder):**
A vendor management platform that helps businesses discover and connect with service providers, streamlining vendor relationships and improving business operations.

---

## 📁 Folder Structure

```
src/
├── app/          # Next.js App Router - pages and routes
├── components/   # Reusable React components
└── lib/          # Utilities, helpers, and configurations

public/          # Static assets (images, icons, etc.)
.gitignore       # Git exclusions
package.json     # Dependencies and scripts
tsconfig.json    # TypeScript configuration
next.config.ts   # Next.js configuration
```

---

## 📖 Folder Explanations

### `src/app/`
- Contains all your routes and page components
- Uses Next.js App Router for all pages
- Each folder represents a route (e.g., `src/app/dashboard/page.tsx` creates `/dashboard`)
- Place layouts, root templates, and page components here

### `src/components/`
- Stores reusable UI components
- Keep components small and focused (single responsibility)
- Examples: Button, Header, Card, Footer, Sidebar
- Each component should handle one specific task

### `src/lib/`
- Utility functions and helper code
- API client functions and configuration
- Pure functions for data formatting and validation
- Constants and configuration values
- Should contain no React components

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18.17+ or later
- npm, yarn, pnpm, or bun package manager

### Installation

```bash
npm install
```

Or with yarn, pnpm, or bun:

```bash
yarn install
# or
pnpm install
# or
bun install
```

### Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application running.

The app will automatically reload when you make changes to your code.

### Build for Production

```bash
npm run build
npm start
```

---

## �️ Prisma ORM Setup & Database Integration

### Why Prisma?

Prisma provides **type-safe database access** with **zero boilerplate**. Instead of writing SQL queries, you get:
- ✅ **Auto-generated TypeScript types** - Catch database errors at compile time, not runtime
- ✅ **Intuitive query syntax** - Read and write queries that look like JavaScript
- ✅ **Migration management** - Version control for your database schema
- ✅ **Developer experience** - IntelliSense auto-completion in your IDE

### Setup Steps

```bash
# 1. Install Prisma and Prisma Client
npm install prisma --save-dev
npm install @prisma/client

# 2. Create your first migration
npx prisma migrate dev --name init_schema

# 3. Generate Prisma Client types
npx prisma generate

# 4. (Optional) Open Prisma Studio GUI to view database
npx prisma studio
```

### Schema Overview

Your database schema includes:

```prisma
// User model - represents app users
model User {
  id        Int     @id @default(autoincrement())
  email     String  @unique
  name      String?
  role      String  @default("USER")
  
  projects  Project[]   @relation("UserProjects")
  tasks     Task[]      @relation("TaskCreator")
  createdAt DateTime    @default(now())
  updatedAt DateTime    @updatedAt
}

// Project model - owned by users
model Project {
  id          Int     @id @default(autoincrement())
  name        String
  owner       User    @relation("UserProjects", fields: [ownerId], references: [id])
  ownerId     Int
  tasks       Task[]
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

// Task model - belongs to projects
model Task {
  id          Int       @id @default(autoincrement())
  title       String
  status      TaskStatus @default(TODO)
  project     Project   @relation(fields: [projectId], references: [id])
  projectId   Int
  assignedTo  User?     @relation("TaskAssignee", fields: [assignedToId], references: [id])
  assignedToId Int?
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
}
```

### Prisma Client Initialization

Create a singleton instance in `src/lib/prisma.ts`:

```typescript
// src/lib/prisma.ts
import { PrismaClient } from '@prisma/client';

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}
```

**Why the singleton pattern?** During development, Next.js hot-reloads files on changes. Without this pattern, each reload would create a new PrismaClient instance, exhausting your database connections.

### Using Prisma in Your App

```typescript
// src/lib/queries.ts - Server-side utilities
import { prisma } from './prisma';

export async function getUsers() {
  return await prisma.user.findMany();
}

export async function getUserProjects(userId: number) {
  return await prisma.project.findMany({
    where: { ownerId: userId },
    include: { tasks: true }
  });
}
```

Use these functions in **Server Components** or **API Routes**:

```typescript
// app/dashboard/page.tsx - Server Component
import { getUsers } from '@/lib/queries';

export default async function Dashboard() {
  const users = await getUsers();
  return <div>{/* Render users */}</div>;
}
```

### Verify Connection

Test your database connection:

```bash
# Open Prisma Studio GUI
npx prisma studio

# Or run a quick test in Terminal
node -e "const {prisma} = require('./src/lib/prisma'); prisma.user.findMany().then(u => console.log(u))"
```

### Environment Variables

Add to `.env.local`:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/database_name?schema=public"
```

### 🎓 Key Learnings: Type Safety & Developer Productivity

Prisma transforms database development:

| Without Prisma | With Prisma |
|---|---|
| Writing raw SQL | Type-safe JavaScript queries |
| Manual TypeScript interfaces | Auto-generated types |
| Runtime errors for schema mismatches | Compile-time type checking |
| Manual migration files | Version-controlled migrations |
| Guessing query results | Autocomplete in your editor |

This means **fewer bugs**, **faster development**, and **better code quality** - especially valuable when learning backend development!

---

## �📚 Key Files

| File | Purpose |
|------|---------|
| `next.config.ts` | Next.js configuration |
| `tsconfig.json` | TypeScript compiler options |
| `package.json` | Project dependencies and scripts |
| `src/app/layout.tsx` | Root layout component |
| `src/app/page.tsx` | Home page |

---

## 💡 Why This Structure?

### ✅ Clarity
- Every file has a clear, predictable location
- New developers can find code quickly
- Clear separation between UI components, routes, and utilities
- Reduced cognitive load when navigating the codebase

### ✅ Scalability
- Easy to add new pages without disrupting existing code
- Reusable components reduce code duplication
- Utility functions are centralized and easy to maintain
- Structure supports growth without major reorganization

### ✅ Team Collaboration
- Consistent naming conventions reduce confusion
- Different team members can work on different folders independently
- Clear patterns make code reviews easier
- New team members can onboard faster

---

## 🔄 Future Sprints

This foundation is ready for:
- Adding API routes and backend logic
- Building complex UI components
- Implementing authentication and user accounts
- Adding state management (Context, Redux, Zustand)
- Setting up testing frameworks
- Building admin and user dashboards
- Deploying to production

---

## 📸 Screenshot

To view your application:

1. Run `npm run dev`
2. Open [http://localhost:3000](http://localhost:3000) in your browser

---

## ✨ Code Quality & Consistency

This project uses strict TypeScript, ESLint, Prettier, and pre-commit hooks to ensure clean, consistent code.

### Quick Start

```bash
# Install quality tools
npm install --save-dev eslint prettier eslint-config-next eslint-plugin-prettier eslint-config-prettier

# Set up pre-commit hooks
npx husky-init && npm install
npm install --save-dev lint-staged
npx husky add .husky/pre-commit "npx lint-staged"
```

### Available Commands

```bash
npm run lint       # Check code for issues
npm run lint:fix   # Auto-fix lint issues
npm run format     # Auto-format all files
```

### What's Configured

- **Strict TypeScript** — Catches type errors before runtime
- **ESLint** — Enforces code quality rules (double quotes, semicolons, no unused vars)
- **Prettier** — Auto-formats code consistently
- **Pre-commit hooks** — Blocks commits with style/type errors

See [README_SPRINT2_9.md](README_SPRINT2_9.md) for detailed explanation and [TYPESCRIPT_ESLINT_SETUP.md](TYPESCRIPT_ESLINT_SETUP.md) for testing guide.

---

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs) - Next.js features and API reference
- [React Documentation](https://react.dev) - React fundamentals and best practices
- [TypeScript Handbook](https://www.typescriptlang.org/docs) - TypeScript essentials
- [Web Development Best Practices](https://developer.mozilla.org/en-US/docs/Web) - MDN Web Docs

---




### **Architecture Overview**

| Page      | Route        | Strategy | Config                      | Use Case           | Deployment Impact |
| --------- | ------------ | -------- | --------------------------- | ------------------ | ----------------- |
| About     | `/about`     | **SSG**  | `revalidate = false`        | Static content     | Pre-built in Docker |
| Dashboard | `/dashboard` | **SSR**  | `dynamic = 'force-dynamic'` | Real-time data     | Server-side in ECS |
| Vendors   | `/vendors`   | **ISR**  | `revalidate = 60`           | Occasional updates | Cached in ECS |

### 1. Static Rendering (SSG) - `/about`

**What:** Page is pre-built at deployment and served identically to all users.

**Why chosen for Vendorify:** The About page contains company info that rarely changes. SSG provides:

- Instant load times (no server computation)
- Zero server load per request
- Maximum CDN efficiency

**When data is fetched:** At build time (`next build`), before deployment.

### 2. Dynamic Rendering (SSR) - `/dashboard`

**What:** Page is rendered fresh on every request with real-time data.

**Why chosen for Vendorify:** The Dashboard shows user-specific, time-sensitive data. SSR ensures:

- Every user sees current data
- No stale information
- Personalization is possible

**When data is fetched:** On every request (server-side).

**Trade-off:** Slightly slower response time, but guaranteed freshness.

### 3. Hybrid Rendering (ISR) - `/vendors`

**What:** Page is cached and served instantly, but re-rendered in the background every N seconds.

**Why chosen for Vendorify:** The Vendor list updates occasionally but doesn't need real-time accuracy. ISR provides:

- Fast cached responses (like SSG)
- Automatic background updates (like SSR)
- Best of both worlds

**When data is fetched:**

- First request: at build time
- Subsequent: from cache
- Every 60s: background revalidation

### How Caching/Revalidation Improves Performance

| Strategy | Server Load             | Response Time | Data Freshness  |
| -------- | ----------------------- | ------------- | --------------- |
| SSG      | ~0                      | <10ms         | Build time only |
| SSR      | High (1 req = 1 render) | 50-200ms      | Always fresh    |
| ISR      | Low (1 render/60s)      | <10ms         | 60s stale max   |

### Scaling to 10x More Users

**SSR (Dashboard):**

- 10,000 users = 10,000 server renders/second
- Would need horizontal scaling, load balancing
- Database connection pooling required
- Consider moving non-critical data to ISR

**ISR (Vendors):**

- Still only ~1 render per 60 seconds
- 99.98% reduction in server load vs SSR
- Cache layer handles traffic spikes
- Ideal for scaling

**SSG (About):**

- No change needed—static files scale infinitely
- CDN handles all traffic

### **Testing the Pages**

```bash
# Local development
pnpm dev
```

Then visit:
- http://localhost:3000/about (SSG)
- http://localhost:3000/dashboard (SSR - refresh to see time change)
- http://localhost:3000/vendors (ISR)

---

## 🐳 **Docker & Local Container Setup**

### **Overview**
Docker allows you to run the entire application (Next.js app, PostgreSQL, and Redis) in isolated containers. This ensures consistency across different machines and makes local development match production environments.

---

### **What is Docker?**
Docker packages your application and its dependencies into a container—a lightweight, portable unit that runs the same way on any machine.

**Benefits:**
- ✅ Works the same on Windows, Mac, and Linux
- ✅ No "works on my machine" problems
- ✅ Easy onboarding for new developers
- ✅ Matches production environment locally
- ✅ Isolates dependencies (no conflicts between projects)

---

### **Understanding the Dockerfile**

The project uses a **multi-stage Docker build** for efficiency:

```dockerfile
Stage 1 (deps):    base image + system libs + pnpm + dependencies
                   ↓
Stage 2 (builder): copy dependencies + source code + build Next.js
                   ↓
Stage 3 (runner):  standalone build + minimal runtime + non-root user
                   ↓
Final Image:       ~200MB (vs ~1GB without optimization)
```

**Each Stage Explained:**

| Stage | Purpose | What Happens |
|-------|---------|--------------|
| **base** | Foundation | Starts with `node:20-alpine` (lightweight Node.js) |
| **deps** | Dependencies | Installs system libraries (`libc6-compat`) and pnpm packages |
| **builder** | Build | Compiles Next.js app and bundles for production |
| **runner** | Runtime | Copies only necessary files, adds non-root user for security |

**Key Features:**
- ✅ **Multi-stage build** — Only production files in final image (~200MB)
- ✅ **Alpine Linux** — Minimal base image (~40MB vs 150MB with regular Node)
- ✅ **Non-root user** — Security best practice (runs as `nextjs` user, not `root`)
- ✅ **Standalone output** — Next.js standalone server (no need for Node.js in production)
- ✅ **Health checks** — Built-in curl for monitoring container health
- ✅ **Production-ready** — Follows Docker and Next.js best practices

**Dockerfile Breakdown:**
```dockerfile
FROM node:20-alpine AS base          # Start with Node 20 on Alpine Linux
RUN apk add --no-cache libc6-compat # Add system library (required by Node)
RUN npm install -g pnpm             # Install pnpm package manager
COPY package.json pnpm-lock.yaml    # Copy dependency lock file
RUN pnpm install                    # Install dependencies
# ... continues through builder stage ...
RUN pnpm run build                  # Compile Next.js app
# ... runner stage copies only .next and public folders ...
USER nextjs                         # Switch to non-root user
EXPOSE 3000                         # Document port (doesn't publish it)
CMD ["node", "server.js"]           # Start the app
```

---

### **Understanding docker-compose.yml**

Docker Compose lets you define multiple services (app, database, cache) and start them all with one command.

The `docker-compose.yml` file defines:

#### **1. App Service (Next.js)**
```yaml
app:
  build: .                          # Build from local Dockerfile
  ports:
    - "3000:3000"                   # Port mapping: host:container
  environment:
    DATABASE_URL: postgresql://...  # Connection string for PostgreSQL
    REDIS_URL: redis://redis:6379   # Connection string for Redis
  depends_on:
    postgres:
      condition: service_healthy    # Wait for Postgres to be ready
```

**What this does:**
- Builds the image from your local Dockerfile
- Exposes port 3000 so you can access http://localhost:3000
- Waits for database and cache before starting
- Provides connection strings using service names (`postgres:5432`, `redis:6379`)

#### **2. PostgreSQL Service**
```yaml
postgres:
  image: postgres:15-alpine         # Use official PostgreSQL image
  environment:
    POSTGRES_USER: vendorify_user   # Database username
    POSTGRES_PASSWORD: vendorify_password  # Database password
    POSTGRES_DB: vendorify_db       # Database name
  ports:
    - "5432:5432"                   # Access database from host
  volumes:
    - postgres_data:/var/lib/postgresql/data  # Persistent storage
```

**What this does:**
- Runs PostgreSQL 15 in a container
- Creates a database named `vendorify_db`
- Saves data even if container stops (using named volume)
- Accessible at `postgres:5432` from other containers, or `localhost:5432` from your machine

#### **3. Redis Service**
```yaml
redis:
  image: redis:7-alpine             # Use official Redis image
  command: redis-server --appendonly yes  # Enable persistence
  ports:
    - "6379:6379"                   # Access Redis from host
  volumes:
    - redis_data:/data              # Persistent storage
```

**What this does:**
- Runs Redis 7 in a container
- Enables data persistence (`appendonly yes`)
- Accessible at `redis:6379` from other containers, or `localhost:6379` from your machine

#### **4. Network & Volumes**
```yaml
networks:
  vendorify-network:
    driver: bridge                  # Services discover each other by name
volumes:
  postgres_data:                    # PostgreSQL persists data here
  redis_data:                       # Redis persists data here
```

**What this does:**
- **Bridge network** — Allows containers to communicate using service names (e.g., `postgres` instead of IP address)
- **Named volumes** — Data persists on your host machine even if containers are deleted

---

### **Quick Start: Running with Docker Compose**

#### **Prerequisites**
- Install [Docker Desktop](https://www.docker.com/products/docker-desktop) (includes Docker and Docker Compose)
- Make sure Docker is running

#### **Step 1: Start All Services**
```bash
docker compose up --build
```

**What happens:**
- Builds your Next.js image
- Starts PostgreSQL container and waits for it to be healthy
- Starts Redis container and waits for it to be healthy
- Starts your Next.js app
- Displays logs from all containers

**Output example:**
```
vendorify-postgres | PostgreSQL Database Server started
vendorify-redis    | Redis server ready
vendorify-app      | ▲ Next.js started on 0.0.0.0:3000
```

#### **Step 2: Access the Application**
Open your browser and go to **http://localhost:3000**

#### **Step 3: Verify Services**
Open a **new terminal** and check that everything is running:
```bash
docker compose ps
```

**Expected output:**
```
NAME                COMMAND              STATUS         PORTS
vendorify-app       node server.js       Up (healthy)   0.0.0.0:3000->3000/tcp
vendorify-postgres  postgres             Up (healthy)   0.0.0.0:5432->5432/tcp
vendorify-redis     redis-server         Up (healthy)   0.0.0.0:6379->6379/tcp
```

#### **Step 4: Stop All Containers**
```bash
docker compose down
```

**Options:**
```bash
docker compose down                 # Stop and remove containers (volumes persist)
docker compose down -v              # Stop containers AND delete volumes (clears all data!)
docker compose stop                 # Just stop (don't remove)
docker compose restart              # Restart running containers
```

---

### **Testing Service Connectivity**

#### **Test PostgreSQL Connection**
```bash
docker compose exec postgres psql -U vendorify_user -d vendorify_db -c "SELECT NOW();"
```

**Expected output:**
```
              now
-------------------------------
 2024-02-14 12:34:56.789+00
```

#### **Test Redis Connection**
```bash
docker compose exec redis redis-cli ping
```

**Expected output:**
```
PONG
```

#### **Test App Connection**
```bash
# From your host machine
curl http://localhost:3000

# From inside the app container
docker compose exec app curl http://localhost:3000
```

---

### **Common Issues & Solutions**

#### **❌ Error: "Cannot connect to Docker daemon"**
**Problem:** Docker isn't running

**Solution:**
- Open Docker Desktop application
- Wait for it to fully start (may take 30 seconds)
- Try again: `docker compose up --build`

---

#### **❌ Error: "Port 3000 is already in use"**
**Problem:** Another application is using port 3000

**Identify the process:**
```bash
# MacOS/Linux
lsof -i :3000

# Windows (PowerShell)
netstat -ano | findstr :3000
```

**Solutions:**
1. **Stop the other application** (e.g., if `npm run dev` is running: `Ctrl+C`)
2. **Or change the port** in `docker-compose.yml`:
   ```yaml
   ports:
     - "3001:3000"  # Use 3001 instead
   ```
   Then access http://localhost:3001

3. **Or kill the process:**
   ```bash
   # MacOS/Linux
   kill -9 <PID>
   
   # Windows (PowerShell as admin)
   Stop-Process -Id <PID> -Force
   ```

---

#### **❌ Error: "postgres service is unhealthy"**
**Problem:** PostgreSQL container couldn't start

**Debug:**
```bash
docker compose logs postgres
```

**Common causes:**
- Previous container didn't clean up properly
- Volume corruption

**Solution:**
```bash
# Remove old containers and volumes
docker compose down -v

# Restart fresh
docker compose up --build
```

---

#### **❌ Error: "Cannot find module" or build errors**
**Problem:** Dependencies changed or cache is stale

**Solution:**
```bash
# Force rebuild without using cache
docker compose up --build --no-cache
```

Or clean everything:
```bash
# Delete all Docker images and start fresh
docker compose down -v
docker image rm vendorify-app
docker compose up --build
```

---

#### **❌ Slow first build (takes 5+ minutes)**
**Problem:** Docker is downloading and installing everything for the first time

**Why it's slow:**
- Downloading Node.js 20 Alpine image (~200MB)
- Installing pnpm and all npm dependencies
- Compiling Next.js app

**Subsequent builds are much faster** (uses cache)

**Speed up by using BuildKit:**
```bash
# Enable Docker BuildKit (builds faster, more efficient)
DOCKER_BUILDKIT=1 docker compose up --build
```

---

#### **❌ Database connection errors at startup**
**Problem:** App starts before PostgreSQL is ready

**Solution:** It's already handled! The `depends_on` section waits for health checks:
```yaml
depends_on:
  postgres:
    condition: service_healthy
```

But if you still get errors:
- Wait a few seconds and hard-refresh your browser (Cmd+Shift+R or Ctrl+Shift+R)
- Check logs: `docker compose logs app`

---

### **Useful Docker Compose Commands**

```bash
# Start all services
docker compose up

# Start in background
docker compose up -d

# Start and rebuild images
docker compose up --build

# View logs from all services
docker compose logs

# View logs from one service
docker compose logs app
docker compose logs postgres
docker compose logs redis

# Follow logs in real-time
docker compose logs -f

# Stop all containers
docker compose stop

# Stop and remove containers
docker compose down

# Stop and remove containers + volumes (DELETES DATA!)
docker compose down -v

# Execute a command in a running container
docker compose exec app npm run build
docker compose exec postgres psql -U vendorify_user -d vendorify_db

# Restart a service
docker compose restart app

# View container status
docker compose ps
```

---

### **Persisting Data**

Data in named volumes survives container restarts:
```bash
docker compose stop      # Containers stop, data persists
docker compose start     # Containers restart with same data
```

But data is deleted when you run:
```bash
docker compose down -v   # ⚠️ This deletes data!
```

---

### **Development Workflow with Docker**

#### **For Beginners: Just Use Docker**
```bash
docker compose up --build   # One command!
# Access app at http://localhost:3000
```

#### **Enable Hot Reload (optional)**
If you want code changes to reload automatically inside Docker:

Add to `docker-compose.yml` under the `app` service:
```yaml
volumes:
  - .:/app                  # Mount current directory
  - /app/node_modules       # Except node_modules
```

Then restart:
```bash
docker compose up --build
```

Now when you edit files, the app reloads automatically.

#### **Without Docker (Local npm)**
If you prefer running locally without Docker:
```bash
pnpm install
pnpm run dev
```

But then you need PostgreSQL and Redis running locally too. Docker Compose is easier!

---

### **Multi-Stage Docker Build**
The application uses an optimized multi-stage Docker build:

```dockerfile
# Development dependencies → Production build → Runtime image
Node.js 20 Alpine → Next.js standalone → Minimal production container
```

**Features:**
- ✅ Multi-stage build for minimal image size
- ✅ Non-root user for security
- ✅ Health checks with curl
- ✅ Optimized for Next.js standalone output
- ✅ Production-ready configuration

### **Local Docker Testing**
```bash
# Build the image
docker build -t vendorify-app .

# Run locally
docker run -p 3000:3000 vendorify-app
```

---

## 🗄️ **Database Schema Design**

### **Overview**
The application uses PostgreSQL as the primary database, managed through Prisma ORM. The schema is normalized (3NF compliant) to prevent data redundancy and maintain referential integrity.

### **Core Entities & Relationships**

```
User (1) ──→ (N) Project
      ↓
   Creates/Assigns (N) Task
      ↓
   Authors (N) Comment
```

| Entity | Purpose | Key Fields |
|--------|---------|-----------|
| **User** | System users and accounts | `id`, `email` (unique), `name`, `role` |
| **Project** | Container for tasks | `id`, `name`, `ownerId`, `description` |
| **Task** | Work items with status | `id`, `title`, `status` (enum), `projectId` |
| **Comment** | Discussion on tasks | `id`, `body`, `taskId` |

### **Key Constraints & Features**

- **Primary Keys:** `@id @default(autoincrement())` on all models
- **Unique Constraints:** `email` on `User`; composite `(ownerId, name)` on `Project`
- **Foreign Keys:** Proper relations with `onDelete: Cascade` (owned data) and `onDelete: SetNull` (optional references)
- **Enums:** `TaskStatus` (TODO, IN_PROGRESS, DONE, BLOCKED) for type-safe status tracking
- **Timestamps:** `createdAt` (auto-set) and `updatedAt` (auto-updated) on all models
- **Indexes:** Composite index on `(projectId, status)` for fast task filtering; individual indexes on foreign keys

### **Normalization: 1NF, 2NF, 3NF**

✅ **First Normal Form (1NF):** All columns contain atomic, indivisible values. No arrays or repeating groups.  
✅ **Second Normal Form (2NF):** Single-column primary keys eliminate partial dependencies.  
✅ **Third Normal Form (3NF):** No transitive dependencies; related data stored in separate tables, not denormalized.

### **Why This Schema Scales**

- **Proper Indexing:** Composite index on common query filters (projectId + status)
- **No Denormalization:** Single source of truth; no stale copies of data
- **Referential Integrity:** Foreign keys enforce correctness; migrations are safe
- **Type Safety:** Enums are compact and indexable; Prisma generates TypeScript types

### **Most Common Queries**

```typescript
// List all projects for a user
SELECT * FROM Project WHERE ownerId = ?

// Get tasks by project and status (paginated)
SELECT * FROM Task WHERE projectId = ? AND status = ? 
ORDER BY priority DESC LIMIT ? OFFSET ?

// Get tasks assigned to a user
SELECT * FROM Task WHERE assignedToId = ?

// Task detail with all related data (comments, creator, assignee)
SELECT * FROM Task 
JOIN Comment ON Comment.taskId = Task.id
JOIN User creator ON Task.creatorId = creator.id
JOIN User assignee ON Task.assignedToId = assignee.id
WHERE Task.id = ?
```

### **Getting Started with Prisma**

```bash
# 1. Install Prisma and client
pnpm add -D prisma @prisma/client

# 2. Initialize the schema (creates tables in PostgreSQL)
npx prisma migrate dev --name init_schema

# 3. Generate TypeScript types
npx prisma generate

# 4. (Optional) Seed with test data
npx prisma db seed

# 5. View/edit data visually
npx prisma studio
```

### **Schema Location & Documentation**

| File | Purpose |
|------|---------|
| [`prisma/schema.prisma`](prisma/schema.prisma) | Complete data model |
| [`prisma/seed.ts`](prisma/seed.ts) | Initial data population |
| [`SPRINT2_13_DATABASE_SCHEMA.md`](SPRINT2_13_DATABASE_SCHEMA.md) | Full normalization & design rationale |

### **Mistakes to Avoid**

- ❌ Storing relational data as JSON (use proper foreign keys)
- ❌ Skipping foreign keys (no referential integrity)
- ❌ Unnecessary many-to-many tables for simple 1:N relationships
- ❌ Duplicating user/project data across rows (denormalization)
- ❌ Using boolean for multi-state fields (use `enum` instead)

---

## ☁️ **AWS Infrastructure**

### **ECS Configuration**
- **Cluster:** `vendorify-cluster`
- **Service:** `vendorify-service` 
- **Task Definition:** `vendorify-task`
- **Resources:** 0.5 vCPU, 1GB Memory
- **Network:** VPC with Fargate launch type

### **Container Specifications**
- **Image:** `612812184105.dkr.ecr.us-east-1.amazonaws.com/vendorify-app:latest`
- **Port:** 3000 (HTTP)
- **Health Check:** HTTP endpoint monitoring
- **Logging:** CloudWatch Logs (`/ecs/vendorify-app`)
- **Environment:** Production configuration with NODE_ENV=production

### **CI/CD Pipeline**
**GitHub Actions workflow** (`.github/workflows/deploy.yml`):

**Triggers:** Push to `main` or `deploy` branches

**Steps:**
1. **Build & Test**
   - Install dependencies with pnpm
   - Run ESLint for code quality
   - Build Next.js application

2. **Deploy** (production branches only)
   - Configure AWS credentials
   - Login to Amazon ECR
   - Build and tag Docker image
   - Push to ECR registry
   - Update ECS task definition
   - Deploy new service revision
   - Wait for service stability

### **Required GitHub Secrets**
```bash
AWS_ACCESS_KEY_ID=your-aws-access-key
AWS_SECRET_ACCESS_KEY=your-aws-secret-key
```

---

## 🔧 **Environment-Aware Builds & Secrets Management**

This project supports per-environment configuration files and safe secret injection at build/runtime.

### **Environment Files**
The following files are included with placeholder values only:
- `.env.development` - Local development variables
- `.env.staging` - Staging environment configuration  
- `.env.production` - Production environment configuration
- `.env.example` - Template of required variables

### **Build Commands**
```bash
pnpm build:staging     # Build with staging config
pnpm build:production  # Build with production config
```

### **Secrets Management in Production**
**🚨 No secrets committed to Git** - Real secrets are injected via:

**AWS Production:**
- **GitHub Actions:** Repository secrets for CI/CD
- **AWS Parameter Store:** Runtime secrets via ECS task definition
- **Environment Variables:** Injected at container startup

**Security Best Practices:**
- ✅ Secrets stored in AWS Parameter Store/Secrets Manager
- ✅ IAM roles for service-to-service authentication  
- ✅ No hardcoded credentials in code or Docker images
- ✅ Least-privilege access patterns

---

## 📚 **Learn More**

### **Next.js Resources**
- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
- [Next.js GitHub repository](https://github.com/vercel/next.js) - feedback and contributions welcome!

### **AWS Resources**
- [ECS Documentation](https://docs.aws.amazon.com/ecs/) - container orchestration
- [Fargate Guide](https://docs.aws.amazon.com/AmazonECS/latest/userguide/what-is-fargate.html) - serverless containers
- [ECR Documentation](https://docs.aws.amazon.com/ecr/) - container registry

### **DevOps Resources**
- [GitHub Actions](https://docs.github.com/en/actions) - CI/CD automation
- [Docker Best Practices](https://docs.docker.com/develop/dev-best-practices/) - containerization guides

---

## 🚀 **Deployment Status**

**Current Environment:** Production  
**Last Deployed:** Automatic via GitHub Actions  
**Health Status:** Monitored via ECS health checks  
**Logs:** Available in CloudWatch (`/ecs/vendorify-app`)

**To deploy changes:**
1. Push to `main` or `deploy` branch
2. GitHub Actions automatically builds and deploys
3. ECS performs rolling deployment with zero downtime
4. Health checks ensure successful deployment

---

*Built with ❤️ using Next.js, Docker, and AWS ECS*

---

## Environment Variable Management

Purpose
- Use environment variables to keep configuration and secrets out of source code.

Server-side vs Client-side
- Server-side variables (example: `DATABASE_URL`) must never be exposed to the browser. They are available only to server code and should be set without the `NEXT_PUBLIC_` prefix.
- Client-side variables (example: `NEXT_PUBLIC_API_BASE_URL`) must be prefixed with `NEXT_PUBLIC_` so Next.js includes them in browser bundles.

Quick examples
- Safe server-side usage (server components, API routes, or server-only modules):

```ts
const dbUrl = process.env.DATABASE_URL;
```

- Safe client-side usage (client components or browser code):

```ts
const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
```

Why keep server secrets out of client components
- Anything used in client components is included in the bundle and can be inspected by anyone. Server secrets must never be put into client code to avoid leaks and security breaches.

What happens if you forget `NEXT_PUBLIC_`
- If you omit the `NEXT_PUBLIC_` prefix for a client-facing variable, Next.js will not expose it to the browser. `process.env.VAR_NAME` will be `undefined` in client code.

Runtime vs Build-time
- Next.js loads `.env` files at build and at runtime (depending on hosting). Variables used in client bundles are baked in at build time. Keep this in mind if changing env values after deployment — you may need to rebuild.

How to replicate locally
1. Copy the template: `cp .env.example .env.local`
2. Edit `.env.local` and fill in real values (do not commit `.env.local`).

Security best practices (student-friendly)
- Never commit `.env.local` or real secrets to the repo.
- Use `.env.example` to document required variables without sharing secrets.
- For production, inject secrets via your hosting provider's secure environment settings.

Common mistakes to avoid
- Putting `DATABASE_URL` or other secrets in client components.
- Forgetting the `NEXT_PUBLIC_` prefix for variables you expect to use in the browser.
- Committing `.env.local` or other secret files to git (use `.gitignore`).

Validation checklist
- `.env.local` is not committed and remains listed in `.gitignore`.
- `.env.example` exists and documents required variables.
- Server-only secrets (like `DATABASE_URL`) are not used in client code.
- Client variables use the `NEXT_PUBLIC_` prefix when they must be available in the browser.

Short explanation
- Keep secrets on the server and public configuration in `NEXT_PUBLIC_` variables. Use `.env.example` to share what needs to be set, and keep `.env.local` out of source control.

---

## 👥 Team Workflow & PR Process

### 🌳 Branch Naming Strategy

We use **consistent branch names** to keep our workflow organized and clear. This helps everyone understand what each branch is doing without confusion.

**Branch Types:**

| Type | Format | Example |
|------|--------|---------|
| **Feature** | `feature/<feature-name>` | `feature/user-authentication` |
| **Bug Fix** | `fix/<bug-name>` | `fix/navbar-responsive-layout` |
| **Maintenance** | `chore/<task-name>` | `chore/update-dependencies` |
| **Documentation** | `docs/<update-name>` | `docs/readme-setup` |

**Branch Naming Rules:**
- ✅ Use **lowercase** (not `Feature/userAuth`)
- ✅ Use **hyphens** to separate words (not underscores)
- ✅ Keep it **descriptive but concise** (30-50 characters)
- ❌ Don't commit directly to `main` — always use a branch

**Quick Start:**
```bash
# Create your feature branch
git checkout -b feature/vendor-search

# Work, commit, and push
git add .
git commit -m "feat: add vendor search filter"
git push origin feature/vendor-search

# Create Pull Request on GitHub
# Request review from a teammate
# After approval, merge to main
```

For more details, see [Branch Naming Conventions](.github/BRANCH_NAMING_CONVENTIONS.md).

---

### 📋 Pull Request Template

Every PR should include:

1. **Summary** — What does this PR do?
2. **Changes Made** — What specifically changed?
3. **Screenshots** — Visual evidence (for UI changes)
4. **Checklist** — Code quality, testing, security verification
5. **Related Issue** — Link to GitHub issue (if applicable)

The PR template is automatically loaded when you create a new PR. Just fill it out honestly — this helps reviewers understand your work.

**What the checklist includes:**
- ✅ ESLint and Prettier pass
- ✅ No console errors
- ✅ Code follows folder structure (`src/components/`, `src/lib/`, `src/app/`)
- ✅ No sensitive data exposed
- ✅ Branch name follows conventions
- ✅ TypeScript builds without errors

See [Pull Request Template](.github/pull_request_template.md) for details.

---

### 👀 Code Review Checklist

**As a Reviewer:**
- ✅ Code is readable and follows team standards
- ✅ No ESLint errors or TypeScript issues
- ✅ No hardcoded secrets or sensitive data
- ✅ Tests work locally (`npm run dev`)
- ✅ Changes don't break existing features
- ✅ Comments are kind and constructive

**As a PR Author:**
- 🤝 Respond to feedback respectfully
- 🔧 Make requested changes promptly
- ❓ Ask questions if feedback is unclear
- ✅ Self-review before requesting review

**Code Review Best Practices:**
- Be kind and respectful — assume good intent
- Ask questions instead of making demands
- Suggest alternatives if you see better approaches
- Praise good work — specific compliments help learning

See [Code Review Checklist](.github/CODE_REVIEW_CHECKLIST.md) for the complete review guide.

---

### 🔒 Branch Protection & Merging

**To protect `main` branch:**

Protected branches prevent accidental changes and ensure quality gates. Our `main` branch requires:

- ✅ **At least 1 code review approval** — Two sets of eyes catch mistakes
- ✅ **All automated checks pass** — ESLint and TypeScript must succeed
- ✅ **Branch is up to date** — Must be updated with latest `main`
- ❌ **No direct pushes allowed** — All changes go through PRs

**Merging a PR:**

1. All checks pass ✓
2. At least 1 teammate approves ✓
3. Branch is up to date ✓
4. Click **"Merge pull request"** on GitHub
5. Branch is automatically deleted

**If your PR is "out of date":**
- GitHub shows: "This branch is out of date"
- Click "Update branch" button to sync with latest `main`
- Then merge normally

See [Branch Protection Setup](.github/BRANCH_PROTECTION_SETUP.md) for detailed setup instructions.

---

### 💡 Why This Workflow Improves Quality & Collaboration

#### **Clarity** 🎯
- Branch names tell everyone what's being worked on
- PR descriptions explain why changes were made
- No confusion about which feature is which

#### **Collaboration** 👥
- Multiple team members work on different features simultaneously
- Code reviews share knowledge across the team
- Reviewers learn from each other's approaches
- New members onboard faster with clear patterns

#### **Quality** ✨
- Code reviews catch bugs before production
- Automated checks ensure code standards are met
- Protected branches prevent accidental mistakes
- ESLint/Prettier enforce consistent style automatically

#### **Maintainability** 🔧
- Git history clearly shows who did what and why
- Branch names make it easy to find related changes
- PR history documents all decisions and discussions
- Easier to revert changes if needed (with context)

#### **Safety** 🛡️
- Sensitive data never reaches `main` because of reviews
- Broken code can't merge without passing checks
- Changes are tracked and can be audited
- Everyone has a shared understanding of code standards

---

### 📚 Related Documentation

- [Branch Naming Conventions](.github/BRANCH_NAMING_CONVENTIONS.md) — Detailed branch types and examples
- [Pull Request Template](.github/pull_request_template.md) — Sections to include in every PR
- [Code Review Checklist](.github/CODE_REVIEW_CHECKLIST.md) — What to verify when reviewing
- [Branch Protection Setup](.github/BRANCH_PROTECTION_SETUP.md) — How to configure GitHub protection rules

---
