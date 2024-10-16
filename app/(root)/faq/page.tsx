import React from 'react';

const FAQ = () => {
  return (
    <div className="p-8 bg-gradient-to-br from-gray-900 via-gray-800 to-black py-24 text-white">
      <h1 className="text-5xl font-extrabold mb-10 text-blue-500 dark:text-orange-500">Frequently Asked Questions (FAQs)</h1>
      
      <div className="mb-8">
        <h2 className="text-3xl font-semibold mb-3 text-blue-500 dark:text-orange-500">What is Meetings Hub?</h2>
        <p className="text-lg leading-relaxed">
          Meetings Hub is a virtual meeting platform that facilitates seamless online interactions, similar to Zoom and Google Meet. It allows users to host, join, and manage video conferences, webinars, and online events with ease.
        </p>
      </div>

      <div className="mb-8">
        <h2 className="text-3xl font-semibold mb-3 text-blue-500 dark:text-orange-500">How can I sign up as a user?</h2>
        <p className="text-lg leading-relaxed">
          You can sign up by visiting our registration page. Choose whether you want to join as a participant, host, or presenter. You will need to provide some basic information to create your account.
        </p>
      </div>

      <div className="mb-8">
        <h2 className="text-3xl font-semibold mb-3 text-blue-500 dark:text-orange-500">How do I schedule a meeting?</h2>
        <p className="text-lg leading-relaxed">
          After signing up, you can schedule a meeting by navigating to the scheduling section of your dashboard. Simply select your preferred date and time, invite participants, and set the meeting details. Invitations will be sent automatically.
        </p>
      </div>

      <div className="mb-8">
        <h2 className="text-3xl font-semibold mb-3 text-blue-500 dark:text-orange-500">What features are available for meetings?</h2>
        <p className="text-lg leading-relaxed">
          Meetings Hub offers features like screen sharing, recording, chat, breakout rooms, and live polling to enhance your meeting experience. You can also customize your meeting settings to suit your needs.
        </p>
      </div>

      <div className="mb-8">
        <h2 className="text-3xl font-semibold mb-3 text-blue-500 dark:text-orange-500">How can I contact support?</h2>
        <p className="text-lg leading-relaxed">
          If you have any questions or need assistance, you can contact our support team via the contact form on our website or by emailing us at <a href="mailto:support@meetingshub.com" className="underline text-blue-500 dark:text-orange-500">support@meetingshub.com</a>.
        </p>
      </div>
    </div>
  );
};

export default FAQ;
