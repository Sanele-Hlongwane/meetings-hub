import { prisma } from '@/lib/prisma';

export default async function addProInvestorProfile(data) {
  const { investorId, companyName, companyWebsite, linkedinUrl, verificationStatus, location, age, gender, interests } = data;

  try {
    const profile = await prisma.proInvestorProfile.create({
      data: {
        investorId,
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
