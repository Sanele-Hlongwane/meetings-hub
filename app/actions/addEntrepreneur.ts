'use server';
import { auth } from '@clerk/nextjs/server';
import { prisma } from '@/lib/prisma';

interface EntrepreneurData {
  businessName: string;
  businessPlan: string;
}

interface EntrepreneurResult {
  data?: EntrepreneurData;
  error?: string;
}

async function addEntrepreneur(data: EntrepreneurData): Promise<EntrepreneurResult> {
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

    // Create entrepreneur record
    const entrepreneur = await prisma.entrepreneur.create({
      data: {
        userId: user.id,
        businessName: data.businessName,
        businessPlan: data.businessPlan,
      }
    });

    return { data: entrepreneur };
  } catch (error) {
    return { error: 'Failed to add entrepreneur data' };
  }
}

export default addEntrepreneur;
