# Sprint 2.14: Prisma Architecture Overview

## System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                       Next.js 13+ App Router                     │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │                    Server Components                        │ │
│  │    (app/dashboard/page.tsx, app/users/page.tsx, etc.)     │ │
│  │                                                             │ │
│  │  import { getUsers } from '@/lib/queries'                 │ │
│  │  const users = await getUsers()                           │ │
│  └────────────────────────────────────────────────────────────┘ │
│                             │ ▼                                   │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │                      API Routes                            │ │
│  │    (app/api/users/route.ts, app/api/projects/route.ts)   │ │
│  │                                                             │ │
│  │  import { getUsers } from '@/lib/queries'                 │ │
│  │  export async function GET() {                            │ │
│  │    const users = await getUsers()                         │ │
│  │    return Response.json(users)                            │ │
│  │  }                                                          │ │
│  └────────────────────────────────────────────────────────────┘ │
│                             │ ▼                                   │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │               Query Functions Layer                        │ │
│  │             (src/lib/queries.ts)                          │ │
│  │                                                             │ │
│  │  export async function getUsers() {                       │ │
│  │    return await prisma.user.findMany(...)                │ │
│  │  }                                                          │ │
│  │                                                             │ │
│  │  export async function createProject(...) {               │ │
│  │    return await prisma.project.create(...)               │ │
│  │  }                                                          │ │
│  └────────────────────────────────────────────────────────────┘ │
│                             │ ▼                                   │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │          Prisma Client Singleton                          │ │
│  │            (src/lib/prisma.ts)                           │ │
│  │                                                             │ │
│  │  export const prisma = prismaClient                       │ │
│  │  (with safe development patterns)                        │ │
│  └────────────────────────────────────────────────────────────┘ │
│                             │ ▼                                   │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │          Prisma ORM & Query Builder                       │ │
│  │                                                             │ │
│  │  prisma.user.findMany()                                   │ │
│  │  prisma.project.create()                                  │ │
│  │  prisma.task.update()                                     │ │
│  └────────────────────────────────────────────────────────────┘ │
│                             │ ▼                                   │
└─────────────────────────────────────────────────────────────────┘
                              │ ▼
┌─────────────────────────────────────────────────────────────────┐
│                    PostgreSQL Database                           │
├─────────────────────────────────────────────────────────────────┤
│  ┌──────────┐  ┌─────────┐  ┌──────┐  ┌─────────┐              │
│  │  users   │  │projects │  │tasks │  │comments │              │
│  ├──────────┤  ├─────────┤  ├──────┤  ├─────────┤              │
│  │id (PK)   │  │id (PK)  │  │id(PK)│  │id (PK)  │              │
│  │email     │  │name     │  │title │  │body     │              │
│  │name      │  │ownerId  │  │status│  │taskId   │              │
│  │role      │  │(FK)     │  │owner │  │authorId │              │
│  │createdAt │  │created  │  │(FK)  │  │(FK)     │              │
│  │updatedAt │  │At       │  │creat │  │created  │              │
│  │          │  │updatedAt│  │edAt  │  │At       │              │
│  │          │  │         │  │updat │  │updatedAt│              │
│  │          │  │         │  │edAt  │  │         │              │
│  └──────────┘  └─────────┘  └──────┘  └─────────┘              │
│                                                                   │
│  Keys:                                                            │
│  PK = Primary Key (unique identifier)                           │
│  FK = Foreign Key (reference to another table)                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## Data Flow: Step by Step

### Example: Fetching Users

```
1. User visits: http://localhost:3000/dashboard

2. Next.js renders: app/dashboard/page.tsx (Server Component)
   
3. Page imports query:
   import { getUsers } from '@/lib/queries'
   
4. Page calls:
   const users = await getUsers()
   
5. Query function (queries.ts) executes:
   return await prisma.user.findMany(...)
   
6. Prisma Client (prisma.ts) creates SQL:
   SELECT * FROM "User" ...
   
7. PostgreSQL executes SQL and returns:
   [
     { id: 1, email: "alice@example.com", name: "Alice", ... },
     { id: 2, email: "bob@example.com", name: "Bob", ... }
   ]
   
8. Results returned to page as TypeScript typed objects:
   users[0].email ← IDE autocomplete works!
   
9. Page renders HTML with user data

10. User sees list of users in browser ✅
```

