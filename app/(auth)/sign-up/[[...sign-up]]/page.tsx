'use client';
import { SignUp } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function SignUpPage() {
  const router = useRouter();

  useEffect(() => {
    const handleRedirect = (event: Event) => {
      if ((event as any).type === 'signUp') {
        router.push('/role-selection');
      }
    };

    window.addEventListener('clerk:signUp', handleRedirect);

    return () => {
      window.removeEventListener('clerk:signUp', handleRedirect);
    };
  }, [router]);

  return (
    <main className="flex h-screen w-full items-center justify-center">
      <SignUp />
    </main>
  );
}
