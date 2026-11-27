import React from 'react';
import { Calendar } from 'lucide-react';
import type { CompleteSubmissionFormData } from '../types';
import { SubmissionStepFooter } from './SubmissionStepFooter';

interface SubmissionStep1ScheduleProps {
  formData: CompleteSubmissionFormData;
  onChange: <K extends keyof CompleteSubmissionFormData>(field: K, value: CompleteSubmissionFormData[K]) => void;
  onNext: () => void;
  onCancel: () => void;
}

/**
 * SubmissionStep1Schedule — Langkah 1: Jadwal & Lokasi Pengajuan Sampel
 * Slicing 1:1 Presisi Gambar 3 Referensi Pengguna.
 * Budget: < 200 LOC.
 */
export const SubmissionStep1Schedule: React.FC<SubmissionStep1ScheduleProps> = ({
  formData,
  onChange,
  onNext,
  onCancel,
}) => {
  const dayDisplay = formData.dropDay === 'SELASA' ? 'Selasa' : 'Rabu';
  const shiftDisplay = formData.dropShift === 'SHIFT_A' ? 'Shift A' : 'Shift B';
  const locationDisplay = formData.dropLocation;

  return (
    <div className="bg-white border border-[#EAE4D3] rounded-2xl p-6 sm:p-7 shadow-xs space-y-6 select-none">
      {/* 1. Header Step */}
      <div className="flex items-start gap-3.5 pb-2">
        <div className="w-10 h-10 rounded-xl bg-[#EAF4EE] text-[#1F5B45] flex items-center justify-center shrink-0 border border-[#D5E6DC]">
          <Calendar size={20} />
        </div>
        <div>
          <h2 className="text-base sm:text-lg font-heading font-semibold text-[#1A2421]">
            1. Jadwal & Lokasi Pengajuan
          </h2>
          <p className="text-xs font-sans text-[#5C6F67] mt-0.5">
            Pilih hari, shift, dan gerai penyerahan sampel fisik untuk kurasi
          </p>
        </div>
      </div>

      {/* 2. Form Grid Pilihan Hari, Shift, dan Lokasi */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {/* Hari Drop Sampel */}
        <div className="space-y-2">
          <label className="text-xs font-sans font-medium text-[#14261E] block">
            Hari Drop Sampel *
          </label>
          <div className="grid grid-cols-2 gap-2">
            {(['SELASA', 'RABU'] as const).map((day) => {
              const isSelected = formData.dropDay === day;
              return (
                <button
                  key={day}
                  type="button"
                  onClick={() => onChange('dropDay', day)}
                  className={`h-10 rounded-xl text-xs font-sans font-medium transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#1F5C45] text-white shadow-xs'
                      : 'bg-[#FAF7F2] border border-[#E9E2D2] text-[#14261E] hover:bg-[#F2ECE1]'
                  }`}
                >
                  {day === 'SELASA' ? 'Selasa' : 'Rabu'}
                </button>
              );
            })}
          </div>
        </div>

        {/* Shift Penyerahan */}
        <div className="space-y-2">
          <label className="text-xs font-sans font-medium text-[#14261E] block">
            Shift Penyerahan *
          </label>
          <div className="grid grid-cols-2 gap-2">
            {(['SHIFT_A', 'SHIFT_B'] as const).map((shift) => {
              const isSelected = formData.dropShift === shift;
              return (
                <button
                  key={shift}
                  type="button"
                  onClick={() => onChange('dropShift', shift)}
                  className={`h-10 rounded-xl text-xs font-sans font-medium transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#1F5C45] text-white shadow-xs'
                      : 'bg-[#FAF7F2] border border-[#E9E2D2] text-[#14261E] hover:bg-[#F2ECE1]'
                  }`}
                >
                  {shift === 'SHIFT_A' ? 'Shift A' : 'Shift B'}
                </button>
              );
            })}
          </div>
        </div>

        {/* Lokasi Drop */}
        <div className="space-y-2">
          <label className="text-xs font-sans font-medium text-[#14261E] block">
            Lokasi Drop *
          </label>
          <div className="grid grid-cols-2 gap-2">
            {(['SAI-T', 'SAI-B'] as const).map((loc) => {
              const isSelected = formData.dropLocation === loc;
              return (
                <button
                  key={loc}
                  type="button"
                  onClick={() => onChange('dropLocation', loc)}
                  className={`h-10 rounded-xl text-xs font-sans font-medium transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#1F5C45] text-white shadow-xs'
                      : 'bg-[#FAF7F2] border border-[#E9E2D2] text-[#14261E] hover:bg-[#F2ECE1]'
                  }`}
                >
                  {loc}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 3. Kotak Informasi Dinamis */}
      <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#E9E2D2] text-xs font-sans text-[#6F776F] leading-relaxed">
        Sampel fisik diterima setiap hari{' '}
        <strong className="text-[#14261E] font-medium">{dayDisplay}</strong> pada{' '}
        <strong className="text-[#14261E] font-medium">{shiftDisplay}</strong> di gerai{' '}
        <strong className="text-[#14261E] font-medium">{locationDisplay}</strong> untuk uji
        kelayakan hari Kamis.
      </div>

      {/* 4. Bottom Action Bar */}
      <SubmissionStepFooter
        onCancel={onCancel}
        onNext={onNext}
        nextLabel="Lanjut: Data & Karakteristik"
      />
    </div>
  );
};

