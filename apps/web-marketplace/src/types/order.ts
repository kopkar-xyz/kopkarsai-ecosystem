export type OrderStatus = 
  | 'MENUNGGU_CHECKLIST'
  | 'SIAP_DIAMBIL'
  | 'SELESAI'
  | 'DIBATALKAN';

export type DeliveryMethod = 'PICKUP_KANTIN' | 'MEJA_KERJA';

export type PaymentMethod = 'PAYROLL_DEDUCTION' | 'QRIS_MANDIRI' | 'TRANSFER_MANDIRI' | 'TUNAI_KASIR';

export interface OrderItem {
  id: string;
  name: string;
  kanjiName?: string;
  price: number;
  quantity: number;
  image: string;
  deliveryType: 'SAME_DAY' | 'PO_H1';
  note?: string;
  isChecked?: boolean; // For cashier checklist
}

export interface Order {
  id: string;
  invoiceNumber: string;
  createdAt: string;
  customerName: string;
  customerNik: string;
  department: string;
  deliveryMethod: DeliveryMethod;
  deliveryLocationNote?: string;
  isGaPriority: boolean;
  paymentMethod: PaymentMethod;
  status: OrderStatus;
  items: OrderItem[];
  totalAmount: number;
  qrCodeToken: string;
  /** Berkas bukti transfer gambar S3 (maks 3 MB, format JPG/PNG/WebP sesuai SH-DEC-003) */
  proofImage?: string;
}
