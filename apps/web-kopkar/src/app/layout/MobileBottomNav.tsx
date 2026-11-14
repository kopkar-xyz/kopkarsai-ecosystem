import React from 'react';
import { BarChart3, ShoppingBag, Package, Wallet } from 'lucide-react';
import { useRouter, type RoutePath } from '../router';

export const MobileBottomNav: React.FC = () => {
  const { currentPath, navigate } = useRouter();

  const navItems: { path: RoutePath; label: string; icon: typeof BarChart3 }[] = [
    { path: '/', label: 'Beranda', icon: BarChart3 },
    { path: '/orders', label: 'Pesanan', icon: ShoppingBag },
    { path: '/products', label: 'Produk', icon: Package },
    { path: '/financial', label: 'SinJam', icon: Wallet },
  ];

  return (
    <nav
      aria-label="Navigasi Bawah Smartphone"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 w-full bg-[#1F5B45] border-t border-[#2F6F56] shadow-dock"
    >
      <div className="max-w-md mx-auto px-3 py-2 pb-3.5 flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPath === item.path || (item.path === '/products' && currentPath.startsWith('/products'));

          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center justify-center flex-1 py-1 transition-all duration-150 select-none cursor-pointer ${
                isActive ? 'text-white' : 'text-[#A9C3A2] hover:text-white'
              }`}
            >
              {/* Active = Fill; Inactive = Outline */}
              <div className="relative">
                <Icon
                  size={23}
                  fill={isActive ? 'currentColor' : 'none'}
                  strokeWidth={isActive ? 2.2 : 1.8}
                  className={`transition-all duration-150 ${
                    isActive ? 'scale-105 drop-shadow-sm' : 'opacity-85'
                  }`}
                />
              </div>

              <span
                className={`text-[11px] mt-1 tracking-tight font-heading transition-all ${
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
