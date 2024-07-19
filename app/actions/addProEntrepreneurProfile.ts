'use server';
import { auth } from '@clerk/nextjs/server';
import { prisma } from '@/lib/prisma';

interface ProEntrepreneurProfileData {
  entrepreneurId: string;
  companyName: string;
  companyWebsite: string;
  linkedinUrl: string ;
  location: string | null; // Allow null values
  age: number | null;      // Allow null values
  gender: string | null;   // Allow null values
  interests: string[];
}

interface ProEntrepreneurProfileResult {
  data?: ProEntrepreneurProfileData;
  error?: string;
}

async function addProEntrepreneurProfile(data: ProEntrepreneurProfileData): Promise<ProEntrepreneurProfileResult> {
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

    // Check if a ProEntrepreneurProfile record already exists for this user
    let profile = await prisma.proEntrepreneurProfile.findUnique({
      where: { entrepreneurId: user.id }
    });

    if (!profile) {
      // Create ProEntrepreneurProfile record
      profile = await prisma.proEntrepreneurProfile.create({
        data: {
          entrepreneurId: user.id,
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
      // Update existing ProEntrepreneurProfile record if needed
      profile = await prisma.proEntrepreneurProfile.update({
        where: { entrepreneurId: user.id },
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
    return { error: 'Failed to add or update Pro Entrepreneur Profile data' };
  }
}

export default addProEntrepreneurProfile;
