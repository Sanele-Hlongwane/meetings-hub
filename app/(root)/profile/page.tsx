'use client';

import { useRef, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { currentUser } from '@clerk/nextjs/server';
import { PrismaClient, User } from '@prisma/client';

const prisma = new PrismaClient();

const ProfilePage = () => {
  const [userProfile, setUserProfile] = useState<User | null>(null);
  const [role, setRole] = useState<string>('');
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const loggedInUser = await currentUser();
      if (!loggedInUser) {
        throw new Error('User not authenticated');
      }

      const userProfile = await prisma.user.findUnique({
        where: {
          clerkId: loggedInUser.id,
        },
        include: {
          role: true,
          entrepreneur: {
            include: {
              professionalProfile: true,
            },
          },
          investor: {
            include: {
              professionalProfile: true,
            },
          },
        },
      });

      if (userProfile) {
        setUserProfile(userProfile);
        setRole(userProfile.role.name); // Set initial role if user has a role
      } else {
        throw new Error('User profile not found');
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
      // Handle error state or redirect to login page if user data is not available
      router.push('/login');
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!formRef.current || !userProfile) return;

    const formData = new FormData(formRef.current);
    const updatedProfileData = {
      location: formData.get('location') as string,
      age: parseInt(formData.get('age') as string),
      gender: formData.get('gender') as string,
      interests: (formData.get('interests') as string).split(',').map(i => i.trim()),
    };

    try {
      let updatedUser;
      if (userProfile.role.name === 'entrepreneur' && userProfile.entrepreneur) {
        updatedUser = await prisma.entrepreneur.update({
          where: {
            userId: userProfile.entrepreneur.userId,
          },
          data: {
            professionalProfile: {
              update: updatedProfileData,
            },
          },
          include: {
            professionalProfile: true,
          },
        });
      } else if (userProfile.role.name === 'investor' && userProfile.investor) {
        updatedUser = await prisma.investor.update({
          where: {
            userId: userProfile.investor.userId,
          },
          data: {
            professionalProfile: {
              update: updatedProfileData,
            },
          },
          include: {
            professionalProfile: true,
          },
        });
      }

      if (updatedUser) {
        setUserProfile(updatedUser);
        console.log('Profile updated successfully:', updatedUser);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  if (!userProfile) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Welcome, {userProfile.name}!</h1>
      <p>Email: {userProfile.email}</p>
      <p>Role: {userProfile.role.name}</p>

      <form ref={formRef} onSubmit={handleSubmit}>
        <label>
          Location:
          <input type="text" name="location" defaultValue={userProfile.location || ''} />
        </label>
        <br />
        <label>
          Age:
          <input type="number" name="age" defaultValue={userProfile.age?.toString() || ''} />
        </label>
        <br />
        <label>
          Gender:
          <input type="text" name="gender" defaultValue={userProfile.gender || ''} />
        </label>
        <br />
        <label>
          Interests (comma-separated):
          <input type="text" name="interests" defaultValue={userProfile.interests?.join(', ') || ''} />
        </label>
        <br />
        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
};

export default ProfilePage;


