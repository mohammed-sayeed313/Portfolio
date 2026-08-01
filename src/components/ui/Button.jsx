import React from 'react';
import { cn } from '../../lib/utils';
import { motion } from 'framer-motion';

export const Button = React.forwardRef(({ className, variant = 'primary', asChild = false, children, ...props }, ref) => {
  const Comp = asChild ? motion.a : motion.button;
  
  const variants = {
    primary: 'bg-primary text-white hover:bg-primary/90',
    secondary: 'bg-accent text-primary hover:bg-gray-200',
    outline: 'border border-gray-200 text-primary hover:bg-accent',
    ghost: 'text-primary hover:bg-accent',
  };

  return (
    <Comp
      ref={ref}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:pointer-events-none disabled:opacity-50",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </Comp>
  );
});
Button.displayName = 'Button';
