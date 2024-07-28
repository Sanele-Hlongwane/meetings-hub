import { NextApiRequest, NextApiResponse } from 'next';
const { checkUser } = require('@/lib/checkUser'); // Adjust the import path

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).end(); // Method Not Allowed
  }

  const user = await checkUser();

  if (!user) {
    return res.status(401).json({ error: 'User not authenticated' });
  }

  res.json(user);
}
