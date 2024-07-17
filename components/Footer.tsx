import { FaTwitter, FaFacebook, FaInstagram } from 'react-icons/fa';
import Link from 'next/link';

const Footer = () => {

  return (
    <footer className="bg-black text-white py-8 shadow-lg" style={{ width: '100vw' }}>
      <div className="container mx-auto text-center">
        <p className="text-sm lg:text-base mb-4">&copy; 2024 Eagles Ring. All rights reserved.</p>
        <p className="text-xs lg:text-sm mb-2">Contact us: contact@eaglesring.com</p>
        <div className="text-xs lg:text-sm mb-4 flex justify-center space-x-4">
          <Link href="/Terms" passHref>
            <p className="hover:text-yellow-500 transition-colors duration-300">Terms and Conditions</p>
          </Link>
        </div>
        <div className="text-xs lg:text-sm flex justify-center items-center space-x-4">
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="ml-2">
            <FaTwitter className="text-gray-400 hover:text-white transition-colors duration-300" />
            <span className="sr-only">Twitter</span>
          </a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="ml-2">
            <FaFacebook className="text-gray-400 hover:text-white transition-colors duration-300" />
            <span className="sr-only">Facebook</span>
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="ml-2">
            <FaInstagram className="text-gray-400 hover:text-white transition-colors duration-300" />
            <span className="sr-only">Instagram</span>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
