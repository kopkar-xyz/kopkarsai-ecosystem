import React, { useState } from 'react';
import { UtensilsCrossed } from 'lucide-react';
import { formatRupiah } from '../../../lib/kopkarsaiFormatters';

export interface PreOrderData {
  id: string;
  menuName: string;
  customerName: string;
  customerNote: string;
  qty: number;
  totalPrice: number;
  deliveryTime: string;
  deliveryDate: string;
  status: 'PENDING' | 'CONFIRMED' | 'DECLINED';
}

interface OrdersPreOrderCardProps {
  items: PreOrderData[];
  onConfirm: (id: string, isConfirmed: boolean) => void;
}

export const OrdersPreOrderCard: React.FC<OrdersPreOrderCardProps> = ({
  items,
  onConfirm,
}) => {
  const [rejectingId, setRejectingId] = useState<string | null>(null);
  const [rejectReason, setRejectReason] = useState('');

  const pendingCount = items.filter((i) => i.status === 'PENDING').length;

  const handleConfirmReject = (id: string) => {
    onConfirm(id, false);
    setRejectingId(null);
    setRejectReason('');
  };

  return (
    <section className="bg-white rounded-2xl border border-[#EAE4D3] p-4 sm:p-6 shadow-xs select-none">
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#F0EBDC]">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#EAF4EE] text-[#1F5B45] flex items-center justify-center shrink-0">
            <UtensilsCrossed className="w-[18px] h-[18px]" />
          </div>
          <div>
            <h2 className="font-okashi text-[19px] text-[#18221D]">
              PO katering untuk besok
            </h2>
            <p className="text-[12px] text-[#7A867E] font-sans">
              Konfirmasi kesanggupan sebelum pukul 15:00 WIB
            </p>
          </div>
        </div>

        <div className="text-[12.5px] font-medium text-[#B45309] tabular-nums font-sans">
          {pendingCount > 0 ? `${pendingCount} perlu konfirmasi` : 'Semua PO terkonfirmasi'}
        </div>
      </div>

      {items.length === 0 ? (
        <div className="py-8 text-center text-[13px] text-[#7A867E] font-sans">
          Tidak ada antrean PO katering H-1 pada tanggal ini.
        </div>
      ) : (
        <div className="divide-y divide-[#F0EBDC]">
          {items.map((po) => (
            <div key={po.id} className="py-4 font-sans">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="min-w-0">
                  <div className="font-semibold text-[14.5px] text-[#18221D]">
                    {po.menuName}
                  </div>
                  <div className="text-[12px] text-[#7A867E] mt-0.5 tabular-nums">
                    {po.customerName} · {po.customerNote} · {po.id}
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between md:justify-end gap-4 sm:gap-7 w-full md:w-auto">
                  <div className="text-left md:text-right">
                    <div className="font-okashi text-[18px] text-[#18221D] tabular-nums">
                      {po.qty}{' '}
                      <span className="font-geist text-[12px] font-normal text-[#526058]">
                        porsi
                      </span>
                    </div>
                    <div className="text-[11.5px] text-[#7A867E] tabular-nums">
                      {formatRupiah(po.totalPrice)}
                    </div>
                  </div>

                  <div className="text-left md:text-right">
                    <div className="text-[13px] font-medium text-[#18221D] tabular-nums">
                      Antar {po.deliveryTime}
                    </div>
                    <div className="text-[11.5px] text-[#7A867E]">
                      {po.deliveryDate}
                    </div>
                  </div>

                  {po.status === 'PENDING' ? (
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setRejectingId(po.id)}
                        className="px-3.5 py-2 rounded-xl border border-[#FCA5A5] text-[#B91C1C] hover:bg-[#FEF2F2] text-[12.5px] font-medium transition-colors cursor-pointer whitespace-nowrap"
                      >
                        Berhalangan
                      </button>
                      <button
                        type="button"
                        onClick={() => onConfirm(po.id, true)}
                        className="px-4 py-2 rounded-xl bg-[#1F5B45] hover:bg-[#174736] text-white text-[12.5px] font-medium transition-colors cursor-pointer whitespace-nowrap shadow-xs"
                      >
                        Sanggup
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2.5">
                      <span
                        className={`px-3 py-1 rounded-lg text-[12px] font-medium ${
                          po.status === 'CONFIRMED'
                            ? 'bg-[#EAF4EE] text-[#15803D]'
                            : 'bg-[#FEF2F2] text-[#B91C1C]'
                        }`}
                      >
                        {po.status === 'CONFIRMED' ? 'Disanggupi' : 'Berhalangan'}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {rejectingId === po.id && (
                <div className="mt-3 p-3 rounded-xl bg-[#FAF7EE] border border-[#EAE4D3] flex flex-wrap items-center gap-2">
                  <input
                    type="text"
                    value={rejectReason}
                    onChange={(e) => setRejectReason(e.target.value)}
                    placeholder="Alasan singkat (mis. kapasitas dapur penuh)"
                    className="flex-1 min-w-0 w-full sm:w-auto sm:min-w-[200px] bg-white border border-[#EAE4D3] rounded-lg px-3 py-1.5 text-[12.5px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1F5B45]"
                  />
                  <button
                    type="button"
                    onClick={() => setRejectingId(null)}
                    className="px-3 py-1.5 rounded-lg border border-[#EAE4D3] text-[12px] text-[#526058] bg-white cursor-pointer"
                  >
                    Batal
                  </button>
                  <button
                    type="button"
                    onClick={() => handleConfirmReject(po.id)}
                    className="px-3 py-1.5 rounded-lg bg-[#B91C1C] text-white text-[12px] font-medium cursor-pointer"
                  >
                    Konfirmasi
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
};
