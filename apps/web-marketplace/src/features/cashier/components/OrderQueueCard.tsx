import React from 'react';
import { Check } from 'lucide-react';
import { Order, OrderItem } from '../../../types/order';

interface OrderQueueCardProps {
  order: Order;
  onToggleItemCheck: (orderId: string, itemId: string) => void;
  onUpdateStatus: (orderId: string, newStatus: Order['status']) => void;
  onOpenSubstitution: (orderId: string, item: OrderItem) => void;
}

/**
 * OrderQueueCard — Kartu Antrean & Checklist Rak Per Order
 * Desain presisi sesuai media_1795502654008_53b1a1ba.png. Budget: < 200 LOC.
 */
export const OrderQueueCard: React.FC<OrderQueueCardProps> = ({
  order,
  onToggleItemCheck,
  onUpdateStatus,
  onOpenSubstitution,
}) => {
  const checkedCount = order.items.filter((i) => i.isChecked).length;
  const totalItems = order.items.length;
  const allChecked = checkedCount === totalItems;

  return (
    <article className="bg-white border border-[#EAE3D5] rounded-2xl overflow-hidden shadow-2xs select-none">
      {/* 1. Header Invoice, Nama & Batas Jam */}
      <div className="p-4 sm:p-5 pb-3 space-y-1">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="font-bold text-sm sm:text-base text-[#1A1615]">{order.invoiceNumber}</span>
            {order.isGaPriority && (
              <span className="px-2 py-0.5 rounded-md bg-[#E5A812] text-white text-[10px] font-bold">
                GA Priority
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            {order.isGaPriority && (
              <span className="text-xs font-semibold text-[#8C827A]">Batas 09:30 WIB</span>
            )}
            <span className={`px-2.5 py-1 rounded-lg text-xs font-medium ${
              order.status === 'SIAP_DIAMBIL'
                ? 'bg-[#DCFCE7] text-[#166534]'
                : 'bg-[#FBF3E0] text-[#8C6415] border border-[#F3E5BE]'
            }`}>
              {order.status === 'SIAP_DIAMBIL' ? 'Siap diambil' : 'Menunggu checklist'}
            </span>
          </div>
        </div>

        <h3 className="font-semibold text-xs sm:text-sm text-[#1A1615] pt-0.5">{order.customerName}</h3>
        <p className="text-xs text-[#7A716B]">
          {order.createdAt}, {order.deliveryLocationNote}
        </p>
      </div>

      {/* 2. Items Checklist Rows */}
      <div className="px-4 sm:px-5 py-3 border-t border-[#EAE3D5] divide-y divide-[#EAE3D5]/60">
        {order.items.map((it) => (
          <div key={it.id} className="py-2.5 first:pt-0 last:pb-0 flex items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 flex-1">
              <button
                type="button"
                onClick={() => onToggleItemCheck(order.id, it.id)}
                className={`w-5 h-5 rounded flex items-center justify-center transition-colors cursor-pointer shrink-0 ${
                  it.isChecked
                    ? 'bg-[#83273B] text-white border border-[#83273B]'
                    : 'bg-white border border-[#C8BFB5] hover:border-[#83273B]'
                }`}
                aria-label={`Centang ${it.name}`}
              >
                {it.isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
              </button>

              <img src={it.image} alt={it.name} className="w-10 h-10 rounded-lg object-cover border border-[#EAE3D5] shrink-0" />

              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="font-bold text-[#1A1615] truncate">{it.quantity} × {it.name}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold bg-[#2E6B4F] text-white shrink-0">
                    {it.deliveryType === 'PO_H1' ? 'Katering PO' : 'Rak toko'}
                  </span>
                </div>
                <span className="text-[11px] text-[#7A716B] block mt-0.5">
                  Rp {(it.price * it.quantity).toLocaleString('id-ID')}
                </span>
                {it.note && <span className="text-[11px] text-[#7A716B] italic block truncate">Catatan: {it.note}</span>}
              </div>
            </div>

            <button
              type="button"
              onClick={() => onOpenSubstitution(order.id, it)}
              className="text-xs font-medium text-[#7A716B] hover:text-[#83273B] cursor-pointer shrink-0"
            >
              Stok habis?
            </button>
          </div>
        ))}
      </div>

      {/* 3. Footer Checklist Progress & Action Button (Beige Strip) */}
      <div className="bg-[#FAF6F0] px-4 sm:px-5 py-3 border-t border-[#EAE3D5] flex items-center justify-between gap-3 flex-wrap sm:flex-nowrap">
        <div className="flex items-center gap-2.5">
          <div className="w-16 sm:w-20 h-1.5 bg-[#EAE3D5] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#2E6B4F] rounded-full transition-all duration-300"
              style={{ width: `${totalItems > 0 ? (checkedCount / totalItems) * 100 : 0}%` }}
            />
          </div>
          <span className="text-xs text-[#665E60] font-medium">
            {checkedCount} dari {totalItems} item dicek
          </span>
        </div>

        {order.status === 'MENUNGGU_CHECKLIST' ? (
          <button
            type="button"
            disabled={!allChecked}
            onClick={() => onUpdateStatus(order.id, 'SIAP_DIAMBIL')}
            className={`px-5 py-2 rounded-xl text-xs font-semibold shadow-2xs transition-all ${
              allChecked
                ? 'bg-[#83273B] hover:bg-[#6e1e2f] active:scale-98 text-white cursor-pointer'
                : 'bg-[#B59A9F] text-white cursor-not-allowed opacity-80'
            }`}
          >
            Siap diambil
          </button>
        ) : (
          <button
            type="button"
            onClick={() => onUpdateStatus(order.id, 'SELESAI')}
            className="px-5 py-2 rounded-xl bg-[#2E6B4F] hover:bg-[#23533D] active:scale-98 text-white text-xs font-semibold shadow-2xs cursor-pointer"
          >
            Serahkan pesanan
          </button>
        )}
      </div>
    </article>
  );
};
