import React from 'react';
import { ArrowUpRight, type LucideIcon } from 'lucide-react';

export interface FeatureCardV2Config {
  id: 'koperasi' | 'marketplace' | 'coming-soon';
  num: string;
  eyebrow: string;
  title: string;
  desc: string;
  footerLeft: string;
  footerCta: string;
  kanji: string;
  icon: LucideIcon;
  bgImage: string;
  href?: string;
  onClick?: () => void;
  isDarkHero?: boolean;
  isCompactMobile?: boolean;
  cardClass: string;
  glowStyle: string;
  numClass: string;
  eyebrowClass: string;
  arrowWrapClass: string;
  iconWrapClass: string;
  titleClass: string;
  descClass: string;
  footerClass: string;
  ctaClass: string;
  barClass: string;
}

export const FeatureCardV2Item: React.FC<{ card: FeatureCardV2Config }> = ({ card }) => {
  const Icon = card.icon;

  const inner = (
    <>
      {/* 1. Subtle architectural illustration layer (zooms smoothly on hover) */}
      <div className="absolute inset-0 z-0 overflow-hidden rounded-2xl pointer-events-none">
        <img
          src={card.bgImage}
          alt=""
          aria-hidden="true"
          className={`w-full h-full object-cover object-center transition-all duration-500 ease-out group-hover:scale-110 ${
            card.isDarkHero
              ? 'opacity-[0.14] group-hover:opacity-[0.26] mix-blend-luminosity'
              : 'opacity-[0.07] group-hover:opacity-[0.16]'
          }`}
          loading="lazy"
        />
        <div
          className="absolute inset-0 transition-opacity duration-300 opacity-70 group-hover:opacity-100"
          style={{ background: card.glowStyle }}
        />
      </div>

      {/* 2. Diagonal glass sheen sweep on hover */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[1] -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-20deg]"
      />

      {/* 3. Mobile compact wide layout for Card 03 */}
      {card.isCompactMobile && (
        <div className="relative z-10 flex md:hidden items-center justify-between w-full">
          <div className="flex items-center gap-2.5">
            <span className={`text-sm font-semibold tabular-nums ${card.numClass}`}>
              {card.num}
            </span>
            <h3 className={`text-sm sm:text-base font-semibold ${card.titleClass}`}>
              {card.title}
            </h3>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/15 border border-white/20 text-[10.5px] font-semibold text-[#F6CE2C]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F6CE2C] animate-pulse" />
            <span>Segera Hadir</span>
          </span>
        </div>
      )}

      {/* 4. Main Card Content */}
      <div
        className={`relative z-10 flex-col justify-between h-full w-full ${
          card.isCompactMobile ? 'hidden md:flex' : 'flex'
        }`}
      >
        <div className="space-y-2.5 md:space-y-4">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-1.5 md:gap-2">
              <span className={`text-[11px] md:text-[11.5px] font-semibold tracking-widest tabular-nums ${card.numClass}`}>
                {card.num}
              </span>
              {card.id === 'coming-soon' ? (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-white/15 border border-white/20 text-[10px] font-semibold uppercase tracking-wider text-[#F6CE2C]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F6CE2C] animate-pulse" />
                  <span>{card.eyebrow}</span>
                </span>
              ) : (
                <span className={`hidden md:inline text-[10.5px] font-medium uppercase tracking-wider ${card.eyebrowClass}`}>
                  {card.eyebrow}
                </span>
              )}
            </div>

            <span
              className={`w-7 h-7 md:w-9 md:h-9 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110 ${card.arrowWrapClass}`}
            >
              <ArrowUpRight className="w-3.5 h-3.5 md:w-4 md:h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div
              className={`hidden md:flex w-10 h-10 rounded-xl items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3 ${card.iconWrapClass}`}
            >
              <Icon className="w-5 h-5" />
            </div>
            <span
              aria-hidden="true"
              className={`hidden md:inline font-kanji text-base tracking-widest transition-all duration-300 opacity-20 group-hover:opacity-45 group-hover:-translate-y-0.5 ${
                card.isDarkHero ? 'text-[#F6CE2C]' : 'text-[#83273B]'
              }`}
            >
              {card.kanji}
            </span>
          </div>

          <div>
            <h3 className={`text-lg sm:text-xl md:text-[22px] font-semibold tracking-[-0.02em] leading-tight ${card.titleClass}`}>
              {card.title}
            </h3>
            <p className={`text-[11px] sm:text-xs md:text-[13px] mt-1 md:mt-1.5 leading-snug md:leading-relaxed line-clamp-2 md:line-clamp-none ${card.descClass}`}>
              {card.desc}
            </p>
          </div>
        </div>

        <div className={`hidden md:flex pt-4 mt-5 border-t items-center justify-between text-[11.5px] ${card.footerClass}`}>
          <span>{card.footerLeft}</span>
          <span className={`font-semibold transition-transform duration-200 group-hover:translate-x-0.5 ${card.ctaClass}`}>
            {card.footerCta}
          </span>
        </div>
      </div>

      {/* 5. Animated bottom accent progress line */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute bottom-0 left-0 right-0 h-[3px] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out z-20 ${card.barClass}`}
      />
    </>
  );

  const baseClass = `group relative overflow-hidden rounded-2xl border transition-all duration-300 ease-out hover:-translate-y-1.5 focus-visible:outline-none focus-visible:ring-2 ${card.cardClass}`;

  if (card.href) {
    return (
      <a href={card.href} className={baseClass}>
        {inner}
      </a>
    );
  }

  return (
    <button type="button" onClick={card.onClick} className={`${baseClass} text-left cursor-pointer`}>
      {inner}
    </button>
  );
};
