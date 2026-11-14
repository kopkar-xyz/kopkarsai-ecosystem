import React from 'react';
import { CreditCard, Calculator, CheckCircle2 } from 'lucide-react';
import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { StatusBadge } from '../../../components/ui/StatusBadge';
import { formatCurrencyIDR } from '../../../lib/utils';
import type { LoanSummary } from '../../../types';

interface LoanSummaryCardProps {
  loans: LoanSummary;
}

export const LoanSummaryCard: React.FC<LoanSummaryCardProps> = ({ loans }) => {
  return (
    <Card padding="lg" className="space-y-5">
      <div className="flex items-center justify-between pb-3 border-b border-[#DED5C3]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#EAF4EE] border border-[#A9C3A2] flex items-center justify-center text-[#1F5B45]">
            <CreditCard size={22} />
          </div>
          <div>
            <h3 className="text-lg font-heading font-extrabold text-[#1A2421]">
              Fasilitas Pinjaman
            </h3>
            <span className="text-xs font-body text-[#5C6F67]">
              Plafon Pinjaman Karyawan & Simulasi Cicilan
            </span>
          </div>
        </div>

        <StatusBadge status={loans.statusPengajuan} size="sm" />
      </div>

      {/* Plafon Card */}
      <div className="p-4 rounded-2xl bg-[#F8F4EC] border border-[#DED5C3]">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-accent text-[#5C6F67]">Sisa Plafon Pinjaman Tersedia</span>
          <span className="text-xs font-accent font-bold text-[#1F5B45] bg-[#EAF4EE] px-2 py-0.5 rounded-full border border-[#A9C3A2]">
            Bunga Ringan 0.8% Flat
          </span>
        </div>
        <p className="text-2xl sm:text-3xl font-heading font-extrabold text-[#1A2421] tracking-tight">
          {formatCurrencyIDR(loans.sisaPlafon)}
        </p>
        <p className="text-xs font-body text-[#5C6F67] mt-1">
          Dari batas maksimal {formatCurrencyIDR(loans.plafonMaksimal)}
        </p>
      </div>

      {/* Loan Details Grid */}
      <div className="grid grid-cols-2 gap-3 text-xs">
        <div className="p-3 rounded-xl bg-white border border-[#DED5C3]">
          <span className="font-accent text-[#5C6F67]">Pinjaman Berjalan</span>
          <p className="text-sm font-heading font-bold text-[#1A2421] mt-0.5">
            {formatCurrencyIDR(loans.pinjamanAktif)}
          </p>
        </div>

        <div className="p-3 rounded-xl bg-white border border-[#DED5C3]">
          <span className="font-accent text-[#5C6F67]">Estimasi Cicilan</span>
          <p className="text-sm font-heading font-bold text-[#1F5B45] mt-0.5">
            {formatCurrencyIDR(loans.cicilanPerBulan)} / bln
          </p>
        </div>
      </div>

      <div className="p-3 rounded-xl bg-[#EAF4EE] border border-[#A9C3A2]/60 flex items-center gap-2 text-xs font-body text-[#1F5B45]">
        <CheckCircle2 size={16} className="text-[#2F6F56] flex-shrink-0" />
        <span>Pemotongan otomatis via payroll gaji bulanan (Unit SAI B).</span>
      </div>

      <div className="pt-2 flex justify-end gap-2">
        <Button variant="outline" size="sm" icon={<Calculator size={14} />}>
          Simulasi Pinjaman
        </Button>
        <Button variant="primary" size="sm">
          Ajukan Pinjaman
        </Button>
      </div>
    </Card>
  );
};
