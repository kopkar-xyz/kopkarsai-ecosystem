import React from 'react';
import { Check } from 'lucide-react';
import type { CompleteSubmissionFormData } from '../types';

interface SubmissionSidebarProps {
  currentStep: number;
  onSelectStep: (step: number) => void;
  formData: CompleteSubmissionFormData;
  marginAmount: number;
  marginPercent: number;
}

/**
 * SubmissionSidebar — Kolom Kiri Stepper & Ringkasan Cepat Form Pengajuan
 * Slicing 1:1 Presisi Gambar 2 Referensi Pengguna.
 * Budget: < 200 LOC.
 */
export const SubmissionSidebar: React.FC<SubmissionSidebarProps> = ({
  currentStep,
  onSelectStep,
  formData,
  marginAmount,
  marginPercent,
}) => {
  const steps = [
    {
      num: 1,
      title: 'Jadwal Drop Sampel',
      subtitle: `${formData.dropDay === 'SELASA' ? 'Selasa' : 'Rabu'} · ${
        formData.dropShift === 'SHIFT_A' ? 'Shift A' : 'Shift B'
      } · ${formData.dropLocation}`,
    },
    {
      num: 2,
      title: 'Data & Karakteristik',
      subtitle: formData.name ? formData.name : 'Lengkapi nama & bahan',
    },
    {
      num: 3,
      title: 'Pasokan & Daya Tahan',
      subtitle: `Unit ${formData.supplyLocation} · ${formData.supplySchedule}`,
    },
    {
      num: 4,
      title: 'Harga & Margin',
      subtitle: `Margin ${marginPercent}% · ${formData.qtyKirim} pcs`,
    },
  ];

  return (
    <div className="space-y-4 select-none">
      {/* 1. Card Bagian Pengajuan (Stepper) */}
      <div className="bg-white border border-[#EAE4D3] rounded-2xl p-5 shadow-2xs space-y-3.5">
        {/* Header Bagian Pengajuan & Version Badge */}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[11px] font-mono uppercase tracking-wider font-semibold text-[#5C6F67] block">
              BAGIAN PENGAJUAN
            </span>
            <h3 className="text-sm font-sans font-bold text-[#18221D] mt-0.5">
              Langkah {currentStep} dari 4
            </h3>
          </div>
          <span className="text-xs font-mono px-2 py-0.5 rounded-md bg-white border border-[#E9E2D2] text-[#5C6F67] shadow-2xs">
            v1.0
          </span>
        </div>

        {/* Daftar 4 Step Cards */}
        <div className="space-y-2.5 pt-1">
          {steps.map((step) => {
            const isActive = currentStep === step.num;
            const hasData =
              step.num === 1
                ? Boolean(formData.dropDay && formData.dropLocation)
                : step.num === 2
                ? Boolean(formData.name && formData.name.trim())
                : step.num === 3
                ? Boolean(formData.supplyLocation && formData.supplySchedule)
                : formData.costPrice > 0 && formData.sellingPrice > 0;
            const isCompleted = !isActive && (currentStep > step.num || hasData);

            return (
              <button
                key={step.num}
                type="button"
                onClick={() => onSelectStep(step.num)}
                className={`w-full text-left p-3 sm:p-3.5 rounded-xl transition-all cursor-pointer flex items-center gap-3.5 ${
                  isActive
                    ? 'bg-[#165239] text-white shadow-xs'
                    : 'bg-white border border-[#EAE4D3] hover:border-[#D5C9B8] text-[#18221D] shadow-2xs'
                }`}
              >
                {/* Indicator Icon / Number */}
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm shrink-0 ${
                    isActive
                      ? 'bg-white/15 text-white'
                      : isCompleted
                      ? 'bg-[#E8F4EE] text-[#165239]'
                      : 'bg-[#F2C94C] text-[#154A33]'
                  }`}
                >
                  {isCompleted ? <Check size={16} strokeWidth={2.5} /> : step.num}
                </div>

                {/* Step Title & Subtitle */}
                <div className="min-w-0 flex-1">
                  <span
                    className={`block text-[13px] font-sans font-semibold truncate ${
                      isActive ? 'text-white' : 'text-[#18221D]'
                    }`}
                  >
                    {step.title}
                  </span>
                  <span
                    className={`block text-xs font-sans truncate ${
                      isActive ? 'text-white/80' : 'text-[#5C6F67]'
                    }`}
                  >
                    {step.subtitle}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Card Ringkasan Cepat */}
      <div className="bg-white border border-[#EAE4D3] rounded-2xl p-5 shadow-2xs space-y-3.5">
        <span className="text-[11px] font-mono uppercase tracking-wider font-semibold text-[#5C6F67] block">
          RINGKASAN CEPAT
        </span>

        <div className="divide-y divide-[#F0EAE1] text-xs">
          {/* Row 1: Produk */}
          <div className="flex justify-between items-center py-2.5 first:pt-1">
            <span className="text-[#5C6F67] font-sans">Produk</span>
            <span className="font-sans font-semibold text-[#18221D] truncate max-w-[150px]">
              {formData.name || 'Belum diisi'}
            </span>
          </div>

          {/* Row 2: Drop Sampel */}
          <div className="flex justify-between items-center py-2.5">
            <span className="text-[#5C6F67] font-sans">Drop Sampel</span>
            <span className="font-sans font-semibold text-[#1A2421]">
              {formData.dropDay === 'SELASA' ? 'Selasa' : 'Rabu'}, {formData.dropLocation}
            </span>
          </div>

          {/* Row 3: HPP → Jual */}
          <div className="flex justify-between items-center py-2.5">
            <span className="text-[#5C6F67] font-sans">HPP → Jual</span>
            <span className="font-sans font-semibold text-[#1A2421] tabular-nums">
              Rp {formData.costPrice.toLocaleString('id-ID')} → Rp {formData.sellingPrice.toLocaleString('id-ID')}
            </span>
          </div>

          {/* Row 4: Margin */}
          <div className="flex justify-between items-center py-2.5 last:pb-1">
            <span className="text-[#5C6F67] font-sans">Margin</span>
            <span className="font-sans font-semibold text-[#165239] tabular-nums">
              {marginPercent}% (Rp {marginAmount.toLocaleString('id-ID')})
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
