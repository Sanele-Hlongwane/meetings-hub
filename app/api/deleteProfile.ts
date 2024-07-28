// pages/api/deleteProfile.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { checkUser } from '@/lib/checkUser'; // Adjust the import path

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'DELETE') {
    return res.status(405).end(); // Method Not Allowed
  }

  const user = await checkUser();

  if (!user) {
    return res.status(401).json({ error: 'User not authenticated' });
  }

  await prisma.user.delete({
    where: { clerkId: user.clerkId },
  });

  res.status(204).end(); // No Content
}
