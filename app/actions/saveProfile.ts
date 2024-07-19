// pages/api/saveProfile.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const data = req.body;
    const { userId } = data;

    let profile = await prisma.proInvestorProfile.findUnique({
      where: { investorId: userId }
    });

    if (!profile) {
      profile = await prisma.proInvestorProfile.create({
        data
      });
    } else {
      profile = await prisma.proInvestorProfile.update({
        where: { investorId: userId },
        data
      });
    }

    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({ error: 'Failed to save profile' });
  }
}
