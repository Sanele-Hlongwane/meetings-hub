'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Sheet, SheetClose, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { navbarLinks } from '@/constants/navbar';
import { cn } from '@/lib/utils';
import { FaBars, FaHamburger, FaLine } from 'react-icons/fa';

const MobileNav = () => {
  const pathname = usePathname();

  return (
    <section className="w-full max-w-[264px]">
      <Sheet>
        <SheetTrigger asChild>
          <div className='text-white dark:text-black cursor-pointer text-white dark:text-black sm:hidden'>
          <FaBars/>
          </div>
        </SheetTrigger>
        <SheetContent side="left" className="border-none bg-dark-1 dark:bg-gray-300 ">
          <Link href="/" className="flex items-center gap-1">
            <Image
              src="/images/logo.png"
              width={42}
              height={42}
              alt="Meetings-Hub Logo"
            />
            <p className="text-[18px] font-extrabold text-white dark:text-gray-900">Meetings Hub</p>
          </Link>
          <div className="flex h-[calc(100vh-72px)] flex-col justify-between overflow-y-auto">
            <SheetClose asChild>
              <section className=" flex h-full flex-col gap-6 pt-16 text-white dark:text-gray-900">
                {navbarLinks.map((item) => {
                  const isActive = pathname === item.route;

                  return (
                    <SheetClose asChild key={item.route}>
                      <Link
                        href={item.route}
                        key={item.label}
                        className={cn(
                          'flex gap-4 items-center p-4 rounded-lg w-full max-w-60',
                          {
                            'bg-blue-1 dark:bg-yellow-500': isActive,
                          }
                        )}
                      >
                        <p className="font-semibold hover:text-gray-300 dark:hover:text-gray-600">{item.label}</p>
                      </Link>
                    </SheetClose>
                  );
                })}
              </section>
            </SheetClose>
          </div>
        </SheetContent>
      </Sheet>
    </section>
  );
};

export default MobileNav;
