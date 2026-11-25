import React from 'react';
import { X, History, FileEdit, CheckCircle2, Clock, AlertTriangle, XCircle } from 'lucide-react';
import type { SubmissionTransaction, SubmissionStatus } from '../types';

interface ProductRevisionHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  productName: string;
  transactions: SubmissionTransaction[];
  onStartRevision: (trx: SubmissionTransaction) => void;
}

export const ProductRevisionHistoryModal: React.FC<ProductRevisionHistoryModalProps> = ({
  isOpen,
  onClose,
  productName,
  transactions,
  onStartRevision,
}) => {
  if (!isOpen) return null;

  const getStatusBadge = (status: SubmissionStatus) => {
    switch (status) {
      case 'DISETUJUI':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#EAF4EE] text-[#1F5B45] border border-[#A9C3A2] text-xs font-heading font-bold">
            <CheckCircle2 size={12} />
            <span>Disetujui</span>
          </span>
        );
      case 'PERLU_REVISI':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#FEF6DC] text-[#B87D09] border border-[#F6CE2C] text-xs font-heading font-bold">
            <AlertTriangle size={12} />
            <span>Perlu Revisi</span>
          </span>
        );
      case 'DITOLAK':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#FDF0F3] text-[#DC4C70] border border-[#DC4C70]/30 text-xs font-heading font-bold">
            <XCircle size={12} />
            <span>Ditolak</span>
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#EEF2F6] text-[#1E3A5F] border border-[#BFDBFE] text-xs font-heading font-bold">
            <Clock size={12} />
            <span>Menunggu Uji Sampel</span>
          </span>
        );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-white rounded-2xl border border-[#EAE4D3] shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        {/* Accent Bar */}
        <div className="h-2 bg-gradient-to-r from-[#1F5B45] via-[#4F8A67] to-[#F6CE2C] flex-shrink-0" />

        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#DED5C3] flex items-center justify-between gap-3 bg-[#F8F4EC]/70 flex-shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-[#EAF4EE] text-[#1F5B45] flex items-center justify-center flex-shrink-0 border border-[#A9C3A2] shadow-xs">
              <History size={20} />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-heading font-extrabold text-[#1A2421]">
                History Revisi & Pengajuan
              </h2>
              <p className="text-xs font-body text-[#5C6F67] truncate max-w-sm">
                Produk: <strong className="text-[#1A2421]">{productName}</strong>
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-xl text-[#5C6F67] hover:text-[#1A2421] hover:bg-[#F3ECDD] transition-colors cursor-pointer"
            aria-label="Tutup history revisi"
          >
            <X size={18} />
          </button>
        </div>

        {/* List Content */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-3">
          {transactions.length === 0 ? (
            <div className="p-8 text-center bg-[#F8F4EC] rounded-2xl border border-[#DED5C3] text-xs text-[#5C6F67]">
              Belum ada catatan transaksi pengajuan untuk produk ini.
            </div>
          ) : (
            transactions.map((trx) => (
              <div
                key={trx.id}
                className="p-4 rounded-2xl bg-[#F8F4EC] border border-[#DED5C3] space-y-2.5 shadow-2xs"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="font-heading font-bold text-sm text-[#1F5B45]">
                      Tiket: {trx.id}
                    </span>
                    <p className="text-[11px] text-[#5C6F67] mt-0.5">
                      Diajukan: {trx.submissionDate}
                    </p>
                  </div>

                  <div>{getStatusBadge(trx.status)}</div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[11px] bg-white p-2.5 rounded-xl border border-[#DED5C3]/60">
                  <div>
                    <span className="text-[#5C6F67] block">Jadwal & Shift Drop:</span>
                    <strong className="text-[#1A2421]">
                      {trx.dropDay}, {trx.dropShift === 'SHIFT_A' ? 'Shift A' : 'Shift B'}
                    </strong>
                  </div>
                  <div>
                    <span className="text-[#5C6F67] block">Lokasi & Volume:</span>
                    <strong className="text-[#1A2421]">
                      Pabrik {trx.dropLocation} • {trx.qtyKirim} Unit
                    </strong>
                  </div>
                </div>

                {/* Revision Notes from Admin if available */}
                {trx.revisionNotes && (
                  <div className="p-2.5 rounded-xl bg-[#FEF6DC] border border-[#F6CE2C]/60 text-xs text-[#801A38] space-y-0.5">
                    <span className="font-heading font-bold block text-[11px] text-[#B87D09]">
                      Catatan Evaluasi Pengurus:
                    </span>
                    <p>{trx.revisionNotes}</p>
                  </div>
                )}

                {/* Action button if needs revision */}
                {(trx.status === 'PERLU_REVISI' || trx.status === 'DRAFT') && (
                  <div className="pt-1 flex justify-end">
                    <button
                      type="button"
                      onClick={() => {
                        onStartRevision(trx);
                        onClose();
                      }}
                      className="px-3.5 py-1.5 rounded-xl bg-[#1F5B45] hover:bg-[#2F6F56] text-white text-xs font-heading font-bold flex items-center gap-1.5 cursor-pointer shadow-xs transition-transform active:scale-95"
                    >
                      <FileEdit size={13} />
                      <span>Perbaiki Pengajuan Tiket Ini</span>
                    </button>
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-3.5 bg-[#F8F4EC]/80 border-t border-[#DED5C3] text-right flex-shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-white hover:bg-[#F3ECDD] text-xs font-heading font-bold text-[#5C6F67] border border-[#DED5C3] cursor-pointer transition-colors"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
