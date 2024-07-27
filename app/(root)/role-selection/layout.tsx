import { Metadata } from 'next';
import { ReactNode } from 'react';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';

export const metadata: Metadata = {
  title: 'Profile',
  description: 'Update profile to keep in touch and be available.',
};

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="h-screen flex flex-col">
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default RootLayout;
