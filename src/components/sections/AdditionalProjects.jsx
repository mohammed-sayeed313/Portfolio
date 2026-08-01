import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ADDITIONAL_PROJECTS } from '../../data/additionalProjects';

export function AdditionalProjects() {
  const prefersReducedMotion = useReducedMotion();

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.06 }
    }
  };

  const cardFadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: "easeOut" } 
    }
  };

  return (
    <section className="pb-24 px-6 relative w-full flex justify-center bg-background" id="additional-projects">
      <div className="max-w-5xl w-full mx-auto relative">
        
        {/* Header */}
        <div className="mb-10 w-full text-left">
          <h3 className="font-extrabold text-[#0A0A0A] leading-[1.1] text-[clamp(1.75rem,4vw,2.5rem)]">
            Additional Projects
          </h3>
        </div>

        {/* Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {ADDITIONAL_PROJECTS.map((project, index) => (
            <motion.div 
              key={index}
              variants={cardFadeUp}
              whileHover={
                prefersReducedMotion 
                  ? { borderColor: "rgba(0,0,0,0.15)" } 
                  : { 
                      y: -3, 
                      boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
                      borderColor: "rgba(0,0,0,0.15)",
                      transition: { duration: 0.2, ease: "easeOut" }
                    }
              }
              className="bg-white rounded-[20px] p-8 border border-[rgba(0,0,0,0.08)] flex flex-col items-start transition-colors duration-200"
            >
              {/* Title */}
              <h4 className="text-[20px] font-extrabold text-[#0A0A0A] leading-[1.3]">
                {project.title}
              </h4>
              
              {/* Description */}
              <p className="mt-3 text-[15px] text-[#6B6B6B] leading-[1.6]">
                {project.description}
              </p>

              {/* Tags */}
              <div className="mt-auto pt-5 w-full flex flex-wrap gap-2">
                {project.tags.map((tag, tagIndex) => (
                  <motion.span 
                    key={tagIndex}
                    whileHover={
                      prefersReducedMotion 
                        ? { backgroundColor: "#2A2A2A" } 
                        : { scale: 1.05, backgroundColor: "#2A2A2A" }
                    }
                    transition={{ duration: 0.15, ease: "easeInOut" }}
                    className="bg-[#0A0A0A] text-white font-bold text-[13px] px-[14px] py-[7px] rounded-full cursor-default"
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
