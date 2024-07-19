import { useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@clerk/nextjs';

function AddProProfile({ role }) {
  const router = useRouter();
  const { user } = useAuth();

  const handleProEntrepreneurProfileSubmit = async (e) => {
    e.preventDefault();

    const data = {
      entrepreneurId: user.id,
      companyName: e.target.companyName.value,
      companyWebsite: e.target.companyWebsite.value,
      linkedinUrl: e.target.linkedinUrl.value,
      verificationStatus: e.target.verificationStatus.value,
      location: e.target.location.value,
      age: e.target.age.value,
      gender: e.target.gender.value,
      interests: e.target.interests.value.split(',').map(interest => interest.trim())
    };

    try {
      const response = await fetch('/api/pro-entrepreneur-profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        router.push('/profile');
      } else {
        console.error('Failed to submit the profile');
      }
    } catch (error) {
      console.error('An error occurred', error);
    }
  };

  const handleProInvestorProfileSubmit = async (e) => {
    e.preventDefault();

    const data = {
      investorId: user.id,
      companyName: e.target.companyName.value,
      companyWebsite: e.target.companyWebsite.value,
      linkedinUrl: e.target.linkedinUrl.value,
      verificationStatus: e.target.verificationStatus.value,
      location: e.target.location.value,
      age: e.target.age.value,
      gender: e.target.gender.value,
      interests: e.target.interests.value.split(',').map(interest => interest.trim())
    };

    try {
      const response = await fetch('/api/pro-investor-profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        router.push('/profile');
      } else {
        console.error('Failed to submit the profile');
      }
    } catch (error) {
      console.error('An error occurred', error);
    }
  };

  const renderForm = () => {
    if (role === 'entrepreneur') {
      return (
        <form onSubmit={handleProEntrepreneurProfileSubmit} className="bg-dark-1 text-white space-y-4">
          {/* Form fields for ProEntrepreneurProfile */}
          {/* ... */}
        </form>
      );
    } else if (role === 'investor') {
      return (
        <form onSubmit={handleProInvestorProfileSubmit} className="bg-dark-1 text-white space-y-4">
          {/* Form fields for ProInvestorProfile */}
          {/* ... */}
        </form>
      );
    } else {
      return <div>Loading...</div>;
    }
  };

  return (
    <div className="min-h-screen bg-dark-1 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-dark-2 py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {renderForm()}
        </div>
      </div>
    </div>
  );
}

export default AddProProfile;
