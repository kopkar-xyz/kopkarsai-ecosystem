import React from 'react';
import { Clock, DollarSign, Package, TrendingUp } from 'lucide-react';
import { KpiStatCard } from '../../../components/ui/KpiStatCard';

export const SupplyKpiCards: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <KpiStatCard
        label="Tingkat Keterjualan"
        value="94,8%"
        pill="Minim retur · 7 hari"
        icon={TrendingUp}
      />
      <KpiStatCard
        label="Rata-rata Sisa Sore"
        value="1,8"
        unit="pcs"
        pill="Dari kuota 30 pcs/hari"
        icon={Package}
      />
      <KpiStatCard
        label="Omzet Minggu Ini"
        value="Rp 1.480.000"
        pill="+18,5% vs minggu lalu"
        icon={DollarSign}
      />
      <KpiStatCard
        label="Jam Puncak Belanja"
        value="07:30 & 12:00"
        pill="Sarapan & Istirahat"
        pillTone="warning"
        icon={Clock}
      />
    </div>
  );
};
