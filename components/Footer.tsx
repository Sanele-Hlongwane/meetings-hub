import React from "react";
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-blue-900 text-gray-300 py-10 px-5 lg:px-20">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="flex flex-col">
          <h2 className="text-2xl font-bold text-white mb-4">Eagles Ring</h2>
          <p>
            Eagles Ring is an investment platform that matches aspiring entrepreneurs from around the world with investment opportunities.
          </p>
          <p className="mt-4">
            Entrepreneurs are invited to pitch their business models in front of a carefully curated panel of highly esteemed local and international business moguls, known as the “Eagles.”
          </p>
        </div>
        <div className="flex flex-col">
          <h3 className="text-xl font-semibold text-white mb-4">Contact Us</h3>
          <div className="flex items-center mb-2">
            <FaMapMarkerAlt className="text-gray-400 mr-2" />
            <p className="text-sm lg:text-base">123 Investment Street, Business City, Country</p>
          </div>
          <div className="flex items-center mb-2">
            <FaPhone className="text-gray-400 mr-2" />
            <p className="text-sm lg:text-base">+123 456 7890</p>
          </div>
          <div className="flex items-center mb-2">
            <FaEnvelope className="text-gray-400 mr-2" />
            <p className="text-sm lg:text-base">info@eaglesring.com</p>
          </div>
        </div>
        <div className="flex flex-col">
          <h3 className="text-xl font-semibold text-white mb-4">Follow Us</h3>
          <div className="flex items-center mb-2">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="flex items-center text-white hover:text-gray-400 transition duration-300">
              <FaFacebook className="text-xl mr-2" />
              <span>Facebook</span>
            </a>
          </div>
          <div className="flex items-center mb-2">
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="flex items-center text-white hover:text-gray-400 transition duration-300">
              <FaTwitter className="text-xl mr-2" />
              <span>Twitter</span>
            </a>
          </div>
          <div className="flex items-center mb-2">
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="flex items-center text-white hover:text-gray-400 transition duration-300">
              <FaLinkedin className="text-xl mr-2" />
              <span>LinkedIn</span>
            </a>
          </div>
          <div className="flex items-center mb-2">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="flex items-center text-white hover:text-gray-400 transition duration-300">
              <FaInstagram className="text-xl mr-2" />
              <span>Instagram</span>
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-700 mt-8 pt-4 text-center">
        <p>&copy; {new Date().getFullYear()} Eagles Ring. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
