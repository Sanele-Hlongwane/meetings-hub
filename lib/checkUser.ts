// lib/checkUser.ts
import { currentUser } from "@clerk/nextjs/server";
import { PrismaClient, Role } from '@prisma/client';

const prisma = new PrismaClient();

export const checkUser = async (selectedRole: Role | null = null) => {
  const user = await currentUser();

  if (!user) {
    return null;
  }

  // Default to 'USER' role if no role is selected
  const role: Role = selectedRole || Role.USER;

  // Find the user by Clerk ID and include related data
  let loggedInUser = await prisma.user.findUnique({
    where: {
      clerkId: user.id,
    },
    include: {
      entrepreneur: true,  // Include related Entrepreneur model if it exists
      investor: {
        include: {
          investmentOpportunities: true,  // Include related Investment model
        },
      },
      investments: true,  // Include related Investment model
    },
  });

  if (loggedInUser) {
    if (loggedInUser.role !== role) {
      loggedInUser = await prisma.user.update({
        where: {
          clerkId: user.id,
        },
        data: {
          role: role, // Update the role
        },
        include: {
          entrepreneur: true,
          investor: {
            include: {
              investmentOpportunities: true,
            },
          },
          investments: true,
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
    include: {
      entrepreneur: true,
      investor: {
        include: {
          investmentOpportunities: true,
        },
      },
      investments: true,
    },
  });

  if (loggedInUser) {
    loggedInUser = await prisma.user.update({
      where: {
        email: user.emailAddresses[0].emailAddress,
      },
      data: {
        clerkId: user.id,
        name: `${user.firstName} ${user.lastName}`,
        role: role,
      },
      include: {
        entrepreneur: true,
        investor: {
          include: {
            investmentOpportunities: true,
          },
        },
        investments: true,
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
      role: role,
    },
    include: {
      entrepreneur: true,
      investor: {
        include: {
          investmentOpportunities: true,
        },
      },
      investments: true,
    },
  });

  return newUser;
};
