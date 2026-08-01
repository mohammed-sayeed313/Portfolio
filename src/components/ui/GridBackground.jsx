import React from 'react';
import { cn } from '../../lib/utils';

export function GridBackground({ className, children }) {
  return (
    <div className={cn("relative w-full h-full min-h-screen bg-background bg-grid", className)}>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/50 pointer-events-none" />
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </div>
  );
}
