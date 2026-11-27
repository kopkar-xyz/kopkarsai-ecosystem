import React from 'react';
import { ArrowLeft, ArrowRight, Send } from 'lucide-react';

interface SubmissionStepFooterProps {
  onPrev?: () => void;
  onCancel?: () => void;
  onNext?: () => void;
  nextLabel?: string;
  onSubmit?: (e: React.FormEvent) => void;
  isSubmitting?: boolean;
}

/**
 * Shared action footer across multi-step product submission cards.
 */
export const SubmissionStepFooter: React.FC<SubmissionStepFooterProps> = ({
  onPrev,
  onCancel,
  onNext,
  nextLabel,
  onSubmit,
  isSubmitting = false,
}) => {
  return (
    <div className="pt-4 border-t border-[#E9E2D2]/60 flex flex-wrap items-center justify-between gap-2.5">
      {onPrev ? (
        <button
          type="button"
          onClick={onPrev}
          className="h-10 px-3 sm:px-4 rounded-xl border border-[#E9E2D2] text-xs font-sans font-medium text-[#14261E] hover:bg-[#FAF7F2] inline-flex items-center gap-1.5 whitespace-nowrap transition-colors cursor-pointer"
        >
          <ArrowLeft size={15} />
          <span>Sebelumnya</span>
        </button>
      ) : onCancel ? (
        <button
          type="button"
          onClick={onCancel}
          className="inline-flex px-3 sm:px-4 py-2 rounded-xl text-xs font-sans font-medium text-[#6F776F] hover:text-[#14261E] hover:bg-[#FAF7F2] whitespace-nowrap transition-colors cursor-pointer"
        >
          Batal
        </button>
      ) : null}

      <div className="flex items-center justify-end ml-auto">
        {onSubmit ? (
          <button
            type="button"
            onClick={onSubmit}
            disabled={isSubmitting}
            className="h-10 px-4 sm:px-5 rounded-xl bg-[#1F5C45] hover:bg-[#174736] text-white text-xs font-heading font-medium inline-flex items-center gap-1.5 sm:gap-2 whitespace-nowrap transition-all cursor-pointer shadow-xs active:scale-95 disabled:opacity-50"
          >
            <Send size={15} />
            <span>{isSubmitting ? 'Mengirim...' : 'Kirim Pengajuan Produk'}</span>
          </button>
        ) : onNext ? (
          <button
            type="button"
            onClick={onNext}
            className="h-10 px-4 sm:px-5 rounded-xl bg-[#1F5C45] hover:bg-[#174736] text-white text-xs font-heading font-medium inline-flex items-center gap-2 whitespace-nowrap transition-all cursor-pointer shadow-xs active:scale-95"
          >
            <span>{nextLabel}</span>
            <ArrowRight size={15} />
          </button>
        ) : null}
      </div>
    </div>
  );
};
