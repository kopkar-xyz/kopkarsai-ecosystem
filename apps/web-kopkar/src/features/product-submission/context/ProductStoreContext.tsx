import React, { createContext, useContext, useState, useMemo, useCallback } from 'react';
import type {
  DetailedProduct,
  SubmissionTransaction,
  CompleteSubmissionFormData,
} from '../types';
import { INITIAL_FORM_DATA } from '../hooks/useProductSubmission';

interface ProductStoreContextType {
  products: DetailedProduct[];
  transactions: SubmissionTransaction[];
  revisionSubmissions: SubmissionTransaction[];
  selectedRevisionData: CompleteSubmissionFormData | null;
  setSelectedRevisionData: (data: CompleteSubmissionFormData | null) => void;
  selectedProductId: string | null;
  setSelectedProductId: (id: string | null) => void;
  selectedProduct: DetailedProduct | null;
  toggleProductActive: (productId: string) => boolean;
  submitProductForm: (formData: CompleteSubmissionFormData, isDraft?: boolean) => string;
  getProductById: (id: string) => DetailedProduct | undefined;
}

const INITIAL_TRANSACTIONS: SubmissionTransaction[] = [
  {
    id: 'SUB-2024-001',
    productId: 'prod-1',
    productName: 'Nasi Kotak Ayam Bakar Madu',
    productType: 'Jajanan Basah',
    origin: 'SUPPLY_ORANG',
    supplyLocation: 'SAI-B',
    dropDay: 'SELASA',
    dropShift: 'SHIFT_A',
    dropLocation: 'SAI-B',
    qtyKirim: 45,
    costPrice: 20000,
    sellingPrice: 25000,
    status: 'DISETUJUI',
    submissionDate: '05 Nov 2026, 08:30 WIB',
    formDataSnapshot: {
      ...INITIAL_FORM_DATA,
      id: 'prod-1',
      name: 'Nasi Kotak Ayam Bakar Madu',
      productType: 'Jajanan Basah',
      origin: 'SUPPLY_ORANG',
      supplyLocation: 'SAI-B',
      supplySchedule: 'Shift A',
      shelfLife: 'Setiap Akhir Shift',
      costPrice: 20000,
      sellingPrice: 25000,
      qtyKirim: 45,
      productionDuration: '2 Jam',
      deliveryTimeWindow: '06:00 - 06:45 WIB',
      productionTime: '04:30',
      ingredients: ['Beras Pandan Wangi', 'Ayam Pejantan', 'Madu Hutan', 'Lalapan Sambal Terasi'],
      additionalNotes: 'Kemasan box bento bersegel bersih dan higienis',
      dropDay: 'SELASA',
      dropShift: 'SHIFT_A',
      dropLocation: 'SAI-B',
    },
  },
  {
    id: 'SUB-2024-002',
    productId: 'prod-2',
    productName: 'Dimsum Ayam Jamur (Isi 4)',
    productType: 'Jajanan Basah',
    origin: 'BUAT_SENDIRI',
    supplyLocation: 'SAI-B',
    dropDay: 'SELASA',
    dropShift: 'SHIFT_A',
    dropLocation: 'SAI-B',
    qtyKirim: 25,
    costPrice: 15000,
    sellingPrice: 19000,
    status: 'PERLU_REVISI',
    submissionDate: '12 Nov 2026, 09:30 WIB',
    revisionNotes: 'Margin koperasi terlalu tipis. Mohon usulkan harga jual Rp 18.000 atau sediakan saus dimsum kemasan sachet terpisah.',
    formDataSnapshot: {
      ...INITIAL_FORM_DATA,
      id: 'prod-2',
      name: 'Dimsum Ayam Jamur (Isi 4)',
      productType: 'Jajanan Basah',
      origin: 'BUAT_SENDIRI',
      supplyLocation: 'SAI-B',
      supplySchedule: 'Shift A',
      shelfLife: 'Setiap Akhir Shift',
      costPrice: 15000,
      sellingPrice: 19000,
      qtyKirim: 25,
      productionDuration: '2 Jam',
      deliveryTimeWindow: '06:00 - 06:30 WIB',
      productionTime: '04:00',
      ingredients: ['Daging Ayam Fillet', 'Jamur Kuping', 'Kulit Pangsit', 'Minyak Wijen'],
      additionalNotes: 'Kemasan mika tahan panas',
      dropDay: 'SELASA',
      dropShift: 'SHIFT_A',
      dropLocation: 'SAI-B',
    },
  },
  {
    id: 'SUB-2024-003',
    productId: 'prod-3',
    productName: 'Kopi Susu Gula Aren Botol (250ml)',
    productType: 'Minuman (Es)',
    origin: 'BUAT_SENDIRI',
    supplyLocation: 'SAI-T',
    dropDay: 'RABU',
    dropShift: 'SHIFT_A',
    dropLocation: 'SAI-T',
    qtyKirim: 30,
    costPrice: 10000,
    sellingPrice: 14000,
    status: 'MENUNGGU_PENGUJIAN',
    submissionDate: '14 Nov 2026, 14:15 WIB',
    formDataSnapshot: {
      ...INITIAL_FORM_DATA,
      id: 'prod-3',
      name: 'Kopi Susu Gula Aren Botol (250ml)',
      productType: 'Minuman (Es)',
      origin: 'BUAT_SENDIRI',
      supplyLocation: 'SAI-T',
      supplySchedule: 'Setiap Pagi',
      shelfLife: 'Jangka Waktu Tertentu',
      customShelfLifeDays: 2,
      costPrice: 10000,
      sellingPrice: 14000,
      qtyKirim: 30,
      productionDuration: '1 Jam',
      deliveryTimeWindow: '06:30 - 07:00 WIB',
      productionTime: '05:00',
      ingredients: ['Biji Kopi Robusta', 'Susu UHT Segar', 'Gula Aren Organik'],
      additionalNotes: 'Wajib chiller suhu 4°C',
      dropDay: 'RABU',
      dropShift: 'SHIFT_A',
      dropLocation: 'SAI-T',
    },
  },
  {
    id: 'SUB-2024-004',
    productId: 'prod-4',
    productName: 'Keripik Tempe Renyah Daun Jeruk',
    productType: 'Keripik / Kerupuk',
    origin: 'SUPPLY_ORANG',
    supplyLocation: 'SAI-T',
    dropDay: 'SELASA',
    dropShift: 'SHIFT_B',
    dropLocation: 'SAI-T',
    qtyKirim: 35,
    costPrice: 9000,
    sellingPrice: 12000,
    status: 'DISETUJUI',
    submissionDate: '08 Nov 2026, 10:00 WIB',
    formDataSnapshot: {
      ...INITIAL_FORM_DATA,
      id: 'prod-4',
      name: 'Keripik Tempe Renyah Daun Jeruk',
      productType: 'Keripik / Kerupuk',
      origin: 'SUPPLY_ORANG',
      supplyLocation: 'SAI-T',
      supplySchedule: 'Tunggu Barang Habis',
      shelfLife: 'Jangka Waktu Tertentu',
      customShelfLifeDays: 14,
      costPrice: 9000,
      sellingPrice: 12000,
      qtyKirim: 35,
      productionDuration: '3 Jam',
      deliveryTimeWindow: '13:00 - 13:45 WIB',
      productionTime: '09:00',
      ingredients: ['Kedelai Pilihan', 'Tepung Beras', 'Bawang Putih', 'Daun Jeruk', 'Garam'],
      additionalNotes: 'Kemasan standing pouch bersegel ziplock kedap udara',
      dropDay: 'SELASA',
      dropShift: 'SHIFT_B',
      dropLocation: 'SAI-T',
    },
  },
  {
    id: 'SUB-2024-005',
    productId: 'prod-5',
    productName: 'Roti Gandum Serat Tinggi',
    productType: 'Jajanan Kering',
    origin: 'BUAT_SENDIRI',
    supplyLocation: 'SAI-B',
    dropDay: 'SELASA',
    dropShift: 'SHIFT_A',
    dropLocation: 'SAI-B',
    qtyKirim: 28,
    costPrice: 11000,
    sellingPrice: 14000,
    status: 'DISETUJUI',
    submissionDate: '03 Nov 2026, 09:00 WIB',
    formDataSnapshot: {
      ...INITIAL_FORM_DATA,
      id: 'prod-5',
      name: 'Roti Gandum Serat Tinggi',
      productType: 'Jajanan Kering',
      origin: 'BUAT_SENDIRI',
      supplyLocation: 'SAI-B',
      supplySchedule: 'Setiap Pagi',
      shelfLife: 'Jangka Waktu Tertentu',
      customShelfLifeDays: 3,
      costPrice: 11000,
      sellingPrice: 14000,
      qtyKirim: 28,
      productionDuration: '3.5 Jam',
      deliveryTimeWindow: '06:00 - 06:30 WIB',
      productionTime: '03:30',
      ingredients: ['Tepung Gandum Utuh', 'Ragi Alami', 'Madu', 'Biji Oat'],
      additionalNotes: 'Kemasan plastik seal kedap udara',
      dropDay: 'SELASA',
      dropShift: 'SHIFT_A',
      dropLocation: 'SAI-B',
    },
  },
  {
    id: 'SUB-2024-006',
    productId: 'prod-6',
    productName: 'Es Teh Manis Cup Press',
    productType: 'Minuman (Es)',
    origin: 'BUAT_SENDIRI',
    supplyLocation: 'SAI-B',
    dropDay: 'SELASA',
    dropShift: 'SHIFT_A',
    dropLocation: 'SAI-B',
    qtyKirim: 15,
    costPrice: 2500,
    sellingPrice: 4000,
    status: 'DITOLAK',
    submissionDate: '01 Nov 2026, 11:00 WIB',
    revisionNotes: 'Kantin koperasi sudah memiliki fasilitas dispenser teh gratis untuk seluruh karyawan.',
    formDataSnapshot: {
      ...INITIAL_FORM_DATA,
      id: 'prod-6',
      name: 'Es Teh Manis Cup Press',
      productType: 'Minuman (Es)',
      origin: 'BUAT_SENDIRI',
      supplyLocation: 'SAI-B',
      costPrice: 2500,
      sellingPrice: 4000,
      qtyKirim: 15,
    },
  },
];

