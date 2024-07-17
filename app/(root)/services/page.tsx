'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

const Services = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const handleThemeChange = (event: MediaQueryListEvent) => {
      setIsDarkMode(event.matches);
    };

    setIsDarkMode(window.matchMedia('(prefers-color-scheme: dark)').matches);

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', handleThemeChange);

    return () => {
      mediaQuery.removeEventListener('change', handleThemeChange);
    };
  }, []);

  return (
    <div className={`bg-${isDarkMode ? 'black' : 'white'} text-${isDarkMode ? 'white' : 'black'} py-24`} style={{ width: '100vw' }}>
      <div className="container mx-auto text-center ">
        <h1 className="text-5xl lg:text-7xl font-bold mb-4 text-gray-300">Our Services</h1>
        <p className="text-lg lg:text-xl mb-8">
          Connecting innovative ideas with strategic investments.
        </p>
        <Link href="#investor-section">
          <button className={`bg-yellow-500 ${isDarkMode ? 'text-gray-900' : 'text-white'} font-bold py-3 px-6 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-105 hover:border-blue-500 hover:border-opacity-50`}>
            Become an Investor
          </button>
        </Link>

        <section id="service-section" className="mt-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className={`bg-${isDarkMode ? 'rgb-28-28-28' : 'white'} p-8 rounded-lg border border-blue-500 border-opacity-50`}>
              <h2 className="text-3xl font-bold mb-4">For Entrepreneurs</h2>
              <p className="text-lg mb-4">
                Pitch your business ideas to experienced investors (Eagles).
              </p>
              <ul className="text-lg mb-4">
                <li>Access to capital investment</li>
                <li>Mentorship and guidance</li>
                <li>Networking opportunities</li>
              </ul>
              <Link href="/sign-up">
                <button className={`bg-yellow-500 ${isDarkMode ? 'text-gray-900' : 'text-white'} font-bold py-3 px-6 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-105 hover:border-blue-500 hover:border-opacity-50`}>
                  Apply Now
                </button>
              </Link>
            </div>

            <div className={`bg-${isDarkMode ? 'black' : 'white'} p-8 rounded-lg border border-blue-500 border-opacity-50`} id="investor-section">
              <h2 className="text-3xl font-bold mb-4">For Investors</h2>
              <p className="text-lg mb-4">
                Invest in promising business ventures curated by Eagles.
              </p>
              <ul className="text-lg mb-4">
                <li>Diverse investment opportunities</li>
                <li>Insights into emerging markets</li>
                <li>Exclusive access to innovative solutions</li>
              </ul>
              <Link href="/Opportunities">
                <button className={`bg-yellow-500 ${isDarkMode ? 'text-gray-900' : 'text-white'} font-bold py-3 px-6 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-105 hover:border-blue-500 hover:border-opacity-50`}>
                  Explore Opportunities
                </button>
              </Link>
            </div>
          </div>
        </section>

        <section id="apply-section" className="mt-16">
          <h2 className="text-3xl lg:text-5xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-lg lg:text-xl mb-8">
            Join us in transforming ideas into successful ventures.
          </p>
          <Link href="/Contact">
            <button className={`bg-yellow-500 ${isDarkMode ? 'text-gray-900' : 'text-white'} font-bold py-3 px-6 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-105 hover:border-blue-500 hover:border-opacity-50`}>
              Contact Us
            </button>
          </Link>
        </section>
      </div>
    </div>
  );
};

export default Services;

