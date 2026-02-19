# Sprint 2.14: Prisma ORM Setup & Client Initialization 📦

**Status:** Completed  
**Date:** February 18, 2026  
**Objective:** Complete Prisma ORM setup with type-safe database access in a Next.js 13+ TypeScript project

---

## 📋 What's Included

This sprint sets up:
- ✅ Prisma package installation
- ✅ PostgreSQL datasource configuration
- ✅ Complete database schema with User, Project, Task, and Comment models
- ✅ Prisma Client singleton initialization (prevents multiple instances)
- ✅ Example database queries
- ✅ Database migration setup

---

## 🎯 Installation & Setup

### Step 1: Install Dependencies

```bash
npm install prisma --save-dev
npm install @prisma/client
```

**What these packages do:**
- `prisma` - CLI tool for schema management, migrations, and database operations (dev-only)
- `@prisma/client` - Type-safe database client for your application (runtime dependency)

### Step 2: Environment Configuration

Create or update `.env.local`:

```env
DATABASE_URL="postgresql://vendorify_user:vendorify_password@localhost:5432/vendorify_db?schema=public"
```

For Docker setup, the URL is set in `docker-compose.yml` automatically.

### Step 3: Create Your First Migration

```bash
npx prisma migrate dev --name init_schema
```

This creates a migration file in `prisma/migrations/` and applies it to your database.

### Step 4: Generate Prisma Client

```bash
npx prisma generate
```

This generates TypeScript types and Prisma Client code based on your schema.

### Step 5: Verify Connection (Optional)

```bash
# Open Prisma Studio GUI
npx prisma studio

# Accessible at: http://localhost:5555
```

---

## 📊 Database Schema

### Models Included

#### **User**
```prisma
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
```

#### **Project**
```prisma
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
```

#### **Task**
```prisma
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
```

#### **Comment** (Bonus)
```prisma
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

---

## 🔌 Prisma Client Initialization

### File: `src/lib/prisma.ts`

```typescript
import { PrismaClient } from '@prisma/client';

// Prevent multiple PrismaClient instances in development
// In development, the Next.js dev server restarts on file changes,
// which would create new PrismaClient instances if we didn't use this pattern.
// In production, we only have one instance anyway.

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient();

// Only use globalThis in development to prevent multiple instances
// During development, the module is re-evaluated on hot reload
if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}
```

**Why this pattern?** 
- Every time you save a file in development, Next.js hot-reloads your code
- Without the singleton pattern, each reload creates a new PrismaClient
- Each instance opens a connection to the database
- After a few reloads, you hit the connection limit: ⚠️ "too many connections"
- The singleton pattern reuses the same instance across hot reloads

---

## 💾 Example Database Queries

### File: `src/lib/queries.ts`

```typescript
import { prisma } from './prisma';

// Get all users
export async function getUsers() {
  return await prisma.user.findMany({
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      createdAt: true,
    },
  });
}

// Get user by email (with relations)
export async function getUserByEmail(email: string) {
  return await prisma.user.findUnique({
    where: { email },
    include: {
      projects: true,
      createdTasks: true,
    },
  });
}

// Create a new user
export async function createUser(email: string, name: string) {
  return await prisma.user.create({
    data: {
      email,
      name,
      role: 'USER',
    },
  });
}

// Get all projects for a user
export async function getUserProjects(userId: number) {
  return await prisma.project.findMany({
    where: { ownerId: userId },
    include: {
      tasks: {
        select: {
          id: true,
          title: true,
          status: true,
        },
      },
    },
  });
}

// Get all tasks for a project
export async function getProjectTasks(projectId: number) {
  return await prisma.task.findMany({
    where: { projectId },
    include: {
      assignedTo: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      project: {
        select: {
          id: true,
          name: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
}
```

### Testing Queries

These queries can be tested in:

**1. Next.js Server Components (Recommended)**
```typescript
// app/dashboard/page.tsx
import { getUsers } from '@/lib/queries';

export default async function Dashboard() {
  const users = await getUsers();
  
  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.email}</li>
        ))}
      </ul>
    </div>
  );
}
```

**2. Next.js API Routes**
```typescript
// app/api/users/route.ts
import { getUsers } from '@/lib/queries';

