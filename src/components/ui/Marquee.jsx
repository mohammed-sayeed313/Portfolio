import React from 'react';

export const Marquee = () => {
  const skills = [
    "AI", "ML", "Full-Stack", "Computer Vision", "Blockchain", "Innovation", 
    "Machine Learning", "FastAPI", "React.js", "Data Science"
  ];
  
  // Add a trailing bullet with spaces so the end of this string 
  // joins perfectly with the beginning of the next string.
  const contentString = skills.join(" • ") + " • ";

  return (
    <div className="w-screen max-w-none relative left-1/2 -translate-x-1/2 bg-[#0A0A0A] h-[56px] md:h-[64px] overflow-hidden flex items-center">
      <div 
        className="w-max flex whitespace-nowrap text-white font-bold text-[16px] md:text-[20px] uppercase tracking-wider animate-marquee hover:[animation-play-state:paused] motion-reduce:animate-none"
      >
        {/* We use inline-block or just text content. Let's just output it in a span with a slight padding if we want, but the spaces in the string itself do the job. */}
        <span>{contentString}</span>
        {/* The duplicate is hidden from screen readers */}
        <span aria-hidden="true">{contentString}</span>
      </div>
    </div>
  );
};
