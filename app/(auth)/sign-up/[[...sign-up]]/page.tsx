'use client';
import { useState, FormEvent } from 'react';
import { useSignUp } from '@clerk/nextjs';

export default function SignUpPage() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [role, setRole] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (!isLoaded || !signUp) {
      setError('SignUp functionality is not available.');
      return;
    }

    try {
      const signUpResponse = await signUp.create({
        emailAddress: email,
        password,
      });

      // Handle the response after sign-up
      if (signUpResponse.status === 'complete') {
        // Optionally, update additional user details here
        await signUp.update({ firstName: location, lastName: role });

        // Set the active session
        if (signUpResponse.createdSessionId) {
          await setActive({ session: signUpResponse.createdSessionId });
          // Redirect or handle post-sign-up logic
        }
      } else {
        // Handle incomplete status or other statuses
        console.log(signUpResponse);
      }
    } catch (err: any) {
      setError(err.errors[0]?.longMessage || 'An error occurred');
    }
  };

  if (!isLoaded) {
    return <p>Loading...</p>;
  }

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
