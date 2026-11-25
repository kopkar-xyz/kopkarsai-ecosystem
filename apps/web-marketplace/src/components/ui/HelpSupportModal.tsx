import React from 'react';
import { X } from 'lucide-react';
import { HelpView } from '../../features/help/pages/HelpView';

interface HelpSupportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * HelpSupportModal — Dialog Pusat Bantuan Kantin & Koperasi (Sesuai Gambar 1 & 4)
 * Budget: < 200 LOC.
 */
export const HelpSupportModal: React.FC<HelpSupportModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-fadeIn select-none"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="w-full max-w-4xl bg-[#FAF6F0] rounded-3xl shadow-2xl border border-[#EAE3D5] overflow-hidden my-auto relative p-6 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-6 right-6 w-8 h-8 rounded-full bg-white border border-[#EAE3D5] hover:bg-[#FAF6F0] flex items-center justify-center text-[#1A1615] transition-colors cursor-pointer z-10"
          aria-label="Tutup"
        >
          <X className="w-4 h-4" />
        </button>

        <HelpView mode="customer" />
      </div>
    </div>
  );
};
