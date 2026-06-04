import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export function Button({ variant = 'primary', size = 'md', className = '', children, ...props }: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-[var(--primary)] text-[var(--primary-foreground)] hover:brightness-110 focus:ring-[var(--primary)] shadow-lg shadow-[var(--primary)]/20 uppercase tracking-wide text-sm font-bold',
    secondary: 'bg-[var(--secondary)] text-[var(--secondary-foreground)] hover:bg-[var(--secondary)]/80 focus:ring-[var(--secondary)] border border-[var(--card-border)]',
    danger: 'bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white border border-red-500/20 focus:ring-red-500',
    ghost: 'bg-transparent text-[var(--secondary-foreground)] hover:text-white hover:bg-[var(--secondary)] focus:ring-[var(--secondary)]',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
