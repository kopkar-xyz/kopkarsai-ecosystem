import React from 'react';
import { ShieldCheck } from 'lucide-react';

interface MarketplaceFooterProps {
  isDetailOpen?: boolean;
}

/**
 * MarketplaceFooter — Footer Simpel & Minimalis KopKar SAI
 * Slicing 1:1 sesuai media_1795491010399_f26cf378.png.
 * 3 Kolom: Brand info, Jam layanan, Kontak + Copyright & 100% Halal badge.
 * Budget: < 200 LOC.
 */
export const MarketplaceFooter: React.FC<MarketplaceFooterProps> = ({ isDetailOpen = false }) => {
  return (
    <footer
      className={`w-full border-t border-[#EAE3D5] text-[#1A1615] pt-8 pb-24 sm:pb-10 mt-auto select-none ${
        isDetailOpen ? 'hidden lg:block' : 'block'
      }`}
    >
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* 3-Column Content Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-12 pb-8">
          {/* Col 1: Brand Info */}
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-heading font-bold text-base sm:text-lg text-[#83273B] tracking-wide">
                KOPKARSAI
              </span>
              <span className="font-kanji text-sm text-[#8C827A] font-normal">
                和食
              </span>
            </div>
            <p className="text-xs sm:text-[13px] text-[#665E60] leading-relaxed mt-2.5 max-w-sm">
              Jajanan pasar, roti, dan santapan harian untuk anggota dan karyawan PT SAI.
            </p>
          </div>

          {/* Col 2: Jam Layanan */}
          <div>
            <h4 className="font-bold text-xs sm:text-[13px] text-[#1A1615]">
              Jam layanan
            </h4>
            <div className="text-xs text-[#665E60] mt-2.5 space-y-1 leading-relaxed">
              <p>Senin sampai Jumat</p>
              <p>07:00 – 17:00 WIB</p>
              <p className="pt-1.5 text-[#665E60]">
                Pesan PO H-1 sebelum 15:00 WIB
              </p>
            </div>
          </div>

          {/* Col 3: Kontak */}
          <div>
            <h4 className="font-bold text-xs sm:text-[13px] text-[#1A1615]">
              Kontak
            </h4>
            <div className="text-xs text-[#665E60] mt-2.5 space-y-1 leading-relaxed">
              <p>WhatsApp 0812-3456-7890</p>
              <p>Counter Lantai 2, Gedung Serbaguna SAI</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & 100% Halal */}
        <div className="pt-4 border-t border-[#EAE3D5] flex items-center justify-between text-xs text-[#8C827A]">
          <p>© 2026 Kopkarsai</p>
          <div className="flex items-center gap-1.5 text-[#2E6B4F] font-medium text-xs">
            <ShieldCheck className="w-4 h-4 text-[#2E6B4F]" />
            <span>100% Halal</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
