import React from 'react';

const FAQ = () => {
  return (
    <div className="p-8 bg-gradient-to-br from-gray-900 via-gray-800 to-black py-24 text-white">
      <h1 className="text-5xl font-extrabold mb-10 text-gold">Frequently Asked Questions (FAQs)</h1>
      
      <div className="mb-8">
        <h2 className="text-3xl font-semibold mb-3 text-gold">What is Eagles Ring?</h2>
        <p className="text-lg leading-relaxed">
          Eagles Ring is an investment platform that connects entrepreneurs with investors. Entrepreneurs pitch their business models to a panel of investors called "Eagles."
        </p>
      </div>

      <div className="mb-8">
        <h2 className="text-3xl font-semibold mb-3 text-gold">How can I sign up as an entrepreneur or investor?</h2>
        <p className="text-lg leading-relaxed">
          You can sign up by visiting our registration page and selecting the role that best fits your profile. You will need to provide some basic information and create an account.
        </p>
      </div>

      <div className="mb-8">
        <h2 className="text-3xl font-semibold mb-3 text-gold">How do I pitch my business idea?</h2>
        <p className="text-lg leading-relaxed">
          Once you have signed up as an entrepreneur, you can submit your business pitch through our platform. You will be guided through the process and provided with tips to help you create a compelling pitch.
        </p>
      </div>

      <div className="mb-8">
        <h2 className="text-3xl font-semibold mb-3 text-gold">How do investors review pitches?</h2>
        <p className="text-lg leading-relaxed">
          Investors can browse through submitted pitches and review them based on their investment preferences. They may request additional information or schedule meetings with entrepreneurs they are interested in.
        </p>
      </div>

      <div className="mb-8">
        <h2 className="text-3xl font-semibold mb-3 text-gold">How can I contact support?</h2>
        <p className="text-lg leading-relaxed">
          If you have any questions or need assistance, you can contact our support team via the contact form on our website or by emailing us at <a href="mailto:support@eaglesring.com" className="underline text-gold">support@eaglesring.com</a>.
        </p>
      </div>
    </div>
  );
};

export default FAQ;
