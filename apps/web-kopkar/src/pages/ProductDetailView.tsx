import React, { useEffect, useState } from 'react';
import { ArrowLeft, Calendar, ClipboardList, DollarSign, Package } from 'lucide-react';
import { useRouter } from '../app/router';
import { useKopkarRole } from '../app/auth/RoleContext';
import { useProductStore } from '../features/product-submission/context/ProductStoreContext';
import type { CatalogProductStatus } from '../components/ui/ProductCard';
import { CATALOG_PRODUCTS } from '../features/products/data/catalogProductsData';
import { ProductDetailHeroCard } from '../features/products/components/ProductDetailHeroCard';
import { ProductDetailFinancialCard } from '../features/products/components/ProductDetailFinancialCard';
import { ProductDetailSpecsCard } from '../features/products/components/ProductDetailSpecsCard';
import { ProductDetailCompositionCard } from '../features/products/components/ProductDetailCompositionCard';
import { ProductDetailHistoryCard } from '../features/products/components/ProductDetailHistoryCard';

/**
 * ProductDetailView (Halaman Detail Produk Mitra) — KK-SCR-008
 * Slicing 1:1 Presisi Gambar 3 Referensi:
 * - Header: Tombol "← Kembali ke Katalog" (tombol Tambah ke Keranjang dihapus sesuai instruksi)
 * - Row 1: Hero Card (Foto, badge, judul, mitra halal/P-IRT, 4 metrik, toggle marketplace)
 * - Row 2: Grid 2 Kolom (Rincian Finansial + Spesifikasi Teknis & Jadwal Pasokan)
 * - Row 3: Grid 2 Kolom (Komposisi & Penyimpanan + Riwayat Pengajuan & Revisi)
 * Budget: < 200 LOC.
 */
