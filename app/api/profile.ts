import { currentUser } from "@clerk/nextjs/server";
import { PrismaClient, Role } from '@prisma/client';

const prisma = new PrismaClient();

export const checkUser = async (selectedRole: Role | null = null) => {
  const user = await currentUser();

  if (!user) {
    return null;
  }

  // Default to 'DEFAULT' role if no role is selected
  const role: Role = selectedRole || Role.USER;

  // Find the user by Clerk ID
  let loggedInUser = await prisma.user.findUnique({
    where: {
      clerkId: user.id,
    },
  });

  // If user exists, update role if different from current
  if (loggedInUser) {
    if (loggedInUser.role !== role) {
      loggedInUser = await prisma.user.update({
        where: {
          clerkId: user.id,
        },
        data: {
          role: role, // Update the role
        },
      });
    }
    return loggedInUser;
  }

  // If user does not exist, find by email
  loggedInUser = await prisma.user.findUnique({
    where: {
      email: user.emailAddresses[0].emailAddress,
    },
  });

  // If user found by email, update with Clerk ID and default role
  if (loggedInUser) {
    loggedInUser = await prisma.user.update({
      where: {
        email: user.emailAddresses[0].emailAddress,
      },
      data: {
        clerkId: user.id,
        name: `${user.firstName} ${user.lastName}`,
        role: role, // Set the role
      },
    });
    return loggedInUser;
  }

  // Create a new user with default role
  const newUser = await prisma.user.create({
    data: {
      clerkId: user.id,
      name: `${user.firstName} ${user.lastName}`,
      email: user.emailAddresses[0].emailAddress,
      role: role, // Set the role (default or selected)
    },
  });

  return newUser;
};
