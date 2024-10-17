"use client";
import React, { useState } from 'react';

const AboutUs = () => {
  const [showMission, setShowMission] = useState(false);
  const [showValues, setShowValues] = useState(false);
  const [showTeam, setShowTeam] = useState(false);

  const toggleMission = () => setShowMission(!showMission);
  const toggleValues = () => setShowValues(!showValues);
  const toggleTeam = () => setShowTeam(!showTeam);

  return (
    <div className="dark:text-black text-white min-h-screen py-16 px-4">
        <div className="container mx-auto text-center pt-20 max-w-screen-sm md:max-w-screen-md">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 transition-transform transform hover:scale-105">
            About <span className="text-yellow-500">Meetings Hub</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl mb-8 text-gray-300 dark:text-gray-300">
            Connecting professionals and organizations to facilitate effective meetings and collaborations.
          </p>
        </div>

        <section className="mb-8 py-8 px-6 rounded-lg shadow-lg w-full max-w-screen-sm md:max-w-screen-md mx-auto border-2 border-blue-500 bg-dark-1 dark:bg-gray-300 text-gray-100  dark:text-gray-900 ">
          <h2 
            className="text-xl sm:text-2xl md:text-3xl font-semibold mb-4 cursor-pointer transition-colors hover:text-gold-500"
            onClick={toggleMission}
          >
            Our Mission
          </h2>
          {showMission && (
            <p className="text-base sm:text-lg md:text-xl">
              At Meetings Hub, our mission is to bridge the gap between professionals seeking collaboration opportunities and organizations looking for efficient meeting solutions. We provide a platform where individuals can schedule, manage, and optimize their meetings for maximum productivity.
            </p>
          )}
        </section>

        <section className="mb-8 py-8 px-6 rounded-lg shadow-lg w-full max-w-screen-sm md:max-w-screen-md mx-auto border-2 border-blue-500 bg-dark-1 dark:bg-gray-300 text-gray-100  dark:text-gray-900 ">
          <h2 
            className="text-xl sm:text-2xl md:text-3xl font-semibold mb-4 cursor-pointer transition-colors hover:text-gold-500"
            onClick={toggleValues}
          >
            Our Values
          </h2>
          {showValues && (
            <p className="text-base sm:text-lg md:text-xl">
              Integrity, innovation, and inclusivity are at the heart of everything we do. We believe in creating a supportive and transparent environment for all professionals engaging in meetings and collaborations.
            </p>
          )}
        </section>

        <section className="mb-8 py-8 px-6 rounded-lg shadow-lg w-full max-w-screen-sm md:max-w-screen-md mx-auto border-2 border-blue-500 bg-dark-1 dark:bg-gray-300 text-gray-100  dark:text-gray-900 ">
          <h2 
            className="text-xl sm:text-2xl md:text-3xl font-semibold mb-4 cursor-pointer transition-colors hover:text-gold-500"
            onClick={toggleTeam}
          >
            Meet the Team
          </h2>
          {showTeam && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              <div className="text-center">
                <h3 className="text-lg sm:text-xl md:text-2xl font-medium">Mike Johnson</h3>
                <p className="text-sm sm:text-base">Founder & CEO</p>
                <p className="text-sm sm:text-base mt-2">
                  Mike is an experienced facilitator with over 15 years in meeting management. He is passionate about creating environments that foster collaboration and innovation.
                </p>
              </div>

              <div className="text-center">
                <h3 className="text-lg sm:text-xl md:text-2xl font-medium">Jane Smith</h3>
                <p className="text-sm sm:text-base">Chief Operating Officer</p>
                <p className="text-sm sm:text-base mt-2">
                  Jane has a strong background in operations and management. She has worked with several Fortune 500 companies and brings a wealth of experience in optimizing meeting processes.
                </p>
              </div>

              <div className="text-center">
                <h3 className="text-lg sm:text-xl md:text-2xl font-medium">Alice Johnson</h3>
                <p className="text-sm sm:text-base">Chief Marketing Officer</p>
                <p className="text-sm sm:text-base mt-2">
                  Alice is an expert in digital marketing and branding. She has led successful campaigns for various global brands and is dedicated to increasing the visibility of Meetings Hub.
                </p>
              </div>
            </div>
          )}
        </section>
    </div>
  );
};

export default AboutUs;
