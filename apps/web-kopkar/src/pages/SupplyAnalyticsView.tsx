import React from 'react';
import { SupplyKpiCards } from '../features/analytics/components/SupplyKpiCards';
import { SupplyRecommendationTableCard } from '../features/analytics/components/SupplyRecommendationTableCard';

/**
 * SupplyAnalyticsView (Rekomendasi Suplai / Analitik Pasokan) — KK-SCR-014
 * Slicing 1:1 Presisi Gambar 2 Referensi:
 * - 4 Kartu KPI Ringkasan (Tingkat Keterjualan, Sisa Sore, Omzet, Jam Puncak Belanja)
 * - Tabel Rekomendasi Dropping Besok Pagi (Filter status, sinyal permintaan, buat PO)
 * Budget: < 200 LOC.
 */
export const SupplyAnalyticsView: React.FC = () => {
  return (
    <div className="space-y-4 sm:space-y-5 animate-fadeIn select-none">
      {/* 1. Baris 4 Kartu Metrik Performa Suplai */}
      <SupplyKpiCards />

      {/* 2. Modul Utama: Tabel Rekomendasi Dropping Pagi Besok */}
      <SupplyRecommendationTableCard />
    </div>
  );
};
