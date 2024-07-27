// pages/role-selection.tsx
import { GetServerSideProps } from 'next';
import { prisma } from '@/lib/prisma'; // Adjust the import based on your setup
import { currentUser } from '@clerk/nextjs/server';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const user = await currentUser(context.req);

  if (!user) {
    return {
      redirect: {
        destination: '/sign-in', // Redirect to sign-in page if not authenticated
        permanent: false,
      },
    };
  }

  return {
    props: { user },
  };
};

type RoleSelectionProps = {
  user: { id: string };
};

export default function RoleSelection({ user }: RoleSelectionProps) {
  const [role, setRole] = useState<string | null>(null);
  const router = useRouter();

  const handleRoleSelection = async () => {
    if (!role || !user) return;

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
