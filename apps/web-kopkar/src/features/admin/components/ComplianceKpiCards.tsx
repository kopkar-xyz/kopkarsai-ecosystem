import React from 'react';
import { AlertTriangle, Clock, Eye, Plus, ShieldCheck } from 'lucide-react';
import { KpiStatCard } from '../../../components/ui/KpiStatCard';

interface ComplianceKpiCardsProps {
  defectActiveCount: number;
  inactivityCount: number;
  showForm: boolean;
  isReadOnly?: boolean;
  onToggleForm: () => void;
}

export const ComplianceKpiCards: React.FC<ComplianceKpiCardsProps> = ({
  defectActiveCount,
  inactivityCount,
  showForm,
  isReadOnly = false,
  onToggleForm,
}) => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4 select-none">
      <KpiStatCard
        label="Rata-rata SLA Mitra"
        value="91,4%"
        pill="Ambil sisa 16:00–17:00 WIB"
        icon={ShieldCheck}
      />
      <KpiStatCard
        label="Tiket Cacat Mutu"
        value={defectActiveCount}
        unit="aktif"
        pill="Kebijakan makanan no-refund"
        pillTone="warning"
        icon={AlertTriangle}
      />
      <KpiStatCard
        label="Timer Inaktivitas"
        value={inactivityCount}
        unit="produk"
        pill="Peringatan H-7 · Delist 30 hari"
        pillTone="warning"
        icon={Clock}
      />

      {isReadOnly ? (
        <KpiStatCard
          label="Status Akses"
          value="Monitoring"
          pill="Eksekusi sanksi oleh Admin Toko"
          icon={Eye}
        />
      ) : (
        <div className="p-3.5 sm:p-5 rounded-2xl bg-white border border-[#EAE4D3] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 hover:border-[#165239]/40 transition-colors">
          <div>
            <div className="text-[13px] text-[#526058]">Catat Temuan</div>
            <div className="text-[11.5px] text-[#7A867E] mt-1">
              Buat tiket cacat baru
            </div>
          </div>
          <button
            type="button"
            onClick={onToggleForm}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#165239] hover:bg-[#12422E] text-white text-[12.5px] font-medium cursor-pointer shrink-0 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{showForm ? 'Tutup' : 'Catat'}</span>
          </button>
        </div>
      )}
    </div>
  );
};
