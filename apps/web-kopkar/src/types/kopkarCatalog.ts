export type ProductCurationStatus =
  | 'Draf'
  | 'Menunggu Uji Sampel'
  | 'Disetujui & Aktif'
  | 'Disetujui (Nonaktif)'
  | 'Perlu Revisi'
  | 'Ditolak';

export type ProductJenis =
  | 'Gorengan'
  | 'Jajanan Basah'
  | 'Jajanan Kering'
  | 'Keripik / Kerupuk'
  | 'Jajanan Buah'
  | 'Minuman (Es)'
  | 'Minuman (Non Es)'
  | 'Makanan Berat';

export type ItemOrigin = 'Buat Sendiri' | 'Supply dari Orang';

export type SupplyScheduleOption =
  | 'Shift A'
  | 'Shift B'
  | 'Setiap Pagi'
  | 'Setiap Malam'
  | 'Tunggu Barang Habis';

export type ShelfLifeOption =
  | 'Setiap Akhir Shift'
  | 'Setiap 2 Shift'
  | 'Jangka Waktu Tertentu';

export interface ProductAuditEntry {
  id: string;
  version: string;
  date: string;
  actor: string;
  statusLabel: string;
  note: string;
  hppSnapshot?: number;
  priceSnapshot?: number;
  changes?: string[];
}

export interface CatalogProduct {
  id: string;
  name: string;
  category: 'Makanan Basah' | 'Makanan Ringan' | 'Minuman' | 'Sembako';
  jenisProduk: ProductJenis;
  itemOrigin: ItemOrigin;
  supplier: string;
  unitCode: 'SAI-B' | 'SAI-T';
  price: number;
  hppPrice: number;
  qtyPerBatch: number;
  netWeightGrams: number;
  stock: number;
  unitLabel: string;
  image?: string;
  isPreOrder?: boolean;
  rating: number;
  ingredients: string[];
  certification?: string;
  prepStartTime: string;
  prepDuration: string;
  deliveryWindow: string;
  supplySchedule: SupplyScheduleOption;
  shelfLife: ShelfLifeOption;
  shelfLifeDays?: number;
  dropDay: 'Selasa' | 'Rabu';
  dropShift: 'Shift A' | 'Shift B';
  dropUnit: 'SAI-B' | 'SAI-T';
  specialNotes?: string;
  curationStatus: ProductCurationStatus;
  version: string;
  auditTrail: ProductAuditEntry[];
}

export interface CartItem {
  product: CatalogProduct;
  qty: number;
}
