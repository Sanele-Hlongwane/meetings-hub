// src/app/actions/updateRole.ts
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
    return { error: 'User not authenticated' };
  }

  try {
    // Check if the user already has a role assigned
    const existingUser = await prisma.user.findUnique({
      where: { clerkId: userId },
      select: { roleId: true },
    });

    if (existingUser?.roleId) {
      return { error: 'Role already assigned' };
    }

    // Ensure the role exists or create a new one
    let role = await prisma.role.findFirst({
      where: { name: name.toLowerCase() }, // Adjust for case sensitivity
    });

    if (!role) {
      role = await prisma.role.create({
        data: {
          name: name.toLowerCase(), // Ensure consistent casing
        },
      });
    }

    // Update the user's role
    const updatedUser = await prisma.user.update({
      where: { clerkId: userId }, // Use the dynamic identifier for your user
      data: {
        roleId: role.id,
      },
    });

    return { data: { name: role.name } };
  } catch (error) {
    console.error('Failed to assign role:', error);
    return { error: 'Failed to assign role' };
  }
}

export default updateRole;
