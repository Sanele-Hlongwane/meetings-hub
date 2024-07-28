const { checkUser } = require('@/lib/checkUser'); 

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).end(); // Method Not Allowed
  }

  const user = await checkUser();

  if (!user) {
    return res.status(401).json({ error: 'User not authenticated' });
  }

  res.json(user);
}
