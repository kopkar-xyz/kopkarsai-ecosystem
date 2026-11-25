import React from 'react';
import { Wallet, QrCode, Info, RotateCcw } from 'lucide-react';
import type { PaymentFilter } from './OrdersSidebar';

interface OrdersMonthlyRecapCardProps {
  monthTotal: number;
  monthOrdersCount: number;
  payrollTotal: number;
  payrollCount: number;
  directTotal: number;
  directCount: number;
  paymentFilter: PaymentFilter;
  onSelectPaymentFilter: (pf: PaymentFilter) => void;
}

/**
 * OrdersMonthlyRecapCard — Rekap Belanja Bulanan & Filter Metode Pembayaran
 * Khusus akun Anggota (tidak ditampilkan pada role GA). Budget: < 200 LOC.
 */
export const OrdersMonthlyRecapCard: React.FC<OrdersMonthlyRecapCardProps> = ({
  monthTotal,
  monthOrdersCount,
  payrollTotal,
  payrollCount,
  directTotal,
  directCount,
  paymentFilter,
  onSelectPaymentFilter,
}) => {
  const paymentItems = [
    { id: 'PAYROLL' as const, label: 'Potong Gaji', count: payrollCount, total: payrollTotal, icon: Wallet },
    { id: 'DIRECT' as const, label: 'QRIS / Transfer', count: directCount, total: directTotal, icon: QrCode },
  ];

  return (
    <div className="bg-white border border-[#EAE3D5] rounded-2xl p-4 sm:p-5 shadow-2xs space-y-3">
      <div className="flex items-center justify-between px-0.5">
        <div>
          <h2 className="font-semibold text-xs text-[#1A1615]">Rekap belanja bulan ini</h2>
          <p className="text-[11px] text-[#8C827A]">November 2026 • {monthOrdersCount} pesanan</p>
        </div>
        {paymentFilter !== 'ALL' && (
          <button
            type="button"
            onClick={() => onSelectPaymentFilter('ALL')}
            className="text-[10px] text-[#83273B] hover:underline flex items-center gap-1 cursor-pointer"
            title="Reset filter metode bayar"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Semua</span>
          </button>
        )}
      </div>

      <div className="bg-[#FAF6F0] border border-[#EAE3D5] rounded-xl p-3 flex items-center justify-between">
        <span className="text-xs text-[#665E60] font-medium">Total belanja</span>
        <span className="text-sm font-bold text-[#83273B] tabular-nums">
          Rp {monthTotal.toLocaleString('id-ID')}
        </span>
      </div>

      <div className="space-y-1.5 pt-0.5">
        <span className="text-[10px] font-semibold text-[#8C827A] uppercase tracking-wider block px-1">
          Metode Pembayaran (Klik untuk filter)
        </span>

        {paymentItems.map(({ id, label, count, total, icon: Icon }) => {
          const isSelected = paymentFilter === id;
          return (
            <button
              key={id}
              type="button"
              onClick={() => onSelectPaymentFilter(isSelected ? 'ALL' : id)}
              className={`w-full text-left p-2.5 rounded-xl border text-xs transition-all cursor-pointer flex items-center justify-between ${
                isSelected ? 'bg-[#FDF0F3] border-[#83273B] shadow-xs' : 'bg-white border-[#EAE3D5] hover:bg-[#FAF6F0]'
              }`}
            >
              <div className="flex items-center gap-2">
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                    isSelected ? 'bg-[#83273B] text-white' : 'bg-[#FAF6F0] text-[#83273B]'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                </div>
                <div>
                  <span className="font-semibold text-xs text-[#1A1615] block leading-tight">{label}</span>
                  <span className="text-[10px] text-[#7A716B]">{count} transaksi</span>
                </div>
              </div>
              <span className="font-bold text-xs text-[#1A1615] tabular-nums">
                Rp {total.toLocaleString('id-ID')}
              </span>
            </button>
          );
        })}
      </div>

      <div className="pt-1 flex items-start gap-1.5 text-[11px] text-[#7A716B] leading-relaxed">
        <Info className="w-3.5 h-3.5 text-[#8C827A] shrink-0 mt-0.5" />
        <span>Tagihan potong gaji otomatis dipotong pada slip gaji tanggal 25.</span>
      </div>
    </div>
  );
};
