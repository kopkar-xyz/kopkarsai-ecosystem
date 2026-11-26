import React from 'react';
import { Download, QrCode, Volume2 } from 'lucide-react';

interface OrdersHeaderBarProps {
  isAdmin: boolean;
  isHead: boolean;
  isSupplier?: boolean;
  audioPlayed: boolean;
  onPlayAudio: () => void;
  onOpenQr: () => void;
  onExportCsv: () => void;
}

export const OrdersHeaderBar: React.FC<OrdersHeaderBarProps> = ({
  isAdmin,
  isHead,
  isSupplier = false,
  audioPlayed,
  onPlayAudio,
  onOpenQr,
  onExportCsv,
}) => {
  return (
    <div className="bg-white rounded-2xl border border-[#EAE4D3] p-4 sm:px-5 sm:py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
      <div>
        <h2 className="text-[16px] sm:text-[17.5px] font-medium text-[#18221D]">
          {isAdmin
            ? 'Pesanan Masuk, PO & Kasir Toko'
            : isHead
              ? 'Monitoring Pesanan & Rekap Penjualan'
              : 'Pesanan PO Masuk & Konfirmasi Mitra'}
        </h2>
        <p className="text-[12px] text-[#7A867E]">
          {isHead
            ? 'Mode Monitoring Kepala Koperasi · Untuk checklist kasir, gunakan role Admin Toko.'
            : isSupplier
              ? 'Daftar pesanan PO khusus produk Anda. Konfirmasi Sanggup atau Berhalangan sebelum cut-off.'
              : 'Cek barang di rak, centang tiap item, lalu tandai siap diambil (GA Priority selalu di atas).'}
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
        {isAdmin && (
          <>
            <button
              type="button"
              onClick={onPlayAudio}
              className={`flex-1 sm:flex-initial justify-center h-9 px-2.5 sm:px-3 rounded-xl border text-[11.5px] sm:text-[12px] font-medium inline-flex items-center gap-1.5 cursor-pointer transition-colors whitespace-nowrap ${
                audioPlayed
                  ? 'bg-[#EAF4EE] border-[#165239] text-[#165239]'
                  : 'bg-[#FAF8F2] border-[#EAE4D3] text-[#526058]'
              }`}
            >
              <Volume2 className="w-3.5 h-3.5 shrink-0" />
              <span>{audioPlayed ? 'Irasshaimase!' : 'Audio Alert'}</span>
            </button>

            <button
              type="button"
              onClick={onOpenQr}
              className="w-full sm:w-auto order-first sm:order-none justify-center h-9 px-3.5 rounded-xl bg-[#165239] hover:bg-[#11402c] text-white text-[12px] font-medium inline-flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
            >
              <QrCode className="w-3.5 h-3.5 shrink-0" />
              <span>Verifikasi / Scan QR</span>
            </button>
          </>
        )}

        {(isAdmin || isHead) && (
          <button
            type="button"
            onClick={onExportCsv}
            className="flex-1 sm:flex-initial justify-center h-9 px-2.5 sm:px-3.5 rounded-xl bg-white hover:bg-[#FAF7EE] border border-[#EAE4D3] text-[#165239] text-[11.5px] sm:text-[12px] font-medium inline-flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
          >
            <Download className="w-3.5 h-3.5 shrink-0" />
            <span>Ekspor Laporan</span>
          </button>
        )}
      </div>
    </div>
  );
};
