import React from 'react';
import { Check, Eye, Search } from 'lucide-react';
import type { PendingMember } from '../../../types/kopkarAdmin';

export type MemberFilterTab = 'Semua' | 'Menunggu' | 'Lolos' | 'Ditolak';

interface MemberCandidateListProps {
  members: PendingMember[];
  totalCount: number;
  pendingCount: number;
  searchQuery: string;
  filter: MemberFilterTab;
  onSearchChange: (q: string) => void;
  onFilterChange: (f: MemberFilterTab) => void;
  onOpenDrawer: (m: PendingMember) => void;
}

export const getMemberInitials = (name: string) =>
  name
    .split(' ')
    .slice(0, 2)
    .map((p) => p[0])
    .join('')
    .toUpperCase();

export const getMemberStatusDisplay = (member: PendingMember) => {
  if (member.stageStatus === 'PENDING_HEAD_APPROVAL') {
    return { label: 'Ke Kepala', tone: 'bg-[#EFF6FF] text-[#1D4ED8]' };
  }
  if (member.stageStatus === 'ACTIVE_MEMBER') {
    return { label: 'Aktif Ber-SK', tone: 'bg-[#EAF4EE] text-[#165239]' };
  }
  if (member.status === 'Ditolak') {
    return { label: 'Ditolak', tone: 'bg-[#FEE2E2] text-[#B91C1C]' };
  }
  return { label: 'Menunggu', tone: 'bg-[#FEF3C7] text-[#B45309]' };
};

export const MemberCandidateList: React.FC<MemberCandidateListProps> = ({
  members,
  totalCount,
  pendingCount,
  searchQuery,
  filter,
  onSearchChange,
  onFilterChange,
  onOpenDrawer,
}) => {
  const tabs: Array<{ key: MemberFilterTab; label: string }> = [
    { key: 'Semua', label: `Semua ${totalCount}` },
    { key: 'Menunggu', label: `Menunggu ${pendingCount}` },
    { key: 'Lolos', label: 'Lolos' },
    { key: 'Ditolak', label: 'Ditolak' },
  ];

  return (
    <section className="bg-white rounded-2xl border border-[#EAE4D3] shadow-xs overflow-hidden">
      {/* Header: Title + Search + Filter Pills */}
      <div className="p-5 sm:px-6 sm:py-5 flex flex-col lg:flex-row lg:items-center justify-between gap-3 border-b border-[#F0EBDC]">
        <div>
          <h2 className="text-[17px] sm:text-[18px] font-semibold text-[#18221D]">
            Antrean Verifikasi Anggota
          </h2>
          <p className="text-[12px] sm:text-[12.5px] text-[#7A867E] mt-0.5">
            Validasi identitas karyawan &amp; foto KTP sebelum pengesahan SK Kepala
          </p>
        </div>

        <div className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-2.5 w-full lg:w-auto">
          <div className="relative w-full sm:w-auto">
            <Search className="w-3.5 h-3.5 text-[#7A867E] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Cari nama atau NIK..."
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
                  className={`px-2.5 py-1 rounded-lg text-[11.5px] font-medium cursor-pointer transition-colors whitespace-nowrap ${
                    active
                      ? 'bg-[#165239] text-white shadow-2xs'
                      : 'text-[#526058] hover:text-[#18221D]'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] text-left border-collapse">
          <thead>
            <tr className="bg-[#FAF8F2] border-b border-[#EAE4D3] text-[11.5px] font-medium text-[#526058]">
              <th className="py-3 pl-5 sm:pl-6 pr-3">Calon Anggota</th>
              <th className="py-3 px-3">Unit / Departemen</th>
              <th className="py-3 px-3">Tanggal Masuk</th>
              <th className="py-3 px-3">Kelengkapan</th>
              <th className="py-3 px-3 text-center">Status</th>
              <th className="py-3 pl-3 pr-5 sm:pr-6 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F0EBDC] text-[13px]">
            {members.map((member) => {
              const statusDisplay = getMemberStatusDisplay(member);
              const isPending = member.status === 'Menunggu';

              return (
                <tr key={member.id} className="hover:bg-[#FAF8F2]/70 transition-colors">
                  <td className="py-3.5 pl-5 sm:pl-6 pr-3 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-[#EAF4EE] text-[#165239] text-[11.5px] font-semibold flex items-center justify-center shrink-0">
                        {getMemberInitials(member.fullName)}
                      </div>
                      <div>
                        <div className="font-semibold text-[#18221D]">{member.fullName}</div>
                        <div className="text-[11.5px] text-[#7A867E] tabular-nums">
                          {member.nik}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="py-3.5 px-3 text-[#526058] whitespace-nowrap">
                    {member.department}
                  </td>

                  <td className="py-3.5 px-3 text-[#526058] text-[12px] tabular-nums whitespace-nowrap">
                    {member.submittedAt}
                  </td>

                  <td className="py-3.5 px-3 whitespace-nowrap">
                    <div className="inline-flex items-center gap-1.5">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#FAF8F2] border border-[#EAE4D3] text-[11px] font-medium text-[#18221D]">
                        <Check className="w-3 h-3 text-[#165239]" />
                        KTP/ID
                      </span>
                      {member.payrollConsent && (
                        <span className="inline-flex px-2 py-0.5 rounded-md bg-[#EAF4EE] text-[11px] font-medium text-[#165239]">
                          Payroll OK
                        </span>
                      )}
                    </div>
                  </td>

                  <td className="py-3.5 px-3 text-center whitespace-nowrap">
                    <span
                      className={`inline-flex px-2.5 py-0.5 rounded-full text-[11px] font-medium ${statusDisplay.tone}`}
                    >
                      {statusDisplay.label}
                    </span>
                  </td>

                  <td className="py-3.5 pl-3 pr-5 sm:pr-6 text-right whitespace-nowrap">
                    <button
                      type="button"
                      onClick={() => onOpenDrawer(member)}
                      className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-[12px] font-medium cursor-pointer transition-colors ${
                        isPending
                          ? 'bg-[#165239] hover:bg-[#12422E] text-white shadow-2xs'
                          : 'bg-[#FAF7EE] hover:bg-[#F3EFE2] border border-[#EAE4D3] text-[#526058]'
                      }`}
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>{isPending ? 'Periksa' : 'Detail'}</span>
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
