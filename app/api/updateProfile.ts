// pages/api/updateProfile.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { id, name } = req.body;
    try {
      await prisma.user.update({
        where: { id },
        data: { name },
      });
      res.status(200).json({ message: 'Profile updated successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to update profile' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
