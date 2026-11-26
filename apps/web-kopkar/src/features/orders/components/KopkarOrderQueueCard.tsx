import React, { useState } from 'react';
import { Check, Eye, Flame } from 'lucide-react';
import type { KopkarOrder, KopkarOrderItem } from '../data/kopkarOrdersData';

interface KopkarOrderQueueCardProps {
  order: KopkarOrder;
  canCashierAct: boolean;
  canSupplierConfirmPo: boolean;
  onToggleItemCheck: (orderId: string, itemId: string) => void;
  onUpdateStatus: (orderId: string, status: KopkarOrder['status']) => void;
  onOpenSubstitution: (orderId: string, item: KopkarOrderItem) => void;
  onSupplierConfirmPo: (orderId: string, confirmed: boolean, reason?: string) => void;
  onViewDetail: (order: KopkarOrder) => void;
}

const PAYMENT_LABELS: Record<KopkarOrder['paymentMethod'], string> = {
  PAYROLL_DEDUCTION: 'Potong Gaji',
  QRIS_MANDIRI: 'QRIS Mandiri',
  TRANSFER_MANDIRI: 'Transfer Bank',
};

export const KopkarOrderQueueCard: React.FC<KopkarOrderQueueCardProps> = ({
  order,
  canCashierAct,
  canSupplierConfirmPo,
  onToggleItemCheck,
  onUpdateStatus,
  onOpenSubstitution,
  onSupplierConfirmPo,
  onViewDetail,
}) => {
  const [rejecting, setRejecting] = useState(false);
  const [rejectReason, setRejectReason] = useState('');

  const checkedCount = order.items.filter((i) => i.isChecked).length;
  const totalItems = order.items.length;
  const allChecked = totalItems > 0 && checkedCount === totalItems;
  const isPoAwaitingSupplier =
    order.orderKind === 'PO' && order.supplierPoStatus !== 'CONFIRMED';

  const statusPill =
    order.status === 'SELESAI'
      ? { label: 'Selesai', cls: 'bg-[#EAF4EE] text-[#15803D]' }
      : order.status === 'SIAP_DIAMBIL'
        ? { label: 'Siap diambil', cls: 'bg-[#DCFCE7] text-[#166534]' }
        : order.orderKind === 'PO'
          ? order.supplierPoStatus === 'DECLINED'
            ? { label: 'Supplier Berhalangan', cls: 'bg-[#FEE2E2] text-[#B91C1C] border border-[#FCA5A5]' }
            : order.supplierPoStatus === 'CONFIRMED'
              ? { label: 'Disanggupi Supplier', cls: 'bg-[#EFF6FF] text-[#1D4ED8] border border-[#BFDBFE]' }
              : { label: 'Menunggu Konfirmasi Supplier', cls: 'bg-[#FEF3C7] text-[#B45309] border border-[#F3E5BE]' }
          : { label: 'Menunggu', cls: 'bg-[#FEF3C7] text-[#B45309] border border-[#F3E5BE]' };

  return (
    <article
      className={`rounded-2xl border p-3.5 sm:p-5 space-y-3 sm:space-y-3.5 shadow-2xs select-none ${
        order.isGaPriority && order.status !== 'SELESAI'
          ? 'bg-white border-[#E5A812]/70 ring-1 ring-[#E5A812]/15'
          : 'bg-white border-[#EAE4D3]'
      }`}
    >
      {/* 1. Header Invoice + GA Priority + Jenis Pill + Status */}
      <div className="space-y-1">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="font-medium text-[14px] sm:text-[15px] text-[#18221D] tabular-nums">
              {order.invoiceNumber}
            </span>
            {order.isGaPriority && (
              <span className="px-2 py-0.5 rounded-md bg-[#FEF3C7] border border-[#F59E0B]/30 text-[#B45309] text-[10.5px] font-medium inline-flex items-center gap-1">
                <Flame className="w-3 h-3" />
                <span>GA Priority</span>
              </span>
            )}
            <span className="px-2 py-0.5 rounded-md bg-[#FAF8F2] border border-[#EAE4D3] text-[#526058] text-[10.5px] font-normal">
              {order.orderKind === 'PO' ? 'Katering PO' : 'Same-Day'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {order.gaDeadline && order.status !== 'SELESAI' && (
              <span className="text-[11.5px] font-normal text-[#7A867E] tabular-nums">
                {order.gaDeadline}
              </span>
            )}
            <span className={`px-2.5 py-0.5 rounded-lg text-[11.5px] font-medium ${statusPill.cls}`}>
              {statusPill.label}
            </span>
          </div>
        </div>

        <div className="text-[13px] font-medium text-[#18221D]">
          {order.customerName}{' '}
          <span className="font-normal text-[#7A867E]">· {order.unit}</span>
        </div>
        <p className="text-[11.5px] text-[#7A867E]">
          {order.createdAt} · {order.deliveryLocationNote}
        </p>
        {order.orderKind === 'PO' && order.supplierPoStatus === 'DECLINED' && (
          <div className="mt-1.5 px-3 py-1.5 rounded-lg bg-[#FEF2F2] border border-[#FCA5A5]/60 text-[11.5px] text-[#B91C1C]">
            Alasan supplier: {order.supplierRejectReason || 'Berhalangan memenuhi PO'} · Hubungi pembeli untuk ganti menu atau refund.
          </div>
        )}
      </div>

      {/* 2. Inner Rounded Checklist Box (Sesuai Gambar Referensi) */}
      <div className="rounded-xl border border-[#EAE4D3] overflow-hidden">
        <div className="bg-white px-3.5 sm:px-4 py-3 divide-y divide-[#F0EBDC]">
          {order.items.map((it) => (
            <div
              key={it.id}
              className="py-2.5 first:pt-0 last:pb-0 flex items-center justify-between gap-3 text-xs"
            >
              <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 flex-1">
                {canCashierAct && order.status !== 'SELESAI' && (
                  <button
                    type="button"
                    disabled={isPoAwaitingSupplier}
                    onClick={() => !isPoAwaitingSupplier && onToggleItemCheck(order.id, it.id)}
                    title={
                      isPoAwaitingSupplier
                        ? 'Menunggu konfirmasi kesanggupan dari supplier terlebih dahulu'
                        : undefined
                    }
                    className={`w-5 h-5 rounded flex items-center justify-center transition-colors shrink-0 ${
                      isPoAwaitingSupplier
                        ? 'bg-[#F5F2EB] border border-[#DDD5C4] opacity-50 cursor-not-allowed'
                        : it.isChecked
                          ? 'bg-[#165239] text-white border border-[#165239] cursor-pointer'
                          : 'bg-white border border-[#C8BFB5] hover:border-[#165239] cursor-pointer'
                    }`}
                    aria-label={`Centang ${it.name}`}
                  >
                    {!isPoAwaitingSupplier && it.isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </button>
                )}

                {it.image && (
                  <img
                    src={it.image}
                    alt={it.name}
                    className="w-10 h-10 rounded-lg object-cover border border-[#EAE4D3] shrink-0"
                  />
                )}

              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="font-medium text-[#18221D] leading-snug line-clamp-2 sm:truncate">
                    {it.quantity} × {it.name}
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full font-medium bg-[#165239] text-white shrink-0">
                    {order.orderKind === 'PO' ? 'Katering PO' : 'Rak toko'}
                  </span>
                </div>
                <div className="text-[11px] text-[#7A867E] mt-0.5 tabular-nums truncate">
                  Rp {(it.price * it.quantity).toLocaleString('id-ID')} · {it.supplierName}
                </div>
                {it.note && (
                  <span className="text-[11px] text-[#7A867E] italic block line-clamp-2 sm:truncate">
                    Catatan: {it.note}
                  </span>
                )}
              </div>
            </div>

            {canCashierAct && order.status === 'MENUNGGU_CHECKLIST' && (
              <button
                type="button"
                onClick={() => onOpenSubstitution(order.id, it)}
                className="px-2 sm:px-2.5 py-1 rounded-lg text-[11px] sm:text-[11.5px] font-medium text-[#7A867E] hover:bg-[#FEF2F2] hover:text-[#B91C1C] transition-colors cursor-pointer shrink-0 whitespace-nowrap"
              >
                Stok habis?
              </button>
            )}
            </div>
          ))}
        </div>

        {/* Progress Bar Strip inside Inner Box */}
        <div className="bg-[#FAF8F2] px-3.5 sm:px-4 py-2.5 border-t border-[#EAE4D3] flex items-center justify-between gap-3 flex-wrap sm:flex-nowrap">
          <div className="flex items-center gap-2.5">
            <div className="w-20 h-1.5 bg-[#EAE4D3] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#165239] rounded-full transition-all duration-300"
                style={{ width: `${totalItems > 0 ? (checkedCount / totalItems) * 100 : 0}%` }}
              />
            </div>
            <span className="text-[11.5px] text-[#526058] font-medium tabular-nums">
              {checkedCount} dari {totalItems} item dicek
            </span>
          </div>

          <div className="flex items-center gap-2">
            {canSupplierConfirmPo && order.orderKind === 'PO' && order.supplierPoStatus === 'PENDING' && (
              <button
                type="button"
                onClick={() => onSupplierConfirmPo(order.id, true)}
                className="px-4 py-1.5 rounded-xl bg-[#165239] hover:bg-[#11402c] text-white text-[12px] font-medium cursor-pointer inline-flex items-center gap-1"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Sanggup</span>
              </button>
            )}

            {canCashierAct && order.status === 'MENUNGGU_CHECKLIST' && (
              <button
                type="button"
                disabled={!allChecked || isPoAwaitingSupplier}
                onClick={() => !isPoAwaitingSupplier && onUpdateStatus(order.id, 'SIAP_DIAMBIL')}
                className={`px-4 py-1.5 rounded-xl text-[12px] font-medium transition-all ${
                  allChecked && !isPoAwaitingSupplier
                    ? 'bg-[#165239] hover:bg-[#11402c] text-white cursor-pointer'
                    : 'bg-[#D7E2DD] text-[#6B7E75] cursor-not-allowed'
                }`}
              >
                {isPoAwaitingSupplier
                  ? order.supplierPoStatus === 'DECLINED'
                    ? 'Ditolak Supplier'
                    : 'Menunggu Supplier'
                  : 'Siap diambil'}
              </button>
            )}

            {canCashierAct && order.status === 'SIAP_DIAMBIL' && (
              <button
                type="button"
                onClick={() => onUpdateStatus(order.id, 'SELESAI')}
                className="px-4 py-1.5 rounded-xl bg-[#165239] hover:bg-[#11402c] text-white text-[12px] font-medium cursor-pointer"
              >
                Serahkan pesanan
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 3. Card Footer: Total & Detail / Berhalangan */}
      <div className="flex flex-wrap items-center justify-between gap-2 pt-0.5">
        <div className="flex items-baseline gap-2">
          <span className="text-[12px] text-[#7A867E]">Total:</span>
          <span className="text-[15px] sm:text-[16px] font-medium text-[#165239] tabular-nums">
            Rp {order.totalAmount.toLocaleString('id-ID')}
          </span>
          <span className="text-[11.5px] text-[#7A867E]">
            · {order.orderKind === 'PO' ? 'Cut-off 15:00 WIB' : PAYMENT_LABELS[order.paymentMethod]}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {canSupplierConfirmPo && order.orderKind === 'PO' && order.supplierPoStatus === 'PENDING' && (
            <button
              type="button"
              onClick={() => setRejecting((v) => !v)}
              className="px-3.5 py-1.5 rounded-xl border border-[#FCA5A5] text-[#B91C1C] hover:bg-[#FEF2F2] text-[12px] font-medium cursor-pointer"
            >
              Berhalangan
            </button>
          )}
          <button
            type="button"
            onClick={() => onViewDetail(order)}
            className="px-3.5 py-1.5 rounded-xl border border-[#EAE4D3] bg-white hover:bg-[#FAF8F2] text-[#18221D] text-[12px] font-medium inline-flex items-center gap-1.5 cursor-pointer transition-colors"
          >
            <Eye className="w-3.5 h-3.5 text-[#526058]" />
            <span>Detail</span>
          </button>
        </div>
      </div>

      {rejecting && (
        <div className="p-3 rounded-xl bg-[#FEF2F2] border border-[#FCA5A5]/40 flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            value={rejectReason}
            onChange={(e) => setRejectReason(e.target.value)}
            placeholder="Alasan tidak dapat memenuhi PO..."
            className="flex-1 px-3 py-1.5 rounded-xl bg-white border border-[#FCA5A5] text-xs"
          />
          <button
            type="button"
            onClick={() => {
              onSupplierConfirmPo(order.id, false, rejectReason || 'Kuota penuh');
              setRejecting(false);
            }}
            className="px-3.5 py-1.5 rounded-xl bg-[#B91C1C] text-white text-xs font-semibold cursor-pointer"
          >
            Kirim Alasan
          </button>
        </div>
      )}
    </article>
  );
};
