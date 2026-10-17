import React from 'react';
import { cn } from '../../lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'gold' | 'mint' | 'cream' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  isLoading = false,
  className,
  disabled,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-full transition-all duration-150 active:scale-[0.97] focus:outline-none disabled:opacity-50 disabled:pointer-events-none select-none';

  const variants = {
    primary: 'bg-kopkar-primary text-white hover:bg-kopkar-primary-dark shadow-sm hover:shadow',
    gold: 'bg-kopkar-gold text-kopkar-dock hover:bg-kopkar-gold-hover shadow-card-gold font-bold',
    mint: 'bg-kopkar-mint text-kopkar-primary-dark hover:bg-emerald-100',
    cream: 'bg-kopkar-cream text-kopkar-dark border border-amber-200/60 hover:bg-amber-100/70',
    outline: 'border border-slate-300 text-slate-700 bg-white hover:bg-slate-50',
    ghost: 'text-slate-600 hover:bg-slate-100/80',
    danger: 'bg-rose-500 text-white hover:bg-rose-600',
  };

  const sizes = {
    sm: 'text-xs px-3.5 py-1.5 gap-1.5',
    md: 'text-sm px-5 py-2.5 gap-2',
    lg: 'text-base px-6 py-3.5 gap-2.5',
  };

  return (
    <button
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        fullWidth && 'w-full',
        className
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
        </svg>
      )}
      {children}
    </button>
  );
};
