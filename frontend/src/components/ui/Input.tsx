import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = '', ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1 w-full">
        <label className="text-sm font-medium text-[var(--secondary-foreground)] ml-1">
          {label}
        </label>
        <input
          ref={ref}
          className={`px-4 py-3 rounded-lg border bg-[var(--input-bg)] text-white focus:bg-[var(--card)] transition-colors
            outline-none focus:ring-1 focus:ring-[var(--primary)] focus:border-[var(--primary)] placeholder-slate-600
            ${error ? 'border-red-500 focus:ring-red-500/50 focus:border-red-500' : 'border-[var(--card-border)] hover:border-[var(--secondary-foreground)]'}
            ${className}`}
          {...props}
        />
        {error && <span className="text-xs text-red-500 ml-1">{error}</span>}
      </div>
    );
  }
);

Input.displayName = 'Input';
