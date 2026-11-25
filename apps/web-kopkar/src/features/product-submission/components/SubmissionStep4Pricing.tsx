import React from 'react';
import { DollarSign, ArrowLeft, Send, CheckCircle2 } from 'lucide-react';
import type { CompleteSubmissionFormData } from '../types';

interface SubmissionStep4PricingProps {
  formData: CompleteSubmissionFormData;
  marginAmount: number;
  marginPercent: number;
  onChange: <K extends keyof CompleteSubmissionFormData>(field: K, value: CompleteSubmissionFormData[K]) => void;
  onSubmit: (e: React.FormEvent) => void;
  onPrev: () => void;
  isSubmitting?: boolean;
}

/**
 * SubmissionStep4Pricing — Langkah 4: Struktur Harga, Volume & Bobot
 * Slicing 1:1 Presisi Gambar 4 Referensi Pengguna.
 * Budget: < 200 LOC.
 */
export const SubmissionStep4Pricing: React.FC<SubmissionStep4PricingProps> = ({
  formData,
  marginAmount,
  marginPercent,
  onChange,
  onSubmit,
  onPrev,
  isSubmitting = false,
}) => {
  const supplierBatchIncome = formData.costPrice * (formData.qtyKirim || 0);

  return (
    <div className="bg-white border border-[#EAE4D3] rounded-2xl p-6 sm:p-7 shadow-xs space-y-6 select-none">
      {/* 1. Header Step */}
      <div className="flex items-start gap-3.5 pb-2">
        <div className="w-10 h-10 rounded-xl bg-[#EAF4EE] text-[#1F5B45] flex items-center justify-center shrink-0 border border-[#D5E6DC]">
          <DollarSign size={20} />
        </div>
        <div>
          <h2 className="text-base sm:text-lg font-heading font-semibold text-[#1A2421]">
            4. Struktur Harga, Volume & Bobot
          </h2>
          <p className="text-xs font-sans text-[#5C6F67] mt-0.5">
            Tentukan HPP supplier, harga jual konsumen, kuota kirim, dan berat bersih
          </p>
        </div>
      </div>

      {/* 2. Grid Inputs */}
      <div className="space-y-4">
        {/* Row 1: HPP & Harga Jual */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-sans font-medium text-[#14261E] block">
              Harga Beli Koperasi (HPP) *
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-sans text-[#6F776F]">
                Rp
              </span>
              <input
                type="number"
                value={formData.costPrice || ''}
                onChange={(e) => onChange('costPrice', Number(e.target.value) || 0)}
                placeholder="12000"
                className="w-full h-10 pl-10 pr-3 rounded-xl bg-[#FAF7F2] border border-[#E9E2D2] text-xs font-sans text-[#14261E] focus:outline-none focus:ring-1 focus:ring-[#1F5C45]"
              />
            </div>
            <span className="text-[11px] font-sans text-[#6F776F] block">
              Pendapatan bersih supplier per unit
            </span>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-sans font-medium text-[#14261E] block">
              Harga Jual Konsumen *
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-sans text-[#6F776F]">
                Rp
              </span>
              <input
                type="number"
                value={formData.sellingPrice || ''}
                onChange={(e) => onChange('sellingPrice', Number(e.target.value) || 0)}
                placeholder="15000"
                className="w-full h-10 pl-10 pr-3 rounded-xl bg-[#FAF7F2] border border-[#E9E2D2] text-xs font-sans text-[#14261E] focus:outline-none focus:ring-1 focus:ring-[#1F5C45]"
              />
            </div>
            <span className="text-[11px] font-sans text-[#6F776F] block">
              Harga display etalase / marketplace
            </span>
          </div>
        </div>

        {/* Row 2: Qty Kirim & Berat Bersih */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-sans font-medium text-[#14261E] block">
              Qty Kirim (Porsi/Unit) *
            </label>
            <input
              type="number"
              value={formData.qtyKirim || ''}
              onChange={(e) => onChange('qtyKirim', Number(e.target.value) || 0)}
              placeholder="20"
              className="w-full h-10 px-3 rounded-xl bg-[#FAF7F2] border border-[#E9E2D2] text-xs font-sans text-[#14261E] focus:outline-none focus:ring-1 focus:ring-[#1F5C45]"
            />
            <span className="text-[11px] font-sans text-[#6F776F] block">
              Volume dropping per batch
            </span>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-sans font-medium text-[#14261E] block">
              Berat Bersih (Netto)
            </label>
            <div className="relative">
              <input
                type="text"
                value={formData.weightGrams || ''}
                onChange={(e) => onChange('weightGrams', e.target.value)}
                placeholder="200"
                className="w-full h-10 pl-3 pr-12 rounded-xl bg-[#FAF7F2] border border-[#E9E2D2] text-xs font-sans text-[#14261E] focus:outline-none focus:ring-1 focus:ring-[#1F5C45]"
              />
              <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-sans text-[#6F776F]">
                gram
              </span>
            </div>
            <span className="text-[11px] font-sans text-[#6F776F] block">
              Diverifikasi saat uji sampel fisik
            </span>
          </div>
        </div>
      </div>

      {/* 3. Kotak Simulasi Margin Kemitraan */}
      <div className="p-4 rounded-xl bg-[#EAF5EF]/50 border border-[#CDE5D7] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="space-y-0.5">
          <b className="font-heading font-medium text-[#14261E] block">
            Simulasi Margin Kemitraan
          </b>
          <p className="font-sans text-[#6F776F]">
            Pendapatan kotor supplier per batch ({formData.qtyKirim} unit):{' '}
            <strong className="text-[#14261E] font-medium">
              Rp {supplierBatchIncome.toLocaleString('id-ID')}
            </strong>
          </p>
        </div>

        <div className="text-left sm:text-right space-y-0.5">
          <span className="font-heading font-medium text-[#2E7D5B] block text-xs sm:text-sm">
            Margin Koperasi: Rp {marginAmount.toLocaleString('id-ID')} ({marginPercent}%)
          </span>
          <span className="inline-flex items-center gap-1 font-sans text-[#2E7D5B] text-[11px]">
            <CheckCircle2 size={13} />
            Margin sehat (10% – 35%)
          </span>
        </div>
      </div>

      {/* 4. Bottom Action Bar */}
      <div className="pt-4 border-t border-[#E9E2D2]/60 flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={onPrev}
          className="h-10 px-4 rounded-xl border border-[#E9E2D2] text-xs font-sans font-medium text-[#14261E] hover:bg-[#FAF7F2] flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <ArrowLeft size={15} />
          <span>Sebelumnya</span>
        </button>

        <button
          type="button"
          onClick={onSubmit}
          disabled={isSubmitting}
          className="h-10 px-5 rounded-xl bg-[#1F5C45] hover:bg-[#174736] text-white text-xs font-heading font-medium flex items-center gap-2 transition-all cursor-pointer shadow-xs active:scale-95 disabled:opacity-50"
        >
          <Send size={15} />
          <span>{isSubmitting ? 'Mengirim...' : 'Kirim Pengajuan Produk'}</span>
        </button>
      </div>
    </div>
  );
};

