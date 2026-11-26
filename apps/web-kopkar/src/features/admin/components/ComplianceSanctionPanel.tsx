import React from 'react';
import { Check, Eye, ShieldAlert } from 'lucide-react';
import type { ComplianceRecord } from '../../../types/kopkarAdmin';

interface ComplianceSanctionPanelProps {
  record: ComplianceRecord;
  isReadOnly?: boolean;
  onApplySanction: (id: string, severity: ComplianceRecord['severity']) => void;
}

const SANCTION_TIERS: Array<{
  severity: ComplianceRecord['severity'];
  title: string;
  subtitle: string;
}> = [
  {
    severity: 'Teguran 1',
    title: 'Teguran Tertulis',
    subtitle: 'Sanksi ringan · pembinaan',
  },
  {
    severity: 'Skorsing 7-30 Hari',
    title: 'Skorsing 7–30 Hari',
    subtitle: 'Sembunyikan produk dari etalase',
  },
  {
    severity: 'Blacklist Produk',
    title: 'Blacklist Produk',
    subtitle: 'Hapus produk permanen',
  },
  {
    severity: 'Suspend',
    title: 'Blacklist Supplier',
    subtitle: 'Bekukan akun mitra',
  },
];

export const ComplianceSanctionPanel: React.FC<ComplianceSanctionPanelProps> = ({
  record,
  isReadOnly = false,
  onApplySanction,
}) => {
  return (
    <div className="bg-white rounded-2xl border border-[#EAE4D3] p-6 space-y-5 shadow-xs">
      {/* Header */}
      <div className="flex items-start justify-between gap-3 pb-4 border-b border-[#F0EBDC]">
        <div className="min-w-0">
          <div className="text-[11.5px] text-[#7A867E] tabular-nums">
            {record.ticketId ?? 'INACT-30D'} · {record.date}
          </div>
          <h2 className="text-[18px] font-semibold text-[#18221D] mt-0.5 leading-snug">
            {record.productName ?? record.entityName}
          </h2>
          <p className="text-[12px] text-[#7A867E] mt-0.5">
            {record.entityName} · {record.departmentOrUnit}
          </p>
        </div>

        <div className="text-right shrink-0">
          <div className="text-[11px] text-[#7A867E]">Skor SLA</div>
          <div className="font-geist font-normal text-[22px] text-[#165239] tabular-nums leading-tight mt-0.5">
            {record.slaScore ?? 85}%
          </div>
        </div>
      </div>

      {/* Ringkasan & Komitmen */}
      <div className="space-y-3">
        <div className="p-3.5 rounded-xl bg-[#FAF8F2] border border-[#EAE4D3] space-y-1">
          <span className="text-[10.5px] font-semibold tracking-[0.06em] text-[#7A867E] uppercase block">
            RINGKASAN TEMUAN
          </span>
          <p className="text-[12.5px] text-[#18221D] leading-relaxed">
            {record.defectType ?? record.issue}
          </p>
        </div>

        {record.supplierResponse && (
          <div className="p-3.5 rounded-xl bg-[#EAF4EE]/60 border border-[#B7DFC7] space-y-1">
            <span className="text-[10.5px] font-semibold tracking-[0.06em] text-[#165239] uppercase block">
              KOMITMEN PERBAIKAN MITRA
            </span>
            <p className="text-[12.5px] text-[#165239] leading-relaxed">
              {record.supplierResponse}
            </p>
          </div>
        )}

        {typeof record.inactiveDays === 'number' && (
          <div className="p-3.5 rounded-xl bg-[#FFF3D6] border border-[#FCD34D] space-y-1">
            <span className="text-[10.5px] font-semibold tracking-[0.06em] text-[#B45309] uppercase block">
              KEBIJAKAN INAKTIVITAS 30 HARI
            </span>
            <p className="text-[12.5px] text-[#B45309] leading-relaxed">
              Produk telah inaktif selama {record.inactiveDays} hari. Sisa waktu sebelum delisting
              permanen: {Math.max(0, 30 - record.inactiveDays)} hari lagi.
            </p>
          </div>
        )}
      </div>

      {isReadOnly ? (
        <div className="p-4 rounded-xl bg-[#FAF8F2] border border-[#EAE4D3] flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-[12px] text-[#526058]">
            <Eye className="w-4 h-4 text-[#165239] shrink-0" />
            <span>Status Sanksi Berjalan (Mode Monitoring)</span>
          </div>
          <span className="px-3 py-1 rounded-full bg-[#165239] text-white text-[11.5px] font-semibold">
            {record.severity}
          </span>
        </div>
      ) : (
        <>
          {/* Sanksi Bertingkat 2x2 Grid */}
          <div className="space-y-2.5">
            <div className="text-[12.5px] font-medium text-[#18221D]">
              Pilih Tingkat Sanksi Bertingkat
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {SANCTION_TIERS.map((tier) => {
                const isSelected =
                  record.severity === tier.severity ||
                  (tier.severity === 'Teguran 1' && record.severity === 'Teguran 2');
                return (
                  <button
                    key={tier.severity}
                    type="button"
                    onClick={() => onApplySanction(record.id, tier.severity)}
                    className={`text-left p-3.5 rounded-xl border transition-colors cursor-pointer flex items-start justify-between gap-2 ${
                      isSelected
                        ? 'bg-[#165239] border-[#165239] text-white shadow-xs'
                        : 'bg-[#FAF8F2] border-[#EAE4D3] hover:bg-[#F3EFE2] text-[#18221D]'
                    }`}
                  >
                    <div>
                      <div className="text-[13px] font-semibold leading-snug">
                        {tier.title}
                      </div>
                      <div
                        className={`text-[11px] mt-0.5 ${
                          isSelected ? 'text-white/80' : 'text-[#7A867E]'
                        }`}
                      >
                        {tier.subtitle}
                      </div>
                    </div>
                    {isSelected && <Check className="w-4 h-4 shrink-0 mt-0.5" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Footer */}
          <div className="pt-3 border-t border-[#F0EBDC] flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-1.5 text-[11.5px] text-[#7A867E]">
              <ShieldAlert className="w-3.5 h-3.5 text-[#B45309] shrink-0" />
              <span>Skorsing &amp; Blacklist otomatis nonaktifkan etalase</span>
            </div>

            <button
              type="button"
              onClick={() => onApplySanction(record.id, 'Normal')}
              className="px-3.5 py-1.5 rounded-xl border border-[#EAE4D3] bg-white hover:bg-[#FAF7EE] text-[12px] font-medium text-[#18221D] cursor-pointer transition-colors"
            >
              Pulihkan (Patuh)
            </button>
          </div>
        </>
      )}
    </div>
  );
};
