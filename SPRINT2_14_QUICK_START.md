# 🚀 Sprint 2.14 Quick Start Guide

## Step-by-Step Installation

### 1️⃣ Install Prisma Dependencies
```bash
npm install prisma --save-dev
npm install @prisma/client
```

### 2️⃣ Verify .env.local Configuration
Create `.env.local` with:
```env
DATABASE_URL="postgresql://vendorify_user:vendorify_password@localhost:5432/vendorify_db?schema=public"
```

For Docker, ensure `docker-compose.yml` has the database running:
```bash
docker-compose up -d
```

### 3️⃣ Create Database Migration
```bash
npx prisma migrate dev --name init_schema
```
✅ This creates tables in your PostgreSQL database

### 4️⃣ Generate Prisma Client Types
```bash
npx prisma generate
```
✅ TypeScript types are now generated in `node_modules/@prisma`

### 5️⃣ Test Prisma Studio (GUI)
```bash
npx prisma studio
```
✅ Opens at `http://localhost:5555` - browse your database visually

---

## 📁 Files Already Created

### `src/lib/prisma.ts` ✅
**Purpose:** Singleton Prisma Client (prevents multiple instances)

```typescript
import { PrismaClient } from '@prisma/client';

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}
```

### `src/lib/queries.ts` ✅
**Purpose:** Example server-side database queries

Includes:
- `getUsers()` - Fetch all users
- `getUserByEmail(email)` - Find user by email
- `createUser(email, name)` - Create new user
- `getUserProjects(userId)` - Get projects owned by user
- `getProjectTasks(projectId)` - Get all tasks for project

### `prisma/schema.prisma` ✅
**Purpose:** Database schema definition

Includes:
- User model (unique email, role)
- Project model (owned by users)
- Task model (belongs to projects, assigned to users)
- Comment model (on tasks)
- 4 enums and proper relations

---

## 🧪 Test Your Setup

### Option 1: Server Component (Recommended)
```typescript
// app/dashboard/page.tsx
import { getUsers } from '@/lib/queries';

export default async function Dashboard() {
  const users = await getUsers();
  return (
    <div>
      <h1>Users ({users.length})</h1>
      <pre>{JSON.stringify(users, null, 2)}</pre>
    </div>
  );
}
```

### Option 2: API Route
```typescript
// app/api/users/route.ts
import { getUsers } from '@/lib/queries';

export async function GET() {
  try {
    const users = await getUsers();
    return Response.json(users);
  } catch (error) {
    return Response.json({ error: 'Failed to fetch users' }, { status: 500 });
  }
}

// Test with: curl http://localhost:3000/api/users
```

### Option 3: Terminal Command
```bash
node -e "const {prisma} = require('./src/lib/prisma'); prisma.user.findMany().then(u => console.log(JSON.stringify(u, null, 2)))"
```

---

## ⚠️ Critical Rules

### 🚫 DON'T
- ❌ Create multiple PrismaClient instances
- ❌ Use Prisma in client components (`'use client'`)
- ❌ Hardcode DATABASE_URL in code
- ❌ Forget to run migrations after schema changes
- ❌ Use `$queryRaw` without parameter binding

### ✅ DO
- ✅ Use the singleton pattern in `src/lib/prisma.ts`
- ✅ Use Prisma only in server components and API routes
- ✅ Keep DATABASE_URL in `.env.local` (never commit)
- ✅ Always run `npx prisma migrate dev` after schema edits
- ✅ Use parameterized queries to prevent SQL injection

---

## 🔄 Common Tasks

### Add a new field to User
```prisma
// prisma/schema.prisma
model User {
  // ... existing fields
  phone String?  // Add this
}
```
Then run:
```bash
npx prisma migrate dev --name add_phone_to_user
```

### Delete and recreate database (⚠️ warning: data loss)
```bash
npx prisma migrate reset
```

### Format your schema
```bash
npx prisma format
```

### Validate schema
```bash
npx prisma validate
```

---

## 📊 Understanding Relations

```prisma
// User has many Projects (1-to-Many)
model User {
  projects Project[]  // User can own multiple projects
}
model Project {
  owner User @relation(fields: [ownerId], references: [id])
  ownerId Int // Foreign key
}

// Task optionally assigned to User (Many-to-1)
model Task {
  assignedTo User?  // Optional: task might not be assigned
  assignedToId Int?
}
```

---

## 💡 Type Safety Example

Prisma automatically generates types:

```typescript
import { User, Task } from '@prisma/client';

// TypeScript knows the exact shape of User
const user: User = await prisma.user.findUnique({
  where: { id: 1 }
});

// Type error if you use wrong field!
console.log(user.name); // ✅ OK
console.log(user.nonexistent); // ❌ TypeScript error!
```

---

## 🎯 Next Steps

1. ✅ Install packages
2. ✅ Create database migration
3. ✅ Test with example query
4. ✅ Build your first API route
5. ✅ Use queries in server components

---

## 🆘 Troubleshooting

### Error: "too many connections"
**Cause:** Multiple PrismaClient instances  
**Fix:** Ensure `src/lib/prisma.ts` uses singleton pattern

### Error: "column does not exist"
**Cause:** Schema changed but migration not run  
**Fix:** Run `npx prisma migrate dev --name description`

### Error: "DATABASE_URL is not set"
**Cause:** `.env.local` missing or misconfigured  
**Fix:** Create `.env.local` with correct DATABASE_URL

### Prisma Studio fails to connect
**Cause:** PostgreSQL not running  
**Fix:** Ensure `docker-compose up -d` is running

---

## 📚 Resources

- [Prisma Docs](https://www.prisma.io/docs/)
- [SQL Relations Explained](https://www.prisma.io/docs/concepts/relations)
- [Migrations Guide](https://www.prisma.io/docs/concepts/components/prisma-migrate)

**You're ready to build! 🎉**
