import React from 'react';
import { FoodProduct } from '../../../types/food';

interface OrderSummaryCardProps {
  cart: { product: FoodProduct; quantity: number }[];
  totalAmount: number;
  step: 'DELIVERY' | 'PAYMENT';
  onSubmit: () => void;
  isSubmitDisabled?: boolean;
}

/**
 * OrderSummaryCard — Ringkasan Item & Aksi Checkout (Gambar 3 layout)
 * Gaya visual, font, bobot, dan gap selaras dengan OrdersView. Budget: < 200 LOC.
 */
export const OrderSummaryCard: React.FC<OrderSummaryCardProps> = ({
  cart,
  totalAmount,
  step,
  onSubmit,
  isSubmitDisabled = false,
}) => {
  return (
    <div className="bg-white border border-[#EAE3D5] rounded-2xl p-5 space-y-4 shadow-2xs">
      <h2 className="text-xs font-semibold text-[#8C827A] px-0.5">
        Ringkasan
      </h2>

      {/* Item List format Gambar 3 */}
      <div className="space-y-3.5 max-h-[320px] overflow-y-auto pr-1">
        {cart.map((item) => (
          <div key={item.product.id} className="flex justify-between items-start text-xs">
            <div className="pr-2 min-w-0">
              <span className="font-semibold text-xs sm:text-sm text-[#1A1615] block leading-tight truncate">
                {item.product.name}
              </span>
              <span className="text-xs text-[#8C827A] mt-0.5 block">
                {item.quantity}x @ Rp {item.product.price.toLocaleString('id-ID')}
              </span>
            </div>
            <span className="font-semibold text-xs sm:text-sm text-[#1A1615] tabular-nums whitespace-nowrap">
              Rp {(item.product.price * item.quantity).toLocaleString('id-ID')}
            </span>
          </div>
        ))}
      </div>

      {/* Divider & Total Row */}
      <div className="border-t border-[#EAE3D5] pt-3.5">
        <div className="flex justify-between items-baseline">
          <span className="text-xs sm:text-sm font-semibold text-[#1A1615]">
            {step === 'DELIVERY' ? 'Total tagihan' : 'Total'}
          </span>
          <span className="font-brush text-xl sm:text-2xl font-bold text-[#83273B] leading-tight">
            Rp {totalAmount.toLocaleString('id-ID')}
          </span>
        </div>
      </div>

      {/* Action Button */}
      {step === 'DELIVERY' ? (
        <button
          type="button"
          onClick={onSubmit}
          className="w-full py-3 px-4 rounded-xl bg-[#83273B] hover:bg-[#6e1e2f] active:scale-98 text-white text-xs sm:text-sm font-semibold shadow-xs transition-all cursor-pointer flex items-center justify-center gap-1.5"
        >
          <span>Lanjut ke pembayaran</span>
          <span>→</span>
        </button>
      ) : (
        <button
          type="button"
          onClick={onSubmit}
          disabled={isSubmitDisabled}
          className={`w-full py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer ${isSubmitDisabled
            ? 'bg-[#C4A7AE] text-white/80 cursor-not-allowed shadow-none'
            : 'bg-[#83273B] hover:bg-[#6e1e2f] active:scale-98 text-white'
            }`}
        >
          <span>Kirim bukti pembayaran</span>
        </button>
      )}
    </div>
  );
};
