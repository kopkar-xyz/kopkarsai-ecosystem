import React from 'react';
import { DesktopNavbar } from './DesktopNavbar';
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
    <div className="relative min-h-screen w-full bg-[#F3ECDD] text-[#1A2421] flex flex-col antialiased selection:bg-[#A9C3A2]/40 selection:text-[#1F5B45]">
      {/* Mobile Static Background Kanji Watermark (協同組合 / Kyōdō Kumiai dari web-gateway) */}
      <div
        aria-hidden="true"
        className="md:hidden fixed inset-0 z-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
      >
        <span
          className="tategaki font-kanji text-[96px] sm:text-[108px] font-black text-[#1F5B45]/[0.07] tracking-[0.18em] select-none"
        >
          協同組合
        </span>
      </div>

      {/* Desktop Top Navbar */}
      <DesktopNavbar />

      {/* Mobile Top Header */}
      {showMobileHeader && <MobileHeader />}

      {/* Main Content Area */}
      <main className="relative z-10 flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8 pb-36 sm:pb-32 md:pb-12">
        {children}
      </main>

      {/* Mobile Full-Green Bottom Nav */}
      <MobileBottomNav />
    </div>
  );
};
