import React from 'react';
import { Check, Flame, Search } from 'lucide-react';
import { FilterCountPill } from '../../../components/ui/FilterCountPill';

export type OrderStatusFilter = 'ALL' | 'MENUNGGU' | 'SIAP' | 'SELESAI';
export type OrderKindFilter = 'ALL' | 'PO' | 'REGULER';
export type OrderPriorityFilter = 'ALL' | 'UMUM' | 'GA';

interface OrdersFilterToolbarProps {
  searchQuery: string;
  onSearchChange: (val: string) => void;
  unitFilter: 'ALL' | 'SAI-B' | 'SAI-T';
  onUnitFilterChange: (unit: 'ALL' | 'SAI-B' | 'SAI-T') => void;
  kindFilter: OrderKindFilter;
  onKindFilterChange: (kind: OrderKindFilter) => void;
  hideKindFilter?: boolean;
  priorityFilter: OrderPriorityFilter;
  onPriorityFilterChange: (prio: OrderPriorityFilter) => void;
  statusFilter: OrderStatusFilter;
  onStatusFilterChange: (status: OrderStatusFilter) => void;
  statusTabs: Array<{ key: OrderStatusFilter; label: string; count: number }>;
  totalFilteredCount: number;
  pendingCount: number;
  showAcceptAll: boolean;
  onAcceptAll: () => void;
}

export const OrdersFilterToolbar: React.FC<OrdersFilterToolbarProps> = ({
  searchQuery,
  onSearchChange,
  unitFilter,
  onUnitFilterChange,
  kindFilter,
  onKindFilterChange,
  hideKindFilter = false,
  priorityFilter,
  onPriorityFilterChange,
  statusFilter,
  onStatusFilterChange,
  statusTabs,
  totalFilteredCount,
  pendingCount,
  showAcceptAll,
  onAcceptAll,
}) => {
  return (
    <div className="bg-white rounded-2xl border border-[#EAE4D3] p-3.5 sm:p-4 space-y-3 select-none shadow-2xs">
      {/* Baris 1: Search + Segmented Unit + Segmented Jenis + Toggle Umum / Prioritas GA */}
      <div className="flex flex-col xl:flex-row xl:items-center gap-2.5">
        <div className="relative w-full xl:flex-1">
          <Search className="w-4 h-4 text-[#7A867E] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Cari invoice, pemesan, atau menu..."
            className="w-full h-9 bg-[#FAF8F2] border border-[#EAE4D3] rounded-xl pl-9 pr-3 text-[12.5px] text-[#18221D] placeholder:text-[#8A948E] focus:outline-none focus:border-[#165239]"
          />
        </div>

        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          {/* Segmented Unit */}
          <div className="inline-flex items-center p-0.5 rounded-xl bg-[#FAF7EE] border border-[#EAE4D3] max-w-full overflow-x-auto">
            {(['ALL', 'SAI-B', 'SAI-T'] as const).map((u) => {
              const active = unitFilter === u;
              return (
                <button
                  key={u}
                  type="button"
                  onClick={() => onUnitFilterChange(u)}
                  className={`px-2.5 py-1 rounded-lg text-[11.5px] font-medium cursor-pointer transition-colors whitespace-nowrap ${
                    active ? 'bg-[#165239] text-white shadow-2xs' : 'text-[#526058] hover:text-[#18221D]'
                  }`}
                >
                  {u === 'ALL' ? 'Semua Unit' : u}
                </button>
              );
            })}
          </div>

          {/* Segmented Jenis */}
          {!hideKindFilter && (
            <div className="inline-flex items-center p-0.5 rounded-xl bg-[#FAF7EE] border border-[#EAE4D3]">
              {(
                [
                  { key: 'ALL', label: 'Semua Jenis' },
                  { key: 'PO', label: 'PO' },
                  { key: 'REGULER', label: 'Same-Day' },
                ] as const
              ).map((k) => {
                const active = kindFilter === k.key;
                return (
                  <button
                    key={k.key}
                    type="button"
                    onClick={() => onKindFilterChange(k.key)}
                    className={`px-2.5 py-1 rounded-lg text-[11.5px] font-medium cursor-pointer transition-colors whitespace-nowrap ${
                      active ? 'bg-[#165239] text-white shadow-2xs' : 'text-[#526058] hover:text-[#18221D]'
                    }`}
                  >
                    {k.label}
                  </button>
                );
              })}
            </div>
          )}

          {/* Toggle Pesanan Umum vs Prioritas GA */}
          <div className="inline-flex items-center p-0.5 rounded-xl bg-[#FAF7EE] border border-[#EAE4D3]">
            <button
              type="button"
              onClick={() => onPriorityFilterChange(priorityFilter === 'UMUM' ? 'ALL' : 'UMUM')}
              className={`px-2.5 py-1 rounded-lg text-[11.5px] font-medium cursor-pointer transition-colors whitespace-nowrap ${
                priorityFilter === 'UMUM'
                  ? 'bg-[#165239] text-white shadow-2xs'
                  : 'text-[#526058] hover:text-[#18221D]'
              }`}
            >
              Umum
            </button>
            <button
              type="button"
              onClick={() => onPriorityFilterChange(priorityFilter === 'GA' ? 'ALL' : 'GA')}
              className={`px-2.5 py-1 rounded-lg text-[11.5px] font-medium cursor-pointer inline-flex items-center gap-1 transition-colors whitespace-nowrap ${
                priorityFilter === 'GA'
                  ? 'bg-[#D97706] text-white shadow-2xs'
                  : 'text-[#B45309] hover:bg-[#FEF3C7]/60'
              }`}
            >
              <Flame className="w-3.5 h-3.5" />
              <span>Prioritas GA</span>
            </button>
          </div>
        </div>
      </div>

      {/* Baris 2: Status Antrean Pills + Jumlah Transaksi & Tombol Terima Semua */}
      <div className="pt-2.5 border-t border-[#F0EBDC] flex flex-col lg:flex-row lg:items-center justify-between gap-2.5">
        <div className="inline-flex items-center gap-1 p-1 rounded-xl bg-[#FAF7EE] border border-[#EAE4D3] overflow-x-auto max-w-full w-full lg:w-auto">
          {statusTabs.map((t) => {
            const active = statusFilter === t.key;
            return (
              <button
                key={t.key}
                type="button"
                onClick={() => onStatusFilterChange(t.key)}
                className={`px-2.5 py-1 rounded-lg text-[11.5px] font-medium cursor-pointer inline-flex items-center whitespace-nowrap transition-colors ${
                  active ? 'bg-[#165239] text-white shadow-2xs' : 'text-[#526058] hover:text-[#18221D]'
                }`}
              >
                <span>{t.label}</span>
                <FilterCountPill count={t.count} active={active} />
              </button>
            );
          })}
        </div>

        <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0">
          <span className="text-[12px] text-[#7A867E] tabular-nums">
            {totalFilteredCount} transaksi
          </span>
          {showAcceptAll && pendingCount > 0 && (
            <button
              type="button"
              onClick={onAcceptAll}
              className="px-3.5 py-1.5 rounded-xl bg-[#165239] hover:bg-[#11402c] text-white text-[12px] font-medium inline-flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Terima Semua ({pendingCount})</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
