import React from 'react';
import { Tag, ShoppingBag, HelpCircle } from 'lucide-react';
import { CategoryIcons } from '../../data/categories';

interface MobileBottomNavProps {
  activeFilter: 'all' | 'promo';
  onFilterChange: (filter: 'all' | 'promo') => void;
  cartCount: number;
  onOpenHelp: () => void;
}

/**
 * MobileBottomNav — Navigasi Bawah Sticky untuk Smartphone & Tablet
 * Budget: < 200 LOC.
 */
export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  activeFilter,
  onFilterChange,
  cartCount,
  onOpenHelp,
}) => {
  return (
    <nav
      aria-label="Navigasi Bawah Mobile"
      className="xl:hidden fixed bottom-0 left-0 w-full z-40 bg-white/95 backdrop-blur-xl border-t border-[#EAE3D5] shadow-[0_-4px_16px_rgba(0,0,0,0.06)] px-4 py-2 pb-[calc(0.5rem+env(safe-area-inset-bottom,0px))] select-none"
    >
      <div className="max-w-xl mx-auto flex items-center justify-around">
        <button
          type="button"
          onClick={() => {
            onFilterChange('all');
            if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`flex flex-col items-center gap-0.5 py-1 px-3 sm:px-4 rounded-xl transition-all cursor-pointer ${
            activeFilter === 'all'
              ? 'text-[#83273B] font-bold bg-[#83273B]/5'
              : 'text-[#665E60] hover:text-[#1A1615] hover:bg-[#FAF6F0]'
          }`}
        >
          <div className="w-5 h-5 flex items-center justify-center">
            <CategoryIcons.Jajanan />
          </div>
          <span className="text-[10px] sm:text-[11px]">Katalog</span>
        </button>

        <button
          type="button"
          onClick={() => {
            onFilterChange('promo');
            if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`flex flex-col items-center gap-0.5 py-1 px-3 sm:px-4 rounded-xl transition-all cursor-pointer ${
            activeFilter === 'promo'
              ? 'text-[#83273B] font-bold bg-[#83273B]/5'
              : 'text-[#665E60] hover:text-[#1A1615] hover:bg-[#FAF6F0]'
          }`}
        >
          <Tag className="w-5 h-5" />
          <span className="text-[10px] sm:text-[11px]">Promo</span>
        </button>

        <button
          type="button"
          onClick={() => {}}
          className="relative flex flex-col items-center gap-0.5 text-[#665E60] hover:text-[#1A1615] hover:bg-[#FAF6F0] py-1 px-3 sm:px-4 rounded-xl transition-all cursor-pointer"
        >
          <ShoppingBag className="w-5 h-5" />
          {cartCount > 0 && (
            <span className="absolute top-0 right-3 sm:right-4 min-w-[16px] h-[16px] px-1 bg-[#83273B] text-white text-[9px] font-bold rounded-full flex items-center justify-center">
              {cartCount}
            </span>
          )}
          <span className="text-[10px] sm:text-[11px]">Pesanan</span>
        </button>

        <button
          type="button"
          onClick={onOpenHelp}
          className="flex flex-col items-center gap-0.5 text-[#665E60] hover:text-[#83273B] hover:bg-[#FAF6F0] py-1 px-3 sm:px-4 rounded-xl transition-all cursor-pointer"
        >
          <HelpCircle className="w-5 h-5" />
          <span className="text-[10px] sm:text-[11px]">Bantuan</span>
        </button>
      </div>
    </nav>
  );
};

