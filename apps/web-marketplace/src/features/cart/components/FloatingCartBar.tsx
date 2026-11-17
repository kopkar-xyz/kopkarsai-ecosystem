import React from 'react';
import { ShoppingBag, ChevronRight } from 'lucide-react';
import { formatRupiah } from '../../../lib/utils';

interface FloatingCartBarProps {
  totalCount: number;
  totalPrice: number;
  onOpenCart: () => void;
}

export const FloatingCartBar: React.FC<FloatingCartBarProps> = ({
  totalCount,
  totalPrice,
  onOpenCart,
}) => {
  if (totalCount === 0) return null;

  return (
    <div className="fixed bottom-4 inset-x-4 max-w-lg mx-auto z-40">
      <div
        onClick={onOpenCart}
        className="bg-[#83273B] text-white p-3.5 rounded-2xl shadow-drawer flex items-center justify-between cursor-pointer hover:bg-[#5E1526] transition-all transform active:scale-98 border border-white/20"
      >
        <div className="flex items-center gap-3">
          <div className="relative p-2 bg-white/20 rounded-xl">
            <ShoppingBag className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 bg-[#E5A812] text-[#1A1615] font-extrabold text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
              {totalCount}
            </span>
          </div>
          <div>
            <p className="text-xs text-white/80">{totalCount} item siap di-checkout</p>
            <p className="text-sm font-bold">{formatRupiah(totalPrice)}</p>
          </div>
        </div>

        <div className="flex items-center gap-1 font-bold text-xs bg-white text-[#83273B] px-3 py-1.5 rounded-xl shadow-sm">
          <span>Buka Keranjang</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </div>
      </div>
    </div>
  );
};

