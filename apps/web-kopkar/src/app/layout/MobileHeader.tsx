import React, { useState } from 'react';
import { Bell, Menu } from 'lucide-react';
import { BrandLogo } from '../../components/brand/BrandLogo';
import { useRouter } from '../router';
import { getKopkarPageMeta } from './navConfig';
import { MobileMenuDrawer } from './MobileMenuDrawer';

/**
 * MobileHeader — Satu-satunya header untuk tampilan mobile (< md).
 * Mengikuti desain navbar bawah pada referensi: logo KopKar hijau-emas,
 * judul halaman dengan bobot font-semibold (1 tingkat lebih ringan dari bold),
 * subjudul Kanji, tombol notifikasi, avatar profil AA, dan menu drawer.
 * Budget: < 200 LOC.
 */
export const MobileHeader: React.FC = () => {
  const { currentPath, navigate } = useRouter();
  const [notifOpen, setNotifOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const headerInfo = getKopkarPageMeta(currentPath);

  return (
    <>
      <header className="md:hidden sticky top-0 z-30 w-full bg-[#FAF7EE]/95 backdrop-blur-md border-b border-[#EAE4D3] px-3.5 py-2.5 select-none">
        <div className="flex items-center justify-between gap-2.5">
          {/* Left: KopKar Logo + Page Title & Kanji Subtitle */}
          <div className="flex items-center gap-2.5 min-w-0">
            <button
              type="button"
              onClick={() => navigate('/')}
              aria-label="Beranda Koperasi"
              className="w-10 h-10 rounded-2xl bg-[#165239] border border-[#2F6F56] flex items-center justify-center p-1 shrink-0 shadow-xs cursor-pointer active:scale-95 transition-transform"
            >
              <BrandLogo size={26} />
            </button>
            <div className="min-w-0">
              <h1 className="text-[16.5px] font-sans font-semibold text-[#18221D] leading-tight truncate">
                {headerInfo.title}
              </h1>
              <p className="text-[11px] font-kanji text-[#526058] tracking-widest leading-tight mt-0.5 truncate">
                {headerInfo.kanji}
              </p>
            </div>
          </div>

          {/* Right: Notifications, Profile Circle, & All-Menus Drawer Trigger */}
          <div className="flex items-center gap-1.5 shrink-0">
            <div className="relative">
              <button
                type="button"
                onClick={() => setNotifOpen((prev) => !prev)}
                aria-label="Pusat Notifikasi"
                className="relative w-9 h-9 rounded-xl bg-white text-[#165239] border border-[#EAE4D3] flex items-center justify-center shadow-xs active:scale-95 transition-transform cursor-pointer"
              >
                <Bell size={17} />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#DC4C70]" />
              </button>

              {notifOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl border border-[#EAE4D3] shadow-lg z-40 p-4">
                  <div className="flex items-center justify-between pb-2.5 border-b border-[#EAE4D3]">
                    <span className="text-[13px] font-semibold text-[#18221D]">
                      Notifikasi
                    </span>
                    <button
                      type="button"
                      onClick={() => setNotifOpen(false)}
                      className="text-[12px] font-medium text-[#165239] cursor-pointer"
                    >
                      Tutup
                    </button>
                  </div>
                  <div className="py-2 text-[12px] text-[#526058]">
                    Tidak ada notifikasi baru saat ini.
                  </div>
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={() => navigate('/profile')}
              aria-label="Profil Saya"
              className="w-9 h-9 rounded-full bg-[#165239] text-white font-sans font-semibold text-xs flex items-center justify-center ring-2 ring-[#A9C3A2] shadow-xs active:scale-95 transition-transform cursor-pointer"
            >
              AA
            </button>

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Buka semua menu"
              className="w-9 h-9 rounded-xl bg-white text-[#165239] border border-[#EAE4D3] flex items-center justify-center shadow-xs active:scale-95 transition-transform cursor-pointer"
            >
              <Menu size={17} />
            </button>
          </div>
        </div>
      </header>

      <MobileMenuDrawer open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
};
