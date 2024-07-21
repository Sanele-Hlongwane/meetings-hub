// app/profile/page.tsx
import { checkUser } from '@/lib/checkUser'; // Update the path as necessary
import { Role } from '@prisma/client';

interface ProfileProps {
  user: {
    id: number;
    clerkId: string;
    email: string;
    name: string;
    role: string;
    entrepreneur?: {
      id: number;
      business: string;
      pitch: string;
    } | null;
    investor?: {
      id: number;
      investmentOpportunities: any[]; // Correctly typed if you fetch it
    } | null;
    investments: any[];
  } | null;
}

const Profile = async () => {
  const user = await checkUser(); // Fetch the user data

  if (!user) {
    return <div className="text-white">Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="p-6 bg-bg-dark-1 dark:bg-dark-1 py-24 text-white dark:text-white">
        <h1 className="text-3xl font-bold mb-6">Profile</h1>
        <div className="bg-gray-800 shadow-md rounded p-6">
          <p className="text-white"><strong>Name:</strong> {user.name}</p>
          <p className="text-white"><strong>Email:</strong> {user.email}</p>
          <p className="text-white"><strong>Role:</strong> {user.role}</p>
          {user.entrepreneur && (
            <>
              <p className="text-white"><strong>Business:</strong> {user.entrepreneur.business}</p>
              <p className="text-white"><strong>Pitch:</strong> {user.entrepreneur.pitch}</p>
            </>
          )}
          {user.investor && (
            <>
              <p className="text-white"><strong>Investment Opportunities:</strong> {user.investor.investmentOpportunities.length}</p>
            </>
          )}
          <p className="text-white"><strong>Investments:</strong> {user.investments.length}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
