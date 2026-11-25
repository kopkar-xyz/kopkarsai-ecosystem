import React, { useState, useEffect } from 'react';
import { Copy, Check } from 'lucide-react';
import { PaymentMethod } from '../../../types/order';
import { QrisPaymentBox } from './QrisPaymentBox';
import { PaymentProofUploadBox } from './PaymentProofUploadBox';

interface PaymentStepPanelProps {
  totalAmount: number;
  paymentMethod: PaymentMethod;
  onChangePaymentMethod: (method: PaymentMethod) => void;
  proofImage?: string;
  onUploadProof: (base64Image: string) => void;
  customerNik: string;
}

/**
 * PaymentStepPanel — Langkah 2: Batas Waktu, Metode Bayar & Upload Bukti Transfer
 * Khusus Potong Gaji (Payroll): Tanpa upload bukti pembayaran.
 * Gaya visual, font, bobot, dan gap selaras dengan OrdersView. Budget: < 200 LOC.
 */
export const PaymentStepPanel: React.FC<PaymentStepPanelProps> = ({
  totalAmount,
  paymentMethod,
  onChangePaymentMethod,
  proofImage,
  onUploadProof,
  customerNik,
}) => {
  const [secondsLeft, setSecondsLeft] = useState(1795); // 29:55
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTimer = (totalSeconds: number) => {
    const m = Math.floor(totalSeconds / 60);
    const s = totalSeconds % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  const handleCopyRekening = () => {
    navigator.clipboard?.writeText('123-00-4567890-1');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4 select-none">
      {/* 1. Batas Waktu Pembayaran Card */}
      <div className="bg-white border border-[#EAE3D5] rounded-2xl p-5 space-y-1.5 shadow-2xs">
        <span className="text-xs font-semibold text-[#8C827A] block px-0.5">
          Batas waktu pembayaran
        </span>
        <span className="font-mono text-2xl sm:text-3xl font-bold text-[#D97706] tracking-wider block px-0.5">
          {formatTimer(secondsLeft)}
        </span>
      </div>

      {/* 2. Metode Bayar Card */}
      <div className="bg-white border border-[#EAE3D5] rounded-2xl p-5 space-y-4 shadow-2xs">
        <span className="text-xs font-semibold text-[#8C827A] block px-0.5">
          Metode bayar
        </span>

        {/* Tab Selector 3 Metode */}
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => onChangePaymentMethod('TRANSFER_MANDIRI')}
            className={`flex-1 sm:flex-initial text-center px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer shadow-2xs whitespace-nowrap ${
              paymentMethod === 'TRANSFER_MANDIRI'
                ? 'bg-[#83273B] text-white shadow-xs'
                : 'bg-white border border-[#EAE3D5] text-[#1A1615] hover:bg-[#FAF6F0]'
            }`}
          >
            Transfer Mandiri
          </button>
          <button
            type="button"
            onClick={() => onChangePaymentMethod('QRIS_MANDIRI')}
            className={`flex-1 sm:flex-initial text-center px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer shadow-2xs whitespace-nowrap ${
              paymentMethod === 'QRIS_MANDIRI'
                ? 'bg-[#83273B] text-white shadow-xs'
                : 'bg-white border border-[#EAE3D5] text-[#1A1615] hover:bg-[#FAF6F0]'
            }`}
          >
            QRIS
          </button>
          <button
            type="button"
            onClick={() => onChangePaymentMethod('PAYROLL_DEDUCTION')}
            className={`flex-1 sm:flex-initial text-center px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer shadow-2xs whitespace-nowrap ${
              paymentMethod === 'PAYROLL_DEDUCTION'
                ? 'bg-[#83273B] text-white shadow-xs'
                : 'bg-white border border-[#EAE3D5] text-[#1A1615] hover:bg-[#FAF6F0]'
            }`}
          >
            Potong Gaji
          </button>
        </div>

        {/* Konten Tab 1: Transfer Bank Mandiri */}
        {paymentMethod === 'TRANSFER_MANDIRI' && (
          <div className="bg-[#FAF6F0]/80 rounded-xl p-4 space-y-2.5 text-xs border border-[#EAE3D5] animate-fadeIn">
            <div className="flex justify-between items-center text-[#665E60]">
              <span>Bank</span>
              <span className="font-semibold text-xs sm:text-sm text-[#1A1615]">Bank Mandiri</span>
            </div>
            <div className="flex justify-between items-center text-[#665E60]">
              <span>No. rekening</span>
              <div className="flex items-center gap-1.5">
                <span className="font-semibold text-xs sm:text-sm text-[#1A1615] font-mono">123-00-4567890-1</span>
                <button
                  type="button"
                  onClick={handleCopyRekening}
                  className="p-1 text-[#83273B] hover:bg-white rounded cursor-pointer transition-colors"
                  title="Salin nomor rekening"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-[#2E6B4F]" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>
            <div className="flex justify-between items-center text-[#665E60]">
              <span>Atas nama</span>
              <span className="font-semibold text-xs sm:text-sm text-[#1A1615]">Koperasi Karyawan PT SAI</span>
            </div>
            <div className="flex justify-between items-center text-[#665E60]">
              <span>Nominal pas</span>
              <span className="font-bold text-xs sm:text-sm text-[#83273B]">Rp {totalAmount.toLocaleString('id-ID')}</span>
            </div>
          </div>
        )}

        {/* Konten Tab 2: QRIS */}
        {paymentMethod === 'QRIS_MANDIRI' && <QrisPaymentBox totalAmount={totalAmount} />}

        {/* Konten Tab 3: Potong Gaji */}
        {paymentMethod === 'PAYROLL_DEDUCTION' && (
          <div className="bg-[#FAF6F0]/80 rounded-xl p-4 space-y-2.5 text-xs border border-[#EAE3D5] animate-fadeIn">
            <div className="flex justify-between items-center text-[#665E60]">
              <span>Sistem Pembayaran</span>
              <span className="font-semibold text-xs sm:text-sm text-[#1A1615]">Potong Gaji (Payroll)</span>
            </div>
            <div className="flex justify-between items-center text-[#665E60]">
              <span>NIK Terverifikasi</span>
              <span className="font-semibold text-xs sm:text-sm text-[#1A1615] font-mono">{customerNik}</span>
            </div>
            <div className="flex justify-between items-center text-[#665E60]">
              <span>Plafon Belanja Tersedia</span>
              <span className="font-semibold text-xs sm:text-sm text-[#2E6B4F]">Rp 2.500.000</span>
            </div>
            <div className="flex justify-between items-center text-[#665E60]">
              <span>Nominal Transaksi</span>
              <span className="font-bold text-xs sm:text-sm text-[#83273B]">Rp {totalAmount.toLocaleString('id-ID')}</span>
            </div>
            <p className="text-[11px] text-[#8C827A] pt-1.5 border-t border-[#EAE3D5] leading-relaxed">
              Tagihan belanja otomatis didebet saat proses tutup buku payroll bulan berjalan. Tidak memerlukan unggah bukti transfer.
            </p>
          </div>
        )}
      </div>

      {/* 3. Unggah Bukti Pembayaran Card (Khusus Transfer Bank & QRIS) */}
      {paymentMethod !== 'PAYROLL_DEDUCTION' && (
        <PaymentProofUploadBox proofImage={proofImage} onUploadProof={onUploadProof} />
      )}
    </div>
  );
};
