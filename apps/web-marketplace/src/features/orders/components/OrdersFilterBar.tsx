import React from 'react';
import { Search, ChevronDown, X } from 'lucide-react';
import { FilterTab } from './OrdersSidebar';

export type DateFilter = 'ALL' | 'TODAY' | 'YESTERDAY';
export type SortOrder = 'NEWEST' | 'OLDEST' | 'HIGHEST';

interface OrdersFilterBarProps {
  activeTab: FilterTab;
  onSelectTab: (tab: FilterTab) => void;
  counts: { all: number; active: number; selesai: number };
  searchQuery: string;
  onSearchChange: (q: string) => void;
  dateFilter: DateFilter;
  onSelectDate: (df: DateFilter) => void;
  sortBy: SortOrder;
  onSelectSort: (so: SortOrder) => void;
  openDropdown: 'none' | 'date' | 'sort';
  onToggleDropdown: (d: 'none' | 'date' | 'sort') => void;
  onlyToday: boolean;
}

/**
 * OrdersFilterBar — Bar Filter Pencarian, Tab Pemisah Cepat & Dropdown Urutan
 * Memisahkan secara jelas Pesanan Aktif vs Riwayat Selesai. Budget: < 200 LOC.
 */
export const OrdersFilterBar: React.FC<OrdersFilterBarProps> = ({
  activeTab,
  onSelectTab,
  counts,
  searchQuery,
  onSearchChange,
  dateFilter,
  onSelectDate,
  sortBy,
  onSelectSort,
  openDropdown,
  onToggleDropdown,
  onlyToday,
}) => {
  return (
    <div className="space-y-2.5">
      {/* 1. Tab Pemisah Cepat: Semua, Pesanan Aktif, Riwayat Selesai */}
      <div className="flex items-center gap-2 pb-0.5 overflow-x-auto scrollbar-none w-full">
        <button
          type="button"
          onClick={() => onSelectTab('ALL')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
            activeTab === 'ALL' && !onlyToday
              ? 'bg-[#83273B] text-white shadow-xs'
              : 'bg-white border border-[#EAE3D5] text-[#1A1615] hover:bg-[#FAF6F0]'
          }`}
        >
          Semua ({counts.all})
        </button>
        <button
          type="button"
          onClick={() => onSelectTab('ACTIVE')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap shrink-0 ${
            activeTab === 'ACTIVE' && !onlyToday
              ? 'bg-[#83273B] text-white shadow-xs'
              : 'bg-white border border-[#EAE3D5] text-[#1A1615] hover:bg-[#FAF6F0]'
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-[#E5A812] animate-pulse" />
          <span>Pesanan Aktif ({counts.active})</span>
        </button>
        <button
          type="button"
          onClick={() => onSelectTab('SELESAI')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap shrink-0 ${
            activeTab === 'SELESAI' && !onlyToday
              ? 'bg-[#83273B] text-white shadow-xs'
              : 'bg-white border border-[#EAE3D5] text-[#1A1615] hover:bg-[#FAF6F0]'
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-[#16A34A]" />
          <span>Riwayat Selesai ({counts.selesai})</span>
        </button>
      </div>

      {/* 2. Search & Filter Dropdown Row */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 w-full">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-[#8C827A] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Cari nomor invoice atau menu"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full h-10 pl-10 pr-8 bg-white border border-[#EAE3D5] rounded-xl text-xs text-[#1A1615] placeholder:text-[#8C827A] focus:outline-none focus:border-[#83273B] shadow-2xs transition-colors"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8C827A] hover:text-[#1A1615] cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        <div className="w-full sm:w-auto grid grid-cols-2 sm:flex sm:items-center gap-2 relative" onClick={(e) => e.stopPropagation()}>
          {/* Dropdown Tanggal */}
          <div className="relative w-full sm:w-auto">
            <button
              type="button"
              onClick={() => onToggleDropdown(openDropdown === 'date' ? 'none' : 'date')}
              className="h-10 w-full sm:w-auto px-3.5 bg-white border border-[#EAE3D5] rounded-xl text-xs text-[#1A1615] flex items-center justify-between sm:justify-start gap-2 hover:bg-[#FAF6F0] transition-colors cursor-pointer shadow-2xs"
            >
              <span className="truncate">{dateFilter === 'TODAY' ? 'Hari ini' : dateFilter === 'YESTERDAY' ? 'Kemarin' : 'Semua tanggal'}</span>
              <ChevronDown className="w-3.5 h-3.5 text-[#8C827A] shrink-0" />
            </button>
            {openDropdown === 'date' && (
              <div className="absolute left-0 sm:left-auto sm:right-0 top-11 z-20 w-40 bg-white border border-[#EAE3D5] rounded-xl shadow-lg p-1 space-y-0.5 text-xs">
                <button type="button" onClick={() => onSelectDate('ALL')} className="w-full text-left px-3 py-1.5 rounded-lg hover:bg-[#FAF6F0] text-[#1A1615]">Semua tanggal</button>
                <button type="button" onClick={() => onSelectDate('TODAY')} className="w-full text-left px-3 py-1.5 rounded-lg hover:bg-[#FAF6F0] text-[#1A1615]">Hari ini (23 Nov)</button>
                <button type="button" onClick={() => onSelectDate('YESTERDAY')} className="w-full text-left px-3 py-1.5 rounded-lg hover:bg-[#FAF6F0] text-[#1A1615]">Kemarin (22 Nov)</button>
              </div>
            )}
          </div>

          {/* Dropdown Urutan */}
          <div className="relative w-full sm:w-auto">
            <button
              type="button"
              onClick={() => onToggleDropdown(openDropdown === 'sort' ? 'none' : 'sort')}
              className="h-10 w-full sm:w-auto px-3.5 bg-white border border-[#EAE3D5] rounded-xl text-xs text-[#1A1615] flex items-center justify-between sm:justify-start gap-2 hover:bg-[#FAF6F0] transition-colors cursor-pointer shadow-2xs"
            >
              <span className="truncate">{sortBy === 'OLDEST' ? 'Terlama' : sortBy === 'HIGHEST' ? 'Tertinggi' : 'Terbaru'}</span>
              <ChevronDown className="w-3.5 h-3.5 text-[#8C827A] shrink-0" />
            </button>
            {openDropdown === 'sort' && (
              <div className="absolute right-0 top-11 z-20 w-36 bg-white border border-[#EAE3D5] rounded-xl shadow-lg p-1 space-y-0.5 text-xs">
                <button type="button" onClick={() => onSelectSort('NEWEST')} className="w-full text-left px-3 py-1.5 rounded-lg hover:bg-[#FAF6F0] text-[#1A1615]">Terbaru dulu</button>
                <button type="button" onClick={() => onSelectSort('OLDEST')} className="w-full text-left px-3 py-1.5 rounded-lg hover:bg-[#FAF6F0] text-[#1A1615]">Terlama dulu</button>
                <button type="button" onClick={() => onSelectSort('HIGHEST')} className="w-full text-left px-3 py-1.5 rounded-lg hover:bg-[#FAF6F0] text-[#1A1615]">Total tertinggi</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
