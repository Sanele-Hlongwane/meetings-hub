// UpdateRole action in backend (server-side)
'use server';
import { auth } from '@clerk/nextjs/server';
import { db } from '@/lib/prisma';

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

    let role = await db.role.findFirst({
      where: { name: name.toLowerCase() } // Adjust for case sensitivity
    });

    if (!role) {
      role = await db.role.create({
        data: {
          name: name.toLowerCase() // Ensure consistent casing
        }
      });
    }


    const updatedUser = await db.user.update({
      where: { clerkId: userId }, // Use the dynamic identifier for your user
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
