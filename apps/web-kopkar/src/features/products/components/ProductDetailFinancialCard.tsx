import React from 'react';
import { Lock } from 'lucide-react';
import { formatCurrencyIDR } from '../../../lib/utils';

interface ProductDetailFinancialCardProps {
  costPrice?: number;
  sellingPrice?: number;
  marginAmount?: number;
  marginPercent?: number;
  quotaPorsi?: number;
  projectedMonthlyRevenue?: number;
  settlementNote?: string;
}

export const ProductDetailFinancialCard: React.FC<ProductDetailFinancialCardProps> = ({
  costPrice = 20000,
  sellingPrice = 25000,
  marginAmount = 5000,
  marginPercent = 20,
  quotaPorsi = 30,
  projectedMonthlyRevenue = 12000000,
  settlementNote = 'Settlement dana ditransfer H+1 setelah rekonsiliasi penjualan harian di gerai SAI-B.',
}) => {
  const quotaTotal = quotaPorsi * costPrice;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch select-none">
      {/* Left: Struktur Harga & Margin */}
      <div className="lg:col-span-7 space-y-3.5">
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-[16px] font-semibold text-[#18221D]">
            Struktur Harga &amp; Margin
          </h3>
          <div className="inline-flex items-center gap-1.5 text-[12px] font-medium text-[#165239]">
            <Lock size={13} />
            <span>HPP Terkunci Resmi</span>
          </div>
        </div>

        <div className="rounded-2xl border border-[#EAE4D3] bg-white divide-y divide-[#F0EBDC] text-[13px]">
          <div className="px-4 py-3.5 flex items-center justify-between gap-3">
            <span className="text-[#526058]">HPP Supplier (Bersih)</span>
            <span className="font-semibold text-[#18221D] tabular-nums">
              {formatCurrencyIDR(costPrice)} / porsi
            </span>
          </div>

          <div className="px-4 py-3.5 flex items-center justify-between gap-3">
            <span className="text-[#526058]">Harga Jual Etalase</span>
            <span className="font-geist font-normal text-[17px] text-[#165239] tabular-nums">
              {formatCurrencyIDR(sellingPrice)} / porsi
            </span>
          </div>

          <div className="px-4 py-3.5 flex items-center justify-between gap-3">
            <span className="text-[#526058]">Margin Koperasi</span>
            <span className="font-semibold text-[#165239] tabular-nums">
              {formatCurrencyIDR(marginAmount)} ({marginPercent}%)
            </span>
          </div>

          <div className="px-4 py-3.5 flex items-center justify-between gap-3">
            <span className="text-[#526058]">Kuota Dropping per Batch</span>
            <span className="font-semibold text-[#18221D] tabular-nums">
              {quotaPorsi} porsi
            </span>
          </div>
        </div>
      </div>

      {/* Right: Pendapatan & Proyeksi Omset */}
      <div className="lg:col-span-5 rounded-2xl border border-[#EAE4D3] bg-[#FAF8F2] p-5 flex flex-col justify-between space-y-4">
        <div>
          <div className="text-[12px] text-[#526058]">Pendapatan Mitra per Batch</div>
          <div className="mt-1 font-geist font-normal text-[24px] text-[#18221D] tabular-nums leading-tight">
            {formatCurrencyIDR(quotaTotal)}
          </div>
        </div>

        <div className="pt-4 border-t border-[#EAE4D3]">
          <div className="text-[12px] text-[#526058]">
            Proyeksi Omset / Bulan (20 hari kerja)
          </div>
          <div className="mt-1 font-geist font-normal text-[26px] text-[#165239] tabular-nums leading-tight">
            {formatCurrencyIDR(projectedMonthlyRevenue)}
          </div>
        </div>

        <p className="pt-4 border-t border-[#EAE4D3] text-[11.5px] text-[#7A867E] leading-relaxed">
          {settlementNote}
        </p>
      </div>
    </div>
  );
};
