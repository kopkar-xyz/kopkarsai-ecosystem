import React from 'react';
import { useAnalyticsData } from '../features/analytics/hooks/useAnalyticsData';
import { PromoDiscountBanner } from '../features/dashboard/components/PromoDiscountBanner';
import { AnalyticsHeader } from '../features/analytics/components/AnalyticsHeader';
import { AnalyticsMetricCards } from '../features/analytics/components/AnalyticsMetricCards';
import { RevenueTrendChart } from '../features/analytics/components/RevenueTrendChart';
import { TopProductsAnalysis } from '../features/analytics/components/TopProductsAnalysis';

/**
 * DashboardView (Beranda) — KK-SCR-004 & KK-SCR-014
 * Full Data Analisis, Visualisasi Chart & Promo Banner Iklan Koperasi
 * Strictly adheres to the 200-line view budget invariant.
 */
export const DashboardView: React.FC = () => {
  const { timeframe, setTimeframe, data } = useAnalyticsData();

  return (
    <div className="space-y-5 sm:space-y-6">
      {/* 1. Iklan Diskon & Promo Carousel (Mirip Bagian Atas Gateway) */}
      <PromoDiscountBanner />

      {/* 2. Header with Timeframe Filter (7D, 30D, Quarter) */}
      <AnalyticsHeader
        timeframe={timeframe}
        onTimeframeChange={setTimeframe}
      />

      {/* 3. Top Metric Cards (GMV, Volume Transaksi, Tingkat Pemenuhan, Partisipasi) */}
      <AnalyticsMetricCards kpi={data.kpi} />

      {/* 4. Primary Chart: Tren Omset & Volume Penjualan Mingguan */}
      <RevenueTrendChart data={data.dailyTrends} />

      {/* 5. Produk Terlaris & Perputaran Stok */}
      <TopProductsAnalysis products={data.topProducts} />
    </div>
  );
};
