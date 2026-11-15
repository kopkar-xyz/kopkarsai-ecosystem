import React from 'react';
import { CheckCircle2, Calendar, DollarSign, Package, Plus, X, History, ArrowRight } from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { formatCurrencyIDR } from '../../../lib/utils';
import type { CompleteSubmissionFormData } from '../types';

interface SubmissionSuccessModalProps {
  isOpen: boolean;
  submissionId: string | null;
  formData: CompleteSubmissionFormData;
  marginAmount: number;
  marginPercent: number;
  onClose: () => void;
  onNewSubmission: () => void;
  onViewTransactions: () => void;
  onViewCatalog: () => void;
}

export const SubmissionSuccessModal: React.FC<SubmissionSuccessModalProps> = ({
  isOpen,
  submissionId,
  formData,
  marginAmount,
  marginPercent,
  onClose,
  onNewSubmission,
  onViewTransactions,
  onViewCatalog,
}) => {
  if (!isOpen) return null;

  const isRevision = Boolean(formData.editingSubmissionId);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-3xl border border-[#DED5C3] shadow-2xl p-6 sm:p-7 space-y-5 overflow-hidden">
        {/* Accent Bar */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#1F5B45] via-[#4F8A67] to-[#F6CE2C]" />

        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-xl text-[#5C6F67] hover:text-[#1A2421] hover:bg-[#F3ECDD] transition-colors cursor-pointer"
          aria-label="Tutup dialog"
        >
          <X size={18} />
        </button>

        {/* Modal Header */}
        <div className="text-center pt-2">
          <div className="w-14 h-14 rounded-2xl bg-[#EAF4EE] text-[#1F5B45] flex items-center justify-center mx-auto mb-3 shadow-xs ring-4 ring-[#A9C3A2]/40">
            <CheckCircle2 size={30} />
          </div>
          <span className="text-[11px] font-accent font-bold px-2.5 py-1 rounded-full bg-[#EAF4EE] text-[#1F5B45] border border-[#A9C3A2]/60">
            Tiket: {submissionId || 'SUB-2024'}
          </span>
          <h2 className="text-xl sm:text-2xl font-heading font-extrabold text-[#1A2421] mt-2">
            {isRevision ? 'Revisi Pengajuan Berhasil Dikirim!' : 'Pengajuan Produk Berhasil Terkirim!'}
          </h2>
          <p className="text-xs sm:text-sm font-body text-[#5C6F67] mt-1">
            Data transaksi tersimpan dan otomatis masuk ke antrean kurasi pengurus koperasi.
          </p>
        </div>

        {/* Summary Bento Details */}
        <div className="p-4 rounded-2xl bg-[#F8F4EC] border border-[#DED5C3] space-y-2.5 text-xs">
          <div className="flex items-center justify-between pb-2 border-b border-[#DED5C3]/70">
            <span className="text-[#5C6F67] font-body flex items-center gap-1.5">
              <Package size={14} className="text-[#1F5B45]" />
              Nama Produk
            </span>
            <span className="font-heading font-bold text-[#1A2421] text-right truncate max-w-[200px]">
              {formData.name}
            </span>
          </div>

          <div className="flex items-center justify-between pb-2 border-b border-[#DED5C3]/70">
            <span className="text-[#5C6F67] font-body flex items-center gap-1.5">
              <DollarSign size={14} className="text-[#1F5B45]" />
              Struktur Harga
            </span>
            <span className="font-heading font-bold text-[#1F5B45]">
              Beli {formatCurrencyIDR(formData.costPrice)} • Jual{' '}
              {formatCurrencyIDR(formData.sellingPrice)} (Margin {formatCurrencyIDR(marginAmount)} / {marginPercent}%)
            </span>
          </div>

          <div className="flex items-start justify-between">
            <span className="text-[#5C6F67] font-body flex items-center gap-1.5 mt-0.5">
              <Calendar size={14} className="text-[#1F5B45]" />
              Jadwal Drop Sampel
            </span>
            <span className="font-heading font-bold text-[#1A2421] text-right max-w-[220px]">
              {formData.dropDay === 'SELASA' ? 'Selasa' : 'Rabu'},{' '}
              {formData.dropShift === 'SHIFT_A' ? 'Shift A' : 'Shift B'} @ Pabrik{' '}
              {formData.dropLocation}
            </span>
          </div>
        </div>

        {/* Friendly Instructions */}
        <div className="p-3 bg-[#EAF4EE] rounded-xl border border-[#A9C3A2]/60 text-xs font-body text-[#1F5B45]">
          <p className="font-heading font-bold">Langkah Selanjutnya:</p>
          <p className="text-[11px] text-[#2F6F56] mt-0.5">
            Serahkan <strong>2 porsi sampel fisik</strong> ke meja kasir toko koperasi sesuai
            jadwal di atas. Tim penilai akan menguji kelayakan rasa dan kemasan pada hari{' '}
            <strong>Kamis</strong> dan status kelulusan diumumkan setiap hari <strong>Jumat</strong>.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-2.5 pt-2">
          <Button
            type="button"
            variant="outline"
            size="md"
            onClick={onViewTransactions}
            className="w-full sm:w-1/2 flex items-center justify-center gap-1.5"
          >
            <History size={15} />
            <span>Riwayat Transaksi</span>
          </Button>

          <Button
            type="button"
            variant="primary"
            size="md"
            onClick={onNewSubmission}
            className="w-full sm:w-1/2 flex items-center justify-center gap-1.5"
          >
            <Plus size={15} />
            <span>Ajukan Produk Lain</span>
          </Button>
        </div>

        <div className="text-center pt-1">
          <button
            type="button"
            onClick={onViewCatalog}
            className="text-xs font-accent font-bold text-[#5C6F67] hover:text-[#1F5B45] inline-flex items-center gap-1 cursor-pointer transition-colors"
          >
            <span>Kembali ke Katalog Produk Utama</span>
            <ArrowRight size={13} />
          </button>
        </div>
      </div>
    </div>
  );
};
