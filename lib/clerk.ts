// lib/clerk.ts
import { currentUser } from '@clerk/nextjs/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getCurrentUserData() {
  
}
