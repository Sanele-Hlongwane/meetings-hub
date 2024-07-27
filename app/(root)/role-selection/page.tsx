'use client';

// pages/role-selection.tsx
import { useState } from 'react';
import { useRouter } from 'next/router';
import { prisma } from '@/lib/prisma'; // Adjust the import based on your setup
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

    // Build the update data based on the selected role
    const updateData: any = {
      role: role === 'entrepreneur' ? 'ENTREPRENEUR' : 'INVESTOR',
    };

    if (role === 'entrepreneur') {
      updateData.entrepreneur = { create: {} }; // Provide necessary fields for entrepreneur creation if needed
    } else if (role === 'investor') {
      updateData.investor = { create: {} }; // Provide necessary fields for investor creation if needed
    }

    // Save the role and user data to Prisma
    await prisma.user.update({
      where: { clerkId: user.id },
      data: updateData,
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
