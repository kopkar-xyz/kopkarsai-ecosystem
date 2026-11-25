import React from 'react';
import { Search } from 'lucide-react';

export type TabFilter = 'ALL' | 'PENDING' | 'READY' | 'GA';

interface OrderQueueFilterBarProps {
  currentTab: TabFilter;
  onSelectTab: (tab: TabFilter) => void;
  tabCounts: {
    all: number;
    pending: number;
    ready: number;
    ga: number;
  };
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

/**
 * OrderQueueFilterBar — Baris Filter Antrean Kasir
 * Kiri: Search bar ramping | Kanan: Tab filter antrean ramping (gap lapang & rata kanan).
 * Budget: < 200 LOC.
 */
export const OrderQueueFilterBar: React.FC<OrderQueueFilterBarProps> = ({
  currentTab,
  onSelectTab,
  tabCounts,
  searchQuery,
  onSearchChange,
}) => {
  const tabs = [
    { id: 'ALL' as TabFilter, label: 'Semua antrean', count: tabCounts.all },
    { id: 'PENDING' as TabFilter, label: 'Menunggu checklist', count: tabCounts.pending },
    { id: 'READY' as TabFilter, label: 'Siap diambil', count: tabCounts.ready },
    { id: 'GA' as TabFilter, label: 'Prioritas GA', count: tabCounts.ga, isGa: true },
  ];

  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 lg:gap-8 pt-0.5">
      {/* Sisi Kiri: Field Pencarian (Tinggi Asli h-11, Lebar Terkontrol) */}
      <div className="relative w-full sm:w-72 lg:w-80 shrink-0">
        <Search className="w-4 h-4 text-[#8C827A] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        <input
          type="text"
          placeholder="Cari invoice, nama pemesan, atau menu"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full h-11 pl-10 pr-4 bg-white border border-[#EAE3D5] rounded-xl text-xs text-[#1A1615] placeholder:text-[#8C827A] focus:outline-none focus:border-[#83273B] shadow-2xs transition-colors"
        />
      </div>

      {/* Sisi Kanan: Tab Filter Antrean (Tinggi Asli p-1.5 & py-2, Rata Kanan) */}
      <div className="w-full sm:w-auto bg-white border border-[#EAE3D5] rounded-2xl p-1.5 flex items-center gap-1.5 overflow-x-auto scrollbar-none shadow-2xs shrink-0 self-start sm:self-auto">
        {tabs.map((tab) => {
          const isActive = currentTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onSelectTab(tab.id)}
              className={`px-3 sm:px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap ${
                isActive
                  ? 'bg-[#83273B] text-white shadow-xs'
                  : 'text-[#1A1615] hover:bg-[#FAF6F0]'
              }`}
            >
              <span>{tab.label}</span>
              <span
                className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${
                  isActive
                    ? 'bg-black/20 text-white'
                    : tab.isGa
                    ? 'bg-[#F6CE2C] text-[#1A1615]'
                    : 'bg-[#FAF6F0] border border-[#EAE3D5] text-[#665E60]'
                }`}
              >
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
