import React from 'react';
import { DollarSign, TrendingUp, AlertTriangle, CheckCircle2, Box } from 'lucide-react';
import { Card } from '../../../components/ui/Card';
import { formatCurrencyIDR } from '../../../lib/utils';
import type { ProductSubmissionFormData, SubmissionFormErrors } from '../types';

interface PricingMarginSectionProps {
  formData: ProductSubmissionFormData;
  errors: SubmissionFormErrors;
  marginAmount: number;
  marginPercent: number;
  onChange: <K extends keyof ProductSubmissionFormData>(field: K, value: ProductSubmissionFormData[K]) => void;
}

export const PricingMarginSection: React.FC<PricingMarginSectionProps> = ({
  formData,
  errors,
  marginAmount,
  marginPercent,
  onChange,
}) => {
  const isMarginHealthy = marginPercent >= 10 && marginPercent <= 35;
  const isNegative = formData.sellingPrice > 0 && formData.sellingPrice < formData.costPrice;

  return (
    <Card padding="md" className="space-y-4">
      <div className="flex items-center gap-2.5 pb-3 border-b border-[#DED5C3]">
        <div className="w-8 h-8 rounded-xl bg-[#EAF4EE] text-[#1F5B45] flex items-center justify-center flex-shrink-0">
          <DollarSign size={18} />
        </div>
        <div>
          <h3 className="text-base font-heading font-extrabold text-[#1A2421]">
            2. Struktur Harga & Kalkulasi Margin Kemitraan
          </h3>
          <p className="text-xs font-body text-[#5C6F67]">
            Sesuai KK-BR-003: Supplier mengusulkan HPP dan harga jual untuk disepakati bersama koperasi
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Harga Beli Koperasi (HPP Supplier) */}
        <div>
          <label className="block text-xs font-heading font-bold text-[#1A2421] mb-1">
            Harga Beli Koperasi (HPP yang Diterima Supplier) <span className="text-[#DC4C70]">*</span>
          </label>
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-heading font-bold text-[#5C6F67]">
              Rp
            </span>
            <input
              type="number"
              min={0}
              step={500}
              value={formData.costPrice || ''}
              onChange={(e) => onChange('costPrice', Math.max(0, Number(e.target.value)))}
              placeholder="cth: 20000"
              className={`w-full pl-10 pr-4 py-2 rounded-xl bg-white border text-sm font-heading font-bold text-[#1A2421] placeholder-[#8FA39A] focus:outline-none focus:ring-2 ${
                errors.costPrice
                  ? 'border-[#DC4C70] focus:ring-[#DC4C70]/30'
                  : 'border-[#DED5C3] focus:ring-[#1F5B45]/30'
              }`}
            />
          </div>
          {errors.costPrice ? (
            <p className="text-[11px] font-body text-[#DC4C70] mt-1">{errors.costPrice}</p>
          ) : (
            <p className="text-[10px] font-body text-[#5C6F67] mt-1">
              Pendapatan bersih supplier per porsi/unit barang
            </p>
          )}
        </div>

        {/* Usulan Harga Jual Konsumen */}
        <div>
          <label className="block text-xs font-heading font-bold text-[#1A2421] mb-1">
            Usulan Harga Jual Marketplace Konsumen <span className="text-[#DC4C70]">*</span>
          </label>
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-heading font-bold text-[#5C6F67]">
              Rp
            </span>
            <input
              type="number"
              min={0}
              step={500}
              value={formData.sellingPrice || ''}
              onChange={(e) => onChange('sellingPrice', Math.max(0, Number(e.target.value)))}
              placeholder="cth: 25000"
              className={`w-full pl-10 pr-4 py-2 rounded-xl bg-white border text-sm font-heading font-bold text-[#1A2421] placeholder-[#8FA39A] focus:outline-none focus:ring-2 ${
                errors.sellingPrice
                  ? 'border-[#DC4C70] focus:ring-[#DC4C70]/30'
                  : 'border-[#DED5C3] focus:ring-[#1F5B45]/30'
              }`}
            />
          </div>
          {errors.sellingPrice ? (
            <p className="text-[11px] font-body text-[#DC4C70] mt-1">{errors.sellingPrice}</p>
          ) : (
            <p className="text-[10px] font-body text-[#5C6F67] mt-1">
              Harga tayang di marketplace ichibasai.com untuk pembeli
            </p>
          )}
        </div>
      </div>

      {/* Kalkulator Margin Interaktif Bento Card */}
      <div className="p-3.5 rounded-2xl bg-[#F8F4EC] border border-[#DED5C3] space-y-2.5">
        <div className="flex items-center justify-between text-xs">
          <span className="font-heading font-bold text-[#1A2421] flex items-center gap-1.5">
            <TrendingUp size={15} className="text-[#1F5B45]" />
            Simulasi Margin Bagi Hasil Koperasi
          </span>
          <span className="font-accent font-semibold text-[#5C6F67]">
            Formula: Harga Jual - HPP
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-1">
          <div className="bg-white p-2.5 rounded-xl border border-[#DED5C3]/70">
            <span className="text-[10px] font-accent text-[#5C6F67] block">Margin Koperasi</span>
            <p className="text-sm font-heading font-extrabold text-[#1F5B45]">
              {formatCurrencyIDR(marginAmount)}
            </p>
          </div>

          <div className="bg-white p-2.5 rounded-xl border border-[#DED5C3]/70">
            <span className="text-[10px] font-accent text-[#5C6F67] block">Persentase Bagi Hasil</span>
            <p
              className={`text-sm font-heading font-extrabold ${
                isNegative ? 'text-[#DC4C70]' : 'text-[#1F5B45]'
              }`}
            >
              {marginPercent}%
            </p>
          </div>

          <div className="col-span-2 sm:col-span-1 bg-white p-2.5 rounded-xl border border-[#DED5C3]/70 flex items-center gap-2">
            {isNegative ? (
              <>
                <AlertTriangle size={18} className="text-[#DC4C70] flex-shrink-0" />
                <span className="text-[11px] font-accent font-bold text-[#DC4C70] leading-tight">
                  Harga Jual Lebih Rendah dari HPP!
                </span>
              </>
            ) : isMarginHealthy ? (
              <>
                <CheckCircle2 size={18} className="text-[#1F5B45] flex-shrink-0" />
                <span className="text-[11px] font-accent font-bold text-[#1F5B45] leading-tight">
                  Struktur Margin Ideal (10% - 35%)
                </span>
              </>
            ) : (
              <>
                <DollarSign size={18} className="text-[#E5A812] flex-shrink-0" />
                <span className="text-[11px] font-accent font-semibold text-[#854D0E] leading-tight">
                  Akan Dievaluasi Tim Pengurus
                </span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Estimasi Kapasitas Pasokan Harian */}
      <div className="pt-2 border-t border-[#DED5C3]/60">
        <label className="block text-xs font-heading font-bold text-[#1A2421] mb-1 flex items-center gap-1.5">
          <Box size={14} className="text-[#1F5B45]" />
          <span>Estimasi Kesanggupan Suplai Harian (Kapasitas Produksi)</span>
        </label>
        <div className="flex items-center gap-3">
          <input
            type="number"
            min={1}
            max={500}
            value={formData.dailyCapacity || ''}
            onChange={(e) => onChange('dailyCapacity', Math.max(1, Number(e.target.value)))}
            placeholder="cth: 30"
            className="w-32 px-3.5 py-2 rounded-xl bg-white border border-[#DED5C3] text-sm font-heading font-bold text-[#1A2421] focus:outline-none focus:ring-2 focus:ring-[#1F5B45]/30"
          />
          <span className="text-xs font-accent text-[#5C6F67]">
            Porsi / Unit per hari kerja (Senin - Jumat)
          </span>
        </div>
        {errors.dailyCapacity && (
          <p className="text-[11px] font-body text-[#DC4C70] mt-1">{errors.dailyCapacity}</p>
        )}
      </div>
    </Card>
  );
};
