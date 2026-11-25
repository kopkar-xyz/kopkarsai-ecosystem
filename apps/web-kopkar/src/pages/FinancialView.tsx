import React, { useState } from 'react';
import { FinancialMetricsHeader } from '../features/financial/components/FinancialMetricsHeader';
import { LoanCalculatorCard } from '../features/financial/components/LoanCalculatorCard';
import { SavingsLoanHistoryCard } from '../features/financial/components/SavingsLoanHistoryCard';
import { SavingsShuCard } from '../features/financial/components/SavingsShuCard';

const MAX_LOAN_CEILING = 50000000; // Rp 50 Juta (KK-REQ-006)

/**
 * FinancialView (Layanan Sinjam / Kalkulator Simulasi Simpan Pinjam) — KK-SCR-012
 * Slicing 1:1 Presisi Gambar 1 Referensi:
 * - 3 Kartu Metrik Plafon (Maksimal, Berjalan, Sisa Hak)
 * - Grid 2 Kolom: Kalkulator Simulasi Pinjaman & Riwayat Simpanan & Pinjaman
 * - Card Bawah: Saldo Simpanan & Estimasi SHU Tahunan
 * Budget: < 200 LOC.
 */
export const FinancialView: React.FC = () => {
  const [currentDebt] = useState(15000000);
  const remainingCeiling = Math.max(0, MAX_LOAN_CEILING - currentDebt);

  const handleSubmitLoan = (amount: number, tenor: number, purpose: string) => {
    alert(
      `Pengajuan pinjaman sebesar Rp ${amount.toLocaleString('id-ID')} dengan tenor ${tenor} bulan untuk "${purpose}" berhasil dikirim ke Pengurus Finansial Koperasi.`
    );
  };

  return (
    <div className="space-y-4 sm:space-y-5 animate-fadeIn select-none">
      {/* 1. Header Plafon & Sisa Pinjaman */}
      <FinancialMetricsHeader
        maxCeiling={MAX_LOAN_CEILING}
        currentDebt={currentDebt}
        remainingCeiling={remainingCeiling}
      />

      {/* 2. Grid 2 Kolom: Kalkulator Simulasi & Riwayat Mutasi */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5 items-stretch">
        <div className="lg:col-span-7 flex flex-col">
          <LoanCalculatorCard
            maxLoan={remainingCeiling}
            initialAmount={10000000}
            initialTenor={12}
            onSubmitLoan={handleSubmitLoan}
          />
        </div>

        <div className="lg:col-span-5 flex flex-col">
          <SavingsLoanHistoryCard />
        </div>
      </div>

      {/* 3. Saldo Simpanan & Estimasi SHU Tahunan */}
      <SavingsShuCard
        simpananPokok={100000}
        simpananWajib={1200000}
        simpananSukarela={3500000}
        estimasiShu={425000}
      />
    </div>
  );
};
