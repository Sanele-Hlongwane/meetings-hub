// app/api/assign-role.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { getAuth } from '@clerk/nextjs/server';
import { prisma } from '@/lib/prisma'; // Adjust the import path as necessary

// Define a handler function for the API route
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  // Extract user data and role from the request body
  const { userId, role } = req.body;

  // Validate the input
  if (!userId || !role) {
    return res.status(400).json({ message: 'User ID and role are required' });
  }

  try {
    // Get the current authenticated user
    const { userId: clerkUserId } = getAuth(req);

    // Optionally, you can perform further checks here to ensure the user has permissions

    // Update the role in the database using Prisma
    await prisma.user.update({
      where: { id: userId },
      data: { role },
    });

    // Respond with a success message
    res.status(200).json({ message: 'Role assigned successfully' });
  } catch (error) {
    console.error('Error assigning role:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
