import React from 'react';
import { cn } from '../../lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export const Button: React.FC<ButtonProps> = ({
  children,
  className,
  variant = 'primary',
  size = 'md',
  ...props
}) => {
  const variantStyles = {
    primary: 'bg-[#83273B] hover:bg-[#5E1526] text-white border-transparent shadow-sakura-card',
    secondary: 'bg-[#FDF0F3] hover:bg-[#FCE4E9] text-[#83273B] border-[#F7BAC7]',
    outline: 'bg-transparent border-[#EAE3D5] text-[#1A1615] hover:bg-[#FAF6F0]',
    ghost: 'bg-transparent border-transparent text-[#665E60] hover:bg-black/5',
  };

  const sizeStyles = {
    sm: 'text-xs px-3 py-1.5 rounded-xl',
    md: 'text-sm px-4 py-2 rounded-2xl',
    lg: 'text-base px-5 py-2.5 rounded-2xl font-bold',
  };

  return (
    <button
      className={cn(
        'inline-flex items-center justify-center gap-1.5 font-sans font-semibold border transition-all active:scale-95 disabled:opacity-50 disabled:pointer-events-none',
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

