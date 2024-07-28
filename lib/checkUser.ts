import { currentUser } from '@clerk/nextjs/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const checkUser = async (selectedRole: string | null = null) => {
  const user = await currentUser();

  if (!user) {
    return null;
  }

  let loggedInUser = await prisma.user.findUnique({
    where: {
      clerkId: user.id,
    },
    include: {
      role: true,
    },
  });

  if (loggedInUser) {
    return loggedInUser;
  }

  loggedInUser = await prisma.user.findUnique({
    where: {
      email: user.emailAddresses[0].emailAddress,
    },
    include: {
      role: true,
    },
  });

  if (loggedInUser) {
    loggedInUser = await prisma.user.update({
      where: {
        email: user.emailAddresses[0].emailAddress,
      },
      data: {
        clerkId: user.id,
        name: `${user.firstName || ''} ${user.lastName || ''}`,
        imageUrl: user.imageUrl,
        role: {
          connect: { id: selectedRole || 'defaultRoleId' },
        },
      },
      include: {
        role: true,
      },
    });

    return loggedInUser;
  }

  let defaultRole = await prisma.role.findUnique({
    where: {
      name: 'default',
    },
  });

  if (!defaultRole) {
    defaultRole = await prisma.role.create({
      data: {
        name: 'default',
      },
    });
  }

  const newUser = await prisma.user.create({
    data: {
      clerkId: user.id,
      name: `${user.firstName || ''} ${user.lastName || ''}`,
      imageUrl: user.imageUrl,
      email: user.emailAddresses[0].emailAddress,
      role: {
        connect: { id: selectedRole || defaultRole.id },
      },
    },
    include: {
      role: true,
    },
  });

  return newUser;
};
