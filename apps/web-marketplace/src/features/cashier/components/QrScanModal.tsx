import React, { useState, useEffect } from 'react';
import { X, AlertCircle } from 'lucide-react';
import { Order } from '../../../types/order';
import { OrderHandoverModalContent } from './OrderHandoverModalContent';

interface QrScanModalProps {
  isOpen: boolean;
  onClose: () => void;
  orders: Order[];
  onConfirmPickup: (orderId: string) => void;
}

/**
 * QrScanModal — Modal Verifikasi Pengambilan & Serah Terima Pesanan
 * Tepat sesuai media_1795503724057_a1e63849.png & media_1795503724066_3793511a.png.
 * Budget: < 200 LOC.
 */
export const QrScanModal: React.FC<QrScanModalProps> = ({
  isOpen,
  onClose,
  orders,
  onConfirmPickup,
}) => {
  const [tokenInput, setTokenInput] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
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

  const handleSearch = (tokenToTest?: string) => {
    const val = (tokenToTest || tokenInput).trim().toLowerCase();
    if (!val) return;
    const match = orders.find(
      (o) =>
        o.qrCodeToken.toLowerCase() === val ||
        o.invoiceNumber.toLowerCase().includes(val) ||
        o.customerNik.toLowerCase().includes(val) ||
        o.customerName.toLowerCase().includes(val)
    );

    if (match) {
      setSelectedOrder(match);
      setSearchError(false);
    } else {
      setSelectedOrder(null);
      setSearchError(true);
    }
  };

  const handleConfirm = () => {
    if (selectedOrder) {
      onConfirmPickup(selectedOrder.id);
      setSelectedOrder(null);
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-fadeIn select-none"
      onClick={onClose}
    >
      <div
        className="w-full max-w-[420px] bg-[#FFFDF9] border border-[#EAE3D5] rounded-3xl shadow-2xl p-5 sm:p-6 space-y-4 animate-scaleUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* TAMPILAN 1: Form Verifikasi Pengambilan (media_1795503724057_a1e63849.png) */}
        {!selectedOrder ? (
          <div className="space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="font-brush text-2xl sm:text-3xl text-[#83273B] font-semibold leading-tight">
                  Verifikasi pengambilan
                </h2>
                <p className="text-xs text-[#665E60] mt-1 leading-relaxed">
                  Masukkan nomor invoice atau 4 digit terakhir dari tiket pembeli.
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-[#FAF6F0] hover:bg-[#EAE3D5] border border-[#EAE3D5] flex items-center justify-center text-[#1A1615] cursor-pointer transition-colors shrink-0"
                aria-label="Tutup"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Input Pencarian & Tombol Cari */}
            <div className="flex gap-2.5 pt-1">
              <input
                type="text"
                placeholder="Contoh: 0398"
                value={tokenInput}
                onChange={(e) => {
                  setTokenInput(e.target.value);
                  setSearchError(false);
                }}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                className="flex-1 h-11 px-3.5 bg-white border border-[#83273B] rounded-xl text-xs text-[#1A1615] focus:outline-none focus:ring-1 focus:ring-[#83273B]"
              />
              <button
                type="button"
                onClick={() => handleSearch()}
                className="px-5 h-11 bg-[#83273B] hover:bg-[#681E2E] active:scale-98 text-white text-xs font-bold rounded-xl cursor-pointer shadow-xs transition-all"
              >
                Cari
              </button>
            </div>

            {searchError && (
              <div className="p-3 bg-[#FDF0F3] border border-[#F7BAC7] rounded-xl text-xs text-[#83273B] flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>Invoice tidak ditemukan. Periksa kembali nomor invoice.</span>
              </div>
            )}

            {/* Daftar Siap Diserahkan */}
            <div className="space-y-2 pt-1">
              <span className="text-xs font-bold text-[#83273B] block">
                Siap diserahkan ({readyOrders.length})
              </span>

              <div className="space-y-2 max-h-48 overflow-y-auto pr-0.5">
                {readyOrders.map((ord) => {
                  const last4 = ord.invoiceNumber.split('/').pop() || ord.invoiceNumber.slice(-4);
                  const itemCount = ord.items.reduce((s, i) => s + i.quantity, 0);
                  return (
                    <div
                      key={ord.id}
                      onClick={() => setSelectedOrder(ord)}
                      className="p-3 bg-white border border-[#EAE3D5] hover:border-[#83273B] rounded-2xl flex items-center justify-between cursor-pointer transition-colors shadow-2xs group"
                    >
                      <div>
                        <span className="font-bold text-xs sm:text-sm text-[#1A1615] block group-hover:text-[#83273B]">
                          {last4}
                        </span>
                        <span className="text-xs text-[#665E60] block">{ord.customerName}</span>
                      </div>
                      <span className="text-xs text-[#665E60]">{itemCount} item</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ) : (
          /* TAMPILAN 2: Konfirmasi Serah Terima Pesanan (media_1795503724066_3793511a.png) */
          <OrderHandoverModalContent
            order={selectedOrder}
            onBack={() => setSelectedOrder(null)}
            onClose={onClose}
            onConfirm={handleConfirm}
          />
        )}
      </div>
    </div>
  );
};
