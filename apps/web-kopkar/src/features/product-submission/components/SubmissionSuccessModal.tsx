import React from 'react';
import { CheckCircle2, Calendar, DollarSign, Package, ArrowRight, Plus, X } from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { formatCurrencyIDR } from '../../../lib/utils';
import type { SubmissionSummary } from '../types';

interface SubmissionSuccessModalProps {
  isOpen: boolean;
  summary: SubmissionSummary | null;
  onClose: () => void;
  onNewSubmission: () => void;
  onViewCatalog: () => void;
}

export const SubmissionSuccessModal: React.FC<SubmissionSuccessModalProps> = ({
  isOpen,
  summary,
  onClose,
  onNewSubmission,
  onViewCatalog,
}) => {
  if (!isOpen || !summary) return null;

  const isDraft = summary.status === 'DRAFT';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-3xl border border-[#DED5C3] shadow-2xl p-6 sm:p-7 space-y-5 overflow-hidden">
        {/* Decorative Top Accent Bar */}
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
            Tiket: {summary.submissionId}
          </span>
          <h2 className="text-xl sm:text-2xl font-heading font-extrabold text-[#1A2421] mt-2">
            {isDraft ? 'Draf Berhasil Disimpan!' : 'Pengajuan Produk Terkirim!'}
          </h2>
          <p className="text-xs sm:text-sm font-body text-[#5C6F67] mt-1">
            {isDraft
              ? 'Draf produk Anda tersimpan dan dapat disunting kembali kapan saja.'
              : 'Produk telah didaftarkan ke sistem dan masuk ke siklus kurasi mutu mingguan.'}
          </p>
        </div>

        {/* Summary Bento Details */}
        <div className="p-4 rounded-2xl bg-[#F8F4EC] border border-[#DED5C3] space-y-3 text-xs">
          <div className="flex items-center justify-between pb-2 border-b border-[#DED5C3]/70">
            <span className="text-[#5C6F67] font-body flex items-center gap-1.5">
              <Package size={14} className="text-[#1F5B45]" />
              Nama Produk
            </span>
            <span className="font-heading font-bold text-[#1A2421] text-right truncate max-w-[200px]">
              {summary.productName}
            </span>
          </div>

          <div className="flex items-center justify-between pb-2 border-b border-[#DED5C3]/70">
            <span className="text-[#5C6F67] font-body flex items-center gap-1.5">
              <DollarSign size={14} className="text-[#1F5B45]" />
              Struktur Harga
            </span>
            <span className="font-heading font-bold text-[#1F5B45]">
              HPP {formatCurrencyIDR(summary.costPrice)} • Jual {formatCurrencyIDR(summary.sellingPrice)} (Margin {summary.marginPercent}%)
            </span>
          </div>

          <div className="flex items-start justify-between">
            <span className="text-[#5C6F67] font-body flex items-center gap-1.5 mt-0.5">
              <Calendar size={14} className="text-[#1F5B45]" />
              Jadwal Drop Sampel
            </span>
            <span className="font-heading font-bold text-[#1A2421] text-right max-w-[220px]">
              {summary.dropScheduleText}
            </span>
          </div>
        </div>

        {/* Instructions Reminder (KK-BR-004) */}
        {!isDraft && (
          <div className="p-3 bg-[#EAF4EE] rounded-xl border border-[#A9C3A2]/60 text-xs font-body text-[#1F5B45]">
            <p className="font-heading font-bold">Langkah Selanjutnya:</p>
            <p className="text-[11px] text-[#2F6F56] mt-0.5">
              Serahkan <strong>2 porsi sampel fisik</strong> ke meja kasir toko sesuai jadwal di atas. Tim penilai akan menguji kelayakan pada hari <strong>Kamis</strong> dan status kelulusan akan diumumkan resmi pada hari <strong>Jumat</strong>.
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-2.5 pt-2">
          <Button
            variant="outline"
            size="md"
            onClick={onNewSubmission}
            icon={<Plus size={16} />}
            className="w-full sm:w-1/2"
          >
            Ajukan Produk Lain
          </Button>

          <Button
            variant="primary"
            size="md"
            onClick={onViewCatalog}
            icon={<ArrowRight size={16} />}
            className="w-full sm:w-1/2"
          >
            Lihat Katalog Produk
          </Button>
        </div>
      </div>
    </div>
  );
};
