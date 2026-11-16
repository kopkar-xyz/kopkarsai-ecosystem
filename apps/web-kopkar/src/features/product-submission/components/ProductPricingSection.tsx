import React from 'react';
import { DollarSign, Scale, TrendingUp, Lock } from 'lucide-react';
import { Card } from '../../../components/ui/Card';
import { formatCurrencyIDR } from '../../../lib/utils';
import type { CompleteSubmissionFormData, SubmissionFormErrors } from '../types';

interface ProductPricingSectionProps {
  formData: CompleteSubmissionFormData;
  errors: SubmissionFormErrors;
  marginAmount: number;
  marginPercent: number;
  onChange: <K extends keyof CompleteSubmissionFormData>(
    field: K,
    value: CompleteSubmissionFormData[K]
  ) => void;
}

export const ProductPricingSection: React.FC<ProductPricingSectionProps> = ({
  formData,
  errors,
  marginAmount,
  marginPercent,
  onChange,
}) => {
  const isMarginHealthy = marginPercent >= 10 && marginPercent <= 35;
  const isNegative = formData.sellingPrice > 0 && formData.sellingPrice < formData.costPrice;

  const totalSupplierRevenue = (formData.costPrice || 0) * (formData.qtyKirim || 0);

  return (
    <Card padding="md" className="space-y-4">
      {/* Header Section */}
      <div className="flex items-center gap-2.5 pb-3 border-b border-[#DED5C3]">
        <div className="w-8 h-8 rounded-xl bg-[#EAF4EE] text-[#1F5B45] flex items-center justify-center flex-shrink-0">
          <DollarSign size={18} />
        </div>
        <div>
          <h3 className="text-base font-heading font-extrabold text-[#1A2421]">
            4. Struktur Harga, Volume Pasokan & Bobot Produk
          </h3>
          <p className="text-xs font-body text-[#5C6F67]">
            Tentukan harga beli koperasi (HPP), harga jual, serta estimasi volume pengiriman
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        {/* Harga Beli Koperasi (HPP Supplier) */}
        <div>
          <label className="block text-xs font-heading font-bold text-[#1A2421] mb-1">
            Harga Beli Koperasi <span className="text-[#DC4C70]">*</span>
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-heading font-bold text-[#5C6F67]">
              Rp
            </span>
            <input
              type="number"
              min={0}
              step={500}
              value={formData.costPrice || ''}
              onChange={(e) => onChange('costPrice', Math.max(0, Number(e.target.value)))}
              placeholder="cth: 15000"
              className={`w-full pl-9 pr-3 py-2 rounded-xl bg-white border text-sm font-heading font-bold text-[#1A2421] placeholder-[#8FA39A] focus:outline-none focus:ring-2 ${
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
              Pendapatan bersih supplier per unit
            </p>
          )}
        </div>

        {/* Harga Jual Koperasi */}
        <div>
          <label className="block text-xs font-heading font-bold text-[#1A2421] mb-1">
            Harga Jual Koperasi <span className="text-[#DC4C70]">*</span>
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-heading font-bold text-[#5C6F67]">
              Rp
            </span>
            <input
              type="number"
              min={0}
              step={500}
              value={formData.sellingPrice || ''}
              onChange={(e) => onChange('sellingPrice', Math.max(0, Number(e.target.value)))}
              placeholder="cth: 18000"
              className={`w-full pl-9 pr-3 py-2 rounded-xl bg-white border text-sm font-heading font-bold text-[#1A2421] placeholder-[#8FA39A] focus:outline-none focus:ring-2 ${
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
              Harga display etalase / marketplace
            </p>
          )}
        </div>

        {/* Qty Kirim */}
        <div>
          <label className="block text-xs font-heading font-bold text-[#1A2421] mb-1">
            Qty Kirim (Porsi/Unit) <span className="text-[#DC4C70]">*</span>
          </label>
          <input
            type="number"
            min={1}
            value={formData.qtyKirim || ''}
            onChange={(e) => onChange('qtyKirim', Math.max(1, Number(e.target.value)))}
            placeholder="cth: 25"
            className={`w-full px-3 py-2 rounded-xl bg-white border text-sm font-heading font-bold text-[#1A2421] placeholder-[#8FA39A] focus:outline-none focus:ring-2 ${
              errors.qtyKirim
                ? 'border-[#DC4C70] focus:ring-[#DC4C70]/30'
                : 'border-[#DED5C3] focus:ring-[#1F5B45]/30'
            }`}
          />
          {errors.qtyKirim ? (
            <p className="text-[11px] font-body text-[#DC4C70] mt-1">{errors.qtyKirim}</p>
          ) : (
            <p className="text-[10px] font-body text-[#5C6F67] mt-1">
              Jumlah unit dalam 1 batch pasokan
            </p>
          )}
        </div>

        {/* Berat (Diisi oleh Pengurus Koperasi -> INACTIVE / DISABLED) */}
        <div>
          <label className="block text-xs font-heading font-bold text-[#5C6F67] mb-1 flex items-center justify-between">
            <span className="flex items-center gap-1">
              <Scale size={13} className="text-[#5C6F67]" />
              <span>Berat Bersih (Netto)</span>
            </span>
            <span className="text-[9px] font-accent font-bold px-1.5 py-0.2 rounded bg-[#EAF4EE] text-[#1F5B45]">
              Pengurus
            </span>
          </label>
          <div className="relative">
            <input
              type="text"
              disabled
              readOnly
              value={formData.weightGrams || ''}
              placeholder="Ditinjau saat uji fisik"
              className="w-full px-3 py-2 rounded-xl bg-[#EBE4D5]/60 border border-[#DED5C3] text-sm font-body text-[#5C6F67] placeholder-[#8FA39A] cursor-not-allowed select-none"
            />
            <Lock size={13} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8FA39A]" />
          </div>
          <p className="text-[10px] font-body text-[#5C6F67] mt-1 italic">
            Inactive: Ditimbang oleh pengurus koperasi
          </p>
        </div>
      </div>

      {/* Kalkulasi Margin & Estimasi Finansial Bento */}
      <div className="p-3.5 rounded-2xl bg-[#F8F4EC] border border-[#DED5C3] space-y-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <TrendingUp size={16} className="text-[#1F5B45]" />
            <span className="text-xs font-heading font-bold text-[#1A2421]">
              Simulasi Margin Kemitraan:
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <span className="text-xs font-body text-[#5C6F67]">Margin Koperasi: </span>
              <span className="text-sm font-heading font-extrabold text-[#1F5B45]">
                {formatCurrencyIDR(marginAmount)}
              </span>
              <span
                className={`ml-1.5 text-xs font-accent font-bold px-2 py-0.5 rounded-full ${
                  isNegative
                    ? 'bg-[#DC4C70]/15 text-[#DC4C70]'
                    : isMarginHealthy
                    ? 'bg-[#EAF4EE] text-[#1F5B45] border border-[#A9C3A2]'
                    : 'bg-[#FEF6DC] text-[#E5A812]'
                }`}
              >
                {marginPercent}%
              </span>
            </div>
          </div>
        </div>

        {/* Summary Row */}
        <div className="pt-2 border-t border-[#DED5C3]/70 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1 text-[11px] font-body text-[#5C6F67]">
          <span>
            Estimasi pendapatan kotor supplier per batch pasokan ({formData.qtyKirim || 0} unit):{' '}
            <strong className="text-[#1A2421] font-heading">
              {formatCurrencyIDR(totalSupplierRevenue)}
            </strong>
          </span>
          <span className="italic">
            {isNegative
              ? 'Peringatan: Harga jual lebih rendah dari harga beli!'
              : isMarginHealthy
              ? 'Margin ideal (10% - 35%) sesuai pedoman etalase koperasi.'
              : 'Margin berada di luar rentang standar (10% - 35%).'}
          </span>
        </div>
      </div>
    </Card>
  );
};
