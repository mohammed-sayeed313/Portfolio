import React, { useRef, useEffect } from 'react';
import { motion, useInView, animate } from 'framer-motion';
import { GraduationCap, Building2, Calendar } from 'lucide-react';
import { educationData } from '../../data/educationData';

const AnimatedNumber = ({ value, decimals = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView && ref.current) {
      const controls = animate(0, value, {
        duration: 2,
        ease: "easeOut",
        onUpdate(v) {
          if (ref.current) {
            ref.current.textContent = decimals > 0 ? v.toFixed(decimals) : Math.round(v);
          }
        }
      });
      return () => controls.stop();
    }
  }, [isInView, value, decimals]);

  return <span ref={ref}>0{decimals > 0 ? '.' + '0'.repeat(decimals) : ''}</span>;
};

const CircleProgress = ({ value, max = 10, size = 40, strokeWidth = 4, color = "white", trackColor = "rgba(255,255,255,0.2)" }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  
  return (
    <div style={{ width: size, height: size }} className="relative flex items-center justify-center shrink-0">
      <svg width={size} height={size} className="transform -rotate-90">
        <circle 
          cx={size/2} cy={size/2} r={radius} 
          fill="none" 
          stroke={trackColor} 
          strokeWidth={strokeWidth} 
        />
        <motion.circle 
          cx={size/2} cy={size/2} r={radius} 
          fill="none" 
          stroke={color} 
          strokeWidth={strokeWidth} 
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          whileInView={{ strokeDashoffset: circumference - (value / max) * circumference }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 2, ease: "easeOut" }}
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
};

export function Education() {
  return (
    <section className="relative w-full py-24 md:py-[100px] px-6 flex justify-center bg-white overflow-hidden" id="education">
      {/* 08 Watermark - Top Left */}
      <div className="absolute left-[-20px] md:left-12 top-0 pointer-events-none select-none z-0">
        <span className="text-[140px] md:text-[220px] font-semibold text-gray-200/40 leading-none">
          08
        </span>
      </div>

      <div className="max-w-[1000px] w-full mx-auto relative flex flex-col z-10">
        {/* Section Header */}
        <div className="relative w-full flex flex-col items-center text-center mb-16">
          <span className="tracking-[0.2em] text-xs text-gray-400 uppercase font-extrabold mb-4">
            EDUCATION
          </span>
          <h2 className="text-5xl md:text-[56px] font-extrabold text-black leading-tight mb-4 tracking-tight">
            Academic Journey
          </h2>
          <p className="text-gray-500 text-[15px] md:text-base max-w-[600px] mx-auto font-medium">
            Building a strong foundation in computer science and engineering
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative w-full flex flex-col gap-6">
          {/* Vertical Connecting Line */}
          <div className="absolute left-[36px] md:left-[56px] top-[40px] bottom-[40px] w-[2px] bg-gray-200 hidden md:block z-0" />

          {educationData.map((item, index) => {
            const isCurrent = item.isCurrent;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className={`group relative w-full rounded-2xl p-6 md:p-8 flex flex-col md:flex-row gap-6 items-start md:items-center shadow-[0_4px_24px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_30px_rgba(0,0,0,0.08)] transition-shadow duration-300 z-10 ${
                  isCurrent 
                    ? "bg-gradient-to-br from-[#111] to-[#1a1a24] text-white border border-white/10" 
                    : "bg-gradient-to-br from-white to-gray-50 text-black border border-gray-100"
                }`}
              >
                {/* Timeline Dot (Desktop) */}
                <div className={`absolute left-[56px] top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-[3px] z-20 hidden md:block transform -translate-x-[7px] ${
                  isCurrent ? "bg-white border-[#111]" : "bg-black border-white"
                }`} />

                {/* Current Badge */}
                {isCurrent && (
                  <div className="absolute top-4 right-4 md:top-6 md:right-6 bg-white text-black text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                    Current
                  </div>
                )}

                {/* Icon */}
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${
                  isCurrent ? "bg-white text-black" : "bg-black text-white"
                }`}>
                  <motion.div whileHover={{ rotate: 360 }} whileTap={{ rotate: 360 }} transition={{ duration: 0.6, ease: "easeInOut" }}>
                    {isCurrent ? <GraduationCap size={28} /> : <Building2 size={28} />}
                  </motion.div>
                </div>

                {/* Main Content */}
                <div className="flex-1 flex flex-col">
                  <h3 className={`text-[20px] md:text-2xl font-bold leading-tight mb-2 ${isCurrent ? 'text-white' : 'text-black'} ${isCurrent ? 'pr-16 md:pr-0' : ''}`}>
                    {item.degree}
                  </h3>
                  <p className={`font-medium mb-1 ${isCurrent ? 'text-gray-300' : 'text-gray-700'}`}>
                    {item.institution}
                  </p>
                  <p className={`text-sm ${isCurrent ? 'text-gray-400' : 'text-gray-500'}`}>
                    {item.location}
                  </p>
                </div>

                {/* Right Side: Date & Score */}
                <div className="flex flex-col items-start md:items-end w-full md:w-auto mt-2 md:mt-0 gap-4">
                  
                  {/* Date Pill - BUG FIX: Ensure text is always visible by explicitly setting text color based on pill background */}
                  <div className={`flex items-center gap-2 px-4 py-1.5 rounded-full font-bold text-sm ${
                    isCurrent ? "bg-white text-black" : "bg-black text-white"
                  }`}>
                    <Calendar size={14} />
                    <span>{item.duration}</span>
                  </div>

                  {/* Score */}
                  <div className="flex items-center gap-3">
                    {isCurrent && item.scoreLabel === "CGPA" && (
                      <CircleProgress value={item.scoreValue} max={10} color="#fff" trackColor="rgba(255,255,255,0.15)" />
                    )}
                    <div className="flex items-baseline gap-1.5">
                      <span className={`text-[15px] font-bold ${isCurrent ? 'text-gray-300' : 'text-gray-600'}`}>
                        {item.scoreLabel}:
                      </span>
                      <span className={`text-3xl font-extrabold tracking-tight ${isCurrent ? 'text-white' : 'text-black'}`}>
                        <AnimatedNumber 
                          value={item.scoreValue} 
                          decimals={item.scoreLabel === "CGPA" ? 2 : (item.scoreValue % 1 !== 0 ? 1 : 0)} 
                        />
                        {item.scoreLabel === "Score" && "%"}
                      </span>
                    </div>
                  </div>
                </div>

              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
