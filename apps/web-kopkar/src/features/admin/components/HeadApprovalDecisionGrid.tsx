import React from 'react';
import { Eye } from 'lucide-react';
import { FilterCountPill } from '../../../components/ui/FilterCountPill';
import { formatCurrencyIDR } from '../../../lib/utils';
import type { ExecutiveApproval } from '../../../types/kopkarAdmin';

export type HeadApprovalFilterTab = 'Semua' | 'SK Anggota' | 'Pinjaman & Suplai';

interface HeadApprovalDecisionGridProps {
  approvals: ExecutiveApproval[];
  totalCount: number;
  activeTab: HeadApprovalFilterTab;
  onTabChange: (tab: HeadApprovalFilterTab) => void;
  onOpenDrawer: (app: ExecutiveApproval) => void;
}

export const HeadApprovalDecisionGrid: React.FC<HeadApprovalDecisionGridProps> = ({
  approvals,
  totalCount,
  activeTab,
  onTabChange,
  onOpenDrawer,
}) => {
  const tabs: Array<{ key: HeadApprovalFilterTab; label: string; count?: number }> = [
    { key: 'Semua', label: 'Semua', count: totalCount },
    { key: 'SK Anggota', label: 'SK Anggota' },
    { key: 'Pinjaman & Suplai', label: 'Pinjaman & Suplai' },
  ];

  return (
    <section className="bg-white rounded-2xl border border-[#EAE4D3] shadow-xs overflow-hidden">
      {/* Header + Segmented Filter */}
      <div className="p-5 sm:px-6 sm:py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#F0EBDC]">
        <div>
          <h2 className="text-[17px] sm:text-[18px] font-semibold text-[#18221D]">
            Persetujuan Final Kepala Koperasi
          </h2>
          <p className="text-[12px] sm:text-[12.5px] text-[#7A867E] mt-0.5">
            Pengesahan SK anggota baru, pinjaman SinJam, dan anggaran suplai
          </p>
        </div>

        <div className="inline-flex items-center gap-1 p-1 rounded-xl bg-[#FAF7EE] border border-[#EAE4D3] self-start sm:self-auto max-w-full overflow-x-auto">
          {tabs.map((tab) => {
            const active = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => onTabChange(tab.key)}
                className={`px-3 py-1.5 rounded-lg text-[12px] font-medium cursor-pointer transition-colors whitespace-nowrap inline-flex items-center ${
                  active
                    ? 'bg-[#165239] text-white shadow-2xs'
                    : 'text-[#526058] hover:text-[#18221D]'
                }`}
              >
                <span>{tab.label}</span>
                {typeof tab.count === 'number' && (
                  <FilterCountPill count={tab.count} active={active} />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[680px] text-left border-collapse">
          <thead>
            <tr className="bg-[#FAF8F2] border-b border-[#EAE4D3] text-[11.5px] font-medium text-[#526058]">
              <th className="py-3 pl-5 sm:pl-6 pr-3">Pengajuan</th>
              <th className="py-3 px-3">Kategori</th>
              <th className="py-3 px-3">Pemohon</th>
              <th className="py-3 px-3 text-right">Nilai / Nomor SK</th>
              <th className="py-3 px-3 text-center">Status</th>
              <th className="py-3 pl-3 pr-5 sm:pr-6 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F0EBDC] text-[13px]">
            {approvals.map((app) => {
              const isMember = app.category === 'Otorisasi Anggota';
              const isPending = app.status === 'Menunggu';
              const displayTitle = isMember
                ? `SK Anggota — ${app.requester}`
                : app.title;
              const categoryLabel = isMember ? 'SK Anggota' : app.category;
              const valueDisplay = isMember
                ? app.skNumber ?? 'SK/KOP-SAI/XI/2026/041'
                : formatCurrencyIDR(app.amount);

              return (
                <tr
                  key={app.id}
                  className="hover:bg-[#FAF8F2]/70 transition-colors"
                >
                  <td className="py-3.5 pl-5 sm:pl-6 pr-3 max-w-[300px]">
                    <div className="font-semibold text-[#18221D] leading-snug">
                      {displayTitle}
                    </div>
                    <div className="text-[11.5px] text-[#7A867E] mt-0.5 tabular-nums">
                      {app.id} · {app.submittedAt}
                    </div>
                  </td>

                  <td className="py-3.5 px-3 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2.5 py-0.5 rounded-full text-[11px] font-medium ${
                        isMember
                          ? 'bg-[#EAF4EE] text-[#165239]'
                          : 'bg-[#F3F0E6] text-[#526058]'
                      }`}
                    >
                      {categoryLabel}
                    </span>
                  </td>

                  <td className="py-3.5 px-3">
                    <div className="font-medium text-[#18221D] whitespace-nowrap">
                      {app.requester}
                    </div>
                    {app.nik && (
                      <div className="text-[11px] text-[#7A867E] tabular-nums">
                        {app.nik}
                      </div>
                    )}
                  </td>

                  <td className="py-3.5 px-3 text-right whitespace-nowrap tabular-nums">
                    <span
                      className={
                        isMember
                          ? 'text-[12px] font-medium text-[#165239]'
                          : 'font-geist font-normal text-[14px] text-[#18221D]'
                      }
                    >
                      {valueDisplay}
                    </span>
                  </td>

                  <td className="py-3.5 px-3 text-center whitespace-nowrap">
                    <span
                      className={`inline-flex px-2.5 py-0.5 rounded-full text-[11px] font-medium ${
                        app.status === 'Disetujui'
                          ? 'bg-[#EAF4EE] text-[#165239]'
                          : app.status === 'Dikembalikan'
                            ? 'bg-[#FEE2E2] text-[#B91C1C]'
                            : 'bg-[#FEF3C7] text-[#B45309]'
                      }`}
                    >
                      {app.status}
                    </span>
                  </td>

                  <td className="py-3.5 pl-3 pr-5 sm:pr-6 text-right whitespace-nowrap">
                    <button
                      type="button"
                      onClick={() => onOpenDrawer(app)}
                      className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-[12px] font-medium cursor-pointer transition-colors ${
                        isPending
                          ? 'bg-[#165239] hover:bg-[#12422E] text-white shadow-2xs'
                          : 'bg-[#FAF7EE] hover:bg-[#F3EFE2] border border-[#EAE4D3] text-[#526058]'
                      }`}
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>{isPending ? 'Tinjau' : 'Detail'}</span>
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
