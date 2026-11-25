import React, { useState } from 'react';

interface MemberRejectPanelProps {
  onConfirmReject: (reason: string) => void;
  onCancel: () => void;
}

const REJECT_PRESETS = [
  'Foto KTP buram / tidak terbaca',
  'NIK tidak cocok dengan data HRD',
  'Persetujuan potong gaji belum lengkap',
];

export const MemberRejectPanel: React.FC<MemberRejectPanelProps> = ({
  onConfirmReject,
  onCancel,
}) => {
  const [rejectReason, setRejectReason] = useState(REJECT_PRESETS[0]);

  return (
    <div className="rounded-2xl border border-[#EAE4D3] bg-[#FAF8F2] p-4 space-y-3">
      <div className="text-[12px] font-semibold text-[#18221D]">
        Alasan Penolakan Berkas
      </div>

      <div className="space-y-1.5">
        {REJECT_PRESETS.map((reason) => {
          const active = rejectReason === reason;
          return (
            <button
              key={reason}
              type="button"
              onClick={() => setRejectReason(reason)}
              className={`w-full text-left px-3 py-2 rounded-xl text-[12px] border transition-colors cursor-pointer flex items-center justify-between gap-2 ${
                active
                  ? 'bg-white border-[#B91C1C]/50 text-[#B91C1C] font-medium shadow-2xs'
                  : 'bg-white/60 border-[#EAE4D3] text-[#526058] hover:bg-white'
              }`}
            >
              <span>{reason}</span>
              <span
                className={`w-2 h-2 rounded-full shrink-0 ${
                  active ? 'bg-[#B91C1C]' : 'bg-[#D1D5DB]'
                }`}
              />
            </button>
          );
        })}
      </div>

      <div className="flex justify-end gap-2 pt-1">
        <button
          type="button"
          onClick={onCancel}
          className="px-3.5 py-1.5 rounded-xl border border-[#EAE4D3] bg-white hover:bg-[#FAF7EE] text-[12px] font-medium text-[#526058] cursor-pointer transition-colors"
        >
          Batal
        </button>
        <button
          type="button"
          onClick={() => onConfirmReject(rejectReason)}
          className="px-3.5 py-1.5 rounded-xl bg-[#B91C1C] hover:bg-[#991B1B] text-white text-[12px] font-medium cursor-pointer transition-colors"
        >
          Konfirmasi Tolak
        </button>
      </div>
    </div>
  );
};
