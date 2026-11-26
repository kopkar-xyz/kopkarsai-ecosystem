export interface StoreFaqItem {
  id: string;
  category: 'Memesan' | 'Pembayaran' | 'Pengambilan' | 'Kasir';
  question: string;
  answer: string;
  targetRole?: 'ALL' | 'CUSTOMER' | 'CASHIER';
}

export interface StoreOperationalConfig {
  openingTime: string;
  closingTime: string;
  poQuotaThreshold: string;
  poCutoffTime: string;
  bankName: string;
  accountNumber: string;
  accountHolder: string;
  piketPhone: string;
  counterLocation: string;
}

export const DEFAULT_STORE_CONFIG: StoreOperationalConfig = {
  openingTime: '07:00',
  closingTime: '17:00',
  poQuotaThreshold: '20',
  poCutoffTime: '15:00',
  bankName: 'Bank Mandiri',
  accountNumber: '123-00-4567890-1',
  accountHolder: 'Koperasi Karyawan PT SAI',
  piketPhone: '0812-3456-7890',
  counterLocation: 'Counter Lantai 2, Gedung Serbaguna SAI',
};

export const INITIAL_STORE_FAQS: StoreFaqItem[] = [
  {
    id: 'faq-001',
    category: 'Memesan',
    question: 'Bagaimana cara memesan?',
    answer: 'Pilih produk dari etalase (Same-day atau PO), masukkan ke keranjang, pilih metode serah, lalu checkout.',
    targetRole: 'CUSTOMER',
  },
  {
    id: 'faq-002',
    category: 'Pembayaran',
    question: 'Bagaimana cara membayar?',
    answer: 'Transfer Rekening Mandiri Koperasi (unggah bukti bayar), QRIS Mandiri, atau Potong Gaji (Payroll Deduction).',
    targetRole: 'CUSTOMER',
  },
  {
    id: 'faq-003',
    category: 'Pengambilan',
    question: 'Bagaimana mengambil pesanan?',
    answer: 'Tunjukkan E-Nota & kode QR dari menu Pesanan Saya kepada petugas kasir Lantai 2.',
    targetRole: 'CUSTOMER',
  },
  {
    id: 'faq-004',
    category: 'Kasir',
    question: 'Barang di rak ternyata habis?',
    answer: 'Klik tombol Stok Habis? pada item untuk menawarkan substitusi menu setara atau mencatat refund.',
    targetRole: 'CASHIER',
  },
  {
    id: 'faq-005',
    category: 'Kasir',
    question: 'Mengapa pesanan GA ada di atas?',
    answer: 'Pesanan General Affairs (GA Priority) diprioritaskan paling atas untuk kebutuhan rapat manajemen.',
    targetRole: 'CASHIER',
  },
];

const CONFIG_KEY = 'kopkar_store_settings_v1';
const FAQ_KEY = 'kopkar_store_faqs_v1';

export function loadStoreConfig(): StoreOperationalConfig {
  try {
    const raw = localStorage.getItem(CONFIG_KEY);
    if (raw) return { ...DEFAULT_STORE_CONFIG, ...(JSON.parse(raw) as Partial<StoreOperationalConfig>) };
  } catch {
    // ignore storage errors
  }
  return DEFAULT_STORE_CONFIG;
}

export function saveStoreConfig(cfg: StoreOperationalConfig) {
  try {
    localStorage.setItem(CONFIG_KEY, JSON.stringify(cfg));
  } catch {
    // ignore storage errors
  }
}

export function loadStoreFaqs(): StoreFaqItem[] {
  try {
    const raw = localStorage.getItem(FAQ_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as StoreFaqItem[];
      if (Array.isArray(parsed)) return parsed;
    }
  } catch {
    // ignore storage errors
  }
  return INITIAL_STORE_FAQS;
}

export function saveStoreFaqs(faqs: StoreFaqItem[]) {
  try {
    localStorage.setItem(FAQ_KEY, JSON.stringify(faqs));
  } catch {
    // ignore storage errors
  }
}
