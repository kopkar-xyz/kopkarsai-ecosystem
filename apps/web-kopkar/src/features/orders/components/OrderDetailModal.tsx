import React from 'react';
import { X, CheckCircle2, Clock } from 'lucide-react';
import { DailyOrderItem } from './OrdersDailyTableCard';

interface OrderDetailModalProps {
  order: DailyOrderItem | null;
  onClose: () => void;
  onAcceptOrder?: (id: string) => void;
}

/**
 * OrderDetailModal — Modal Detail Pesanan Harian (Aksi Tombol Mata)
 * Menampilkan rincian pesanan, pemesan, unit, dan konfirmasi status.
 * Budget: < 200 LOC.
 */
export const OrderDetailModal: React.FC<OrderDetailModalProps> = ({
  order,
  onClose,
  onAcceptOrder,
}) => {
  if (!order) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-fadeIn select-none"
      onClick={onClose}
    >
      <div
        className="w-full max-w-[420px] bg-white border border-[#E9E2D2] rounded-2xl shadow-xl p-5 sm:p-6 space-y-4 my-auto animate-scaleUp text-[#14261E]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Modal */}
        <div className="flex items-center justify-between border-b border-[#E9E2D2] pb-3">
          <div>
            <span className="text-[11px] font-mono text-[#6F776F] uppercase tracking-wider block">
              {order.id}
            </span>
            <h3 className="font-heading font-medium text-base sm:text-lg text-[#14261E]">
              Rincian Pesanan
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup detail pesanan"
            className="w-8 h-8 rounded-full bg-[#FAF6F0] hover:bg-[#F2ECE1] flex items-center justify-center text-[#14261E] transition-colors cursor-pointer border border-[#E9E2D2]"
          >
            <X size={15} />
          </button>
        </div>

        {/* Informasi Produk */}
        <div className="p-3.5 rounded-xl bg-[#FAF7F2] border border-[#E9E2D2] space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="font-heading font-medium text-sm text-[#14261E]">
              {order.productName}
            </span>
            <span className="font-mono font-medium text-xs bg-white px-2 py-0.5 rounded border border-[#E9E2D2]">
              {order.qty}x
            </span>
          </div>
          <p className="text-xs font-sans text-[#6F776F]">
            Mitra: <strong className="text-[#14261E] font-medium">{order.supplierName}</strong> · Rp {order.unitPrice.toLocaleString('id-ID')} / pcs
          </p>
        </div>

        {/* Pemesan & Unit */}
        <div className="border border-[#E9E2D2] rounded-xl p-3.5 space-y-2 text-xs">
          <div className="flex justify-between items-center text-[#6F776F]">
            <span>Pemesan:</span>
            <span className="font-sans font-medium text-[#14261E]">{order.customerName}</span>
          </div>
          <div className="flex justify-between items-center text-[#6F776F]">
            <span>Departemen:</span>
            <span className="font-sans text-[#14261E]">{order.department}</span>
          </div>
          <div className="flex justify-between items-center text-[#6F776F]">
            <span>Waktu Order:</span>
            <span className="font-sans text-[#14261E]">{order.time}</span>
          </div>
          <div className="flex justify-between items-center text-[#6F776F]">
            <span>Unit SAI:</span>
            <span className="font-mono font-medium text-[#1F5C45] bg-[#EAF5EF] px-2 py-0.5 rounded">
              {order.unit}
            </span>
          </div>
          <div className="border-t border-[#E9E2D2] pt-2 flex justify-between items-baseline">
            <span className="font-medium text-[#14261E]">Total Tagihan:</span>
            <span className="font-sans font-medium text-base text-[#1F5C45] tabular-nums">
              Rp {order.totalAmount.toLocaleString('id-ID')}
            </span>
          </div>
        </div>

        {/* Status & Footer Action */}
        <div className="flex items-center justify-between gap-3 pt-1">
          <div className="flex items-center gap-1.5 text-xs">
            {order.status === 'DITERIMA' ? (
              <span className="flex items-center gap-1 text-[#2E7D5B] font-medium">
                <CheckCircle2 size={14} /> Sudah Diterima
              </span>
            ) : (
              <span className="flex items-center gap-1 text-[#D97706] font-medium">
                <Clock size={14} /> Menunggu Kasir
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            {order.status === 'MENUNGGU' && onAcceptOrder && (
              <button
                type="button"
                onClick={() => {
                  onAcceptOrder(order.id);
                  onClose();
                }}
                className="h-9 px-4 rounded-xl bg-[#1F5C45] hover:bg-[#174736] text-white text-xs font-sans font-medium shadow-xs cursor-pointer transition-colors"
              >
                Terima Pesanan
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="h-9 px-4 rounded-xl border border-[#E9E2D2] hover:bg-[#FAF7F2] text-xs font-sans font-medium text-[#14261E] transition-colors cursor-pointer"
            >
              Tutup
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
