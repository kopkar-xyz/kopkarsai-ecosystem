import React from 'react';
import { Wallet } from 'lucide-react';
import { LoanSummaryCard } from '../features/financial/components/LoanSummaryCard';
import { LoanTransactionsCard } from '../features/financial/components/LoanTransactionsCard';
import type { LoanSummary } from '../types';

const MOCK_LOAN_DATA: LoanSummary = {
  plafonMaksimal: 15000000,
  pinjamanAktif: 2500000,
  sisaPlafon: 12500000,
  tenorBulan: 10,
  cicilanPerBulan: 270000,
  statusPengajuan: 'ACTIVE',
};

/**
 * FinancialView (Simpan Pinjam) — KK-SCR-005
 * Dedicated separate page for cooperative loan facilities and transactions.
 * Thin route composition view strictly following the 200-line budget invariant.
 */
export const FinancialView: React.FC = () => {
  return (
    <div className="space-y-5 sm:space-y-6">
      {/* Header Halaman SinJam (Mobile & Desktop) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#DED5C3]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#1F5B45] text-white flex items-center justify-center flex-shrink-0 shadow-xs">
            <Wallet size={20} />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-heading font-extrabold text-[#1A2421]">
              Layanan SinJam (Simpan Pinjam)
            </h1>
            <p className="text-xs sm:text-sm font-body text-[#5C6F67]">
              Fasilitas pinjaman karyawan PT SAI, simulasi cicilan, dan transaksi pelunasan
            </p>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-2">
          <span className="text-xs font-accent font-semibold text-[#1F5B45] bg-[#EAF4EE] px-3 py-1 rounded-full border border-[#A9C3A2]/60">
            Payroll Unit SAI B
          </span>
        </div>
      </div>

      {/* 1. Fasilitas Pinjaman */}
      <LoanSummaryCard loans={MOCK_LOAN_DATA} />

      {/* 2. Transaksi Pinjaman (Pinjam & Tebus/Pelunasan) */}
      <LoanTransactionsCard />
    </div>
  );
};
