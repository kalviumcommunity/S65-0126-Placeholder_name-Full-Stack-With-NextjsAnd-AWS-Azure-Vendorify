# 🗄️ Sprint 2.13: PostgreSQL Schema Design with Prisma ORM

**Status:** ✅ Complete  
**Date:** February 18, 2026  
**Project:** Next.js 13+ with TypeScript + PostgreSQL + Prisma  

---

## 📋 Table of Contents

1. [Core Entities & Relationships](#core-entities--relationships)
2. [Prisma Schema Overview](#prisma-schema-overview)
3. [Normalization (1NF, 2NF, 3NF)](#normalization-1nf-2nf-3nf)
4. [Migration Commands](#migration-commands)
5. [Seed Script](#seed-script)
6. [Setup Instructions](#setup-instructions)
7. [Common Queries](#common-queries)
8. [Mistakes to Avoid](#mistakes-to-avoid)

---

## Core Entities & Relationships

### Entity Diagram

```
┌─────────┐         ┌──────────┐         ┌──────────┐
│  User   │◄───1:N──│ Project  │◄───1:N──│   Task   │
│         │         │          │         │          │
│ • id    │         │ • id     │         │ • id     │
│ • email │         │ • name   │         │ • title  │
│ • name  │         │ • owner  │         │ • status │
│         │         │          │         │          │
└─────────┘         └──────────┘         └──────────┘
    ▲                                         ▲
    │ 1:N (creator)                          │
    │ 1:N (assignedTo)                       │ 1:N
    │ 1:N (author)                           │
    │                                    ┌────────────┐
    └────────────────────────────────────│  Comment   │
                                         │            │
                                         │ • id       │
                                         │ • body     │
                                         │            │
                                         └────────────┘
```

### Entities Description

| Entity | Purpose | Key Fields | Relationships |
|--------|---------|-----------|--------------|
| **User** | Represents system users | `id`, `email` (unique), `name`, `hashedPassword`, `role` | Owns `Project`s; Creates/Assigns `Task`s; Authors `Comment`s |
| **Project** | Container for tasks | `id`, `name`, `description`, `ownerId` | Owned by `User`; Contains `Task`s; Composite unique on `(ownerId, name)` |
| **Task** | Individual work items | `id`, `title`, `description`, `status` (enum), `projectId`, `creatorId`, `assignedToId` | Belongs to `Project`; Has `Comment`s; Linked to `User` (creator/assignee) |
| **Comment** | Discussion on tasks | `id`, `body`, `taskId`, `authorId` | Belongs to `Task`; Authored by `User` |

---

## Prisma Schema Overview

**File:** `prisma/schema.prisma`

### Complete Schema

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

enum TaskStatus {
  TODO
  IN_PROGRESS
  DONE
  BLOCKED
}

model User {
  id             Int      @id @default(autoincrement())
  email          String   @unique
  name           String?
  hashedPassword String?
  role           String   @default("USER")
  createdAt      DateTime @default(now())
  updatedAt      DateTime @updatedAt

  projects       Project[]   @relation("UserProjects")
  createdTasks   Task[]      @relation("TaskCreator")
  assignedTasks  Task[]      @relation("TaskAssignee")
  comments       Comment[]

  @@index([email])
}

model Project {
  id          Int      @id @default(autoincrement())
  name        String
  description String?
  ownerId     Int
  owner       User     @relation("UserProjects", fields: [ownerId], references: [id], onDelete: Cascade)
  tasks       Task[]

  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  @@index([ownerId])
  @@unique([ownerId, name])
}

model Task {
  id           Int        @id @default(autoincrement())
  title        String
  description  String?
  status       TaskStatus @default(TODO)
  priority     Int        @default(0)
  projectId    Int
  project      Project    @relation(fields: [projectId], references: [id], onDelete: Cascade)

  creatorId    Int?
  creator      User?      @relation("TaskCreator", fields: [creatorId], references: [id], onDelete: SetNull)

  assignedToId Int?
  assignedTo   User?      @relation("TaskAssignee", fields: [assignedToId], references: [id], onDelete: SetNull)

  comments     Comment[]

  createdAt    DateTime   @default(now())
  updatedAt    DateTime   @updatedAt

  @@index([projectId, status])
  @@index([assignedToId])
}

model Comment {
  id        Int      @id @default(autoincrement())
  body      String
  taskId    Int
  task      Task     @relation(fields: [taskId], references: [id], onDelete: Cascade)
  authorId  Int?
  author    User?    @relation(fields: [authorId], references: [id], onDelete: SetNull)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([taskId])
}
```

### Key Features

| Feature | Implementation | Reason |
|---------|----------------|--------|
| **Primary Keys** | `@id @default(autoincrement())` on all models | Unique identifier per row; auto-generated for developer convenience |
| **Unique Constraints** | `@unique` on `email`; composite `@@unique([ownerId, name])` on `Project` | Prevent duplicate accounts; allow project names only unique per owner (different users can have projects with same name) |
| **Foreign Keys** | `@relation(fields: [ownerId], references: [id])` | Enforce referential integrity at DB level |
| **Timestamps** | `@default(now())` on `createdAt`; `@updatedAt` on `updatedAt` | Automatic tracking; updated automatically by Prisma |
| **Cascading Deletes** | `onDelete: Cascade` for `Project.owner` and `Task.project` | Deleting a user/project removes related projects/tasks automatically |
| **Soft Reference** | `onDelete: SetNull` for `creator` and `assignedTo` on `Task` | Preserve task history even if user is deleted; nullable fields store `NULL` on deletion |
| **Enums** | `enum TaskStatus { TODO, IN_PROGRESS, DONE, BLOCKED }` | Enforce allowed values; compact in DB; indexable |
| **Indexes** | `@@index([email])`, `@@index([projectId, status])`, `@@index([assignedToId])` | Speed up common queries without overhead on inserts |

---

## Normalization (1NF, 2NF, 3NF)

### First Normal Form (1NF)
**Definition:** Every attribute contains only atomic (indivisible) values; no repeating groups.

✅ **Satisfied:**
- All columns store single scalar values (`email`, `title`, `status`, `priority`).
- No array/list columns (e.g., no `taskIds` array in `Project`).
- No JSON nested structures for relational data.
- Task status is stored as a single `enum` value, not a comma-separated string.

```sql
-- ✅ 1NF compliant
SELECT title, status FROM Task;
-- Returns: ("Task 1", "TODO"), ("Task 2", "IN_PROGRESS")

-- ❌ Would violate 1NF
SELECT title, tags FROM Task;  -- if tags was "bug,urgent" (repeating group)
```

---

### Second Normal Form (2NF)
**Definition:** Must be in 1NF, AND every non-key attribute must depend on the *entire* primary key (no partial dependencies).

✅ **Satisfied:**
- All models use a single-column primary key (`id`).
- When there is a single primary key, 2NF is automatically satisfied (no partial dependencies possible).
- Example: In `Task`, the `title` depends on the entire `Task.id` (primary key), not on a subset.

```sql
-- ✅ 2NF: createdAt depends on entire Task.id
SELECT id, title, createdAt FROM Task;

-- Would violate 2NF (if Project had composite PK):
-- If Project had PK = (ownerId, name), and a column "ownerEmail" 
-- that depends only on ownerId (not the full key), that would be 2NF violation.
-- Our design avoids this by having separate id column.
```

---

### Third Normal Form (3NF)
**Definition:** Must be in 2NF, AND must have no transitive dependencies (non-key attributes depend only on the primary key, not on other non-key attributes).

✅ **Satisfied:**
- No column contains derived or computed data from other non-key columns.
- Related data is stored in separate tables, not denormalized.

| Table | Column | Depends On | Why 3NF |
|-------|--------|-----------|---------|
| `User` | `email` | PK(`id`) | ✅ Non-key attribute depends only on primary key |
| `Project` | `ownerId` | PK(`id`) via FK | ✅ Foreign key references primary key; no transitive dependency |
| `Task` | `status` | PK(`id`) | ✅ Enum status is direct property of task, not derived from user/project |
| `Comment` | `body` | PK(`id`) | ✅ Comment text is direct property, not copied from task |

❌ **What would violate 3NF:**
```prisma
// BAD: Stores owner's email in Project (transitive dependency)
model Project {
  id           Int
  name         String
  ownerId      Int
  owner        User     @relation(...)
  ownerEmail   String   // ❌ VIOLATION: ownerEmail depends on ownerId (non-key), not on id
}

// CORRECT: Store only ownerId; fetch ownerEmail through User relation
model Project {
  id           Int
  name         String
  ownerId      Int
  owner        User     @relation(...)  // ✅ Access owner.email via relation
}
```

### Redundancy Avoided

| What We Avoided | How | Benefit |
|-----------------|-----|---------|
| Duplicating user data in `Project` | Store `ownerId` FK; access user via `.owner` relation | Single source of truth; no update anomalies |
| Storing task IDs as arrays | Use reverse relation `Project.tasks` | Automatic via Prisma; no manual list maintenance |
| Denormalizing status labels | Use `enum TaskStatus` instead of string labels | Type-safe; compact; no duplicate strings across rows |
| Copying timestamps | Use `@default(now())` and `@updatedAt` | Single definition; automatic updates |
| Storing project summary in `User` | No denormalized project counts | Query aggregates when needed; no stale counts |

---

## Migration Commands

### 1. Initialize the Database Schema

```bash
npx prisma migrate dev --name init_schema
```

**What it does:**
- Compares current `prisma/schema.prisma` with existing database.
- Creates a new SQL migration file in `prisma/migrations/[timestamp]_init_schema/migration.sql`.
- Runs the migration against the database (connects via `DATABASE_URL`).
- Updates `_prisma_migrations` table to track applied migrations.
- Generates/updates Prisma Client code.

**Output:**
```
✔ Enter a name for the new migration: › init_schema
✔ Your database has been created at postgresql://vendorify_user:***@localhost:5432/vendorify_db

✔ Prisma Migrate applied the following migration(s):

migrations/
  └─ 20260218_init_schema/
    └─ migration.sql

Your database is now in sync with your schema. ✅
```

---

### 2. Generate Prisma Client

```bash
npx prisma generate
```

**What it does:**
- Reads `prisma/schema.prisma`.
- Generates TypeScript types and Prisma Client (usually in `node_modules/.prisma/client`).
- Creates type hints for your code (autocomplete, type safety).

**When to run:**
- Automatically after `migrate dev`.
- Manually if you edit `schema.prisma` without running migration.
- In CI/CD pipelines before building.

**Typical output:**
```
✔ Generated Prisma Client (x.x.x) to ./node_modules/.prisma/client in XXms
```

---

### 3. Open Prisma Studio

```bash
npx prisma studio
```

**What it does:**
- Launches a web-based DB admin GUI on `http://localhost:5555`.
- Browse/edit/delete records visually.
- Test queries interactively.

**Use cases:**
- Verify seed script worked.
- Manually add test data.
- Quick debugging without SQL CLI.
- Delete test data before deployment.

**Stop by:** Pressing `Ctrl+C` in terminal.

---

### Migration Workflow (Step-by-Step)

```bash
# 1. Update schema.prisma with new models/fields
# 2. Run migration
npx prisma migrate dev --name <descriptive_name>

# 3. Verify changes in Prisma Studio
npx prisma studio

# 4. Seed if needed (see Seed Script section)
npx prisma db seed

# 5. Done! Your types are auto-generated
```

---

## Seed Script

**File:** `prisma/seed.ts`

### Purpose
Populate the database with initial/test data (users, projects, tasks).

### Features
- Creates 1 user (`alice@example.com`)
- Creates 1 project owned by the user
- Creates 2 tasks linked to the project (one assigned, one unassigned)
- Logs progress with emojis for clarity
- Gracefully handles errors

### Complete Script

```typescript
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // 1. Create a user
  const user = await prisma.user.create({
    data: {
      email: "alice@example.com",
      name: "Alice Example",
      role: "USER",
    },
  });
  console.log("✅ User created:", user.email);

  // 2. Create a project owned by the user
  const project = await prisma.project.create({
    data: {
      name: "Demo Project",
      description: "A seeded demo project to explore the schema",
      ownerId: user.id,
    },
  });
  console.log("✅ Project created:", project.name);

  // 3. Create 2 tasks linked to the project
  const tasks = await prisma.task.createMany({
    data: [
      {
        title: "Initialize repository",
        description: "Set up Git repo, add README, and basic CI/CD tooling",
        projectId: project.id,
        creatorId: user.id,
        assignedToId: user.id,
        status: "TODO",
        priority: 1,
      },
      {
        title: "Add authentication",
        description: "Implement user login with JWT and secure password hashing",
        projectId: project.id,
        creatorId: user.id,
        // Intentionally not assigned to show that assignedToId can be null
        status: "TODO",
        priority: 2,
      },
    ],
  });
  console.log(`✅ ${tasks.count} tasks created`);

  console.log("🎉 Seed completed successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
```

---

## Setup Instructions

### Prerequisites
- Docker running with PostgreSQL container (from Sprint 2.12).
- `DATABASE_URL` env var pointing to Postgres (e.g., `postgresql://vendorify_user:vendorify_password@postgres:5432/vendorify_db`).
- `pnpm` installed globally or via `npm i -g pnpm`.

### Step 1: Install Prisma

```bash
pnpm add -D prisma @prisma/client
```

---

### Step 2: Create `prisma/schema.prisma`

Copy the schema from [Schema Overview](#prisma-schema-overview) into `prisma/schema.prisma`.

---

### Step 3: Initialize Migrations

```bash
npx prisma migrate dev --name init_schema
```

Prisma will:
- Connect to your DB via `DATABASE_URL`.
- Create tables (`user`, `project`, `task`, `comment`).
- Generate Prisma Client types.

---

### Step 4: (Optional) Add Seed Script

Copy `prisma/seed.ts` from [Seed Script](#seed-script) section into your project.

---

### Step 5: Configure `package.json` to Auto-Seed

Add this to `package.json`:

```json
{
  "prisma": {
    "seed": "ts-node prisma/seed.ts"
  }
}
```

Install `ts-node`:

```bash
pnpm add -D ts-node
```

---

### Step 6: Run Seed (Optional)

```bash
npx prisma db seed
```

Or directly:

```bash
npx ts-node prisma/seed.ts
```

---

### Step 7: Verify via Prisma Studio

```bash
npx prisma studio
```

Open `http://localhost:5555` and browse the seeded data.

---

## Common Queries

### Using Prisma Client

```typescript
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// 1. Get all projects for a user
const userProjects = await prisma.project.findMany({
  where: { ownerId: userId },
});

// 2. Get tasks by project and status
const projectTasks = await prisma.task.findMany({
  where: {
    projectId: projectId,
    status: "TODO",
  },
  orderBy: { priority: "desc" },
});

// 3. Get tasks assigned to a user
const assignedTasks = await prisma.task.findMany({
  where: { assignedToId: userId },
  include: { project: true, assignedTo: true },
});

// 4. Get task with comments and creator
const taskDetail = await prisma.task.findUnique({
  where: { id: taskId },
  include: {
    comments: {
      include: { author: true },
    },
    creator: true,
    assignedTo: true,
    project: true,
  },
});

// 5. Count tasks by status in a project
const taskCounts = await prisma.task.groupBy({
  by: ["status"],
  where: { projectId: projectId },
  _count: true,
});
```

---

## Mistakes to Avoid

### ❌ Mistake 1: Storing Relational Data as JSON

**Bad:**
```prisma
model Project {
  id    Int
  name  String
  tasks Json   // ❌ Storing task IDs or objects as JSON
}
```

**Why:** Breaks referential integrity; hard to query; no type safety.

**Correct:**
```prisma
model Project {
  id    Int
  name  String
  tasks Task[]  // ✅ Proper one-to-many relation
}
```

---

### ❌ Mistake 2: Skipping Foreign Keys

**Bad:**
```prisma
model Task {
  id        Int
  title     String
  projectId Int  // ❌ No @relation annotation
}
```

**Why:** No referential integrity; orphaned tasks possible; hard to cascade deletes.

**Correct:**
```prisma
model Task {
  id        Int
  title     String
  projectId Int
  project   Project  @relation(fields: [projectId], references: [id], onDelete: Cascade)  // ✅
}
```

---

### ❌ Mistake 3: Unnecessary Many-to-Many Tables

**Bad:**
```prisma
// If Project has one owner, don't create a junction table
model ProjectUser {
  projectId Int
  userId    Int
  // ❌ Overcomplication for 1:N relationship
}
```

**Correct:**
```prisma
model Project {
  id      Int
  ownerId Int   // ✅ Simple one-to-many, not many-to-many
  owner   User  @relation(...)
}
```

**When M:N IS needed:**
```prisma
// Example: Task can have multiple assigned users (future)
model TaskAssignee {
  taskId Int
  userId Int
  task   Task  @relation(fields: [taskId], references: [id], onDelete: Cascade)
  user   User  @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  @@id([taskId, userId])  // Composite primary key
}
```

---

### ❌ Mistake 4: Denormalizing Data

**Bad:**
```prisma
model Project {
  id       Int
  name     String
  ownerId  Int
  owner    User  @relation(...)
  ownerEmail String  // ❌ Duplicated from User.email; stale if user updates
}
```

**Correct:**
```prisma
model Project {
  id      Int
  name    String
  ownerId Int
  owner   User  @relation(...)  // ✅ Access owner.email via relation
}
```

---

### ❌ Mistake 5: Using Boolean for Multi-State Data

**Bad:**
```prisma
model Task {
  id   Int
  done Boolean  // ❌ Can't represent "blocked" or "in progress"
}
```

**Correct:**
```prisma
enum TaskStatus {
  TODO
  IN_PROGRESS
  DONE
  BLOCKED
}

model Task {
  id     Int
  status TaskStatus  // ✅ Explicit states; type-safe
}
```

---

### ❌ Mistake 6: Missing Indexes on Foreign Keys

**Bad:**
```prisma
model Task {
  id        Int
  projectId Int  // ❌ Querying by projectId will be slow
  project   Project @relation(...)
}
```

**Correct:**
```prisma
model Task {
  id        Int
  projectId Int
  project   Project @relation(...)

  @@index([projectId])  // ✅ Speed up WHERE projectId = ?
}
```

---

### ❌ Mistake 7: Not Tracking Timestamps

**Bad:**
```prisma
model Task {
  id    Int
  title String
  // ❌ No way to know when task was created/updated
}
```

**Correct:**
```prisma
model Task {
  id        Int
  title     String
  createdAt DateTime @default(now())   // ✅ Auto-set on create
  updatedAt DateTime @updatedAt        // ✅ Auto-updated on modify
}
```

---

## Summary

| Aspect | Implementation |
|--------|----------------|
| **Entities** | User, Project, Task, Comment |
| **Relationships** | 1:N (User→Project, Project→Task, Task→Comment); nullable FKs for optional links |
| **Constraints** | Unique email; composite unique on (ownerId, name) for projects |
| **Integrity** | ON DELETE CASCADE for owned data; ON DELETE SET NULL for optional references |
| **Normalization** | 3NF compliant; no redundancy; atomic values only |
| **Performance** | Composite index on (projectId, status); individual indexes on foreign keys |
| **Timestamps** | `createdAt` (default) and `updatedAt` (auto) on all models |
| **Developer Experience** | Type-safe Prisma Client; visual studio support; seed script for testing |

---

## 📚 Files Reference

| File | Purpose | Location |
|------|---------|----------|
| Schema | Data model definitions | `prisma/schema.prisma` |
| Seed Script | Initial data population | `prisma/seed.ts` |
| Migrations | Tracked schema changes | `prisma/migrations/` |
| Documentation | This file | `SPRINT2_13_DATABASE_SCHEMA.md` |

---

## Next Steps

1. ✅ Copy `schema.prisma` and `seed.ts` to your project.
2. ✅ Run `npx prisma migrate dev --name init_schema`.
3. ✅ Run `npx prisma db seed` to populate test data.
4. ✅ Run `npx prisma studio` to verify.
5. ✅ Start building API routes and components against this schema!

---

**Created:** February 18, 2026  
**Status:** ✅ Sprint 2.13 Complete
