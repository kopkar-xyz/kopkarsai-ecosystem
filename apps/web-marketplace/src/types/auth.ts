export type UserRole = 'ANGGOTA' | 'GA' | 'ADMIN_TOKO';

export interface UserProfile {
  id: string;
  name: string;
  nik: string;
  department: string;
  role: UserRole;
  avatarUrl: string;
}

export const PRESET_USERS: UserProfile[] = [
  {
    id: 'usr-1',
    name: 'Budi Santoso',
    nik: 'SAI-2021-PR08',
    department: 'Produksi SMT • Line 3',
    role: 'ANGGOTA',
    avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80',
  },
  {
    id: 'usr-2',
    name: 'Hendra Setiawan',
    nik: 'SAI-2022-GA01',
    department: 'General Affairs • Unit Gedung A',
    role: 'GA',
    avatarUrl: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=120&auto=format&fit=crop&q=80',
  },
  {
    id: 'usr-3',
    name: 'Dewi Sartika',
    nik: 'SAI-2020-KS01',
    department: 'Petugas Kasir Gerai Lantai 2',
    role: 'ADMIN_TOKO',
    avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=120&auto=format&fit=crop&q=80',
  },
];
