import React from 'react';
import { Clock, ShieldCheck, UserCheck } from 'lucide-react';
import { KpiStatCard } from '../../../components/ui/KpiStatCard';

interface MemberVerificationKpiCardsProps {
  pendingCount: number;
  headWaitCount: number;
  activeCount: number;
}

export const MemberVerificationKpiCards: React.FC<MemberVerificationKpiCardsProps> = ({
  pendingCount,
  headWaitCount,
  activeCount,
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <KpiStatCard
        label="Perlu Verifikasi"
        value={pendingCount}
        unit="berkas"
        pill="Antrean cek Admin Toko"
        pillTone="warning"
        icon={Clock}
      />
      <KpiStatCard
        label="Menunggu SK Kepala"
        value={headWaitCount}
        unit="berkas"
        pill="Lolos Tahap 1 · Menunggu SK"
        pillTone="warning"
        icon={UserCheck}
      />
      <KpiStatCard
        label="Anggota Resmi Aktif"
        value={140 + activeCount}
        unit="anggota"
        pill="SK terbit & SSO aktif"
        icon={ShieldCheck}
      />
    </div>
  );
};
