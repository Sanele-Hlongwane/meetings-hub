// app/profile/page.tsx

'use client';
import { useState } from 'react';
import { PrismaClient } from '@prisma/client';
import { currentUser } from '@clerk/nextjs/server';

const prisma = new PrismaClient();

const fetchUser = async () => {
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
          role: { connect: { id: 'defaultRoleId' } },
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

const ProfilePage = async () => {
  const user = await fetchUser();

  if (!user) {
    return <p>No user data found.</p>;
  }

  return (
    <ProfileForm user={user} />
  );
};

export default ProfilePage;
