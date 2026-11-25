import React, { useState } from 'react';
import { useRouter } from '../../../app/router';

interface IncomingOrder {
  id: string;
  initials: string;
  name: string;
  department: string;
  timeAgo: string;
  itemsSummary: string;
  itemCount: number;
  totalAmount: string;
  status: 'Baru' | 'Diproses' | 'Selesai';
}

const INITIAL_INCOMING_ORDERS: IncomingOrder[] = [
  { id: 'ord-1', initials: 'RW', name: 'Rina Wulandari', department: 'Finance', timeAgo: '2 menit lalu', itemsSummary: '2× Nasi Kotak Ayam Bakar, 2× Es Teh Manis', itemCount: 4, totalAmount: 'Rp 60.000', status: 'Baru' },
  { id: 'ord-2', initials: 'BS', name: 'Budi Santoso', department: 'Production', timeAgo: '9 menit lalu', itemsSummary: '5× Snack Box Rapat', itemCount: 5, totalAmount: 'Rp 75.000', status: 'Baru' },
  { id: 'ord-3', initials: 'DL', name: 'Dewi Lestari', department: 'GA Unit B', timeAgo: '18 menit lalu', itemsSummary: '1× Roti Gandum, 1× Es Teh Manis', itemCount: 2, totalAmount: 'Rp 19.000', status: 'Diproses' },
  { id: 'ord-4', initials: 'AP', name: 'Agus Pranoto', department: 'Warehouse', timeAgo: '31 menit lalu', itemsSummary: '4× Nasi Kotak Ayam Bakar', itemCount: 4, totalAmount: 'Rp 100.000', status: 'Diproses' },
];

interface IncomingOrdersCardProps {
  className?: string;
}

/**
 * IncomingOrdersCard — Tabel Antrean Pesanan Masuk (Live)
 * Slicing 1:1 Presisi aistudio-src DashboardPage:
 * - Header: font-okashi text-[20px] text-[#18221D]
 * - Container: rounded-2xl border border-[#EAE4D3] bg-white p-5
 * - Table header: bg-[#F6F2E6] text-[12px] font-medium text-[#526058] rounded-l-xl / rounded-r-xl
 * - Text: font-semibold text-[#18221D] (Geist)
 * Budget: < 200 LOC.
 */
export const IncomingOrdersCard: React.FC<IncomingOrdersCardProps> = ({ className = '' }) => {
  const [orders, setOrders] = useState<IncomingOrder[]>(INITIAL_INCOMING_ORDERS);
  const { navigate } = useRouter();

  const handleAcceptOrder = (id: string) => {
    setOrders((prev) =>
      prev.map((ord) => (ord.id === id ? { ...ord, status: 'Diproses' } : ord))
    );
  };

  return (
    <div className={`rounded-2xl bg-white border border-[#EAE4D3] p-5 shadow-xs flex flex-col justify-between h-full select-none ${className}`}>
      {/* Header: Judul, Status Live & Tombol Aksi */}
      <div className="flex items-start justify-between gap-3 mb-3 pb-2 border-b border-[#F0EBDC]">
        <div>
          <div className="flex items-center gap-2.5">
            <h3 className="font-okashi text-[20px] text-[#18221D]">
              Pesanan masuk
            </h3>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-[#EAF4EE] text-[#15803D]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#15803D] animate-pulse" />
              Live
            </span>
          </div>
          <p className="text-[12px] text-[#7A867E] mt-0.5">
            Pesanan terbaru dari anggota, perlu diproses
          </p>
        </div>

        <button
          type="button"
          onClick={() => navigate('/orders')}
          className="px-3 py-1.5 rounded-xl border border-[#EAE4D3] text-[12.5px] font-medium text-[#18221D] bg-white hover:bg-[#FAF7EE] transition-colors cursor-pointer"
        >
          Lihat semua
        </button>
      </div>

      {/* Table Antrean Pesanan */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[540px]">
          <thead>
            <tr className="bg-[#F6F2E6] text-[12px] font-medium text-[#526058]">
              <th className="rounded-l-xl py-2.5 px-3">Anggota</th>
              <th className="py-2.5 px-3">Pesanan</th>
              <th className="py-2.5 px-3 text-right">Total</th>
              <th className="py-2.5 px-3 text-center">Status</th>
              <th className="rounded-r-xl py-2.5 px-3 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F0EBDC] text-[13px]">
            {orders.map((ord) => (
              <tr key={ord.id} className="hover:bg-[#FAF7EE]/75 transition-colors">
                <td className="py-3 px-3 align-middle">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-[#EAF4EE] text-[#165239] text-xs font-semibold flex items-center justify-center shrink-0">
                      {ord.initials}
                    </div>
                    <div className="min-w-0">
                      <div className="font-semibold text-[#18221D] truncate leading-tight">{ord.name}</div>
                      <div className="text-[11.5px] text-[#7A867E] mt-0.5 leading-tight">{ord.department} · {ord.timeAgo}</div>
                    </div>
                  </div>
                </td>
                <td className="py-3 px-3 align-middle max-w-[240px]">
                  <div className="font-medium text-[#18221D] truncate">{ord.itemsSummary}</div>
                  <span className="text-[11.5px] text-[#7A867E]">{ord.itemCount} item</span>
                </td>
                <td className="py-3 px-3 align-middle text-right font-semibold text-[#18221D] tabular-nums whitespace-nowrap">
                  {ord.totalAmount}
                </td>
                <td className="py-3 px-3 align-middle text-center whitespace-nowrap">
                  <span className={`inline-block text-[11px] font-medium px-2 py-0.5 rounded-md ${
                    ord.status === 'Baru' ? 'bg-[#FEF3C7] text-[#B45309]' :
                    ord.status === 'Diproses' ? 'bg-[#EFF6FF] text-[#1D4ED8]' : 'bg-[#EAF4EE] text-[#15803D]'
                  }`}>
                    {ord.status}
                  </span>
                </td>
                <td className="py-3 px-3 align-middle text-right whitespace-nowrap">
                  {ord.status === 'Baru' ? (
                    <button
                      type="button"
                      onClick={() => handleAcceptOrder(ord.id)}
                      className="px-3 py-1.5 rounded-lg bg-[#165239] hover:bg-[#11402c] text-white text-[12px] font-medium transition-colors cursor-pointer"
                    >
                      Terima
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => navigate('/orders')}
                      className="px-3 py-1.5 rounded-lg border border-[#EAE4D3] hover:bg-[#FAF7EE] text-[#18221D] text-[12px] font-medium transition-colors cursor-pointer bg-white"
                    >
                      Lihat
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
