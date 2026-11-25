import React from 'react';
import { Search, ShoppingBag, Bell } from 'lucide-react';
import { BrandLogo } from '../brand/BrandLogo';
import { RoutePath } from '../../app/router';
import { UserProfile } from '../../types/auth';

export type CashierNavTab = 'DASHBOARD' | 'GA_QUEUE' | 'RECAP' | 'SETTINGS' | 'HELP';

interface MarketplaceNavbarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  cartCount: number;
  onOpenHelp: () => void;
  onResetFilter: () => void;
  activeFilter?: 'all' | 'promo';
  onFilterChange?: (filter: 'all' | 'promo') => void;
  currentPath: RoutePath;
  onNavigate: (path: RoutePath) => void;
  onOpenCart: () => void;
  currentUser: UserProfile;
  onOpenProfileModal: () => void;
  cashierTab?: CashierNavTab;
  onSelectCashierTab?: (tab: CashierNavTab) => void;
}

const CASHIER_NAV: { id: CashierNavTab; label: string }[] = [
  { id: 'DASHBOARD', label: 'Dasbor kasir' },
  { id: 'GA_QUEUE', label: 'Antrean GA' },
  { id: 'RECAP', label: 'Rekap penjualan' },
  { id: 'SETTINGS', label: 'Pengaturan toko' },
  { id: 'HELP', label: 'Bantuan' },
];

const pillClass = (isActive: boolean) =>
  `rounded-full px-3.5 py-1.5 text-[13px] cursor-pointer transition-all ${
    isActive ? 'bg-[#FDF0F3] text-[#83273B] font-semibold border border-[#F7BAC7]' : 'text-[#665E60] hover:text-[#1A1615] font-medium border border-transparent'
  }`;

