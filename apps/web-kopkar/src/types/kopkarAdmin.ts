export interface PendingMember {
  id: string;
  nik: string;
  fullName: string;
  department: string;
  email: string;
  phone: string;
  submittedAt: string;
  payrollConsent: boolean;
  adArtConsent?: boolean;
  idVerified: boolean;
  ktpImage?: string;
  status: 'Menunggu' | 'Disetujui' | 'Ditolak';
  stageStatus?:
    | 'PENDING_ADMIN_VERIFICATION'
    | 'PENDING_HEAD_APPROVAL'
    | 'ACTIVE_MEMBER'
    | 'REJECTED';
  verifiedByAdmin?: string;
  verifiedAt?: string;
  rejectionReason?: string;
  skNumber?: string;
}

export interface ExecutiveApproval {
  id: string;
  category:
    | 'Otorisasi Anggota'
    | 'Pinjaman SinJam'
    | 'Mitra Baru'
    | 'Anggaran Suplai';
  title: string;
  requester: string;
  amount: number;
  riskNote: string;
  submittedAt: string;
  status: 'Menunggu' | 'Disetujui' | 'Dikembalikan';
  memberId?: string;
  nik?: string;
  department?: string;
  verifierNote?: string;
  skNumber?: string;
}

export interface ComplianceRecord {
  id: string;
  ticketId?: string;
  entityName: string;
  entityType: 'Mitra Supplier' | 'Anggota';
  departmentOrUnit: string;
  productId?: string;
  productName?: string;
  defectType?: string;
  supplierResponse?: string;
  inactiveDays?: number;
  slaScore: number;
  issue: string;
  severity:
    | 'Normal'
    | 'Teguran 1'
    | 'Teguran 2'
    | 'Skorsing 7-30 Hari'
    | 'Blacklist Produk'
    | 'Suspend';
  date: string;
}
