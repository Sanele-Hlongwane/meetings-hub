import { useState, useEffect } from 'react';
import updateRole from '@/app/actions/updateRole';
import addEntrepreneur from '@/app/actions/addEntrepreneur';
import addInvestor from '@/app/actions/addInvestor';
import { toast } from 'react-toastify';
import { checkUser } from '@/lib/checkUser';

const AddRole = () => {
  const [role, setRole] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null); // Replace `any` with your user type

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await checkUser(); // Fetch user details from the server
      setUser(userData);
      if (userData?.role) {
        setRole(userData.role.name); // Adjust according to your data structure
      }
    };

    fetchUser();
  }, []);

  const clientAction = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const roleName = formData.get('name') as string;

    if (!roleName) {
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
    }
  };

  const renderRoleForm = () => {
    if (role === 'entrepreneur') {
      return (
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
      );
    } else if (role === 'investor') {
      return (
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
      );
    }
    return null;
  };

  const renderRoleAssignmentForm = () => {
    if (!role) {
      return (
        <form onSubmit={clientAction} className="bg-dark-1 text-white">
          <div className='relative'>
            <label htmlFor='name' className='block text-sm font-medium text-white'>
              Role Name
            </label>
            <select
              id='name'
              name='name'
              className='mt-1 block w-full bg-gray-800 text-white pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md'
              required
            >
              <option value=''>Select role</option>
              <option value='entrepreneur'>Entrepreneur</option>
              <option value='investor'>Investor</option>
            </select>
          </div>
          <button
            type='submit'
            className='mt-4 w-full inline-flex items-center justify-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-yellow-500 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500'
          >
            Assign Role
          </button>
        </form>
      );
    }
    return null;
  };

  return (
    <div className="max-w-md mx-auto my-20 p-6 bg-dark-1 text-white rounded-xl shadow-md space-y-4">
      <div className="max-w-7xl mx-auto pt-20">
        <h3 className="text-2xl font-bold text-white">Assign Role</h3>
        {renderRoleAssignmentForm()}
        {renderRoleForm()}
      </div>
    </div>
  );
};

export default AddRole;
