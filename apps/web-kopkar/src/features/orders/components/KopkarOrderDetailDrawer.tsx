import React from 'react';
import { SlideOverDrawer } from '../../../components/ui/SlideOverDrawer';
import type { KopkarOrder } from '../data/kopkarOrdersData';

interface KopkarOrderDetailDrawerProps {
  order: KopkarOrder | null;
  onClose: () => void;
}

export const KopkarOrderDetailDrawer: React.FC<KopkarOrderDetailDrawerProps> = ({
  order,
  onClose,
}) => {
  return (
    <SlideOverDrawer
      open={Boolean(order)}
      onClose={onClose}
      maxWidthClass="sm:max-w-[440px]"
      closeAriaLabel="Tutup detail pesanan"
      header={
        order && (
          <div>
            <span className="px-2.5 py-0.5 rounded-full bg-[#EAF4EE] text-[#165239] text-[11px] font-medium">
              {order.orderKind === 'PO' ? 'PO Katering' : 'Pesanan Same-Day'} · {order.unit}
            </span>
            <h3 className="text-[18px] font-semibold text-[#18221D] mt-1.5 tabular-nums">
              {order.invoiceNumber}
            </h3>
            <p className="text-[12px] text-[#7A867E] mt-0.5">
              {order.customerName} · {order.customerNik}
            </p>
          </div>
        )
      }
      footer={
        <div className="flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-[#165239] hover:bg-[#12422E] text-white text-[12.5px] font-medium cursor-pointer"
          >
            Tutup
          </button>
        </div>
      }
    >
      {order && (
        <div className="space-y-4">
          <div className="rounded-2xl border border-[#EAE4D3] bg-[#FAF8F2] p-4 space-y-2 text-[12.5px]">
            <div className="flex justify-between gap-2">
              <span className="text-[#7A867E]">Departemen</span>
              <span className="font-medium text-[#18221D]">{order.department}</span>
            </div>
            <div className="flex justify-between gap-2">
              <span className="text-[#7A867E]">Waktu &amp; Jadwal</span>
              <span className="font-medium text-[#18221D]">{order.createdAt}</span>
            </div>
            <div className="flex justify-between gap-2">
              <span className="text-[#7A867E]">Lokasi Serah</span>
              <span className="font-medium text-[#18221D] text-right">{order.deliveryLocationNote}</span>
            </div>
            <div className="flex justify-between gap-2">
              <span className="text-[#7A867E]">Token QR</span>
              <span className="font-mono font-semibold text-[#165239]">{order.qrCodeToken}</span>
            </div>
          </div>

          <div className="rounded-2xl border border-[#EAE4D3] bg-white p-4 space-y-2.5">
            <div className="text-[11px] font-semibold uppercase tracking-wider text-[#7A867E]">
              Rincian Item Pesanan
            </div>
            <div className="divide-y divide-[#F0EBDC]">
              {order.items.map((it) => (
                <div key={it.id} className="py-2 first:pt-0 last:pb-0 flex justify-between gap-2 text-[12.5px]">
                  <div>
                    <div className="font-semibold text-[#18221D]">
                      {it.quantity} × {it.name}
                    </div>
                    <div className="text-[11px] text-[#7A867E]">{it.supplierName}</div>
                    {it.note && <div className="text-[11px] text-[#B45309] italic">Catatan: {it.note}</div>}
                  </div>
                  <div className="font-semibold tabular-nums">
                    Rp {(it.price * it.quantity).toLocaleString('id-ID')}
                  </div>
                </div>
              ))}
            </div>
            <div className="pt-2.5 border-t border-[#F0EBDC] flex justify-between items-center">
              <span className="text-[12.5px] font-semibold">Total Pembayaran</span>
              <span className="text-[17px] font-bold text-[#165239] tabular-nums">
                Rp {order.totalAmount.toLocaleString('id-ID')}
              </span>
            </div>
          </div>
        </div>
      )}
    </SlideOverDrawer>
  );
};
