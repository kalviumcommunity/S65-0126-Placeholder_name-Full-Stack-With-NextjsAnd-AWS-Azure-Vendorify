# Sprint 2.14: Prisma ORM Setup & Client Initialization

## Complete Installation & Setup Guide

### Overview
This guide walks you through setting up Prisma ORM in your Next.js 13+ TypeScript project with PostgreSQL. The setup prevents multiple PrismaClient instances in development and provides type-safe database access.

---

## 📦 Step 1: Installation

### Prerequisites
- ✅ Node.js 18.17+ installed
- ✅ PostgreSQL database running (via Docker)
- ✅ Next.js project initialized

### Install Commands

```bash
# 1. Install Prisma as a dev dependency
npm install prisma --save-dev

# 2. Install Prisma Client as a production dependency
npm install @prisma/client

# 3. Initialize Prisma (creates prisma/ folder and .env if missing)
npx prisma init
```

### What Each Command Does

| Command | Purpose | Why? |
|---------|---------|------|
| `npm install prisma --save-dev` | Installs the Prisma CLI tool | Needed for migrations, code generation, and database management (dev-only) |
| `npm install @prisma/client` | Installs the Prisma Client library | Runtime package used to query your database in application code |
| `npx prisma init` | Scaffolds Prisma project structure | Creates `prisma/` folder, schema file, and `.env` template |

---

## 🗄️ Step 2: Configure Your Database Schema

### Location
**File:** `prisma/schema.prisma`

### Complete Schema

```prisma
// prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// Define task status options
enum TaskStatus {
  TODO
  IN_PROGRESS
  DONE
  BLOCKED
}

// User model - represents application users
model User {
  id             Int      @id @default(autoincrement())
  email          String   @unique
  name           String?
  hashedPassword String?
  role           String   @default("USER")
  createdAt      DateTime @default(now())
  updatedAt      DateTime @updatedAt

  // Relations
  projects       Project[]   @relation("UserProjects")
  createdTasks   Task[]      @relation("TaskCreator")
  assignedTasks  Task[]      @relation("TaskAssignee")
  comments       Comment[]

  @@index([email])
}

// Project model - belongs to a user (owner)
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

// Task model - belongs to a project
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

// Comment model - belongs to a task
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

### Schema Explanation

| Feature | Purpose |
|---------|---------|
| `generator client` | Configures Prisma Client code generation |
| `datasource db` | Defines database type (PostgreSQL) and connection string |
| `enum TaskStatus` | Enumerates valid task status values (prevents invalid data) |
| `@id @default(autoincrement())` | Auto-incrementing primary key |
| `@unique` | Ensures email uniqueness across all users |
| `@relation()` | Defines relationships between models |
| `onDelete: Cascade` | Deletes child records when parent is deleted |
| `onDelete: SetNull` | Sets foreign key to NULL when parent is deleted |
| `@@index()` | Creates database index for faster queries |
| `@@unique()` | Composite unique constraint (owner can't have duplicate project names) |
| `@default(now())` | Sets creation timestamp automatically |
| `@updatedAt` | Auto-updates timestamp on record changes |

---

## 🔧 Step 3: Environment Configuration

### Update Environment Variables

**File:** `.env.local` (for local development)

```env
# Database Connection
DATABASE_URL="postgresql://vendorify_user:vendorify_password@localhost:5432/vendorify_db?schema=public"

# Node Environment
NODE_ENV=development
```

### Database URL Format
```
postgresql://[USERNAME]:[PASSWORD]@[HOST]:[PORT]/[DATABASE]?schema=public
```

---

## 🗃️ Step 4: Database Migration & Generation

### Create Initial Migration

```bash
# Creates migration files and syncs database schema
npx prisma migrate dev --name init_schema
```

**What happens:**
- Reads your schema.prisma
- Creates migration files in `prisma/migrations/`
- Applies migration to your PostgreSQL database
- Generates Prisma Client types

### Generate Prisma Client

```bash
# Regenerate Prisma Client (needed after schema changes)
npx prisma generate
```

### (Optional) Open Prisma Studio

```bash
# GUI tool to browse and modify database records
npx prisma studio
```

Opens: `http://localhost:5555`

### Useful Migration Commands

```bash
# View migration status
npx prisma migrate status

# Reset entire database (⚠️ deletes all data)
npx prisma migrate reset

# Create migration without applying it
npx prisma migrate dev --name name_of_migration --create-only
```

---

## 💎 Step 5: Prisma Client Initialization

### Location
**File:** `src/lib/prisma.ts`

### Complete Implementation

```typescript
// src/lib/prisma.ts
import { PrismaClient } from '@prisma/client';

/**
 * Prisma Client Singleton
 * 
 * This pattern prevents multiple PrismaClient instances in development.
 * 
 * Problem: Next.js hot-reload creates new instances on each file change,
 * exhausting database connections.
 * 
 * Solution: Store instance in global scope, reuse on reload.
 */

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    // Optional: Reduce log noise during development
    // log: ['error', 'warn'],
  });

// Only store to global in development to prevent multiple instances
if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}
```

