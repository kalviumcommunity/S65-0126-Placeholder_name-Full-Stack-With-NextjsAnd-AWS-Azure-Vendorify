# Sprint 2.14: Final Setup Completion Checklist

## ✅ What's Already Done For You

### Files Created/Updated
- ✅ `prisma/schema.prisma` - Complete database schema with User, Project, Task, Comment models
- ✅ `src/lib/prisma.ts` - Singleton PrismaClient with safe development pattern
- ✅ `src/lib/queries.ts` - Example query functions ready to use
- ✅ `prisma/seed.ts` - Database seed script with sample data
- ✅ `.env.local` - Template for database connection
- ✅ `README.md` - Prisma section with explanation and examples
- ✅ `package.json` - Updated with `prisma` and `@prisma/client` dependencies

### Documentation Created
- ✅ `SPRINT2_14_INSTALLATION_GUIDE.md` - Comprehensive setup guide with explanations
- ✅ `SPRINT2_14_QUICK_REFERENCE.md` - Quick commands reference
- ✅ `SPRINT2_14_SUMMARY.md` - Sprint overview and deliverables

---

## 🚀 YOUR TODO: 4 Steps to Complete Setup

### Step 1: Install Dependencies
**What to run:**
```bash
npm install
```

**Why:** This installs `@prisma/client` and `prisma` from your updated package.json

**Time:** < 1 minute

---

### Step 2: Configure Environment
**What to do:**
1. Copy `.env.example` to `.env.local```:
   ```bash
   cp .env.example .env.local
   ```

2. Verify `.env.local` has correct DATABASE_URL:
   ```env
   DATABASE_URL="postgresql://vendorify_user:vendorify_password@localhost:5432/vendorify_db?schema=public"
   ```

**Why:** Prisma reads database connection from environment variables