export async function GET() {
  try {
    const users = await getUsers();
    return Response.json(users);
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
```

**3. Command Line (Quick Test)**
```bash
node -e "const {prisma} = require('./src/lib/prisma'); prisma.user.findMany().then(u => console.log(u))"
```

---

## ⚠️ Common Mistakes to Avoid

### ❌ Mistake 1: Multiple PrismaClient Instances
```typescript
// WRONG - Creates new instance on each import
import { PrismaClient } from '@prisma/client';
export const prisma = new PrismaClient();
```

**Fix:** Use the singleton pattern in `src/lib/prisma.ts` (provided above)

### ❌ Mistake 2: Using Prisma Client in React Client Components
```typescript
// WRONG - This will fail!
'use client';
import { prisma } from '@/lib/prisma';

export function UserList() {
  const users = prisma.user.findMany(); // ❌ Browser can't access database
  return <div>{users}</div>;
}
```

**Fix:** Use server components or fetch from API routes
```typescript
// RIGHT - Server component
import { getUsers } from '@/lib/queries';

export default async function UserList() {
  const users = await getUsers(); // ✅ Runs on server
  return <div>{users}</div>;
}
```

### ❌ Mistake 3: Hardcoding DATABASE_URL
```typescript
// WRONG - Secrets in code!
const url = "postgresql://user:password@localhost:5432/db";
```

**Fix:** Use environment variables
```typescript
// RIGHT - From .env.local
const url = process.env.DATABASE_URL;
```

### ❌ Mistake 4: Forgetting to Create Migrations
```bash
# You modified schema.prisma but didn't run:
npx prisma migrate dev --name description
```

**Consequence:** Your TypeScript types don't match the database schema!

**Fix:** Always migrate after schema changes:
```bash
npx prisma migrate dev --name your_change_description
```

### ❌ Mistake 5: Using `$queryRaw` Without Parameterization
```typescript
// WRONG - SQL Injection vulnerability!
const user = await prisma.$queryRaw`SELECT * FROM User WHERE email = '${email}'`;
```

**Fix:** Use parameterized queries
```typescript
// RIGHT - Safe from SQL injection
const user = await prisma.$queryRaw`SELECT * FROM User WHERE email = ${email}`;
```

---

## 📚 Useful Commands

```bash
# Recreate database (WARNING: deletes all data)
npx prisma migrate reset

# Create a new empty migration
npx prisma migrate dev --name add_new_field

# View database in GUI
npx prisma studio

# Generate Prisma Client types
npx prisma generate

# Format schema.prisma
npx prisma format

# Check schema validity
npx prisma validate
```

---

## 🎓 Key Concepts

### 1. **Relations**
```prisma
// One-to-Many: User owns many Projects
model User {
  projects Project[] @relation("UserProjects")
}
model Project {
  owner User @relation("UserProjects", fields: [ownerId], references: [id])
  ownerId Int
}

// Many-to-Many: Tasks assigned to multiple Users, Users handle multiple Tasks
model Task {
  assignedTo User? @relation("TaskAssignee", fields: [assignedToId], references: [id])
  assignedToId Int?
}
```

### 2. **Timestamps**
```prisma
// Auto-set on creation
createdAt DateTime @default(now())

// Auto-updated on every change
updatedAt DateTime @updatedAt
```

### 3. **Indexes**
```prisma
// Single field index (faster queries)
@@index([email])

// Composite index (for querying multiple fields together)
@@index([projectId, status])

// Unique index (prevents duplicates)
@@unique([ownerId, name])
```

### 4. **Delete Cascading**
```prisma
// When user is deleted, all their projects are deleted too
owner User @relation(..., onDelete: Cascade)

// When user is deleted, tasks are orphaned (set to null)
creator User? @relation(..., onDelete: SetNull)
```

---

## 🔒 Environment Variables

Create `.env.local` with:

```env
# For local development (PostgreSQL running locally or in Docker)
DATABASE_URL="postgresql://vendorify_user:vendorify_password@localhost:5432/vendorify_db?schema=public"

# For Docker Compose (set in docker-compose.yml instead)
# DATABASE_URL="postgresql://vendorify_user:vendorify_password@postgres:5432/vendorify_db?schema=public"

# Never commit .env.local - it contains secrets!
# Use .env.example as a template
```

⚠️ **IMPORTANT:** Never commit `.env.local` to Git! Always add it to `.gitignore`.

---

## 📖 Learning Resources

- [Prisma Documentation](https://www.prisma.io/docs/)
- [Prisma CLI Reference](https://www.prisma.io/docs/reference/cli-reference)
- [Database Relations](https://www.prisma.io/docs/concepts/relations)
- [Migrations](https://www.prisma.io/docs/concepts/components/prisma-migrate)
- [Type Safety with TypeScript](https://www.prisma.io/docs/getting-started/setup-prisma/add-to-existing-project-typescript)

---

## ✅ Verification Checklist

- [ ] Prisma and @prisma/client installed
- [ ] `.env.local` configured with DATABASE_URL
- [ ] `npx prisma migrate dev --name init_schema` executed
- [ ] `src/lib/prisma.ts` created with singleton pattern
- [ ] `src/lib/queries.ts` created with example queries
- [ ] Can run `npx prisma studio` without errors
- [ ] Can run test queries in server component or API route
- [ ] No multiple instances warning in dev console

---

## 🚀 Next Steps (Sprint 2.15)

- Create API routes for CRUD operations
- Build server components that use Prisma queries
- Add input validation with Zod
- Implement authentication with NextAuth

---

**Created by:** Sprint 2.14 Documentation  
**Last Updated:** February 18, 2026
