'use client';

import Image from 'next/image';
import Link from 'next/link';
import { SignedIn, UserButton } from '@clerk/nextjs';

import MobileNav from './MobileNav';
import { navbarLinks } from '@/constants/navbar';
import { usePathname } from 'next/navigation';
const Navbar = () => {
  const pathname =  usePathname();

  return (
    <nav className="flex-between fixed z-50 w-full bg-dark-1 dark:bg-white px-6 py-4 lg:px-10">
    <div className="flex items-center gap-4">
      <Link href="/" className="flex items-center gap-1">
        <Image
          src="/images/logo.png"
          width={57}
          height={50}
          alt="eagles logo"
          className="max-sm:size-10"
        />
      </Link>
  
      <div className="hidden sm:flex gap-5">
        {navbarLinks.map((link) => (
          <Link href={link.route} key={link.label} className="text-white dark:text-black relative">
            <span className={`transition-colors duration-300 hover:text-blue-500 dark:hover:text-yellow-500 ${pathname === link.route ? 'text-blue-500 dark:text-yellow-500' : ''}`}>
              {link.label}
            </span>
            {pathname === link.route && (
              <span className="absolute left-0 bottom-0 w-full h-0.5 bg-blue-500 dark:bg-yellow-500 transition-transform duration-300 scale-x-100"></span>
            )}
          </Link>
        ))}
      </div>
    </div>
  
    <div className="flex-between gap-5">
      <SignedIn>
        <UserButton afterSignOutUrl="/sign-in" />
      </SignedIn>
      <MobileNav />
    </div>
  </nav>
  
  );
};

export default Navbar;
