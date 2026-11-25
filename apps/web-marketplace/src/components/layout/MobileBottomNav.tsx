import React from 'react';
import { Tag, ShoppingBag, HelpCircle, Store } from 'lucide-react';
import { CategoryIcons } from '../../data/categories';
import { RoutePath } from '../../app/router';
import { UserProfile } from '../../types/auth';

interface MobileBottomNavProps {
  activeFilter: 'all' | 'promo';
  onFilterChange: (filter: 'all' | 'promo') => void;
  cartCount: number;
  currentPath: RoutePath;
  onNavigate: (path: RoutePath) => void;
  onOpenCart: () => void;
  currentUser?: UserProfile;
}

/**
 * MobileBottomNav — Navigasi Bawah Sticky Sesuai Gambar Referensi Mobile
 * 4 Tab: Katalog, Promo, Pesanan (dengan badge), Bantuan.
 * Budget: < 200 LOC.
 */
export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  activeFilter,
  onFilterChange,
  cartCount,
  currentPath,
  onNavigate,
  currentUser,
}) => {
  return (
    <nav
      aria-label="Navigasi Bawah Mobile"
      className="xl:hidden fixed bottom-0 left-0 w-full z-40 bg-white/95 backdrop-blur-xl border-t border-[#EAE3D5] shadow-[0_-4px_16px_rgba(0,0,0,0.06)] px-2 py-1.5 pb-[calc(0.4rem+env(safe-area-inset-bottom,0px))] select-none"
    >
      <div className="max-w-xl mx-auto flex items-center justify-around">
        {/* 1. Katalog */}
        <button
          type="button"
          onClick={() => {
            onNavigate('/');
            onFilterChange('all');
          }}
          className={`flex flex-col items-center gap-0.5 py-1 px-3.5 rounded-2xl transition-all cursor-pointer ${
            currentPath === '/' && activeFilter === 'all'
              ? 'text-[#83273B] font-bold bg-[#FDF0F3]'
              : 'text-[#665E60] hover:text-[#1A1615]'
          }`}
        >
          <div className="w-5 h-5 flex items-center justify-center">
            <CategoryIcons.Jajanan />
          </div>
          <span className="text-[10px]">Katalog</span>
        </button>

        {/* 2. Promo */}
        <button
          type="button"
          onClick={() => {
            onNavigate('/');
            onFilterChange('promo');
          }}
          className={`flex flex-col items-center gap-0.5 py-1 px-3 rounded-2xl transition-all cursor-pointer ${
            currentPath === '/' && activeFilter === 'promo'
              ? 'text-[#83273B] font-bold bg-[#FDF0F3]'
              : 'text-[#665E60] hover:text-[#1A1615]'
          }`}
        >
          <Tag className="w-5 h-5" />
          <span className="text-[10px]">Promo</span>
        </button>

        {/* 3. Pesanan (dengan badge pesanan) */}
        <button
          type="button"
          onClick={() => onNavigate('/orders')}
          className={`relative flex flex-col items-center gap-0.5 py-1 px-3 rounded-2xl transition-all cursor-pointer ${
            currentPath === '/orders'
              ? 'text-[#83273B] font-bold bg-[#FDF0F3]'
              : 'text-[#665E60] hover:text-[#1A1615]'
          }`}
        >
          <div className="relative">
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1.5 min-w-[15px] h-[15px] px-0.5 bg-[#83273B] text-white text-[8px] font-bold rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </div>
          <span className="text-[10px]">Pesanan</span>
        </button>

        {/* 4. Bantuan */}
        <button
          type="button"
          onClick={() => onNavigate('/help')}
          className={`flex flex-col items-center gap-0.5 py-1 px-3 rounded-2xl transition-all cursor-pointer ${
            currentPath === '/help'
              ? 'text-[#83273B] font-bold bg-[#FDF0F3]'
              : 'text-[#665E60] hover:text-[#1A1615]'
          }`}
        >
          <HelpCircle className="w-5 h-5" />
          <span className="text-[10px]">Bantuan</span>
        </button>

        {/* 5. Kasir Toko - Hanya untuk ADMIN_TOKO */}
        {currentUser?.role === 'ADMIN_TOKO' && (
          <button
            type="button"
            onClick={() => onNavigate('/cashier')}
            className={`flex flex-col items-center gap-0.5 py-1 px-3 rounded-2xl transition-all cursor-pointer ${
              currentPath === '/cashier'
                ? 'text-[#83273B] font-bold bg-[#FDF0F3]'
                : 'text-[#665E60] hover:text-[#1A1615]'
            }`}
          >
            <Store className="w-5 h-5" />
            <span className="text-[10px]">Kasir</span>
          </button>
        )}
      </div>
    </nav>
  );
};
