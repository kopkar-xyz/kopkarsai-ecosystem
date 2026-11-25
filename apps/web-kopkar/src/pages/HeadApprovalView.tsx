import React, { useState } from 'react';
import { HeadApprovalKpiCards } from '../features/admin/components/HeadApprovalKpiCards';
import {
  HeadApprovalDecisionGrid,
  type HeadApprovalFilterTab,
} from '../features/admin/components/HeadApprovalDecisionGrid';
import { HeadApprovalSkModal } from '../features/admin/components/HeadApprovalSkModal';
import { INITIAL_EXECUTIVE_APPROVALS } from '../features/admin/data/adminMockData';
import type { ExecutiveApproval } from '../types/kopkarAdmin';

export const HeadApprovalView: React.FC = () => {
  const [approvals, setApprovals] = useState<ExecutiveApproval[]>(INITIAL_EXECUTIVE_APPROVALS);
  const [activeDrawerItem, setActiveDrawerItem] = useState<ExecutiveApproval | null>(null);
  const [activeTab, setActiveTab] = useState<HeadApprovalFilterTab>('Semua');

  const pendingCount = approvals.filter((a) => a.status === 'Menunggu').length;
  const memberPendingCount = approvals.filter(
    (a) => a.category === 'Otorisasi Anggota' && a.status === 'Menunggu'
  ).length;
  const totalLicensedMembers =
    141 +
    approvals.filter((a) => a.category === 'Otorisasi Anggota' && a.status === 'Disetujui').length;

  const filteredApprovals = approvals.filter((a) => {
    if (activeTab === 'SK Anggota') return a.category === 'Otorisasi Anggota';
    if (activeTab === 'Pinjaman & Suplai') return a.category !== 'Otorisasi Anggota';
    return true;
  });

  const handleApprove = (app: ExecutiveApproval) => {
    const generatedSk = app.skNumber ?? `SK/KOP-SAI/XI/2026/041`;
    setApprovals((prev) =>
      prev.map((a) => (a.id === app.id ? { ...a, status: 'Disetujui', skNumber: generatedSk } : a))
    );
    setActiveDrawerItem(null);
  };

  const handleReject = (id: string) => {
    setApprovals((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: 'Dikembalikan' } : a))
    );
  };

  return (
    <div className="space-y-5 animate-fadeIn select-none">
      {/* 1. 3 Kartu KPI Ringkasan */}
      <HeadApprovalKpiCards
        pendingCount={pendingCount}
        memberPendingCount={memberPendingCount}
        totalLicensedMembers={totalLicensedMembers}
      />

      {/* 2. Tabel Antrean Persetujuan Final Kepala Koperasi */}
      <HeadApprovalDecisionGrid
        approvals={filteredApprovals}
        totalCount={approvals.length}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onOpenDrawer={setActiveDrawerItem}
      />

      {/* 3. Right Slide-Over Drawer */}
      <HeadApprovalSkModal
        approval={activeDrawerItem}
        onClose={() => setActiveDrawerItem(null)}
        onConfirmApprove={handleApprove}
        onReject={handleReject}
      />
    </div>
  );
};
