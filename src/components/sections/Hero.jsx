import React, { useState, useEffect } from 'react';
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion';
import { MapPin, Phone, Mail, ArrowRight } from 'lucide-react';
import { Link } from 'react-scroll';
import { GridBackground } from '../ui/GridBackground';
import { MagneticElement } from '../ui/MagneticElement';
import { Button } from '../ui/Button';
import { SOCIAL_LINKS } from '../../data/socialLinks';

// Inline SVGs for Github and Linkedin since lucide-react lacks them
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

// Floating Shape Component
const FloatingShape = ({ className, delay = 0, duration = 20, reverse = false }) => {
  const prefersReducedMotion = useReducedMotion();
  if (prefersReducedMotion) return null;
  
  return (
    <motion.div
      className={`absolute border border-black/[0.08] rounded-full pointer-events-none ${className}`}
      animate={{
        y: ['-5%', '5%', '-5%'],
        rotate: reverse ? [360, 0] : [0, 360]
      }}
      transition={{
        y: { duration: duration * 0.8, repeat: Infinity, ease: "easeInOut", delay },
        rotate: { duration, repeat: Infinity, ease: "linear" }
      }}
    />
  );
};

const ROLES = [
  "Founder, LeatherAI",
  "Full-Stack Developer",
  "AI/ML Engineer",
  "Computer Vision Enthusiast",
];

