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

  // Hilangkan mobile header pada halaman Pesanan, Produk, dan SinJam
  const showMobileHeader =
    currentPath !== '/orders' &&
    currentPath !== '/products' &&
    currentPath !== '/financial';

  return (
    <div className="min-h-screen w-full bg-[#F3ECDD] text-[#1A2421] flex flex-col antialiased selection:bg-[#A9C3A2]/40 selection:text-[#1F5B45]">
      {/* Desktop Top Navbar */}
      <DesktopNavbar />

      {/* Mobile Top Header */}
      {showMobileHeader && <MobileHeader />}

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8 pb-20 md:pb-12">
        {children}
      </main>

      {/* Mobile Full-Green Bottom Nav */}
      <MobileBottomNav />
    </div>
  );
};
