import { PrismaClient } from '@prisma/client';

// ─── TypeScript global augmentation ──────────────────────────────────────────
declare global {
  // eslint-disable-next-line no-var
  var __prisma: PrismaClient | undefined;
}

// ─── Singleton factory ────────────────────────────────────────────────────────
// Vercel Lambda: each cold-start evaluates this module once; subsequent warm
// requests on the same instance reuse the Node module cache, so the module-level
// `const prisma` is the effective singleton inside a single Lambda container.
//
// Dev: Next.js hot-reload clears the module cache on every file change, creating
// a new PrismaClient each time and quickly exhausting the connection pool.
// The globalThis cache prevents that.
//
function createPrismaClient() {
  return new PrismaClient({
    log:
      process.env.NODE_ENV === 'development'
        ? ['query', 'error', 'warn']
        : ['error'],
  });
}

export const prisma: PrismaClient =
  globalThis.__prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalThis.__prisma = prisma;
}
