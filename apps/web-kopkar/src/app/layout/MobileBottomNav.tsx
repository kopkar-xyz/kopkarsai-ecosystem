import React from 'react';
import { BarChart3, ShoppingBag, Package, Wallet } from 'lucide-react';
import { useRouter, type RoutePath } from '../router';
import {
  ActiveBarChartIcon,
  ActiveShoppingBagIcon,
  ActivePackageIcon,
  ActiveWalletIcon,
} from './NavActiveIcons';

export const MobileBottomNav: React.FC = () => {
  const { currentPath, navigate } = useRouter();

  const navItems = [
    {
      path: '/' as RoutePath,
      label: 'Beranda',
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
    <nav
      aria-label="Navigasi Bawah Smartphone"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 w-full bg-[#1F5B45] border-t border-[#2F6F56] shadow-dock"
    >
      <div className="max-w-md mx-auto px-3 py-2 pb-3.5 flex items-center justify-around">
        {navItems.map((item) => {
          const isActive =
            currentPath === item.path ||
            (item.path === '/products' && currentPath.startsWith('/products'));
          const InactiveIcon = item.icon;
          const ActiveIcon = item.activeIcon;

          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center justify-center flex-1 py-1 transition-all duration-150 select-none cursor-pointer ${
                isActive ? 'text-white' : 'text-[#A9C3A2] hover:text-white'
              }`}
            >
              {/* Active = Solid Revert Variant (With Cutouts); Inactive = Clean Outline */}
              <div className="relative flex items-center justify-center">
                {isActive ? (
                  <ActiveIcon
                    size={23}
                    className="scale-105 drop-shadow-sm transition-transform duration-150 text-white"
                  />
                ) : (
                  <InactiveIcon
                    size={23}
                    fill="none"
                    strokeWidth={1.8}
                    className="opacity-85 transition-opacity duration-150"
                  />
                )}
              </div>

              <span
                className={`text-[11px] mt-1 tracking-tight font-geist transition-all ${
                  isActive ? 'font-bold text-white' : 'font-medium text-[#A9C3A2]/90'
                }`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
