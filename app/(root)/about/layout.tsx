import { Metadata } from 'next';
import { ReactNode } from 'react';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';

export const metadata: Metadata = {
  title: 'About',
  description: 'Discover the services offered by Meeting Hub to help everyone succeed.',
};

const RootLayout = ({ children }: Readonly<{children: ReactNode}>) => {
  return (
    <main >
      <Navbar />
        <section className="">
          <div className="w-full">{children}</div>
        </section>
      <Footer />
    </main>
  );
};

export default RootLayout;
