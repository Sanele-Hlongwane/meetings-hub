// lib/clerk.ts
import { currentUser } from '@clerk/nextjs/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getCurrentUserData() {
  const user = await currentUser();
  if (!user) return null;

  const userData = await prisma.user.findUnique({
    where: { clerkId: user.id },
    include: {
      entrepreneur: true,
      investor: true,
      investments: true,
    },
  });

  return userData;
}
