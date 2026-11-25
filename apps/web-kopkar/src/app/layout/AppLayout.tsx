import React from 'react';
import { DesktopSidebar } from './DesktopSidebar';
import { DesktopHeader } from './DesktopHeader';
import { MobileHeader } from './MobileHeader';
import { MobileBottomNav } from './MobileBottomNav';
import { KopkarRoleModal } from '../../components/ui/KopkarRoleModal';

interface AppLayoutProps {
  children: React.ReactNode;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen w-full bg-[#FAF7EE] text-[#18221D] flex flex-col md:flex-row antialiased selection:bg-[#165239]/20 selection:text-[#165239]">
      {/* Desktop & Tablet Vertical Sidebar */}
      <DesktopSidebar />

      {/* Content Area Pane */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Desktop Sticky Header (>= md) */}
        <DesktopHeader />

        {/* Mobile Sticky Header (< md) */}
        <MobileHeader />

        {/* Main Content Area */}
        <main className="flex-1 w-full max-w-[1320px] mx-auto px-3.5 py-4 sm:p-7 space-y-5 sm:space-y-6 pb-28 md:pb-8 min-w-0 overflow-x-hidden">
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
