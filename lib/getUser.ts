// src/lib/getUser.ts
import { checkUser } from '@/lib/checkUser';
import { prisma } from '@/lib/prisma'; // Ensure this path is correct

export async function getUser() {
  try {
    // Get the user from checkUser
    const user = await checkUser();
    if (!user) {
      return null;
    }

    // Fetch the user with related models included
    const userWithRelations = await prisma.user.findUnique({
      where: { id: user.id },
      include: {
        entrepreneur: true,
        investor: true,
        role: true, // Include the role if needed
      },
    });

    return userWithRelations;
  } catch (error) {
    console.error('Error fetching user details:', error);
    throw new Error('Failed to fetch user details');
  }
}
