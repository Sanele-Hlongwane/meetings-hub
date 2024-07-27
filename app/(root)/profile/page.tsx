// pages/profile.tsx
'use client';
import { GetServerSideProps } from 'next';
import { PrismaClient } from '@prisma/client';
import { currentUser } from '@clerk/nextjs';
import { useState } from 'react';

const prisma = new PrismaClient();

export const getServerSideProps: GetServerSideProps = async () => {
  const user = await currentUser();

  if (!user) {
    return {
      props: {
        user: null,
      },
    };
  }

  let loggedInUser = await prisma.user.findUnique({
    where: {
      clerkId: user.id,
    },
    include: {
      role: true,
    },
  });

  if (!loggedInUser) {
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

      return {
        props: {
          user: loggedInUser,
        },
      };
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

    return {
      props: {
        user: newUser,
      },
    };
  }

  return {
    props: {
      user: loggedInUser,
    },
  };
};

interface Role {
  id: string;
  name: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  imageUrl: string;
  role: Role;
}

interface ProfilePageProps {
  user: User | null;
}

const ProfilePage = ({ user }: ProfilePageProps) => {
  const [userData, setUserData] = useState<User | null>(user);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    imageUrl: user?.imageUrl || '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUpdate = async () => {
    if (userData) {
      const response = await fetch('/api/updateUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: userData.id, ...formData }),
      });
      const updatedUser = await response.json();
      setUserData(updatedUser);
      setEditMode(false);
    }
  };

  const handleDelete = async () => {
    if (userData) {
      await fetch('/api/deleteUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: userData.id }),
      });
      setUserData(null);
    }
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
