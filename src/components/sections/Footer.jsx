import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-scroll';
import { Mail, Phone, ArrowUp, Heart } from 'lucide-react';
import { footerData } from '../../data/footerData';
import { SOCIAL_LINKS } from '../../data/socialLinks';

const GithubIcon = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3-.3 6-1.5 6-6.5a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 5 3 6.2 6 6.5a4.8 4.8 0 0 0-1 3.2v4"></path>
  </svg>
);

const LinkedinIcon = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

export function Footer() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show button after scrolling past 600px (roughly the hero section)
      if (window.scrollY > 600) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <motion.footer 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="w-full bg-[#fcfcfc] border-t border-gray-200 pt-[80px] pb-[40px] px-6 flex flex-col items-center"
    >
      <div className="max-w-[1200px] w-full mx-auto flex flex-col">
        
        {/* Top Section: 3 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 mb-16">
          
          {/* Column 1: Brand */}
          <div className="flex flex-col">
            <h2 className="text-[28px] font-extrabold text-[#0a0a0a] tracking-tight mb-4">
              MS.
            </h2>
            <p className="text-gray-500 text-[16px] leading-[1.7] max-w-[280px] mb-8">
              {footerData.tagline}
            </p>
            <div className="flex gap-4">
              <a 
                href={SOCIAL_LINKS.linkedin} 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Visit LinkedIn profile"
                className="group w-[48px] h-[48px] rounded-xl border border-gray-300 bg-white flex items-center justify-center hover:bg-black hover:border-black text-[#0a0a0a] hover:text-white transition-all duration-300"
              >
                <motion.div whileHover={{ rotate: 360 }} whileTap={{ rotate: 360 }} transition={{ duration: 0.6, ease: "easeInOut" }}>
                  <LinkedinIcon size={20} />
                </motion.div>
              </a>
              <a 
                href={SOCIAL_LINKS.github} 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Visit GitHub profile"
                className="group w-[48px] h-[48px] rounded-xl border border-gray-300 bg-white flex items-center justify-center hover:bg-black hover:border-black text-[#0a0a0a] hover:text-white transition-all duration-300"
              >
                <motion.div whileHover={{ rotate: 360 }} whileTap={{ rotate: 360 }} transition={{ duration: 0.6, ease: "easeInOut" }}>
                  <GithubIcon size={20} />
                </motion.div>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="flex flex-col">
            <h3 className="text-[18px] font-bold text-[#0a0a0a] mb-6">Quick Links</h3>
            <nav className="flex flex-col gap-4">
              {footerData.quickLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  smooth={true}
                  offset={-100}
                  className="cursor-pointer text-gray-500 hover:text-black font-medium transition-colors w-fit"
                >
                  <motion.span 
                    className="inline-block"
                    whileHover={{ x: -5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  >
                    {link.label}
                  </motion.span>
                </Link>
              ))}
            </nav>
          </div>

          {/* Column 3: Contact */}
          <div className="flex flex-col">
            <h3 className="text-[18px] font-bold text-[#0a0a0a] mb-6">Contact</h3>
            <div className="flex flex-col gap-5">
              <a href={`mailto:${footerData.contact.email}`} className="group flex items-center gap-3 w-fit">
                <Mail size={20} className="text-gray-400 group-hover:text-black transition-colors" />
                <span className="text-gray-500 font-medium group-hover:text-black group-hover:underline underline-offset-4 transition-all">
                  {footerData.contact.email}
                </span>
              </a>
              <a href={`tel:${footerData.contact.phone.replace(/\s+/g, '')}`} className="group flex items-center gap-3 w-fit">
                <Phone size={20} className="text-gray-400 group-hover:text-black transition-colors" />
                <span className="text-gray-500 font-medium group-hover:text-black group-hover:underline underline-offset-4 transition-all">
                  {footerData.contact.phone}
                </span>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Section */}
        <div className="w-full pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 text-[14px] text-gray-500 font-medium">
            Built with 
            <Heart size={16} className="text-red-500 animate-pulse fill-red-500" /> 
            by Mohammed Sayeed S &copy; {new Date().getFullYear()}
          </div>

          <AnimatePresence>
            {showScrollTop && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                whileHover={{ y: -4, boxShadow: "0 10px 25px rgba(0,0,0,0.15)" }}
                whileTap={{ scale: 0.95 }}
                onClick={scrollToTop}
                aria-label="Back to top"
                className="w-12 h-12 bg-black rounded-full flex items-center justify-center text-white shadow-lg transition-all"
              >
                <ArrowUp size={20} strokeWidth={2.5} />
              </motion.button>
            )}
          </AnimatePresence>
        </div>

      </div>
    </motion.footer>
  );
}