### How It Works

```mermaid
graph TD
    A["File Changes"] -->|Hot Reload| B["Module Re-evaluates"]
    B -->|First Load| C["Create New PrismaClient"]
    B -->|Reload| D["Check globalThis.prisma"]
    D -->|Exists| E["Reuse Existing Instance"]
    D -->|Missing| F["Create New Instance"]
    E --> G["ONE Instance Per Dev Session"]
    F --> G
```

### Key Points

- ✅ **Type-safe** - Exports properly typed `prisma` instance
- ✅ **Singleton pattern** - Only one instance exists
- ✅ **Development-safe** - Uses global scope only in dev mode
- ✅ **Production-ready** - Single instance in production anyway
- ✅ **No circular dependencies** - Safe to import in multiple files

---

## 📝 Step 6: Query Examples

### Location
**File:** `src/lib/queries.ts`

### Example Implementation

```typescript
// src/lib/queries.ts
import { prisma } from './prisma';

// ============================================
// USER QUERIES
// ============================================

/**
 * Fetch all users with their basic info
 */
export async function getUsers() {
  try {
    return await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
      },
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
}

/**
 * Fetch a specific user by email with relations
 */
export async function getUserByEmail(email: string) {
  try {
    return await prisma.user.findUnique({
      where: { email },
      include: {
        projects: true,
        createdTasks: true,
        assignedTasks: true,
      },
    });
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
}

/**
 * Create a new user
 */
export async function createUser(email: string, name: string) {
  try {
    return await prisma.user.create({
      data: {
        email,
        name,
        role: 'USER',
      },
    });
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
}

// ============================================
// PROJECT QUERIES
// ============================================

/**
 * Fetch all projects for a specific user
 */
export async function getUserProjects(userId: number) {
  try {
    return await prisma.project.findMany({
      where: { ownerId: userId },
      include: { 
        tasks: true,
        owner: {
          select: { id: true, email: true, name: true }
        }
      },
    });
  } catch (error) {
    console.error('Error fetching user projects:', error);
    throw error;
  }
}

/**
 * Create a new project
 */
export async function createProject(
  name: string,
  description: string | null,
  ownerId: number
) {
  try {
    return await prisma.project.create({
      data: {
        name,
        description,
        ownerId,
      },
      include: { owner: true },
    });
  } catch (error) {
    console.error('Error creating project:', error);
    throw error;
  }
}

// ============================================
// TASK QUERIES
// ============================================

/**
 * Fetch all tasks in a project
 */
export async function getProjectTasks(projectId: number) {
  try {
    return await prisma.task.findMany({
      where: { projectId },
      include: {
        creator: { select: { id: true, email: true, name: true } },
        assignedTo: { select: { id: true, email: true, name: true } },
        project: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  } catch (error) {
    console.error('Error fetching project tasks:', error);
    throw error;
  }
}

/**
 * Create a new task
 */
export async function createTask(
  title: string,
  projectId: number,
  creatorId: number
) {
  try {
    return await prisma.task.create({
      data: {
        title,
        projectId,
        creatorId,
        status: 'TODO',
      },
      include: {
        creator: true,
        project: true,
      },
    });
  } catch (error) {
    console.error('Error creating task:', error);
    throw error;
  }
}

/**
 * Update task status
 */
export async function updateTaskStatus(
  taskId: number,
  newStatus: 'TODO' | 'IN_PROGRESS' | 'DONE' | 'BLOCKED'
) {
  try {
    return await prisma.task.update({
      where: { id: taskId },
      data: { status: newStatus },
      include: { project: true },
    });
  } catch (error) {
    console.error('Error updating task:', error);
    throw error;
  }
}

/**
 * Assign task to a user
 */
export async function assignTask(taskId: number, userId: number) {
  try {
    return await prisma.task.update({
      where: { id: taskId },
      data: { assignedToId: userId },
      include: { assignedTo: true },
    });
  } catch (error) {
    console.error('Error assigning task:', error);
    throw error;
  }
}
```

---

## 🧪 Step 7: Testing Your Setup

### Test in Server Component

```typescript
// app/dashboard/page.tsx
import { getUsers } from '@/lib/queries';

export default async function Dashboard() {
  const users = await getUsers();

  return (
    <div>
      <h1>Users ({users.length})</h1>
      {users.map(user => (
        <p key={user.id}>{user.name} - {user.email}</p>
      ))}
    </div>
  );
}
```

### Test in API Route

```typescript
// app/api/users/route.ts
import { getUsers } from '@/lib/queries';

export async function GET() {
  try {
    const users = await getUsers();
    return Response.json(users);
  } catch (error) {
    return Response.json({ error: String(error) }, { status: 500 });
  }
}
```

### Verify Connection

```bash
# Open Prisma Studio GUI
npx prisma studio

# Check database URL is valid
node -e "require('dotenv').config(); console.log(process.env.DATABASE_URL)"
```

---

## ⚠️ Common Mistakes to AVOID

### ❌ Mistake 1: Multiple PrismaClient Instances

