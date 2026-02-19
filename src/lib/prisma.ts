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
