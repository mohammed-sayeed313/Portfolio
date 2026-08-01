import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Cpu, Shield, BarChart3 } from 'lucide-react';
import { PROJECTS } from '../../data/projects';

const iconMap = {
  Cpu,
  Shield,
  BarChart3
};

export function Projects() {
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
    <section className="pt-[80px] md:pt-[120px] pb-24 px-6 relative w-full flex justify-center bg-background" id="projects">
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
              05
            </span>
            <motion.div variants={itemFadeUp} className="relative z-10 flex flex-col items-center">
              <span className="text-[14px] font-bold tracking-[0.15em] uppercase text-[#6B6B6B]">
                KEY ENGINEERING PROJECTS
              </span>
              <h2 className="mt-2 font-extrabold text-[#0A0A0A] leading-[1.1] text-[clamp(2.5rem,6vw,4rem)]">
                Featured Work
              </h2>
              <p className="mt-4 text-[16px] md:text-[18px] text-[#6B6B6B] max-w-[700px] mx-auto">
                Building intelligent solutions that bridge AI, blockchain, and real-world applications
              </p>
            </motion.div>
          </div>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-16 relative z-10">
            {PROJECTS.map((project, index) => {
              const Icon = iconMap[project.icon];
              return (
                <motion.div 
                  key={index}
                  variants={itemFadeUp}
                  className="group relative rounded-[24px] p-8 md:p-10 shadow-[0_4px_24px_rgba(0,0,0,0.04)] flex flex-col items-start"
                  style={{
                    background: `linear-gradient(135deg, ${project.gradientFrom}, ${project.gradientTo})`
                  }}
                >
                  {/* Icon Badge */}
                  <div className="w-16 h-16 bg-[#0A0A0A] rounded-2xl flex items-center justify-center text-white cursor-default origin-center" aria-hidden="true">
                    <motion.div whileHover={{ rotate: 360 }} whileTap={{ rotate: 360 }} transition={{ duration: 0.6, ease: "easeInOut" }} className="text-white">
                      <Icon size={28} />
                    </motion.div>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="mt-8 text-[24px] md:text-[26px] font-extrabold text-[#0A0A0A] leading-[1.2]">
                    {project.title}
                  </h3>
                  <span className="mt-1 text-[14px] text-[#6B6B6B] font-medium">
                    {project.subtitle}
                  </span>

                  {/* Description */}
                  <p className="mt-4 text-[16px] text-[#3A3A3A] leading-[1.6]">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="mt-auto pt-8 w-full flex flex-wrap gap-2.5">
                    {project.tags.map((tag, tagIndex) => (
                      <span 
                        key={tagIndex}
                        className="bg-transparent border-[1.5px] border-[rgba(0,0,0,0.15)] text-[#0A0A0A] font-bold text-[13px] px-[16px] py-[8px] rounded-full cursor-default hover:bg-[rgba(0,0,0,0.04)] transition-colors duration-200"
                      >
                        {tag}
                      </span>
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
