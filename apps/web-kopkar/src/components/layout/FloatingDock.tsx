import React from 'react';
import { Home, Calculator, Store, User } from 'lucide-react';
import { NavTabId } from '../../types';
import { cn } from '../../lib/utils';

interface FloatingDockProps {
  activeTab: NavTabId;
  onTabChange: (tab: NavTabId) => void;
  pendingPoCount?: number;
}

export const FloatingDock: React.FC<FloatingDockProps> = ({
  activeTab,
  onTabChange,
  pendingPoCount = 2,
}) => {
  const navItems = [
    { id: 'home' as NavTabId, label: 'Beranda', icon: Home },
    { id: 'financial' as NavTabId, label: 'Pinjaman', icon: Calculator },
    { id: 'supplier' as NavTabId, label: 'Usaha', icon: Store, badge: pendingPoCount },
    { id: 'profile' as NavTabId, label: 'Akun', icon: User },
  ];

  return (
    <div className="fixed bottom-4 left-0 right-0 z-40 max-w-md mx-auto px-5 pointer-events-none">
      {/* Floating Pill Container matching Image 1 wireframe */}
      <nav className="pointer-events-auto bg-kopkar-dock text-white rounded-full p-2 shadow-dock border border-emerald-900/40 flex items-center justify-between backdrop-blur-md">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={cn(
                'relative flex items-center justify-center transition-all duration-300 rounded-full focus:outline-none select-none',
                isActive
                  ? 'bg-white text-kopkar-dock w-12 h-12 shadow-md scale-105'
                  : 'text-slate-300 hover:text-white w-11 h-11 hover:bg-white/10 active:scale-95'
              )}
              aria-label={item.label}
              title={item.label}
            >
              <Icon size={isActive ? 20 : 19} strokeWidth={isActive ? 2.5 : 2} />

              {/* Pending Notification Dot on Inactive Tab */}
              {!isActive && item.badge && item.badge > 0 && (
                <span className="absolute top-2 right-2 w-2 h-2 bg-kopkar-gold rounded-full ring-2 ring-kopkar-dock animate-pulse" />
              )}
            </button>
          );
        })}
      </nav>
    </div>
  );
};