const INITIAL_DETAILED_PRODUCTS: DetailedProduct[] = [
  {
    id: 'prod-1',
    name: 'Nasi Kotak Ayam Bakar Madu',
    productType: 'Jajanan Basah',
    origin: 'SUPPLY_ORANG',
    supplyLocation: 'SAI-B',
    supplySchedule: 'Shift A',
    shelfLife: 'Setiap Akhir Shift',
    costPrice: 20000,
    sellingPrice: 25000,
    qtyKirim: 45,
    weightGrams: '350 gr',
    productionDuration: '2 Jam',
    deliveryTimeWindow: '06:00 - 06:45 WIB',
    productionTime: '04:30',
    ingredients: ['Beras Pandan Wangi', 'Ayam Pejantan', 'Madu Hutan', 'Lalapan Sambal Terasi'],
    additionalNotes: 'Kemasan box bento bersegel bersih dan higienis',
    imagePreviewUrl: '',
    submissionStatus: 'DISETUJUI',
    isActive: true, // Disetujui dan aktif di etalase
    stock: 45,
    transactions: [INITIAL_TRANSACTIONS[0]],
  },
  {
    id: 'prod-2',
    name: 'Dimsum Ayam Jamur (Isi 4)',
    productType: 'Jajanan Basah',
    origin: 'BUAT_SENDIRI',
    supplyLocation: 'SAI-B',
    supplySchedule: 'Shift A',
    shelfLife: 'Setiap Akhir Shift',
    costPrice: 15000,
    sellingPrice: 19000,
    qtyKirim: 25,
    weightGrams: '180 gr',
    productionDuration: '2 Jam',
    deliveryTimeWindow: '06:00 - 06:30 WIB',
    productionTime: '04:00',
    ingredients: ['Daging Ayam Fillet', 'Jamur Kuping', 'Kulit Pangsit', 'Minyak Wijen'],
    additionalNotes: 'Kemasan mika tahan panas',
    imagePreviewUrl: '',
    submissionStatus: 'PERLU_REVISI',
    isActive: false, // Belum disetujui, belum bisa diaktifkan
    stock: 0,
    transactions: [INITIAL_TRANSACTIONS[1]],
  },
  {
    id: 'prod-3',
    name: 'Kopi Susu Gula Aren Botol (250ml)',
    productType: 'Minuman (Es)',
    origin: 'BUAT_SENDIRI',
    supplyLocation: 'SAI-T',
    supplySchedule: 'Setiap Pagi',
    shelfLife: 'Jangka Waktu Tertentu',
    customShelfLifeDays: 2,
    costPrice: 10000,
    sellingPrice: 14000,
    qtyKirim: 30,
    weightGrams: '250 ml',
    productionDuration: '1 Jam',
    deliveryTimeWindow: '06:30 - 07:00 WIB',
    productionTime: '05:00',
    ingredients: ['Biji Kopi Robusta', 'Susu UHT Segar', 'Gula Aren Organik'],
    additionalNotes: 'Wajib simpan chiller suhu 4°C',
    imagePreviewUrl: '',
    submissionStatus: 'MENUNGGU_PENGUJIAN',
    isActive: false,
    stock: 0,
    transactions: [INITIAL_TRANSACTIONS[2]],
  },
  {
    id: 'prod-4',
    name: 'Keripik Tempe Renyah Daun Jeruk',
    productType: 'Keripik / Kerupuk',
    origin: 'SUPPLY_ORANG',
    supplyLocation: 'SAI-T',
    supplySchedule: 'Tunggu Barang Habis',
    shelfLife: 'Jangka Waktu Tertentu',
    customShelfLifeDays: 14,
    costPrice: 9000,
    sellingPrice: 12000,
    qtyKirim: 35,
    weightGrams: '150 gr',
    productionDuration: '3 Jam',
    deliveryTimeWindow: '13:00 - 13:45 WIB',
    productionTime: '09:00',
    ingredients: ['Kedelai Pilihan', 'Tepung Beras', 'Bawang Putih', 'Daun Jeruk', 'Garam'],
    additionalNotes: 'Kemasan standing pouch bersegel ziplock kedap udara',
    imagePreviewUrl: '',
    submissionStatus: 'DISETUJUI',
    isActive: true, // Disetujui dan aktif
    stock: 35,
    transactions: [INITIAL_TRANSACTIONS[3]],
  },
  {
    id: 'prod-5',
    name: 'Roti Gandum Serat Tinggi',
    productType: 'Jajanan Kering',
    origin: 'BUAT_SENDIRI',
    supplyLocation: 'SAI-B',
    supplySchedule: 'Setiap Pagi',
    shelfLife: 'Jangka Waktu Tertentu',
    customShelfLifeDays: 3,
    costPrice: 11000,
    sellingPrice: 14000,
    qtyKirim: 28,
    weightGrams: '200 gr',
    productionDuration: '3.5 Jam',
    deliveryTimeWindow: '06:00 - 06:30 WIB',
    productionTime: '03:30',
    ingredients: ['Tepung Gandum Utuh', 'Ragi Alami', 'Madu', 'Biji Oat'],
    additionalNotes: 'Kemasan plastik seal kedap udara',
    imagePreviewUrl: '',
    submissionStatus: 'DISETUJUI',
    isActive: false, // Disetujui tapi sedang dinonaktifkan sementara oleh supplier
    stock: 28,
    transactions: [INITIAL_TRANSACTIONS[4]],
  },
  {
    id: 'prod-6',
    name: 'Es Teh Manis Cup Press',
    productType: 'Minuman (Es)',
    origin: 'BUAT_SENDIRI',
    supplyLocation: 'SAI-B',
    supplySchedule: 'Shift A',
    shelfLife: 'Setiap Akhir Shift',
    costPrice: 2500,
    sellingPrice: 4000,
    qtyKirim: 15,
    weightGrams: '350 ml',
    productionDuration: '30 Menit',
    deliveryTimeWindow: '07:00 - 07:30 WIB',
    productionTime: '06:30',
    ingredients: ['Teh Melati', 'Gula Pasir', 'Air Mineral', 'Es Kristal'],
    additionalNotes: 'Kemasan cup press seal',
    imagePreviewUrl: '',
    submissionStatus: 'DITOLAK',
    isActive: false,
    stock: 0,
    transactions: [INITIAL_TRANSACTIONS[5]],
  },
];

