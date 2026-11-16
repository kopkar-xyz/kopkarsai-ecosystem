import React from 'react';
import { BrandLogo } from './BrandLogo';

export const GatewayBrandHeader: React.FC = () => {
  return (
    <div id="gateway-brand-header" className="w-full flex flex-col items-center justify-center select-none">
      {/* 1. Logo KOPKAR saja di bagian paling atas tanpa efek container */}
      <div className="w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0 flex items-center justify-center mb-2 sm:mb-2.5">
        <BrandLogo className="w-full h-full" />
      </div>

      {/* 2. Baris Teks dengan Garis/Border di Kiri dan Kanan */}
      <div className="w-full flex items-center justify-center gap-2 sm:gap-4">
        {/* Garis Border Kiri Menipis (Left Line) */}
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-stone-300 to-pink-200/90 max-w-[100px] sm:max-w-xs origin-right" />

        {/* Tulisan di tengah: KOPKAR SAI */}
        <div
          id="brand-header-wordmark"
          className="flex items-center justify-center text-center leading-none px-2 sm:px-3"
        >
          <span
            className="text-[#1F1A1B] font-bold text-lg sm:text-xl md:text-2xl tracking-[0.08em] uppercase font-heading"
            style={{ letterSpacing: '0.08em' }}
          >
            KOPKAR SAI
          </span>
        </div>

        {/* Garis Border Kanan Menipis (Right Line) */}
        <div className="flex-1 h-px bg-gradient-to-l from-transparent via-stone-300 to-pink-200/90 max-w-[100px] sm:max-w-xs origin-left" />
      </div>
    </div>
  );
};
