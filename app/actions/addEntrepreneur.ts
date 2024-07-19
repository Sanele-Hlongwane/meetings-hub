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
      where: { clerkId: userId }
    });

    if (!user) {
      return { error: 'User does not exist' };
    }

    // Check if an Entrepreneur record already exists for this user
    let entrepreneur = await prisma.entrepreneur.findUnique({
      where: { userId: user.id }
    });

    if (!entrepreneur) {
      // Create Entrepreneur record
      entrepreneur = await prisma.entrepreneur.create({
        data: {
          userId: user.id,
          businessName: data.businessName,
          businessPlan: data.businessPlan,
        }
      });
    } else {
      // Update existing Entrepreneur record if needed
      entrepreneur = await prisma.entrepreneur.update({
        where: { userId: user.id },
        data: {
          businessName: data.businessName,
          businessPlan: data.businessPlan,
        }
      });
    }

    return { data: entrepreneur };
  } catch (error) {
    return { error: 'Failed to add or update entrepreneur data' };
  }
}

export default addEntrepreneur;
