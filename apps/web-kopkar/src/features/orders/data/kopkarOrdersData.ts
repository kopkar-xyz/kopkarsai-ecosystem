export type OrderKind = 'PO' | 'REGULER';
export type CashierOrderStatus = 'MENUNGGU_CHECKLIST' | 'SIAP_DIAMBIL' | 'SELESAI';
export type SupplierPoDecision = 'PENDING' | 'CONFIRMED' | 'DECLINED';

export interface KopkarOrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  supplierName: string;
  image?: string;
  note?: string;
  isChecked: boolean;
}

export interface KopkarOrder {
  id: string;
  invoiceNumber: string;
  qrCodeToken: string;
  orderKind: OrderKind;
  isGaPriority: boolean;
  gaDeadline?: string;
  status: CashierOrderStatus;
  supplierPoStatus?: SupplierPoDecision;
  supplierRejectReason?: string;
  customerName: string;
  customerNik: string;
  department: string;
  unit: 'SAI-B' | 'SAI-T';
  deliveryMethod: 'PICKUP_KANTIN' | 'MEJA_KERJA';
  deliveryLocationNote: string;
  paymentMethod: 'QRIS_MANDIRI' | 'PAYROLL_DEDUCTION' | 'TRANSFER_MANDIRI';
  createdAt: string;
  totalAmount: number;
  items: KopkarOrderItem[];
}

