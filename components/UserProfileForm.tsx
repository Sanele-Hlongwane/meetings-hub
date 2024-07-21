// components/UserProfileForm.tsx

import { useState } from 'react';

interface UserProfileFormProps {
  user: any;
  onUpdate: (user: any) => void;
}

const UserProfileForm: React.FC<UserProfileFormProps> = ({ user, onUpdate }) => {
  const [name, setName] = useState(user.name || '');
  const [imageUrl, setImageUrl] = useState(user.imageUrl || '');
  const [role, setRole] = useState(user.role || 'DEFAULT');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const updatedUser = { name, imageUrl, role };
    onUpdate(updatedUser);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="imageUrl">Image URL</label>
        <input
          id="imageUrl"
          type="text"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="role">Role</label>
        <select
          id="role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="DEFAULT">Default</option>
          <option value="ENTREPRENEUR">Entrepreneur</option>
          <option value="INVESTOR">Investor</option>
        </select>
      </div>
      <button type="submit">Update Profile</button>
    </form>
  );
};

export default UserProfileForm;