export const ProductDetailView: React.FC = () => {
  const { navigate } = useRouter();
  const { currentUser } = useKopkarRole();
  const { selectedProductId } = useProductStore();
  const isReadOnly = currentUser.role === 'KEPALA_KOPERASI';

  const catalogItem =
    CATALOG_PRODUCTS.find((p) => p.id === selectedProductId) || CATALOG_PRODUCTS[0];

  const initialStatus: CatalogProductStatus =
    catalogItem.productStatus ?? (catalogItem.isActive === false ? 'KURASI' : 'AKTIF');

  const [productStatus, setProductStatus] = useState<CatalogProductStatus>(initialStatus);
  const [activeTab, setActiveTab] = useState<'financial' | 'specs' | 'composition' | 'history'>(
    'financial'
  );

  useEffect(() => {
    setProductStatus(
      catalogItem.productStatus ?? (catalogItem.isActive === false ? 'KURASI' : 'AKTIF')
    );
  }, [catalogItem.id, catalogItem.isActive, catalogItem.productStatus]);

  const DETAIL_TABS = [
    { key: 'financial' as const, label: 'Finansial & Omset', icon: DollarSign },
    { key: 'specs' as const, label: 'Teknis & Jadwal Pasokan', icon: Calendar },
    { key: 'composition' as const, label: 'Komposisi & Simpan', icon: Package },
    { key: 'history' as const, label: 'Riwayat Versi (2)', icon: ClipboardList },
  ];

  // Kurasi hanya sekali di awal; menonaktifkan produk aktif memindahkannya ke NONAKTIF (bukan KURASI)
  const handleToggleActive = () => {
    if (isReadOnly || productStatus === 'KURASI') return;
    setProductStatus((prev) => (prev === 'AKTIF' ? 'NONAKTIF' : 'AKTIF'));
  };

  const badgeStatusText =
    productStatus === 'KURASI'
      ? 'Belum Aktif · Proses Kurasi'
      : productStatus === 'NONAKTIF'
        ? 'Nonaktif Sementara'
        : 'Disetujui & Aktif';

  const isBento = catalogItem.name.includes('Ayam Bakar');
  const costPrice = isBento ? 20000 : Math.round(catalogItem.price * 0.8);
  const sellingPrice = catalogItem.price;
  const marginAmount = sellingPrice - costPrice;
  const marginPercent = Math.round((marginAmount / sellingPrice) * 100);

  return (
    <div className="space-y-4 sm:space-y-5 animate-fadeIn select-none">
      {/* 1. Header Bar: Tombol Kembali (Tanpa Tambah ke Keranjang) */}
      <div className="flex items-center justify-between pt-1">
        <button
          type="button"
          onClick={() => navigate('/products')}
          className="flex items-center gap-1.5 text-xs font-sans font-medium text-[#14261E] hover:text-[#1F5C45] transition-colors cursor-pointer"
        >
          <ArrowLeft size={14} />
          <span>Kembali ke Katalog</span>
        </button>
      </div>

      {/* 2. Hero Detail Card Sesuai Gambar 3 */}
      <ProductDetailHeroCard
        name={catalogItem.name}
        categoryTag={`${catalogItem.category} · Buat Sendiri · Pabrik ${catalogItem.unit} · v2.0`}
        badgeStatus={badgeStatusText}
        partnerSubtitle={`Mitra: ${catalogItem.supplier || 'Dapur Oishi Mitra'} · Halal ID321100184920 · P-IRT 205327501`}
        price={catalogItem.price}
        stock={`${catalogItem.stock} porsi`}
        rating={`${catalogItem.rating ?? 4.9} / 5.0`}
        quota="30 porsi/batch"
        productStatus={productStatus}
        isReadOnly={isReadOnly}
        image={catalogItem.image}
        onToggleActive={handleToggleActive}
      />

      {/* 3. Card Terpadu dengan Underline Tabs */}
      <section className="bg-white border border-[#EAE4D3] rounded-2xl shadow-xs overflow-hidden">
        <nav
          aria-label="Bagian Detail Produk"
          className="border-b border-[#F0EBDC] px-5 sm:px-6 flex items-center gap-6 overflow-x-auto"
        >
          {DETAIL_TABS.map((tab) => {
            const Icon = tab.icon;
            const isTabActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveTab(tab.key)}
                className={`relative py-3.5 text-[12.5px] inline-flex items-center gap-2 cursor-pointer transition-colors whitespace-nowrap ${
                  isTabActive
                    ? 'text-[#165239] font-semibold'
                    : 'text-[#7A867E] hover:text-[#18221D] font-medium'
                }`}
              >
                <Icon size={14} className="shrink-0" />
                <span>{tab.label}</span>
                {isTabActive && (
                  <span
                    aria-hidden="true"
                    className="absolute bottom-0 inset-x-0 h-[2.5px] bg-[#165239] rounded-full"
                  />
                )}
              </button>
            );
          })}
        </nav>

        <div className="p-5 sm:p-6">
          {activeTab === 'financial' && (
            <ProductDetailFinancialCard
              costPrice={costPrice}
              sellingPrice={sellingPrice}
              marginAmount={marginAmount}
              marginPercent={marginPercent}
              quotaPorsi={30}
              projectedMonthlyRevenue={costPrice * 30 * 20}
              settlementNote={`Settlement dana ditransfer H+1 setelah rekonsiliasi penjualan harian di gerai ${catalogItem.unit}.`}
            />
          )}

          {activeTab === 'specs' && (
            <ProductDetailSpecsCard
              supplySchedule={`Setiap Pagi · Unit ${catalogItem.unit}`}
              shelfLife="Setiap Akhir Shift"
              productionTimeAndDuration="Mulai 04:30 WIB · 1,5 Jam"
              deliveryTimeWindow="06:00 - 06:45 WIB"
              netWeight={isBento ? '420 gram' : 'Kemasan Standar'}
              sampleDropSchedule={`Selasa · Shift A - ${catalogItem.unit}`}
            />
          )}

          {activeTab === 'composition' && (
            <ProductDetailCompositionCard
              ingredients={
                isBento
                  ? [
                      'Beras Pandan Wangi',
                      'Ayam Kampung Fillet',
                      'Madu Hutan',
                      'Kecap Manis',
                      'Sambal Terasi',
                    ]
                  : ['Bahan Alami Pilihan', 'Bumbu Khas', 'Gula & Garam', 'Rempah Tradisional']
              }
              handlingNotes="Simpan di penghangat food-warmer meja kasir maksimal 6 jam."
            />
          )}

          {activeTab === 'history' && <ProductDetailHistoryCard />}
        </div>
      </section>
    </div>
  );
};
