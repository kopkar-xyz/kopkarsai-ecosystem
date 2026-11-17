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
 * Slicing 1:1 sesuai template kanonikal kopkar-sai-beranda (1).html.
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
    <div className={`rounded-2xl bg-white border border-[#E9E2D2] p-5 shadow-xs flex flex-col justify-between h-full ${className}`}>
      {/* Header: Judul, Status Live & Tombol Aksi */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div>
          <div className="flex items-center gap-2.5">
            <h2 className="text-lg sm:text-[22px] font-heading font-medium text-[#14261E] leading-snug">
              Pesanan masuk
            </h2>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-sans font-medium bg-[#E4F3EA] text-[#1E7A4F]">
              <span className="w-[7px] h-[7px] rounded-full bg-[#1E7A4F] animate-pulse" />
              Live
            </span>
          </div>
          <p className="text-[13px] font-sans text-[#6F776F] mt-0.5">
            Pesanan terbaru dari anggota, perlu diproses
          </p>
        </div>

        <button
          type="button"
          onClick={() => navigate('/orders')}
          className="h-8 px-3 rounded-[10px] border border-[#E9E2D2] text-[13px] font-heading font-medium text-[#14261E] bg-white hover:bg-[#F8F4EC] transition-colors cursor-pointer"
        >
          Lihat semua
        </button>
      </div>

      {/* Table Antrean Pesanan */}
      <div className="overflow-x-auto scrollbar-thin flex-1 flex flex-col justify-between">
        <table className="w-full text-left border-collapse min-w-[560px]">
          <thead>
            <tr className="bg-[#F2EBDC]">
              <th className="rounded-l-[10px] py-2.5 px-3 text-left text-[13px] font-heading font-medium text-[#6F776F]">Anggota</th>
              <th className="py-2.5 px-3 text-left text-[13px] font-heading font-medium text-[#6F776F]">Pesanan</th>
              <th className="py-2.5 px-3 text-left text-[13px] font-heading font-medium text-[#6F776F]">Total</th>
              <th className="py-2.5 px-3 text-left text-[13px] font-heading font-medium text-[#6F776F]">Status</th>
              <th className="rounded-r-[10px] py-2.5 px-3 text-right text-[13px] font-heading font-medium text-[#6F776F]">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((ord, idx) => {
              const isLast = idx === orders.length - 1;
              return (
                <tr key={ord.id} className="hover:bg-[#F8F4EC]/60 transition-colors">
                  <td className={`py-3.5 px-3 align-middle ${isLast ? 'border-b-0' : 'border-b border-[#E9E2D2]'}`}>
                    <div className="flex items-center gap-2.5">
                      <div className="w-[34px] h-[34px] rounded-full bg-[#E3EEE7] text-[#1F5C45] text-xs font-heading font-semibold flex items-center justify-center flex-none">
                        {ord.initials}
                      </div>
                      <div className="min-w-0">
                        <b className="text-[13px] font-heading font-medium text-[#14261E] leading-[1.3] block truncate">{ord.name}</b>
                        <span className="text-xs font-sans text-[#6F776F] block leading-tight">{ord.department}</span>
                        <span className="text-xs font-sans text-[#6F776F] block leading-tight">{ord.timeAgo}</span>
                      </div>
                    </div>
                  </td>
                  <td className={`py-3.5 px-3 align-middle max-w-[280px] ${isLast ? 'border-b-0' : 'border-b border-[#E9E2D2]'}`}>
                    <p className="text-[13px] font-sans text-[#14261E] truncate leading-normal">{ord.itemsSummary}</p>
                    <span className="text-xs font-sans text-[#6F776F] block mt-0.5">{ord.itemCount} item</span>
                  </td>
                  <td className={`py-3.5 px-3 align-middle text-[13px] font-sans font-medium text-[#14261E] tabular-nums whitespace-nowrap ${isLast ? 'border-b-0' : 'border-b border-[#E9E2D2]'}`}>
                    {ord.totalAmount}
                  </td>
                  <td className={`py-3.5 px-3 align-middle ${isLast ? 'border-b-0' : 'border-b border-[#E9E2D2]'}`}>
                    <span className={`inline-block text-xs font-heading font-medium px-2.5 py-0.5 rounded-full whitespace-nowrap ${
                      ord.status === 'Baru' ? 'bg-[#E8590C]/16 text-[#E8590C]' :
                      ord.status === 'Diproses' ? 'bg-[#2F5BEA]/14 text-[#2F5BEA]' : 'bg-[#E4F3EA] text-[#1E7A4F]'
                    }`}>
                      {ord.status}
                    </span>
                  </td>
                  <td className={`py-3.5 px-3 align-middle text-right ${isLast ? 'border-b-0' : 'border-b border-[#E9E2D2]'}`}>
                    {ord.status === 'Baru' ? (
                      <button
                        type="button"
                        onClick={() => handleAcceptOrder(ord.id)}
                        className="h-8 px-3.5 rounded-[10px] bg-[#1F5C45] hover:bg-[#174736] text-white text-[13px] font-heading font-medium transition-colors cursor-pointer border border-[#1F5C45]"
                      >
                        Terima
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => navigate('/orders')}
                        className="h-8 px-3.5 rounded-[10px] border border-[#E9E2D2] hover:bg-[#F8F4EC] text-[#14261E] text-[13px] font-heading font-medium transition-colors cursor-pointer bg-white"
                      >
                        Lihat
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
