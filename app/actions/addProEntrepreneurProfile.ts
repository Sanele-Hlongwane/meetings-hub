import { prisma } from '@/lib/prisma';

export default async function addProEntrepreneurProfile(data) {
  const { entrepreneurId, companyName, companyWebsite, linkedinUrl, verificationStatus, location, age, gender, interests } = data;

  try {
    const profile = await prisma.proEntrepreneurProfile.create({
      data: {
        entrepreneurId,
        companyName,
        companyWebsite,
        linkedinUrl,
        verificationStatus,
        location,
        age: parseInt(age),
        gender,
        interests
      }
    });
    return profile;
  } catch (error) {
    console.error('Error creating profile:', error);
    throw new Error('Internal server error');
  }
}
