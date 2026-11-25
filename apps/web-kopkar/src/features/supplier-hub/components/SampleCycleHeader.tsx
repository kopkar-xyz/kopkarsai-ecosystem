import React from 'react';
import { Calendar, FlaskConical, CheckCircle2 } from 'lucide-react';

export const SampleCycleHeader: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
      <div className="bg-white rounded-2xl border border-[#EAE4D3] p-4 flex items-start gap-3 shadow-xs">
        <div className="w-8 h-8 rounded-xl bg-[#EAF4EE] text-[#165239] flex items-center justify-center shrink-0">
          <Calendar className="w-4 h-4" />
        </div>
        <div>
          <div className="text-[13px] font-semibold text-[#165239]">
            1. Selasa / Rabu Drop
          </div>
          <div className="text-[12px] text-[#526058] mt-0.5">
            Drop sampel fisik ke meja kurasi gerai Koperasi.
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-[#EAE4D3] p-4 flex items-start gap-3 shadow-xs">
        <div className="w-8 h-8 rounded-xl bg-[#FEF3C7] text-[#B45309] flex items-center justify-center shrink-0">
          <FlaskConical className="w-4 h-4" />
        </div>
        <div>
          <div className="text-[13px] font-semibold text-[#B45309]">
            2. Kamis Uji Organoleptik
          </div>
          <div className="text-[12px] text-[#526058] mt-0.5">
            Uji rasa, aroma, kemasan, suhu & margin HPP.
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-[#EAE4D3] p-4 flex items-start gap-3 shadow-xs">
        <div className="w-8 h-8 rounded-xl bg-[#EAF4EE] text-[#15803D] flex items-center justify-center shrink-0">
          <CheckCircle2 className="w-4 h-4" />
        </div>
        <div>
          <div className="text-[13px] font-semibold text-[#15803D]">
            3. Jumat Keputusan
          </div>
          <div className="text-[12px] text-[#526058] mt-0.5">
            Pengumuman kelulusan & kunci HPP resmi.
          </div>
        </div>
      </div>
    </div>
  );
};
