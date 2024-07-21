import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';
import { currentUser } from '@clerk/nextjs/server';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  const user = await currentUser();

  if (!user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  switch (method) {
    case 'GET':
      try {
        const userId = user.id;
        const existingUser = await prisma.user.findUnique({
          where: { clerkId: userId },
          include: {
            role: true,
            entrepreneur: { include: { professionalProfile: true } },
            investor: { include: { professionalProfile: true } },
          },
        });
        res.status(200).json(existingUser);
      } catch (error) {
        res.status(500).json({ error: 'Failed to fetch user' });
      }
      break;

    case 'PUT':
      try {
        const { role, data } = req.body;
        const updatedUser = await prisma.user.update({
          where: { clerkId: user.id },
          data: {
            role: { connect: { name: role } },
            ...data,
          },
        });
        res.status(200).json(updatedUser);
      } catch (error) {
        res.status(500).json({ error: 'Failed to update user' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'PUT']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
