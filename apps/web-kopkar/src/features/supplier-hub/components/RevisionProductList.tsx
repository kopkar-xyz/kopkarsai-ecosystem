import React from 'react';
import { Eye, Package, Search } from 'lucide-react';
import { FilterCountPill } from '../../../components/ui/FilterCountPill';
import {
  getRevisionBadgeTone,
  type LogFilterType,
  type UnifiedLogItem,
} from '../data/revisionLogData';

interface RevisionProductListProps {
  items: UnifiedLogItem[];
  counts: { all: number; revisi: number; uji: number; selesai: number };
  filter: LogFilterType;
  search: string;
  isReadOnly?: boolean;
  onFilterChange: (f: LogFilterType) => void;
  onSearchChange: (q: string) => void;
  onOpenDrawer: (item: UnifiedLogItem) => void;
}

const formatRp = (val: number) => `Rp ${val.toLocaleString('id-ID')}`;

export const RevisionProductList: React.FC<RevisionProductListProps> = ({
  items,
  counts,
  filter,
  search,
  isReadOnly = false,
  onFilterChange,
  onSearchChange,
  onOpenDrawer,
}) => {
  const tabs: Array<{ key: LogFilterType; label: string; count: number }> = [
    { key: 'Semua', label: 'Semua', count: counts.all },
    { key: 'Perlu Revisi', label: 'Revisi', count: counts.revisi },
    { key: 'Menunggu Uji', label: 'Uji', count: counts.uji },
    { key: 'Selesai', label: 'Selesai', count: counts.selesai },
  ];

  return (
    <section className="bg-white rounded-2xl border border-[#EAE4D3] shadow-xs overflow-hidden">
      {/* Header + Search + Filter Pills */}
      <div className="p-5 sm:px-6 sm:py-5 flex flex-col lg:flex-row lg:items-center justify-between gap-3 border-b border-[#F0EBDC]">
        <div>
          <h2 className="text-[17px] sm:text-[18px] font-semibold text-[#18221D]">
            Riwayat Revisi &amp; Versi Produk
          </h2>
          <p className="text-[12px] sm:text-[12.5px] text-[#7A867E] mt-0.5">
            Pantau catatan kurasi, penyesuaian HPP, dan tindak lanjut produk mitra
          </p>
        </div>

        <div className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-2.5 w-full lg:w-auto">
          <div className="relative w-full sm:w-auto">
            <Search className="w-3.5 h-3.5 text-[#7A867E] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Cari produk atau mitra..."
              className="w-full sm:w-52 bg-[#FAF8F2] border border-[#EAE4D3] rounded-xl pl-8 pr-3 py-1.5 text-[12px] text-[#18221D] placeholder:text-[#859089] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#165239]"
            />
          </div>

          <div className="inline-flex items-center gap-1 p-1 rounded-xl bg-[#FAF7EE] border border-[#EAE4D3] max-w-full overflow-x-auto">
            {tabs.map((tab) => {
              const active = filter === tab.key;
              return (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => onFilterChange(tab.key)}
                  className={`px-2.5 py-1 rounded-lg text-[11.5px] font-medium cursor-pointer transition-colors whitespace-nowrap inline-flex items-center ${
                    active
                      ? 'bg-[#165239] text-white shadow-2xs'
                      : 'text-[#526058] hover:text-[#18221D]'
                  }`}
                >
                  <span>{tab.label}</span>
                  <FilterCountPill count={tab.count} active={active} />
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] text-left border-collapse">
          <thead>
            <tr className="bg-[#FAF8F2] border-b border-[#EAE4D3] text-[11.5px] font-medium text-[#526058]">
              <th className="py-3 pl-5 sm:pl-6 pr-3">Produk &amp; Mitra</th>
              <th className="py-3 px-3">Versi</th>
              <th className="py-3 px-3">HPP / Harga Jual</th>
              <th className="py-3 px-3">Catatan Terakhir</th>
              <th className="py-3 px-3 text-center">Status</th>
              <th className="py-3 pl-3 pr-5 sm:pr-6 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F0EBDC] text-[13px]">
            {items.map((item) => {
              const latest = item.entries[0];
              const hpp = item.hppPrice;
              const sell = item.sellingPrice;
              const marginPct =
                hpp && sell && sell > 0 ? Math.round(((sell - hpp) / sell) * 100) : null;
              const needsFollowUp = !isReadOnly && item.filterBucket !== 'Selesai';

              return (
                <tr key={item.key} className="hover:bg-[#FAF8F2]/70 transition-colors">
                  <td className="py-3.5 pl-5 sm:pl-6 pr-3 max-w-[260px]">
                    <div className="flex items-center gap-3">
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.productName}
                          referrerPolicy="no-referrer"
                          className="w-10 h-10 rounded-xl object-cover shrink-0 border border-[#EAE4D3]"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-xl bg-[#EAF4EE] text-[#165239] flex items-center justify-center shrink-0">
                          <Package className="w-4 h-4" />
                        </div>
                      )}
                      <div className="min-w-0">
                        <div className="font-semibold text-[#18221D] leading-snug line-clamp-2">
                          {item.productName}
                        </div>
                        <div className="text-[11.5px] text-[#7A867E] truncate mt-0.5">
                          {item.supplier} · {item.unitLabel}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="py-3.5 px-3 whitespace-nowrap tabular-nums">
                    <div className="font-semibold text-[#18221D]">{item.version}</div>
                    <div className="text-[11px] text-[#7A867E]">
                      {item.entries.length} riwayat
                    </div>
                  </td>

                  <td className="py-3.5 px-3 whitespace-nowrap tabular-nums">
                    {hpp && sell ? (
                      <>
                        <div className="font-medium text-[#18221D]">
                          {formatRp(hpp)} → {formatRp(sell)}
                        </div>
                        {marginPct !== null && (
                          <div className="text-[11.5px] font-medium text-[#165239]">
                            Margin {marginPct}%
                          </div>
                        )}
                      </>
                    ) : (
                      <span className="text-[#7A867E]">—</span>
                    )}
                  </td>

                  <td className="py-3.5 px-3 max-w-[260px]">
                    {latest ? (
                      <>
                        <div className="text-[12.5px] text-[#18221D] line-clamp-1">
                          {latest.note}
                        </div>
                        <div className="text-[11px] text-[#7A867E] mt-0.5 truncate">
                          {latest.date} · {latest.actor}
                        </div>
                      </>
                    ) : (
                      <span className="text-[#7A867E]">—</span>
                    )}
                  </td>

                  <td className="py-3.5 px-3 text-center whitespace-nowrap">
                    <span
                      className={`inline-flex px-2.5 py-0.5 rounded-full text-[11px] font-medium ${getRevisionBadgeTone(
                        item.statusBadge
                      )}`}
                    >
                      {item.statusBadge}
                    </span>
                  </td>

                  <td className="py-3.5 pl-3 pr-5 sm:pr-6 text-right whitespace-nowrap">
                    <button
                      type="button"
                      onClick={() => onOpenDrawer(item)}
                      className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-[12px] font-medium cursor-pointer transition-colors ${
                        needsFollowUp
                          ? 'bg-[#165239] hover:bg-[#12422E] text-white shadow-2xs'
                          : 'bg-[#FAF7EE] hover:bg-[#F3EFE2] border border-[#EAE4D3] text-[#526058]'
                      }`}
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>{needsFollowUp ? 'Tindak Lanjut' : 'Riwayat'}</span>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
};
