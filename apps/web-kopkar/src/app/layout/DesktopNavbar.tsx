import React from 'react';
import { BarChart3, ShoppingBag, Package, Wallet, Bell } from 'lucide-react';
import { BrandLogo } from '../../components/brand/BrandLogo';
import { useRouter, type RoutePath } from '../router';
import { formatDateID } from '../../lib/utils';
import {
  ActiveBarChartIcon,
  ActiveShoppingBagIcon,
  ActivePackageIcon,
  ActiveWalletIcon,
} from './NavActiveIcons';

export const DesktopNavbar: React.FC = () => {
  const { currentPath, navigate } = useRouter();
  const dateInfo = formatDateID();

  const navItems = [
    {
      path: '/' as RoutePath,
      label: 'Beranda (Analisis)',
      icon: BarChart3,
      activeIcon: ActiveBarChartIcon,
    },
    {
      path: '/orders' as RoutePath,
      label: 'Pesanan',
      icon: ShoppingBag,
      activeIcon: ActiveShoppingBagIcon,
    },
    {
      path: '/products' as RoutePath,
      label: 'Produk',
      icon: Package,
      activeIcon: ActivePackageIcon,
    },
    {
      path: '/financial' as RoutePath,
      label: 'SinJam',
      icon: Wallet,
      activeIcon: ActiveWalletIcon,
    },
  ];

  return (
    <header className="hidden md:block sticky top-0 z-30 w-full bg-[#F8F4EC]/95 backdrop-blur-md border-b border-[#DED5C3] shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Left: Brand Identity */}
        <div
          onClick={() => navigate('/')}
          className="flex items-center gap-3.5 cursor-pointer group select-none"
        >
          <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center p-0.5 rounded-2xl bg-[#1F5B45] border border-[#2F6F56] shadow-sm group-hover:scale-105 transition-transform duration-200">
            <BrandLogo size={30} />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-heading font-extrabold text-xl text-[#1F5B45] tracking-tight group-hover:text-[#2F6F56] transition-colors">
                Koperasi Digital
              </span>
              <span className="text-[11px] font-accent font-semibold text-[#2F6F56] bg-[#A9C3A2]/25 px-2 py-0.5 rounded-full border border-[#A9C3A2]/50">
                PT SAI
              </span>
            </div>
            <span className="text-xs text-[#5C6F67] font-body">
              Analitik & Manajemen Terpadu
            </span>
          </div>
        </div>

        {/* Center: Desktop Navigation Tabs */}
        <nav className="flex items-center gap-1.5 bg-[#F3ECDD] p-1.5 rounded-2xl border border-[#DED5C3]">
          {navItems.map((item) => {
            const InactiveIcon = item.icon;
            const ActiveIcon = item.activeIcon;
            const isActive = currentPath === item.path || (item.path === '/products' && currentPath.startsWith('/products'));
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-[#1F5B45] text-white shadow-sm font-heading font-bold'
                    : 'text-[#5C6F67] hover:text-[#1F5B45] hover:bg-white/60 font-body font-medium'
                }`}
              >
                {isActive ? (
                  <ActiveIcon size={17} className="text-white" />
                ) : (
                  <InactiveIcon
                    size={17}
                    fill="none"
                    strokeWidth={1.8}
                    className="text-[#4F8A67]"
                  />
                )}
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right: Date widget & User Profile Pill */}
        <div className="flex items-center gap-3">
          <div className="text-right hidden lg:block pr-3 border-r border-[#DED5C3]">
            <p className="text-xs font-heading font-bold text-[#1A2421]">{dateInfo.fullDate}</p>
            <p className="text-[11px] text-[#5C6F67] font-body flex items-center justify-end gap-1">
              <span className="font-accent text-[#2F6F56] font-semibold">{dateInfo.kanjiEraDate}</span>
              <span>•</span>
              <span>{dateInfo.timeFormatted}</span>
            </p>
          </div>

          <button
            aria-label="Notifikasi"
            className="relative p-2.5 rounded-xl bg-[#F3ECDD] hover:bg-[#A9C3A2]/30 text-[#1F5B45] border border-[#DED5C3] transition-colors cursor-pointer"
          >
            <Bell size={18} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#DC4C70]" />
          </button>

          <div
            className="flex items-center gap-2.5 pl-1 pr-3 py-1 rounded-2xl bg-white border border-[#DED5C3] shadow-xs select-none"
          >
            <div className="w-8 h-8 rounded-full bg-[#1F5B45] text-white font-heading font-bold text-xs flex items-center justify-center ring-2 ring-[#A9C3A2]">
              AA
            </div>
            <div className="text-left">
              <p className="text-xs font-heading font-bold text-[#1A2421] leading-tight">Alexander A.</p>
              <p className="text-[10px] text-[#2F6F56] font-accent font-semibold leading-tight">Unit SAI B • Aktif</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
