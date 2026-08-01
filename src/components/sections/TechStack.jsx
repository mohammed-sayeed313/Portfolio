import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { LEATHER_AI_TECH_STACK } from '../../data/leatherAiTechStack';

export function TechStack() {
  const prefersReducedMotion = useReducedMotion();

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.06
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: prefersReducedMotion ? 1 : 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.4, ease: "easeOut" } 
    }
  };

  const hoverVariants = prefersReducedMotion ? {
    rest: {
      backgroundColor: "#FFFFFF",
      color: "#0A0A0A",
      borderColor: "rgba(255,255,255,0)",
    },
    hover: {
      backgroundColor: "#0A0A0A",
      color: "#FFFFFF",
      borderColor: "rgba(255,255,255,1)",
      transition: { duration: 0.15 }
    }
  } : {
    rest: {
      backgroundColor: "#FFFFFF",
      color: "#0A0A0A",
      borderColor: "rgba(255,255,255,0)",
      scale: 1,
      y: 0,
      boxShadow: "0 0 0px rgba(255,255,255,0)",
      transition: { duration: 0.25, ease: "easeOut" }
    },
    hover: {
      backgroundColor: "#0A0A0A",
      color: "#FFFFFF",
      borderColor: "rgba(255,255,255,1)",
      scale: 1.08,
      y: -3,
      boxShadow: "0 0 20px rgba(255,255,255,0.15)",
      transition: { 
        duration: 0.25, 
        ease: "easeOut",
        scale: { type: "spring", stiffness: 300, damping: 15 },
        y: { type: "spring", stiffness: 300, damping: 15 }
      }
    }
  };

  return (
    <motion.div 
      className="mt-[24px] flex flex-row flex-wrap justify-center gap-[12px] max-w-[800px] mx-auto w-full"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
    >
      {LEATHER_AI_TECH_STACK.map((tech, index) => (
        <motion.div key={index} variants={itemVariants}>
          <motion.div
            initial="rest"
            whileHover="hover"
            animate="rest"
            variants={hoverVariants}
            className="px-[18px] py-[10px] md:px-[24px] md:py-[12px] text-[14px] md:text-[15px] font-bold rounded-full border-[1.5px] border-transparent cursor-default select-none whitespace-nowrap"
          >
            {tech}
          </motion.div>
        </motion.div>
      ))}
    </motion.div>
  );
}