export const INITIAL_KOPKAR_ORDERS: KopkarOrder[] = [
  {
    id: 'ord-ga-01',
    invoiceNumber: 'INV/SAI/202611/0421',
    qrCodeToken: 'SAI-QR-0421-GA',
    orderKind: 'REGULER',
    isGaPriority: true,
    gaDeadline: 'Batas 09:30 WIB',
    status: 'MENUNGGU_CHECKLIST',
    customerName: 'Hendra Setiawan (GA Officer)',
    customerNik: 'SAI-2022-GA01',
    department: 'General Affairs',
    unit: 'SAI-B',
    deliveryMethod: 'MEJA_KERJA',
    deliveryLocationNote: 'Ruang Rapat Utama Lantai 2',
    paymentMethod: 'PAYROLL_DEDUCTION',
    createdAt: '26 Nov 2026, 08:15 WIB',
    totalAmount: 275000,
    items: [
      {
        id: 'it-1',
        name: 'Nasi Kotak Ayam Bakar Madu',
        quantity: 8,
        price: 25000,
        supplierName: 'Dapur Oishi Mitra',
        image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300&auto=format&fit=crop&q=80',
        note: 'Dikemas terpisah + sendok',
        isChecked: false,
      },
      {
        id: 'it-2',
        name: 'Snack Box Rapat Tradisional',
        quantity: 5,
        price: 15000,
        supplierName: 'Dapur Oishi Mitra',
        image: 'https://images.unsplash.com/photo-1555244162-803834f70033?w=300&auto=format&fit=crop&q=80',
        isChecked: false,
      },
    ],
  },
  {
    id: 'ord-po-01',
    invoiceNumber: 'PO/SAI/202611/0108',
    qrCodeToken: 'SAI-QR-0108-PO',
    orderKind: 'PO',
    isGaPriority: true,
    gaDeadline: 'Antar 11:30 WIB',
    status: 'MENUNGGU_CHECKLIST',
    supplierPoStatus: 'PENDING',
    customerName: 'Divisi HRD & Training (GA)',
    customerNik: 'SAI-2022-HR04',
    department: 'Training Center',
    unit: 'SAI-B',
    deliveryMethod: 'MEJA_KERJA',
    deliveryLocationNote: 'Aula Training Gedung B',
    paymentMethod: 'TRANSFER_MANDIRI',
    createdAt: 'PO Semua Hari · Jadwal 11:30 WIB',
    totalAmount: 625000,
    items: [
      {
        id: 'it-3',
        name: 'Nasi Kotak Ayam Bakar Madu (PO)',
        quantity: 25,
        price: 25000,
        supplierName: 'Dapur Oishi Mitra',
        image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300&auto=format&fit=crop&q=80',
        note: 'Kurangi sambal untuk 5 box',
        isChecked: false,
      },
    ],
  },
  {
    id: 'ord-po-02',
    invoiceNumber: 'PO/SAI/202611/0112',
    qrCodeToken: 'SAI-QR-0112-PO',
    orderKind: 'PO',
    isGaPriority: false,
    status: 'MENUNGGU_CHECKLIST',
    supplierPoStatus: 'CONFIRMED',
    customerName: 'Siti Rahma (Produksi Shift B)',
    customerNik: 'SAI-2023-PR19',
    department: 'Production Line B',
    unit: 'SAI-T',
    deliveryMethod: 'PICKUP_KANTIN',
    deliveryLocationNote: 'Counter Koperasi Lantai 2',
    paymentMethod: 'QRIS_MANDIRI',
    createdAt: 'PO Semua Hari · Jadwal 15:00 WIB',
    totalAmount: 300000,
    items: [
      {
        id: 'it-4',
        name: 'Snack Box Rapat Tradisional (PO)',
        quantity: 20,
        price: 15000,
        supplierName: 'Dapur Oishi Mitra',
        image: 'https://images.unsplash.com/photo-1555244162-803834f70033?w=300&auto=format&fit=crop&q=80',
        isChecked: false,
      },
    ],
  },
  {
    id: 'ord-reg-02',
    invoiceNumber: 'INV/SAI/202611/0430',
    qrCodeToken: 'SAI-QR-0430-RW',
    orderKind: 'REGULER',
    isGaPriority: false,
    status: 'SIAP_DIAMBIL',
    customerName: 'Rina Wulandari',
    customerNik: 'SAI-2024-FIN02',
    department: 'Finance & Accounting',
    unit: 'SAI-B',
    deliveryMethod: 'PICKUP_KANTIN',
    deliveryLocationNote: 'Counter Koperasi Lantai 2',
    paymentMethod: 'QRIS_MANDIRI',
    createdAt: '26 Nov 2026, 09:10 WIB',
    totalAmount: 44000,
    items: [
      {
        id: 'it-5',
        name: 'Roti Gandum Cokelat Serat Tinggi',
        quantity: 1,
        price: 14000,
        supplierName: 'Produksi Sendiri',
        image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=300&auto=format&fit=crop&q=80',
        isChecked: true,
      },
      {
        id: 'it-6',
        name: 'Kopi Susu Gula Aren Botol 250ml',
        quantity: 2,
        price: 15000,
        supplierName: 'Kedai Kopi Sahabat',
        image: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?w=300&auto=format&fit=crop&q=80',
        isChecked: true,
      },
    ],
  },
  {
    id: 'ord-done-01',
    invoiceNumber: 'INV/SAI/202611/0398',
    qrCodeToken: 'SAI-QR-0398-BS',
    orderKind: 'REGULER',
    isGaPriority: false,
    status: 'SELESAI',
    customerName: 'Budi Santoso',
    customerNik: 'SAI-2021-PR08',
    department: 'Engineering',
    unit: 'SAI-T',
    deliveryMethod: 'PICKUP_KANTIN',
    deliveryLocationNote: 'Counter Koperasi Lantai 2',
    paymentMethod: 'QRIS_MANDIRI',
    createdAt: '26 Nov 2026, 07:45 WIB',
    totalAmount: 50000,
    items: [
      {
        id: 'it-7',
        name: 'Nasi Kotak Ayam Bakar Madu',
        quantity: 2,
        price: 25000,
        supplierName: 'Dapur Oishi Mitra',
        image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300&auto=format&fit=crop&q=80',
        isChecked: true,
      },
    ],
  },
];

export function exportSalesReportCsv(orders: KopkarOrder[]) {
  const completed = orders.filter((o) => o.status === 'SELESAI');
  const headers = ['Invoice', 'Jenis', 'Waktu', 'Pemesan', 'Unit', 'Item', 'Pembayaran', 'Total (Rp)'];
  const rows = completed.map((o) => [
    o.invoiceNumber,
    o.orderKind === 'PO' ? 'PO Katering' : 'Same-Day',
    `"${o.createdAt}"`,
    `"${o.customerName}"`,
    o.unit,
    `"${o.items.map((i) => `${i.quantity}x ${i.name}`).join('; ')}"`,
    o.paymentMethod,
    o.totalAmount,
  ]);
  const csv = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
  const link = document.createElement('a');
  link.href = encodeURI(csv);
  link.download = `rekap_penjualan_kopkar_${new Date().toISOString().slice(0, 10)}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
