// pages/faq.tsx
import React from 'react';

const FAQ = () => {
  return (
    <div className="p-6 bg-white dark:bg-dark-1 text-black dark:text-white">
      <h1 className="text-3xl font-bold mb-4">Frequently Asked Questions (FAQ)</h1>
      
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">What is Eagles Ring?</h2>
        <p>
          Eagles Ring is an investment platform that connects entrepreneurs with investors. Entrepreneurs pitch their business models to a panel of investors called "Eagles."
        </p>
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">How can I sign up as an entrepreneur or investor?</h2>
        <p>
          You can sign up by visiting our registration page and selecting the role that best fits your profile. You will need to provide some basic information and create an account.
        </p>
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">How do I pitch my business idea?</h2>
        <p>
          Once you have signed up as an entrepreneur, you can submit your business pitch through our platform. You will be guided through the process and provided with tips to help you create a compelling pitch.
        </p>
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">How do investors review pitches?</h2>
        <p>
          Investors can browse through submitted pitches and review them based on their investment preferences. They may request additional information or schedule meetings with entrepreneurs they are interested in.
        </p>
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">How can I contact support?</h2>
        <p>
          If you have any questions or need assistance, you can contact our support team via the contact form on our website or by emailing us at [support email address].
        </p>
      </div>
    </div>
  );
};

export default FAQ;
