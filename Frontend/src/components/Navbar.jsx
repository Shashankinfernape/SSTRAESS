// frontend/src/components/Navbar.jsx
// MODIFIED: Hover effect now links to the new "creators" section

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLogoHovered, setIsLogoHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 z-50 w-full px-4 py-4 transition-all duration-300 sm:px-8 ${
        isScrolled ? 'bg-brand-black shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto flex items-center justify-between">
        {/* === Updated Logo Hover Effect === */}
        <div className="relative">
          <motion.div
            onHoverStart={() => setIsLogoHovered(true)}
            onHoverEnd={() => setIsLogoHovered(false)}
          >
            <Link to="/">
              <motion.div
                className="cursor-pointer font-heading text-4xl font-bold tracking-wider text-brand-red"
                whileHover={{
                  textShadow: '0px 0px 8px rgb(229,9,20)',
                  scale: 1.05,
                }}
                transition={{ duration: 0.3 }}
              >
                SSTRAESS
              </motion.div>
            </Link>

            {/* Animated Box - now links to creators section */}
            <AnimatePresence>
              {isLogoHovered && (
                <motion.a
                  // This 'a' tag links to the id="creators" in LandingPage.jsx
                  // The smooth scroll is handled by 'scroll-smooth' in index.css
                  href="/#creators"
                  className="absolute left-1/2 top-full mt-2 w-max -translate-x-1/2 cursor-pointer rounded-md bg-brand-white px-3 py-2 text-sm font-semibold text-brand-black shadow-lg"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2, ease: 'easeInOut' }}
                >
                  Meet the Creators
                  <span className="ml-1 opacity-70">(Click to see)</span>
                </motion.a>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
        {/* === End Logo Hover Effect === */}

        <div className="flex items-center space-x-4">
          <Link
            to="/login"
            className="rounded-md px-4 py-2 text-sm font-semibold text-white transition-colors hover:text-gray-300"
          >
            Sign In
          </Link>
          <Link
            to="/signup"
            className="rounded-md bg-brand-red px-4 py-2 text-sm font-semibold text-white transition-all duration-300 hover:bg-secondary hover:shadow-glow-red"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;