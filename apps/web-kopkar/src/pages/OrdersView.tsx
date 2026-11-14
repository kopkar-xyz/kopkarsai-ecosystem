import React from 'react';
import { ShoppingBag } from 'lucide-react';
import { useDashboardData } from '../features/dashboard/hooks/useDashboardData';
import { HorizontalDateSelector } from '../features/dashboard/components/HorizontalDateSelector';
import { IncomingOrdersList } from '../features/dashboard/components/IncomingOrdersList';
import { DailySummaryCard } from '../features/dashboard/components/DailySummaryCard';

/**
 * OrdersView (Halaman Pesanan) — KK-SCR-009 & MP-SCR-006
 * Daftar pesanan dengan judul header, filter tanggal horizontal geser kanan-kiri
 * Strictly adheres to the 200-line budget invariant.
 */
export const OrdersView: React.FC = () => {
  const {
    metrics,
    orders,
    filterType,
    setFilterType,
    selectedDate,
    setSelectedDate,
    dateRange,
    selectedDateOrdersCount,
    selectedDateTotalAmount,
  } = useDashboardData();

  return (
    <div className="space-y-5 sm:space-y-6">
      {/* Header Halaman Pesanan (Mobile & Desktop) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#DED5C3]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#1F5B45] text-white flex items-center justify-center flex-shrink-0 shadow-xs">
            <ShoppingBag size={20} />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-heading font-extrabold text-[#1A2421]">
              Kelola Pesanan
            </h1>
            <p className="text-xs sm:text-sm font-body text-[#5C6F67]">
              Monitoring transaksi belanja toko same-day dan katering PO H-1 harian
            </p>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-2">
          <span className="text-xs font-accent font-semibold text-[#2F6F56] bg-[#EAF4EE] px-3 py-1 rounded-full border border-[#A9C3A2]/60">
            Unit SAI B & T
          </span>
        </div>
      </div>

      {/* 1. Selector Tanggal Horizontal Geser Kanan-Kiri */}
      <HorizontalDateSelector
        dates={dateRange}
        selectedDate={selectedDate}
        onSelectDate={setSelectedDate}
        ordersCount={selectedDateOrdersCount}
        totalAmount={selectedDateTotalAmount}
      />

      {/* 2. Ringkasan status pesanan harian */}
      <DailySummaryCard metrics={metrics} />

      {/* 3. Daftar pesanan masuk interaktif berdasarkan tanggal & tipe */}
      <IncomingOrdersList
        orders={orders}
        filterType={filterType}
        onFilterChange={setFilterType}
      />
    </div>
  );
};
