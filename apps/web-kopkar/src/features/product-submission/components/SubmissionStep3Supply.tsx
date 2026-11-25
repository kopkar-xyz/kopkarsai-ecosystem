import React from 'react';
import { Truck, ArrowLeft, ArrowRight } from 'lucide-react';
import type { CompleteSubmissionFormData, SupplyScheduleOption, ShelfLifeOption } from '../types';

interface SubmissionStep3SupplyProps {
  formData: CompleteSubmissionFormData;
  onChange: <K extends keyof CompleteSubmissionFormData>(field: K, value: CompleteSubmissionFormData[K]) => void;
  onNext: () => void;
  onPrev: () => void;
}

const SUPPLY_SCHEDULES: { id: SupplyScheduleOption; label: string; desc: string }[] = [
  { id: 'Shift A', label: 'Shift A', desc: 'Pagi s/d Siang' },
  { id: 'Shift B', label: 'Shift B', desc: 'Sore s/d Malam' },
  { id: 'Setiap Pagi', label: 'Setiap Pagi', desc: 'Awal operasional' },
  { id: 'Setiap Malam', label: 'Setiap Malam', desc: 'Menjelang malam' },
  { id: 'Tunggu Habis', label: 'Tunggu Habis', desc: 'Restock etalase' },
];

const SHELF_LIFES: { id: ShelfLifeOption; label: string; desc: string }[] = [
  { id: 'Setiap Akhir Shift', label: 'Setiap Akhir Shift', desc: 'Ditarik di penghujung shift' },
  { id: 'Setiap 2 Shift', label: 'Setiap 2 Shift', desc: 'Tahan selama 2 putaran shift' },
  { id: 'Jangka Waktu Tertentu', label: 'Jangka Waktu Tertentu', desc: 'Masa simpan terukur hari' },
];

/**
 * SubmissionStep3Supply — Langkah 3: Lokasi & Jadwal Pasokan Rutin
 * Slicing 1:1 Presisi Gambar 5 Referensi Pengguna.
 * Budget: < 200 LOC.
 */
