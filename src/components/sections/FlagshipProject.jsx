import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Sparkles, Eye, Brain, Ruler, Link, Wifi, TrendingUp, Droplet, Wrench, Globe, Database } from 'lucide-react';
import { LEATHER_AI_FEATURES } from '../../data/leatherAiFeatures';
import { MagneticElement } from '../ui/MagneticElement';
import { TechStack } from './TechStack';
import { SOCIAL_LINKS } from '../../data/socialLinks';

const iconMap = {
  Sparkles, 
  Eye, 
  Brain, 
  Ruler, 
  Link, 
  Wifi, 
  TrendingUp, 
  Droplet, 
  Wrench, 
  Globe, 
  Database
};

export function FlagshipProject() {
  const prefersReducedMotion = useReducedMotion();

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.05 }
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

  const iconTiltVariants = {
    rest: { rotate: 0, transition: { duration: 0.25, ease: "easeInOut" } },
    hover: prefersReducedMotion 
      ? { rotate: 0 } 
      : { rotate: -14, transition: { duration: 0.2, ease: "easeOut" } }
  };

  return (
    <section 
      className="py-[64px] md:py-[100px] px-6 relative w-full flex justify-center bg-[#0A0A0A]"
      id="flagship"
      style={{
        background: 'radial-gradient(circle at center, #0A0A0A 0%, #050505 100%)'
      }}
    >
      <div className="max-w-6xl w-full mx-auto relative flex flex-col items-center">
        
        {/* Part A: Hero Block */}
        <motion.div
          variants={itemFadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="flex flex-col items-center text-center w-full"
        >
          {/* Badge */}
          <div className="bg-[#1A1A1A] border border-[rgba(255,255,255,0.1)] text-[#FFFFFF] font-extrabold text-[13px] tracking-[0.1em] uppercase px-[24px] py-[10px] rounded-full select-none cursor-default">
            FLAGSHIP STARTUP PROJECT
          </div>

          {/* Headline */}
          <h2 className="mt-8 text-[clamp(2.5rem,6vw,4.5rem)] font-extrabold text-[#FFFFFF] leading-[1.15] max-w-[1100px]">
            Leather AI Manufacturing Intelligence Platform
          </h2>

          {/* Subtitle */}
          <p className="mt-8 text-[18px] text-[rgba(255,255,255,0.7)] leading-[1.7] max-w-[800px]">
            An AI-powered intelligent platform for leather manufacturing industries automating quality inspection, defect detection, traceability, production intelligence, and ERP integration.
          </p>

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-row items-center justify-center gap-4 flex-wrap">
            <MagneticElement>
              <a 
                href="#"
                className="bg-[#FFFFFF] text-[#0A0A0A] font-bold px-[32px] py-[16px] rounded-full transition-colors duration-200 hover:bg-[#F0F0F0] inline-block"
              >
                View Live Demo
              </a>
            </MagneticElement>
            
            <MagneticElement>
              <a 
                href={SOCIAL_LINKS.github}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-transparent border-[2px] border-[#FFFFFF] text-[#FFFFFF] font-bold px-[32px] py-[16px] rounded-full transition-colors duration-200 hover:bg-[#FFFFFF] hover:text-[#0A0A0A] inline-block"
              >
                View on GitHub
              </a>
            </MagneticElement>
          </div>
        </motion.div>

        {/* Part B: Feature Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="mt-16 w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {LEATHER_AI_FEATURES.map((feature, index) => {
            const Icon = iconMap[feature.icon];
            return (
              <motion.div 
                key={index}
                variants={itemFadeUp}
                initial="rest"
                whileHover="hover"
                animate="rest"
                className="group bg-[#141414] border border-[rgba(255,255,255,0.06)] rounded-[16px] p-7 flex flex-col items-start transition-colors duration-200 hover:border-[rgba(255,255,255,0.2)]"
              >
                {/* Icon Badge */}
                <div 
                  className="w-[48px] h-[48px] bg-[#1F1F1F] rounded-[12px] flex items-center justify-center text-white origin-center"
                  aria-hidden="true"
                >
                  <motion.div whileHover={{ rotate: 360 }} whileTap={{ rotate: 360 }} transition={{ duration: 0.6, ease: "easeInOut" }} className="text-white">
                    <Icon size={20} />
                  </motion.div>
                </div>

                {/* Title */}
                <h3 className="mt-4 text-[16px] font-bold text-[#FFFFFF]">
                  {feature.title}
                </h3>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Part C: Tech Stack Sub-Header */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-20 flex justify-center w-full"
        >
          <span className="text-[14px] font-bold tracking-[0.2em] uppercase text-[rgba(255,255,255,0.4)]">
            TECH STACK
          </span>
        </motion.div>

        {/* Part D: Tech Stack Pills */}
        <TechStack />
        
      </div>
    </section>
  );
}
