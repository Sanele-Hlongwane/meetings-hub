import { NextApiRequest, NextApiResponse } from 'next';
import { getUser } from '@/lib/getUser'; // Adjust this path according to your project structure

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'PUT') {
    try {
      const data = req.body;

      // Fetch user details using getUser
      const existingUser = await getUser();

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
          where: { id: existingUser.entrepreneur.id },
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
          where: { id: existingUser.investor.id },
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
