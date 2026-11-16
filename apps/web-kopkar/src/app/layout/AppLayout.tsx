import React from 'react';
import { DesktopSidebar } from './DesktopSidebar';
import { DesktopHeader } from './DesktopHeader';
import { MobileHeader } from './MobileHeader';
import { MobileBottomNav } from './MobileBottomNav';
import { useRouter } from '../router';

interface AppLayoutProps {
  children: React.ReactNode;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const { currentPath } = useRouter();

  // Hilangkan mobile header pada halaman utama (Beranda, Pesanan, Produk, Produk Baru/Detail, dan SinJam)
  const showMobileHeader =
    currentPath !== '/' &&
    currentPath !== '/orders' &&
    currentPath !== '/products' &&
    currentPath !== '/products/new' &&
    currentPath !== '/products/detail' &&
    currentPath !== '/financial';

  return (
    <div className="relative min-h-screen w-full bg-[#F3ECDD] text-[#1A2421] flex flex-col md:flex-row antialiased selection:bg-[#A9C3A2]/40 selection:text-[#1F5B45]">
      {/* Background Kanji Watermark (協同組合 / Kyōdō Kumiai) — Tampil Dinamis pada Mobile & Desktop */}
      <div
        aria-hidden="true"
        className="fixed inset-0 md:left-60 lg:left-64 z-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
      >
        <span
          className="tategaki font-kanji text-[clamp(96px,12vmin,200px)] font-black text-[#1F5B45]/[0.05] md:text-[#1F5B45]/[0.06] tracking-[0.18em] select-none"
        >
          協同組合
        </span>
      </div>

      {/* Desktop & Tablet Vertical Sidebar */}
      <DesktopSidebar />

      {/* Content Area Pane */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Desktop Sticky Header */}
        <DesktopHeader />

        {/* Mobile Top Header (hanya untuk mobile di luar route utama) */}
        {showMobileHeader && <MobileHeader />}

        {/* Main Content Area — Dinamis memenuhi lebar layar tanpa gap kaku */}
        <main className="relative z-10 flex-1 w-full px-4 sm:px-6 lg:px-8 pt-3.5 sm:pt-4 md:pt-4 pb-36 md:pb-8">
          {children}
        </main>
      </div>

      {/* Mobile Full-Green Bottom Nav */}
      <MobileBottomNav />
    </div>
  );
};
