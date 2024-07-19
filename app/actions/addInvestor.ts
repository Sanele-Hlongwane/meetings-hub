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
      where: { id: userId }
    });

    if (!user) {
      return { error: 'User does not exist' };
    }

    // Create investor record
    const investor = await prisma.investor.create({
      data: {
        userId: user.id,
        fundsAvailable: data.fundsAvailable,
        investmentPreferences: data.investmentPreferences,
      }
    });

    return { data: investor };
  } catch (error) {
    return { error: 'Failed to add investor data' };
  }
}

export default addInvestor;
