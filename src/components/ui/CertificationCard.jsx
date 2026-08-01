import React, { useState } from 'react';
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion';
import { Award, FileCheck2, Calendar } from 'lucide-react';

export function CertificationCard({
  title,
  issuer,
  credentialId,
  dateRange,
  duration,
  isoCertified,
  gradientClass
}) {
  const [isHovered, setIsHovered] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const FrontFace = (
    <div className={`w-full h-full bg-gradient-to-br ${gradientClass} rounded-2xl p-8 flex flex-col`}>
      <div className="w-14 h-14 bg-black rounded-xl flex items-center justify-center shrink-0 mb-6">
        <Award className="text-white" size={28} />
      </div>
      
      <h3 className="text-xl font-bold text-black leading-tight mb-2">
        {title}
      </h3>
      
      <p className="text-gray-500 text-sm mb-6">
        {issuer}
      </p>
      
      <div className="flex-grow"></div>
      
      <div className="flex flex-col gap-3">
        {dateRange && (
          <div className="flex items-center gap-2 text-gray-500 text-xs font-medium">
            <Calendar size={14} />
            <span>{dateRange}</span>
          </div>
        )}
        
        <div className="flex justify-between items-end w-full">
          <div className="min-h-[24px]">
            {isoCertified && (
              <span className="bg-gray-100 rounded-full px-3 py-1 text-xs font-semibold text-gray-700 whitespace-nowrap">
                ISO 9001:2015 Certified
              </span>
            )}
          </div>
          <span className="text-[10px] italic text-gray-400 text-right whitespace-nowrap ml-2">
            Hover to view details
          </span>
        </div>
      </div>
    </div>
  );

  const BackFace = (
    <div className="w-full h-full bg-black rounded-2xl p-8 flex flex-col shadow-2xl">
      <div className="flex items-center gap-2 mb-6">
        <FileCheck2 className="text-white" size={18} />
        <span className="tracking-wide text-xs font-bold text-white uppercase">
          CREDENTIAL DETAILS
        </span>
      </div>
      
      <h3 className="text-xl font-bold text-white leading-tight mb-6">
        {title}
      </h3>
      
      <div className="flex flex-col gap-4">
        <div>
          <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-1">
            Issuing Authority
          </p>
          <p className="font-bold text-white text-sm">
            {issuer}
          </p>
        </div>
        
        <div>
          <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-1">
            Credential ID
          </p>
          <div className="bg-neutral-800 rounded-lg px-4 py-2 inline-block">
            <span className="font-mono font-bold text-white text-sm">
              {credentialId}
            </span>
          </div>
        </div>
        
        <div>
          <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-1">
            Completed
          </p>
          {dateRange && (
            <p className="font-bold text-white text-sm mb-0.5">
              {dateRange}
            </p>
          )}
          <p className="text-xs text-gray-400">
            {duration}
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div 
      className="relative w-full h-[360px] md:h-[380px] [perspective:1200px]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
      onTouchStart={() => setIsHovered(!isHovered)}
      tabIndex={0}
      aria-label={`Certification: ${title} by ${issuer}`}
      style={{ zIndex: isHovered ? 20 : 1 }}
    >
      {prefersReducedMotion ? (
        <AnimatePresence mode="wait">
          {!isHovered ? (
            <motion.div
              key="front"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="absolute inset-0"
            >
              {FrontFace}
            </motion.div>
          ) : (
            <motion.div
              key="back"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="absolute inset-0"
            >
              {BackFace}
            </motion.div>
          )}
        </AnimatePresence>
      ) : (
        <motion.div
          className="relative w-full h-full [transform-style:preserve-3d] will-change-transform"
          animate={{ 
            rotateY: isHovered ? 180 : 0,
            scale: isHovered ? [1, 1.05, 1] : [1, 1.05, 1],
            boxShadow: isHovered 
              ? ["0px 4px 6px -1px rgba(0,0,0,0.1)", "0px 25px 50px -12px rgba(0,0,0,0.5)", "0px 4px 6px -1px rgba(0,0,0,0.1)"]
              : ["0px 4px 6px -1px rgba(0,0,0,0.1)", "0px 25px 50px -12px rgba(0,0,0,0.5)", "0px 4px 6px -1px rgba(0,0,0,0.1)"]
          }}
          transition={{ duration: 0.75, ease: "easeInOut" }}
        >
          <div className="absolute inset-0 [backface-visibility:hidden]">
            {FrontFace}
          </div>
          <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)]">
            {BackFace}
          </div>
        </motion.div>
      )}
    </div>
  );
}
