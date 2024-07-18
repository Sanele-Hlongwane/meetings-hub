import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faFacebook, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { checkUser } from '@/lib/checkUser';

const Footer = async () => {
  const user = await checkUser(null);

  return (
    <footer className="bg-black text-white py-12 shadow-xl" style={{ width: '100vw' }}>
      <div className="container mx-auto text-center">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <p className="text-lg lg:text-xl font-semibold">&copy; 2024 Eagles Ring. All rights reserved.</p>
          <p className="text-sm lg:text-base">Contact us: contact@eaglesring.com</p>
        </div>
        <div className="text-sm lg:text-base mb-6 flex justify-center space-x-8">
          <Link href="/Terms" passHref>
            <p className="hover:text-yellow-500 transition-colors duration-300">Terms and Conditions</p>
          </Link>
          <Link href="/Privacy" passHref>
            <p className="hover:text-yellow-500 transition-colors duration-300">Privacy Policy</p>
          </Link>
          <Link href="/FAQ" passHref>
            <p className="hover:text-yellow-500 transition-colors duration-300">FAQ</p>
          </Link>
        </div>
          
        <div className="text-sm lg:text-base flex justify-center items-center space-x-6">
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="ml-2">
            <FontAwesomeIcon icon={faTwitter} className="text-gray-400 hover:text-white transition-colors duration-300" />
            <span className="sr-only">Twitter</span>
          </a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="ml-2">
            <FontAwesomeIcon icon={faFacebook} className="text-gray-400 hover:text-white transition-colors duration-300" />
            <span className="sr-only">Facebook</span>
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="ml-2">
            <FontAwesomeIcon icon={faInstagram} className="text-gray-400 hover:text-white transition-colors duration-300" />
            <span className="sr-only">Instagram</span>
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="ml-2">
            <FontAwesomeIcon icon={faLinkedin} className="text-gray-400 hover:text-white transition-colors duration-300" />
            <span className="sr-only">LinkedIn</span>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
