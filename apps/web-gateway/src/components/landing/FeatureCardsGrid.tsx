import React, { useState } from 'react';
import { X, Sparkles, CheckCircle2, ArrowUpRight } from 'lucide-react';
import clsx from 'clsx';
import cardKoperasiBg from '../../assets/illustrations/card-koperasi-bg.jpg';
import cardMarketplaceBg from '../../assets/illustrations/card-marketplace-bg.jpg';
import cardBenefitBg from '../../assets/illustrations/card-benefit-bg.jpg';
import { gatewayServices } from '../../config/services';

export interface FeatureAppCard {
  id: string;
  number: string;
  title: string;
  description: string;
  shortDescription: string;
  kanji: string;
  mobileKanji: string;
  mobileWideKanjiBadge?: string;
  href?: string;
  isComingSoon?: boolean;
  onClick?: () => void;
  bgImage: string;
  bgImageAlt: string;
  theme: {
    bgLight: string;
    bgTint: string;
    borderLight: string;
    shadowLight: string;
    hoverShadow: string;
    ringFocus: string;
    numberColor: string;
    titleColor: string;
    descColor: string;
    kanjiColor: string;
    mobileKanjiColor: string;
    arrowColor: string;
    arrowStroke: string;
    lineColor: string;
  };
}

export const FeatureCardsGrid: React.FC = () => {
  const [isBenefitModalOpen, setIsBenefitModalOpen] = useState<boolean>(false);

  const kopkarHref =
    gatewayServices.find((s) => s.id === 'cooperative')?.href || 'http://localhost:5173';
  const marketplaceHref =
    gatewayServices.find((s) => s.id === 'marketplace')?.href || 'http://localhost:5175';

  const featureApps: FeatureAppCard[] = [
    {
      id: 'koperasi',
      number: '01',
      title: 'Koperasi',
      description: 'Layanan keanggotaan, simpanan, pembiayaan, dan program kesejahteraan anggota.',
      shortDescription: 'Keanggotaan & simpan pinjam',
      kanji: '協同組合',
      mobileKanji: '協',
      href: kopkarHref,
      bgImage: cardKoperasiBg,
      bgImageAlt: 'Latar Belakang Arsitektur Koperasi Karyawan',
      theme: {
        bgLight: 'bg-[#F0F8F3]',
        bgTint: 'bg-[#F0F8F3]/90',
        borderLight: 'border-emerald-200/80',
        shadowLight: 'shadow-[0_8px_30px_-8px_rgba(6,92,43,0.12)]',
        hoverShadow: 'hover:shadow-[0_20px_40px_-10px_rgba(6,92,43,0.3)]',
        ringFocus: 'focus-visible:ring-emerald-400',
        numberColor: 'text-[#065C2B]',
        titleColor: 'text-[#0B4A25]',
        descColor: 'text-[#244331]',
        kanjiColor: 'text-[#0B4A25]/40',
        mobileKanjiColor: 'text-[#065C2B]/40',
        arrowColor: 'text-[#065C2B]',
        arrowStroke: '#065C2B',
        lineColor: 'bg-[#0B4A25]/40',
      },
    },
    {
      id: 'marketplace',
      number: '02',
      title: 'Marketplace',
      description: 'Belanja kebutuhan harian, produk pilihan, dan berbagai penawaran spesial untuk anggota.',
      shortDescription: 'Belanja produk pilihan anggota',
      kanji: '市場',
      mobileKanji: '市',
      href: marketplaceHref,
      bgImage: cardMarketplaceBg,
      bgImageAlt: 'Latar Belakang Etalase Marketplace',
      theme: {
        bgLight: 'bg-[#FFF2F4]',
        bgTint: 'bg-[#FFF2F4]/90',
        borderLight: 'border-pink-200/80',
        shadowLight: 'shadow-[0_8px_30px_-8px_rgba(189,58,83,0.12)]',
        hoverShadow: 'hover:shadow-[0_20px_40px_-10px_rgba(189,58,83,0.3)]',
        ringFocus: 'focus-visible:ring-pink-400',
        numberColor: 'text-[#BD3A53]',
        titleColor: 'text-[#BD3A53]',
        descColor: 'text-[#4E3137]',
        kanjiColor: 'text-[#BD3A53]/40',
        mobileKanjiColor: 'text-[#BD3A53]/40',
        arrowColor: 'text-[#BD3A53]',
        arrowStroke: '#BD3A53',
        lineColor: 'bg-[#BD3A53]/40',
      },
    },
    {
      id: 'benefit',
      number: '03',
      title: 'Coming Soon',
      description: 'Coming soon system',
      shortDescription: 'Segera hadir layanan baru',
      kanji: '近日公開',
      mobileKanji: '近',
      mobileWideKanjiBadge: '近日公開',
      isComingSoon: true,
      onClick: () => setIsBenefitModalOpen(true),
      bgImage: cardBenefitBg,
      bgImageAlt: 'Latar Belakang Hadiah & Benefit Anggota',
      theme: {
        bgLight: 'bg-[#FFF6EE]',
        bgTint: 'bg-[#FFF6EE]/90',
        borderLight: 'border-amber-200/80',
        shadowLight: 'shadow-[0_8px_30px_-8px_rgba(168,74,28,0.12)]',
        hoverShadow: 'hover:shadow-[0_20px_40px_-10px_rgba(168,74,28,0.3)]',
        ringFocus: 'focus-visible:ring-amber-400',
        numberColor: 'text-[#A84A1C]',
        titleColor: 'text-[#A84A1C]',
        descColor: 'text-[#4E392F]',
        kanjiColor: 'text-[#A84A1C]/40',
        mobileKanjiColor: 'text-[#A84A1C]/40',
        arrowColor: 'text-[#A84A1C]',
        arrowStroke: '#A84A1C',
        lineColor: 'bg-[#A84A1C]/40',
      },
    },
  ];

  const isOddTotal = featureApps.length % 2 !== 0;

  return (
    <>
      <section
        aria-label="Pilihan Layanan KOPKARSAI"
        className="w-full max-w-6xl mx-auto mt-1 sm:mt-2 mb-0 px-2 sm:px-4 z-10"
      >
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
          {featureApps.map((app, index) => {
            const isLastCard = index === featureApps.length - 1;
            const isWideOnMobile = isOddTotal && isLastCard;

            const cardContent = (
              <>
                {/* Background Photo Layer with Soft Blur & Hover Scrim (Mobile & Desktop) */}
                <div className="absolute inset-0 z-0 rounded-[18px] md:rounded-[26px] overflow-hidden pointer-events-none">
                  <img
                    src={app.bgImage}
                    alt={app.bgImageAlt}
                    className="w-full h-full object-cover object-center rounded-[18px] md:rounded-[26px]"
                    loading="lazy"
                  />
                </div>

                {/* Desktop Hover Scrim */}
                <div
                  className="hidden md:block absolute inset-0 z-[1] rounded-3xl bg-black/55 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  aria-hidden="true"
                />

                {/* Front Tinted & Blurred Layer (Tersamarkan seperti Desktop) */}
                <div
                  className={clsx(
                    'absolute inset-0 z-[2] rounded-2xl md:rounded-3xl backdrop-blur-[2px] pointer-events-none transition-opacity duration-300',
                    isWideOnMobile
                      ? 'bg-[#181D1B]/85 md:bg-[#FFF6EE]/90 opacity-100 md:group-hover:opacity-0'
                      : clsx(app.theme.bgTint, 'opacity-100 md:group-hover:opacity-0')
                  )}
                  aria-hidden="true"
                />

                {/* Crisp Border Overlay */}
                <div
                  className={clsx(
                    'absolute inset-0 z-20 rounded-2xl md:rounded-3xl border pointer-events-none transition-colors duration-300',
                    isWideOnMobile
                      ? 'border-[#38423E] md:border-amber-200/80'
                      : app.theme.borderLight
                  )}
                  aria-hidden="true"
                />

                {/* 1. Mobile Bento Wide Layout (When odd card spans 2 columns on mobile) */}
                {isWideOnMobile ? (
                  <div className="md:hidden relative z-10 px-4 py-3 sm:px-5 sm:py-3.5 flex items-center justify-between min-h-[58px]">
                    <div className="flex items-center gap-2.5 sm:gap-3">
                      <span className="font-heading font-bold text-lg sm:text-xl text-stone-400 select-none">
                        {app.number}
                      </span>
                      <h3 className="font-heading font-bold text-base sm:text-lg text-white">
                        {app.title}
                      </h3>
                    </div>
                    {app.mobileWideKanjiBadge && (
                      <span className="font-kanji font-bold text-[11px] sm:text-xs tracking-wider px-3.5 py-1 rounded-full bg-[#353D3A] text-stone-200 shadow-inner select-none">
                        {app.mobileWideKanjiBadge}
                      </span>
                    )}
                  </div>
                ) : (
                  /* 2. Mobile 1-Column Regular Card Layout */
                  <div className="md:hidden relative z-10 p-3.5 sm:p-4 flex flex-col justify-between h-full min-h-[175px] sm:min-h-[190px]">
                    {/* Top Row: Number on left, Single Kanji on top-right */}
                    <div className="flex items-start justify-between w-full">
                      <span
                        className={clsx(
                          'font-heading font-bold text-2xl sm:text-3xl leading-none select-none',
                          app.theme.numberColor
                        )}
                      >
                        {app.number}
                      </span>
                      <span
                        className={clsx(
                          'font-kanji font-bold text-xl sm:text-2xl leading-none select-none',
                          app.theme.mobileKanjiColor
                        )}
                      >
                        {app.mobileKanji}
                      </span>
                    </div>

                    {/* Middle: Title & Short Mobile Description */}
                    <div className="my-auto pt-1">
                      <h3
                        className={clsx(
                          'font-heading font-bold text-lg sm:text-xl leading-tight',
                          app.theme.titleColor
                        )}
                      >
                        {app.title}
                      </h3>
                      <p
                        className={clsx(
                          'mt-1 text-[11px] sm:text-xs leading-snug font-medium line-clamp-2',
                          app.theme.descColor
                        )}
                      >
                        {app.shortDescription}
                      </p>
                    </div>

                    {/* Bottom Row: Simple Diagonal Arrow */}
                    <div className="flex items-end justify-end mt-2">
                      <ArrowUpRight
                        className={clsx(
                          'w-5 h-5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5',
                          app.theme.arrowColor
                        )}
                      />
                    </div>
                  </div>
                )}

                {/* 3. Desktop Card Layout (Preserved 100% Faithful to Desktop Experience) */}
                <div className="hidden md:flex relative z-10 p-6 sm:p-7 flex-col justify-between h-full min-h-[340px]">
                  {/* Top Section */}
                  <div>
                    <span
                      className={clsx(
                        'block font-heading font-bold text-4xl sm:text-[44px] leading-none mb-4 select-none transition-colors duration-300',
                        app.theme.numberColor,
                        'group-hover:text-white group-hover:drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]'
                      )}
                    >
                      {app.number}
                    </span>

                    <div className="flex items-center gap-2 flex-wrap">
                      <h3
                        className={clsx(
                          'font-heading font-bold text-2xl sm:text-3xl leading-snug transition-colors duration-300',
                          app.theme.titleColor,
                          'group-hover:text-white group-hover:drop-shadow-[0_2px_6px_rgba(0,0,0,0.85)]'
                        )}
                      >
                        {app.title}
                      </h3>
                      {app.isComingSoon && (
                        <span className="text-[10px] font-semibold tracking-wide uppercase px-2 py-0.5 rounded-full bg-amber-100/80 text-amber-900 border border-amber-200/90 group-hover:bg-white/20 group-hover:text-white group-hover:border-white/40 group-hover:backdrop-blur-md transition-all duration-300">
                          Coming Soon
                        </span>
                      )}
                    </div>

                    <p
                      className={clsx(
                        'mt-2 text-xs sm:text-sm leading-relaxed max-w-[220px] font-medium transition-colors duration-300',
                        app.theme.descColor,
                        'group-hover:text-white/95 group-hover:drop-shadow-[0_1px_4px_rgba(0,0,0,0.85)]'
                      )}
                    >
                      {app.description}
                    </p>
                  </div>

                  {/* Bottom Section: Circular Action Icon Button */}
                  <div className="mt-8 relative z-10 pt-2 flex items-end justify-between">
                    <div
                      aria-hidden="true"
                      className="w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-105 active:scale-95"
                    >
                      <svg
                        viewBox="0 0 44 44"
                        className="w-full h-full"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <defs>
                          <mask id={`arrow-cutout-${app.id}`}>
                            <rect width="44" height="44" rx="22" fill="white" />
                            <g className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                              <path
                                d="M16 28L28 16M28 16H19M28 16V25"
                                stroke="black"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </g>
                          </mask>
                        </defs>

                        {/* Normal State */}
                        <g className="opacity-100 group-hover:opacity-0 transition-opacity duration-300">
                          <circle
                            cx="22"
                            cy="22"
                            r="21"
                            stroke={app.theme.arrowStroke}
                            strokeWidth="1.5"
                            fill="transparent"
                          />
                          <path
                            d="M16 28L28 16M28 16H19M28 16V25"
                            stroke={app.theme.arrowStroke}
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                          />
                        </g>

                        {/* Hover State */}
                        <g className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <circle
                            cx="22"
                            cy="22"
                            r="21.5"
                            fill="white"
                            mask={`url(#arrow-cutout-${app.id})`}
                            className="drop-shadow-md"
                          />
                        </g>
                      </svg>
                    </div>
                  </div>

                  {/* Vertical Japanese Kanji (Tategaki) with Top Vertical Accent Line */}
                  <div
                    className="absolute right-5 sm:right-6 top-6 sm:top-7 bottom-6 sm:bottom-7 pointer-events-none select-none flex flex-col items-center justify-end gap-3"
                    aria-hidden="true"
                  >
                    <div
                      className={clsx(
                        'w-px flex-1 transition-all duration-300 group-hover:bg-white group-hover:drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]',
                        app.theme.lineColor
                      )}
                    />
                    <span
                      className={clsx(
                        'tategaki font-kanji text-2xl sm:text-3xl transition-all duration-300 flex-shrink-0 group-hover:text-white group-hover:drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]',
                        app.theme.kanjiColor
                      )}
                    >
                      {app.kanji}
                    </span>
                  </div>
                </div>
              </>
            );

            const commonClassName = clsx(
              'gateway-feature-card group rounded-2xl md:rounded-3xl relative overflow-hidden isolate transform-gpu transition-all duration-300 block focus-visible:outline-none focus-visible:ring-2 cursor-pointer',
              isWideOnMobile
                ? 'col-span-2 md:col-span-1 bg-[#202523] md:bg-[#FFF6EE] border border-[#323A36] md:border-amber-200/80 shadow-sm md:shadow-[0_8px_30px_-8px_rgba(168,74,28,0.12)] hover:shadow-md md:hover:shadow-[0_20px_40px_-10px_rgba(168,74,28,0.3)] focus-visible:ring-amber-400'
                : [
                    'col-span-1 border',
                    app.theme.bgLight,
                    app.theme.borderLight,
                    app.theme.shadowLight,
                    app.theme.hoverShadow,
                    app.theme.ringFocus,
                  ]
            );

            if (app.href) {
              return (
                <a
                  key={app.id}
                  id={`feature-card-${app.id}`}
                  href={app.href}
                  aria-label={app.title}
                  className={commonClassName}
                >
                  {cardContent}
                </a>
              );
            }

            return (
              <div
                key={app.id}
                id={`feature-card-${app.id}`}
                role="button"
                tabIndex={0}
                onClick={app.onClick}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    app.onClick?.();
                  }
                }}
                aria-label={app.title}
                className={commonClassName}
              >
                {cardContent}
              </div>
            );
          })}
        </div>
      </section>

      {/* Benefit Anggota Welfare Details Modal */}
      {isBenefitModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/45 backdrop-blur-xs animate-in fade-in duration-200"
        >
          <div className="w-full max-w-lg rounded-3xl bg-white border border-pink-100 shadow-2xl p-6 sm:p-8 relative overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-pink-100">
              <div className="flex items-center space-x-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#FDE7D4] text-[#A84A1C] flex items-center justify-center">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-xl text-[#0B4A25]">
                    Benefit Eksklusif Anggota
                  </h4>
                  <p className="text-xs text-[#5C4C43]">Koperasi Karyawan PT SAI</p>
                </div>
              </div>
              <button
                onClick={() => setIsBenefitModalOpen(false)}
                className="p-1.5 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
                aria-label="Tutup jendela benefit"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* List of Benefits */}
            <div className="py-5 space-y-3.5 text-xs sm:text-sm text-stone-700">
              <div className="flex items-start space-x-3 p-3 rounded-2xl bg-[#FFF9FA] border border-pink-100">
                <CheckCircle2 className="w-5 h-5 text-[#BD3A53] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-[#0B4A25]">Harga Khusus & Diskon Bertingkat</p>
                  <p className="text-stone-600 text-xs mt-0.5">
                    Potongan harga hingga 13% pada produk kebutuhan toko fisik dan pesanan katering supplier.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-3 rounded-2xl bg-[#F0F8F3] border border-emerald-100">
                <CheckCircle2 className="w-5 h-5 text-[#065C2B] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-[#0B4A25]">Simpan Pinjam Bunga Ringan & SHU</p>
                  <p className="text-stone-600 text-xs mt-0.5">
                    Bunga simpanan kompetitif serta pembagian Sisa Hasil Usaha (SHU) transparan tiap tahun buku.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-3 rounded-2xl bg-[#FFF6EE] border border-amber-100">
                <CheckCircle2 className="w-5 h-5 text-[#A84A1C] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-[#0B4A25]">Pemesanan Katering Pre-Order H-1</p>
                  <p className="text-stone-600 text-xs mt-0.5">
                    Akses menu kuliner basah berkualitas dari supplier UMKM teruji dengan kemudahan potongan gaji/transfer.
                  </p>
                </div>
              </div>
            </div>

            {/* Footer action */}
            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setIsBenefitModalOpen(false)}
                className="px-5 py-2 rounded-full bg-[#065C2B] hover:bg-[#0B4A25] text-white text-xs font-semibold shadow-sm transition-colors"
              >
                Mengerti
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
