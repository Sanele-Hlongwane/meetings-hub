import { prisma } from '../../../lib/prisma';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { investorId, companyName, companyWebsite, linkedinUrl, verificationStatus, location, age, gender, interests } = req.body;

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
      res.status(200).json(profile);
    } catch (error) {
      console.error('Error creating profile:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} not allowed`);
  }
}
