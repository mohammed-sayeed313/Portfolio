import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Globe, Zap, TrendingUp, Target, Compass } from 'lucide-react';
import { visionData, missionData } from '../../data/visionData';

const iconMap = {
  Briefcase,
  Globe,
  Zap,
  TrendingUp,
  Target,
  Compass
};

export function Vision() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section className="relative w-full py-24 md:py-[120px] px-6 bg-[#0a0a0a] overflow-hidden" id="vision">
      {/* Subtle Glow/Spotlight Effect */}
      <div 
        className="pointer-events-none fixed inset-0 z-0 transition-opacity duration-300 opacity-20"
        style={{
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255,255,255,0.06), transparent 40%)`
        }}
      />

      {/* Dotted Pattern Background */}
      <div 
        className="absolute inset-0 pointer-events-none z-0 opacity-20"
        style={{
          backgroundImage: 'radial-gradient(circle at center, #ffffff 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}
      />

      <div className="max-w-[1200px] w-full mx-auto relative z-10 flex flex-col items-center">
        
        {/* Header Content */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center w-full mb-16"
        >
          {/* Pill Badge */}
          <div className="bg-[#1f1f1f] text-white text-[11px] font-bold uppercase tracking-[0.15em] px-4 py-1.5 rounded-full border border-white/10 mb-6">
            Leadership & Entrepreneurial Vision
          </div>

          {/* Heading */}
          <h2 className="text-4xl md:text-[64px] lg:text-[72px] font-extrabold text-white uppercase tracking-tighter leading-tight mb-8">
            Taqwa Leather Exports
          </h2>

          {/* Founder Concept Pill - Pulsing */}
          <motion.div 
            animate={{ scale: [1, 1.05, 1], opacity: [0.9, 1, 0.9] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="bg-white text-black font-bold px-5 py-2 rounded-full mb-8 shadow-[0_0_20px_rgba(255,255,255,0.2)]"
          >
            Founder Concept
          </motion.div>

          {/* Vision Statement */}
          <p className="text-[17px] md:text-[19px] text-blue-100/70 max-w-[700px] leading-relaxed relative">
            <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-indigo-300 to-purple-300 animate-shimmer inline-block bg-[length:200%_auto]">
              Vision: To build a technology-driven leather manufacturing and export company integrated with AI-powered quality analysis and production intelligence.
            </span>
          </p>
        </motion.div>

        {/* Feature Grid */}
        <div className="w-full grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {visionData.map((item, index) => {
            const Icon = iconMap[item.icon];
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative bg-[#141414] rounded-2xl p-8 flex flex-col items-center text-center border border-white/5 hover:border-white/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(255,255,255,0.05)] cursor-default overflow-hidden"
              >
                {/* Icon Badge */}
                <div className="w-14 h-14 bg-black rounded-2xl flex items-center justify-center shrink-0 mb-6 border border-white/10 group-hover:border-white/20 transition-colors">
                  <motion.div whileHover={{ rotate: 360 }} whileTap={{ rotate: 360 }} transition={{ duration: 0.6, ease: "easeInOut" }} className="text-white">
                    {Icon && <Icon size={24} aria-label={item.label} />}
                  </motion.div>
                </div>

                {/* Label Text */}
                <h3 className="text-white font-bold text-[15px] leading-snug">
                  {item.label}
                </h3>
              </motion.div>
            );
          })}
        </div>

        {/* Mission Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="group relative max-w-[1000px] w-full mx-auto mt-16 md:mt-20 rounded-2xl p-[1px] overflow-hidden shadow-[0_0_40px_rgba(255,255,255,0.03)]"
        >
          {/* Animated gradient border glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/5 via-blue-400/20 to-white/5 animate-shimmer bg-[length:200%_auto] z-0" />
          
          <div className="relative z-10 w-full bg-gradient-to-br from-[#141414] to-[#1a1a1a] rounded-[15px] py-12 px-6 sm:px-14 flex flex-col items-center text-center">
            {/* Mission Icon Badge */}
            <div className="w-14 h-14 bg-black rounded-2xl flex items-center justify-center shrink-0 mb-6 border border-white/10 group-hover:border-white/20 transition-colors">
              <motion.div whileHover={{ rotate: 360 }} whileTap={{ rotate: 360 }} transition={{ duration: 0.6, ease: "easeInOut" }} className="text-white">
                {iconMap[missionData.icon] ? React.createElement(iconMap[missionData.icon], { size: 24, "aria-label": "Mission Icon" }) : null}
              </motion.div>
            </div>
            
            <h3 className="text-white font-bold text-2xl md:text-[32px] mb-6">
              {missionData.title}
            </h3>
            
            <p className="text-[#a0a0a0] text-[16px] md:text-[17px] leading-[1.7] max-w-[750px]">
              {missionData.description}
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
