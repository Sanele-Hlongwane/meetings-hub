import React from 'react';
import Image from 'next/image';

const AboutUs = () => {
  return (
    <div className="bg-bg-dark-1 dark:bg-dark-1 text-white dark:text-white min-h-screen py-24 px-4" style={{ width: '100vw' }}>
      <div className="max-w-7xl mx-auto pt-20">
        <div className="container mx-auto text-center pt-20 max-w-screen-sm md:max-w-screen-md">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            About <span className="text-gold-500">Eagles Ring</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl mb-8 text-gray-300 dark:text-gray-300">
            Connecting aspiring entrepreneurs with investment opportunities.
          </p>
        </div>
  
        <section className="mb-8 py-8 px-6 rounded-lg shadow-lg w-full max-w-screen-sm md:max-w-screen-md mx-auto border-2 border-blue-500 bg-dark-1 dark:bg-dark-1 text-white dark:text-white">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-4">Our Mission</h2>
          <p className="text-base sm:text-lg md:text-xl">
            At Eagles Ring, our mission is to bridge the gap between innovative entrepreneurs and visionary investors. We provide a platform where entrepreneurs can present their groundbreaking ideas to a panel of experienced business moguls, known as the &quot;Eagles.&rdquo; Our goal is to foster entrepreneurship and drive economic growth by facilitating access to capital and mentorship.
          </p>
        </section>
  
        <section className="mb-8 py-8 px-6 rounded-lg shadow-lg w-full max-w-screen-sm md:max-w-screen-md mx-auto border-2 border-blue-500 bg-dark-1 dark:bg-dark-1 text-white dark:text-white">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-4">Our Vision</h2>
          <p className="text-base sm:text-lg md:text-xl">
            We envision a world where every entrepreneur has the resources and support to turn their innovative ideas into reality. Through our platform, we aim to create a thriving community of entrepreneurs and investors who work together to build successful businesses and foster economic growth.
          </p>
        </section>
  
        <section className="mb-8 py-8 px-6 rounded-lg shadow-lg w-full max-w-screen-sm md:max-w-screen-md mx-auto border-2 border-blue-500 bg-dark-1 dark:bg-dark-1 text-white dark:text-white">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-4">Meet the Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full mx-auto mb-4 overflow-hidden">
                <Image
                  className="w-full h-full"
                  src="/EaglesRingLogo.png"
                  alt="John Doe"
                  width={128}
                  height={128}
                />
              </div>
              <h3 className="text-lg sm:text-xl md:text-2xl font-medium text-white dark:text-white">John Doe</h3>
              <p className="text-sm sm:text-base text-white dark:text-white">Founder & CEO</p>
              <p className="text-sm sm:text-base mt-2 text-white dark:text-white">
                John is a seasoned entrepreneur with over 20 years of experience in the tech industry. He has founded multiple successful startups and is passionate about helping new entrepreneurs succeed.
              </p>
            </div>
  
            <div className="text-center">
              <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full mx-auto mb-4 overflow-hidden">
                <Image
                  className="w-full h-full"
                  src="/EaglesRingLogo.png"
                  alt="Jane Smith"
                  width={128}
                  height={128}
                />
              </div>
              <h3 className="text-lg sm:text-xl md:text-2xl font-medium text-white dark:text-white">Jane Smith</h3>
              <p className="text-sm sm:text-base text-white dark:text-white">Chief Operating Officer</p>
              <p className="text-sm sm:text-base mt-2 text-white dark:text-white">
                Jane has a strong background in operations and management. She has worked with several Fortune 500 companies and brings a wealth of experience in streamlining business processes.
              </p>
            </div>
  
            <div className="text-center">
              <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full mx-auto mb-4 overflow-hidden">
                <Image
                  className="w-full h-full"
                  src="/eagle.png"
                  alt="Alice Johnson"
                  width={128}
                  height={128}
                />
              </div>
              <h3 className="text-lg sm:text-xl md:text-2xl font-medium text-white dark:text-white">Alice Johnson</h3>
              <p className="text-sm sm:text-base text-white dark:text-white">Chief Marketing Officer</p>
              <p className="text-sm sm:text-base mt-2 text-white dark:text-white">
                Alice is an expert in digital marketing and branding. She has led successful marketing campaigns for various global brands and is dedicated to increasing the visibility of Eagles Ring.
              </p>
            </div>
          </div>
        </section>
  
        <section className="bg-dark-1 dark:bg-dark-1 py-8 px-6 rounded-lg shadow-lg w-full max-w-screen-sm md:max-w-screen-md mx-auto border-2 border-blue-500 text-white dark:text-white">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-4">Our Values</h2>
          <p className="text-base sm:text-lg md:text-xl">
            Integrity, innovation, and inclusivity are at the heart of everything we do. We believe in creating a supportive and transparent environment for entrepreneurs and investors alike.
          </p>
        </section>
      </div>
    </div>
  );
};

export default AboutUs;
