import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Building2, Calendar, MapPin } from 'lucide-react';
import { EXPERIENCE } from '../../data/experience';

const iconMap = {
  Building2: Building2
};

export function Experience() {
  const prefersReducedMotion = useReducedMotion();

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

  const iconTiltVariants = {
    rest: { rotate: 0, transition: { duration: 0.25, ease: "easeInOut" } },
    hover: prefersReducedMotion 
      ? { rotate: 0 } 
      : { rotate: -14, transition: { duration: 0.2, ease: "easeOut" } }
  };

  return (
    <section className="pt-[80px] md:pt-[120px] pb-24 px-6 relative w-full flex justify-center bg-background" id="experience">
      <div className="max-w-5xl w-full mx-auto relative">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {/* Top Label Block */}
          <div className="relative w-full mb-16 flex flex-col items-start md:items-start text-left">
            <span 
              className="absolute right-0 -top-8 md:-top-16 text-[72px] md:text-[120px] font-extrabold text-[#E5E5E5] leading-none select-none"
              aria-hidden="true"
            >
              04
            </span>
            <motion.div variants={itemFadeUp} className="relative z-10 flex flex-col items-start">
              <span className="text-[14px] font-bold tracking-[0.15em] uppercase text-[#6B6B6B]">
                PROFESSIONAL EXPERIENCE
              </span>
              <h2 className="mt-2 font-extrabold text-[#0A0A0A] leading-[1.1] text-[clamp(2.5rem,6vw,4rem)]">
                Industry Journey
              </h2>
            </motion.div>
          </div>

          {/* Timeline */}
          <div className="relative mt-16 w-full flex flex-col gap-12">
            {/* Vertical Line */}
            <div className="absolute left-[5.5px] md:left-[5.5px] top-6 bottom-0 w-[1px] bg-[#E0E0E0]" aria-hidden="true"></div>

            {EXPERIENCE.map((job, index) => {
              const CompanyIcon = iconMap[job.companyIcon] || Building2;
              return (
                <motion.div 
                  key={index}
                  variants={itemFadeUp}
                  className="relative w-full flex items-start"
                >
                  {/* Timeline Node */}
                  <div className="absolute left-0 mt-[44px] md:mt-[44px] w-[12px] h-[12px] bg-[#0A0A0A] rounded-full z-10" aria-hidden="true"></div>

                  {/* Experience Card */}
                  <div className="group ml-8 md:ml-12 w-full bg-[#F5F6F8] rounded-[20px] p-6 md:p-8 relative">
                    
                    {/* Header Row */}
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                      
                      {/* Left: Title & Company */}
                      <div className="flex flex-col">
                        <h3 className="text-[24px] md:text-[28px] font-extrabold text-[#0A0A0A] leading-[1.2]">
                          {job.title}
                        </h3>
                        <div className="mt-2 flex items-center gap-2 text-[16px] text-[#6B6B6B]">
                          <div className="inline-flex cursor-default origin-center">
                            <motion.div whileHover={{ rotate: 360 }} whileTap={{ rotate: 360 }} transition={{ duration: 0.6, ease: "easeInOut" }} className="text-[#6B6B6B]">
                              <CompanyIcon size={18} />
                            </motion.div>
                          </div>
                          <span>{job.company}</span>
                        </div>
                      </div>

                      {/* Right: Meta (Dates & Location) */}
                      <div className="flex flex-col md:items-end gap-3 shrink-0">
                        <div className="inline-flex items-center gap-2 bg-[#0A0A0A] text-white font-bold text-[13px] px-[16px] py-[8px] rounded-full w-fit">
                          <Calendar size={14} />
                          <span>{job.dateRange}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-[#6B6B6B] text-[14px]">
                          <MapPin size={14} />
                          <span>{job.location}</span>
                        </div>
                      </div>

                    </div>

                    {/* Bullets */}
                    <ul className="mt-8 md:mt-10 flex flex-col gap-5 md:gap-6 list-disc pl-5">
                      {job.bullets.map((bullet, bIndex) => (
                        <li key={bIndex} className="text-[16px] md:text-[17px] text-[#6B6B6B] leading-[1.8] pl-2 marker:text-[#A0A0A0]">
                          {bullet.segments.map((segment, sIndex) => (
                            segment.type === 'pill' ? (
                              <span 
                                key={sIndex}
                                className="inline-flex items-center justify-center align-middle whitespace-nowrap bg-[#0A0A0A] text-[#FFFFFF] font-bold text-[13px] md:text-[14px] px-[12px] py-[4px] md:py-[5px] rounded-full mx-[4px] my-[4px] cursor-default"
                              >
                                {segment.value}
                              </span>
                            ) : (
                              <span key={sIndex}>{segment.value}</span>
                            )
                          ))}
                        </li>
                      ))}
                    </ul>

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
