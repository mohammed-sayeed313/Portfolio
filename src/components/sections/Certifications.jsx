import React from 'react';
import { CERTIFICATIONS } from '../../data/certifications';
import { CertificationCard } from '../ui/CertificationCard';

const GRADIENTS = [
  "from-blue-50 to-indigo-50",
  "from-rose-50 to-pink-50",
  "from-emerald-50 to-teal-50",
  "from-amber-50 to-yellow-50",
  "from-red-50 to-rose-50",
  "from-sky-50 to-cyan-50",
];

export function Certifications() {
  return (
    <section className="py-24 px-6 relative w-full flex justify-center bg-white" id="certifications">
      <div className="max-w-[1200px] w-full mx-auto relative flex flex-col">
        
        {/* Section Header */}
        <div className="relative w-full flex flex-col items-center text-center mb-16 md:mb-24">
          <span className="absolute left-0 -top-6 md:-top-10 text-8xl md:text-[140px] font-light text-gray-100 leading-none select-none -z-10">
            06
          </span>
          <span className="tracking-widest text-sm text-gray-500 uppercase font-bold mb-4">
            CERTIFICATIONS
          </span>
          <h2 className="text-5xl md:text-6xl font-extrabold text-black leading-tight mb-4">
            Professional Credentials
          </h2>
          <p className="text-gray-500 text-lg max-w-[600px] mx-auto">
            Industry-recognized certifications spanning AI, ML, data analytics, and full-stack development
          </p>
        </div>
        
        {/* Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CERTIFICATIONS.map((cert, index) => (
            <CertificationCard 
              key={index}
              title={cert.title}
              issuer={cert.issuer}
              credentialId={cert.credentialId}
              dateRange={cert.dateRange}
              duration={cert.duration}
              isoCertified={cert.isoCertified}
              gradientClass={GRADIENTS[index % GRADIENTS.length]}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
