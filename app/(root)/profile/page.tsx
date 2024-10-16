'use client';

import { UserProfile } from '@clerk/nextjs';

const Profile = () => {
  return (
    <div className="w-full mt-24">
      <UserProfile />
    </div>
  );
};

export default Profile;
