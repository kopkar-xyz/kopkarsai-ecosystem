import React from 'react';
import type { ComplianceRecord } from '../../../types/kopkarAdmin';

interface ComplianceRecordListProps {
  records: ComplianceRecord[];
  activeTab: 'defect' | 'inactivity';
  selectedId: string;
  defectCount: number;
  inactivityCount: number;
  onTabChange: (tab: 'defect' | 'inactivity') => void;
  onSelect: (record: ComplianceRecord) => void;
}

const getSeverityBadgeClass = (severity: ComplianceRecord['severity']) => {
  switch (severity) {
    case 'Normal':
      return 'bg-[#EAF4EE] text-[#165239]';
    case 'Teguran 1':
      return 'bg-[#FEF3C7] text-[#B45309]';
    case 'Teguran 2':
      return 'bg-[#FEE2E2] text-[#B91C1C]';
    default:
      return 'bg-[#FEE2E2] text-[#991B1B]';
  }
};

const getSlaBadgeClass = (score: number) => {
  if (score >= 85) return 'text-[#165239] bg-[#EAF4EE]';
  if (score >= 75) return 'text-[#B45309] bg-[#FEF3C7]';
  return 'text-[#B91C1C] bg-[#FEE2E2]';
};

export const ComplianceRecordList: React.FC<ComplianceRecordListProps> = ({
  records,
  activeTab,
  selectedId,
  defectCount,
  inactivityCount,
  onTabChange,
  onSelect,
}) => {
  return (
    <div className="bg-white rounded-2xl border border-[#EAE4D3] p-5 space-y-4 shadow-xs">
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => onTabChange('defect')}
          className={`px-3.5 py-1.5 rounded-full text-[12px] font-medium cursor-pointer transition-colors ${
            activeTab === 'defect'
              ? 'bg-[#165239] text-white shadow-2xs'
              : 'bg-[#FAF7EE] text-[#526058] hover:text-[#18221D]'
          }`}
        >
          Tiket Cacat Mutu ({defectCount})
        </button>
        <button
          type="button"
          onClick={() => onTabChange('inactivity')}
          className={`px-3.5 py-1.5 rounded-full text-[12px] font-medium cursor-pointer transition-colors ${
            activeTab === 'inactivity'
              ? 'bg-[#165239] text-white shadow-2xs'
              : 'bg-[#FAF7EE] text-[#526058] hover:text-[#18221D]'
          }`}
        >
          Timer Inaktivitas 30 Hari ({inactivityCount})
        </button>
      </div>

      <div className="space-y-3">
        {records.map((rec) => {
          const isSelected = selectedId === rec.id;
          const slaScore = rec.slaScore ?? 85;

          return (
            <button
              key={rec.id}
              type="button"
              onClick={() => onSelect(rec)}
              className={`w-full text-left p-4 rounded-xl border transition-all cursor-pointer space-y-2.5 ${
                isSelected
                  ? 'bg-[#EAF4EE]/35 border-[#165239] ring-1 ring-[#165239]/20'
                  : 'bg-white border-[#EAE4D3] hover:bg-[#FAF8F2]'
              }`}
            >
              {/* Row 1: ID + Tanggal & Status + SLA */}
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-md bg-white border border-[#EAE4D3] text-[11px] font-mono text-[#526058]">
                    {rec.ticketId ?? 'INACT-30D'}
                  </span>
                  <span className="text-[11px] text-[#7A867E] tabular-nums">
                    {rec.date}
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[11px] font-medium ${getSeverityBadgeClass(
                      rec.severity
                    )}`}
                  >
                    {rec.severity}
                  </span>
                  {typeof rec.inactiveDays === 'number' ? (
                    <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-[#FEF3C7] text-[#B45309] tabular-nums">
                      {rec.inactiveDays} hari inaktif
                    </span>
                  ) : (
                    <span
                      className={`px-2 py-0.5 rounded-full text-[11px] font-semibold tabular-nums ${getSlaBadgeClass(
                        slaScore
                      )}`}
                    >
                      SLA {slaScore}%
                    </span>
                  )}
                </div>
              </div>

              {/* Row 2: Nama Produk & Mitra */}
              <div>
                <div className="text-[14px] font-semibold text-[#18221D] leading-snug">
                  {rec.productName ?? rec.entityName}
                </div>
                <div className="text-[12px] text-[#526058] mt-0.5">
                  {rec.entityName} · {rec.departmentOrUnit}
                </div>
              </div>

              {/* Row 3: Ringkasan Temuan / Masalah */}
              <div className="px-3 py-2 rounded-lg bg-[#FAF8F2] border border-[#EAE4D3]/80 text-[11.5px] text-[#526058] leading-snug line-clamp-1">
                <span className="font-medium text-[#18221D]">Temuan:</span>{' '}
                {rec.defectType ?? rec.issue}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
