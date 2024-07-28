// pages/api/updateProfile.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { checkUser } from '@/lib/checkUser'; // Adjust the import path

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).end(); // Method Not Allowed
  }

  const { name, imageUrl, role } = req.body;
  const user = await checkUser();

  if (!user) {
    return res.status(401).json({ error: 'User not authenticated' });
  }

  const updatedUser = await prisma.user.update({
    where: { clerkId: user.clerkId },
    data: {
      name,
      imageUrl,
      role: {
        connect: { name: role },
      },
    },
    include: {
      role: true,
    },
  });

  res.json(updatedUser);
}
