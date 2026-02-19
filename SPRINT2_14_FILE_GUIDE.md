# Sprint 2.14: Documentation & Files Reference

## 📚 Which Document Should I Read?

### 🚀 You're in a hurry? (5 minutes)
Start here → **[SPRINT2_14_COMPLETION_CHECKLIST.md](SPRINT2_14_COMPLETION_CHECKLIST.md)**
- What's already done for you
- Exact 4 steps to complete setup
- Troubleshooting for quick fixes

### 📖 You want all the details? (20 minutes)
Start here → **[SPRINT2_14_INSTALLATION_GUIDE.md](SPRINT2_14_INSTALLATION_GUIDE.md)**
- Comprehensive setup walkthrough
- Detailed explanations of each concept
- Complete code examples
- Common mistakes to avoid
- Learning resources

### 🎯 You need quick commands? (1 minute)
Start here → **[SPRINT2_14_QUICK_REFERENCE.md](SPRINT2_14_QUICK_REFERENCE.md)**
- Copy-paste commands
- File locations
- Troubleshooting quick fixes

### 🏗️ You want to understand architecture? (15 minutes)
Start here → **[SPRINT2_14_ARCHITECTURE.md](SPRINT2_14_ARCHITECTURE.md)**
- System diagrams
- Data flow visualization
- Type generation process
- Performance tips

### 📋 Project overview & delivery?
Start here → **[SPRINT2_14_SUMMARY.md](SPRINT2_14_SUMMARY.md)**
- What was delivered
- Files created/modified
- Quick start guide
- Deliverables checklist

---

## 📁 Code Files You'll Use

### Daily Use Files

