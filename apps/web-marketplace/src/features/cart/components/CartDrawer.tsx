import React, { useState } from 'react';
import { X, Info, ShoppingBag } from 'lucide-react';
import { FoodProduct } from '../../../types/food';
import { CartItemRow } from './CartItemRow';

export interface CartItem {
  product: FoodProduct;
  quantity: number;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onProceedToCheckout: () => void;
}

/**
 * CartDrawer — Slide Bar Keranjang Belanja Konsumen (MP-SCR-003)
 * Slicing 1:1 presisi sesuai media_1795408088697_91b46b01.png
 * Bersih, minimalis, proporsional, tanpa horizontal scroll. Budget: < 200 LOC.
 */
export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onProceedToCheckout,
}) => {
  const [notes, setNotes] = useState<Record<string, string>>({});

  if (!isOpen) return null;

  const totalCount = cart.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = cart.reduce((sum, i) => sum + i.product.price * i.quantity, 0);
  const formatPrice = (val: number) => 'Rp ' + val.toLocaleString('id-ID');

  const sameDayItems = cart.filter((i) => (i.product.deliveryType || 'SAME_DAY') === 'SAME_DAY');
  const preOrderItems = cart.filter((i) => i.product.deliveryType === 'PO_H1');

  const handleSaveNote = (productId: string, noteText: string) => {
    setNotes((prev) => {
      const copy = { ...prev };
      if (noteText.trim()) copy[productId] = noteText.trim();
      else delete copy[productId];
      return copy;
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/50 backdrop-blur-xs flex justify-end select-none animate-fadeIn">
      <div className="bg-white w-full max-w-full sm:max-w-[420px] h-full flex flex-col shadow-2xl border-l sm:border-l border-[#EAE3D5] rounded-none sm:rounded-l-3xl overflow-hidden animate-slideLeft">
        {/* 1. Header Putih Bersih dengan Judul Okashi */}
        <div className="bg-white px-5 pt-5 pb-4 border-b border-[#EAE3D5] flex items-center justify-between shrink-0">
          <div className="flex items-baseline gap-2.5">
            <h3 className="font-brush text-xl sm:text-[22px] text-[#83273B] font-semibold leading-none">
              Keranjang belanja
            </h3>
            <span className="text-xs text-[#8C827A] font-normal">{totalCount} item</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#FAF6F0] hover:bg-[#F0EBE1] border border-[#EAE3D5] flex items-center justify-center text-[#1A1615] transition-colors cursor-pointer"
            aria-label="Tutup keranjang"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* 2. Items List: Bersih, Minimalis & Terpartisi Rapi */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden px-5 py-3 space-y-4">
          {cart.length === 0 ? (
            <div className="text-center py-24 text-[#665E60] space-y-3">
              <div className="w-14 h-14 mx-auto rounded-2xl bg-[#FAF6F0] border border-[#EAE3D5] flex items-center justify-center text-[#83273B]">
                <ShoppingBag className="w-6 h-6" />
              </div>
              <p className="font-semibold text-sm text-[#1A1615]">Keranjang Belanja Kosong</p>
              <p className="text-xs max-w-xs mx-auto">Pilih menu lezat dari etalase untuk memesan.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Seksi Toko Fisik / Ambil Hari Ini */}
              {sameDayItems.length > 0 && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between pb-1 pt-1 border-b border-[#EAE3D5]/60">
                    <span className="font-semibold text-xs sm:text-[13px] text-[#1A1615]">
                      Ambil hari ini
                    </span>
                    <span className="text-[11px] text-[#2E6B4F] font-medium">
                      Ready stock toko, siap langsung
                    </span>
                  </div>
                  {sameDayItems.map((item) => (
                    <CartItemRow
                      key={item.product.id}
                      item={item}
                      note={notes[item.product.id]}
                      onUpdateQuantity={onUpdateQuantity}
                      onSaveNote={handleSaveNote}
                    />
                  ))}
                </div>
              )}

              {/* Seksi Pre-Order H-1 Mitra Katering */}
              {preOrderItems.length > 0 && (
                <div className="space-y-3 pt-2">
                  <div className="flex items-center justify-between pb-1 pt-1 border-b border-[#EAE3D5]/60">
                    <span className="font-semibold text-xs sm:text-[13px] text-[#1A1615]">
                      Katering Pre-Order H-1
                    </span>
                    <span className="text-[11px] text-[#1A4A6B] font-medium">
                      Mitra UMKM • Cut-off 15:00
                    </span>
                  </div>
                  {preOrderItems.map((item) => (
                    <CartItemRow
                      key={item.product.id}
                      item={item}
                      note={notes[item.product.id]}
                      onUpdateQuantity={onUpdateQuantity}
                      onSaveNote={handleSaveNote}
                    />
                  ))}
                </div>
              )}

              {/* Notice Pembayaran */}
              <div className="pt-1 flex items-start gap-2 text-xs text-[#665E60]">
                <Info className="w-4 h-4 text-[#8C827A] shrink-0 mt-0.5" />
                <p className="text-[11px] leading-relaxed">
                  Dibayar lewat <strong className="text-[#1A1615] font-semibold">Payroll Deduction</strong> atau{' '}
                  <strong className="text-[#1A1615] font-semibold">QRIS Mandiri</strong> saat checkout.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* 3. Footer Strip Washi Cream */}
        {cart.length > 0 && (
          <div className="bg-[#F8F3EA] border-t border-[#EAE3D5] p-5 space-y-3 shrink-0">
            <div className="flex items-baseline justify-between">
              <div>
                <span className="text-xs text-[#665E60] block">Subtotal</span>
                {sameDayItems.length > 0 && preOrderItems.length > 0 && (
                  <span className="text-[10px] text-[#8C827A]">
                    {sameDayItems.length} Same-Day + {preOrderItems.length} PO H-1
                  </span>
                )}
              </div>
              <span className="font-brush text-lg sm:text-xl font-semibold text-[#83273B] leading-none">
                {formatPrice(totalPrice)}
              </span>
            </div>

            <button
              type="button"
              onClick={onProceedToCheckout}
              className="w-full py-3.5 rounded-[14px] bg-[#781D32] hover:bg-[#631427] active:scale-[0.98] text-white text-[13px] font-semibold shadow-md transition-all cursor-pointer flex items-center justify-center gap-1.5"
            >
              <span>Lanjut ke checkout</span>
              <span className="font-semibold text-sm">→</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
