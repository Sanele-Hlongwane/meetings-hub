// src/lib/getUser.ts
import { checkUser } from '@/lib/checkUser';

export async function getUser() {
  try {
    const user = await checkUser();
    return user;
  } catch (error) {
    console.error('Error fetching user details:', error);
    throw new Error('Failed to fetch user details');
  }
}