export function Hero() {
  const [nameHovered, setNameHovered] = useState(false);
  const [roleIndex, setRoleIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    let intervalId;
    
    const startInterval = () => {
      clearInterval(intervalId);
      intervalId = setInterval(() => {
        setRoleIndex((prev) => (prev + 1) % ROLES.length);
      }, 3500);
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        clearInterval(intervalId);
      } else {
        startInterval();
      }
    };

    startInterval();
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      clearInterval(intervalId);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  // Load Choreography Parent Variant
  const containerVariant = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  };

  const itemFadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 120, damping: 14 } }
  };

  const nameVariant = {
    hidden: { filter: "blur(8px)", opacity: 0, y: 40 },
    visible: { 
      filter: "blur(0px)", 
      opacity: 1, 
      y: 0,
      transition: { type: 'spring', stiffness: 100, damping: 15 }
    }
  };

  const nameFallbackVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 15 } }
  };

  const lineDraw = {
    hidden: { scaleX: 0 },
    visible: { scaleX: 1, transition: { duration: 0.8, ease: "circOut" } }
  };

  return (
    <GridBackground className="flex flex-col items-center justify-center pt-[90px] md:pt-[120px] min-h-screen relative overflow-hidden" id="home">
      
      {/* Soft Radial Spotlight */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(0,0,0,0.04)_0%,_transparent_50%)] pointer-events-none z-0" />
      
      {/* Abstract Floating Shapes */}
      <FloatingShape className="w-[300px] h-[300px] -left-20 top-[10%] opacity-60" duration={25} />
      <FloatingShape className="w-[450px] h-[450px] -right-32 bottom-20 opacity-50" delay={2} duration={30} reverse />
      <FloatingShape className="w-[200px] h-[200px] left-[15%] bottom-[5%] rounded-md opacity-40 border-black/[0.05]" delay={4} duration={22} />

      <div className="max-w-5xl mx-auto px-6 text-center w-full flex flex-col items-center relative z-10">
        <motion.div
          variants={containerVariant}
          initial="hidden"
          animate="visible"
          className="w-full flex flex-col items-center"
        >
          {/* Top Meta Row */}
          <motion.div className="flex flex-wrap justify-center items-center gap-6 text-[#6B6B6B] text-sm mb-12 mt-4">
            {[
              { icon: <MapPin size={16} />, text: "Melvisharam, Tamil Nadu" },
              { icon: <Phone size={16} />, text: "+91 8667214299", href: "tel:+918667214299" },
              { icon: <Mail size={16} />, text: "smohammedsayeedxb@gmail.com", href: "mailto:smohammedsayeedxb@gmail.com" }
            ].map((item, index) => (
              <motion.div key={index} variants={itemFadeUp} className="flex items-center gap-2">
                {item.icon}
                {item.href ? (
                  <a href={item.href} className="relative inline-block group text-gray-800 hover:text-black transition-colors">
                    <span>{item.text}</span>
                    <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-black transition-all duration-300 group-hover:w-full" />
                  </a>
                ) : (
                  <span className="text-gray-800">{item.text}</span>
                )}
              </motion.div>
            ))}
          </motion.div>

          {/* Giant Name */}
          <div 
            className="flex flex-col items-center cursor-default group"
            onMouseEnter={() => !prefersReducedMotion && setNameHovered(true)}
            onMouseLeave={() => !prefersReducedMotion && setNameHovered(false)}
          >
            <motion.h1 
              variants={prefersReducedMotion ? nameFallbackVariant : nameVariant}
              className={`font-display font-[900] leading-[1.05] tracking-tighter uppercase transition-all duration-700 ${
                nameHovered ? 'text-transparent bg-clip-text bg-gradient-to-r from-[#0A0A0A] via-[#888888] to-[#0A0A0A] bg-[length:200%_auto] animate-shimmer' : 'text-[#0A0A0A]'
              }`}
              style={{ fontSize: 'clamp(3rem, 10vw, 8rem)' }}
            >
              MOHAMMED
            </motion.h1>
            <motion.h1 
              variants={prefersReducedMotion ? nameFallbackVariant : nameVariant}
              className={`font-display font-[900] leading-[1.05] tracking-tighter uppercase transition-all duration-700 ${
                nameHovered ? 'text-transparent bg-clip-text bg-gradient-to-r from-[#0A0A0A] via-[#888888] to-[#0A0A0A] bg-[length:200%_auto] animate-shimmer' : 'text-[#0A0A0A]'
              }`}
              style={{ fontSize: 'clamp(3rem, 10vw, 8rem)' }}
            >
              SAYEED S
            </motion.h1>
          </div>

          {/* Subtitle with Drawing Lines */}
          <motion.div className="flex items-center gap-6 mt-12 mb-8 w-full justify-center">
            <motion.div 
              className="h-[1px] bg-gray-300 flex-1 max-w-[80px]"
              variants={lineDraw}
              style={{ originX: 1 }}
            />
            <motion.h2 
              variants={itemFadeUp} 
              className="text-2xl md:text-3xl font-medium text-[#3A3A3A] shrink-0 h-[72px] md:h-[48px] flex items-center justify-center text-center max-w-[280px] md:max-w-none"
              aria-live="polite"
              aria-atomic="true"
            >
              {prefersReducedMotion ? (
                <span>{ROLES[roleIndex]}</span>
              ) : (
                <AnimatePresence mode="wait">
                  <motion.span
                    key={roleIndex}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="block"
                  >
                    {ROLES[roleIndex]}
                  </motion.span>
                </AnimatePresence>
              )}
            </motion.h2>
            <motion.div 
              className="h-[1px] bg-gray-300 flex-1 max-w-[80px]"
              variants={lineDraw}
              style={{ originX: 0 }}
            />
          </motion.div>

          {/* Mission (Mask Reveal) */}
          <motion.div
            variants={itemFadeUp}
            className="text-lg md:text-xl text-[#6B6B6B] max-w-2xl leading-relaxed mx-auto relative overflow-hidden"
          >
             <motion.div
              initial={prefersReducedMotion ? { opacity: 0 } : { clipPath: 'inset(0 100% 0 0)' }}
              animate={prefersReducedMotion ? { opacity: 1 } : { clipPath: 'inset(0 0% 0 0)' }}
              transition={{ delay: 1.2, duration: 1.5, ease: "easeInOut" }}
             >
               I build intelligent systems that turn raw data and real industry problems into working, scalable solutions.
             </motion.div>
          </motion.div>

          {/* CTA Row */}
          <motion.div variants={itemFadeUp} className="flex flex-col sm:flex-row items-center justify-center gap-[12px] sm:gap-[16px] mt-[40px] w-full max-w-[320px] sm:max-w-none mx-auto z-20">
            <MagneticElement radius={12}>
              <Link to="#" smooth={true} offset={-100} className="w-full sm:w-auto">
                <Button className="group flex items-center justify-center gap-2 w-full sm:w-auto bg-[#0A0A0A] text-white hover:bg-[#1A1A1A] rounded-full py-[16px] px-[32px] text-[16px] font-[600] transition-all hover:scale-[1.03] duration-200">
                  View Projects
                  <ArrowRight size={18} className="transition-transform duration-200 group-hover:translate-x-1" />
                </Button>
              </Link>
            </MagneticElement>

          </motion.div>

          {/* Social Icon Row */}
          <motion.div variants={itemFadeUp} className="flex flex-row items-center justify-center gap-[16px] mt-[32px] z-20">
            <a 
              href={SOCIAL_LINKS.linkedin} 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="Visit LinkedIn profile"
              className="flex items-center justify-center w-[48px] h-[48px] rounded-full border-[1.5px] border-black/15 bg-transparent text-[#0A0A0A] hover:bg-[#0A0A0A] hover:text-white hover:border-[#0A0A0A] hover:scale-[1.08] transition-all duration-200"
            >
              <LinkedinIcon size={20} />
            </a>
            <a 
              href={SOCIAL_LINKS.github} 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="Visit GitHub profile"
              className="flex items-center justify-center w-[48px] h-[48px] rounded-full border-[1.5px] border-black/15 bg-transparent text-[#0A0A0A] hover:bg-[#0A0A0A] hover:text-white hover:border-[#0A0A0A] hover:scale-[1.08] transition-all duration-200"
            >
              <GithubIcon size={20} />
            </a>
          </motion.div>

          {/* Custom Scroll Cue */}
          <motion.div variants={itemFadeUp} className="flex flex-col items-center justify-center mt-[48px] mb-[24px] z-20">
            <Link to="about" smooth={true} offset={-100} className="flex flex-col items-center cursor-pointer group">
              <span className="text-[11px] font-bold tracking-[0.2em] text-gray-400 mb-2 group-hover:text-[#0A0A0A] transition-colors">SCROLL</span>
              <div className="w-[24px] h-[40px] border-[1.5px] border-black/20 rounded-full flex justify-center p-1 relative overflow-hidden group-hover:border-[#0A0A0A] transition-colors">
                {!prefersReducedMotion && (
                  <motion.div
                    className="w-[6px] h-[6px] bg-[#0A0A0A] rounded-full absolute top-1"
                    animate={{ y: [0, 20, 20], opacity: [1, 1, 0] }}
                    transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                  />
                )}
                {prefersReducedMotion && (
                   <div className="w-[6px] h-[6px] bg-[#0A0A0A] rounded-full absolute top-1" />
                )}
              </div>
            </Link>
          </motion.div>

        </motion.div>
      </div>
    </GridBackground>
  );
}
