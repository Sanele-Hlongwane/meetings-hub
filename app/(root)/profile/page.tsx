'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '@clerk/nextjs/server';
import { prisma } from '@/lib/prisma';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProfilePage = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { userId } = auth();
        if (!userId) {
          router.push('/sign-in');
          return;
        }

        const userData = await prisma.user.findUnique({
          where: { clerkId: userId },
          include: { role: true },
        });

        if (!userData) {
          toast.error('User not found');
          router.push('/sign-in');
          return;
        }

        setUser(userData);
      } catch (error) {
        toast.error('Failed to fetch user data');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [router]);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (!user) {
    return null;
  }

  const { role, name, email, imageUrl } = user;

  return (
    <div className="max-w-2xl mx-auto my-12 p-8 bg-gray-900 rounded-xl shadow-lg space-y-6 text-white">
      <h1 className="text-2xl font-bold">Profile</h1>
      {imageUrl && <img src={imageUrl} alt={`${name}'s profile`} className="w-32 h-32 rounded-full mx-auto" />}
      <p><strong>Name:</strong> {name}</p>
      <p><strong>Email:</strong> {email}</p>
      {role && (role.name === 'entrepreneur' || role.name === 'investor') ? (
        <>
          <p><strong>Role:</strong> {role.name.charAt(0).toUpperCase() + role.name.slice(1)}</p>
          {/* Display other details related to the role here */}
        </>
      ) : (
        <button
          onClick={() => router.push('/role-selection')}
          className="mt-4 w-full inline-flex items-center justify-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-yellow-500 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
        >
          Choose Role
        </button>
      )}
    </div>
  );
};

export default ProfilePage;
