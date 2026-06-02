import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  glass?: boolean;
}

export function Card({ glass = true, className = '', children, ...props }: CardProps) {
  return (
    <div
      className={`rounded-2xl p-6 ${glass ? 'glass' : 'bg-white shadow-xl shadow-slate-200/50 border border-slate-100'} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
