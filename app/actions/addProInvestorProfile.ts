'use server';
import { auth } from '@clerk/nextjs/server';
import { prisma } from '@/lib/prisma';

interface ProInvestorProfileData {
  investorId: string;
  companyName: string;
  companyWebsite: string;
  linkedinUrl: string;
  location: string;
  age: number;
  gender: string;
  interests: string[];
}

interface ProInvestorProfileResult {
  data?: ProInvestorProfileData;
  error?: string;
}

async function addProInvestorProfile(data: ProInvestorProfileData): Promise<ProInvestorProfileResult> {
  const { userId } = auth();

  if (!userId) {
    return { error: 'User not found' };
  }

  try {
    const user = await prisma.user.findUnique({
      where: { clerkId: userId }
    });

    if (!user) {
      return { error: 'User does not exist' };
    }

    // Check if a ProInvestorProfile record already exists for this user
    let profile = await prisma.proInvestorProfile.findUnique({
      where: { investorId: user.id }
    });

    if (!profile) {
      // Create ProInvestorProfile record
      profile = await prisma.proInvestorProfile.create({
        data: {
          investorId: user.id,
          companyName: data.companyName,
          companyWebsite: data.companyWebsite,
          linkedinUrl: data.linkedinUrl,
          location: data.location,
          age: data.age,
          gender: data.gender,
          interests: data.interests,
        }
      });
    } else {
      // Update existing ProInvestorProfile record if needed
      profile = await prisma.proInvestorProfile.update({
        where: { investorId: user.id },
        data: {
          companyName: data.companyName,
          companyWebsite: data.companyWebsite,
          linkedinUrl: data.linkedinUrl,
          location: data.location,
          age: data.age,
          gender: data.gender,
          interests: data.interests,
        }
      });
    }

    return { data: profile };
  } catch (error) {
    return { error: 'Failed to add or update Pro Investor Profile data' };
  }
}

export default addProInvestorProfile;
