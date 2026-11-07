import React from 'react';

interface BrandWordmarkProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const BrandWordmark: React.FC<BrandWordmarkProps> = ({
  className = '',
  size = 'md',
}) => {
  const sizeClasses = {
    sm: 'text-xl sm:text-2xl tracking-[0.05em]',
    md: 'text-2xl sm:text-3xl md:text-4xl tracking-[0.05em]',
    lg: 'text-3xl sm:text-4xl md:text-5xl tracking-[0.06em]',
  };

  return (
    <div
      id="wordmark-container"
      className={`relative overflow-hidden inline-flex items-center justify-center select-none py-1 ${className}`}
    >
      <h1
        id="wordmark-text"
        className={`wordmark-text font-extrabold uppercase text-white font-sans ${sizeClasses[size]} drop-shadow-[0_4px_12px_rgba(4,61,29,0.3)]`}
        style={{ letterSpacing: '0.05em' }}
      >
        KOPKARSAI
      </h1>
    </div>
  );
};
