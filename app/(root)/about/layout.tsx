import { Metadata } from 'next';
import { ReactNode } from 'react';

import Navbar from '@/components/Navbar';

export const metadata: Metadata = {
  title: 'About',
  description: 'Discover the services offered by Eagles Ring to help entrepreneurs and investors succeed.',
};

const RootLayout = ({ children }: Readonly<{children: ReactNode}>) => {
  return (
    <main className="w-full">
      <Navbar />
        <section className="">
          <div className="w-full">{children}</div>
        </section>
    </main>
  );
};

export default RootLayout;
