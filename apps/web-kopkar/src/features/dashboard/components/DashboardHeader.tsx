import React from 'react';
import { Bell } from 'lucide-react';
import { BrandLogo } from '../../../components/brand/BrandLogo';
import { useRouter } from '../../../app/router';

/**
 * DashboardHeader — Header halaman Beranda Koperasi
 * Menggunakan Logo KopKar serta menyediakan akses Notifikasi & Profil pengguna di kanan atas.
 * Budget: < 200 LOC.
 */
export const DashboardHeader: React.FC = () => {
  const { navigate } = useRouter();

  return (
    <div className="md:hidden flex items-center justify-between gap-3 pb-3 border-b border-[#DED5C3]">
      {/* Left: KopKar Logo + Page Title & Subtitle */}
      <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
        <div
          onClick={() => navigate('/')}
          className="w-10 h-10 rounded-2xl bg-[#1F5B45] border border-[#2F6F56] flex items-center justify-center p-1 flex-shrink-0 shadow-xs cursor-pointer active:scale-95 transition-transform"
        >
          <BrandLogo size={26} />
        </div>
        <div className="min-w-0">
          <h1 className="text-lg sm:text-2xl font-heading font-extrabold text-[#1A2421] truncate sm:overflow-visible">
            Beranda Koperasi
          </h1>
          <p className="text-xs sm:text-sm font-kanji text-[#5C6F67] tracking-widest truncate sm:overflow-visible">
            業績管理
          </p>
        </div>
      </div>

      {/* Right: Notifications & Profile (Hanya untuk Mobile, di Desktop sudah diakomodasi DesktopHeader) */}
      <div className="flex md:hidden items-center gap-2 sm:gap-2.5 flex-shrink-0">
        <button
          type="button"
          aria-label="Pusat Notifikasi"
          className="relative p-2 rounded-xl bg-white text-[#1F5B45] border border-[#DED5C3] shadow-xs active:scale-95 hover:border-[#1F5B45] transition-all cursor-pointer"
        >
          <Bell size={18} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#DC4C70]" />
        </button>

        <button
          type="button"
          onClick={() => navigate('/profile')}
          aria-label="Profil Saya"
          className="w-9 h-9 rounded-full bg-[#1F5B45] text-white font-heading font-bold text-xs flex items-center justify-center ring-2 ring-[#A9C3A2] shadow-xs active:scale-95 transition-transform cursor-pointer"
        >
          AA
        </button>
      </div>
    </div>
  );
};
