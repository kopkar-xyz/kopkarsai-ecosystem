import React from 'react';
import {
  BarChart3,
  ShoppingBag,
  Package,
  Wallet,
  User,
  ClipboardList,
  ChevronRight,
} from 'lucide-react';
import { BrandLogo } from '../../components/brand/BrandLogo';
import { useRouter, type RoutePath } from '../router';
import { INITIAL_PRODUCT_ORDERS } from '../../features/dashboard/mockData';
import { formatCurrencyIDR } from '../../lib/utils';
import {
  ActiveBarChartIcon,
  ActiveShoppingBagIcon,
  ActivePackageIcon,
  ActiveWalletIcon,
} from './NavActiveIcons';

const NAV_ITEMS = [
  { path: '/' as RoutePath, label: 'Beranda', icon: BarChart3, activeIcon: ActiveBarChartIcon },
  { path: '/orders' as RoutePath, label: 'Pesanan Produk', icon: ShoppingBag, activeIcon: ActiveShoppingBagIcon },
  { path: '/products' as RoutePath, label: 'Katalog Produk', icon: Package, activeIcon: ActivePackageIcon },
  { path: '/financial' as RoutePath, label: 'Layanan SinJam', icon: Wallet, activeIcon: ActiveWalletIcon },
  { path: '/profile' as RoutePath, label: 'Profil Anggota', icon: User, activeIcon: User },
];

/**
 * DesktopSidebar — Navigasi vertikal permanen untuk Desktop & Tablet
 * Mengadopsi palet Hijau Deep Forest (#1F5B45) dengan active tab Warm Cream (#F3ECDD).
 * Dilengkapi widget Ringkasan Pesanan produk & qty aktif.
 * Budget: < 200 LOC.
 */
export const DesktopSidebar: React.FC = () => {
  const { currentPath, navigate } = useRouter();

  // Data pesanan aktif untuk widget Ringkasan Pesanan
  const summaryOrders = INITIAL_PRODUCT_ORDERS.filter((o) => o.orderDate === '2026-11-14');
  const totalItems = summaryOrders.reduce((sum, ord) => sum + ord.quantity, 0);
  const totalAmount = summaryOrders.reduce((sum, ord) => sum + ord.totalPrice, 0);

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
            <p className="text-[11px] font-accent font-semibold text-[#A9C3A2] leading-tight">
              Koperasi Digital PT SAI
            </p>
          </div>
        </div>
      </div>

      {/* 2. Vertical Navigation Menu */}
      <nav className="flex-1 px-3 lg:px-4 py-4 space-y-1.5">
        <p className="px-3 pb-1 text-[10px] font-accent font-bold uppercase tracking-widest text-[#A9C3A2]/70">
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
                  ? 'bg-[#F3ECDD] text-[#1F5B45] font-heading font-extrabold shadow-sm'
                  : 'text-[#A9C3A2] hover:text-white hover:bg-white/10 font-body font-medium'
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
              <span className="truncate">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* 3. Bottom Ordered Products Summary Widget (Ringkasan Pesanan) */}
      <div className="p-3 lg:p-4 pt-0">
        <div className="rounded-2xl bg-[#2F6F56]/60 border border-[#4F8A67]/40 p-3 space-y-2.5 shadow-xs">
          {/* Header */}
          <div className="flex items-center justify-between pb-1.5 border-b border-[#4F8A67]/30">
            <div className="flex items-center gap-1.5 min-w-0">
              <ClipboardList size={13} className="text-[#F3ECDD]" />
              <span className="text-xs font-heading font-extrabold text-white truncate">
                Ringkasan Pesanan
              </span>
            </div>
            <span className="text-[10px] font-accent font-bold px-1.5 py-0.5 rounded-full bg-[#1F5B45] text-[#A9C3A2] border border-[#4F8A67]/50 flex-shrink-0">
              {totalItems} item
            </span>
          </div>

          {/* List of ordered products & qty */}
          <div className="max-h-36 overflow-y-auto space-y-1.5 pr-0.5 scrollbar-thin">
            {summaryOrders.map((order) => (
              <div
                key={order.id}
                onClick={() => navigate('/orders')}
                className="flex items-center justify-between gap-2 p-1.5 rounded-xl bg-[#1F5B45]/70 hover:bg-[#1F5B45] border border-[#4F8A67]/30 transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <span className="w-5 h-5 rounded-md bg-[#EAF4EE] text-[#1F5B45] text-[10px] font-accent font-extrabold flex items-center justify-center flex-shrink-0 border border-[#A9C3A2]/60 group-hover:bg-[#F3ECDD] transition-colors">
                    {order.quantity}x
                  </span>
                  <div className="min-w-0">
                    <p className="text-[11px] font-heading font-bold text-white truncate leading-tight group-hover:text-[#F3ECDD] transition-colors">
                      {order.productName}
                    </p>
                    <p className="text-[9px] font-body text-[#A9C3A2] truncate leading-tight">
                      @{formatCurrencyIDR(order.unitPrice)}
                    </p>
                  </div>
                </div>
                <span className="text-[10px] font-heading font-extrabold text-[#F3ECDD] flex-shrink-0">
                  {formatCurrencyIDR(order.totalPrice)}
                </span>
              </div>
            ))}
          </div>

          {/* Accumulation & Action Button */}
          <div className="pt-2 border-t border-[#4F8A67]/40 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[10px] font-heading font-bold text-[#A9C3A2]">
                Total ({summaryOrders.length} produk)
              </span>
              <span className="text-xs font-heading font-extrabold text-[#F3ECDD]">
                {formatCurrencyIDR(totalAmount)}
              </span>
            </div>
            <button
              type="button"
              onClick={() => navigate('/orders')}
              className="w-full flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-xl bg-[#F3ECDD] hover:bg-white text-[#1F5B45] text-xs font-heading font-bold transition-all shadow-2xs cursor-pointer active:scale-98"
            >
              <span>Kelola Pesanan</span>
              <ChevronRight size={12} />
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};
