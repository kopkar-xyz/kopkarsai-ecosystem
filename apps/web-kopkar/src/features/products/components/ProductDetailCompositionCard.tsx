import React from 'react';
import { Package } from 'lucide-react';

interface ProductDetailCompositionCardProps {
  ingredients?: string[];
  handlingNotes?: string;
}

/**
 * ProductDetailCompositionCard — Komposisi & Penyimpanan Produk
 * Slicing 1:1 Presisi aistudio-src ProductDetailPage: Pill bahan & catatan gerai.
 * Budget: < 200 LOC.
 */
export const ProductDetailCompositionCard: React.FC<ProductDetailCompositionCardProps> = ({
  ingredients = [
    'Beras Pandan Wangi',
    'Ayam Kampung Fillet',
    'Madu Hutan',
    'Kecap Manis',
    'Sambal Terasi',
  ],
  handlingNotes = 'Simpan di penghangat food-warmer meja kasir maksimal 6 jam.',
}) => {
  return (
    <div className="space-y-4 select-none">
      {/* Header Komposisi */}
      <div className="flex items-center gap-2.5 pb-2 border-b border-[#F0EBDC]">
        <div className="w-7 h-7 rounded-lg bg-[#EAF4EE] text-[#165239] flex items-center justify-center font-bold text-xs">
          <Package size={14} />
        </div>
        <h3 className="font-geist font-semibold text-[16px] text-[#18221D]">
          Komposisi &amp; Penyimpanan
        </h3>
      </div>

      {/* Pill Komposisi Bahan */}
      <div className="flex flex-wrap gap-2">
        {ingredients.map((item) => (
          <span
            key={item}
            className="px-3.5 py-1.5 rounded-xl bg-[#FAF7EE] border border-[#EAE4D3] text-[12.5px] font-medium text-[#18221D]"
          >
            {item}
          </span>
        ))}
      </div>

      {/* Catatan Penanganan Gerai */}
      <div className="pt-1">
        <span className="text-[12px] text-[#7A867E] block">
          Catatan Penanganan di Gerai
        </span>
        <p className="text-[13px] font-medium text-[#18221D] mt-0.5 leading-relaxed">
          {handlingNotes}
        </p>
      </div>
    </div>
  );
};
