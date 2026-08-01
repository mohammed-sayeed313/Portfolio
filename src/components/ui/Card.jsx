import React from 'react';
import { cn } from '../../lib/utils';

export function Card({ className, children, ...props }) {
  return (
    <div
      className={cn("rounded-2xl border border-gray-100 bg-white p-6 shadow-sm", className)}
      {...props}
    >
      {children}
    </div>
  );
}
