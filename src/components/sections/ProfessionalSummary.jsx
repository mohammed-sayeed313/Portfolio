import React from 'react';
import { motion } from 'framer-motion';
import { SUMMARY_SEGMENTS } from '../../data/summary';

const HEADLINE_LINE_1 = "Building The Future";
const HEADLINE_LINE_2 = "With Intelligence";

export function ProfessionalSummary() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemFadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: "easeOut" } 
    }
  };

  return (
    <section className="pt-[80px] md:pt-[120px] pb-24 px-6 relative w-full flex justify-center bg-background" id="about">
      <div className="max-w-5xl w-full mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="flex flex-col items-start"
        >
          {/* 1. Section Label Block */}
          <motion.div variants={itemFadeUp} className="relative flex flex-col items-start">
            <span 
              className="text-[72px] md:text-[120px] font-extrabold text-[#E5E5E5] leading-none select-none"
              aria-hidden="true"
            >
              01
            </span>
            <span 
              className="text-[14px] font-bold tracking-[0.15em] uppercase text-[#6B6B6B] -mt-5 md:-mt-8 ml-2 md:ml-4 relative z-10"
            >
              PROFESSIONAL SUMMARY
            </span>
          </motion.div>

          {/* 2. Headline */}
          <motion.h2 
            variants={itemFadeUp}
            className="mt-6 md:mt-8 font-extrabold text-[#0A0A0A] leading-[1.15] max-w-[700px] text-[clamp(1.75rem,8vw,2.5rem)] md:text-[clamp(2.25rem,5vw,3.5rem)]"
          >
            <span className="block">{HEADLINE_LINE_1}</span>
            <span className="block">{HEADLINE_LINE_2}</span>
          </motion.h2>

          {/* 3. Body Paragraph */}
          <motion.div 
            variants={itemFadeUp}
            className="mt-8 max-w-[900px]"
          >
            <p className="text-[16px] md:text-[18px] text-[#4B4B4B] leading-[2.3]">
              {SUMMARY_SEGMENTS.map((segment, index) => {
                if (segment.type === 'pill') {
                  return (
                    <span 
                      key={index}
                      className="inline-flex items-center justify-center align-middle whitespace-nowrap bg-[#0A0A0A] text-[#FFFFFF] font-bold text-[13px] px-[12px] py-[5px] rounded-full mx-[4px] my-[8px] hover:bg-[#2A2A2A] hover:scale-105 transition-all duration-150 ease-in-out cursor-default"
                    >
                      {segment.value}
                    </span>
                  );
                }
                return (
                  <span key={index}>{segment.value}</span>
                );
              })}
            </p>
          </motion.div>
          
        </motion.div>
      </div>
    </section>
  );
}
