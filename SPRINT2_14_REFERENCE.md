# 📋 Sprint 2.14: Complete Reference & Commands

## 📦 Installation Commands

```bash
# Install Prisma (dev dependency)
npm install prisma --save-dev

# Install @prisma/client (runtime dependency)
npm install @prisma/client

# Initialize Prisma (skip if already has prisma folder)
npx prisma init
```

---

## 🗄️ Database Configuration

### `.env.local` (Create if missing)
```env
DATABASE_URL="postgresql://vendorify_user:vendorify_password@localhost:5432/vendorify_db?schema=public"
```

### For Docker Compose
```bash
# Start PostgreSQL container
docker-compose up -d

# Verify database is running
docker ps
```

---

## 📁 Project Files

### ✅ `prisma/schema.prisma`
**Status:** Already created ✓

Contains:
- PostgreSQL datasource with `env("DATABASE_URL")`
- Prisma Client generator
- Models: User, Project, Task, Comment
- Relations with cascade deletes
- Timestamps (createdAt, updatedAt)
- Indexes for performance

View: [prisma/schema.prisma](prisma/schema.prisma)

---

### ✅ `src/lib/prisma.ts`
**Status:** Created in this sprint ✓

**Purpose:** Singleton PrismaClient instance

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

**Why?** Prevents multiple instances during hot reload in development.

View: [src/lib/prisma.ts](src/lib/prisma.ts)

---

### ✅ `src/lib/queries.ts`
**Status:** Created in this sprint ✓

**Purpose:** Example server-side database query functions

**Exported functions:**
- `getUsers()` - Fetch all users
- `getUserByEmail(email: string)` - Find user by email
- `createUser(email: string, name: string)` - Create new user
- `getUserProjects(userId: number)` - Get user's projects
- `getProjectTasks(projectId: number)` - Get project's tasks

Each function includes:
- Try-catch error handling
- TypeScript types
- Optional includes/relationships
- Comments

View: [src/lib/queries.ts](src/lib/queries.ts)

---

### 📄 `SPRINT2_14_PRISMA_ORM_SETUP.md`
**Status:** Created in this sprint ✓

**Contains:**
- Complete setup guide
- Schema explanation
- Query examples
- Common mistakes & fixes
- Useful commands
- Environment variables
- Learning resources

View: [SPRINT2_14_PRISMA_ORM_SETUP.md](SPRINT2_14_PRISMA_ORM_SETUP.md)

---

### 📄 `SPRINT2_14_QUICK_START.md`
**Status:** Created in this sprint ✓

**Contains:**
- Step-by-step installation
- File overview
- Testing options
- Critical rules
- Common tasks
- Troubleshooting

View: [SPRINT2_14_QUICK_START.md](SPRINT2_14_QUICK_START.md)

---

## 🔧 Database Commands

```bash
# Create migration from schema changes
npx prisma migrate dev --name init_schema

# Generate Prisma Client types
npx prisma generate

# View database GUI
npx prisma studio

# Reset database (⚠️ deletes data)
npx prisma migrate reset

# Create empty migration
npx prisma migrate dev --name add_new_field

# Format schema.prisma
npx prisma format

# Validate schema.prisma
npx prisma validate

# Show migration status
npx prisma migrate status

# Revert last migration
npx prisma migrate resolve --rolled-back <migration_name>
```

---

## 🧪 Testing Commands

### Test with Server Component
Create `app/test/page.tsx`:
```typescript
import { getUsers } from '@/lib/queries';

export default async function TestPage() {
  const users = await getUsers();
  return <pre>{JSON.stringify(users, null, 2)}</pre>;
}
```

Visit: `http://localhost:3000/test`

---

### Test with API Route
Create `app/api/test/route.ts`:
```typescript
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

Visit: `http://localhost:3000/api/test`

---

### Test with Prisma Studio
```bash
npx prisma studio
# Opens: http://localhost:5555
```

---

### Test with Node
```bash
# Quick test in terminal
node -e "const {prisma} = require('./src/lib/prisma'); prisma.user.findMany().then(u => console.log(JSON.stringify(u, null, 2)))"
```

---

## 📊 Schema Models

### User
| Field | Type | Features |
|-------|------|----------|
| id | Int | @id @autoincrement |
| email | String | @unique |
| name | String? | Optional |
| hashedPassword | String? | Optional |
| role | String | @default("USER") |
| createdAt | DateTime | @default(now()) |
| updatedAt | DateTime | @updatedAt |

**Relations:**
- projects: Project[] (one-to-many)
- createdTasks: Task[] (one-to-many)
- assignedTasks: Task[] (one-to-many)
- comments: Comment[] (one-to-many)

---

### Project
| Field | Type | Features |
|-------|------|----------|
| id | Int | @id @autoincrement |
| name | String | |
| description | String? | Optional |
| ownerId | Int | Foreign key |
| createdAt | DateTime | @default(now()) |
| updatedAt | DateTime | @updatedAt |

