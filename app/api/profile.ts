// pages/profile.tsx

import { useState, useEffect, FormEvent } from 'react';
import { UserWithRole } from '@/types/types'; // Adjust the import path
import { useRouter } from 'next/navigation';

// Fetch user data from the server
const fetchUser = async () => {
  const response = await fetch('/api/profile');
  if (!response.ok) {
    throw new Error('Failed to fetch user');
  }
  return response.json();
};

// Fetch roles for the dropdown
const fetchRoles = async () => {
  const response = await fetch('/api/roles');
  if (!response.ok) {
    throw new Error('Failed to fetch roles');
  }
  return response.json();
};

const Profile = () => {
  const [user, setUser] = useState<UserWithRole | null>(null);
  const [name, setName] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [role, setRole] = useState('');
  const [roles, setRoles] = useState<{ id: string; name: string }[]>([]);
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
        console.error(error);
      }
    };

    initialize();
  }, []);

  const handleUpdate = async (e: FormEvent) => {
    e.preventDefault();

    const response = await fetch('/api/updateProfile', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, imageUrl, role }),
    });

    if (!response.ok) {
      console.error('Failed to update profile');
      return;
    }

    router.reload(); // Reload the page to get updated user data
  };

  const handleDelete = async () => {
    const response = await fetch('/api/deleteProfile', {
      method: 'DELETE',
    });

    if (!response.ok) {
      console.error('Failed to delete profile');
      return;
    }

    router.push('/login'); // Redirect to login page or wherever appropriate
  };

  if (!user) {
    return <p>Loading...</p>;
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
          />
        </div>
        <div>
          <label>Image URL:</label>
          <input
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
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
