import React from 'react';
import {
  AlertTriangle,
  ArrowRight,
  Calendar,
  CheckCircle2,
  ClipboardCheck,
  DollarSign,
  Package,
  Send,
  ShieldAlert,
  X,
} from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { formatCurrencyIDR } from '../../../lib/utils';
import type { CompleteSubmissionFormData, SubmissionFormErrors } from '../types';
import { getFirstSubmissionErrorStep } from '../hooks/useProductSubmission';

interface SubmissionConfirmModalProps {
  isOpen: boolean;
  formData: CompleteSubmissionFormData;
  validationErrors: SubmissionFormErrors;
  marginAmount: number;
  marginPercent: number;
  isSubmitting?: boolean;
  onClose: () => void;
  onGoToStep: (step: number) => void;
  onConfirm: () => void;
}

/**
 * Popup saat tombol Kirim Pengajuan Produk diklik:
 * memandu pengisian jika ada field wajib kosong, atau konfirmasi SOP uji kelayakan.
 */
export const SubmissionConfirmModal: React.FC<SubmissionConfirmModalProps> = ({
  isOpen,
  formData,
  validationErrors,
  marginAmount,
  marginPercent,
  isSubmitting = false,
  onClose,
  onGoToStep,
  onConfirm,
}) => {
  if (!isOpen) return null;

  const errorList = Object.values(validationErrors).filter(Boolean) as string[];
  const hasErrors = errorList.length > 0;
  const firstErrorStep = getFirstSubmissionErrorStep(validationErrors);
  const isRevision = Boolean(formData.editingSubmissionId);
  const dropDayLabel = formData.dropDay === 'SELASA' ? 'Selasa' : 'Rabu';
  const dropShiftLabel = formData.dropShift === 'SHIFT_A' ? 'Shift A' : 'Shift B';
  const originLabel = formData.origin === 'BUAT_SENDIRI' ? 'Buat Sendiri' : 'Supply dari Orang';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fadeIn select-none"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto bg-white rounded-2xl border border-[#EAE4D3] shadow-2xl p-5 sm:p-6 space-y-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className={`absolute top-0 left-0 right-0 h-1.5 ${hasErrors ? 'bg-[#B45309]' : 'bg-[#165239]'}`} />

        <button
          type="button"
          onClick={onClose}
          disabled={isSubmitting}
          className="absolute top-4 right-4 p-1.5 rounded-xl text-[#5C6F67] hover:text-[#1A2421] hover:bg-[#FAF7EE] transition-colors cursor-pointer"
          aria-label="Tutup popup"
        >
          <X size={18} />
        </button>

        <div className="flex items-start gap-3 pt-1 pr-8">
          <div
            className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border ${
              hasErrors
                ? 'bg-[#FEF9EA] text-[#B45309] border-[#F5E0A3]'
                : 'bg-[#EAF4EE] text-[#165239] border-[#CFE3D6]'
            }`}
          >
            {hasErrors ? <AlertTriangle size={20} /> : <ClipboardCheck size={20} />}
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-heading font-bold text-[#18221D]">
              {hasErrors
                ? 'Lengkapi Data Pengajuan'
                : isRevision
                ? 'Konfirmasi Kirim Revisi Produk'
                : 'Konfirmasi Pengajuan Produk'}
            </h2>
            <p className="text-xs font-sans text-[#526058] mt-0.5 leading-relaxed">
              {hasErrors
                ? 'Beberapa informasi produk yang wajib diisi masih kosong.'
                : 'Periksa ringkasan dan ketentuan uji kelayakan sebelum mengirim pengajuan.'}
            </p>
          </div>
        </div>

        {hasErrors ? (
          <div className="p-3.5 rounded-xl bg-[#FEF2F2] border border-[#FECACA] space-y-1.5 text-xs text-[#991B1B]">
            <p className="font-semibold">Bagian yang perlu dilengkapi:</p>
            <ul className="list-disc pl-4 space-y-1">
              {errorList.map((msg) => (
                <li key={msg}>{msg}</li>
              ))}
            </ul>
          </div>
        ) : (
          <>
            <div className="p-3.5 rounded-xl bg-[#FAF8F2] border border-[#EAE4D3] space-y-2 text-xs">
              <div className="flex items-center justify-between gap-2 pb-2 border-b border-[#EAE4D3]">
                <span className="text-[#526058] inline-flex items-center gap-1.5 shrink-0">
                  <Package size={14} className="text-[#165239]" />
                  Produk & Asal
                </span>
                <span className="font-semibold text-[#18221D] text-right truncate">
                  {formData.name} • {originLabel}
                </span>
              </div>

              <div className="flex items-center justify-between gap-2 pb-2 border-b border-[#EAE4D3]">
                <span className="text-[#526058] inline-flex items-center gap-1.5 shrink-0">
                  <DollarSign size={14} className="text-[#165239]" />
                  HPP / Jual
                </span>
                <span className="font-semibold text-[#165239] text-right">
                  {formatCurrencyIDR(formData.costPrice)} / {formatCurrencyIDR(formData.sellingPrice)} ({marginPercent}% • {formatCurrencyIDR(marginAmount)})
                </span>
              </div>

              <div className="flex items-center justify-between gap-2">
                <span className="text-[#526058] inline-flex items-center gap-1.5 shrink-0">
                  <Calendar size={14} className="text-[#165239]" />
                  Drop Sampel
                </span>
                <span className="font-semibold text-[#18221D] text-right">
                  {dropDayLabel}, {dropShiftLabel} • {formData.dropLocation}
                </span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-[#EAF4EE]/60 border border-[#CFE3D6] space-y-1.5 text-[11.5px] text-[#18221D]">
              <p className="font-semibold text-[#165239] inline-flex items-center gap-1.5">
                <CheckCircle2 size={14} />
                Ketentuan Uji Kelayakan (SOP Koperasi):
              </p>
              <ul className="space-y-1 text-[#3E5247] list-disc pl-4 leading-relaxed">
                <li>Pengajuan masuk status <strong>MENUNGGU_PENGUJIAN</strong> untuk evaluasi HPP & harga jual.</li>
                <li>Serahkan sampel hari <strong>{dropDayLabel} ({dropShiftLabel})</strong> di <strong>{formData.dropLocation}</strong>; uji maksimal <strong>Kamis</strong> dan hasil terbit <strong>Jumat</strong>.</li>
                <li>Jika perlu perbaikan, riwayat evaluasi dan revisi tercatat permanen.</li>
              </ul>
            </div>

            <div className="flex items-start gap-2 text-[11px] text-[#7A5908] bg-[#FEF9EA] border border-[#F5E0A3] rounded-xl p-3">
              <ShieldAlert size={15} className="shrink-0 mt-0.5 text-[#B45309]" />
              <span>Produk yang tidak menyuplai 1 bulan berturut-turut tanpa izin cuti dinonaktifkan otomatis.</span>
            </div>
          </>
        )}

        <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-[#F0EBDC]">
          <Button type="button" variant="outline" size="md" onClick={onClose} disabled={isSubmitting} className="whitespace-nowrap">
            {hasErrors ? 'Tutup' : 'Periksa Kembali'}
          </Button>
          {hasErrors ? (
            firstErrorStep && (
              <Button
                type="button"
                variant="primary"
                size="md"
                onClick={() => onGoToStep(firstErrorStep)}
                className="whitespace-nowrap"
              >
                <span className="inline-flex items-center gap-1.5">
                  <span>Lengkapi Langkah {firstErrorStep}</span>
                  <ArrowRight size={15} />
                </span>
              </Button>
            )
          ) : (
            <Button
              type="button"
              variant="primary"
              size="md"
              onClick={onConfirm}
              disabled={isSubmitting}
              icon={<Send size={15} />}
              className="whitespace-nowrap"
            >
              {isSubmitting ? 'Mengirim...' : 'Ya, Kirim Pengajuan'}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
