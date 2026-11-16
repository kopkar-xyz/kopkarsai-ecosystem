import React from 'react';
import { ShoppingBag } from 'lucide-react';
import { useDashboardData } from '../features/dashboard/hooks/useDashboardData';
import { HorizontalDateSelector } from '../features/dashboard/components/HorizontalDateSelector';
import { DailySummaryCard } from '../features/dashboard/components/DailySummaryCard';
import { ProductOrdersList } from '../features/dashboard/components/ProductOrdersList';

/**
 * OrdersView (Halaman Pesanan Produk) — KK-SCR-009
 * Pemesanan per produk dalam kacamata aplikasi web-kopkar
 * Strictly adheres to the 200-line budget invariant.
 */
export const OrdersView: React.FC = () => {
  const {
    metrics,
    orders,
    dailySummaryOrders,
    companyFilter,
    setCompanyFilter,
    selectedDate,
    setSelectedDate,
    dateRange,
  } = useDashboardData();

  return (
    <div className="space-y-5 sm:space-y-6">
      {/* Header Halaman Pesanan Produk (Khusus Mobile, di Desktop tampil di DesktopHeader) */}
      <div className="md:hidden flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#DED5C3]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#1F5B45] text-white flex items-center justify-center flex-shrink-0 shadow-xs">
            <ShoppingBag size={20} />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-heading font-extrabold text-[#1A2421]">
              Pesanan Produk
            </h1>
            <p className="text-xs sm:text-sm font-kanji text-[#5C6F67] tracking-widest">
              受注管理
            </p>
          </div>
        </div>
      </div>

      {/* 1. Selector Tanggal Horizontal Geser Kanan-Kiri */}
      <HorizontalDateSelector
        dates={dateRange}
        selectedDate={selectedDate}
        onSelectDate={setSelectedDate}
      />

      {/* 2. Ringkasan status harian & Container tunggal list summary yang dipesan */}
      <DailySummaryCard
        metrics={metrics}
        summaryOrders={dailySummaryOrders}
        selectedDate={selectedDate}
        companyFilter={companyFilter}
        onCompanyFilterChange={setCompanyFilter}
      />

      {/* 3. Daftar pesanan per produk (Kacamata Web-Kopkar) */}
      <ProductOrdersList orders={orders} />
    </div>
  );
};
