import React from 'react';
import { Search, ShoppingBag, Sparkles } from 'lucide-react';
import { BrandLogo } from '../brand/BrandLogo';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  isGaMode: boolean;
  onToggleGaMode: () => void;
  cartCount: number;
  onOpenCart: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  searchQuery,
  onSearchChange,
  isGaMode,
  onToggleGaMode,
  cartCount,
  onOpenCart,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-[#83273B] text-white shadow-md border-b border-[#5E1526]/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
        {/* Logo & Identity KopKar SAI */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#5E1526] border border-[#BC3455]/40 flex items-center justify-center p-1 shadow-xs">
            <BrandLogo size={26} />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-heading font-extrabold text-lg text-white tracking-tight leading-tight">
                KOPKARSAI
              </span>
            </div>
            <p className="text-[11px] font-sans font-medium text-[#F3B4C2] leading-tight">
              Koperasi Digital PT SAI
            </p>
          </div>
        </div>

        {/* Search Input (Hidden on mobile) */}
        <div className="flex-1 max-w-md relative hidden sm:block">
          <Search className="w-4 h-4 text-white/60 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Cari bento, onigiri, camilan, atau minuman..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-9 pr-4 py-1.5 bg-white/10 hover:bg-white/15 focus:bg-white focus:text-[#1A1615] placeholder-white/60 focus:placeholder-gray-400 text-sm rounded-full outline-none border border-white/20 focus:border-white transition-all"
          />
        </div>

        {/* Action Right: GA Toggle & Cart */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={onToggleGaMode}
            title="Antrean Prioritas General Affairs (MP-DEC-002)"
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-medium border transition-colors ${
              isGaMode
                ? 'bg-[#E5A812] text-[#1A1615] border-[#E5A812] shadow-sm font-bold'
                : 'bg-white/10 text-white border-white/20 hover:bg-white/20'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span className="hidden md:inline">{isGaMode ? 'Prioritas GA Aktif' : 'Divisi GA'}</span>
          </button>

          <button
            onClick={onOpenCart}
            className="relative p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors border border-white/20"
            aria-label="Buka Keranjang"
          >
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#DC4C70] text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-sm animate-pulse">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Search Input */}
      <div className="px-4 pb-3 sm:hidden">
        <div className="relative">
          <Search className="w-4 h-4 text-white/60 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Cari menu kantin / toko..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-9 pr-4 py-1.5 bg-white/15 focus:bg-white focus:text-[#1A1615] placeholder-white/60 focus:placeholder-gray-400 text-xs rounded-full outline-none border border-white/20 transition-all"
          />
        </div>
      </div>
    </header>
  );
};

