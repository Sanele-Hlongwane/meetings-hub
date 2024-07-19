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
  const [profileDetailsFormVisible, setProfileDetailsFormVisible] = useState<boolean>(false);
  const [entrepreneurData, setEntrepreneurData] = useState<any>(null);
  const [investorData, setInvestorData] = useState<any>(null);
  const formRef = useRef<HTMLFormElement>(null);

  // Fetch user details and profile data on component mount
  useEffect(() => {
    const fetchUserAndProfileData = async () => {
      const userData = await checkUser();
      setUser(userData);

      if (userData?.role) {
        setRole(userData.role.name);

        if (userData.role.name === 'entrepreneur') {
          // Fetch entrepreneur profile data
          const entrepreneurProfile = await fetchProEntrepreneurProfile(userData.id);
          setEntrepreneurData(entrepreneurProfile);
        } else if (userData.role.name === 'investor') {
          // Fetch investor profile data
          const investorProfile = await fetchProInvestorProfile(userData.id);
          setInvestorData(investorProfile);
        }
      }
    };

    fetchUserAndProfileData();
  }, []);

  const fetchProEntrepreneurProfile = async (entrepreneurId: string) => {
    // Implement the function to fetch ProEntrepreneurProfile data
  };

  const fetchProInvestorProfile = async (investorId: string) => {
    // Implement the function to fetch ProInvestorProfile data
  };

  const clientAction = async (event: React.FormEvent<HTMLFormElement>) => {
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
    const businessName = formData.get('businessName') as string;
    const businessPlan = formData.get('businessPlan') as string;

    if (!businessName || !businessPlan) {
      toast.error('All fields are required');
      return;
    }

    const { data, error } = await addEntrepreneur({ businessName, businessPlan });

    if (error) {
      toast.error(error);
    } else {
      toast.success(`Entrepreneur data added for ${data?.businessName}`);
      // Fetch and set entrepreneur profile data
      const entrepreneurProfile = await fetchProEntrepreneurProfile(user?.id);
      setEntrepreneurData(entrepreneurProfile);
    }
  };

  const handleInvestorSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const fundsAvailable = parseFloat(formData.get('fundsAvailable') as string);
    const investmentPreferences = formData.get('investmentPreferences') as string;

    if (isNaN(fundsAvailable) || !investmentPreferences) {
      toast.error('All fields are required');
      return;
    }

    const { data, error } = await addInvestor({ fundsAvailable, investmentPreferences });

    if (error) {
      toast.error(error);
    } else {
      toast.success(`Investor data added with ${data?.fundsAvailable} funds available`);
      // Fetch and set investor profile data
      const investorProfile = await fetchProInvestorProfile(user?.id);
      setInvestorData(investorProfile);
    }
  };

  const handleProEntrepreneurProfileSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
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
      // Fetch updated entrepreneur profile data
      const entrepreneurProfile = await fetchProEntrepreneurProfile(user?.id);
      setEntrepreneurData(entrepreneurshipProfile);
    }
  };

  const handleProInvestorProfileSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
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
      // Fetch updated investor profile data
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
            <>
              <form onSubmit={handleEntrepreneurSubmit} className="bg-dark-1 text-white space-y-4">
                <div className="relative">
                  <label htmlFor="businessName" className="block text-sm font-medium text-white">
                    Business Name
                  </label>
                  <input
                    type="text"
                    id="businessName"
                    name="businessName"
                    className="mt-1 block w-full bg-gray-800 text-white pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                    required
                  />
                </div>
                <div className="relative">
                  <label htmlFor="businessPlan" className="block text-sm font-medium text-white">
                    Business Plan
                  </label>
                  <textarea
                    id="businessPlan"
                    name="businessPlan"
                    className="mt-1 block w-full bg-gray-800 text-white pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="mt-4 w-full inline-flex items-center justify-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-yellow-500 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                >
                  Submit Entrepreneur Data
                </button>
              </form>
            </>
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
            <>
              <form onSubmit={handleInvestorSubmit} className="bg-dark-1 text-white space-y-4">
                <div className="relative">
                  <label htmlFor="fundsAvailable" className="block text-sm font-medium text-white">
                    Funds Available
                  </label>
                  <input
                    type="number"
                    id="fundsAvailable"
                    name="fundsAvailable"
                    className="mt-1 block w-full bg-gray-800 text-white pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                    required
                  />
                </div>
                <div className="relative">
                  <label htmlFor="investmentPreferences" className="block text-sm font-medium text-white">
                    Investment Preferences
                  </label>
                  <textarea
                    id="investmentPreferences"
                    name="investmentPreferences"
                    className="mt-1 block w-full bg-gray-800 text-white pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="mt-4 w-full inline-flex items-center justify-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-yellow-500 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                >
                  Submit Investor Data
                </button>
              </form>
            </>
          )}
        </>
      );
    } else {
      return (
        <form onSubmit={clientAction} className="bg-dark-1 text-white space-y-4">
          <div className="relative">
            <label htmlFor="name" className="block text-sm font-medium text-white">
              Role
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="mt-1 block w-full bg-gray-800 text-white pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              required
            />
          </div>
          <button
            type="submit"
            className="mt-4 w-full inline-flex items-center justify-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-yellow-500 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
          >
            Assign Role
          </button>
        </form>
      );
    }
  };

  return (
    <div className="p-4">
      {role ? (
        <div>
          <p className="text-white">Your role is: {role}</p>
          {renderRoleForm()}
        </div>
      ) : (
        renderRoleForm()
      )}
    </div>
  );
};

export default AddRole;
