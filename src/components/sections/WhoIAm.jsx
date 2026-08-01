import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, useMotionValue, useTransform, animate, AnimatePresence, useReducedMotion } from 'framer-motion';
import { User, Heart, Briefcase } from 'lucide-react';
import { ABOUT_BIO } from '../../data/aboutBio';
import { ABOUT_STATS } from '../../data/stats';

const Counter = ({ value, isDecimal }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const count = useMotionValue(0);
  const rounded = useTransform(count, latest => {
    return isDecimal ? latest.toFixed(2) : Math.round(latest);
  });

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, value, { duration: 1.5, ease: "easeOut" });
      return controls.stop;
    }
  }, [isInView, value, count]);

  return <motion.span ref={ref}>{rounded}</motion.span>;
};

const InteractiveBadge = ({ icon: Icon, onClick, ariaLabel, badgeType = 'nav', idleDelay, wrapperClass, sizeClass, iconSize = 20 }) => {
  const prefersReducedMotion = useReducedMotion();
  const [clicks, setClicks] = useState([]);
  const [isToggled, setIsToggled] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClick = () => {
    const id = Date.now();
    setClicks(prev => [...prev, id]);
    
    if (badgeType === 'toggle') {
      setIsToggled(prev => !prev);
    }
    
    if (!prefersReducedMotion) {
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 400); // Reset scale bounce
    }
    
    if (onClick) onClick();
    
    setTimeout(() => {
      setClicks(prev => prev.filter(clickId => clickId !== id));
    }, 600);
  };

  const floatVariant = {
    animate: (delay) => prefersReducedMotion ? {} : ({
      y: ['-4px', '4px', '-4px'],
      transition: { duration: 4, repeat: Infinity, ease: "easeInOut", delay }
    })
  };

  return (
    <motion.div custom={idleDelay} variants={floatVariant} animate="animate" className={`absolute z-20 ${wrapperClass}`}>
      <motion.button
        type="button"
        aria-label={ariaLabel}
        aria-pressed={badgeType === 'toggle' ? isToggled : undefined}
        onClick={handleClick}
        whileHover={prefersReducedMotion ? {} : { scale: 1.1 }}
        animate={{ 
          backgroundColor: badgeType === 'toggle' && isToggled ? '#2a2a2a' : '#0A0A0A',
          scale: isAnimating ? (badgeType === 'toggle' ? 1.25 : 1.3) : 1
        }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
        className={`relative rounded-full flex items-center justify-center shadow-xl cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#0A0A0A] ${sizeClass}`}
        initial={{ backgroundColor: '#0A0A0A', scale: 1 }}
      >
        <AnimatePresence>
          {!prefersReducedMotion && clicks.map(id => (
            <motion.div
              key={id}
              initial={{ scale: 1, opacity: 0.5 }}
              animate={{ scale: 1.8, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="absolute inset-0 rounded-full border-2 border-[#0A0A0A] pointer-events-none"
            />
          ))}
        </AnimatePresence>
        <Icon size={iconSize} className={badgeType === 'toggle' && isToggled ? 'fill-white text-white' : 'text-white'} />
      </motion.button>
    </motion.div>
  );
};

export function WhoIAm() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemFadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: "easeOut" } 
    }
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="pt-[80px] md:pt-[120px] pb-24 px-6 relative w-full flex justify-center bg-background" id="who-i-am">
      <div className="max-w-5xl w-full mx-auto relative">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* Top Label Block */}
          <div className="relative w-full mb-16 md:mb-20">
            <span 
              className="absolute right-0 -top-8 md:-top-16 text-[72px] md:text-[120px] font-extrabold text-[#E5E5E5] leading-none select-none"
              aria-hidden="true"
            >
              02
            </span>
            <motion.div variants={itemFadeUp} className="relative z-10 flex flex-col items-start">
              <span className="text-[14px] font-bold tracking-[0.15em] uppercase text-[#6B6B6B]">
                ABOUT ME
              </span>
              <h2 className="mt-2 font-extrabold text-[#0A0A0A] leading-[1.1] text-[clamp(2.5rem,6vw,4rem)]">
                Who I Am
              </h2>
            </motion.div>
          </div>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
            
            {/* Left Column: Avatar Card */}
            <motion.div variants={itemFadeUp} className="lg:col-span-6 relative w-[90%] max-w-[480px] lg:max-w-[520px] mx-auto">
              <div className="bg-[#0A0A0A] rounded-[40px] md:rounded-[48px] xl:rounded-[56px] aspect-square p-8 md:p-10 xl:p-12 relative">
                {/* Inner White Circle */}
                <div className="bg-white rounded-full w-full h-full flex flex-col items-center justify-center scale-[1.08] shadow-sm relative z-10">
                  <span className="text-[80px] md:text-[110px] xl:text-[130px] font-extrabold text-[#0A0A0A] leading-none">MS</span>
                  <span className="text-[#6B6B6B] font-medium text-[16px] md:text-[18px] mt-3 md:mt-4">Mohammed Sayeed S</span>
                </div>

                {/* Badges */}
                <InteractiveBadge 
                  icon={User}
                  ariaLabel="View more about me"
                  badgeType="nav"
                  idleDelay={0}
                  wrapperClass="top-0 right-0 translate-x-[30%] -translate-y-[20%]"
                  sizeClass="w-[64px] h-[64px] md:w-[72px] md:h-[72px]"
                  iconSize={28}
                  onClick={() => scrollToSection('about')}
                />
                <InteractiveBadge 
                  icon={Heart}
                  ariaLabel="Like this portfolio"
                  badgeType="toggle"
                  idleDelay={1}
                  wrapperClass="top-1/2 right-0 translate-x-[40%] -translate-y-1/2"
                  sizeClass="w-[56px] h-[56px] md:w-[64px] md:h-[64px]"
                  iconSize={24}
                />
                <InteractiveBadge 
                  icon={Briefcase}
                  ariaLabel="View my experience"
                  badgeType="nav"
                  idleDelay={2}
                  wrapperClass="bottom-0 left-0 -translate-x-[20%] translate-y-[20%]"
                  sizeClass="w-[56px] h-[56px] md:w-[64px] md:h-[64px]"
                  iconSize={24}
                  onClick={() => scrollToSection('experience')}
                />
              </div>
            </motion.div>

            {/* Right Column: Bio & Stats */}
            <div className="lg:col-span-6 flex flex-col">
              <motion.div variants={itemFadeUp} className="flex flex-col gap-6 text-[16px] md:text-[18px] text-[#4B4B4B] leading-[1.8]">
                {ABOUT_BIO.map((paragraph, pIndex) => (
                  <p key={pIndex}>
                    {paragraph.map((segment, sIndex) => (
                      segment.type === 'bold' 
                        ? <strong key={sIndex} className="font-bold text-[#0A0A0A]">{segment.value}</strong>
                        : <span key={sIndex}>{segment.value}</span>
                    ))}
                  </p>
                ))}
              </motion.div>

              <motion.div variants={itemFadeUp} className="mt-10 md:mt-12 flex flex-col sm:flex-row gap-8 sm:gap-12">
                {ABOUT_STATS.map((stat, i) => (
                  <div key={i} className="flex items-center gap-4" aria-label={`${stat.label}: ${stat.value}${stat.suffix}`}>
                    <div className="w-[2px] h-12 bg-[#0A0A0A]"></div>
                    <div className="flex flex-col" aria-hidden="true">
                      <div className="text-[32px] md:text-[36px] font-extrabold text-[#0A0A0A] leading-none flex items-center">
                        <Counter value={stat.value} isDecimal={stat.isDecimal} />
                        <span>{stat.suffix}</span>
                      </div>
                      <span className="text-[14px] text-[#6B6B6B] mt-2 font-medium tracking-wide">{stat.label}</span>
                    </div>
                  </div>
                ))}
              </motion.div>

            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
