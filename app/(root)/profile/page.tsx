'use client';

import { useRef, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { currentUser } from '@clerk/nextjs/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const ProfilePage = () => {
  const [userProfile, setUserProfile] = useState<any>(null);
  const [role, setRole] = useState('');
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
      router.push('/sign-in');
    }
  };

  const handleRoleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setRole(event.target.value);
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
      if (userProfile.role.name === 'entrepreneur') {
        updatedUser = await prisma.entrepreneur.update({
          where: {
            userId: userProfile.id,
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
      } else if (userProfile.role.name === 'investor') {
        updatedUser = await prisma.investor.update({
          where: {
            userId: userProfile.id,
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

      {userProfile.role.name === 'entrepreneur' && (
        <div>
          <h2>Entrepreneur Profile</h2>
          <p>Business Name: {userProfile.entrepreneur.businessName}</p>
          <p>Business Plan: {userProfile.entrepreneur.businessPlan}</p>

          {userProfile.entrepreneur.professionalProfile && (
            <div>
              <h3>Professional Profile</h3>
              <p>Company Name: {userProfile.entrepreneur.professionalProfile.companyName}</p>
              <p>Company Website: {userProfile.entrepreneur.professionalProfile.companyWebsite}</p>
              <p>LinkedIn URL: {userProfile.entrepreneur.professionalProfile.linkedinUrl}</p>
              <p>Location: {userProfile.entrepreneur.professionalProfile.location}</p>
              <p>Age: {userProfile.entrepreneur.professionalProfile.age}</p>
              <p>Gender: {userProfile.entrepreneur.professionalProfile.gender}</p>
              <p>Interests: {userProfile.entrepreneur.professionalProfile.interests.join(', ')}</p>
            </div>
          )}

          <form ref={formRef} onSubmit={handleSubmit}>
            <label>
              Location:
              <input type="text" name="location" defaultValue={userProfile.entrepreneur.professionalProfile?.location} />
            </label>
            <br />
            <label>
              Age:
              <input type="number" name="age" defaultValue={userProfile.entrepreneur.professionalProfile?.age?.toString()} />
            </label>
            <br />
            <label>
              Gender:
              <input type="text" name="gender" defaultValue={userProfile.entrepreneur.professionalProfile?.gender} />
            </label>
            <br />
            <label>
              Interests:
              <input type="text" name="interests" defaultValue={userProfile.entrepreneur.professionalProfile?.interests.join(', ')} />
            </label>
            <br />
            <button type="submit">Update Profile</button>
          </form>
        </div>
      )}

      {userProfile.role.name === 'investor' && (
        <div>
          <h2>Investor Profile</h2>
          <p>Funds Available: {userProfile.investor.fundsAvailable}</p>
          <p>Investment Preferences: {userProfile.investor.investmentPreferences}</p>

          {userProfile.investor.professionalProfile && (
            <div>
              <h3>Professional Profile</h3>
              <p>Company Name: {userProfile.investor.professionalProfile.companyName}</p>
              <p>Company Website: {userProfile.investor.professionalProfile.companyWebsite}</p>
              <p>LinkedIn URL: {userProfile.investor.professionalProfile.linkedinUrl}</p>
              <p>Location: {userProfile.investor.professionalProfile.location}</p>
              <p>Age: {userProfile.investor.professionalProfile.age}</p>
              <p>Gender: {userProfile.investor.professionalProfile.gender}</p>
              <p>Interests: {userProfile.investor.professionalProfile.interests.join(', ')}</p>
            </div>
          )}

          <form ref={formRef} onSubmit={handleSubmit}>
            <label>
              Location:
              <input type="text" name="location" defaultValue={userProfile.investor.professionalProfile?.location} />
            </label>
            <br />
            <label>
              Age:
              <input type="number" name="age" defaultValue={userProfile.investor.professionalProfile?.age?.toString()} />
            </label>
            <br />
            <label>
              Gender:
              <input type="text" name="gender" defaultValue={userProfile.investor.professionalProfile?.gender} />
            </label>
            <br />
            <label>
              Interests:
              <input type="text" name="interests" defaultValue={userProfile.investor.professionalProfile?.interests.join(', ')} />
            </label>
            <br />
            <button type="submit">Update Profile</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;