#### `src/lib/prisma.ts` ⭐ Important
**Purpose:** Singleton PrismaClient instance  
**Status:** ✅ Already created and correct  
**You edit this:** ❌ No (unless you really know what you're doing)  
**Use:** Import this in queries.ts and other files

```typescript
import { prisma } from '@/lib/prisma';
```

#### `src/lib/queries.ts` ⭐ Edit This!
**Purpose:** Server-side query functions  
**Status:** ✅ Has example queries, ready for you to add more  
**You edit this:** ✅ YES - Add your own query functions here  
**Example content:**
```typescript
export async function getUsers() { ... }
export async function createProject(...) { ... }
export async function updateTaskStatus(...) { ... }
```

#### `prisma/schema.prisma` ⚠️ Edit Carefully
**Purpose:** Database schema definition  
**Status:** ✅ Complete and correct  
**You edit this:** ✅ When schema needs to change  
**After editing:** Run `npx prisma migrate dev --name describe_change`

### Configuration Files

#### `.env.local` (yours to set up)
**Purpose:** Database connection string  
**Status:** 🔄 Template exists, you must update with real URL  
**You edit this:** ✅ Must set DATABASE_URL  
**Example:**
```env
DATABASE_URL="postgresql://user:password@localhost:5432/db"
```

#### `.env.example` (reference)
**Purpose:** Template showing what variables are needed  
**Status:** ✅ Complete  
**You edit this:** ❌ No (this is a reference)

#### `package.json`
**Purpose:** Project dependencies and scripts  
**Status:** ✅ Already updated with prisma dependencies  
**You edit this:** ❌ Usually no (we already added them)

### Database Migration Files

#### `prisma/migrations/` (auto-generated)
**Purpose:** Version control for schema changes  
**Status:** ✅ Created by `npx prisma migrate dev`  
**You edit these:** ❌ Never (they're auto-generated)  
**What's inside:**
```
migrations/
└── [timestamp]_init_schema/
    ├── migration.sql    ← Auto-generated SQL
    └── migration_lock.toml
```

#### `prisma/seed.ts`
**Purpose:** Populate test/sample data  
**Status:** ✅ Example provided  
**You edit this:** ✅ Add your own sample data  
**Run with:** `npx prisma db seed`

---

## 📖 Documentation You Have

| File | Purpose | For Who | Length |
|------|---------|---------|---------|
| **SPRINT2_14_COMPLETION_CHECKLIST.md** | Step-by-step setup with checks | Everyone | 5 min ⭐ |
| **SPRINT2_14_INSTALLATION_GUIDE.md** | Detailed explanations & concepts | Learners | 20 min |
| **SPRINT2_14_QUICK_REFERENCE.md** | Copy-paste commands | Experienced | 2 min |
| **SPRINT2_14_ARCHITECTURE.md** | System design & diagrams | Visual learners | 15 min |
| **SPRINT2_14_SUMMARY.md** | What was delivered | Overview | 10 min |
| **README.md** | Main project docs (includes Prisma section) | Everyone | varied |

---

## 🎯 Common Scenarios

### "I need to set up Prisma for the first time"
1. Read: [SPRINT2_14_COMPLETION_CHECKLIST.md](SPRINT2_14_COMPLETION_CHECKLIST.md)
2. Run the 4 steps provided
3. ✅ Done

### "Setup failed. Something's wrong"
1. Check: [SPRINT2_14_COMPLETION_CHECKLIST.md#-troubleshooting](SPRINT2_14_COMPLETION_CHECKLIST.md)
2. Read detailed version: [SPRINT2_14_INSTALLATION_GUIDE.md](SPRINT2_14_INSTALLATION_GUIDE.md)
3. Still stuck? Show error to instructor

### "I want to add a new table to the database"
1. Edit `prisma/schema.prisma` (add new model)
2. Run: `npx prisma migrate dev --name add_my_table`
3. Update `src/lib/queries.ts` with new query functions
4. Types auto-update ✅

### "I don't understand why we do the singleton pattern"
1. Read: [SPRINT2_14_ARCHITECTURE.md](#type-generation-flow)
2. See diagrams explaining data flow
3. Check: [SPRINT2_14_INSTALLATION_GUIDE.md](#-step-5-prisma-client-initialization)

### "I want to write a query that joins multiple tables"
1. Look at examples: [SPRINT2_14_INSTALLATION_GUIDE.md](#-step-6-query-examples)
2. Check `src/lib/queries.ts` for include/relations patterns
3. Reference Prisma docs: https://www.prisma.io/docs/concepts/components/prisma-client/relations

### "I need to understand the database schema"
1. Visual: [SPRINT2_14_ARCHITECTURE.md](#data-relationships-diagram)
2. Code: `prisma/schema.prisma` (the source of truth)
3. GUI: `npx prisma studio` (see tables and data)

---

## 🔧 Workflow Commands

### First Time Setup
```bash
npm install                                    # Install dependencies
npx prisma migrate dev --name init_schema     # Create database
npx prisma studio                             # Verify it worked
```

### Regular Development
```bash
# After editing schema.prisma:
npx prisma migrate dev --name my_change       # Create + apply migration

# After schema changes (if types break):
npx prisma generate                           # Regenerate types

# View database:
npx prisma studio                             # Opens GUI at localhost:5555

# Populate sample data:
npx prisma db seed                            # Runs prisma/seed.ts
```

---

## 📊 What's Where Quick Lookup

### "Where do I write database queries?"
→ `src/lib/queries.ts`

### "Where is the database configuration?"
→ `prisma/schema.prisma`

### "Where is the PrismaClient instance?"
→ `src/lib/prisma.ts`

### "Where is the database connection string?"
→ `.env.local` (DATABASE_URL)

### "Where do I add my schema models?"
→ `prisma/schema.prisma`

### "Where are migrations stored?"
→ `prisma/migrations/` (auto-created)

### "Where do I test if it works?"
→ Run `npx prisma studio` or check API endpoint

### "Where are the setup instructions?"
→ [SPRINT2_14_COMPLETION_CHECKLIST.md](SPRINT2_14_COMPLETION_CHECKLIST.md)

### "Where are the detailed explanations?"
→ [SPRINT2_14_INSTALLATION_GUIDE.md](SPRINT2_14_INSTALLATION_GUIDE.md)

### "Where are quick commands?"
→ [SPRINT2_14_QUICK_REFERENCE.md](SPRINT2_14_QUICK_REFERENCE.md)

### "Where is system architecture?"
→ [SPRINT2_14_ARCHITECTURE.md](SPRINT2_14_ARCHITECTURE.md)

---

## ✅ File Dependency Map

```
What you use in your Next.js app:
├── app/dashboard/page.tsx
│   └── imports from: src/lib/queries.ts
│       └── imports from: src/lib/prisma.ts
│           └── uses: PrismaClient from @prisma/client
│               └── reads: prisma/schema.prisma
│                   └── connects to: DATABASE_URL in .env.local
│                       └── PostgreSQL database
│
├── app/api/users/route.ts
│   └── (same chain as above)
│
└── prisma/seed.ts
    └── imports: src/lib/prisma.ts
        └── populates database with sample data
```

---

## 🚀 Next After Reading

### Minimum (Get it working)
1. Read: [SPRINT2_14_COMPLETION_CHECKLIST.md](SPRINT2_14_COMPLETION_CHECKLIST.md)
2. Run 4 steps
3. Done ✅

### Recommended (Understand it)
1. Read: [SPRINT2_14_COMPLETION_CHECKLIST.md](SPRINT2_14_COMPLETION_CHECKLIST.md)
2. Run 4 steps
3. Read: [SPRINT2_14_INSTALLATION_GUIDE.md](SPRINT2_14_INSTALLATION_GUIDE.md)
4. Try: Prisma Studio (`npx prisma studio`)
5. Create: A new query function in `src/lib/queries.ts`

### Complete (Master it)
1. All of "Recommended"
2. Read: [SPRINT2_14_ARCHITECTURE.md](SPRINT2_14_ARCHITECTURE.md)
3. Modify: `prisma/schema.prisma` to add a new model
4. Run: `npx prisma migrate dev --name add_new_model`
5. Write: Queries for new model in `src/lib/queries.ts`
6. Create: API route or Server Component using new queries

---

## 📞 If You Get Lost

1. **Lost in setup?** → [SPRINT2_14_COMPLETION_CHECKLIST.md](SPRINT2_14_COMPLETION_CHECKLIST.md)
2. **What command do I run?** → [SPRINT2_14_QUICK_REFERENCE.md](SPRINT2_14_QUICK_REFERENCE.md)
3. **Why does something work this way?** → [SPRINT2_14_INSTALLATION_GUIDE.md](SPRINT2_14_INSTALLATION_GUIDE.md)
4. **How does it all fit together?** → [SPRINT2_14_ARCHITECTURE.md](SPRINT2_14_ARCHITECTURE.md)
5. **What files changed?** → [SPRINT2_14_SUMMARY.md](SPRINT2_14_SUMMARY.md)

---

**You have everything you need. Start with the checklist and follow the steps! 🚀**
