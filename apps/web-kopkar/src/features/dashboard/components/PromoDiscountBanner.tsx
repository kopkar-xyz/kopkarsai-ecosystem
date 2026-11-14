import React, { useState, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';
import { useRouter, type RoutePath } from '../../../app/router';

interface SpecialOfferSlide {
  id: number;
  badge: string;
  title: string;
  discountPrefix: string;
  discountValue: string;
  terms: string;
  ctaText: string;
  ctaPath: RoutePath;
  illustration: string;
}

const OFFERS: SpecialOfferSlide[] = [
  {
    id: 1,
    badge: 'Limited time!',
    title: 'Get Special Offer',
    discountPrefix: 'Up to',
    discountValue: '40%',
    terms: 'Semua Produk Toko Koperasi | T&C Applied',
    ctaText: 'Claim',
    ctaPath: '/orders',
    illustration: '🍱',
  },
  {
    id: 2,
    badge: 'Promo Katering',
    title: 'Paket Hemat Makan Siang',
    discountPrefix: 'Mulai',
    discountValue: '15rb',
    terms: 'Menu Fresh PO H-1 Mitra UMKM | Kuota Terbatas',
    ctaText: 'Pesan',
    ctaPath: '/orders',
    illustration: '🍲',
  },
  {
    id: 3,
    badge: 'Bunga Ringan',
    title: 'Pinjaman Kesejahteraan',
    discountPrefix: 'Bunga',
    discountValue: '0.8%',
    terms: 'Plafon Pinjaman s.d. Rp 15 Juta | Approval Cepat',
    ctaText: 'Ajukan',
    ctaPath: '/financial',
    illustration: '💳',
  },
];

export const PromoDiscountBanner: React.FC = () => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const { navigate } = useRouter();

  const slide = OFFERS[currentIdx];

  // Auto-slide every 5 seconds
  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setCurrentIdx((prev) => (prev === OFFERS.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, [isHovered, currentIdx]);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="w-full space-y-2 select-none"
    >
      {/* 1. Header with #SpecialForYou and See All */}
      <div className="flex items-center justify-between px-1">
        <h2 className="text-base sm:text-lg font-heading font-extrabold text-[#1A2421] tracking-tight">
          #SpecialForYou
        </h2>
        <button
          onClick={() => navigate('/orders')}
          className="text-xs font-accent font-semibold text-[#5C6F67] hover:text-[#1F5B45] flex items-center gap-0.5 transition-colors cursor-pointer"
        >
          <span>See All</span>
          <ChevronRight size={14} />
        </button>
      </div>

      {/* 2. Main Banner Card (Mirip Gaya Referensi Gambar) */}
      <div className="relative w-full rounded-3xl bg-gradient-to-r from-[#173F30] via-[#1F5B45] to-[#2B6A53] text-white p-5 sm:p-6 shadow-bento overflow-hidden min-h-[160px] sm:min-h-[180px] flex items-center justify-between">
        {/* Soft background glow and pattern */}
        <div className="absolute inset-0 bg-radial-at-tr from-white/10 to-transparent pointer-events-none" />
        <div className="absolute -right-8 -bottom-8 w-48 h-48 rounded-full bg-white/5 pointer-events-none" />

        {/* Left Side Content */}
        <div className="relative z-10 flex flex-col justify-between h-full space-y-2 max-w-[65%] sm:max-w-[70%]">
          {/* Limited time! pill badge */}
          <span className="inline-block px-3 py-0.5 rounded-full bg-white text-[#173F30] text-[11px] font-heading font-bold w-fit shadow-xs">
            {slide.badge}
          </span>

          {/* Headline */}
          <div>
            <h3 className="text-lg sm:text-2xl font-heading font-extrabold text-white leading-tight">
              {slide.title}
            </h3>

            {/* Discount Up to 40% */}
            <div className="flex items-baseline gap-1.5 mt-1">
              <span className="text-xs sm:text-sm font-body text-[#A9C3A2] font-medium">
                {slide.discountPrefix}
              </span>
              <span className="text-2xl sm:text-4xl font-heading font-black text-white tracking-tight">
                {slide.discountValue}
              </span>
            </div>
          </div>

          {/* Subtext Terms */}
          <p className="text-[10px] sm:text-xs font-body text-[#F3ECDD]/75 truncate pt-0.5">
            {slide.terms}
          </p>
        </div>

        {/* Right Side Visual & Claim Button */}
        <div className="relative z-10 flex flex-col items-end justify-between h-full space-y-4 flex-shrink-0">
          {/* Big Illustration / Visual Avatar */}
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white/15 backdrop-blur-md border border-white/20 flex items-center justify-center text-3xl sm:text-4xl shadow-inner select-none">
            {slide.illustration}
          </div>

          {/* Yellow/Gold Pill Claim Button (Persis di gambar) */}
          <button
            onClick={() => navigate(slide.ctaPath)}
            className="px-5 sm:px-6 py-1.5 sm:py-2 rounded-full bg-[#F6CE2C] hover:bg-[#FFD967] text-[#1A2421] text-xs sm:text-sm font-heading font-extrabold shadow-md hover:shadow-lg active:scale-95 transition-all cursor-pointer"
          >
            {slide.ctaText}
          </button>
        </div>
      </div>

      {/* 3. Dots Carousel Indicators (Persis di gambar) */}
      <div className="flex items-center justify-center gap-1.5 pt-1">
        {OFFERS.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIdx(idx)}
            aria-label={`Pindah ke promo ${idx + 1}`}
            className={`h-2 rounded-full transition-all duration-200 cursor-pointer ${
              currentIdx === idx
                ? 'w-5 bg-[#1F5B45]'
                : 'w-2 bg-[#DED5C3] hover:bg-[#A9C3A2]'
            }`}
          />
        ))}
      </div>
    </div>
  );
};
