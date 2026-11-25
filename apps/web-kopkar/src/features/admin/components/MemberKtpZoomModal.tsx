import React from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import type { PendingMember } from '../../../types/kopkarAdmin';

interface MemberKtpZoomModalProps {
  member: PendingMember | null;
  onClose: () => void;
}

export const MemberKtpZoomModal: React.FC<MemberKtpZoomModalProps> = ({
  member,
  onClose,
}) => {
  if (!member) return null;

  return createPortal(
    <div className="fixed inset-0 z-[60] bg-black/45 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl border border-[#EAE4D3] max-w-md w-full p-6 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#F0EBDC]">
          <div>
            <h3 className="font-okashi text-[18px] text-[#18221D]">
              Pratinjau KTP / ID Karyawan
            </h3>
            <p className="text-[12px] text-[#7A867E]">
              {member.fullName} · {member.nik}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup pratinjau KTP"
            className="p-1.5 rounded-lg hover:bg-[#FAF7EE] text-[#526058] cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {member.ktpImage ? (
          <img
            src={member.ktpImage}
            alt={`Identitas ${member.fullName}`}
            className="w-full h-52 object-cover rounded-xl border border-[#EAE4D3]"
          />
        ) : (
          <div className="rounded-xl bg-[#165239] text-white p-5 space-y-3">
            <div className="text-[11px] uppercase tracking-wider text-[#F2C94C] font-semibold">
              Kartu Identitas Karyawan PT SAI
            </div>
            <div className="font-okashi text-[20px]">{member.fullName}</div>
            <div className="font-mono text-[13px] text-white/85 tabular-nums">
              {member.nik} · {member.department}
            </div>
          </div>
        )}

        <div className="flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl border border-[#EAE4D3] text-[13px] font-medium text-[#18221D] cursor-pointer hover:bg-[#FAF7EE]"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};