const ProductStoreContext = createContext<ProductStoreContextType | null>(null);

export const ProductStoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<DetailedProduct[]>(INITIAL_DETAILED_PRODUCTS);
  const [transactions, setTransactions] = useState<SubmissionTransaction[]>(INITIAL_TRANSACTIONS);
  const [selectedRevisionData, setSelectedRevisionData] = useState<CompleteSubmissionFormData | null>(null);
  const [selectedProductId, setSelectedProductId] = useState<string | null>('prod-1');

  const selectedProduct = useMemo(() => {
    if (!selectedProductId) return products[0] || null;
    return products.find((p) => p.id === selectedProductId) || products[0] || null;
  }, [products, selectedProductId]);

  // Daftar pengajuan yang butuh revisi atau berstatus draf
  const revisionSubmissions = useMemo(() => {
    return transactions.filter(
      (t) => t.status === 'PERLU_REVISI' || t.status === 'DRAFT' || t.status === 'DITOLAK'
    );
  }, [transactions]);

  // Toggle Active/Inactive status for an approved product
  const toggleProductActive = useCallback((productId: string): boolean => {
    let succeeded = false;
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === productId) {
          // Hanya bisa diaktifkan/dinonaktifkan jika sudah disetujui pengurus
          if (p.submissionStatus === 'DISETUJUI') {
            succeeded = true;
            return { ...p, isActive: !p.isActive };
          }
        }
        return p;
      })
    );
    return succeeded;
  }, []);

  // Submit product from form
  const submitProductForm = useCallback(
    (formData: CompleteSubmissionFormData, isDraft = false): string => {
      const submissionId = formData.editingSubmissionId || `SUB-${Date.now().toString().slice(-6)}`;
      const now = new Date();
      const dateFormatted = `${now.toLocaleDateString('id-ID', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      })}, ${now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })} WIB`;

      const newTrx: SubmissionTransaction = {
        id: submissionId,
        productId: formData.id || `prod-${Date.now().toString().slice(-4)}`,
        productName: formData.name,
        productType: formData.productType,
        origin: formData.origin,
        supplyLocation: formData.supplyLocation,
        dropDay: formData.dropDay,
        dropShift: formData.dropShift,
        dropLocation: formData.dropLocation,
        qtyKirim: formData.qtyKirim,
        costPrice: formData.costPrice,
        sellingPrice: formData.sellingPrice,
        status: isDraft ? 'DRAFT' : 'MENUNGGU_PENGUJIAN',
        submissionDate: dateFormatted,
        revisionNotes: undefined,
        formDataSnapshot: { ...formData, editingSubmissionId: undefined },
      };

      // Update transactions
      setTransactions((prev) => {
        if (formData.editingSubmissionId) {
          return prev.map((t) => (t.id === formData.editingSubmissionId ? newTrx : t));
        }
        return [newTrx, ...prev];
      });

      // Update or insert detailed product
      setProducts((prev) => {
        const existingIdx = prev.findIndex(
          (p) => p.name.toLowerCase() === formData.name.toLowerCase() || p.id === formData.id
        );

        if (existingIdx >= 0) {
          const updated = [...prev];
          const curr = updated[existingIdx];
          updated[existingIdx] = {
            ...curr,
            productType: formData.productType,
            origin: formData.origin,
            supplyLocation: formData.supplyLocation,
            supplySchedule: formData.supplySchedule,
            shelfLife: formData.shelfLife,
            customShelfLifeDays: formData.customShelfLifeDays,
            costPrice: formData.costPrice,
            sellingPrice: formData.sellingPrice,
            qtyKirim: formData.qtyKirim,
            productionDuration: formData.productionDuration,
            deliveryTimeWindow: formData.deliveryTimeWindow,
            productionTime: formData.productionTime,
            ingredients: [...formData.ingredients],
            additionalNotes: formData.additionalNotes,
            imagePreviewUrl: formData.imagePreviewUrl || curr.imagePreviewUrl,
            submissionStatus: isDraft ? curr.submissionStatus : 'MENUNGGU_PENGUJIAN',
            transactions: [newTrx, ...curr.transactions.filter((t) => t.id !== newTrx.id)],
          };
          return updated;
        } else {
          const newProduct: DetailedProduct = {
            id: newTrx.productId,
            name: formData.name,
            productType: formData.productType,
            origin: formData.origin,
            supplyLocation: formData.supplyLocation,
            supplySchedule: formData.supplySchedule,
            shelfLife: formData.shelfLife,
            customShelfLifeDays: formData.customShelfLifeDays,
            costPrice: formData.costPrice,
            sellingPrice: formData.sellingPrice,
            qtyKirim: formData.qtyKirim,
            weightGrams: undefined,
            productionDuration: formData.productionDuration,
            deliveryTimeWindow: formData.deliveryTimeWindow,
            productionTime: formData.productionTime,
            ingredients: [...formData.ingredients],
            additionalNotes: formData.additionalNotes,
            imagePreviewUrl: formData.imagePreviewUrl,
            submissionStatus: isDraft ? 'DRAFT' : 'MENUNGGU_PENGUJIAN',
            isActive: false,
            stock: 0,
            transactions: [newTrx],
          };
          return [newProduct, ...prev];
        }
      });

      return submissionId;
    },
    []
  );

  const getProductById = useCallback(
    (id: string) => {
      return products.find((p) => p.id === id);
    },
    [products]
  );

  return (
    <ProductStoreContext.Provider
      value={{
        products,
        transactions,
        revisionSubmissions,
        selectedRevisionData,
        setSelectedRevisionData,
        selectedProductId,
        setSelectedProductId,
        selectedProduct,
        toggleProductActive,
        submitProductForm,
        getProductById,
      }}
    >
      {children}
    </ProductStoreContext.Provider>
  );
};

export const useProductStore = () => {
  const context = useContext(ProductStoreContext);
  if (!context) {
    throw new Error('useProductStore must be used within a ProductStoreProvider');
  }
  return context;
};
