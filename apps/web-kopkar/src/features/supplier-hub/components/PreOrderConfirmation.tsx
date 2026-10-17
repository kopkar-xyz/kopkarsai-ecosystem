import React, { useState } from 'react';
import { Check, X, Clock, FileDown, CheckCircle2, AlertTriangle } from 'lucide-react';
import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { StatusBadge } from '../../../components/ui/StatusBadge';
import { SupplierPOItem } from '../../../types';
import { formatCurrencyIDR } from '../../../lib/utils';

interface PreOrderConfirmationProps {
  onDownloadSlip?: () => void;
}

export const PreOrderConfirmation: React.FC<PreOrderConfirmationProps> = ({ onDownloadSlip }) => {
  const [poList, setPoList] = useState<SupplierPOItem[]>([
    {
      id: 'po-01',
      poNumber: 'PO-20261017-08',
      productName: 'Nasi Bakar Cakalang SAI Pedas Gurih',
      qty: 25,
      unit: 'Porsi',
      deliveryDate: 'Besok, 18 Okt (Shift A)',
      deliveryLocation: 'Kantin Karyawan SAI B',
      pricePerUnit: 18000,
      totalAmount: 450000,
      status: 'PENDING',
      orderType: 'PO_H1_CATERING',
    },
    {
      id: 'po-02',
      poNumber: 'PO-20261017-12',
      productName: 'Risoles Mayo Daging Asap Special',
      qty: 40,
      unit: 'Pcs',
      deliveryDate: 'Besok, 18 Okt (Shift B)',
      deliveryLocation: 'Etalase Koperasi SAI T',
      pricePerUnit: 5000,
      totalAmount: 200000,
      status: 'PENDING',
      orderType: 'PO_H1_CATERING',
    },
  ]);

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleUpdateStatus = (id: string, newStatus: 'ACCEPTED' | 'REJECTED') => {
    setPoList((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
    );

    const target = poList.find((p) => p.id === id);
    const msg =
      newStatus === 'ACCEPTED'
        ? `Status: Sanggup Penuhi pesanan ${target?.productName}`
        : `Status: Berhalangan untuk pesanan ${target?.productName}. Admin telah diberitahu.`;

    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const pendingCount = poList.filter((p) => p.status === 'PENDING').length;

  return (
    <div className="space-y-3">
      {/* Toast Feedback */}
      {toastMessage && (
        <div className="p-3 bg-kopkar-dock text-white rounded-2xl text-xs font-semibold flex items-center gap-2 shadow-lg animate-fade-in border border-emerald-700">
          <CheckCircle2 size={16} className="text-kopkar-gold shrink-0" />
          <span className="flex-1">{toastMessage}</span>
        </div>
      )}

      {/* Header section */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xs font-extrabold text-kopkar-dark uppercase tracking-wider">
            Konfirmasi PO Katering H-1
          </h3>
          <p className="text-[10px] text-slate-400">
            Pesanan masuk dari aplikasi Marketplace Karyawan
          </p>
        </div>

        {pendingCount > 0 ? (
          <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full border border-amber-200">
            {pendingCount} Menunggu Konfirmasi
          </span>
        ) : (
          <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full border border-emerald-200">
            Semua PO Terkonfirmasi
          </span>
        )}
      </div>

      {/* PO Item Cards */}
      <div className="space-y-3">
        {poList.map((po) => (
          <Card
            key={po.id}
            variant="white"
            padding="sm"
            className="border-slate-200/80 shadow-bento space-y-3"
          >
            {/* Top PO Meta */}
            <div className="flex items-start justify-between gap-2 border-b border-slate-100 pb-2.5">
              <div>
                <span className="text-[9px] font-mono text-slate-400 block font-semibold">
                  {po.poNumber} • {po.deliveryDate}
                </span>
                <h4 className="text-xs sm:text-sm font-extrabold text-kopkar-dark mt-0.5 leading-snug">
                  {po.productName}
                </h4>
                <span className="text-[10px] text-slate-500 font-medium">
                  Tujuan: <strong className="text-slate-700">{po.deliveryLocation}</strong>
                </span>
              </div>

              <StatusBadge status={po.status} size="sm" />
            </div>

            {/* Quantity and Price */}
            <div className="flex items-center justify-between bg-slate-50 p-2.5 rounded-2xl text-xs font-mono">
              <span className="text-slate-600 font-sans text-[11px]">
                Kuantitas: <strong className="text-kopkar-primary font-bold text-sm">{po.qty} {po.unit}</strong>
              </span>
              <span className="font-extrabold text-kopkar-dark text-sm">
                {formatCurrencyIDR(po.totalAmount)}
              </span>
            </div>

            {/* Interactive Action Buttons */}
            {po.status === 'PENDING' ? (
              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  onClick={() => handleUpdateStatus(po.id, 'ACCEPTED')}
                  className="py-2 px-3 rounded-full bg-kopkar-primary text-white font-bold text-xs flex items-center justify-center gap-1.5 hover:bg-kopkar-primary-dark active:scale-95 transition-all shadow-2xs"
                >
                  <Check size={14} strokeWidth={2.5} />
                  <span>Sanggup Penuhi</span>
                </button>

                <button
                  onClick={() => handleUpdateStatus(po.id, 'REJECTED')}
                  className="py-2 px-3 rounded-full bg-slate-100 text-slate-600 font-bold text-xs flex items-center justify-center gap-1.5 hover:bg-rose-50 hover:text-rose-600 active:scale-95 transition-all"
                >
                  <X size={14} strokeWidth={2.5} />
                  <span>Berhalangan</span>
                </button>
              </div>
            ) : po.status === 'ACCEPTED' ? (
              <div className="p-2 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] flex items-center justify-between font-semibold">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 size={14} className="text-emerald-600" />
                  <span>Siap dikirim sesuai jadwal ({po.deliveryDate})</span>
                </span>
                <button
                  onClick={() => handleUpdateStatus(po.id, 'REJECTED')}
                  className="text-[10px] text-slate-400 hover:text-rose-600 underline"
                >
                  Ubah
                </button>
              </div>
            ) : (
              <div className="p-2 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-[11px] flex items-center justify-between font-semibold">
                <span className="flex items-center gap-1.5">
                  <AlertTriangle size={14} className="text-rose-600" />
                  <span>Dibatalkan (Admin mencari supplier alternatif)</span>
                </span>
                <button
                  onClick={() => handleUpdateStatus(po.id, 'ACCEPTED')}
                  className="text-[10px] text-emerald-600 underline font-bold"
                >
                  Sanggup Kembali
                </button>
              </div>
            )}
          </Card>
        ))}
      </div>

      {/* Download Daily PO Slip Button */}
      <Button
        variant="outline"
        size="sm"
        fullWidth
        onClick={onDownloadSlip}
        className="text-slate-700 border-slate-300"
      >
        <FileDown size={14} className="text-kopkar-primary" />
        <span>Unduh Slip Rekap PO Harian (.pdf)</span>
      </Button>
    </div>
  );
};
