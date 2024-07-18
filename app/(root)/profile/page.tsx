'use client';
import { useRef } from 'react';
import updateRole from '@/app/actions/updateRole';
import { toast } from 'react-toastify';
import { currentUser } from '@clerk/nextjs/server';

const AddRole = () => {
  
  const formRef = useRef<HTMLFormElement>(null);

  const clientAction = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const roleName = formData.get('name') as string; // Ensure role name is captured correctly

    if (!roleName || roleName === '') {
      toast.error('Role name is required');
      return;
    }

    const { data, error } = await updateRole({ name: roleName });

    if (error) {
      toast.error(error);
    } else {
      toast.success(`Role ${data?.name} assigned`);
      formRef.current?.reset();
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