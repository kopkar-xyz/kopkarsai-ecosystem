import React, { useEffect, useState } from 'react';
import { ArrowLeft, QrCode, X } from 'lucide-react';
import type { KopkarOrder } from '../data/kopkarOrdersData';

interface KopkarQrScanModalProps {
  isOpen: boolean;
  onClose: () => void;
  orders: KopkarOrder[];
  onConfirmPickup: (orderId: string) => void;
}

export const KopkarQrScanModal: React.FC<KopkarQrScanModalProps> = ({
  isOpen,
  onClose,
  orders,
  onConfirmPickup,
}) => {
  const [tokenInput, setTokenInput] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<KopkarOrder | null>(null);
  const [searchError, setSearchError] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setTokenInput('');
      setSelectedOrder(null);
      setSearchError(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const readyOrders = orders.filter((o) => o.status === 'SIAP_DIAMBIL');

  const handleSearch = (valToTest?: string) => {
    const q = (valToTest ?? tokenInput).trim().toLowerCase();
    if (!q) return;
    const match = orders.find(
      (o) =>
        o.qrCodeToken.toLowerCase() === q ||
        o.invoiceNumber.toLowerCase().includes(q) ||
        o.customerNik.toLowerCase().includes(q) ||
        o.customerName.toLowerCase().includes(q)
    );
    if (match) {
      setSelectedOrder(match);
      setSearchError(false);
    } else {
      setSelectedOrder(null);
      setSearchError(true);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-fadeIn select-none"
      onClick={onClose}
    >
      <div
        className="w-full max-w-[430px] max-h-[90dvh] overflow-y-auto bg-white border border-[#EAE4D3] rounded-3xl shadow-2xl p-5 sm:p-6 space-y-4"
        onClick={(e) => e.stopPropagation()}
      >
        {!selectedOrder ? (
          <div className="space-y-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-[#165239] uppercase tracking-wider">
                  <QrCode className="w-3.5 h-3.5" />
                  <span>Scan QR / Verifikasi</span>
                </div>
                <h2 className="text-[19px] font-semibold text-[#18221D] mt-0.5">
                  Verifikasi Pengambilan
                </h2>
                <p className="text-[12px] text-[#7A867E] mt-0.5">
                  Scan QR pembeli, masukkan token QR, 4 digit invoice, atau NIK.
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-[#FAF7EE] border border-[#EAE4D3] flex items-center justify-center cursor-pointer"
                aria-label="Tutup"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                value={tokenInput}
                onChange={(e) => setTokenInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                placeholder="cth: 0430 atau SAI-QR-0430-RW"
                className="flex-1 h-10 px-3.5 rounded-xl bg-[#FAF8F2] border border-[#EAE4D3] text-[12.5px] focus:outline-none focus:border-[#165239]"
              />
              <button
                type="button"
                onClick={() => handleSearch()}
                className="px-4 h-10 rounded-xl bg-[#165239] hover:bg-[#11402c] text-white text-[12.5px] font-semibold cursor-pointer"
              >
                Cari
              </button>
            </div>

            {searchError && (
              <p className="text-[12px] text-[#B91C1C] bg-[#FEF2F2] px-3 py-2 rounded-xl">
                Invoice atau token QR tidak ditemukan.
              </p>
            )}

            {readyOrders.length > 0 && (
              <div className="space-y-2 pt-1">
                <div className="text-[11px] font-semibold text-[#7A867E] uppercase tracking-wider">
                  Antrean Siap Diambil ({readyOrders.length})
                </div>
                {readyOrders.map((ord) => (
                  <button
                    key={ord.id}
                    type="button"
                    onClick={() => setSelectedOrder(ord)}
                    className="w-full text-left p-3 rounded-xl bg-[#FAF8F2] hover:bg-[#EAF4EE]/60 border border-[#EAE4D3] flex items-center justify-between gap-2 cursor-pointer"
                  >
                    <div>
                      <div className="text-[12.5px] font-semibold text-[#18221D]">
                        {ord.invoiceNumber}
                      </div>
                      <div className="text-[11px] text-[#7A867E]">
                        {ord.customerName} · {ord.qrCodeToken}
                      </div>
                    </div>
                    <span className="text-[11.5px] font-semibold text-[#165239]">Pilih →</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-3.5">
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => setSelectedOrder(null)}
                className="text-[12px] text-[#526058] hover:text-[#165239] inline-flex items-center gap-1 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Cari invoice lain</span>
              </button>
              <button
                type="button"
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-[#FAF7EE] border border-[#EAE4D3] flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div>
              <h2 className="text-[18px] font-semibold text-[#18221D]">Serah Terima Pesanan</h2>
              <p className="text-[12px] text-[#7A867E]">{selectedOrder.invoiceNumber}</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#FAF8F2] border border-[#EAE4D3] space-y-1.5 text-[12px]">
              <div className="flex justify-between">
                <span className="text-[#7A867E]">Pemesan</span>
                <span className="font-semibold text-[#18221D]">{selectedOrder.customerName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#7A867E]">Lokasi</span>
                <span className="font-semibold text-[#18221D]">
                  {selectedOrder.deliveryLocationNote}
                </span>
              </div>
            </div>

            <div className="border-t border-dashed border-[#EAE4D3] pt-2.5 space-y-1.5">
              {selectedOrder.items.map((it) => (
                <div key={it.id} className="flex justify-between text-[12px]">
                  <span className="text-[#18221D]">
                    <strong>{it.quantity}×</strong> {it.name}
                  </span>
                  <span className="font-semibold tabular-nums">
                    Rp {(it.price * it.quantity).toLocaleString('id-ID')}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-[#F0EBDC]">
              <span className="text-[12.5px] font-semibold">Total Lunas</span>
              <span className="text-[18px] font-semibold text-[#165239] tabular-nums">
                Rp {selectedOrder.totalAmount.toLocaleString('id-ID')}
              </span>
            </div>

            <button
              type="button"
              onClick={() => {
                onConfirmPickup(selectedOrder.id);
                onClose();
              }}
              className="w-full py-2.5 rounded-xl bg-[#165239] hover:bg-[#11402c] text-white text-[13px] font-semibold cursor-pointer"
            >
              Konfirmasi Serah Terima
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
