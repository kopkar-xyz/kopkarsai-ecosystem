import { useState, useCallback, useMemo, useEffect } from 'react';
import type {
  CompleteSubmissionFormData,
  SubmissionFormErrors,
  SubmissionTransaction,
} from '../types';
import { useProductStore } from '../context/ProductStoreContext';

export const INITIAL_FORM_DATA: CompleteSubmissionFormData = {
  name: '',
  productType: 'Jajanan Basah',
  origin: 'BUAT_SENDIRI',
  supplyLocation: 'SAI-B',
  supplySchedule: 'Shift A',
  shelfLife: 'Setiap Akhir Shift',
  customShelfLifeDays: 1,
  costPrice: 0,
  sellingPrice: 0,
  qtyKirim: 20,
  weightGrams: '', // Inactive, diisi pengurus koperasi
  productionDuration: '1.5 Jam',
  deliveryTimeWindow: '06:00 - 06:45 WIB',
  productionTime: '04:30',
  ingredients: ['Tepung Terigu', 'Gula Pasir', 'Telur Ayam'],
  additionalNotes: '',
  imageFile: null,
  imagePreviewUrl: '',
  dropDay: 'SELASA',
  dropShift: 'SHIFT_A',
  dropLocation: 'SAI-B',
};

export function useProductSubmission() {
  const {
    submitProductForm,
    selectedRevisionData,
    setSelectedRevisionData,
  } = useProductStore();

  const [formData, setFormData] = useState<CompleteSubmissionFormData>(() => {
    return selectedRevisionData || INITIAL_FORM_DATA;
  });

  const [errors, setErrors] = useState<SubmissionFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [lastSubmittedId, setLastSubmittedId] = useState<string | null>(null);

  // Sync if selectedRevisionData changes from external trigger (e.g. from detail modal)
  useEffect(() => {
    if (selectedRevisionData) {
      setFormData(selectedRevisionData);
      setErrors({});
    }
  }, [selectedRevisionData]);

  // Financial calculations
  const marginAmount = useMemo(() => {
    return Math.max(0, formData.sellingPrice - formData.costPrice);
  }, [formData.costPrice, formData.sellingPrice]);

  const marginPercent = useMemo(() => {
    if (formData.sellingPrice <= 0) return 0;
    return Math.round(((formData.sellingPrice - formData.costPrice) / formData.sellingPrice) * 100);
  }, [formData.costPrice, formData.sellingPrice]);

  // Update specific field
  const updateField = useCallback(
    <K extends keyof CompleteSubmissionFormData>(field: K, value: CompleteSubmissionFormData[K]) => {
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

  // Ingredient list operations
  const addIngredient = useCallback((ingredient: string) => {
    const trimmed = ingredient.trim();
    if (!trimmed) return false;
    setFormData((prev) => {
      if (prev.ingredients.some((item) => item.toLowerCase() === trimmed.toLowerCase())) {
        return prev;
      }
      return {
        ...prev,
        ingredients: [...prev.ingredients, trimmed],
      };
    });
    setErrors((prev) => {
      const next = { ...prev };
      delete next.ingredientsInput;
      return next;
    });
    return true;
  }, []);

  const removeIngredient = useCallback((indexToRemove: number) => {
    setFormData((prev) => ({
      ...prev,
      ingredients: prev.ingredients.filter((_, idx) => idx !== indexToRemove),
    }));
  }, []);

  // Image select & remove
  const handleImageSelect = useCallback((file: File) => {
    const validMimes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!validMimes.includes(file.type)) {
      setErrors((prev) => ({
        ...prev,
        imageFile: 'Format file tidak didukung. Harap gunakan format JPG, PNG, atau WEBP.',
      }));
      return false;
    }

    const maxSizeBytes = 3 * 1024 * 1024; // 3.0 MB
    if (file.size > maxSizeBytes) {
      setErrors((prev) => ({
        ...prev,
        imageFile: `Ukuran foto melebihi 3 MB (${(file.size / (1024 * 1024)).toFixed(1)} MB).`,
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

  // Load revision
  const loadSubmissionForRevision = useCallback((trx: SubmissionTransaction) => {
    setFormData({
      ...trx.formDataSnapshot,
      editingSubmissionId: trx.id,
    });
    setErrors({});
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Cancel edit mode
  const cancelRevisionMode = useCallback(() => {
    setSelectedRevisionData(null);
    setFormData(INITIAL_FORM_DATA);
    setErrors({});
  }, [setSelectedRevisionData]);

  // Validation
  const validate = useCallback(
    (isDraft = false): boolean => {
      const newErrors: SubmissionFormErrors = {};

      if (!formData.name.trim()) {
        newErrors.name = 'Nama produk wajib diisi.';
      }

      if (!isDraft) {
        if (formData.costPrice <= 0) {
          newErrors.costPrice = 'Harga beli koperasi (HPP) harus lebih dari Rp 0.';
        }
        if (formData.sellingPrice <= 0) {
          newErrors.sellingPrice = 'Harga jual koperasi harus lebih dari Rp 0.';
        }
        if (formData.sellingPrice < formData.costPrice) {
          newErrors.sellingPrice = 'Harga jual tidak boleh lebih rendah dari harga beli (margin minus).';
        }
        if (formData.qtyKirim <= 0) {
          newErrors.qtyKirim = 'Jumlah kirim minimal 1 unit / porsi.';
        }
        if (!formData.productionTime) {
          newErrors.productionTime = 'Jam pembuatan produk wajib diisi.';
        }
        if (formData.ingredients.length === 0) {
          newErrors.ingredientsInput = 'Tambahkan minimal 1 bahan komposisi produk.';
        }
        const isFood = !formData.productType.startsWith('Minuman');
        if (formData.shelfLife === 'Jangka Waktu Tertentu' && isFood && (formData.customShelfLifeDays || 0) > 3) {
          newErrors.shelfLife = 'Sesuai standar mutu, produk makanan maksimal berumur 3 hari.';
        }
      }

      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    },
    [formData]
  );

  // Submit form
  const submit = useCallback(
    async (isDraft = false): Promise<boolean> => {
      if (!validate(isDraft)) return false;

      setIsSubmitting(true);
      try {
        await new Promise((resolve) => setTimeout(resolve, 500));

        const submissionId = submitProductForm(formData, isDraft);
        setLastSubmittedId(submissionId);
        setShowSuccessModal(true);
        setSelectedRevisionData(null);
        return true;
      } finally {
        setIsSubmitting(false);
      }
    },
    [formData, submitProductForm, validate, setSelectedRevisionData]
  );

  const resetForm = useCallback(() => {
    if (formData.imagePreviewUrl) {
      URL.revokeObjectURL(formData.imagePreviewUrl);
    }
    setSelectedRevisionData(null);
    setFormData(INITIAL_FORM_DATA);
    setErrors({});
    setShowSuccessModal(false);
    setLastSubmittedId(null);
  }, [formData.imagePreviewUrl, setSelectedRevisionData]);

  return {
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
    loadSubmissionForRevision,
    cancelRevisionMode,
    submit,
    resetForm,
    setShowSuccessModal,
  };
}
