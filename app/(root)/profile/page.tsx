'use client';

import { useRef, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { currentUser } from '@clerk/nextjs/server';
import prisma, { User, Role, Entrepreneur, Investor } from '@/lib/prisma'; // Adjusted import statement

const ProfilePage = () => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null); // Ensure User type is correctly imported
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    businessName: '',
    businessPlan: '',
    fundsAvailable: 0,
    investmentPreferences: '',
    companyName: '',
    companyWebsite: '',
    linkedinUrl: '',
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const clerkUser = await currentUser();
        if (!clerkUser) {
          throw new Error('User not found');
        }

        // Fetch user from db
        const existingUser = await db.user.findUnique({
          where: {
            clerkId: clerkUser.id,
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

        if (existingUser) {
          setUser(existingUser);
          setFormData({
            businessName: existingUser.entrepreneur?.businessName || '',
            businessPlan: existingUser.entrepreneur?.businessPlan || '',
            fundsAvailable: existingUser.investor?.fundsAvailable || 0,
            investmentPreferences: existingUser.investor?.investmentPreferences || '',
            companyName: existingUser.investor?.professionalProfile?.companyName || '',
            companyWebsite: existingUser.investor?.professionalProfile?.companyWebsite || '',
            linkedinUrl: existingUser.investor?.professionalProfile?.linkedinUrl || '',
          });
        } else {
          throw new Error('User not found in database');
        }
      } catch (error) {
        console.error('Error fetching user:', error);
        toast.error('Failed to fetch user information');
        router.push('/'); // Redirect to home or login page on error
      }
    };

    fetchUser();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      if (user?.role.name === 'default') {
        // Handle saving for default role
        if (user.entrepreneur) {
          await db.entrepreneur.update({
            where: { id: user.entrepreneur.id },
            data: {
              businessName: formData.businessName,
              businessPlan: formData.businessPlan,
            },
          });
        } else if (user.investor) {
          await db.investor.update({
            where: { id: user.investor.id },
            data: {
              fundsAvailable: formData.fundsAvailable,
              investmentPreferences: formData.investmentPreferences,
            },
          });
        } else {
          throw new Error('User does not have a valid entrepreneur or investor profile');
        }
      } else {
        throw new Error('Unsupported role');
      }

      toast.success('Profile updated successfully');
      setEditMode(false); // Exit edit mode after saving
    } catch (error) {
      console.error('Error saving profile:', error);
      toast.error('Failed to save profile');
    }
  };

  const handleEdit = () => {
    setEditMode(true);
  };

  if (!user) {
    return <div>Loading...</div>; // or a loading indicator
  }

  return (
    <div>
      <h1>Profile Page</h1>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      <p>Role: {user.role.name}</p>
      
      {editMode ? (
        <div>
          {/* Form fields based on role */}
          {user.role.name === 'default' && (
            <>
              {/* Entrepreneur fields */}
              {user.entrepreneur && (
                <>
                  <input
                    type="text"
                    name="businessName"
                    value={formData.businessName}
                    onChange={handleInputChange}
                    placeholder="Business Name"
                  />
                  <textarea
                    name="businessPlan"
                    value={formData.businessPlan}
                    onChange={handleInputChange}
                    placeholder="Business Plan"
                  />
                </>
              )}

              {/* Investor fields */}
              {user.investor && (
                <>
                  <input
                    type="number"
                    name="fundsAvailable"
                    value={formData.fundsAvailable}
                    onChange={handleInputChange}
                    placeholder="Funds Available"
                  />
                  <input
                    type="text"
                    name="investmentPreferences"
                    value={formData.investmentPreferences}
                    onChange={handleInputChange}
                    placeholder="Investment Preferences"
                  />
                </>
              )}
            </>
          )}
          
          {/* Common fields for both roles */}
          <input
            type="text"
            name="companyName"
            value={formData.companyName}
            onChange={handleInputChange}
            placeholder="Company Name"
          />
          <input
            type="text"
            name="companyWebsite"
            value={formData.companyWebsite}
            onChange={handleInputChange}
            placeholder="Company Website"
          />
          <input
            type="text"
            name="linkedinUrl"
            value={formData.linkedinUrl}
            onChange={handleInputChange}
            placeholder="LinkedIn URL"
          />

          <button onClick={handleSave}>Save</button>
        </div>
      ) : (
        <div>
          {/* Display profile details */}
          {/* Entrepreneur details */}
          {user.role.name === 'default' && user.entrepreneur && (
            <>
              <h2>Entrepreneur Details</h2>
              <p>Business Name: {user.entrepreneur.businessName}</p>
              <p>Business Plan: {user.entrepreneur.businessPlan}</p>
            </>
          )}

          {/* Investor details */}
          {user.role.name === 'default' && user.investor && (
            <>
              <h2>Investor Details</h2>
              <p>Funds Available: {user.investor.fundsAvailable}</p>
              <p>Investment Preferences: {user.investor.investmentPreferences}</p>
            </>
          )}

          {/* Common profile details */}
          <h2>Professional Profile</h2>
          <p>Company Name: {user.investor?.professionalProfile?.companyName || user.entrepreneur?.professionalProfile?.companyName}</p>
          <p>Company Website: {user.investor?.professionalProfile?.companyWebsite || user.entrepreneur?.professionalProfile?.companyWebsite}</p>
          <p>LinkedIn URL: {user.investor?.professionalProfile?.linkedinUrl || user.entrepreneur?.professionalProfile?.linkedinUrl}</p>

          <button onClick={handleEdit}>Edit</button>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;