---

## File Organization

```
amogas/
├── prisma/
│   ├── schema.prisma          ← Database schema definition
│   │   ├── datasource db (PostgreSQL)
│   │   ├── generator client
│   │   ├── enum TaskStatus
│   │   ├── model User
│   │   ├── model Project
│   │   ├── model Task
│   │   └── model Comment
│   │
│   ├── migrations/             ← Version-controlled schema changes
│   │   └── [timestamp]_init_schema/
│   │       └── migration.sql   ← Auto-generated SQL
│   │
│   └── seed.ts                ← Populate test data
│
├── src/lib/
│   ├── prisma.ts              ← Singleton PrismaClient
│   │   └── Prevents multiple instances in dev
│   │
│   ├── queries.ts             ← Query functions
│   │   ├── getUsers()
│   │   ├── createProject()
│   │   ├── updateTaskStatus()
│   │   └── etc...
│   │
│   └── README.md              ← File documentation
│
├── app/
│   ├── (user-facing pages)
│   ├── api/
│   │   └── (API routes)
│   └── ...
│
├── .env.local                 ← Database URL (not committed)
├── .env.example               ← Template for .env.local
├── package.json               ← Dependencies
│   └── @prisma/client
│   └── prisma (dev)
│
└── README.md                  ← Project documentation
```

---

## Data Relationships Diagram

```
User (table)
├── id (PRIMARY KEY)
├── email (UNIQUE)
├── name
└── role
     │
     ├─┬─ "owns" → Project (one-to-many)
     │ │           ├── id
     │ │           ├── name
     │ │           ├── ownerId (FOREIGN KEY → User.id)
     │ │           │
     │ │           └─┬─ "contains" → Task (one-to-many)
     │ │             │             ├── id
     │ │             │             ├── title
     │ │             │             ├── projectId (FK)
     │ │             │             ├── creatorId (FK → User.id)
     │ │             │             ├── assignedToId (FK → User.id)
     │ │             │             │
     │ │             │             └─┬─ "has" → Comment (one-to-many)
     │ │             │               │         ├── id
     │ │             │               │         ├── body
     │ │             │               │         ├── taskId (FK)
     │ │             │               │         └── authorId (FK → User.id)
     │ │
     │ ├─┬─ "creates" → Task (one-to-many)
     │ │ │  (creatorId field)
     │ │ │
     │ ├─┬─ "assigned to" → Task (one-to-many)
     │ │ │  (assignedToId field)
     │ │ │
     │ └─┬─ "authors" → Comment (one-to-many)
     │   │  (authorId field)
```

---

## TypeScript Type Generation Flow

```
1. You write schema.prisma:
   ┌──────────────────────────────┐
   │ model User {                 │
   │   id Int @id                 │
   │   email String @unique       │
   │   name String?               │
   │ }                            │
   └──────────────────────────────┘

2. Run: npx prisma generate
   ↓

3. Prisma reads schema and generates:
   ┌──────────────────────────────┐
   │ node_modules/.prisma/client │
   │                              │
   │ export interface User {      │
   │   id: number                 │
   │   email: string              │
   │   name: string | null        │
   │ }                            │
   │                              │
   │ export class PrismaClient {  │
   │   user: UserDelegate;        │
   │ }                            │
   └──────────────────────────────┘

4. IntelliSense picks it up:
   ┌──────────────────────────────┐
   │ const user = await prisma.   │
   │                   ^
   │            ↓ Shows: user, project, task
   │
   │ user.email
   │     ^
   │ ↓ Shows: id, email, name, createdAt, updatedAt
   │         (catches wrong property at compile-time!)
   └──────────────────────────────┘

5. Deploy with confidence - types validated! ✅
```

---

## Query Execution Flow

