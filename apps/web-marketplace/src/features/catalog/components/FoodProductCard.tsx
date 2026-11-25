import React from 'react';
import { Plus, ArrowRight } from 'lucide-react';
import { FoodProduct } from '../../../types/food';

interface FoodProductCardProps {
  product: FoodProduct;
  isSelected: boolean;
  onClick: (product: FoodProduct) => void;
}

const formatPrice = (val: number) => {
  return 'Rp ' + val.toLocaleString('id-ID');
};

/**
 * FoodProductCard — Kartu Hidangan Sesuai Desain Kanonikal
 * Font Okashi (font-brush), warna #83273B, aspect-square, padding p-2.5 sm:p-3.5,
 * serta tampilan stok: jika habis tampilkan 'Stok -', tanpa teks kuota.
 * Budget: < 200 LOC.
 */
export const FoodProductCard: React.FC<FoodProductCardProps> = ({
  product,
  isSelected,
  onClick,
}) => {
  const isPO = product.source === 'SUPPLIER_ACC' || product.deliveryType === 'PO_H1';

  return (
    <article
      onClick={() => onClick(product)}
      className={`group bg-white rounded-xl sm:rounded-2xl p-2.5 sm:p-3.5 shadow-sm transition-all duration-200 cursor-pointer flex flex-col justify-between select-none ${isSelected
        ? 'border-2 border-[#83273B] shadow-[0_4px_16px_-2px_rgba(131,39,59,0.14)] -translate-y-0.5'
        : 'hover:shadow-md border border-[#EAE3D5] hover:border-[#83273B]/40'
        }`}
    >
      <div>
        {/* Foto Produk & Badges Sesuai Gambar Referensi */}
        <div className="relative w-full aspect-square rounded-lg sm:rounded-xl bg-[#FFF8F9] overflow-hidden mb-2 sm:mb-2.5 flex items-center justify-center border border-[#FCE4E9]/50">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover rounded-md sm:rounded-lg group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />

          {/* Badges on Top-Left */}
          <div className="absolute top-1.5 left-1.5 flex flex-col items-start gap-1 z-10">
            {isPO ? (
              <span className="text-[9px] sm:text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#1A4A6B] text-white shadow-xs">
                PO H-1{product.subCategory === 'dingin' ? ', Segar' : ''}
              </span>
            ) : (
              <span className="text-[9px] sm:text-[10px] font-bold px-2 py-0.5 rounded-md bg-[#2E6B4F] text-white shadow-xs">
                {product.category === 'jajanan' ? 'Kue Basah' : product.category === 'minuman' ? 'Dingin & Segar' : 'Same-day'}
              </span>
            )}
            {product.discountBadge && (
              <span className="text-[9px] sm:text-[10px] font-bold px-1.5 sm:px-2 py-0.5 rounded-md bg-[#F6CE2C] text-[#1A1615] shadow-xs">
                {product.discountBadge}
              </span>
            )}
          </div>

          {/* Rating Badge on Bottom-Right of Image Sesuai Gambar Referensi */}
          <div className="absolute bottom-1.5 right-1.5 bg-white/95 backdrop-blur-xs px-2 py-0.5 rounded-full shadow-2xs flex items-center gap-0.5 text-[10.5px] font-bold text-[#1A1615] z-10">
            <span className="text-[#E5A812]">★</span>
            <span className="tabular-nums">{product.rating}</span>
          </div>
        </div>

        {/* Title */}
        <h3
          className={`font-heading text-sm sm:text-base font-bold transition-colors line-clamp-1 leading-snug mb-0.5 ${
            isSelected ? 'text-[#83273B]' : 'text-[#1A1615] group-hover:text-[#83273B]'
          }`}
        >
          {product.name}
        </h3>

        {/* Japanese Subtitle / Kanji */}
        {product.kanjiName && (
          <span className="font-kanji text-[10px] sm:text-xs text-[#83273B] font-semibold block truncate opacity-80 mb-1">
            {product.kanjiName}
          </span>
        )}

        {/* Description */}
        <p className="text-[11px] sm:text-xs text-[#665E60] line-clamp-2 mb-2 leading-relaxed">
          {product.description}
        </p>
      </div>

      {/* Bottom Price & Circular Plus Action Button Sesuai Gambar Referensi */}
      <div className="pt-1.5 sm:pt-2 border-t border-dashed border-[#EAE3D5] mt-auto">
        <div className="flex items-end justify-between">
          <div className="min-w-0 pr-1">
            {product.originalPrice && (
              <span className="text-[10px] sm:text-[11px] text-[#665E60] line-through font-sans leading-none tabular-nums block mb-0.5">
                {formatPrice(product.originalPrice)}
              </span>
            )}
            <span className="font-heading text-sm sm:text-base font-bold whitespace-nowrap leading-tight text-[#A9791C] block">
              {formatPrice(product.price)}
            </span>
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onClick(product);
            }}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all cursor-pointer shadow-xs active:scale-95 shrink-0 ${
              isSelected
                ? 'bg-[#F4C63D] hover:bg-[#E5A812] text-[#1A1615]'
                : 'bg-[#83273B] hover:bg-[#681E2E] text-white'
            }`}
            aria-label={isSelected ? 'Menu terpilih' : 'Pilih hidangan'}
          >
            {isSelected ? (
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            ) : (
              <Plus className="w-4 h-4 stroke-[2.5]" />
            )}
          </button>
        </div>
      </div>
    </article>
  );
};
