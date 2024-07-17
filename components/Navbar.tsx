'use client';

import Image from 'next/image';
import Link from 'next/link';
import { SignedIn, UserButton } from '@clerk/nextjs';

import MobileNav from './MobileNav';
import { navbarLinks } from '@/constants/NavBar';
import { usePathname } from 'next/navigation';
const Navbar = () => {
  const pathname =  usePathname(); // Assuming you import useRouter from next/router

  return (
    <nav className="flex-between fixed z-50 w-full bg-dark-1 px-6 py-4 lg:px-10">
      <div className="flex items-center gap-4">
        <Link href="/" className="flex items-center gap-1">
          <Image
            src="/EaglesRingLogoDark.png"
            width={57}
            height={50}
            alt="eagles logo"
            className="max-sm:size-10"
          />
          
        </Link>

        <div className="hidden sm:flex gap-5">
          {navbarLinks.map((link) => (
            <Link href={link.route} key={link.label} className="text-white relative">
              <span className={`transition-colors duration-300 hover:text-yellow-500 ${pathname === link.route ? 'text-blue-500' : ''}`}>
                {link.label}
              </span>
              {pathname === link.route && (
                <span className="absolute left-0 bottom-0 w-full h-0.5 bg-blue-500 transform scale-x-0 transition-transform duration-300 origin-left"></span>
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
