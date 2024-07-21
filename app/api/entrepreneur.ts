import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  switch (method) {
    case 'GET':
      // Fetch entrepreneurs
      const entrepreneurs = await prisma.entrepreneur.findMany();
      res.status(200).json(entrepreneurs);
      break;
    case 'POST':
      // Create a new entrepreneur
      const { userId, business, pitch } = req.body;
      const newEntrepreneur = await prisma.entrepreneur.create({
        data: {
          userId,
          business,
          pitch,
        },
      });
      res.status(201).json(newEntrepreneur);
      break;
    // Implement other methods (PUT, DELETE) as needed
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
