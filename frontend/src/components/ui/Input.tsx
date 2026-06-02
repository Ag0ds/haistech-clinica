import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = '', ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1 w-full">
        <label className="text-sm font-medium text-slate-700 ml-1">
          {label}
        </label>
        <input
          ref={ref}
          className={`px-4 py-2 rounded-lg border bg-white/50 focus:bg-white transition-colors
            outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary
            ${error ? 'border-red-500 focus:ring-red-500/50 focus:border-red-500' : 'border-slate-200 hover:border-slate-300'}
            ${className}`}
          {...props}
        />
        {error && <span className="text-xs text-red-500 ml-1">{error}</span>}
      </div>
    );
  }
);

Input.displayName = 'Input';
