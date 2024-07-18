// app/api/user.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma'; // Adjust this path according to your project structure

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'PUT') {
    try {
      const data = req.body;

      // Update the user first
      const updatedUser = await prisma.user.update({
        where: { id: data.id },
        data: {
          // Update user fields as needed
          name: data.name,
          email: data.email,
          // Ensure other fields are handled here
        },
      });

      // Check if the user is an entrepreneur or investor and update accordingly
      if (updatedUser.entrepreneur) {
        await prisma.entrepreneur.update({
          where: { id: updatedUser.entrepreneurId },
          data: {
            businessName: data.businessName,
            businessPlan: data.businessPlan,
            // Update professionalProfile if exists
            professionalProfile: {
              update: {
                companyName: data.companyName,
                companyWebsite: data.companyWebsite,
                linkedinUrl: data.linkedinUrl,
              },
            },
          },
        });
      }

      if (updatedUser.investor) {
        await prisma.investor.update({
          where: { id: updatedUser.investorId },
          data: {
            fundsAvailable: data.fundsAvailable,
            investmentPreferences: data.investmentPreferences,
            // Update professionalProfile if exists
            professionalProfile: {
              update: {
                companyName: data.companyName,
                companyWebsite: data.companyWebsite,
                linkedinUrl: data.linkedinUrl,
              },
            },
          },
        });
      }

      res.status(200).json(updatedUser);
    } catch (error) {
      console.error('Error updating user:', error);
      res.status(500).json({ error: 'Failed to update user' });
    }
  } else {
    res.setHeader('Allow', ['PUT']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default handler;
