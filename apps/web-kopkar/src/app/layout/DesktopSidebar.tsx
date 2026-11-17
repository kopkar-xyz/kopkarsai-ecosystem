import React from 'react';
import {
  BarChart3,
  ShoppingBag,
  Package,
  Wallet,
  User,
  type LucideIcon,
} from 'lucide-react';
import { BrandLogo } from '../../components/brand/BrandLogo';
import { useRouter, type RoutePath } from '../router';
import {
  ActiveBarChartIcon,
  ActiveShoppingBagIcon,
  ActivePackageIcon,
  ActiveWalletIcon,
} from './NavActiveIcons';

interface NavItem {
  path: RoutePath;
  label: string;
  icon: LucideIcon;
  activeIcon: LucideIcon | React.ComponentType<{ size?: number; className?: string }>;
  badge?: number;
}

const NAV_ITEMS: NavItem[] = [
  { path: '/' as RoutePath, label: 'Beranda', icon: BarChart3, activeIcon: ActiveBarChartIcon },
  { path: '/orders' as RoutePath, label: 'Pesanan Produk', icon: ShoppingBag, activeIcon: ActiveShoppingBagIcon, badge: 2 },
  { path: '/products' as RoutePath, label: 'Katalog Produk', icon: Package, activeIcon: ActivePackageIcon },
  { path: '/financial' as RoutePath, label: 'Layanan SinJam', icon: Wallet, activeIcon: ActiveWalletIcon },
  { path: '/profile' as RoutePath, label: 'Profil Anggota', icon: User, activeIcon: User },
];

/**
 * DesktopSidebar — Navigasi vertikal permanen untuk Desktop & Tablet
 * Mengadopsi palet Hijau Deep Forest (#1F5B45) dengan active tab Warm Cream (#F3ECDD).
 * Menggunakan font Geist untuk menu & label dengan profil pengguna di bagian bawah.
 * Budget: < 200 LOC.
 */
export const DesktopSidebar: React.FC = () => {
  const { currentPath, navigate } = useRouter();

  return (
    <aside
      aria-label="Sidebar Utama Desktop"
      className="hidden md:flex flex-col justify-between w-60 lg:w-64 h-screen sticky top-0 z-30 bg-[#1F5B45] text-white border-r border-[#2F6F56] shadow-md flex-shrink-0 select-none overflow-y-auto"
    >
      {/* 1. Brand Identity Header */}
      <div className="p-5 lg:p-6 pb-4 border-b border-[#2F6F56]">
        <div
          onClick={() => navigate('/')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-2xl bg-[#174736] border border-[#2F6F56] flex items-center justify-center p-1 shadow-xs group-hover:scale-105 transition-transform">
            <BrandLogo size={26} />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="font-heading font-extrabold text-base lg:text-lg text-white tracking-tight leading-tight">
                KOPKARSAI
              </span>
            </div>
            <p className="text-[11px] font-sans font-medium text-[#A9C3A2] leading-tight">
              Koperasi Digital PT SAI
            </p>
          </div>
        </div>
      </div>

      {/* 2. Vertical Navigation Menu */}
      <nav className="flex-1 px-3 lg:px-4 py-4 space-y-1.5">
        <p className="px-3 pb-1 text-[10px] font-heading font-semibold uppercase tracking-widest text-[#A9C3A2]/80">
          Menu Utama
        </p>
        {NAV_ITEMS.map((item) => {
          const InactiveIcon = item.icon;
          const ActiveIcon = item.activeIcon;
          const isActive =
            currentPath === item.path ||
            (item.path === '/products' && currentPath.startsWith('/products'));

          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center gap-3 px-3.5 lg:px-4 py-3 rounded-2xl text-xs lg:text-sm transition-all duration-200 cursor-pointer text-left group ${
                isActive
                  ? 'bg-[#F3ECDD] text-[#1F5B45] font-heading font-semibold shadow-sm'
                  : 'text-[#A9C3A2] hover:text-white hover:bg-white/10 font-heading font-medium'
              }`}
            >
              <div className="flex-shrink-0">
                {isActive ? (
                  <ActiveIcon size={19} className="text-[#1F5B45]" />
                ) : (
                  <InactiveIcon
                    size={19}
                    strokeWidth={1.8}
                    className="text-[#A9C3A2] group-hover:text-white transition-colors"
                  />
                )}
              </div>
              <span className="truncate flex-1 tracking-wide">{item.label}</span>
              {item.badge && (
                <span
                  className={`ml-auto min-w-[20px] h-5 px-1.5 rounded-full text-[11px] font-sans font-bold flex items-center justify-center tabular-nums transition-colors ${
                    isActive
                      ? 'bg-[#1F5B45] text-white'
                      : 'bg-[#E5C07B] text-[#182B24]'
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* 3. Bottom User Profile Card (.me) */}
      <div className="p-3 lg:p-4 pt-3 border-t border-[#2F6F56] mt-auto">
        <div
          onClick={() => navigate('/profile')}
          className="flex items-center gap-3 p-2.5 rounded-2xl bg-[#174736]/70 border border-[#2F6F56] hover:bg-[#174736] transition-all cursor-pointer group select-none shadow-xs"
        >
          <div className="w-9 h-9 rounded-full bg-[#E5C07B] text-[#182B24] font-heading font-bold text-xs flex items-center justify-center flex-shrink-0 shadow-xs">
            AA
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-heading font-medium text-white truncate leading-tight group-hover:text-[#F3ECDD] transition-colors">
              Alexander Agung
            </p>
            <p className="text-[11px] font-sans text-[#A9C3A2] truncate leading-tight mt-0.5">
              Production
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
};
