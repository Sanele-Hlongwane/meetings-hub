'use client';
import { useState } from 'react';
import { useSignUp } from '@clerk/nextjs';

export default function SignUpPage() {
  const { signUp, setActive } = useSignUp();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [location, setLocation] = useState('');
  const [role, setRole] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const signUpResponse = await signUp.create({
        emailAddress: email,
        password,
      });

      await signUp.update({
        firstName: location,
        lastName: role,
      });

      await signUp.attemptEmailAddressVerification({ strategy: 'email_code' });

      setActive({ sessionId: signUpResponse.createdSessionId });
      // Redirect or handle post-sign-up logic
    } catch (err) {
      setError(err.errors[0].message);
    }
  };

  return (
    <main className="flex h-screen w-full items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-white p-4 rounded-md shadow-md">
        <h1 className="text-2xl font-bold mb-4">Sign Up</h1>
        {error && <p className="text-red-500">{error}</p>}
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
          <input
            id="location"
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="role" className="block text-sm font-medium text-gray-700">Role (Entrepreneur/Investor)</label>
          <input
            id="role"
            type="text"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
          />
        </div>
        <button type="submit" className="w-full bg-black text-white py-2 rounded-md">Sign Up</button>
      </form>
    </main>
  );
}
