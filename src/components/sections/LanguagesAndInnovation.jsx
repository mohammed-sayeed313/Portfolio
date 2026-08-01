import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquareText, Target } from 'lucide-react';
import { languagesData } from '../../data/languagesData';
import { innovationData } from '../../data/innovationData';

export function LanguagesAndInnovation() {
  return (
    <section className="relative w-full py-24 px-6 flex justify-center bg-white overflow-hidden" id="innovation">
      {/* Animated gradient mesh/noise texture background */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-40">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-50/40 via-gray-50/10 to-transparent" />
        <div 
          className="absolute inset-0 opacity-[0.02]" 
          style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}
        />
      </div>

      <div className="max-w-[1200px] w-full mx-auto relative flex flex-col z-10">
        
        {/* Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          
          {/* Card 1: Languages */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="group relative bg-white rounded-2xl p-10 shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-gray-100 flex flex-col h-full overflow-hidden"
          >
            {/* Animated hover border glow */}
            <div className="absolute inset-0 z-0 bg-gradient-to-br from-blue-500/0 via-purple-500/0 to-blue-500/0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none" />
            <div className="absolute inset-0 z-0 rounded-2xl border-2 border-transparent group-hover:border-blue-500/20 transition-colors duration-500 pointer-events-none" />

            {/* Header */}
            <div className="relative z-10 flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center shrink-0">
                <motion.div whileHover={{ rotate: 360 }} whileTap={{ rotate: 360 }} transition={{ duration: 0.6, ease: "easeInOut" }} className="text-white">
                  <MessageSquareText size={24} aria-label="Languages Icon" />
                </motion.div>
              </div>
              <h3 className="text-2xl font-bold text-black tracking-tight">Languages</h3>
            </div>

            {/* Language List */}
            <div className="relative z-10 flex flex-col gap-4 flex-1 justify-center">
              {languagesData.map((lang, idx) => (
                <div key={idx} className="bg-[#f5f5f7] rounded-xl p-4 flex flex-col overflow-hidden">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-bold text-black text-[15px]">{lang.name}</span>
                    <span className="bg-black text-white text-[11px] font-bold px-3 py-1 rounded-full">
                      {lang.level}
                    </span>
                  </div>
                  
                  {/* Proficiency Bar Background */}
                  <div className="w-full h-[6px] bg-gray-200 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-gradient-to-r from-gray-700 to-black rounded-full"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${lang.proficiency}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.2 + idx * 0.1, ease: "easeOut" }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Card 2: Innovation Concepts */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="group relative bg-white rounded-2xl p-10 shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-gray-100 flex flex-col h-full overflow-hidden"
          >
            {/* Animated hover border glow */}
            <div className="absolute inset-0 z-0 bg-gradient-to-br from-blue-500/0 via-purple-500/0 to-blue-500/0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none" />
            <div className="absolute inset-0 z-0 rounded-2xl border-2 border-transparent group-hover:border-blue-500/20 transition-colors duration-500 pointer-events-none" />

            {/* Header */}
            <div className="relative z-10 flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center shrink-0">
                <motion.div whileHover={{ rotate: 360 }} whileTap={{ rotate: 360 }} transition={{ duration: 0.6, ease: "easeInOut" }} className="text-white">
                  <Target size={24} aria-label="Innovation Icon" />
                </motion.div>
              </div>
              <h3 className="text-2xl font-bold text-black tracking-tight">{innovationData.title}</h3>
            </div>

            <p className="relative z-10 text-gray-500 text-sm font-medium mb-6">
              {innovationData.subtitle}
            </p>

            {/* Bulleted List */}
            <ul className="relative z-10 space-y-4 mb-8 flex-1">
              {innovationData.projects.map((project, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-black shrink-0 mt-1.5" />
                  <span className="text-gray-700 font-medium text-[15px] leading-relaxed">
                    {project}
                  </span>
                </li>
              ))}
            </ul>

            {/* Interests Section */}
            <div className="relative z-10 mt-auto pt-6 border-t border-gray-100/50">
              <div className="flex items-center gap-2 mb-4">
                <motion.span 
                  className="w-2 h-2 rounded-full bg-black"
                  animate={{ opacity: [1, 0.3, 1], scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />
                <h4 className="text-[11px] font-bold text-gray-500 tracking-[0.15em] uppercase">
                  {innovationData.interestsLabel}
                </h4>
              </div>

              <div className="flex flex-wrap gap-2">
                {innovationData.interests.map((interest, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.4 + idx * 0.05 }}
                    className="px-4 py-2 rounded-full border border-gray-200 bg-white text-[12px] font-bold text-gray-700 cursor-default hover:bg-black hover:text-white hover:border-black transition-all duration-200"
                  >
                    {interest}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
