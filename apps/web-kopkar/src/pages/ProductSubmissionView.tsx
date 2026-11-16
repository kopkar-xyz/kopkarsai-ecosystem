import React from 'react';
import { ArrowLeft, Send, Save } from 'lucide-react';
import { useRouter } from '../app/router';
import { Button } from '../components/ui/Button';
import { useProductSubmission } from '../features/product-submission/hooks/useProductSubmission';
import { SubmissionFormTab } from '../features/product-submission/components/SubmissionFormTab';
import { SubmissionSuccessModal } from '../features/product-submission/components/SubmissionSuccessModal';

/**
 * ProductSubmissionView (Formulir Pengajuan Produk Baru Mitra) — KK-SCR-007
 * Budget: < 200 LOC.
 */
export const ProductSubmissionView: React.FC = () => {
  const { navigate } = useRouter();

  const {
    formData,
    errors,
    isSubmitting,
    showSuccessModal,
    lastSubmittedId,
    marginAmount,
    marginPercent,
    updateField,
    addIngredient,
    removeIngredient,
    handleImageSelect,
    removeImage,
    cancelRevisionMode,
    submit,
    resetForm,
    setShowSuccessModal,
  } = useProductSubmission();

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await submit(false);
  };

  return (
    <div className="space-y-5 sm:space-y-6 max-w-4xl mx-auto pb-12">
      {/* Page Header Actions */}
      <div className="flex items-center justify-between gap-3 pb-3 border-b border-[#DED5C3]">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigate('/products')}
            className="w-10 h-10 rounded-2xl bg-white hover:bg-[#F3ECDD] border border-[#DED5C3] text-[#1F5B45] flex items-center justify-center flex-shrink-0 shadow-xs cursor-pointer transition-colors"
            aria-label="Kembali ke Katalog Produk"
          >
            <ArrowLeft size={18} />
          </button>
          <div className="md:hidden">
            <h1 className="text-xl sm:text-2xl font-heading font-extrabold text-[#1A2421]">
              Ajukan Produk Baru
            </h1>
            <p className="text-xs sm:text-sm font-kanji text-[#5C6F67] tracking-widest">
              新規商品申請
            </p>
          </div>
          <span className="hidden md:inline text-xs font-accent font-bold text-[#5C6F67]">
            Kembali ke Katalog
          </span>
        </div>

        {/* Top-Right Action Controls */}
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => submit(true)}
            isLoading={isSubmitting}
            icon={<Save size={15} />}
            className="hidden sm:inline-flex"
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
            className="hidden sm:inline-flex"
          >
            Kirim Pengajuan
          </Button>
        </div>
      </div>

      {/* Formulir Pengajuan Barang */}
      <SubmissionFormTab
        formData={formData}
        errors={errors}
        isSubmitting={isSubmitting}
        marginAmount={marginAmount}
        marginPercent={marginPercent}
        updateField={updateField}
        addIngredient={addIngredient}
        removeIngredient={removeIngredient}
        handleImageSelect={handleImageSelect}
        removeImage={removeImage}
        cancelRevisionMode={cancelRevisionMode}
        onSubmit={handleFormSubmit}
        onSaveDraft={() => submit(true)}
        onCancel={() => navigate('/products')}
      />

      {/* Modal Sukses Pengajuan */}
      <SubmissionSuccessModal
        isOpen={showSuccessModal}
        submissionId={lastSubmittedId}
        formData={formData}
        marginAmount={marginAmount}
        marginPercent={marginPercent}
        onClose={() => setShowSuccessModal(false)}
        onNewSubmission={() => {
          resetForm();
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
