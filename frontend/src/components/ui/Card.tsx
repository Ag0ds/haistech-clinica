import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  glass?: boolean;
}

export function Card({ glass = true, className = '', children, ...props }: CardProps) {
  return (
    <div
      className={`rounded-2xl p-6 ${glass ? 'glass' : 'bg-[var(--card)] border border-[var(--card-border)] shadow-xl shadow-black/20'} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
