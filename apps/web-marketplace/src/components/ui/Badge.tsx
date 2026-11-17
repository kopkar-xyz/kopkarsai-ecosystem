import React from 'react';
import { cn } from '../../lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'sakura' | 'matcha' | 'gold' | 'default';
  size?: 'sm' | 'md';
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  className,
  variant = 'default',
  size = 'sm',
  ...props
}) => {
  const variantStyles = {
    sakura: 'bg-[#FDF0F3] text-[#83273B] border-[#F7BAC7]',
    matcha: 'bg-[#EAF4EE] text-[#2E6B4F] border-[#A9C3A2]',
    gold: 'bg-[#FEF6DC] text-[#1A1615] border-[#E5A812]/40',
    default: 'bg-white text-[#665E60] border-[#EAE3D5]',
  };

  const sizeStyles = {
    sm: 'text-[10px] px-2 py-0.5',
    md: 'text-xs px-2.5 py-1',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 font-semibold rounded-full border transition-colors',
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};

