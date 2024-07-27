'use client';
import { useState } from 'react';
import { PrismaClient } from '@prisma/client';
import { currentUser } from '@clerk/nextjs/server';
import ProfileForm from '@/components/ProfileForm';

// Initialize Prisma Client
const prisma = new PrismaClient();

// Define the User type to match your schema
type User = {
  role: {
    id: string;
    name: string;
  };
  id: string;
  clerkId: string;
  email: string;
  name: string | null; // Allow name to be null
  imageUrl: string | null; // Allow imageUrl to be null
  createdAt: Date;
  updatedAt: Date;
  roleId: string;
};

// Fetch user data from Clerk and Prisma
const fetchUser = async (): Promise<User | null> => {
  const user = await currentUser();

  if (!user) {
    return null;
  }

  let loggedInUser = await prisma.user.findUnique({
    where: { clerkId: user.id },
    include: { role: true },
  });

  if (!loggedInUser) {
    loggedInUser = await prisma.user.findUnique({
      where: { email: user.emailAddresses[0].emailAddress },
      include: { role: true },
    });

    if (loggedInUser) {
      loggedInUser = await prisma.user.update({
        where: { email: user.emailAddresses[0].emailAddress },
        data: {
          clerkId: user.id,
          name: `${user.firstName} ${user.lastName}`,
          imageUrl: user.imageUrl,
          role: { connect: { id: 'defaultRoleId' } }, // Adjust with actual default role ID
        },
        include: { role: true },
      });

      return loggedInUser;
    }

    let defaultRole = await prisma.role.findUnique({
      where: { name: 'default' },
    });

    if (!defaultRole) {
      defaultRole = await prisma.role.create({
        data: { name: 'default' },
      });
    }

    const newUser = await prisma.user.create({
      data: {
        clerkId: user.id,
        name: `${user.firstName} ${user.lastName}`,
        imageUrl: user.imageUrl,
        email: user.emailAddresses[0].emailAddress,
        role: { connect: { id: defaultRole.id } },
      },
      include: { role: true },
    });

    return newUser;
  }

  return loggedInUser;
};

// Define the ProfilePage component
const ProfilePage = async () => {
  const user = await fetchUser();

  if (!user) {
    return <p>No user data found.</p>;
  }

  // Ensure `name` is a string before passing to ProfileForm
  const safeUser = {
    ...user,
    name: user.name || '', // Default to empty string if null
  };

  return (
    <ProfileForm user={safeUser} />
  );
};

export default ProfilePage;
