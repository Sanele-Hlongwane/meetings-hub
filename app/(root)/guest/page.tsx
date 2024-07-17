'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Layout from './layout';

const Guest = () => {
  const [fontSize, setFontSize] = useState('text-5xl');
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

  const handleResize = () => {
    const width = window.innerWidth;
    if (width < 640) {
      setFontSize('text-3xl');
    } else {
      setFontSize('text-5xl');
    }
  };

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const features = [
    {
      title: 'Pitch Your Idea',
      description: 'Present your business model to a panel of experienced investors.',
    },
    {
      title: 'Secure Funding',
      description: 'Get funding from our network of investors who are ready to back promising ventures.',
    },
    {
      title: 'Expert Guidance',
      description: 'Receive mentorship and strategic advice from successful business moguls.',
    },
    {
      title: 'Global Reach',
      description: 'Connect with investors and entrepreneurs from around the world.',
    },
    {
      title: 'Resource Library',
      description: 'Access a vast library of resources to help you grow your business.',
    },
    {
      title: 'Networking Events',
      description: 'Attend exclusive events and meet industry leaders and potential partners.',
    },
    {
      title: 'Customizable Profiles',
      description: 'Create and customize your profile to showcase your business and attract investors.',
    },
    {
      title: 'Analytics Dashboard',
      description: 'Monitor your progress with our advanced analytics and reporting tools.',
    },
  ];

  const testimonials = [
    {
      quote: '"Eagles Ring provided the platform I needed to connect with investors who believed in my vision."',
      author: '- John Doe',
      position: 'CEO of StartupX',
    },
    {
      quote: '"Their guidance and support were instrumental in securing our latest funding round."',
      author: '- Investor Name',
      position: 'Venture Capitalist',
    },
  ];

  return (
      <div className={`bg-${isDarkMode ? 'black' : 'white'} text-${isDarkMode ? 'white' : 'black'} py-24 ${isDarkMode ? 'dark' : ''}`} style={{ width: '100vw' }}>
        {/* Hero Section */}
        <div className="relative mb-4 flex items-center justify-center">
          <Image
            src="/EaglesRingLogo.png"
            alt="Eagles Ring Logo"
            width={200}
            height={80}
            className="dark:invert"
          />
        </div>
        <div className="container mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h1 className={`${fontSize} lg:text-6xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-black'}`}>
            Welcome to <span className="text-gold-500">Eagles Ring</span>
          </h1>
          <p className={`text-lg lg:text-xl mb-8 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Connecting aspiring entrepreneurs with investment opportunities.
          </p>
          <button className={`bg-yellow-500 ${isDarkMode ? 'text-gray-900' : 'text-white'} font-bold py-3 px-6 rounded-lg shadow-lg`}>
            Get Started
          </button>
        </div>
  
        {/* Features Section */}
        <div className="container mx-auto text-center mt-16 px-4 sm:px-6 lg:px-8">
          <h2 className={`text-4xl font-bold mb-12 ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>Our Features</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className={`p-4 border rounded-lg shadow-md ${isDarkMode ? 'border-blue-600' : 'border-blue-200 bg-white'}`}>
                <h3 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{feature.title}</h3>
                <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
  
        {/* Testimonials Section */}
        <div className="container mx-auto px-4 mt-16 sm:px-6 lg:px-8">
          <h2 className={`text-4xl font-bold text-center mb-12 ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>Testimonials</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className={`p-6 rounded-lg border shadow-md ${isDarkMode ? 'bg-black border-blue-600' : 'bg-white border-blue-200'}`}>
                <p className={`text-lg mb-4 leading-relaxed ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{testimonial.quote}</p>
                <p className={`font-semibold mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{testimonial.author}</p>
                <p className={`text-gray-600 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{testimonial.position}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
  );
};

export default Guest;


