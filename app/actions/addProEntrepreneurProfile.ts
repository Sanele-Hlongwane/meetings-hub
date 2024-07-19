'use server';

import { auth } from '@clerk/nextjs/server';
import { prisma } from '@/lib/prisma';

interface ProInvestorProfileData {
  companyName: string;
  companyWebsite: string;
  linkedinUrl: string;
  verificationStatus: string;
  location?: string;
  age?: number;
  gender?: string;
  interests: string[];
}

export default async function addProInvestorProfile(data: ProInvestorProfileData) {
  const { companyName, companyWebsite, linkedinUrl, verificationStatus, location, age, gender, interests } = data;

  const { userId } = auth();

  if (!userId) {
    return { error: 'User not authenticated' };
  }

  try {
    const proInvestorProfile = await prisma.proInvestorProfile.create({
      data: {
        investorId: userId, // Assuming `userId` is used as the `investorId`
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

    return { data: proInvestorProfile };
  } catch (error) {
    console.error('Failed to add pro investor profile', error);
    return { error: 'Failed to add pro investor profile' };
  }
}
