import React from 'react';
import { formatCurrencyIDR } from '../../../lib/utils';

export interface SavingsLoanTransaction {
  id: string;
  type: string;
  description: string;
  date: string;
  amount: number;
  status: 'LUNAS' | 'AKTIF';
}

const DEFAULT_TRANSACTIONS: SavingsLoanTransaction[] = [
  {
    id: 'tx-01',
    type: 'Simpanan Wajib',
    description: 'Potong Gaji Periode November 2026',
    date: '20 Nov 2026',
    amount: 350000,
    status: 'LUNAS',
  },
  {
    id: 'tx-02',
    type: 'Angsuran',
    description: 'Cicilan ke-4 dari 6 · Pinjaman Pendidikan',
    date: '05 Nov 2026',
    amount: 1051000,
    status: 'AKTIF',
  },
  {
    id: 'tx-03',
    type: 'Simpanan Sukarela',
    description: 'Setoran Mandiri Via Transfer',
    date: '20 Okt 2026',
    amount: 1000000,
    status: 'LUNAS',
  },
  {
    id: 'tx-04',
    type: 'Pinjaman Tunai',
    description: 'Pinjaman Pendidikan Karyawan',
    date: '15 Jul 2026',
    amount: 6000000,
    status: 'AKTIF',
  },
];

/**
 * SavingsLoanHistoryCard — Riwayat Mutasi Simpanan & Pinjaman
 * Slicing 1:1 Presisi aistudio-src SinJamPage:
 * - Header: font-okashi text-[19px] text-[#18221D]
 * - Container: rounded-2xl border border-[#EAE4D3] bg-white p-6
 * - Header bar: rounded-xl bg-[#F6F2E6] text-[12px] font-medium text-[#526058]
 * Budget: < 200 LOC.
 */
export const SavingsLoanHistoryCard: React.FC<{ items?: SavingsLoanTransaction[] }> = ({
  items = DEFAULT_TRANSACTIONS,
}) => {
  return (
    <div className="bg-white border border-[#EAE4D3] rounded-2xl p-6 space-y-4 select-none">
      {/* Header Riwayat */}
      <div>
        <h2 className="font-okashi text-[19px] text-[#18221D]">
          Riwayat Simpanan & Pinjaman
        </h2>
        <p className="text-[12px] text-[#7A867E] mt-0.5">
          Mutasi rekening koperasi terkini
        </p>
      </div>

      {/* Baris Kolom Header */}
      <div className="bg-[#F6F2E6] rounded-xl px-3.5 py-2 flex items-center justify-between text-[12px] font-medium text-[#526058]">
        <span>Jenis & Keterangan</span>
        <div className="flex items-center gap-6">
          <span>Nominal</span>
          <span className="w-14 text-right">Status</span>
        </div>
      </div>

      {/* List Item Transaksi */}
      <div className="divide-y divide-[#F0EBDC]">
        {items.map((tx) => (
          <div key={tx.id} className="py-3 first:pt-0 last:pb-0 flex items-center justify-between gap-3 text-[13px]">
            <div className="min-w-0">
              <span className="font-semibold text-[#18221D] block truncate">
                {tx.type}
              </span>
              <span className="text-[11.5px] text-[#7A867E] block truncate mt-0.5">
                {tx.description} · {tx.date}
              </span>
            </div>

            <div className="flex items-center gap-4 sm:gap-6 shrink-0">
              <span className="font-semibold text-[#18221D] tabular-nums">
                {formatCurrencyIDR(tx.amount)}
              </span>
              <span
                className={`text-[11.5px] font-medium px-2 py-0.5 rounded-md w-14 text-center ${
                  tx.status === 'LUNAS'
                    ? 'bg-[#EAF4EE] text-[#15803D]'
                    : 'bg-[#EFF6FF] text-[#1D4ED8]'
                }`}
              >
                {tx.status === 'LUNAS' ? 'Lunas' : 'Aktif'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
