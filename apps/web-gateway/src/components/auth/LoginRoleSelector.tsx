import React from 'react';
import { useDesignVersion } from '../../context/DesignVersionContext';

export type RoleType = 'ANGGOTA' | 'ADMIN_TOKO' | 'KEPALA_KOPERASI' | 'SUPPLIER' | 'PENDING_USER';

export const ROLE_OPTIONS: Array<{ id: RoleType; label: string; sampleNik: string }> = [
  { id: 'ANGGOTA', label: 'Anggota Aktif', sampleNik: 'SAI-2024-001' },
  { id: 'ADMIN_TOKO', label: 'Admin Toko', sampleNik: 'SAI-ADM-002' },
  { id: 'KEPALA_KOPERASI', label: 'Kepala Koperasi', sampleNik: 'SAI-HEAD-001' },
  { id: 'SUPPLIER', label: 'Mitra Supplier', sampleNik: 'SAI-SUP-012' },
  { id: 'PENDING_USER', label: 'Akun Pending (Uji Blokir)', sampleNik: 'SAI-PEND-099' },
];

interface LoginRoleSelectorProps {
  selectedRole: RoleType;
  onSelectRole: (role: RoleType) => void;
}

export const LoginRoleSelector: React.FC<LoginRoleSelectorProps> = ({
  selectedRole,
  onSelectRole,
}) => {
  const { version } = useDesignVersion();
  const isV2 = version === 'v2';
  const isV3 = version === 'v3';

  return (
    <div
      className={`rounded-2xl p-3.5 space-y-2 border ${
        isV3
          ? 'bg-[#F9FAFB] border-[#E5E7EB]'
          : isV2
          ? 'bg-[#FAF6F0] border-[#EAE3D5]'
          : 'bg-[#FFF9FA] border-pink-100'
      }`}
    >
      <span
        className={`text-[10px] font-bold uppercase tracking-wider block ${
          isV3 ? 'text-[#6B7280]' : isV2 ? 'text-[#83273B]' : 'text-[#BD3A53]'
        }`}
      >
        Pilih Peran Uji Coba (Role Demo)
      </span>
      <div className="grid grid-cols-2 gap-1.5">
        {ROLE_OPTIONS.map((r) => (
          <button
            key={r.id}
            type="button"
            onClick={() => onSelectRole(r.id)}
            className={`px-2.5 py-1.5 rounded-xl text-[11px] font-semibold text-left transition-colors cursor-pointer ${
              selectedRole === r.id
                ? isV3
                  ? 'bg-[#111814] text-white'
                  : isV2
                  ? 'bg-[#83273B] text-white'
                  : 'bg-[#065C2B] text-white shadow-xs'
                : isV3
                ? 'bg-white border border-[#E5E7EB] text-[#111814] hover:bg-[#F3F4F6]'
                : isV2
                ? 'bg-white border border-[#EAE3D5] text-[#1A1615] hover:bg-[#FDF0F3]'
                : 'bg-white border border-pink-100 text-[#1E2923] hover:bg-pink-50/60'
            } ${r.id === 'PENDING_USER' ? 'col-span-2' : ''}`}
          >
            {r.label}
          </button>
        ))}
      </div>
    </div>
  );
};
