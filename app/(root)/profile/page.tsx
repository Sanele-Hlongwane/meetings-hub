'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { currentUser } from '@clerk/nextjs';
import prisma, { User, Role, Entrepreneur, Investor, ProEntrepreneurProfile, ProInvestorProfile } from '@/lib/prisma';

interface UserProfile extends User {
  role: Role;
  entrepreneur?: Entrepreneur & {
    professionalProfile?: ProEntrepreneurProfile;
  };
  investor?: Investor & {
    professionalProfile?: ProInvestorProfile;
  };
}

const ProfilePage = () => {
  const router = useRouter();
  const [user, setUser] = useState<UserProfile | null>(null); 
  const [editMode, setEditMode] = useState(false);
  const [roleSelectionMode, setRoleSelectionMode] = useState(false);
  const [formData, setFormData] = useState({
    businessName: '',
    businessPlan: '',
    fundsAvailable: 0,
    investmentPreferences: '',
    companyName: '',
    companyWebsite: '',
    linkedinUrl: '',
  });
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const clerkUser = await currentUser();
        if (!clerkUser) {
          throw new Error('User not found');
        }

        // Fetch user from prisma
        const existingUser = await prisma.user.findUnique({
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
          setUser(existingUser as UserProfile);
          setFormData({
            businessName: existingUser.entrepreneur?.businessName || '',
            businessPlan: existingUser.entrepreneur?.businessPlan || '',
            fundsAvailable: existingUser.investor?.fundsAvailable || 0,
            investmentPreferences: existingUser.investor?.investmentPreferences || '',
            companyName: existingUser.investor?.professionalProfile?.companyName || '',
            companyWebsite: existingUser.investor?.professionalProfile?.companyWebsite || '',
            linkedinUrl: existingUser.investor?.professionalProfile?.linkedinUrl || '',
          });

          if (existingUser.role.name === 'default') {
            setRoleSelectionMode(true);
          }
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

  const handleRoleChange = async () => {
    if (!selectedRole) {
      toast.error('Please select a role');
      return;
    }

    try {
      const updatedUser = await prisma.user.update({
        where: { id: user?.id },
        data: {
          role: {
            connect: { name: selectedRole },
          },
        },
      });

      setUser(updatedUser as UserProfile);
      setRoleSelectionMode(false);
    } catch (error) {
      console.error('Error updating role:', error);
      toast.error('Failed to update role');
    }
  };

  const handleSave = async () => {
    try {
      if (user?.role.name === 'entrepreneur') {
        await prisma.entrepreneur.update({
          where: { id: user.entrepreneur?.id },
          data: {
            businessName: formData.businessName,
            businessPlan: formData.businessPlan,
          },
        });
      } else if (user?.role.name === 'investor') {
        await prisma.investor.update({
          where: { id: user.investor?.id },
          data: {
            fundsAvailable: formData.fundsAvailable,
            investmentPreferences: formData.investmentPreferences,
          },
        });
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

      {roleSelectionMode ? (
        <div>
          <h2>Select Your Role</h2>
          <select
            value={selectedRole || ''}
            onChange={(e) => setSelectedRole(e.target.value)}
          >
            <option value="" disabled>Select role</option>
            <option value="entrepreneur">Entrepreneur</option>
            <option value="investor">Investor</option>
          </select>
          <button onClick={handleRoleChange}>Save Role</button>
        </div>
      ) : editMode ? (
        <div>
          {/* Form fields based on role */}
          {user.role.name === 'entrepreneur' && (
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

          {user.role.name === 'investor' && (
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
          {user.role.name === 'entrepreneur' && (
            <>
              <h2>Entrepreneur Details</h2>
              <p>Business Name: {user.entrepreneur?.businessName}</p>
              <p>Business Plan: {user.entrepreneur?.businessPlan}</p>
            </>
          )}

          {user.role.name === 'investor' && (
            <>
              <h2>Investor Details</h2>
              <p>Funds Available: {user.investor?.fundsAvailable}</p>
              <p>Investment Preferences: {user.investor?.investmentPreferences}</p>
            </>
          )}

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


