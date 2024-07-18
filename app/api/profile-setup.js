import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { role, data, userId, email, username, imageUrl } = req.body;

  try {
    let userProfile;

    if (role === 'entrepreneur') {
      const { businessName, businessPlan, ...profileData } = data;

      userProfile = await prisma.user.create({
        data: {
          clerkId: userId,
          email,
          username,
          imageUrl,
          ...profileData,
          role: {
            connect: { name: role },
          },
          entrepreneur: {
            create: {
              businessName,
              businessPlan,
            },
          },
        },
        include: {
          role: true,
          entrepreneur: true,
          investor: true,
        },
      });
    } else if (role === 'investor') {
      const { fundsAvailable, investmentPreferences, ...profileData } = data;

      userProfile = await prisma.user.create({
        data: {
          clerkId: userId,
          email,
          username,
          imageUrl,
          ...profileData,
          role: {
            connect: { name: role },
          },
          investor: {
            create: {
              fundsAvailable: parseFloat(fundsAvailable),
              investmentPreferences,
            },
          },
        },
        include: {
          role: true,
          entrepreneur: true,
          investor: true,
        },
      });
    } else {
      return res.status(400).json({ error: 'Invalid role specified' });
    }

    res.status(200).json(userProfile);
  } catch (error) {
    console.error('Error creating user profile:', error);
    res.status(500).json({ error: 'Failed to create user profile' });
  }
}
