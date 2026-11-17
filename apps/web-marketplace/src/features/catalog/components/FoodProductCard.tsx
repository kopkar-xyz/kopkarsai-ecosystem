import React from 'react';
import { Star, Plus, ArrowRight } from 'lucide-react';
import { FoodProduct } from '../../../types/food';

interface FoodProductCardProps {
  product: FoodProduct;
  isSelected: boolean;
  onClick: (product: FoodProduct) => void;
}

const formatPrice = (val: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(val).replace('Rp', 'Rp ');
};

/**
 * FoodProductCard — Kartu Hidangan Autentik Sakura Kyoto Kitchen
 * Menggunakan palet Kyoto Wabi-Sabi (#83273B, #FAF6F0) dan Okashi font untuk judul.
 * Budget: < 200 LOC.
 */
export const FoodProductCard: React.FC<FoodProductCardProps> = ({
  product,
  isSelected,
  onClick,
}) => {
  return (
    <article
      onClick={() => onClick(product)}
      className={`group bg-white rounded-xl sm:rounded-2xl p-2.5 sm:p-3.5 shadow-sm transition-all duration-200 cursor-pointer flex flex-col justify-between select-none ${
        isSelected
          ? 'border border-[#83273B] shadow-[0_4px_16px_-2px_rgba(131,39,59,0.14)] -translate-y-0.5'
          : 'hover:shadow-md border border-[#EAE3D5] hover:border-[#83273B]/40'
      }`}
    >
      <div>
        {/* Foto Produk & Badges */}
        <div className="relative w-full aspect-square rounded-lg sm:rounded-xl bg-[#FFF8F9] overflow-hidden mb-2 sm:mb-2.5 flex items-center justify-center border border-[#FCE4E9]/50">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover rounded-md sm:rounded-lg group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />

          {/* Status & Discount Badges */}
          <div className="absolute top-1.5 left-1.5 flex flex-col sm:flex-row items-start sm:items-center gap-1">
            {product.badge && (
              <span
                className={`text-[9px] sm:text-[10px] font-bold px-1.5 sm:px-2 py-0.5 rounded-full shadow-sm text-white ${
                  product.badge.includes('Special') ? 'bg-[#83273B]' : 'bg-[#2E6B4F]'
                }`}
              >
                {product.badge}
              </span>
            )}
            {product.discountBadge && (
              <span className="text-[9px] sm:text-[10px] font-extrabold px-1.5 sm:px-2 py-0.5 rounded-full bg-[#F6CE2C] text-[#1A1615] shadow-sm">
                {product.discountBadge}
              </span>
            )}
          </div>

          {/* Rating */}
          <span className="absolute bottom-1.5 right-1.5 flex items-center gap-0.5 text-[10px] sm:text-xs font-semibold text-[#9E6E00] bg-[#FEF6DC] px-1.5 py-0.5 rounded-full shadow-sm border border-[#E5A812]/30">
            <Star className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-[#E5A812] text-[#E5A812]" />
            <span>{product.rating}</span>
          </span>
        </div>

        {/* Title (Font Okashi / font-brush) & Kanji */}
        <div className="mb-0.5 sm:mb-1">
          <h3
            className={`font-brush text-sm sm:text-base md:text-lg font-bold transition-colors line-clamp-1 leading-snug ${
              isSelected ? 'text-[#83273B]' : 'text-[#1A1615] group-hover:text-[#83273B]'
            }`}
          >
            {product.name}
          </h3>
          {product.kanjiName && (
            <span className="font-kanji text-[10px] sm:text-xs text-[#83273B] font-semibold block truncate opacity-80">
              {product.kanjiName}
            </span>
          )}
        </div>

        {/* Description */}
        <p className="text-[11px] sm:text-xs text-[#665E60] line-clamp-2 mb-2 leading-relaxed">
          {product.description}
        </p>
      </div>

      {/* Card Bottom: Price & Action Button */}
      <div className="flex items-center justify-between pt-1.5 sm:pt-2 border-t border-[#FAF6F0] mt-auto">
        <div className="flex flex-col min-w-0 pr-1">
          {product.originalPrice && (
            <span className="text-[10px] sm:text-[11px] text-[#665E60] line-through font-sans leading-none tabular-nums">
              {formatPrice(product.originalPrice)}
            </span>
          )}
          <span
            className={`font-brush text-sm sm:text-base md:text-lg font-bold whitespace-nowrap leading-tight ${
              product.discountBadge ? 'text-[#B8860B]' : 'text-[#83273B]'
            }`}
          >
            {formatPrice(product.price)}
          </span>
        </div>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onClick(product);
          }}
          className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center shadow-sm shrink-0 active:scale-95 transition-all cursor-pointer border-none ${
            isSelected
              ? 'bg-[#F6CE2C] text-[#1A1615] hover:bg-[#E5A812]'
              : 'bg-[#83273B] text-white hover:bg-[#5E1526]'
          }`}
          aria-label={isSelected ? 'Tutup detail hidangan' : 'Lihat detail hidangan'}
        >
          {isSelected ? (
            <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 font-bold text-[#1A1615]" />
          ) : (
            <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
          )}
        </button>
      </div>
    </article>
  );
};

