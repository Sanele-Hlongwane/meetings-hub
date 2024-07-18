import { PrismaClient } from '@prisma/client';

// Declare global variable prisma
declare global {
  var prisma: PrismaClient | undefined;
}

// Initialize prisma using globalThis if available, otherwise create a new instance
export const prisma = globalThis.prisma || new PrismaClient();

// Assign prisma to globalThis only in non-production environments
if (process.env.NODE_ENV !== 'production') {
  globalThis.prisma = prisma;
}
