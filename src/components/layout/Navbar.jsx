import React, { useState, useEffect } from 'react';
import { Link } from 'react-scroll';
import { motion, AnimatePresence, useScroll } from 'framer-motion';
import { Download, Menu, X } from 'lucide-react';
import { MagneticElement } from '../ui/MagneticElement';
import { useScrollSpy } from '../../hooks/useScrollSpy';

const NAV_LINKS = [
  { label: 'Home', href: 'home', isEnabled: true },
  { label: 'About', href: 'about', isEnabled: true },
  { label: 'Skills', href: 'skills', isEnabled: true },
  { label: 'Experience', href: 'experience', isEnabled: true },
  { label: 'Projects', href: 'projects', isEnabled: true },
  { label: 'Certifications', href: 'certifications', isEnabled: true },
  { label: 'Achievements', href: 'achievements', isEnabled: true },
  { label: 'Innovation', href: 'innovation', isEnabled: true },
  { label: 'Education', href: 'education', isEnabled: true },
  { label: 'Vision', href: 'vision', isEnabled: true },
  { label: 'Contact', href: 'contact', isEnabled: true },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const activeSection = useScrollSpy(NAV_LINKS.filter(l => l.isEnabled).map(l => l.href), 100) || 'home';
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY >= 40);
    };
    // Initial check
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-gray-400 to-[#0A0A0A] z-[60]"
        style={{ scaleX: scrollYProgress, transformOrigin: '0%' }}
      />

      {/* Main Navbar */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled 
            ? 'bg-white/80 backdrop-blur-md border-b border-black/5 shadow-sm' 
            : 'bg-transparent'
        }`}
      >
        <div className="w-full max-w-[1440px] mx-auto px-5 lg:px-[48px] py-[24px] flex items-center justify-between">
          
          {/* LEFT: LOGO */}
          <div className="shrink-0 flex items-center">
            <Link
              to="home"
              smooth={true}
              className="text-[24px] font-[900] text-[#0A0A0A] tracking-tighter cursor-pointer flex items-baseline no-underline"
            >
              MS
              <motion.span 
                className="inline-block"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                .
              </motion.span>
            </Link>
          </div>

          {/* CENTER-RIGHT: NAV LINKS (Desktop) */}
          <div className="hidden lg:flex items-center justify-end flex-1 px-6">
            <ul className="flex flex-row items-center gap-[32px]">
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  {link.isEnabled ? (
                    <Link
                      to={link.href}
                      smooth={true}
                      offset={-100}
                      className="relative cursor-pointer group flex flex-col justify-center"
                    >
                      <motion.span
                        className={`text-[15px] transition-colors duration-200 block ${
                          activeSection === link.href ? 'text-[#0A0A0A] font-bold' : 'text-[#2A2A2A] font-semibold hover:text-[#0A0A0A]'
                        }`}
                        whileHover={{ scale: 1.05, y: -1, color: '#0A0A0A' }}
                        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                      >
                        {link.label}
                      </motion.span>
                      {activeSection === link.href && (
                        <motion.div
                          layoutId="nav-underline"
                          className="absolute left-0 right-0 -bottom-1.5 h-[2px] bg-[#0A0A0A]"
                          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        />
                      )}
                    </Link>
                  ) : (
                    <div className="relative cursor-default flex flex-col justify-center opacity-50">
                      <span className="text-[15px] font-medium text-[#3A3A3A] block">
                        {link.label}
                      </span>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* RIGHT: HAMBURGER & RESUME BUTTON */}
          <div className="flex items-center shrink-0 gap-4">
            <button
              className="lg:hidden p-2 text-[#0A0A0A]"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={24} />
            </button>
            
            <MagneticElement radius={12}>
              <a 
                href="/resume.pdf" 
                download="Mohammed_Sayeed_Resume.pdf" 
                className="flex items-center gap-2 bg-[#0A0A0A] text-[#FFFFFF] rounded-full py-[12px] px-[24px] hover:bg-[#1A1A1A] hover:scale-[1.02] transition-all shimmer-btn overflow-hidden cursor-pointer"
              >
                <Download size={16} strokeWidth={2} />
                <span className="text-[15px] font-semibold">Resume</span>
              </a>
            </MagneticElement>
          </div>

        </div>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60] lg:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3, ease: 'easeOut' }}
              className="fixed top-0 right-0 bottom-0 w-64 bg-white shadow-xl z-[70] flex flex-col lg:hidden"
            >
              <div className="p-6 flex justify-end">
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 text-[#0A0A0A]"
                  aria-label="Close menu"
                >
                  <X size={24} />
                </button>
              </div>
              <div className="flex flex-col px-6 space-y-[24px] flex-1 overflow-y-auto mt-4">
                {NAV_LINKS.map((link, i) => (
                  <motion.div
                    key={link.label}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04, duration: 0.3 }}
                  >
                    {link.isEnabled ? (
                      <Link
                        to={link.href}
                        smooth={true}
                        offset={-80}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`block text-[18px] transition-colors ${
                          activeSection === link.href ? 'text-[#0A0A0A] font-bold' : 'text-[#2A2A2A] font-semibold hover:text-[#0A0A0A]'
                        }`}
                      >
                        {link.label}
                      </Link>
                    ) : (
                      <span className="block text-[18px] font-medium text-[#3A3A3A] opacity-50 cursor-default">
                        {link.label}
                      </span>
                    )}
                  </motion.div>
                ))}
              </div>
              <div className="p-6 border-t border-gray-100 mt-auto">
                <a 
                  href="/resume.pdf" 
                  download="Mohammed_Sayeed_Resume.pdf" 
                  className="w-full flex items-center justify-center gap-2 bg-[#0A0A0A] text-[#FFFFFF] rounded-full py-[12px] px-[24px] shimmer-btn"
                >
                  <Download size={16} strokeWidth={2} />
                  <span className="text-[15px] font-semibold">Resume</span>
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
