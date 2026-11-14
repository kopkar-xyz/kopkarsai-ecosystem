import React from 'react';
import { cn } from '../../lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'accent' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  icon?: React.ReactNode;
}

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
      'bg-[#1F5B45] hover:bg-[#2F6F56] text-white shadow-sm hover:shadow-md active:scale-[0.98] font-heading font-bold',
    secondary:
      'bg-[#EAF4EE] hover:bg-[#A9C3A2]/30 text-[#1F5B45] border border-[#A9C3A2] active:scale-[0.98] font-accent font-semibold',
    outline:
      'bg-transparent border border-[#1F5B45]/40 hover:border-[#1F5B45] text-[#1F5B45] hover:bg-[#A9C3A2]/20 active:scale-[0.98] font-accent font-semibold',
    accent:
      'bg-[#4F8A67] hover:bg-[#2F6F56] text-white shadow-sm active:scale-[0.98] font-accent font-semibold',
    ghost:
      'bg-transparent hover:bg-[#F3ECDD] text-[#1A2421] hover:text-[#1F5B45] font-body font-medium',
    danger:
      'bg-[#DC4C70] hover:bg-[#BE185D] text-white shadow-sm active:scale-[0.98] font-accent font-semibold',
  };

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-xs rounded-xl gap-1.5',
    md: 'px-4 py-2 text-sm rounded-2xl gap-2',
    lg: 'px-5 py-2.5 text-base rounded-2xl gap-2.5',
  };

  return (
    <button
      className={cn(
        'inline-flex items-center justify-center transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed select-none focus:outline-none focus:ring-2 focus:ring-[#1F5B45]/30',
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
