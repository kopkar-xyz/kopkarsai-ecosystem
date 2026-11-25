import React from 'react';
import type { CompleteSubmissionFormData } from '../types';

interface SubmissionStep2TimingProps {
  formData: CompleteSubmissionFormData;
  onChange: <K extends keyof CompleteSubmissionFormData>(field: K, value: CompleteSubmissionFormData[K]) => void;
}

/**
 * SubmissionStep2Timing — Sub-bagian C Langkah 2: Waktu Pengolahan & Pengantaran
 * Slicing 1:1 Presisi Gambar 6 Referensi Pengguna.
 * Budget: < 200 LOC.
 */
export const SubmissionStep2Timing: React.FC<SubmissionStep2TimingProps> = ({
  formData,
  onChange,
}) => {
  return (
    <div className="space-y-3 pt-3 border-t border-[#E9E2D2]/60">
      <span className="text-[10px] font-mono uppercase tracking-wider text-[#6F776F] block">
        C. Waktu Pengolahan & Pengantaran
      </span>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="space-y-1">
          <label className="text-[11px] font-sans font-medium text-[#14261E]">
            Jam Mulai Olah *
          </label>
          <input
            type="text"
            value={formData.productionTime}
            onChange={(e) => onChange('productionTime', e.target.value)}
            className="w-full h-9 px-3 rounded-xl bg-[#FAF7F2] border border-[#E9E2D2] text-xs font-sans text-[#14261E]"
          />
        </div>
        <div className="space-y-1">
          <label className="text-[11px] font-sans font-medium text-[#14261E]">
            Lama Pembuatan
          </label>
          <input
            type="text"
            value={formData.productionDuration}
            onChange={(e) => onChange('productionDuration', e.target.value)}
            className="w-full h-9 px-3 rounded-xl bg-[#FAF7F2] border border-[#E9E2D2] text-xs font-sans text-[#14261E]"
          />
        </div>
        <div className="space-y-1">
          <label className="text-[11px] font-sans font-medium text-[#14261E]">
            Rentang Waktu Kirim *
          </label>
          <input
            type="text"
            value={formData.deliveryTimeWindow}
            onChange={(e) => onChange('deliveryTimeWindow', e.target.value)}
            className="w-full h-9 px-3 rounded-xl bg-[#FAF7F2] border border-[#E9E2D2] text-xs font-sans text-[#14261E]"
          />
        </div>
      </div>
    </div>
  );
};

