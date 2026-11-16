import React from 'react';
import { Calendar, Clock, MapPin, RefreshCw, X } from 'lucide-react';
import { Card } from '../../../components/ui/Card';
import type {
  CompleteSubmissionFormData,
  SubmissionFormErrors,
  DropDay,
  DropShift,
  SupplyLocation,
} from '../types';

interface SubmissionScheduleSectionProps {
  formData: CompleteSubmissionFormData;
  errors?: SubmissionFormErrors;
  onChange: <K extends keyof CompleteSubmissionFormData>(
    field: K,
    value: CompleteSubmissionFormData[K]
  ) => void;
  onCancelRevision?: () => void;
}

export const SubmissionScheduleSection: React.FC<SubmissionScheduleSectionProps> = ({
  formData,
  onChange,
  onCancelRevision,
}) => {
  const days: { value: DropDay; label: string }[] = [
    { value: 'SELASA', label: 'Selasa' },
    { value: 'RABU', label: 'Rabu' },
  ];

  const shifts: { value: DropShift; label: string }[] = [
    { value: 'SHIFT_A', label: 'Shift A' },
    { value: 'SHIFT_B', label: 'Shift B' },
  ];

  const dropLocations: { value: SupplyLocation; label: string }[] = [
    { value: 'SAI-T', label: 'SAI-T' },
    { value: 'SAI-B', label: 'SAI-B' },
  ];

  return (
    <Card padding="md" className="space-y-4">
      {/* Banner Mode Revisi jika sedang mengedit pengajuan yang ada */}
      {formData.editingSubmissionId && (
        <div className="p-3 bg-[#FEF6DC] border border-[#F6CE2C] rounded-2xl flex items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 min-w-0">
            <RefreshCw size={16} className="text-[#E5A812] flex-shrink-0 animate-spin" />
            <div className="min-w-0">
              <span className="font-heading font-bold text-[#1A2421]">
                Mode Revisi Pengajuan:
              </span>{' '}
              <span className="font-accent font-bold text-[#1F5B45] underline">
                {formData.editingSubmissionId}
              </span>
              <p className="text-[#5C6F67] text-[11px] mt-0.5 truncate">
                Sesuaikan data yang perlu diperbaiki lalu kirim ulang pengajuan.
              </p>
            </div>
          </div>
          {onCancelRevision && (
            <button
              type="button"
              onClick={onCancelRevision}
              className="px-2.5 py-1 rounded-xl bg-white hover:bg-[#F3ECDD] text-[#DC4C70] border border-[#DC4C70]/40 font-heading font-bold text-[11px] flex items-center gap-1 cursor-pointer transition-colors flex-shrink-0"
            >
              <X size={13} />
              <span>Batal</span>
            </button>
          )}
        </div>
      )}

      {/* Header Section (1 Baris Ringkas & Rapi di Mobile) */}
      <div className="flex items-center gap-2.5 pb-2.5 border-b border-[#DED5C3]">
        <div className="w-7 h-7 rounded-lg bg-[#EAF4EE] text-[#1F5B45] flex items-center justify-center flex-shrink-0">
          <Calendar size={15} />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="text-sm sm:text-base font-heading font-extrabold text-[#1A2421] truncate leading-tight">
            1. Jadwal & Lokasi Pengajuan
          </h3>
          <p className="text-[11px] sm:text-xs font-body text-[#5C6F67] truncate leading-normal">
            Pilih hari, shift, dan lokasi drop sampel
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
        {/* Hari Penyerahan */}
        <div>
          <label className="block text-xs font-heading font-bold text-[#1A2421] mb-1.5 flex items-center gap-1.5">
            <Calendar size={13} className="text-[#1F5B45]" />
            <span>Hari Drop <span className="text-[#DC4C70]">*</span></span>
          </label>
          <div className="grid grid-cols-2 gap-2">
            {days.map((d) => (
              <button
                key={d.value}
                type="button"
                onClick={() => onChange('dropDay', d.value)}
                className={`py-2 px-3 rounded-xl border text-center font-heading font-bold text-xs transition-all cursor-pointer ${
                  formData.dropDay === d.value
                    ? 'bg-[#1F5B45] text-white border-[#1F5B45] shadow-xs'
                    : 'bg-[#F8F4EC] text-[#1A2421] border-[#DED5C3] hover:border-[#1F5B45]/40'
                }`}
              >
                {d.label}
              </button>
            ))}
          </div>
        </div>

        {/* Shift Jam Drop Sampel */}
        <div>
          <label className="block text-xs font-heading font-bold text-[#1A2421] mb-1.5 flex items-center gap-1.5">
            <Clock size={13} className="text-[#1F5B45]" />
            <span>Shift <span className="text-[#DC4C70]">*</span></span>
          </label>
          <div className="grid grid-cols-2 gap-2">
            {shifts.map((s) => (
              <button
                key={s.value}
                type="button"
                onClick={() => onChange('dropShift', s.value)}
                className={`py-2 px-3 rounded-xl border text-center font-heading font-bold text-xs transition-all cursor-pointer ${
                  formData.dropShift === s.value
                    ? 'bg-[#1F5B45] text-white border-[#1F5B45] shadow-xs'
                    : 'bg-[#F8F4EC] text-[#1A2421] border-[#DED5C3] hover:border-[#1F5B45]/40'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* Lokasi Drop Sampel Toko */}
        <div>
          <label className="block text-xs font-heading font-bold text-[#1A2421] mb-1.5 flex items-center gap-1.5">
            <MapPin size={13} className="text-[#1F5B45]" />
            <span>Lokasi Drop <span className="text-[#DC4C70]">*</span></span>
          </label>
          <div className="grid grid-cols-2 gap-2">
            {dropLocations.map((loc) => (
              <button
                key={loc.value}
                type="button"
                onClick={() => onChange('dropLocation', loc.value)}
                className={`py-2 px-3 rounded-xl border text-center font-heading font-bold text-xs transition-all cursor-pointer ${
                  formData.dropLocation === loc.value
                    ? 'bg-[#1F5B45] text-white border-[#1F5B45] shadow-xs'
                    : 'bg-[#F8F4EC] text-[#1A2421] border-[#DED5C3] hover:border-[#1F5B45]/40'
                }`}
              >
                {loc.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
};
