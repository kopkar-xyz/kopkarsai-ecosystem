import React, { useState } from 'react';
import { ChevronDown, Download } from 'lucide-react';
import { Order } from '../../../types/order';

interface SalesSummaryPanelProps {
  orders: Order[];
}

/**
 * SalesSummaryPanel — Rekapitulasi Penjualan & Ekspor Laporan (1:1 Sesuai Gambar 10)
 * Menampilkan metric Omzet Kotor, Bersih, Hak Supplier, Refund, dan tabel transaksi.
 * Budget: < 200 LOC.
 */
export const SalesSummaryPanel: React.FC<SalesSummaryPanelProps> = ({ orders }) => {
  const [period, setPeriod] = useState<'TODAY' | 'ALL'>('TODAY');
  const formatPrice = (val: number) => 'Rp ' + val.toLocaleString('id-ID');

  const completedOrders = orders.filter((o) => o.status === 'SELESAI');
  const grossRevenue = completedOrders.reduce((sum, o) => sum + o.totalAmount, 0);
  const supplierShare = completedOrders.reduce((sum, o) => {
    return sum + o.items.filter((i) => i.deliveryType === 'PO_H1').reduce((s, it) => s + it.price * it.quantity, 0);
  }, 0);
  const netRevenue = grossRevenue - supplierShare;
  const refundTotal = 0;

  const handleExportCSV = () => {
    const headers = ['Invoice', 'Waktu', 'Pembeli', 'Item', 'Bayar', 'Status dana', 'Total'];
    const rows = completedOrders.map((o) => [
      o.invoiceNumber.replace('INV/SAI/202611/', ''),
      `"${o.createdAt}"`,
      `"${o.customerName}"`,
      `"${o.items.map((i) => `${i.quantity}x ${i.name}`).join(', ')}"`,
      o.paymentMethod === 'PAYROLL_DEDUCTION' ? 'Potong Gaji' : 'Transfer Mandiri',
      'Lunas',
      o.totalAmount,
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const link = document.createElement('a');
    link.href = encodeURI(csvContent);
    link.download = `rekap_penjualan_${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-5 select-none">
      {/* 1. Header Rekap Penjualan & Top Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="font-brush text-2xl sm:text-3xl text-[#83273B] font-semibold leading-tight">Rekap penjualan</h1>
          <p className="text-xs text-[#665E60] mt-0.5">Hanya transaksi yang sudah diserahkan (selesai).</p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => setPeriod(period === 'TODAY' ? 'ALL' : 'TODAY')}
            className="h-10 px-3.5 bg-white border border-[#EAE3D5] rounded-xl text-xs font-semibold text-[#1A1615] flex items-center gap-2 hover:bg-[#FAF6F0] cursor-pointer shadow-2xs"
          >
            <span>{period === 'TODAY' ? 'Hari ini' : 'Semua periode'}</span>
            <ChevronDown className="w-3.5 h-3.5 text-[#8C827A]" />
          </button>

          <button
            type="button"
            onClick={handleExportCSV}
            className="h-10 px-4 rounded-xl border border-[#83273B] text-[#83273B] bg-white hover:bg-[#FAF6F0] text-xs font-semibold transition-all cursor-pointer shadow-2xs flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Ekspor laporan (.csv)</span>
          </button>
        </div>
      </div>

      {/* 2. Empat Metric Cards Grid (Sesuai Gambar 10) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white border border-[#EAE3D5] rounded-2xl p-4 sm:p-5 shadow-2xs">
          <span className="text-xs text-[#8C827A] block">Omzet kotor</span>
          <span className="font-bold text-2xl sm:text-3xl text-[#1A1615] block mt-1">{formatPrice(grossRevenue)}</span>
        </div>
        <div className="bg-white border border-[#EAE3D5] rounded-2xl p-4 sm:p-5 shadow-2xs">
          <span className="text-xs text-[#8C827A] block">Omzet bersih toko</span>
          <span className="font-bold text-2xl sm:text-3xl text-[#1A1615] block mt-1">{formatPrice(netRevenue)}</span>
        </div>
        <div className="bg-white border border-[#EAE3D5] rounded-2xl p-4 sm:p-5 shadow-2xs">
          <span className="text-xs text-[#8C827A] block">Hak supplier (PO)</span>
          <span className="font-bold text-2xl sm:text-3xl text-[#1A1615] block mt-1">{formatPrice(supplierShare)}</span>
        </div>
        <div className="bg-white border border-[#EAE3D5] rounded-2xl p-4 sm:p-5 shadow-2xs">
          <span className="text-xs text-[#8C827A] block">Refund</span>
          <span className="font-bold text-2xl sm:text-3xl text-[#1A1615] block mt-1">{formatPrice(refundTotal)}</span>
        </div>
      </div>

      {/* 3. Tabel Detail Rekap Transaksi Selesai (Sesuai Gambar 10) */}
      <div className="bg-white border border-[#EAE3D5] rounded-2xl overflow-hidden shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-white text-[#8C827A] font-semibold border-b border-[#EAE3D5]">
              <tr>
                <th className="py-3.5 px-4 font-normal">Invoice</th>
                <th className="py-3.5 px-4 font-normal">Waktu</th>
                <th className="py-3.5 px-4 font-normal">Pembeli</th>
                <th className="py-3.5 px-4 font-normal">Item</th>
                <th className="py-3.5 px-4 font-normal">Bayar</th>
                <th className="py-3.5 px-4 font-normal">Status dana</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EAE3D5]/60 text-[#1A1615]">
              {completedOrders.map((ord) => (
                <tr key={ord.id} className="hover:bg-[#FAF6F0]/50 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-medium">{ord.invoiceNumber.replace('INV/SAI/202611/', '')}</td>
                  <td className="py-3.5 px-4 text-[#665E60]">{ord.createdAt}</td>
                  <td className="py-3.5 px-4 font-medium">{ord.customerName}</td>
                  <td className="py-3.5 px-4 text-[#665E60]">
                    {ord.items.map((i) => `${i.quantity} × ${i.name}`).join(', ')}
                  </td>
                  <td className="py-3.5 px-4">
                    {ord.paymentMethod === 'PAYROLL_DEDUCTION' ? 'Potong Gaji' : 'Transfer Mandiri'}
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-[#2E6B4F]">Lunas</td>
                </tr>
              ))}
              {completedOrders.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-[#8C827A]">
                    Belum ada transaksi berstatus selesai pada periode ini.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
