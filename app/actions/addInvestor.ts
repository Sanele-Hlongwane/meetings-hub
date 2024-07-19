'use server';
import { auth } from '@clerk/nextjs/server';
import { prisma } from '@/lib/prisma';

interface InvestorData {
  fundsAvailable: number;
  investmentPreferences: string;
}

interface InvestorResult {
  data?: InvestorData;
  error?: string;
}

async function addInvestor(data: InvestorData): Promise<InvestorResult> {
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

    // Check if an Investor record already exists for this user
    let investor = await prisma.investor.findUnique({
      where: { userId: user.id }
    });

    if (!investor) {
      // Create Investor record
      investor = await prisma.investor.create({
        data: {
          userId: user.id,
          fundsAvailable: data.fundsAvailable,
          investmentPreferences: data.investmentPreferences,
        }
      });
    } else {
      // Update existing Investor record if needed
      investor = await prisma.investor.update({
        where: { userId: user.id },
        data: {
          fundsAvailable: data.fundsAvailable,
          investmentPreferences: data.investmentPreferences,
        }
      });
    }

    return { data: investor };
  } catch (error) {
    return { error: 'Failed to add or update investor data' };
  }
}

export default addInvestor;
