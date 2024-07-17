'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

const AboutUs = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const handleThemeChange = (event: MediaQueryListEvent) => {
      setIsDarkMode(event.matches);
    };

    const mediaQueryList = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDarkMode(mediaQueryList.matches);

    mediaQueryList.addEventListener('change', handleThemeChange);

    return () => {
      mediaQueryList.removeEventListener('change', handleThemeChange);
    };
  }, []);

  const handleHover = (index: number) => {
    setHoveredIndex(index);
  };

  const handleLeave = () => {
    setHoveredIndex(null);
  };

  return (
    <div className={`bg-${isDarkMode ? 'black' : 'white'} ${isDarkMode ? 'text-white' : 'text-black'} py-24`}  style={{ width: '100vw' }}>
      <div className="container mx-auto text-center pt-20 max-w-screen-md" >
        <h1 className="text-4xl sm:text-5xl font-bold mb-4">
          About <span className="text-gold-500">Eagles Ring</span>
        </h1>
        <p className={`text-lg sm:text-xl mb-8 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          Connecting aspiring entrepreneurs with investment opportunities.
        </p>
      </div>

      <section className={`mb-8 py-8 px-6 rounded-lg shadow-lg w-full max-w-screen-md mx-auto transition-transform transform hover:scale-105 duration-300 border-2 border-blue-500 ${isDarkMode ? 'bg-black text-gray-300' : 'bg-white text-gray-700'}`}>
        <h2 className="text-2xl sm:text-3xl font-semibold mb-4">Our Mission</h2>
        <p className="text-lg sm:text-xl">
          At Eagles Ring, our mission is to bridge the gap between innovative entrepreneurs and visionary investors. We provide a platform where entrepreneurs can present their groundbreaking ideas to a panel of experienced business moguls, known as the &quot;Eagles.&rdquo; Our goal is to foster entrepreneurship and drive economic growth by facilitating access to capital and mentorship.
        </p>
      </section>

      <section className={`mb-8 py-8 px-6 rounded-lg shadow-lg w-full max-w-screen-md mx-auto transition-transform transform hover:scale-105 duration-300 border-2 border-blue-500 ${isDarkMode ? 'bg-black text-gray-300' : 'bg-white text-gray-700'}`}>
        <h2 className="text-2xl sm:text-3xl font-semibold mb-4">Our Vision</h2>
        <p className="text-lg sm:text-xl">
          We envision a world where every entrepreneur has the resources and support to turn their innovative ideas into reality. Through our platform, we aim to create a thriving community of entrepreneurs and investors who work together to build successful businesses and foster economic growth.
        </p>
      </section>

      <section className={`mb-8 py-8 px-6 rounded-lg shadow-lg w-full max-w-screen-md mx-auto transition-transform transform hover:scale-105 duration-300 border-2 border-blue-500 ${isDarkMode ? 'bg-black text-gray-300' : 'bg-white text-gray-700'}`}>
        <h2 className="text-2xl sm:text-3xl font-semibold mb-4">Meet the Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div
              className="w-32 h-32 rounded-full mx-auto mb-4 overflow-hidden transform transition-transform duration-300 hover:scale-110"
              onMouseEnter={() => handleHover(0)}
              onMouseLeave={handleLeave}
            >
              <Image
                className="w-full h-full"
                src="/EaglesRingLogo.png"
                alt="John Doe"
                width={128}
                height={128}
              />
            </div>
            <h3 className={`text-xl sm:text-2xl font-medium ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`}>John Doe</h3>
            <p className={`text-sm sm:text-base ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Founder & CEO</p>
            <p className={`text-sm sm:text-base mt-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              John is a seasoned entrepreneur with over 20 years of experience in the tech industry. He has founded multiple successful startups and is passionate about helping new entrepreneurs succeed.
            </p>
          </div>

          <div className="text-center">
            <div
              className="w-32 h-32 rounded-full mx-auto mb-4 overflow-hidden transform transition-transform duration-300 hover:scale-110"
              onMouseEnter={() => handleHover(1)}
              onMouseLeave={handleLeave}
            >
              <Image
                className="w-full h-full"
                src="/EaglesRingLogo.png"
                alt="Jane Smith"
                width={128}
                height={128}
              />
            </div>
            <h3 className={`text-xl sm:text-2xl font-medium ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`}>Jane Smith</h3>
            <p className={`text-sm sm:text-base ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Chief Operating Officer</p>
            <p className={`text-sm sm:text-base mt-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Jane has a strong background in operations and management. She has worked with several Fortune 500 companies and brings a wealth of experience in streamlining business processes.
            </p>
          </div>

          <div className="text-center">
            <div
              className="w-32 h-32 rounded-full mx-auto mb-4 overflow-hidden transform transition-transform duration-300 hover:scale-110"
              onMouseEnter={() => handleHover(2)}
              onMouseLeave={handleLeave}
            >
              <Image
                className="w-full h-full"
                src="/eagle.png"
                alt="Alice Johnson"
                width={128}
                height={128}
              />
            </div>
            <h3 className={`text-xl sm:text-2xl font-medium ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`}>Alice Johnson</h3>
            <p className={`text-sm sm:text-base ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Chief Marketing Officer</p>
            <p className={`text-sm sm:text-base mt-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Alice is an expert in digital marketing and branding. She has led successful marketing campaigns for various global brands and is dedicated to increasing the visibility of Eagles Ring.
            </p>
          </div>
        </div>
      </section>

      <section className={`bg-${isDarkMode ? 'black' : 'white'} py-8 px-6 rounded-lg shadow-lg w-full max-w-screen-md mx-auto transition-transform transform hover:scale-105 duration-300 border-2 border-blue-500 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
        <h2 className="text-2xl sm:text-3xl font-semibold mb-4">Our Values</h2>
        <p className="text-lg sm:text-xl">
          Integrity, innovation, and inclusivity are at the heart of everything we do. We believe in creating a supportive and transparent environment for entrepreneurs and investors alike.
        </p>
      </section>
    </div>
  );
};

export default AboutUs;

