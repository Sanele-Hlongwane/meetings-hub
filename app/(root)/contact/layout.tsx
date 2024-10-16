import { Metadata } from 'next';
import { ReactNode } from 'react';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Wanna get in touch with us? Send us an email and we will get back to you as soon as possible.'
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