**Wrong:**
```typescript
// ❌ DON'T do this - creates new instance each reload
export const prisma = new PrismaClient();
```

**Right:**
```typescript
// ✅ Use singleton pattern
const globalForPrisma = global as unknown as { prisma: PrismaClient };
export const prisma = globalForPrisma.prisma || new PrismaClient();
if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}
```

### ❌ Mistake 2: Using Prisma in Client Components

**Wrong:**
```typescript
// ❌ DON'T do this - PrismaClient can't run in browser
'use client';
import { prisma } from '@/lib/prisma';

export default function UserList() {
  // This will FAIL - PrismaClient only works server-side
  const users = await prisma.user.findMany();
}
```

**Right:**
```typescript
// ✅ Use in Server Components or API Routes only
import { prisma } from '@/lib/prisma';

// Server Component (no 'use client')
export default async function UserList() {
  const users = await prisma.user.findMany();
  return <div>{/* render users */}</div>;
}
```

### ❌ Mistake 3: Hardcoding Database URL

**Wrong:**
```typescript
// ❌ DON'T hardcode secrets
const url = "postgresql://user:password@localhost:5432/db";
```

**Right:**
```typescript
// ✅ Use environment variables
// In schema.prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")  // Reads from .env.local
}
```

### ❌ Mistake 4: Forgetting to Call `prisma.disconnect()` in APIs

**Wrong:**
```typescript
export async function POST(request: Request) {
  const user = await prisma.user.create({ ... });
  return Response.json(user); // ❌ Connection left open
}
```

**Right:**
```typescript
export async function POST(request: Request) {
  try {
    const user = await prisma.user.create({ ... });
    return Response.json(user);
  } finally {
    await prisma.$disconnect(); // ✅ Clean up connection
  }
}
```

---

## ✅ Verification Checklist

- [ ] Ran `npm install prisma --save-dev`
- [ ] Ran `npm install @prisma/client`
- [ ] `package.json` contains both dependencies
- [ ] `.env.local` has valid `DATABASE_URL`
- [ ] `prisma/schema.prisma` exists with User, Project, Task models
- [ ] Ran `npx prisma migrate dev --name init_schema`
- [ ] `src/lib/prisma.ts` exists with singleton pattern
- [ ] `src/lib/queries.ts` has example query functions
- [ ] Can open `npx prisma studio` without errors
- [ ] Database tables created in PostgreSQL
- [ ] Can import and use `prisma` in Server Components/API Routes
- [ ] NO 'use client' component uses PrismaClient directly

---

## 🎓 Key Learnings

### Why Prisma?

| Aspect | Without Prisma | With Prisma |
|--------|---|---|
| **Type Safety** | Manual TypeScript types | Auto-generated from schema |
| **Querying** | Raw SQL strings | Type-safe JavaScript |
| **Migrations** | Manual SQL files | Automated version control |
| **IDE Support** | No autocomplete | Full IntelliSense |
| **Runtime Errors** | Discover at runtime | Catch at compile-time |
| **Developer Speed** | Slow, error-prone | Fast, productive |

### Development Productivity Gains

1. **Type Checking** - Catch schema mismatches at compile time
2. **Autocomplete** - IDE suggests available fields and relations
3. **Migrations** - Easy way to track and apply schema changes
4. **Relationships** - Intuitive way to load related data
5. **Less Boilerplate** - No manual type definitions needed

### When to Use Prisma Client

```
✅ Server Components (app/page.tsx)
✅ API Routes (app/api/route.ts)
✅ Server Actions
✅ Backend utilities (src/lib/)
✅ Database seeds (prisma/seed.ts)

❌ Client Components ('use client')
❌ Browser-side logic
❌ Frontend utilities exposed to browser
```

---

## 📚 Next Steps

1. ✅ Complete all items in verification checklist
2. 📖 Review the Prisma documentation: https://www.prisma.io/docs/
3. 🧪 Create test queries in `src/lib/queries.ts`
4. 🔌 Connect database queries to your pages
5. 🎯 Build features using type-safe database access

---

## 🆘 Troubleshooting

### Migration Failed
```bash
# Check migration status
npx prisma migrate status

# Reset database (⚠️ deletes data)
npx prisma migrate reset

# Manually run migration
npx prisma migrate deploy
```

### PrismaClient Connection Errors
```bash
# Verify DATABASE_URL is correct
echo $DATABASE_URL

# Check PostgreSQL is running
docker ps
```

### Type Errors After Schema Change
```bash
# Regenerate Prisma Client
npx prisma generate

# Clear Next.js cache and restart
rm -rf .next
npm run dev
```

### "Too Many Connections" Error
This means multiple PrismaClient instances are being created. Check you're using the singleton pattern!

---

## 📞 Getting Help

- **Prisma Docs**: https://www.prisma.io/docs/
- **Prisma Discord**: https://pris.ly/discord
- **GitHub Issues**: https://github.com/prisma/prisma/issues
- **Class Resources**: Check Sprint materials and class notes

---

**Sprint 2.14 Complete! 🎉** You now have a production-ready Prisma setup with type-safe database access.
