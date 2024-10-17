import { UserProfile } from '@clerk/nextjs';

const UserProfilePage = () => (
  <div className="flex flex-col items-center justify-center m-5 mt-24">
    <UserProfile path="/user-profile"/>
  </div>
);

export default UserProfilePage;
