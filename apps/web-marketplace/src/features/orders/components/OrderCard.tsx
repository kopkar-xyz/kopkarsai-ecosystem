import React from 'react';
import { Clock, QrCode, MapPin } from 'lucide-react';
import { Order, OrderStatus } from '../../../types/order';

interface OrderCardProps {
  order: Order;
  onViewReceipt: (order: Order) => void;
  onReorder?: (order: Order) => void;
}

const STATUS_PILL: Record<OrderStatus, { label: string; bg: string; text: string }> = {
  MENUNGGU_CHECKLIST: {
    label: 'Menunggu kasir',
    bg: 'bg-[#F4ECE1]',
    text: 'text-[#735A2B]',
  },
  SIAP_DIAMBIL: {
    label: 'Siap diambil',
    bg: 'bg-[#DCFCE7]',
    text: 'text-[#166534]',
  },
  SELESAI: {
    label: 'Selesai',
    bg: 'bg-[#F3F4F6]',
    text: 'text-[#4B5563]',
  },
  DIBATALKAN: {
    label: 'Dibatalkan',
    bg: 'bg-[#FDF0F3]',
    text: 'text-[#83273B]',
  },
};

/**
 * OrderCard — Kartu Riwayat Pesanan Konsumen (1:1 Sesuai Gambar 6)
 * Budget: < 200 LOC.
 */
export const OrderCard: React.FC<OrderCardProps> = ({ order, onViewReceipt, onReorder }) => {
  const statusCfg = STATUS_PILL[order.status];
  const formatPrice = (val: number) => 'Rp ' + val.toLocaleString('id-ID');

  return (
    <article className="bg-[#FFFDF9] border border-[#EAE3D5] rounded-2xl overflow-hidden shadow-2xs mb-4 select-none">
      {/* 1. Header Invoice, Priority, & Status Badge */}
      <div className="p-4 sm:p-5 pb-3 space-y-2">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center flex-wrap gap-2">
            <span className="font-semibold text-sm sm:text-base text-[#1A1615] tracking-tight">
              {order.invoiceNumber}
            </span>
            {order.isGaPriority && (
              <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-[#E5A812] text-white text-[10px] font-semibold">
                GA Priority
              </span>
            )}
          </div>
          <span className={`px-3 py-1 rounded-lg text-xs font-medium shrink-0 ${statusCfg.bg} ${statusCfg.text}`}>
            {statusCfg.label}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#665E60]">
          <span className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-[#8C827A]" />
            <span>{order.createdAt}</span>
          </span>
          <span className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-[#8C827A]" />
            <span>{order.deliveryLocationNote || 'Counter Lantai 2'}</span>
          </span>
        </div>
      </div>

      {/* 2. Divider & Product Items List */}
      <div className="px-4 sm:px-5 py-3 border-t border-[#EAE3D5] space-y-3">
        {order.items.map((item) => (
          <div key={item.id} className="flex items-start justify-between gap-3 text-xs">
            <div className="flex items-start gap-3 min-w-0">
              <img
                src={item.image}
                alt={item.name}
                className="w-11 h-11 rounded-xl object-cover bg-[#FAF6F0] border border-[#EAE3D5] shrink-0 mt-0.5"
              />
              <div className="min-w-0">
                <p className="font-semibold text-xs sm:text-sm text-[#1A1615] truncate">
                  {item.name}
                </p>
                <p className="text-[11px] text-[#8C827A] mt-0.5">
                  {item.quantity} × {formatPrice(item.price)}
                </p>
                {item.note && (
                  <p className="text-[11px] text-[#665E60] italic mt-0.5">
                    Catatan: {item.note}
                  </p>
                )}
              </div>
            </div>
            <span className="font-medium text-xs sm:text-sm text-[#1A1615] tabular-nums shrink-0 pt-0.5">
              {formatPrice(item.price * item.quantity)}
            </span>
          </div>
        ))}
      </div>

      {/* 3. Footer Strip: Total Pembayaran & Tombol E-Nota & QR */}
      <div className="bg-[#FAF6F0]/60 px-4 sm:px-5 py-3 border-t border-[#EAE3D5] flex items-center justify-between gap-3">
        <div>
          <span className="text-[11px] text-[#8C827A] block leading-tight">Total pembayaran</span>
          <span className="font-brush text-xl font-bold text-[#83273B] leading-tight">
            {formatPrice(order.totalAmount)}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {order.status === 'SELESAI' && onReorder && (
            <button
              type="button"
              onClick={() => onReorder(order)}
              className="px-3.5 py-2 rounded-xl border border-[#EAE3D5] bg-white hover:bg-[#FAF6F0] text-[#1A1615] text-xs font-semibold transition-all cursor-pointer shadow-2xs"
            >
              Pesan lagi
            </button>
          )}

          <button
            type="button"
            onClick={() => onViewReceipt(order)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-[#83273B] text-[#83273B] bg-white hover:bg-[#FAF6F0] text-xs font-semibold active:scale-95 transition-all cursor-pointer shadow-2xs"
          >
            <QrCode className="w-3.5 h-3.5" />
            <span>E-Nota & QR</span>
          </button>
        </div>
      </div>
    </article>
  );
};
