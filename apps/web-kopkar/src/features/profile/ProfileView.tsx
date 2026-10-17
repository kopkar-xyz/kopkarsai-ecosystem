import React, { useState } from 'react';
import { EMemberCard } from './components/EMemberCard';
import { ProfileDetails } from './components/ProfileDetails';
import { ProfileMenuList } from './components/ProfileMenuList';
import { Modal } from '../../components/ui/Modal';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { UserProfile } from '../../types';

interface ProfileViewProps {
  user: UserProfile;
  onOpenMarketplace: () => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({ user, onOpenMarketplace }) => {
  const [isRevisionLogOpen, setIsRevisionLogOpen] = useState(false);

  const mockRevisionLogs = [
    {
      id: 'rev-01',
      productName: 'Nasi Bakar Cakalang SAI',
      cycle: 'Siklus September 2026',
      status: 'ACC',
      notes: 'Lolos uji organoleptik & ketahanan 8 jam pada suhu ruang. Siap tayang di Marketplace.',
      date: '28 Sep 2026',
    },
    {
      id: 'rev-02',
      productName: 'Risoles Mayo Daging Asap',
      cycle: 'Siklus Agustus 2026',
      status: 'REVISION',
      notes: 'Catatan kurator: Kurangi kadar minyak pada kulit risoles & sertakan label tanggal kedaluwarsa.',
      date: '15 Agu 2026',
    },
  ];

  return (
    <div className="px-5 space-y-5 animate-fade-in">
      {/* Page Title */}
      <div>
        <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider block">
          KK-SCR-013 • Digital Membership
        </span>
        <h2 className="text-xl font-extrabold text-kopkar-dark leading-tight">
          Akun & Profil Anggota
        </h2>
      </div>

      {/* 1. Digital E-Member Card */}
      <EMemberCard
        name={user.name}
        nik={user.nik}
        unit={user.unit}
        status="Anggota Aktif"
      />

      {/* 2. Employment & Contact Details */}
      <ProfileDetails user={user} />

      {/* 3. Operational Menus */}
      <ProfileMenuList
        onOpenMarketplace={onOpenMarketplace}
        onOpenRevisionLog={() => setIsRevisionLogOpen(true)}
      />

      {/* Modal Riwayat & Log Revisi Produk (KK-SCR-009) */}
      <Modal
        isOpen={isRevisionLogOpen}
        onClose={() => setIsRevisionLogOpen(false)}
        title="Log Histori & Siklus Revisi Produk"
        subtitle="Dokumentasi catatan kurasi & evaluasi sampel supplier (KK-SCR-009)"
      >
        <div className="space-y-3">
          {mockRevisionLogs.map((log) => (
            <div
              key={log.id}
              className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-1.5"
            >
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-kopkar-dark">{log.productName}</h4>
                <StatusBadge status={log.status} size="sm" />
              </div>

              <span className="text-[10px] font-mono text-slate-400 block">
                {log.cycle} • {log.date}
              </span>

              <p className="text-xs text-slate-600 leading-relaxed bg-white p-2.5 rounded-xl border border-slate-100 mt-1">
                {log.notes}
              </p>
            </div>
          ))}
        </div>
      </Modal>
    </div>
  );
};
