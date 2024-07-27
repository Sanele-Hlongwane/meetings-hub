import { auth } from '@clerk/nextjs/server';
import { prisma } from '@/lib/prisma';

export async function getUser() {
  const { userId } = auth();

  if (!userId) {
    throw new Error('User not found');
  }

  const user = await prisma.user.findUnique({
    where: { clerkId: userId },
    include: { role: true },
  });

  if (!user) {
    throw new Error('User not found');
  }

  return user;
}
