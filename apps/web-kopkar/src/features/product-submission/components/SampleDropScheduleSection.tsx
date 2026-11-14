import React from 'react';
import { Calendar, Clock, MapPin, CheckSquare, Square, MessageSquare } from 'lucide-react';
import { Card } from '../../../components/ui/Card';
import type {
  ProductSubmissionFormData,
  SubmissionFormErrors,
  DropDay,
  WorkShift,
  DropLocation,
} from '../types';

interface SampleDropScheduleSectionProps {
  formData: ProductSubmissionFormData;
  errors: SubmissionFormErrors;
  onChange: <K extends keyof ProductSubmissionFormData>(field: K, value: ProductSubmissionFormData[K]) => void;
}

export const SampleDropScheduleSection: React.FC<SampleDropScheduleSectionProps> = ({
  formData,
  errors,
  onChange,
}) => {
  const days: { value: DropDay; label: string; sub: string }[] = [
    { value: 'SELASA', label: 'Hari Selasa', sub: 'Pagi s/d Sore' },
    { value: 'RABU', label: 'Hari Rabu', sub: 'Pagi s/d Sore' },
  ];

  const shifts: { value: WorkShift; label: string; hours: string }[] = [
    { value: 'SHIFT_A', label: 'Shift A (Pagi)', hours: '08:00 - 14:00 WIB' },
    { value: 'SHIFT_B', label: 'Shift B (Sore)', hours: '14:00 - 20:00 WIB' },
  ];

  const locations: { value: DropLocation; label: string; room: string }[] = [
    { value: 'SAI_B', label: 'Pabrik SAI B', room: 'Meja Kasir Toko Koperasi Gedung B' },
    { value: 'SAI_T', label: 'Pabrik SAI T', room: 'Meja Kasir Toko Koperasi Gedung T' },
  ];

  return (
    <Card padding="md" className="space-y-4">
      <div className="flex items-center gap-2.5 pb-3 border-b border-[#DED5C3]">
        <div className="w-8 h-8 rounded-xl bg-[#EAF4EE] text-[#1F5B45] flex items-center justify-center flex-shrink-0">
          <Calendar size={18} />
        </div>
        <div>
          <h3 className="text-base font-heading font-extrabold text-[#1A2421]">
            3. Penjadwalan Drop Sampel Fisik (KK-BR-004)
          </h3>
          <p className="text-xs font-body text-[#5C6F67]">
            Pilih hari Selasa/Rabu dan shift kerja untuk penyerahan sampel makanan ke toko koperasi
          </p>
        </div>
      </div>

      {/* Hari Drop Sampel */}
      <div>
        <label className="block text-xs font-heading font-bold text-[#1A2421] mb-1.5 flex items-center gap-1.5">
          <Calendar size={14} className="text-[#1F5B45]" />
          <span>Hari Penyerahan Sampel Fisik <span className="text-[#DC4C70]">*</span></span>
        </label>
        <div className="grid grid-cols-2 gap-2.5">
          {days.map((d) => (
            <button
              key={d.value}
              type="button"
              onClick={() => onChange('dropDay', d.value)}
              className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                formData.dropDay === d.value
                  ? 'bg-[#1F5B45] text-white border-[#1F5B45] shadow-xs'
                  : 'bg-[#F8F4EC] text-[#1A2421] border-[#DED5C3] hover:border-[#1F5B45]/40'
              }`}
            >
              <p className="text-xs font-heading font-bold">{d.label}</p>
              <p
                className={`text-[10px] font-body ${
                  formData.dropDay === d.value ? 'text-white/80' : 'text-[#5C6F67]'
                }`}
              >
                {d.sub}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Shift Kerja & Jam Operasional */}
      <div>
        <label className="block text-xs font-heading font-bold text-[#1A2421] mb-1.5 flex items-center gap-1.5">
          <Clock size={14} className="text-[#1F5B45]" />
          <span>Shift Jam Drop Sampel <span className="text-[#DC4C70]">*</span></span>
        </label>
        <div className="grid grid-cols-2 gap-2.5">
          {shifts.map((s) => (
            <button
              key={s.value}
              type="button"
              onClick={() => onChange('dropShift', s.value)}
              className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                formData.dropShift === s.value
                  ? 'bg-[#1F5B45] text-white border-[#1F5B45] shadow-xs'
                  : 'bg-white text-[#1A2421] border-[#DED5C3] hover:bg-[#F8F4EC]'
              }`}
            >
              <p className="text-xs font-heading font-bold">{s.label}</p>
              <p
                className={`text-[10px] font-accent ${
                  formData.dropShift === s.value ? 'text-white/80' : 'text-[#5C6F67]'
                }`}
              >
                {s.hours}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Lokasi Pabrik Drop Sampel */}
      <div>
        <label className="block text-xs font-heading font-bold text-[#1A2421] mb-1.5 flex items-center gap-1.5">
          <MapPin size={14} className="text-[#1F5B45]" />
          <span>Lokasi Meja Toko Penyerahan <span className="text-[#DC4C70]">*</span></span>
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {locations.map((loc) => (
            <button
              key={loc.value}
              type="button"
              onClick={() => onChange('dropLocation', loc.value)}
              className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex items-start gap-2.5 ${
                formData.dropLocation === loc.value
                  ? 'bg-[#EAF4EE] text-[#1F5B45] border-[#1F5B45] ring-1 ring-[#1F5B45]'
                  : 'bg-white text-[#1A2421] border-[#DED5C3] hover:bg-[#F8F4EC]'
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full border mt-0.5 flex items-center justify-center flex-shrink-0 ${
                  formData.dropLocation === loc.value ? 'border-[#1F5B45]' : 'border-[#5C6F67]'
                }`}
              >
                {formData.dropLocation === loc.value && (
                  <div className="w-2 h-2 rounded-full bg-[#1F5B45]" />
                )}
              </div>
              <div>
                <p className="text-xs font-heading font-bold">{loc.label}</p>
                <p className="text-[10px] font-body text-[#5C6F67]">{loc.room}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Jumlah Porsi Sampel & Catatan Petugas */}
      <div className="p-3 bg-[#F8F4EC] rounded-xl border border-[#DED5C3] space-y-2 text-xs">
        <div className="flex items-center justify-between">
          <span className="font-heading font-bold text-[#1A2421]">
            Ketentuan Sampel Fisik:
          </span>
          <span className="font-accent font-bold text-[#1F5B45] bg-white px-2 py-0.5 rounded-md border border-[#DED5C3]">
            Wajib 2 Porsi
          </span>
        </div>
        <p className="text-[11px] font-body text-[#5C6F67]">
          Porsi 1 untuk uji rasa/organoleptik oleh kurator toko pada hari Kamis, dan porsi 2 untuk evaluasi ketahanan kemasan & higienitas.
        </p>
      </div>

      {/* Catatan Khusus untuk Tim Toko */}
      <div>
        <label className="block text-xs font-heading font-bold text-[#1A2421] mb-1 flex items-center gap-1.5">
          <MessageSquare size={14} className="text-[#1F5B45]" />
          <span>Catatan Khusus untuk Tim Kurator Toko (Opsional)</span>
        </label>
        <input
          type="text"
          value={formData.notes}
          onChange={(e) => onChange('notes', e.target.value)}
          placeholder="cth: Mohon disajikan hangat, bumbu cabai terpisah di plastik..."
          className="w-full px-3.5 py-2 rounded-xl bg-white border border-[#DED5C3] text-xs font-body text-[#1A2421] placeholder-[#8FA39A] focus:outline-none focus:ring-2 focus:ring-[#1F5B45]/30"
        />
      </div>

      {/* Checkbox Persetujuan Komitmen (KK-BR-004 & KK-BR-007) */}
      <div className="pt-2 border-t border-[#DED5C3]/70">
        <label
          onClick={() => onChange('agreedToTerms', !formData.agreedToTerms)}
          className="flex items-start gap-2.5 cursor-pointer select-none"
        >
          <div className="mt-0.5 flex-shrink-0 text-[#1F5B45]">
            {formData.agreedToTerms ? (
              <CheckSquare size={18} className="text-[#1F5B45]" />
            ) : (
              <Square size={18} className="text-[#5C6F67]" />
            )}
          </div>
          <span className="text-xs font-body text-[#24332F] leading-snug">
            Saya menyatakan data produk ini benar, bersedia mengantarkan sampel fisik sesuai jadwal pilihan di atas, serta menyetujui ketentuan mutu dan bagi hasil Koperasi SAI (KK-BR-004 & KK-BR-007).
          </span>
        </label>
        {errors.agreedToTerms && (
          <p className="text-[11px] font-body text-[#DC4C70] mt-1 ml-7">{errors.agreedToTerms}</p>
        )}
      </div>
    </Card>
  );
};
