import React, { useState } from 'react';
import { FoodProduct } from '../../../types/food';

interface MenuDetailCardProps {
  product: FoodProduct;
  onClose: () => void;
  onOrder: (product: FoodProduct, quantity: number) => void;
  orderSuccess?: boolean;
  isLoading?: boolean;
}

/**
 * MenuDetailCard — Slicing Presisi Detail Menu Kuro Kosho Jiru
 * Palet Wabi-Sabi Sakura (#83273B, #FAF6F0, #EAE3D5) & Tipografi Okashi + Geist.
 */
export const MenuDetailCard: React.FC<MenuDetailCardProps> = ({
  product,
  onClose,
  onOrder,
  orderSuccess = false,
  isLoading = false,
}) => {
  const [qty, setQty] = useState(1);
  const formatPrice = (amount: number) => 'Rp ' + amount.toLocaleString('id-ID');

  const ingredientsList = product.ingredients
    ? product.ingredients.split(',').slice(0, 4).map((i) => i.trim())
    : ['Ramen gandum', 'Pumpkin kabocha', 'Onion', 'Garlic'];

  return (
    <article
      className="w-full max-w-[400px] bg-[#FFFFFF] rounded-[28px] overflow-hidden shadow-[0_18px_40px_-22px_rgba(60,20,28,0.35)] border border-[#EAE3D5] text-[#1A1615] font-sans relative select-none animate-fadeIn"
      aria-label={`Detail menu ${product.name}`}
      onClick={(e) => e.stopPropagation()}
    >
      {/* 1. Photo Header with Gradient & Tags */}
      <div className="relative h-[230px] w-full bg-[#F7F2E7] overflow-hidden" role="img" aria-label={product.name}>
        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
        <div className="absolute inset-x-0 bottom-0 h-[70px] bg-gradient-to-t from-[#1E0C10]/40 to-transparent pointer-events-none" />

        {/* Circular Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Tutup"
          className="absolute top-3.5 right-3.5 z-10 w-9 h-9 rounded-full bg-[#FFFCF6]/90 hover:bg-white text-[#1A1615] flex items-center justify-center shadow-md transition-all active:scale-95 cursor-pointer border border-[#EAE3D5]/50"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M2 2l10 10M12 2L2 12" />
          </svg>
        </button>

        {/* Badge Tag */}
        <span className="absolute left-3.5 bottom-3.5 z-10 bg-[#F6CE2C] text-[#3A2A00] text-xs font-semibold px-2.5 py-1.5 rounded-lg shadow-xs">
          {product.discountBadge ? `Spesial ${product.discountBadge}` : (product.badge || 'Menu Pilihan')}
        </span>
      </div>

      {/* 2. Body Details: Title, Kanji, Rating, Facts, Description, Ingredients */}
      <div className="px-6 pt-5 pb-1">
        <h1 className="font-heading font-medium text-[28px] sm:text-[30px] text-[#83273B] leading-[1.15] tracking-tight">
          {product.name}
        </h1>
        <div className="font-kanji text-[15px] text-[#665E60] mt-0.5">
          {product.kanjiName || '和食 逸品'}
        </div>

        {/* Rating & Sold count */}
        <div className="flex items-center gap-1.5 mt-2.5 text-[13px] text-[#665E60]">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="#E5A812">
            <path d="M12 2l2.9 6.3 6.9.7-5.2 4.6 1.5 6.8L12 16.9 5.9 20.4l1.5-6.8L2.2 9l6.9-.7z" />
          </svg>
          <b className="text-[#1A1615] font-semibold tabular-nums">{product.rating}</b>
          <span>({product.ratingCount})</span>
          <span className="text-[#2E6B4F] font-medium ml-1">{product.soldCount}</span>
        </div>

        {/* Facts Bar (Porsi, Energi, Suka) */}
        <div className="flex my-4 py-3 border-y border-[#EAE3D5] text-[13px]">
          <div className="flex-1 text-center">
            <strong className="block text-[15px] font-semibold text-[#1A1615] tabular-nums">{product.volume || '300 ml'}</strong>
            <span className="text-xs text-[#665E60]">porsi</span>
          </div>
          <div className="flex-1 text-center border-l border-[#EAE3D5]">
            <strong className="block text-[15px] font-semibold text-[#1A1615] tabular-nums">{product.calories || '359 kcal'}</strong>
            <span className="text-xs text-[#665E60]">energi</span>
          </div>
          <div className="flex-1 text-center border-l border-[#EAE3D5]">
            <strong className="block text-[15px] font-semibold text-[#1A1615] tabular-nums">{product.likes || 348}</strong>
            <span className="text-xs text-[#665E60]">suka</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm leading-relaxed text-[#1A1615] mt-4">
          {product.fullDescription || product.description}
        </p>

        {/* Natural Ingredients */}
        <h2 className="text-[13px] font-semibold text-[#83273B] mt-[18px] mb-2">Komposisi alami</h2>
        <ul className="flex flex-wrap gap-1.5 list-none p-0 m-0">
          {ingredientsList.map((ing, idx) => (
            <li key={idx} className="text-[13px] py-1 px-3 border border-[#EAE3D5] rounded-full bg-[#FAF6F0] text-[#1A1615]">
              {ing}
            </li>
          ))}
        </ul>
      </div>

      {/* 3. Buy Footer Action Bar */}
      <div className="mt-5 px-6 pt-[18px] pb-5 bg-[#F7F2E7] border-t border-[#EAE3D5]">
        <div className="flex items-center gap-2.5 flex-wrap">
          <span className="font-heading font-semibold text-[28px] sm:text-[30px] text-[#83273B] leading-none">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-[#665E60] line-through tabular-nums font-medium">{formatPrice(product.originalPrice)}</span>
          )}
          {product.discountBadge && (
            <span className="text-xs font-semibold bg-[#F6CE2C] text-[#3A2A00] px-2 py-0.5 rounded-md shadow-2xs">
              {product.discountBadge}
            </span>
          )}
        </div>
        <p className="text-xs text-[#665E60] mt-1">Sudah termasuk pajak dan kemasan takeaway</p>

        {/* Stepper & CTA Order Button */}
        <div className="flex gap-2.5 mt-4 items-center">
          <div className="flex items-center border border-[#EAE3D5] bg-white rounded-[14px] overflow-hidden shadow-2xs h-[50px]">
            <button
              type="button"
              onClick={() => setQty((prev) => Math.max(1, prev - 1))}
              aria-label="Kurangi"
              className="w-[38px] h-[50px] border-0 bg-transparent text-[#1A1615] text-lg font-medium flex items-center justify-center hover:bg-[#FAF6F0] active:scale-95 transition-all cursor-pointer select-none"
            >
              −
            </button>
            <output className="min-w-[26px] text-center font-semibold tabular-nums text-[#1A1615] text-sm">
              {qty}
            </output>
            <button
              type="button"
              onClick={() => setQty((prev) => Math.min(20, prev + 1))}
              aria-label="Tambah"
              className="w-[38px] h-[50px] border-0 bg-transparent text-[#1A1615] text-lg font-medium flex items-center justify-center hover:bg-[#FAF6F0] active:scale-95 transition-all cursor-pointer select-none"
            >
              +
            </button>
          </div>

          <button
            type="button"
            onClick={() => onOrder(product, qty)}
            disabled={isLoading}
            className="flex-1 flex justify-center items-center px-[18px] h-[50px] border-0 rounded-[14px] bg-[#5E1526] hover:bg-[#73182E] active:scale-[0.98] text-white font-semibold text-[15px] shadow-md transition-all cursor-pointer disabled:opacity-50"
          >
            <span>
              {orderSuccess ? 'Tersimpan di Keranjang' : (isLoading ? 'Memproses...' : 'Pesan sekarang')}
            </span>
          </button>
        </div>

        {/* Pickup Notice with Pin Icon */}
        <p className="flex items-center gap-1.5 mt-3.5 text-xs text-[#665E60]">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0 text-[#83273B]">
            <path d="M12 21s7-6.2 7-12a7 7 0 10-14 0c0 5.8 7 12 7 12z" />
            <circle cx="12" cy="9" r="2.5" />
          </svg>
          <span>Ambil di Counter Lantai 2, atau diantar ke meja kerja PT SAI</span>
        </p>
      </div>
    </article>
  );
};
