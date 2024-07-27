// pages/api/assign-role.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email, role } = req.body;

    try {
      await prisma.user.update({
        where: { email },
        data: { role },
      });
      res.status(200).json({ message: 'Role assigned successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to assign role' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
