import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Award, Medal } from 'lucide-react';
import { ACHIEVEMENTS } from '../../data/achievements';

const iconMap = {
  Trophy: Trophy,
  Award: Award,
  Medal: Medal
};

export function Achievements() {
  return (
    <section className="py-24 px-6 relative w-full flex justify-center bg-[#FAFAFA] overflow-hidden" id="achievements">
      {/* 07 Watermark */}
      <div className="absolute right-0 md:right-12 top-0 md:top-12 pointer-events-none select-none -z-10">
        <span className="text-[140px] md:text-[220px] font-semibold text-gray-200/50 leading-none">
          07
        </span>
      </div>

      <div className="max-w-[1200px] w-full mx-auto relative flex flex-col z-10">
        {/* Section Header */}
        <div className="relative w-full flex flex-col items-center text-center mb-16 md:mb-20">
          <span className="tracking-[0.2em] text-xs text-gray-400 uppercase font-extrabold mb-4">
            ACHIEVEMENTS & EXTRA-CURRICULARS
          </span>
          <h2 className="text-5xl md:text-[56px] font-extrabold text-black leading-tight mb-4 tracking-tight">
            Beyond The Code
          </h2>
          <p className="text-gray-400 text-[15px] md:text-base max-w-[600px] mx-auto font-medium">
            Recognition, skills, and contributions beyond technical expertise
          </p>
        </div>
        
        {/* Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {ACHIEVEMENTS.map((item, index) => {
            const Icon = iconMap[item.icon];
            return (
              <motion.div 
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className={`relative w-full h-full rounded-[20px] bg-gradient-to-br ${item.gradientClass} p-8 md:p-10 flex flex-col border border-white/50 shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_30px_rgba(0,0,0,0.06)] transition-shadow duration-200 overflow-hidden group`}
              >
                {/* Internal Watermark */}
                <div className="absolute right-6 top-6 pointer-events-none select-none z-0">
                  <span className="text-7xl md:text-8xl font-black text-black/[0.04] tracking-tighter">
                    {item.id}
                  </span>
                </div>

                <div className="relative z-10 h-full flex flex-col">
                  {/* Icon */}
                  <div className="w-[52px] h-[52px] bg-black rounded-xl flex items-center justify-center shrink-0 mb-8">
                    <motion.div whileHover={{ rotate: 360 }} whileTap={{ rotate: 360 }} transition={{ duration: 0.6, ease: "easeInOut" }} className="text-white">
                      {Icon && <Icon size={24} aria-hidden="true" />}
                    </motion.div>
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-[22px] md:text-2xl font-extrabold text-black leading-snug mb-3 pr-8">
                    {item.title}
                  </h3>
                  
                  <p className="text-gray-700 font-semibold text-[13px] md:text-sm mb-3">
                    {item.subtitle}
                  </p>
                  
                  <p className="text-gray-500 text-[13px] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  );
}
