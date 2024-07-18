import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma'; // Adjust this path according to your project structure

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'PUT') {
    try {
      const data = req.body;

      // Validate the input
      if (!data.id) {
        return res.status(400).json({ error: 'User ID is required' });
      }

      // Update the user first
      const updatedUser = await prisma.user.update({
        where: { id: data.id },
        data: {
          name: data.name,
          email: data.email,
          // Ensure other fields are handled here
        },
      });

      // Fetch related records to check if the user is an entrepreneur or investor
      const entrepreneur = await prisma.entrepreneur.findUnique({
        where: { userId: data.id },
      });

      const investor = await prisma.investor.findUnique({
        where: { userId: data.id },
      });

      // Check if the user is an entrepreneur and update accordingly
      if (entrepreneur) {
        await prisma.entrepreneur.update({
          where: { id: entrepreneur.id },
          data: {
            businessName: data.businessName || undefined,
            businessPlan: data.businessPlan || undefined,
            professionalProfile: {
              update: {
                companyName: data.companyName || undefined,
                companyWebsite: data.companyWebsite || undefined,
                linkedinUrl: data.linkedinUrl || undefined,
              },
            },
          },
        });
      }

      // Check if the user is an investor and update accordingly
      if (investor) {
        await prisma.investor.update({
          where: { id: investor.id },
          data: {
            fundsAvailable: data.fundsAvailable || undefined,
            investmentPreferences: data.investmentPreferences || undefined,
            professionalProfile: {
              update: {
                companyName: data.companyName || undefined,
                companyWebsite: data.companyWebsite || undefined,
                linkedinUrl: data.linkedinUrl || undefined,
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
