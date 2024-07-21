// pages/api/users/index.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { currentUser } from '@clerk/nextjs/server';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const user = await currentUser(req);
  if (!user) return res.status(401).json({ error: 'Unauthorized' });

  switch (req.method) {
    case 'POST':
      // Create user logic
      const newUser = await prisma.user.create({
        data: {
          clerkId: user.id,
          email: user.email,
          name: user.firstName || '',
          role: 'USER', // Default role
        },
      });
      return res.status(201).json(newUser);
    // Handle other HTTP methods as needed
    default:
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
