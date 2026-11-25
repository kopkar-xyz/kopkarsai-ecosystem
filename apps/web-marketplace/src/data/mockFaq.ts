export interface FaqItem {
  id: string;
  category: 'Memesan' | 'Pembayaran' | 'Pengambilan' | 'Kasir';
  question: string;
  answer: string;
  targetRole?: 'ALL' | 'CUSTOMER' | 'CASHIER';
}

export const INITIAL_FAQS: FaqItem[] = [
  // 1. Kategori Memesan
  {
    id: 'faq-001',
    category: 'Memesan',
    question: 'Bagaimana cara memesan?',
    answer: 'Pilih produk dari etalase (Same-day atau PO H-1), masukkan ke keranjang belanja, tentukan metode serah, lalu checkout dan bayar.',
    targetRole: 'CUSTOMER',
  },
  {
    id: 'faq-002',
    category: 'Memesan',
    question: 'Apa beda Same-day dan PO H-1?',
    answer: 'Same-day adalah barang ready stock rak toko fisik untuk diambil hari ini. PO H-1 adalah prapesan katering mitra sebelum jam 15:00 WIB untuk esok hari.',
    targetRole: 'ALL',
  },
  {
    id: 'faq-003',
    category: 'Memesan',
    question: 'Bisakah menambahkan catatan pesanan?',
    answer: 'Bisa, Anda dapat menambahkan catatan pada masing-masing item, misalnya "dikemas terpisah" atau "tanpa sambal".',
    targetRole: 'CUSTOMER',
  },

  // 2. Kategori Pembayaran
  {
    id: 'faq-004',
    category: 'Pembayaran',
    question: 'Bagaimana cara membayar?',
    answer: 'Pembayaran dapat melalui Transfer Rekening Mandiri Koperasi (unggah bukti bayar), QRIS Mandiri, atau Potong Gaji (Payroll Deduction).',
    targetRole: 'CUSTOMER',
  },

  // 3. Kategori Pengambilan
  {
    id: 'faq-005',
    category: 'Pengambilan',
    question: 'Bagaimana mengambil pesanan?',
    answer: 'Setelah berstatus "Siap diambil", buka menu "Pesanan saya", klik tombol "E-Nota & QR", lalu tunjukkan kode QR ke petugas kasir Lantai 2.',
    targetRole: 'CUSTOMER',
  },
  {
    id: 'faq-006',
    category: 'Pengambilan',
    question: 'Barang yang saya pesan ternyata habis?',
    answer: 'Kasir akan segera menghubungi Anda untuk konfirmasi menu pengganti (substitusi) atau pengembalian saldo (refund).',
    targetRole: 'ALL',
  },

  // 4. Kategori Kasir / Operasional
  {
    id: 'faq-007',
    category: 'Kasir',
    question: 'Bagaimana alur memproses pesanan?',
    answer: 'Cek fisik barang di rak toko, centang item yang tersedia. Jika lengkap, klik tombol "Siap diambil" agar pembeli menerima tiket QR.',
    targetRole: 'CASHIER',
  },
  {
    id: 'faq-008',
    category: 'Kasir',
    question: 'Barang di rak ternyata habis?',
    answer: 'Klik tombol "Barang habis" di samping item untuk menawarkan substitusi produk setara atau mencatat refund.',
    targetRole: 'CASHIER',
  },
  {
    id: 'faq-009',
    category: 'Kasir',
    question: 'Mengapa pesanan GA ada di atas?',
    answer: 'Pesanan General Affairs (GA Priority) otomatis diposisikan paling atas untuk menunjang konsumsi rapat manajemen tepat waktu.',
    targetRole: 'CASHIER',
  },
  {
    id: 'faq-010',
    category: 'Kasir',
    question: 'Bagaimana verifikasi pengambilan?',
    answer: 'Scan kode QR pembeli atau ketik 4 digit akhir nomor invoice ke kolom verifikasi kasir, lalu konfirmasi serah terima.',
    targetRole: 'CASHIER',
  },
  {
    id: 'faq-011',
    category: 'Kasir',
    question: 'Di mana laporan penjualan?',
    answer: 'Buka tab "Rekap penjualan" pada menu kasir untuk melihat ringkasan omzet harian dan mengunduh berkas laporan spreadsheet (.csv).',
    targetRole: 'CASHIER',
  },
  {
    id: 'faq-012',
    category: 'Kasir',
    question: 'Mengubah rekening atau jam layanan?',
    answer: 'Buka tab "Pengaturan toko" untuk memperbarui rekening bank, ambang kuota PO H-1, jam buka/tutup kasir, dan kontak WhatsApp.',
    targetRole: 'CASHIER',
  },
];

const STORAGE_KEY = 'kopkar_marketplace_faqs_v1';

export const getStoredFaqs = (): FaqItem[] => {
  if (typeof window === 'undefined') return INITIAL_FAQS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return INITIAL_FAQS;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : INITIAL_FAQS;
  } catch {
    return INITIAL_FAQS;
  }
};

export const saveStoredFaqs = (faqs: FaqItem[]): void => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(faqs));
  } catch (err) {
    console.error('Failed to save FAQs to localStorage', err);
  }
};

export const resetStoredFaqs = (): FaqItem[] => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(STORAGE_KEY);
  }
  return INITIAL_FAQS;
};
