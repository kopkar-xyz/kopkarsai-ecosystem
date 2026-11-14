import { useState, useCallback, useMemo } from 'react';
import type {
  ProductSubmissionFormData,
  SubmissionFormErrors,
  SubmissionSummary,
} from '../types';

const INITIAL_FORM_DATA: ProductSubmissionFormData = {
  name: '',
  category: 'Katering H-1',
  origin: 'PRODUKSI_SENDIRI',
  description: '',
  ingredients: '',
  shelfLife: '24 Jam',
  storage: 'SUHU_RUANG',
  costPrice: 0,
  sellingPrice: 0,
  dailyCapacity: 30,
  imageFile: null,
  imagePreviewUrl: '',
  dropDay: 'SELASA',
  dropShift: 'SHIFT_A',
  dropLocation: 'SAI_B',
  samplePortions: 2,
  notes: '',
  agreedToTerms: false,
};

export function useProductSubmission() {
  const [formData, setFormData] = useState<ProductSubmissionFormData>(INITIAL_FORM_DATA);
  const [errors, setErrors] = useState<SubmissionFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<SubmissionSummary | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Financial margin calculations (KK-BR-003)
  const marginAmount = useMemo(() => {
    return Math.max(0, formData.sellingPrice - formData.costPrice);
  }, [formData.costPrice, formData.sellingPrice]);

  const marginPercent = useMemo(() => {
    if (formData.sellingPrice <= 0) return 0;
    return Math.round(((formData.sellingPrice - formData.costPrice) / formData.sellingPrice) * 100);
  }, [formData.costPrice, formData.sellingPrice]);

  const updateField = useCallback(
    <K extends keyof ProductSubmissionFormData>(field: K, value: ProductSubmissionFormData[K]) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
      setErrors((prev) => {
        if (prev[field]) {
          const next = { ...prev };
          delete next[field];
          return next;
        }
        return prev;
      });
    },
    []
  );

  // Image upload with 3 MB limit & MIME validation (SH-NFR-001)
  const handleImageSelect = useCallback((file: File) => {
    const validMimes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!validMimes.includes(file.type)) {
      setErrors((prev) => ({
        ...prev,
        imageFile: 'Format file tidak didukung. Gunakan format JPG, PNG, atau WEBP.',
      }));
      return false;
    }

    const maxSizeBytes = 3 * 1024 * 1024; // 3.0 MB
    if (file.size > maxSizeBytes) {
      setErrors((prev) => ({
        ...prev,
        imageFile: `Ukuran foto melebihi 3 MB (${(file.size / (1024 * 1024)).toFixed(1)} MB). Sesuai aturan SH-NFR-001, maksimal 3.0 MB.`,
      }));
      return false;
    }

    const previewUrl = URL.createObjectURL(file);
    setFormData((prev) => ({
      ...prev,
      imageFile: file,
      imagePreviewUrl: previewUrl,
    }));
    setErrors((prev) => {
      const next = { ...prev };
      delete next.imageFile;
      return next;
    });
    return true;
  }, []);

  const removeImage = useCallback(() => {
    if (formData.imagePreviewUrl) {
      URL.revokeObjectURL(formData.imagePreviewUrl);
    }
    setFormData((prev) => ({
      ...prev,
      imageFile: null,
      imagePreviewUrl: '',
    }));
  }, [formData.imagePreviewUrl]);

  const validate = useCallback(
    (isDraft = false): boolean => {
      const newErrors: SubmissionFormErrors = {};

      if (!formData.name.trim()) {
        newErrors.name = 'Nama produk wajib diisi.';
      }

      if (!isDraft) {
        if (formData.costPrice <= 0) {
          newErrors.costPrice = 'Harga Beli Koperasi (HPP) harus lebih dari Rp 0.';
        }
        if (formData.sellingPrice <= 0) {
          newErrors.sellingPrice = 'Usulan Harga Jual Konsumen harus lebih dari Rp 0.';
        }
        if (formData.sellingPrice < formData.costPrice) {
          newErrors.sellingPrice = 'Harga Jual tidak boleh lebih rendah dari HPP (margin minus).';
        }
        if (formData.dailyCapacity <= 0) {
          newErrors.dailyCapacity = 'Estimasi kapasitas pasokan harian minimal 1 porsi.';
        }
        if (!formData.agreedToTerms) {
          newErrors.agreedToTerms = 'Anda wajib menyetujui komitmen mutu dan ketentuan drop sampel.';
        }
      }

      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    },
    [formData]
  );

  const submit = useCallback(
    async (isDraft = false): Promise<boolean> => {
      if (!validate(isDraft)) return false;

      setIsSubmitting(true);
      try {
        // Simulate network API request
        await new Promise((resolve) => setTimeout(resolve, 800));

        const submissionId = `SUB-${Date.now().toString().slice(-6)}`;
        const scheduleText = `${formData.dropDay === 'SELASA' ? 'Selasa' : 'Rabu'}, ${
          formData.dropShift === 'SHIFT_A' ? 'Shift A (Pagi/Siang)' : 'Shift B (Sore/Malam)'
        } @ Pabrik ${formData.dropLocation === 'SAI_B' ? 'SAI B' : 'SAI T'}`;

        const summary: SubmissionSummary = {
          submissionId,
          productName: formData.name,
          category: formData.category,
          costPrice: formData.costPrice,
          sellingPrice: formData.sellingPrice,
          marginAmount,
          marginPercent,
          dropScheduleText: scheduleText,
          status: isDraft ? 'DRAFT' : 'MENUNGGU_PENGUJIAN',
          submittedAt: new Date().toISOString(),
        };

        setSubmissionResult(summary);
        setShowSuccessModal(true);
        return true;
      } finally {
        setIsSubmitting(false);
      }
    },
    [formData, marginAmount, marginPercent, validate]
  );

  const resetForm = useCallback(() => {
    if (formData.imagePreviewUrl) {
      URL.revokeObjectURL(formData.imagePreviewUrl);
    }
    setFormData(INITIAL_FORM_DATA);
    setErrors({});
    setSubmissionResult(null);
    setShowSuccessModal(false);
  }, [formData.imagePreviewUrl]);

  return {
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
  };
}
