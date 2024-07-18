import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma'; // Make sure the path to your Prisma instance is correct
import { currentUser } from '@clerk/nextjs/server';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const clerkUser = await currentUser();

      if (!clerkUser) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      const user = await prisma.user.findUnique({
        where: {
          clerkId: clerkUser.id,
        },
        include: {
          role: true,
          entrepreneur: {
            include: {
              professionalProfile: true,
            },
          },
          investor: {
            include: {
              professionalProfile: true,
            },
          },
        },
      });

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.status(200).json(user);
    } catch (error) {
      console.error('Error fetching user:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else if (req.method === 'PUT') {
    try {
      const clerkUser = await currentUser();

      if (!clerkUser) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      const { role, data } = req.body;

      // Handle updating the user role
      if (role) {
        const updatedUser = await prisma.user.update({
          where: { clerkId: clerkUser.id },
          data: {
            role: {
              connect: { name: role },
            },
          },
        });

        res.status(200).json(updatedUser);
      } else {
        // Handle updating user data
        const updatedUser = await prisma.user.update({
          where: { clerkId: clerkUser.id },
          data: {
            entrepreneur: {
              update: {
                businessName: data.businessName,
                businessPlan: data.businessPlan,
              },
            },
            investor: {
              update: {
                fundsAvailable: data.fundsAvailable,
                investmentPreferences: data.investmentPreferences,
              },
            },
            professionalProfile: {
              update: {
                companyName: data.companyName,
                companyWebsite: data.companyWebsite,
                linkedinUrl: data.linkedinUrl,
              },
            },
          },
        });

        res.status(200).json(updatedUser);
      }
    } catch (error) {
      console.error('Error updating user:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'PUT']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
