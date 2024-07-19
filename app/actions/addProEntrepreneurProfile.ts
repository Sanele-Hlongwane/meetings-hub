'use server';

import { auth } from '@clerk/nextjs/server';
import { prisma } from '@/lib/prisma';

interface ProEntrepreneurProfileData {
  companyName: string;
  companyWebsite: string;
  linkedinUrl: string;
  verificationStatus: string;
  location?: string;
  age?: number;
  gender?: string;
  interests: string[];
}

export default async function addProEntrepreneurProfile(data: ProEntrepreneurProfileData) {
  const { companyName, companyWebsite, linkedinUrl, verificationStatus, location, age, gender, interests } = data;

  const { userId } = auth();

  if (!userId) {
    return { error: 'User not authenticated' };
  }

  try {
    const proEntrepreneurProfile = await prisma.proEntrepreneurProfile.create({
      data: {
        entrepreneurId: userId, // Assuming `userId` is used as the `entrepreneurId`
        companyName,
        companyWebsite,
        linkedinUrl,
        verificationStatus,
        location,
        age,
        gender,
        interests
      }
    });

    return { data: proEntrepreneurProfile };
  } catch (error) {
    console.error('Failed to add pro entrepreneur profile', error);
    return { error: 'Failed to add pro entrepreneur profile' };
  }
}
