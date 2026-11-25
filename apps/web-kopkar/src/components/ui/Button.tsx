import React from 'react';
import { cn } from '../../lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'accent' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  icon?: React.ReactNode;
}

/**
 * Button — Tombol serbaguna
 * Slicing 1:1 Presisi aistudio-src: font-sans font-medium / font-semibold, rounded-xl.
 * Budget: < 200 LOC.
 */
export const Button: React.FC<ButtonProps> = ({
  children,
  className = '',
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled,
  icon,
  ...props
}) => {
  const variantStyles = {
    primary:
      'bg-[#165239] hover:bg-[#11402c] text-white shadow-xs font-semibold',
    secondary:
      'bg-[#EAF4EE] hover:bg-[#D4E7DA] text-[#165239] border border-[#B7DFC7] font-medium',
    outline:
      'bg-transparent border border-[#EAE4D3] hover:bg-[#FAF7EE] text-[#18221D] font-medium',
    accent:
      'bg-[#F2C94C] hover:bg-[#e5bc3e] text-[#154A33] font-semibold',
    ghost:
      'bg-transparent hover:bg-[#FAF7EE] text-[#18221D] font-medium',
    danger:
      'bg-[#B91C1C] hover:bg-[#991B1B] text-white shadow-xs font-semibold',
  };

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-xs rounded-xl gap-1.5',
    md: 'px-4 py-2 text-[13px] rounded-xl gap-2',
    lg: 'px-5 py-2.5 text-[14px] rounded-xl gap-2.5',
  };

  return (
    <button
      className={cn(
        'inline-flex items-center justify-center transition-all duration-150 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed select-none focus:outline-none focus:ring-2 focus:ring-[#165239]/30',
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin flex-shrink-0" />
      ) : icon ? (
        <span className="flex-shrink-0">{icon}</span>
      ) : null}
      <span>{children}</span>
    </button>
  );
};
