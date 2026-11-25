import React from 'react';
import { X, ArrowLeft } from 'lucide-react';
import { Order } from '../../../types/order';

interface OrderHandoverModalContentProps {
  order: Order;
  onBack: () => void;
  onClose: () => void;
  onConfirm: () => void;
}

/**
 * OrderHandoverModalContent — Layar Konfirmasi Serah Terima Pesanan
 * Tepat sesuai media_1795503724066_3793511a.png. Budget: < 200 LOC.
 */
export const OrderHandoverModalContent: React.FC<OrderHandoverModalContentProps> = ({
  order,
  onBack,
  onClose,
  onConfirm,
}) => {
  return (
    <div className="space-y-3.5">
      {/* Top Bar: Back & Close */}
      <div className="flex items-center justify-between pb-0.5">
        <button
          type="button"
          onClick={onBack}
          className="text-xs text-[#665E60] hover:text-[#83273B] flex items-center gap-1 cursor-pointer font-medium"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Cari invoice lain</span>
        </button>
        <button
          type="button"
          onClick={onClose}
          className="w-8 h-8 rounded-full bg-[#FAF6F0] hover:bg-[#EAE3D5] border border-[#EAE3D5] flex items-center justify-center text-[#1A1615] cursor-pointer transition-colors"
          aria-label="Tutup"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Header Info */}
      <div>
        <h2 className="font-brush text-2xl sm:text-3xl text-[#83273B] font-semibold leading-tight">
          Serah terima pesanan
        </h2>
        <p className="text-xs font-semibold text-[#8C827A] mt-0.5">
          {order.invoiceNumber}
        </p>
      </div>

      {/* 3 Detail Info Rows */}
      <div className="space-y-1.5 text-xs text-[#665E60] pt-1">
        <div className="flex justify-between">
          <span>Pemesan</span>
          <span className="font-semibold text-[#1A1615]">{order.customerName}</span>
        </div>
        <div className="flex justify-between">
          <span>Metode</span>
          <span className="font-semibold text-[#1A1615]">
            {order.deliveryMethod === 'MEJA_KERJA' ? 'Antar ke meja' : 'Ambil mandiri'}
          </span>
        </div>
        <div className="flex justify-between">
          <span>Lokasi</span>
          <span className="font-semibold text-[#1A1615]">
            {order.deliveryLocationNote || 'Counter Lantai 2'}
          </span>
        </div>
      </div>

      {/* Dashed Divider & Items List */}
      <div className="border-t border-dashed border-[#EAE3D5] pt-3 space-y-2">
        {order.items.map((it) => (
          <div key={it.id} className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-lg bg-[#FAF6F0] border border-[#EAE3D5] text-[11px] font-bold text-[#1A1615]">
                {it.quantity}×
              </span>
              <span className="font-semibold text-[#1A1615]">{it.name}</span>
            </div>
            <span className="font-semibold text-[#1A1615]">
              Rp {(it.price * it.quantity).toLocaleString('id-ID')}
            </span>
          </div>
        ))}
      </div>

      {/* Total Lunas */}
      <div className="pt-2 flex items-center justify-between">
        <span className="font-bold text-xs text-[#1A1615]">Total lunas</span>
        <span className="font-brush text-xl sm:text-2xl text-[#83273B] font-bold tabular-nums">
          Rp {order.totalAmount.toLocaleString('id-ID')}
        </span>
      </div>

      <p className="text-xs text-[#7A716B] leading-relaxed pt-1">
        Pastikan isi pesanan sesuai sebelum diserahkan.
      </p>

      {/* Tombol Konfirmasi */}
      <button
        type="button"
        onClick={onConfirm}
        className="w-full py-3 rounded-2xl bg-[#83273B] hover:bg-[#681E2E] active:scale-98 text-white text-xs font-bold shadow-xs cursor-pointer transition-all mt-2"
      >
        Konfirmasi serah terima
      </button>
    </div>
  );
};
