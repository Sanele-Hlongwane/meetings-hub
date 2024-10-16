"use client";

import { useTheme } from 'next-themes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faFacebook, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Image from "next/image";

const Footer = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Ensure component is mounted to prevent hydration issues
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // Prevents rendering until after hydration

  return (
    <footer className="py-12 shadow-xl transition-all duration-500 bg-gray-800 text-white dark:bg-gray-200 dark:text-black" style={{ width: '100vw' }}>
      <div className="container mx-auto text-center">
        {/* Theme Switcher */}
        <div className="flex justify-end mb-6">
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="flex items-center space-x-2 p-2 border border-gray-300 rounded-full dark:hover:border-blue-500 hover:border-yellow-600 transition duration-300"
          >
            <FontAwesomeIcon icon={theme === 'dark' ? faMoon : faSun} className={`${theme === 'dark' ? 'text-blue-500' : 'text-yellow-600'}`} />
            <span className="text-sm">{theme === 'light' ? 'Light Mode' : 'Dark Mode'}</span>
          </button>
        </div>

        <div className="text-sm lg:text-base mb-6 flex justify-center space-x-8">
          <Link href="/terms" passHref>
            <p className="hover:text-blue-500 dark:hover:text-yellow-500 transition-colors duration-300">Terms and Conditions</p>
          </Link>
          <Link href="/privacy-policy" passHref>
            <p className="hover:text-blue-500 dark:hover:text-yellow-500 transition-colors duration-300">Privacy Policy</p>
          </Link>
          <Link href="/faq" passHref>
            <p className="hover:text-blue-500 dark:hover:text-yellow-500 transition-colors duration-300">FAQs</p>
          </Link>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center text-right">
          <p className="text-lg lg:text-lg font-semibold">&copy; 2024 Meeting Hub. All rights reserved.</p>
          <p className="text-sm lg:text-base">
            Contact us:{" "}
            <a href="mailto:sanelehlongwane61@gmail.com" className="text-blue-500 dark:text-yellow-500 hover:underline transition-colors duration-300" title='Click to send email to us😁'>
              sanelehlongwane61@gmail.com
            </a>
          </p>
        </div>
        <div className="text-sm lg:text-base flex justify-center items-center space-x-6">
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="ml-2">
            <FontAwesomeIcon icon={faTwitter} className="text-gray-400 hover:text-blue-500 dark:hover:text-yellow-500 transition-colors duration-300" />
            <span className="sr-only">Twitter</span>
          </a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="ml-2">
            <FontAwesomeIcon icon={faFacebook} className="text-gray-400 hover:text-blue-500 dark:hover:text-yellow-500 transition-colors duration-300" />
            <span className="sr-only">Facebook</span>
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="ml-2">
            <FontAwesomeIcon icon={faInstagram} className="text-gray-400 hover:text-blue-500 dark:hover:text-yellow-500 transition-colors duration-300" />
            <span className="sr-only">Instagram</span>
          </a>
          <a href="https://linkedin.com/in/sanele-hlongwane" target="_blank" rel="noopener noreferrer" className="ml-2">
            <FontAwesomeIcon icon={faLinkedin} className="text-gray-400 hover:text-blue-500 dark:hover:text-yellow-500 transition-colors duration-300" title="Sanele-Hlongwane&apos;s linkedin profile" />
            <span className="sr-only">LinkedIn</span>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
