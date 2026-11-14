import React from 'react';
import { PiggyBank, ArrowUpRight, TrendingUp } from 'lucide-react';
import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { formatCurrencyIDR } from '../../../lib/utils';
import type { SavingsSummary } from '../../../types';

interface SavingsSummaryCardProps {
  savings: SavingsSummary;
}

export const SavingsSummaryCard: React.FC<SavingsSummaryCardProps> = ({ savings }) => {
  return (
    <Card padding="lg" className="space-y-5">
      <div className="flex items-center justify-between pb-3 border-b border-[#DED5C3]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#EAF4EE] border border-[#A9C3A2] flex items-center justify-center text-[#1F5B45]">
            <PiggyBank size={22} />
          </div>
          <div>
            <h3 className="text-lg font-heading font-extrabold text-[#1A2421]">
              Tabungan Koperasi
            </h3>
            <span className="text-xs font-body text-[#5C6F67]">
              Simpanan Anggota & Estimasi SHU
            </span>
          </div>
        </div>

        <span className="text-xs font-accent font-bold text-[#1F5B45] bg-[#EAF4EE] px-2.5 py-1 rounded-full border border-[#A9C3A2]">
          Simpanan Aktif
        </span>
      </div>

      {/* Hero Balance */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-[#1F5B45] to-[#2F6F56] text-white shadow-sm">
        <p className="text-xs font-accent text-[#F3ECDD]/90">Total Akumulasi Simpanan</p>
        <p className="text-2xl sm:text-3xl font-heading font-extrabold text-white tracking-tight mt-1">
          {formatCurrencyIDR(savings.totalSaldo)}
        </p>
        <div className="mt-3 flex items-center gap-1.5 text-xs font-accent font-semibold text-[#F3ECDD] bg-black/20 px-2.5 py-1 rounded-lg w-fit">
          <TrendingUp size={13} className="text-[#A9C3A2]" />
          <span>Estimasi SHU Tahun Berjalan: {formatCurrencyIDR(savings.estimasiShu)}</span>
        </div>
      </div>

      {/* Breakdown 3 Kolom */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="p-3 rounded-xl bg-[#F8F4EC] border border-[#DED5C3]">
          <p className="text-[11px] font-accent text-[#5C6F67]">Simpanan Pokok</p>
          <p className="text-sm font-heading font-bold text-[#1A2421] mt-0.5">
            {formatCurrencyIDR(savings.simpananPokok)}
          </p>
        </div>

        <div className="p-3 rounded-xl bg-[#F8F4EC] border border-[#DED5C3]">
          <p className="text-[11px] font-accent text-[#5C6F67]">Simpanan Wajib</p>
          <p className="text-sm font-heading font-bold text-[#1A2421] mt-0.5">
            {formatCurrencyIDR(savings.simpananWajib)}
          </p>
        </div>

        <div className="p-3 rounded-xl bg-[#F8F4EC] border border-[#DED5C3]">
          <p className="text-[11px] font-accent text-[#5C6F67]">Simpanan Sukarela</p>
          <p className="text-sm font-heading font-bold text-[#1A2421] mt-0.5">
            {formatCurrencyIDR(savings.simpananSukarela)}
          </p>
        </div>
      </div>

      <div className="pt-2 flex justify-end">
        <Button variant="outline" size="sm" icon={<ArrowUpRight size={14} />}>
          Setor Simpanan Sukarela
        </Button>
      </div>
    </Card>
  );
};
