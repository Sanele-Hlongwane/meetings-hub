'use client';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { prisma } from '../lib/prisma'; // Adjust the import based on your setup
import { currentUser } from '@clerk/nextjs/server';

export default function RoleSelection() {
  const [role, setRole] = useState<string | null>(null);
  const router = useRouter();

  const handleRoleSelection = async () => {
    if (!role) return;

    const user = await currentUser();

    if (!user) {
      // Handle case where user is not authenticated
      return;
    }

    // Save the role and user data to Prisma
    await prisma.user.update({
      where: { clerkId: user.id },
      data: {
        role: role === 'entrepreneur' ? 'ENTREPRENEUR' : 'INVESTOR',
        ...(role === 'entrepreneur' && { entrepreneur: { create: {} } }),
        ...(role === 'investor' && { investor: { create: {} } }),
      },
    });

    // Redirect to the user's profile or dashboard
    router.push('/profile'); // Adjust the redirect based on your app
  };

  return (
    <main className="flex h-screen w-full items-center justify-center">
      <div className="text-center">
        <h1>Select Your Role</h1>
        <button onClick={() => setRole('entrepreneur')}>Entrepreneur</button>
        <button onClick={() => setRole('investor')}>Investor</button>
        <button onClick={handleRoleSelection} disabled={!role}>
          Confirm
        </button>
      </div>
    </main>
  );
}
