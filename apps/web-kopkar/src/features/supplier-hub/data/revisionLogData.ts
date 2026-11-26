export type LogFilterType = 'Semua' | 'Perlu Revisi' | 'Menunggu Uji' | 'Selesai';

export interface ProductAuditEntryItem {
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

export interface UnifiedLogItem {
  key: string;
  detailProductId?: string;
  revisionId?: string;
  revisionStatus?: 'Dalam Perbaikan' | 'Siap Uji Ulang' | 'Selesai';
  isNeedsRevisionProduct?: boolean;
  productName: string;
  supplier: string;
  categoryLabel: string;
  unitLabel: string;
  image?: string;
  version: string;
  statusBadge: string;
  filterBucket: Exclude<LogFilterType, 'Semua'>;
  hppPrice?: number;
  sellingPrice?: number;
  qtyPerBatch?: number;
  ingredients?: string[];
  specialNotes?: string;
  entries: ProductAuditEntryItem[];
}

export function getRevisionBadgeTone(label: string): string {
  if (label.includes('Aktif') || label === 'Selesai' || label.includes('Disetujui')) {
    return 'bg-[#EAF4EE] text-[#15803D]';
  }
  if (label.includes('Revisi') || label === 'Dalam Perbaikan') {
    return 'bg-[#FEF2F2] text-[#B91C1C]';
  }
  if (label.includes('Uji')) {
    return 'bg-[#FEF3C7] text-[#B45309]';
  }
  return 'bg-[#FAF7EE] text-[#526058]';
}

export const INITIAL_UNIFIED_REVISION_LOGS: UnifiedLogItem[] = [
  {
    key: 'PRD-09',
    detailProductId: 'prod-09',
    isNeedsRevisionProduct: true,
    productName: 'Risoles Rogout Ayam Sayur Gurih',
    supplier: 'UMKM Berkah Rasa',
    categoryLabel: 'Gorengan',
    unitLabel: 'SAI-B',
    image: '/images/products/menu_snack_box_1795520431330.jpg',
    version: 'v1.0',
    statusBadge: 'Perlu Revisi',
    filterBucket: 'Perlu Revisi',
    hppPrice: 12000,
    sellingPrice: 15000,
    qtyPerBatch: 25,
    ingredients: ['Tepung Terigu', 'Daging Ayam Fillet', 'Wortel', 'Susu Cair', 'Tepung Roti'],
    specialNotes: 'Sajikan hangat, lengkapi cabai rawit terpisah.',
    entries: [
      {
        id: 'AUD-902',
        version: 'v1.0',
        date: '22 Nov 2026',
        actor: 'Tim Kurasi Koperasi',
        statusLabel: 'Perlu Revisi',
        note: 'Kemasan mika mudah terbuka, ganti wadah klip & cantumkan jam kedaluwarsa.',
        hppSnapshot: 12000,
        priceSnapshot: 15000,
        changes: ['Wadah klip food-grade diperlukan', 'Stiker jam kedaluwarsa wajib'],
      },
      {
        id: 'AUD-901',
        version: 'v1.0',
        date: '20 Nov 2026',
        actor: 'UMKM Berkah Rasa',
        statusLabel: 'Menunggu Uji Sampel',
        note: 'Pengajuan awal 25 box per shift pagi.',
        hppSnapshot: 12000,
        priceSnapshot: 15000,
        changes: ['Draf awal 25 pcs/shift'],
      },
    ],
  },
  {
    key: 'REV-204',
    revisionId: 'REV-204',
    revisionStatus: 'Siap Uji Ulang',
    productName: 'Snack Box Lemper & Risoles',
    supplier: 'UMKM Berkah Rasa',
    categoryLabel: 'Kurasi Sampel',
    unitLabel: 'SAI-B',
    version: 'v2.0',
    statusBadge: 'Siap Uji Ulang',
    filterBucket: 'Menunggu Uji',
    entries: [
      {
        id: 'REV-204',
        version: 'Siklus #2',
        date: '22 Nov 2026',
        actor: 'Tim Kurasi Koperasi',
        statusLabel: 'Siap Uji Ulang',
        note: 'Kemasan kardus kurang rapat sehingga minyak merembes.',
        changes: ['Mengganti lapisan dalam dengan kertas food-grade anti minyak.'],
      },
    ],
  },
  {
    key: 'PRD-01',
    detailProductId: 'prod-01',
    productName: 'Nasi Kotak Ayam Bakar Madu',
    supplier: 'Dapur Oishi Mitra',
    categoryLabel: 'Makanan Berat',
    unitLabel: 'SAI-B',
    image: '/images/products/menu_ayam_bakar_1795520430127.jpg',
    version: 'v2.0',
    statusBadge: 'Selesai',
    filterBucket: 'Selesai',
    hppPrice: 20000,
    sellingPrice: 25000,
    entries: [
      {
        id: 'AUD-102',
        version: 'v2.0',
        date: '13 Okt 2026',
        actor: 'Tim Kurasi Koperasi',
        statusLabel: 'Disetujui & Aktif',
        note: 'Lolos uji rasa dan kemasan kraft eco. HPP dikunci resmi.',
        hppSnapshot: 20000,
        priceSnapshot: 25000,
        changes: ['Ganti wadah kraft food-grade', 'Penyesuaian HPP Rp 20.000', 'Tambah label halal & expired'],
      },
      {
        id: 'AUD-101',
        version: 'v1.0',
        date: '10 Okt 2026',
        actor: 'Dapur Oishi Mitra',
        statusLabel: 'Perlu Revisi',
        note: 'Kemasan kotak karton tipis mudah lembek saat hangat.',
        hppSnapshot: 21000,
        priceSnapshot: 25000,
        changes: ['Pengajuan awal menu makan siang'],
      },
    ],
  },
  {
    key: 'PRD-02',
    detailProductId: 'prod-02',
    productName: 'Snack Box Rapat Tradisional',
    supplier: 'Dapur Oishi Mitra',
    categoryLabel: 'Jajanan Basah',
    unitLabel: 'SAI-B',
    image: '/images/products/menu_snack_box_1795520431330.jpg',
    version: 'v1.0',
    statusBadge: 'Selesai',
    filterBucket: 'Selesai',
    hppPrice: 12000,
    sellingPrice: 15000,
    entries: [
      {
        id: 'AUD-201',
        version: 'v1.0',
        date: '18 Okt 2026',
        actor: 'Tim Kurasi Koperasi',
        statusLabel: 'Disetujui & Aktif',
        note: 'Layak untuk jamuan rapat departemen dan pelatihan.',
        hppSnapshot: 12000,
        priceSnapshot: 15000,
      },
    ],
  },
  {
    key: 'PRD-03',
    detailProductId: 'prod-03',
    productName: 'Roti Gandum Cokelat Serat Tinggi',
    supplier: 'Produksi Sendiri',
    categoryLabel: 'Jajanan Kering',
    unitLabel: 'SAI-B',
    image: '/images/products/menu_roti_gandum_1795520432589.jpg',
    version: 'v1.0',
    statusBadge: 'Selesai',
    filterBucket: 'Selesai',
    hppPrice: 10500,
    sellingPrice: 14000,
    entries: [
      {
        id: 'AUD-301',
        version: 'v1.0',
        date: '20 Nov 2026',
        actor: 'Tim Kurasi Koperasi',
        statusLabel: 'Disetujui & Aktif',
        note: 'Skor uji 95/100. Kadar gula sesuai standar kantin sehat.',
        hppSnapshot: 10500,
        priceSnapshot: 14000,
      },
    ],
  },
  {
    key: 'PRD-04',
    detailProductId: 'prod-04',
    productName: 'Kopi Susu Gula Aren Botol 250ml',
    supplier: 'Kedai Kopi Sahabat',
    categoryLabel: 'Minuman (Es)',
    unitLabel: 'SAI-T',
    image: '/images/products/menu_kopi_susu_1795520432807.jpg',
    version: 'v1.0',
    statusBadge: 'Selesai',
    filterBucket: 'Selesai',
    hppPrice: 11000,
    sellingPrice: 15000,
    entries: [
      {
        id: 'AUD-401',
        version: 'v1.0',
        date: '02 Nov 2026',
        actor: 'Tim Kurasi Koperasi',
        statusLabel: 'Disetujui & Aktif',
        note: 'Segel botol aman, rasa seimbang.',
        hppSnapshot: 11000,
        priceSnapshot: 15000,
      },
    ],
  },
  {
    key: 'PRD-05',
    detailProductId: 'prod-05',
    productName: 'Es Teh Manis Melati Segar',
    supplier: 'Produksi Sendiri',
    categoryLabel: 'Minuman (Es)',
    unitLabel: 'SAI-B',
    image: '/images/products/menu_es_teh_1795520433405.jpg',
    version: 'v1.0',
    statusBadge: 'Selesai',
    filterBucket: 'Selesai',
    hppPrice: 3500,
    sellingPrice: 5000,
    entries: [
      {
        id: 'AUD-501',
        version: 'v1.0',
        date: '18 Nov 2026',
        actor: 'Tim Kurasi Koperasi',
        statusLabel: 'Disetujui & Aktif',
        note: 'Lolos kalibrasi mesin segel dan label tanggal.',
        hppSnapshot: 3500,
        priceSnapshot: 5000,
      },
    ],
  },
  {
    key: 'PRD-06',
    detailProductId: 'prod-06',
    productName: 'Susu UHT Full Cream 250ml',
    supplier: 'Produksi Sendiri',
    categoryLabel: 'Minuman (Non Es)',
    unitLabel: 'SAI-B',
    image: '/images/products/menu_susu_uht_1795520839002.jpg',
    version: 'v1.0',
    statusBadge: 'Selesai',
    filterBucket: 'Selesai',
    hppPrice: 6500,
    sellingPrice: 8500,
    entries: [
      {
        id: 'AUD-601',
        version: 'v1.0',
        date: '05 Nov 2026',
        actor: 'Tim Kurasi Koperasi',
        statusLabel: 'Disetujui & Aktif',
        note: 'Izin edar BPOM terverifikasi.',
        hppSnapshot: 6500,
        priceSnapshot: 8500,
      },
    ],
  },
  {
    key: 'PRD-07',
    detailProductId: 'prod-07',
    productName: 'Beras Pandan Wangi Kemasan 5kg',
    supplier: 'Tani Makmur Sejahtera',
    categoryLabel: 'Makanan Berat',
    unitLabel: 'SAI-B',
    image: '/images/products/menu_beras_pandan_1795520839006.jpg',
    version: 'v1.0',
    statusBadge: 'Selesai',
    filterBucket: 'Selesai',
    hppPrice: 64000,
    sellingPrice: 74000,
    entries: [
      {
        id: 'AUD-701',
        version: 'v1.0',
        date: '01 Nov 2026',
        actor: 'Tim Kurasi Koperasi',
        statusLabel: 'Disetujui & Aktif',
        note: 'Kualitas butir bersih dan timbangan sesuai 5.000g.',
        hppSnapshot: 64000,
        priceSnapshot: 74000,
      },
    ],
  },
  {
    key: 'PRD-08',
    detailProductId: 'prod-08',
    productName: 'Minyak Goreng Kelapa Sawit 2L',
    supplier: 'Tani Makmur Sejahtera',
    categoryLabel: 'Makanan Berat',
    unitLabel: 'SAI-T',
    image: '/images/products/menu_minyak_goreng_1795520839514.jpg',
    version: 'v1.0',
    statusBadge: 'Selesai',
    filterBucket: 'Selesai',
    hppPrice: 30000,
    sellingPrice: 34500,
    entries: [
      {
        id: 'AUD-801',
        version: 'v1.0',
        date: '03 Nov 2026',
        actor: 'Tim Kurasi Koperasi',
        statusLabel: 'Disetujui & Aktif',
        note: 'Lolos kurasi sembako standar.',
        hppSnapshot: 30000,
        priceSnapshot: 34500,
      },
    ],
  },
  {
    key: 'REV-199',
    revisionId: 'REV-199',
    revisionStatus: 'Selesai',
    productName: 'Teh Melati Dingin Kemasan',
    supplier: 'Kedai Kopi Sahabat',
    categoryLabel: 'Kurasi Sampel',
    unitLabel: 'SAI-B',
    version: 'v1.0',
    statusBadge: 'Selesai',
    filterBucket: 'Selesai',
    entries: [
      {
        id: 'REV-199',
        version: 'Siklus #1',
        date: '18 Nov 2026',
        actor: 'Tim Kurasi Koperasi',
        statusLabel: 'Selesai',
        note: 'Segel tutup botol tidak terpasang sempurna pada 2 sampel.',
        changes: ['Kalibrasi ulang mesin press segel & tambah label kadaluarsa.'],
      },
    ],
  },
];
