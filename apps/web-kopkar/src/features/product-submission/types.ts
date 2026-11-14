export type ProductCategory =
  | 'Katering H-1'
  | 'Toko Same-Day'
  | 'Minuman Kantin'
  | 'Snack & Kue Basah';

export type ItemOrigin = 'PRODUKSI_SENDIRI' | 'RESELLER';

export type StorageRecommendation = 'SUHU_RUANG' | 'CHILLER' | 'WARMER';

export type DropDay = 'SELASA' | 'RABU';

export type WorkShift = 'SHIFT_A' | 'SHIFT_B';

export type DropLocation = 'SAI_B' | 'SAI_T';

export interface ProductSubmissionFormData {
  name: string;
  category: ProductCategory;
  origin: ItemOrigin;
  description: string;
  ingredients: string;
  shelfLife: string;
  storage: StorageRecommendation;
  costPrice: number; // HPP (Harga Beli Koperasi)
  sellingPrice: number; // Usulan Harga Jual Konsumen
  dailyCapacity: number; // Estimasi Kapasitas Pasokan/Hari
  imageFile: File | null;
  imagePreviewUrl: string;
  dropDay: DropDay;
  dropShift: WorkShift;
  dropLocation: DropLocation;
  samplePortions: number;
  notes: string;
  agreedToTerms: boolean;
}

export type SubmissionFormErrors = Partial<Record<keyof ProductSubmissionFormData, string>>;

export interface SubmissionSummary {
  submissionId: string;
  productName: string;
  category: ProductCategory;
  costPrice: number;
  sellingPrice: number;
  marginAmount: number;
  marginPercent: number;
  dropScheduleText: string;
  status: 'MENUNGGU_PENGUJIAN' | 'DRAFT';
  submittedAt: string;
}
