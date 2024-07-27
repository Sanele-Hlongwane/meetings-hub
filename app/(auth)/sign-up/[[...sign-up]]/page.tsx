// pages/signup.js
import { SignUp } from '@clerk/nextjs';

export default function SignUpPage() {
  return (
    <main className="flex h-screen w-full items-center justify-center">
      <SignUp
        path="/signup"
        routing="path"
        signInUrl="/signin"
        appearance={{
          variables: {
            colorPrimary: '#000000',
          },
          elements: {
            rootBox: 'bg-white p-4',
            formFieldLabel: 'text-sm font-medium text-gray-700',
            formFieldInput: 'mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm',
          },
        }}
        afterSignUpUrl="/profile"
        additionalFields={[
          {
            name: 'location',
            label: 'Location',
            placeholder: 'Enter your location',
            type: 'text',
            required: true,
          },
          {
            name: 'role',
            label: 'Role',
            placeholder: 'Enter your role (Entrepreneur/Investor)',
            type: 'text',
            required: true,
          },
        ]}
      />
    </main>
  );
}
