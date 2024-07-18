import { Metadata } from 'next';
import { ReactNode } from 'react';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';

export const metadata: Metadata = {
  title: 'Profile',
  description: 'Update profile to keep in touch and be available.',
};

const RootLayout = ({ children }: Readonly<{children: ReactNode}>) => {
  return (
    <main className="w-full">
      <Navbar />
        <section className="">
          <div className="w-full">{children}</div>
        </section>
      <Footer />
    </main>
  );
};

export default RootLayout;