export const MarketplaceNavbar: React.FC<MarketplaceNavbarProps> = ({
  searchQuery,
  onSearchChange,
  cartCount,
  onOpenHelp,
  onResetFilter,
  activeFilter = 'all',
  onFilterChange,
  currentPath,
  onNavigate,
  onOpenCart,
  currentUser,
  onOpenProfileModal,
  cashierTab = 'DASHBOARD',
  onSelectCashierTab,
}) => {
  const isCashierRole = currentUser.role === 'ADMIN_TOKO';
  const handleCashierClick = (tabId: CashierNavTab) => {
    onSelectCashierTab?.(tabId);
    if (currentPath !== '/cashier') onNavigate('/cashier');
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white/95 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] border-b border-[#EAE3D5]/60 block select-none">
      <div className="h-14 sm:h-20 max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        {/* 1. Logo KopKar SAI */}
        <div
          className="flex items-center gap-2.5 sm:gap-3 cursor-pointer shrink-0 group select-none"
          onClick={() => {
            onResetFilter();
            onNavigate(isCashierRole ? '/cashier' : '/');
          }}
        >
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-[#83273B] border border-[#BC3455]/40 flex items-center justify-center p-1 shadow-xs group-hover:scale-105 transition-transform">
            <BrandLogo size={24} />
          </div>
          <div className="flex flex-col text-left">
            <span className="font-brush text-lg sm:text-xl font-extrabold text-[#1A1615] tracking-tight leading-tight">KOPKARSAI</span>
            <span className="text-[10px] sm:text-[11px] font-sans font-medium text-[#83273B] leading-tight block truncate max-w-[140px] sm:max-w-none">
              {isCashierRole ? 'Dasbor Kasir & Toko Fisik' : 'Koperasi Digital PT SAI'}
            </span>
          </div>
        </div>

        {/* 2. Search Bar Tengah — Desktop (hidden md:block) */}
        <div className="flex-1 max-w-xl mx-2 sm:mx-4 hidden md:block">
          <div className="relative flex items-center w-full">
            <Search className="w-4 h-4 text-[#665E60] absolute left-4 pointer-events-none" />
            <input
              type="text"
              placeholder={isCashierRole ? 'Cari nomor invoice, nama pembeli, atau menu...' : 'Cari jajanan, roti, camilan, minuman...'}
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full h-11 pl-11 pr-4 bg-[#F7F2E7] text-[#1A1615] placeholder:text-[#665E60] text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-[#83273B]/30 shadow-inner border border-transparent focus:border-[#BC3455] transition-all"
            />
          </div>
        </div>

        {/* 3. Menu Navigasi Sesuai Peran Aktif & Action Icons */}
        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
          <nav className="hidden xl:flex items-center gap-1.5">
            {isCashierRole ? (
              CASHIER_NAV.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => handleCashierClick(tab.id)}
                  className={pillClass(cashierTab === tab.id)}
                >
                  {tab.label}
                </button>
              ))
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => { onNavigate('/'); onFilterChange?.('all'); }}
                  className={pillClass(currentPath === '/' && activeFilter === 'all')}
                >
                  Katalog Menu
                </button>
                <button
                  type="button"
                  onClick={() => { onNavigate('/'); onFilterChange?.('promo'); }}
                  className={pillClass(currentPath === '/' && activeFilter === 'promo')}
                >
                  Promo Spesial
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate('/orders')}
                  className={pillClass(currentPath === '/orders')}
                >
                  Pesanan Saya
                </button>
                <button
                  type="button"
                  onClick={() => { onOpenHelp(); onNavigate('/help'); }}
                  className={pillClass(currentPath === '/help')}
                >
                  Bantuan
                </button>
              </>
            )}
          </nav>

          {/* Notifikasi Bell, Cart Icon & Avatar Sesuai Gambar Referensi */}
          <div className="flex items-center gap-1 sm:gap-2">
            {!isCashierRole && (
              <>
                <button
                  type="button"
                  onClick={() => alert('Tidak ada notifikasi baru.')}
                  aria-label="Notifikasi"
                  className="relative flex items-center justify-center p-2 text-[#665E60] hover:text-[#83273B] hover:bg-[#F1EDE7] rounded-full transition-colors cursor-pointer"
                >
                  <Bell className="w-5 h-5" />
                </button>

                <button
                  type="button"
                  onClick={onOpenCart}
                  aria-label="Keranjang Pesanan"
                  className="relative flex items-center justify-center p-2 text-[#665E60] hover:text-[#83273B] hover:bg-[#F1EDE7] rounded-full transition-colors cursor-pointer"
                >
                  <ShoppingBag className="w-5 h-5" />
                  {cartCount > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 bg-[#83273B] text-white text-[10px] font-semibold rounded-full flex items-center justify-center shadow-sm">
                      {cartCount}
                    </span>
                  )}
                </button>
              </>
            )}

            <button
              type="button"
              onClick={onOpenProfileModal}
              className="flex items-center p-0.5 rounded-full cursor-pointer hover:ring-2 hover:ring-[#83273B]/30 transition-all shadow-2xs active:scale-95 ml-0.5 sm:ml-1"
            >
              <img src={currentUser.avatarUrl} alt={currentUser.name} className="w-7 h-7 sm:w-8 sm:h-8 rounded-full object-cover shrink-0" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Search Bar Row (Sesuai Gambar Referensi Mobile) */}
      <div className="px-4 pb-3 pt-0.5 md:hidden">
        <div className="relative flex items-center w-full">
          <Search className="w-4 h-4 text-[#665E60] absolute left-4 pointer-events-none" />
          <input
            type="text"
            placeholder={isCashierRole ? 'Cari nomor invoice atau menu...' : 'Cari jajanan, roti, camilan, minuman...'}
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full h-10 pl-11 pr-4 bg-[#F7F2E7] text-[#1A1615] placeholder:text-[#665E60] text-xs rounded-full focus:outline-none focus:ring-2 focus:ring-[#83273B]/30 shadow-inner border border-transparent focus:border-[#BC3455] transition-all"
          />
        </div>
      </div>
    </header>
  );
};
