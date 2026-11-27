import React from 'react';
import { Package } from 'lucide-react';
import type { CompleteSubmissionFormData, ProductTypeOption } from '../types';
import { SubmissionStep2Ingredients } from './SubmissionStep2Ingredients';
import { SubmissionStep2Timing } from './SubmissionStep2Timing';
import { SubmissionStepFooter } from './SubmissionStepFooter';

const PRODUCT_TYPES: ProductTypeOption[] = [
  'Gorengan', 'Jajanan Basah', 'Jajanan Kering', 'Keripik / Kerupuk',
  'Jajanan Buah', 'Minuman (Es)', 'Minuman (Non Es)', 'Makanan Berat',
];

interface SubmissionStep2DataProps {
  formData: CompleteSubmissionFormData;
  onChange: <K extends keyof CompleteSubmissionFormData>(field: K, value: CompleteSubmissionFormData[K]) => void;
  onAddIngredient: (ing: string) => boolean;
  onRemoveIngredient: (idx: number) => void;
  onImageSelect: (file: File) => boolean;
  onNext: () => void;
  onPrev: () => void;
}

/**
 * SubmissionStep2Data — Langkah 2: Data & Karakteristik Produk
 * Slicing 1:1 Presisi Gambar 6 Referensi Pengguna.
 * Budget: < 200 LOC.
 */
export const SubmissionStep2Data: React.FC<SubmissionStep2DataProps> = ({
  formData,
  onChange,
  onAddIngredient,
  onRemoveIngredient,
  onImageSelect,
  onNext,
  onPrev,
}) => {
  return (
    <div className="bg-white border border-[#EAE4D3] rounded-2xl p-6 sm:p-7 shadow-xs space-y-6 select-none">
      {/* 1. Header Step */}
      <div className="flex items-start gap-3.5 pb-2">
        <div className="w-10 h-10 rounded-xl bg-[#EAF4EE] text-[#1F5B45] flex items-center justify-center shrink-0 border border-[#D5E6DC]">
          <Package size={20} />
        </div>
        <div>
          <h2 className="text-base sm:text-lg font-heading font-semibold text-[#1A2421]">
            2. Data & Karakteristik Produk
          </h2>
          <p className="text-xs font-sans text-[#5C6F67] mt-0.5">
            Dikelompokkan per identitas produk, kemasan & bahan, serta jam olah
          </p>
        </div>
      </div>

      {/* 2. Bagian A: Identitas & Kategori */}
      <div className="space-y-4">
        <span className="text-xs font-mono uppercase tracking-wider font-semibold text-[#5C6F67] block mb-3">
          A. PROFIL USAHA &amp; IDENTITAS PRODUK
        </span>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-sans font-medium text-[#1A2421] block">
              Nama Usaha / Dapur Mitra
            </label>
            <input
              type="text"
              value={formData.supplierBusinessName || ''}
              onChange={(e) => onChange('supplierBusinessName', e.target.value)}
              placeholder="cth: Dapur Sejahtera / UMKM Mandiri"
              className="w-full h-11 px-4 rounded-xl bg-[#FAF7F2] border border-[#E9E2D2] text-xs font-sans text-[#1A2421] placeholder:text-[#8C827A] focus:outline-none focus:border-[#1F5B45] transition-colors"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-sans font-medium text-[#1A2421] block">
              No. WhatsApp Aktif Supplier
            </label>
            <input
              type="tel"
              value={formData.supplierWhatsapp || ''}
              onChange={(e) => onChange('supplierWhatsapp', e.target.value)}
              placeholder="cth: 0812-xxxx-xxxx"
              className="w-full h-11 px-4 rounded-xl bg-[#FAF7F2] border border-[#E9E2D2] text-xs font-sans text-[#1A2421] placeholder:text-[#8C827A] focus:outline-none focus:border-[#1F5B45] transition-colors"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-sans font-medium text-[#1A2421] block">
              Nama Barang *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => onChange('name', e.target.value)}
              placeholder="cth: Risoles Rogout Ayam Sayur Gurih"
              className="w-full h-11 px-4 rounded-xl bg-[#FAF7F2] border border-[#E9E2D2] text-xs font-sans text-[#1A2421] placeholder:text-[#8C827A] focus:outline-none focus:border-[#1F5B45] transition-colors"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-sans font-medium text-[#1A2421] block">
              Izin Edar / Sertifikasi (Opsional)
            </label>
            <input
              type="text"
              placeholder="cth: P-IRT / BPOM / Halal"
              className="w-full h-11 px-4 rounded-xl bg-[#FAF7F2] border border-[#E9E2D2] text-xs font-sans text-[#1A2421] placeholder:text-[#8C827A] focus:outline-none focus:border-[#1F5B45] transition-colors"
            />
          </div>
        </div>

        {/* Jenis Produk Pills */}
        <div className="space-y-1.5">
          <label className="text-xs font-sans font-medium text-[#1A2421] block">
            Jenis Produk yang Dititipkan *
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {PRODUCT_TYPES.map((type) => {
              const isSelected = formData.productType === type;
              return (
                <button
                  key={type}
                  type="button"
                  onClick={() => onChange('productType', type)}
                  className={`h-11 px-3 rounded-xl text-xs font-sans font-medium transition-all cursor-pointer flex items-center justify-center truncate ${
                    isSelected
                      ? 'bg-[#1F5B45] text-white shadow-2xs'
                      : 'bg-[#FAF7F2] border border-[#E9E2D2] text-[#1A2421] hover:bg-[#F2ECE1]'
                  }`}
                >
                  {type}
                </button>
              );
            })}
          </div>
        </div>

        {/* Asal Barang (2 Large Cards) */}
        <div className="space-y-1.5">
          <label className="text-xs font-sans font-medium text-[#1A2421] block">
            Asal Barang *
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {[
              { id: 'BUAT_SENDIRI' as const, title: 'Buat Sendiri', desc: 'Produksi langsung dari dapur usaha mitra' },
              { id: 'SUPPLY_ORANG' as const, title: 'Supply dari Orang', desc: 'Reseller atau pasokan dari produsen luar' },
            ].map((opt) => (
              <div
                key={opt.id}
                onClick={() => onChange('origin', opt.id)}
                className={`p-4 rounded-2xl text-left transition-all cursor-pointer border ${
                  formData.origin === opt.id
                    ? 'bg-[#1F5B45] text-white border-[#1F5B45] shadow-2xs'
                    : 'bg-[#FAF7F2] border border-[#E9E2D2] text-[#1A2421] hover:bg-[#F2ECE1]'
                }`}
              >
                <h4 className="text-xs sm:text-[13px] font-heading font-semibold block">{opt.title}</h4>
                <span className={`text-[11px] font-sans block mt-0.5 ${formData.origin === opt.id ? 'text-white/80' : 'text-[#5C6F67]'}`}>
                  {opt.desc}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3. Bagian B: Foto Kemasan & Komposisi Bahan */}
      <SubmissionStep2Ingredients
        formData={formData}
        onChange={onChange}
        onAddIngredient={onAddIngredient}
        onRemoveIngredient={onRemoveIngredient}
        onImageSelect={onImageSelect}
      />

      {/* 4. Bagian C: Waktu Pengolahan & Pengantaran */}
      <SubmissionStep2Timing
        formData={formData}
        onChange={onChange}
      />

      {/* 5. Bottom Action Bar */}
      <SubmissionStepFooter
        onPrev={onPrev}
        onNext={onNext}
        nextLabel="Lanjut: Pasokan & Daya Tahan"
      />
    </div>
  );
};