**Relations:**
- owner: User (many-to-one)
- tasks: Task[] (one-to-many)

**Constraints:**
- Unique: (ownerId, name) - user can't have duplicate project names

---

### Task
| Field | Type | Features |
|-------|------|----------|
| id | Int | @id @autoincrement |
| title | String | |
| description | String? | Optional |
| status | TaskStatus | @default(TODO) - Enum |
| priority | Int | @default(0) |
| projectId | Int | Foreign key |
| creatorId | Int? | Optional foreign key |
| assignedToId | Int? | Optional foreign key |
| createdAt | DateTime | @default(now()) |
| updatedAt | DateTime | @updatedAt |

**Relations:**
- project: Project (many-to-one)
- creator: User? (many-to-one, optional)
- assignedTo: User? (many-to-one, optional)
- comments: Comment[] (one-to-many)

**Indexes:**
- (projectId, status) - Query tasks by project and status
- assignedToId - Query tasks assigned to user

---

### Comment
| Field | Type | Features |
|-------|------|----------|
| id | Int | @id @autoincrement |
| body | String | |
| taskId | Int | Foreign key |
| authorId | Int? | Optional foreign key |
| createdAt | DateTime | @default(now()) |
| updatedAt | DateTime | @updatedAt |

**Relations:**
- task: Task (many-to-one)
- author: User? (many-to-one, optional)

---

## ⚙️ Useful Patterns

### Query with Relations
```typescript
const project = await prisma.project.findUnique({
  where: { id: 1 },
  include: {
    owner: true,
    tasks: {
      include: {
        assignedTo: true,
        comments: true
      }
    }
  }
});
```

### Conditional Query
```typescript
const tasks = await prisma.task.findMany({
  where: {
    projectId: 1,
    status: 'IN_PROGRESS',
    assignedToId: userId
  }
});
```

### Count Query
```typescript
const count = await prisma.task.count({
  where: { projectId: 1 }
});
```

### Update Query
```typescript
const updated = await prisma.task.update({
  where: { id: taskId },
  data: { status: 'DONE' }
});
```

### Delete Query
```typescript
await prisma.task.delete({
  where: { id: taskId }
});
```

### Batch Operations
```typescript
const created = await prisma.task.createMany({
  data: [
    { title: 'Task 1', projectId: 1 },
    { title: 'Task 2', projectId: 1 }
  ]
});
```

---

## 🎯 Integration Points

### In Server Components
```typescript
import { getUsers } from '@/lib/queries';

export default async function MyPage() {
  const users = await getUsers();
  // Use data
}
```

### In API Routes
```typescript
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

### In Server Actions
```typescript
'use server';
import { createUser } from '@/lib/queries';

export async function handleCreateUser(formData) {
  const email = formData.get('email');
  const name = formData.get('name');
  
  const user = await createUser(email, name);
  return user;
}
```

---

## 📝 Types Generated by Prisma

Automatically generated in node_modules (don't edit):

```typescript
import { User, Project, Task, Comment, TaskStatus } from '@prisma/client';

// Full model type
const user: User = { ... };

// With relations
import { User, Prisma } from '@prisma/client';
type UserWithProjects = Prisma.UserGetPayload<{
  include: { projects: true }
}>;
```

---

## 🛡️ Security Best Practices

### ✅ Safe
```typescript
// Using env variables
const url = process.env.DATABASE_URL;

// Using parameterized queries
const user = await prisma.user.findUnique({
  where: { email: userInput }
});

// With $queryRaw parameterization
const user = await prisma.$queryRaw`
  SELECT * FROM User WHERE email = ${email}
`;
```

### ❌ Unsafe
```typescript
// Hardcoded secrets
const url = "postgresql://user:pass@host:5432/db";

// Template string in $queryRaw
const user = await prisma.$queryRaw`
  SELECT * FROM User WHERE email = '${email}'
`;
```

---

## 🔍 Verification Checklist

- [ ] Prisma and @prisma/client installed
- [ ] `.env.local` created with DATABASE_URL
- [ ] PostgreSQL running (docker-compose up -d)
- [ ] Migration created: `npx prisma migrate dev --name init_schema`
- [ ] `src/lib/prisma.ts` exists and exports prisma singleton
- [ ] `src/lib/queries.ts` exists with example functions
- [ ] Can run `npx prisma studio` without errors
- [ ] Can query database from server component or API
- [ ] No console errors about multiple instances
- [ ] TypeError on server component: "Cannot use 'await' outside function" → declare as async
- [ ] Type hints work for all models (Ctrl+Space in VS Code)

---

## 📞 Support

**Prisma Documentation:** https://www.prisma.io/docs/  
**Prisma Discord:** https://discord.gg/prisma  
**GitHub Issues:** https://github.com/prisma/prisma/issues

---

**Sprint 2.14 Complete! 🎉**

Next: Sprint 2.15 - API Routes & CRUD Operations
