import React from 'react';
import { useAnalyticsData } from '../features/analytics/hooks/useAnalyticsData';
import { DashboardHeader } from '../features/dashboard/components/DashboardHeader';
import { PromoDiscountBanner } from '../features/dashboard/components/PromoDiscountBanner';
import { AnalyticsHeader } from '../features/analytics/components/AnalyticsHeader';
import { AnalyticsMetricCards } from '../features/analytics/components/AnalyticsMetricCards';
import { RevenueTrendChart } from '../features/analytics/components/RevenueTrendChart';
import { ProfitTrendChart } from '../features/analytics/components/ProfitTrendChart';
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
      {/* 1. Header Halaman Beranda (Logo KopKar, Judul, Notifikasi & Profil) - Khusus Mobile */}
      <DashboardHeader />

      {/* 2. Bento Grid 4 Kolom (2x2 pada Desktop):
          - Row 1 Kiri: Iklan Promo, Overview Header, 2 Kartu Metrik
          - Row 1 Kanan: Produk Terlaris (Scrollable, tinggi presisi sejajar Volume Transaksi)
          - Row 2 Kiri: Bar Chart Tren Omset & Volume Penjualan
          - Row 2 Kanan: Multi-Line Chart (Pendapatan, Biaya Produksi & Laba Bersih)
      */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-5 sm:gap-6 items-start">
        {/* Row 1 Kiri: Iklan + Overview Header + 2 Kartu Metrik (Jarak natural tanpa gap berlebih) */}
        <div className="lg:col-span-2 space-y-4">
          <PromoDiscountBanner />
          <AnalyticsHeader
            timeframe={timeframe}
            onTimeframeChange={setTimeframe}
          />
          <AnalyticsMetricCards kpi={data.kpi} />
        </div>

        {/* Row 1 Kanan: Produk Terlaris (Scrollable, tinggi presisi sejajar batas bawah kartu Volume Transaksi) */}
        <div className="lg:col-span-2">
          <TopProductsAnalysis products={data.topProducts} />
        </div>

        {/* Row 2 Kiri: Bar Chart Tren Omset & Volume Penjualan */}
        <div className="lg:col-span-2">
          <RevenueTrendChart data={data.dailyTrends} />
        </div>

        {/* Row 2 Kanan: Multi-Line Chart (Pendapatan, Biaya Produksi & Laba Bersih) */}
        <div className="lg:col-span-2">
          <ProfitTrendChart />
        </div>
      </div>
    </div>
  );
};
