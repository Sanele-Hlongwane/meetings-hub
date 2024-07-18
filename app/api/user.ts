import { NextApiRequest, NextApiResponse } from 'next';
import { currentUser } from '@clerk/nextjs/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'PUT') {
    try {
      const data = req.body;
      const user = await currentUser();

      if (!user) {
        return res.status(401).json({ error: 'User not authenticated' });
      }

      // Find the user from the database
      const existingUser = await prisma.user.findUnique({
        where: {
          clerkId: user.id,
        },
      });

      if (!existingUser) {
        return res.status(404).json({ error: 'User not found' });
      }

      // Update the user fields
      const updatedUser = await prisma.user.update({
        where: { id: existingUser.id },
        data: {
          name: data.name,
          email: data.email,
          // Handle other fields if needed
        },
      });

      // Check if the user is an entrepreneur or investor and update accordingly
      if (existingUser.entrepreneur) {
        await prisma.entrepreneur.update({
          where: { id: existingUser.entrepreneurId },
          data: {
            businessName: data.businessName,
            businessPlan: data.businessPlan,
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

      if (existingUser.investor) {
        await prisma.investor.update({
          where: { id: existingUser.investorId },
          data: {
            fundsAvailable: data.fundsAvailable,
            investmentPreferences: data.investmentPreferences,
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
