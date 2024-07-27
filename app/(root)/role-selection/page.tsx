'use client';
import { currentUser } from '@clerk/nextjs/server';
import { prisma } from '@/lib/prisma'; // Adjust the import based on your setup
import { redirect } from 'next/navigation';

export default async function RoleSelection() {
  const user = await currentUser();

  if (!user) {
    // Redirect to sign-in if the user is not authenticated
    redirect('/sign-in');
  }

  const handleRoleSelection = async (role: 'entrepreneur' | 'investor') => {
    const updateData: any = {
      role: role === 'entrepreneur' ? 'ENTREPRENEUR' : 'INVESTOR',
    };

    if (role === 'entrepreneur') {
      updateData.entrepreneur = { create: {} }; // Provide necessary fields for entrepreneur creation if needed
    } else if (role === 'investor') {
      updateData.investor = { create: {} }; // Provide necessary fields for investor creation if needed
    }

    await prisma.user.update({
      where: { clerkId: user.id },
      data: updateData,
    });

    // Redirect to the user's profile or dashboard
    redirect('/profile'); // Adjust the redirect based on your app
  };

  return (
    <main className="flex h-screen w-full items-center justify-center">
      <div className="text-center">
        <h1>Select Your Role</h1>
        <button onClick={() => handleRoleSelection('entrepreneur')}>Entrepreneur</button>
        <button onClick={() => handleRoleSelection('investor')}>Investor</button>
      </div>
    </main>
  );
}
