import React, { useState } from 'react';
import { AlertCircle, ArrowLeft } from 'lucide-react';
import { useRouter } from '../app/router';
import { useKopkarRole } from '../app/auth/RoleContext';
import { useProductSubmission } from '../features/product-submission/hooks/useProductSubmission';
import { SubmissionSidebar } from '../features/product-submission/components/SubmissionSidebar';
import { SubmissionStep1Schedule } from '../features/product-submission/components/SubmissionStep1Schedule';
import { SubmissionStep2Data } from '../features/product-submission/components/SubmissionStep2Data';
import { SubmissionStep3Supply } from '../features/product-submission/components/SubmissionStep3Supply';
import { SubmissionStep4Pricing } from '../features/product-submission/components/SubmissionStep4Pricing';
import { SubmissionConfirmModal } from '../features/product-submission/components/SubmissionConfirmModal';
import { SubmissionSuccessModal } from '../features/product-submission/components/SubmissionSuccessModal';

/**
 * ProductSubmissionView (Formulir Pengajuan Produk Baru Mitra) — KK-SCR-007
 * Slicing 1:1 Presisi aistudio-src SubmitProductPage
 * Budget: < 200 LOC.
 */
export const ProductSubmissionView: React.FC = () => {
  const { navigate } = useRouter();
  const { currentUser } = useKopkarRole();
  const isMemberApplicant = currentUser.role === 'ANGGOTA';
  const backTarget = isMemberApplicant ? '/' : '/products';
  const [currentStep, setCurrentStep] = useState(1);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const {
    formData,
    errors,
    isSubmitting,
    showSuccessModal,
    lastSubmittedId,
    lastSubmittedIsDraft,
    marginAmount,
    marginPercent,
    updateField,
    addIngredient,
    removeIngredient,
    handleImageSelect,
    validate,
    submit,
    resetForm,
    setShowSuccessModal,
  } = useProductSubmission();

  const handleOpenConfirm = (e?: React.FormEvent) => {
    e?.preventDefault();
    validate(false);
    setShowConfirmModal(true);
  };

  const handleConfirmSubmit = async () => {
    const ok = await submit(false);
    if (ok) setShowConfirmModal(false);
  };

  const errorMessages = Object.values(errors).filter(Boolean);

  return (
    <div className="space-y-5 animate-fadeIn select-none">
      {/* 1. Header Bar: Kembali ke Katalog */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#F0EBDC]">
        <button
          type="button"
          onClick={() => navigate(backTarget)}
          className="inline-flex items-center gap-2 text-[13.5px] font-medium text-[#526058] hover:text-[#18221D] cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{isMemberApplicant ? 'Kembali ke Beranda' : 'Kembali ke Manajemen Produk'}</span>
        </button>
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
        <div className="lg:col-span-8 xl:col-span-9 space-y-4">
          {errorMessages.length > 0 && (
            <div className="p-3.5 rounded-xl bg-[#FEF2F2] border border-[#FECACA] text-xs text-[#991B1B] flex items-start gap-2.5">
              <AlertCircle size={16} className="shrink-0 mt-0.5 text-[#DC2626]" />
              <div>
                <p className="font-semibold">Lengkapi data pengajuan terlebih dahulu:</p>
                <ul className="list-disc pl-4 mt-1 space-y-0.5">
                  {errorMessages.map((msg) => (
                    <li key={msg}>{msg}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}

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
              onSubmit={handleOpenConfirm}
              onPrev={() => setCurrentStep(3)}
              isSubmitting={isSubmitting}
            />
          )}
        </div>
      </div>

      {/* 3. Modal Konfirmasi Sebelum Pengiriman (Sesuai Aturan Koperasi) */}
      <SubmissionConfirmModal
        isOpen={showConfirmModal}
        formData={formData}
        validationErrors={errors}
        marginAmount={marginAmount}
        marginPercent={marginPercent}
        isSubmitting={isSubmitting}
        onClose={() => setShowConfirmModal(false)}
        onGoToStep={(step) => {
          setShowConfirmModal(false);
          setCurrentStep(step);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onConfirm={handleConfirmSubmit}
      />

      {/* 4. Modal Sukses Pengajuan Produk */}
      <SubmissionSuccessModal
        isOpen={showSuccessModal}
        submissionId={lastSubmittedId}
        isDraft={lastSubmittedIsDraft}
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
