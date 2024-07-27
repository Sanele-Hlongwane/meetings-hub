// pages/api/assign-role.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { Clerk } from '@clerk/clerk-sdk-node';

// Initialize Clerk SDK with your API key
const clerk = new Clerk({ apiKey: process.env.CLERK_API_KEY });

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email, role } = req.body;

    try {
      // Fetch user by email
      const users = await clerk.users.list({ email_address: email });
      const user = users[0];

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      // Update user metadata with the role
      await clerk.users.updateUser(user.id, {
        metadata: {
          role,
        },
      });

      res.status(200).json({ message: 'Role assigned successfully' });
    } catch (error) {
      console.error('Error assigning role:', error);
      res.status(500).json({ error: 'Failed to assign role' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
