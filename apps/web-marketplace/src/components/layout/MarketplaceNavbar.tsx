import React from 'react';
import { Search, Bell, ShoppingBag } from 'lucide-react';
import { BrandLogo } from '../brand/BrandLogo';

interface MarketplaceNavbarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  cartCount: number;
  onOpenHelp: () => void;
  onResetFilter: () => void;
  activeFilter?: 'all' | 'promo';
  onFilterChange?: (filter: 'all' | 'promo') => void;
}

/**
 * MarketplaceNavbar — Header Navbar Utama Marketplace & Kantin
 * Palet Wabi-Sabi Sakura (#83273B, #FAF6F0), Brand Logo KopKar SAI, dan Search Bar.
 * Budget: < 200 LOC.
 */
export const MarketplaceNavbar: React.FC<MarketplaceNavbarProps> = ({
  searchQuery,
  onSearchChange,
  cartCount,
  onOpenHelp,
  onResetFilter,
  activeFilter = 'all',
  onFilterChange,
}) => {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white/95 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] border-b border-[#EAE3D5]/60 block">
      <div className="h-16 sm:h-20 max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 flex items-center justify-between gap-4">
        {/* Logo & Brand Identity KopKar SAI */}
        <div
          className="flex items-center gap-2.5 sm:gap-3 cursor-pointer shrink-0 group select-none"
          onClick={onResetFilter}
        >
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-[#83273B] border border-[#BC3455]/40 flex items-center justify-center p-1 shadow-xs group-hover:scale-105 transition-transform">
            <BrandLogo size={24} />
          </div>
          <div className="flex flex-col text-left">
            <span className="font-brush text-lg sm:text-xl font-extrabold text-[#1A1615] tracking-tight leading-tight">
              KOPKARSAI
            </span>
            <span className="text-[10px] sm:text-[11px] font-sans font-medium text-[#83273B] leading-tight">
              Koperasi Digital PT SAI
            </span>
          </div>
        </div>

        {/* Search Input (Centered Desktop) */}
        <div className="flex-1 max-w-xl mx-2 sm:mx-4 hidden md:block">
          <div className="relative flex items-center w-full">
            <Search className="w-4 h-4 text-[#665E60] absolute left-4 pointer-events-none" />
            <input
              type="text"
              placeholder="Cari nagasari, bakpao, puding, roti, camilan..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full h-11 pl-11 pr-4 bg-[#F7F2E7] text-[#1A1615] placeholder:text-[#665E60] text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-[#83273B]/30 shadow-inner border border-transparent focus:border-[#BC3455] transition-all"
            />
          </div>
        </div>

        {/* Right Action Menu */}
        <div className="flex items-center gap-4 sm:gap-6 shrink-0">
          <nav className="hidden xl:flex items-center gap-3">
            <button
              type="button"
              onClick={() => onFilterChange?.('all')}
              className={`transition-colors rounded-full px-4 py-1.5 text-sm cursor-pointer ${
                activeFilter === 'all'
                  ? 'bg-[#FDF0F3] text-[#83273B] font-medium border border-[#F7BAC7]'
                  : 'text-[#665E60] hover:text-[#1A1615] border border-transparent bg-transparent'
              }`}
            >
              Katalog Menu
            </button>
            <button
              type="button"
              onClick={() => onFilterChange?.('promo')}
              className={`transition-colors rounded-full px-4 py-1.5 text-sm cursor-pointer ${
                activeFilter === 'promo'
                  ? 'bg-[#FDF0F3] text-[#83273B] font-medium border border-[#F7BAC7]'
                  : 'text-[#665E60] hover:text-[#1A1615] border border-transparent bg-transparent'
              }`}
            >
              Promo Spesial
            </button>
            <span className="text-[#665E60] hover:text-[#1A1615] transition-colors px-3 py-1.5 text-sm font-normal cursor-pointer">
              Pesanan Saya
            </span>
            <button
              type="button"
              onClick={onOpenHelp}
              className="text-[#665E60] hover:text-[#1A1615] transition-colors px-3 py-1.5 text-sm font-normal cursor-pointer bg-transparent border-none"
            >
              Bantuan
            </button>
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="Pemberitahuan"
              className="relative p-2 text-[#665E60] hover:text-[#1A1615] hover:bg-[#F1EDE7] rounded-full transition-colors cursor-pointer"
            >
              <Bell className="w-5 h-5" />
            </button>

            <button
              type="button"
              aria-label="Keranjang Pesanan"
              className="relative flex items-center justify-center p-2 text-[#665E60] hover:text-[#1A1615] hover:bg-[#F1EDE7] rounded-full transition-colors cursor-pointer"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 bg-[#83273B] text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-sm">
                  {cartCount}
                </span>
              )}
            </button>

            <div className="flex items-center pl-1 ml-1">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCtBMcrY0SaQPrFMBJisl0ze_dspYjEv--3icmHMoMlLuBZ48z8tfPAEmB-rQV2P_fXAtwh7_aBBmXvS5Ji__ijSPtVYyqQoPai7rVJkgu4TDZMpWhSbwOhYt5wzS9XQ1GwDSztijmZ6fhHX3faGtDP3vBovOMwjH0LBx0djgDJB-vnGSNg_G0XPtGi4Pi8YPBshutYJqPEvOkwiJuFy8MvCtZrjO0BcOrjmQf2SAo"
                alt="Ayleen Profile"
                className="w-8 h-8 rounded-full object-cover ring-2 ring-[#FCE4E9] cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Search Field */}
      <div className="px-4 pb-3 md:hidden">
        <div className="relative flex items-center w-full">
          <Search className="w-4 h-4 text-[#665E60] absolute left-3.5 pointer-events-none" />
          <input
            type="text"
            placeholder="Cari jajanan, roti, camilan, minuman..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full h-10 pl-10 pr-4 bg-[#F7F2E7] text-[#1A1615] placeholder:text-[#665E60] text-xs rounded-full focus:outline-none focus:ring-1 focus:ring-[#83273B] shadow-inner"
          />
        </div>
      </div>
    </header>
  );
};

