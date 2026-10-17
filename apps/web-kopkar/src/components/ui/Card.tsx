import React from 'react';
import { cn } from '../../lib/utils';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'white' | 'emerald' | 'cream' | 'mint' | 'gold' | 'dark';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  interactive?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'white',
  padding = 'md',
  interactive = false,
  className,
  ...props
}) => {
  const baseStyles = 'rounded-3xl relative overflow-hidden transition-all duration-200';

  const variants = {
    white: 'bg-white border border-slate-100 shadow-bento text-slate-800',
    emerald: 'bg-kopkar-primary text-white shadow-lg',
    cream: 'bg-kopkar-cream border border-amber-100 shadow-bento text-kopkar-dark',
    mint: 'bg-kopkar-mint border border-emerald-100/70 shadow-bento text-kopkar-dark',
    gold: 'bg-kopkar-gold text-kopkar-dock shadow-card-gold',
    dark: 'bg-kopkar-dock text-white shadow-xl',
  };

  const paddings = {
    none: 'p-0',
    sm: 'p-4',
    md: 'p-5 sm:p-6',
    lg: 'p-6 sm:p-8',
  };

  return (
    <div
      className={cn(
        baseStyles,
        variants[variant],
        paddings[padding],
        interactive && 'cursor-pointer hover:shadow-bento-hover hover:-translate-y-0.5 active:translate-y-0',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