**Important:** Never commit `.env.local` (it's in `.gitignore`)

**Time:** < 1 minute

---

### Step 3: Create Database Migration
**What to run:**
```bash
npx prisma migrate dev --name init_schema
```

**What happens:**
- Reads `prisma/schema.prisma`
- Creates migration files in `prisma/migrations/` (version control for schema)
- Applies migration to PostgreSQL database
- Auto-generates TypeScript types
- Creates database tables (User, Project, Task, Comment)

**If prompted:** For "reset" - say yes `y` on first run

**Time:** 2-3 minutes

---

### Step 4: Verify Connection
**Option A (Easiest): Open Prisma Studio**
```bash
npx prisma studio
```
- Opens GUI at `http://localhost:5555`
- Browse all database tables
- Confirm tables were created

**Option B: Test API**
```bash
npm run dev
```
Then open: `http://localhost:3000/api/test`

**Any issues?** See troubleshooting section below

**Time:** < 1 minute

---

## ✨ After Setup: You Can Start Using Prisma

### Import and Use Queries
```typescript
// In any Server Component or API Route
import { getUsers, createProject, updateTaskStatus } from '@/lib/queries';

// Fetch data
const users = await getUsers();

// Create data
const newProject = await createProject('My Project', 'Description', userId);

// Update data
await updateTaskStatus(taskId, 'IN_PROGRESS');
```

### Add Your Own Query Functions
```typescript
// In src/lib/queries.ts - Add your functions:
export async function getTasksByStatus(projectId: number, status: string) {
  return await prisma.task.findMany({
    where: {
      projectId,
      status
    }
  });
}
```

---

## 📋 Pre-Flight Checklist

Before running commands, verify:

- [ ] PostgreSQL database is running
  ```bash
  docker ps | grep postgres
  ```
  Or: `docker-compose up -d`

- [ ] `.env.local` exists with DATABASE_URL
  ```bash
  cat .env.local | grep DATABASE_URL
  ```

- [ ] `package.json` has `prisma` and `@prisma/client` in dependencies
  ```bash
  grep -A 2 '"dependencies"' package.json | grep prisma
  ```

- [ ] `prisma/schema.prisma` exists and looks complete
  ```bash
  head -20 prisma/schema.prisma
  ```

---

## 🆘 Troubleshooting

### "Error: Can't reach database server"
**Cause:** PostgreSQL not running or wrong credentials  
**Fix:**
```bash
# Start PostgreSQL
docker-compose up -d

# Verify it's running
docker ps
```

### "Error: P1017: Can't find column: ..."
**Cause:** Schema not synced with database  
**Fix:**
```bash
# Reset database (⚠️ deletes all data)
npx prisma migrate reset

# Or manually apply
npx prisma migrate deploy
```

### "Error: PrismaClient is not available"
**Cause:** Prisma not installed or types not generated  
**Fix:**
```bash
npm install
npx prisma generate
```

### "Too many connections" error
**Cause:** Multiple PrismaClient instances created  
**Fix:** Check `src/lib/prisma.ts` has the singleton pattern (provided for you)

### TypeScript errors in IDE
**Cause:** Generated types are stale  
**Fix:**
```bash
npx prisma generate
# Restart VS Code TypeScript Server (Ctrl+Shift+P > Restart TS)
```

### "Schema.prisma not found"
**Cause:** File not in correct path  
**Fix:**
```bash
ls -la prisma/schema.prisma
# If missing:
npx prisma init
```

---

## 📝 Making Schema Changes Going Forward

1. **Edit schema.prisma**
   ```prisma
   model NewModel {
     id Int @id @default(autoincrement())
     // ... fields
   }
   ```

2. **Create migration**
   ```bash
   npx prisma migrate dev --name add_new_model
   ```

3. **Use new types immediately in code** ✅
   ```typescript
   await prisma.newModel.create({ ... })
   ```

---

## 📚 Files to Know

| File | Purpose | Edit? |
|------|---------|-------|
| `prisma/schema.prisma` | Database schema definition | ✏️ Yes |
| `src/lib/prisma.ts` | PrismaClient singleton | ⚠️ No |
| `src/lib/queries.ts` | Query functions | ✏️ Yes |
| `.env.local` | Database connection | ✏️ Only your values |
| `package.json` | Dependencies | ✅ Already updated |
| `README.md` | Documentation | ✏️ As needed |

---

## 🎓 Key Concepts to Remember

### Singleton Pattern (in prisma.ts)
```
Why? Prevents multiple database connections during development
How? Uses globalThis to store one instance across hot reloads
Result? Stable development experience + proper production behavior
```

### Server-Only Operations
```
✅ Use Prisma in:
   - Server Components (no 'use client')
   - API Routes (/api/...)
   - Server Functions
   - Backend scripts

❌ Never use in:
   - Client Components ('use client')
   - Browser code
   - Frontend-only scripts
```

### Type Safety
```
Before: const user = await fetch('/api/user')
  // What fields does user have? Unknown type

After: const user = await prisma.user.findUnique(...)
  // user.email, user.name automatically available
  // Wrong fields = compile-time error ✅
```

---

## 🎯 Success = Setup Complete When...

- [x] `npm install` completes without errors
- [x] `npx prisma migrate dev --name init_schema` creates tables
- [x] `npx prisma studio` opens at `http://localhost:5555`
- [x] Tables visible in Prisma Studio (User, Project, Task, Comment)
- [x] Can import: `import { prisma } from '@/lib/prisma'`
- [x] Can import: `import { getUsers } from '@/lib/queries'`
- [x] No TypeScript errors for Prisma usage
- [x] API route or Server Component successfully queries database

---

## 📞 If You Get Stuck

1. **Check [SPRINT2_14_INSTALLATION_GUIDE.md](SPRINT2_14_INSTALLATION_GUIDE.md)** - Detailed explanations
2. **Check [SPRINT2_14_QUICK_REFERENCE.md](SPRINT2_14_QUICK_REFERENCE.md)** - Command reference
3. **See [README.md#-prisma-orm-setup](README.md)** - Usage examples
4. **Check Prisma docs**: https://www.prisma.io/docs/
5. **Ask instructor** - Bring your error message

---

## 🚀 Next Steps After Setup

Once you complete the 4 steps above:

1. **Add more tables to schema.prisma** if needed
2. **Create custom query functions** in `src/lib/queries.ts`
3. **Connect queries to pages** (Server Components or API Routes)
4. **Run seed script** to populate sample data: `npx prisma db seed`
5. **Build features** using type-safe database access!

---

## 💡 Pro Tips

```bash
# Regenerate types when schema changes
npx prisma generate

# See what migrations have been applied
npx prisma migrate status

# What did the last migration do?
cat prisma/migrations/[timestamp]_init_schema/migration.sql

# Reset everything (DANGER - deletes all data)
npx prisma migrate reset --force

# Format your schema.prisma
npx prisma format
```

---

**You're almost there! The hardest part is done. Just run those 4 steps above. 🎉**

Still questions? Check the detailed [SPRINT2_14_INSTALLATION_GUIDE.md](SPRINT2_14_INSTALLATION_GUIDE.md) for comprehensive explanations of everything.
