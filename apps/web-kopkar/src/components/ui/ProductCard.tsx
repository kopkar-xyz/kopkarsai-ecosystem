import React from 'react';
import { Star, Plus } from 'lucide-react';
import type { OperationalStatus } from '../../types';

export type ProductUnit = 'SAI-B' | 'SAI-T';
export type ProductType = 'Makanan Basah' | 'Makanan Ringan' | 'Minuman' | 'Sembako';

export interface ProductItem {
  id: string;
  name: string;
  category: string;
  productType: ProductType;
  unit: ProductUnit;
  price: number;
  stock: number;
  status?: OperationalStatus;
  supplier?: string;
  isActive?: boolean;
  image?: string;
  rating?: number;
}

interface ProductCardProps {
  product: ProductItem;
  className?: string;
  onClick?: () => void;
  onAddToCart?: (e: React.MouseEvent) => void;
}

/**
 * ProductCard — Bento card untuk etalase katalog produk koperasi
 * Slicing 1:1 Presisi dari aistudio-src CatalogPage:
 * - Container: rounded-2xl border border-[#EAE4D3]
 * - Gambar: aspect-[4/3] w-full bg-[#F5F0E2]
 * - Nama produk: font-semibold text-[14.5px] text-[#18221D] (Geist)
 * - Harga: font-okashi text-[18px] text-[#165239] tabular-nums
 * - Tombol Tambah: px-3.5 py-1.5 rounded-xl bg-[#165239] text-white text-[12.5px] font-medium
 * Budget: < 200 LOC.
 */
export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  className = '',
  onClick,
  onAddToCart,
}) => {
  const getUnitSuffix = () => {
    if (product.category === 'Sembako') {
      return product.unit === 'SAI-B' ? 'sak' : 'pouch';
    }
    if (product.category === 'Minuman') {
      if (product.name.includes('Botol')) return 'botol';
      if (product.name.includes('Susu')) return 'kotak';
      return 'gelas';
    }
    if (product.name.includes('Box')) return 'box';
    if (product.name.includes('Roti')) return 'pcs';
    return 'porsi';
  };

  return (
    <div
      onClick={onClick}
      className={`group rounded-2xl overflow-hidden bg-white border border-[#EAE4D3] hover:-translate-y-1 hover:shadow-[0_14px_30px_-10px_rgba(22,82,57,0.16)] hover:border-[#165239]/45 transition-all duration-300 flex flex-col justify-between cursor-pointer select-none ${className}`}
    >
      {/* 1. Gambar Produk + Floating Unit & Rating Pills */}
      <div className="aspect-[4/3] w-full bg-[#F5F0E2] relative overflow-hidden">
        <img
          src={product.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&auto=format&fit=crop&q=80'}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
        />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-black/25 to-transparent pointer-events-none"
        />
        <span className="absolute top-2 left-2 sm:top-2.5 sm:left-2.5 px-2 sm:px-2.5 py-0.5 rounded-full bg-white/90 backdrop-blur-sm border border-[#EAE4D3]/80 text-[9.5px] sm:text-[10.5px] font-semibold text-[#165239] shadow-2xs">
          {product.unit}
        </span>
        <span className="absolute top-2 right-2 sm:top-2.5 sm:right-2.5 inline-flex items-center gap-0.5 sm:gap-1 px-1.5 sm:px-2 py-0.5 rounded-full bg-white/90 backdrop-blur-sm border border-[#EAE4D3]/80 text-[10px] sm:text-[11px] font-semibold text-[#18221D] tabular-nums shadow-2xs">
          <Star size={10} className="fill-[#F2C94C] text-[#F2C94C] sm:w-[11px] sm:h-[11px]" />
          {(product.rating ?? 4.8).toFixed(1)}
        </span>
      </div>

      {/* 2. Informasi Produk */}
      <div className="p-2.5 sm:p-4 flex-1 flex flex-col justify-between gap-2 sm:gap-3">
        <div>
          <div className="flex items-center justify-between gap-1.5">
            <span className="text-[10px] sm:text-[11px] font-medium text-[#165239] uppercase tracking-[0.04em] truncate">
              {product.category || product.productType}
            </span>
            <span className="px-1.5 sm:px-2 py-0.5 rounded-md bg-[#FAF8F2] border border-[#EAE4D3] text-[9.5px] sm:text-[10.5px] font-medium text-[#526058] tabular-nums shrink-0">
              {product.stock} {getUnitSuffix()}
            </span>
          </div>

          <h3 className="mt-1 sm:mt-1.5 font-semibold text-[12.5px] sm:text-[15px] text-[#18221D] group-hover:text-[#165239] transition-colors leading-snug line-clamp-1">
            {product.name}
          </h3>

          <p className="mt-0.5 text-[10.5px] sm:text-[12px] text-[#7A867E] line-clamp-1">
            {product.supplier || 'Produksi Sendiri'}
          </p>
        </div>

        {/* 3. Footer Harga & Tombol Tambah */}
        <div className="pt-2 sm:pt-3 flex items-center justify-between gap-1.5 sm:gap-2 border-t border-[#F0EBDC]">
          <div className="font-geist font-semibold text-[13px] sm:text-[17px] text-[#165239] tabular-nums truncate">
            Rp {product.price.toLocaleString('id-ID')}
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart?.(e);
            }}
            className="px-2 sm:px-3.5 py-1 sm:py-1.5 rounded-lg sm:rounded-xl bg-[#165239] hover:bg-[#11402c] text-white text-[10.5px] sm:text-[12px] font-medium transition-colors cursor-pointer whitespace-nowrap active:scale-95 shadow-2xs shrink-0"
          >
            <Plus size={11} className="inline mr-0.5 sm:mr-1 sm:w-[13px] sm:h-[13px]" />
            Tambah
          </button>
        </div>
      </div>
    </div>
  );
};