export const SubmissionStep3Supply: React.FC<SubmissionStep3SupplyProps> = ({
  formData,
  onChange,
  onNext,
  onPrev,
}) => {
  return (
    <div className="bg-white border border-[#EAE4D3] rounded-2xl p-6 sm:p-7 shadow-xs space-y-6 select-none">
      {/* 1. Header Step */}
      <div className="flex items-start gap-3.5 pb-2">
        <div className="w-10 h-10 rounded-xl bg-[#EAF4EE] text-[#1F5B45] flex items-center justify-center shrink-0 border border-[#D5E6DC]">
          <Truck size={20} />
        </div>
        <div>
          <h2 className="text-base sm:text-lg font-heading font-semibold text-[#1A2421]">
            3. Lokasi & Jadwal Pasokan Rutin
          </h2>
          <p className="text-xs font-sans text-[#5C6F67] mt-0.5">
            Tentukan unit penempatan gerai, jadwal pengiriman rutin, dan daya tahan produk
          </p>
        </div>
      </div>

      {/* 2. Penempatan Gerai (2 Cards) */}
      <div className="space-y-2">
        <label className="text-xs font-sans font-medium text-[#14261E] block">
          Penempatan Gerai *
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => onChange('supplyLocation', 'SAI-B')}
            className={`p-3.5 rounded-xl text-left transition-all cursor-pointer border flex justify-between items-start ${
              formData.supplyLocation === 'SAI-B'
                ? 'bg-[#1F5C45] text-white border-[#1F5C45] shadow-xs'
                : 'bg-[#FAF7F2] border-[#E9E2D2] text-[#14261E] hover:bg-[#F2ECE1]'
            }`}
          >
            <div>
              <b className="text-xs font-heading font-medium block">Unit SAI-B</b>
              <span className={`text-[11px] font-sans block mt-0.5 ${formData.supplyLocation === 'SAI-B' ? 'text-white/80' : 'text-[#6F776F]'}`}>
                Kantin & Toko Koperasi Gedung B
              </span>
            </div>
            <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${formData.supplyLocation === 'SAI-B' ? 'bg-white/20 text-white' : 'bg-white text-[#6F776F] border border-[#E9E2D2]'}`}>
              Pabrik
            </span>
          </button>

          <button
            type="button"
            onClick={() => onChange('supplyLocation', 'SAI-T')}
            className={`p-3.5 rounded-xl text-left transition-all cursor-pointer border flex justify-between items-start ${
              formData.supplyLocation === 'SAI-T'
                ? 'bg-[#1F5C45] text-white border-[#1F5C45] shadow-xs'
                : 'bg-[#FAF7F2] border-[#E9E2D2] text-[#14261E] hover:bg-[#F2ECE1]'
            }`}
          >
            <div>
              <b className="text-xs font-heading font-medium block">Unit SAI-T</b>
              <span className={`text-[11px] font-sans block mt-0.5 ${formData.supplyLocation === 'SAI-T' ? 'text-white/80' : 'text-[#6F776F]'}`}>
                Kantin & Toko Koperasi Gedung T
              </span>
            </div>
            <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${formData.supplyLocation === 'SAI-T' ? 'bg-white/20 text-white' : 'bg-white text-[#6F776F] border border-[#E9E2D2]'}`}>
              Pabrik
            </span>
          </button>
        </div>
      </div>

      {/* 3. Jadwal Supply Rutin (5 Pills) */}
      <div className="space-y-2">
        <label className="text-xs font-sans font-medium text-[#14261E] block">
          Jadwal Supply Rutin *
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {SUPPLY_SCHEDULES.map((sched) => {
            const isSelected = formData.supplySchedule === sched.id;
            return (
              <button
                key={sched.id}
                type="button"
                onClick={() => onChange('supplySchedule', sched.id)}
                className={`p-2.5 rounded-xl text-left transition-all cursor-pointer border ${
                  isSelected
                    ? 'bg-[#1F5C45] text-white border-[#1F5C45] shadow-xs'
                    : 'bg-[#FAF7F2] border-[#E9E2D2] text-[#14261E] hover:bg-[#F2ECE1]'
                }`}
              >
                <b className="text-xs font-heading font-medium block truncate">{sched.label}</b>
                <span className={`text-[10px] font-sans block mt-0.5 truncate ${isSelected ? 'text-white/80' : 'text-[#6F776F]'}`}>
                  {sched.desc}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. Jangka Waktu Habis Barang (Daya Tahan) */}
      <div className="space-y-2">
        <label className="text-xs font-sans font-medium text-[#14261E] block">
          Jangka Waktu Habis Barang (Daya Tahan) *
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {SHELF_LIFES.map((life) => {
            const isSelected = formData.shelfLife === life.id;
            return (
              <button
                key={life.id}
                type="button"
                onClick={() => onChange('shelfLife', life.id)}
                className={`p-3 rounded-xl text-left transition-all cursor-pointer border ${
                  isSelected
                    ? 'bg-[#1F5C45] text-white border-[#1F5C45] shadow-xs'
                    : 'bg-[#FAF7F2] border-[#E9E2D2] text-[#14261E] hover:bg-[#F2ECE1]'
                }`}
              >
                <b className="text-xs font-heading font-medium block truncate">{life.label}</b>
                <span className={`text-[11px] font-sans block mt-0.5 ${isSelected ? 'text-white/80' : 'text-[#6F776F]'}`}>
                  {life.desc}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 5. Bottom Action Bar */}
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
          onClick={onNext}
          className="h-10 px-5 rounded-xl bg-[#1F5C45] hover:bg-[#174736] text-white text-xs font-heading font-medium flex items-center gap-2 transition-all cursor-pointer shadow-xs active:scale-95"
        >
          <span>Lanjut: Harga & Margin</span>
          <ArrowRight size={15} />
        </button>
      </div>
    </div>
  );
};

