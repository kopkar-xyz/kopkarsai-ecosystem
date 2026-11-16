import React, { useState } from 'react';
import { ArrowLeft, History, CheckCircle2, AlertTriangle, Clock, XCircle } from 'lucide-react';
import { useRouter } from '../app/router';
import { useProductStore } from '../features/product-submission/context/ProductStoreContext';
import { ProductDetailCardSections } from '../features/product-submission/components/ProductDetailCardSections';
import { ProductRevisionHistoryModal } from '../features/product-submission/components/ProductRevisionHistoryModal';
import type { SubmissionTransaction, SubmissionStatus, DetailedProduct } from '../features/product-submission/types';

/**
 * ProductDetailView (Halaman Detail Produk Mitra & Log Revisi) — KK-SCR-006 & KK-SCR-007
 * Budget: < 200 LOC.
 */
export const ProductDetailView: React.FC = () => {
  const { navigate } = useRouter();
  const {
    selectedProduct,
    toggleProductActive,
    setSelectedRevisionData,
  } = useProductStore();

  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);

  if (!selectedProduct) {
    return (
      <div className="max-w-4xl mx-auto py-12 text-center space-y-4">
        <p className="text-sm font-heading font-bold text-[#1A2421]">
          Tidak ada produk yang dipilih.
        </p>
        <button
          type="button"
          onClick={() => navigate('/products')}
          className="px-4 py-2 bg-[#1F5B45] text-white rounded-xl text-xs font-heading font-bold"
        >
          Kembali ke Katalog Produk
        </button>
      </div>
    );
  }

  const isApproved = selectedProduct.submissionStatus === 'DISETUJUI';
  const marginAmount = Math.max(0, selectedProduct.sellingPrice - selectedProduct.costPrice);
  const marginPercent =
    selectedProduct.sellingPrice > 0
      ? Math.round((marginAmount / selectedProduct.sellingPrice) * 100)
      : 0;

  const handleStartRevision = (trx: SubmissionTransaction) => {
    setSelectedRevisionData(trx.formDataSnapshot);
    navigate('/products/new');
  };

  const handleNewDropSchedule = (prod: DetailedProduct) => {
    setSelectedRevisionData({
      id: prod.id,
      name: prod.name,
      productType: prod.productType,
      origin: prod.origin,
      supplyLocation: prod.supplyLocation,
      supplySchedule: prod.supplySchedule,
      shelfLife: prod.shelfLife,
      costPrice: prod.costPrice,
      sellingPrice: prod.sellingPrice,
      qtyKirim: prod.qtyKirim,
      weightGrams: prod.weightGrams,
      productionDuration: prod.productionDuration,
      deliveryTimeWindow: prod.deliveryTimeWindow,
      productionTime: prod.productionTime,
      ingredients: [...prod.ingredients],
      additionalNotes: prod.additionalNotes,
      imageFile: null,
      imagePreviewUrl: prod.imagePreviewUrl,
      dropDay: 'SELASA',
      dropShift: 'SHIFT_A',
      dropLocation: prod.supplyLocation,
    });
    navigate('/products/new');
  };

  const getStatusBadge = (status: SubmissionStatus, isActive: boolean) => {
    switch (status) {
      case 'DISETUJUI':
        return (
          <span
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-heading font-bold shadow-xs ${
              isActive
                ? 'bg-[#1F5B45] text-white border border-[#1F5B45]'
                : 'bg-[#F3ECDD] text-[#5C6F67] border border-[#DED5C3]'
            }`}
          >
            <CheckCircle2 size={13} className={isActive ? 'text-[#F6CE2C]' : 'text-[#8FA39A]'} />
            <span>{isActive ? 'Disetujui & Aktif' : 'Disetujui (Nonaktif)'}</span>
          </span>
        );
      case 'PERLU_REVISI':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FEF6DC] text-[#B87D09] border border-[#F6CE2C] text-xs font-heading font-bold">
            <AlertTriangle size={13} />
            <span>Perlu Revisi</span>
          </span>
        );
      case 'DITOLAK':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FDF0F3] text-[#DC4C70] border border-[#DC4C70]/40 text-xs font-heading font-bold">
            <XCircle size={13} />
            <span>Ditolak</span>
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EAF4EE] text-[#1F5B45] border border-[#A9C3A2] text-xs font-heading font-bold">
            <Clock size={13} />
            <span>Menunggu Uji Sampel</span>
          </span>
        );
    }
  };

  return (
    <div className="space-y-5 sm:space-y-6 max-w-4xl mx-auto pb-12">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#DED5C3]">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigate('/products')}
            className="w-10 h-10 rounded-2xl bg-white hover:bg-[#F3ECDD] border border-[#DED5C3] text-[#1F5B45] flex items-center justify-center flex-shrink-0 shadow-xs cursor-pointer transition-colors"
            aria-label="Kembali ke Katalog Produk"
          >
            <ArrowLeft size={18} />
          </button>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-xl sm:text-2xl font-heading font-extrabold text-[#1A2421]">
                {selectedProduct.name}
              </h1>
              <span className="text-[10px] font-accent font-bold px-2 py-0.5 rounded-full bg-[#EAF4EE] text-[#1F5B45] border border-[#A9C3A2]">
                {selectedProduct.productType}
              </span>
              <span className="text-[11px] text-[#5C6F67]">
                {selectedProduct.origin === 'BUAT_SENDIRI' ? 'Produksi Sendiri' : 'Supply Orang'}
              </span>
            </div>
            <div className="mt-1 flex items-center gap-2 flex-wrap">
              {getStatusBadge(selectedProduct.submissionStatus, selectedProduct.isActive)}
              <span className="text-xs text-[#5C6F67]">
                Penempatan: <strong className="text-[#1A2421]">Pabrik {selectedProduct.supplyLocation}</strong>
              </span>
            </div>
          </div>
        </div>

        {/* Tombol Kanan Atas: History Revisi */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            type="button"
            onClick={() => setIsHistoryModalOpen(true)}
            className="px-3.5 py-2 rounded-xl bg-white hover:bg-[#F3ECDD] text-[#1F5B45] border border-[#DED5C3] text-xs font-heading font-bold flex items-center gap-1.5 cursor-pointer shadow-xs transition-colors"
          >
            <History size={15} />
            <span>History Revisi</span>
            {selectedProduct.transactions.length > 0 && (
              <span className="px-1.5 py-0.2 rounded-full bg-[#EAF4EE] text-[#1F5B45] border border-[#A9C3A2] text-[10px]">
                {selectedProduct.transactions.length}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Main Detail Cards */}
      <ProductDetailCardSections
        product={selectedProduct}
        isApproved={isApproved}
        marginAmount={marginAmount}
        marginPercent={marginPercent}
        onToggleActive={toggleProductActive}
        onStartRevision={handleStartRevision}
        onNewDropSchedule={handleNewDropSchedule}
      />

      {/* Modal History Revisi */}
      <ProductRevisionHistoryModal
        isOpen={isHistoryModalOpen}
        onClose={() => setIsHistoryModalOpen(false)}
        productName={selectedProduct.name}
        transactions={selectedProduct.transactions}
        onStartRevision={handleStartRevision}
      />
    </div>
  );
};
