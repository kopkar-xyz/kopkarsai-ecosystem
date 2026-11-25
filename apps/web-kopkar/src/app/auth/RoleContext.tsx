import React, { createContext, useContext, useState } from 'react';
import { useRouter, type RoutePath } from '../router';
import { NAV_GROUPS, type NavGroup } from '../layout/navConfig';

export type KopkarRole = 'ANGGOTA' | 'SUPPLIER' | 'ADMIN_TOKO' | 'KEPALA_KOPERASI';

export interface KopkarPresetUser {
  id: string;
  name: string;
  initials: string;
  department: string;
  nik: string;
  role: KopkarRole;
  roleLabel: string;
  badgeClass: string;
}

export const PRESET_KOPKAR_USERS: KopkarPresetUser[] = [
  {
    id: 'usr-anggota',
    name: 'Alexander Agung',
    initials: 'AA',
    department: 'Production',
    nik: 'SAI-2024-001',
    role: 'ANGGOTA',
    roleLabel: 'Anggota Koperasi',
    badgeClass: 'bg-[#EAF4EE] text-[#165239]',
  },
  {
    id: 'usr-supplier',
    name: 'Dapur Oishi Mitra',
    initials: 'DO',
    department: 'Mitra UMKM · SAI-B',
    nik: 'SUP-2024-012',
    role: 'SUPPLIER',
    roleLabel: 'Mitra Supplier',
    badgeClass: 'bg-[#FEF3C7] text-[#B45309]',
  },
  {
    id: 'usr-admin',
    name: 'Budi Hartono',
    initials: 'BH',
    department: 'Admin Toko & Kasir',
    nik: 'ADM-2024-003',
    role: 'ADMIN_TOKO',
    roleLabel: 'Admin Toko',
    badgeClass: 'bg-[#EFF6FF] text-[#1D4ED8]',
  },
  {
    id: 'usr-kepala',
    name: 'H. Hendra Wijaya',
    initials: 'HW',
    department: 'Pimpinan Pengurus',
    nik: 'KEP-2024-001',
    role: 'KEPALA_KOPERASI',
    roleLabel: 'Kepala Koperasi',
    badgeClass: 'bg-[#165239] text-white',
  },
];

const ROLE_ALLOWED_PATHS: Record<KopkarRole, RoutePath[]> = {
  ANGGOTA: ['/', '/financial', '/profile'],
  SUPPLIER: [
    '/',
    '/orders',
    '/products',
    '/products/new',
    '/products/detail',
    '/supplier/samples',
    '/supplier/revisions',
    '/analytics',
    '/profile',
  ],
  ADMIN_TOKO: [
    '/',
    '/orders',
    '/products',
    '/products/new',
    '/products/detail',
    '/supplier/samples',
    '/supplier/revisions',
    '/admin/verification',
    '/admin/suppliers',
    '/analytics',
    '/profile',
  ],
  KEPALA_KOPERASI: [
    '/',
    '/orders',
    '/products',
    '/products/new',
    '/products/detail',
    '/supplier/samples',
    '/supplier/revisions',
    '/admin/approval',
    '/admin/suppliers',
    '/financial',
    '/analytics',
    '/profile',
  ],
};

export function getNavGroupsForRole(role: KopkarRole): NavGroup[] {
  const allowed = ROLE_ALLOWED_PATHS[role];
  return NAV_GROUPS.map((group) => ({
    ...group,
    items: group.items.filter((item) => allowed.includes(item.path)),
  })).filter((group) => group.items.length > 0);
}

interface RoleContextValue {
  currentUser: KopkarPresetUser;
  selectUser: (user: KopkarPresetUser) => void;
  isRoleModalOpen: boolean;
  openRoleModal: () => void;
  closeRoleModal: () => void;
}

const RoleContext = createContext<RoleContextValue | null>(null);

export const RoleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentPath, navigate } = useRouter();
  const [currentUser, setCurrentUser] = useState<KopkarPresetUser>(PRESET_KOPKAR_USERS[3]);
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);

  const selectUser = (user: KopkarPresetUser) => {
    setCurrentUser(user);
    setIsRoleModalOpen(false);
    if (!ROLE_ALLOWED_PATHS[user.role].includes(currentPath)) {
      navigate('/');
    }
  };

  return (
    <RoleContext.Provider
      value={{
        currentUser,
        selectUser,
        isRoleModalOpen,
        openRoleModal: () => setIsRoleModalOpen(true),
        closeRoleModal: () => setIsRoleModalOpen(false),
      }}
    >
      {children}
    </RoleContext.Provider>
  );
};

export function useKopkarRole(): RoleContextValue {
  const ctx = useContext(RoleContext);
  if (!ctx) {
    throw new Error('useKopkarRole must be used inside RoleProvider');
  }
  return ctx;
}
