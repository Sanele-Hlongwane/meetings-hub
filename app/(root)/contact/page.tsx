'use client';
// Import necessary components and styles
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faTwitter, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { toast } from 'react-toastify';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: { target: { name: string; value: string; }; }) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Send email functionality here (optional if you're just opening the email client)

      const { name, email, message } = formData;
      const subject = 'Contact Inquiry from Eagles Ring';
      const body = `Name: ${name}%0AEmail: ${email}%0AMessage: ${message}`;

      // Construct the mailto link
      let mailtoLink = `mailto:contact@eaglesring.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

      // Open the default email client
      window.location.href = mailtoLink;

      // Show success toast
      toast.success('Email sent successfully!');
    } catch (error) {
      // Show error toast
      toast.error('Failed to send email. Please try again.');
    } finally {
      setIsLoading(false);
    }

    // Reset form fields after submission (optional)
    setFormData({
      name: '',
      email: '',
      message: ''
    });

    // Clear submit status after a few seconds
    setTimeout(() => {
      toast.dismiss(); // Dismiss any lingering toasts
    }, 10000);
  };

  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const handleThemeChange = (event: MediaQueryListEvent) => {
      setIsDarkMode(event.matches);
    };

    setIsDarkMode(window.matchMedia('(prefers-color-scheme: dark)').matches);

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', handleThemeChange);

    return () => {
      window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change', handleThemeChange);
    };
  }, []);

  return (
    <div className={`bg-${isDarkMode ? 'black' : 'white'} text-${isDarkMode ? 'white' : 'black'} min-h-screen py-16 px-4`} style={{ width: '100vw' }}>
      <div className="max-w-7xl mx-auto pt-20">
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-lg sm:text-xl mb-8">
            Have questions? Drop us a message or contact us through other means!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className={`mt-1 block w-full px-3 py-2 border border-${isDarkMode ? 'gray-300' : 'gray-800'} bg-${isDarkMode ? 'black' : 'white'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-${isDarkMode ? 'white' : 'black'}`}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className={`mt-1 block w-full px-3 py-2 border border-${isDarkMode ? 'gray-300' : 'gray-800'} bg-${isDarkMode ? 'black' : 'white'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-${isDarkMode ? 'white' : 'black'}`}
              />
            </div>

            <div className="mb-6">
              <label htmlFor="message" className="block text-sm font-medium">Message</label>
              <textarea
                id="message"
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                required
                className={`mt-1 block w-full px-3 py-2 border border-${isDarkMode ? 'gray-300' : 'gray-800'} bg-${isDarkMode ? 'black' : 'white'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-${isDarkMode ? 'white' : 'black'}`}
              />
            </div>

            <button
              type="submit"
              className={`bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={isLoading}
            >
              {isLoading ? 'Loading...' : 'Submit'}
            </button>
          </form>

          <div className="flex flex-col items-center md:items-start">
            <div className="mb-4">
              <p className="text-lg font-semibold">Other Ways to Contact Us:</p>
            </div>
            <div className="flex items-center mb-2">
              <FontAwesomeIcon icon={faPhone} className="text-gray-400 mr-2" />
              <p className="text-sm lg:text-base">+1 (123) 456-7890</p>
            </div>
            <div className="flex items-center mb-2">
              <FontAwesomeIcon icon={faEnvelope} className="text-gray-400 mr-2" />
              <p className="text-sm lg:text-base">contact@eaglesring.com</p>
            </div>
            <div className="flex items-center mb-2">
              <a href="https://www.facebook.com/eaglesring" target="_blank" rel="noopener noreferrer" className={`flex items-center text-${isDarkMode ? 'white' : 'black'} hover:text-gray-400 transition duration-300`}>
                <FontAwesomeIcon icon={faFacebook} className="text-2xl mr-2" />
                <span>Facebook</span>
              </a>
            </div>
            <div className="flex items-center mb-2">
              <a href="https://twitter.com/eaglesring" target="_blank" rel="noopener noreferrer" className={`flex items-center text-${isDarkMode ? 'white' : 'black'} hover:text-gray-400 transition duration-300`}>
                <FontAwesomeIcon icon={faTwitter} className="text-2xl mr-2" />
                <span>Twitter</span>
              </a>
            </div>
            <div className="flex items-center mb-2">
              <a href="https://www.linkedin.com/company/eaglesring" target="_blank" rel="noopener noreferrer" className={`flex items-center text-${isDarkMode ? 'white' : 'black'} hover:text-gray-400 transition duration-300`}>
                <FontAwesomeIcon icon={faLinkedin} className="text-2xl mr-2" />
                <span>LinkedIn</span>
              </a>
            </div>
            {/* Add more contact methods as needed */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
