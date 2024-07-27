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
      const user = await checkUser(null);

      if (user) {
        const roleName = user.role?.name;
        if (roleName === 'entrepreneur' || roleName === 'investor') {
          router.push('/');
          return;
        }
        setUserRole(roleName);
      }
    };

    fetchUser();
  }, [router]);

  // Handle form submission
  const clientAction = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const selectedRole = formData.get('name') as string; // Ensure role name is captured correctly

    if (!selectedRole || selectedRole === '') {
      toast.error('Role name is required');
      return;
    }

    // Show confirmation dialog before assigning the role
    const confirm = window.confirm(`Are you sure you want to save role as ${selectedRole}? This cannot be changed.`);
    if (!confirm) {
      return;
    }

    const { data, error } = await updateRole({ name: selectedRole });

    if (error) {
      toast.error(error);
    } else {
      toast.success(`Role ${data?.name} assigned`);
      // Redirect to the homepage after successfully assigning the role
      router.push('/');
    }
  };

  return (
    <div className="max-w-md mx-auto my-20 p-6 bg-white rounded-xl shadow-md space-y-4">
      <h3 className="text-2xl font-bold text-gray-800">Assign Role</h3>
      <form ref={formRef} onSubmit={clientAction}>
        <div className='relative'>
          <label htmlFor='name' className='block text-sm font-medium text-gray-700'>
            Role Name
          </label>
          <select
            id='name'
            name='name'
            className='mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md'
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
    </div>
  );
};

export default AddRole;
