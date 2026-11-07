import React from 'react';
import { BrandLogo } from './BrandLogo';

export const GatewayBrandHeader: React.FC = () => {
  return (
    <div id="gateway-brand-header" className="flex items-center justify-center select-none">
      <div className="flex items-center space-x-3 sm:space-x-3.5">
        {/* Official Coded KOPKARSAI Emblem */}
        <div className="w-8 h-8 sm:w-10 sm:h-10 flex-shrink-0 flex items-center justify-center">
          <BrandLogo className="w-full h-full" />
        </div>

        {/* Vertical Divider Line */}
        <div className="h-5 sm:h-6 w-[1.5px] bg-[#065C2B]/30 rounded-full" />

        {/* Brand Wordmark Text with uniform, cohesive spacing */}
        <span
          id="brand-header-wordmark"
          className="text-[#065C2B] font-extrabold text-xl sm:text-2xl tracking-[0.05em] uppercase font-sans leading-none transition-all duration-200"
          style={{ letterSpacing: '0.05em' }}
        >
          KOPKARSAI
        </span>
      </div>
    </div>
  );
};
