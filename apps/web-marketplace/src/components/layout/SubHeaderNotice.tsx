import React from 'react';
import { Store, Clock, ShieldCheck } from 'lucide-react';

interface SubHeaderNoticeProps {
  isGaMode: boolean;
}

export const SubHeaderNotice: React.FC<SubHeaderNoticeProps> = ({ isGaMode }) => {
  return (
    <div className="bg-[#F7F2E7] border-b border-[#EAE3D5] text-xs py-2 px-4">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2 text-[#665E60]">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 font-semibold text-[#83273B]">
            <Store className="w-3.5 h-3.5" /> Same-Day:
          </span>
          <span>Checklist kasir rak etalase sebelum ambil</span>
          <span className="text-[#EAE3D5]">|</span>
          <span className="inline-flex items-center gap-1 font-semibold text-[#2E6B4F]">
            <Clock className="w-3.5 h-3.5" /> PO H-1:
          </span>
          <span>Cut-off order harian pukul 14:00 WIB</span>
        </div>

        {isGaMode && (
          <div className="flex items-center gap-1 text-[#83273B] font-bold bg-[#FCE4E9] px-2 py-0.5 rounded-full border border-[#DC4C70]/30 animate-pulse">
            <ShieldCheck className="w-3.5 h-3.5 text-[#DC4C70]" />
            <span>Prioritas Konsumsi Rapat GA Aktif (MP-DEC-002)</span>
          </div>
        )}
      </div>
    </div>
  );
};

