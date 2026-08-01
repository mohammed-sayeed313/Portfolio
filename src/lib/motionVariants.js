// Common Framer Motion variants and easings for the portfolio

export const springSmooth = { type: "spring", stiffness: 120, damping: 14 };
export const springBouncy = { type: "spring", stiffness: 200, damping: 10 };

export const fadeUpVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: springSmooth
  }
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

export const blurUpVariant = {
  hidden: { filter: "blur(10px)", opacity: 0, y: 40 },
  visible: { 
    filter: "blur(0px)", 
    opacity: 1, 
    y: 0,
    transition: { type: "spring", stiffness: 80, damping: 20 }
  }
};
