// frontend/src/components/Footer.jsx
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="border-t border-brand-gray-light bg-brand-black">
      <div className="container mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-baseline justify-between">
          <div className="flex flex-col">
            <span className="font-heading text-2xl font-bold tracking-wider text-brand-red">
              SSTRAESS
            </span>
            <p className="mt-2 max-w-xs text-sm text-gray-400">
              Secure, Stylish, Scalable.
            </p>
          </div>

          {/* --- REMOVED LINKS DIV --- */}

        </div>
        <div className="mt-8 border-t border-brand-gray-light pt-8 md:flex md:items-center md:justify-between">
          <p className="text-xs text-gray-500 md:order-1">
            &copy; {new Date().getFullYear()} SSTRAESS. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;