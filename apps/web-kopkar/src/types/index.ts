export type OperationalStatus =
  | 'PENDING'
  | 'ACCEPTED'
  | 'ACTIVE'
  | 'INACTIVE'
  | 'IN_REVIEW'
  | 'REJECTED'
  | 'REVISION'
  | 'PRIORITY_GA';

export interface UserProfile {
  id: string;
  nik: string;
  fullName: string;
  division: string;
  unit: 'Unit SAI B' | 'Unit SAI T';
  role: 'ANGGOTA' | 'ADMIN_TOKO' | 'KEPALA_KOPERASI' | 'SUPPLIER';
  status: OperationalStatus;
  avatarUrl?: string;
  joinedDate: string;
}

export type OrderType = 'SAME_DAY' | 'PO_H1';

export interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  unitPrice: number;
}

export interface IncomingOrder {
  id: string;
  orderNumber: string;
  customerName: string;
  customerNik: string;
  unit: string;
  orderType: OrderType;
  items: OrderItem[];
  totalAmount: number;
  status: OperationalStatus;
  orderTime: string;
  orderDate?: string;
  notes?: string;
}

export interface SavingsSummary {
  simpananPokok: number;
  simpananWajib: number;
  simpananSukarela: number;
  totalSaldo: number;
  estimasiShu: number;
}

export interface LoanSummary {
  plafonMaksimal: number;
  pinjamanAktif: number;
  sisaPlafon: number;
  tenorBulan: number;
  cicilanPerBulan: number;
  statusPengajuan: OperationalStatus;
}
