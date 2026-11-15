import React from 'react';
import { Send, Save } from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { SubmissionScheduleSection } from './SubmissionScheduleSection';
import { ProductDetailSection } from './ProductDetailSection';
import { ProductSupplyRuleSection } from './ProductSupplyRuleSection';
import { ProductPricingSection } from './ProductPricingSection';
import type {
  CompleteSubmissionFormData,
  SubmissionFormErrors,
} from '../types';

interface SubmissionFormTabProps {
  formData: CompleteSubmissionFormData;
  errors: SubmissionFormErrors;
  isSubmitting: boolean;
  marginAmount: number;
  marginPercent: number;
  updateField: <K extends keyof CompleteSubmissionFormData>(
    field: K,
    value: CompleteSubmissionFormData[K]
  ) => void;
  addIngredient: (ingredient: string) => boolean;
  removeIngredient: (index: number) => void;
  handleImageSelect: (file: File) => boolean;
  removeImage: () => void;
  cancelRevisionMode: () => void;
  onSubmit: (e: React.FormEvent) => void;
  onSaveDraft: () => void;
  onCancel: () => void;
}

export const SubmissionFormTab: React.FC<SubmissionFormTabProps> = ({
  formData,
  errors,
  isSubmitting,
  marginAmount,
  marginPercent,
  updateField,
  addIngredient,
  removeIngredient,
  handleImageSelect,
  removeImage,
  cancelRevisionMode,
  onSubmit,
  onSaveDraft,
  onCancel,
}) => {
  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <SubmissionScheduleSection
        formData={formData}
        errors={errors}
        onChange={updateField}
        onCancelRevision={cancelRevisionMode}
      />

      <ProductDetailSection
        formData={formData}
        errors={errors}
        onChange={updateField}
        onAddIngredient={addIngredient}
        onRemoveIngredient={removeIngredient}
        onImageSelect={handleImageSelect}
        onRemoveImage={removeImage}
      />

      <ProductSupplyRuleSection
        formData={formData}
        errors={errors}
        onChange={updateField}
      />

      <ProductPricingSection
        formData={formData}
        errors={errors}
        marginAmount={marginAmount}
        marginPercent={marginPercent}
        onChange={updateField}
      />

      {/* Bottom Action Bar */}
      <div className="p-4 rounded-2xl bg-white border border-[#DED5C3] shadow-bento flex flex-col sm:flex-row items-center justify-between gap-3">
        <Button
          type="button"
          variant="ghost"
          size="md"
          onClick={onCancel}
          className="w-full sm:w-auto"
        >
          Batal
        </Button>

        <div className="flex items-center gap-2.5 w-full sm:w-auto">
          <Button
            type="button"
            variant="outline"
            size="md"
            onClick={onSaveDraft}
            isLoading={isSubmitting}
            icon={<Save size={16} />}
            className="w-full sm:w-auto"
          >
            Simpan Draf
          </Button>
          <Button
            type="submit"
            variant="primary"
            size="md"
            isLoading={isSubmitting}
            icon={<Send size={16} />}
            className="w-full sm:w-auto"
          >
            {formData.editingSubmissionId ? 'Kirim Perbaikan Pengajuan' : 'Kirim Pengajuan Produk'}
          </Button>
        </div>
      </div>
    </form>
  );
};
