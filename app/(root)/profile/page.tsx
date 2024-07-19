'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { checkUser } from '@/lib/checkUser';

interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: { name: string };
  entrepreneur?: {
    businessName: string;
    businessPlan: string;
    professionalProfile?: {
      companyName: string;
      companyWebsite: string;
      linkedinUrl: string;
    };
  };
  investor?: {
    fundsAvailable: number;
    investmentPreferences: string;
    professionalProfile?: {
      companyName: string;
      companyWebsite: string;
      linkedinUrl: string;
    };
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
        const userData = await checkUser(null);
        if (!userData) {
          throw new Error('User data not found');
        }

        setUser(userData);
        setFormData({
          businessName: userData.entrepreneur?.businessName || '',
          businessPlan: userData.entrepreneur?.businessPlan || '',
          fundsAvailable: userData.investor?.fundsAvailable || 0,
          investmentPreferences: userData.investor?.investmentPreferences || '',
          companyName: userData.investor?.professionalProfile?.companyName || '',
          companyWebsite: userData.investor?.professionalProfile?.companyWebsite || '',
          linkedinUrl: userData.investor?.professionalProfile?.linkedinUrl || '',
        });

        if (userData.role.name === 'default') {
          setRoleSelectionMode(true);
        }
      } catch (error) {
        console.error('Error fetching user:', error);
        toast.error('Failed to fetch user information');
        router.push('/'); // Redirect to home or login page on error
      }
    };

    fetchUser();
  }, [router]);

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
      const response = await fetch('/api/user', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ role: selectedRole }),
      });

      if (!response.ok) {
        throw new Error('Failed to update role');
      }

      const updatedUser = await response.json();
      setUser(updatedUser);
      setRoleSelectionMode(false);
    } catch (error) {
      console.error('Error updating role:', error);
      toast.error('Failed to update role');
    }
  };

  const handleSave = async () => {
    try {
      const response = await fetch('/api/user', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          role: user?.role.name,
          data: {
            ...(user?.role.name === 'entrepreneur' && {
              businessName: formData.businessName,
              businessPlan: formData.businessPlan,
            }),
            ...(user?.role.name === 'investor' && {
              fundsAvailable: formData.fundsAvailable,
              investmentPreferences: formData.investmentPreferences,
            }),
            companyName: formData.companyName,
            companyWebsite: formData.companyWebsite,
            linkedinUrl: formData.linkedinUrl,
          },
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save profile');
      }

      const updatedUser = await response.json();
      setUser(updatedUser);
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
