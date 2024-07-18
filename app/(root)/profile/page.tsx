'use client';

import { useState, useRef } from 'react';
import { toast } from 'react-toastify';
import { useAuth } from '@clerk/nextjs';
import { useRouter } from 'next/router';

const ProfileSetup = () => {
  const [role, setRole] = useState('');
  const formRef = useRef(null);
  const { user } = useAuth();
  const router = useRouter();

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData);

    try {
      const response = await fetch('/api/profile-setup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          role,
          data,
          userId: user.id,
          email: user.email,
          username: user.username,
          imageUrl: user.imageUrl,
        }),
      });

      if (response.ok) {
        toast.success('Profile updated successfully');
        router.push('/profile'); // Redirect to profile page
      } else {
        toast.error('Failed to update profile');
      }
    } catch (error) {
      toast.error('An error occurred');
    }
  };

  return (
    <div className="max-w-md mx-auto my-20 p-6 bg-dark-1 rounded-xl shadow-md py-24 space-y-4">
      <h3 className="text-2xl font-bold text-white">Profile Setup</h3>
      <form ref={formRef} onSubmit={handleSubmit}>
        <div className="relative">
          <label htmlFor="role" className="block text-sm font-medium text-white">
            Role
          </label>
          <select
            id="role"
            name="role"
            value={role}
            onChange={handleRoleChange}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            <option value="">Select role</option>
            <option value="entrepreneur">Entrepreneur</option>
            <option value="investor">Investor</option>
          </select>
        </div>

        {role && (
          <>
            <div className="relative">
              <label htmlFor="location" className="block text-sm font-medium text-white">
                Location
              </label>
              <input
                id="location"
                name="location"
                type="text"
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              />
            </div>
            <div className="relative">
              <label htmlFor="age" className="block text-sm font-medium text-white">
                Age
              </label>
              <input
                id="age"
                name="age"
                type="number"
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              />
            </div>
            <div className="relative">
              <label htmlFor="gender" className="block text-sm font-medium text-white">
                Gender
              </label>
              <select
                id="gender"
                name="gender"
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              >
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="relative">
              <label htmlFor="interests" className="block text-sm font-medium text-white">
                Interests (comma separated)
              </label>
              <input
                id="interests"
                name="interests"
                type="text"
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              />
            </div>
          </>
        )}

        {role === 'entrepreneur' && (
          <>
            <div className="relative">
              <label htmlFor="businessName" className="block text-sm font-medium text-white">
                Business Name
              </label>
              <input
                id="businessName"
                name="businessName"
                type="text"
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              />
            </div>
            <div className="relative">
              <label htmlFor="businessPlan" className="block text-sm font-medium text-white">
                Business Plan
              </label>
              <textarea
                id="businessPlan"
                name="businessPlan"
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              />
            </div>
          </>
        )}

        {role === 'investor' && (
          <>
            <div className="relative">
              <label htmlFor="fundsAvailable" className="block text-sm font-medium text-white">
                Funds Available
              </label>
              <input
                id="fundsAvailable"
                name="fundsAvailable"
                type="number"
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              />
            </div>
            <div className="relative">
              <label htmlFor="investmentPreferences" className="block text-sm font-medium text-white">
                Investment Preferences
              </label>
              <textarea
                id="investmentPreferences"
                name="investmentPreferences"
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              />
            </div>
          </>
        )}

        <button
          type="submit"
          className="mt-4 w-full inline-flex items-center justify-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-yellow-500 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
        >
          Setup Profile
        </button>
      </form>
    </div>
  );
};

export default ProfileSetup;
