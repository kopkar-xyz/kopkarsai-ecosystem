import React from 'react';
import { useAnalyticsData } from '../features/analytics/hooks/useAnalyticsData';
import { PromoDiscountBanner } from '../features/dashboard/components/PromoDiscountBanner';
import { DashboardKpiGrid } from '../features/dashboard/components/DashboardKpiGrid';
import { IncomingOrdersCard } from '../features/dashboard/components/IncomingOrdersCard';
import { RevenueTrendChart } from '../features/analytics/components/RevenueTrendChart';
import { TopProductsTableCard } from '../features/dashboard/components/TopProductsTableCard';
import { ProfitTrendChart } from '../features/analytics/components/ProfitTrendChart';

/**
 * DashboardView (Beranda) — KK-SCR-004 & KK-SCR-014
 * 1-Page Responsive Layout (Desktop / Tablet / Mobile)
 * Strictly adheres to the 200-line view budget invariant.
 */
export const DashboardView: React.FC = () => {
  const { timeframe, setTimeframe, data } = useAnalyticsData();

  return (
    <div className="space-y-5 sm:space-y-6">
      {/* 1. Top Carousel Promo Banner Iklan (Full Width) */}
      <PromoDiscountBanner />

      {/* 3. Ringkasan 4 Kartu Metrik KPI (Full Width) */}
      <DashboardKpiGrid
        timeframe={timeframe}
        onTimeframeChange={setTimeframe}
      />

      {/* 4. Row 1 Grid: Pesanan Masuk (Live Table) & Tren Omset (Bar Chart) */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 sm:gap-5 items-stretch">
        <div className="xl:col-span-7 flex flex-col">
          <IncomingOrdersCard className="h-full" />
        </div>
        <div className="xl:col-span-5 flex flex-col">
          <RevenueTrendChart data={data.dailyTrends} className="h-full" />
        </div>
      </div>

      {/* 5. Row 2 Grid: Produk Terlaris (Table) & Keuangan dan Profitabilitas (Multi-Line Chart) */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 sm:gap-5 items-stretch">
        <div className="xl:col-span-5 flex flex-col">
          <TopProductsTableCard products={data.topProducts} className="h-full" />
        </div>
        <div className="xl:col-span-7 flex flex-col">
          <ProfitTrendChart className="h-full" />
        </div>
      </div>
    </div>
  );
};
