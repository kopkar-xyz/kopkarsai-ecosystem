import React, { useState } from 'react';
import { MemberVerificationKpiCards } from '../features/admin/components/MemberVerificationKpiCards';
import {
  MemberCandidateList,
  type MemberFilterTab,
} from '../features/admin/components/MemberCandidateList';
import { MemberCandidateInspector } from '../features/admin/components/MemberCandidateInspector';
import { MemberKtpZoomModal } from '../features/admin/components/MemberKtpZoomModal';
import { INITIAL_PENDING_MEMBERS } from '../features/admin/data/adminMockData';
import type { PendingMember } from '../types/kopkarAdmin';

export const AdminMemberVerificationView: React.FC = () => {
  const [members, setMembers] = useState<PendingMember[]>(INITIAL_PENDING_MEMBERS);
  const [filter, setFilter] = useState<MemberFilterTab>('Semua');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeDrawerMember, setActiveDrawerMember] = useState<PendingMember | null>(null);
  const [zoomKtpMember, setZoomKtpMember] = useState<PendingMember | null>(null);

  const pendingCount = members.filter((m) => m.status === 'Menunggu').length;
  const headWaitCount = members.filter(
    (m) => m.stageStatus === 'PENDING_HEAD_APPROVAL'
  ).length;
  const activeCount = members.filter((m) => m.stageStatus === 'ACTIVE_MEMBER').length;

  const filtered = members.filter((m) => {
    if (filter === 'Menunggu' && m.status !== 'Menunggu') return false;
    if (filter === 'Lolos' && m.status !== 'Disetujui') return false;
    if (filter === 'Ditolak' && m.status !== 'Ditolak') return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        m.fullName.toLowerCase().includes(q) ||
        m.nik.toLowerCase().includes(q) ||
        m.department.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleVerify = (id: string) => {
    setMembers((prev) =>
      prev.map((m) =>
        m.id === id
          ? {
              ...m,
              stageStatus: 'PENDING_HEAD_APPROVAL',
              status: 'Disetujui',
              verifiedByAdmin: 'Admin Toko (Budi Hartono)',
              verifiedAt: '24 Nov 2026 · 14:35',
            }
          : m
      )
    );
  };

  const handleReject = (id: string, reason: string) => {
    setMembers((prev) =>
      prev.map((m) =>
        m.id === id
          ? {
              ...m,
              stageStatus: 'REJECTED',
              status: 'Ditolak',
              rejectionReason: reason,
            }
          : m
      )
    );
  };

  return (
    <div className="space-y-5 animate-fadeIn select-none">
      <MemberVerificationKpiCards
        pendingCount={pendingCount}
        headWaitCount={headWaitCount}
        activeCount={activeCount}
      />

      <MemberCandidateList
        members={filtered}
        totalCount={members.length}
        pendingCount={pendingCount}
        searchQuery={searchQuery}
        filter={filter}
        onSearchChange={setSearchQuery}
        onFilterChange={setFilter}
        onOpenDrawer={setActiveDrawerMember}
      />

      <MemberCandidateInspector
        member={activeDrawerMember}
        onClose={() => setActiveDrawerMember(null)}
        onVerify={handleVerify}
        onReject={handleReject}
        onOpenKtpZoom={(m) => setZoomKtpMember(m)}
      />

      {zoomKtpMember && (
        <MemberKtpZoomModal
          member={zoomKtpMember}
          onClose={() => setZoomKtpMember(null)}
        />
      )}
    </div>
  );
};
