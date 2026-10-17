import React from 'react';

interface KopkarLogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
  textColor?: string;
  variant?: 'full' | 'emblem' | 'watermark';
}

export const KopkarLogo: React.FC<KopkarLogoProps> = ({
  className = '',
  size = 40,
  showText = false,
  textColor = 'text-kopkar-dark',
  variant = 'full',
}) => {
  // SVG 12-segment umbrella/sun-flower emblem matching KOPKARSAI brand
  const renderEmblem = () => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Outer subtle halo ring */}
      <circle cx="50" cy="50" r="46" fill="#0F5132" />
      <circle cx="50" cy="50" r="44" stroke="#F5B324" strokeWidth="1.5" strokeOpacity="0.4" />

      {/* 12-segment umbrella flower pedals in Golden Yellow */}
      <g transform="translate(50, 50)">
        {[...Array(12)].map((_, i) => {
          const rotation = i * 30;
          return (
            <path
              key={i}
              d="M 0 -7 C 5 -18, 11 -28, 0 -38 C -11 -28, -5 -18, 0 -7 Z"
              fill="#F5B324"
              stroke="#D99B16"
              strokeWidth="0.8"
              transform={`rotate(${rotation})`}
            />
          );
        })}
        {/* Inner center core button */}
        <circle cx="0" cy="0" r="9" fill="#0B2E1E" />
        <circle cx="0" cy="0" r="6" fill="#F5B324" />
      </g>
    </svg>
  );

  if (variant === 'watermark') {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`pointer-events-none opacity-10 ${className}`}
      >
        <g transform="translate(50, 50)">
          {[...Array(12)].map((_, i) => (
            <path
              key={i}
              d="M 0 -8 C 6 -20, 14 -32, 0 -44 C -14 -32, -6 -20, 0 -8 Z"
              fill="#F5B324"
              transform={`rotate(${i * 30})`}
            />
          ))}
          <circle cx="0" cy="0" r="10" fill="#F5B324" />
        </g>
      </svg>
    );
  }

  if (!showText) {
    return renderEmblem();
  }

  return (
    <div className="flex items-center gap-2.5">
      {renderEmblem()}
      <div className="flex flex-col">
        <span className={`text-base font-extrabold tracking-tight leading-none ${textColor}`}>
          KOPKAR<span className="text-kopkar-gold">SAI</span>
        </span>
        <span className="text-[9px] font-medium tracking-wide text-slate-400 uppercase mt-0.5">
          Konsumen Usaha Bersama
        </span>
      </div>
    </div>
  );
};
