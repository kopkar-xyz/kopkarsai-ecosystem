export type ProductKind =
  | 'Gorengan'
  | 'Jajanan Basah'
  | 'Jajanan Kering'
  | 'Keripik / Kerupuk'
  | 'Jajanan Buah'
  | 'Minuman (Es)'
  | 'Minuman (Non Es)'
  | 'Lain-lain';

export type SupplyLocation = 'SAI-T' | 'SAI-B';

export type SupplyScheduleTime =
  | 'Shift A'
  | 'Shift B'
  | 'Setiap Pagi'
  | 'Setiap Malam'
  | 'Tunggu Barang Habis';

export type ShelfLifeDuration =
  | 'Setiap Akhir Shift'
  | 'Setiap 2 Shift'
  | 'Jangka Waktu Tertentu';

export type ItemOrigin = 'BUAT_SENDIRI' | 'SUPPLY_ORANG';

export type DropDay = 'SELASA' | 'RABU';

export type DropShift = 'SHIFT_A' | 'SHIFT_B';

export type SubmissionStatus =
  | 'MENUNGGU_PENGUJIAN'
  | 'PERLU_REVISI'
  | 'DITOLAK'
  | 'DISETUJUI'
  | 'DRAFT';

export interface ProductFormData {
  id?: string;
  name: string;
  productType: ProductKind;
  origin: ItemOrigin;
  supplyLocation: SupplyLocation;
  supplySchedule: SupplyScheduleTime;
  shelfLife: ShelfLifeDuration;
  customShelfLifeDays?: number;
  costPrice: number; // Harga beli koperasi (HPP)
  sellingPrice: number; // Harga jual koperasi
  qtyKirim: number; // Qty kirim
  weightGrams?: string; // Berat (diisi pengurus koperasi - inactive)
  productionDuration: string; // Lama pembuatan (cth: "2 Jam")
  deliveryTimeWindow: string; // Rentang waktu pengiriman (cth: "06:00 - 06:45 WIB")
  productionTime: string; // Jam pembuatan (cth: "04:30 WIB")
  ingredients: string[]; // List komposisi barang
  additionalNotes: string; // Keterangan tambahan
  imageFile: File | null;
  imagePreviewUrl: string;
}

export interface SubmissionScheduleFormData {
  dropDay: DropDay; // Selasa / Rabu
  dropShift: DropShift; // Shift A / Shift B
  dropLocation: SupplyLocation; // SAI-T / SAI-B
}

export interface CompleteSubmissionFormData extends ProductFormData, SubmissionScheduleFormData {
  editingSubmissionId?: string; // Jika dalam mode revisi pengajuan
}

export type SubmissionFormErrors = Partial<Record<keyof CompleteSubmissionFormData | 'ingredientsInput', string>>;

export interface SubmissionTransaction {
  id: string; // cth: SUB-2024-001
  productId: string;
  productName: string;
  productType: ProductKind;
  origin: ItemOrigin;
  supplyLocation: SupplyLocation;
  dropDay: DropDay;
  dropShift: DropShift;
  dropLocation: SupplyLocation;
  qtyKirim: number;
  costPrice: number;
  sellingPrice: number;
  status: SubmissionStatus;
  submissionDate: string;
  revisionNotes?: string;
  formDataSnapshot: CompleteSubmissionFormData;
}

export interface DetailedProduct {
  id: string;
  name: string;
  productType: ProductKind;
  origin: ItemOrigin;
  supplyLocation: SupplyLocation;
  supplySchedule: SupplyScheduleTime;
  shelfLife: ShelfLifeDuration;
  customShelfLifeDays?: number;
  costPrice: number;
  sellingPrice: number;
  qtyKirim: number;
  weightGrams?: string;
  productionDuration: string;
  deliveryTimeWindow: string;
  productionTime: string;
  ingredients: string[];
  additionalNotes: string;
  imagePreviewUrl: string;
  submissionStatus: SubmissionStatus;
  isActive: boolean; // Aktif / Nonaktif oleh supplier jika sudah disetujui pengurus
  stock: number;
  transactions: SubmissionTransaction[];
}

export interface RegisteredProduct {
  id: string;
  name: string;
  productType: ProductKind;
  origin: ItemOrigin;
  supplyLocation: SupplyLocation;
  supplySchedule: SupplyScheduleTime;
  shelfLife: ShelfLifeDuration;
  costPrice: number;
  sellingPrice: number;
  qtyKirim: number;
  ingredients: string[];
  productionDuration: string;
  deliveryTimeWindow: string;
  productionTime: string;
  imagePreviewUrl: string;
  submissionCount: number;
  activeStatus: 'ACTIVE' | 'INACTIVE';
}
