import React, { useState } from 'react';
import { X, Sparkles, CheckCircle2 } from 'lucide-react';
import cardKoperasiBg from '../../assets/illustrations/card-koperasi-bg.jpg';
import cardMarketplaceBg from '../../assets/illustrations/card-marketplace-bg.jpg';
import cardBenefitBg from '../../assets/illustrations/card-benefit-bg.jpg';
import { gatewayServices } from '../../config/services';

export const FeatureCardsGrid: React.FC = () => {
  const [isBenefitModalOpen, setIsBenefitModalOpen] = useState<boolean>(false);

  const kopkarHref =
    gatewayServices.find((s) => s.id === 'cooperative')?.href || 'http://localhost:5173';
  const marketplaceHref =
    gatewayServices.find((s) => s.id === 'marketplace')?.href || 'http://localhost:5174';

  return (
    <>
      <section
        aria-label="Pilihan Layanan KOPKARSAI"
        className="w-full max-w-6xl mx-auto mt-1 sm:mt-2 mb-0 px-2 sm:px-4 z-10"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
          {/* Card 1: Koperasi */}
          <a
            id="feature-card-koperasi"
            href={kopkarHref}
            aria-label="Jelajahi Koperasi"
            className="gateway-feature-card group rounded-3xl bg-[#F0F8F3] shadow-[0_8px_30px_-8px_rgba(6,92,43,0.12)] relative overflow-hidden isolate transform-gpu transition-shadow duration-300 hover:shadow-[0_20px_40px_-10px_rgba(6,92,43,0.3)] cursor-pointer block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
          >
            {/* Background Layer (Z-0): Photo clipped with custom inner radius so it sits completely inside the blur layer */}
            <div className="absolute inset-0 z-0 rounded-[26px] overflow-hidden pointer-events-none">
              <img
                src={cardKoperasiBg}
                alt="Latar Belakang Arsitektur Koperasi Karyawan"
                className="w-full h-full object-cover object-center rounded-[26px]"
                loading="lazy"
              />
            </div>

            {/* Hover Contrast Scrim (Z-1): Fades in when front tint layer disappears to ensure perfect contrast */}
            <div
              className="absolute inset-0 z-[1] rounded-3xl bg-black/55 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
              aria-hidden="true"
            />

            {/* Front Tinted Layer (Z-2): Normal soft card color with backdrop-blur, covering completely with outer radius */}
            <div
              className="absolute inset-0 z-[2] rounded-3xl bg-[#F0F8F3]/90 backdrop-blur-[2px] opacity-100 group-hover:opacity-0 transition-opacity duration-300 pointer-events-none"
              aria-hidden="true"
            />

            {/* Top Crisp Border Overlay (Z-20): Eliminates any subpixel seam/fringe between photo and card edge */}
            <div
              className="absolute inset-0 z-20 rounded-3xl border border-emerald-200/80 pointer-events-none transition-colors duration-300"
              aria-hidden="true"
            />

            {/* Interactive Content Layer (Z-10) */}
            <div className="relative z-10 p-6 sm:p-7 flex flex-col justify-between h-full min-h-[340px]">
              {/* Top Section */}
              <div>
                {/* Number 01 (Direct full number without box container) */}
                <span className="block font-serif font-bold text-4xl sm:text-[44px] leading-none text-[#065C2B] group-hover:text-white group-hover:drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)] tracking-tight mb-4 select-none transition-colors duration-300">
                  01
                </span>

                {/* Title */}
                <h3 className="font-serif font-bold text-2xl sm:text-3xl text-[#0B4A25] group-hover:text-white group-hover:drop-shadow-[0_2px_6px_rgba(0,0,0,0.85)] leading-snug transition-colors duration-300">
                  Koperasi
                </h3>

                {/* Description */}
                <p className="mt-2 text-xs sm:text-sm text-[#244331] group-hover:text-white/95 group-hover:drop-shadow-[0_1px_4px_rgba(0,0,0,0.85)] leading-relaxed max-w-[220px] font-medium transition-colors duration-300">
                  Layanan keanggotaan, simpanan, pembiayaan, dan program kesejahteraan anggota.
                </p>
              </div>

              {/* Bottom Section: Action Icon Button */}
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
                      <mask id="arrow-cutout-koperasi">
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

                    {/* Normal State: Transparent background, green border, green arrow */}
                    <g className="opacity-100 group-hover:opacity-0 transition-opacity duration-300">
                      <circle cx="22" cy="22" r="21" stroke="#065C2B" strokeWidth="1.5" fill="transparent" />
                      <path
                        d="M16 28L28 16M28 16H19M28 16V25"
                        stroke="#065C2B"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                    </g>

                    {/* Hover State: Full white circle with transparent cutout arrow */}
                    <g className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <circle
                        cx="22"
                        cy="22"
                        r="21.5"
                        fill="white"
                        mask="url(#arrow-cutout-koperasi)"
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
                <div className="w-px flex-1 bg-[#0B4A25]/40 group-hover:bg-white group-hover:drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] transition-all duration-300" />
                <span className="tategaki font-kanji text-2xl sm:text-3xl text-[#0B4A25]/40 group-hover:text-white group-hover:drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] transition-all duration-300 flex-shrink-0">
                  協同組合
                </span>
              </div>
            </div>
          </a>

          {/* Card 2: Marketplace */}
          <a
            id="feature-card-marketplace"
            href={marketplaceHref}
            aria-label="Belanja Sekarang di Marketplace"
            className="gateway-feature-card group rounded-3xl bg-[#FFF2F4] shadow-[0_8px_30px_-8px_rgba(189,58,83,0.12)] relative overflow-hidden isolate transform-gpu transition-shadow duration-300 hover:shadow-[0_20px_40px_-10px_rgba(189,58,83,0.3)] cursor-pointer block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400"
          >
            {/* Background Layer (Z-0): Photo clipped with custom inner radius so it sits completely inside the blur layer */}
            <div className="absolute inset-0 z-0 rounded-[26px] overflow-hidden pointer-events-none">
              <img
                src={cardMarketplaceBg}
                alt="Latar Belakang Etalase Marketplace"
                className="w-full h-full object-cover object-center rounded-[26px]"
                loading="lazy"
              />
            </div>

            {/* Hover Contrast Scrim (Z-1): Fades in when front tint layer disappears to ensure perfect contrast */}
            <div
              className="absolute inset-0 z-[1] rounded-3xl bg-black/55 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
              aria-hidden="true"
            />

            {/* Front Tinted Layer (Z-2): Normal soft card color with backdrop-blur, covering completely with outer radius */}
            <div
              className="absolute inset-0 z-[2] rounded-3xl bg-[#FFF2F4]/90 backdrop-blur-[2px] opacity-100 group-hover:opacity-0 transition-opacity duration-300 pointer-events-none"
              aria-hidden="true"
            />

            {/* Top Crisp Border Overlay (Z-20): Eliminates any subpixel seam/fringe between photo and card edge */}
            <div
              className="absolute inset-0 z-20 rounded-3xl border border-pink-200/80 pointer-events-none transition-colors duration-300"
              aria-hidden="true"
            />

            {/* Interactive Content Layer (Z-10) */}
            <div className="relative z-10 p-6 sm:p-7 flex flex-col justify-between h-full min-h-[340px]">
              {/* Top Section */}
              <div>
                {/* Number 02 (Direct full number without box container) */}
                <span className="block font-serif font-bold text-4xl sm:text-[44px] leading-none text-[#BD3A53] group-hover:text-white group-hover:drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)] tracking-tight mb-4 select-none transition-colors duration-300">
                  02
                </span>

                {/* Title */}
                <h3 className="font-serif font-bold text-2xl sm:text-3xl text-[#BD3A53] group-hover:text-white group-hover:drop-shadow-[0_2px_6px_rgba(0,0,0,0.85)] leading-snug transition-colors duration-300">
                  Marketplace
                </h3>

                {/* Description */}
                <p className="mt-2 text-xs sm:text-sm text-[#4E3137] group-hover:text-white/95 group-hover:drop-shadow-[0_1px_4px_rgba(0,0,0,0.85)] leading-relaxed max-w-[220px] font-medium transition-colors duration-300">
                  Belanja kebutuhan harian, produk pilihan, dan berbagai penawaran spesial untuk anggota.
                </p>
              </div>

              {/* Bottom Section: Action Icon Button */}
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
                      <mask id="arrow-cutout-marketplace">
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

                    {/* Normal State: Transparent background, rose/pink border, rose/pink arrow */}
                    <g className="opacity-100 group-hover:opacity-0 transition-opacity duration-300">
                      <circle cx="22" cy="22" r="21" stroke="#BD3A53" strokeWidth="1.5" fill="transparent" />
                      <path
                        d="M16 28L28 16M28 16H19M28 16V25"
                        stroke="#BD3A53"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                    </g>

                    {/* Hover State: Full white circle with transparent cutout arrow */}
                    <g className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <circle
                        cx="22"
                        cy="22"
                        r="21.5"
                        fill="white"
                        mask="url(#arrow-cutout-marketplace)"
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
                <div className="w-px flex-1 bg-[#BD3A53]/40 group-hover:bg-white group-hover:drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] transition-all duration-300" />
                <span className="tategaki font-kanji text-2xl sm:text-3xl text-[#BD3A53]/40 group-hover:text-white group-hover:drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] transition-all duration-300 flex-shrink-0">
                  市場
                </span>
              </div>
            </div>
          </a>

          {/* Card 3: Benefit Anggota / Coming Soon */}
          <div
            id="feature-card-benefit"
            role="button"
            tabIndex={0}
            onClick={() => setIsBenefitModalOpen(true)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setIsBenefitModalOpen(true);
              }
            }}
            aria-label="Lihat Benefit Anggota"
            className="gateway-feature-card group rounded-3xl bg-[#FFF6EE] shadow-[0_8px_30px_-8px_rgba(168,74,28,0.12)] relative overflow-hidden isolate transform-gpu transition-shadow duration-300 hover:shadow-[0_20px_40px_-10px_rgba(168,74,28,0.3)] cursor-pointer block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
          >
            {/* Background Layer (Z-0): Photo clipped with custom inner radius so it sits completely inside the blur layer */}
            <div className="absolute inset-0 z-0 rounded-[26px] overflow-hidden pointer-events-none">
              <img
                src={cardBenefitBg}
                alt="Latar Belakang Hadiah & Benefit Anggota"
                className="w-full h-full object-cover object-center rounded-[26px]"
                loading="lazy"
              />
            </div>

            {/* Hover Contrast Scrim (Z-1): Fades in when front tint layer disappears to ensure perfect contrast */}
            <div
              className="absolute inset-0 z-[1] rounded-3xl bg-black/55 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
              aria-hidden="true"
            />

            {/* Front Tinted Layer (Z-2): Normal soft card color with backdrop-blur, covering completely with outer radius */}
            <div
              className="absolute inset-0 z-[2] rounded-3xl bg-[#FFF6EE]/90 backdrop-blur-[2px] opacity-100 group-hover:opacity-0 transition-opacity duration-300 pointer-events-none"
              aria-hidden="true"
            />

            {/* Top Crisp Border Overlay (Z-20): Eliminates any subpixel seam/fringe between photo and card edge */}
            <div
              className="absolute inset-0 z-20 rounded-3xl border border-amber-200/80 pointer-events-none transition-colors duration-300"
              aria-hidden="true"
            />

            {/* Interactive Content Layer (Z-10) */}
            <div className="relative z-10 p-6 sm:p-7 flex flex-col justify-between h-full min-h-[340px]">
              {/* Top Section */}
              <div>
                {/* Number 03 (Direct full number without box container) */}
                <span className="block font-serif font-bold text-4xl sm:text-[44px] leading-none text-[#A84A1C] group-hover:text-white group-hover:drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)] tracking-tight mb-4 select-none transition-colors duration-300">
                  03
                </span>

                {/* Title with Coming Soon Tag */}
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-serif font-bold text-2xl sm:text-3xl text-[#A84A1C] group-hover:text-white group-hover:drop-shadow-[0_2px_6px_rgba(0,0,0,0.85)] leading-snug transition-colors duration-300">
                    Coming Soon
                  </h3>
                  <span className="text-[10px] font-semibold tracking-wide uppercase px-2 py-0.5 rounded-full bg-amber-100/80 text-amber-900 border border-amber-200/90 group-hover:bg-white/20 group-hover:text-white group-hover:border-white/40 group-hover:backdrop-blur-md transition-all duration-300">
                    Coming Soon
                  </span>
                </div>

                {/* Description */}
                <p className="mt-2 text-xs sm:text-sm text-[#4E392F] group-hover:text-white/95 group-hover:drop-shadow-[0_1px_4px_rgba(0,0,0,0.85)] leading-relaxed max-w-[220px] font-medium transition-colors duration-300">
                  Coming soon system
                </p>
              </div>

              {/* Bottom Section: Action Icon Button */}
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
                      <mask id="arrow-cutout-benefit">
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

                    {/* Normal State: Transparent background, amber/terracotta border, amber/terracotta arrow */}
                    <g className="opacity-100 group-hover:opacity-0 transition-opacity duration-300">
                      <circle cx="22" cy="22" r="21" stroke="#A84A1C" strokeWidth="1.5" fill="transparent" />
                      <path
                        d="M16 28L28 16M28 16H19M28 16V25"
                        stroke="#A84A1C"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                    </g>

                    {/* Hover State: Full white circle with transparent cutout arrow */}
                    <g className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <circle
                        cx="22"
                        cy="22"
                        r="21.5"
                        fill="white"
                        mask="url(#arrow-cutout-benefit)"
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
                <div className="w-px flex-1 bg-[#A84A1C]/40 group-hover:bg-white group-hover:drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] transition-all duration-300" />
                <span className="tategaki font-kanji text-2xl sm:text-3xl text-[#A84A1C]/40 group-hover:text-white group-hover:drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] transition-all duration-300 flex-shrink-0">
                  近日公開
                </span>
              </div>
            </div>
          </div>
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
                  <h4 className="font-serif font-bold text-xl text-[#0B4A25]">
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
