import { PrismaClient } from '@prisma/client';

// Extend globalThis type so TypeScript strict mode doesn't complain.
declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

// In serverless environments (Vercel) every cold-start imports this module
// fresh, so a bare `new PrismaClient()` is fine for production. In development,
// Next.js hot-reload re-evaluates modules on every change — without the
// globalThis cache this would exhaust the PostgreSQL connection pool quickly.
const prismaClientSingleton = () =>
  new PrismaClient({
    log:
      process.env.NODE_ENV === 'development'
        ? ['query', 'error', 'warn']
        : ['error'],
  });

export const prisma: PrismaClient =
  globalThis.prisma ?? prismaClientSingleton();

if (process.env.NODE_ENV !== 'production') {
  globalThis.prisma = prisma;
}
