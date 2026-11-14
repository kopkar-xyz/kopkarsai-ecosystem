import React from 'react';
import { ArrowLeft, Send, Save, PackagePlus } from 'lucide-react';
import { useRouter } from '../app/router';
import { Button } from '../components/ui/Button';
import { useProductSubmission } from '../features/product-submission/hooks/useProductSubmission';
import { SubmissionRulesNotice } from '../features/product-submission/components/SubmissionRulesNotice';
import { ProductBasicInfoSection } from '../features/product-submission/components/ProductBasicInfoSection';
import { PricingMarginSection } from '../features/product-submission/components/PricingMarginSection';
import { SampleDropScheduleSection } from '../features/product-submission/components/SampleDropScheduleSection';
import { ProductImageUploadSection } from '../features/product-submission/components/ProductImageUploadSection';
import { SubmissionSuccessModal } from '../features/product-submission/components/SubmissionSuccessModal';

/**
 * ProductSubmissionView (Formulir Pengajuan Produk Mitra Supplier) — KK-SCR-007
 * Mengacu pada KK-REQ-002, KK-BR-002, KK-BR-003, KK-BR-004, dan SH-NFR-001.
 * Strict View/Page Budget: < 200 LOC glue layer.
 */
export const ProductSubmissionView: React.FC = () => {
  const { navigate } = useRouter();
  const {
    formData,
    errors,
    isSubmitting,
    submissionResult,
    showSuccessModal,
    marginAmount,
    marginPercent,
    updateField,
    handleImageSelect,
    removeImage,
    submit,
    resetForm,
    setShowSuccessModal,
  } = useProductSubmission();

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await submit(false);
  };

  const handleSaveDraft = async () => {
    await submit(true);
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
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-heading font-extrabold text-[#1A2421]">
                Ajukan Produk Baru
              </h1>
              <span className="text-[10px] font-accent font-bold px-2 py-0.5 rounded-full bg-[#EAF4EE] text-[#1F5B45] border border-[#A9C3A2]">
                Mitra UMKM
              </span>
            </div>
            <p className="text-xs sm:text-sm font-body text-[#5C6F67]">
              Pendaftaran makanan/minuman jualan anggota untuk toko fisik dan marketplace
            </p>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleSaveDraft}
            isLoading={isSubmitting}
            icon={<Save size={15} />}
          >
            Simpan Draf
          </Button>
          <Button
            type="button"
            variant="primary"
            size="sm"
            onClick={handleFormSubmit}
            isLoading={isSubmitting}
            icon={<Send size={15} />}
          >
            Kirim Pengajuan
          </Button>
        </div>
      </div>

      {/* 1. Ketentuan Baku Project Knowledge */}
      <SubmissionRulesNotice />

      {/* Main Submission Form */}
      <form onSubmit={handleFormSubmit} className="space-y-5">
        {/* 2. Identitas & Karakteristik Produk */}
        <ProductBasicInfoSection
          formData={formData}
          errors={errors}
          onChange={updateField}
        />

        {/* 3. Struktur Harga & Kalkulasi Margin Kemitraan */}
        <PricingMarginSection
          formData={formData}
          errors={errors}
          marginAmount={marginAmount}
          marginPercent={marginPercent}
          onChange={updateField}
        />

        {/* 4. Unggah Foto Sampel / Kemasan */}
        <ProductImageUploadSection
          imagePreviewUrl={formData.imagePreviewUrl}
          imageFile={formData.imageFile}
          error={errors.imageFile}
          onSelect={handleImageSelect}
          onRemove={removeImage}
        />

        {/* 5. Penjadwalan Drop Sampel Fisik (Selasa/Rabu) & Komitmen */}
        <SampleDropScheduleSection
          formData={formData}
          errors={errors}
          onChange={updateField}
        />

        {/* Bottom Action Bar */}
        <div className="p-4 rounded-2xl bg-white border border-[#DED5C3] shadow-bento flex flex-col sm:flex-row items-center justify-between gap-3">
          <Button
            type="button"
            variant="ghost"
            size="md"
            onClick={() => navigate('/products')}
            className="w-full sm:w-auto"
          >
            Batal
          </Button>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <Button
              type="button"
              variant="outline"
              size="md"
              onClick={handleSaveDraft}
              isLoading={isSubmitting}
              icon={<Save size={16} />}
              className="flex-1 sm:flex-initial"
            >
              Simpan Draf
            </Button>

            <Button
              type="submit"
              variant="primary"
              size="md"
              isLoading={isSubmitting}
              icon={<PackagePlus size={16} />}
              className="flex-1 sm:flex-initial"
            >
              Kirim Pengajuan
            </Button>
          </div>
        </div>
      </form>

      {/* Success Modal */}
      <SubmissionSuccessModal
        isOpen={showSuccessModal}
        summary={submissionResult}
        onClose={() => setShowSuccessModal(false)}
        onNewSubmission={() => {
          resetForm();
          setShowSuccessModal(false);
        }}
        onViewCatalog={() => {
          setShowSuccessModal(false);
          navigate('/products');
        }}
      />
    </div>
  );
};
