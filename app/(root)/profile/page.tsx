'use client';
import { useState, useEffect, useRef } from 'react';
import updateRole from '@/app/actions/updateRole';
import addEntrepreneur from '@/app/actions/addEntrepreneur';
import addInvestor from '@/app/actions/addInvestor';
import addProEntrepreneurProfile from '@/app/actions/addProEntrepreneurProfile';
import addProInvestorProfile from '@/app/actions/addProInvestorProfile';
import { toast } from 'react-toastify';
import { checkUser } from '@/lib/checkUser'; 

const AddRole = () => {
  const [role, setRole] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null); 
  const [entrepreneurData, setEntrepreneurData] = useState<any>(null);
  const [investorData, setInvestorData] = useState<any>(null);
  const [profileDetailsFormVisible, setProfileDetailsFormVisible] = useState<boolean>(false);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const fetchUserAndProfileData = async () => {
      const userData = await checkUser();
      setUser(userData);

      if (userData?.role) {
        setRole(userData.role.name);

        if (userData.role.name === 'entrepreneur') {
          const entrepreneurProfile = await fetchProEntrepreneurProfile(userData.id);
          setEntrepreneurData(entrepreneurProfile);
        } else if (userData.role.name === 'investor') {
          const investorProfile = await fetchProInvestorProfile(userData.id);
          setInvestorData(investorProfile);
        }
      }
    };

    fetchUserAndProfileData();
  }, []);

  const fetchProEntrepreneurProfile = async (entrepreneurId: string) => {
    try {
      const response = await fetch(`/api/entrepreneurProfile/${entrepreneurId}`);
      if (!response.ok) throw new Error('Failed to fetch profile data');
      return await response.json();
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const fetchProInvestorProfile = async (investorId: string) => {
    try {
      const response = await fetch(`/api/investorProfile/${investorId}`);
      if (!response.ok) throw new Error('Failed to fetch profile data');
      return await response.json();
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const handleRoleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const roleName = formData.get('name') as string;

    if (!roleName || roleName === '') {
      toast.error('Role name is required');
      return;
    }

    const { data, error } = await updateRole({ name: roleName });

    if (error) {
      toast.error(error);
    } else {
      toast.success(`Role ${data?.name} assigned`);
      setRole(roleName);
    }
  };

  const handleEntrepreneurSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const companyName = formData.get('companyName') as string;
    const companyWebsite = formData.get('companyWebsite') as string;
    const linkedinUrl = formData.get('linkedinUrl') as string;
    const location = formData.get('location') as string;
    const age = parseInt(formData.get('age') as string);
    const gender = formData.get('gender') as string;
    const interests = (formData.getAll('interests') as string[]);

    if (!companyName || !companyWebsite || !linkedinUrl) {
      toast.error('All required fields must be filled');
      return;
    }

    const { data, error } = await addProEntrepreneurProfile({
      entrepreneurId: user?.id,
      companyName,
      companyWebsite,
      linkedinUrl,
      location,
      age,
      gender,
      interests
    });

    if (error) {
      toast.error(error);
    } else {
      toast.success(`Pro Entrepreneur Profile data added for ${data?.companyName}`);
      const entrepreneurProfile = await fetchProEntrepreneurProfile(user?.id);
      setEntrepreneurData(entrepreneurProfile);
    }
  };

  const handleInvestorSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const companyName = formData.get('companyName') as string;
    const companyWebsite = formData.get('companyWebsite') as string;
    const linkedinUrl = formData.get('linkedinUrl') as string;
    const location = formData.get('location') as string;
    const age = parseInt(formData.get('age') as string);
    const gender = formData.get('gender') as string;
    const interests = (formData.getAll('interests') as string[]);

    if (!companyName || !companyWebsite || !linkedinUrl) {
      toast.error('All required fields must be filled');
      return;
    }

    const { data, error } = await addProInvestorProfile({
      investorId: user?.id,
      companyName,
      companyWebsite,
      linkedinUrl,
      location,
      age,
      gender,
      interests
    });

    if (error) {
      toast.error(error);
    } else {
      toast.success(`Pro Investor Profile data added for ${data?.companyName}`);
      const investorProfile = await fetchProInvestorProfile(user?.id);
      setInvestorData(investorProfile);
    }
  };

  const renderRoleForm = () => {
    if (role === 'entrepreneur') {
      return (
        <>
          {entrepreneurData ? (
            <div>
              <h2 className="text-xl font-bold text-white">Entrepreneur Profile</h2>
              <p className="text-white">Company Name: {entrepreneurData.companyName}</p>
              <p className="text-white">Company Website: {entrepreneurData.companyWebsite}</p>
              <p className="text-white">LinkedIn URL: {entrepreneurData.linkedinUrl}</p>
              <p className="text-white">Location: {entrepreneurData.location}</p>
              <p className="text-white">Age: {entrepreneurData.age}</p>
              <p className="text-white">Gender: {entrepreneurData.gender}</p>
              <p className="text-white">Interests: {entrepreneurData.interests.join(', ')}</p>
              <button
                className="mt-4 inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-yellow-500 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                onClick={() => setProfileDetailsFormVisible(true)}
              >
                Edit Profile
              </button>
            </div>
          ) : (
            <form onSubmit={handleProEntrepreneurProfileSubmit} className="bg-dark-1 text-white space-y-4">
              <div className="relative">
                <label htmlFor="companyName" className="block text-sm font-medium text-white">Company Name</label>
                <input
                  type="text"
                  id="companyName"
                  name="companyName"
                  className="mt-1 block w-full bg-gray-800 text-white pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  defaultValue={entrepreneurData?.companyName || ''}
                  required
                />
              </div>
              <div className="relative">
                <label htmlFor="companyWebsite" className="block text-sm font-medium text-white">Company Website</label>
                <input
                  type="url"
                  id="companyWebsite"
                  name="companyWebsite"
                  className="mt-1 block w-full bg-gray-800 text-white pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  defaultValue={entrepreneurData?.companyWebsite || ''}
                  required
                />
              </div>
              <div className="relative">
                <label htmlFor="linkedinUrl" className="block text-sm font-medium text-white">LinkedIn URL</label>
                <input
                  type="url"
                  id="linkedinUrl"
                  name="linkedinUrl"
                  className="mt-1 block w-full bg-gray-800 text-white pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  defaultValue={entrepreneurData?.linkedinUrl || ''}
                />
              </div>
              <div className="relative">
                <label htmlFor="location" className="block text-sm font-medium text-white">Location</label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  className="mt-1 block w-full bg-gray-800 text-white pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  defaultValue={entrepreneurData?.location || ''}
                />
              </div>
              <div className="relative">
                <label htmlFor="age" className="block text-sm font-medium text-white">Age</label>
                <input
                  type="number"
                  id="age"
                  name="age"
                  className="mt-1 block w-full bg-gray-800 text-white pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  defaultValue={entrepreneurData?.age || ''}
                />
              </div>
              <div className="relative">
                <label htmlFor="gender" className="block text-sm font-medium text-white">Gender</label>
                <input
                  type="text"
                  id="gender"
                  name="gender"
                  className="mt-1 block w-full bg-gray-800 text-white pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  defaultValue={entrepreneurData?.gender || ''}
                />
              </div>
              <div className="relative">
                <label htmlFor="interests" className="block text-sm font-medium text-white">Interests (comma separated)</label>
                <input
                  type="text"
                  id="interests"
                  name="interests"
                  className="mt-1 block w-full bg-gray-800 text-white pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  defaultValue={entrepreneurData?.interests.join(', ') || ''}
                />
              </div>
              <button
                type="submit"
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-yellow-500 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
              >
                Save
              </button>
            </form>
          )}
        </>
      );
    } else if (role === 'investor') {
      return (
        <>
          {investorData ? (
            <div>
              <h2 className="text-xl font-bold text-white">Investor Profile</h2>
              <p className="text-white">Company Name: {investorData.companyName}</p>
              <p className="text-white">Company Website: {investorData.companyWebsite}</p>
              <p className="text-white">LinkedIn URL: {investorData.linkedinUrl}</p>
              <p className="text-white">Location: {investorData.location}</p>
              <p className="text-white">Age: {investorData.age}</p>
              <p className="text-white">Gender: {investorData.gender}</p>
              <p className="text-white">Interests: {investorData.interests.join(', ')}</p>
              <button
                className="mt-4 inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-yellow-500 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                onClick={() => setProfileDetailsFormVisible(true)}
              >
                Edit Profile
              </button>
            </div>
          ) : (
            <form onSubmit={handleProInvestorProfileSubmit} className="bg-dark-1 text-white space-y-4">
              <div className="relative">
                <label htmlFor="companyName" className="block text-sm font-medium text-white">Company Name</label>
                <input
                  type="text"
                  id="companyName"
                  name="companyName"
                  className="mt-1 block w-full bg-gray-800 text-white pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  defaultValue={investorData?.companyName || ''}
                  required
                />
              </div>
              <div className="relative">
                <label htmlFor="companyWebsite" className="block text-sm font-medium text-white">Company Website</label>
                <input
                  type="url"
                  id="companyWebsite"
                  name="companyWebsite"
                  className="mt-1 block w-full bg-gray-800 text-white pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  defaultValue={investorData?.companyWebsite || ''}
                  required
                />
              </div>
              <div className="relative">
                <label htmlFor="linkedinUrl" className="block text-sm font-medium text-white">LinkedIn URL</label>
                <input
                  type="url"
                  id="linkedinUrl"
                  name="linkedinUrl"
                  className="mt-1 block w-full bg-gray-800 text-white pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  defaultValue={investorData?.linkedinUrl || ''}
                />
              </div>
              <div className="relative">
                <label htmlFor="location" className="block text-sm font-medium text-white">Location</label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  className="mt-1 block w-full bg-gray-800 text-white pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  defaultValue={investorData?.location || ''}
                />
              </div>
              <div className="relative">
                <label htmlFor="age" className="block text-sm font-medium text-white">Age</label>
                <input
                  type="number"
                  id="age"
                  name="age"
                  className="mt-1 block w-full bg-gray-800 text-white pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  defaultValue={investorData?.age || ''}
                />
              </div>
              <div className="relative">
                <label htmlFor="gender" className="block text-sm font-medium text-white">Gender</label>
                <input
                  type="text"
                  id="gender"
                  name="gender"
                  className="mt-1 block w-full bg-gray-800 text-white pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  defaultValue={investorData?.gender || ''}
                />
              </div>
              <div className="relative">
                <label htmlFor="interests" className="block text-sm font-medium text-white">Interests (comma separated)</label>
                <input
                  type="text"
                  id="interests"
                  name="interests"
                  className="mt-1 block w-full bg-gray-800 text-white pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  defaultValue={investorData?.interests.join(', ') || ''}
                />
              </div>
              <button
                type="submit"
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-yellow-500 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
              >
                Save
              </button>
            </form>
          )}
        </>
      );
    } else {
      return (
        <form onSubmit={handleRoleSubmit} className="bg-dark-1 text-white space-y-4">
          <div className="relative">
            <label htmlFor="role" className="block text-sm font-medium text-white">Assign Role</label>
            <select
              id="role"
              name="name"
              className="mt-1 block w-full bg-gray-800 text-white pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            >
              <option value="entrepreneur">Entrepreneur</option>
              <option value="investor">Investor</option>
            </select>
          </div>
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-yellow-500 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
          >
            Assign Role
          </button>
        </form>
      );
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-white">Assign or Edit Role</h1>
      {renderRoleForm()}
    </div>
  );
};

export default AddRole;
