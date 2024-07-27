// pages/api/updateUser.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { id, name, email, imageUrl } = req.body;
      const updatedUser = await prisma.user.update({
        where: { id },
        data: { name, email, imageUrl },
      });
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while updating user' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
