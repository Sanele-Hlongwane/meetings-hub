import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faLinkedin, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faPhone, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

const Footer = () => {
  return (
    <footer className="bg-black text-gray-300 py-10 px-5 lg:px-20">
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
          <p>
            <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2" /> 30 Kadjipiering street, Johannesburg, South Africa
          </p>
          <p>
            <FontAwesomeIcon icon={faPhone} className="mr-2" /> +2760 317 9552
          </p>
          <p>
            <FontAwesomeIcon icon={faEnvelope} className="mr-2" /> info@eaglesring.com
          </p>
        </div>
        <div className="flex flex-col">
          <h3 className="text-xl font-semibold text-white mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faFacebook} className="text-gray-300 hover:text-white transition duration-300" size="2x" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faTwitter} className="text-gray-300 hover:text-white transition duration-300" size="2x" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faLinkedin} className="text-gray-300 hover:text-white transition duration-300" size="2x" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faInstagram} className="text-gray-300 hover:text-white transition duration-300" size="2x" />
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
