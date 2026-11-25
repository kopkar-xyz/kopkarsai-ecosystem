import React from 'react';
import { Award, Clock, ShieldCheck } from 'lucide-react';
import { KpiStatCard } from '../../../components/ui/KpiStatCard';

interface HeadApprovalKpiCardsProps {
  pendingCount: number;
  memberPendingCount: number;
  totalLicensedMembers: number;
}

export const HeadApprovalKpiCards: React.FC<HeadApprovalKpiCardsProps> = ({
  pendingCount,
  memberPendingCount,
  totalLicensedMembers,
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <KpiStatCard
        label="Perlu Keputusan"
        value={pendingCount}
        unit="pengajuan"
        pill="Antrean otorisasi final"
        pillTone="warning"
        icon={Clock}
      />
      <KpiStatCard
        label="Menunggu SK Anggota"
        value={memberPendingCount}
        unit="berkas"
        pill="Lolos cek Admin Toko"
        icon={Award}
      />
      <KpiStatCard
        label="Total Anggota Ber-SK"
        value={totalLicensedMembers}
        unit="anggota"
        pill="Akses SSO & diskon 13%"
        icon={ShieldCheck}
      />
    </div>
  );
};
