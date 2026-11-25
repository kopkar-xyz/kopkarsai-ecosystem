import React, { useState } from 'react';
import { SupplyRecommendationRow } from './SupplyRecommendationRow';

export interface SupplyRecommendationItem {
  id: string;
  productName: string;
  supplier: string;
  unit: string;
  avgQty: number;
  suggestedQty: number;
  trendPercent: string;
  isIncrease: boolean;
  demandSignal: string;
  confidence: number;
  estimatedValue: number;
  poStatus: 'READY' | 'CREATED';
}

const DEFAULT_RECOMMENDATIONS: SupplyRecommendationItem[] = [
  {
    id: 'rec-01',
    productName: 'Nasi Kotak Ayam Bakar Madu',
    supplier: 'Dapur Oishi Mitra',
    unit: 'SAI-B',
    avgQty: 22,
    suggestedQty: 30,
    trendPercent: '+36%',
    isIncrease: true,
    demandSignal: 'Lonjakan istirahat Jumat',
    confidence: 94,
    estimatedValue: 600000,
    poStatus: 'READY',
  },
  {
    id: 'rec-02',
    productName: 'Susu UHT Full Cream 250ml',
    supplier: 'Produksi Sendiri',
    unit: 'SAI-B',
    avgQty: 20,
    suggestedQty: 25,
    trendPercent: '+25%',
    isIncrease: true,
    demandSignal: 'Habis < 13:00 (3 hari)',
    confidence: 98,
    estimatedValue: 162500,
    poStatus: 'READY',
  },
  {
    id: 'rec-03',
    productName: 'Kopi Susu Gula Aren Botol 250ml',
    supplier: 'Kedai Kopi Sahabat',
    unit: 'SAI-T',
    avgQty: 35,
    suggestedQty: 40,
    trendPercent: '+14%',
    isIncrease: true,
    demandSignal: 'Sarapan unit pabrik stabil',
    confidence: 90,
    estimatedValue: 440000,
    poStatus: 'READY',
  },
  {
    id: 'rec-04',
    productName: 'Roti Gandum Cokelat Serat Tinggi',
    supplier: 'Produksi Sendiri',
    unit: 'SAI-B',
    avgQty: 25,
    suggestedQty: 25,
    trendPercent: 'Stabil',
    isIncrease: false,
    demandSignal: 'Stok & retur seimbang',
    confidence: 91,
    estimatedValue: 262500,
    poStatus: 'CREATED',
  },
];

/**
 * SupplyRecommendationTableCard — Tabel Rekomendasi Dropping Besok Pagi
 * Slicing 1:1 Presisi aistudio-src SupplyRecPage:
 * - Header: font-okashi text-[19px] text-[#18221D]
 * - Anggaran: font-okashi text-[16px] text-[#165239] tabular-nums
 * - Tab Filter: rounded-lg text-[12px] font-medium inside bg-[#FAF7EE] p-1 rounded-xl border border-[#EAE4D3]
 * - Header tabel: bg-[#F6F2E6] text-[12px] font-medium text-[#526058] rounded-l-xl / rounded-r-xl
 * Budget: < 200 LOC.
 */
export const SupplyRecommendationTableCard: React.FC = () => {
  const [items, setItems] = useState<SupplyRecommendationItem[]>(DEFAULT_RECOMMENDATIONS);
  const [activeTab, setActiveTab] = useState<'ALL' | 'INCREASE' | 'CREATED'>('ALL');

  const filteredItems = items.filter((item) => {
    if (activeTab === 'INCREASE') return item.isIncrease;
    if (activeTab === 'CREATED') return item.poStatus === 'CREATED';
    return true;
  });

  const handleCreatePo = (id: string) => {
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, poStatus: 'CREATED' } : i))
    );
  };

  const increaseCount = items.filter((i) => i.isIncrease).length;
  const createdCount = items.filter((i) => i.poStatus === 'CREATED').length;

  return (
    <div className="bg-white border border-[#EAE4D3] rounded-2xl p-4 sm:p-6 space-y-5 select-none">
      {/* 1. Header Card & Filter Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h2 className="font-okashi text-[19px] text-[#18221D]">
            Rekomendasi Dropping Besok Pagi
          </h2>
          <p className="text-[12.5px] text-[#7A867E] mt-0.5">
            06:30 – 07:30 WIB · Saran porsi berbasis riwayat keterjualan harian
          </p>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          {/* Box Estimasi Anggaran */}
          <div className="px-3.5 py-2 rounded-xl bg-[#FAF7EE] border border-[#EAE4D3] flex items-center gap-2.5">
            <span className="text-[12px] text-[#526058]">Estimasi Anggaran</span>
            <span className="font-okashi text-[16px] text-[#165239] tabular-nums">
              Rp 1.202.500
            </span>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 bg-[#FAF7EE] p-1 rounded-xl border border-[#EAE4D3] w-full sm:w-auto">
            <button
              type="button"
              onClick={() => setActiveTab('ALL')}
              className={`px-3 py-1.5 rounded-lg text-[12px] font-medium cursor-pointer transition-colors whitespace-nowrap ${
                activeTab === 'ALL'
                  ? 'bg-[#165239] text-white'
                  : 'text-[#526058] hover:text-[#18221D]'
              }`}
            >
              Semua ({items.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('INCREASE')}
              className={`px-3 py-1.5 rounded-lg text-[12px] font-medium cursor-pointer transition-colors whitespace-nowrap ${
                activeTab === 'INCREASE'
                  ? 'bg-[#165239] text-white'
                  : 'text-[#526058] hover:text-[#18221D]'
              }`}
            >
              Naik Kuota ({increaseCount})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('CREATED')}
              className={`px-3 py-1.5 rounded-lg text-[12px] font-medium cursor-pointer transition-colors whitespace-nowrap ${
                activeTab === 'CREATED'
                  ? 'bg-[#165239] text-white'
                  : 'text-[#526058] hover:text-[#18221D]'
              }`}
            >
              PO Dibuat ({createdCount})
            </button>
          </div>
        </div>
      </div>

      {/* 2. Tabel Rekomendasi */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[640px]">
          <thead>
            <tr className="bg-[#F6F2E6] text-[12px] font-medium text-[#526058]">
              <th className="py-2.5 px-3.5 rounded-l-xl">Produk & Mitra</th>
              <th className="py-2.5 px-3.5">Rata-rata → Saran</th>
              <th className="py-2.5 px-3.5">Sinyal Permintaan</th>
              <th className="py-2.5 px-3.5 text-center">Keyakinan</th>
              <th className="py-2.5 px-3.5">Estimasi Nilai</th>
              <th className="py-2.5 px-3.5 text-right rounded-r-xl">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F0EBDC] text-[13px]">
            {filteredItems.map((item) => (
              <SupplyRecommendationRow
                key={item.id}
                item={item}
                onCreatePo={handleCreatePo}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
