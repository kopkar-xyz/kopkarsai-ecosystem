import React from 'react';
import { Bell } from 'lucide-react';
import { useRouter } from '../router';
import { formatDateID } from '../../lib/utils';

interface PageHeaderMeta {
  title: string;
  kanji: string;
}

/**
 * DesktopHeader — Header desktop/tablet selaras dengan gaya mobile
 * Menampilkan Judul & Kanji Subtitle tanpa ikon di kiri, tanpa background color,
 * tanpa search bar, serta dengan jarak vertikal yang ringkas.
 * Budget: < 200 LOC.
 */
export const DesktopHeader: React.FC = () => {
  const { currentPath, navigate } = useRouter();
  const dateInfo = formatDateID();

  const getHeaderInfo = (path: string): PageHeaderMeta => {
    switch (path) {
      case '/':
        return {
          title: 'Beranda Koperasi',
          kanji: '業績管理',
        };
      case '/orders':
        return {
          title: 'Pesanan Produk',
          kanji: '受注管理',
        };
      case '/products':
        return {
          title: 'Katalog Produk Mitra',
          kanji: '提携商品一覧',
        };
      case '/products/new':
        return {
          title: 'Ajukan Produk Baru',
          kanji: '新規商品申請',
        };
      case '/products/detail':
        return {
          title: 'Detail Produk Mitra',
          kanji: '商品詳細',
        };
      case '/financial':
        return {
          title: 'Layanan SinJam (Simpan Pinjam)',
          kanji: '貯蓄融資管理',
        };
      case '/profile':
        return {
          title: 'Profil Anggota',
          kanji: '会員情報',
        };
      default:
        return {
          title: 'Beranda Koperasi',
          kanji: '業績管理',
        };
    }
  };

  const headerInfo = getHeaderInfo(currentPath);

  return (
    <header className="hidden md:flex items-center justify-between px-4 sm:px-6 lg:px-8 pt-3.5 pb-2.5 border-b border-[#DED5C3] select-none">
      {/* 1. Left: Page Title & Kanji Subtitle (Tanpa Ikon) */}
      <div className="min-w-0">
        <h1 className="text-xl sm:text-2xl font-heading font-extrabold text-[#1A2421] leading-tight truncate">
          {headerInfo.title}
        </h1>
        <p className="text-xs sm:text-sm font-kanji text-[#5C6F67] tracking-widest leading-none mt-0.5">
          {headerInfo.kanji}
        </p>
      </div>

      {/* 2. Right Actions: Date Widget, Notifications, Profile Pill */}
      <div className="flex items-center gap-3 lg:gap-4 flex-shrink-0">
        {/* Calendar & Era Date (Kyoto Heritage Accent) */}
        <div className="text-right hidden xl:block pr-3.5 border-r border-[#DED5C3]">
          <p className="text-xs font-heading font-extrabold text-[#1A2421] leading-tight">
            {dateInfo.fullDate}
          </p>
          <p className="text-[11px] text-[#5C6F67] font-body flex items-center justify-end gap-1.5 mt-0.5">
            <span className="font-kanji text-[#1F5B45] tracking-wide">
              {dateInfo.kanjiEraDate}
            </span>
            <span className="text-[#8FA39A]">•</span>
            <span>{dateInfo.timeFormatted}</span>
          </p>
        </div>

        {/* Notification Bell with Red Badge */}
        <button
          type="button"
          aria-label="Pusat Notifikasi"
          className="relative p-2 rounded-xl bg-white hover:bg-[#F3ECDD] text-[#1F5B45] border border-[#DED5C3] shadow-xs active:scale-95 transition-all cursor-pointer"
        >
          <Bell size={18} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#DC4C70]" />
        </button>

        {/* User Profile Pill (Alexander Agung) */}
        <div
          onClick={() => navigate('/profile')}
          className="flex items-center gap-2.5 pl-1.5 pr-3.5 py-1 rounded-2xl bg-white hover:bg-[#F3ECDD]/60 border border-[#DED5C3] shadow-xs active:scale-98 transition-all cursor-pointer group"
        >
          <div className="w-8 h-8 rounded-full bg-[#1F5B45] text-white font-heading font-extrabold text-xs flex items-center justify-center ring-2 ring-[#A9C3A2] group-hover:scale-105 transition-transform flex-shrink-0">
            AA
          </div>
          <div className="text-left min-w-0">
            <p className="text-xs font-heading font-bold text-[#1A2421] leading-tight truncate">
              Alexander Agung
            </p>
            <p className="text-[10px] text-[#2F6F56] font-accent font-semibold leading-tight">
              Production
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};
