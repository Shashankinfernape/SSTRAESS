// frontend/src/pages/LandingPage.jsx
// MODIFIED: Added animated scroll-down indicator & fixed typo

import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
// Added ChevronDown
import { Lock, Shield, Zap, ChevronRight, ChevronDown } from 'lucide-react';
import { useState } from 'react';

// --- (FadeIn, FeatureCard, creators, commonInfo, AccordionItem components are all unchanged) ---

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const FeatureCard = ({ icon, title, children }) => (
  <motion.div
    className="rounded-2xl border border-brand-gray-light bg-brand-gray-dark p-6"
    variants={fadeIn}
  >
    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-brand-red text-white">
      {icon}
    </div>
    <h3 className="mt-4 text-xl font-semibold">{title}</h3>
    <p className="mt-2 text-gray-400">{children}</p>
  </motion.div>
);

const creators = [
  // ... (creator data unchanged)
  {
    name: 'Shashank',
    nmId: '45FDF2C12475BC293A843D1992BBBAC3',
    rollNo: '511923104065',
  },
  {
    name: 'Sarathy',
    nmId: '5a4a7ee679f36c0a3794bd6c729b18dd',
    rollNo: '511923104063',
  },
  {
    name: 'Selvaganapathy',
    nmId: 'B523E46BD53DA79A3E74550C72685F00',
    rollNo: '511923104064',
  },
  {
    name: 'Suresh',
    nmId: '64a0d180342323ea5b14726cff6c0a47',
    rollNo: '511923104071',
  },
  {
    name: 'Sunil',
    nmId: 'D801FDATEB1B07BA45D4F628406B12FA',
    rollNo: '511923104701',
  },
];

const commonInfo = {
  college: 'Priyadarshini Engineering College',
  department: 'Computer Science and Engineering',
};

const AccordionItem = ({ item, isOpen, onClick }) => {
  // ... (accordion component unchanged)
  return (
    <div className="overflow-hidden border-b border-brand-gray-light">
      <button
        onClick={onClick}
        className="group flex w-full items-center justify-between py-5 text-left text-xl font-semibold text-white transition-colors hover:text-gray-300"
      >
        <span>{item.name}</span>
        <ChevronRight
          size={24}
          className={`transform transition-transform duration-300 ${
            isOpen ? 'rotate-90' : 'rotate-0'
          }`}
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="pb-5"
          >
            <div className="rounded-lg bg-brand-black p-4">
              <p className="text-sm text-gray-400">STUDENT NM-ID:</p>
              <p className="font-mono text-base text-white">{item.nmId}</p>
              <p className="mt-3 text-sm text-gray-400">ROLL NO:</p>
              <p className="font-mono text-base text-white">{item.rollNo}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
// --- (End of unchanged components) ---

const LandingPage = () => {
  const [openAccordion, setOpenAccordion] = useState(null);

  const handleAccordionClick = (index) => {
    setOpenAccordion(openAccordion === index ? null : index);
  };

  return (
    <div className="overflow-x-hidden">
      {/* Hero Section */}
      <motion.section
        className="relative flex min-h-screen items-center justify-center overflow-hidden text-center"
        initial="hidden"
        animate="visible"
      >
        {/* ... (background glow unchanged) ... */}
        <div className="absolute inset-0 z-0">
          <div className="absolute left-1/4 top-1/4 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-red opacity-10 blur-[150px]"></div>
          <div className="absolute bottom-1/4 right-1/4 h-96 w-96 translate-x-1/2 translate-y-1/2 rounded-full bg-blue-600 opacity-10 blur-[150px]"></div>
        </div>

        <div className="relative z-10 mx-auto max-w-3xl px-4">
          <motion.h1
            className="font-heading text-7xl font-extrabold tracking-wide text-white sm:text-8xl md:text-9xl"
            variants={fadeIn}
          >
            SSTRAESS
          </motion.h1>

          <motion.div
            className="mt-10"
            variants={fadeIn}
            transition={{ delay: 0.2 }}
          >
            <Link
              to="/signup"
              className="rounded-lg bg-brand-red px-10 py-4 font-semibold text-white shadow-lg transition-all duration-300 hover:bg-secondary hover:shadow-glow-red"
            >
              Get Started
            </Link>
          </motion.div>
        </div>

        {/* --- SCROLL DOWN INDICATOR --- */}
        <motion.a
          href="/#features" // Links to the "features" id below
          className="absolute bottom-10 left-1/2 z-20 -translate-x-1/2 cursor-pointer"
          variants={fadeIn}
          transition={{ delay: 0.8 }} // Fades in after everything else
        >
          <motion.div
            animate={{ y: [0, 8, 0] }} // Bouncing animation
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <ChevronDown size={32} className="text-gray-500" />
          </motion.div>
        </motion.a>
        {/* --- END SCROLL INDICATOR --- */}

      </motion.section>

      {/* Features Section */}
      <motion.section
        id="features" // <-- Added ID for scroll anchor
        className="py-24"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        transition={{ staggerChildren: 0.2 }}
      >
        <div className="container mx-auto max-w-7xl px-4">
          <h2 className="text-center font-heading text-5xl font-semibold tracking-wider">
            Why SSTRAESS?
          </h2>
          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
            {/* ... (FeatureCards unchanged) ... */}
            <FeatureCard icon={<Lock size={24} />} title="Secure by Default">
              Built with JWT authentication and secure token refresh logic to
              protect your data.
            </FeatureCard>
            <FeatureCard icon={<Zap size={24} />} title="Blazing Fast">
              A modern stack using React, Vite, and Node.js for an
              instant-loading experience.
            </FeatureCard>
            <FeatureCard icon={<Shield size={24} />} title="Robust & Reliable">
              Professionally structured and managed, ensuring your session is
              always safe.
            </FeatureCard>
          </div>
        </div>
      </motion.section>

      {/* Meet the Creators Section */}
      <motion.section
        id="creators"
        className="py-24"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="container mx-auto max-w-4xl px-4">
          <motion.h2
            className="text-center font-heading text-5xl font-semibold tracking-wider"
            variants={fadeIn}
          >
            Meet the Creators
          </motion.h2> {/* <-- FIXED TYPO HERE */}
          
          <motion.div
            className="mt-8 text-center"
            variants={fadeIn}
            transition={{ delay: 0.2 }}
          >
            <p className="text-lg text-gray-300">{commonInfo.college}</p>
            <p className="text-md text-brand-red">{commonInfo.department}</p>
          </motion.div>

          <motion.div
            className="mt-12 rounded-lg border border-brand-gray-light bg-brand-gray-dark p-2 shadow-xl md:p-6"
            variants={fadeIn}
            transition={{ delay: 0.4 }}
          >
            {creators.map((item, index) => (
              <AccordionItem
                key={index}
                item={item}
                isOpen={openAccordion === index}
                onClick={() => handleAccordionClick(index)}
              />
            ))}
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default LandingPage;