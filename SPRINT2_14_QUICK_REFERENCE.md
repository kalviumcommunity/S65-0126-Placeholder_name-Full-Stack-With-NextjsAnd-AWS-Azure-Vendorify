# Sprint 2.14: Quick Command Reference

## One-Time Setup Commands

Run these commands in order to set up Prisma:

```bash
# Step 1: Install dependencies
npm install prisma --save-dev
npm install @prisma/client

# Step 2: Initialize Prisma (creates prisma/ folder)
npx prisma init

# Step 3: Create database migration
npx prisma migrate dev --name init_schema

# Step 4: Generate Prisma Client types
npx prisma generate
```

## Verify Setup

```bash
# Open Prisma Studio GUI (browse database)
npx prisma studio

# Check Prisma installation
npx prisma --version

# See migration status
npx prisma migrate status
```

## Regular Development Commands

```bash
# Create a new migration after schema changes
npx prisma migrate dev --name your_migration_name

# Regenerate client types after schema changes
npx prisma generate

# Reset database (⚠️ deletes all data)
npx prisma migrate reset

# Run seed script
npx prisma db seed
```

## Environment Setup

Create `.env.local` with:

```env
DATABASE_URL="postgresql://vendorify_user:vendorify_password@localhost:5432/vendorify_db?schema=public"
NODE_ENV=development
```

## File Locations

| File | Purpose |
|------|---------|
| `prisma/schema.prisma` | Database schema definition |
| `src/lib/prisma.ts` | Prisma Client singleton instance |
| `src/lib/queries.ts` | Query functions to import and use |
| `.env.local` | Database connection string (not committed) |
| `prisma/migrations/` | Version-controlled schema changes |

## Making Schema Changes

1. Edit `prisma/schema.prisma`
2. Run: `npx prisma migrate dev --name describe_change`
3. Use new types in your code automatically ✅

## Common Issues

**"Unable to connect to database"**
- Verify PostgreSQL is running: `docker ps`
- Check `DATABASE_URL` in `.env.local`
- Verify credentials match docker-compose.yml

**"Too many connections" error**
- Using multiple PrismaClient instances
- Check `src/lib/prisma.ts` has singleton pattern

**Type errors in IDE**
- Run: `npx prisma generate`
- Restart TypeScript server in VS Code

---

**For detailed setup guide, see: [SPRINT2_14_INSTALLATION_GUIDE.md](SPRINT2_14_INSTALLATION_GUIDE.md)**
