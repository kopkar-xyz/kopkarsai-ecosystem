import React from 'react';
import { SlideOverDrawer } from '../../../components/ui/SlideOverDrawer';
import { formatCurrencyIDR } from '../../../lib/utils';
import type { ExecutiveApproval } from '../../../types/kopkarAdmin';

interface HeadApprovalSkModalProps {
  approval: ExecutiveApproval | null;
  onClose: () => void;
  onConfirmApprove: (app: ExecutiveApproval) => void;
  onReject: (id: string) => void;
}

/**
 * HeadApprovalSkModal — Right Slide-Over Drawer for Kepala Koperasi final decision.
 */
export const HeadApprovalSkModal: React.FC<HeadApprovalSkModalProps> = ({
  approval,
  onClose,
  onConfirmApprove,
  onReject,
}) => {
  if (!approval) return null;

  const isMember = approval.category === 'Otorisasi Anggota';
  const isPending = approval.status === 'Menunggu';
  const eyebrow = isMember ? 'OTORISASI ANGGOTA' : approval.category.toUpperCase();
  const drawerTitle = isMember ? approval.requester : approval.title;

  return (
    <SlideOverDrawer
      open={Boolean(approval)}
      onClose={onClose}
      maxWidthClass="sm:max-w-[420px]"
      closeAriaLabel="Tutup panel tinjauan"
      header={
        <div>
          <span className="text-[11px] font-semibold tracking-[0.08em] text-[#165239] uppercase">
            {eyebrow}
          </span>
          <h3 className="text-[19px] font-semibold text-[#18221D] mt-1 leading-snug">
            {drawerTitle}
          </h3>
          <p className="text-[12px] text-[#7A867E] mt-1 tabular-nums">
            {approval.id} · {approval.submittedAt}
          </p>
        </div>
      }
      footer={
        <div className="flex items-center justify-end gap-2.5">
          {isPending ? (
            <>
              <button
                type="button"
                onClick={() => {
                  onReject(approval.id);
                  onClose();
                }}
                className="px-4 py-2 rounded-xl border border-[#EAE4D3] bg-white hover:bg-[#FAF7EE] text-[#526058] text-[12.5px] font-medium cursor-pointer transition-colors"
              >
                {isMember ? 'Batalkan' : 'Kembalikan'}
              </button>
              <button
                type="button"
                onClick={() => onConfirmApprove(approval)}
                className="px-4 py-2 rounded-xl bg-[#165239] hover:bg-[#12422E] text-white text-[12.5px] font-medium cursor-pointer shadow-xs transition-colors"
              >
                {isMember ? 'Sahkan SK & Aktifkan' : 'Setujui Final'}
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-[#EAE4D3] bg-white hover:bg-[#FAF7EE] text-[#526058] text-[12.5px] font-medium cursor-pointer transition-colors"
            >
              Tutup
            </button>
          )}
        </div>
      }
    >
      {/* Merged SK & Otorisasi Details */}
      <div className="rounded-2xl border border-[#EAE4D3] bg-[#FAF8F2]/60 p-4 space-y-2.5 text-[12.5px]">
        <div className="flex items-start justify-between gap-3">
          <span className="text-[#7A867E] shrink-0">Perihal</span>
          <span className="font-medium text-[#18221D] text-right leading-snug">
            {approval.title}
          </span>
        </div>

        <div className="flex items-center justify-between gap-2 pt-2.5 border-t border-[#EAE4D3]">
          <span className="text-[#7A867E]">Pemohon</span>
          <span className="font-medium text-[#18221D] text-right">
            {approval.requester}
          </span>
        </div>

        {isMember ? (
          <>
            <div className="flex items-center justify-between gap-2 pt-2.5 border-t border-[#EAE4D3]">
              <span className="text-[#7A867E]">NIK Karyawan</span>
              <span className="font-medium text-[#18221D] tabular-nums">
                {approval.nik ?? '-'}
              </span>
            </div>
            <div className="flex items-center justify-between gap-2 pt-2.5 border-t border-[#EAE4D3]">
              <span className="text-[#7A867E]">Nomor SK</span>
              <span className="font-medium text-[#165239] tabular-nums">
                {approval.skNumber ?? 'SK/KOP-SAI/XI/2026/041'}
              </span>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-between gap-2 pt-2.5 border-t border-[#EAE4D3]">
            <span className="text-[#7A867E]">Nilai Otorisasi</span>
            <span className="font-geist font-medium text-[15px] text-[#165239] tabular-nums">
              {formatCurrencyIDR(approval.amount)}
            </span>
          </div>
        )}

        <div className="flex items-center justify-between gap-2 pt-2.5 border-t border-[#EAE4D3]">
          <span className="text-[#7A867E]">Tanggal Terbit</span>
          <span className="font-medium text-[#18221D] tabular-nums">24 November 2026</span>
        </div>

        <div className="flex items-center justify-between gap-2 pt-2.5 border-t border-[#EAE4D3]">
          <span className="text-[#7A867E]">Otorisasi</span>
          <span className="font-medium text-[#18221D]">Dual-Approval Tahap 2</span>
        </div>

        <div className="flex items-center justify-between gap-2 pt-2.5 border-t border-[#EAE4D3]">
          <span className="text-[#7A867E]">Status</span>
          <span className="font-medium text-[#18221D]">{approval.status}</span>
        </div>
      </div>

      {/* Verification & Risk Note */}
      <div className="rounded-2xl border border-[#EAE4D3] bg-[#FAF8F2] p-4 space-y-1.5">
        <span className="text-[11px] font-semibold tracking-[0.06em] text-[#7A867E] uppercase block">
          CATATAN VERIFIKASI &amp; RISIKO
        </span>
        {approval.verifierNote && (
          <p className="text-[12.5px] text-[#18221D] leading-relaxed">
            {approval.verifierNote}
          </p>
        )}
        <p className="text-[12px] text-[#526058] leading-relaxed">
          {approval.riskNote}
        </p>
      </div>
    </SlideOverDrawer>
  );
};
