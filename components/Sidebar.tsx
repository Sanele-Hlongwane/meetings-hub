'use client';
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { FaHome, FaCalendarAlt, FaHistory, FaVideo, FaUserPlus } from "react-icons/fa"; // Importing React icons

// Sidebar links with icons
export const sidebarLinks = [
  {
    icon: <FaHome size={24} />, // Replacing imgURL with icon
    route: '/',
    label: 'Home',
  },
  {
    icon: <FaCalendarAlt size={24} />,
    route: '/upcoming',
    label: 'Upcoming',
  },
  {
    icon: <FaHistory size={24} />,
    route: '/previous',
    label: 'Previous',
  },
  {
    icon: <FaVideo size={24} />,
    route: '/recordings',
    label: 'Recordings',
  },
  {
    icon: <FaUserPlus size={24} />,
    route: '/personal-room',
    label: 'Personal Room',
  },
];

interface TabProps {
  label: string;
  route: string;
  icon: React.ReactNode; // Changed to accept icon prop
  onClick: () => void;
}

export const Tab: React.FC<TabProps> = ({ label, route, icon, onClick }) => {
  const pathname = usePathname();
  const isActive = pathname === route;

  return (
    <div
      className={cn(
        "px-4 pl-6 py-3 my-3 mx-2 flex justify-start items-center rounded-xl transition-all duration-300",
        {
          "bg-gray-300 dark:bg-gray-700 text-gray-900": isActive, // Adjusting background and text color for active tab
          "hover:bg-gray-700": !isActive,
          "text-white": !isActive // Text color when not active
        }
      )}
      onClick={onClick}
    >
      <Link href={route} passHref>
        <p className="flex gap-3 lg:gap-4 items-center w-full">
          {icon} {/* Displaying the icon directly */}
          <p className="text-sm md:text-base lg:text-lg font-medium lg:font-semibold">
            {label}
          </p>
        </p>
      </Link>
    </div>
  );
};

const SideNav = () => {
  const pathname = usePathname();
  const isMeetingPage = pathname.startsWith("/meeting");
  const [isOpen, setIsOpen] = useState(false);

  if (isMeetingPage) {
    return null; // Ensure no rendering on meeting pages
  }

  const toggleSideNav = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div
        id="sideNav"
        className={cn(
          "fixed left-0 h-full bg-gray-900 dark:bg-gray-400 text-white dark:text-gray-900 pt-8 select-none transition-transform duration-300 z-40",
          {
            "w-[185px] md:w-[210px] lg:w-[250px] xl:w-[260px] translate-x-0": isOpen,
            "w-0 md:w-0 lg:w-0 xl:w-0 -translate-x-full": !isOpen,
          }
        )}
      >
        <div className="flex justify-between items-center px-4 py-2">
          {isOpen ? (
            <h2 className="text-lg font-semibold">Options</h2>
          ) : (
            <button
              className="text-gray-400 dark:text-gray-900 hover:text-white dark:hover:text-gray-800 transition-colors"
              onClick={toggleSideNav}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          )}
        </div>
        <div className={cn("mt-4", { "hidden": !isOpen })}>
          {sidebarLinks.map(({ label, icon, route }, index) => (
            <Tab
              key={index}
              label={label}
              route={route}
              icon={icon} // Pass the icon directly
              onClick={toggleSideNav}
            />
          ))}
        </div>
      </div>
      {isOpen && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-30"
          onClick={toggleSideNav}
        ></div>
      )}
      <button
        className={cn(
          "fixed top-1/2 left-0 transform -translate-y-1/2 z-50 transition-opacity duration-300",
          {
            "opacity-100": !isOpen,
            "opacity-0": isOpen,
          }
        )}
        onClick={toggleSideNav}
      >
        <div className="w-12 h-12 flex items-center justify-center bg-gold text-white rounded-lg shadow-lg">
          {isOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 animate-bounce"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          )}
        </div>
      </button>
    </>
  );
};

export default SideNav;
