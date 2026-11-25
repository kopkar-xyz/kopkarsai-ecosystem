import React, { useState } from 'react';
import { X } from 'lucide-react';
import { FoodProduct } from '../../../types/food';

interface MenuDetailCardProps {
  product: FoodProduct;
  onClose: () => void;
  onOrder: (product: FoodProduct, quantity: number) => void;
  orderSuccess?: boolean;
  isLoading?: boolean;
}

const formatPrice = (val: number) => 'Rp ' + val.toLocaleString('id-ID');

/**
 * MenuDetailCard — Detail Menu Sesuai Desain Kanonikal
 * Layout & informasi persis gambar: Header image dengan badge diskon,
 * 2-row table (Sumber & Ketersediaan), komposisi alami, dan footer stepper + dynamic button.
 * Budget: < 200 LOC.
 */
export const MenuDetailCard: React.FC<MenuDetailCardProps> = ({
  product,
  onClose,
  onOrder,
  orderSuccess = false,
  isLoading = false,
}) => {
  const [qty, setQty] = useState(1);
  const isPO = product.source === 'SUPPLIER_ACC' || product.deliveryType === 'PO_H1';

  const ingredientsList = product.ingredients
    ? product.ingredients.split(',').slice(0, 4).map((i) => i.trim())
    : ['Tepung beras', 'Santan kelapa', 'Pisang raja', 'Gula pasir'];

  const totalPrice = product.price * qty;

  return (
    <article
      className="w-full max-w-[390px] max-h-[85vh] lg:max-h-[calc(100vh-120px)] flex flex-col bg-white rounded-3xl overflow-hidden shadow-xl border border-[#EAE3D5] text-[#1A1615] relative select-none animate-fadeIn"
      aria-label={`Detail menu ${product.name}`}
      onClick={(e) => e.stopPropagation()}
    >
      {/* 1. Photo Header with Discount Badge & Close Button */}
      <div className="relative h-[230px] sm:h-[250px] w-full bg-[#FAF6F0] overflow-hidden shrink-0" role="img" aria-label={product.name}>
        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />

        {product.discountBadge && (
          <span className="absolute top-4 left-4 z-10 bg-[#F6CE2C] text-[#3A2A00] text-xs font-bold px-3.5 py-1.5 rounded-full shadow-xs">
            {product.discountBadge}
          </span>
        )}

        <button
          type="button"
          onClick={onClose}
          aria-label="Tutup"
          className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-white/90 hover:bg-white text-[#1A1615] flex items-center justify-center shadow-md transition-all active:scale-95 cursor-pointer border border-[#EAE3D5]/50"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* 2. Body Details: Title, Kanji, Rating & Review, Info Rows, Description, Komposisi */}
      <div className="px-5 sm:px-6 pt-4 sm:pt-5 pb-3 overflow-y-auto flex-1">
        <h1 className="font-heading font-semibold text-2xl text-[#83273B] leading-tight tracking-tight">
          {product.name}
        </h1>
        {product.kanjiName && (
          <div className="font-kanji text-xs text-[#8C827A] mt-1">{product.kanjiName}</div>
        )}

        {/* Rating, Reviews, Sold Count */}
        <div className="flex items-center gap-1.5 mt-2 text-xs text-[#1A1615]">
          <span className="text-[#E5A812] font-bold">★</span>
          <b className="font-bold tabular-nums">{product.rating}</b>
          <span className="text-[#665E60]">({product.ratingCount || '820 ulasan'})</span>
          <span className="text-[#2E6B4F] font-semibold ml-3">{product.soldCount || '2RB+ terjual'}</span>
        </div>

        {/* Two-Row Information Table: Sumber & Ketersediaan */}
        <div className="border-y border-[#EAE3D5] py-3 my-3.5 space-y-2 text-xs">
          <div className="flex items-center justify-between">
            <span className="text-[#8C827A]">Sumber</span>
            <span className="text-[#1A1615] font-medium text-right">
              {isPO
                ? `${product.supplierName || 'Mitra UMKM Bu Sri'}, Pre-Order H-1`
                : 'Toko fisik, siap diambil hari ini'}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[#8C827A]">Ketersediaan</span>
            <span className="text-[#1A1615] font-medium text-right">
              {product.stock !== undefined && product.stock > 0
                ? `${product.stock} pcs siap diambil hari ini`
                : 'Stok -'}
            </span>
          </div>
        </div>

        {/* Description */}
        <p className="text-xs leading-relaxed text-[#4A4244] mb-4">
          {product.fullDescription || product.description}
        </p>

        {/* Komposisi Alami */}
        <h2 className="text-xs font-bold text-[#83273B] mb-2">Komposisi alami</h2>
        <ul className="flex flex-wrap gap-2 list-none p-0 m-0">
          {ingredientsList.map((ing, idx) => (
            <li
              key={idx}
              className="text-xs py-1 px-3 border border-[#EAE3D5] rounded-xl bg-[#FAF6F0] text-[#1A1615]"
            >
              {ing}
            </li>
          ))}
        </ul>
      </div>

      {/* 3. Footer Action Bar (Price & Order CTA) */}
      <div className="bg-[#FAF6F0] border-t border-[#EAE3D5] p-4 sm:p-5 shrink-0">
        <div className="flex items-center gap-2 mb-3">
          <span className="font-heading font-semibold text-2xl text-[#83273B] leading-none tabular-nums">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && (
            <span className="text-xs text-[#8C827A] line-through tabular-nums font-medium">
              {formatPrice(product.originalPrice)}
            </span>
          )}
          {product.discountBadge && (
            <span className="text-[11px] font-bold bg-[#F6CE2C] text-[#3A2A00] px-2 py-0.5 rounded-md shadow-2xs">
              {product.discountBadge}
            </span>
          )}
        </div>

        {/* Stepper + Order Button */}
        <div className="flex gap-3 items-center">
          <div className="flex items-center border border-[#EAE3D5] bg-white rounded-xl overflow-hidden shadow-2xs h-11">
            <button
              type="button"
              onClick={() => setQty((prev) => Math.max(1, prev - 1))}
              className="w-8 h-11 text-[#1A1615] hover:bg-[#FAF6F0] active:scale-95 font-medium text-sm cursor-pointer"
            >
              −
            </button>
            <output className="min-w-[28px] text-center font-bold text-xs tabular-nums">
              {qty}
            </output>
            <button
              type="button"
              onClick={() => setQty((prev) => Math.min(20, prev + 1))}
              className="w-8 h-11 text-[#1A1615] hover:bg-[#FAF6F0] active:scale-95 font-medium text-sm cursor-pointer"
            >
              +
            </button>
          </div>

          <button
            type="button"
            onClick={() => onOrder(product, qty)}
            disabled={isLoading}
            className="flex-1 flex justify-between items-center px-4 h-11 rounded-xl bg-[#7A1C2E] hover:bg-[#601423] text-white font-semibold text-xs shadow-md cursor-pointer transition-all active:scale-[0.98] disabled:opacity-50"
          >
            <span>
              {orderSuccess ? 'Tersimpan di Keranjang' : (isLoading ? 'Memproses...' : 'Pesan sekarang')}
            </span>
            <span className="font-bold tabular-nums">
              {formatPrice(totalPrice)}
            </span>
          </button>
        </div>
      </div>
    </article>
  );
};
