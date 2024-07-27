import { currentUser } from '@clerk/nextjs/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const checkUser = async (selectedRole: string | null = null) => {
  const user = await currentUser();

  if (!user) {
    return null;
  }

  // Check if the user exists in the database
  let loggedInUser = await prisma.user.findUnique({
    where: {
      clerkId: user.id,
    },
    include: {
      role: true,
    },
  });

  // If user exists, return the user
  if (loggedInUser) {
    return loggedInUser;
  }

  // If user doesn't exist, check by email
  loggedInUser = await prisma.user.findUnique({
    where: {
      email: user.emailAddresses[0].emailAddress,
    },
    include: {
      role: true,
    },
  });

  if (loggedInUser) {
    // Update the user with the new Clerk ID and other details
    loggedInUser = await prisma.user.update({
      where: {
        email: user.emailAddresses[0].emailAddress,
      },
      data: {
        clerkId: user.id,
        name: `${user.firstName} ${user.lastName}`,
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

  // If user doesn't exist by email, create a new role if needed
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

  // Create a new user with the role
  const newUser = await prisma.user.create({
    data: {
      clerkId: user.id,
      name: `${user.firstName} ${user.lastName}`,
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
