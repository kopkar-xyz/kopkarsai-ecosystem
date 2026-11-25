export type MainCategoryId = 'jajanan' | 'roti' | 'camilan' | 'siap-santap' | 'minuman';
export type SubCategoryId = 'all' | 'manis' | 'gurih' | 'pedas' | 'dingin';

/** Pembeda asal produk sesuai MP-REQ-001 & MP-FTR-001:
 * - 'TOKO_FISIK': Barang ready stock toko koperasi (same-day)
 * - 'SUPPLIER_ACC': Produk mitra UMKM/katering yang sudah disetujui (PO H-1)
 */
export type ProductSource = 'TOKO_FISIK' | 'SUPPLIER_ACC';
export type SourceFilter = 'ALL' | 'TOKO_FISIK' | 'SUPPLIER_ACC';

/** Tipe pengiriman pesanan sesuai MP-REQ-002 & MP-REQ-003 */
export type DeliveryType = 'SAME_DAY' | 'PO_H1';

export interface FoodProduct {
  id: string;
  name: string;
  kanjiName?: string;
  category: MainCategoryId;
  subCategory: Exclude<SubCategoryId, 'all'>;
  /** Asal produk: toko fisik koperasi atau mitra supplier ACC */
  source?: ProductSource;
  /** Tipe pengiriman default produk ini */
  deliveryType?: DeliveryType;
  /** Nama supplier jika dari mitra UMKM */
  supplierName?: string;
  price: number;
  originalPrice?: number;
  /** Sisa stok fisik di toko hari ini */
  stock?: number;
  /** Batas kuota Pre-Order esok hari dari supplier */
  poQuota?: number;
  rating: number;
  ratingCount: string;
  soldCount: string;
  image: string;
  description: string;
  fullDescription?: string;
  ingredients?: string;
  volume?: string;
  calories?: string;
  likes?: number;
  badge?: string;
  discountBadge?: string;
}