```
Browser: http://localhost:3000/dashboard
    ↓
Next.js Router: /dashboard → app/dashboard/page.tsx
    ↓
Server Component executes (server-side only)
    ↓
Import { getUsers } from '@/lib/queries'
    ↓
const users = await getUsers()
    ↓
    ┌─ queries.ts:
    │  export async function getUsers() {
    │    return await prisma.user.findMany({...})
    │  }
    ↓
    ├─ prisma.ts: Singleton client instance
    │  Every page/API uses same PrismaClient
    │  No connection exhaustion ✅
    ↓
    ├─ Prisma ORM: Builds SQL query
    │  SELECT "public"."User"."id", 
    │         "public"."User"."email",
    │         "public"."User"."name"
    │  FROM "public"."User"
    ↓
PostgreSQL Database
    ├─ Execute SQL
    ├─ Return results
    └─ Serialize to JSON
    ↓
Prisma Client: Parse response
    ├─ Validate types
    ├─ Return typed JavaScript objects
    └─ Type: User[] = [{id, email, name, ...}, ...]
    ↓
Server Component: Render with data
    ├─ Map users to JSX
    ├─ Generate HTML
    └─ Zero JavaScript sent to browser
    ↓
Browser: Display HTML
    ├─ No database access possible ✅
    ├─ Data safely on server ✅
    └─ User sees rendered page ✅
```

---

## Common Query Patterns

### Pattern 1: Read Single Record
```typescript
const user = await prisma.user.findUnique({
  where: { id: 1 }
});
// user has type: User | null
```

### Pattern 2: Read Multiple Records
```typescript
const users = await prisma.user.findMany({
  where: { role: 'ADMIN' }
});
// users has type: User[]
```

### Pattern 3: Create Record
```typescript
const newUser = await prisma.user.create({
  data: { email: "new@example.com", name: "New User" }
});
// newUser has type: User
```

### Pattern 4: Include Relations
```typescript
const userWithProjects = await prisma.user.findUnique({
  where: { id: 1 },
  include: { projects: true }  // ← Load related projects
});
// userWithProjects has nested projects array
```

### Pattern 5: Select Specific Fields
```typescript
const basicInfo = await prisma.user.findMany({
  select: {
    id: true,
    email: true,
    // ✅ Only returns these 2 fields
    // name, password NOT included
  }
});
```

---

## Development Workflow

```
1. Start Development Server
   npm run dev
   ↓
2. Make Changes to Code
   ↓
3. Need Database Schema Change?
   ├─ Edit prisma/schema.prisma
   ├─ Run: npx prisma migrate dev --name your_change
   ├─ Auto-generates types
   └─ Server auto-reloads ✅
   ↓
4. Use New Types Immediately
   ├─ IDE shows new fields
   ├─ TypeScript validates
   └─ No manual type definitions needed ✅
   ↓
5. Deploy When Ready
   └─ Schema migrations auto-apply ✅
```

---

## When Something Goes Wrong

```
Error: "too many connections"
↓
Cause: Multiple PrismaClient instances
↓
Check: Is src/lib/prisma.ts using singleton pattern?
↓
Fix: Make sure you're importing from prisma.ts not creating new PrismaClient()


Error: "Column not found"
↓
Cause: Schema changed but migration not applied
↓
Fix: npx prisma migrate dev


Error: Type mismatch in TypeScript
↓
Cause: Types are stale
↓
Fix: npx prisma generate && restart IDE
```

---

## Performance Considerations

### Indexes
```prisma
// Fast queries on these fields
@@index([ownerId])        // Find projects by owner
@@index([projectId, status])  // Find tasks by project+status
@@index([assignedToId])   // Find tasks assigned to user
```

### Cascade Delete
```prisma
// If user deleted, related records cleaned up
owner User @relation(..., onDelete: Cascade)

// vs SetNull: Foreign key becomes NULL
assignedTo User? @relation(..., onDelete: SetNull)
```

### What NOT to do
```typescript
// ❌ Bad: N+1 queries
const users = await prisma.user.findMany();
for (const user of users) {
  const projects = await prisma.project.findMany({
    where: { ownerId: user.id }
  }); // SLOW - runs 100s of queries
}

// ✅ Good: Single query with include
const users = await prisma.user.findMany({
  include: { projects: true }
}); // Fast - single efficient query
```

---

## Production Checklist

- [ ] Database URL uses production PostgreSQL
- [ ] Environment variables properly set
- [ ] All migrations applied to production DB
- [ ] Connection pooling enabled (if needed)
- [ ] Error logging in place
- [ ] Backups configured
- [ ] Read replicas for scaling (future)

---

**This architecture keeps your code clean, type-safe, and maintainable as your project grows.**
