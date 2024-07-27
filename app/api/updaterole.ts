'use server';

import { auth } from '@clerk/nextjs/server';
import { prisma } from '@/lib/prisma';

interface RoleData {
  name: string;
}

interface RoleResult {
  data?: RoleData;
  error?: string;
}

async function updateRole({ name }: { name: string }): Promise<RoleResult> {
  if (!name || name === '') {
    return { error: 'Role name is missing' };
  }

  const { userId } = auth();

  if (!userId) {
    return { error: 'User not found' };
  }

  try {
    // Fetch the current user to check their existing role
    const user = await prisma.user.findUnique({
      where: { clerkId: userId },
      include: { role: true },
    });

    if (!user) {
      return { error: 'User not found' };
    }

    // Check if the user already has a role set and if it's either 'entrepreneur' or 'investor'
    if (user.role && (user.role.name === 'entrepreneur' || user.role.name === 'investor')) {
      return { error: 'Role already assigned and cannot be re-assigned.' };
    }

    // Ensure the role name is in lowercase and check if it exists
    let role = await prisma.role.findFirst({
      where: { name: name.toLowerCase() }
    });

    if (!role) {
      role = await prisma.role.create({
        data: {
          name: name.toLowerCase()
        }
      });
    }

    // Update the user's role
    await prisma.user.update({
      where: { clerkId: userId },
      data: {
        roleId: role.id
      }
    });

    return { data: { name: role.name } };
  } catch (error) {
    return { error: 'Failed to assign role' };
  }
}

export default updateRole;
