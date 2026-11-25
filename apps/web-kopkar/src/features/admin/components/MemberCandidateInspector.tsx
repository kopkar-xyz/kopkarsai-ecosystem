import React, { useEffect, useState } from 'react';
import { Eye } from 'lucide-react';
import { SlideOverDrawer } from '../../../components/ui/SlideOverDrawer';
import { DigitalMemberCard } from '../../profile/components/DigitalMemberCard';
import type { PendingMember } from '../../../types/kopkarAdmin';
import { getMemberInitials, getMemberStatusDisplay } from './MemberCandidateList';
import { MemberRejectPanel } from './MemberRejectPanel';

interface MemberCandidateInspectorProps {
  member: PendingMember | null;
  onClose: () => void;
  onVerify: (id: string) => void;
  onReject: (id: string, reason: string) => void;
  onOpenKtpZoom: (member: PendingMember) => void;
}

export const MemberCandidateInspector: React.FC<MemberCandidateInspectorProps> = ({
  member,
  onClose,
  onVerify,
  onReject,
  onOpenKtpZoom,
}) => {
  const [rejectOpen, setRejectOpen] = useState(false);

  useEffect(() => {
    setRejectOpen(false);
  }, [member?.id]);

  if (!member) return null;

  const statusDisplay = getMemberStatusDisplay(member);
  const isPending = member.status === 'Menunggu';
  const initials = getMemberInitials(member.fullName);

  return (
    <SlideOverDrawer
      open={Boolean(member)}
      onClose={onClose}
      maxWidthClass="sm:max-w-[430px]"
      closeAriaLabel="Tutup panel verifikasi"
      header={
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#EAF4EE] text-[#165239] text-[13px] font-semibold flex items-center justify-center shrink-0">
            {initials}
          </div>
          <div>
            <h3 className="text-[18px] font-semibold text-[#18221D] leading-snug">
              {member.fullName}
            </h3>
            <p className="text-[12px] text-[#7A867E] tabular-nums">
              {member.nik} · {member.department}
            </p>
          </div>
        </div>
      }
      footer={
        <div className="flex items-center justify-end gap-2.5">
          {isPending ? (
            <>
              <button
                type="button"
                onClick={() => setRejectOpen((v) => !v)}
                className="px-4 py-2 rounded-xl border border-[#FECACA] bg-white hover:bg-[#FEF2F2] text-[#B91C1C] text-[12.5px] font-medium cursor-pointer transition-colors"
              >
                Tolak Berkas
              </button>
              <button
                type="button"
                onClick={() => {
                  onVerify(member.id);
                  onClose();
                }}
                className="px-4 py-2 rounded-xl bg-[#165239] hover:bg-[#12422E] text-white text-[12.5px] font-medium cursor-pointer shadow-xs transition-colors"
              >
                Loloskan ke Kepala
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
      {/* Shared DigitalMemberCard template */}
      <DigitalMemberCard
        name={member.fullName}
        roleDescription={`${member.department} · Calon Anggota`}
        nik={member.nik}
        subtitle="ID Karyawan PT SAI · Terdaftar HRD"
        statusLabel={statusDisplay.label}
        rightMetricLabel="Payroll"
        rightMetricValue={member.payrollConsent ? 'Setuju' : 'Pending'}
        showControlsAndStats={false}
      />

      {/* Unified Minimalist Metadata & Verification Card */}
      <div className="rounded-2xl border border-[#EAE4D3] bg-[#FAF8F2]/60 px-4 divide-y divide-[#EAE4D3]/80 text-[12.5px]">
        <div className="py-3 flex items-center justify-between gap-2">
          <span className="text-[#7A867E]">Email</span>
          <span className="font-medium text-[#18221D]">{member.email}</span>
        </div>

        <div className="py-3 flex items-center justify-between gap-2">
          <span className="text-[#7A867E]">WhatsApp</span>
          <span className="font-medium text-[#18221D] tabular-nums">{member.phone}</span>
        </div>

        <div className="py-3 flex items-center justify-between gap-2">
          <span className="text-[#7A867E]">Potong Payroll</span>
          <span className="font-medium text-[#165239]">
            {member.payrollConsent ? 'Setuju (Rp 50rb + 25rb/bln)' : 'Belum disetujui'}
          </span>
        </div>

        <div className="py-3 flex items-center justify-between gap-2">
          <span className="text-[#7A867E]">Tanggal Daftar</span>
          <span className="font-medium text-[#18221D] tabular-nums">
            {member.submittedAt}
          </span>
        </div>

        <div className="py-3 flex items-center justify-between gap-2">
          <span className="text-[#7A867E]">Dual-Approval</span>
          <span className="font-medium text-[#18221D] text-right">
            {member.skNumber
              ? `SK Terbit (${member.skNumber})`
              : member.verifiedByAdmin
                ? 'Lolos Tahap 1 · Menunggu SK'
                : 'Tahap 1 Admin → Tahap 2 Kepala'}
          </span>
        </div>

        <div className="py-3 flex items-center justify-between gap-2">
          <span className="text-[#7A867E]">Berkas KTP (S3)</span>
          <button
            type="button"
            onClick={() => onOpenKtpZoom(member)}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white border border-[#EAE4D3] hover:bg-[#FAF7EE] text-[11.5px] font-medium text-[#165239] cursor-pointer transition-colors"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Lihat Foto KTP</span>
          </button>
        </div>
      </div>

      {member.rejectionReason && (
        <div className="rounded-xl border border-[#FECACA] bg-[#FEF2F2] p-3 text-[12px] text-[#B91C1C]">
          <span className="font-semibold">Alasan Penolakan:</span> {member.rejectionReason}
        </div>
      )}

      {rejectOpen && (
        <MemberRejectPanel
          onCancel={() => setRejectOpen(false)}
          onConfirmReject={(reason: string) => {
            onReject(member.id, reason);
            setRejectOpen(false);
            onClose();
          }}
        />
      )}
    </SlideOverDrawer>
  );
};
