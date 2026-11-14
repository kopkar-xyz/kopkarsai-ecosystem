import React from 'react';
import { ArrowLeftRight, ArrowUpRight, ArrowDownLeft, ShieldCheck } from 'lucide-react';
import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { StatusBadge } from '../../../components/ui/StatusBadge';
import { formatCurrencyIDR } from '../../../lib/utils';
import type { LoanTransactionItem } from '../types';

interface LoanTransactionsCardProps {
  transactions?: LoanTransactionItem[];
  onApplyLoan?: () => void;
  onRepayLoan?: () => void;
}

const DEFAULT_TRANSACTIONS: LoanTransactionItem[] = [
  {
    id: 'trx-1',
    type: 'REPAYMENT',
    title: 'Pembayaran Angsuran Bulan ke-2',
    amount: 270000,
    date: '10 Nov 2026',
    status: 'ACTIVE',
    refNumber: '#ANG-202611-002',
    notes: 'Pemotongan payroll gaji November Unit SAI B',
  },
  {
    id: 'trx-2',
    type: 'REPAYMENT',
    title: 'Pembayaran Angsuran Bulan ke-1',
    amount: 270000,
    date: '25 Okt 2026',
    status: 'ACCEPTED',
    refNumber: '#ANG-202610-001',
    notes: 'Pemotongan payroll gaji Oktober Unit SAI B',
  },
  {
    id: 'trx-3',
    type: 'DISBURSEMENT',
    title: 'Pencairan Pinjaman Karyawan (Pokok)',
    amount: 2500000,
    date: '10 Okt 2026',
    status: 'ACCEPTED',
    refNumber: '#PINJ-202610-098',
    notes: 'Disetujui Kepala Koperasi & Admin',
  },
];

/**
 * LoanTransactionsCard — Transaksi Pinjaman (Pinjam & Tebus/Pelunasan)
 * Mengakomodasi 2 aksi utama serta riwayat mutasi transaksi pinjaman.
 * Budget: < 200 LOC.
 */
export const LoanTransactionsCard: React.FC<LoanTransactionsCardProps> = ({
  transactions = DEFAULT_TRANSACTIONS,
  onApplyLoan,
  onRepayLoan,
}) => {
  return (
    <Card padding="lg" className="space-y-5">
      {/* Header Transaksi */}
      <div className="flex items-center justify-between pb-3 border-b border-[#DED5C3]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#1F5B45] text-white flex items-center justify-center flex-shrink-0 shadow-xs">
            <ArrowLeftRight size={20} />
          </div>
          <div>
            <h3 className="text-lg font-heading font-extrabold text-[#1A2421]">
              Transaksi Pinjaman
            </h3>
            <span className="text-xs font-body text-[#5C6F67]">
              Layanan pencairan pinjaman baru dan pelunasan / tebus angsuran
            </span>
          </div>
        </div>
      </div>

      {/* 2 Tombol Aksi Utama: Pinjam & Tebus (Pelunasan) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
        {/* Aksi 1: Pinjam (Pengajuan / Pencairan Dana) */}
        <div className="p-4 rounded-2xl bg-[#EAF4EE] border border-[#A9C3A2]/70 flex flex-col justify-between space-y-3 hover:border-[#1F5B45] transition-all">
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[10px] font-accent font-bold px-2 py-0.5 rounded-full bg-[#1F5B45] text-white">
                Pencairan Dana
              </span>
              <div className="w-7 h-7 rounded-xl bg-white text-[#1F5B45] flex items-center justify-center shadow-xs">
                <ArrowUpRight size={16} />
              </div>
            </div>
            <h4 className="text-sm font-heading font-extrabold text-[#1A2421]">
              Ajukan Pinjaman
            </h4>
            <p className="text-xs font-body text-[#5C6F67] mt-0.5">
              Tarik pinjaman baru dari sisa plafon aktif dengan bunga ringan 0.8% flat.
            </p>
          </div>
          <Button
            variant="primary"
            size="sm"
            onClick={onApplyLoan}
            className="w-full justify-center"
          >
            Pinjam Dana Sekarang
          </Button>
        </div>

        {/* Aksi 2: Tebus / Pelunasan (Bayar Angsuran) */}
        <div className="p-4 rounded-2xl bg-[#F8F4EC] border border-[#DED5C3] flex flex-col justify-between space-y-3 hover:border-[#F6CE2C] transition-all">
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[10px] font-accent font-bold px-2 py-0.5 rounded-full bg-[#FEF6DC] text-[#854D0E] border border-[#FDE68A]">
                Pelunasan & Tebus
              </span>
              <div className="w-7 h-7 rounded-xl bg-white text-[#854D0E] flex items-center justify-center shadow-xs border border-[#DED5C3]">
                <ArrowDownLeft size={16} />
              </div>
            </div>
            <h4 className="text-sm font-heading font-extrabold text-[#1A2421]">
              Bayar & Tebus Angsuran
            </h4>
            <p className="text-xs font-body text-[#5C6F67] mt-0.5">
              Tebus lunas sisa pinjaman berjalan atau bayar cicilan bulanan lebih awal.
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={onRepayLoan}
            className="w-full justify-center border-[#1F5B45] text-[#1F5B45] hover:bg-[#1F5B45] hover:text-white"
          >
            Tebus / Bayar Tagihan
          </Button>
        </div>
      </div>

      {/* Riwayat Transaksi Terakhir */}
      <div className="pt-2 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-heading font-bold text-[#1A2421] uppercase tracking-wider">
            Riwayat Transaksi Terakhir
          </span>
          <span className="text-[11px] font-accent text-[#5C6F67]">
            3 Catatan Mutasi
          </span>
        </div>

        <div className="space-y-2.5">
          {transactions.map((trx) => (
            <div
              key={trx.id}
              className="p-3 rounded-xl bg-white border border-[#DED5C3] flex items-center justify-between gap-3 text-xs"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    trx.type === 'DISBURSEMENT'
                      ? 'bg-[#EAF4EE] text-[#1F5B45]'
                      : 'bg-[#FEF6DC] text-[#854D0E]'
                  }`}
                >
                  {trx.type === 'DISBURSEMENT' ? (
                    <ArrowUpRight size={14} />
                  ) : (
                    <ShieldCheck size={14} />
                  )}
                </div>
                <div className="min-w-0">
                  <p className="font-heading font-bold text-[#1A2421] truncate">
                    {trx.title}
                  </p>
                  <p className="text-[11px] text-[#5C6F67] font-body">
                    {trx.refNumber} • {trx.date}
                  </p>
                </div>
              </div>

              <div className="text-right flex-shrink-0">
                <span
                  className={`font-heading font-extrabold ${
                    trx.type === 'DISBURSEMENT'
                      ? 'text-[#1F5B45]'
                      : 'text-[#1A2421]'
                  }`}
                >
                  {trx.type === 'DISBURSEMENT' ? '+' : '-'} {formatCurrencyIDR(trx.amount)}
                </span>
                <div className="mt-0.5">
                  <StatusBadge status={trx.status} size="sm" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};
