import React from 'react';
import { cn } from '../../lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'forest' | 'sage' | 'ivory';
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  variant = 'default',
  padding = 'md',
  ...props
}) => {
  const variantStyles = {
    default: 'bg-white border border-[#DED5C3] shadow-bento',
    forest: 'bg-[#1F5B45] text-white border border-[#2F6F56] shadow-bento',
    sage: 'bg-[#EAF4EE] border border-[#A9C3A2]/70 shadow-bento',
    ivory: 'bg-[#F8F4EC] border border-[#DED5C3] shadow-bento',
  };

  const paddingStyles = {
    none: 'p-0',
    sm: 'p-3 sm:p-4',
    md: 'p-4 sm:p-6',
    lg: 'p-6 sm:p-8',
  };

  return (
    <div
      className={cn(
        'rounded-2xl transition-all duration-200 overflow-hidden font-body',
        variantStyles[variant],
        paddingStyles[padding],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
