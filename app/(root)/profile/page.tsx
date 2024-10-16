'use client';

import { UserProfile } from '@clerk/nextjs';

const Profile = () => {
  return (
    <div className="w-full flex-center mt-24">
      <UserProfile />
    </div>
  );
};

export default Profile;
