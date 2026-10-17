export type NavTabId = 'home' | 'financial' | 'supplier' | 'profile';

export type InterestMethod = 'flat' | 'decreasing';

export interface AmortizationScheduleRow {
  month: number;
  principalPayment: number;
  interestPayment: number;
  totalInstalment: number;
  remainingBalance: number;
}

export interface LoanSimulationResult {
  principal: number;
  tenorMonths: number;
  method: InterestMethod;
  interestRateMonthly: number;
  monthlyPrincipalAverage: number;
  firstMonthInstalment: number;
  totalInterest: number;
  totalPayment: number;
  schedule: AmortizationScheduleRow[];
}

export type POStatus = 'PENDING' | 'ACCEPTED' | 'REJECTED';

export interface SupplierPOItem {
  id: string;
  poNumber: string;
  productName: string;
  qty: number;
  unit: string;
  deliveryDate: string; // misal: "Besok, 18 Okt (Shift A)"
  deliveryLocation: string; // "SAI B - Kantin Barat"
  pricePerUnit: number;
  totalAmount: number;
  status: POStatus;
  orderType: 'PO_H1_CATERING';
}

export type SampleStep = 1 | 2 | 3 | 4;

export interface ProductSampleSubmission {
  id: string;
  productName: string;
  category: 'KATERING' | 'TOKO';
  costPrice: number; // HPP
  proposedSalePrice: number; // Usulan Harga
  marginPercent: number;
  dropSchedule: string; // "Rabu, Shift A"
  location: string; // "SAI B"
  submissionDate: string;
  currentStep: SampleStep; // 1: Pengajuan, 2: Drop Sampel, 3: Uji Kelayakan, 4: Keputusan ACC
  statusLabel: string;
}

export interface UserProfile {
  name: string;
  nik: string;
  unit: string;
  division: string;
  role: string;
  email: string;
  phone: string;
  joinDate: string;
  avatarUrl: string;
  savings: {
    total: number;
    pokok: number;
    wajib: number;
    sukarela: number;
    estimasiShu: number;
  };
}
