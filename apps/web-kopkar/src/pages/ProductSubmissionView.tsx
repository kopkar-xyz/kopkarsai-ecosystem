import React, { useState } from 'react';
import { ArrowLeft, Save, Send } from 'lucide-react';
import { useRouter } from '../app/router';
import { useProductSubmission } from '../features/product-submission/hooks/useProductSubmission';
import { SubmissionSidebar } from '../features/product-submission/components/SubmissionSidebar';
import { SubmissionStep1Schedule } from '../features/product-submission/components/SubmissionStep1Schedule';
import { SubmissionStep2Data } from '../features/product-submission/components/SubmissionStep2Data';
import { SubmissionStep3Supply } from '../features/product-submission/components/SubmissionStep3Supply';
import { SubmissionStep4Pricing } from '../features/product-submission/components/SubmissionStep4Pricing';
import { SubmissionSuccessModal } from '../features/product-submission/components/SubmissionSuccessModal';

/**
 * ProductSubmissionView (Formulir Pengajuan Produk Baru Mitra) — KK-SCR-007
 * Slicing 1:1 Presisi aistudio-src SubmitProductPage
 * Budget: < 200 LOC.
 */
export const ProductSubmissionView: React.FC = () => {
  const { navigate } = useRouter();
  const [currentStep, setCurrentStep] = useState(1);

  const {
    formData,
    isSubmitting,
    showSuccessModal,
    lastSubmittedId,
    marginAmount,
    marginPercent,
    updateField,
    addIngredient,
    removeIngredient,
    handleImageSelect,
    submit,
    resetForm,
    setShowSuccessModal,
  } = useProductSubmission();

  const handleFormSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    await submit(false);
  };

  return (
    <div className="space-y-5 animate-fadeIn select-none">
      {/* 1. Header Bar: Kembali ke Katalog, Simpan Draf & Kirim Pengajuan */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#F0EBDC]">
        <button
          type="button"
          onClick={() => navigate('/products')}
          className="inline-flex items-center gap-2 text-[13.5px] font-medium text-[#526058] hover:text-[#18221D] cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Manajemen Produk</span>
        </button>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => submit(true)}
            disabled={isSubmitting}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-[#EAE4D3] bg-white hover:bg-[#FAF7EE] text-[13px] font-medium text-[#18221D] transition-colors cursor-pointer"
          >
            <Save className="w-4 h-4 text-[#526058]" />
            <span>Simpan Draf</span>
          </button>

          <button
            type="button"
            onClick={() => handleFormSubmit()}
            disabled={isSubmitting}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#165239] hover:bg-[#11402c] text-white font-semibold text-[13px] transition-colors cursor-pointer disabled:opacity-50"
          >
            <Send className="w-4 h-4" />
            <span>Kirim Pengajuan</span>
          </button>
        </div>
      </div>

      {/* 2. Grid 2 Kolom: Sidebar Stepper (Kiri) & Konten Form Multi-Step (Kanan) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Kolom Kiri: Stepper & Ringkasan Cepat */}
        <div className="lg:col-span-4 xl:col-span-3">
          <SubmissionSidebar
            currentStep={currentStep}
            onSelectStep={setCurrentStep}
            formData={formData}
            marginAmount={marginAmount}
            marginPercent={marginPercent}
          />
        </div>

        {/* Kolom Kanan: Langkah Form Aktif */}
        <div className="lg:col-span-8 xl:col-span-9">
          {currentStep === 1 && (
            <SubmissionStep1Schedule
              formData={formData}
              onChange={updateField}
              onNext={() => setCurrentStep(2)}
              onCancel={() => navigate('/products')}
            />
          )}

          {currentStep === 2 && (
            <SubmissionStep2Data
              formData={formData}
              onChange={updateField}
              onAddIngredient={addIngredient}
              onRemoveIngredient={removeIngredient}
              onImageSelect={handleImageSelect}
              onNext={() => setCurrentStep(3)}
              onPrev={() => setCurrentStep(1)}
            />
          )}

          {currentStep === 3 && (
            <SubmissionStep3Supply
              formData={formData}
              onChange={updateField}
              onNext={() => setCurrentStep(4)}
              onPrev={() => setCurrentStep(2)}
            />
          )}

          {currentStep === 4 && (
            <SubmissionStep4Pricing
              formData={formData}
              marginAmount={marginAmount}
              marginPercent={marginPercent}
              onChange={updateField}
              onSubmit={handleFormSubmit}
              onPrev={() => setCurrentStep(3)}
              isSubmitting={isSubmitting}
            />
          )}
        </div>
      </div>

      {/* 3. Modal Sukses Pengajuan Produk */}
      <SubmissionSuccessModal
        isOpen={showSuccessModal}
        submissionId={lastSubmittedId}
        formData={formData}
        marginAmount={marginAmount}
        marginPercent={marginPercent}
        onClose={() => setShowSuccessModal(false)}
        onNewSubmission={() => {
          resetForm();
          setCurrentStep(1);
        }}
        onViewTransactions={() => {
          setShowSuccessModal(false);
          navigate('/products');
        }}
        onViewCatalog={() => navigate('/products')}
      />
    </div>
  );
};
