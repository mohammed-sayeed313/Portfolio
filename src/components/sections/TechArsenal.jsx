import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Code2, Brain, Globe, Wrench, Package, Database } from 'lucide-react';
import { TECH_ARSENAL } from '../../data/techArsenal';

const iconMap = {
  Code2,
  Brain,
  Globe,
  Wrench,
  Package,
  Database
};

export function TechArsenal() {
  const prefersReducedMotion = useReducedMotion();

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.08 }
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

  const cardFadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.5, ease: "easeOut" } 
    }
  };

  const iconSpinVariants = {
    rest: { rotate: 0, transition: { duration: 0.25, ease: "easeInOut" } },
    hover: prefersReducedMotion 
      ? { rotate: 0 } 
      : { rotate: 360, transition: { duration: 1.8, ease: "linear", repeat: Infinity } }
  };

  return (
    <section className="pt-[80px] md:pt-[120px] pb-24 px-6 relative w-full flex justify-center bg-[#FAFAFA]" id="skills">
      <div className="max-w-5xl w-full mx-auto relative">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {/* Top Label Block */}
          <div className="relative w-full mb-16 flex flex-col items-center text-center">
            <span 
              className="absolute left-0 -top-8 md:-top-16 text-[72px] md:text-[120px] font-extrabold text-[#E5E5E5] leading-none select-none"
              aria-hidden="true"
            >
              03
            </span>
            <motion.div variants={itemFadeUp} className="relative z-10 flex flex-col items-center">
              <span className="text-[14px] font-bold tracking-[0.15em] uppercase text-[#6B6B6B]">
                TECHNICAL EXPERTISE
              </span>
              <h2 className="mt-2 font-extrabold text-[#0A0A0A] leading-[1.1] text-[clamp(2.5rem,6vw,4rem)]">
                My Tech Arsenal
              </h2>
              <p className="mt-4 text-[16px] md:text-[18px] text-[#6B6B6B] max-w-[700px] mx-auto">
                A comprehensive toolkit spanning AI, ML, full-stack development, and data science
              </p>
            </motion.div>
          </div>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
            {TECH_ARSENAL.map((skill, index) => {
              const Icon = iconMap[skill.icon];
              return (
                <motion.div 
                  key={index}
                  variants={cardFadeUp}
                  whileHover={
                    prefersReducedMotion 
                      ? { boxShadow: "0 12px 32px rgba(0,0,0,0.1)" } 
                      : { y: -4, boxShadow: "0 12px 32px rgba(0,0,0,0.1)", transition: { duration: 0.2, ease: "easeOut" } }
                  }
                  className="group bg-white rounded-[20px] p-8 shadow-[0_4px_24px_rgba(0,0,0,0.06)] border border-[rgba(0,0,0,0.04)] flex flex-col"
                >
                  {/* Icon Badge */}
                  <div 
                    className="w-16 h-16 bg-[#0A0A0A] rounded-2xl flex items-center justify-center text-white origin-center"
                    aria-hidden="true"
                  >
                    <motion.div whileHover={{ rotate: 360 }} whileTap={{ rotate: 360 }} transition={{ duration: 0.6, ease: "easeInOut" }} className="text-white">
                      <Icon size={28} />
                    </motion.div>
                  </div>

                  {/* Card Title */}
                  <h3 className="mt-5 text-[22px] font-extrabold text-[#0A0A0A]">
                    {skill.title}
                  </h3>

                  {/* Tag Pills */}
                  <div className="mt-4 flex flex-wrap gap-[10px]">
                    {skill.tags.map((tag, tagIndex) => (
                      <motion.span 
                        key={tagIndex}
                        whileHover={
                          prefersReducedMotion 
                            ? { backgroundColor: "#2A2A2A" } 
                            : { scale: 1.05, backgroundColor: "#2A2A2A" }
                        }
                        transition={{ duration: 0.15, ease: "easeInOut" }}
                        className="bg-[#0A0A0A] text-[#FFFFFF] font-bold text-[13px] px-4 py-2 rounded-full cursor-default"
                      >
                        {tag}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
