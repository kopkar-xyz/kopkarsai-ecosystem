import React from 'react';
import { X } from 'lucide-react';
import { Order } from '../../../types/order';

interface OrderReceiptModalProps {
  order: Order | null;
  onClose: () => void;
}

/**
 * OrderReceiptModal — E-Nota Digital & Tiket Pengambilan Mandiri (Sesuai Gambar 2, 3, 5)
 * Format presisi: Kanji 領収書, Tiket Pengambilan (font Okashi), QR Code, Pemesan, Items, & Total Lunas.
 * Budget: < 200 LOC.
 */
export const OrderReceiptModal: React.FC<OrderReceiptModalProps> = ({ order, onClose }) => {
  if (!order) return null;
  const formatPrice = (val: number) => 'Rp ' + val.toLocaleString('id-ID');

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-fadeIn select-none"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="w-full max-w-[380px] sm:max-w-[400px] bg-[#FFFDF9] border border-[#EAE3D5] rounded-3xl shadow-2xl p-5 sm:p-6 relative my-auto animate-scaleUp text-[#1A1615]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Tombol Tutup Bulat */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#F2ECE1] hover:bg-[#EAE3D5] flex items-center justify-center text-[#1A1615] transition-colors cursor-pointer border-none"
          aria-label="Tutup tiket"
        >
          <X className="w-4 h-4" />
        </button>

        {/* 1. Header Tiket (領収書 & Tiket Pengambilan) */}
        <div className="text-center pt-1 pb-3">
          <span className="font-kanji text-xs text-[#8C827A] tracking-wider block mb-0.5">領収書</span>
          <h2 className="font-brush text-2xl sm:text-[26px] font-bold text-[#83273B] tracking-tight leading-tight">
            Tiket pengambilan
          </h2>
          <span className="font-mono text-xs text-[#8C827A] mt-1 block">{order.invoiceNumber}</span>
        </div>

        {/* 2. QR Code Box */}
        <div className="flex flex-col items-center my-2">
          <div className="p-3.5 bg-white border border-[#EAE3D5] rounded-2xl shadow-2xs">
            <svg className="w-40 h-40" viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="160" height="160" fill="white" />
              {/* Finder Top-Left */}
              <rect x="12" y="12" width="36" height="36" rx="4" stroke="#1A1615" strokeWidth="6" />
              <rect x="22" y="22" width="16" height="16" rx="2" fill="#1A1615" />
              {/* Finder Top-Right */}
              <rect x="112" y="12" width="36" height="36" rx="4" stroke="#1A1615" strokeWidth="6" />
              <rect x="122" y="22" width="16" height="16" rx="2" fill="#1A1615" />
              {/* Finder Bottom-Left */}
              <rect x="12" y="112" width="36" height="36" rx="4" stroke="#1A1615" strokeWidth="6" />
              <rect x="22" y="122" width="16" height="16" rx="2" fill="#1A1615" />
              {/* QR Pattern Blocks */}
              <rect x="56" y="14" width="8" height="16" fill="#1A1615" />
              <rect x="72" y="14" width="16" height="8" fill="#1A1615" />
              <rect x="94" y="14" width="10" height="24" fill="#1A1615" />
              <rect x="56" y="38" width="24" height="8" fill="#1A1615" />
              <rect x="88" y="38" width="16" height="8" fill="#1A1615" />
              <rect x="14" y="56" width="32" height="8" fill="#1A1615" />
              <rect x="56" y="54" width="10" height="10" fill="#1A1615" />
              <rect x="74" y="54" width="14" height="20" fill="#1A1615" />
              <rect x="96" y="54" width="22" height="8" fill="#1A1615" />
              <rect x="126" y="54" width="20" height="14" fill="#1A1615" />
              <rect x="14" y="72" width="14" height="14" fill="#1A1615" />
              <rect x="36" y="72" width="12" height="14" fill="#1A1615" />
              <rect x="56" y="72" width="10" height="14" fill="#1A1615" />
              <rect x="96" y="70" width="12" height="16" fill="#1A1615" />
              <rect x="116" y="76" width="14" height="10" fill="#1A1615" />
              <rect x="138" y="76" width="8" height="18" fill="#1A1615" />
              <rect x="14" y="94" width="34" height="8" fill="#1A1615" />
              <rect x="56" y="94" width="20" height="10" fill="#1A1615" />
              <rect x="84" y="94" width="16" height="8" fill="#1A1615" />
              <rect x="108" y="94" width="20" height="10" fill="#1A1615" />
              <rect x="56" y="112" width="10" height="20" fill="#1A1615" />
              <rect x="74" y="112" width="20" height="8" fill="#1A1615" />
              <rect x="102" y="112" width="14" height="24" fill="#1A1615" />
              <rect x="124" y="112" width="22" height="8" fill="#1A1615" />
              <rect x="56" y="138" width="38" height="10" fill="#1A1615" />
              <rect x="124" y="128" width="12" height="20" fill="#1A1615" />
              <rect x="144" y="128" width="4" height="20" fill="#1A1615" />
            </svg>
          </div>
          <p className="text-xs text-[#665E60] text-center max-w-[280px] mt-3 leading-relaxed">
            Tunjukkan kode ini ke kasir atau petugas konter kantin Lantai 2 saat mengambil pesanan.
          </p>
        </div>

        {/* 3. Garis Putus-putus Pembatas */}
        <div className="border-b border-dashed border-[#DCD3C6] my-3.5" />

        {/* 4. Rincian Pemesan & Lokasi */}
        <div className="space-y-2 text-xs">
          <div className="flex items-baseline justify-between gap-2">
            <span className="text-[#8C827A]">Pemesan</span>
            <span className="font-semibold text-[#1A1615] text-right">{order.customerName}</span>
          </div>
          <div className="flex items-baseline justify-between gap-2">
            <span className="text-[#8C827A]">Metode serah</span>
            <span className="font-semibold text-[#83273B] text-right">
              {order.deliveryMethod === 'MEJA_KERJA' ? 'Antar ke meja kerja' : 'Ambil mandiri'}
            </span>
          </div>
          <div className="flex items-baseline justify-between gap-2">
            <span className="text-[#8C827A]">Lokasi</span>
            <span className="font-semibold text-[#1A1615] text-right max-w-[240px] truncate">
              {order.deliveryLocationNote || 'Counter Lantai 2'}
            </span>
          </div>
        </div>

        {/* 5. Garis Putus-putus Pembatas */}
        <div className="border-b border-dashed border-[#DCD3C6] my-3.5" />

        {/* 6. Daftar Item Pesanan */}
        <div className="space-y-2.5">
          {order.items.map((item) => (
            <div key={item.id} className="flex items-start justify-between gap-2 text-xs">
              <div className="flex items-start gap-2.5 min-w-0">
                <span className="inline-flex items-center justify-center min-w-[26px] h-5 px-1 rounded-md bg-[#F2ECE1] border border-[#E0D5C5] text-[10px] font-bold text-[#1A1615] shrink-0 mt-0.5">
                  {item.quantity}×
                </span>
                <div className="min-w-0">
                  <span className="font-semibold text-xs text-[#1A1615] block truncate">{item.name}</span>
                  <span className="text-[11px] text-[#8C827A] block">{formatPrice(item.price)} per pcs</span>
                  {item.note && <span className="text-[10px] text-[#8C827A] italic block mt-0.5">Catatan: {item.note}</span>}
                </div>
              </div>
              <span className="font-medium text-xs text-[#1A1615] tabular-nums shrink-0 pt-0.5">
                {formatPrice(item.price * item.quantity)}
              </span>
            </div>
          ))}
        </div>

        {/* 7. Total Lunas & Tombol Selesai */}
        <div className="flex items-center justify-between pt-4 pb-4">
          <span className="text-xs font-bold text-[#1A1615]">Total lunas</span>
          <span className="font-brush text-2xl font-bold text-[#83273B] leading-none">
            {formatPrice(order.totalAmount)}
          </span>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="w-full py-3 rounded-xl bg-[#83273B] hover:bg-[#6e1e2f] active:scale-98 text-white font-semibold text-xs transition-all cursor-pointer shadow-xs border-none"
        >
          Selesai & tutup
        </button>
      </div>
    </div>
  );
};
