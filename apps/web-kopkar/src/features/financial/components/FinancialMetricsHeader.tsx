import React from 'react';
import { CreditCard, ShieldCheck, Wallet } from 'lucide-react';
import { KpiStatCard } from '../../../components/ui/KpiStatCard';
import { formatCurrencyIDR } from '../../../lib/utils';

interface FinancialMetricsHeaderProps {
  maxCeiling?: number;
  currentDebt?: number;
  remainingCeiling?: number;
}

export const FinancialMetricsHeader: React.FC<FinancialMetricsHeaderProps> = ({
  maxCeiling = 50000000,
  currentDebt = 15000000,
  remainingCeiling = 35000000,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <KpiStatCard
        label="Batas Plafon Maksimal"
        value={formatCurrencyIDR(maxCeiling)}
        pill="Aturan Resmi Koperasi (KK-REQ-006)"
        icon={ShieldCheck}
      />
      <KpiStatCard
        label="Pinjaman Berjalan (Aktif)"
        value={formatCurrencyIDR(currentDebt)}
        pill="Sisa angsuran 7 bulan lagi"
        pillTone="warning"
        icon={CreditCard}
      />
      <KpiStatCard
        label="Sisa Hak Plafon Pengajuan"
        value={formatCurrencyIDR(remainingCeiling)}
        pill="Tersedia untuk diajukan"
        icon={Wallet}
      />
    </div>
  );
};
