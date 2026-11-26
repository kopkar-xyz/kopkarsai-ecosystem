import React from 'react';
import { DesktopSidebar } from './DesktopSidebar';
import { DesktopHeader } from './DesktopHeader';
import { MobileHeader } from './MobileHeader';
import { MobileBottomNav } from './MobileBottomNav';
import { KopkarRoleModal } from '../../components/ui/KopkarRoleModal';
import { useRouter } from '../router';
import { getKopkarPageMeta } from './navConfig';

interface AppLayoutProps {
  children: React.ReactNode;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const { currentPath } = useRouter();
  const pageMeta = getKopkarPageMeta(currentPath);

  return (
    <div className="min-h-screen w-full bg-[#FAF7EE] text-[#18221D] flex flex-col md:flex-row antialiased selection:bg-[#165239]/20 selection:text-[#165239]">
      {/* Desktop & Tablet Vertical Sidebar */}
      <DesktopSidebar />

      {/* Content Area Pane */}
      <div className="flex-1 flex flex-col min-w-0 relative">
        {/* Centered Japanese Kanji Watermark Background */}
        <div
          aria-hidden="true"
          className="fixed inset-0 md:left-[256px] pointer-events-none select-none flex items-center justify-center overflow-hidden z-0"
        >
          <div className="relative flex flex-col items-center justify-center text-center px-6">
            <div className="absolute w-[250px] h-[250px] sm:w-[400px] sm:h-[400px] rounded-full border border-[#165239]/[0.045]" />
            <div className="absolute w-[200px] h-[200px] sm:w-[320px] sm:h-[320px] rounded-full border border-dashed border-[#165239]/[0.04]" />
            <span className="text-[52px] sm:text-[96px] lg:text-[128px] font-bold tracking-[0.18em] text-[#165239]/[0.045] leading-none whitespace-nowrap">
              {pageMeta.kanji}
            </span>
            <span className="mt-3 text-[10px] sm:text-[12px] font-semibold tracking-[0.35em] uppercase text-[#165239]/[0.07]">
              組合 · KOPKAR PT SAI
            </span>
          </div>
        </div>

        {/* Desktop Sticky Header (>= md) */}
        <DesktopHeader />

        {/* Mobile Sticky Header (< md) */}
        <MobileHeader />

        {/* Main Content Area */}
        <main className="relative z-10 flex-1 w-full max-w-[1320px] mx-auto px-3.5 py-4 sm:p-7 space-y-5 sm:space-y-6 pb-28 md:pb-8 min-w-0 overflow-x-hidden">
          {children}
        </main>
      </div>

      {/* Mobile Full-Green Bottom Nav */}
      <MobileBottomNav />

      {/* Role Switcher Modal (Triggered by Profile in Navbar/Sidebar) */}
      <KopkarRoleModal />
    </div>
  );
};
