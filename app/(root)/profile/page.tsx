'use client';

import { useState, useEffect, FormEvent } from 'react';
import { UserWithRole } from '@/types/types';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

// Fetch user data from the server
const fetchUser = async () => {
  try {
    const response = await fetch('/api/profile');
    if (!response.ok) throw new Error('Failed to fetch user');
    return response.json();
  } catch (error) {
    console.error(error);
    throw error; 
  }
};

// Fetch roles for the dropdown
const fetchRoles = async () => {
  try {
    const response = await fetch('/api/roles');
    if (!response.ok) throw new Error('Failed to fetch roles');
    return response.json();
  } catch (error) {
    console.error(error);
    throw error; // Rethrow to handle in component
  }
};

const Profile = () => {
  const [user, setUser] = useState<UserWithRole | null>(null);
  const [name, setName] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [role, setRole] = useState('');
  const [roles, setRoles] = useState<{ id: string; name: string }[]>([]);
  const [error, setError] = useState<string | null>(null); // To handle errors
  const router = useRouter();

  useEffect(() => {
    const initialize = async () => {
      try {
        const userData = await fetchUser();
        setUser(userData);
        setName(userData.name || '');
        setImageUrl(userData.imageUrl || '');
        setRole(userData.role?.name || '');

        const rolesData = await fetchRoles();
        setRoles(rolesData);
      } catch (error) {
        setError('Error loading user data');
        console.error(error);
        toast.error('Failed to load user data'); 
      }
    };

    initialize();
  }, []);

  const handleUpdate = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/updateProfile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, imageUrl, role }),
      });

      if (!response.ok) throw new Error('Failed to update profile');

      toast.success('Profile updated successfully!'); 
      router.reload(); 
    } catch (error) {
      setError('Error updating profile');
      console.error(error);
      toast.error('Failed to update profile'); 
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch('/api/deleteProfile', {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete profile');

      toast.success('Profile deleted successfully!'); 
      router.push('/sign-up'); 
    } catch (error) {
      setError('Error deleting profile');
      console.error(error);
      toast.error('Failed to delete profile'); // Show toast on error
    }
  };

  if (error) {
    return <p>{error}</p>; // Show error message if there's any
  }

  if (!user) {
    return <p>Loading...</p>; // Loading state while fetching data
  }

  return (
    <div>
      <h1>Profile</h1>
      <form onSubmit={handleUpdate}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
          />
        </div>
        <div>
          <label>Image URL:</label>
          <input
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="Enter image URL"
          />
        </div>
        <div>
          <label>Role:</label>
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            {roles.map((r) => (
              <option key={r.id} value={r.name}>
                {r.name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Update Profile</button>
      </form>
      <button onClick={handleDelete}>Delete Profile</button>
    </div>
  );
};

export default Profile;
