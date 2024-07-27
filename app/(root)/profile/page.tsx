'use client';
import { useState, useEffect } from 'react';
import { currentUser } from '@clerk/nextjs';
import { PrismaClient } from '@prisma/client';
import { GetServerSideProps } from 'next';

const prisma = new PrismaClient();

export const getServerSideProps: GetServerSideProps = async () => {
  const user = await checkUser();
  
  return {
    props: {
      user,
    },
  };
};

const checkUser = async () => {
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
          connect: { id: 'defaultRoleId' },
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
        connect: { id: defaultRole.id },
      },
    },
    include: {
      role: true,
    },
  });

  return newUser;
};

const ProfilePage = ({ user }) => {
  const [userData, setUserData] = useState(user);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    imageUrl: user.imageUrl,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUpdate = async () => {
    // Update user data in the database
    const updatedUser = await prisma.user.update({
      where: { id: userData.id },
      data: formData,
    });
    setUserData(updatedUser);
    setEditMode(false);
  };

  const handleDelete = async () => {
    // Delete user from the database
    await prisma.user.delete({
      where: { id: userData.id },
    });
    setUserData(null);
  };

  if (!userData) {
    return <p>No user data found.</p>;
  }

  return (
    <div>
      <h1>Profile Page</h1>
      {editMode ? (
        <div>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleInputChange}
          />
          <button onClick={handleUpdate}>Save</button>
        </div>
      ) : (
        <div>
          <img src={userData.imageUrl} alt="Profile Image" />
          <p>Name: {userData.name}</p>
          <p>Email: {userData.email}</p>
          <p>Role: {userData.role.name}</p>
          <button onClick={() => setEditMode(true)}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
