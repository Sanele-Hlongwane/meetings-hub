'use client';

import { useRef, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import updateRole from '@/app/api/updaterole';
import { toast } from 'react-toastify';
import { checkUser } from '@/lib/checkUser';

const AddRole = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const router = useRouter();

  // Fetch user data and role on component mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await checkUser(null);

        if (user) {
          const roleName = user.role?.name;
          if (roleName === 'entrepreneur' || roleName === 'investor') {
            router.push('/');
            return;
          }
          setUserRole(roleName);
        }
      } catch (error) {
        toast.error('Failed to fetch user data');
      }
    };

    fetchUser();
  }, [router]);

  // Handle form submission
  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const selectedRole = formData.get('name') as string;

    if (!selectedRole || selectedRole === '') {
      toast.error('Role name is required');
      return;
    }

    // Show confirmation dialog before assigning the role
    const confirm = window.confirm(`Are you sure you want to save the role as ${selectedRole}? This cannot be changed.`);
    if (!confirm) {
      return;
    }

    try {
      const { data, error } = await updateRole({ name: selectedRole });

      if (error) {
        toast.error('Failed to assign role: ' + error);
      } else {
        toast.success(`Role ${data?.name} assigned successfully`);
        router.push('/');
      }
    } catch (error) {
      toast.error('An unexpected error occurred while assigning the role');
    }
  };

  return (
    <div className="max-w-md mx-auto my-12 p-8 bg-gray-900 rounded-xl shadow-lg space-y-6">
      <h3 className="text-xl font-semibold text-white">Assign Role</h3>
      <form ref={formRef} onSubmit={handleFormSubmit} className="space-y-4">
        <div className="relative">
          <label htmlFor="name" className="block text-sm font-medium text-gray-300">
            Role Name
          </label>
          <select
            id="name"
            name="name"
            className="mt-1 block w-full bg-gray-800 text-gray-300 border-gray-600 rounded-md py-2 px-3 text-base focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
            aria-required="true"
            aria-describedby="role-name-description"
          >
            <option value="">Select role</option>
            <option value="entrepreneur">Entrepreneur</option>
            <option value="investor">Investor</option>
          </select>
          <p id="role-name-description" className="text-xs text-gray-400 mt-1">
            Choose the role you want to assign to the user. This action cannot be undone.
          </p>
        </div>
        <button
          type="submit"
          className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-yellow-500 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
        >
          Assign Role
        </button>
      </form>
    </div>
  );
};

export default AddRole;
