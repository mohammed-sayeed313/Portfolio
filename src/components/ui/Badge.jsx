import React from 'react';
import { cn } from '../../lib/utils';

export function Badge({ className, children, variant = 'default', ...props }) {
  const variants = {
    default: 'bg-gray-100 text-primary',
    outline: 'border border-gray-200 text-secondary',
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
