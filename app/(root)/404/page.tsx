'use client';

import React from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';

const NotFoundPage = () => {
  const router = useRouter();

  const handleBackHome = () => {
    router.push('/');
  };

  return (
    <div className="bg-dark-1 text-white min-h-screen flex flex-col items-center justify-center py-24 px-4">
      <div className="text-center">
        <div className="relative w-full h-48 sm:h-72 mb-8">
          <Image
            src="/EaglesRingLogoDark.png"
            alt="Eagle Icon"
            layout="fill"
            objectFit="contain"
            className="opacity-50"
          />
        </div>
        <h1 className="text-6xl sm:text-8xl font-bold mb-4">
          404
        </h1>
        <p className="text-lg sm:text-xl mb-8">
          Looks like you’ve flown off course. The page you’re looking for is not here.
        </p>
        <button
          onClick={handleBackHome}
          className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg"
        >
          Return to the Nest
        </button>
      </div>
    </div>
  );
};

export default NotFoundPage;
